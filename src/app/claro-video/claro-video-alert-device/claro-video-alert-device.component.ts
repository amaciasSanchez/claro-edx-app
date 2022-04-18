import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {SelectItem} from 'primeng/api';
import { ClaroUpPersonService } from 'src/app/claro-up/services/personservice';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';
import * as uuid from 'uuid';
@Component({
    selector: 'app-claro-video-alert-device',
    templateUrl: './claro-video-alert-device.component.html',
    styleUrls: ['./claro-video-alert-device.component.css']
})
export class ClaroVideoAlertDeviceComponent implements OnInit {
    public customer : Customer;
    modalAdvertencia = false;
    loading: boolean = false;
    reload: boolean = false;
    
    cols: any[];
    colsFinanciamiento: any[];
    dataFinanciamiento: any[] = [];
    displayBasic2: boolean;

    colsSeguro: any[];
    dataSeguro: any[] = [];
    colsOtroServicios: any[];
    dataOtroServicios: any[] = [];

    selectedCity1: any;
    cities1: SelectItem[];
    unlinkDeviceResponse: any;
    inactivateClaroUpResponse: any;

    modal: any = {
        message: "",
        type: "",
        modal: false
    };
    showModal = false;
    aProgressSpinner = false;
    isProcess = false;

    @Output() btnEntendido: EventEmitter<any> = new EventEmitter<any>();
    //@Output() loadinpage: EventEmitter<any> = new EventEmitter<any>();

    @Input() activarpopover;
    @Input() typeError: any;
    @Input() offer: any = {};
    @Input() index: number;
    @Input() customerIdOtt: string;
    @Input() deviceId: string;
    @Input() financingPlan: any[] = [];
    @Input() claroUpServices: any[] = [];
    @Input() otherServices: any[] = [];

    constructor(private service: ClaroUpPersonService,
        private customerInformationService: CustomerInformationService) {
    }

    ngOnInit() {
        this.customer = <Customer> this.customerInformationService.getCustomerInformation();
        this.cities1 = [
            {label: 'Selecciona accion', value: null},
            {label: 'Olvidar', value: {id: 1, name: 'New York', code: 'NY'}}
        ];

        this.cols = [
            {field: 'vin', header: 'Vin'},
            {field: 'year', header: 'Year'},
            {field: 'brand', header: 'Brand'},
            {field: 'color', header: 'Color'}
        ];

        // encabezado de plan de financiamiento
        this.colsFinanciamiento = [

            {field: 'cuota', header: 'Cuota'},
            {field: 'valor', header: 'Valor'},
            {field: 'vencimiento', header: 'Vencimiento'},
            {field: 'estado', header: 'Estado'},
            {field: 'paga', header: 'Pagada el'},
            {field: 'd', header: '    '}
        ];

        // encabezado seguro del equipo
        this.colsSeguro = [

            {field: 'estado', header: 'Estado'},
            {field: 'activado', header: 'Activado el'},
            {field: 'prima', header: 'Prima'},
            {field: 'proveedor', header: 'Proveedor'},
            {field: 'siniestro', header: 'Ultimo siniestro'}
        ];

        // encabezado otros servicios
        this.colsOtroServicios = [

            {field: 'servicio', header: 'Producto'},
            {field: 'fecha', header: 'Fecha'},
            {field: 'estado', header: 'Estado'}
        ];

        // valores para llenar datatable otros servicios
        /*this.dataOtroServicios = [{
            "servicio": "Claro Video", "fecha": "12/04/2020 12:42:54", "estado": "Vinculado"
        }]*/

        //this.getDataOtherServices();
        //this.getDataDeviceInsurance();
        //this.getProductOrderingService("14777");

    }

    showBasicDialog2() {
        this.displayBasic2 = true;
    }


    actionClose() {
        console.log('Cerrando popup...');
        this.activarpopover = false;
        this.btnEntendido.emit({
            closeOverlay: true,
            reload: this.reload
        })

    }

    unLinkServiceAction(data: any){
        this.loading = true;
        let body = {
            'deviceId': this.deviceId,
            'customerId': this.customerIdOtt,
            'employeeId': 86
        };
        this.service.unlinkDevice(body, uuid.v4()).subscribe(
            data => {
                this.loading = false;
                this.reload = true;
                this.removeItemFromArr(this.otherServices, data);
                console.log("Esta es la respuesta del servicio de desvinculación de dispositivos: ", data);
                this.showSuccessModal(data.message);
            }, error => {
                this.loading = false;
                console.error("Ocurrió un error mientras se desvinculaba dispositivo del cliente: ", error);
                if(error.status == 409) {
                    this.showErrorModal(error.error.message);
                }
            }
        );
    }

    inactivate(data: any) {
        this.showLoadingPage();
        console.log('Las ofertas seleccionadas para inactivar son:', data);
        let offerCodes : [] = [];
        //offerCodes.push(data.offerCode);
        this.service.inactivateClaroUpOffers(data.serviceNumber, offerCodes).subscribe(
            data => {
                console.log("Esta es la respuesta del servicio: ", data);
                this.inactivateClaroUpResponse = data;
                this.modalAdvertencia = true;
                this.hideLoadingPage();
            }, error => {
                console.error(error);
                this.inactivateClaroUpResponse = {
                    "status":"ERROR",
                    "message":"Ocurrió un error al enviar a inactivar las ofertas seleccionadas"
                };
                this.modalAdvertencia = true;
                this.hideLoadingPage();
            }
        );
    }

    removeItemFromArr(arr, item) {
        var i = arr.indexOf( item );
        if ( i !== -1 ) {
            arr.splice( i, 1 );
        }
    }
    
    closeDialog() {
        this.modalAdvertencia=false; 
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
    
    loadinpageClick(data: any) {
        console.debug("data", data);
        this.isProcess = data.isProcess;
        this.aProgressSpinner = data.aProgressSpinner;
    }
}