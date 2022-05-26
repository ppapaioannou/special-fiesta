import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  userId: string;

  constructor(public authService: AuthService) {
    this.username = authService.getUsername();
    this.userId = authService.getUserId();
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
