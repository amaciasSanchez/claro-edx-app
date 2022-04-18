import {Component, OnInit, ViewEncapsulation, ViewChild} from "@angular/core";
import {BreadcrumbService} from "../../breadcrumb.service";
import {Message} from '../chatbot/models';

@Component({
    selector: "app-chatbot-view",
    templateUrl: "./chatbot-view.component.html",
    styleUrls: ["./chatbot-view.component.css"],
    encapsulation: ViewEncapsulation.None
})
export class ChatbotViewComponent implements OnInit {
    public message: Message;
    public messages: Message[];


    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([{label: "Chatbot"}]);
        this.message = new Message('', 'assets/images/login/user.png', 'user');
        this.messages = [
            new Message('Bienvenido a CLARO EDX,', 'assets/images/logoclaro.png', 'bot', new Date()),
            new Message('¿En qué puedo ayudarte?', 'assets/images/logoclaro.png', 'bot', new Date())
        ];
    }

    ngOnInit() {

    }
}
