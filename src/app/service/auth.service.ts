import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LoginPayload} from "../payload/login-payload";
import {JwtAuthResponse} from "../payload/jwt-auth-response";
import {LocalStorageService} from "ngx-webstorage";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/api/v1/auth/';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }

  register(request: FormData, accountType: String, refLink: string): Observable<any> {
    if (refLink != "") {
      return this.httpClient.post(this.url + 'ref/registration/' + refLink +"/" + accountType, request);
    }
    return this.httpClient.post(this.url + 'registration/' + accountType, request);
  }

  login(loginPayload: LoginPayload): Observable<boolean> {
    return this.httpClient.post<JwtAuthResponse>(this.url + 'login', loginPayload).pipe(map(data => {
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('email', data.email);
      this.localStorageService.store('id', data.id);
      this.localStorageService.store('role', data.role);
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

  getUserId(): string {
    return this.localStorageService.retrieve('id')
  }

  getUserRole(): string {
    return this.localStorageService.retrieve('role')
  }

  /*
  isPostOwner(username: String): boolean {
    //TODO
    //console.log(this.localStorageService.retrieve('email'))
    return true;
  }
  */

  isOwnUserPage(email: String): boolean {
    return this.localStorageService.retrieve('email') == email;
  }

  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('email');
    this.router.navigateByUrl('/').then()
  }

}
