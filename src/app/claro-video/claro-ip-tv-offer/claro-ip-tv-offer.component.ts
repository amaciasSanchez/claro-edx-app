import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {Offer} from '../../b2e/claroup/service/iptv.service';

@Component({
  selector: 'app-claro-ip-tv-offer',
  templateUrl: './claro-ip-tv-offer.component.html',
  styleUrls: ['./claro-ip-tv-offer.component.css']
})
export class ClaroIpTvOfferComponent implements OnInit {

  @Input() offer: any;
  @Input() index: number;
  @Output() offerAction: EventEmitter<any> = new EventEmitter<any>();
  activarpopover: any;

  constructor(private router: Router) {
  }
    // tslint:disable-next-line:no-empty
  ngOnInit() {}

  executeOfferAction() {
    this.offerAction.emit();
  }
  btnEntendido(event: any) {
    this.activarpopover = event.closeOverlay;
  }

  activarOverlay() {
    this.activarpopover = !this.activarpopover;
  }
}
