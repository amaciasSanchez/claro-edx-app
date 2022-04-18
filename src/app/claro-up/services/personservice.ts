import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map, filter } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ClaroUpPersonService {
    constructor(private http: HttpClient) { }

    getServiceNumber(data) {
        const params = new HttpParams().set(
            "identificationNumber",
            data.numbercli
        );
        return this.http.get(`${environment.claroUp.url}/get360View`, {
            params
        }).toPromise();
    }

    getTopics() {
        return this.http.get(`${environment.claroUp.url}/getTopics`);
    }

    getBestOffers(searchOffer) {
        const params = new HttpParams()
            .set("identificationNumber", searchOffer.identificationNumber)
            .set("identificationType", searchOffer.identificationType)
            .set("topicId", searchOffer.topicId);
        console.debug("params", params);

        return this.http.get<any>(`${environment.claroUp.url}/getBestOffers`, {
            params
        });
    }

    getBestOffersByServiceNumbers(data) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json" //,
            //'Cache-Control': 'no-cache'
        });
        let body = JSON.stringify(data);
        return this.http.post<any>(
            `${environment.claroUp.url}/getBestOffersByServiceNumbers`,
            body,
            { headers: myHeaders }
        );
    }

    getAllOffersByTopic(data, equipo) {

        const params = new HttpParams().set("topicId", data.topicId);
        let equipos = equipo.orders.filter((x) => {
            return x.orderDetails.length > 0;
        })
        console.debug(equipos);

        return this.http.get<any>(`${environment.claroUp.url}/getAllOffersByTopic`, {
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
        return this.http.post<any>(`${environment.claroUp.url}/activateOffer`, body, {
            headers: myHeaders
        });
    }

    activateOfferLote(data) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let body = JSON.stringify(data);//Lote
        return this.http.post<any>(`${environment.claroUp.url}/activateOfferLote`, body, {
            headers: myHeaders
        });
    }

    getOrders(data: any) {
        const params = new HttpParams()
            .set("identificationNumber", data.identificationNumber)
            .set("identificationType", data.identificationType);
        return this.http.get<any>(`${environment.claroUp.url}/getOrders`, {
            params
        });
    }

	getEquiposByCustomerId(data: any) {
        const params = new HttpParams()
            .set("customerId", data.customerId);
        return this.http.get<any>(`${environment.claroUp.url}/getEquiposByCustomerId`, {
            params
        });
    }

    getEquipos(data: any) {
        const params = new HttpParams()
            .set("identificationNumber", data.identificationNumber)
            .set("identificationType", data.identificationType);
        return this.http.get<any>(`${environment.claroUp.url}/getEquipos`, {
            params
        });
    }

    login(data: any) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Accept": "application/json",
            "usuario": data.usuario,
            "password": data.password
        });
        return this.http.get<any>(
            `${environment.claroUp.url}/login`,
            { headers: myHeaders }
        );
    }

    getsubscriptions(data : any) {
        const params = new HttpParams()
            .set("identificationNumber", data.identificationNumber)
            .set("identificationType", data.identificationType);
        return this.http.get<any>(`${environment.claroVideo.url}/get360ViewCV/subscription`, {
            params
        });
    }

    getConsumptions(customerId: any, employeeId: any, fromDate: any, toDate: any, transactionId: any) {
        const params = new HttpParams()
            .set("customerId", customerId)
            .set("employeeId", employeeId)
            .set("startDate", fromDate)
            .set("endDate", toDate);
        let headers: HttpHeaders = new HttpHeaders({
            "transactionId": transactionId
        });
        return this.http.get<any>(`${environment.claroVideo.url}/getConsumptionsByClient`, {
            params, headers
        });
    }

    getConsumptionsByServiceNumber(serviceNumber: any, employeeId: any, fromDate: any, toDate: any, transactionId: any) {
        const params = new HttpParams()
            .set("serviceNumber", serviceNumber)
            .set("employeeId", employeeId)
            .set("startDate", fromDate)
            .set("endDate", toDate);
        let headers: HttpHeaders = new HttpHeaders({
            "transactionId": transactionId
        });
        return this.http.get<any>(`${environment.claroVideo.url}/getConsumptionsByClient`, {
            params, headers
        });
    }

    getOrdenes(data: any) {
        const params = new HttpParams()
            .set("identificationNumber", data.identificationNumber)
            .set("identificationType", data.identificationType);
        return this.http.get<any>(`${environment.claroVideo.url}/getOrdenes`, {
            params
        });
    }

    getOffersBySubscription(serviceNumber: any, email: any, identificationType: any, identificationNumber: any) {
        const params = new HttpParams()
            .set("serviceNumber", serviceNumber)
            .set("email", email)
            .set("identificationType",identificationType)
            .set("identificationNumber", identificationNumber);
        return this.http.get<any>(`${environment.claroVideo.url}/getOffersBySubscription`, {
            params
        });
    }

    inactivateClaroUpOffers(serviceNumber: any, offers: []) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let body = {
            'serviceNumber':serviceNumber,
            'offers': offers
        };
        console.log('Este es el body a enviar para inactivar: ', body);
        return this.http.post<any>(
            `${environment.claroUp.url}/inactivateOffers`,
            body,
            { headers: myHeaders }
        );
    }

    inactivateClaroBoxTvOffer(inactivateRequest: any) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        const options = {
            headers: myHeaders,
            body: inactivateRequest
        };
        console.log('Este es el body a enviar para inactivar oferta ott: ', inactivateRequest);
        return this.http.delete<any>(
            `${environment.claroOtt.offers}`,
            options
        );
    }

    inactivateClaroVideoOffers(inactivationType: any, serviceNumber: any, customerId: any, account: any, offers: any[]) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let bodyRequest : any = {
            "inactivationType": inactivationType,
            "serviceNumber": serviceNumber,
            "customerIdAmco": customerId,
            "account": account,
            "offers": offers
        };
        console.log('Este es el body a enviar para inactivar claro-video: ', bodyRequest);
        return this.http.post<any>(
            `${environment.claroVideo.url}/inactivateOffers`,
            bodyRequest,
            { headers: myHeaders }
        );
    }

    unlinkDevice(bodyRequest: any, transactionId: string) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "transactionId": transactionId
        });
        console.log('Este es el body a enviar para desvincular dispositivos: ', bodyRequest);
        return this.http.post<any>(
            `${environment.claroVideo.url}/unlinkDevice`,
            bodyRequest,
            { headers: myHeaders }
        );
    }
    inactivatePermin(offer: any, serviceNumber: any, userName:any) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let bodyRequest: any = {
            "offerCode": offer.offerCode,
            "serviceNumber": serviceNumber,
            "userName": userName,
            "offerName": offer.offerName,
            "offeringInstanceId": "",
            "reason":offer.reason,
            "observation": offer.observation
        };

        if(offer.invoiceNumber !== ""){
          bodyRequest.invoiceNumber =  offer.invoiceNumber;
        }

        console.log('Este es el body a enviar para inactivar permin: ', bodyRequest);
        return this.http.post<any>(
            `${environment.claroVideo.url}/inactivatePermin`,
            bodyRequest,
            { headers: myHeaders }
        );
    }

    generatePickTicketPermin(offer: any, serviceNumber: any, userName:any) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let bodyRequest: any = {
            "serviceNumber": serviceNumber,
            "userName": userName,
            "source": "EDX",
            "offers": offer
        };

        console.log('Este es el body a enviar para generar pick ticket: ', bodyRequest);
        return this.http.post<any>(
            `${environment.claroVideo.url}/generatePickTicketPermin`,
            bodyRequest,
            { headers: myHeaders }
        );
    }

    getReasonInactive() {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        console.log('Obtencion de razones de inactivacion');
        return this.http.get<any>(
            `${environment.claroVideo.url}/reasonInactive`,
            { headers: myHeaders }
        );
    }

    confirmPickTicket(idPickTicket: any) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let bodyRequest: any = {
            "idPickTicket": idPickTicket
        };
        console.log('Este es el body a enviar para guardar pick ticket: ', bodyRequest);
        return this.http.post<any>(
            `${environment.claroVideo.url}/savePickTicket`,
            bodyRequest,
            { headers: myHeaders }
        );
    }

    getOrdersByClient(identificationType: any, identificationNumber: any
        , startDate: any, endDate: any) {
        const params = new HttpParams()
            .set("identificationNumber", identificationNumber)
            .set("identificationType", identificationType)
            .set("startDate", startDate)
            .set("endDate", endDate);
        console.log("Parametros a enviar para consulta de ordenes: ", params);
        return this.http.get<any>(`${environment.claroVideo.url}/getOrdersByClient`, {
            params
        });
    }

    getDevices(identificationType: any, identificationNumber: any, fromDate: any, toDate: any, customerId?: any) {
        const params = new HttpParams()
            .set("identificationType", identificationType)
            .set("identificationNumber", identificationNumber)
            .set("startDate", fromDate)
            .set("endDate", toDate)
            .set("customerId", customerId);
        return this.http.get<any>(`${environment.claroVideo.url}/getDevicesByClient`, {
            params
        });
    }

    validateCustomerInformation(data : any) {
        const params = new HttpParams()
            .set("serviceNumber", data.serviceNumber)
            .set("identificationNumber", data.identificationNumber)
            .set("identificationType", data.identificationType);
        return this.http.get<any>(`${environment.claroVideo.url}/validateCustomerInformation`, {
            params
        });
    }

    /**
     * METODO QUE ENCAPSUL LA CONUSLTA DEL TRACKIN POR DISPOSITIVO
     * 
     * @author fobregon
     * @param deviceId 
     * @param startDate 
     * @param endDate 
     * @returns 
     */
    getTrackingByDevice(serviceNumber: any, startDate: any, endDate: any){
        const params = new HttpParams()
        .set("serviceId",serviceNumber)
        .set("startDate",startDate)
        .set("endDate",endDate);
        return this.http.get<any>(`${environment.claroVideo.url}/getTrackingByDevice`, {
            params
        });
    }
}
