export interface Subscription {
    user: User;
    subscriptionInformation: SubscriptionInformation;
    paymentMethods: PaymentMethod[];
    lastInvoiceInformation?: any;
}

export interface User {
    id: string;
    fullName: string;
}

export interface SubscriptionInformation {
    serviceNumber: string;
    subscriptionId: string;
    technology: string;
    paymentType: string;
    paymentDescription: string;
    status: string;
    activeDate: Date;
    properties: Properties;
}

export interface PaymentMethod {
    id: string;
    accounts?: any;
    name: string;
    description: string;
    validFor: ValidFor;
    preferred: boolean;
    type: string;
    status: string;
    statusDate: Date;
    details: Details;
}

export interface Properties {
    subproductId: string;
    subproductDescription: string;
    imsi: string;
    imei: string;
    brand: string;
    model: string;
    iccid: string;
    cutDate: string;
    contractId: string;
    crm: string;
}

export interface ValidFor {
    endDateTime?: any;
    startDateTime: Date;
}

export interface Details {
    accountNumber: string;
    accountNumberType: string;
    owner: string;
    bank?: any;
    brand?: any;
    type?: any;
    cardNumber?: any;
    expirationDate?: any;
    cvv?: any;
    lastFourDigits?: any;
    nameOnCard?: any;
    bic?: any;
}
