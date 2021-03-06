import {Component} from '@angular/core';
import {BreadcrumbService} from '../../../breadcrumb.service';

@Component({
    templateUrl: "./register.component.html",
    styles: [
        `
            .docs h1 {
                margin-top: 30px;
            }

            .docs pre {
                font-family: monospace;
                background-color: #0c2238;
                color: #dddddd;
                padding: 1em;
                font-size: 14px;
                border-radius: 3px;
                overflow: auto;
            }

            .inline-code {
                background-color: #0c2238;
                color: #dddddd;
                font-style: normal;
                font-size: 13px;
                padding: 0 0.5em;
            }

            .video-container {
                position: relative;
                width: 100%;
                height: 0;
                padding-bottom: 56.25%;
            }

            .video-container iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        `
    ]
})
export class RegisterComponent {
    aProgressSpinner;
    buscar;
    usefulSwiper;
    constructor(private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([{ label: "Documentation" }]);
    }
}
