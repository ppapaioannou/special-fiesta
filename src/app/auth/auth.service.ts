import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterPayload} from "./register-payload";
import {map, Observable} from "rxjs";
import {LoginPayload} from "./login-payload";
import {JwtAuthResponse} from "./jwt-auth-response";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/api/v1/auth/';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  register(request: FormData, accountType: String): Observable<any> {
    return this.httpClient.post(this.url + 'registration/' + accountType, request);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAuthResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('email', data.email);
      //console.log(data.authenticationToken);
      return true;
    }));
  }

  isAuthenticated(): boolean {
    return this.localStorageService.retrieve('email') != null;
  }

  getUsername(): string {
    return this.localStorageService.retrieve('email')
  }

  isPostOwner(username: String): boolean {
    //TODO
    //console.log(this.localStorageService.retrieve('email'))
    return true;
  }

  isOwnUserPage(email: String): boolean {
    return this.localStorageService.retrieve('email') == email;
  }

  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('email');
  }

}
