import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import {
    AvailableDate,
    GetAvailableDatesResponse,
    IptvService,
    SessionUserIptv
} from '../../b2e/claroup/service/iptv.service';

@Component({
  selector: 'app-claro-ip-tv-instal-date',
  templateUrl: './claro-ip-tv-instal-date.component.html',
  styleUrls: ['./claro-ip-tv-instal-date.component.css'],
})
export class ClaroIpTvInstalDateComponent implements OnInit {

    calendarDate: string;
    minDateValue: Date;
    maxDateValue: Date;
    selectedAvaliableDate: AvailableDate;
    avaliableDates: AvailableDate[];
    disabledDates: Date[];
    modal: any = {
        message: '',
        type: '',
        visible: false
    };
    modalWithAction: any = {
        message: '',
        type: '',
        visible: false
    };
    clientDataLocalStorage: SessionUserIptv;
    selectedValue = '08:00';
    activarpopover = false;
    @Input() hora: any = {};
    horas: Horas[] = [];
    responsiveOptions;

    constructor(private router: Router, private iptvservicio: IptvService) {
        this.responsiveOptions = [
            {
                breakpoint: '1080px',
                numVisible: 2,
                numScroll: 2
            }, {
                breakpoint: '1024px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '768px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '480px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    async ngOnInit() {
        console.log('init');
        this.clientDataLocalStorage = await this.iptvservicio.getSessionUserIPTV();
        await this.processHours(true, true);
        this.calendarDate = new Date().toISOString().slice(0, 10);
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 1) {
            await this.executeTaskGetAvailableDates();
        }
        const responseVariables = await this.iptvservicio
            .getVariablesByProcessInstanceId(localStorage.getItem('processInstanceIdIpTv'));
        if (responseVariables && responseVariables.availableDates) {
            this.avaliableDates = responseVariables.availableDates;
            await this.processCalendarDates();
        }
    }

    async processCalendarDates() {
        if (this.avaliableDates) {
            await this.avaliableDates.forEach(availableDate => {
                if (availableDate.date) {
                    availableDate.dtoDate = new Date(availableDate.date);
                }
            });
            await this.avaliableDates.sort(
                (a, b) =>
                    (a.dtoDate > b.dtoDate) ? 1 : -1);
            for (const availableDate of this.avaliableDates) {
                if (availableDate.dtoDate) {
                    const _itemDate = availableDate.dtoDate;
                    if (!this.minDateValue && !this.maxDateValue) {
                        this.minDateValue = _itemDate;
                        this.maxDateValue = _itemDate;
                    } else {
                        if (_itemDate > this.maxDateValue) {
                            this.maxDateValue = _itemDate;
                        }
                        if (_itemDate < this.minDateValue) {
                            this.minDateValue = _itemDate;
                        }
                    }
                }
            }
            this.disabledDates = await this.getDatesBetweenDates(this.minDateValue, this.maxDateValue);
            await this.avaliableDates.forEach(availableDate => {
                const _indexDate = this.disabledDates.find(a => a.getDate() === availableDate.dtoDate.getDate());
                const idx = this.disabledDates.indexOf(_indexDate);
                if (_indexDate) {
                    this.disabledDates.splice(idx, 1);
                }
                if (availableDate.date) {
                    availableDate.dtoDate = new Date(availableDate.date);
                }
            });
        }
    }

    async getDatesBetweenDates(startDate, endDate) {
        let dates = [];
        const theDate = new Date(startDate);
        while (theDate < endDate) {
            const _date = new Date(theDate);
            dates = [...dates, _date];
            theDate.setDate(theDate.getDate() + 1);
        }
        dates = [...dates, endDate];
        return dates;
    }

    async processHours(_matutine: boolean, _vespertine: boolean) {
        console.log('llenando horas');
        const matutine: Horas[] = [
            {
                check: false,
                valor: '08:00',
                shift: 'M',
                timeRange: '8-13'
            },
            {
                check: false,
                valor: '09:00',
                shift: 'M',
                timeRange: '8-13'
            },
            {
                check: false,
                valor: '10:00',
                shift: 'M',
                timeRange: '8-13'
            },
            {
                check: false,
                valor: '11:00',
                shift: 'M',
                timeRange: '8-13'
            },
            {
                check: false,
                valor: '12:00',
                shift: 'M',
                timeRange: '8-13'
            },
            {
                check: false,
                valor: '13:00',
                shift: 'M',
                timeRange: '8-13'
            }
        ];

        const vespertine: Horas[] = [
            {
                check: false,
                valor: '14:00',
                shift: 'V',
                timeRange: '14-18'
            },
            {
                check: false,
                valor: '15:00',
                shift: 'V',
                timeRange: '14-18'
            },
            {
                check: false,
                valor: '16:00',
                shift: 'V',
                timeRange: '14-18'
            },
            {
                check: false,
                valor: '17:00',
                shift: 'V',
                timeRange: '14-18'
            },
            {
                check: false,
                valor: '18:00',
                shift: 'V',
                timeRange: '14-18'
            }
        ];
        if (this.horas) {
            this.horas = [];
        }
        if (matutine) {
            this.horas.push(...matutine);
        }
        if (vespertine) {
            this.horas.push(...vespertine);
        }
    }

    async executeTaskGetAvailableDates() {
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 1) {
            try {
                const paymentMethodsResponse: GetAvailableDatesResponse =
                    await this.iptvservicio.getAvailableDates(localStorage.getItem('processInstanceIdIpTv'));
                if (paymentMethodsResponse && paymentMethodsResponse.availableDates) {
                    this.avaliableDates = paymentMethodsResponse.availableDates;
                    await this.processCalendarDates();
                }
            } catch (error) {
                console.log('Error');
                this.showModal('ERROR', error.message);
            }
        }
    }

    async executeTaskConfirmAvailableDate() {
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 2) {
            if (!this.selectedAvaliableDate) {
                this.showModal('ERROR', 'No hay fecha seleccionada');
                return;
            }
            try {
                const resp = await this.iptvservicio.confirmAvailableDates(
                    localStorage.getItem('processInstanceIdIpTv'),
                    this.selectedAvaliableDate);
                console.log(resp);
                await this.iptvservicio.checkNextPage(this.router.url);
            } catch (error) {
                console.log('Error');
                this.showModal('ERROR', error.message);
            }
        }
    }

    showModal(_type: string, _message: string) {
        this.modal = {
            message: _message,
            type: _type,
            visible: true
        };
    }

    showModalWithAction(_type: string, _message: string) {
        this.modalWithAction = {
            message: _message,
            type: _type,
            visible: true
        };
    }

    hideModal() {
        this.modal.visible = false;
    }

    async continue() {
        console.log('Entro en el metodo continnuar siguiente pantalla');
        if (!this.selectedAvaliableDate) {
            this.showModal('ERROR', 'No hay fecha seleccionada');
            return;
        }
        await this.executeTaskConfirmAvailableDate();
        await this.iptvservicio.checkNextPage(this.router.url);
    }

    btnEntendido(event: any) {
        this.activarpopover = event.closeOverlay;
    }

    setSelectedValue(id: Horas) {
        console.log('valorseleccionado');
        this.selectedValue = id.valor;
        this.selectedAvaliableDate = {
            date: this.calendarDate,
            shift: id.shift,
            timeRange: id.timeRange
        };
    }

}

export interface Horas {
    check: boolean;
    valor: string;
    shift: string;
    timeRange: string;
}

