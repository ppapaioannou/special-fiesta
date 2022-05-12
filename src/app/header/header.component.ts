import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;

  constructor(public authService: AuthService) {
    this.username = authService.getUsername();
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
