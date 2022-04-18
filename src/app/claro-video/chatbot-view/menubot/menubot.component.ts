import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-menubot',
  templateUrl: './menubot.component.html',
  styleUrls: ['./menubot.component.css']
})
export class MenubotComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  accionHandler(accion) {
    if (accion == "OPEN_CHAT_BOT") {
        this.router.navigate(["/chatbot-view"]);
    }
    if (accion == "OPEN_B2E") {
        this.router.navigate(["/b2e-register"]);
    }
}

}
