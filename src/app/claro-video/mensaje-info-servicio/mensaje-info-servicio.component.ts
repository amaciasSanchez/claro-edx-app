import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';

@Component({
  selector: 'app-mensaje-info-servicio',
  templateUrl: './mensaje-info-servicio.component.html',
  styleUrls: ['./mensaje-info-servicio.component.css']
})
export class MensajeInfoServicioComponent implements OnInit {
  mensaje: string = '';
  @Input() searchCriteria: any;
  @Input() searchNumber: any;

  constructor(private router: Router, private customerInformationService: CustomerInformationService) { }

  ngOnInit() {
    if(this.searchCriteria!=null)
    {
      if (this.searchCriteria=="SN") {
        this.mensaje = "Sólo estás visualizando información del servicio "+this.searchNumber+" ";
      } else {
        this.mensaje = "Estás visualizando la información del cliente con identificación "+this.searchNumber+" ";
      }
    }else{
    let searchCustomerNumber = this.customerInformationService.getSearchCustomerNumber();
     if (this.customerInformationService.isSearchByServiceNumber()) {
       this.mensaje = "Sólo estás visualizando información del servicio "+searchCustomerNumber+" ";
     } else {
       this.mensaje = "Estás visualizando la información del cliente con identificación "+searchCustomerNumber+" ";
      }
    }
  }
}