import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConnectionPayload} from "../payload/connection-payload";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private url = 'http://localhost:8080/api/v1/connection/';

  constructor(private httpClient: HttpClient) { }

  connect(userId: string) {
    return this.httpClient.post(this.url + 'with/' + userId, '');
  }

  getAllConnections(connectionType: string): Observable<Array<ConnectionPayload>> {
    return this.httpClient.get<Array<ConnectionPayload>>(this.url + connectionType);
  }

  isConnectedTo(userId: string) {
    return this.httpClient.get(this.url + 'status/' + userId, {responseType: 'text'})
  }

  acceptConnection(userId: string) {
    return this.httpClient.put(this.url + 'accept/' + userId, '');
  }

  declineConnection(userId: string) {
    return this.httpClient.delete(this.url + 'decline/' + userId);
  }

  deleteConnection(userId: string) {
    return this.httpClient.delete(this.url + 'delete/' + userId);
  }
}
