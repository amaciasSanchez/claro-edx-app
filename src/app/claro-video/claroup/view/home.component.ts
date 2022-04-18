import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../../../breadcrumb.service";
import { SwiperOptions } from "swiper";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
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

    constructor(
        private breadcrumbService: BreadcrumbService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.breadcrumbService.setItems([{ label: "" }]);
    }

    ngOnInit() {}

    accionHandler(accion) {
        if (accion == "OPEN_LOGIN_CUSTOMER") {
            this.router.navigate(["/bestoffer"]);
        }
        if (accion == "OPEN_B2E_CUSTOMER") {
            //this.router.navigate(["/menubot"]);
            console.log("Opción deshabilitada");
        }
        if (accion == "OPEN_ECS") {
            this.router.navigate(["/home2ecs"]);
        }
    }
}
