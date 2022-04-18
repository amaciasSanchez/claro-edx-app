import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-claro-video-modal-claro-id',
  templateUrl: './claro-video-modal-claro-id.component.html',
  styleUrls: ['./claro-video-modal-claro-id.component.css']
})
export class ClaroVideoModalClaroIdComponent implements OnInit {
  @Input() activarpopover = true;
  @Output() dismiss: EventEmitter<any> = new EventEmitter();


  constructor() { }
 
  ngOnInit() {

  }
  ocultar(){
    this.dismiss.emit();
  }

}
