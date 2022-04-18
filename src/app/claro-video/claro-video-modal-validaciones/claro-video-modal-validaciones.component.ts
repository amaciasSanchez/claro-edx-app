import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-claro-video-modal-validaciones',
  templateUrl: './claro-video-modal-validaciones.component.html',
  styleUrls: ['./claro-video-modal-validaciones.component.css']
})
export class ClaroVideoModalValidacionesComponent implements OnInit {
  @Input() type;
  @Input() message;
  @Input() modal;
  @Output() hideModal: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }
  hide(){
    this.hideModal.emit();

  }


}
