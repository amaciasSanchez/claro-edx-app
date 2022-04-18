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
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormControl  } from "@angular/forms";

@Component({
  selector: "app-resumen",
  templateUrl: "./resumen-tarjetas.component.html",
  styleUrls: ["./resumen-tarjetas.component.css"],
  providers: [NgbModalConfig, NgbModal, NgbAlertConfig],
})
export class ResumenTarjetasComponent implements OnInit {
  [x: string]: Object;
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
  tarjetaValue: boolean;

  SelectFormatForm: FormGroup;
  fileFormat: any;
  listFileFormat: any[] = [];
  filtered :any;
  fileDomain: string;
  formatCode: string;
  SelectFormatCode: string;
  defaultFileName: string;
  defaultNameOption: string;
  selectOption: string;
  checkinFolder: string;
  defaultNameAlia: string;
  defaultNameAmerican: string;
  defaultNameDinners: string;
  defaultNameDiscover : string;
  selected :any;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private fservice: FilesService,
    private fb: FormBuilder,
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
      case "Visa":
        this.codeId = "CC01";
        this.codebk = "CC01";
        this.showIcon = "../../../assets/commons/icons8-visa-96.png";
        break;

      case "Mastercard":
        this.codeId = "CC02";
        this.codebk = "CC02";
        this.showIcon = "../../../assets/commons/icons8-mastercard-100.png";
        break;

      case "American Express":
        this.codeId = "CC03";
        this.codebk = "CC03";
        this.showIcon = "../../../assets/commons/icons8-american-express-48.png";
        break;

        case "Dinners Club Internacional":
          this.codeId = "CC04";
          this.codebk = "CC04";
          this.showIcon = "../../../assets/commons/icons8-diners-club-48.png";
          break;

      case "Discover":
        //this.codeId = 37;
        this.codebk  = "CC05";
        this.showIcon = "../../../assets/commons/icons8-discover-144.png";
        break;

      case "Tarjetas Alia":
        //this.codeId = 37;
        this.codebk  = "CC06";
        this.showIcon = "../../../assets/commons/alia-logo.png";
        break;

      default:
        this.codeId = "CC06";
        this.codebk = "CC06";
        this.showIcon = "../../../assets/commons/alia-logo.png";
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
          this.showResumeFiles = true;
        }

        console.debug(this.dataBanks)

      })
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
          if (this.fileFormat[0].domain ==='alia'){
            this.defaultNameAlia = this.listFileFormat[0].defaultName;
            this.selectOption = this.defaultNameAlia;
            console.log("valor del defaultNameAlia"); console.log(this.defaultNameAlia); 
          }
          if (this.fileFormat[0].domain ==='amex'){
            this.defaultNameAmerican = this.listFileFormat[0].defaultName;
            this.selectOption = this.defaultNameAmerican;
            console.log("valor del defaultNameAlia"); console.log(this.defaultNameAlia); 
          }
          if(this.listFileFormat[0].domain ==='dinners'){
            console.log('entre')
            this.defaultNameDinners = this.listFileFormat[0].defaultName;
            this.selectOption = this.defaultNameDinners;
            console.log("valor del defaultNameDinners"); console.log(this.defaultNameDinners); 
          }
          if(this.listFileFormat[0].domain ==='discover'){
            this.defaultNameDiscover = this.listFileFormat[0].defaultName;
            this.selectOption = this.defaultNameDiscover;
            console.log("valor del defaultNameDiscover"); console.log(this.defaultNameDiscover); 
          }
          this.selected = this.listFileFormat[0];
          this.defaultNameOption =  this.selected.defaultName;
        }else{
          this.selected = this.listFileFormat[0];
          this.defaultNameOption =  this.selected.defaultName;
          this.selectOption =  this.defaultNameOption;
          console.log("valor del defaultNameOption"); console.log(this.defaultNameOption); 
        }

    });
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
    if (this._route.snapshot.paramMap.get("id") == "visa") {
      this.badgeFin = "Visa";
    } else if (this._route.snapshot.paramMap.get("id") == "mastercard") {
      this.badgeFin = "Mastercard";
    } else if (this._route.snapshot.paramMap.get("id") == "amex") {
      this.badgeFin = "American Express";
    } else if (this._route.snapshot.paramMap.get("id") == "dinners") {
      this.badgeFin = "Dinners Club Internacional";
    } else if (this._route.snapshot.paramMap.get("id") == "discover") {
      this.badgeFin = "Discover";
    } else if (this._route.snapshot.paramMap.get("id") == "alia") {
      this.badgeFin = "Tarjetas Alia";
    } else {
      this.badgeFin = "Tarjetas Alia";
    }
  }

  /* 
    Mostrar el listado de los archivos
  */
  mostrarFormatoBanco(){
    this.tarjetaValue = false;

    if (this._route.snapshot.paramMap.get("id") == "visa") {
      this.badgeFin = "Visa";
    } else if (this._route.snapshot.paramMap.get("id") == "mastercard") {
      this.badgeFin = "Mastercard";
    } else if (this._route.snapshot.paramMap.get("id") == "amex") {
      this.tarjetaValue = !this.tarjetaValue;
      this.badgeFin = "American Express";
    } else if (this._route.snapshot.paramMap.get("id") == "dinners") {
      this.tarjetaValue = !this.tarjetaValue;
      this.badgeFin = "Dinners Club Internacional";
      this.defaultNameOption = this.defaultNameDinners;
    } else if (this._route.snapshot.paramMap.get("id") == "discover") {
      this.tarjetaValue = !this.tarjetaValue;
      this.badgeFin = "Discover";
      this.defaultNameOption = this.defaultNameDiscover;
    } else if (this._route.snapshot.paramMap.get("id") == "alia") {
      this.tarjetaValue = !this.tarjetaValue;
      this.badgeFin = "Tarjetas Alia"; 
      this.defaultNameOption = this.defaultNameAlia;
    } else {
      this.badgeFin = "Tarjetas Alia";
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
    this.SelectFormatCode = this.filtered[0].formatCode;
    //this.defaultNameOption =this.selected.defaultName;

  }



  ngOnInit() {
      this.getFileFormat();
      this.mostrarFormatoBanco();
      this.mostrarBadge();
      this.obtenerResumen();
      this.obtenerDatosPorBancos();
      this.getCheckInFiles();
      this.compararCodigo();
     // this.onOptionsSelected();
      

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
