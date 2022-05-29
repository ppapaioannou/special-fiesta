import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoginPayload} from "../../payload/login-payload";
import {AuthService} from "../../service/auth.service";
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
      next: () => {
        this.router.navigateByUrl('/home')
          .then(() => window.location.reload());
      },
      error: (err) => {
        this.router.navigateByUrl('/login-error')
          .then(() => console.log('error: ' + err.status));
      }
    });
  }
}
