import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalMessageService } from './modal-message.service';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit, OnDestroy {
  message: string;
  display: boolean = false;
  alertSubscription: Subscription;
  routerSubscription: Subscription;
  constructor(private authMessageService: ModalMessageService,
    private router: Router) { }
    
  ngOnDestroy(): void {
    this.alertSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  ngOnInit() {
    this.alertSubscription = this.authMessageService.getMessage()
    .subscribe(message => {
      if(message !== undefined){
        console.log('Mesage '+ message);
        this.message = message;
        this.display=true;
      }
      
    });


    this.routerSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        this.authMessageService.clear();
      }
    })
  }

  showMessage(){
    this.display = true;
  }

}
