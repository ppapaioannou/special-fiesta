import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserPayload} from "../../payload/user-payload";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  changePassword() {

  }

  makeProfilePrivate() {

  }

  deleteAccount() {
    this.userService.deleteAccount().subscribe({
      next: () => {
        //TODO make 'sad to see you go page'
        console.log('Account delete successfully')
        this.authService.logout()
        this.router.navigateByUrl('/').then()
      },
      error: () => {
        console.log('Failure Response')
      }
    });
  }

}
