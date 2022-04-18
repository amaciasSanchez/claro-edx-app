import { Injectable } from '@angular/core';
import { ModalMessageComponent } from './modal-message.component';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModalMessageService {

  private subject= new Subject<any>();

  modal: ModalMessageComponent;

  constructor() { }

  getMessage(): Observable<string>{
    return this.subject.asObservable();
  }

  sendMessage(message: string){
    this.subject.next(message);
  }

  clear(){
    this.subject.next();
  }

  
}
