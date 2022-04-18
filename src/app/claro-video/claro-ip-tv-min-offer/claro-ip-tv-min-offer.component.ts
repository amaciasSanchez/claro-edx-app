import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
    Offer,
    BestOfferRequest,
    BestOfferResponse, ConfirmBestOfferRequest,
    IptvService, SessionUserIptv
} from '../../b2e/claroup/service/iptv.service';

@Component({
  selector: 'app-claro-ip-tv-min-offer',
  templateUrl: './claro-ip-tv-min-offer.component.html',
  styleUrls: ['./claro-ip-tv-min-offer.component.css']
})
export class ClaroIpTvMinOfferComponent implements OnInit {

  public oferta: any[] = [];
  offer: Offer;
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

  constructor(private router: Router, private iptvservicio: IptvService) { }

  async ngOnInit() {
      this.clientDataLocalStorage = await this.iptvservicio.getSessionUserIPTV();
      if ((await this.iptvservicio.checkNextPage(this.router.url)) === 1) {
          await this.executeTaskSelectBestOffers();
      } else {
          const responseVariables = await this.iptvservicio
              .getVariablesByProcessInstanceId(localStorage.getItem('processInstanceIdIpTv'));
          console.log(responseVariables.bestOffer);
          this.offer = responseVariables.bestOffer;
     }
  }

    async executeTaskSelectBestOffers() {
        try {
            const bestOfferRequest: BestOfferRequest = {
                processInstanceId: localStorage.getItem('processInstanceIdIpTv')
            };
            const resp: BestOfferResponse = await this.iptvservicio.getBestOffer(bestOfferRequest);
            console.log(resp);
            this.offer = resp.bestOffer;
            await this.iptvservicio.checkNextPage(this.router.url);
        } catch (error) {
            console.log('Error');
            this.showModal('ERROR', error.message);
        }
    }

    async executeTaskConfirmBestOffer(_acceptOffer: boolean) {
        await this.iptvservicio.checkNextPage(this.router.url);
        console.log('confirm best offer');
        if ((await this.iptvservicio.checkNextPage(this.router.url)) === 2) {
            try {
                const confirmBestOfferRequest: ConfirmBestOfferRequest = {
                    processInstanceId: localStorage.getItem('processInstanceIdIpTv'),
                    acceptBestOffer: _acceptOffer
                };
                const resp = await this.iptvservicio.confirmBestOffer(confirmBestOfferRequest);
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

}
