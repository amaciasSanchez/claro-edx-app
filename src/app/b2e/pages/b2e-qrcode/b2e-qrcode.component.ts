import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

//import { UserService } from "../../claroup/service/user.service";
import { PasoService } from "../../claroup/service/paso.service";

@Component({
    selector: "app-b2e-qrcode",
    templateUrl: "./b2e-qrcode.component.html",
    styleUrls: ["./b2e-qrcode.component.css"],
})
export class B2eQrcodeComponent implements OnInit {
    //-------------VARIABLES GLOBALES----------------

    qrimg: any;
    codimg: string;

    dimen: number = 400;

    usuarios: any = {};

    //nameUser: String = "";

    //-----------------CONSTRUCTOR-------------------

    constructor(
        //private _userService: UserService,
        private _pasoService: PasoService,
        private router: Router,
        private _route: ActivatedRoute
    ) {
        //this.nameUser = _pasoService.captureUser;
    }

    //-----------------------------------------------

    //-----------------------------------------------

    //-------------------NGONINIT--------------------

    ngOnInit() {
        // Si mi usuario es nulo, indefinido o vacío,
        // entonces no voy a poder acceder.

        if (
            this._pasoService.captureUser == "" ||
            this._pasoService.captureUser == null ||
            this._pasoService.captureUser == undefined
        ) {
            this.router.navigate(["/error"]);
            //console.debug("Aquí es el problema" + this._pasoService.captureUser)
        } else {
            // Si logré acceder pero no Acepté Términos y condiciones,
            // Saltará a una página de error.

            //if (this._pasoService.captureCond == false) {
                //console.debug(this._pasoService.captureCond)
                //this.router.navigate(["/error"]);
            //} else if (this._pasoService.captureCond == true){
                // Si cumplo con todos los requisitos,
                // mostrará la página con el código QR

                //this.mostrarQR();

                // Método que convierte el código QR

        let code: string = this._pasoService.captureQR.qr;

        // Si no existe el código entonces saltará un error

        if (code == "" || code == undefined || code == null) {
            this.router.navigate(["/error"]);
            //console.debug("codigo a interpretar" + code);
        } else {
            this.codimg = "data:image/png;base64," + code;
        }

                this._pasoService.captureCond = false;

                this._pasoService.captureUser = "";

                this._pasoService.phoneNumber = "";
                this._pasoService.fullName = "";
                this._pasoService.employmentId = "";
                this._pasoService.mail = "";
                this._pasoService.position = "";
                this._pasoService.firstName = "";
                this._pasoService.lastName = "";
                this._pasoService.licensePlate = "";
                this._pasoService.identification = "";
                this._pasoService.department = "";
                this._pasoService.loggedIn = false;
                this._pasoService.gender = "";

                // Espero 30 segundos para refrescar
                this._pasoService.endFlow = true;

                setTimeout(() => {
                    this.router.navigate(["/b2e-success"]);
                }, (5*60)*1000);
            //}
        }
    }

    //-----------------------------------------------
    //--------------------MOSTRAR EL QR--------------

    /*mostrarQR() {

        // Método que convierte el código QR

        let code: string = this._pasoService.captureQR.qr;

        // Si no existe el código entonces saltará un error

        if (code == "" || code == undefined || code == null) {
            this.router.navigate(["/error"]);
            //console.debug("codigo a interpretar" + code);
        } else {
            this.codimg = "data:image/png;base64," + code;
        }
    }*/

    //-----------------------------------------------
}
