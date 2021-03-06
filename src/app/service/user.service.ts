import { Injectable } from '@angular/core';
import {LocationPayload} from "../payload/location-payload";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserPayload} from "../payload/user-payload";

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

  updateUserInfo(request: FormData) {
    return this.httpClient.put(this.url + 'update-info', request);
  }

  getAllUsers(userType: string, preview: boolean, searchInput: string): Observable<Array<UserPayload>> {
    let filter = this.url + 'all?search=(userRole:'+userType;
    if (searchInput != "") {
      filter += ' AND ' + searchInput +')';
    }
    else {
      filter += ')'
    }
    filter += '&preview=' + preview
    return this.httpClient.get<Array<UserPayload>>(filter);
  }

  getUser(permalink: Number):Observable<UserPayload> {
    return this.httpClient.get<UserPayload>(this.url + permalink);
  }

  inviteFriend(email : string) {
    return this.httpClient.post<string>(this.url + "ref/" + email, "")

  }

  deleteAccount() {
    return this.httpClient.delete(this.url + 'delete')
  }
}
