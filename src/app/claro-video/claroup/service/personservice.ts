import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, filter } from 'rxjs/operators';
@Injectable()
export class PersonService {
    constructor(private http: HttpClient) { }

    getServiceNumber(data) {
        const params = new HttpParams().set(
            "identificationNumber",
            data.numbercli
        );
        return this.http.get(`${environment.claroVideo.url}/get360ViewCV`, {
            params
        }).toPromise();
    }

    getSubscriptions(data: { identificationType: string; identificationNumber: string }) {
        const params = new HttpParams()
            .set('identificationType', data.identificationType)
            .set('identificationNumber', data.identificationNumber);
        return this.http.get(`${environment.claroVideo.url}/getSubscriptions`, {
            params
        }).toPromise();
    }

    getCustomerInformation(data) {
        const params = new HttpParams().set(
            "identificationNumber",
            data.numbercli
        );
        return this.http.get(`${environment.claroUp.url}/getCustomerInformation`, {
            params
        }).toPromise();
    }

    getTopics() {
        return this.http.get(`${environment.claroVideo.url}/getTopicsCV`);
    }

    getBestOffersCV(searchOffer) {
        const params = new HttpParams()
            .set("identificationNumber", searchOffer.identificationNumber)
            .set("identificationType", searchOffer.identificationType)
            .set("topicId", searchOffer.topicId);
        console.debug("params", params);

        return this.http.get<any>(`${environment.claroVideo.url}/getBestOffersCV`, {
            params
        });
    }

    getProfileBySubscriberId(subscriberId) {
        // const params }h          cx}n hi
        let myHeaders: HttpHeaders = new HttpHeaders({
            "subscriberId": subscriberId

        });
        return this.http.get<any>(
            `${environment.claroVideo.url}/getProfileBySubscriberId`,
            { headers: myHeaders }
        );
    }

    validateMail(data) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "processInstanceId": data.processInstanceId.toString(),
            "email": data.email
        });
        let body = {}; //JSON.stringify(data);
        return this.http.post<any>(
            `${environment.claroVideo.url}/initTaskBundleValidateEmail`,
            body,
            { headers: myHeaders }
        );
    }

    finishTaskStandaloneCreateClaroIdAccount(processInstanceId){
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "processInstanceId": processInstanceId.toString(),
        });
        let body = {}; //JSON.stringify(data);
        return this.http.post<any>(
            `${environment.claroVideo.url}/finishTaskStandaloneCreateClaroIdAccount`,
            body,
            { headers: myHeaders }
        );
    }


    validateMailStandAlone(data) {

        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "processInstanceId": data.processInstanceId.toString(),
            "email": data.email
        });
        let body = {}; //JSON.stringify(data);
        return this.http.post<any>(
            `${environment.claroVideo.url}/initTaskStandaloneValidateEmail`,
            body,
            { headers: myHeaders }
        );
    }

    initTaskBundleCreateClaroIdAccount(data, processInstanceId) {
        const params = new HttpParams().set("topicId", data.topicId);



        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "processInstanceId": processInstanceId.toString(),
        });
        let body = JSON.stringify(data);
        return this.http.post<any>(
            `${environment.claroVideo.url}/initTaskBundleCreateClaroIdAccount`,
            body,
            { headers: myHeaders }
        );
    }


    getCurrentStepOfInstance(processInstanceId) {
        console.log('Recibiendo processInstanceId: ', processInstanceId);
        let myHeaders: HttpHeaders = new HttpHeaders({
            "processInstanceId": processInstanceId.toString()
        });
        console.log("Header a enviar: ", myHeaders);
        return this.http.get<any>(
            `${environment.claroVideo.url}/getCurrentStepOfInstance`,
            { headers: myHeaders }
        );
    }

    initTaskStandaloneCreateClaroIdAccount(data, processInstanceId) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "processInstanceId": processInstanceId.toString(),
        });
        let body = JSON.stringify(data);
        return this.http.post<any>(
            `${environment.claroVideo.url}/initTaskStandaloneCreateClaroIdAccount`,
            body,
            { headers: myHeaders }
        );
    }

    initTaskBundleActivateService(processInstanceId) {



        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "processInstanceId": processInstanceId.toString(),
        });
        let body = {};
        return this.http.post<any>(
            `${environment.claroVideo.url}/initTaskBundleActivateService`,
            body,
            { headers: myHeaders }
        );
    }

    initNewProcessJbpmStandalone(data) {



        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json;charset=UTF-8",
        });
        let body = JSON.stringify(data);
        console.log(body);
        return this.http.post<any>(
            `${environment.claroVideo.url}/initNewProcessJbpmStandalone`,
            body,
            { headers: myHeaders }
        );
    }

    initTaskStandaloneActivateService(processInstanceId) {



        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "processInstanceId": processInstanceId.toString(),
        });
        let body = {};
        return this.http.post<any>(
            `${environment.claroVideo.url}/initTaskStandaloneActivateService`,
            body,
            { headers: myHeaders }
        );
    }

    getBestOffersByServiceNumbers(data) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json" //,
            //'Cache-Control': 'no-cache'
        });
        let body = JSON.stringify(data);
        return this.http.post<any>(
            `${environment.claroVideo.url}/getBestOffersByServiceNumbers`,
            body,
            { headers: myHeaders }
        );
    }

    getAllOffersByTopicCV(data) {

        const params = new HttpParams().set("topicId", data.topicId).set("identificationNumber", data.identificationNumber).set("identificationType", data.identificationType);


        return this.http.get<any>(`${environment.claroVideo.url}/getAllOffersByTopicCV`, {
            params
        });
    }

    getAllProcessByTypes(identificationNumber, customerId, processName) {

        const params = new HttpParams().set("identificationNumber", identificationNumber).set("processName", processName).set("customerId", customerId);


        return this.http.get<any>(`${environment.claroVideo.url}/getInstancesProcessByCorrelationKey`, {
            params
        });
    }

    getAllOffersByTopic(data, equipo) {

        const params = new HttpParams().set("topicId", data.topicId);
        let equipos = equipo.orders.filter((x) => {
            return x.orderDetails.length > 0;
        })
        console.debug(equipos);

        return this.http.get<any>(`${environment.claroVideo.url}/getAllOffersByTopicV`, {
            params
        }).pipe(map(data => {
            console.debug(data); let ofertas = []
            equipos.forEach((element) => {

                element.orderDetails.forEach((details, index) => {
                    data.forEach(element => {
                        element.elegido = false;
                        // element.indice = index;
                        // ofertas.push(element)
                    });
                    // details.ofertas = ofertas
                    // details.indice= index;
                });

            });

            let ordenes = [];
            for (const key in equipos) {
                for (let item in equipos[key].orderDetails) {
                    // equipos[key].orderDetails[item].ofertas = data
                    ordenes.push(equipos[key].orderDetails[item]);
                }
            }
            let arrayFinal = []
            try {

                ordenes.forEach((ofert, index1) => {
                    ofert.indice = index1;
                    data.forEach((oferta) => {
                        oferta.indice = index1;
                        let oof = Object.assign({}, oferta);
                        ofertas.push(oof);
                    });
                    let offter = Object.assign([], ofertas);
                    console.debug("offter", offter);

                    ofert.ofertas = offter
                    let jsonOfert = Object.assign({}, ofert);
                    arrayFinal.push(jsonOfert)
                    ofertas = []

                });
            } catch (error) {
                console.debug("error", error);

            }


            equipos = arrayFinal;
            console.debug("equipos", equipos);
            return equipos
        }))
    }

    activateOffer(data) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let body = JSON.stringify(data);
        return this.http.post<any>(`${environment.claroVideo.url}/activateOffer`, body, {
            headers: myHeaders
        });
    }
    activateOfferLote(data) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let body = JSON.stringify(data);//Lote
        return this.http.post<any>(`${environment.claroVideo.url}/activateOfferLote`, body, {
            headers: myHeaders
        });
    }
    getOrders(data: any) {
        const params = new HttpParams()
            .set("identificationNumber", data.identificationNumber)
            .set("identificationType", data.identificationType);

        return this.http.get<any>(`${environment.claroVideo.url}/getOrders`, {
            params
        });
    }


    getEquipos(data: any) {
        const params = new HttpParams()
            .set("identificationNumber", data.identificationNumber)
            .set("identificationType", data.identificationType);

        return this.http.get<any>(`${environment.claroVideo.url}/getEquipos`, {
            params
        });
    }

    getMessageContent(contentId: any) {
        return this.http.get<any>(`${environment.claroVideo.url}/retrieveMessageContent/${contentId}`);
    }

    login(data: any) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Accept": "application/json",
            "usuario": data.usuario,
            "password": data.password

        });
        return this.http.get<any>(
            `${environment.claroVideo.url}/login`,
            { headers: myHeaders }
        );
    }

    getCurrentDebtDetails(data) {
        let myHeaders: HttpHeaders = new HttpHeaders()
        .set('Accept', "application/json")
        .set('Authorization', `Bearer ${sessionStorage.getItem('app_access_token')}`)
        
        const params = new HttpParams()
            .set("id", data.id)
            .set("type", data.type)
            .set("serviceNumber", data.serviceNumber)
            .set("loadType", data.loadType);
        let URL = `${environment.billing.url}/getCurrentDebtDetails`;
        console.log("====================== INVOKE  getCurrentDebts =========");
        console.dir(params);
        return this.http.get<any>(URL, { params:params ,headers:myHeaders});
    }

    getInvoiceByDates(data) {
        let myHeaders: HttpHeaders = new HttpHeaders()
        .set('Accept', "application/json")
        .set('Authorization', `Bearer ${sessionStorage.getItem('app_access_token')}`)

        const params = new HttpParams()
            .set("startDate", data.startDate)
            .set("endDate", data.endDate)
            .set("accountId", data.accountId)
            .set("accountCode", data.accountCode);

        let URL = `${environment.billing.url}/getInvoiceByDates`;
        console.log(
            "======================  INVOKE getAccountInvoiceByDates ========="
        );
        console.dir(params);
        return this.http.get<any>(URL,{ params:params ,headers:myHeaders});
    }

    getAccountBalance(data) {
        let myHeaders: HttpHeaders = new HttpHeaders()
        .set('Accept', "application/json")
        .set('Authorization', `Bearer ${sessionStorage.getItem('app_access_token')}`)
        const params = new HttpParams()
            .set("startDate", data.startDate)
            .set("endDate", data.endDate)
            .set("accountId", data.accountId)
            .set("accountCode", data.accountCode)
            .set("total", data.total);

        let URL = `${environment.billing.url}/getAccountInvoiceByDates`;
        console.log("================= INVOKE getAccountBalance =========");
        console.dir(params);
        return this.http.get<any>(URL, { params:params ,headers:myHeaders});
    }

    getCurrentDebtsPaymentInvoice(data) {
        let myHeaders: HttpHeaders = new HttpHeaders()
        .set('Accept', "application/json")
        .set('Authorization', `Bearer ${sessionStorage.getItem('app_access_token')}`)

        const params = new HttpParams()
            .set("invoiceNo", data.invoiceNo)
            .set("accountCode", data.accountCode)
            .set("startDate", data.startDate)
            .set("endDate", data.endDate);
        var url = `${environment.billing.url}/getPaymentInvoice`;

        console.log(
            "======================  INVOKE getCurrentDebtsPaymentInvoice ========="
        );
        console.dir(params);

        return this.http
            .get<any>(url,{ params:params ,headers:myHeaders})
            .toPromise();
    }

    getCurrentDebtsPaymentsArrangement(data) {
        let myHeaders: HttpHeaders = new HttpHeaders()
        .set('Accept', "application/json")
        .set('Authorization', `Bearer ${sessionStorage.getItem('app_access_token')}`)
        const params = new HttpParams()
            .set("accountId", data.accountId)
            //.set("invoiceNo", data.invoiceNo);
        var url = `${environment.billing.url}/getPaymentArrangement`;

        console.log(
            "======================  INVOKE getCurrentDebtsPaymentsArrangement ========="
        );
        console.dir(params);

        return this.http
            .get<any>(url, { params:params ,headers:myHeaders})
            .toPromise();
    }
}
