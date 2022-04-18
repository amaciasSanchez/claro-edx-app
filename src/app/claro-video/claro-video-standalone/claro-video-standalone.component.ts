import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import * as moment from 'moment';
import { PersonService } from '../claroup/service/personservice';
import { EstadoProceso } from '../flujo-actual-claro-video/flujo-actual-claro-video.component';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
moment.locale("es");
@Component({
  selector: 'app-claro-video-standalone',
  templateUrl: './claro-video-standalone.component.html',
  styleUrls: ['./claro-video-standalone.component.css'],
  providers: [PersonService]
})
export class ClaroVideoStandaloneComponent implements OnInit {

  customer: Customer;
  activarpopover: boolean = false;
  activarbtnPrevNext: boolean = false;
  verActivacionClaroID: boolean = false;
  activarBtnsConfirmarCancelar: boolean = false;
  correoCliente = "";
  activarBtnTransaccionProcesada: boolean = false;
  siguintePage = "";
  activarStep: number = 0;
  verHeader: number = 0;
  aProgressSpinner = false;
  stepStandAlone = 0;
  isProcess = false;
  showModal = false;
  modalAdvertencia = false;
  modal: any = {
    message: "",
    type: "",
    modal: false
  };
  proceso: any;
  standAlone: EstadoProceso;
  offerName: string;
  flujo: any;
  activacionOk = false;
  termsAccepted = false;
  acceptTermsMessage = false;

  confirmateServiceActivationTaskName: string = 'Confirmate Service Activation';
  validateClaroIdTaskName: string = 'Validate Claro ID';
  
  constructor(private personservice: PersonService, 
      private router: Router, 
      private _location: Location, 
      private customerInformationService: CustomerInformationService) {
  }
      
  ngOnInit() {
    this.customer = <Customer> this.customerInformationService.getCustomerInformation();
    // this.proceso = { "processInstanceId": 82, "processId": "Claro-Video.standalone", "processName": "standalone", "processInstanceState": 1, "containerId": "claro-video_1.0.0-SNAPSHOT", "initiator": "wbadmin", "startDate": "1590601553923", "processInstanceDesc": "Venta de Claro Video Stand Alone", "correlationKey": "0926727777|593988693600|75801", "parentInstanceId": -1, "taskSummary": [{ "taskId": "102", "taskName": "Validate Claro ID", "taskSubject": "", "taskDescription": "", "taskStatus": "Ready", "taskPriority": 0, "taskCreatedOn": "1590601554141", "taskActivationTime": "1590601554141", "taskProcInstId": "82", "taskProcDefId": "Claro-Video.standalone", "taskContainerId": "claro-video_1.0.0-SNAPSHOT" }], "processInstanceVariables": { "offer": "75801", "serviceNumber": "593988693600", "initiator": "wbadmin", "identificationNumber": "0926727777", "paymentMethod": "Pago en Efectivo", "serviceDescription": "CONEXION SIN LIMITES 30", "transactionDate": "27-May-2020 12:45", "paymentDescription": "" } };//
    this.standAlone = history.state;
    if (this.standAlone.proceso == null) {
      this.router.navigate(["/bestoffer/2"]);
    }
    this.proceso = this.standAlone.proceso;
    console.log("Este es el proceso a continuar: ", JSON.stringify(this.proceso));
    this.offerName = this.proceso.processInstanceVariables.offerName; 
    console.debug("Obteniendo proceso actual...");
    this.getCurrentTask(this.proceso);
    
  }

  async getCurrentTask(process: any) {
    console.log("Enviando data: ", this.proceso.processInstanceId);
    await this.personservice.getCurrentStepOfInstance(this.proceso.processInstanceId).subscribe(
      async currentStepOfInstanceResponse => {
        console.log("currentStepOfInstanceResponse => ", currentStepOfInstanceResponse);
        const nextStep = currentStepOfInstanceResponse.response;
        if(nextStep > 2) {
          this.correoCliente = this.proceso.processInstanceVariables.email;
          this.stepStandAlone = 2;
        }
      }, async error => {
        console.error("Error buscando el paso actual del proceso: ", error);
        
      }); 
  }
  
  siguiente(event: any) {
    this.activarBtnsConfirmarCancelar = false;
    /**SI SE PROCEDE ACTIVAR CLARO ID : PRESENTAS BOTONES DE CONFIRMACIÓN*/
    if (this.verActivacionClaroID)
      this.activarBtnsConfirmarCancelar = true;
    this.activarpopover = true;
    this.siguintePage = ""
  }

  atras(event: any) {

  }

  siguientepaso(event: any) {
    this.siguintePage = event.siguintePage;
    if (this.siguintePage === "INGRESAR_MAIL") {
      this.activarStep = 1;
      this.verHeader = 1;
      this.activarbtnPrevNext = true;
    } else {
      this.activarbtnPrevNext = false;
    }
  }

  btnEntendido(event: any) {
    this.verActivacionClaroID = event.activarBtnVerCLaroIDActivado;
    this.activarpopover = false;
  }

  btnTransaccionProcesada(event: any) {
    this.activarBtnTransaccionProcesada = true;
  }

  loadinpageClick(data: any) {
    console.debug("data", data);
    this.isProcess = data.isProcess;
    this.aProgressSpinner = data.aProgressSpinner;
  }

  regresarVista360(event: any) {
    if (this.activarBtnTransaccionProcesada) {
      this.router.navigate(["/bestoffer/2"]);
    }
  }
  
  activarOverlay() {
    this.activarpopover = !this.activarpopover;
  }
  
  activarCorreo() { // activa el ingreso de correo electronico
    this.stepStandAlone = 1;
  }

  creacionClaroId() {
    this.showLoadingPage();
    // VALIDAR QUE EL EMAIL A REGISTRAR NO ESTE VACÍO
    if(this.correoCliente == null || this.correoCliente.trim() == '') {
      this.hideLoadingPage();
      this.showErrorModal('Por favor ingrese una dirección de correo electrónico válido para continuar con el proceso');
      return;
    
    }
    // ARMANDO EL REQUEST PARA VALIDAR EL EMAIL
    let data = {
      processInstanceId: this.proceso.processInstanceId.toString(),
      email: this.correoCliente
    }
    this.personservice.validateMailStandAlone(data).subscribe(
      validateMailResponse => {
        console.debug('ValidateMailResponse -> ', validateMailResponse);
        switch (validateMailResponse.code) {
          case "400": // BAD_REQUEST
          case "409": // CONFLICT
            this.hideLoadingPage();
            this.showErrorModal(validateMailResponse.message);
            this.correoCliente = '';  
            break;
          
          case "200": // OK
            this.hideLoadingPage();
            this.showSuccessModal(validateMailResponse.description);
            this.stepStandAlone = 2;
            break;

          case "404": // NOT_FOUND
            let activateData = this.loadClaroIdRequest(); // ARMAR EL REQUEST PARA CREAR PERFIL CLAROID
            console.log('Correo válido para seguir con el proceso de creación de CLAROID: ', activateData);
            this.personservice.initTaskStandaloneCreateClaroIdAccount(activateData, this.proceso.processInstanceId).subscribe(
              createClaroIdAccountResponse => {
                console.debug("createClaroIdAccountResponse ->", createClaroIdAccountResponse);
                if (createClaroIdAccountResponse.code == "200") { // oOK
                  this.hideLoadingPage();
                  this.showSuccessModal(createClaroIdAccountResponse.message);
                  this.stepStandAlone = 2;

                } else if (createClaroIdAccountResponse.code == "422") {
                  this.personservice.getProfileBySubscriberId(this.standAlone.subscriptionId).subscribe(
                    getProfileBySubscriberIdResponse => {
                      console.debug("getProfileBySubscriberId ->", getProfileBySubscriberIdResponse);
                      let arrayProfile: any[] = getProfileBySubscriberIdResponse;
                      if (arrayProfile.length > 0 && arrayProfile[0].claroID != null) {
                        this.correoCliente = arrayProfile[0].claroID;
                        this.personservice.finishTaskStandaloneCreateClaroIdAccount(this.proceso.processInstanceId).subscribe(
                          finishTaskResponse => {
                            console.debug("finishTaskResponse ->", finishTaskResponse);
                            this.hideLoadingPage();
                            this.showSuccessModal(getProfileBySubscriberIdResponse.message);
                            this.stepStandAlone = 2;

                          }, finishTaskError => {
                            console.error(finishTaskError);
                            this.hideLoadingPage();
                            this.showErrorModal('Ocurrió un error, durante la finalización de la tarea de registro de correo');                            
                          }
                        );
                      } else {
                        this.hideLoadingPage();
                        this.showErrorModal('Ocurrió un error, no se pudo crear un perfil asociado a este correo. \nDurante la creación del perfil se reportó que el subscriberId ya tenía un correo registrado sin embargo, no se halló ningún perfil para este subscriber ');
                      }
                    }, getProfileBySubscriberIdError => {
                      console.error(getProfileBySubscriberIdError);
                      this.hideLoadingPage();
                      this.showErrorModal('Ocurrió un error, no se pudo crear un perfil asociado a este correo. \nDurante la creación del perfil se reportó que el subscriberId ya tenía un correo registrado sin embargo, durante la búsqueda del perfil ocurrió un error');
                    }
                  );
                } else {
                  this.hideLoadingPage();
                  this.showErrorModal(createClaroIdAccountResponse.message);                  
                }
              }, createClaroIdAccountError => {
                console.error(createClaroIdAccountError)
                this.hideLoadingPage();
                this.showErrorModal('Ocurrió un error, no se pudo crear el perfil asociado a este correo');
              }
            );
            break;

          default:
            this.hideLoadingPage();
            this.showErrorModal('Ocurrió un error al momento de validar este correo');
            break;
        }
      }, error => {
        console.debug(error);
        this.hideLoadingPage();
        this.showErrorModal('Ocurrio un error al momento de validar este correo');
      }
    );
  }

  loadClaroIdRequest(): any {
    let addr = [];
    addr.push(
      {
        city: this.customer.contactInformation.district,
        state: this.customer.contactInformation.province,
        street1: this.customer.contactInformation.addressLine1,
        street2: this.customer.contactInformation.addressLine2,
        type: "Home"
      }
    );
    let request = {
        birthDate: this.customer.personalInformation.birthday,
        claroID: this.correoCliente,
        address: addr,
        country: this.customer.contactInformation.country,
        channel: "Claro-Video",
        firstName: this.customer.personalInformation.fullName,
        identificationId: this.customer.personalInformation.identificationNumber,
        identificationType: this.customer.personalInformation.identificationType,
        lastName: this.customer.personalInformation.fullName,
        serviceNumber: this.proceso.processInstanceVariables.serviceNumber,
        subscriberId: this.standAlone.subscriptionId,
        detailsOffer: this.standAlone.offer
    }
    return request;      
  }

  showAcceptTermsModal() {
    this.acceptTermsMessage = true;
  }

  acceptTerms() {
    this.acceptTermsMessage = false;
    this.modalAdvertencia = true;
  }

  activaClaroVideo() {
    this.modalAdvertencia = false; // cerrar el modal
    this.showLoadingPage();
    this.stepStandAlone = 3;

    this.personservice.initTaskStandaloneActivateService(this.proceso.processInstanceId).subscribe(
      activateServiceResponse => {
        console.debug(activateServiceResponse);
        if (activateServiceResponse.code == "200") {
          this.hideLoadingPage();
          this.showSuccessModal(activateServiceResponse.message);
          this.activacionOk = true;

        } else {
          this.hideLoadingPage();
          this.showErrorModal(activateServiceResponse.message);

        }
      }, activateServiceError => {
        console.error(activateServiceError);
        this.hideLoadingPage();
        this.showErrorModal('Ocurrio un error al momento de activar claro video');

      }
    );
  }


  hideModal() {
    this.showModal = false;
    console.debug("ocultar dialog");
    if (this.activacionOk) {
      this.showLoadingPage();
      setTimeout(() => {
        this.hideLoadingPage();
        this._location.back();
      }, 1000);
    }
  }

  showLoadingPage(){
    this.loadinpageClick({
      isProcess: true,
      aProgressSpinner: true
    });
  }

  hideLoadingPage(){
    this.loadinpageClick({
      isProcess: false,
      aProgressSpinner: false
    });
  }

  showSuccessModal(message: string) {
    this.modal = {
      message: message,
      type: 'SUCCESS'
    };
    this.showModal = true;
  }

  showErrorModal(message: string) {
    this.modal = {
      message: message,
      type: 'ERROR'
    };
    this.showModal = true;
  }

}


