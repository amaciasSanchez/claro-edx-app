import { Component, OnInit } from '@angular/core';
import { HtmlParser } from '@angular/compiler';
//import { __values } from 'tslib';

@Component({
  selector: 'app-optimus-config001',
  templateUrl: './optimus-config001.component.html',
  styleUrls: ['./optimus-config001.component.css']
})
export class OptimusConfig001Component implements OnInit {
  
  financieras : any;
  miFinanciera : HTMLElement = document.getElementById("miFinanciera");
  
  someFinanciera : any;
  constructor() { 
    this.financieras=[
      {
        "name"          : "Banco Pacifico",
        "cod"           : "000",
        "description"   : "Solo trabajar con archivos de información de Banco Pacífico",
        "enable"        : "false",
        "visible"       : "true"
      },
      {
        "name"          : "Banco Pichincha",
        "cod"           : "001",
        "description"   : "Solo trabajar con archivos de información de Banco Pichincha",
        "enable"        : "false",
        "visible"       : "true"
      },
      {
        "name"          : "Banco Bolivariano",
        "cod"           : "002",
        "description"   : "Solo Trabajar con archivos de información de Banco Bolivariano",
        "enable"        : "false",
        "visible"       : "true"
      },
      {
        "name"          : "Todas las Entidades Financieras",
        "cod"           : "003",
        "description"   : "Para que optimus pueda cargar archivos de todas las entidades financieras",
        "enable"        : "false",
        "visible"       : "true"
      }
    ]

    this.someFinanciera = this.financieras[3];
   }
    
  ngOnInit() {
  }

  mostrar(obj) {
    this.someFinanciera = obj;
  }

}
