import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-claro-ip-tv-alert',
  templateUrl: './claro-ip-tv-alert.component.html',
  styleUrls: ['./claro-ip-tv-alert.component.css']
})
export class ClaroIpTvAlertComponent implements OnInit {

  @Input() activarpopover;
  @Output() btnEntendido: EventEmitter<any> = new EventEmitter<any>();
  @Input() offer: any = {};
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
