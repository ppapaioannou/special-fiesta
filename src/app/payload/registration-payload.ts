export interface RegistrationPayload {
  //required
  email: string;
  password: string;
  name: string;

  //individual
  lastName: string;

  //organization
  description: string;
  latitude: string;
  longitude: string;
  address: string;
  phoneNumber: string;
  contactEmail:string;
  websiteUrl: string;
  facebookPageUrl: string;
  organizationNeeds: string;
}
