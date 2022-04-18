import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    HostListener
} from "@angular/core";

import { PersonService } from "../claroup/service/personservice";
import { ErrorMessage } from "../../error-message";
import {
    NgbModalConfig,
    NgbModal,
    NgbActiveModal
} from "@ng-bootstrap/ng-bootstrap";

import _ from "underscore";
import {ClaroUpPersonService} from "../../claro-up/services/personservice";

@Component({
    selector: "ngbd-modal-content",
    template: `
        <div class="modal-header">
            <span style="color: #0097a9;">{{ offerName }}</span>
        </div>
        <div class="modal-body">
            <div aria-hidden="false" style="display: block;">
                <div
                    style="padding: 9px !important;width: auto;text-align: center;"
                    *ngIf="!errorActivarOferta"
                >
                    <h3 class="uk-panel-title" style="color: #0097a9;">
                        Seguro activado
                    </h3>
                    <p style="margin-bottom: 25px !important;">
                        El seguro ha sido activado con exito!
                    </p>
                    <p-accordion [activeIndex]="0">
                        <p-accordionTab
                            [transitionOptions]="'0ms'"
                            header="Resumen del seguro contratado"
                        >
                            <div class="div_prima_mensual">
                                <table
                                    class="tabla_resumen uk-overflow-container"
                                    content="string_productos_adicinales"
                                >
                                    <tbody class="ng-scope">
                                        <tr>
                                            <td
                                                style="text-align: left;font-size: 12px;font-family: 'Raleway', Helvetica, Arial, sans-serif;"
                                            >
                                                SEGURO CONTRATADO
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr class="borde_resumen">
                                            <td
                                                class="padding_resumen_bottom"
                                                style="text-align: left;"
                                            >
                                                <span>{{
                                                    seguro.offerName
                                                }}</span>
                                            </td>
                                            <td
                                                class="td_resumen_precio padding_resumen_bottom"
                                                style="text-align: right;color: #f03829;"
                                            >
                                                {{ seguro.price | currency }}
                                            </td>
                                        </tr>

                                        <tr class="borde_resumen">
                                            <td
                                                class="padding_resumen_bottom"
                                                style="text-align: left;"
                                            >
                                                <span>Numero de servicio</span>
                                            </td>
                                            <td
                                                class="td_resumen_precio padding_resumen_bottom"
                                                style="text-align: right;"
                                            >
                                                {{ seguro.serviceNumber }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td
                                                class="td_resumen_plan padding_resumen_top"
                                                style="text-align: left;color:#6d6d6d;"
                                            >
                                                Total Prima Mensual
                                            </td>
                                            <td
                                                class="td_resumen_precio padding_resumen_top"
                                                style="text-align: right;color: #f03829;"
                                            >
                                                {{
                                                    seguro.totalAmount
                                                        | currency
                                                }}
                                            </td>
                                        </tr>
                                        <!-- <tr>
                                    <td class="td_resumen_final">
                                        <span
                                            >Los precios están sujetos a cambios
                                            sin previo aviso.<br />Es importante
                                            que hayas ingresado tus datos
                                            correctamente, asi uno<br />
                                            de nuestros asesores se pondrá en
                                            contacto.</span
                                        >
                                    </td>
                                </tr> -->
                                    </tbody>
                                </table>
                                <br />
                                <br />
                            </div>
                        </p-accordionTab>
                    </p-accordion>

                    <div
                        class="spinner"
                        style="margin: 0 auto;"
                        *ngIf="loadingModalCerrar"
                    >
                        <div class="double-bounce1"></div>
                        <div class="double-bounce2"></div>
                    </div>

                    <a
                        *ngIf="!loadingModalCerrar"
                        class="uk-button boton-cotizador"
                        href="javascript:void(0)"
                        (click)="cerrar()"
                        style="background-color: #428d98 !important;margin-top: 12px;"
                    >
                        <span>Aceptar</span>
                    </a>
                </div>

                <div
                    style="padding: 9px !important;width: auto;text-align: center;"
                    *ngIf="errorActivarOferta"
                >
                    <h3 class="uk-panel-title" style="color: #0097a9;">
                        Error al activar seguro
                    </h3>
                    <p style="margin-bottom: 25px !important;">
                        {{ mensaje.error }}
                    </p>
                    <!-- <div
                class="spinner"
                style="margin: 0 auto;"
                *ngIf="loadingModalCerrar"
            >
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div> -->

                    <a
                        *ngIf="!loadingModalCerrar"
                        class="uk-button boton-cotizador"
                        href="javascript:void(0)"
                        (click)="cerrar()"
                        style="background-color: #428d98 !important;margin-top: 12px;"
                    >
                        <span>Cerrar</span>
                    </a>
                </div>
            </div>
        </div>
    `,
    styleUrls: ["./personalizar-oferta.component.css"]
})
export class NgbdModalContent {
    @Input() offerName;
    @Input() errorActivarOferta;
    @Input() loadingModalCerrar;
    @Input() mensaje;
    @Input() totalAmount;
    @Input() activarSeguro;
    @Input() loadOfertaActivada;
    @Input() seguro;
    constructor(config: NgbModalConfig, public activeModal: NgbActiveModal) {
        config.backdrop = "static";
        config.keyboard = true;
        config.centered = true;
        config.container = "body";
        console.debug("EEEE");
    }

    cerrar() {
        this.loadingModalCerrar = true;
        setTimeout(() => {
            this.loadOfertaActivada = false;
            this.activarSeguro = false;
            this.loadingModalCerrar = false;
            this.errorActivarOferta = false;
        }, 100);

        this.activeModal.dismiss();
    }
}

@Component({
    selector: "app-personalizar-oferta",
    templateUrl: "./personalizar-oferta.component.html",
    styleUrls: ["./personalizar-oferta.component.css"],
    providers: [PersonService]
})
export class PersonalizarOfertaComponent implements OnInit {
    @Input() item: any;
    @Input() origen: any;
    @Input() topicId: any;
    @Input() service: any;
    itemsBreadcrumb: any;
    imeis: any;
    cuentas: any = [];
    selectedValues;
    @Output() regresarClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() loadinpage: EventEmitter<any> = new EventEmitter<any>();

    showModal: boolean = false;
    seleccionado: boolean = false;
    tabView: string = "DISPOSITIVO";
    activarSeguro: boolean = false;
    cuentaSelected: boolean = true;
    loadOfertaActivada: boolean = false;
    loadingModalCerrar: boolean = false;
    ofertas: any;
    cuentasOwner: any = [];
    itemModalDetalle: any = {};
    seguro: any = {};
    selectedFormaPago: any;
    selectedCuenta: String = "";
    disabledBtnActivarSeguro: boolean = true;
    labelPuedeActivarOferta: boolean = false;
    showOfertas: boolean = true;
    loadingOferta: boolean = false;
    selectedServices: any = [];
    errorActivarOferta: boolean = false;
    mensaje = {
        error: ""
    };
    totalPagoOferta: number = 0;
    arrayOrders: any;
    loading: boolean = true;
    numEquipos: number = 0;
    arrayNumEquipo: any;
    arrayDataPersonalizarOferta: any;
    dataFormaPago: any = [];
    arrayActivarSeguro = [];
    errorInterface: ErrorMessage;
    constructor(
        private personservice: ClaroUpPersonService,
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        config.backdrop = "static";
        config.keyboard = true;
        config.centered = true;
        config.container = "body";

        this.errorInterface = {
            isError: false,
            message: ""
        };

    }

    ngOnInit() {
        if (typeof this.item !== "undefined") {
            this.imeis = this.item.infoCliente.subscriptions;
            // console.debug("this.imeis", this.imeis);

            this.seguro.customerId = this.item.infoCliente.customerId;
            this.seguro.identificationType = this.item.infoCliente.personalInformation.identificationType;
            this.seguro.identificationNumber = this.item.infoCliente.personalInformation.identificationNumber;
            this.seguro.fullName = this.item.infoCliente.personalInformation.fullName;
            this.seguro.names = this.item.infoCliente.personalInformation.fullName;
            this.seguro["accountId"] = this.item.infoCliente.subscriptions[0].user.id;
            let arrayCuentas = [];
            this.item.infoCliente.subscriptions.forEach(element => {
                element.paymentMethods.forEach(element => {
                    arrayCuentas.push(element);
                });
            });


            const Cdistintos = [...new Set(arrayCuentas)];
            _.uniq(Cdistintos, "id");

            var destArray = _.uniq(Cdistintos, function (x) {
                return x.id;
            });
            var destArray = _.uniq(Cdistintos, function (x) {
                return x.name;
            });
            // console.debug("destArray", destArray);
        }

        // this.
        let tieneCuentaDebito = 0;
        for (const key in destArray) {
            if (destArray[key].type !== "cash") {
                tieneCuentaDebito++;
            } else {
                tieneCuentaDebito--;
            }
            this.cuentas.push({
                label: destArray[key].description,
                value: destArray[key].id
            });

            if (
                typeof destArray[key].details !== "undefined" &&
                destArray[key].details !== null
            ) {
                this.cuentasOwner.push({
                    label:
                        destArray[key].details.accountNumber +
                        " - " +
                        // destArray[key].accountNumberType +
                        // " " +
                        destArray[key].details.owner,
                    value: destArray[key].details.accountNumber
                });
            }
        }

        if (tieneCuentaDebito > 0) {
            this.labelPuedeActivarOferta = true;
        }
        this.regresarClick.emit({
            page: "HIDDEN_BANNER"
        });
        this.getOrders();
    }
    regresar() {
        if (this.origen === "PRODUCTOS_SERVICIOS") {
            this.regresarClick.emit({
                step: 2,
                page: "PRODUCTOS_SERVICIOS"
            });
        } else {
            this.regresarClick.emit({
                step: 3,
                page: "MEJOR_OFERTA"
            });
        }
    }

    detalleOferta(item) {
        this.showModal = true;
        this.itemModalDetalle = item;
    }

    cambiarPlan(item, off) {
        let activar = false;
        let encontrado = 0;
        // for (let key of this.arrayOrders.orders) {
        for (let iterator of this.arrayDataPersonalizarOferta) {
            console.debug("iterator.orderId ", iterator.orderId);
            console.debug("iterator.indice", iterator.indice);
            // console.debug("orderId", orderId);

            if (item.indice === off.indice) {
                if (iterator.indice === item.indice && iterator.orderId === off.orderId) {
                    for (let element of iterator.ofertas) {

                        if (iterator.indice === item.indice) {
                            // console.debug("INDEX", element.index);
                            // console.debug("element.index ", element.indice);
                            console.debug("indice", item.indice);


                            if (element.offerCode === item.offerCode) {
                                console.debug("ENTREEEEE::", element.elegido);

                                if (element.elegido && off.elegido) {

                                    element.elegido = false;
                                    element.opacity = false;
                                    activar = true;
                                    this.seguro.offering = [];
                                    this.seguro.totalAmount = 0;
                                    // this.totalPagoOferta = this.totalPagoOferta - parseFloat(item.priceTotal);
                                    // this.regresarClick.emit({
                                    //     price: this.totalPagoOferta
                                    // });
                                    off.elegido = false;
                                    iterator.elegido = false;

                                    this.calcularPrecio();
                                    // break;

                                } else {

                                    off.elegido = true;
                                    iterator.elegido = true;
                                    console.debug("FALSE");


                                    // this.seguro.offering = [
                                    //     {
                                    //         offeringId: item.orderId
                                    //             ? item.orderId
                                    //             : item.offerCode,
                                    //         offeringCode: item.offerCode,
                                    //         offeringCategory: "",
                                    //         offerName: item.offerName,
                                    //         isPrimary: "",
                                    //         price: item.priceTotal
                                    //     }
                                    // ];
                                    this.seguro.totalAmount = item.priceTotal;

                                    this.totalPagoOferta += parseFloat(item.priceTotal);
                                    // this.regresarClick.emit({
                                    //     price: this.totalPagoOferta
                                    // });


                                    // this.seguro.offeringCode = item.offerCode;
                                    // this.seguro.offerName = item.offerName;
                                    // this.seguro.priceTotal = item.priceTotal;
                                    // if (element.offerCode === item.offerCode && iterator.indice === indice) {
                                    // if (iterator.elegido) {
                                    element.elegido = true;
                                    element.opacity = false;
                                    activar = false;
                                    this.calcularPrecio();
                                    // }
                                    // }
                                    // break;
                                }

                            } else {

                                console.debug("5555");
                                element.elegido = false;
                                element.opacity = true;
                                this.calcularPrecio();

                                // break;
                            }
                        }
                    }

                    // else {

                    //     console.debug("5555");
                    //     element.elegido = false;
                    //     element.opacity = true;

                    //     // break;
                    // }
                    // encontrado++;
                    // break

                } else {
                    // iterator.elegido = false;
                }
            }
        }
        // if (encontrado > 0) break
        // }

        if (activar) {
            for (let key of this.arrayOrders.orders) {
                for (let iterator of key.orderDetails) {

                    console.debug("iterator.ofertas", iterator.ofertas);
                    if (item.indice === off.indice)
                        if (iterator.indice === item.indice) {
                            for (let element of iterator.ofertas) {
                                console.debug("iterator.indice ", iterator.indice);
                                // if (element.offerCode === item.offerCode)
                                element.opacity = false;
                            }
                        }
                }
            }
        }

        this.detectedChangeActivarOferta();
    }

    calcularPrecio() {
        let precioOferta = 0;
        for (let iterator of this.arrayDataPersonalizarOferta) {
            for (let key of iterator.ofertas) {
                if (key.elegido)
                    precioOferta += parseFloat(key.priceTotal)
            }
        }

        this.regresarClick.emit({
            price: precioOferta
        });
    }



    validarArrayActivarSeguro(): boolean {
        let equiposCompletos = 0;
        let ofertasCompletas = 0;
        this.arrayActivarSeguro = []

        console.debug("arrayOrders.orders", this.arrayOrders.orders);
        console.debug("this.arrayDataPersonalizarOferta", this.arrayDataPersonalizarOferta);
        console.debug("this.selectedServices", this.selectedServices);

        for (let iterator of this.arrayDataPersonalizarOferta) {

            for (let item of iterator.ofertas) {

                if (iterator.indice === item.indice) {

                    if (item.elegido && iterator.elegido) {

                        iterator.seguro = true;
                        equiposCompletos = 0;
                        ofertasCompletas = 0;

                        this.seguro.totalAmount = item.priceTotal;
                        this.seguro["offeringCategory"] = "";
                        this.seguro["offeringCode"] = item.offerCode;
                        this.seguro["offeringId"] = item.offerCode;
                        this.seguro["offeringName"] = item.offerName;
                        this.seguro["price"] = item.priceTotal;
                        this.seguro["isPrimary"] = "";
                        this.seguro["companyId"] = iterator.companyId;
                        this.seguro["employeeCode"] = "";

                        this.seguro["serviceNumber"] = iterator.cellphoneNumber;
                        this.seguro["sku"] = iterator.sku;
                        this.seguro["region"] = "";
                        this.seguro["orgId"] = "";
                        // this.seguro["names"] = "";
                        this.seguro["employeeId"] = "";

                        //   let arraySku=  this.arrayOrders.orders.filter((orden)=>{
                        //         return orden.orderDetails.length>0
                        //     })
                        //     console.debug("arraySku", arraySku);

                        //     for (const key of arraySku) {
                        //         if()
                        //     }

                        this.seguro.imei = iterator.imei
                        this.seguro.userAuthenticated = sessionStorage.getItem("user");

                        for (const imei of this.imeis) {
                            console.debug("imei.subscriptionInformation.serviceNumber ", imei.subscriptionInformation.properties.imei);
                            console.debug(" iterator.imei", iterator.imei);

                            if (
                                imei.subscriptionInformation.properties.imei ===
                                iterator.imei
                            ) {
                                this.seguro.serviceNumber = item.subscriptionInformation.serviceNumber;
                                console.debug("this.seguro.serviceNumber", this.seguro.serviceNumber);

                                break;

                            }
                        }


                        this.arrayActivarSeguro.push(this.seguro);
                        console.debug("ofertasCompletas++++", ofertasCompletas);

                        // break;
                    }

                    // if (iterator.seguro) {
                    //     equiposCompletos = 0;
                    //     ofertasCompletas = 0;
                    //     // break;
                    // }
                }

            }

        }



        if (this.selectedServices.length === this.arrayActivarSeguro.length) {

            return true;

        } else if (this.selectedServices.length > this.arrayActivarSeguro.length) {
            console.debug("ofertasCompletas", ofertasCompletas);
            this.errorInterface = {
                isError: true,
                message:
                    "Seleccione una oferta para cada uno de los equipo elegidos."
            };
            return false
        }
        else if (this.arrayActivarSeguro.length > this.selectedServices.length) {
            console.debug("equiposCompletos", equiposCompletos);

            this.errorInterface = {
                isError: true,
                message:
                    "Seleccione un equipo por cada una de las ofertas elegidas."
            };
            return false
        }




    }

    closeModal() {
        this.showModal = false;
        this.modalService.dismissAll();
    }

    selectedTab(tab) {
        this.tabView = tab;
    }
    typeOf(value) {
        return typeof value;
    }

    activacionSeguro() {
        this.errorActivarOferta = false;
        this.loadOfertaActivada = false;
        this.activarSeguro = true;
        this.errorInterface = {
            isError: false,
            message:
                ""
        };

        if (this.validarArrayActivarSeguro()) {
            console.debug("this.arrayActivarSeguro", this.arrayActivarSeguro);

            this.personservice.activateOfferLote({ requestActivateOfferList: this.arrayActivarSeguro }).subscribe(
                resp => {
                    console.debug("resp", resp);
                    if (resp !== null) {
                        if (resp[0].activateMessageResponse.code === 0) {
                            this.loadOfertaActivada = true;
                            this.activarSeguro = true;
                            const modalRef = this.modalService.open(NgbdModalContent);
                            modalRef.componentInstance.seguro = this.seguro;
                            modalRef.componentInstance.loadOfertaActivada = this.loadOfertaActivada;
                            modalRef.componentInstance.activarSeguro = this.activarSeguro;
                            modalRef.componentInstance.mensaje = this.mensaje;
                        } else {
                            this.loadOfertaActivada = false;
                            this.activarSeguro = false;
                            this.errorActivarOferta = true;
                            this.mensaje.error = resp[0].activateMessageResponse.message;
                            const modalRef = this.modalService.open(NgbdModalContent);
                            modalRef.componentInstance.loadOfertaActivada = this.loadOfertaActivada;
                            modalRef.componentInstance.activarSeguro = this.activarSeguro;
                            modalRef.componentInstance.mensaje = this.mensaje;
                            modalRef.componentInstance.errorActivarOferta = this.errorActivarOferta;
                        }
                    } else {

                        this.loadOfertaActivada = false;
                        this.activarSeguro = false;
                        this.errorActivarOferta = true;
                        this.mensaje.error = "Ha surgido un problema intentelo más tarde.";
                        const modalRef = this.modalService.open(NgbdModalContent);
                        modalRef.componentInstance.loadOfertaActivada = this.loadOfertaActivada;
                        modalRef.componentInstance.activarSeguro = this.activarSeguro;
                        modalRef.componentInstance.mensaje = this.mensaje;
                        modalRef.componentInstance.errorActivarOferta = this.errorActivarOferta;
                    }
                    console.debug("resp", resp);
                },
                error => {
                    console.debug("error01", error);
                    this.errorInterface = {
                        isError: true,
                        message:
                            "Ha surgido un problema intentelo más tarde."
                    };
                    this.loadOfertaActivada = false;
                    this.activarSeguro = false;
                }
            );
        } else {
            this.errorActivarOferta = false;
            this.loadOfertaActivada = false;
            this.activarSeguro = false;
        }
        // this.modalService.dismissAll();
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
    // getAllOffersByTopic() {
    //     let data = {
    //         topicId: this.topicId
    //     };

    //     this.personservice.getAllOffersByTopic(data).subscribe(
    //         resp => {
    //             this.ofertas = resp;
    //             this.ofertas.forEach(element => {
    //                 element.elegido = false;
    //             });
    //         },
    //         error => { }
    //     );
    // }

    getOrders() {
        this.loading = true;
        this.loadinpage.emit({
            isProcess: true,
            aProgressSpinner: true
        });
        this.personservice
            .getEquipos({
                identificationNumber: this.item.infoCliente.personalInformation
                    .identificationNumber,
                identificationType: this.item.infoCliente.personalInformation
                    .identificationType
            })
            .subscribe(
                response => {
                    // console.debug("response", response);
                    if (response.orders.length > 0) this.loading = false;
                    this.arrayOrders = response;
                    // this.arrayOrders = {
                    //     "identificationNumber": "1500679764",
                    //     "identificationType": "CED",
                    //     "orders": [
                    //         {
                    //             "companyId": "2",
                    //             "orderId": "159258702",
                    //             "identificationNumber": "1500679764",
                    //             "identificationType": "CED",
                    //             "invoiceDate": "2020-01-08 00:00:00.0",
                    //             "orderDetails": [
                    //                 {
                    //                     "date": "",
                    //                     "companyId": "2",
                    //                     "product": "SIMCARD 4GLTE",
                    //                     "cellphoneNumber": "81110000",
                    //                     "orderId": "159258702",
                    //                     "price": "",
                    //                     "offerCode": "",
                    //                     "name": "",
                    //                     "description": "",
                    //                     "identificationNumber": "1500679764",
                    //                     "imei": "353829107665668",
                    //                     "identificationType": "RUC",
                    //                     "sku": "7000818",
                    //                     "productPrice": "5.08928571428571"
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             "companyId": "1",
                    //             "orderId": "22844765",
                    //             "identificationNumber": "1500679764",
                    //             "identificationType": "RUC",
                    //             "invoiceDate": "2020-01-09 00:00:00.0",
                    //             "orderDetails": []
                    //         },
                    //         {
                    //             "companyId": "2",
                    //             "orderId": "159439459",
                    //             "identificationNumber": "1500679764",
                    //             "identificationType": "RUC",
                    //             "invoiceDate": "2020-01-21 00:00:00.0",
                    //             "orderDetails": [
                    //                 {
                    //                     "date": "",
                    //                     "companyId": "2",
                    //                     "product": "NOKIA 311",
                    //                     "cellphoneNumber": "0",
                    //                     "orderId": "159439459",
                    //                     "price": "",
                    //                     "offerCode": "",
                    //                     "name": "",
                    //                     "description": "",
                    //                     "identificationNumber": "1500679764",
                    //                     "imei": "355945059036498",
                    //                     "identificationType": "RUC",
                    //                     "sku": "70000323",
                    //                     "productPrice": "199"
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             "companyId": "1",
                    //             "orderId": "22900549",
                    //             "identificationNumber": "1500679764",
                    //             "identificationType": "RUC",
                    //             "invoiceDate": "2020-01-23 00:00:00.0",
                    //             "orderDetails": [
                    //                 {
                    //                     "date": "",
                    //                     "companyId": "1",
                    //                     "product": "HUAWEI B612 ROUTER",
                    //                     "cellphoneNumber": "0",
                    //                     "orderId": "22900549",
                    //                     "price": "",
                    //                     "offerCode": "",
                    //                     "name": "",
                    //                     "description": "",
                    //                     "identificationNumber": "1500679764",
                    //                     "imei": "864596034773459",
                    //                     "identificationType": "RUC",
                    //                     "sku": "70030594",
                    //                     "productPrice": "150"
                    //                 },
                    //                 {
                    //                     "date": "",
                    //                     "companyId": "1",
                    //                     "product": "HUAWEI B612 ROUTER",
                    //                     "cellphoneNumber": "0",
                    //                     "orderId": "22900549",
                    //                     "price": "",
                    //                     "offerCode": "",
                    //                     "name": "",
                    //                     "description": "",
                    //                     "identificationNumber": "1500679764",
                    //                     "imei": "864596034773459",
                    //                     "identificationType": "RUC",
                    //                     "sku": "70030594",
                    //                     "productPrice": "0.89285714285714"
                    //                 }
                    //             ]
                    //         }
                    //     ]
                    // }

                    let productsIMEI = [];
                    let arrayFilters = [];

                    for (const item of this.arrayOrders.orders) {
                        for (const order of item.orderDetails) {
                            productsIMEI.push(order);
                        }
                    }

                    console.debug("productsIMEI", productsIMEI);
                    this.dataFormaPago = productsIMEI;
                    console.debug("this.dataFormaPago: ", this.dataFormaPago)
                    for (const iterator of productsIMEI) {
                        for (const item of this.imeis) {

                            // arrayFilters.push(item);
                            console.debug(" iterator.imei", iterator.imei);

                            /* if (
                                 iterator.imei ===
                                 item.subscriptionInformation.properties.imei
                             ) {
                                 console.debug("ENTRO!!!");

                                 arrayFilters.push(item);
                             }*/
                        }
                    }
                    console.debug("this.arrayOrders.orders", this.arrayOrders.orders);
                    console.debug("this.imeis", this.imeis);

                    console.debug("arrayFilters", arrayFilters);
                    // this.dataFormaPago = arrayFilters;
                    let data = {
                        topicId: this.topicId
                    };

                    this.personservice.getAllOffersByTopic(data, this.arrayOrders).subscribe(
                        resp => {
                            this.ofertas = resp;
                            // let oferts = resp;
                            console.debug("resp", resp);
                            // let ordenes = [];
                            // for (const key in resp) {
                            //     for (let item in resp[key].orderDetails) {
                            //         ordenes.push(resp[key].orderDetails[item]);
                            //     }
                            // }
                            this.arrayDataPersonalizarOferta = resp;
                            // this.ofertas.forEach((element, index) => {
                            //     // console.debug("index", index);
                            //     element.elegido = false;
                            //     element.indice = 0;
                            // });
                            // let oferts = this.ofertas
                            // this.loading = false;
                            // this.arrayNumEquipo = [];
                            // let indice = 0;

                            // // indice = 0;
                            // this.arrayDataPersonalizarOferta = [];
                            // for (let key of this.arrayOrders.orders) {
                            //     for (let iterator of key.orderDetails) {
                            //         iterator.indice = this.numEquipos;
                            //         // for (let element of oferts) {
                            //         //     element.indice = indice
                            //         // }
                            //         // oferts.forEach((element) => {
                            //         // //     element.indice = indice
                            //         // });

                            //         console.debug("oferts", oferts);

                            //         iterator.ofertas = oferts;
                            //         this.arrayDataPersonalizarOferta.push(iterator);
                            //         this.arrayNumEquipo.push(this.numEquipos);

                            //         this.numEquipos = this.numEquipos + 1;
                            //         // indice++
                            //     }
                            // }

                            // for (const i in this.arrayNumEquipo) {
                            //     // console.debug("i", this.arrayNumEquipo[i]);

                            //     for (const key of this.arrayOrders.orders) {
                            //         for (const iterator of key.orderDetails) {
                            //             for (let item of iterator.ofertas) {
                            //                 item.indice = iterator.indice
                            //             }
                            //         }
                            //     }
                            // }

                            // console.debug("this.arrayOrders.orders", this.arrayOrders.orders);
                            var offert = 0;
                            // for (let [i, oferta] of this.arrayDataPersonalizarOferta.entries()) {
                            //     console.debug("i", i);
                            //     console.debug("oferta", oferta);
                            //     for (let item of oferta.ofertas) {
                            //         console.debug("::::::  ", offert);
                            //         item.indice = i
                            //         // continue;
                            //     }
                            //     console.debug(oferta.ofertas);

                            //     console.debug(offert);

                            //     offert++;
                            // }

                            console.debug(" this.arrayDataPersonalizarOferta", this.arrayDataPersonalizarOferta);


                            // console.debug("this.arrayOrders.orders", this.arrayOrders.orders);

                            // console.debug("#this.arrayNumEquipo", this.arrayNumEquipo);
                            // setTimeout(() => {
                            this.loadinpage.emit({
                                isProcess: false,
                                aProgressSpinner: false
                            });
                            this.loading = false;
                            // }, 1000);

                        },
                        error => { }
                    );



                },
                error => {
                    console.debug("error", error);
                    if (typeof error.error !== "undefined") {
                        if (error.error.code === "409") {
                            console.debug("error", error.error.code);
                        } else {
                        }
                    } else {
                    }
                }
            );
    }

    detectedChangeActivarOferta() {
        console.debug(this.seguro.offeringCode);
        let tieneOferta = 0;
        for (let iterator of this.arrayDataPersonalizarOferta) {
            for (let key of iterator.ofertas) {
                if (key.elegido)
                    tieneOferta++;
            }
        }
        console.debug("this.selectedFormaPago ", this.selectedFormaPago )
        if (
            this.selectedFormaPago &&
            tieneOferta > 0 &&
            this.selectedServices.length > 0
        ) {
            this.disabledBtnActivarSeguro = false;
        } else {
            this.disabledBtnActivarSeguro = true;
        }
    }

    handleChangeSelected() {

        let tieneOferta = 0;
        for (let iterator of this.arrayDataPersonalizarOferta) {
            for (let key of iterator.ofertas) {
                if (key.elegido)
                    tieneOferta++;
            }
        }
        if (
            this.selectedFormaPago &&
            tieneOferta > 0 &&
            this.selectedServices.length > 0
        ) {
            this.disabledBtnActivarSeguro = false;
            this.seguro.accounId = "";
        } else {
            let infoCuentaSelected = this.item.infoCliente.subscriptions.filter(
                cuenta => {
                    return cuenta.id === this.selectedFormaPago;
                }
            );

            this.seguro.paymentMethodType = infoCuentaSelected[0].type;

            this.disabledBtnActivarSeguro = true;
        }
    }

    handleChangeSelectedOwner() {

        let tieneOferta = 0;
        for (let iterator of this.arrayDataPersonalizarOferta) {
            for (let key of iterator.ofertas) {
                if (key.elegido)
                    tieneOferta++;
            }
        }
        if (
            this.selectedFormaPago &&
            tieneOferta > 0 &&
            this.selectedServices.length > 0
        ) {
            this.disabledBtnActivarSeguro = false;
        } else {
            let infoCuentaSelected = this.item.infoCliente.subscriptions.filter(
                cuenta => {
                    if (cuenta.details)
                        return (
                            cuenta.details.accountNumber === this.selectedCuenta
                        );
                }
            );

            this.seguro.accountId = infoCuentaSelected[0].id;
            this.seguro.bankAccountNumber =
                infoCuentaSelected[0].details.accountNumber;
            this.seguro.accountType =
                infoCuentaSelected[0].details.accountNumberType;
            this.seguro.bankCode = "";
            this.disabledBtnActivarSeguro = true;
        }
    }

    onChangeServiceNumber(item) {
        console.debug("arrayOrders.orders", this.arrayOrders.orders);

        console.debug("(this.selectedServices", this.selectedServices);
        console.debug("item", item);



        if (this.selectedServices.length > 0) {
            this.detectedChangeActivarOferta();
        } else {
            this.disabledBtnActivarSeguro = true;
        }
    }

    selectedFormaPAgo(item) {

        // for (const imei of this.imeis) {
        //     if (
        //         imei.subscriptionInformation.serviceNumber ===
        //         item.subscriptionInformation.serviceNumber
        //     ) {

        item.selected = item.selected ? false : true;

        if (item.selected) {

            this.selectedFormaPago = item;
            this.cuentaSelected=true;

        } else {
            this.selectedFormaPago = "";
            // this.seguro.serviceNumber = "";
            // this.seguro.imei = "";
            // this.seguro.accountId = "";
        }
        // } else {
        //     imei.selected = false;
        // }
        // }
        // console.debug("this.selectedFormaPago", this.selectedFormaPago);

        // let infoCuentaSelected = this.item.infoCliente.subscriptions.filter(
        //     cuenta => {
        //         if (cuenta.details)
        //             return cuenta.details.accountNumber === this.selectedCuenta;
        //     }
        // );

        if (item.paymentMethods.length > 0) {
            this.seguro.bankAccountNumber =
                item.paymentMethods[0].details.accountNumber;
            this.seguro.accountType =
                item.paymentMethods.details.accountNumberType;
            this.seguro.bankCode = item.paymentMethods.details.bank;

        }else{
            // this.seguro.accountId = item.user.id;
            this.seguro.serviceNumber = item.cellphoneNumber ;
            // this.disabledBtnActivarSeguro = true;
        }
        this.disabledBtnActivarSeguro = false;
        this.detectedChangeActivarOferta();
    }


    open1(content) {
        this.modalService.open(content);
    }
    open(content) {
        this.modalService.open(content);
    }
    @HostListener("document:keydown.escape", ["$event"]) onKeydownHandler(
        event: KeyboardEvent
    ) {
        console.debug(event);
        this.showModal = false;
    }
}
