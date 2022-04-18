import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUser(url: string){
    return this.http.get(url);
  }

  /* LOGIN */

  getLogin(body: any) : Observable<any> {
    let myheader  = new HttpHeaders(body.headers);
    let data      = JSON.stringify(body.data);
    let url       = environment.optimus.urlapiLogin.concat("login")

    return this.http.post(url,data, {headers:myheader})
                    .pipe(catchError(this.handleError));
  }

  /* MANEJO DE ERRORES */

  handleError(err) {

    if(err instanceof HttpErrorResponse) {
      //ServerSideError
    }
    else {
      // this is the client error
    }

    return throwError(err);
  }
}
