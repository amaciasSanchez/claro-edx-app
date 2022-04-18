import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import * as moment from 'moment';

import { Customer } from '../../customer/modelo/customer.model';
import { Subscription } from '../../customer/modelo/subscription.model';
import { PaymentMethod } from '../../customer/modelo/paymentMethod.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
import { ClaroVideoOfferService } from 'src/app/claro-video/claro-video-offer/claro-video-offer.service';
import { EstadoProceso } from 'src/app/claro-video/flujo-actual-claro-video/flujo-actual-claro-video.component';
import { PersonService } from 'src/app/claro-video/claroup/service/personservice';
import { OttServiceService } from '../servicios/ott-service.service';

moment.locale('es');
@Component({
  selector: 'app-ott-sin-caja',
  templateUrl: './ott-sin-caja.component.html',
  styleUrls: ['./ott-sin-caja.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [PersonService]
})
export class OttSinCajaComponent implements OnInit {

  selectedValue = 0;
  activarpopover: boolean = false;
  offer: any;
  option = 0;
  responsiveOptions;
  private customer: Customer;
  public modalConfirm = false;
  public messageModalConfirm;
  public tempOffers: any;
  private subscriptions: Subscription[];
  public aProgressSpinner = false;
  public isProcess = false;
  public showModal = false;
  public modal: any = {
    message: "",
    type: "",
    modal: false
  };

  selected: PaymentMethod;
  metodos = [];

  constructor(
    private personservice: PersonService,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private _offerService: ClaroVideoOfferService,
    private customerInformationService: CustomerInformationService,
    private _ottService: OttServiceService,
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
  }

  ngOnInit() {
    this._ottService.clearOttPaymentMethod();
    this._ottService.clearOfferOtt();
    this._ottService.clearProfile();
    this._ottService.clearAvailableOffersOtt();
    this.customer = <Customer>this.customerInformationService.getCustomerInformation();
    this.subscriptions = <Subscription[]>this.customerInformationService.getCustomerSubscriptions();
    console.log("Esta es la suscription: ", this.subscriptions);

    this.activatedRoute.params.subscribe(params => {
      this.option = params['option'];
    });

    try {
      this.subscriptions.forEach((subscription) => {
        if (subscription.paymentMethods != null){
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
              technology: subscription.subscriptionInformation.technology,
              serviceDescription: subscription.subscriptionInformation.properties.model,
              invoice: subscription.lastInvoiceInformation === null ? '' : subscription.lastInvoiceInformation.invoiceNumber,
              contractId: subscription.subscriptionInformation.properties.contractId,
              type: payment.type,
              paymentMethod: payment.name,
              paymentDescription: '',   // payment.details == null ? {}: payment.details,
              bank: payment.name, //details==null?"":payment.details.bank,
              pan: pan
            };
            console.log('Metodo: ', mtd);
            this.metodos.push(mtd);
  
  
          });
        }        
      });

    } catch (error) {
      console.error('Here is the error message', error);
      if (this.metodos.length == 0) {
        this.modal = {
          message: 'No tiene metodos de pagos disponible',
          type: 'ERROR'
        };
        this.showModal = true;
        //this.router.navigate(['/bestoffer/2']);
      }
    }

    console.debug(this.metodos);
  }

  setSelectedValue(select) {
    console.debug(select);
    this.selected = select;
  }

  btnEntendido(event: any) {
    this.activarpopover = event.closeOverlay;
  }

  activarOverlay() {
    this.activarpopover = !this.activarpopover;
  }

  continuar() {
    this.showLoadingPage();
    if(!this.selected) {
      this.showErrorModal("Debe seleccionar un método de pago");
      this.hideLoadingPage();      
    } else {
      this._ottService.loadOttOffers(this._ottService.formatServiceNumber(this.selected.serviceNumber))
      .subscribe(resp => {
        this.hideLoadingPage();
        console.log("Ofertas encontradas: ", resp.response);
        if(resp.response.listCurrentOffers && resp.response.listCurrentOffers.length > 0) {
          console.log("Este usuario tiene ofertas activas!");
          this.modalConfirm = true;
          let offerName = resp.response.listCurrentOffers[0].offeringName;
          this.messageModalConfirm = "El suscriptor ya posee la oferta " + offerName + " activa.  ¿Desea continuar?";
          this.tempOffers = resp.response; 
        } else {
          this._ottService.clearPreviousOfferOtt();
          this._ottService.setAvailableOffersOtt(resp.response.listOffers);
          this._ottService.setOttPaymentMethod(this.selected);
          this.router.navigate(['ofertasOtt']);
        }
        
      
      }, error => {
        console.debug("error", error);
        if (typeof error.error !== "undefined") {
          if (error.error.code === "409") {
            this.showErrorModalAndHideLoadingPage(error.error.message);
          } else {
            this.showErrorModalAndHideLoadingPage("Ocurrió un error mientras intentaba consultar las oferts");
          }
        } else {
          this.showErrorModalAndHideLoadingPage("Ocurrió un error mientras intentaba consultar las oferts");
        }
      });
    }
  }

  retroceder() {
    this._location.back();
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

  closeConfirmModal() {
    this.modalConfirm = false;
  }

  confirmNext() {
    this.modalConfirm = false;
    this._ottService.setAvailableOffersOtt(this.tempOffers.listOffers);
    this._ottService.setPreviousOfferOtt(this.tempOffers.listCurrentOffers[0]);
    this._ottService.setOttPaymentMethod(this.selected);
    setTimeout(() => {
      this.router.navigate(['ofertasOtt']);
    }, 1000);
  }

}
