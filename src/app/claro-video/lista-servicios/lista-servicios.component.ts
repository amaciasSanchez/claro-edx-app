import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-lista-servicios',
    templateUrl: './lista-servicios.component.html',
    styleUrls: ['./lista-servicios.component.css']
})
export class ListaServiciosComponent implements OnInit {
    @Input() subscription: any;

    constructor() { }

    ngOnInit() { }

}
