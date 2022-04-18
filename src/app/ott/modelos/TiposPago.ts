export interface TipoPago {
    id: string,
    paymentMethod: string,
    paymentDescription: string,
    type: string,
    activationDate: string,
    expirationDate: string,
    subscriberId: string,
    subproductId: string,
    serviceNumber: string,
    serviceDescription: string,
    typeService: string,
    invoice: string,
    bank: string,
    pan: string,
    image?: string,
    cssSelected?: Boolean
}