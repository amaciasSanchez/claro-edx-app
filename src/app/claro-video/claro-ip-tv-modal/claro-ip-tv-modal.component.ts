import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-claro-ip-tv-modal',
  templateUrl: './claro-ip-tv-modal.component.html',
  styleUrls: ['./claro-ip-tv-modal.component.css']
})
export class ClaroIpTvModalComponent implements OnInit {

  @Input() type;
  @Input() message;
  @Input() modal;
  @Output() hideModal: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.hideModal.emit();
  }

}
