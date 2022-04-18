
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { PersonService } from '../claroup/service/personservice';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';

@Component({
  selector: 'app-claro-video-all-offer',
  templateUrl: './claro-video-all-offer.component.html',
  styleUrls: ['./claro-video-all-offer.component.css'], styles: [``],


  encapsulation: ViewEncapsulation.None,
  providers: [PersonService]
})
export class ClaroVideoAllOfferComponent implements OnInit {
  public customer: Customer;
  offers: any[];
  responsiveOptions;
  modal: any = {
    message: "",
    type: "",
    visible: false
  };
  aProgressSpinner = false;
  constructor(private personservice: PersonService, 
              private _location: Location, 
              private router: Router,
              private customerInformationService: CustomerInformationService) {
    this.responsiveOptions = [
      {
        breakpoint: '1080px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '968px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '580px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.customer = <Customer> this.customerInformationService.getCustomerInformation();

    let data = {
      topicId: environment.topicIdClaroVideo,
      identificationNumber: this.customer.personalInformation.identificationNumber,
      identificationType: this.customer.personalInformation.identificationType
    };
    this.showLoading()
    this.personservice.getAllOffersByTopicCV(data).subscribe(
      (data:any) => {
        this.offers = data;
        this.hideLoading();
        console.debug(this.offers)
      },
      error => {
        this.hideLoading();
        this.showModalError();
      }
    );
  }

  verOffer(offer) {
    this.router.navigate(['/claro-pay',0],{ state: offer });
  }

  showLoading() {
    this.aProgressSpinner = true;
  }
  hideLoading() {
    this.aProgressSpinner = false;
  }

  showModalError(){
    this.modal = {
      message: "Ocurrio un error, por favor intente mas tarde",
      type: "ERROR",
      visible: true
    };
  }

  hideModal() {
    this.modal = {
      message: "Ocurrio un error, por favor intente mas tarde",
      type: "ERROR",
      visible: false
    };
    console.debug("ocultar dialog")
    this._location.back();

  }
}
