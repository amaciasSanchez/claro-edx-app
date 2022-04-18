import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'result-bundle',
  templateUrl: './modal-result-bundle.component.html',
  styleUrls: ['./modal-result-bundle.component.css']
})
export class ModalResultBundleComponent implements OnInit {
  @Input() modal: any;
  @Output() dismissResultModal: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {


  }

  dismiss(){

    this.modal.isVisible = false;
    this.dismissResultModal.emit({
      paso: this.modal.paso
    });
  }

}
