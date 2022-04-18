import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { IptvService, SessionUserIptv} from '../../b2e/claroup/service/iptv.service';

@Component({
    selector: 'app-claro-ip-tv-summary',
    templateUrl: './claro-ip-tv-summary.component.html',
    styleUrls: ['./claro-ip-tv-summary.component.css']
})
export class ClaroIpTvSummaryComponent implements OnInit {
    activarpopover: any;
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

    name: any ;
    lastname: any;
    ci: any;
    plan: any;
    plandescription: any;
    plancost: any;
    direction: any;
    directionC: any;
    devices: any;
    pay: any;
    contract: any;
    contractDesc: any;

    clientDataLocalStorage: SessionUserIptv;
    constructor(private router: Router, private iptvservicio: IptvService) { }

    async ngOnInit() {
        this.clientDataLocalStorage = await this.iptvservicio.getSessionUserIPTV();

        const responseVariables = await this.iptvservicio
            .getVariablesByProcessInstanceId(localStorage.getItem('processInstanceIdIpTv'));
        console.log('toda esta es informacion de la instancia');
        console.log(responseVariables);
        if (responseVariables) {
            // this.name = responseVariables.claroIdProfile.firstName;
            this.name = this.clientDataLocalStorage.personalInformation.fullName;
            this.lastname = responseVariables.claroIdProfile.lastName;
            this.ci = responseVariables.identificationNumber;
            this.plan = responseVariables.bestOffer.offerName;
            this.plandescription = responseVariables.bestOffer.offerDescription;
            this.plancost = `${responseVariables.bestOffer.priceTotal} incluido impuestos` ;
            this.directionC = responseVariables.addressSelected.cityDescription;
            this.direction = responseVariables.addressSelected.fullAddress;
            this.devices = responseVariables.devicesToInstall[0].shortName + ' - '
                + responseVariables.devicesToInstall[1].shortName
                + (responseVariables.numberOfDecoders && responseVariables.numberOfDecoders !== '0' ?
                    (' ' + ' + ' + + responseVariables.numberOfDecoders + ' dispositivo(s) '
                        + responseVariables.devicesToInstall[0].shortName) + ' adicionales' : '');
            this.contract = responseVariables.selectedPaymentMethod.characteristics[0].value;
            this.contractDesc = responseVariables.iptvPaymentMethods[0].subscriptionType;
            this.pay = responseVariables.selectedPaymentMethod.paymentMethod.paymentMethodType;
        } else {
            console.log('Error');
            this.showModal('ERROR', 'No existen datos de procedimiento activos');
            return;
        }

        console.log(this.name , '', this.lastname , '' , this.ci, '', this.plan);

    }

    async executeTaskConfirmProductOrder() {
        await this.iptvservicio.checkNextPage(this.router.url);
        console.log('confirm best offer');
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 2) {
            try {
                const resp = await this.iptvservicio
                    .confirmProductOrder(localStorage.getItem('processInstanceIdIpTv'));
                this.activarOverlay();
                console.log(resp);
            } catch (error) {
                console.log('Error');
                this.showModal('ERROR', error.message);
            }
        }
    }


    btnEntendido(event: any) {
        this.router.navigate(['/bestoffer']);
    }

    activarOverlay() {
        this.activarpopover = !this.activarpopover;
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

}
