import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment'
@Component({
    selector: "app-content-view-tres-sesenta",
    templateUrl: "./content-view-tres-sesenta.component.html",
    styleUrls: ["./content-view-tres-sesenta.component.css"],
    providers: [NgbModalConfig, NgbModal]
})
export class ContentViewTresSesentaComponent implements OnInit {
    @Input() title;
    @Input() tipo;
    @Input() data;
    @Output() selectedServices: EventEmitter<any> = new EventEmitter<any>();
    items;
    showModal: boolean = false;
    detalleItem: any = {};
    constructor(config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = "static";
        config.keyboard = false;
        config.centered = true;
        config.container = "body";
        this.detalleItem = {
            subscriptionInformation: {}
        };
    }

    ngOnInit() {
        this.detalleItem = {
            subscriptionInformation: {}
        };
        this.showModal = false;
        if(this.data.subscriptions){
            this.data.subscriptions.forEach(element => {
                element.open = false;
                element.serviceSelected = false;
            });
        }


        let fechaNacimiento = "";
        if (this.data.personalInformation.birthday) {
            fechaNacimiento = moment(this.data.personalInformation.birthday).utc().format("YYYY/MM/DD")
            this.data.personalInformation.fechaNacimiento = fechaNacimiento;
        } else
            this.data.personalInformation.fechaNacimiento = "";
    }

    seleccionarService(item) {
        console.debug("item", item);
        let itemSelected = [];
        this.data.subscriptions.forEach(element => {
            if (
                element.subscriptionInformation.serviceNumber ===
                item.subscriptionInformation.serviceNumber
            ) {
                console.debug("SERVICE SELECTED");

                // this.detalleItem .serviceSelected = true;
                if (element.serviceSelected) element.serviceSelected = false;
                else element.serviceSelected = true;
                console.debug("element.serviceSelected", element.serviceSelected);

                if (element.serviceSelected) {
                    itemSelected = element;
                    this.selectedServices.emit({
                        serviceSelected: itemSelected,
                        disabled: false
                    });
                } else {
                    this.selectedServices.emit({
                        serviceSelected: itemSelected,
                        disabled: true
                    });
                }
            } else {
                // item.serviceSelected = false;
                element.serviceSelected = false;
            }
        });

        // this.detalleItem = item;
        this.closeModal();
    }

    opendetailItem(item) {
        console.debug("item", item);
        this.data.subscriptions.forEach(element => {
            if (
                element.subscriptionInformation.serviceNumber ===
                item.subscriptionInformation.serviceNumber
            ) {
                item.open = true;
                element.open = true;
            } else {
                item.open = false;
                element.open = false;
            }
        });

        this.detalleItem = item;
        this.showModal = true;
        // this.modalService.open(item);
    }
    closeModal() {
        this.showModal = false;
    }
    open(content) {
        this.modalService.open(content);
    }
}
