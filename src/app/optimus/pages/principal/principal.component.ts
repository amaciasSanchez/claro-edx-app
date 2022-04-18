import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { FilesService } from "../../service/files.service";
import { PasoService } from "../../service/paso.service";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
@Component({
  selector: "app-principal",
  templateUrl: "./principal.component.html",
  styleUrls: ["./principal.component.css"],
  providers: [NgbModalConfig, NgbModal, FilesService],
})
export class PrincipalComponent implements OnInit {
  /*********************************************************** */
  /*
   * VARIABLES GLOBALES
   */

  nameFin: any; // variable que asigna el nombre de la financiera
  mifin: any;
  defFin: string = "CONECEL";
  vFiles: any; // variable que contiene la información de los files a mostrar
  // en pantalla principal
  captureFileFormat: any;
  captureDataFile: any;
  calculateDataFile: any;
  folder: any;
  activar: boolean = false;
  dcelda: boolean = false;

  est: boolean = false;

  _filesResumenData: any[] = [];
  sendDelFile: any[] = [];

  manageData: string[] = []; // array encargado de almacenar los files a enviar o eliminar
  captureAction: string;
  defDomain: string;

  //arreglodeprueba   : string[]  = [];
  accionarealizar: string = "";

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fservice: FilesService,
    private _route: ActivatedRoute,
    private _location: Location,
    private router: Router,

    private _pasoService: PasoService
  ) {
    //=========MODAL==============
    config.centered = true;
    config.backdrop = "static";
    config.keyboard = false;

    //=========APLICACIÓN=========

    this.calculateDataFile = ""; //asigno el contenido a mi variable nameFile

    this.mifin = this._route.snapshot.paramMap.get("id");
    this.nameFin = this._route.snapshot.paramMap.get("id");

  }

  /*********************************************************** */

  /*
   *  SELECCIONA LOS ELEMENTOS A ENVIAR DE LA LISTA DE FILES
   */

  enviarArchivos(content) {
    console.log("Enviando Archivos ... ");
    //defino el estado de mi arreglo a null
    this.manageData = [];
    this.sendDelFile = [];
    //defino variables iteradoras
    let _i: any = 0;
    this.captureAction = "TRANSFORMAR";
    this.accionarealizar = "Está seguro de enviar a transformar estos archivos:";

    for (_i; _i < this._filesResumenData.length; _i++) {
      console.log(this._filesResumenData[_i].dtname + "(" + this._filesResumenData[_i].select + ")");
      if (this._filesResumenData[_i].select == true) {
        console.log(this._filesResumenData[_i].dtrute + "/" + this._filesResumenData[_i].dtname);
        this.manageData.push(this._filesResumenData[_i].dtrute + "/" + this._filesResumenData[_i].dtname);
        console.log("--- size of MANAGED is" + this.manageData.length);
        this.sendDelFile.push(this._filesResumenData[_i].dtname);
        console.log("--- sendDelFile:  " + JSON.stringify(this.sendDelFile));
      }
    }


    if (this.manageData.length == 0) {
      alert("No ha seleccionado ningún archivo");
    } else {
      console.debug(
        "Usted está a punto de " + this.captureAction + ": " + this.sendDelFile
      );

      this.modalService.open(content);
    }
  }

  /*********************************************************** */

  /*
   *  SELECCIONA LOS ELEMENTOS A ELIMINAR DE LA LISTA DE FILES
   */

  eliminarArchivos(content) {
    console.log("Eliminando Archivos ...");
    //defino el estado de mi arreglo a null
    this.manageData = [];
    this.sendDelFile = [];
    //defino variables iteradoras
    let _i: any = 0;
    this.captureAction = "ELIMINAR";
    this.accionarealizar = "Está seguro de eliminar estos archivos:";

    for (_i; _i < this._filesResumenData.length; _i++) {
      console.log(this._filesResumenData[_i].dtname + "(" + this._filesResumenData[_i].select + ")");
      if (this._filesResumenData[_i].select == true) {
        this.manageData.push(this._filesResumenData[_i].dtrute + "/" + this._filesResumenData[_i].dtname);
        console.log("--- size of MANAGED is" + this.manageData.length);
        this.sendDelFile.push(this._filesResumenData[_i].dtname);
        console.log("--- sendDelFile:  " + JSON.stringify(this.sendDelFile));
      }
    }

    if (this.manageData.length == 0) {
      alert("No ha seleccionado ningún archivo");
    } else {
      console.debug(
        "Usted está a punto de " + this.captureAction + ": " + this.sendDelFile
      );

      this.modalService.open(content);
    }
  }

  /*********************************************************** */

  /*
   * Acción de acpetar después de desplegar el pop up
   */

  aceptar() {
    switch (this.captureAction) {
      case "TRANSFORMAR":
        console.debug("Acción Transformar");
        this.sendFilePayment();


        console.debug(this.mifin);


        setTimeout(() => {
          //actualizo resumen
          console.debug("actualicé principal");

          this.loadFile({ fileView: "principal" });
        }, 2000);



        //location.reload();
        break;

      case "ELIMINAR":
        console.log("Acción Eliminar");
        this.deleteFilePayment();

        setTimeout(() => {
          //actualizo resumen
          console.log("actualicé principal");

          this.loadFile({ fileView: "principal" });
        }, 2000);

        console.debug(this.mifin);

        //location.reload();
        break;
    }

    this.modalService.dismissAll();
  }

  /*********************************************************** */

  ocultarCeldas() {
    let el: HTMLElement = document.getElementById("fname");

    if (el.innerText == "") {
      this.dcelda = true;
    }
  }

  /*********************************************************** */

  /* CALCULA EL MONTO Y NUMERO DE LINEAS DEL ARCHIVO SELECCIONADO */

  calculateFile(cname) {
    /*console.debug(this.captureDataFile);*/
    console.debug(cname);

    this.captureDataFile = cname.name;
    this.captureFileFormat = cname.fileFormat;
    let path = "/home/gizlo/AsignacionOpt/edx-localhost";

    this.fservice
      .calculateFile({
        fileformat: this.captureFileFormat,
        filename: this.captureDataFile,
        path: path,
      })
      .subscribe((data) => {
        /*this.calculateDataFile = data;*/
        this.calculateDataFile = data;
      });
  }

  /*********************************************************** */

  ngOnInit() {
    //this.mostrarFinancieras();
    // por defecto abre la carpeta principal
    this.loadFile({ fileView: "principal" });


  }

  /*********************************************************** */

  showNameFile(cname) {
    this.captureDataFile = cname.name;
    this.captureFileFormat = cname.fileFormat;

    console.debug(this.captureDataFile);
    console.debug(this.captureFileFormat);
  }

  /* CARGA LA LISTA DE ARCHIVOS */

  loadFile(data: any) {
    
    let path = "/home/gizlo/AsignacionOpt/edx-localhost";

    if (data.fileView == "principal") {
      this.folder = "principal";
      path = "/home/gizlo/AsignacionOpt/edx-localhost";
      this.activar = false;
    } else {
      this.folder = "Trash";
      path = "/home/gizlo/AsignacionOpt/edx-localhost";
      this.activar = true;
    }

    /*********************************************************** */

    this.fservice
      .getFile({
        domain: this.mifin,
        filename: "",
        //path: "/procesos/gsioper/optimus/sftp/02recibidos/"
        path: ""
      })
      .subscribe((data) => {
        this.vFiles = data;
        let i: number = 0;
        this._filesResumenData = [];
        for (let i = 0; i < this.vFiles.length; i++) {

          let dtfiles: any = this.vFiles[i];

          this._filesResumenData[i] = {
            "dtcode": dtfiles.codigoFin,
            "dtname": dtfiles.name,
            "dtrute": dtfiles.path,
            "dtsize": dtfiles.size,
            "dtmoun": dtfiles.totalAmount,
            "dtmone": "$ " + dtfiles.totalMoney,
            "dtdate": dtfiles.dateModified,
            "select": false
          }
        }
      });
    
  }

  get filesResumenData(){
    return [...this._filesResumenData];
  }
  /************************************************************ */

  /*
   * PROCESO LOS FILES MOSTRADOS
   * (POR AHORA SOLO MUESTRA UN CÓDIGO 200 / 500, CON ESTADO EXITOSO / ELIMINADO)
   * (EL ESTADO DEL(OS) FILES CAMBIA A ENVIADO )
   */
  sendFilePayment() {
    //let dominio = this._route.snapshot.paramMap.get("id");

    let path: string = "";// "/procesos/gsioper/optimus/sftp/02recibidos/";

    /*
     * prueba quemando dato
     * realizar arreglo para enivar en el servicio
     */

    this.fservice
      .getProcessFilePayment({
        accion: 200,
        domain: this.mifin,
        //files: [path + this.manageData],
        files: this.manageData,
        user: "",
      })
      .subscribe((data) => {
        this.vFiles = data;



        console.debug(this.vFiles);

        this.modalService.dismissAll();
      });
  }

  /*
   * DESCARTO LOS FILES MOSTRADOS
   * (POR AHORA SOLO MUESTRA UN CÓDIGO 200 / 500, CON ESTADO EXITOSO / ELIMINADO)
   * (EL ESTADO DEL(OS) FILES CAMBIA A BORRADO )
   */
  deleteFilePayment() {
    let path: string = "";// "/procesos/gsioper/optimus/sftp/02recibidos/";

    //let dominio = this._route.snapshot.paramMap.get("id");

    /*
     * prueba quemando dato
     * realizar arreglo para enivar en el servicio
     */

    this.fservice
      .getProcessFilePayment({
        accion: 100,
        domain: this.mifin,
        //files: [path + this.manageData],
        files: this.manageData,
        user: "",
      })
      .subscribe((data) => {
        console.debug(data);

        this.vFiles = data;

        this.modalService.dismissAll();
      });
  }
}
