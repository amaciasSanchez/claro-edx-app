import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

import { PersonService } from '../claroup/service/personservice';
import {environment} from '../../../environments/environment';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';

@Component({
  selector: 'app-claro-video-min-offer',
  templateUrl: './claro-video-min-offer.component.html',
  styleUrls: ['./claro-video-min-offer.component.css'],
  providers: [PersonService]
})
export class ClaroVideoMinOfferComponent implements OnInit {

  public offers = [];
  public searchCustomerIdentificationType: string;
  public searchCustomerNumber: string;
  
  modal: any = {
    message: "",
    type: "",
    visible: false
  };
  aProgressSpinner = false;
  isProcess = false;

  constructor(private personservice: PersonService,
    private _location: Location,
    private customerInformationService: CustomerInformationService) {
  }

  ngOnInit() {
    this.showLoading();
    
    this.searchCustomerIdentificationType = this.customerInformationService.getSearchCustomerIdentificationType();
    this.searchCustomerNumber = this.customerInformationService.getSearchCustomerNumber();
    
    let bodyRequest: any = {
      identificationNumber: this.searchCustomerNumber,
      identificationType: this.searchCustomerIdentificationType,
      topicId: environment.topicIdClaroVideo
    }

    this.personservice.getBestOffersCV(bodyRequest).subscribe(
      (_response) => {
        this.offers = _response;
        this.hideLoading();
      },
      _eResponse => {
        console.error(_eResponse)
        this.hideLoading();
        this.showModalError(_eResponse.error.message);

      }
    );
    console.debug(this.offers);
  }


  showLoading() {
    this.aProgressSpinner = true;
  }
  hideLoading() {
    this.aProgressSpinner = false;
  }

  showModalError(message?: string){
    if(!message)
      message = "Ocurrio un error, por favor intente mas tarde"

    this.modal = {
      message: message,
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
    this._location.back();
  }

}
