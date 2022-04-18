import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-claro-video-modal-proceso',
  templateUrl: './claro-video-modal-proceso.component.html',
  styleUrls: ['./claro-video-modal-proceso.component.css']
})
export class ClaroVideoModalProcesoComponent implements OnInit {

  @Input() activaModal;
  @Input() proceso: any;
  @Input() offer: any;
  @Output() activarOverlay: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }


  hideoverlay() {
    this.activarOverlay.emit();
  }
}
