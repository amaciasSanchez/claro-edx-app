import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PersonService } from '../claroup/service/personservice';
import {BestofferComponent} from '../claroup/view/bestoffer.component';

@Component({
  selector: 'app-mensaje-busqueda-cliente',
  templateUrl: './mensaje-busqueda-cliente.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./mensaje-busqueda-cliente.component.css']
})
export class MensajeBusquedaClienteComponent implements OnInit {
  BUSQUEDA_CLIENTE_CODE: string = `${environment.MESSAGES.BUSQUEDA_CLIENTE}`;
  BUSQUEDA_CLIENTE_LABEL: 'BUSQUEDA_CLIENTE_MESSAGE';
  @Input() data: any;
  cliente: "";
  identificacionCliente: string;
  messageToAdd: string;
  mensaje1: string = '';
  mensaje2: string = '';
  mensaje3: string = '';
  
  constructor(private router: Router, private comp: BestofferComponent, public service: PersonService) { 
  }
  
  ngOnInit() {
    this.mensaje1 = "Información importante: Recuerda que si consultas por número de identificación del cliente, las consultas que realices en CLARO EDX tomarán un poco más de tiempo pero te permitirán ver información de todos los servicios del usuario.";
    this.mensaje2 = "Consultar por ";
    this.mensaje3 = "te ayudará a que el sistema responda más rápido, sin embargo en este caso solo podrás visualizar la información del servicio específico consultado.";

  }

  redirect() {
    //Se elimina la información que tiene el usuario en la sesion.
    localStorage.removeItem('cliente');
    localStorage.removeItem('clienteClaroUP');
    localStorage.removeItem('fullLoad');
    localStorage.removeItem('flagModeSearch');
    
    //Cambio de vista a buscar cliente
    this.comp.activeIndexChange(0, false);
  }

  
}
