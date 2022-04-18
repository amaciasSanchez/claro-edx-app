import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-info-bundle',
  templateUrl: './modal-info-bundle.component.html',
  styleUrls: ['./modal-info-bundle.component.css']
})
export class ModalInfoBundleComponent implements OnInit {
  @Input() showModalInfoBundle: boolean;
  @Output() dismissInfo: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  dismiss(){
    this.dismissInfo.emit(
      {
          isVisible: false
      }
  );
  }
}
