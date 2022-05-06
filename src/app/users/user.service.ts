import { Injectable } from '@angular/core';
import {PostPayload} from "../posts/post-payload";
import {LocationPayload} from "../posts/location-payload";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api/v1/users/';

  constructor(private httpClient: HttpClient) {
  }

  updateUserLocation(request: LocationPayload) {
    return this.httpClient.put(this.url + 'update-location', request);
  }
}
