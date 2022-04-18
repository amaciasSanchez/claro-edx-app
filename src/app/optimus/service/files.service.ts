import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: "root",
})
export class FilesService {
  constructor(private http: HttpClient) {}



  /* TRAE LA LISTA DE LOS ARCHIVOS */

  getFile(body: any) {
    let myheader = new HttpHeaders({ "content-type": "application/json" });
    let data = JSON.stringify(body);
    let url = environment.optimus.urlapi.concat("getFileList");
    return this.http.post(url, data, { headers: myheader });
    /* return this.http.post<any>(url, data, { headers: myheader })
    .toPromise()
    .then(res => res)
    .then(data => {return data}); */
  }

  /* LEE EL ARCHIVO SELECCIONADO */
  readFile(body: any) {
    let myheader = new HttpHeaders({ "content-type": "application/json" });
    let data = JSON.stringify(body);
    let url = environment.optimus.urlapi.concat("getFileContent");
    return this.http.post(url, data, { headers: myheader });
  }

  /* ELIMINA EL ARCHIVO SELECCIONADO */
  deleteFile(body: any) {
    let myheader = new HttpHeaders({ "content-type": "application/json" });
    let data = JSON.stringify(body);
    let url = environment.optimus.urlapi.concat("deleteFile");
    return this.http.post(url, data, { headers: myheader });
  }

  /* CALCULA EL ARCHIVO SELECCIONADO */
  calculateFile(body: any) {
    let myheader = new HttpHeaders({ "content-type": "application/json" });
    let data = JSON.stringify(body);
    let url = environment.optimus.urlapi.concat("getMontoTotalByFile");
    return this.http.post(url, data, { headers: myheader });
  }

  /******************************************************************************* */

  /* OBTIENE RESUMEN DE LA INFORMACION DE PAGO DE CLIENTES POR ENVIAR A LOS BANCOS */
  getSummary(body: any) {
    let myheader = new HttpHeaders({ "content-type": "application/json" });
    let data = JSON.stringify(body);
    let url = environment.optimus.urlapi.concat("summary");
    return this.http.post(url, data, { headers: myheader });
  }

  getProcessFilePayment(body: any) {
    let myheader = new HttpHeaders({ "content-type": "application/json" });
    let data = JSON.stringify(body);
    let url = environment.optimus.urlapi.concat("processFilePayment");
    return this.http.post(url, data, { headers: myheader });
  }

  /******************************************************************************* */

  /* CHECK IN */

  getFileListCheckIn(body: any) {
    let myheader = new HttpHeaders({ "content-type": "application/json" });
    let data = JSON.stringify(body);
    let url = environment.optimus.urlapi.concat("getFileListCheckin");
    return this.http.post(url, data, { headers: myheader });
  }

  /******************************************************************************* */

  /* PROCESS FILE PAYMENT CHECK IN */

  getProcessFilePaymentCheckIn(body: any) {
    let myheader = new HttpHeaders({ "content-type": "application/json" });
    let data = JSON.stringify(body);
    let url = environment.optimus.urlapi.concat("processFilePaymentCheckin");
    return this.http.post(url, data, { headers: myheader });
  }

    /******************************************************************************* */

  /* GET FILE FORMATS */

  /* OBTIENE RESUMEN DE LA INFORMACION DE PAGO DE CLIENTES POR ENVIAR A LOS BANCOS */
  getFileFormats(body: any) {
    let myheader = new HttpHeaders({ "content-type": "application/json" });
    let data = JSON.stringify(body);
    let url = environment.optimus.urlapi.concat("getFileFormats");
    return this.http.post(url, data, { headers: myheader });
  }



}
