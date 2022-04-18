import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OttOffers } from '../modelos/OttOffers';
import { PaymentMethod } from 'src/app/customer/modelo/paymentMethod.model';
export interface InconsistentDataFlags {
  nacionality: boolean,
  identification: boolean,
  firstName: boolean,
  lastName: boolean,
  birthday: boolean
}
export interface Profile {
  id?: string;
  initMessage?: string;
  nacionalidad?: string;
  identificacion?: string;
  tipoIdentificacion?: string;
  nombres?: string;
  apellidos?: string;
  fechaNacimiento?: string;
  telefono?: string;
  mail?: string;
  exist?: boolean;
  inconsistentDataFlags?: InconsistentDataFlags; 
};
@Injectable({
  providedIn: 'root'
})
export class OttServiceService {

  constructor(private http: HttpClient) { }

  private TOKEN: string = "TOKEN_OTT";
  private OTT_PAYMENT_METHOD: string = "OTT_PAYMENT_METHOD";
  private OTT_OFFER: string = "OTT_OFFER";
  private OTT_PREVIOUS_OFFER: string = "OTT_PREVIOUS_OFFER"
  private OTT_AVAILABLE_OFFERS: string = "OTT_AVAILABLE_OFFERS";
  private OTT_PROFILE: string = "OTT_PROFILE";

  initOttService(): void {
    localStorage.setItem(this.OTT_OFFER, null);
    localStorage.setItem(this.OTT_PREVIOUS_OFFER, null);
    localStorage.setItem(this.OTT_PAYMENT_METHOD, null);
    localStorage.setItem(this.OTT_PROFILE, null);
  }
  
  public getOfferOtt(): OttOffers {
    return <OttOffers> JSON.parse(localStorage.getItem(this.OTT_OFFER));
  }
  public setOfferOtt(_offer: OttOffers): void {
    localStorage.setItem(this.OTT_OFFER, JSON.stringify(_offer));
  }
  public clearOfferOtt(): void {
    localStorage.removeItem(this.OTT_OFFER);
  }

  public getPreviousOfferOtt(): OttOffers {
    return <OttOffers> JSON.parse(localStorage.getItem(this.OTT_PREVIOUS_OFFER));
  }
  public setPreviousOfferOtt(_offer: OttOffers): void {
    localStorage.setItem(this.OTT_PREVIOUS_OFFER, JSON.stringify(_offer));
  }
  public clearPreviousOfferOtt(): void {
    localStorage.removeItem(this.OTT_PREVIOUS_OFFER);
  }

  public getAvailableOffersOtt(): OttOffers[] {
    return <OttOffers[]> JSON.parse(localStorage.getItem(this.OTT_AVAILABLE_OFFERS));
  }
  public setAvailableOffersOtt(_offers: OttOffers[]): void  {
    localStorage.setItem(this.OTT_AVAILABLE_OFFERS, JSON.stringify(_offers));
  }
  public clearAvailableOffersOtt(): void  {
    localStorage.removeItem(this.OTT_AVAILABLE_OFFERS);
  }

  public getOttPaymentMethod(): PaymentMethod {
    return <PaymentMethod> JSON.parse(localStorage.getItem(this.OTT_PAYMENT_METHOD));
  }
  public setOttPaymentMethod(_payment: PaymentMethod): void {
    localStorage.setItem(this.OTT_PAYMENT_METHOD, JSON.stringify(_payment))
  }
  public clearOttPaymentMethod(): void {
    localStorage.removeItem(this.OTT_PAYMENT_METHOD) 
  }

  public getProfile(): Profile {
    if(localStorage.getItem(this.OTT_PROFILE) != "undefined")
      return <Profile> JSON.parse(localStorage.getItem(this.OTT_PROFILE));
    else
      return null;
  }
  public setProfile(_profile: Profile): void {
    localStorage.setItem(this.OTT_PROFILE, JSON.stringify(_profile))
  }
  public clearProfile(): void {
    localStorage.removeItem(this.OTT_PROFILE);
  }
  

  public loadOttOffers(serviceNumber: string) {
    let params = new HttpParams().set('serviceNumber', serviceNumber);
    return this.http.get<any>(`${environment.claroOtt.offers}`, { params });
  }

  public validateEmail(email: string) {
    let params = new HttpParams().set('email', email);
    return this.http.post<any>(
      `${environment.claroOtt.validateEmail}`,
      '', 
      { params: params }
    );
  }

  public validateEmailProccessDelegation(request: string) {
    let myHeaders: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json" 
    });
    let body = JSON.stringify(request);
    return this.http.post<any>(
        `${environment.claroOtt.profiles}/processDelegation`,
        body,
        { headers: myHeaders }
    );
  }

  public activateOffer(activateRequest: any) {
    let myHeaders: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json" 
    });
    let body = JSON.stringify(activateRequest);
    return this.http.post<any>(
        `${environment.claroOtt.offers}`,
        body,
        { headers: myHeaders }
    );
  }

  public changeOffer(changeRequest: any) {
    let myHeaders: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json" 
    });
    let body = JSON.stringify(changeRequest);
    return this.http.put<any>(
        `${environment.claroOtt.offers}`,
        body,
        { headers: myHeaders }
    );
  }

  public formatServiceNumber(_serviceNumber: string): string {
    let prefix = _serviceNumber.substring(0,3);
    let length = _serviceNumber.length;
    if(prefix == "593" && length === 12)
      _serviceNumber = _serviceNumber.substring(3,12)
    return _serviceNumber;
  }


}
