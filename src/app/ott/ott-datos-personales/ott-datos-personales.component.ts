import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CivilRegisterResponse, ClaroIdDataRequest, DataClaroId, IptvService, SessionUserIptv } from 'src/app/b2e/claroup/service/iptv.service';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { PaymentMethod } from 'src/app/customer/modelo/paymentMethod.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
import { ClaroIdProfile } from '../modelos/ClaroIdProfile';
import { OttServiceService, Profile } from '../servicios/ott-service.service';

@Component({
  selector: 'app-ott-datos-personales',
  templateUrl: './ott-datos-personales.component.html',
  styleUrls: ['./ott-datos-personales.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class OttDatosPersonalesComponent implements OnInit {

  public customer: Customer;
  public paymentMethod: PaymentMethod;
  public profile: Profile = {};
  public aProgressSpinner = false;
  public isProcess = false;
  public showModal = false;
  public modal: any = {
    message: "",
    type: "",
    modal: false
  };
  
  constructor(private router: Router, 
      private iptvservicio: IptvService,
      private _ottService: OttServiceService,
      private customerInformationService: CustomerInformationService) {
  }

  async ngOnInit() {
    this.customer = <Customer> this.customerInformationService.getCustomerInformation();
    this.paymentMethod = <PaymentMethod> this._ottService.getOttPaymentMethod();
    this.profile = this._ottService.getProfile();
    console.log("Este es el perfil encontado: ", this.profile);
    if(this.profile == null) {
      this.profile = {};
      this.profile.initMessage = "Tu cliente no tiene un CLARO ID registrado. Para este producto necesitaras crearle uno.";
      this.profile.inconsistentDataFlags = {
        nacionality: false,
        identification: false,
        firstName: false,
        lastName: false,
        birthday: false
      }
      if(this.paymentMethod.technology === "MOBILE" /* || this.paymentMethod.technology.toLowerCase() === "cloud" */){
        await this.loadProfile();
      } else{
        await this.loadProfileFromClaroId({});
      } 
     
    }
  }

  async loadProfile() {
    this.showLoadingPage();
    this.customerInformationService.getClaroIdProfile(
      this._ottService.getOttPaymentMethod().serviceNumber
    ).then( 
        async (_claroIdProfile: ClaroIdProfile) => {
          console.log("Este es el perfil encontrado del cliente: ", _claroIdProfile);
          _claroIdProfile.identificationId = null;
          _claroIdProfile.birthDate = null;
          await this.loadProfileFromClaroId(_claroIdProfile);
        }
    ).catch(
        ex => {
          this.showErrorModalAndHideLoadingPage(JSON.stringify(ex));  
        }
    ).finally(
        async () => {
          this.hideLoadingPage();
        }
    );
  }

  async loadProfileFromClaroId(_claroIdProfile: ClaroIdProfile) {
    if(_claroIdProfile) {
      if(!this.isBlank(_claroIdProfile.profileId)) {
        this.profile.exist = true;
        this.profile.id = _claroIdProfile.profileId;
      }

      this.profile.telefono = this.paymentMethod.serviceNumber;
      this.profile.mail = _claroIdProfile.claroID;
      if(this.isBlank(this.profile.mail)){
        if(this.paymentMethod.technology === "MOBILE" /* || this.paymentMethod.technology.toLowerCase() === "cloud" */){
          this.profile.mail = this.customer.contactInformation.email;
        }else{
          this.profile.mail = "";
        }
        
      }
        

      if(!this.isBlank(_claroIdProfile.identificationId))
        this.profile.identificacion = _claroIdProfile.identificationId;
      else if(!this.isBlank(this.customer.personalInformation.identificationNumber))
        this.profile.identificacion = this.customer.personalInformation.identificationNumber;
      else
        this.profile.inconsistentDataFlags.identification = true;
      
      if(!this.isBlank(_claroIdProfile.identificationType))
        this.profile.tipoIdentificacion = _claroIdProfile.identificationType;
      else if(!this.isBlank(this.customer.personalInformation.identificationType))
        this.profile.tipoIdentificacion = this.customer.personalInformation.identificationType;
      
      if(!this.isBlank(_claroIdProfile.firstName))
        this.profile.nombres = _claroIdProfile.firstName;
      else if(!this.isBlank(this.customer.personalInformation.givenNames))
        this.profile.nombres = this.customer.personalInformation.givenNames;
      else
        this.profile.inconsistentDataFlags.firstName = true;
    
      if(!this.isBlank(_claroIdProfile.lastName))
        this.profile.apellidos = _claroIdProfile.lastName;
      else if(!this.isBlank(this.customer.personalInformation.familyNames))
        this.profile.apellidos = this.customer.personalInformation.familyNames;
      else
        this.profile.inconsistentDataFlags.lastName = true;
      
      if(!this.isBlank(_claroIdProfile.birthDate))
        this.profile.fechaNacimiento = _claroIdProfile.birthDate;
      else if(!this.isBlank(this.customer.personalInformation.birthday))
        this.profile.fechaNacimiento = this.customer.personalInformation.birthday;
      else
        this.profile.inconsistentDataFlags.birthday = true;

      if(this.profile.exist)
        this.profile.initMessage = "Tu cliente ya posee un CLARO ID registrado. Puedes continuar.";
      if(this.profile.exist && (this.profile.inconsistentDataFlags.identification
          || this.profile.inconsistentDataFlags.firstName || this.profile.inconsistentDataFlags.lastName
          || this.profile.inconsistentDataFlags.birthday))
        this.profile.initMessage = "Tu cliente ya posee un CLARO ID registrado, sin embargo, " +
          "algunos de los datos de tu cliente están incompletos, por favor complétalos para continuar.";

    }
  }

  async loadProfileFromCRM() {
    this.profile.initMessage = "Tu cliente no tiene un CLARO ID registrado. Para este producto necesitaras crearle uno.";
    this.profile.nacionalidad = this.customer.personalInformation.nationality;
    this.profile.identificacion = this.customer.personalInformation.identificationNumber;
    this.profile.tipoIdentificacion = this.customer.personalInformation.identificationType;
    this.profile.nombres = this.customer.personalInformation.givenNames;
    this.profile.apellidos = this.customer.personalInformation.familyNames;
    this.profile.fechaNacimiento = this.customer.personalInformation.birthday;
    this.profile.telefono = this.formatServiceNumber(this.paymentMethod.serviceNumber);
    this.profile.mail = this.customer.contactInformation.email;
  }

  //============ UTILITARIOS
  formatServiceNumber(_serviceNumber: string): string {
    let prefix = _serviceNumber.substring(0,3);
    let length = _serviceNumber.length;
    if(prefix == "593" && length === 12)
      _serviceNumber = _serviceNumber.substring(3,12)
    return _serviceNumber;
  }

  isBlank(value: string): boolean {
      return (!value || /^\s*$/.test(value));
  }

  async executeTaskEnterClaroIdData() {
    // await this.iptvservicio.checkNextPage(this.router.url);
    if (!this.profile.nombres) {
      this.showErrorModalAndHideLoadingPage( 'Los nombres del cliente son obligatorios');
      return;
    }
    if (!this.profile.apellidos) {
      this.showErrorModalAndHideLoadingPage( 'Los apellidos del cliente son obligatorios');
      return;
    }
    if (!this.profile.fechaNacimiento) {
      this.showErrorModalAndHideLoadingPage( 'La fecha de nacimiento es obligatoria');
      return;
    }
    if (!this.profile.telefono) {
      this.showErrorModalAndHideLoadingPage( 'El teléfono del cliente es obligatorios');
      return;
    }
    if (!this.profile.identificacion) {
      this.showErrorModalAndHideLoadingPage( 'La identificacion del cliente es obligatoria');
      return;
    }
    this.router.navigate(['ott-confirm']);
  }

  async continue() {
    this._ottService.setProfile(this.profile);
    if(!this.profile.exist) {
      if (!this.iptvservicio.checkEmail(this.profile.mail)) {
        this.showErrorModalAndHideLoadingPage( 'El correo enviado no es valido');
        return;
      } else {
        console.log("Validando email...");
        if(this.paymentMethod.technology === "MOBILE"){

          this._ottService.validateEmail(this.profile.mail).subscribe( response => {
            this.executeTaskEnterClaroIdData();
          }, error => {
            this.showErrorModalAndHideLoadingPage(error.error.message);
          });

        }else{
          let request: any = {
            "customerId":"",
            "emailNew":"",
            "serviceNumber":"",
            "subscriptionId":""
          }

          /* this._ottService.validateEmailProccessDelegation(request).subscribe( response => {
            this.executeTaskEnterClaroIdData();
          }, error => {
            this.showErrorModalAndHideLoadingPage(error.error.message);
          }); */

        }
      }
    } else {
      this.executeTaskEnterClaroIdData();
    }
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[0-9]\d*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/^[0-9]\d*$/g, "");
      // invalid character, prevent input
    }
  }

  hideModal() {
    this.showModal = false;
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

  showErrorModalAndHideLoadingPage(message: string) {
    this.modal = {
      message: message,
      type: 'ERROR'
    };
    this.showModal = true;
    this.hideLoadingPage();
  }

}
