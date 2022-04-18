import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'header-process',
    templateUrl: './header-process.component.html',
    styleUrls: ['./header-process.component.css']
})
export class HeaderProcessComponent implements OnInit {
    @Input() activarStep;//1 paso1//2paso2
    @Input() titulo;//1 paso1//2paso2
    @Input() subtitulo;//1 paso1//2paso2
    constructor() {

    }

    ngOnInit() {
    }

}
