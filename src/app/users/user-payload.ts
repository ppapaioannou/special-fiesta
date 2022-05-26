export interface UserPayload {
  //common
  id: string;
  name: string;
  accountType: string;
  email: string;
  profileImage: any;
  phoneNumber: string
  description: string
  communityStanding: string;

  //individual
  lastName: string;
  dateOfBirth: string;

  //organization
  contactEmail: string;
  websiteUrl: string;
  facebookPageUrl: string;
  organizationNeeds: string;
}
