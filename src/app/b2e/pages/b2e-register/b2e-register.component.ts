import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../claroup/service/user.service";
import {PasoService} from "../../claroup/service/paso.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {SelectItem} from 'primeng/primeng';

@Component({
    selector: "app-b2e-register",
    templateUrl: "./b2e-register.component.html",
    styleUrls: ["./b2e-register.component.css"],
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal],
})
export class B2eRegisterComponent implements OnInit {
    /*
     *************INFO POP UP
     */
    titulo: string;
    descripcion: string;

    errBlock: Boolean;
    errorText: string;

    countries: SelectItem[];
    selectedCountry: string;

    /*
     *************DATOS DE LOGIN
     */
    @Input() usuarioLog: any;

    /*
     *************ARREGLO DE PRUEBA
     */
    usuarios: any = [];

    /*
     *****************NOMBRE DE USUARIO DE PRUEBA
     */
    nameUser: String = "";

    nuevaPlaca: string; //capturo placa

    textoReact: string = "ejemplo : 593999999999";
    colorReact: string = "gray";

    nuevoCelu: string; //capturo celular
    nuevoToken: string; //nuevoToken
    celEstructura: string = "";
    plaEstructura: string = "";

    ocultarDiv: boolean = false;
    darBienvenida: boolean = true;
    antesQR: boolean = false;
    cambiarTelefono: boolean = false;
    aceptoTerminos: boolean = false;
    aceptoToken: boolean = false;

    validar: boolean = false;

    modalPlaca: boolean = false;

    imagenRegistro: String;

    qrimg: any;

    //---------------------------------------------------------
    //------------CONSTRUCTOR----------------------------------

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private _userService: UserService,
        private _pasoService: PasoService,
        private router: Router,
        private _route: ActivatedRoute
    ) {

        this.nameUser = this._route.snapshot.paramMap.get("id");
        this.nameUser = this._pasoService.captureUser;

        if (this.nameUser == null || this.nameUser == '') {
            this.nameUser = sessionStorage.getItem("user");

        }

        //this.nameUser = 'gproano';

        this.countries = [
            {label: '593', value: '593'}
        ];

    }

    //------------------------------------------------------------------

    //-----------------------------ngOnInit-----------------------------

    ngOnInit() {
        if (
            this.nameUser == "" ||
            this.nameUser == null ||
            this.nameUser == undefined
        ) {
            this.router.navigate(["/error"]);
        } else {
            this.obtenerDatosUsuarios();
        }

        this.selectedCountry = '593';
    }

    //-----------------CAMBIAR NÚMERO DE CELULAR-------------------

    //=============================================================
    //========= ESTE MÉTODO VALIDA LA CADENA DE NÚMEROS INGRESADOS
    //========= CON UNA EXPRESIÓN REGULAR QUE CUMPLE LAS CONDICIONES
    //========= PARA SER CONSIDERADO COMO UN NÚMERO CELULAR
    //========= Luis Arcángel Farro

    cambiarTelefonoCelular(celular: string): boolean {
        //console.debug("Método cambiarTelefonoCelular");

        //======= DECLARO VARIABLES LOCALES EN EL MÉTODO

        let exp = new RegExp("^(5)+(9)+(3)+(9)+[0-9]{8}$");

        let val = exp.test(celular);

        //===============================================

        if (val == true) {
            this._pasoService.phoneNumber = celular;
        } else if (val == false) {
            /*this.textoReact = "Debe ingresar un número válido ejemplo : 593999999999";
      this.colorReact = "red";*/

            this.titulo = "";
            this.descripcion = "Debe ingresar un número celular válido";

            this.validar = true;
        }

        return val;
    }

    //------------------------------------------------------------
    //-----------------CAMBIAR NÚMERO DE CELULAR-------------------

    //=============================================================
    //========= ESTE MÉTODO VALIDA LA CADENA DE NÚMEROS INGRESADOS
    //========= CON UNA EXPRESIÓN REGULAR QUE CUMPLE LAS CONDICIONES
    //========= PARA SER CONSIDERADO COMO UN NÚMERO CELULAR
    //========= Luis Arcángel Farro

    cambiarPlacaVehiculo(placa: string): boolean {
        //console.debug("Método cambiarPlacaVehículo");

        // ====== DECLARO VARIABLES LOCALES EN EL MÉTODO

        //let exp = new RegExp("^[A-Za-z]{7}$");
        let exp = new RegExp("^[A-Za-z]{3}+(?:-[0-9]{4})$");
        let val = exp.test(placa);

        // ==============================================

        if (val == true) {
            placa = this._pasoService.licensePlate;

            //console.debug("Actualicé mi placa a: " + placa);
        } else if (val == false) {
            //console.debug("Debe ingresar correctamente la placa");
            this.titulo = "";
            this.descripcion =
                "Debe ingresar correctamenta la placa. Ejemplo : ABC-1234";

            //----------------------------------------------------------------

            this.validar = true; // Si no aceptó términos despliega Modal
        }

        return val;
    }

    //----------------------------------------------------
    //----------------INGRESO DE TOKEN---------------------

    //=====================================================
    //========= SE DECIDIÓ EN REUNIÓN QUE YA NO SE INGRESA
    //========= CON UN TOKEN ENVIADO POR SMS
    //========= Luis Arcángel Farro

    //-------------------------------------------------------------------
    //-------------------Cambiar imagen----------------------------------
    /*cambiarImagen() {
        if (this.usuarios.gender == "1") {
            this.imagenRegistro = "6";
        } else if (this.usuarios.gender == "2") {
            this.imagenRegistro = "3";
        } else {
            this.imagenRegistro = "2";
        }
    }*/

    //-------------------Funcionalidad del botón registro----------------
    iniciarRegistro() {
        this.darBienvenida = false;
        this.ocultarDiv = true;
    }

    //---------------------------Siguiente Paso-----------------------
    siguientePaso() {
        //==================================================================
        //========= VALIDACIÓN DE SIGUIENTE PASO V.2.

        if (this.aceptoTerminos == false) {
            //----------------------------------------------------------------

            this.titulo = "";
            this.descripcion =
                "Debes aceptar los términos y condiciones para poder utilizar CLARO EDX.";

            //----------------------------------------------------------------

            this.validar = true; // Si no aceptó términos despliega Modal
        } else {
            this.nuevoCelu.replace('593', '');
            this.nuevoCelu = '593' + this.nuevoCelu;
            if (this.cambiarTelefonoCelular(this.nuevoCelu) == true) {
                //Generar código QR

                let gqr: any = {};

                this._userService
                    .getGeneratedQR({
                        encrypt: true,
                        format: "PNG",
                        height: 400,
                        parameters: {
                            "employmentId": this._pasoService.employmentId,
                            "firstName": this._pasoService.firstName,
                            "lastName": this._pasoService.lastName,
                            "fullName": this._pasoService.fullName,
                            "identification": this._pasoService.identification,
                            "mail": this._pasoService.mail,
                            "phoneNumber": this._pasoService.phoneNumber,
                            "department": this._pasoService.department,
                            "position": this._pasoService.position,
                            "licensePlate": this._pasoService.licensePlate,
                            "gender": this._pasoService.gender,
                            "loggedIn": this._pasoService.loggedIn
                        },
                        width: 400,
                    })
                    .subscribe(
                        (data) => {
                            gqr = data;

                            //=========================================

                            if (gqr.code == "200") {
                                this._pasoService.captureQR = gqr.response;


                                //console.debug(this._pasoService.captureQR);

                                //----------------------------------------------------------------

                                this.titulo = "";
                                this.descripcion =
                                    "Para tu seguridad, te hemos enviado un SMS con un PIN de seguridad a tu número móvil, necesitas ingresarlo en la aplicación móvil CLARO EDX. Esto nos permitirá confirmar que eres el dueño de esa línea. Si tu teléfono móvil es de otra operadora tu PIN de seguridad te llegará al correo institucional.";

                                this.validar = true;
                                this.ocultarDiv = false;

                                //this.router.navigate(["/b2e-qrcode",this.nameUser]);

                                //----------------------------------------------------------------

                                this.antesQR = true;
                                this.imagenRegistro = "2";

                                //-----------------------------------------------------------------
                            }
                        },
                        (error) => {
                            this.errBlock = true;
                            this.errorText = error.status;

                            if (this.errorText == "409") {
                                this.titulo = "";
                                this.descripcion =
                                    "Debe ingresar un número celular válido para continuar";

                                this.validar = true;
                            }
                        }
                    );
            }
        }
    }

    //----------------------------------------------------------------
    //-------------------CONTINUAR------------------------------------

    continuar() {
        this.aceptoTerminos = this._pasoService.captureCond;
        this.router.navigate(["/b2e-qrcode"]);
    }

    //----------------------------------------------------------------
    //-------------------OBTENER USUARIOS-----------------------------

    obtenerDatosUsuarios() {
        let respuesta: any = [];
        let body: any = {};

        body.headers = {
            Accept: "application/json",
            username: this.nameUser,
            password: "",
        };
        body.data = {};

        this._userService.getLogin(body).subscribe((data) => {
            respuesta = data;
            this.usuarios = respuesta.response;
            //---------------------------------------------//
            let obtenerCel: string = this.usuarios.phoneNumber;
            let obtenerPla: string = this.usuarios.licensePlate;

            //ASIGNAR VALORES
            this.celEstructura = obtenerCel.substring(1, 10);
            this.nuevoCelu = this.celEstructura;
            this.plaEstructura = obtenerPla;

            this._pasoService.phoneNumber = this.celEstructura; // Numero Celular --------------------------- si se modifica
            this._pasoService.fullName = this.usuarios.fullName; // Nombre Completo ------------------------- no se modifica
            this._pasoService.employmentId = this.usuarios.employmentId; // ID del Empleado ----------------- no se modifica
            this._pasoService.mail = this.usuarios.mail; // Mail -------------------------------------------- no se modifica
            this._pasoService.position = this.usuarios.position; // Cargo del Empleado ---------------------- no se modifica
            this._pasoService.firstName = this.usuarios.firstName; // Nombres ------------------------------- no se modifica
            this._pasoService.lastName = this.usuarios.lastName; // Apellidos ------------------------------- no se modifica
            this._pasoService.licensePlate = this.plaEstructura; // Placa de Vehículo ----------------------- si se modifica
            this._pasoService.identification = this.usuarios.identification; // Cedula de Identidad --------- no se modifica
            this._pasoService.department = this.usuarios.department; // Departamento ------------------------ no se modifica
            this._pasoService.loggedIn = this.usuarios.loggedIn; // Logged In ------------------------------- no se modifica
            this._pasoService.gender = this.usuarios.gender; // Género -------------------------------------- no se modifica

            //this.cambiarImagen();

            if (this.usuarios.gender == "1") {
                this.imagenRegistro = "6";
            } else if (this.usuarios.gender == "2") {
                this.imagenRegistro = "3";
            } else {
                this.imagenRegistro = "2";
            }
        });
    }

    //----------------------------------------------------------------
}
