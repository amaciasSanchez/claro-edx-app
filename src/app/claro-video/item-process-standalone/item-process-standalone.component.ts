import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-process-standalone',
  templateUrl: './item-process-standalone.component.html',
  styleUrls: ['./item-process-standalone.component.css']
})
export class ItemProcessStandaloneComponent implements OnInit {
  @Input() procesosStandAlone: any;

  constructor() { }

  ngOnInit() {
  }

}
