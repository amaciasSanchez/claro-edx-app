import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IptvService {

    constructor(private http: HttpClient, private router: Router) {
    }

    sessionUserIptv: SessionUserIptv = JSON.parse(localStorage.getItem('cliente'));

    async getCustomerData(_identificationNumber: string) {
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: {identificationNumber: _identificationNumber}
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<CivilRegisterResponse>>(
            `${environment.claroIpTv.busClienteBffUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async getBestOffer(bestOfferRequest: BestOfferRequest) {
        console.log('Inicia busqueda: ', bestOfferRequest);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: bestOfferRequest
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<BestOfferResponse>>(
            `${environment.claroIpTv.bestOfferBffUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async instantiateBusinessProcess(instanciateProcessRequest: InstanciateProcessRequest) {
        console.log('Inicia busqueda: ', instanciateProcessRequest);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: instanciateProcessRequest
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<InstanciateBusinessProcessResponse>>(
            `${environment.claroIpTv.instantiateBusinessProcessBffUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async enterClaroIdData(requestClaroIdData: ClaroIdDataRequest) {
        console.log('Inicia busqueda: ', requestClaroIdData);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: requestClaroIdData
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<InitTaskResponse>>(
            `${environment.claroIpTv.enterClaroIDDataUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async confirmBestOffer(confirmBestOfferRequest: ConfirmBestOfferRequest) {
        console.log('Inicia busqueda: ', confirmBestOfferRequest);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: confirmBestOfferRequest
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<InitTaskResponse>>(
            `${environment.claroIpTv.confirmBestOfferUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async getCustomOffers(getCustomOfferRequest: GetCustomOfferRequest) {
        console.log('Inicia busqueda: ', getCustomOfferRequest);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: getCustomOfferRequest
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<GetCustomOfferResponse>>(
            `${environment.claroIpTv.getCustomOffersUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async confirmCustomOffers(confirmCustomOfferRequest: ConfirmCustomOfferRequest) {
        console.log('Inicia busqueda: ', confirmCustomOfferRequest);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: confirmCustomOfferRequest
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<InitTaskResponse>>(
            `${environment.claroIpTv.confirmCustomOfferUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async getPaymentMethods(getPaymentMethodsRequest: GetPaymentMethodsRequest) {
        console.log('Inicia busqueda: ', getPaymentMethodsRequest);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: getPaymentMethodsRequest
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<GetPaymentMethodsResponse>>(
            `${environment.claroIpTv.getPaymentMethodsUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async confirmPaymentMethod(confirmPaymentMethodRequest: ConfirmPaymentMethodRequest) {
        console.log('Inicia busqueda: ', confirmPaymentMethodRequest);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: confirmPaymentMethodRequest
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<InitTaskResponse>>(
            `${environment.claroIpTv.confirmPaymentMethodUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async getDevicesToInstall(getDevicesToInstallRequest: GetDevicesToInstallRequest) {
        console.log('Inicia busqueda: ', getDevicesToInstallRequest);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: getDevicesToInstallRequest
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<GetDevicesToInstallResponse>>(
            `${environment.claroIpTv.getDevicesToInstallUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async confirmDevicesToInstall(confirmDevicesToInstallRequest: ConfirmDevicesToInstallRequest) {
        console.log('Inicia busqueda: ', confirmDevicesToInstallRequest);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: confirmDevicesToInstallRequest
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<InitTaskResponse>>(
            `${environment.claroIpTv.confirmDevicesToInstallUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            throw new Error(response.message);
        }
    }

    async getProcessInstanceByCorrelationKey(_customerId: string) {
        console.log('Inicia busqueda: ', _customerId);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: {
                correlationKey: environment.claroIpTv.bpmName
                    + environment.claroIpTv.correlationKeySeparator + _customerId
            }
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<GetProcessInstanceByCorrelationKey>>(
            `${environment.claroIpTv.getProcessInstanceByCorrelationKeyUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            return null;
        }
    }

    async getInstallationAddress(_processInstanceId: string) {
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: {processInstanceId: _processInstanceId}
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<GetInstallationAddressResponse>>(
            `${environment.claroIpTv.getInstallationAddressUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            return null;
        }
    }

    async confirmInstallationAdresses(_processInstanceId: string, _selectedAddressId: string) {
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: {processInstanceId: _processInstanceId, selectedAddressId: _selectedAddressId}
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<InitTaskResponse>>(
            `${environment.claroIpTv.confirmInstallationAdressesUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            return null;
        }
    }

    async getAvailableDates(_processInstanceId: string) {
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: {processInstanceId: _processInstanceId}
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<GetAvailableDatesResponse>>(
            `${environment.claroIpTv.getAvailableDatesUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            return null;
        }
    }

    async confirmAvailableDates(_processInstanceId: string, _selectedAddressId: AvailableDate) {
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: {processInstanceId: _processInstanceId, selectedDate: _selectedAddressId}
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<InitTaskResponse>>(
            `${environment.claroIpTv.confirmAvailableDatesUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            return null;
        }
    }

    async getNextStep(correlationKey: string) {
        const getNextStep = await this.getProcessInstanceByCorrelationKey(correlationKey);
        if (getNextStep) {
            const urlMaps = new Map([
                ['Select Best Offer', {route: '/iptvminoffer', order: 1, subpageName: 'Select Best Offer'}],
                ['Enter ClaroID data', {route: '/iptvregister', order: 2, subpageName: 'Enter ClaroID data'}],
                ['Select Best Offer', {route: '/iptvminoffer', order: 1, subpageName: 'Select Best Offer'}],
                ['Confirm Best Offer', {route: '/iptvminoffer', order: 2, subpageName: 'Select Best Offer'}],
                ['Select Payment Method', {route: '/iptvbestpay', order: 1, subpageName: 'Select Payment Method'}],
                ['Confirm Payment Method', {route: '/iptvbestpay', order: 2, subpageName: 'Confirm Payment Method'}],
                ['Select number of devices', {route: '/iptvdevice', order: 1, subpageName: 'Select number of devices'}],
                ['Confirm number of devices', {route: '/iptvdevice', order: 2, subpageName: 'Confirm number of devices'}],
                ['Select Installation Address', {route: '/iptvadrress', order: 1, subpageName: 'Select Installation Address'}],
                ['Confirm Installation Address', {route: '/iptvadrress', order: 2, subpageName: 'Confirm Installation Address'}],
                ['Select Installation Date', {route: '/iptvinsdate', order: 1, subpageName: 'Select Installation Date'}],
                ['Confirm Installation Date', {route: '/iptvinsdate', order: 2, subpageName: 'Confirm Installation Date'}],
                ['Select Custom Offer', {route: '/iptvalloffer', order: 1, subpageName: 'Select Custom Offer'}],
                ['Confirm Custom Offer', {route: '/iptvalloffer', order: 2, subpageName: 'Confirm Custom Offer'}],
                ['Confirm Product Order', {route: '/iptvsummary', order: 2, subpageName: 'Confirm Product Order'}],
            ]);
            console.log(`Obteniendo PID: ${getNextStep.processInstanceId}`);
            localStorage.setItem('processInstanceIdIpTv', getNextStep.processInstanceId);
            console.log(`Debe redireccionar a la pagina ${getNextStep.taskSummary[0].taskName}`);
            if (urlMaps.has(getNextStep.taskSummary[0].taskName)) {
                return urlMaps.get(getNextStep.taskSummary[0].taskName);
            } else {
                throw new Error('La siguiente ruta del ciclo de paginas no está parametrizada');
            }
        } else {
            return null;
        }
    }

    async getVariablesByProcessInstanceId(_processInstanceId: string) {
        console.log('Inicia busqueda: ', _processInstanceId);
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: {processInstanceId: _processInstanceId}
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<VariablesProcessInstance>>(
            `${environment.claroIpTv.getVariablesByProcessInstanceIdUrl}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            return null;
        }
    }

    async confirmProductOrder(_processInstanceId: string) {
        const _headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        const requestService: Request = {
            commonHeaderRequest: await this.generateCommonHeaderRequestBff(),
            body: {processInstanceId: _processInstanceId}
        };
        const bodyRequest = JSON.stringify(requestService);
        console.log('Prepara: ', bodyRequest);
        const response = await this.http.post<GenericResponse<InitTaskResponse>>(
            `${environment.claroIpTv.confirmProductOrder}`,
            bodyRequest, {headers: _headers}).toPromise();
        if (response.status !== 'ERROR') {
            return response.response;
        } else {
            return null;
        }
    }


    checkEmail(email: string) {
        // tslint:disable-next-line:max-line-length
        const regexp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
        return regexp.test(email);
    }

    async generateCommonHeaderRequestBff() {
        const channelInfo: ChannelInfo = {
            channelId: 'EDX',
            mediaDetailId: 'EDX Web',
            mediaId: 'EDX'
        };
        const consumerInfo: ConsumerInfo = {
            companyId: 'CLARO',
            consumerType: 'INTERNAL',
            consumerId: 'CAC',
            terminal: 'CAC'
        };

        const geolocationInfo: GeolocationInfo = {
            accuracy: '',
            location: {
                latitude: 0,
                longitude: 0
            }
        };

        const operationInfo: OperationInfoRequest = {
            externalTransactionDate: new Date().toDateString(),
            externalTransactionId: new Date().getDate().toString()
        };
        const commonHeaderRequest: CommonHeaderRequest = {
            channelInfo,
            consumerInfo,
            geolocationInfo,
            operationInfo
        };
        return commonHeaderRequest;
    }

    async checkNextPage(routeId: string) {
        const nextPage = await this.getNextStep(this.sessionUserIptv.customerId);
        if (nextPage) {
            console.log(`Sigue en la ruta: ${nextPage.route}`);
            if (nextPage.route === routeId) {
                return nextPage.order;
            } else {
                await this.router.navigate([`${nextPage.route}`]);
            }
        } else {
            return 1;
        }
    }

    /**
     * Inicia proceso de carga de pantallas EDX
     */
    async initIptvPage() {
        const registerRoute = '/iptvregister';
        this.sessionUserIptv = JSON.parse(localStorage.getItem('cliente'));
        localStorage.removeItem('processInstanceIdIpTv');
        let _page = await this.checkNextPage(registerRoute);
        if (_page === 1) {
            const instanciateProcessRequest: InstanciateProcessRequest = {
                identificationNumber: this.sessionUserIptv.personalInformation.identificationNumber,
                identificationType: this.sessionUserIptv.personalInformation.identificationType,
                firstName: this.sessionUserIptv.personalInformation.fullName,
                lastName: this.sessionUserIptv.personalInformation.familyNames,
                customerId: this.sessionUserIptv.customerId,
                serviceNumber: null,
                email: this.sessionUserIptv.contactInformation.email
            };
            await this.instantiateBusinessProcess(instanciateProcessRequest);
            _page = await this.checkNextPage(registerRoute);
        }
        if (_page === 2) {
            this.router.navigate([registerRoute]);
        }
    }

    async getSessionUserIPTV() {
        return this.sessionUserIptv;
    }
}

export interface IptvRoute {
    route: string;
    order: number;
    subPageName: '';
}

export interface CivilRegisterResponse {
  identificationNumber: string;
  birthday: string;
  placeOfBirth: string;
  sex: string;
  marriedStatus: string;
  nationality: string;
  idExpeditionDate: string;
  fullName: string;
}

export interface Request {
  commonHeaderRequest: CommonHeaderRequest;
  body: any;
}

export interface InstanciateProcessRequest {
    identificationNumber: string;
    identificationType: string;
    firstName: string;
    lastName: string;
    customerId: string;
    serviceNumber: string;
    email: string;
}

export interface CommonHeaderRequest {
  channelInfo: ChannelInfo;
  consumerInfo: ConsumerInfo;
  geolocationInfo: GeolocationInfo;
  operationInfo: OperationInfoRequest;
}

export interface ChannelInfo {
  channelId: string;
  mediaDetailId: string;
  mediaId: string;
}

export interface ConsumerInfo {
  companyId: string;
  consumerType: string;
  consumerId: string;
  terminal: string;
}

export interface GeolocationInfo {
  accuracy: string;
  location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface OperationInfoRequest {
  externalTransactionDate: string;
  externalTransactionId: string;
}

export interface BestOfferRequest {
    processInstanceId: string;
}

export interface OperationInfoResponse {
    transactionId: string;
    externalTransactionId: string;
    transactionDate: Date;
}

export interface CommonHeaderResponse {
    operationInfo: OperationInfoResponse;
}

export interface GenericResponse<T> {
    commonHeaderResponse: CommonHeaderResponse;
    code: string;
    status: string;
    message: string;
    response: T;
}

export interface Alias {
    name: string;
    identifier: string;
}

export interface Product {
    productId: string;
    description: string;
    shortName: string;
    expiryTime: string;
    expiryTimeUnit: string;
}

export interface Offer {
    offerSup: string;
    offerCode: string;
    offerName: string;
    offerType: string;
    offerDescription: string;
    productType: string;
    startDate: string;
    endDate: string;
    priceTax: string;
    priceDiscount: string;
    priceUnit: string;
    priceBeforeTax: string;
    priceTotal: string;
    aditionalDescription: string;
    featuresDescription: string;
    alias: Alias[];
    products: Product[];
}

export interface NextTaskInfo {
    taskId: string;
    taskName: string;
    taskSubject: string;
    taskDescription: string;
    taskStatus: string;
    taskPriority: number;
    taskIsSkipable: boolean;
    taskCreatedOn: string;
    taskActivationTime: string;
    taskProcInstId: string;
    taskProcDefId: string;
    taskContainerId: string;
    taskParentId: number;
}

export interface BestOfferResponse extends InitTaskResponse {
    bestOffer: Offer;
}

export interface InstanciateBusinessProcessResponse extends InitTaskResponse {
    claroIdProfile: Profile;
}

export interface InitTaskResponse {
    processInstanceId: string;
    nextTaskInfo: NextTaskInfo;
}

export interface DataClaroId {
    identificationType: string;
    identificationId: string;
    firstName: string;
    lastName: string;
    country: string;
    serviceNumber: string;
    addressState: string;
    addressCity: string;
    addressType: string;
    addressStreet1: string;
    addressStreet2: string;
    birthDate: string;
    claroID: string;
    contactMediumEnable: boolean;
    contactMediumType: string;
    contactMediumValue: string;
}

export interface ClaroIdDataRequest {
    processInstanceId: string;
    data: DataClaroId;
    nationality: string;
}

export interface Address {
    state: string;
    city: string;
    type: string;
    street1: string;
    street2: string;
}

export interface ContactMedium {
    enable: boolean;
    type: string;
    value: string;
}

export interface Profile {
    profileId: string;
    identificationType: string;
    identificationId: string;
    firstName: string;
    lastName: string;
    country: string;
    address: Address[];
    birthDate: string;
    claroID: string;
    serviceNumber: string;
    subscriberId: string;
    contactMedium: ContactMedium[];
}

export interface ConfirmBestOfferRequest {
    processInstanceId: string;
    acceptBestOffer: boolean;
}

export interface GetCustomOfferRequest {
    processInstanceId: string;
}

export interface GetCustomOfferResponse extends InitTaskResponse {
    customOffers: Offer[];
}

export interface ConfirmCustomOfferRequest {
    processInstanceId: string;
    customOfferCode: string;
}

export interface GetPaymentMethodsRequest {
    processInstanceId: string;
}

export interface GetPaymentMethodsResponse extends InitTaskResponse {
    paymentMethods: IPTVPaymentMethods[];
}

export interface ConfirmPaymentMethodRequest {
    processInstanceId: string;
    subscriptionId: string;
}

export interface IPTVPaymentMethods {
    subscriptionType: string;
    subscriptionId: string;
    subscriptionCode: string;
    subscriptionDate: string;
    address: string;
    paymentMethodId: string;
    paymentMethodType: string;
    offer: string;
    contractId: string;
}

export interface GetDevicesToInstallRequest {
    processInstanceId: string;
}
export interface GetDevicesToInstallResponse extends InitTaskResponse {
    devicesToInstall: Product[];
}
export interface ConfirmDevicesToInstallRequest {
    processInstanceId: string;
    numberOfDecoders: number;
}

export interface PersonalInformation {
    identificationType: string;
    identificationNumber: string;
    fullName: string;
    givenNames: string;
    familyNames: string;
    birthday: string;
    nationality?: any;
    gender: string;
}

export interface ContactInformation {
    email: string;
    province: string;
    district: string;
    parish: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    zipCode: string;
}

export interface User {
    id: string;
    fullName: string;
}

export interface Properties {
    subproductId: string;
    subproductDescription: string;
    imsi: string;
    imei: string;
    brand: string;
    model?: any;
    iccid: string;
    cutDate?: any;
    contractId?: any;
    crm?: any;
}

export interface SubscriptionInformation {
    serviceNumber: string;
    subscriptionId: string;
    paymentType: string;
    paymentDescription: string;
    status: string;
    activeDate: Date;
    properties: Properties;
}

export interface ValidFor {
    endDateTime?: any;
    startDateTime: Date;
}

export interface PaymentMethod {
    id: string;
    accounts?: any;
    name: string;
    description: string;
    validFor: ValidFor;
    preferred: boolean;
    type: string;
    status: string;
    statusDate: Date;
    details?: any;

    paymentMethodId: string;
    paymentMethodType: string;
    amount: string;
    currency: string;

}

export interface Subscription {
    user: User;
    subscriptionInformation: SubscriptionInformation;
    paymentMethods: PaymentMethod[];
    lastInvoiceInformation?: any;
}

export interface SessionUserIptv {
    customerId: string;
    personalInformation: PersonalInformation;
    contactInformation: ContactInformation;
    subscriptions: Subscription[];
}

export interface TaskSummary {
    taskId: string;
    taskName: string;
    taskSubject: string;
    taskDescription: string;
    taskStatus: string;
    taskPriority: number;
    taskCreatedOn: string;
    taskActivationTime: string;
    taskProcInstId: string;
    taskProcDefId: string;
    taskContainerId: string;
}

export interface GetProcessInstanceByCorrelationKey {
    processInstanceId: string;
    processId: string;
    processName: string;
    processVersion: string;
    processInstanceState: string;
    containerId: string;
    initiator: string;
    startDate: string;
    processInstanceDescription: string;
    correlationKey: string;
    parentInstanceId: string;
    taskSummary: TaskSummary[];
}

export interface VariablesProcessInstance {
    selectedPaymentMethod: any;
    addressSelected: any;
    claroIdProfile: Profile;
    bestOffer: Offer;
    customOffers: Offer[];
    paymentMethods: SubscriptionVariable[];
    devicesToInstall: Product[];
    customerId: string;
    identificationNumber: string;
    identificationType: string;
    email: string;
    iptvPaymentMethods: IPTVPaymentMethods[];
    selectedOffer: Offer;
    cities: City[];
    availableDates: AvailableDate[];
    numberOfDecoders: string;
    firstName: string;
    lastName: string;
    nationality: string;
}

export interface InstallationAddress {
    id: string;
    address: string;
}

export interface PaymentMethodVariable {
    paymentMethodId: string;
    paymentMethodType: string;
    amount: string;
    currency: string;
}

export interface Characteristic {
    name: string;
    value: string;
}

export interface SubscriptionVariable {
    subscriptionId: string;
    subscriptionCode: string;
    subscriptionType: string;
    status: string;
    statusReason: string;
    subscriptionDate: string;
    installationAddress: InstallationAddress;
    paymentMethod: PaymentMethodVariable;
    characteristics: Characteristic[];
}


export interface AddressIptv {
    standardAddressId: string;
    fullAddress: string;
    country: string;
    countryDescription: string;
    province: string;
    provinceDescription: string;
    city: string;
    cityDescription: string;
    parish: string;
    parishDescription: string;
    sector: string;
    sectorDescription: string;
    addressType: string;
    addressTypeDescription: string;
    latitude: string;
    longitude: string;
}

export interface City {
    cityId: string;
    cityDescription: string;
    addresses: AddressIptv[];
}

export interface GetInstallationAddressResponse extends InitTaskResponse {
    cities: City[];
}

export interface AvailableDate {
    date: string;
    shift: string;
    timeRange: string;
    // usado para frontend
    dtoDate?: Date;
}

export interface GetAvailableDatesResponse extends InitTaskResponse {
    availableDates: AvailableDate[];
}
