import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Location } from '@angular/common';

import { PersonService } from '../claroup/service/personservice';
import { ItemsProcessBpmComponent } from '../items-process-bpm/items-process-bpm.component';
import { EstadoProceso } from '../flujo-actual-claro-video/flujo-actual-claro-video.component';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
moment.locale("es");

@Component({
    selector: 'app-all-process',
    templateUrl: './all-process.component.html',
    styleUrls: ['./all-process.component.css'],
    providers: [PersonService]
})
export class AllProcessComponent implements OnInit, AfterViewInit {
    customer: Customer;
    aProgressSpinner = false;
    modal: any = {
        message: "Ocurrio un error, por favor intente mas tarde",
        type: "ERROR",
        visible: false
    };
    isVisibleBotones = false;
    procesos: any;

    @ViewChild(ItemsProcessBpmComponent, { static: false }) itemsProcessBpm!: ItemsProcessBpmComponent;


    ngAfterViewInit() {
        // Ahora puedes utilizar el componente hijo
    }

    constructor(private personservice: PersonService, 
        private router: Router, 
        private _location: Location,
        private customerInformationService: CustomerInformationService) {

    }

    ngOnInit() {
        this.customer = <Customer> this.customerInformationService.getCustomerInformation();
        console.debug(this.customer);
        this.showLoading();
        this.personservice.getAllProcessByTypes(this.customer.personalInformation.identificationNumber, this.customer.customerId, "").subscribe(
            data => {
                this.procesos = data.processInstance;
                console.debug(this.procesos)
                this.hideLoading();

            },
            error => {
                this.hideLoading();
                this.showModalError();
            }
        );

    }

    showModalError() {
        this.modal = {
            message: "Ocurrio un error, por favor intente mas tarde",
            type: "ERROR",
            visible: true
        };
    }
    hideModal() {
        this.modal = {
            message: "Ocurrio un error, por favor intente mas tarde",
            type: "ERROR",
            visible: false
        };
        this._location.back();

    }
    showLoading() {
        this.aProgressSpinner = true;
    }
    hideLoading() {
        this.aProgressSpinner = false;
    }


    loadinpageClick(data: any) {
        this.aProgressSpinner = data.aProgressSpinner;
    }


    siguientepaso(data) {
        if(data.proceso.processName == 'standalone'){
            let flujoProces: EstadoProceso = {
                paso:0,
                proceso: data.proceso,
                processId: data.proceso.processInstanceId,
                title: data.proceso.processInstanceDesc,
                subscriptionId: data.proceso.processInstanceVariables.serviceNumber,
                type: "standalone"
            }
            this.router.navigate(['/claro-video-bpm'], { state: flujoProces });
        }else if(data.proceso.processName == 'bundle'){
            let flujoProces: EstadoProceso = {
                paso:1,
                proceso: data.proceso,
                processId: data.proceso.processInstanceId,
                title: data.proceso.processInstanceDesc,
                subscriptionId: data.proceso.processInstanceVariables.serviceNumber,
                type: "bundle"
            }
            this.router.navigate(['/process-bundle'], { state: flujoProces });
        }
    }
}
