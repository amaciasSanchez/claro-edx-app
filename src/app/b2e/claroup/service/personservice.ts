import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable()
export class PersonService {
    constructor(private http: HttpClient) { }

    getServiceNumber(data) {
        console.debug("data", data);

        const params = new HttpParams().set(
            "identificationNumber",
            data.numbercli
        );
        console.debug("params", params);
        return this.http.get(`${ environment.b2e.b2eURL}/get360View`, {
            params
        });
    }

    getTopics() {
        return this.http.get(`${ environment.b2e.b2eURL}/getTopics`);
    }

    getBestOffers(searchOffer) {
        const params = new HttpParams()
            .set("identificationNumber", searchOffer.identificationNumber)
            .set("identificationType", searchOffer.identificationType)
            .set("topicId", searchOffer.topicId);
        console.debug("params", params);

        return this.http.get<any>(`${ environment.b2e.b2eURL}/getBestOffers`, {
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
            `${ environment.b2e.b2eURL}/getBestOffersByServiceNumbers`,
            body,
            { headers: myHeaders }
        );
    }

    getAllOffersByTopic(data) {
        const params = new HttpParams().set("topicId", data.topicId);

        return this.http.get<any>(`${ environment.b2e.b2eURL}/getAllOffersByTopic`, {
            params
        });
    }

    activateOffer(data) {
        let myHeaders: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json"
        });
        let body = JSON.stringify(data);
        return this.http.post<any>(`${ environment.b2e.b2eURL}/activateOffer`, body, {
            headers: myHeaders
        });
    }

    getOrders(data: any) {
        const params = new HttpParams()
            .set("identificationNumber", data.identificationNumber)
            .set("identificationType", data.identificationType);

        return this.http.get<any>(`${ environment.b2e.b2eURL}/getOrders`, {
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
            `${ environment.b2e.b2eURL}/login`,
            { headers: myHeaders }
        );
    }
}
