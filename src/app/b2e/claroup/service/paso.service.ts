import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasoService {


    department      : string;             //capturando department
    employmentId    : string;             //capturando employmentID
    firstName       : string;             //capturando firstName
    lastName        : string;             //capturandolastName
    fullName        : string;             //capturando fullName
    gender          : string;             //capturando gender
    identification  : string;             //capturando identification
    mail            : string;             //capturando mail
    position        : string;             //capturando pposition
    phoneNumber     : string;             //capturado de register
    loggedIn        : boolean;            //capturando loggedIn
    licensePlate    : string;             //capturando licensePlate

    captureData     : any;

    captureUser     : string;
    captureCond     : boolean;

    endFlow         : boolean;

    captureQR       : any;                //captura el código QR


    constructor(
        private http: HttpClient
      ) {
          /*console.debug(this.department);
          console.debug(this.employmentId);
          console.debug(this.firstName);
          console.debug(this.lastName);
          console.debug(this.fullName);
          console.debug(this.gender);
          console.debug(this.identification);
          console.debug(this.mail);
          console.debug(this.position);
          console.debug(this.phoneNumber);
          console.debug(this.loggedIn);
          console.debug(this.licensePlate);*/
      }

}
