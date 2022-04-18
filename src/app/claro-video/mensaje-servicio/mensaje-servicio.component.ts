import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
import {BestofferComponent} from '../claroup/view/bestoffer.component';

@Component({
  selector: 'app-mensaje-servicio',
  templateUrl: './mensaje-servicio.component.html',
  styleUrls: ['./mensaje-servicio.component.css']
})
export class MensajeServicioComponent implements OnInit {
  @Input() data: any;
  cliente: "";
  mensaje1: string = '';
  mensaje2: string = '';
  identificacionCliente: string;
  constructor(private router: Router, private comp: BestofferComponent, private customerInformationService: CustomerInformationService) { }

  ngOnInit() {
    if (!this.customerInformationService.isSearchByServiceNumber()) {
      this.mensaje1 = "Información importante: Tus consultas con CLARO EDX se están realizando por número de indentificación. Esto te permitirá visualizar información de todos los servicios del cliente pero algunos formularios podrán tardar en responder en el caso de que el cliente tenga muchos servicios asociados. Si deseas visualizar un servicio específico puedes retornar a la pantalla de búsqueda ";
      this.mensaje2 = "e ingresar el número de servicio.  ";
    } else {
      this.mensaje1 = "Información importante: Tus consultas con CLARO EDX se están realizando por número de servicio. Si deseas visualizar todos los servicios del cliente puedes retornar a la pantalla de búsqueda ";
      this.mensaje2 = "e ingresar la identificación del abonado.  ";
    }
  }

  redirect() {
    //Se elimina la información que tiene el usuario en la sesion.
    this.customerInformationService.initCustomerInformation();
    //Cambio de vista a buscar cliente
    this.comp.activeIndexChange(0, false);
  }
}
