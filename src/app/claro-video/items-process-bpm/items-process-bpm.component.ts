import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { PersonService } from '../claroup/service/personservice';
import { IfStmt } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
    selector: 'items-process-bpm',
    templateUrl: './items-process-bpm.component.html',
    styleUrls: ['./items-process-bpm.component.css'],
    providers: [PersonService]

})
export class ItemsProcessBpmComponent implements OnInit {
    // @Input() cliente: any;
    @Input() proceso: any;
    @Input() paso: number = 0 ;
    @Input() correoCliente: string = "" ;
    @Output() siguientepaso: EventEmitter<any> = new EventEmitter<any>();
    activarpopover: boolean = false;

    constructor(private personservice: PersonService, private router: Router) { }

    ngOnInit() {


    }

    activarCorreo(proceso: any){
        this.siguientepaso.emit(
            {
                proceso : proceso,
                paso: 1
            }
        );
    }
    dismissInfo(data){
        this.activarpopover = data.isVisible;
    }
    activarOverlay() {
        console.debug('activar overlay')
        this.activarpopover = true;
    }

}
