import { Component, OnInit } from '@angular/core';
import { HtmlParser } from '@angular/compiler';
//import { __values } from 'tslib';

@Component({
  selector: 'app-optimus-config002',
  templateUrl: './optimus-config002.component.html',
  styleUrls: ['./optimus-config002.component.css']
})
export class OptimusConfig002Component implements OnInit {
  
  tarjetas : any;
  miTarjeta : HTMLElement = document.getElementById("miTarjeta");
  
  someTarjeta : any;
  constructor() { 
    this.tarjetas=[
      {
        "name"          : "Visa",
        "cod"           : "000",
        "description"   : "Solo trabajar con archivos de información de Tarjetas Visa",
        "enable"        : "false",
        "visible"       : "true"
      },
      {
        "name"          : "Mastercard",
        "cod"           : "001",
        "description"   : "Solo trabajar con archivos de información de Tarjetas Mastercard",
        "enable"        : "false",
        "visible"       : "true"
      },
      {
        "name"          : "Amex",
        "cod"           : "002",
        "description"   : "Solo Trabajar con archivos de información de Tarjetas American Express",
        "enable"        : "false",
        "visible"       : "true"
      },
      {
        "name"          : "Dinners",
        "cod"           : "003",
        "description"   : "Solo Trabajar con archivos de información de Tarjetas Dinners",
        "enable"        : "false",
        "visible"       : "true"
      },
      {
        "name"          : "Discover",
        "cod"           : "004",
        "description"   : "Solo Trabajar con archivos de información de Tarjetas Discover",
        "enable"        : "false",
        "visible"       : "true"
      },
      {
        "name"          : "Alia",
        "cod"           : "005",
        "description"   : "Solo Trabajar con archivos de información de Tarjetas Alia/Cuotafacil",
        "enable"        : "false",
        "visible"       : "true"
      }
    ]

    this.someTarjeta  = this.tarjetas[1];
   }
    
  ngOnInit() {
  }

  mostrar(obj) {
    this.someTarjeta = obj;
  }

}
