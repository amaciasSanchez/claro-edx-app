import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FilesService } from "../../service/files.service";
import { PasoService } from "../../service/paso.service";
import { Location } from "@angular/common";
import {
  NgbModalConfig,
  NgbModal,
  NgbAlertConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { resolve } from "url";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-resumen",
  templateUrl: "./resumen.component.html",
  styleUrls: ["./resumen.component.css"],
  providers: [NgbModalConfig, NgbModal, NgbAlertConfig],
})
export class ResumenComponent implements OnInit {
  public alerts: Array<string> = [];



  resumes: any;
  dataBanks: any[] = [];
  resumeDataSummary: string;
  resumeDataAmount: string;
  resumeDataTotal: string;

  statusModal: any;
  messageContent: any;
  codeId: any;
  codebk: any;
  showIcon: string;

  badgeFin: string;
  fin: HTMLElement = document.getElementById("fin");

  contentModals: string;
  presentModal: string;
  alert: string;

  showFiles: string[] = [];
  ruteFiles: string[] = [];
  mountFiles: string[] = [];
  totalFiles: string[] = [];
  typeFiles: string[] = [];

  dbb: any[] = []; //construir lote y filename
  ckd: any[] = []; //construir check in

  mostrar: boolean = false;
  showActionCheckin: boolean;
  showResumeFiles: boolean;

  //------------------------------------------//
  vFilesCheckIn: any;

  /// ----------------------------------------//

  bancoValue: boolean = false;
  SelectFormatForm: FormGroup;
  fileFormat: any;
  listFileFormat: any[] = [];
  filtered :any;
  fileDomain: string;
  formatCode: string;
  selectFormatCode: string;
  defaultFileName: string;
  defaultNameOption: string;
  selectOption: string;
  checkinFolder: string;
  defaultNamePichincha: string;
  defaultNameGuayaquil: string;
  defaultNamePacifico: string;
  defaultNameBolivariano : string;
  defaultNameProdubanco : string;
  defaultNameInterbancario : string;
  selected :any;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private fservice: FilesService,

    private _pasoService: PasoService,

    alertConfig: NgbAlertConfig,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.centered = false;
    alertConfig.dismissible = false;
    

    this._pasoService.domain = this._route.snapshot.paramMap.get("id");
  }

  /*
   * REALIZAR COMPARACIÓN
   */
  compararCodigo() {
    switch (this.badgeFin) {
      case "Banco Pichincha":
        this.codeId = 10;
        this.codebk = "10";
        this.showIcon = "../../../assets/commons/10.png";
        break;

      case "Banco Pacífico":
        this.codeId = "OE";
        this.codebk = "OE";
        this.showIcon = "../../../assets/commons/30.png";
        break;

      case "Banco Bolivariano":
        this.codeId = "00038";
        this.codebk = "00038";
        this.showIcon = "../../../assets/commons/37.png";
        break;

        case "Banco Guayaquil":
          this.codeId = "Y5";
          this.codebk = "Y5";
          this.showIcon = "../../../assets/commons/guayaquil.png";
          break;

      case "Produbanco":
        //this.codeId = 37;
        this.codebk = "0009";
        this.showIcon = "../../../assets/commons/7777.png";
        break;

      case "Produbanco - Interbancario":
        //this.codeId = 37;
        this.codebk = "conecel";
        this.showIcon = "../../../assets/commons/7777.png";
        break;

      default:
        this.codeId = 0;
        this.codebk = "";
        this.showIcon = "../../../assets/commons/7777.png";
        break;
    }
  }

  /*
   * MUESTRA CONTENIDO EN LOS DISTINTOS DIVS
   */
  mostrarTabla() {
    //let el: string = document.getElementById("bcid").innerText;

    if (this.resumes.filesNoProcesados.length > 0) {
      this.mostrar = true;
    } else {
      this.mostrar = false;
    }
  }

  /*
   * OBTENGO FORMATO DE ARCHIVOS PARA DOMINIO TARJETAS
   */
  getFileFormat(){
    let dominio = this._route.snapshot.paramMap.get("id");
    console.debug(dominio);
    this.fservice
    .getFileFormats({
      domain: dominio,
    }).subscribe((data) =>{
      this.fileFormat = data;
        console.debug("datos de formatos de archivo: ");
        console.debug(this.fileFormat);
        console.debug("El total de formatos de archivo son: ");
        console.debug(this.fileFormat.length);

        // variables de obtención de datos para envío
        let domain: string;
        let formatCode: string;
        let defaultFileName: string;
        let defaultName: string;
        
        // variable iteradora
        let i: number = 0;
        if (this.fileFormat.length > 0) {
          for (i; i < this.fileFormat.length; i++) {
            domain = this.fileFormat[i].domain;
            formatCode = this.fileFormat[i].formatCode;
            defaultFileName = this.fileFormat[i].defaultFileName;
            defaultName = this.fileFormat[i].defaultName;

            this.listFileFormat[i] = {
              domain: domain,
              formatCode: formatCode,
              defaultFileName: defaultFileName,
              defaultName: defaultName
            };
            
          }
        }




        if (this.fileFormat.length == 1){
          if (this.fileFormat[0].domain ==='pichincha'){
            this.defaultNamePichincha = this.listFileFormat[0].defaultName;
            
            this.selectOption = this.defaultNamePichincha;
          }
          if (this.fileFormat[0].domain ==='guayaquil'){
            this.defaultNameGuayaquil = this.listFileFormat[0].defaultName;
            this.selectOption = this.defaultNameGuayaquil;
          }
          if(this.listFileFormat[0].domain ==='pacifico'){
            this.defaultNamePacifico = this.listFileFormat[0].defaultName;
            this.selectOption = this.defaultNamePacifico; 
          }
          if(this.listFileFormat[0].domain ==='bolivariano'){
            this.defaultNameBolivariano = this.listFileFormat[0].defaultName;
            this.selectOption = this.defaultNameBolivariano;
          }
          if(this.listFileFormat[0].domain ==='produbanco'){
            this.defaultNameProdubanco = this.listFileFormat[0].defaultName;
            this.selectOption = this.defaultNameProdubanco;
          }
          if(this.listFileFormat[0].domain ==='conecel'){
            this.defaultNameInterbancario = this.listFileFormat[0].defaultName;
            this.selectOption = this.defaultNameInterbancario;
          }
          if(this.listFileFormat[0].domain ==='interbank'){
            this.defaultNameInterbancario = this.listFileFormat[0].defaultName;
            this.selectOption = this.defaultNameInterbancario;
          }
          
          this.selected = this.listFileFormat[0];
          this.defaultNameOption =  this.selected.defaultName;
          this.selectFormatCode = this.selected.formatCode;
          this.bancoValue = !this.bancoValue;
        }else{
          this.selected = this.listFileFormat[0];
          this.defaultNameOption =  this.selected.defaultName;
          this.selectOption =  this.defaultNameOption;
          console.log("valor del defaultNameOption"); console.log(this.defaultNameOption); 
        }
        
    });
  }






  /*
   * PROCESO LOS FILES MOSTRADOS
   * (POR AHORA SOLO MUESTRA UN CÓDIGO 200 / 500, CON ESTADO EXITOSO / ELIMINADO)
   * (EL ESTADO DEL(OS) FILES CAMBIA A ENVIADO )
   */
  procesarFilePayment(content) {
    let dominio = this._route.snapshot.paramMap.get("id");

    this.fservice
      .getProcessFilePayment({
        accion: 200,
        domain: dominio,
        files: this.resumes.files,
        user: "",
      })
      .subscribe((data) => {
        /*this.statusModal = data;

      console.debug(this.statusModal);

      this.messageContent = data;

      this.mostrar = true;*/

      setTimeout(() => {
        //actualizo resumen
        console.debug("actualicé resumen");
        this.obtenerResumen();
        //actualizo checkin
        console.debug("actualicé checkin");
        this.getCheckInFiles();
      }, 2000);

        this.modalService.dismissAll();

        this.modalService.open(content);
      });
  }

  reloadPage() {

    setTimeout(() => {
      //actualizo resumen
      console.debug("actualicé resumen");
      this.obtenerResumen();
      //actualizo checkin
      console.debug("actualicé checkin");
      this.getCheckInFiles();
    }, 2000);

    this.modalService.dismissAll();

    //location.reload();
  }

  /*
   * OBTENGO RESUMEN POR BANCOS
   */

  obtenerDatosPorBancos() {
    let dominio = this._route.snapshot.paramMap.get("id");

    this.fservice
      .getSummary({
        domain: dominio,
      })
      .subscribe((data) => {
        let rawdata : any = data;

        let dxb : any = rawdata.dataByBanks;

        console.debug("Datos por bancos:");

        let i : number = 0;

        if(dxb.length > 0) {

          this.showResumeFiles = true;

          for (let i = 0; i < dxb.length; i++) {

            let rdxb : any = dxb[i];

            this.dataBanks[i] = {
              "bankId" : rdxb.bankId,
              "bankName" :  rdxb.bankName,
              "description" : rdxb.description,
              "amount" : rdxb.amount,
              "total" : "$ " + rdxb.total
            }

          }
        } else {
          this.showResumeFiles = false;
        }

        console.debug(this.dataBanks)

      })
  }

  /*
   * OBTENGO EL RESUMEN DE LOS DATOS
   */
  obtenerResumen() {
    let dominio = this._route.snapshot.paramMap.get("id");

    console.debug(dominio);
    //console.debug(this.badgeFin);

    this.fservice
      .getSummary({
        domain: dominio,
      })
      .subscribe((data) => {


        //let totalFiles: string[];
        let resumeFiles: any[] = [];
        let i: number = 0;

        this.resumes = data;
        this.resumeDataSummary = this.resumes.summary;
        this.resumeDataAmount = this.resumes.amount;
        this.resumeDataTotal = "$ " + this.resumes.total;

        this._pasoService.dataFileService = this.resumes;
        resumeFiles = this.resumes.filesResumen; // capturo resumen por archivos
        
        //totalFiles = resumeFiles;
        this.mostrarTabla();


        for (i; i < resumeFiles.length; i++) {
          let pfiles : any;
          let c: string;
          let lote: string;
          let name: string;
          pfiles = resumeFiles[i];


          c = pfiles.absoluteName;
          name = pfiles.nameSp0;
          //console.debug(c);

          this.ruteFiles[i] = pfiles.fileName;
          this.mountFiles[i] = pfiles.amount;
          this.totalFiles[i] = pfiles.total;
          this.typeFiles[i] = pfiles.type;

          if (c != null && c.indexOf("_")) {
            let a: string[] = c.split("_");
            if(name==='CONECEL'){
              lote = a[4];
            }else{
              lote = a[3];
            }
            this.showFiles[i] = lote;
          }
          

          this.dbb[i] = {
            nameFile: this.ruteFiles[i],
            loteFile: this.showFiles[i],
            amountFile: this.mountFiles[i],
            totalFile: "$ " + this.totalFiles[i],
            typeFile: this.typeFiles[i]
          };
        }
      });
      
  }

  /*
   * MUESTRO EL NOMBRE DE LA ENTIDAD FINANCIERA
   */
  mostrarBadge() {
    if (this._route.snapshot.paramMap.get("id") == "pichincha") {
      this.badgeFin = "Banco Pichincha";
    } else if (this._route.snapshot.paramMap.get("id") == "pacifico") {
      this.badgeFin = "Banco Pacífico";
    } else if (this._route.snapshot.paramMap.get("id") == "bolivariano") {
      this.badgeFin = "Banco Bolivariano";
    } else if (this._route.snapshot.paramMap.get("id") == "guayaquil") {
      this.badgeFin = "Banco Guayaquil";
    } else if (this._route.snapshot.paramMap.get("id") == "produbanco") {
      this.badgeFin = "Produbanco";
    } else {
      this.badgeFin = "Produbanco - Interbancario";
    }
  }



  onOptionsSelected() {
    console.log('AIUUUDAAA')
    console.log(this.defaultNameOption)
    console.log('AIUUUDAAA selectOption')
    console.log(this.selectOption)
    this.selectOption = this.defaultNameOption;
    this.filtered = this.listFileFormat.filter(t=>t.defaultName == this.defaultNameOption);
    console.log(this.filtered)
    console.log('filtered.formatCode')
    console.log(this.filtered[0].formatCode)
    //this.defaultNameOption =this.selected.defaultName;

  }

      

  ngOnInit() {



      this.mostrarBadge();
      this.obtenerResumen();
      this.obtenerDatosPorBancos();
      this.getCheckInFiles();
      this.compararCodigo();
      this.getFileFormat();
 
      console.debug(this.dbb);

    //this.mostrarLote();

  }

  open(content) {
    this.modalService.open(content);
  }

  //*********************************************

  //************************************************ */
  // REDIRIGE A LA VENTANA CHECK IN

  goToCheckIn() {
    this.router.navigate(["/check-in"]);
  }

  //**********METODO GET CHECK IN FILES************* */
  // TRAE TODOS LOS FILES ENVIADOS

  getCheckInFiles() {
    let dominio = this._route.snapshot.paramMap.get("id");

    this.fservice
      .getFileListCheckIn({
        domain: dominio,
      })
      .subscribe((data) => {
        //console.debug(data);
        this.vFilesCheckIn = data;

        console.debug("datos de check in: ");
        console.debug(this.vFilesCheckIn);
        console.debug("El total de datos son: ");
        console.debug(this.vFilesCheckIn.length);

        //---------------------------------------------

        // variables de obtención de datos para envío
        let directorioBase: string;
        let nombreArchvio: string;
        let rutaArchivo: string;

        // variable iteradora
        let i: number = 0;

        if (this.vFilesCheckIn.length > 0) {

          this.showActionCheckin = true;

          console.debug(
            "Vamos a enviar: " + this.vFilesCheckIn.length + " datos."
          );
          // inicio ciclo for
          for (i; i < this.vFilesCheckIn.length; i++) {
            //console.debug(i + " vuelta de ciclo");

            //datos a tomar
            //console.debug(this.vFilesCheckIn[i].dirBase);
            //console.debug(this.vFilesCheckIn[i].name);
            //console.debug(this.vFilesCheckIn[i].path);

            // tomo datos
            directorioBase = this.vFilesCheckIn[i].dirBase;
            nombreArchvio = this.vFilesCheckIn[i].name;
            rutaArchivo = this.vFilesCheckIn[i].path;

            this.ckd[i] = {
              dirBase: directorioBase,
              name: nombreArchvio,
              path: rutaArchivo,
            };

            //console.debug(i + "Los datos capturados: ");
            //console.debug(this.ckd[i]);
          }
        } else {
          console.debug("No existen datos en CHECK IN.");
          this.showActionCheckin = false;
        }

        //console.debug("Array completo, datos a enviar checkin: ");
        //console.debug(this.ckd);
      });
  }

  //**********ENVIA GET CHECK IN FILES************* */
  // TRAE TODOS LOS FILES ENVIADOS
  sendFilePayment(content) {
    let dominio = this._route.snapshot.paramMap.get("id");

    console.debug(this.ckd);

    this.fservice
      .getProcessFilePaymentCheckIn({
        accion: 201,
        domain: dominio,
        files: this.ckd,
        user: "",
      })
      .subscribe((data) => {
        console.debug(data);

        setTimeout(() => {
          //actualizo resumen
          console.debug("actualicé resumen");
          this.obtenerResumen();
          //actualizo checkin
          console.debug("actualicé checkin");
          this.getCheckInFiles();
        }, 2000);

        this.modalService.dismissAll();

        this.modalService.open(content);
      });
  }

  //**********ELIMINA TODOS LOS GET CHECK IN FILES************* */
  // TRAE TODOS LOS FILES ENVIADOS
  deleteFilePayment(content) {
    let dominio = this._route.snapshot.paramMap.get("id");

    console.debug(this.ckd);

    this.fservice
      .getProcessFilePaymentCheckIn({
        accion: 101,
        domain: dominio,
        files: this.ckd,
        user: "",
      })
      .subscribe((data) => {
        console.debug(data);

        setTimeout(() => {
          //actualizo resumen
          console.debug("actualicé resumen");
          this.obtenerResumen();
          //actualizo checkin
          console.debug("actualicé checkin");
          this.getCheckInFiles();
        }, 2000);

        this.modalService.dismissAll();

        this.modalService.open(content);
      });
  }
}
