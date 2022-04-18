import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import {
    GetDevicesToInstallRequest,
    GetDevicesToInstallResponse,
    ConfirmDevicesToInstallRequest,
    IptvService, SessionUserIptv
} from '../../b2e/claroup/service/iptv.service';

@Component({
    selector: 'app-claro-ip-tv-device',
    templateUrl: './claro-ip-tv-device.component.html',
    styleUrls: ['./claro-ip-tv-device.component.css'], styles: [`

  .carousel-devices {
      background-color: white;
  }

  .carousel-devices img {
      display: flex;
      margin: auto;
  }

  .carousel-devices .ui-carousel-item {
      max-width: 300px;
  }

  .ui-carousel-dots-container {
      display: none;
  }

  @media (min-width: 990px) {
      .carousel-devices .ui-carousel-items-container {

          justify-content: space-around !important;
          display: flex !important;

      }
  }
`],
})
export class ClaroIpTvDeviceComponent implements OnInit {

    install = false;
    selectedValue = 0;
    activarpopover = false;
    @Input() offer: any = {};
    devices: DevCard[] = [];
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

    responsiveOptions;
    valor: number;

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

    aumentar() {
        console.log('aumenta');
        if (this.selectedValue >= 0 && this.selectedValue < 2) {
            this.selectedValue += 1;
        }
    }
    disminuir() {
        if (this.selectedValue > 0) {
            this.selectedValue -= 1;
        }
    }

    async ngOnInit() {
        this.clientDataLocalStorage = await this.iptvservicio.getSessionUserIPTV();
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 1) {
            await this.executeTaskGetDevicesToInstall();
        } else {
            const responseVariables = await this.iptvservicio
                .getVariablesByProcessInstanceId(localStorage.getItem('processInstanceIdIpTv'));
            await this.fillDevicesData(responseVariables.devicesToInstall, responseVariables.selectedOffer.offerName);
       }
    }

    setSelectedValue(id) {
        this.selectedValue = id;
    }

    async fillDevicesData(_devicesToInstall, _offerName: string) {
        if (_devicesToInstall) {
            let index = 1;
            for (const _deviceToInstall of _devicesToInstall) {
                const _devCard: DevCard = {
                    check: false,
                    id: index,
                    paymentRow: []
                };
                const rowDeviceName = {
                    icon: 'assets/images/claroIpTv/septup.PNG',
                    detalle: _deviceToInstall.shortName,
                };
                const rowBrand = {
                    icon: 'assets/images/claroIpTv/llave.PNG',
                    detalle: _deviceToInstall.productId,
                };
                const rowSerial = {
                    icon: 'assets/images/claroIpTv/barras.PNG',
                    detalle: 'Desconocido',
                };

                const rowOfferName = {
                    icon: 'assets/images/claroIpTv/calendario.PNG',
                    detalle: _offerName,
                };
                const rowDeviceDescription = {
                    icon: 'assets/images/claroIpTv/mano.PNG',
                    detalle: _deviceToInstall.description,
                };

                _devCard.paymentRow.push(rowDeviceName);
                _devCard.paymentRow.push(rowBrand);
                _devCard.paymentRow.push(rowSerial);
                _devCard.paymentRow.push(rowDeviceDescription);
                _devCard.paymentRow.push(rowOfferName);
                this.devices.push(_devCard);
                index += 1;
            }
        }
    }

    /* btnEntendido(event: any) {
       this.activarpopover = event.closeOverlay;
     }*/

    async executeTaskGetDevicesToInstall() {
        try {
            const devicesToInstallRequest: GetDevicesToInstallRequest = {
                processInstanceId: localStorage.getItem('processInstanceIdIpTv')
            };
            const resp: GetDevicesToInstallResponse = await this.iptvservicio.getDevicesToInstall(devicesToInstallRequest);
            console.log(resp);
            const responseVariables = await this.iptvservicio
                .getVariablesByProcessInstanceId(localStorage.getItem('processInstanceIdIpTv'));
            await this.fillDevicesData(resp.devicesToInstall, responseVariables.selectedOffer.offerName);

        } catch (error) {
            console.log('Error');
            this.showModal('ERROR', error.message);
        }
    }

    async executeTaskConfirmDevicesToInstall() {
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 2) {
            try {
                const confirmDevicesToInstallRequest: ConfirmDevicesToInstallRequest = {
                    processInstanceId: localStorage.getItem('processInstanceIdIpTv'),
                    numberOfDecoders: this.selectedValue
                };
                const resp = await this.iptvservicio
                    .confirmDevicesToInstall(confirmDevicesToInstallRequest);
                console.log(resp);
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
        await this.executeTaskConfirmDevicesToInstall();
        await this.iptvservicio.checkNextPage(this.router.url);
    }


}

export interface DevCard {
    paymentRow: DevicesCard[];
    check: boolean;
    id: number;
}

export interface DevicesCard {
    icon: string;
    detalle: string;
}
