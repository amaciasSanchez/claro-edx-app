import {Component, OnInit} from '@angular/core';
import {PersonService} from '../claroup/service/personservice';
import {Router, NavigationExtras} from '@angular/router';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
    trigger,
    state,
    style,
    animate,
    transition, query, stagger
} from '@angular/animations';
import {PasoService} from 'src/app/b2e/claroup/service/paso.service';
import {UserService} from '../../b2e/claroup/service/user.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from 'src/app/security/auth.service';
import { switchMap } from 'rxjs/operators';
import {iif, of, empty, from, Observable} from 'rxjs';
import { UserInfo } from 'src/app/security/models/userinfo';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
    styleUrls: ['./app.login.componet.css'],
    animations: [
        trigger('carouselAnimation', [
            transition('void => *', [
                style({opacity: 0}),
                animate('4000ms', style({opacity: 1}))
            ]),
            transition('* => void', [
                animate('4000ms', style({opacity: 0}))
            ])
        ])
    ],
    providers: [PersonService, MessageService]
})
export class AppLoginComponent implements OnInit {
    ocultar: boolean = false;
    usuarios: any;
    form: any = {
        usuario: '',
        password: ''
    };
    usuarioLog: any = [{
        nameUser: '',
        name: '',
        gend: ''
    }];
    activeBtn: boolean = false;
    msgs: Message[] = [];
    activeInput: boolean = false;
    isPinValid: boolean = false;
    constructor(private service: MessageService, private personaService: PersonService, private router: Router, config: NgbModalConfig, private modalService: NgbModal, private userService: UserService,
                private pasoService: PasoService, private oauthService: OAuthService, private authService: AuthService) {
        config.backdrop = 'static';
        config.keyboard = true;
        config.centered = true;
        config.container = 'body';
        //this.getInitialToken();

    }

    ngOnInit(): void {
        sessionStorage.clear();
        setInterval(() => {
            this.ocultar = this.ocultar ? false : true;
        }, 4000);




    }

    loginB2E() {
        let respuestaLogin: any = [];
        let body: any = {};
        let usernameLocal = this.form.usuario;

        usernameLocal = usernameLocal.toUpperCase();
        body.headers = {
            Accept: 'application/json',
            username: usernameLocal,
            password: this.form.password,
        };
        body.data = {};
        this.userService.getLogin(body).subscribe((data) => {
            this.usuarios = data;
            respuestaLogin = this.usuarios.response;

            if (typeof respuestaLogin !== 'undefined') {
                if (respuestaLogin.employmentId != null)  {
                    this.pasoService.captureUser = this.form.usuario;
                    this.usuarioLog.name = respuestaLogin.fullname;
                    this.usuarioLog.gend = respuestaLogin.gender;

                }
            } else {
                alert('Problemas de Autenticación');
            }
        });
    }

    login(): void {

        console.log(this.form.usuario +' '+this.form.password)
        this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(this.form.usuario,this.form.password)
        .then(() => {
            sessionStorage.setItem("user", this.oauthService.getIdentityClaims()['preferred_username']);
            this.router.navigate(['/']);
        }).catch(() => {
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '', detail: 'Ha surgido un problema intentelo más tarde.'});
        })

        /*
        let userInfo;
        this.authService.getUserInfo(this.form.usuario)        
        .pipe(
            switchMap(
                (user) => {
                    this.isPinValid = user.isPinValid;
                    console.log("isPinValid "+this.isPinValid)
                    const {username,firstName,lastName,email} = user;
                    const roles = user.roles.map(rol => rol["name"]);
                    userInfo = {
                        username,
                        firstName, 
                        lastName,
                        email,
                        roles
                    };
                    if(user.isEnabled) {
                        return from(this.oauthService.fetchTokenUsingPasswordFlow(this.form.usuario,this.form.password))
                    }
                    return this.authService.forgotPassword(user.username);
                }
            )
        ).subscribe(resp => {


            console.log(resp);
            sessionStorage.setItem("profile", JSON.stringify(userInfo))
            if(resp['access_token']){
                console.log("isPinValid "+this.isPinValid)              
                sessionStorage.setItem("user", this.form.usuario);
                if(!this.isPinValid){
                    console.log('redirect set pin')
                    this.router.navigate(['/setup-pin']);
                }else {                    
                    this.router.navigate(['/']);  
                }
            }else{
                    console.log('redirect update')
                    this.router.navigate(['/update-password'], 
                                        {state: { userInfo }}
                    );
            }

        }, err => {

            

            this.msgs.push({severity: 'error', summary: '', detail: 'Usuario/Contraseña incorrecta. Verifique la información ingresada'});
            console.log(err)
        })*/



        /*
        this.oauthService.fetchTokenUsingPasswordFlowAndLoadUserProfile(this.form.usuario,this.form.password)
        .then(() => {
            this.oauthService.loadUserProfile();
            sessionStorage.setItem("user", this.oauthService.getIdentityClaims()['preferred_username']);
            this.router.navigate(['/']);            
        }).catch(result=> {
            console.log('test');
            console.log(JSON.stringify(result));
            this.msgs = [];
            this.msgs.push({severity: 'error', summary: '', detail: 'Ha surgido un problema intentelo más tarde.'});            
            this.router.navigate(['/update-password']);  

        })*/

       
    }

    controlInput() {
        if (this.form.usuario && this.form.password) {
            this.activeBtn = false;

        } else {
            this.activeBtn = true;
        }
        this.msgs = [];

    }

    open(content) {
        this.modalService.open(content);
    }


    getUserInformation(){
        this.activeInput=true;
        this.authService.getUserInfo(this.form.usuario)
        .subscribe(resp => {
            console.log(resp)
            const { isEnabled } = resp;

        }, err=> {
            console.log(err);
            this.activeInput=false;
            this.msgs.push({severity: 'error', summary: '', detail: 'El usuario no existe'});
        })
    }


    getInitialToken(){
        this.authService.generateToken(this.form.usuario, this.form.password).subscribe(token=> {
            localStorage.setItem('app_access_token', token);
            /*let decoded = jwtDecode(token);
            console.log(decoded);*/

            /*this.authService.getRoles(token, this.form.usuario).subscribe(roles=>{
                localStorage.setItem('app_access_roles', JSON.stringify(roles));
            })*/
        }, err => {
            console.log('error al obtener access token ', err)
        })
    }
}
