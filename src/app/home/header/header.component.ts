import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  userId: string;
  unreadNotifications!: number;

  constructor(public authService: AuthService, private notificationService: NotificationService) {
    this.username = authService.getUsername();
    this.userId = authService.getUserId();
  }

  ngOnInit(): void {
    this.notificationService.getNumberOfUnreadNotifications().subscribe(data => {
      this.unreadNotifications = data;
    });
  }

  logout() {
    this.authService.logout();
  }

}
