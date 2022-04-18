import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { PersonService } from '../claroup/service/personservice';

import { Router } from '@angular/router';
moment.locale("es");
@Component({
    selector: 'app-flujo-actual-claro-video',
    templateUrl: './flujo-actual-claro-video.component.html',
    styleUrls: ['./flujo-actual-claro-video.component.css'],
    providers: [PersonService]
})
export class FlujoActualClaroVideoComponent implements OnInit {
    proceso:EstadoProceso;
    step = 0;
    type = "";
    constructor(private personservice: PersonService,private router: Router) { }

    ngOnInit() {
        // this.proceso = {"paso":1,"proceso":{"processInstanceId":232,"processId":"Claro-Video.bundle","processName":"bundle","processInstanceState":1,"containerId":"claro-video_1.0.0-SNAPSHOT","initiator":"wbadmin","startDate":"1591395571799","processInstanceDesc":"Venta de Claro Video Incluido en oferta pospago","correlationKey":"3059562435|17","parentInstanceId":-1,"taskSummary":null,"processInstanceVariables":{"transactionDate":"08 junio 2020 12H15","identificationNumber":"0926727777","offer":"12324","serviceNumber":"593993712049","serviceDescription":"Plan Ilimitado 35","paymentMethod":"ABC12","paymentDescription":"Contrafactura","customerId":null,"detailsOffer":null}},"processId":232,"title":"Venta de Claro Video Incluido en oferta pospago","subscriptionId":"593993712049","type":"bundle"};
        this.proceso = history.state;
        console.debug(history.state);
        if (this.proceso.processId == null) {
            this.router.navigate(["/bestoffer/2"]);
          }
        this.type =  this.proceso.type ;
        this.personservice.getCurrentStepOfInstance({
            processInstanceId: this.proceso.processId.toString()
        }).subscribe(
            res=>{

                console.debug(res);
                if(res.code == "200"){
                    this.step = res.response.toString();
                }
            },
            error => {
                console.debug(error);
            }
        );
    }

    volver(event: any) {
        this.router.navigate(["/bestoffer/2"]);
    }

    volverEtapa(){
        if(this.type == 'standalone'){
            this.router.navigate(['/claro-video-bpm'], { state: this.proceso });
        } else if(this.type == 'bundle'){
            this.router.navigate(['/process-bundle'], { state: this.proceso });
        }
    }
}


export interface EstadoProceso {
    processId: number,
    title: string,
    type: string,
    paso: number,
    proceso: any,
    offer?: any,
    correo?: string,
    subscriptionId:string
};

