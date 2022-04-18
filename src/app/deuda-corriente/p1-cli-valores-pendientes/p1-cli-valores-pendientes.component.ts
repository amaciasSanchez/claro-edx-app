import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonService } from "../../claro-video/claroup/service/personservice";
import * as moment from "moment";
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { environment } from "src/environments/environment";
import { CustomerInformationService } from "src/app/customer/services/customer-information/customer-information.service";
import { Customer } from "src/app/customer/modelo/customer.model";
moment.locale("es");

@Component({
    selector: "app-p1-cli-valores-pendientes",
    templateUrl: "./p1-cli-valores-pendientes.component.html",
    styleUrls: [],
    providers: [PersonService,MessageService],
})
export class P1CliValoresPendientesComponent implements OnInit {
    public customer: Customer;
    currentDebtMap: any;
    spinStatus: boolean = true;
    errorInvocation: boolean = false;
    mapaTiposTx: Map<string, any>;
    mapaEstadoDet: Map<string, any>;
    currentDebtItems: any;
    searchClientNumber: string;
    //=========================
    msgs: Message[] = [];
    ocultar: boolean = false;
    //=========================
    carga: string = "SIMPLE";  // SIMPLE  FULL   permite saber si la tabla cargo SIMPLE o TOTAL.


    constructor( // 
        private router: Router,  //
        private personservice: PersonService, //
        private service: MessageService,
        private customerInformationService: CustomerInformationService
        ) {
        this.spinStatus = true;
        this.customer = <Customer> this.customerInformationService.getCustomerInformation();
        this.searchClientNumber = this.customerInformationService.getSearchCustomerNumber();
        console.log("search" + this.searchClientNumber);
    }

    ngAfterViewInit() {
        console.log("=============ngAfterViewInit==============");
    }

    recargaCompleta() {
        this.carga = "FULL";
        this.invocacionServicio();

    }

    ngOnInit() {
        setInterval(() => {
            this.ocultar = this.ocultar ? false : true;
        }, 4000);

        this.customer = <Customer> this.customerInformationService.getCustomerInformation();
        this.carga = this.searchClientNumber.startsWith("593")?"SIMPLE":"FULL";
        if (!this.customer) {
            console.error("No existe un cliente encontrado");
        }
        console.log(">>>Cliente encontrado: ", this.customer);
        let fechaNacimiento = "1979-05-14";
        if (this.customer.personalInformation.birthday) {
            fechaNacimiento = moment(this.customer.personalInformation.birthday)
                .utc()
                .format("DD MMMM YYYY");
            this.customer.personalInformation.birthday = fechaNacimiento;
        } else 
            this.customer.personalInformation.birthday = "";
        console.dir(this.customer.personalInformation);
        this.invocacionServicio();
    } //fin onInit


    invocacionServicio() {
        try {
            this.personservice
                .getCurrentDebtDetails({
                    id: this.customer.personalInformation.identificationNumber,
                    type: this.customer.personalInformation.identificationType,
                    serviceNumber: this.searchClientNumber,
                    loadType:this.carga
                })
                .subscribe(
                    (claroVideoResponse) => {
                        console.log("RESPONSE ********************* this.cliente.customerId " + this.customer.personalInformation.identificationNumber);
                        console.dir(claroVideoResponse);
                        var arrx = claroVideoResponse.subscriptionsList;
                        for (var j = 0; j < arrx.length; j++) {
                            try {
                                if (arrx[j].dueMaxTime !== null) {
                                    var fec: string = arrx[j].dueMaxTime;

                                    var anio: string = fec.substr(0, 4);
                                    var mes: string = fec.substr(4, 2);
                                    var dia: string = fec.substr(6, 2);
                                    arrx[j].dueMaxTime =
                                        anio + "-" + mes + "-" + dia;
                                    console.log(">>>>>" + arrx[j].dueMaxTime);
                                }
                                if (arrx[j].totalAmount !== null) {
                                    arrx[j].totalAmount=arrx[j].totalAmount.toFixed(2);}
                                    if (arrx[j].totalOpenAmount !== null) {
                                        arrx[j].totalOpenAmount= arrx[j].totalOpenAmount.toFixed(2);}
                            } catch (error) {
                                console.log(error);
                            }
                        } // fin for

                        this.currentDebtItems = claroVideoResponse.subscriptionsList;

                        localStorage.removeItem("cliente");
                        localStorage.setItem("cliente",JSON.stringify(this.customer));
                        localStorage.removeItem("currentDebt");
                        localStorage.setItem("currentDebt",JSON.stringify(claroVideoResponse));
                        // console.dir(this.cliente)
                        this.spinStatus = false;
                        this.errorInvocation = false;
                        console.log({"spinStatus  false l:98 EXITO": "",
                            "spin ": this.spinStatus,
                            err: this.errorInvocation,
                        });
                    },
                    (error) => {
                        console.dir(error);
                        this.msgs.push({severity: 'error', summary: '', detail: JSON.stringify( error.error.message) });
                        this.errorInvocation = true;
                        this.spinStatus = false;
                    }
                ); // fin invocation0
        } catch (error) {
            alert("Error "+ error);
            console.dir("Error en carga de tipo:(" + this.carga + ") " + error);
            console.log("spinStatus  true l:110 catch error");
            this.errorInvocation = true;
            this.spinStatus = false;
            // handle error, only executed in case of error
        }

    }

    verMovimientos(subscription: any) {
        let index: any = this.currentDebtItems.indexOf(subscription);
        this.router.navigate(["/deudaEstadoCuenta", index]);
    }

}
