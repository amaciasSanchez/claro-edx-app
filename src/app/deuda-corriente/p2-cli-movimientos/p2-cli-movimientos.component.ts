import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {PersonService} from '../../claro-video/claroup/service/personservice';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';
import * as moment from 'moment';
moment.locale("es");

@Component({
  selector: 'app-p2-cli-movimientos',
  templateUrl: './p2-cli-movimientos.component.html',
  styleUrls: ['./p2-cli-movimientos.component.css'],
  providers: [PersonService,MessageService]
})
export class P2CliMovimientosComponent implements OnInit {
cliente: any;
selectedSubscription: any;
indexClient:number ;
mapaTiposTx:Map<string,any>;
mapaEstadoDet:Map<string,any>;
 currentDebtItems:any;
 acuerdos:any;
 indexCurrentDebt:number ;
 selectedCurrentDebt:any={};
 msgs: Message[] = [];
startDate:any;
endDate:any;
 month: number=12;


  constructor(private router: Router, private route: ActivatedRoute, private personservice: PersonService,private _location: Location) {
     
     this.cliente = JSON.parse(localStorage.getItem('cliente'));
      this.currentDebtItems = JSON.parse(localStorage.getItem('currentDebt'));
    if(!this.cliente) {
      console.error("No existe un cliente encontrado");
    }
  }
                    
  ngAfterViewInit() {
    console.log("=============ngAfterViewInit==============");
  }
  
  //
  //
  //
  ngOnInit() {
  

    this.cliente = JSON.parse(localStorage.getItem('cliente'));
    this.currentDebtItems = JSON.parse(localStorage.getItem('currentDebt'));
    this.acuerdos = JSON.parse(localStorage.getItem('acuerdos'));
    
    if(!this.cliente) {
      console.error("No existe un cliente encontrado");
    }
    console.log(">>>Cliente encontrado: ", this.cliente);
    let fechaNacimiento = "";
    if (this.cliente.personalInformation.birthday) {
        fechaNacimiento = moment(this.cliente.personalInformation.birthday).utc().format("DD MMMM YYYY")
        this.cliente.personalInformation.fechaNacimiento = fechaNacimiento;
    } else
        this.cliente.personalInformation.fechaNacimiento = "";

        console.log(">>>Cliente encontrado: ", this.cliente);
  
  
    this.indexCurrentDebt =this.route.snapshot.params.subscription;
    console.log(JSON.stringify(this.route.snapshot.params));
   // ACTIVAR PARA PRODUCCION 
  
 
  
     this.selectedCurrentDebt =  this.currentDebtItems.subscriptionsList[this.indexCurrentDebt];
    console.log("**** this.selectedCurrentDebt =====" + this.indexCurrentDebt);
    
      console.dir(this.selectedCurrentDebt);

     
      this.verFecha1Year();

    
 
 


  }//fin onInit()







  invocarDatosPagina(){
 


    this.personservice.getInvoiceByDates({
      "accountId":this.selectedCurrentDebt.accountId ,
      "accountCode":this.selectedCurrentDebt.contractId ,
      "startDate":this.startDate, "endDate":this.endDate})
      .subscribe(claroVideoResponse => {
           console.log("RESPONSE ********************* ")   
          
     
    
          this.selectedCurrentDebt.invoices = claroVideoResponse.invoices;
          
            // NORMALIZAR LAS FECHAS que vienen en String y llenas de ceros!
            }, 
            (error) => {
              console.dir(error);
              this.msgs.push({severity: 'error', summary: '', detail: JSON.stringify( error.error.message) });
      
//              this.errorInvocation = true;
//              this.spinStatus = false;
          }//
            );  // fin invocation 
          
    }
    
  
    verAcuerdos() {
        let index2: any = this.indexCurrentDebt;

        this.router.navigate(["/deudaClienteAcuerdos", index2]);
    }
    verEstadoCuenta() {
      let index2: any = this.indexCurrentDebt;

      this.router.navigate(["/deudaEstadoCuenta", index2]);
  }
    
      verServicios(subscription: any){
        let index : any = this.cliente.subscriptions.indexOf(subscription);
        this.router.navigate(["/servicios", index]);
      }
    
       verPagos(detail: any){
        localStorage.setItem('invoices', JSON.stringify(this.selectedCurrentDebt.invoices));
        let index : any =  this.selectedCurrentDebt.invoices.indexOf(detail);
        let index2 : any =   this.currentDebtItems.subscriptionsList.indexOf(this.selectedCurrentDebt);
    
        let sign = ""+index+"__"+index2+"__"+this.startDate+"__"+this.endDate;
     
        console.log("REDIRECCION2");
        this.router.navigate(["/deudaClientePagos",sign]);
      }
    
     
      verFecha3Meses(){
        this.endDate = moment().format('YYYYMMDD')+"235959";
        let fecha = moment().add(-3,"month"); 
         this.startDate=fecha.format('YYYYMM')+"01235959";//"20201101000000";
         this.invocarDatosPagina();
         this.month=3;
      
        }
      
        verFecha6Meses(){
        this.endDate = moment().format('YYYYMMDD')+"235959";
        let fecha = moment().add(-6,"month"); 
         this.startDate=fecha.format('YYYYMM')+"01235959";//"20201101000000";
         this.invocarDatosPagina();
         this.month=6;
      
    }
    
        
       verFecha1Year(){
         this.endDate = moment().format('YYYYMMDD')+"235959";
        let fecha = moment().add(-12,"month"); 
         this.startDate=fecha.format('YYYYMM')+"01235959";//"20201101000000";
         this.invocarDatosPagina();
         this.month=12;
    
      }
     

 

volver(){

  this._location.back();
}



}
