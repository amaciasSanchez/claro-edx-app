import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'popover-msg',
    templateUrl: './popover-msg.component.html',
    styleUrls: ['./popover-msg.component.css']
})
export class PopoverMsgComponent implements OnInit, OnChanges {
    @Input() activarpopover;
    @Input() activarbtnPrevNext;
    @Input() activarBtnsConfirmarCancelar: any;
    @Input() activarBtnTransaccionProcesada: any;
    @Input() typeError: any;
    @Output() btnEntendido: EventEmitter<any> = new EventEmitter<any>();
    @Output() btnTransaccionProcesada: EventEmitter<any> = new EventEmitter<any>();
    @Output() regresarVista360: EventEmitter<any> = new EventEmitter<any>();


    constructor() { }
    ngOnChanges(): void {
        console.debug("activarpopover", this.activarpopover)

    }

    ngOnInit() {
        console.debug("typeError", this.typeError);

    }

    actionClose() {
        let activarBtnVerCLaroIDActivado = false;
        if (this.typeError.type === "SUCCESS")
            activarBtnVerCLaroIDActivado = true;

        this.btnEntendido.emit({
            activarpopover: false,
            activarBtnVerCLaroIDActivado
        });

    }

    aceptar() {
        // this.activarBtnTransaccionProcesada = true;
        // activarBtnTransaccionProcesada: this.activarBtnTransaccionProcesada
        this.btnTransaccionProcesada.emit({
        });
    }

    cancelar() {

    }

    regresareView360() {
        this.regresarVista360.emit({

        })
    }

}
