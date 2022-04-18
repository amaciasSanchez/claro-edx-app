import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {ClaroVideoOfferService, Offer} from '../claro-video-offer/claro-video-offer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Location} from '@angular/common';
import {PersonService} from '../claroup/service/personservice';
import * as moment from 'moment';
import {EstadoProceso} from '../flujo-actual-claro-video/flujo-actual-claro-video.component';

import { Customer } from '../../customer/modelo/customer.model';
import { Subscription } from '../../customer/modelo/subscription.model';
import { PaymentMethod } from '../../customer/modelo/paymentMethod.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';

moment.locale('es');

@Component({
    selector: 'app-claro-video-pay',
    templateUrl: './claro-video-pay.component.html',
    styleUrls: ['./claro-video-pay.component.css'],
    styles: [`
    `],
    encapsulation: ViewEncapsulation.None,
    providers: [PersonService]

})
export class ClaroVideoPayComponent implements OnInit {
    selectedValue = 0;
    activarpopover: boolean = false;
    offer: any;
    option = 0;
    responsiveOptions;
    private customer: Customer;
    private subscriptions: Subscription[];

    selected: PaymentMethod;
    metodos = [];

    aProgressSpinner = false;
    isProcess = false;
    showModal = false;
    modal: any = {
        message: '',
        type: '',
        modal: false
    };

    constructor(
            private personservice: PersonService, 
            private activatedRoute: ActivatedRoute, 
            private _location: Location, 
            private _offerService: ClaroVideoOfferService, 
            private customerInformationService: CustomerInformationService,
            private router: Router) {
        this.responsiveOptions = [
            {
                breakpoint: '1240px',
                numVisible: 1,
                numScroll: 1
            }, {
                breakpoint: '1080px',
                numVisible: 1,
                numScroll: 1
            }, {
                breakpoint: '1024px',
                numVisible: 1,
                numScroll: 1
            }, {
                breakpoint: '768px',
                numVisible: 1,
                numScroll: 1
            }, {
                breakpoint: '480px',
                numVisible: 1,
                numScroll: 1
            }
        ];
        console.debug(this.router.getCurrentNavigation().extras.state);
    }

    ngOnInit() {
        this.offer = history.state;
        console.debug(this.offer);
        if (this.offer.offerCode == null) {
            this.router.navigate(['/bestoffer/2']);
        }
        
        this.customer = <Customer> this.customerInformationService.getCustomerInformation();
        this.subscriptions = <Subscription[]> this.customerInformationService.getCustomerSubscriptions();
        
        this.activatedRoute.params.subscribe(params => {
            this.option = params['option'];
        });
        
        try {
            this.subscriptions.forEach((subscription) => {
                subscription.paymentMethods.forEach((payment) => {
                        // 'Huawei'(MOVIL),'SGA'(CLARO FIJO),'AXIS'
                        let vTypeService = '1';

                        let pan = '';
                        if (payment.type == 'bankCard') {
                            pan = payment.details == null ? '' : payment.details.cardNumber;
                        } else {
                            pan = payment.details == null ? '' : payment.details.accountNumber;
                        }

                        let mtd: PaymentMethod = {
                            id: payment.id,
                            typeService: vTypeService,
                            activationDate: String(subscription.subscriptionInformation === null ? '' : subscription.subscriptionInformation.activeDate),
                            expirationDate: null,
                            subscriberId: subscription.subscriptionInformation.subscriptionId,
                            subproductId: subscription.subscriptionInformation.properties.subproductId,
                            serviceNumber: subscription.subscriptionInformation.serviceNumber,
                            serviceDescription: subscription.subscriptionInformation.properties.model,
                            invoice: subscription.lastInvoiceInformation === null ? '' : subscription.lastInvoiceInformation.invoiceNumber,
                            type: payment.type,
                            contractId: subscription.subscriptionInformation.properties.contractId,
                            paymentMethod: payment.name,
                            paymentDescription: '',   // payment.details == null ? {}: payment.details,
                            bank: payment.name, //details==null?"":payment.details.bank,
                            pan: pan
                        };
                        console.log('Metodo: ', mtd);
                        this.metodos.push(mtd);


                    }
                );

            });

        } catch (error) {
            console.error('Here is the error message', error);
            if (this.metodos.length == 0) {
                this.modal = {
                    message: 'No tiene metodos de pagos disponible',
                    type: 'ERROR'
                };


                this.showModal = true;
            }
        }

        console.debug(this.metodos);
    }

    setSelectedValue(select) {
        console.debug(select);
        this.selected = select;
    }

    loadinpageClick(data: any) {
        console.debug('data', data);
        this.isProcess = data.isProcess;
        this.aProgressSpinner = data.aProgressSpinner;
    }

    btnEntendido(event: any) {
        this.activarpopover = event.closeOverlay;
    }

    activarOverlay() {
        this.activarpopover = !this.activarpopover;
    }

    continuar() {
        this.router.navigate(['/claro-video-bpm']);
    }

    retroceder() {
        this._location.back();

    }

    crearProcesoStandAlone() {

        let peticion = {
            activationDate: this.selected.activationDate,
            serviceNumber: this.selected.serviceNumber,
            subscriberId: this.selected.subscriberId,
            serviceDescription: this.selected.serviceDescription,
            subproductId: this.selected.subproductId,
            paymentMethod: this.selected.paymentMethod,
            paymentDescription: this.selected.paymentDescription,
            paymentType: this.selected.type,
            identificationNumber: this.customer.personalInformation.identificationNumber,
            identificationType: this.customer.personalInformation.identificationType,
            customerId: this.customer.customerId,
            firstName: this.customer.personalInformation.givenNames,
            lastName: this.customer.personalInformation.familyNames,
            offer: this.offer.offerCode,
            offerName: this.offer.offerName,
            offerUnitPrice:this.offer.priceTotal,
            offerTotalAmount: this.offer.priceTotal,
            offerCodeAmco:this.offer.offerCodeAmco,
            freeOfferCodeAmco:this.offer.freeOfferAmco,
            freeOfferCode:this.offer.freeOfferCode,
            periodicity: this.offer.freePeriod
        };
        this.loadinpageClick({
            isProcess: true,
            aProgressSpinner: true
        });
        console.debug('La petición de proceso a enviar es: ', peticion);

        this.personservice.initNewProcessJbpmStandalone(peticion).subscribe(
            resp => {
                console.debug('initNewProcessJbpmStandalone ->' + resp);

                this.loadinpageClick({
                    isProcess: false,
                    aProgressSpinner: false
                });
                if (resp.response != null) {
                    let flujoProces: EstadoProceso = {
                        paso: 0,
                        proceso: resp.response,
                        processId: resp.response.processInstanceId,
                        title: resp.response.processInstanceDesc,
                        offer: this.offer,
                        subscriptionId: this.selected.subscriberId,
                        type: 'standalone'

                    };

                    this.router.navigate(['/claro-video-bpm'], {state: flujoProces});

                } else {
                    this.modal = {
                        message: resp.message,
                        type: 'ERROR'
                    };

                }
                this.showModal = true;
            },
            error => {
                console.debug('initNewProcessJbpmStandalone error->' + error);

                this.loadinpageClick({
                    isProcess: false,
                    aProgressSpinner: false
                });
            }
        );

    }


    hideModal() {
        this.showModal = false;
        console.debug('ocultar dialog');
    }
}


export interface PayCard {
    check: boolean,
    id: number
};
