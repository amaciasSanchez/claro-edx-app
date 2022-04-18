import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PasoService } from '../../service/paso.service';

import { Routes, RouterModule, Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  @Input() miFinanciera : any;
  valueFinanciera : any;

  username : string;

  constructor( private pasoService_ : PasoService, private router : Router ) { 
    this.username = pasoService_.username;
   }

  ngOnInit() {
  }

  logout(){
    this.pasoService_.autorizarUser = false;
    this.pasoService_.username = "";
    this.pasoService_.domain = "";
    this.pasoService_.dataFileService = [];

    this.router.navigate(["/"]);
  }

}
