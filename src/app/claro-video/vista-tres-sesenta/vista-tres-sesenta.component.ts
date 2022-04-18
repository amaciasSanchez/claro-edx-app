import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { PersonService } from "../claroup/service/personservice";
import { Router } from '@angular/router';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from "@angular/animations";
import {ErrorMessage} from 'src/app/error-message';
import {BestofferComponent} from '../claroup/view/bestoffer.component';
import { CustomerInformationService } from "src/app/customer/services/customer-information/customer-information.service";

declare var $: any;


@Component({
    selector: "app-vista-tres-sesenta",
    templateUrl: "./vista-tres-sesenta.component.html",
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
    styleUrls: ["./vista-tres-sesenta.component.css"],
    providers: [PersonService]
})


export class VistaTresSesentaComponent implements OnInit {
    @Input() item: any;
    @Input() nombreCliente: any;
    itemsBreadcrumb: any;
    @Output() regresarClick: EventEmitter<any> = new EventEmitter();
    @Output() loadinpage: EventEmitter<any> = new EventEmitter<any>();
    errorInterface: ErrorMessage;
    Topics;
    aProgressSpinner = false;
    isProcess = false;
    timeStamp;
    linkPicture = "../assets/layout/images/vision/c360_3_view.png";
    linkPictureP = "../assets/layout/images/vision/c360_3_view-p.png";
    myForm: FormGroup;
    dataGridview: any = {};
    arrayArea: any = [
        {
            order: 1,
            title: "¿Quién es?",
            coords: "225,15,270,85",
            pathImageHover: "assets/layout/images/vision/c360_1.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 2,
            title: "¿Dónde lo ubicamos?",
            coords: "325,35,370,105",
            pathImageHover: "assets/layout/images/vision/c360_8.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 3,
            title: "¿Qué ha comprado? ",
            coords: "402,108,447,188",
            pathImageHover: "assets/layout/images/vision/c360_7.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 4,
            title: "¿Qué servicios tiene?",
            coords: "419,211,464,281",
            pathImageHover: "assets/layout/images/vision/c360_6.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 5,
            title: "¿Qué le puedo vender?",
            coords: "394,314,439,384",
            pathImageHover: "assets/layout/images/vision/c360_5.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 6,
            title: "¿Qué ha consumido?",
            coords: "318,392,363,462",
            pathImageHover: "assets/layout/images/vision/c360_4.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 7,
            title: "¿Qué proceso tiene pendiente?",
            coords: "223,417,268,487",
            pathImageHover: "assets/layout/images/vision/c360_3.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 8,
            title: "¿Qué dispositivos tiene?",
            coords: "126,389,171,459",
            pathImageHover: "assets/layout/images/vision/c360_2.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 9,
            title: "¿Qué ha solicitado?",
            coords: "55,314,100,384",
            pathImageHover: "assets/layout/images/vision/c360_2.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 10,
            title: "¿Cuánto nos debe?",
            coords: "25,211,70,281",
            pathImageHover: "assets/layout/images/vision/c360_2.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 11,
            title: "¿Cómo nos paga?",

            coords: "35,108,95,188",
            pathImageHover: "assets/layout/images/vision/c360_2.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        },
        {
            order: 12,
            coords: "245,253,153",
            pathImageHover: "assets/layout/images/vision/c360_2.png",
            pathImageleave: "assets/layout/images/vision/c360_0.png"
        }
    ];

    showContentView: boolean = true;
    activeSteps;
    showContent: boolean = false;
    serviceSelected: any;
    disabledBtn: boolean = false;
    title: any;
    eventFactory: any;
    contexto: any;
    ruta_image = this.linkPicture;

    constructor(private personservice: PersonService, private router: Router, private comp: BestofferComponent
        , private customerInformationService: CustomerInformationService) {}

    ngOnInit() {
        this.errorInterface = {
            isError: false,
            message: ''
        };
        this.dataGridview.tipo;
        this.dataGridview.tipo = 1;
        this.dataGridview.title = this.arrayArea[0].title;
        this.dataGridview.data = this.nombreCliente;

        /* if (
            this.nombreCliente.subscriptions.length === 0 ||
            this.nombreCliente.subscriptions.length > 1
        ) {
            this.disabledBtn = true;
        }*/
        let selft = this;

        if (this.nombreCliente.personalInformation.gender) {
            if (this.nombreCliente.personalInformation.gender === "MASCULINO") {

                this.ruta_image = this.linkPictureP;
            } else {
                this.ruta_image = this.linkPicture;
            }
        }


        $(document).ready(function (e) {
            $('[data-toggle="tooltip"]').tooltip();

            $(".area").on('mousemove', function (evv) {
                if ($("#" + $(this).attr("TooltipId")).attr("data-placement") == "right") {
                    $("#" + $(this).attr("TooltipId")).css({
                        top: evv.pageY - 220,
                        left: evv.pageX - 100
                    });

                } else {
                    $("#" + $(this).attr("TooltipId")).css({
                        top: evv.pageY - 220,
                        left: evv.pageX
                    });
                }


                // selft.eventFactory = evv;

                // console.debug("selft.eventFactory", selft.eventFactory);


                $("#" + $(this).attr("TooltipId")).tooltip('show');
                $(".tooltip-inner").css({
                    "background-color": $(this).attr("TooltipBackround")
                });





                var a = ($("#" + $(this).attr("TooltipId")).attr("data-placement") != "") ? $("#" + $(this).attr("TooltipId")).attr("data-placement") : "right";
                $(".tooltip-arrow").css("border-" + a + "-color", $(this).attr("TooltipBackround"));
            })

            $(".area").on('mouseleave', function (e) {
                $("#" + $(this).attr("TooltipId")).tooltip('hide')
            });
        });


    }

    public getLinkPicture() {
        if (this.timeStamp) {
            return this.ruta_image + "?" + this.timeStamp;
        }
        return this.ruta_image;
    }

    public setLinkPicture(url: string, div: number, item: any, $event: Event) {
        // this.linkPicture = url;
        // this.timeStamp = new Date().getTime();
        // if (div !== 0) {
        // console.debug("item",item)
        // this.title = item.title;
        // console.debug("this.title", this.title);
        // console.debug("$$event.clientTop", this.eventFactory.pageY);
        // console.debug("$$event.clientLeft", this.eventFactory.pageX);

        //     this.contexto ='<i id="area-tooltip1" class="area-tooltip" data-toggle="tooltip" data-html="true" data-placement="right" title="'+ this.title+'" data-animation="false" data-trigger="manual">&#160;</i>';


        //     $("#" + $(this).attr("TooltipId")).css({
        //         top: this.eventFactory.pageY - 180,
        //         left: this.eventFactory.pageX
        //     });

        //     $("#" + $(this).attr("TooltipId")).tooltip('show');
        //     $(".tooltip-inner").css({
        //         "background-color": $(this).attr("TooltipBackround")
        //     });





        //     var a = ($("#" + $(this).attr("TooltipId")).attr("data-placement") != "") ? $("#" + $(this).attr("TooltipId")).attr("data-placement") : "right";
        //     $(".tooltip-arrow").css("border-" + a + "-color", $(this).attr("TooltipBackround"));
        // } else {
        //     $("#" + $(this).attr("TooltipId")).tooltip('hide')
        // }


    }

    setData(item) {

        this.showContentView = this.showContentView ? false : true;
        this.showContentView = true;
        console.debug("item", item);
        console.debug("this.showContentView ", this.showContentView);

        item.tipo = item.order;
        item.data = this.nombreCliente;
        this.dataGridview = item;
        this.showContent = true;
        // this.dataGridview.tipo === item.order;
        // this.dataGridview.data = this.nombreCliente;
    }

    selectedServices(item) {
        console.debug("item service selected", item);
        this.serviceSelected = item;
        this.disabledBtn = item.disabled;
    }

    buscar() {
        this.setData(this.arrayArea[0]);
        console.log("Verificando carga completa: ", localStorage.getItem('fullLoad'));
        if(!this.customerInformationService.isSearchingSubscriptions()) {
            console.log("Carga completa!");
            //localStorage.setItem("cliente", JSON.stringify(this.nombreCliente))
            this.nombreCliente = this.customerInformationService.getCustomerInformation();
            let subscriptions = this.customerInformationService.getCustomerSubscriptions();

            this.loadinpage.emit({
                isProcess: true,
                aProgressSpinner: true
            });
            this.aProgressSpinner = true;
            console.debug("activeSteps", this.activeSteps);

            this.personservice.getTopics().subscribe(
                resp => {
                    this.Topics = resp[0];
                    console.debug("this.Topics", this.Topics);
                    this.aProgressSpinner = false;

                    if (subscriptions && subscriptions.length === 1) {
                        this.serviceSelected = subscriptions[0];
                    }
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false
                    });
                    this.regresarClick.emit({
                        topics: this.Topics,
                        serviceSelected: this.serviceSelected,
                        page: "PRODUCTOS_SERVICIOS",
                        step: 2
                    });
                    console.debug(this.Topics);
                },
                error => {
                    this.loadinpage.emit({
                        isProcess: false,
                        aProgressSpinner: false
                    });
                }
            );

            // Do something after
            console.debug("after delay");
            this.activeSteps++;
            
        } else {
            console.log('Aún no se completado la carga');
            $("#area-tooltip5").attr("data-original-title", "La información del cliente aún se esta cargando. Por favor vuelva a intentarlo");
            $("#area-tooltip5").tooltip('hide');
            $("#area-tooltip5").tooltip('show');
        }

    }

    process() {
        localStorage.setItem("cliente", JSON.stringify(this.nombreCliente))
        this.router.navigate(["/claro-bpm"]);
    }

    consumos() {
        this.router.navigate(["/claro-consumo"]);
    }

    facturacion() {
        console.log("FACTURACION");
   //     this.setData(this.arrayArea[0]);
        console.log("Verificando carga completa: ", localStorage.getItem('fullLoad'));

        //BYPASS porque no se necesita para facturacion!!!
        if(true || localStorage.getItem('fullLoad')) {
            this.nombreCliente = localStorage.getItem('cliente');
            console.log("localStorage  INFO cliente:::::");
            console.dir(this.nombreCliente);
          //  console.log("Carga completa!");
   //  this.router.navigate(["/claro-metodo-pago"]);
          this.router.navigate(["/deudaClienteValorPendiente"]);

        } else {
            console.log('Aún no se completado la carga');
            $("#area-tooltip10").attr("data-original-title", "La información del cliente aún se esta cargando. Por favor vuelva a intentarlo");
            $("#area-tooltip10").tooltip('hide');
            $("#area-tooltip10").tooltip('show');
        }
        
    }
    //
    //
    //

    facturacionMO(){
        if(localStorage.getItem('fullLoad')) {
            $("#area-tooltip10").attr("data-original-title", "La información del cliente se completo de cargar, proceder");
           $("#area-tooltip10").tooltip('hide');
           $("#area-tooltip10").tooltip('show');
            } else {
           console.log('Aun no se completado la carga');
           $("#area-tooltip10").attr("data-original-title", "La información del cliente aún se esta cargando. Por favor vuelva a intentarlo");
           $("#area-tooltip10").tooltip('hide');
           $("#area-tooltip10").tooltip('show');
       }
   }
   
    metodoPago() {
        this.setData(this.arrayArea[0]);
        console.log("Verificando carga completa: ", !this.customerInformationService.isSearchingSubscriptions());
        if(!this.customerInformationService.isSearchingSubscriptions()) {
            console.log("Carga completa!");
            this.router.navigate(["/claro-metodo-pago"]);
        } else {
            console.log('Aún no se completado la carga');
            $("#area-tooltip11").attr("data-original-title", "La información del cliente aún se esta cargando. Por favor vuelva a intentarlo");
            $("#area-tooltip11").tooltip('hide');
            $("#area-tooltip11").tooltip('show');
        }
        
    }

    ordenes() {
        this.router.navigate(["/claro-ordenes"]);
    }

    services() {
        this.setData(this.arrayArea[0]);
        if(!this.customerInformationService.isSearchingSubscriptions()) {
            this.router.navigate(["/claro-productos"]);
            
        } else {
            $("#area-tooltip4").attr("data-original-title", "La información del cliente aún se esta cargando. Por favor vuelva a intentarlo");
            $("#area-tooltip4").tooltip('hide');
            $("#area-tooltip4").tooltip('show');
        }
    }


    devices() {
        localStorage.setItem("cliente", JSON.stringify(this.nombreCliente))
        this.router.navigate(["/dispositivos"]);
    }


    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    retornar() {
        console.log("Entre");
        //Se elimina la información que tiene el usuario en la sesion.
        localStorage.removeItem('cliente');
        localStorage.removeItem('clienteClaroUP');
        localStorage.removeItem('fullLoad');
        localStorage.removeItem('flagModeSearch');

        //Cambio de vista a buscar cliente
        this.comp.activeIndexChange(0, false);

    }
}
