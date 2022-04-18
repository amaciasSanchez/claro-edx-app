export interface UserInfo{
    "id": string,
    "username": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "gender": string,
    "resetPassword": boolean,
    "forgotPassword": boolean,
    "isEnabled": boolean,
    "birthdate": string,
    "address": string,
    "city": string,
    "province": string,
    "office": string,
    "mobilNumber": string,
    "roles": Array<any>,
    "isPinValid": boolean
  }