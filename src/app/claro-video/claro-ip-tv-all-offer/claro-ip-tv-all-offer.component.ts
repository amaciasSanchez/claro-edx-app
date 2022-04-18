import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
    ConfirmCustomOfferRequest,
    GetCustomOfferRequest,
    GetCustomOfferResponse,
    IptvService, Offer,
    SessionUserIptv
} from 'src/app/b2e/claroup/service/iptv.service';

@Component({
    selector: 'app-claro-ip-tv-all-offer',
    templateUrl: './claro-ip-tv-all-offer.component.html',
    styleUrls: ['./claro-ip-tv-all-offer.component.css']
})
export class ClaroIpTvAllOfferComponent implements OnInit {

    offers: Offer[];

    responsiveOptions;
    activarpopover: any;
    desc: string;
    name: string;
    price: string;
    deviceoneCategory: string;
    deviceone: string;
    devicetwo: string;
    devicetwoCategory: string;

    constructor(private router: Router, private iptvservicio: IptvService) {
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

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
    acceptBestOffer: false;

    async ngOnInit() {
        this.clientDataLocalStorage = await this.iptvservicio.getSessionUserIPTV();
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 1) {
            await this.executeTaskGetCustomAllOffers();
        } else {
            const responseVariables = await this.iptvservicio
                .getVariablesByProcessInstanceId(localStorage.getItem('processInstanceIdIpTv'));
            this.offers = responseVariables.customOffers;
            console.log(responseVariables.selectedOffer.offerName + 'Respuesta')

            this.desc = responseVariables.selectedOffer.offerDescription;
            this.name = responseVariables.selectedOffer.offerName;
            this.price =responseVariables.selectedOffer.priceTotal;
            this.deviceoneCategory = responseVariables.selectedOffer.products[0].productId;
            this.devicetwoCategory = responseVariables.selectedOffer.products[1].productId;
            this.deviceone = responseVariables.selectedOffer.products[0].shortName;
            this.devicetwo = responseVariables.selectedOffer.products[1].shortName;

        }
    }

    async executeTaskGetCustomAllOffers() {
        try {
            const getCustomOfferRequest: GetCustomOfferRequest = {
                processInstanceId: localStorage.getItem('processInstanceIdIpTv')
            };
            const resp: GetCustomOfferResponse = await this.iptvservicio.getCustomOffers(getCustomOfferRequest);
            console.log(resp, 'ofertas');
            this.offers = resp.customOffers;
        } catch (error) {
            console.log('Error');
            this.showModal('ERROR', error.message);
        }
    }

    async executeTaskConfirmCustomOffers(_selectedOffer: Offer) {
        if (!_selectedOffer) {
            this.showModal('Error', 'No ha seleccionado una oferta para activar');
            return;
        } else if ((await this.iptvservicio.checkNextPage(this.router.url)) === 2) {
            try {
                const confirmCustomOfferRequest: ConfirmCustomOfferRequest = {
                    processInstanceId: localStorage.getItem('processInstanceIdIpTv'),
                    customOfferCode: _selectedOffer.offerCode
                };
                const resp = await this.iptvservicio.confirmCustomOffers(confirmCustomOfferRequest);
                console.log(resp);
                this.iptvservicio.checkNextPage(this.router.url);
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
    btnEntendido(event: any) {
        this.activarpopover = event.closeOverlay;
      }
    
      
    ocultar() {
        this.activarpopover = false;
    }
    activarOverlay() {
        this.activarpopover = !this.activarpopover;
    }
}

