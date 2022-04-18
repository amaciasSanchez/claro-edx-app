import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonService } from '../claroup/service/personservice';
import { ErrorMessage } from '../../error-message';
import { Router } from '@angular/router';
import { ClaroUpPersonService } from '../../claro-up/services/personservice';
import { environment } from '../../../environments/environment';
import { IptvService } from '../../b2e/claroup/service/iptv.service';

@Component({
    selector: "app-productos-servicios",
    templateUrl: "./productos-servicios.component.html",
    styleUrls: ["./productos-servicios.component.css"],
    providers: [PersonService]
})
export class ProductosServiciosComponent implements OnInit {
    @Input() item: any;
    @Input() nombreCliente: any;
    @Input() topics: any;
    @Input() service: any;
    itemsBreadcrumb: any;
    @Output() regresarClick: EventEmitter<any> = new EventEmitter();
    @Output() loadinpage: EventEmitter<any> = new EventEmitter<any>();
    aProgressSpinner: any;
    itemDetail: any;
    page: any = "PRODUCTOS_SERVICIOS";
    Topics: any = [];
    bestOfferData: any = [];
    categorySelected: any;
    isProcess;
    activeSteps;
    topicId: any;
    errorInterface: ErrorMessage;
    activarPersonalizarOferta: boolean = false;
    arrayOrders: any;
    arrayEquipos: any;
    topicIdClaroVideo: any;
    topicIdClaroIpTv: any;
    topicIdClaroUP: any;
    topicIdClaroOtt: any;
    constructor(private personservice: PersonService,
        private router: Router,
        private claroUpPersonService: ClaroUpPersonService,
        private iptvService: IptvService) {

        this.errorInterface = {
            isError: false,
            message: ""
        };
    }

    ngOnInit() {

        console.debug("topics", this.topics);
        console.debug("service", this.service);
        this.topicIdClaroUP = environment.topicIdClaroUP;
        this.topicIdClaroVideo = environment.topicIdClaroVideo;
        this.topicIdClaroIpTv = environment.topicIdClaroIpTv;
        this.topicIdClaroOtt = environment.topicIdClaroOTT;
        this.Topics = this.topics;
        /** 
        this.Topics.topics.push({
            "idTopic": 35,
            "name": "OTT",
            "fileName": "IPTV.png",
            "fileDirectory": "http://architectureebook.conecel.com/wp-content/uploads/2021/02/"
        });
        */

    }
    regresar() {
        this.regresarClick.emit();
    }

    regresarPersozalizarClick(event: any) {
        if (event.price >= 0) {
            this.regresarClick.emit({
                price: event.price
            });
        } else {
            if (typeof event.page !== "undefined") {
                if (event.page !== "HIDDEN_BANNER") {
                    this.page = "PRODUCTOS_SERVICIOS";
                    this.regresarClick.emit({
                        page: this.page,
                        step: 2
                    });
                } else {
                    this.regresarClick.emit({
                        page: "HIDDEN_BANNER"
                    });
                }
            }
        }
    }

    onSortChange(event) {
        console.debug("event", event);
    }

    personalizar() {
        this.loadinpage.emit({
            isProcess: true,
            aProgressSpinner: true
        });
        let data = {
            identificationNumber: String(
                this.nombreCliente.personalInformation.identificationNumber
            ),
            identificationType: String(
                this.nombreCliente.personalInformation.identificationType
            )
        };
        this.personservice.getEquipos(data).subscribe(response => {
            this.arrayEquipos = response;
            console.debug(this.arrayEquipos)
            this.arrayEquipos = {
                "identificationNumber": "1791251237001",
                "identificationType": "RUC",
                "orders": [
                    {
                        "companyId": "2",
                        "orderId": "159258702",
                        "identificationNumber": "1791251237001",
                        "identificationType": "RUC",
                        "invoiceDate": "2020-01-08 00:00:00.0",
                        "orderDetails": [
                            {
                                "date": "",
                                "companyId": "2",
                                "product": "SIMCARD 4GLTE",
                                "cellphoneNumber": "81110000",
                                "orderId": "159258702",
                                "price": "",
                                "offerCode": "",
                                "name": "",
                                "description": "",
                                "identificationNumber": "1791251237001",
                                "imei": "8959301000853330426",
                                "identificationType": "RUC",
                                "sku": "7000818",
                                "productPrice": "5.08928571428571"
                            }
                        ]
                    },
                    {
                        "companyId": "1",
                        "orderId": "22844765",
                        "identificationNumber": "1791251237001",
                        "identificationType": "RUC",
                        "invoiceDate": "2020-01-09 00:00:00.0",
                        "orderDetails": []
                    },
                    {
                        "companyId": "2",
                        "orderId": "159439459",
                        "identificationNumber": "1791251237001",
                        "identificationType": "RUC",
                        "invoiceDate": "2020-01-21 00:00:00.0",
                        "orderDetails": [
                            {
                                "date": "",
                                "companyId": "2",
                                "product": "NOKIA 311",
                                "cellphoneNumber": "0",
                                "orderId": "159439459",
                                "price": "",
                                "offerCode": "",
                                "name": "",
                                "description": "",
                                "identificationNumber": "1791251237001",
                                "imei": "355945059036498",
                                "identificationType": "RUC",
                                "sku": "70000323",
                                "productPrice": "199"
                            }
                        ]
                    },
                    {
                        "companyId": "1",
                        "orderId": "22900549",
                        "identificationNumber": "1791251237001",
                        "identificationType": "RUC",
                        "invoiceDate": "2020-01-23 00:00:00.0",
                        "orderDetails": [
                            {
                                "date": "",
                                "companyId": "1",
                                "product": "HUAWEI B612 ROUTER",
                                "cellphoneNumber": "0",
                                "orderId": "22900549",
                                "price": "",
                                "offerCode": "",
                                "name": "",
                                "description": "",
                                "identificationNumber": "1791251237001",
                                "imei": "864596034773459",
                                "identificationType": "RUC",
                                "sku": "70030594",
                                "productPrice": "150"
                            },
                            {
                                "date": "",
                                "companyId": "1",
                                "product": "HUAWEI B612 ROUTER",
                                "cellphoneNumber": "0",
                                "orderId": "22900549",
                                "price": "",
                                "offerCode": "",
                                "name": "",
                                "description": "",
                                "identificationNumber": "1791251237001",
                                "imei": "864596034773459",
                                "identificationType": "RUC",
                                "sku": "70030594",
                                "productPrice": "0.89285714285714"
                            }
                        ]
                    }
                ]
            }
            if (this.arrayEquipos.orders.length > 0) {
                this.page = "PERSONALIZAR";
                this.itemDetail = {
                    bestOffer: this.bestOfferData,
                    equipos: this.arrayEquipos.orders,
                    infoCliente: this.nombreCliente,
                    categoria: this.categorySelected
                };
            } else {
                this.loadinpage.emit({
                    isProcess: false,
                    aProgressSpinner: false
                });
                this.errorInterface = {
                    isError: true,
                    message:
                        "No hay dispositivos disponibles en los últimos 30 días."
                };
            }
        }, error => {

        });
    }

    openDetail(item) {
        this.page = "DETAIL";
        this.activarPersonalizarOferta = true;
        this.itemDetail = {
            bestOffer: this.bestOfferData,
            infoCliente: this.nombreCliente,
            categoria: this.categorySelected
        };

    }

    bestOfferSelected(item) {
        console.log(item);
        if (item.idTopic === this.topicIdClaroVideo) {     // claro video
            this.router.navigate(['/min-offer']);
        } else if (item.idTopic === this.topicIdClaroOtt) {
            console.log('Aqui se va a forma de pago')
            this.router.navigate(['ott-metodo-pago'])
        } else {
            if (item.idTopic === this.topicIdClaroIpTv) { // claro ipTv
                // this.router.navigate( ["/iptvregister"] );
                this.iptvService.initIptvPage();
            } else {
                this.insuranceOfferSelected = item;
                this.selectInsuranceOffer();
            }
        }
    }

    insuranceOfferSelected: any = null;
    warningMessage: boolean = false;
    accepted: boolean = false;

    selectInsuranceOffer() {
        let item: any = this.insuranceOfferSelected;
        this.warningMessage = false;
        this.accepted = false;
        this.insuranceOfferSelected = null;
        this.activarPersonalizarOferta = false;
        this.loadinpage.emit({
            isProcess: true,
            aProgressSpinner: true
        });
        console.debug("item", item);
        this.categorySelected = item.name;
        this.aProgressSpinner = true;
        this.topicId = String(item.idTopic);
        let service = "";
        if (typeof this.service !== "undefined") {
            if (typeof this.service.subscriptionInformation !== "undefined") {
                service = this.service.subscriptionInformation.serviceNumber;
            } else {
                service = this.service.serviceSelected.subscriptionInformation
                    .serviceNumber;
            }
        }
        let data = {
            topicId: String(item.idTopic),
            identificationNumber: String(
                this.nombreCliente.personalInformation.identificationNumber
            ),
            identificationType: String(
                this.nombreCliente.personalInformation.identificationType
            ),
            customerId: String(
                this.nombreCliente.customerId
            ),
            serviceNumbers: [service]
        };
        console.log("Request a enviar para consultar equipos por customer id: ", data);
        this.claroUpPersonService.getEquiposByCustomerId(data).subscribe(
            response => {
                if (response.orders.length > 0) {
                    this.arrayOrders = response;

                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false
                    });
                    this.regresarClick.emit({
                        offerData: this.arrayOrders,
                        topicId: this.topicId,
                        page: "MEJOR_OFERTA",
                        step: 3,
                        productType: 'claroUp'
                    });
                } else {
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false
                    });
                    this.errorInterface = {
                        isError: true,
                        message:
                            "No puede contratar seguro, no hay equipos comprados en los últimos 30 días."
                    };
                    this.activarPersonalizarOferta = true;
                }
            },
            error => {
                this.loadinpage.emit({
                    isProcess: false,
                    aProgressSpinner: false
                });
                if (typeof error.error !== "undefined") {
                    if (error.error.code === "409") {
                        console.debug("error", error.error.code);
                        this.errorInterface = {
                            isError: true,
                            message:
                                "No puede contratar seguro, no hay equipos comprados en los últimos 30 días."
                        };
                        this.activarPersonalizarOferta = true;
                    } else {
                        this.errorInterface = {
                            isError: true,
                            message: "Error intentelo más tarde"
                        };
                    }
                }
            }
        );
    }

    buscar() {
        this.aProgressSpinner = true;
        (async () => {
            console.debug("before delay");
            await this.delay(1000);
            this.isProcess = true;
            await this.delay(1000);
            this.personservice.getTopics().subscribe(resp => {
                this.Topics = resp[0];
                this.aProgressSpinner = false;
                console.debug(this.Topics);
            });
            console.debug("after delay");

            this.activeSteps++;
        })();
    }
    loadinpageClick(data: any) {
        this.loadinpage.emit({
            isProcess: data.isProcess,
            aProgressSpinner: data.aProgressSpinner
        });
    }
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
