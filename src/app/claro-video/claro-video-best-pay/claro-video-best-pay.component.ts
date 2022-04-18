import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ClaroVideoOfferService, Offer } from '../claro-video-offer/claro-video-offer.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-claro-video-best-pay',
  templateUrl: './claro-video-best-pay.component.html',
  styleUrls: ['./claro-video-best-pay.component.css'], styles: [`
`],
  encapsulation: ViewEncapsulation.None
})
export class ClaroVideoBestPayComponent implements OnInit {
  selectedValue = 1;
  activarpopover: boolean = false;
  @Input() offer: any = {};

  offers: PayCard[] = [
    {
      check: true,
      id: 1,
      lines: [
        {
          icon: "assets/images/claroVideo/movil.png",
          nombre: "Servicio Movil",
          detalle: "593993712049"
        },
        {
          icon: "assets/images/claroVideo/factura.png",
          nombre: "",
          detalle: "ABC129483"
        },
        {
          icon: "assets/images/claroVideo/banco.png",
          nombre: "Pichincha",
          detalle: "AHO 948234920"
        },
        {
          icon: "assets/images/claroVideo/calendario.png",
          nombre: "",
          detalle: " 23/Mayo/2020"
        },
        {
          icon: "assets/images/claroVideo/gift.png",
          nombre: "",
          detalle: "Ilimitado Plus"
        }
      ]
    }, {
      check: false,
      id: 2,
      lines: [
        {
          icon: "assets/images/claroVideo/wifi.png",
          nombre: "Claro Hogar",
          detalle: "AYH2049"
        },
        {
          icon: "assets/images/claroVideo/factura.png",
          nombre: "",
          detalle: " XYZ129483          "
        },
        {
          icon: "assets/images/claroVideo/card.png",
          nombre: "Visa",
          detalle: " ********"
        },
        {
          icon: "assets/images/claroVideo/calendario.png",
          nombre: "",
          detalle: " 23/Mayo/2020          "
        },
        {
          icon: "assets/images/claroVideo/gift.png",
          nombre: "",
          detalle: "Claro Hogar 2Play"
        }
      ]
    }
  ];
  responsiveOptions;

  constructor(private activatedRoute: ActivatedRoute, private _offerService: ClaroVideoOfferService,private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1080px',
        numVisible: 2,
        numScroll: 2
      }, {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.activatedRoute.params.subscribe(params => {
      this.offer = _offerService.getOffer(params['id']);

      // console.debug(this.heroe);
    });
  }

  ngOnInit() {
  }

  createRange(number) {
    var itms: number[] = [];
    for (var i = 1; i <= number; i++) {
      itms.push(i);
    }
    return itms;
  }

  setSelectedValue(id) {
    this.selectedValue = id;
  }

  btnEntendido(event: any) {
    this.activarpopover = event.closeOverlay;
  }

  activarOverlay() {
    this.activarpopover = !this.activarpopover;
  }
  continuar() {
    this.router.navigate( ['/claro-video-bpm'] );
  }
}




export interface PayCard {
  lines: LineCard[],
  check: boolean,
  id: number
};


export interface LineCard {
  icon: string,
  nombre: string,
  detalle: string
};



