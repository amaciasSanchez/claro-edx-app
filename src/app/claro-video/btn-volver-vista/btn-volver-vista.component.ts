import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-volver-vista',
  templateUrl: './btn-volver-vista.component.html',
  styleUrls: ['./btn-volver-vista.component.css']
})
export class BtnVolverVistaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  volver() {

    console.debug(this.router.url);
    if(this.router.url === "/bestoffer/2"){
        window.location.reload();
    }else{
      this.router.navigate(["/bestoffer/2"]);
    }

  }
}
