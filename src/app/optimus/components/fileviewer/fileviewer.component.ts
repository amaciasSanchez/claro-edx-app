import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fileviewer',
  templateUrl: './fileviewer.component.html',
  styleUrls: ['./fileviewer.component.css']
})
export class FileviewerComponent implements OnInit {
  //parametro de salida->retoorna respuesta a componente padre
  @Output()
  loadFile : EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  loadFileView(principal){
    console.debug("this.loadFile.emit");
    this.loadFile.emit({fileView : principal});

  }

}
