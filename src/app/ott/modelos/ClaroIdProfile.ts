export interface Address {
  state?: string;
  city?: string;
  type?: string;
  street1?: string;
  street2?: string;
}

export interface ClaroIdProfile {
  profileId?: any;
  identificationType?: string;
  identificationId?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  address?: Address[];
  birthDate?: string;
  claroID?: string;
  subscriberId?: string;
  serviceNumber?: string;
  multiFactorAutentication?: any;
  notifications?: any;
  contactMedium?: any;
  characteristics?: any;
  status?: string;
  creationDate?: string;
  lastUpdate?: string;
}