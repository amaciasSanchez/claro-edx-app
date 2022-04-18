import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { PersonService } from "../../claro-video/claroup/service/personservice";
import { Location } from '@angular/common';

import * as moment from "moment";
import { Customer } from "src/app/customer/modelo/customer.model";
import { CustomerInformationService } from "src/app/customer/services/customer-information/customer-information.service";
moment.locale("es");

@Component({
    selector: "app-p6-cli-estado-cuenta",
    templateUrl: "./p6-cli-estado-cuenta.component.html",
    styleUrls: ["./p6-cli-estado-cuenta.component.css"],
    providers: [PersonService],
})
export class P6CliEstadoCuentaComponent implements OnInit {
    public customer: Customer;
    selectedSubscription: any;
    indexClient: number;
    mapaTiposTx: Map<string, any>;
    mapaEstadoDet: Map<string, any>;
    currentDebtItems: any;
    indexCurrentDebt: number;
    selectedCurrentDebt: any = {};
    spinStatus: boolean = true;
    errorInvocation:  boolean = false; 
    indexSubs: number; // indice que llega
    selectSub: any; // lo que se recupera del Storage
    // Datos para el servicio  de invocacion
    startDate: string = "20200101000000";
    endDate: string = "20201231235959";
    month: number=12;
    /**
     *
     */
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private personservice: PersonService,
        private _location: Location,
        private customerInformationService: CustomerInformationService
    ) {
        this.spinStatus = true;
        this.customer = <Customer> this.customerInformationService.getCustomerInformation();

        if (!this.customer) {
            console.error("No existe un cliente encontrado");
        }
        console.log(">>>Cliente encontrado: ", this.customer);
    } // fin de constructor

    /******************
     *
     */
    ngOnInit() {
        this.mapaTiposTx = this.initTabla();
        this.customer = <Customer> this.customerInformationService.getCustomerInformation();
        this.currentDebtItems = JSON.parse(localStorage.getItem("currentDebt"));

        if (!this.customer) {
            console.error("No existe un cliente encontrado");
        }
        console.log(">>>Cliente encontrado: ", this.customer);
        let fechaNacimiento = "";
        if (this.customer.personalInformation.birthday) {
            fechaNacimiento = moment(this.customer.personalInformation.birthday)
                .utc()
                .format("DD MMMM YYYY");
            this.customer.personalInformation.birthday = fechaNacimiento;
        } else this.customer.personalInformation.birthday = "";
        this.indexCurrentDebt = this.route.snapshot.params.subscription;
        console.log(JSON.stringify(this.route.snapshot.params));
        // ACTIVAR PARA PRODUCCION

        this.selectedCurrentDebt = this.currentDebtItems.subscriptionsList[
            this.indexCurrentDebt
        ];

        console.log("PROBANDO SERVICIO PAYMENT ===============");

        this.verFecha1Year();

        //
    } // fin onInit

    invocarDatosPagina() {
        //alert(this.selectedCurrentDebt.contractId);
        //alert(this.selectedCurrentDebt.accountId); 
        this.spinStatus=true;  // inicia mostrando el spinner
        try {
        this.personservice
            .getAccountBalance({
                accountId: this.selectedCurrentDebt.accountId,
                startDate: this.startDate,
                endDate: this.endDate,
                accountCode: this.selectedCurrentDebt.contractId,
                total: this.selectedCurrentDebt.totalAmount,
            })
            .subscribe((claroVideoResponse) => {
                console.log("RESPONSE ********************* ");
                
                this.selectedCurrentDebt.invoices =
                    claroVideoResponse.transactions;
                var arr = this.selectedCurrentDebt.invoices;
                for (var j = 0; j < arr.length; j++) {
                    try {
                        var am: number = arr[j].amount;
                        arr[j].amount =  am.toFixed(2);

                    } catch (error) {
                        console.log(error);
                    }
                    try {
                        var am: number = arr[j].previousAmount;
                        arr[j].previousAmount =  am.toFixed(2);

                    } catch (error) {
                        console.log(error);
                    }

                    try {
                        var am: number = arr[j].openAmount;
                        arr[j].openAmount =  am.toFixed(2);;
                        
                    } catch (error) {
                        console.log(error);
                    }

                } // fin for ANINADO transforrmacion

                this.spinStatus=false;  // DETEN el spinner
                // NORMALIZAR LAS FECHAS que vienen en String y llenas de ceros!
            },
            (error) => {
                console.dir(error);
                this.errorInvocation = true;
                this.spinStatus = false;
            }//
            ); // fin invocation
        } catch (error) {
            console.dir("Error en carga de tipo: " + error);
            console.log("spinStatus  true l:110 catch error");
            this.errorInvocation = true;
            this.spinStatus = false;
            // handle error, only executed in case of error
        }
    }

    volver() {
        this._location.back();
    }
    irReferencia(detail: any) {
    
        let invoices=[];
        let index = -1;
        for(var i=0;i<this.selectedCurrentDebt.invoices.length;i++){
            let invoice=this.selectedCurrentDebt.invoices[i];
            let aux={
                "amount": invoice.amount,
                "billCycleBeginTime": invoice.billCycleBeginTime,
                "billCycleEndTime": invoice.billCycleEndTime,
                "invoiceSn": invoice.reference,
                "document": invoice.reference,
                "openAmount": invoice.originalOpenAmount,
                "status": invoice.status,
                "statusDescription": invoice.status,
                "type": invoice.type,
                "typeDescription":invoice.typeDescription,
                "statusdes":invoice.status,
                "typedes":invoice.typeDescription

               // "typeDescription": "string"
            };
            
            invoices.push(aux);
            console.log(detail.reference +"   "+aux.invoiceSn)
            if(detail.reference ===aux.invoiceSn){
                index= i;
            }

        }
        this.router.navigate(["/deudaClienteValorPendiente"]);
        localStorage.setItem('invoices', JSON.stringify(invoices));
       // let index : any =  invoices.indexOf(detail);
        let index2 : any =   this.currentDebtItems.subscriptionsList.indexOf(this.selectedCurrentDebt);
    
        let sign = ""+index+"__"+index2+"__"+this.startDate+"__"+this.endDate;

        console.log("REDIRECCION2");
        this.router.navigate(["/deudaClientePagos",sign]);
    }

    verSiguientePagina() {
        //let index : any = this.cliente.subscriptions.indexOf(subscription);
        //alert(index);
        this.router.navigate([
            "/deudaClienteMovimientos",
            this.indexCurrentDebt,
        ]);
    }

    verFecha31Dias() {
        this.endDate = moment().format("YYYYMMDD") + "235959";
        let fecha = moment().add(-1, "month");
        this.startDate = fecha.format("YYYYMM") + "01235959"; //"20201101000000";
        this.invocarDatosPagina();
    }
    verFecha3Meses() {
        this.endDate = moment().format("YYYYMMDD") + "235959";
        let fecha = moment().add(-3, "month");
        this.startDate = fecha.format("YYYYMM") + "01235959"; //"20201101000000";
        this.invocarDatosPagina();
        this.month=3;
    }

    verFecha6Meses() {
        this.endDate = moment().format("YYYYMMDD") + "235959";
        let fecha = moment().add(-6, "month");
        this.startDate = fecha.format("YYYYMM") + "01235959"; //"20201101000000";
        this.invocarDatosPagina();
        this.month=6;
    }

    verFecha1Year() {
        this.endDate = moment().format("YYYYMMDD") + "235959";
        let fecha = moment().add(-12, "month");
        this.startDate = fecha.format("YYYYMM") + "01235959"; //"20201101000000";
        this.invocarDatosPagina();
        this.month=12;
    }
    initTabla() {
        var js = {
            tipos: [
                {
                    tipo: "CNR",
                    categoria: "ADJ",
                    descripcion: "Credit Notes Reversal",
                    comentario: "Credit Notes Reversal",
                    detalles: "Reverso de Nota de Crédito",
                },
                {
                    tipo: "CNT",
                    categoria: "ADJ",
                    descripcion: "Credit Notes",
                    comentario: "Credit Notes",
                    detalles: "Nota de Crédito",
                },
                {
                    tipo: "DNR",
                    categoria: "ADJ",
                    descripcion: "Debit Notes Reversal",
                    comentario: "Debit Notes Reversal",
                    detalles: "Reverso de Nota de Débito",
                },
                {
                    tipo: "DNT",
                    categoria: "ADJ",
                    descripcion: "Debit Notes",
                    comentario: "Debit Notes",
                    detalles: "Nota de Débito",
                },
                {
                    tipo: "CIR",
                    categoria: "ADJ",
                    descripcion: "Credit Notes to Invoicing Reversal",
                    comentario: "Credit Notes to Invoicing Reversal",
                    detalles: "Reverso Nota de Crédito a Facturación",
                },
                {
                    tipo: "CIV",
                    categoria: "ADJ",
                    descripcion: "Credit Notes to Invoicing",
                    comentario: "Credit Notes to Invoicing",
                    detalles: "Nota de Crédito a Facturación",
                },
                {
                    tipo: "DIR",
                    categoria: "ADJ",
                    descripcion: "Debit Notes to Invoicing Reversal",
                    comentario: "Debit Notes to Invoicing Reversal",
                    detalles: "Reverso Nota de Dédito a Facturación",
                },
                {
                    tipo: "DIV",
                    categoria: "ADJ",
                    descripcion: "Debit Notes to Invoicing",
                    comentario: "Debit Notes to Invoicing",
                    detalles: "Nota de Dédito a Facturación",
                },
                {
                    tipo: "PDA",
                    categoria: "DEP",
                    descripcion: "Settle Deposit By Overpayment",
                    comentario: "Settle Deposit By Overpayment",
                    detalles: "Liquidación de Depósito por Pago Anticipado",
                },
                {
                    tipo: "PDU",
                    categoria: "DEP",
                    descripcion: "Payment Deposit Unapplied",
                    comentario: "Payment Deposit Unapplied",
                    detalles:
                        "Pago de Depósito no aplicado. No usado actualmente.",
                },
                {
                    tipo: "DRR",
                    categoria: "DEP",
                    descripcion: "Deposit Request  Reversal",
                    comentario: "Deposit Request  Reversal",
                    detalles: "Reverso Creación de Depósito",
                },
                {
                    tipo: "DEP",
                    categoria: "DEP",
                    descripcion: "Deposit Payment",
                    comentario: "Deposit Payment",
                    detalles: "Pago de Depósito",
                },
                {
                    tipo: "DTI",
                    categoria: "DEP",
                    descripcion: "Deposit Request To Invoicing",
                    comentario: "Deposit Request To Invoicing",
                    detalles:
                        "Creación de Depósito con cargo a Factura. No usado actualmente",
                },
                {
                    tipo: "DTR",
                    categoria: "DEP",
                    descripcion: "Deposit Request To Invoicing Reversal",
                    comentario: "Deposit Request To Invoicing Reversal",
                    detalles:
                        "Reverso de Creación de Depósito con cargo a Factura. No usado actualmente",
                },
                {
                    tipo: "DEL",
                    categoria: "DEP",
                    descripcion: "Deposit Release",
                    comentario: "Deposit Release",
                    detalles: "Liberación del Depósito",
                },
                {
                    tipo: "DOR",
                    categoria: "DEP",
                    descripcion: "Deposit Payment  Reversal",
                    comentario: "Deposit Payment  Reversal",
                    detalles: "Reverso Pago de Depósito",
                },
                {
                    tipo: "DER",
                    categoria: "DEP",
                    descripcion: "Deposit Request",
                    comentario: "Deposit Request",
                    detalles: "Creación del Depósito(Requerimiento)",
                },
                {
                    tipo: "DPR",
                    categoria: "DIP",
                    descripcion: "Dispute Reversal",
                    comentario: "Dispute Reversal",
                    detalles: "Reverso de Disputa",
                },
                {
                    tipo: "DPA",
                    categoria: "DIP",
                    descripcion: "Dispute",
                    comentario: "Dispute",
                    detalles: "Disputa",
                },
                {
                    tipo: "LPF",
                    categoria: "INV",
                    descripcion: "Late Payment Fee Received",
                    comentario: "Late Payment Fee Received",
                    detalles: "Cobro por pago tardío. No utilizado actualmente",
                },
                {
                    tipo: "BLL",
                    categoria: "INV",
                    descripcion: "Bill run",
                    comentario: "Bill run",
                    detalles: "Facturación",
                },
                {
                    tipo: "SCG",
                    categoria: "INV",
                    descripcion: "Surcharge",
                    detalles: "Recargo. No utilizado actualmente",
                },
                {
                    tipo: "PPM",
                    categoria: "PAY",
                    descripcion: "Prepayment",
                    comentario: "Prepayment",
                    detalles: "Pago anticipado",
                },
                {
                    tipo: "PMA",
                    categoria: "PAY",
                    descripcion: "Payment & Applied",
                    comentario: "Payment & Applied",
                    detalles: "Pago hecho a una factura en particular",
                },
                {
                    tipo: "POA",
                    categoria: "PAY",
                    descripcion: "Overpayment Applied",
                    comentario: "Overpayment Applied",
                    detalles: "Aplicación de pago anticipado",
                },
                {
                    tipo: "PMU",
                    categoria: "PAY",
                    descripcion: "Payment Unapplied",
                    comentario: "Payment Unapplied",
                    detalles: "Pagos no aplicados. No utilizado actualmente",
                },
                {
                    tipo: "PMR",
                    categoria: "PAY",
                    descripcion: "Payment Reversal",
                    comentario: "Payment Reversal",
                    detalles: "Reverso de Pago",
                },
                {
                    tipo: "PBP",
                    categoria: "PAY",
                    descripcion: "Payback Prepayment",
                    comentario: "Payback Prepayment",
                    detalles: "Reverso de Pago anticipado",
                },
                {
                    tipo: "RCG",
                    categoria: "RCH",
                    descripcion: "Recharge",
                    comentario: "Recharge",
                    detalles: "Recarga",
                },
                {
                    tipo: "RFR",
                    categoria: "REF",
                    descripcion: "Refund Reversal",
                    comentario: "Refund Reversal",
                    detalles: "Reverso de Reembolso",
                },
                {
                    tipo: "RFD",
                    categoria: "REF",
                    descripcion: "Refund",
                    comentario: "Refund",
                    detalles: "Reembolso",
                },
                {
                    tipo: "SLI",
                    categoria: "SAL",
                    descripcion: "Sale Invoice",
                    comentario: "Sale Invoice",
                    detalles: "Por confirmar",
                },
                {
                    tipo: "OCC",
                    categoria: "SAL",
                    descripcion: "Other charge",
                    comentario: "Other charge",
                    detalles: "Otros Cobros. Usado por el CRM",
                },
                {
                    tipo: "SLR",
                    categoria: "SAL",
                    descripcion: "Sale Reversal",
                    comentario: "Sale Reversal",
                    detalles: "Reverso de Venta. Usado por el CRM",
                },
                {
                    tipo: "TFR",
                    categoria: "TRF",
                    descripcion: "Transfer Reversal",
                    comentario: "Transfer Reversal",
                    detalles: "Reverso de Transferencia",
                },
                {
                    tipo: "TFT",
                    categoria: "TRF",
                    descripcion: "Transfer To",
                    comentario: "Transfer To",
                    detalles: "Transferencia a",
                },
                {
                    tipo: "TFF",
                    categoria: "TRF",
                    descripcion: "Transfer From",
                    comentario: "Transfer From",
                    detalles: "Transferencia desde",
                },
                {
                    tipo: "UPU",
                    categoria: "UAP",
                    descripcion: "Unallocated Payment Unapplied",
                    comentario: "Unallocated Payment Unapplied",
                    detalles: "Pago no asignado no aplicado",
                },
                {
                    tipo: "UPA",
                    categoria: "UAP",
                    descripcion: "Unallocated Payment Applied",
                    comentario: "Unallocated Payment Applied",
                    detalles: "Pago no asignado aplicado",
                },
                {
                    tipo: "WRO",
                    categoria: "WOF",
                    descripcion: "Write-off",
                    comentario: "Write-off",
                    detalles: "Marcación (Write Off)",
                },
                {
                    tipo: "WRR",
                    categoria: "WOF",
                    descripcion: "Write-off Reversal",
                    comentario: "Write-off Reversal",
                    detalles: "Reverso de Marcación (Write Off)",
                },
            ],
        };
        var rMap: Map<string, any> = new Map(js.tipos.map((i) => [i.tipo, i]));
        return rMap;
    }
    verAcuerdos() {
        let index2: any = this.indexCurrentDebt;
        this.router.navigate(["/deudaClienteAcuerdos", index2]);
    }
}
