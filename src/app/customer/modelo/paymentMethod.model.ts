export interface PaymentMethod {
    id: string,
    paymentMethod: string,
    paymentDescription: string,
    type: string,
    activationDate: string,
    expirationDate: string,
    subscriberId: string,
    subproductId: string,
    serviceNumber: string,
    technology?: string,
    serviceDescription: string,
    typeService: string,
    invoice: string,
    contractId: string,
    bank: string,
    pan: string,
    image?: string
}
