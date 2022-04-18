import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ModalMessageService } from 'src/app/modal-message/modal-message.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pin-management',
  templateUrl: './pin-management.component.html',
  styleUrls: ['./pin-management.component.css']
})
export class PinManagementComponent implements OnInit {
  message;
  @ViewChild('content', { static: true}) content: ElementRef;
  profile: any;
  form = new FormGroup({
    currentPassword:new FormControl('', [Validators.required, Validators.minLength(8)]),
    pin: new FormControl('', [Validators.required,Validators.minLength(6) ])
  });

  constructor(private authService: AuthService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit() {
    this.profile = JSON.parse(sessionStorage.getItem("profile"))
  }

  setUpPIN(){
    const { currentPassword, pin } = this.form.value;
    this.message= "Se configuró de forma exitosa su PIN";
    this.authService.setPin(this.profile["username"], pin, currentPassword)
    .subscribe(resp => {

      this.modalService.open(this.content, {  windowClass: 'transparency-modal'})
    .result.then((result) => {
      this.router.navigateByUrl('/');

    });
    }, err => {
      this.message= "Ocurrio un problema al actualizar su PIN, intente nuevamente";
      if(err['status'] === 401){
        this.message= "La contraseña ingresada es incorrecta";        
      }

      this.modalService.open(this.content, {  windowClass: 'transparency-modal'})
      .result.then((result) => {
  
      });
    })
  }

}
