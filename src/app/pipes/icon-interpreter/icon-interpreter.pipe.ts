import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iconInterpreter'
})
export class IconInterpreterPipe implements PipeTransform {

  transform(value: string, type: string): string {
    if(value !== undefined && type !== undefined) {
      switch(type) {
        case 'PAYMENT_METHOD':
          return this.interpretPaymentMethod(value);
        case 'SUBSCRIPTION_TYPE':
          return this.interpretSubscriptionType(value);
        default:
          return null;
      }
    } 
    return null;
  }

  interpretSubscriptionType(subscriptionType: string): string {
    switch(subscriptionType) {
      case 'AUT':
      case 'PPA':
      case 'TAR':
        return 'assets/images/icons/products/phone.png';
      case 'INT.WTTX':
      case 'INT.GPON':
        return 'assets/images/icons/products/wifi.png';
      default: 
        return 'assets/images/icons/products/phone.png';
    }
  }

  interpretPaymentMethod(paymentMethod: string): string {
    switch(paymentMethod) {
      case 'Contrafactura':
        return 'assets/images/icons/products/invoice.png';
      case 'Tarjeta de Crédito':
      case 'bankCard':
        return 'assets/images/icons/products/card.png';
      case 'Cuenta Bancaria':
      case 'bank':
      case 'bankAccountDebit':
        return 'assets/images/icons/products/bank.png';
      case 'Cheque':
        return 'assets/images/icons/products/check.png';
      case 'cash': 
        return 'assets/images/icons/products/cash.png';        
      default: 
        return 'assets/images/icons/products/cash.png';        
    }
  }

}
