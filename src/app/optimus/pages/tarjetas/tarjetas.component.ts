import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    
    private _location : Location
  ) { }

  ngOnInit() {
  }

  back(){
    this._location.back();
  }
 
  
  actionHandler(data) {
    
  }

}
