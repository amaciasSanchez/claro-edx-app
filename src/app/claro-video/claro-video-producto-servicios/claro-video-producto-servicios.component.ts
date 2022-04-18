import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { Subscription } from 'src/app/customer/modelo/subscription.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
moment.locale("es");

@Component({
  selector: 'app-claro-video-producto-servicios',
  templateUrl: './claro-video-producto-servicios.component.html',
  styleUrls: ['./claro-video-producto-servicios.component.css']
})
export class ClaroVideoProductoServiciosComponent implements OnInit {
  cliente: Customer;
  subscriptions: Subscription[];

  constructor(private router: Router, private customerInformationService: CustomerInformationService) { 
    console.log("Se ejecuto el contructor!!!!!!!!!");
  }
  
  ngOnInit() {
    console.log("Se ejecuto el ngOnInit!!!!!!!!!");
    this.cliente = <Customer> this.customerInformationService.getCustomerInformation();
    console.log('CLIENTE: ', this.cliente);
    this.subscriptions = <Subscription[]> this.customerInformationService.getCustomerSubscriptions();
  }

  verServicios(subscription: any){
    let index : any = this.subscriptions.indexOf(subscription);
    this.router.navigate(["/servicios", index]);
  }
}
