import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { PersonService } from "../../claro-video/claroup/service/personservice";
import { Location } from '@angular/common';

import * as moment from "moment";
import { ThrowStmt } from "@angular/compiler";
import { CustomerInformationService } from "src/app/customer/services/customer-information/customer-information.service";
import { Customer } from "src/app/customer/modelo/customer.model";
import { Subscription } from "src/app/customer/modelo/subscription.model";
moment.locale("es");

@Component({
    selector: "app-p3-cli-pagos-realizados",
    templateUrl: "./p3-cli-pagos-realizados.component.html",
    styleUrls: ["./p3-cli-pagos-realizados.component.css"],
    providers: [PersonService],
})
export class P3CliPagosRealizadosComponent implements OnInit {
    public customer: Customer;
    public subscriptions: Subscription[];
    indexInvoice: number;
    currentDebtItems: any;
    indexDetail: number;
    selectedDetail: any;
    selectedDetailInvoice: any;
    payments: any;
    paymentsNoRepe: any = []; // Lista de payments agrupados
    spinStatus: boolean = true;
    errorInvocation: boolean = false;
    invoices: any;
    startDate: any
    endDate: any;
    totalApplyAmount:number;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private personservice: PersonService,
        private _location: Location,
        private customerInformationService: CustomerInformationService
    ) {
        this.spinStatus = true;

        this.customer = <Customer> this.customerInformationService.getCustomerInformation();
        this.subscriptions = <Subscription[]> this.customerInformationService.getCustomerSubscriptions();
        //alert(this.cliente);
        this.currentDebtItems = JSON.parse(localStorage.getItem("currentDebt"));
        this.invoices = JSON.parse(localStorage.getItem("invoices"));
        if (!this.customer) {
            console.error("No existe un cliente encontrado");
        }
        console.log(">>>Cliente encontrado: ", this.customer);
        let detail: string = this.route.snapshot.params.detail;
        var splits = detail.split("__");
        console.log(splits[0] + "...." + splits[1]);
        this.indexInvoice = +splits[0];
        this.indexDetail = +splits[1];
        this.startDate= +splits[2];
        this.endDate= +splits[3];


        //this.selectedSubscription = this.cliente.subscriptions[this.indexClient];
        //console.log("****** this.selectedSubscription");
        // console.dir(this.selectedSubscription);

        this.selectedDetail = this.currentDebtItems.subscriptionsList[
            this.indexDetail
        ];
        this.selectedDetailInvoice = this.invoices[this.indexInvoice];
    }

    ngAfterViewInit() {
        console.log("=============ngAfterViewInit==============");
    }

    /**
     *
     */
    ngOnInit() {
        this.customer = <Customer> this.customerInformationService.getCustomerInformation();

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

        console.log("PROBANDO SERVICIO PAYMENT ===============");

        const invoiceN= this.selectedDetailInvoice.type==='BLL'? this.selectedDetailInvoice.invoiceSn: this.selectedDetailInvoice.document
        this.spinStatus = true; // inicia mostrando el spinner
        this.personservice
            .getCurrentDebtsPaymentInvoice({
                invoiceNo: invoiceN,
                accountCode: this.selectedDetail.contractId,
                startDate: this.startDate,
                endDate: this.endDate
            })
            .then((claroVideoResponse) => {
                console.dir(claroVideoResponse);
                this.payments = claroVideoResponse.payments;
//                alert(JSON.stringify(this.payments));
                this.totalApplyAmount=0;
                for (var j = 0; j < this.payments.length; j++) {
                try {
                    if (this.payments[j].applyAmount !== null) {
                        this.totalApplyAmount+=this.payments[j].applyAmount;
                    }
                    this.totalApplyAmount.toFixed(2);
                } catch (error) {
                    console.log(error);
                }
            } // fin for


                this.spinStatus = false; // DETEN el spinner
                this.errorInvocation = false;
                //this.cliente.subscriptions[this.indexClient].selectedSubscription.subscriptionInformation.currentDebt.details[this.indexDetail];
            },
            (error) => {
                console.dir(error);
              //  alert(JSON.stringify( error.error.message));
                this.errorInvocation = true;
                this.spinStatus = false;
            })
            .catch((errorClaroVideo) => {
                console.dir(errorClaroVideo);
                this.spinStatus = true;
                this.errorInvocation = true;
            });
    }

    verDocumentos() {
        //let index : any = this.cliente.subscriptions.indexOf(subscription);
        //alert(index);
        this.router.navigate([
            "/deudaClienteMovimientos",
            this.indexDetail,
        ]);
    }

    verServicios(subscription: any) {
        let index: any = this.subscriptions.indexOf(subscription);
        this.router.navigate(["/servicios", index]);
    }

    backMovimientos() {
       // this.router.navigate(["/deudaClienteMovimientos", this.indexDetail]);
        this._location.back();
    }
}
