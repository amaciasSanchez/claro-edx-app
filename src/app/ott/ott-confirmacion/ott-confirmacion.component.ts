import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IptvService, SessionUserIptv } from 'src/app/b2e/claroup/service/iptv.service';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { PaymentMethod } from 'src/app/customer/modelo/paymentMethod.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
import { ClaroIdProfile } from '../modelos/ClaroIdProfile';
import { OttOffers } from '../modelos/OttOffers';
import { OttServiceService, Profile } from '../servicios/ott-service.service';

@Component({
  selector: 'app-ott-confirmacion',
  templateUrl: './ott-confirmacion.component.html',
  styleUrls: ['./ott-confirmacion.component.css']
})
export class OttConfirmacionComponent implements OnInit {

  public claroIdProfile: Profile;
  public user: string;
  public offer: OttOffers;
  public previousOffer: OttOffers;
  public pyamentMethod: PaymentMethod;
  public customer: Customer;
  public activacionOk: boolean = false;
  public aProgressSpinner = false;
  public isProcess = false;
  public showModal = false;
  public modal: any = {
    message: "",
    type: "",
    modal: false
  };

  name: any = 'Alejandra';
  lastname: any = 'Baquerizo Romero';
  ci: any = '0929384758';
  plan: any = 'OTT Entry';
  plandescription: any = 'Aquí debe salir la descripcion del plan';
  plancost: any = '20 mensuales incluido impuestos';
  direction: any;
  directionC: any;
  devices: any;
  pay: any = 'Mastercard *************56';
  contract: any = 'Cuenta ABC93845';
  contractDesc: any = 'Servicio Móvil Pospago';

  constructor(private router: Router, 
      private customerInformationService: CustomerInformationService,
      private _ottService: OttServiceService) { }

  async ngOnInit() {
    this.user = sessionStorage.getItem("user");
    this.claroIdProfile = this._ottService.getProfile();
    this.pyamentMethod = this._ottService.getOttPaymentMethod();
    this.offer = this._ottService.getOfferOtt();
    this.previousOffer = this._ottService.getPreviousOfferOtt();
    this.customer = this.customerInformationService.getCustomerInformation();

    this.name = this.claroIdProfile.nombres;
    this.lastname = this.claroIdProfile.apellidos;
    this.ci = this.claroIdProfile.identificacion;
    this.plan = this.offer.offeringName;
    this.plandescription = this.offer.featuresDescription;
    this.plancost = `${this.offer.priceTotal} incluido impuestos`;
    this.contract = this.pyamentMethod.contractId;
    this.contractDesc = this.pyamentMethod.bank;
    this.pay = this.pyamentMethod.serviceDescription;
    
  }

  public confirm() {
    console.log(this.previousOffer);
    let priceTotalFinal:number =Number(this.offer.priceTotal);
    // realizar validacion de pasos previos
    this.previousValidate();
    // validar el priceTotal de la oferta seleccionada
    // si es mayo a 0, continua flujo normal
    // caso contrario, solo activacion (es oferta promocional)
    if(priceTotalFinal > 0){
      if(this.previousOffer && this.previousOffer != null) {
        this.changeOffer();
      } else {
        this.activate();
      }
    }else{
      this.activate();
    }

    


  }

  public activate() {
    this.showLoadingPage();
    let activateRequest: any = {
      "user": this.user,
      "subProductId": this.pyamentMethod.subproductId,
      "serviceNumber": this.claroIdProfile.telefono,
      "totalAmount": this.offer.priceTotal,
      "customer": {
        "identificationNumber": this.claroIdProfile.identificacion,
        "identificationType": this.claroIdProfile.tipoIdentificacion,
        "name": this.claroIdProfile.nombres,
        "lastName": this.claroIdProfile.apellidos,
        "fullName": (this.claroIdProfile.nombres + " " + this.claroIdProfile.apellidos),
        "email": this.claroIdProfile.mail,
        "customerId": this.customer.customerId
      },
      "offer": {
        "offeringId": this.offer.offeringId,
        "offeringCode":this.offer.offeringCode,
        "canonicalOfferId":this.offer.offerCodeAmco,
        "offeringCategory":this.offer.offeringCategory,
        "offeringName":this.offer.offeringName,
        "offeringPrice":this.offer.priceTotal
      }      
    }
    this._ottService.activateOffer(activateRequest)
    .subscribe(
      activateServiceResponse => {
        console.debug(activateServiceResponse);
        if (activateServiceResponse.code == "200") {
          this.hideLoadingPage();
          let message = ("La oferta " + this.offer.offeringName
          + " fue activada correctamente para el número de servicio " + this.claroIdProfile.telefono);
          this.showSuccessModal(message);
          this.activacionOk = true;

        } else {
          this.showErrorModalAndHideLoadingPage(activateServiceResponse.message);

        }
      }, activateServiceError => {
        console.error(activateServiceError);
        this.showErrorModalAndHideLoadingPage('Ocurrio un error al momento de activar la oferta. ' + activateServiceError.error.message);

      }
    );
  }

  public changeOffer() {
    this.showLoadingPage();
    
    let activateRequest: any = {
      "user": this.user,
      "subProductId": this.pyamentMethod.subproductId,
      "serviceNumber": this.claroIdProfile.telefono,
      "totalAmount": this.offer.priceTotal,
      "customer": {
        "customerOtt": this.claroIdProfile.id,
        "identificationNumber": this.claroIdProfile.identificacion,
        "identificationType": this.claroIdProfile.tipoIdentificacion,
        "name": this.claroIdProfile.nombres,
        "lastName": this.claroIdProfile.apellidos,
        "fullName": (this.claroIdProfile.nombres + " " + this.claroIdProfile.apellidos),
        "email": this.claroIdProfile.mail,
        "customerId": this.customer.customerId
      },
      "offer": {
        "offeringId": this.offer.offeringId,
        "offeringCode":this.offer.offeringCode,
        "offeringCategory":this.offer.offeringCategory,
        "offeringName":this.offer.offeringName,
        "offeringPrice":this.offer.priceTotal,
        "canonicalOfferId":this.offer.offerCodeAmco
      },
      "previousOffer": {
        "offeringId": this.previousOffer.offeringId,
        "offeringCode":this.previousOffer.offeringCode,
        "offeringCategory":this.previousOffer.offeringCategory,
        "offeringName":this.previousOffer.offeringName,
        "offeringPrice":this.previousOffer.priceTotal,
        "canonicalOfferId":this.previousOffer.offerCodeAmco
      }      
    }
    this._ottService.changeOffer(activateRequest)
    .subscribe(
      activateServiceResponse => {
        console.debug(activateServiceResponse);
        if (activateServiceResponse.code == "200") {
          this.hideLoadingPage();
          let message = ("La oferta " + this.offer.offeringName
          + " fue activada correctamente para el número de servicio " + this.claroIdProfile.telefono);
          this.showSuccessModal(message);
          this.activacionOk = true;

        } else {
          this.showErrorModalAndHideLoadingPage(activateServiceResponse.message);

        }
      }, activateServiceError => {
        console.error(activateServiceError);
        this.showErrorModalAndHideLoadingPage('Ocurrio un error al momento de activar la oferta. ' + activateServiceError.error.message);

      }
    );
  }

  previousValidate(){
    if(!this.offer) {
      this.showErrorModalAndHideLoadingPage("No ha seleccionado una oferta, por favor seleccione la oferta");
      return;
    }
    if(!this.claroIdProfile) {
      this.showErrorModalAndHideLoadingPage("No ha registrado el perfil Claro ID del cliente, por favor registre el perfil Claro ID del cliente");
      return;
    }
    if(!this.pyamentMethod) {
      this.showErrorModalAndHideLoadingPage("No ha seleccionado la forma de pago del cliente, por favor seleccione la forma de pago del cliente");
      return;
    }
  }
  
  hideModal() {
    this.showModal = false;
    console.debug("ocultar dialog");
    if (this.activacionOk) {
      this.router.navigate(['/bestoffer']);
    }
  }

  loadinpageClick(data: any) {
    console.debug("data", data);
    this.isProcess = data.isProcess;
    this.aProgressSpinner = data.aProgressSpinner;
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

  showSuccessModal(_message: string) {
    this.modal = {
      message: _message,
      type: 'SUCCESS'
    };
    this.showModal = true;
  }

  showErrorModal(_message: string) {
    this.modal = {
      message: _message,
      type: 'ERROR'
    };
    this.showModal = true;
  }

  showErrorModalAndHideLoadingPage(_message: string) {
    this.modal = {
      message: _message,
      type: 'ERROR'
    };
    this.showModal = true;
    this.hideLoadingPage();
  }

}
