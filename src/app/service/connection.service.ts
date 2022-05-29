import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserPayload} from "../payload/user-payload";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private url = 'http://localhost:8080/api/v1/connection/';

  constructor(private httpClient: HttpClient) { }

  connect(userId: string) {
    return this.httpClient.post(this.url + 'with/' + userId, '');
  }

  deleteConnection(userId: string) {
    return this.httpClient.delete(this.url + 'delete/' + userId);
  }

  getAllFriendRequests(): Observable<Array<UserPayload>> {
    return this.httpClient.get<Array<UserPayload>>(this.url + 'friend-requests');
  }

  getAllFriends(): Observable<Array<UserPayload>> {
    return this.httpClient.get<Array<UserPayload>>(this.url + 'friends');
  }

  getAllOrganizations(): Observable<Array<UserPayload>> {
    return this.httpClient.get<Array<UserPayload>>(this.url + 'organizations');
  }

  getAllFollowers(): Observable<Array<UserPayload>> {
    return this.httpClient.get<Array<UserPayload>>(this.url + 'followers');
  }

  acceptConnection(userId: string) {
    return this.httpClient.put(this.url + 'accept/' + userId, '');
  }

  isConnectedTo(userId: string): Observable<any> {
    return this.httpClient.get(this.url + 'is-connected-to/' + userId);
  }
}
