import { Component, OnInit } from '@angular/core';
import { ClaroUpPersonService } from 'src/app/claro-up/services/personservice';
import { Router } from '@angular/router';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
import { Subscription } from 'src/app/customer/modelo/subscription.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-claro-video-inactivacion',
  templateUrl: './claro-video-inactivacion.component.html',
  styleUrls: ['./claro-video-inactivacion.component.css']
})
export class ClaroVideoInactivacionComponent implements OnInit {

  public customer: Customer;
  public subscriptions: Subscription[];
  offers: any = [];
  selectedOffers: any = [];
  subscription: any = {};
  selectedOption: any;
  inactivateResponse: any;


  labelTitleInactivation:string;
  subcategory:string;
  //response: any;

  aProgressSpinner = false;
  isProcess = false;

  modalMessageResponse = false;
  modalAdvertencia = false;
  message = '';
  correoCliente;
  atras;
  siguiente;
  constructor(private router: Router, 
              private service: ClaroUpPersonService,    
              private _location: Location,            
              private customerInformationService: CustomerInformationService) {
    
   }

  ngOnInit() {
    this.customer = <Customer> this.customerInformationService.getCustomerInformation();
    this.subscriptions = <Subscription[]> this.customerInformationService.getCustomerSubscriptions();
    if(history.state.data) {
      this.offers = history.state.data.offers;
      this.getSelectedOffers();
      this.subscription = history.state.data.subscription;
      this.subcategory = this.selectedOffers[0].productId.trim();
      this.labelTitleInactivation = this.selectedOffers[0].offerName || "---"; 
      //console.log("Ofertas: " + JSON.stringify(this.offers));
      //console.log(this.subcategory);
    }
  }


  selectAction(option: any){
    let claroId = this.offers[0].claroId ? this.offers[0].claroId : "Claro ID";
    this.selectedOption = option;
    if (option === 1) {
        this.message = 'Esta acción eliminará por completo toda la cuenta ' + claroId + ' de Claro Video incluyendo todas las suscripciones que pueda tener activas. Debes informar al cliente que el cargo por el servicio ya fue incluido en la factura' ;
    }else if (option === 2) {
      this.message = 'Esta acción mantendrá la cuenta ' + claroId + ' activa en Claro Video y cancelará la renovación automática de la oferta hasta la fecha de corte ' ;
    }else if (option === 3) {
      this.message = 'Esta acción mantendrá la cuenta ' + claroId + ' activa en Claro Video y eliminará la oferta inmediatamente. Debes informar al cliente que el cargo por el servicio ya fue incluido en la factura' ;
    }
    this.modalAdvertencia = true;
  }

  executeAction() {
    this.modalAdvertencia = false;
    this.isProcess = true;
    this.aProgressSpinner = true;
    console.log("Se ejecutará acción ", this.selectedOption);
    let inactivationType = "";
    let offersToInactive = [];
   /*  if (this.selectedOption === 1) {
      inactivationType = "EC";;
      offersToInactive = this.offers.filter((item: any) => item.productId == 'Claro_Video').map((item: any) => { 
        return {'offerId':item.offerCode, 'category':item.offerType}
      });

    }else  */

    if (this.selectedOption === 2) {
      inactivationType = "CR";
    }else if (this.selectedOption === 3) {
      inactivationType = "EO";
    }

    if(this.selectedOffers.length > 0) {

      if(this.subcategory==="CLARO BOX TV"){
        offersToInactive = this.selectedOffers.map((item: any) => { 
          return {'offerCode':item.offerCode, 'category':item.offerType, 
                  "offerName": item.offerName, 'offeringPrice':item.price,
                  "profileId": item.profileId, "claroId": item.claroId}
        });
    
        console.log(offersToInactive);
        this.inactivateClaroBoxTv(offersToInactive, inactivationType);

        
      }else if (this.subcategory==="Claro_Video"){
        offersToInactive = this.selectedOffers.map((item: any) => { 
          return {'offerId':item.offerCode, 'category':item.offerType}
        });
    
         this.service.inactivateClaroVideoOffers(
          inactivationType, // Tipo de inactivación
          this.subscription.subscriptionInformation.serviceNumber, //Número de servicio
          this.offers[0].profileId, //customerIdAmco
          this.offers[0].claroId, // ClaroId
          offersToInactive).subscribe(
            data => {
            console.log("Esta es la respuesta del servicio: ", data);
            this.inactivateResponse = data;
            this.modalMessageResponse = true;
            this.isProcess = false;
            this.aProgressSpinner = false;

        }, error => {
            console.error(error);
            this.inactivateResponse = {
                "status":"ERROR",
                "message":"Ocurrió un error al enviar a inactivar las ofertas seleccionadas"
            };
            this.modalMessageResponse = true;
            this.isProcess = false;
            this.aProgressSpinner = false;
        }
      ); 

      }else{
        console.log("No existe la subcategoria");
        this.inactivateResponse = {
          "status":"ERROR",
          "message":"No existe la subcategoria"
        };
        this.modalMessageResponse = true;
        this.isProcess = false;
        this.aProgressSpinner = false;
      }

      
    } else {
      console.error("No se hallaron ofertas seleccionadas");
      this.inactivateResponse = {
        "status":"ERROR",
        "message":"No se hallaron ofertas seleccionadas"
      };
      this.modalMessageResponse = true;
      this.isProcess = false;
      this.aProgressSpinner = false;      
    }
  }




  inactivateClaroBoxTv(offersToInactive:any[], inactivationType:string) {
    let inactivateRequest: any = {
        "user": sessionStorage.getItem("user"),
        "serviceNumber": this.subscription.subscriptionInformation.serviceNumber,
        "typeInactivation": inactivationType,
        "customer": {
            "customerOtt": offersToInactive[0].profileId,
            "email": offersToInactive[0].claroId
        },
        "offer": {
            "offeringCode": offersToInactive[0].offerCode,
            "offeringCategory": offersToInactive[0].category,
            "offeringName":  offersToInactive[0].offerName,
            "offeringPrice": offersToInactive[0].offeringPrice
        }      
    }
    
    this.service.inactivateClaroBoxTvOffer(
            inactivateRequest
        )
        .subscribe(
            (data) => {
              console.log("Esta es la respuesta del servicio: ", data);
              this.inactivateResponse = data;
              this.modalMessageResponse = true;
              this.isProcess = false;
              this.aProgressSpinner = false;
            },
            (error) => {
              console.error(error);
              this.inactivateResponse = {
                  "status":"ERROR",
                  "message":"Ocurrió un error al enviar a inactivar las ofertas seleccionadas"
              };
              this.modalMessageResponse = true;
              this.isProcess = false;
              this.aProgressSpinner = false;
            }
        );
}
  



  getSelectedOffers () {
    this.selectedOffers = this.offers
            .filter((item: any) => item.selected !== undefined && item.selected);
    console.log("Las ofertas seleccionadas son:", this.selectedOffers);
  }

  loadinpageClick(data: any) {
    console.debug("data", data);
    this.isProcess = data.isProcess;
    this.aProgressSpinner = data.aProgressSpinner;
  }

  closeResponseMessage() {
    this.modalMessageResponse = false;
    if(this.inactivateResponse.status == "OK" || this.inactivateResponse.code == "200") {
      setTimeout(() => {
        this._location.back();
      }, 1000);       
    }
  }


}
