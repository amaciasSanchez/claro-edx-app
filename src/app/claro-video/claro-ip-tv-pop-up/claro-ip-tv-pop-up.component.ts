import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-claro-ip-tv-pop-up',
  templateUrl: './claro-ip-tv-pop-up.component.html',
  styleUrls: ['./claro-ip-tv-pop-up.component.css']
})
export class ClaroIpTvPopUpComponent implements OnInit {

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



