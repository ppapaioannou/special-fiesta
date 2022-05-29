export interface PostPayload {
  //common
  id: string;
  title: string;
  body: string;
  postType: string;
  createdAt: string;
  numberOfComments: number;
  date: string;
  thumbnail: string;
  address: string;
  latitude: string;
  longitude: string;
  distance: number;
  username: string;
  userId: string;

  //animal characteristics
  animalType: string;
  breed: string;
  gender: string;
  size: string;
  colors: string[];
  age: string;
  microchipNumber: string;
  neutered: boolean;
  goodWithAnimals: boolean;
  goodWithChildren: boolean;
  actionTaken: string;

  //event appProperties
  time: string;
  eventAttendees: string;
  //private String address;
}
