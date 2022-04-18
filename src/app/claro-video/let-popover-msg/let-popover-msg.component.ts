import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-let-popover-msg',
    templateUrl: './let-popover-msg.component.html',
    styleUrls: ['./let-popover-msg.component.css']
})
export class LetPopoverMsgComponent implements OnInit {
    @Input() activarpopover;
    // @Input() activarbtnPrevNext;
    // @Input() activarBtnsConfirmarCancelar: any;
    // @Input() activarBtnTransaccionProcesada: any;
    @Input() typeError: any;
    @Output() btnEntendido: EventEmitter<any> = new EventEmitter<any>();
    // @Output() btnTransaccionProcesada: EventEmitter<any> = new EventEmitter<any>();
    // @Output() regresarVista360: EventEmitter<any> = new EventEmitter<any>();


    constructor() { }

    ngOnInit() {
    }
    actionClose() {
        this.btnEntendido.emit({
            closeOverlay: false
        })

    }
}
