import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { PaymentMethod } from 'src/app/customer/modelo/paymentMethod.model';
import { Subscription } from 'src/app/customer/modelo/subscription.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';

@Component({
  selector: 'app-claro-video-metodo-pago',
  templateUrl: './claro-video-metodo-pago.component.html',
  styleUrls: ['./claro-video-metodo-pago.component.css'], styles: [`

`],
  encapsulation: ViewEncapsulation.None

})
export class ClaroVideoMetodoPagoComponent implements OnInit {
  responsiveOptions;
  activarpopover;
  typeError;
  offer;
  btnEntendido;

  public customer: Customer;
  public subscriptions: Subscription[];
  public paymentMethods: PaymentMethod[] = [];
  
  public aProgressSpinner = false;
  public isProcess = false;

  public showModal = false;
  public modal: any = {
    message: "",
    type: "",
    modal: false
  };

  constructor(public customerInformationService: CustomerInformationService) { }
  
  ngOnInit() {
    this.customer = <Customer> this.customerInformationService.getCustomerInformation();
    this.subscriptions = <Subscription[]> this.customerInformationService.getCustomerSubscriptions();
    this.loadPaymentMethods();
  }

  private loadPaymentMethods(): void {
    console.log("Cargando métodos de pago...");
    this.showLoadingPage();
    if(this.subscriptions != null) {
      this.subscriptions.forEach((_subscription, index, array) => {
        this.getPaymentMethodsOfSubscriptions(
          _subscription
        ).then(
          (__paymentMethods: PaymentMethod[]) => {
            console.log("Metodos de pago de suscription: ", __paymentMethods);
            this.paymentMethods = this.paymentMethods.concat(__paymentMethods);
            console.log("Numero de registro para metodos de pago por suscripcion: ", this.paymentMethods);
          }
        ).finally(
          () => {
            console.log('INDEX: ', (index+1));
            console.log('LENGTH: ', array.length);
            if((index+1) == array.length) {
              console.log("Numero de registro para metodos de pago: ", this.paymentMethods);
              this.hideLoadingPage();
            }
          }
        ) 
      });
    } else {
      console.log("El cliente no tiene suscripciones");
      this.hideLoadingPage();
    }
  }

  private getPaymentMethodsOfSubscriptions(_subscription: Subscription): Promise<PaymentMethod[]> {
    return new Promise<PaymentMethod[]>( (resolve, reject) => {
      if(_subscription.paymentMethods != null) {
        resolve( <PaymentMethod[]> _subscription.paymentMethods.map(function(__paymentMethod){
            return {
              paymentMethod: (__paymentMethod.description !== null ? __paymentMethod.description : 'No Aplica'),
              bank: (__paymentMethod.details && __paymentMethod.details.bank !== null ? __paymentMethod.details.bank : 'No Aplica'),
              pan: (
                __paymentMethod.details ? 
                  (__paymentMethod.details && __paymentMethod.details.accountNumber !== null ? 
                    __paymentMethod.details.accountNumber : (
                      __paymentMethod.details.cardNumber !== null ? 
                        __paymentMethod.details.cardNumber :
                        'No aplica'
                  )) : 
                  'No aplica'
              ),
              expirationDate:(__paymentMethod.details && __paymentMethod.details.expirationDate !== null ? __paymentMethod.details.expirationDate : null),
              serviceDescription: (_subscription.subscriptionInformation.properties.model !== null ? _subscription.subscriptionInformation.properties.model : 'No Aplica'),
              serviceNumber: (_subscription.subscriptionInformation.serviceNumber !== null ? _subscription.subscriptionInformation.serviceNumber : 'No Aplica'),  
              image: 'assets/images/pago/cs.png',
            };
        }));
      } else {
        reject('Ha surgido un problema intentelo más tarde'); // retorna el error
      }
    });
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

  loadinpageClick(data: any) {
    console.debug("data", data);
    this.isProcess = data.isProcess;
    this.aProgressSpinner = data.aProgressSpinner;
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

  hideModal() {
    this.showModal = false;
  }

}
