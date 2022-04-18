import { Injectable } from '@angular/core';
import { ClaroIdProfile } from 'src/app/ott/modelos/ClaroIdProfile';
import { Customer, PersonalInformation } from '../../modelo/customer.model';
import { Subscription } from '../../modelo/subscription.model';
import { IntegrationService } from '../integration/integration.service';

enum SearchStatusType {
  searching = 'searching',
  ok = 'ok',
  error = 'error', 
  none = 'none'
}

enum SearchType {
  serviceNumber = 'SN', 
  identification = 'ID'
}

@Injectable({
  providedIn: 'root'
})
export class CustomerInformationService {

  constructor(public integrationService: IntegrationService) { }

  private SUBSCRIPTION_SEARCH_STATUS: string = 'SUBSCRIPTION_SEARCH_STATUS';
  private SEARCH_TYPE: string = 'SEARCH_TYPE';
  private SEARCH_CUSTOMER_NUMBER: string = 'SEARCH_CUSTOMER_NUMBER';
  private SEARCH_CUSTOMER_IDENTIFICATION_TYPE: string = 'SEARCH_CUSTOMER_IDENTIFICATION_TYPE';
  private CUSTOMER_INFORMATION: string = 'CUSTOMER_INFORMATION';
  private CUSTOMER_SUBSCRIPTIONS: string = 'CUSTOMER_SUBSCRIPTIONS';

  public initCustomerInformation() {
    this.setSubscriptionSearchStatus(SearchStatusType.none);
    this.setSearchType(SearchType.serviceNumber);
    this.setSearchCustomerNumber(null);
    this.setSearchCustomerIdentificationType(null);
    this.setCustomerInformation(null);
    this.setCustomerSubscriptions(null);
  }

  public getClaroIdProfile(_serviceNumber: string): Promise<ClaroIdProfile> {
    console.log("--INICIA-- la invocación de la búsqueda del perfil Claro Id del cliente");
    console.log("Service number a buscar: ", _serviceNumber);
    return new Promise<ClaroIdProfile>( (resolve, reject) => {
      this.integrationService.getClaroIdProfile(
          _serviceNumber
      ).then(
          (__claroIdProfileResponse: any) => {
              if (__claroIdProfileResponse !== null) {
                resolve(<ClaroIdProfile> __claroIdProfileResponse.response); // retornando el cliente encontrado

              } else {
                  reject('Ha surgido un problema intentelo más tarde'); // retorna el error
              }
          }
      ).catch(
          (__errorResponse) => {
              console.error('error', __errorResponse);
              if (__errorResponse.error.code === '404' || __errorResponse.error.code === '400') {
                reject('Cliente no encontrado');
              } else if (__errorResponse.error.code === '403') {
                reject('Su usuario no cumple con los permisos requeridos para realizar esta acción');
              } else {
                reject('Ha surgido un problema intentelo más tarde');
              }
          }
      ).finally(
          () => {
              console.log("--TERMINA-- la invocación de la búsqueda de la información personal del cliente");            
          }
      )
    });
  }

  public loadCustomerInformation(_searchCustomerNumber: string): Promise<Customer> {
    console.log("--INICIA-- la invocación de la búsqueda de la información personal del cliente");
    this.initCustomerInformation(); // primero se limpian las variables
    return new Promise<Customer>( (resolve, reject) => {
      this.integrationService.getCustomerInformation(
          { 
              numbercli: _searchCustomerNumber
          }
      ).then(
          (__customerInformationResponse: Customer) => {
            console.log("CUSTOMER ENCONTRADO:  ", __customerInformationResponse);
              if (__customerInformationResponse !== null && __customerInformationResponse.customerId) {
                this.setCustomerInformation(__customerInformationResponse);
                this.setSearchCriteria(_searchCustomerNumber,__customerInformationResponse.typeConsult);
                resolve(__customerInformationResponse); // retornando el cliente encontrado

              } else {
                  reject('Ha surgido un problema intentelo más tarde'); // retorna el error
              }
          }
      ).catch(
          (__errorResponse) => {
              console.error('error', __errorResponse);
              if (__errorResponse.error.code === '404' || __errorResponse.error.code === '400') {
                reject('Cliente no encontrado');
              } else if (__errorResponse.error.code === '403') {
                reject('Su usuario no cumple con los permisos requeridos para realizar esta acción');
              } else {
                reject('Ha surgido un problema intentelo más tarde');
              }
          }
      ).finally(
          () => {
              console.log("--TERMINA-- la invocación de la búsqueda de la información personal del cliente");            
          }
      )
    });
  }

   public loadCustomerSubscriptions(_searchCustomerNumber: string,_retry: Boolean = true) {
    if(this.getSubscriptionSearchStatus() === SearchStatusType.searching)
      return;

    if(this.getSubscriptionSearchStatus() === SearchStatusType.ok && !_retry)
      return;

    //================CONSULTANDO SUSCRIPCIONES DEL CLIENTE
    console.log("--INICIA-- la invocación de la búsqueda de suscripciones del cliente");
    this.setSubscriptionSearchStatus(SearchStatusType.searching);

    console.log("-BUSQUEDA DE SUSCRIPCIONES: ", this.getSubscriptionSearchStatus());
    console.log("-TIPO BUSQUEDA: ", this.getSearchType());
    console.log("-TIPO IDENTIFICACIÓN PARA BÚSQUEDA: ", this.getSearchCustomerIdentificationType());

    this.integrationService.getSubscriptions(
        {
          identificationType: "",
          identificationNumber: _searchCustomerNumber
        }
    ).then(
        (__subscriptionsResponse: Subscription[]) => {
          if (__subscriptionsResponse !== null) {
            this.setSubscriptionSearchStatus(SearchStatusType.ok);
            this.setCustomerSubscriptions(__subscriptionsResponse);
          } else {
            this.setSubscriptionSearchStatus(SearchStatusType.error);
            console.error('Ha surgido un problema intentelo más tarde. La respuesta devuelta por el servicio ha sido nula.');
          }
        }
    ).catch(
        (__errorResponse) => {
            this.setSubscriptionSearchStatus(SearchStatusType.error);
            console.error('error', __errorResponse.error);
        }
    ).finally(
        () => {
            console.log("--TERMINA-- la invocación de la búsqueda de suscripciones del cliente");
        }
    );
  }

  public loadCustomerSubscriptionsByFilters(_retry: Boolean = true) {
    if(this.getSubscriptionSearchStatus() === SearchStatusType.searching)
      return;

    if(this.getSubscriptionSearchStatus() === SearchStatusType.ok && !_retry)
      return;

    //================CONSULTANDO SUSCRIPCIONES DEL CLIENTE
    console.log("--INICIA-- la invocación de la búsqueda de suscripciones del cliente");
    this.setSubscriptionSearchStatus(SearchStatusType.searching);

    console.log("-BUSQUEDA DE SUSCRIPCIONES: ", this.getSubscriptionSearchStatus());
    console.log("-TIPO BUSQUEDA: ", this.getSearchType());
    console.log("-TIPO IDENTIFICACIÓN PARA BÚSQUEDA: ", this.getSearchCustomerIdentificationType());

    this.integrationService.getSubscriptions(
        {
          identificationType: this.getSearchCustomerIdentificationType(),
          identificationNumber: this.getSearchCustomerNumber()
        }
    ).then(
        (__subscriptionsResponse: Subscription[]) => {
          if (__subscriptionsResponse !== null) {
            this.setSubscriptionSearchStatus(SearchStatusType.ok);
            this.setCustomerSubscriptions(__subscriptionsResponse);

          } else {
            this.setSubscriptionSearchStatus(SearchStatusType.error);
            console.error('Ha surgido un problema intentelo más tarde. La respuesta devuelta por el servicio ha sido nula.');
          }
        }
    ).catch(
        (__errorResponse) => {
            this.setSubscriptionSearchStatus(SearchStatusType.error);
            console.error('error', __errorResponse.error);
        }
    ).finally(
        () => {
            console.log("--TERMINA-- la invocación de la búsqueda de suscripciones del cliente");
        }
    );
  }

  private setSearchCriteria(_searchCustomerNumber: string, _typeConsult: string) {
    this.setSearchCustomerNumber(_searchCustomerNumber);
    let prefix = _searchCustomerNumber.substring(0,3);
    let length = _searchCustomerNumber.length;
    if(_typeConsult=="serviceNumber"){
      this.setSearchType(SearchType.serviceNumber);
      this.setSearchCustomerIdentificationType(SearchType.serviceNumber);
    } else {
      let customer: Customer = this.getCustomerInformation();
      this.setSearchType(SearchType.identification);
      this.setSearchCustomerIdentificationType(customer.personalInformation.identificationType);
    }
  }

  //isSearchingSubscriptions
  public isSearchingSubscriptions(): Boolean {
    console.log('Estado búsqueda de suscripciones: ', this.getSubscriptionSearchStatus());
    return this.getSubscriptionSearchStatus() === SearchStatusType.searching;
  }
  //isSearchByServiceNumber
  public isSearchByServiceNumber(): Boolean {
    console.log('Tipo de búsqueda: ', this.getSearchType());
    return this.getSearchType() === SearchType.serviceNumber;
  }

  //============================= GETTERS AND SETTERS =====================================
  // CUSTOMER INFORMATION
  public getCustomerInformation(): Customer {
    return <Customer> JSON.parse(localStorage.getItem(this.CUSTOMER_INFORMATION));
  }
  private setCustomerInformation(_customerInformation: Customer): void {
    localStorage.setItem(this.CUSTOMER_INFORMATION, JSON.stringify(_customerInformation));
  }
  // CUSTOMER SUBSCRIPTIONS
  public getCustomerSubscriptions(): Subscription[] {
    return <Subscription[]> JSON.parse(localStorage.getItem(this.CUSTOMER_SUBSCRIPTIONS));
  }
  private setCustomerSubscriptions(_customerSubscriptions: Subscription[]): void {
    localStorage.setItem(this.CUSTOMER_SUBSCRIPTIONS, JSON.stringify(_customerSubscriptions));
  }
  //SEARCH CUSTOMER NUMBER
  public getSearchCustomerNumber(): string {
    return <string> localStorage.getItem(this.SEARCH_CUSTOMER_NUMBER);
  }
  private setSearchCustomerNumber(_searchCustomerNumber: string): void {
    localStorage.setItem(this.SEARCH_CUSTOMER_NUMBER, _searchCustomerNumber);
  }
  //SEARCH TYPE
  public getSearchType(): string {
    return <string> localStorage.getItem(this.SEARCH_TYPE);
  }
  private setSearchType(_searchType: string): void {
    localStorage.setItem(this.SEARCH_TYPE, _searchType);
  }
  //SUBSCRIPTION SEARCH STATUS
  public getSubscriptionSearchStatus(): string {
    return <string> localStorage.getItem(this.SUBSCRIPTION_SEARCH_STATUS);
  }
  private setSubscriptionSearchStatus(_subscriptionSearchStatus: string): void {
    localStorage.setItem(this.SUBSCRIPTION_SEARCH_STATUS, _subscriptionSearchStatus);
  }
  //SEARCH CUSTOMER IDENTIFICATION TYPE
  public getSearchCustomerIdentificationType(): string {
    return <string> localStorage.getItem(this.SEARCH_CUSTOMER_IDENTIFICATION_TYPE);
  }
  private setSearchCustomerIdentificationType(_searchCustomerIdentificationType: string): void {
    localStorage.setItem(this.SEARCH_CUSTOMER_IDENTIFICATION_TYPE, _searchCustomerIdentificationType);
  }
  

}