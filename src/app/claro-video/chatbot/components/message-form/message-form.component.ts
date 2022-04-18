import {Component, OnInit, Input} from '@angular/core';
import {Message} from '../../models';
import {DialogflowService} from '../../services';

@Component({
    selector: 'message-form',
    templateUrl: './message-form.component.html',
    styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

    @Input('message')
    message: Message;

    @Input('messages')
    messages: Message[];

    constructor(private dialogFlowService: DialogflowService) {
    }

    ngOnInit() {
    }

    public sendMessage(): void {
        this.message.timestamp = new Date();
        this.messages.push(this.message);

        console.debug(this.message, this.messages);


        this.dialogFlowService.getResponseService(this.message.content)
            .subscribe(res => {
                console.debug("row-messaje"+res);
                let  htmlstring: string = res.replace(/(\r\n|\n|\r)/gm, "<br />");
                console.debug("htmlstring "+htmlstring);
                this.messages.push(
                    new Message(htmlstring, 'assets/images/logoclaro.png', 'bot', new Date())
                );
            });

        //Simula respuesta uso de Dummy
        /*this.dialogFlowService.getResponseDummy(this.message.content).subscribe(res => {
            this.messages.push(
                new Message(res, 'assets/images/logoclaro.png', 'bot', new Date())
            );
        });*/

        //TODO descomentar cuando se implemente servicio
        /*this.dialogFlowService.getResponse(this.message.content).subscribe(res => {
           this.messages.push(
              new Message(res, 'assets/images/bot.png', 'bot', new Date())
         );
        });*/

        this.message = new Message('', 'assets/images/login/user.png', 'user');
    }

}
