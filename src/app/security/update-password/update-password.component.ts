import { Component, OnInit, AfterViewInit,  ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalMessageService } from 'src/app/modal-message/modal-message.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OAuthService } from 'angular-oauth2-oidc';
import { mustMatch } from '../util/password.validator';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
  styles: [
    `
    .transparency-modal .modal-content{
      background-color: rgba(0, 0, 0,.0001) !important;
      color: white !important;
  }
  `
  ]
})
export class UpdatePasswordComponent implements OnInit, AfterViewInit  {
  profile;
  message;
  btnLabel = 'Gracias';
  currentState: Observable<any>;
  @ViewChild('content', { static: true}) content: ElementRef;
  form = new FormGroup({});
  


  constructor(private authService: AuthService,
    private oauthService: OAuthService,
    private messageDialogService: ModalMessageService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private fb: FormBuilder) {

      this.profile = JSON.parse(sessionStorage.getItem('profile'));
      
      console.log(this.profile)


      this.form =  fb.group({
        currentPassword:new FormControl('', [Validators.required, Validators.minLength(10)]),
        newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        repeatPassword: new FormControl('', [Validators.required,Validators.minLength(8) ]),
        
      },
      {
        validators: mustMatch('newPassword','repeatPassword')
      }
      );


     }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {

    this.message = `Hola ${this.profile["firstName"]} ${this.profile["lastName"]}, bienvenida a Claro EDX.  Esta es tu primera conexión.  Hemos enviado una credencial temporal a tu correo electrónico a ${this.profile["email"]}             
             Ingresa a tu correo para revisar tu credencial temporal.  
             Deberás cambiar tu credencial aquí para poder disfrutar de tu nueva experiencia digital empresarial.`;

    this.modalService.open(this.content, {  windowClass: 'transparency-modal'})
    .result.then((result) => {

    })
    
  }
    
    

  

  updatePassword(){
    let { currentPassword,newPassword } = this.form.value; 
    console.log(currentPassword);
    this.authService.updatePassword(this.profile["username"], newPassword, currentPassword )
    .subscribe(resp => {
            
      this.btnLabel = 'Comenzar';
      this.message = "Su contraseña fue cambiada con exito."

      this.modalService.open(this.content, {  windowClass: 'transparency-modal'})
    .result.then((result) => {
      //sessionStorage.setItem("user", this.profile["username"]);
        this.router.navigateByUrl('/login');
    })
      
    }, err => {
      
      console.error(err)
      if(err["status"] === 401){
        this.message = "La contraseña temporal es incorrecta o se encuentra expirada"
      }else{
        this.message = "Ocurrio un problema al actualizar la contraseña. Intentelo mas tarde"
      }

      this.modalService.open(this.content, {  windowClass: 'transparency-modal'})
    .result.then((result) => {

    })
      
    })
    
  }


  isValidInput(control: string){
    return this.form.controls[control].invalid &&
    (this.form.controls[control].dirty || this.form.controls[control].touched )
  }

}
