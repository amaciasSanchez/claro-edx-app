import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PersonService } from '../claroup/service/personservice';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-claro-video-activacion-bonus',
  templateUrl: './claro-video-activacion-bonus.component.html',
  styleUrls: ['./claro-video-activacion-bonus.component.css'],
  styles: [`
`],
  encapsulation: ViewEncapsulation.None,
  providers: [PersonService]
})
export class ClaroVideoActivacionBonusComponent implements OnInit {
  responsiveOptions;
  aProgressSpinner;
  retroceder;
  crearProcesoStandAlone;

  metodo;
  selected;

  constructor(private personservice: PersonService,
    private router: Router) {
    this.responsiveOptions = [
      {
        breakpoint: '1240px',
        numVisible: 1,
        numScroll: 1
      }, {
        breakpoint: '1080px',
        numVisible: 1,
        numScroll: 1
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
  }

  peliculas: any[] = [
    {
      "nombre": "Jo Jo Rabbit",
      "fecha": "12/06/2020 13H18",
      "duracion": "Duración; 1:50 mins",
      "visualizado": "Visualizado: 30 mins",
      "cobro": "$3.95",
      "numero": "+593993526475",
      "servicio": "Plan 25 Plus"
    }, {
      "nombre": "Star Wars II",
      "fecha": "12/06/2020 13H18",
      "duracion": "Duración; 1:50 mins",
      "visualizado": "Visualizado: 5 mins",
      "cobro": "$3.95",
      "numero": "+593993526475",
      "servicio": "Plan 25 Plus"
    }
  ];

  setSelectedValue(metodo){

  }


  ngOnInit() {
  }

}
