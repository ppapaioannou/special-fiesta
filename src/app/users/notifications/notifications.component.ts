import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {NotificationPayload} from "../../payload/notification-payload";
import {NotificationService} from "../../service/notification.service";

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
    this.notificationService.read(notificationId).subscribe({
      next: () => {
        console.log('notification read successfully')
        window.location.reload();
      },
      error: () => {
        console.log('notification read failed')
      }
    });
  }

  delete(notificationId: string) {
    this.notificationService.delete(notificationId).subscribe({
      next: () => {
        console.log('notification deleted successfully')
        window.location.reload();
      },
      error: () => {
        console.log('notification deletion failed')
      }
    });
  }

}
