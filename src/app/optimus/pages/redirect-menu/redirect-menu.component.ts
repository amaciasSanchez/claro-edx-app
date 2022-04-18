import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { PasoService } from '../../service/paso.service'

@Component({
  selector: "app-redirect-menu",
  templateUrl: "./redirect-menu.component.html",
  styleUrls: ["./redirect-menu.component.css"]
})
export class RedirectMenuComponent implements OnInit {
  constructor() {}

  ngOnInit() {

    //if(this.pasoService_.autorizarUser == false) {
      //this.router.navigate(["/"]);
    //}

  }
  actionHandler(data) {}
}
