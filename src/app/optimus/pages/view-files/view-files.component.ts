import { Component, OnInit, ɵConsole } from '@angular/core';
import { FilesService } from '../../service/files.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: "app-view-files",
  templateUrl: "./view-files.component.html",
  styleUrls: ["./view-files.component.css"],
  providers: [NgbModalConfig, NgbModal]
})
export class ViewFilesComponent implements OnInit {
  datos: any;

  nameFile: any;
  someFinanciera;
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fservice: FilesService,
    private ftrash: FilesService,
    private _route: ActivatedRoute,
    private _location : Location
  ) {
    config.centered = true;
    //asigno el contenido a mi variable nameFile
    this.nameFile = this._route.snapshot.paramMap.get("id");
  }

  viewFile() {
    this.fservice
      .readFile({ filename: this.nameFile, path: "C:\\TESTS\\MICROFILE" })
      .subscribe(data => {
        this.datos = data;
      });

    this.ftrash
      .readFile({ filename: this.nameFile, path: "C:\\TESTS\\TRASH" })
      .subscribe(data => {
        this.datos = data;
      });

  }

  /*deleteFile() {
    console.debug(this.nameFile);

    let path = "C:\\TESTS\\MICROFILE";

    this.fservice
      .deleteFile({ filename: this.nameFile, path: path })
      .subscribe(data => {
        console.debug(data);
        this.modalService.dismissAll();
      });
      this._location.back();
  }*/

  open(content) {
    this.modalService.open(content);
  }

  ngOnInit() {
    this.viewFile();
  }

  /*
   * PROCESO LOS FILES MOSTRADOS
   * (POR AHORA SOLO MUESTRA UN CÓDIGO 200 / 500, CON ESTADO EXITOSO / ELIMINADO)
   * (EL ESTADO DEL(OS) FILES CAMBIA A ENVIADO )
   */
  procesarFilePayment() {

    let dominio = this._route.snapshot.paramMap.get("id");

    this.fservice.getProcessFilePayment({
                                          "accion": 200,
                                          "domain": dominio,
                                          "files": "CONECEL_CSC_30230_20200312_1_IN.TXT",
                                          "user": ""
    }).subscribe(data => {

      this.datos = data;

      console.debug(this.datos);

      //this.messageContent = data;

      //this.mostrar = true;

      this.modalService.dismissAll();
    })

  }

  /*
   * DESCARTO LOS FILES MOSTRADOS
   * (POR AHORA SOLO MUESTRA UN CÓDIGO 200 / 500, CON ESTADO EXITOSO / ELIMINADO)
   * (EL ESTADO DEL(OS) FILES CAMBIA A BORRADO )
   */
  deleteFile() {
    let dominio = this._route.snapshot.paramMap.get("id");

    this.fservice.getProcessFilePayment({
                                          "accion": 100,
                                          "domain": dominio,
                                          "files": "CONECEL_CSC_30230_20200312_1_IN.TXT",
                                          "user": ""
    }).subscribe(data => {
      console.debug(data);

      this.datos = data;
      //this.mostrar = true;
      this._location.back();

      this.modalService.dismissAll();
    })
  }

}
