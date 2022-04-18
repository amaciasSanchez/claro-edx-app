import { Component, OnInit, Input, Output, EventEmitter,ViewEncapsulation } from '@angular/core';
import { ClaroVideoOfferService ,Offer } from './claro-video-offer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claro-video-offer',
  templateUrl: './claro-video-offer.component.html',
  styleUrls: ['./claro-video-offer.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .my-custom-class {
      background: #acafb5f2;
      font-size: 130%;
      width: 400px;
      border-color: transparent;
      color: white;
      border-radius:25px;
    }

    .my-custom-class  .arrow:after {
      border-right-color:#acafb5;
    }
    .popover-body {
      color: white;
    }
    .popover{
      max-width:500px;
    }
  `]
})
export class ClaroVideoOfferComponent implements OnInit {
  @Input() offer: any = {};
  @Input() index: number;
  @Output() offerSeleccionado: EventEmitter<number>;
  constructor(private router: Router) {
    this.offerSeleccionado = new EventEmitter();
  }
  ngOnInit() {


  }
  verOffer() {
    // console.debug(  this.index );
    this.router.navigate( ['/claro-pay', '1'] ,{ state: this.offer });
    // this.heroeSeleccionado.emit( this.index );
  }

}
