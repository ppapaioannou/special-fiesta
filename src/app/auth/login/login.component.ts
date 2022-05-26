import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoginPayload} from "../../payloads/login-payload";
import {AuthService} from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
    this.loginPayload = {
      email: '',
      password: ''
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.loginPayload.email = this.loginForm.value.email;
    this.loginPayload.password = this.loginForm.value.password;

    this.authService.login(this.loginPayload).subscribe({
      complete: () => {
        console.log('login success');
      }, error: (err) => {
        this.router.navigateByUrl('/login-error').then(() => console.log('error: ' + err.status));
      }, next: () => {
        this.router.navigateByUrl('/home').then(() => window.location.reload());
      }
    });
  }
}
