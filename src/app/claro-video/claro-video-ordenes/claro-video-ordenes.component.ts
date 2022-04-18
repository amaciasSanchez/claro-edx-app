import { Component, OnInit } from '@angular/core';
import { ClaroUpPersonService } from 'src/app/claro-up/services/personservice';

import * as moment from 'moment';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
moment.locale("es");

@Component({
  selector: 'app-claro-video-ordenes',
  templateUrl: './claro-video-ordenes.component.html',
  styleUrls: ['./claro-video-ordenes.component.css']
})
export class ClaroVideoOrdenesComponent implements OnInit {

  public customer: Customer;
  private searchCustomerIdentificationType: string;
  private searchCustomerNumber: string;
  public orders: Array<any> = [];
  public fromDate : string;
  public toDate : any;

  public loading: boolean;
  public totalRecords: number;
  public lazyTable: boolean = false;

  public aProgressSpinner = false;
  public isProcess = false;

  public showModal = false;
  public modal: any = {
    message: "",
    type: "",
    modal: false
  };

  cols : any[] = [{
      "field":"orderDate",
      "img":"assets/images/icons/products/calendar.png",
      "header":"Ordenada el",
      "canOrder":true
  },{
      "field":"product",
      "img":"assets/images/icons/products/product.png",
      "header":"Producto",
      "canOrder":true
  },{
      "field":"offer",
      "img":"assets/images/icons/products/offer.png",
      "header":"Oferta",
      "canOrder":true
  },{
      "field":"detail",
      "img":"assets/images/icons/products/about.png",
      "header":"Detalle",
      "canOrder":true
  },{
      "field":"startDate",
      "img":"assets/images/icons/products/date-from.png",
      "header":"Vigente desde",
      "canOrder":true
  },{
      "field":"endDate",
      "img":"assets/images/icons/products/date-to.png",
      "header":"Vigente hasta",
      "canOrder":true
  },{
      "field":"price",
      "img":"assets/images/icons/products/price.png",
      "header":"Precio",
      "canOrder":true
  },{
      "field":"trackingId",
      "img":"assets/images/icons/products/tracking.png",
      "header":"Tracking Id",
      "canOrder":true
  },{
      "field":"state",
      "img":"assets/images/icons/products/status.png",
      "header":"Estado",
      "canOrder":true
  },{
      "field":"subscription",
      "img":"assets/images/icons/products/subscription.png",
      "header":"Suscripción",
      "canOrder":true
  },{
      "field":"information",
      "img":"assets/images/icons/general/info.png",
      "header":"Información",
      "canOrder":false
  }];
  
  constructor(private service: ClaroUpPersonService, private customerInformationService: CustomerInformationService) {
    this.customer = <Customer> this.customerInformationService.getCustomerInformation();
    this.searchCustomerIdentificationType = this.customerInformationService.getSearchCustomerIdentificationType();
    this.searchCustomerNumber = this.customerInformationService.getSearchCustomerNumber();
    console.log('CLIENTE: ', this.customer);
  }

  ngOnInit() {
    let today = new Date();
    this.toDate = moment(today).format('YYYY-MM-DD'); 
    let lastDate = new Date();
    lastDate.setDate(today.getDate() - 30);
    this.fromDate = moment(lastDate).format('YYYY-MM-DD'); 
    this.loadOrders();
  }
  
  loadOrders() {
    this.showLoadingPage();
    console.log('Se buscaran ordenes para tipo de identificación: ', this.searchCustomerIdentificationType);
    this.service.getOrdersByClient(
        this.searchCustomerIdentificationType,
        this.searchCustomerNumber,
        this.fromDate,
        this.toDate
      ).subscribe(
        data => {
          this.hideLoadingPage();
          console.log('Estas son las ordenes del cliente:', data);
          this.orders = data;
          this.totalRecords = (this.orders != null ? this.orders.length : 0);
          this.lazyTable = false;
          this.loading = false;
        }, 
        error => {
          this.hideLoadingPage();
          console.error("Ocurrió un error mientras se consultaban las ordenes: ", error);
          if(error.status == 409) {
            this.showErrorModal(error.error.message);
          }
          this.orders = []; 
          this.totalRecords = 0;
          this.lazyTable = false;
          this.loading = false;
        }
    );
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