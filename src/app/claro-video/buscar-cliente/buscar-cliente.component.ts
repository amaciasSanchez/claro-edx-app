import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonService} from '../claroup/service/personservice';
import {ErrorMessage} from 'src/app/error-message';
import {ClaroUpPersonService} from '../../claro-up/services/personservice';
import {ActivatedRoute} from '@angular/router';
import {zip} from 'rxjs/internal/observable/zip';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { IntegrationService } from 'src/app/customer/services/integration/integration.service';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';


@Component({
    selector: 'app-buscar-cliente',
    templateUrl: './buscar-cliente.component.html',
    styleUrls: ['./buscar-cliente.component.css'],
    providers: [PersonService]
})
export class BuscarClienteComponent implements OnInit {
    @Input() item: any;
    itemsBreadcrumb: any;
    @Output() regresarClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() loadinpage: EventEmitter<any> = new EventEmitter<any>();
    aProgressSpinner = false;
    isProcess = false;
    activeSteps: number = 0;
    searchClientNumber: string = '593';
    nombreCliente: any;
    nombreClienteClaroUp: any;
    errorInterface: ErrorMessage;
    disabledBtn: boolean = true;
    platform: string;

    private CUSTOMER_INFORMATION_CLAROUP : string = "clienteClaroUP";

    constructor(
        private customerInformationService: CustomerInformationService,
        private claroUpService: ClaroUpPersonService, 
        private route: ActivatedRoute) {
        this.errorInterface = {
            isError: false,
            message: ''
        };
    }

    ngOnInit() {
        this.route.queryParams.subscribe(
            params => {
                this.platform = params.platform;
                this.customerInformationService.initCustomerInformation();
            }
        );
    }

    inputChange(event) {
        this.disabledBtn = (event === '');
        this.clearError();
    }

    setError(_message: string) {
        this.errorInterface = {
            isError: true,
            message: _message
        };
    }

    clearError() {
        this.errorInterface = {
            isError: false,
            message: ''
        };
    }

    searchNumber() {
        this.customerInformationService.initCustomerInformation();
        if (this.searchClientNumber === '') {
            this.setError('Ingrese un n??mero celular, identificaci??n o n??mero de Servicio');

        } else {
            this.showLoadingPage();
            //================OBTENER INFORMACI??N DEL CLIENTE
            this.customerInformationService.loadCustomerInformation(
                this.searchClientNumber
            ).then( 
                (customerInformationResponse: Customer) => {
                    this.regresarClick.emit({
                        dataCliente: customerInformationResponse,
                        page: 'VISTA_360',
                        step: 1
                    });
                    this.customerInformationService.loadCustomerSubscriptions(this.searchClientNumber); // cargar las suscripciones del cliente
                    this.getCustomerInformationForClaroUp(this.searchClientNumber);
                }
            ).catch(
                ex => {
                    this.setError(ex);    
                }
            ).finally(
                () => {
                    this.hideLoadingPage();
                }
            );

            
        }
    }

    getCustomerInformationForClaroUp(searchClientNumber: string) {
        console.log("--INICIA-- la invocaci??n de la b??squeda de la informaci??n personal del cliente desde el BFF de ClaroUp");
        this.claroUpService.getServiceNumber(
            { 
                numbercli: searchClientNumber
            }
        ).then(
            claroUpResponse => {
                if (claroUpResponse !== null && claroUpResponse['customerId']) {
                    this.nombreClienteClaroUp = claroUpResponse;
                    localStorage.setItem(this.CUSTOMER_INFORMATION_CLAROUP, JSON.stringify(this.nombreClienteClaroUp));
                }
            }
        ).catch(
            errorClaroUP => {
                console.error('Error en b??squeda informaci??n ClaroUP', errorClaroUP.error);
                if (errorClaroUP.error.code === '404' ||  errorClaroUP.error.code === '400') {
                    this.setError('Cliente no encontrado');
                } else if (errorClaroUP.error.code === '403') {
                    this.setError('Su usuario no cumple con los permisos requeridos para realizar esta acci??n');
                } else {
                    this.setError('Ha surgido un problema intentelo m??s tarde');
                }
            }
        ).finally(
            () => {
                console.log("--TERMINA-- la invocaci??n de la b??squeda de la informaci??n personal del cliente desde el BFF de ClaroUp");
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
        this.loadinpage.emit({
            isProcess: data.isProcess,
            aProgressSpinner: data.aProgressSpinner
        });
    }
    
}
