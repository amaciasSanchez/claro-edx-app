import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PersonService } from "../claroup/service/personservice";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {ClaroUpPersonService} from "../../claro-up/services/personservice";
import {isNullOrUndefined} from "util";
import {map, timeout, timeoutWith} from "rxjs/operators";
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Component({
    selector: "app-offer-detail",
    templateUrl: "./offer-detail.component.html",
    styleUrls: ["./offer-detail.component.css"],
    providers: [PersonService, NgbModalConfig, NgbModal]
})
export class OfferDetailComponent implements OnInit {
    @Input() item: any;
    @Input() service: any;
    itemsBreadcrumb: any;
    @Output() regresarClick: EventEmitter<any> = new EventEmitter<any>();
    seguro: any = {};
    loadOfertaActivada: boolean = false;
    activarSeguro: boolean = false;
    loadingModalCerrar: boolean = false;
    errorActivarOferta: boolean = false;
    claroSignatureUrl: any = "#";

    mensaje = {
        error: ""
    };
    constructor(
        private personservice: ClaroUpPersonService,
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        config.backdrop = "static";
        config.keyboard = false;
        config.centered = true;
        config.container = "body";
    }

    ngOnInit() {
        console.debug("this.item", this.item);
        console.debug("servicedddd", this.item.infoCliente);
        this.claroSignatureUrl = "#";
        this.itemsBreadcrumb = [{ label: "Regresar" }];

        this.seguro.customerId = this.item.infoCliente.customerId;
        this.seguro.identificationType = this.item.infoCliente.personalInformation.identificationType;
        this.seguro.identificationNumber = this.item.infoCliente.personalInformation.identificationNumber;
        this.seguro.fullName = this.item.infoCliente.personalInformation.fullName;

        this.seguro.serviceNumber = this.item.oferta.cellphoneNumber;

        this.seguro.imei = this.item.oferta.imei;

        this.seguro["offeringId"] = this.item.oferta.offerCode;
        this.seguro["offeringCode"] = this.item.oferta.offerCode;
        this.seguro["offeringCategory"] = "";
        this.seguro["offeringName"] = this.item.oferta.name;
        this.seguro["isPrimary"] = "";
        this.seguro["price"] = this.item.oferta.price;
        this.seguro["companyId"]  = "2";
        this.seguro["names"] = this.seguro.fullName;
        this.seguro["sku"] = this.item.oferta.sku;
        this.seguro["accountId"] = this.item.infoCliente.subscriptions[0].user.id;
        this.seguro["imei"] = this.item.oferta.imei;
        this.seguro.totalAmount = this.item.oferta.price;
        this.seguro.accountId = this.seguro.customerId;
        this.seguro.userAuthenticated = sessionStorage.getItem("user");
        console.debug("this.seguro", this.seguro);
    }

    regresar() {
        this.regresarClick.emit();
    }

    // activacionSeguro() {
    //     console.debug("activacionSeguro: ", this.seguro);
    //     this.loadOfertaActivada = true;
    //     this.activarSeguro = true;
    //     this.personservice.activateOffer(this.seguro).subscribe(
    //         resp => {
    //             this.loadOfertaActivada = true;
    //             this.activarSeguro = true;
    //             console.debug("resp", resp);
    //         },
    //         error => {
    //             this.loadOfertaActivada = true;
    //             this.activarSeguro = true;
    //         }
    //     );
    // }

    activacionSeguro(content) {
        this.errorActivarOferta = false;
        this.loadOfertaActivada = false;
        this.activarSeguro = true;
        this.personservice.activateOffer(this.seguro).pipe(timeout(environment.timeOutActivation)).
        subscribe(
            resp => {
                if(isNullOrUndefined(resp)){
                    this.loadOfertaActivada = false;
                    this.activarSeguro = false;
                    this.errorActivarOferta = true;
                    this.mensaje.error = "Ha ocurrido un error inesperado al activar la oferta, intente más tarde";
                    this.modalService.open(content);
                }
                else if (resp.activateMessageResponse.code === "0") {
                    this.errorActivarOferta = false;
                    this.loadOfertaActivada = true;
                    this.activarSeguro = true;
                    this.modalService.open(content);
                    if(resp.activateMessageResponse.sessionData.externalSubscriberProperties.length > 0){
                        let responseOrder = resp.activateMessageResponse.sessionData.externalSubscriberProperties.filter((x) => x.id === "ORDEN");
                        if(responseOrder.length > 0){
                            let orderCode: String = responseOrder[0].value[0];
                            let date = new Date();
                            this.claroSignatureUrl = `${environment.claroUp.claroSignatureUrl}` + orderCode + "?time=" + date.getTime();
                           // console.debug(this.claroSignatureUrl);
                        }
                    }
                } else {
                    this.loadOfertaActivada = false;
                    this.activarSeguro = false;
                    this.errorActivarOferta = true;
                    this.mensaje.error = resp.activateMessageResponse.message;
                    this.modalService.open(content);
                }
            },
            error => {
                this.loadOfertaActivada = false;
                this.activarSeguro = false;
                this.errorActivarOferta = true;
                this.mensaje.error = "El servicio no se encuentra disponible, intente más tarde";
                this.modalService.open(content);
            }
        );

    }

    warningMessage : boolean = false;
    customerDataWithError: string[] = [];

    validateCustomer(content) {
        this.activarSeguro = true;
        let params = {
            identificationNumber: String(
                this.item.infoCliente.personalInformation.identificationNumber
            ),
            identificationType: String(
                this.item.infoCliente.personalInformation.identificationType
            ),
            serviceNumber: String(
                this.item.oferta.cellphoneNumber
            )
        };
        console.log('Valores a enviar:', params);
        //consumer serviio para validar información del cliente
        this.personservice.validateCustomerInformation(params).subscribe(
            response => {
                if(response.code == "409" && response.response != null) {
                    console.error(response);
                    this.warningMessage = true;
                    this.customerDataWithError = response.response;

                } else if(response.code == "200") {
                    this.activacionSeguro(content);

                } else {
                    console.error('La respuesta del servicio que valida la información del cliente no se puede interpretar: ', response);
                }
                this.activarSeguro = false;
            }, error => {
                console.error('Ocurrió un error consumiendo el servicio que valida la información del cliente: ', error);
                this.activarSeguro = false;
            }
        );
    }

    cerrar() {
        this.loadingModalCerrar = true;
        setTimeout(() => {
            this.loadOfertaActivada = false;
            this.activarSeguro = false;
            this.loadingModalCerrar = false;
            this.errorActivarOferta = false;
        }, 100);
        this.modalService.dismissAll();
    }

    // open(content) {
    //     if (this.errorActivarOferta || this.loadOfertaActivada) {
    //         this.modalService.open(content);
    //         console.debug("ENRTO");
    //     }
    // }
}
