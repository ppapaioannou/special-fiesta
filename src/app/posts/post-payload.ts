export interface PostPayload{
  animalType: String;
  body: String;
  breed: String;
  colors: String[];
  createdAt: String;
  date: String;
  time: string;
  gender: String;
  id: string;
  microchipNumber: String;
  postType: String;
  size: String;
  thumbnail: any;
  title: String;
  username: String;
  userId: String;

  latitude: String;
  longitude: String;
  address: String;
  distance: number;

  numberOfComments: number;

  actionTaken: string;

  age: string;
  neutered: boolean;
  goodWithChildren: boolean;
  goodWithAnimals: boolean;

  eventAttendees: string;

}
