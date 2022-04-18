import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
    AddressIptv,
    City,
    IptvService,
    SessionUserIptv
} from '../../b2e/claroup/service/iptv.service';

@Component({
  selector: 'app-claro-ip-tv-adrress',
  templateUrl: './claro-ip-tv-adrress.component.html',
  styleUrls: ['./claro-ip-tv-adrress.component.css']
})
export class ClaroIpTvAdrressComponent implements OnInit {

    cities: City[];
    comboCities: City[] = [];
    comboAddress: AddressIptv[] = [];
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
    clientDataLocalStorage: SessionUserIptv;
    selectedAddress: AddressIptv;
    selectedCity: City;
    addressList: AddressIptv[];

    constructor(private router: Router, private iptvservicio: IptvService) { }

    async ngOnInit() {
        this.clientDataLocalStorage = await this.iptvservicio.getSessionUserIPTV();
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 1) {
            await this.executeTaskSelectInstallAddress();
        } else {
            const responseVariables = await this.iptvservicio
                .getVariablesByProcessInstanceId(localStorage.getItem('processInstanceIdIpTv'));
            console.log(responseVariables.cities);
            this.cities = responseVariables.cities;
            this.comboCities = responseVariables.cities;
        }
    }

    async loadAddress($event) {
        // event.query
        if (this.selectedCity.addresses) {
            this.addressList = this.selectedCity.addresses;
        }
    }

    async selectCity($event) {
        // event.query
        if (this.selectedCity && this.selectedCity.addresses) {
            this.comboAddress = this.selectedCity.addresses;
        }
    }

    search(event) {
        console.log('ingresa a buscar ciudad ' + event.query);
        if (this.cities) {
            this.comboCities = this.cities.filter(c => c.cityDescription.toLocaleUpperCase().includes(event.query.toLocaleUpperCase()));
        }
    }

    async executeTaskSelectInstallAddress() {
        try {
            const resp = await this.iptvservicio.getInstallationAddress(localStorage.getItem('processInstanceIdIpTv'));
            console.log(resp);
            this.cities = resp.cities;
            this.comboCities = resp.cities;
            await this.iptvservicio.checkNextPage(this.router.url);
        } catch (error) {
            console.log('Error');
            this.showModal('ERROR', error.message);
        }
    }

    async executeTaskConfirmInstallAddress() {
        await this.iptvservicio.checkNextPage(this.router.url);
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 2) {
            try {
                const resp = await this.iptvservicio.confirmInstallationAdresses(
                    localStorage.getItem('processInstanceIdIpTv'),
                    this.selectedAddress.standardAddressId);
                console.log(resp);
                await this.iptvservicio.checkNextPage(this.router.url);
            } catch (error) {
                console.log('Error');
                this.showModal('ERROR', error.message);
            }
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
        await this.executeTaskConfirmInstallAddress();
    }

}
