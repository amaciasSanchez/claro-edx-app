export interface Customer {
    customerId: string;
    customerIdSGA: string;
    typeConsult: string;
    personalInformation: PersonalInformation;
    contactInformation: ContactInformation;
}

export interface PersonalInformation {
    identificationType: string;
    identificationNumber: string;
    fullName: string;
    givenNames: string;
    familyNames: string;
    birthday: string;
    nationality?: any;
    gender: string;
}

export interface ContactInformation {
    email: string;
    province: string;
    district: string;
    parish: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    zipCode: string;
}