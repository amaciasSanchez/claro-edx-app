import { Component, OnInit } from "@angular/core";
import { FilesService } from "../../service/files.service";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";

import { PasoService } from "../../service/paso.service";
interface Files{
  dirBase: string;
  name: string;
  path: number;
}
@Component({
  selector: "app-check-in",
  templateUrl: "./check-in.component.html",
  styleUrls: ["./check-in.component.css"],
  providers: [NgbModalConfig, NgbModal, FilesService],
})

export class CheckInComponent implements OnInit {
  vFiles: any;

  captureAction: string;

  accionarealizar: string = "";

  manageData: any[] = [];
  manageName: string[] = [];

  
  

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _pasoService: PasoService,
    private fservice: FilesService,
  ) { 
  }
  ngOnInit() {
    this.getCheckInFiles();
  }
  //**********METODO GET CHECK IN FILES************* */
  // TRAE TODOS LOS FILES ENVIADOS
  getCheckInFiles() {
    this.fservice.getFileListCheckIn({
      domain: this._pasoService.domain,
    })
      .subscribe((data) => {
        console.log("vFiles Content ::");
        console.log(data);
        this.vFiles = data;
      });
  }

  //
  //
  enviarArchivos(content) {
    //defino el estado de mi arreglo a null
    this.manageData = [];
    this.manageName = [];
    //defino variables iteradoras
    let _i: any = 0;
    this.captureAction = "ENVIAR";
    this.accionarealizar = "Está seguro de enviar estos archivos:";
    //inicializo ciclo for
    for (_i; _i < this.vFiles.length; _i++) {
      console.log(this.vFiles[_i].name + "(" + this.vFiles[_i].select + ")");
      if (this.vFiles[_i].select == true) {
        let file: Files = {
          name:this.vFiles[_i].name,
          dirBase:this.vFiles[_i].dirBase,
          path:this.vFiles[_i].path 
        };
        this.manageData.push(file);
        console.log("--- size of MANAGED is" + this.manageData.length);
        this.manageName.push(this.vFiles[_i].name);
      }
    }

    if (this.manageData.length == 0) {
      alert("No ha seleccionado ningún archivo");
    } else {
      console.debug(
        "Usted está a punto de " + this.captureAction + ": " + this.manageData
      );

      console.debug(this.manageData);

      this.modalService.open(content);
    }
  }

  

  eliminarArchivos(content) {
    //defino el estado de mi arreglo a null
    this.manageData = [];
    this.manageName = [];
 
    
    //Object with properties
    
    
    //defino variables iteradoras
    let _i: any = 0;
    this.captureAction = "ELIMINAR";
    this.accionarealizar = "Está seguro de eliminar estos archivos:";

    //inicializo ciclo for
    for (_i; _i < this.vFiles.length; _i++) {
      console.log(this.vFiles[_i].name + "(" + this.vFiles[_i].select + ")");
      if (this.vFiles[_i].select == true) {
        let file: Files = {
          name:this.vFiles[_i].name,
          dirBase:this.vFiles[_i].dirBase,
          path:this.vFiles[_i].path 
        };
        //this.manageData.push(this.vFiles[_i].path + "/" + this.vFiles[_i].name);
        this.manageData.push(file);
        console.log(this.manageData);
        this.manageName.push(this.vFiles[_i].name);
        console.log("--- sendDelFile:  " + JSON.stringify(this.manageName));
      }
    }

    if (this.manageData.length == 0) {
      alert("No ha seleccionado ningún archivo");
    } else {
      console.debug(
        "Usted está a punto de " + this.captureAction + ": " + this.manageData
      );

      console.debug(this.manageData);

      this.modalService.open(content);
    }
  }

  aceptar() {
    switch (this.captureAction) {
      case "ENVIAR":
        this.sendFilePayment();

        setTimeout(() => {
          //actualizo resumen
          console.debug("actualicé checkin");
          this.getCheckInFiles();
        }, 3000);


        //location.reload();
        break;

      case "ELIMINAR":
        console.debug("Acción Eliminar");
        this.deleteFilePayment();

        setTimeout(() => {
          //actualizo resumen
          console.debug("actualicé checkin");
          this.getCheckInFiles();
        }, 3000);

        //location.reload();
        break;
    }

    this.modalService.dismissAll();
  }

  //************************************************* */
  //
  sendFilePayment() {
    this.fservice
      .getProcessFilePaymentCheckIn({
        accion: 201,
        domain: "",
        files: this.manageData,
        user: "",
      })
      .subscribe((data) => {
        this.vFiles = data;

        console.log("data" + data);

        this.modalService.dismissAll();
      });
  }

  //************************************************* */
  //
  deleteFilePayment() {
    console.log(this.manageData);
     this.fservice
      .getProcessFilePaymentCheckIn({
        accion: 101,
        domain: "",
        files: this.manageData,
        user: "",
      })
      .subscribe((data) => {
        //this.vFiles = data;

        console.log(data);

        this.modalService.dismissAll();
      });
  } 

}
