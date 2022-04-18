import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BreadcrumbService} from '../../../breadcrumb.service';
import {SwiperComponent} from 'ngx-useful-swiper';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SwiperOptions} from 'swiper';
import {MenuItem, SelectItem} from 'primeng/api';

import {FormGroup} from '@angular/forms';

import {PersonService} from '../service/personservice';
import {ActivatedRoute} from '@angular/router';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
import { Customer } from 'src/app/customer/modelo/customer.model';

@Component({
    selector: "app-open-close",
    templateUrl: "./bestoffer.component.html",
    animations: [
        trigger("fadeInOut", [
            state(
                "void",
                style({
                    opacity: 0
                })
            ),
            transition("void <=> *", animate(500))
        ])
    ],
    styles: [
        `
            .ui-steps-item {
                width: auto;
            }

            .ui-dataview-layout-options .ui-button {
                margin-left: 0.5em;
            }

            .ui-dataview .filter-container {
                text-align: center;
            }

            @media (max-width: 40em) {
                .ui-dataview .car-details,
                .ui-dataview .search-icon {
                    text-align: center;
                    margin-top: 0;
                }

                .ui-dataview .filter-container {
                    text-align: left;
                }

                .ui-dataview-layout-options.ui-buttonset > .ui-button {
                    margin-left: 0;
                    display: inline-block;
                }

                .ui-dataview-layout-options.ui-buttonset
                    > .ui-button:first-child {
                    border-radius: 50%;
                }

                .ui-dataview-layout-options.ui-buttonset
                    > .ui-button:last-child {
                    border-radius: 50%;
                }
            }

            .car-item {
                padding-top: 5px;
            }

            .car-item .ui-md-3 {
                text-align: center;
            }

            .car-item .ui-g-10 {
                font-weight: bold;
            }

            .bestoffer-car-item-index {
                background-color: #f1f1f1;
                width: 60px;
                height: 60px;
                margin: 36px auto 0 auto;
                animation: pulse 1s infinite ease-in-out;
            }

            .bestoffer-car-item-image {
                background-color: #f1f1f1;
                width: 120px;
                height: 120px;
                animation: pulse 1s infinite ease-in-out;
            }

            .bestoffer-car-item-text {
                background-color: #f1f1f1;
                height: 18px;
                animation: pulse 1s infinite ease-in-out;
            }

            .title-container {
                padding: 1em;
                text-align: right;
            }

            .sort-container {
                text-align: left;
            }

            @media (max-width: 40em) {
                .car-item {
                    text-align: center;
                }

                .index-col {
                    display: none;
                }

                .image-col {
                    display: none;
                }
            }

            @keyframes pulse {
                0% {
                    background-color: rgba(165, 165, 165, 0.1);
                }
                50% {
                    background-color: rgba(165, 165, 165, 0.3);
                }
                100% {
                    background-color: rgba(165, 165, 165, 0.1);
                }
            }
        `
    ],
    providers: [PersonService],
    encapsulation: ViewEncapsulation.None
})
export class BestofferComponent implements OnInit, AfterViewInit {
    nombreCliente;
    nombreClienteClaroUP;
    productType;
    aProgressSpinner = false;
    isProcess = false;
    timeStamp;
    linkPicture = "../assets/layout/images/vision/c360_0.png";

    myForm: FormGroup;

    isShowName = "infoUsuario";
    isShowDetail = false;
    activeSteps: number = 0;
    stepsItems: MenuItem[];
    Topics: any = [];
    bestOfferData: any = [];
    sortOptions: SelectItem[];
    page: any = "GRID"; //GRID
    itemDetail: any;
    categorySelected: any;
    searchClientNumber: any;
    stepView: string = "BUSCAR_CLIENTE";
    config: SwiperOptions = {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        spaceBetween: 30
    };

    configForm: SwiperOptions = {
        autoplay: false,
        navigation: {
            nextEl: null,
            prevEl: null
        },
        slidesPerView: 1,
        pagination: { el: ".swiper-pagination", clickable: false },
        spaceBetween: 30
    };
    hiddenSwiper: boolean = false;
    @ViewChild("usefulSwiper", { static: false }) usefulSwiper: SwiperComponent;
    serviceSelected: any;
    topicId: any;
    activarPreviewPrice: boolean = false;
    totalPagoOferta: number = 0;
    public getLinkPicture() {
        if (this.timeStamp) {
            return this.linkPicture + "?" + this.timeStamp;
        }
        return this.linkPicture;
    }

    public setLinkPicture(url: string, div: number) {
        this.linkPicture = url;
        this.timeStamp = new Date().getTime();
    }

    activeIndexChange(index, flat) {

        if (!flat) {

            if (index !== this.activeSteps) {
                this.page = this.stepView;
                this.activarPreviewPrice = false;
            }
            this.activeSteps = index;
            if (index === 0) {
                this.stepView = "BUSCAR_CLIENTE";
            }
            if (index === 1) {
                this.stepView = "VISTA_360";
            }
            if (index === 2) {
                this.stepView = "PRODUCTOS_SERVICIOS";
            }
            if (index === 3) {
                this.stepView = "MEJOR_OFERTA";
            }
            if (index === 4) {
                this.stepView = "ACTIVAR_OFERTA";
            }
        }
    }

    regresarClick(data: any) {
        if (data.price > 0) {
            this.totalPagoOferta = data.price;
            this.activarPreviewPrice = true;
        } else {
            this.totalPagoOferta = 0;
            this.activarPreviewPrice = false;
        }
        if (typeof data.page !== "undefined") {
            if (data.page === "HIDDEN_BANNER") {
                // this.hiddenSwiper = true;
                this.page = data.page;
            } else {
                // this.hiddenSwiper = false;
                if (data.page === "VISTA_360") {
                    this.nombreCliente = data.dataCliente;
                    this.Topics = data.topics;
                }

                if (data.page === "MEJOR_OFERTA") {
                    if (
                        typeof data.offerData !== "undefined" &&
                        data.offerData &&
                        data.offerData !== null
                    ) {
                        this.bestOfferData = data.offerData;
                        this.topicId = data.topicId;
                    }
                }

                if (data.page === "PRODUCTOS_SERVICIOS") {
                    if (
                        typeof data.topics !== "undefined" &&
                        data.topics &&
                        data.topics !== null
                    ) {
                        this.Topics = data.topics;
                        this.serviceSelected = data.serviceSelected;
                    }
                }
                this.stepView = data.page;
                this.activeSteps = data.step;
                this.page = data.page;
            }
        }
    }

    loadinpageClick(data: any) {
        // setTimeout(() => {
        this.isProcess = data.isProcess;
        this.aProgressSpinner = data.aProgressSpinner;
        // }, 1000);
    }

    constructor(private breadcrumbService: BreadcrumbService, private cdRef: ChangeDetectorRef, private route: ActivatedRoute
        , private customerInformationService: CustomerInformationService) {
        this.breadcrumbService.setItems([{ label: "Empty Page" }]);
        this.activeSteps = 0;
    }

    ngAfterViewInit() {
        console.debug("! changement de la date du composant !");
        this.cdRef.detectChanges();
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    ngOnInit() {

        this.route.paramMap.subscribe(async (param) => {

            let params: any = {

            };

            console.debug("param.get('pageView')", param.get('pageView'));

            if (param.get('pageView')) {
                params.page = param.get('pageView');
                if (parseInt(params.page) === 2) {
                    this.stepView = "VISTA_360";
                    this.nombreCliente = <Customer> this.customerInformationService.getCustomerInformation();
                    this.nombreClienteClaroUP = JSON.parse(localStorage.getItem("clienteClaroUP"));
                    this.activeSteps = 1;
                }
            }

        });
        // rtfToHTML.fromString('{\\rtf1\\ansi\\b hi there\\b0}', (err, html) => {
        //     console.debug(html)
        //     // prints a document containing:
        //     // <p><strong>hi there</strong></p>
        // })



        this.sortOptions = [
            { label: "Precio Mayor", value: "!year" },
            { label: "Precio Menor", value: "year" },
            { label: "Marca", value: "brand" }
        ];

        this.stepsItems = [
            {
                label: "Busca a tu Cliente"
            },
            {
                label: "Vista 360 de tu cliente"
            },
            {
                label: "Nuestros Productos y Servicios"
            },
            {
                label: "La Mejor Oferta para tu Cliente"
            },
            {
                label: "Activar Oferta"
            },
            {
                label: "Documento Digital"
            }
        ];
    }
}
