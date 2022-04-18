import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-app-claro-ott-alert-success',
  templateUrl: './app-claro-ott-alert-success.component.html',
  styleUrls: ['./app-claro-ott-alert-success.component.css']
})
export class AppClaroOttAlertSuccess implements OnInit {
  @Input() activarpopover;
  @Output() btnEntendido: EventEmitter<any> = new EventEmitter<any>();
  @Input() offer: any = { };
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }
  actionClose() {
    this.btnEntendido.emit({
      closeOverlay: false
    })

  }

}
