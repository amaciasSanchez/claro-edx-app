import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claro-video-gestion-claroid',
  templateUrl: './claro-video-gestion-claroid.component.html',
  styleUrls: ['./claro-video-gestion-claroid.component.css']
})
export class ClaroVideoGestionClaroidComponent implements OnInit {
  modalAcepta = true;
  clickAccion;
  atras;
  siguiente;

  constructor() { }
  modalEdit = false;

  ngOnInit() {
  }
  mostrarClaroId(){
    this.modalEdit = true;
  }
  ocultarClaroId(){
    this.modalEdit = false;

  }

}
