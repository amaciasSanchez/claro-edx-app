import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'slider-app',
  templateUrl: './slider-app.component.html',
  styleUrls: ['./slider-app.component.css']
})
export class SliderAppComponent implements OnInit {
    config: SwiperOptions = {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        spaceBetween: 30
    };
  constructor() { }

  ngOnInit() {
  }

}
