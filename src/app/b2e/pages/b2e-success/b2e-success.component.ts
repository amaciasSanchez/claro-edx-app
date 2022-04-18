import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { PasoService } from "../../claroup/service/paso.service";

@Component({
    selector: "app-b2e-success",
    templateUrl: "./b2e-success.component.html",
    styleUrls: ["./b2e-success.component.css"],
})
export class B2eSuccessComponent implements OnInit {
    //nameUser : string;

    constructor(
        private _pasoService: PasoService,

        private router: Router,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        if (this._pasoService.endFlow == true) {
          this._pasoService.endFlow = false;
          setTimeout(() => {
            this.router.navigate(["/"]);
        }, 30000);
        }else{
          
          this.router.navigate(["/error"]);

        }
        
    }
}
