import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
import { ErrorMessage } from 'src/app/error-message';
import { OttOffers } from '../modelos/OttOffers';
import { OttServiceService } from '../servicios/ott-service.service';

@Component({
  selector: 'app-ott-offers',
  templateUrl: './ott-offers.component.html',
  styleUrls: ['./ott-offers.component.css']
})
export class OttOffersComponent implements OnInit {


  constructor(private _ottService: OttServiceService, private router: Router, private customerService: CustomerInformationService, private http: HttpClient) {
    this.errorInterface = {
      isError: false,
      message: ""
    };
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
  errorInterface: ErrorMessage;
  responsiveOptions;
  public aProgressSpinner = false;
  public isProcess = false;
  public showModal = false;
  public modal: any = {
    message: "",
    type: "",
    modal: false
  };
  customerData: Customer;
  ottOffers: OttOffers[] = [];
  OttOffersSelected: OttOffers;
  repsonseOffers: any;
  ofertarOtt: any;

  ngOnInit() {
    this.showLoadingPage();
    this._ottService.clearProfile();
    this._ottService.setOfferOtt(undefined);
    this.ofertarOtt = this._ottService.getAvailableOffersOtt();
    this.hideLoadingPage();
  }

  continue() {
    if(!this.OttOffersSelected) {
      this.showErrorModal("Debe seleccionar una oferta");
    } else {
      this._ottService.setOfferOtt(this.OttOffersSelected);
      this.router.navigate(['ott-datos-personales']);
    }
  }

  seleccionar(selectecOffer: OttOffers) {
    this.OttOffersSelected = selectecOffer;

    this.ofertarOtt.forEach(offer => { 
      if(this.OttOffersSelected.offeringCode == offer.offeringCode)
        offer.cssActive = true; 
      else 
        offer.cssActive = false; 
    });
  }

  seleccionadoCheck(offerta: OttOffers) {
    console.log(offerta);
    console.log(this.OttOffersSelected);
    if (this.OttOffersSelected !== undefined) {
      return (offerta.offeringCode == this.OttOffersSelected.offeringCode);
    } else {
      return false;
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
