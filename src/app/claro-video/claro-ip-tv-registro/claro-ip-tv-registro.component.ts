import {
    CivilRegisterResponse,
    ClaroIdDataRequest,
    DataClaroId,
    InstanciateBusinessProcessResponse,
    InstanciateProcessRequest,
    IptvService, SessionUserIptv
} from '../../b2e/claroup/service/iptv.service';
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-claro-ip-tv-registro',
    templateUrl: './claro-ip-tv-registro.component.html',
    styleUrls: ['./claro-ip-tv-registro.component.css']
})
export class ClaroIpTvRegistroComponent implements OnInit {

    // con esto identificare cual pagina ha sido ejecutada o no
    modal: any = {
        message: '',
        type: '',
        visible: false
    };
    modalWithAction: any = {
        message: '',
        type: '',
        visible: false
    };
    foreignUser = false;
    editableFields = false;
    clientDataLocalStorage: SessionUserIptv;
    cliente: any = {
        nacionalidad: '',
        identificacion: '',
        tipoIdentificacion: '',
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        telefono: '',
        mail: ''
    };

    constructor(private router: Router, private iptvservicio: IptvService) {
    }

    async ngOnInit() {
        this.clientDataLocalStorage = await this.iptvservicio.getSessionUserIPTV();
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 1) {
            if (this.clientDataLocalStorage) {
                if (this.clientDataLocalStorage.personalInformation.identificationType === 'PAS'
                    || this.clientDataLocalStorage.personalInformation.identificationType === 'RUC') {
                    this.foreignUser = true;
                }
            }
            await this.iptvservicio.initIptvPage();
        } else {
            const responseVariables = await this.iptvservicio
                .getVariablesByProcessInstanceId(localStorage.getItem('processInstanceIdIpTv'));
            if (responseVariables.claroIdProfile) {
                this.cliente.nombres = responseVariables.claroIdProfile.firstName;
                this.cliente.telefono = responseVariables.claroIdProfile.serviceNumber;
                this.cliente.fechaNacimiento = responseVariables.claroIdProfile.birthDate;
                this.cliente.apellidos = responseVariables.claroIdProfile.lastName;
                // clariID es el mail
                this.cliente.mail = responseVariables.claroIdProfile.claroID;
            }
            this.cliente.nacionalidad = responseVariables.nationality;
            this.cliente.identificacion = responseVariables.identificationNumber;
            this.cliente.customerId = responseVariables.customerId;
            this.cliente.tipoIdentificacion = responseVariables.identificationType;
        }
    }

    async buscar() {
        if (!this.foreignUser) {
            console.log('Entro en buscar: ', this.cliente.identificacion);
            try {
                const resp: CivilRegisterResponse = await this.iptvservicio.getCustomerData(this.cliente.identificacion);
                this.cliente.fechaNacimiento = resp.birthday;
                this.cliente.nacionalidad = resp.nationality;
                const fullName = resp.fullName.split(' ');
                if (fullName.length === 4) {
                    this.cliente.nombres = `${fullName[0]} ${fullName[1]}`;
                    this.cliente.apellidos = `${fullName[2]} ${fullName[3]}`;
                }
            } catch (error) {
                console.log('Error');
                this.showModal('ERROR', error.message);
            }
        } else {
            this.showModal('ERROR', 'El usuario es extranjero, no es necesario consultar la información al Registro Civil');
        }
    }

    async executeTaskEnterClaroIdData() {
        await this.iptvservicio.checkNextPage(this.router.url);
        if (!this.iptvservicio.checkEmail(this.cliente.mail)) {
            this.showModal('ERROR', 'El correo enviado no es enviado');
            return;
        }
        if (!this.cliente.nombres) {
            this.showModal('ERROR', 'Los nombres del cliente son obligatorios');
            return;
        }
        if (!this.cliente.apellidos) {
            this.showModal('ERROR', 'Los apellidos del cliente son obligatorios');
            return;
        }
        if (!this.cliente.fechaNacimiento) {
            this.showModal('ERROR', 'La fecha de nacimiento es obligatoria');
            return;
        }
        if (!this.cliente.telefono) {
            this.showModal('ERROR', 'El teléfono del cliente es obligatorios');
            return;
        }
        if (!this.cliente.nacionalidad) {
            this.showModal('ERROR', 'La nacionalidad del cliente es obligatoria');
            return;
        }
        if (!this.cliente.identificacion) {
            this.showModal('ERROR', 'La identificacion del cliente es obligatoria');
            return;
        }
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 2) {
            try {
                const _data: DataClaroId = {
                    identificationType: this.clientDataLocalStorage.personalInformation.identificationType,
                    identificationId: this.clientDataLocalStorage.personalInformation.identificationNumber,
                    firstName: this.cliente.nombres,
                    lastName: this.cliente.apellidos,
                    country: this.clientDataLocalStorage.contactInformation.country,
                    serviceNumber: this.cliente.telefono,
                    addressState: this.clientDataLocalStorage.contactInformation.province,
                    addressCity: this.clientDataLocalStorage.contactInformation.district,
                    // addressType: this.clientDataLocalStorage.contactInformation,
                    addressType: 'Home',
                    addressStreet1: this.clientDataLocalStorage.contactInformation.addressLine1,
                    addressStreet2: this.clientDataLocalStorage.contactInformation.addressLine2,
                    birthDate: this.cliente.fechaNacimiento,
                    claroID: this.cliente.mail,
                    contactMediumEnable: true,
                    contactMediumType: this.cliente.telefono,
                    contactMediumValue: null
                };
                const claroIdDataRequest: ClaroIdDataRequest = {
                    processInstanceId: localStorage.getItem('processInstanceIdIpTv'),
                    data: _data,
                    nationality: this.cliente.nacionalidad
                };
                const resp = await this.iptvservicio
                    .enterClaroIdData(claroIdDataRequest);
                console.log(resp);
                const message = `Listo, hemos enviado un correo a tu cliente a la dirección ${this.cliente.mail}.
                Informa a tu cliente que debe completar el proceso de creación de cuenta CLARO ID en www.claro.com/claroid`;
                this.showModalWithAction('MAIL', message);
            } catch (error) {
                console.log('Error');
                this.showModal('ERROR', error.message);
            }
        } else {
            await this.iptvservicio.checkNextPage(this.router.url);
        }
    }

    showModal(_type: string, _message: string) {
        this.modal = {
            message: _message,
            type: _type,
            visible: true
        };
    }

    showModalWithAction(_type: string, _message: string) {
        this.modalWithAction = {
            message: _message,
            type: _type,
            visible: true
        };
    }

    hideModal() {
        this.modal.visible = false;
    }

    async continue() {
        console.log('Entro en el metodo continnuar siguiente pantalla');
        await this.iptvservicio.checkNextPage(this.router.url);
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

}
