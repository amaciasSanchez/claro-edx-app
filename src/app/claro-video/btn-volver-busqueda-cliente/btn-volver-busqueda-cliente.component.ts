import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-volver-busqueda-cliente',
  templateUrl: './btn-volver-busqueda-cliente.component.html',
  styleUrls: ['./btn-volver-busqueda-cliente.component.css']
})
export class BtnVolverBusquedaClienteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  volver() {
    //Se elimina la información que tiene el usuario en la sesion 
    localStorage.removeItem('cliente');
    localStorage.removeItem('clienteClaroUP');
    localStorage.removeItem('fullLoad');
    localStorage.removeItem('flagModeSearch');

    if(this.router.url === "/bestoffer/1"){
      window.location.reload();
    }else{
      this.router.navigate(["/bestoffer/1"]);
    }

  }
}
