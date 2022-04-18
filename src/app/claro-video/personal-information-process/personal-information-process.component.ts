import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { Customer } from 'src/app/customer/modelo/customer.model';
import { CustomerInformationService } from 'src/app/customer/services/customer-information/customer-information.service';

@Component({
    selector: 'personal-information-process',
    templateUrl: './personal-information-process.component.html',
    styleUrls: ['./personal-information-process.component.css']
})
export class PersonalInformationProcessComponent implements OnInit {
    cliente: Customer;

    @Output() sendIdentificationNumber = new EventEmitter<string>();

    constructor(private customerInformationService: CustomerInformationService) { }

    ngOnInit() {
        this.cliente = <Customer> this.customerInformationService.getCustomerInformation(); 
        this.sendIdentificationNumber.emit(this.cliente.personalInformation.identificationNumber);
        let fechaNacimiento = "";
        if (this.cliente.personalInformation.birthday) {
            fechaNacimiento = moment(this.cliente.personalInformation.birthday).utc().format("DD MMMM YYYY")
            this.cliente.personalInformation.birthday = fechaNacimiento;
        } else
            this.cliente.personalInformation.birthday = "";
    }

}
