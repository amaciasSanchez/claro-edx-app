import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { ClaroUpPersonService } from 'src/app/claro-up/services/personservice';

import * as moment from 'moment';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { Subscription } from '../../customer/modelo/subscription.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
moment.locale("es");

@Component({
    selector: 'app-claro-video-devices',
    templateUrl: './claro-video-devices.component.html',
    styleUrls: ['./claro-video-devices.component.css'], styles: [`

        .carousel-devices {
            background-color: white;
        }

        .carousel-devices img {
            display: flex;
            margin: auto;
        }

        .carousel-devices .ui-carousel-item {

            max-width: 300px;
        }

        .ui-carousel-dots-container {
            display: none;
        }

        @media (min-width: 990px) {
            .carousel-devices .ui-carousel-items-container {

                justify-content: space-around !important;
                display: flex !important;

            }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class ClaroVideoDevicesComponent implements OnInit {
    public customer: Customer;
    private searchCustomerIdentificationType: string;
    private searchCustomerNumber: string;
    private identifierNumber: any;

    responsiveOptions: any;
    activarpopover: boolean = false;
    typeError: any;
    offer: any;
    financingPlan: any;
    claroUpServices: any;
    otherServices: any;
    customerIdOtt: string;
    deviceId: string;
    imei: any;
    servicenumberoffer: string;
    flagAlign = '0';
    
    aProgressSpinner = false;
    isProcess = false;

    showModal = false;
    modal: any = {
        message: "",
        type: "",
        modal: false
    };
  
    public fromDate : string;
    public toDate : any;
    identificationNumber;
    devices : any[];
    searchCriteriaCustomer: any;
    searchNumberCustomer: any;

    displayModalTracking: boolean = false;
    trackingData: any[];
    mapSubscriptionData: Map<string, Subscription> = new Map();
    subscription: Subscription;
    dateNow : Date = new Date();

    constructor(private service: ClaroUpPersonService, private customerInformationService: CustomerInformationService) {
        
        this.customer = <Customer> this.customerInformationService.getCustomerInformation();
        this.searchCustomerIdentificationType = this.customerInformationService.getSearchCustomerIdentificationType();
        this.searchCustomerNumber = this.customerInformationService.getSearchCustomerNumber();
        console.log('CLIENTE: ', this.customer);
        
        if(history.state.data) {
            this.identifierNumber = history.state.data.servicenumberoffer;
            console.log("ServiceNumber seleccionado: " + this.identifierNumber);
            this.searchCriteriaCustomer="SN";
            this.searchNumberCustomer=this.identifierNumber;
        }

        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    ngOnInit() {
        let today = new Date();
        today.setDate(today.getDate() - 2);
        this.toDate = moment(today).format('YYYY-MM-DD'); 
        let lastDate = new Date();
        lastDate.setDate(today.getDate() - 30);
        this.fromDate = moment(lastDate).format('YYYY-MM-DD'); 
        this.loadDevices();
        let arraySubscriptions = this.customerInformationService.getCustomerSubscriptions();
        console.log("arraySubscriptions: ", arraySubscriptions);

        let numService : string;
        arraySubscriptions.forEach(element => {
            numService = element.subscriptionInformation.serviceNumber;
            numService = numService.length === 9 ? "".concat("593").concat(numService) : numService;
            this.mapSubscriptionData.set(numService,element);
        });
    }

    activarOverlay(device: any) {
        this.activarpopover = !this.activarpopover;
        this.financingPlan = [];
        this.claroUpServices = [];
        this.otherServices = [];
        if(device != null && device.installmentResult != null 
            && device.installmentResult.installmentDetail != null)
            this.financingPlan = device.installmentResult.installmentDetail;
        if(device != null && device.detailDevice != null)
            this.claroUpServices = device.detailDevice;
        if(device != null && device.otherServices != null)
            this.otherServices = device.otherServices;
        if(device != null && device.description != null)
            this.customerIdOtt = device.description;
        if(device != null && device.productSerialNumber != null)
            this.deviceId = device.productSerialNumber;

    }

    btnEntendido(event: any) {
        this.activarpopover = !event.closeOverlay;
        console.log('Llego reload: ', event.reload);
        if(event.reload == true) {
            console.log('Se cargará nuevamente la página debido a que hubo una acción en el panel de "Mas información"')
            this.loadDevices();
        } else {
            console.log('No se ejecutó ninguna acción en el panel de "Mas información"')
        }
    }

    loadDevices () {
        this.showLoadingPage();
        if(this.identifierNumber==null||this.identifierNumber=='undefined'){
            this.identifierNumber=this.searchCustomerNumber;
        }

        console.log("a buscar los dispositivos: ", this.customer.customerId);
        this.service.getDevices(
            this.searchCustomerIdentificationType,
            this.identifierNumber,
            this.fromDate,
            this.toDate,
            this.customer.customerId
        ).subscribe(
            data => {
                this.hideLoadingPage();
                console.log('Estas son los dispositivos del cliente:', data);
                this.devices = data;

                if(this.devices.length < 4){
                    this.flagAlign = '1';
                }
                /*if(this.imei != null) {
                    console.log("Se filtraran los dispositivos por el imei seleccionado: ", this.imei);
                    this.devices = this.devices.filter((item: any) => item.imei == this.imei);
                }

                if(this.imei != null) {
                    console.log("Se filtraran los dispositivos por el imei seleccionado: ", this.imei);
                    this.devices = this.devices.filter((item: any) => item.imei == this.imei);
                }*/
                console.log("devices: ",this.devices);

            }, 
            error => {
                this.hideLoadingPage();
                console.error("Ocurrió un error mientras se consultaban los dispositivos del cliente: ", error);
                if(error.status == 409) {
                    this.showErrorModal(error.error.message);
                }
            }
        );
    }

    showLoadingPage(){
        this.loadinpageClick({
            isProcess: true,
            aProgressSpinner: true
        });
    }

    hideLoadingPage(){
        this.loadinpageClick({
            isProcess: false,
            aProgressSpinner: false
        });
    }
    
    loadinpageClick(data: any) {
        console.debug("data", data);
        this.isProcess = data.isProcess;
        this.aProgressSpinner = data.aProgressSpinner;
    }

    showSuccessModal(message: string) {
        this.modal = {
            message: message,
            type: 'SUCCESS'
        };
        this.showModal = true;
    }

    showErrorModal(message: string) {
        this.modal = {
            message: message,
            type: 'ERROR'
        };
        this.showModal = true;
    }

    hideModal() {
        this.showModal = false;
    }

    /**
     * @author fobregon
     * @param device
     */
    showModalDialogTracking(device: any){
        let lastDayOfMonth = new Date(this.dateNow.getFullYear(), this.dateNow.getMonth()+1, 0);

        let startDate : string = moment(this.dateNow).format('DD-MM-YYYY');
        let endDate : string = moment(lastDayOfMonth).format('DD-MM-YYYY');

        this.subscription = this.mapSubscriptionData.get(device["productType"]);

        console.log("SUBSCRIpCION: ",this.subscription);
        this.showLoadingPage();
        this.service.getTrackingByDevice(
            this.subscription.subscriptionInformation.serviceNumber,
            startDate,
            endDate
        ).subscribe(
            data => {
                console.log('datos de tranking por dispositivo: ',data);
                this.trackingData = data;
                console.log("presentando modal");
                this.displayModalTracking = true;
                this.hideLoadingPage();
            },
            error => {
                console.error("Ocurrió un error mientras se consultaba el tracking por dispositivo: ", error);
                this.hideLoadingPage();
            }
        );
    }

    hideModalDialogTracking(event: any){
        this.displayModalTracking = !event.closeOverlay;
    }


}
