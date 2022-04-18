import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-claro-video-alert',
  templateUrl: './claro-video-alert.component.html',
  styleUrls: ['./claro-video-alert.component.css']
})
export class ClaroVideoAlertComponent implements OnInit {

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



