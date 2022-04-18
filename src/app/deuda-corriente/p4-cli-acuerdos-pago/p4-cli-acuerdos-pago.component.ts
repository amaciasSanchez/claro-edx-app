import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {PersonService} from '../../claro-video/claroup/service/personservice';

import * as moment from 'moment';
moment.locale("es");

@Component({
  selector: 'app-p4-cli-acuerdos-pago',
  templateUrl: './p4-cli-acuerdos-pago.component.html',
  styleUrls: ['./p4-cli-acuerdos-pago.component.css'],
    providers: [PersonService]
})
export class P4CliAcuerdosPagoComponent implements OnInit {
cliente: any;     //informacion que se carga del storage
indexClient:number ;   // index del array de suscripciones
selectedSubscription: any;  // suscripcion seleccionada
indexDetail:number;  // indice del array de detalles de pago
selectedCurrentDebt: any; // Array de Detalles de pago seleccionado
currentDebtItems: any; // Array de Detalles de pago seleccionado
spinStatus:boolean =true; 
spinStatusP:boolean =true; 
acuerdos:any;  // lista de los acuerdos de pago que se invocan en el servicio(arragement) en onInit()
detail:any;

  constructor(
    
    private router: Router, 
    private route: ActivatedRoute,
    private personservice: PersonService) {

  
    this.spinStatus =true;
    this.spinStatusP =true;
    this.cliente = JSON.parse(localStorage.getItem('cliente'));
    let fechaNacimiento = "1979-05-14";
    if (this.cliente.personalInformation.birthday) {
        fechaNacimiento = moment(this.cliente.personalInformation.birthday)
            .utc()
            .format("DD MMMM YYYY");
        this.cliente.personalInformation.fechaNacimiento = fechaNacimiento;
    } else this.cliente.personalInformation.fechaNacimiento = "";
   
    if (!this.cliente) {
        console.error("No existe un cliente encontrado");
    }
    console.log(">>>Cliente encontrado: ", this.cliente);

    this.currentDebtItems = JSON.parse(localStorage.getItem("currentDebt"));

    if(!this.cliente) {
      console.error("No existe un cliente encontrado");
    }
    
     console.log(">>>Cliente encontrado: ", this.cliente);
    let detail:string = this.route.snapshot.params.detail;
    
    var splits = detail.split("_");
  
    this.indexClient = (+splits[0]);
    this.indexDetail = (+splits[1]);
  
      this.selectedCurrentDebt = this.currentDebtItems.subscriptionsList[
        this.indexClient
    ];
  
  
    this.acuerdos= JSON.parse(localStorage.getItem('acuerdos'));

    this.detail= this.acuerdos[this.indexDetail];

    //alert(JSON.stringify(this.detail));

  
    
  }

  ngAfterViewInit() {
    console.log("=============ngAfterViewInit==============");
  }
  
  
  
  ngOnInit() {
    
    


  }// fin onInit()



  volver(){
     this.router.navigate(["/deudaClienteAcuerdos",this.indexClient]);
  }
}
