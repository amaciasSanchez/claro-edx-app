import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ErrorMessage } from "../../error-message";
@Component({
    selector: "app-bestoffer-view",
    templateUrl: "./bestoffer-view.component.html",
    styleUrls: ["./bestoffer-view.component.css"]
})
export class BestofferViewComponent implements OnInit {
    @Input() item: any;
    @Input() nombreCliente: any;
    @Input() bestofferdata: any;
    @Input() Topics: any;
    @Input() service: any;
    @Input() topicId: any;
    @Output() regresarClick: EventEmitter<any> = new EventEmitter();
    @Output() loadinpage: EventEmitter<any> = new EventEmitter<any>();

    bestOfferData: any = [];
    itemsBreadcrumb: any;
    page: any = "GRID";
    itemDetail: any;
    categorySelected: any;
    arrayOfertas = [];
    nombreCategoria: any = "";
    errorInterface: ErrorMessage;
    constructor() {
        this.bestOfferData = this.bestofferdata;
        this.page = "GRID";
        this.errorInterface = {
            isError: false,
            message: ""
        };
    }

    ngOnInit() {
        console.debug("bestofferdata", this.bestofferdata);
        console.debug(this.topicId);
        console.debug("Topics", this.Topics);
        let findCategoria = this.Topics.topics.filter((t) => {
            console.debug("t.idTopic", t.idTopic);

            return t.idTopic === parseInt(this.topicId);
        })
        console.debug(findCategoria);

        this.nombreCategoria = findCategoria[0].name;
        this.bestOfferData = this.bestofferdata;
        console.debug("BEST");
        let indexImage = 0;
        for (const iterator of this.bestOfferData.orders) {
            for (const i of iterator.orderDetails) {

                if (indexImage <= 2) {
                    i.image = indexImage + ".png"
                } else {
                    i.image = "imagen.jpg"
                }
                indexImage++;
                console.debug("#price", i.price);

                this.arrayOfertas.push(i);
            }
        }
        console.debug(" this.arrayOfertas", this.arrayOfertas);
    }
    regresarclick() {
        this.page = "GRID";
        // this.regresar.emit();
    }

    regresarPersozalizarClick(event: any) {
        console.debug("ZD", event);
        if (event.price >= 0) {
            this.regresarClick.emit({
                price: event.price
            });
        } else {
            if (typeof event.page !== "undefined") {
                if (event.page !== "HIDDEN_BANNER") {
                    this.page = "GRID";
                    this.regresarClick.emit({
                        page: event.page,
                        step: event.step
                    });
                } else {
                    this.regresarClick.emit({
                        page: "HIDDEN_BANNER"
                    });
                }
            }
        }
    }
    onSortChange(event) {
        console.debug("event", event);

        let value = event.value;

        // if (value.indexOf("!") === 0) {
        //     this.sortOrder = -1;
        //     this.sortField = value.substring(1, value.length);
        // } else {
        //     this.sortOrder = 1;
        //     this.sortField = value;
        // }
    }
    personalizar(item) {
        if (this.bestOfferData.orders.length > 0) {
            this.itemDetail = {
                bestOffer: this.bestOfferData,
                infoCliente: JSON.parse(localStorage.getItem("clienteClaroUP")),
                categoria: this.categorySelected
            };
            this.page = "PERSONALIZAR";
            // console.debug("openDetail", item);
            // console.debug("topicId", this.topicId);

            // console.debug("this.Topics.category", this.Topics.category);
            // this.topicId = String(item.idTopic);

        } else {
            this.errorInterface = {
                isError: true,
                message: "No puede contratar seguro, no hay equipos comprados en los últimos 30 días."
            };
        }

    }

    openDetail(item) {
        this.page = "DETAIL";
        console.debug("openDetail", item);
        console.debug("this.Topics.category", this.Topics.category);

        this.itemDetail = {
            bestOffer: this.bestOfferData,
            infoCliente: JSON.parse(localStorage.getItem("clienteClaroUP")),
            categoria: this.categorySelected,
            oferta: item
        };
    }

    loadinpageClick(data: any) {
        this.loadinpage.emit({
            isProcess: data.isProcess,
            aProgressSpinner: data.aProgressSpinner
        });
    }
}
