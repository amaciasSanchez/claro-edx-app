import { Router } from '@angular/router';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {
    ConfirmPaymentMethodRequest,
    GetPaymentMethodsRequest,
    GetPaymentMethodsResponse, IPTVPaymentMethods,
    IptvService, Offer, SessionUserIptv
} from '../../b2e/claroup/service/iptv.service';

@Component({
    selector: 'app-claro-ip-tv-best-pay',
    templateUrl: './claro-ip-tv-best-pay.component.html',
    styleUrls: ['./claro-ip-tv-best-pay.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ClaroIpTvBestPayComponent implements OnInit {

    selectedValue: string;
    activarpopover = false;
    @Input() offer: any = {};

    paymentMethods: PayCard[] = [];
    responsiveOptions;

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
    desc: string;
    name: string;
    price: string;
    device1: string;
    deviceone: string;
    devicetwo: string;
    deviceoneCategory: string;
    devicetwoCategory: string;

    constructor(private router: Router, private iptvservicio: IptvService) {
        this.responsiveOptions = [
            {
                breakpoint: '1080px',
                numVisible: 2,
                numScroll: 2
            }, {
                breakpoint: '1024px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '768px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '480px',
                numVisible: 1,
                numScroll: 1
            }
        ];

    }

    async ngOnInit() {
        this.clientDataLocalStorage = await this.iptvservicio.getSessionUserIPTV();
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 1) {
            await this.executeTaskGetPaymentMethods();
            const responseVariables = await this.iptvservicio
                .getVariablesByProcessInstanceId(localStorage.getItem('processInstanceIdIpTv'));
            await this.fillOfferData(responseVariables.selectedOffer);
        } else {
            const responseVariables = await this.iptvservicio
                .getVariablesByProcessInstanceId(localStorage.getItem('processInstanceIdIpTv'));
            await this.fillPaymentInformation(responseVariables.iptvPaymentMethods);
            await this.fillOfferData(responseVariables.selectedOffer);
            console.log(responseVariables.selectedOffer);
        }
    }

    async fillOfferData(selectedOffer: Offer) {
        console.log('datos de la oferta ↓');
        console.log(selectedOffer);
        if (selectedOffer) {
            this.desc = selectedOffer.offerDescription;
            this.name = selectedOffer.offerName;
            this.price = selectedOffer.priceTotal;
            this.deviceoneCategory = selectedOffer.products[0].productId;
            this.devicetwoCategory = selectedOffer.products[1].productId;
            this.deviceone = selectedOffer.products[0].shortName;
            this.devicetwo = selectedOffer.products[1].shortName;
        }
    }

    setSelectedValue(id) {
        console.log('valorseleccionado');
        this.selectedValue = id;
    }

    btnEntendido(event: any) {
        console.log('btnentendido');
        this.activarpopover = event.closeOverlay;
    }

    ocultar() {
        this.activarpopover = false;
    }
    activarOverlay() {
        this.activarpopover = !this.activarpopover;
    }



    async executeTaskGetPaymentMethods() {
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 1) {
            try {
                const getPaymentMethodsRequest: GetPaymentMethodsRequest = {
                    processInstanceId: localStorage.getItem('processInstanceIdIpTv')
                };
                const paymentMethodsResponse: GetPaymentMethodsResponse =
                    await this.iptvservicio.getPaymentMethods(getPaymentMethodsRequest);
                await this.fillPaymentInformation(paymentMethodsResponse.paymentMethods);
            } catch (error) {
                console.log('Error');
                this.showModal('ERROR', error.message);
            }
        }
    }

    async fillPaymentInformation(_paymentMethods: IPTVPaymentMethods[]) {
        console.log('datos de las formas de pago ↓');
        console.log(_paymentMethods);
        if (_paymentMethods) {
            for (const _paymentMethod of _paymentMethods) {
                const payCard: PayCard = {
                    check: false,
                    id: _paymentMethod.subscriptionId,
                    paymentRow: []
                };
                const rowSubscription = {
                    icon: 'assets/images/claroVideo/wifi.png',
                    nombre: _paymentMethod.subscriptionType,
                    detalle: _paymentMethod.subscriptionId,
                };
                const rowContract = {
                    icon: 'assets/images/claroVideo/factura.png',
                    nombre: '',
                    detalle: _paymentMethod.contractId,
                };
                const rowPayment = {
                    icon: 'assets/images/claroVideo/wifi.png',
                    nombre: _paymentMethod.paymentMethodId,
                    detalle: _paymentMethod.paymentMethodType,
                };
                if (_paymentMethod.paymentMethodId === '8001') {
                    rowPayment.icon = 'assets/images/claroVideo/banco.png';
                } else {
                    rowPayment.icon = 'assets/images/claroVideo/card.png';
                }
                const rowDate = {
                    icon: 'assets/images/claroVideo/calendario.png',
                    nombre: '',
                    detalle: _paymentMethod.subscriptionDate,
                };
                const rowOffer = {
                    icon: 'assets/images/claroVideo/gift.png',
                    nombre: '',
                    detalle: _paymentMethod.offer,
                };
                payCard.paymentRow.push(rowSubscription);
                payCard.paymentRow.push(rowContract);
                payCard.paymentRow.push(rowPayment);
                payCard.paymentRow.push(rowDate);
                payCard.paymentRow.push(rowOffer);
                this.paymentMethods.push(payCard);
            }
        }
    }

    async executeTaskConfirmPaymentMethods() {
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 2) {
            if (!this.selectedValue) {
                this.showModal('ERROR', 'No hay subscripcion seleccionada');
                return;
            }
            try {
                const confirmPaymentMethodRequest: ConfirmPaymentMethodRequest = {
                    processInstanceId: localStorage.getItem('processInstanceIdIpTv'),
                    subscriptionId: this.selectedValue
                };
                const resp = await this.iptvservicio.confirmPaymentMethod(confirmPaymentMethodRequest);
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
        if (!this.selectedValue) {
            this.showModal('ERROR', 'No hay subscripcion seleccionada');
            return;
        }
        await this.executeTaskConfirmPaymentMethods();
        await this.iptvservicio.checkNextPage(this.router.url);
    }
}

export interface PayCard {
    paymentRow: LineCard[];
    check: boolean;
    id: string;
}

export interface LineCard {
    icon: string;
    nombre: string;
    detalle: string;
}
