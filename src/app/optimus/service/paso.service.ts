import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasoService {

    domain          : string;
    dataFileService : any[] = [];

    username        : string;
    autorizarUser   : boolean = false;

    constructor() {
    }

}