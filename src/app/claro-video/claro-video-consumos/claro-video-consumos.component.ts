import { Component, OnInit } from '@angular/core';
import { ClaroUpPersonService } from 'src/app/claro-up/services/personservice';

import * as uuid from 'uuid';
import * as moment from 'moment';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
moment.locale("es");
@Component({
  selector: 'app-claro-video-consumos',
  templateUrl: './claro-video-consumos.component.html',
  styleUrls: ['./claro-video-consumos.component.css']
})
export class ClaroVideoConsumosComponent implements OnInit {
  
  public customer: Customer;
  private searchCustomerIdentificationType: string;
  private searchCustomerNumber: string;
  public dataConsumo: Array<any> = [];
  public fromDate : string;
  public toDate : any;
  public loading: boolean;
  public totalRecords: number;
  public lazyTable: boolean = false;
  public modal: any = {
    message: "",
    type: "",
    modal: false
  };
  public aProgressSpinner = false;
  public isProcess = false;
  public showModal = false;
  public customerConsumption : string;

  cols : any[] = [{
      "field":"date",
      "img":"assets/images/icons/products/calendar.png",
      "header":"Fecha",
      "canOrder":true
  },{
      "field":"productName",
      "img":"assets/images/icons/products/product.png",
      "header":"Producto",
      "canOrder":true
  },{
      "field":"offerName",
      "img":"assets/images/icons/products/offer.png",
      "header":"Oferta",
      "canOrder":true
  },{
      "field":"subscription",
      "img":"assets/images/icons/products/subscription.png",
      "header":"Suscripción",
      "canOrder":true
  },{
      "field":"target",
      "img":"assets/images/icons/products/arrows-horizontal.png",
      "header":"Destino",
      "canOrder":true
  },{
      "field":"targetType",
      "img":"assets/images/icons/products/resize-horizontal.png",
      "header":"Tipo Destino",
      "canOrder":true
  },{
      "field":"consumption",
      "img":"assets/images/icons/products/time.png",
      "header":"Consumo",
      "canOrder":true      
  },{
      "field":"unit",
      "img":"assets/images/icons/products/length.png",
      "header":"Unidad",
      "canOrder":true
  },{
      "field":"value",
      "img":"assets/images/icons/products/price.png",
      "header":"Valor",
      "canOrder":true
  },{
      "field":"consumptionType",
      "img":"assets/images/icons/products/starred-ticket.png",
      "header":"Tipo Consumo",
      "canOrder":true
  },{
      "field":"device",
      "img":"assets/images/icons/products/ip-address.png",
      "header":"Dispositivo",
      "canOrder":true
  },{
    "field":"content",
    "img":"assets/images/icons/products/cinema.png",
    "header":"Contenido",
    "canOrder":true
},{
    "field":"date",
    "img":"assets/images/icons/products/calendar.png",
    "header":"Fecha",
    "canOrder":true
},{
    "field":"date",
    "img":"assets/images/icons/products/calendar.png",
    "header":"Fecha",
    "canOrder":true
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
    this.loadConsumptions();
  }
    
  loadConsumptions() {
    this.showLoadingPage();
    let employeeId : any = "83";
    console.log('CustomerId: ', this.customer.customerId);
    console.log('EmployeeId: ', employeeId);
    if(this.customerInformationService.isSearchByServiceNumber()) {
      this.service.getConsumptionsByServiceNumber(
        this.customerInformationService.getSearchCustomerNumber(),
        employeeId,
        this.fromDate,
        this.toDate,
        uuid.v4()
      ).subscribe(
        data => {
          this.hideLoadingPage();
          console.log('Estas son los consumos del cliente para el numerop de servicio:', data);
          this.dataConsumo = data; 
          this.totalRecords = (this.dataConsumo != null ? this.dataConsumo.length : 0);
          this.lazyTable = false;
          this.loading = false;
        }, 
        error => {
          this.hideLoadingPage();
          console.error("Ocurrió un error mientras se consultaban los consumos del cliente por numero de servicio: ", error);
          if(error.status == 409) {
            this.showErrorModal(error.error.message);
          }
          this.dataConsumo = []; 
          this.totalRecords = 0;
          this.lazyTable = false;
          this.loading = false;
        }
      );
    } else {if(this.customer.customerIdSGA != "0" && this.customer.customerIdSGA!=this.customer.customerId){
      this.customerConsumption = this.customer.customerId.concat("-").concat(this.customer.customerIdSGA);
    }else{
      this.customerConsumption = this.customer.customerId;
    }
      this.service.getConsumptions(
        this.customerConsumption,
        employeeId,
        this.fromDate,
        this.toDate,
        uuid.v4()
      ).subscribe(
        data => {
          this.hideLoadingPage();
          console.log('Estas son los consumos del cliente:', data);
          this.dataConsumo = data; 
          this.totalRecords = (this.dataConsumo != null ? this.dataConsumo.length : 0);
          this.lazyTable = false;
          this.loading = false;
        }, 
        error => {
          this.hideLoadingPage();
          console.error("Ocurrió un error mientras se consultaban los consumos del cliente: ", error);
          if(error.status == 409) {
            this.showErrorModal(error.error.message);
          }
          this.dataConsumo = []; 
          this.totalRecords = 0;
          this.lazyTable = false;
          this.loading = false;
        }
      );
    }
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

  hideModal() {
    this.showModal = false;
  }

  loadinpageClick(data: any) {
    console.debug("data", data);
    this.isProcess = data.isProcess;
    this.aProgressSpinner = data.aProgressSpinner;
  }

}
