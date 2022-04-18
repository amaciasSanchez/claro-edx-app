import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entidades',
  templateUrl: './entidades.component.html',
  styleUrls: ['./entidades.component.css']
})
export class EntidadesComponent implements OnInit {

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
