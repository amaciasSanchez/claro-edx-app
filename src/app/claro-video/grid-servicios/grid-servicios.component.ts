import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { ClaroUpPersonService } from "src/app/claro-up/services/personservice";
import { LazyLoadEvent, RowToggler } from "primeng";
import { AuthService } from "src/app/security/auth.service";
import { environment } from "src/environments/environment";
import { Customer } from "src/app/customer/modelo/customer.model";
import { CustomerInformationService } from "src/app/customer/services/customer-information/customer-information.service";
import { TooltipModule } from "primeng/tooltip";

@Component({
    selector: "app-grid-servicios",
    templateUrl: "./grid-servicios.component.html",
    styleUrls: ["./grid-servicios.component.css"],
})
export class GridServiciosComponent implements OnInit {
    @Input() subscription: any;
    flat: boolean = false;
    modalAdvertencia = false;
    modalMessage = false;
    modalTablet = false;
    modalIngresarFactura = false;
    modalSeleccionInactivacion = false;
    modalGenerarFactura = false;
    modalPerminOffer = false;
    modalResonConfirm = false;
    modalPickTicket = false;
    perminAllValue = false;
    totalFacturar=0;
    numeroFactura = "";
    observation = "";
    observationValue = true;
    idPickTicket = "";
    mensajeModal = "";
    modalError = false;
    mensajeErrorModal = "";
    flagLoader = false;
    arrayServicios: any = [];
    arrayFacturaServicios: any = [];
    arrayReasons: any = [];
    selectedReason: any=null;
    selectedReasonValue = true;
    loading: boolean;
    totalRecords: number;
    lazyTable: boolean = false;
    response: any;
    customer: Customer;
    @Output() loadinpage: EventEmitter<any> = new EventEmitter<any>();
    aProgressSpinner = false;
    isProcess = false;
    offers;
    perminProductId: string = environment.perminProductId;
    cols: any[] = [
        {
            field: "select",
            img: "assets/images/icons/products/checked.png",
            header: "Selecciona",
            canOrder: false,
        },
        {
            field: "activatedDate",
            img: "assets/images/icons/products/calendar.png",
            header: "Activada el",
            canOrder: true,
        },
        {
            field: "productDescription",
            img: "assets/images/icons/products/product.png",
            header: "Producto",
            canOrder: true,
        },
        {
            field: "offerName",
            img: "assets/images/icons/products/offer.png",
            header: "Oferta",
            canOrder: true,
        },
        {
            field: "startDate",
            img: "assets/images/icons/products/date-from.png",
            header: "Vigente desde",
            canOrder: true,
        },
        {
            field: "endDate",
            img: "assets/images/icons/products/date-to.png",
            header: "Vigente hasta",
            canOrder: true,
        },
        {
            field: "offerType",
            img: "assets/images/icons/products/tag.png",
            header: "Categoría",
            canOrder: true,
        },
        {
            field: "price",
            img: "assets/images/icons/products/price.png",
            header: "Precio",
            canOrder: true,
        },
        {
            field: "claroId",
            img: "assets/images/icons/products/open-mail.png",
            header: "Claro Id",
            canOrder: true,
        },
        {
            field: "status",
            img: "assets/images/icons/products/status.png",
            header: "Estado",
            canOrder: true,
        },
        {
            field: "devices",
            img: "assets/images/icons/products/devices.png",
            header: "Dispositivos",
            canOrder: false,
        },
    ];
    user: any;
    offername: any;

    constructor(
        private router: Router,
        private service: ClaroUpPersonService,
        private authService: AuthService,
        private customerInformationService: CustomerInformationService
    ) {
        this.customer = <Customer>(
            this.customerInformationService.getCustomerInformation()
        );
        this.user = sessionStorage.getItem("user");
        console.log("datos del usuario: ", this.customer, this.user);
        if (!this.customer) {
            console.error("No existe un cliente en sesión");
        }
        this.flat = true;
    }

    ngOnInit() {
        this.loadOffers();
    }

    loadOffers() {
        this.loadinpage.emit({
            isProcess: true,
            aProgressSpinner: true,
        });
        this.loading = true;
        this.service
            .getOffersBySubscription(
                this.subscription.subscriptionInformation.serviceNumber,
                this.customer.contactInformation.email,
                this.customer.personalInformation.identificationType,
                this.customer.personalInformation.identificationNumber
            )
            .subscribe(
                (data) => {
                    this.arrayServicios = data;
                    let i = 1;
                    for (let servicios of this.arrayServicios) {
                        //Si el producto es diferente a permin se inactiva, caso contrario se habilita
                        if (
                            servicios.status !== "Vigente" ||
                            (servicios.productId !== this.perminProductId &&
                                servicios.productId !== "claroup" &&
                                servicios.productId !== "Claro_Video" &&
                                servicios.productId !== "CLARO BOX TV")
                        ) {
                            servicios.disable = true;
                        } else {
                            servicios.disable = false;
                        }
                        servicios.idRegistro = i;
                        servicios.selected = false;
                        i++;
                    }
                    console.log(this.arrayServicios);
                    this.totalRecords =
                        this.arrayServicios != null
                            ? this.arrayServicios.length
                            : 0;
                    this.lazyTable = false;
                    this.loading = false;

                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false,
                    });
                },
                (error) => {
                    console.error(error);
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false,
                    });
                }
            );
    }

    verDispositivo(serviceNumber: string) {
        console.log("serviceNumber seleccionado: ", serviceNumber);
        this.loadinpage.emit({
            isProcess: true,
            aProgressSpinner: true,
        });
	//Se comenta xq la consulta es por ServiceNumber y no por imei
       /*if (offer.imei == null) {
            this.response = {
                status: "WARNING",
                message: "No se ha encontrado un IMEI asignado a esta oferta",
            };
            this.modalMessage = true;
            this.loadinpage.emit({
                isProcess: false,
                aProgressSpinner: false,
            });
        } else {
            this.router.navigate(["/dispositivos"], {
                state: { data: { imei: offer.imei } },
            });
        }*/
        
        this.router.navigate(["/dispositivos"], {'state':{ 'data':{ 'servicenumberoffer': serviceNumber}}});
    }

    inactivate() {
        // this.loadinpage.emit({
        //     isProcess: true,
        //     aProgressSpinner: true
        // });
        let selectedOffers = this.arrayServicios
            .filter((item: any) => item.selected !== undefined && item.selected)
            .map((item: any) => {
                console.log("item: ", item);
                return {
                    offerCode: item.offerCode,
                    offerName: item.offerName,
                    createdDate: item.activatedDate,
                    price: item.price,
                    claroId: item.claroId,
                    profileId: item.profileId,
                    productDescription: item.productDescription
                };
            });
        console.log("selectedOffers: ", selectedOffers);
        if (selectedOffers.length == 0) {
            this.response = {
                status: "WARNING",
                message: "No ha seleccionado ninguna oferta",
            };
            this.modalMessage = true;
            this.loadinpage.emit({
                isProcess: false,
                aProgressSpinner: false,
            });
        } else {
            let selectedProductOfOffers = this.arrayServicios
                .filter(
                    (item: any) => item.selected !== undefined && item.selected
                )
                .map((item: any) => {
                    return { productId: item.productId };
                });
            console.log("Oferta seleccionada: ", selectedProductOfOffers);
            let selectedProduct = selectedProductOfOffers[0].productId;
            console.log("Oferta seleccionada: ", selectedProductOfOffers[0]);
            let differentProduct: boolean = false;
            for (
                let index = 0;
                index < selectedProductOfOffers.length;
                index++
            ) {
                const element = selectedProductOfOffers[index];
                if (selectedProduct != element.productId) {
                    differentProduct = true;
                    break;
                }
            }
            if (differentProduct) {
                this.response = {
                    status: "ERROR",
                    message:
                        "Ha seleccionado ofertas de diferentes productos. Por favor seleccione ofertas del mismo producto (Claro video, Protección Móvil)",
                };
                this.modalMessage = true;
                this.loadinpage.emit({
                    isProcess: false,
                    aProgressSpinner: false,
                });
            } else {
                console.log(
                    "Producto de la oferta seleccionada: ",
                    selectedProduct
                );
                if (selectedProduct == "Claro_Video") {
                    this.goToInactivateClaroVideo();
                } else if (selectedProduct == "claroup") {
                    this.inactivateClaroUP(selectedOffers);
                } else if (selectedProduct == this.perminProductId) {
                    this.offers = selectedOffers[0];
                    console.log("ofertas", this.offers);

                    let countOffersPermin = this.arrayServicios.filter(
                        (item: any) =>
                            item.productId != "Claro_Video" &&
                            item.productId != "claroup" &&
                            !item.disable
                    ).length;

                    this.validLengthOffert(selectedOffers.length);
                    if (countOffersPermin != selectedOffers.length) {
                        this.modalPerminOffer = true;
                    } else {
                        this.modalSeleccionInactivacion = true;
                    }
                } else if (selectedProduct == "CLARO BOX TV") {
                    this.goToInactivateClaroVideo();
                   /*  this.inactivateClaroBoxTv(selectedOffers); */
                } else {
                    this.response = {
                        status: "ERROR",
                        message:
                            "El producto de las ofertas seleccionadas no es soportado por la actual funcionalidad. Solo se permiten ofertas de los productos Claro Video y Protección Móvil",
                    };
                    this.modalMessage = true;
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false,
                    });
                }
            }
        }
    }

    validLengthOffert(lengthOffert) {
        if (lengthOffert == 1) {
            this.perminAllValue = false;
        } else {
            this.perminAllValue = true;
        }
    }

    generatePickTicketPermin(selectedOffers) {
        this.arrayFacturaServicios = [];
        this.loadinpage.emit({
            isProcess: true,
            aProgressSpinner: true,
        });
        let servicenumber: any =
            this.subscription.subscriptionInformation.serviceNumber.substr(-9);

        console.log("*******offeeer******: ", selectedOffers);
        this.service
            .generatePickTicketPermin(selectedOffers, servicenumber, this.user)
            .subscribe(
                (response) => {
                    console.log("********response********: ", response);
                    if (response.code == 200) {
                        this.response = response;
                        this.response.message =
                            "Operación ejecutada exitosamente";
                        this.modalGenerarFactura = true;
                        this.arrayFacturaServicios =
                            response.response.boxDetail;
                        this.idPickTicket = response.response.idPickTicket;
                        this.totalPickTicket(this.arrayFacturaServicios);
                    }
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false,
                    });
                },
                (errorResponse) => {
                    console.log("error!! ->", errorResponse.error.message);
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false,
                    });
                    if (
                        errorResponse.error.message !== "Usuario no autorizado"
                    ) {
                        this.abrirModalError(errorResponse.error.message);
                    }
                }
            );
    }

    totalPickTicket(data){
        this.totalFacturar=0;
        for(let j=0;j<data.length;j++){
                this.totalFacturar+= data[j].priceAfterTaxes;
        }
    }

    savePickTicket() {
        this.cerrarModalGenerarFactura();
        this.loadinpage.emit({
            isProcess: true,
            aProgressSpinner: true,
        });
        this.loading = true;
        console.log("*******PickTicket******: ", this.idPickTicket);
        this.service.confirmPickTicket(this.idPickTicket).subscribe(
            (response) => {
                console.log("********response********: ", response);
                if (response.code == 200) {
                    this.response = response;
                    this.response.message = "Operación ejecutada exitosamente";
                    this.modalPickTicket = true;
                }
                this.loading = false;
                this.loadinpage.emit({
                    isProcess: false,
                    aProgressSpinner: false,
                });
            },
            (errorResponse) => {
                console.log("error!! ->", errorResponse.error.message);
                this.loading = false;
                this.loadinpage.emit({
                    isProcess: false,
                    aProgressSpinner: false,
                });
                if (errorResponse.error.message !== "Usuario no autorizado") {
                    this.abrirModalError(errorResponse.error.message);
                }
            }
        );
    }

    getReasonInactive() {
        this.arrayReasons = [];
        this.loadinpage.emit({
            isProcess: true,
            aProgressSpinner: true,
        });
        this.service.getReasonInactive().subscribe(
            (response) => {
                console.log("********response********: ", response);
                if (response.code == 200) {
                    this.response = response;
                    this.response.message = "Operación ejecutada exitosamente";
                    this.arrayReasons = response.response;
                }
                this.loadinpage.emit({
                    isProcess: false,
                    aProgressSpinner: false,
                });
            },
            (errorResponse) => {
                console.log("error!! ->", errorResponse.error.message);
                this.loadinpage.emit({
                    isProcess: false,
                    aProgressSpinner: false,
                });
                if (errorResponse.error.message !== "Usuario no autorizado") {
                    this.abrirModalError(errorResponse.error.message);
                }
            }
        );
    }

    inactivateTablet(selectedOffers) {
        let continueInactiveTable = true;

        let servicenumber: any =
            this.subscription.subscriptionInformation.serviceNumber.substr(-9);
        if (this.numeroFactura !== null && this.numeroFactura !== "") {
            selectedOffers.invoiceNumber = this.numeroFactura;
        } else {
            if (this.selectedReason !== null && this.observation !== null) {
                selectedOffers.reason = this.selectedReason.code;
                selectedOffers.observation = this.observation;
                this.selectedReasonValue = true;
                this.observationValue = true;
            } else {
                continueInactiveTable = false;
                if (this.selectedReason=== null) {
                    this.selectedReasonValue = false;
                }else{
                    this.selectedReasonValue = true;
                }
                if (this.observation === null) {
                    this.observationValue = false;
                }else{
                    this.observationValue = true;
                }
            }
        }

        if (continueInactiveTable) {
            this.cerrarModalTable();
            this.loadinpage.emit({
                isProcess: true,
                aProgressSpinner: true,
            });

            this.service
                .inactivatePermin(selectedOffers, servicenumber, this.user)
                .subscribe(
                    (response) => {
                        console.log("********response********: ", response);
                        if (response.code == 0) {
                            this.response = response;
                            this.response.message =
                                "Operación ejecutada exitosamente";
                            this.modalMessage = true;
                            this.flagLoader = true;
                        }
                        this.loadinpage.emit({
                            isProcess: false,
                            aProgressSpinner: false,
                        });
                        // this.loadOffers();
                    },
                    (errorResponse) => {
                        console.log("error!! ->", errorResponse.error.message);
                        this.loadinpage.emit({
                            isProcess: false,
                            aProgressSpinner: false,
                        });
                        if (
                            errorResponse.error.message !==
                            "Usuario no autorizado"
                        ) {
                            this.abrirModalError(errorResponse.error.message);
                        }
                    }
                );
        }
    }

    inactivateClaroUP(selectedOffers: []) {
        console.log(
            "Las ofertas seleccionadas para inactivar son:",
            selectedOffers
        );
        this.service
            .inactivateClaroUpOffers(
                this.subscription.subscriptionInformation.serviceNumber,
                selectedOffers
            )
            .subscribe(
                (data) => {
                    console.log("Esta es la respuesta del servicio: ", data);
                    this.response = data;
                    this.modalAdvertencia = true;
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false,
                    });
                },
                (error) => {
                    console.error(error);
                    this.response = {
                        status: "ERROR",
                        message:
                            "Ocurrió un error al enviar a inactivar las ofertas seleccionadas",
                    };
                    this.modalAdvertencia = true;
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false,
                    });
                }
            );
    }

    goToInactivateClaroVideo() {
        this.router.navigate(["/claro-inactivacion"], {
            state: {
                data: {
                    subscription: this.subscription,
                    offers: this.arrayServicios,
                },
            },
        });
    }

    /******************** */
    inactivateClaroBoxTv(selectedOffers: any[]) {
        this.loadinpage.emit({
            isProcess: true,
            aProgressSpinner: true,
        });
        console.log("Las ofertas seleccionadas para inactivar son:",selectedOffers);
        let offer: any = selectedOffers[0]; 
        let inactivateRequest: any = {
            "user": this.user,
            "serviceNumber": this.subscription.subscriptionInformation.serviceNumber,
            "customer": {
                "customerOtt": offer.profileId
            },
            "offer": {
                "offeringCode": offer.offerCode,
                "offeringCategory": offer.productDescription,
                "offeringName":  offer.offerName,
                "offeringPrice": offer.price
            }      
        }
        
        this.service.inactivateClaroBoxTvOffer(
                inactivateRequest
            )
            .subscribe(
                (data) => {
                    console.log("Esta es la respuesta del servicio: ", data);
                    let message = ("La oferta " + offer.offerName
                    + " fue inactivada correctamente para el número de servicio " + this.subscription.subscriptionInformation.serviceNumber);
                    this.response = {
                        status: "OK",
                        message: message
                    };
                    this.modalMessage = true;
                    this.flagLoader = true;
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false,
                    });
                },
                (error) => {
                    console.error(error);
                    this.response = {
                        status: "ERROR",
                        message: ("Ocurrió un error al enviar a inactivar las ofertas seleccionadas: " + error.error.message),
                    };
                    this.modalMessage = true;
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false,
                    });
                }
            );
    }

    /******************** */

    closeDialog() {
        this.modalAdvertencia = false;
        this.loadOffers();
    }

    cerrarModalMessage(flag) {
        this.modalMessage = false;
        if (flag === true) {
            this.flagLoader = false;
            this.loadOffers();
        }
    }

    cerrarModalTable() {
        this.modalTablet=false;
        this.modalResonConfirm = false;
        this.loadinpage.emit({
            isProcess: false,
            aProgressSpinner: false,
        });
    }

    cerrarModalNumeroFactura() {
        this.modalIngresarFactura = false;
        this.loadinpage.emit({
            isProcess: false,
            aProgressSpinner: false,
        });
    }

    validarCheck(rowData) {
        if (rowData.selected === false) {
            for (let servicios of this.arrayServicios) {
                if (
                    servicios.idRegistro !== rowData.idRegistro &&
                    servicios.productId !== this.perminProductId
                ) {
                    servicios.disable = true;
                }
            }
        } else {
            for (let servicios of this.arrayServicios) {
                if (
                    servicios.status !== "Vigente" ||
                    (servicios.productId !== this.perminProductId &&
                        servicios.productId !== "claroup" &&
                        servicios.productId !== "Claro_Video" &&
                        servicios.productId !== "CLARO BOX TV")
                ) {
                    servicios.disable = true;
                } else {
                    servicios.disable = false;
                }
            }
        }
    }

    confirmarNumeroFactura() {
        this.modalIngresarFactura = false;
        if (this.numeroFactura === "") {
            this.modalResonConfirm = true;
        } else {
            this.modalTablet = true;
            this.mensajeModal = "¿Está seguro de continuar?";
        }
    }

    abrirModalError(mensajeError) {
        this.modalIngresarFactura = false;
        this.modalError = true;
        this.mensajeErrorModal = mensajeError;
    }

    cerrarModalError() {
        this.modalError = false;
    }

    cerrarModalIngresoFactura() {
        this.modalIngresarFactura = false;
        this.loadinpage.emit({
            isProcess: false,
            aProgressSpinner: false,
        });
    }

    cerrarModalPerminOferta() {
        this.modalPerminOffer = false;
        this.loadinpage.emit({
            isProcess: false,
            aProgressSpinner: false,
        });
    }

    cerrarSeleccionInactivacion() {
        this.modalSeleccionInactivacion = false;
        this.loadinpage.emit({
            isProcess: false,
            aProgressSpinner: false,
        });
    }

    confirmarPerminOferta() {
        this.modalPerminOffer = false;
        this.modalSeleccionInactivacion = true;
    }

    confirmarSeleccionInactivacion(tipoSelecion) {
        this.modalSeleccionInactivacion = false;
        this.loadinpage.emit({
            isProcess: true,
            aProgressSpinner: true,
        });
        if (tipoSelecion === "factunaNueva") {
            let selectedOffers = this.arrayServicios
                .filter(
                    (item: any) => item.selected !== undefined && item.selected
                )
                .map((item: any) => {
                    console.log("item: ", item);
                    return {
                        offerCode: item.offerCode,
                        price: item.price,
                        createdDate: item.activatedDate,
                        offerName: item.offerName,
                    };
                });

            this.generatePickTicketPermin(selectedOffers);
        } else if (tipoSelecion === "facturaExistente") {
            this.getReasonInactive();
            this.selectedReasonValue = true;
            this.observationValue = true;
            this.selectedReason=null;
            this.observation=null;
            this.modalIngresarFactura = true;
        }
    }

    cerrarModalGenerarFactura() {
        this.modalGenerarFactura = false;
        this.loadinpage.emit({
            isProcess: false,
            aProgressSpinner: false,
        });
    }

    confirmarGenerarFactura() {
        this.modalGenerarFactura = false;
    }

    cerrarModalResonConfirm() {
        this.modalResonConfirm = false;
        this.loadinpage.emit({
            isProcess: false,
            aProgressSpinner: false,
        });
    }

    cerrarModalPickTicket() {
        this.modalPickTicket = false;
        this.loadinpage.emit({
            isProcess: false,
            aProgressSpinner: false,
        });
    }

    copyToClipboard(item) {
        let selBox = document.createElement('textarea');
            selBox.style.position = 'fixed';
            selBox.style.left = '0';
            selBox.style.top = '0';
            selBox.style.opacity = '0';
            selBox.value = item;
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand('copy');
            document.body.removeChild(selBox);
    }
}
