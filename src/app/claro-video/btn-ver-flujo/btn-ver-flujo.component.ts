import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-ver-flujo',
  templateUrl: './btn-ver-flujo.component.html',
  styleUrls: ['./btn-ver-flujo.component.css']
})
export class BtnVerFlujoComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() flujo: any;

  ngOnInit() {
  }
  verFlujo() {
    this.router.navigate( ["/flujo"],{ state: this.flujo });

  }

  volverEtapa(){
    if(this.flujo.proceso == 'bundle'){

    }else if (this.flujo.proceso == 'standalone'){
      this.router.navigate( ["/claro-video-bpm"],{ state: this.flujo.content });

    }

  }

}
