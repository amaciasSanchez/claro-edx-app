import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Location } from '@angular/common';

import { PersonService } from '../claroup/service/personservice';
import { ItemsProcessBpmComponent } from '../items-process-bpm/items-process-bpm.component';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
import { Customer } from 'src/app/customer/modelo/customer.model';
moment.locale("es");

@Component({
    selector: 'app-bundle-process',
    templateUrl: './bundle-process.component.html',
    styleUrls: ['./bundle-process.component.css'],
    providers: [PersonService]
})
export class BundleProcessComponent implements OnInit, AfterViewInit {
    public customer: Customer;
    aProgressSpinner = false;
    modal: any = {
        message: "Ocurrio un error, por favor intente mas tarde",
        type: "ERROR",
        visible: false
    };
    isVisibleBotones = false;
    proceso: any;
    bundle: any;
    checked = false;
    modalAcepta = false;
    modalAdvertencia = false;
    titulo =" "
    /************************************************************************ */
    resultModal: any = {
        isVisible: false,
        type: 'SUCCESS',
        message: 'test',
        paso: 1
    };

    /************************************************************************ */
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
        this.bundle = history.state;
        console.debug( JSON.stringify(this.bundle));

        if (this.bundle.correo == null) {
            this.bundle.correo = "";
        }

        if (this.bundle.proceso == null) {
            this.router.navigate(["/bestoffer/2"]);
        }
        this.proceso = this.bundle.proceso;

        this.titulo  = this.proceso.processInstanceDesc + ' ' + this.proceso.processInstanceId

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

    }

    atras(){

    }
    siguiente() {
        if (this.bundle.paso == 1) {
            console.debug(this.itemsProcessBpm.correoCliente);
            this.validaCorreo();
        } else if (this.bundle.paso == 3) {
            this.showAdvertencia();
        }
    }

    validaCorreo() {
        console.debug(this.itemsProcessBpm.correoCliente);
        if (this.itemsProcessBpm.correoCliente == null || this.itemsProcessBpm.correoCliente.length < 1) {
            this.resultModal = {
                isVisible: true,
                type: 'ERROR',
                message: 'Ingrese un correo valido',
                paso: 1
            };
        } else {


            let data = {
                email: this.itemsProcessBpm.correoCliente,
                processInstanceId: this.bundle.processId
            }
            this.showLoading();

            this.personservice.validateMail(data).subscribe(
                resp => {
                    if (resp.code == "404") {
                        this.crearClaroId();
                    } else if (resp.code == "200") {
                        this.hideLoading();
                        this.resultModal = {
                            isVisible: true,
                            type: 'SUCCESS',
                            message: resp.message,
                            paso: 2
                        };
                    } else if (resp.code == "409") {
                        this.hideLoading();
                        this.resultModal = {
                            isVisible: true,
                            type: 'ERROR',
                            message: resp.message,
                            paso: 1
                        };
                    }
                    else {
                        this.resultModal = {
                            isVisible: true,
                            type: 'ERROR',
                            message: resp.message,
                            paso: 1
                        }
                    }
                },
                error => {
                    this.resultModal = {
                        isVisible: true,
                        type: 'ERROR',
                        message: 'Ocurrio un error, intente mas tarde',
                        paso: 1
                    };
                }
            );
        }
    }
    crearClaroId() {
        let addr = [];
        addr.push({
            city: this.customer.contactInformation.district,
            state: this.customer.contactInformation.province,
            street1: this.customer.contactInformation.addressLine1,
            street2: this.customer.contactInformation.addressLine2,
            type: "Home"
        });
        let activateData = {
            birthDate: this.customer.personalInformation.birthday,
            claroID: this.itemsProcessBpm.correoCliente,
            address: addr,
            country: this.customer.contactInformation.country,
            channel: "Claro-Video",
            firstName: this.customer.personalInformation.fullName,
            identificationId: this.customer.personalInformation.identificationNumber,
            identificationType: this.customer.personalInformation.identificationType,
            lastName: this.customer.personalInformation.fullName,
            serviceNumber: this.itemsProcessBpm.proceso.processInstanceVariables.serviceNumber,
            subscriberId: this.itemsProcessBpm.proceso.processInstanceVariables.serviceNumber

        }
        console.debug(activateData);
        this.personservice.initTaskBundleCreateClaroIdAccount(activateData, this.itemsProcessBpm.proceso.processInstanceId).subscribe(
            resp => {
                if (resp.code == "200") {
                    this.hideLoading();
                    this.bundle.correo= this.itemsProcessBpm.correoCliente;
                    this.resultModal = {
                        isVisible: true,
                        type: 'SUCCESS',
                        message: resp.message,
                        paso: 2
                    }
                } else if (resp.code == "422") {

                    this.obtenerClaroId(resp);
                }
                else {
                    this.resultModal = {
                        isVisible: true,
                        type: 'ERROR',
                        message: resp.message,
                        paso: 1
                    }
                }
            },
            error => {
                this.hideLoading();
                this.resultModal = {
                    isVisible: true,
                    type: 'ERROR',
                    message: 'Ocurrio un error, intente mas tarde',
                    paso: 1
                };
            }
        );
    }

    obtenerClaroId(data) {
        this.personservice.getProfileBySubscriberId(this.itemsProcessBpm.proceso.processInstanceVariables.serviceNumber).subscribe(
            respo => {
                this.hideLoading();
                let arrayProfile: any[] = respo;
                if (arrayProfile.length > 0) {
                    if (arrayProfile[0].claroID != null) {
                        this.itemsProcessBpm.correoCliente = arrayProfile[0].claroID;
                        this.bundle.correo= this.itemsProcessBpm.correoCliente;
                        this.resultModal = {
                            isVisible: true,
                            type: 'SUCCESS',
                            message: data.message,
                            paso: 2
                        }

                    } else {
                        this.resultModal = {
                            isVisible: true,
                            type: 'ERROR',
                            message: "Ocurrio un error no se pudo crear un claro id, asociado a este correo",
                            paso: 1
                        }
                    }

                } else {

                    this.resultModal = {
                        isVisible: true,
                        type: 'ERROR',
                        message: "Ocurrio un error no se pudo crear un claro id, asociado a este correo",
                        paso: 1
                    };

                }


            },
            error => {
                this.hideLoading();

                this.resultModal = {
                    isVisible: true,
                    type: 'ERROR',
                    message: "Ocurrio un error no se pudo crear un claro id, asociado a este correo",
                    paso: 1
                };
            }

        );
    }

    showAdvertencia() {
        this.modalAdvertencia = true;
    }
    activarServicio() {
        this.modalAdvertencia = false;
        this.bundle.paso = 4;


        this.showLoading();
        this.personservice.initTaskBundleActivateService(this.itemsProcessBpm.proceso.processInstanceId).subscribe(
            resp => {
                console.debug("initTaskBundleActivateService ->" + resp);

                this.hideLoading();
                if (resp.code == "200") {
                    this.resultModal = {
                        isVisible: true,
                        type: 'SUCCESS',
                        message: resp.message,
                        paso: 5
                    }
                }
                else {
                    this.resultModal = {
                        isVisible: true,
                        type: 'ERROR',
                        message: resp.message,
                        paso: 3
                    }
                }
            },
            error => {
                console.debug(error);
                this.hideLoading();
                this.resultModal = {
                    isVisible: true,
                    type: 'ERROR',
                    message: 'Ocurrio un error, intente mas tarde',
                    paso: 3
                };
            }
        );
    }
    aceptaRiesgo() {
        this.bundle.paso = 3;
        this.modalAcepta = false;
    }
    dismissResultModal(event: any) {
        this.resultModal.isVisible = false;
        console.debug(event);
        if (event.paso == 1) {
        } else if (event.paso == 2) {
            this.bundle.paso = 2;
            this.modalAcepta = true;
        } else if (event.paso == 3) {
            this.bundle.paso = 3;
        } else if (event.paso == 5) {
            this.router.navigate(["/bestoffer/2"]);
        }
        console.debug(this.bundle);
    }
}
