import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {NotificationPayload} from "../../payloads/notification-payload";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications!: Observable<Array<NotificationPayload>>;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notifications = this.notificationService.getAllNotifications();
  }

  read(notificationId: string) {
    //this.connectionService.acceptConnection(userId);
    this.notificationService.read(notificationId).subscribe({
      complete: () => {
        console.log('notification read successfully')
      }, error: () => {
        console.log('notification read failed')
      }, next: () => {
        window.location.reload();
      }
    });
  }

  delete(notificationId: string) {
    //this.connectionService.acceptConnection(userId);
    this.notificationService.delete(notificationId).subscribe({
      complete: () => {
        console.log('notification deleted successfully')
      }, error: () => {
        console.log('notification deletion failed')
      }, next: () => {
        window.location.reload();
      }
    });
  }

}
