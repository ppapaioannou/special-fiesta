import { Injectable } from '@angular/core';
import {PostPayload} from "../posts/post-payload";
import {LocationPayload} from "../posts/location-payload";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserPayload} from "./user-payload";

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

  getUser(permalink: Number):Observable<UserPayload> {
    return this.httpClient.get<UserPayload>(this.url + permalink);
  }

}
