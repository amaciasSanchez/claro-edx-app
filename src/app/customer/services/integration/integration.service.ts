import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(private http: HttpClient) { }

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

  getClaroIdProfile(_serviceNumber: string) {
    const params = new HttpParams().set(
        "serviceNumber", _serviceNumber
    );
    return this.http.get(`${environment.claroOtt.profiles}`, {
        params
    }).toPromise();
}
}
