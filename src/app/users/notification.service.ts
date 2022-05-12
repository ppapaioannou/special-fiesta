import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserPayload} from "./user-payload";
import {NotificationPayload} from "./notification-payload";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = 'http://localhost:8080/api/v1/notifications/';

  constructor(private httpClient: HttpClient) { }

  getAllNotifications(): Observable<Array<NotificationPayload>> {
    return this.httpClient.get<Array<NotificationPayload>>(this.url);
  }

  read(notificationId: string) {
    return this.httpClient.put(this.url + notificationId, '');
  }

  delete(notificationId: string) {
    return this.httpClient.delete(this.url + notificationId);
  }
}
