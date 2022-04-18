import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { retry, catchError, delay } from 'rxjs/operators';
import { Message } from '../models';
import { Observable, throwError, of } from 'rxjs';

@Injectable()
export class DialogflowService {

    //private baseURL: string = "https://api.dialogflow.com/v1/query?v=20150910";
    private baseURL: string = "http://10.31.32.28:8988/chatbot/v1/chat/message?format=html";
    private token: string = environment.claroVideo.token;

    constructor(private http: HttpClient) {
    }

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        })
    }

    getResponseService(body: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json, */*',
                'Content-Type': 'text/plain' // We send JSON
            }),
            responseType: 'text' as 'json'  // We accept plain text as response.
          };
          return this.http.post<string>("http://10.31.32.28:8988/chatbot/v1/chat/message?format=html", body, httpOptions)
            .pipe(delay(3000));

        /*let myHeader = new HttpHeaders({"Content-Type": "text/plain"});
        let data = JSON.stringify(body);
        let url = environment.serviceURL.concat("message")

        return this.http.post<any>(url, data, {headers: myHeader, responseType : 'text'});*/
    }

    getResponse(query: string): Observable<string> {
        let data = {
            query: query,
            lang: 'en',
            sessionId: '12345'
        }

        return this.http.post<string>(`${this.baseURL}`, JSON.stringify(data), this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.errorHandl)
            )
    }

    public getResponseDummy(query: string): Observable<string> {
        let data = {
            query: query,
            lang: 'en',
            sessionId: '12345'
        }
        return of("No puede procesar mensaje")
            .pipe(delay(1000));
    }

    // Error handling
    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.debug(errorMessage);
        return throwError(errorMessage);
    }


}
