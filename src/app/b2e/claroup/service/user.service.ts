import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import 'rxjs/operators';

import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

    /*
    *************ARREGLO DE PRUEBA
    */

   private usuarios  : any = [
     {
       user          : "marcelo.tinelli",
       pass          : "telefe",
       id            : "859070",
       name          : "Marcelo",
       surname       : "Tinelli",
       gender        : "men",
       iddocument    : "0999999991",
       position      : "Director de Tecnología",
       ServiceNumber : "+593999999991",
       anotherPhone  : "NO",
       idvehicle     : "ABC-123",
       termsCond     : "SI",
       tokenreg      : "3453453453"
     },
     {
       user          : "scarlett.johansson",
       pass          : "avengers",
       id            : "859071",
       name          : "Scarlett",
       surname       : "Johansson",
       gender        : "women",
       iddocument    : "0999999992",
       position      : "Directora de Tecnología",
       ServiceNumber : "+593999999992",
       anotherPhone  : "NO",
       idvehicle     : "ABC-456",
       termsCond     : "SI",
       tokenreg      : "3453453453"
     },
     {
       user          : "christian.bale",
       pass          : "darkknight",
       id            : "859072",
       name          : "Christian",
       surname       : "Bale",
       gender        : "men",
       iddocument    : "0999999993",
       position      : "Director de Tecnología",
       ServiceNumber : "+593999999993",
       anotherPhone  : "NO",
       idvehicle     : "ABC-789",
       termsCond     : "SI",
       tokenreg      : "3453453453"
     }
     ,
     {
       user          : "manuel.garcia",
       pass          : "manugar01",
       id            : "34534",
       name          : "Manuel",
       surname       : "Garcia Romero",
       gender        : "men",
       iddocument    : "0922454454",
       position      : "Arquitecto Líder",
       ServiceNumber : "+593987564332",
       anotherPhone  : "NO",
       idvehicle     : "GSG2015",
       termsCond     : "SI",
       tokenreg      : "3453453453"
     }
    ];


    //--------------------CONSTRUCTOR-------------------//

    constructor(
      private http: HttpClient
    ) {
        console.debug("Servicio Inicializado!!")
    }

    //-------------------------------------------------//

    //----------------------MOCK-----------------------//
    /*
     * Retorna arreglo con los posibles datos que vayan
     * a solicitarse una vez el API esté terminada.
     *
     * Este método es definido por el desarrollador, solo
     * debe considerarse para pruebas.
     */

    getUsers() {
        return this.usuarios;
    }

    //-------------------------------------------------//

    //-------------DATOS DE USUARIO--------------------//

    /*
     * Obtiene los datos de los usuarios/trabajadores
     * que se encuentren registrados en el sistema.
     */

    getLoggedUserData(body: any){
      let myheader  = new HttpHeaders({"content-type": "application/json"});
      let data      = JSON.stringify(body);
      let url       = environment.b2e.b2eURL.concat("/loggedUserData")

      return this.http.post(url,data, {headers:myheader});
    }

    //-------------------------------------------------//

    //---------------------LOGIN-----------------------//

    /*
     * Login de usuario/trabajador.
     * Tener en cuenta que el campo loggedIn indicará si
     * se ha podido realizar login o no.
     */

    getLogin(body: any){
      let myheader  = new HttpHeaders(body.headers);
      let data      = JSON.stringify(body.data);
      let url       = environment.b2e.b2eURL.concat("/login")

      return this.http.post(url,data, {headers:myheader});
    }

    //-------------------------------------------------//

    //------------------GENERATE QR--------------------//

    /*
     * Obtiene el código QR generado.
     */

    getGeneratedQR(body: any) : Observable<any> {
      let myheader  = new HttpHeaders({"content-type": "application/json"});
      let data      = JSON.stringify(body);
      let url       = environment.b2e.b2eURL.concat("/generateQR")

      return this.http.post(url,data, {headers:myheader}).pipe(catchError(this.handleError));
    }

    //-------------------------------------------------//

    //-----------------GENERATE PIN--------------------//

    /*
     * Servicio que genera un PIN.
     * Se requiere un ServiceID
     */

    getGeneratePin(body: any){
      let myheader  = new HttpHeaders(body.headers);
      let data      = JSON.stringify(body.data);
      let url       = environment.b2e.b2eURL.concat("/generatePin")

      return this.http.post(url,data, {headers:myheader});
    }

    //-------------------------------------------------//


    //-----------------GENERATE PIN--------------------//

    /*
     * Servicio que genera un PIN.
     * Se requiere un ServiceID
     */

    getValidatePin(body: any){
      let myheader  = new HttpHeaders(body.headers);
      let data      = JSON.stringify(body.data);
      let url       = environment.b2e.b2eURL.concat("/validatePin")

      return this.http.post(url,data, {headers:myheader});
    }

    //-------------------------------------------------//

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
