import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {NotificationPayload} from "../../payload/notification-payload";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications!: Observable<Array<NotificationPayload>>;
  unreadNotifications!: number;

  constructor(private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.notifications = this.notificationService.getAllNotifications();
    this.notificationService.getNumberOfUnreadNotifications().subscribe(data => {
      this.unreadNotifications = data;
    });
  }

  read(notificationId: string) {
    this.notificationService.read(notificationId).subscribe({
      next: () => {
        console.log('notification read successfully')
        this.ngOnInit();
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
        this.ngOnInit();
      },
      error: () => {
        console.log('notification deletion failed')
      }
    });
  }

}
