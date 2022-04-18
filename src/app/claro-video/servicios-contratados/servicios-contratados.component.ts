import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
import { Subscription } from 'src/app/customer/modelo/subscription.model';
moment.locale("es");

@Component({
  selector: 'app-servicios-contratados',
  templateUrl: './servicios-contratados.component.html',
  styleUrls: ['./servicios-contratados.component.css']
})
export class ServiciosContratadosComponent implements OnInit {
  cliente: Customer;
  subscriptions: Subscription[];
  selectedSubscription: Subscription;
  offers: any = [];
  aProgressSpinner = true;
  isProcess = true;
    
  constructor(
        private route: ActivatedRoute,
        private customerInformationService: CustomerInformationService) { 
      this.cliente = <Customer> this.customerInformationService.getCustomerInformation();
      this.subscriptions = <Subscription[]> this.customerInformationService.getCustomerSubscriptions();
      this.selectedSubscription = this.subscriptions[(+this.route.snapshot.params.subscription)];
  }
    
  ngOnInit() {
  }

  loadinpageClick(data: any) {
      console.debug("data", data);
      // setTimeout(() => {
      this.isProcess = data.isProcess;
      this.aProgressSpinner = data.aProgressSpinner;
      // }, 1000);
  }
}
