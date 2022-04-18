import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PersonService } from "../../claro-video/claroup/service/personservice";
import * as moment from "moment";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { Customer } from "src/app/customer/modelo/customer.model";
import { CustomerInformationService } from "src/app/customer/services/customer-information/customer-information.service";
moment.locale("es");

@Component({
    selector: "app-p5-cli-acuerdos",
    templateUrl: "./p5-cli-acuerdos.component.html",
    styleUrls: ["./p5-cli-acuerdos.component.css"],
    providers: [PersonService],
})
export class P5CliAcuerdosComponent implements OnInit {
    public customer: Customer;
    currentDebtMap: any;
    spinStatus: boolean = true;
    errorInvocation: boolean = false;
    mapaTiposTx: Map<string, any>;
    mapaEstadoDet: Map<string, any>;
    currentDebtItems: any;
    subcription: any;
    acuerdos: any;
    indexCurrentDebt: number;
    selectedCurrentDebt: any = {};
    constructor(
        private router: Router,
        private personservice: PersonService,
        private route: ActivatedRoute,private _location: Location,
        private customerInformationService: CustomerInformationService
    ) {
        this.spinStatus = true;
        this.customer = <Customer> this.customerInformationService.getCustomerInformation();
        if (!this.customer) {
            console.error("No existe un cliente encontrado");
        } else {
            console.log(">>>Cliente encontrado: ", this.customer);
        }
    }

    ngAfterViewInit() {
        console.log("=============ngAfterViewInit==============");
    }

    ngOnInit() {
        this.customer = <Customer> this.customerInformationService.getCustomerInformation();
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
        } else this.customer.personalInformation.birthday = "";

        if (!this.customer) {
            console.error("No existe un cliente encontrado");
        }
        console.log(">>>Cliente encontrado: ", this.customer);

        console.log("PROBANDO SERVICIO ACUERDOS ===============");
        this.currentDebtItems = JSON.parse(localStorage.getItem("currentDebt"));
        this.indexCurrentDebt = this.route.snapshot.params.id;
        console.log(JSON.stringify(this.route.snapshot.params.id));
        // ACTIVAR PARA PRODUCCION

        this.selectedCurrentDebt = this.currentDebtItems.subscriptionsList[
            this.indexCurrentDebt
        ];
       // alert(JSON.stringify(   this.selectedCurrentDebt.accountId));
        this.personservice
            .getCurrentDebtsPaymentsArrangement({ accountId: this.selectedCurrentDebt.contractId })
            .then((claroVideoResponse) => {
                console.dir(claroVideoResponse);
                this.acuerdos = claroVideoResponse.paymentArrangements;
                localStorage.setItem("acuerdos", JSON.stringify(this.acuerdos));
                this.spinStatus = false;
                this.errorInvocation = false;
            }//
            ,
                    (error) => {
                        console.dir(error);
                        this.errorInvocation = true;
                        this.spinStatus = false;
                    }
            )
            .catch((errorClaroVideo) => {
                console.dir(errorClaroVideo);
            });
        // fin de invocacion
        //
    } //fin onInit

    verMovimientos(detail: any) {
        this.router.navigate([
            "/deudaClienteAcuerdosDetail",
            this.indexCurrentDebt + "_" + this.acuerdos.indexOf(detail),
        ]);
        
    }

    volver() {
        this._location.back();
    }

    verDocumentos() {
        this.router.navigate([
            "/deudaClienteMovimientos",
            this.indexCurrentDebt,
        ]);
    }

    verEstadoCuenta() {
        let index2: any = this.indexCurrentDebt;
        this.router.navigate(["/deudaEstadoCuenta", index2]);
    }

}
