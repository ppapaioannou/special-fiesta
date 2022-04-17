import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterSuccessComponent } from './auth/registration/register-success/register-success.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import {NgxWebstorageModule} from "ngx-webstorage";
import { AddPostComponent } from './posts/add-post/add-post.component';
import { HttpClientInterceptor } from './security/http-client-interceptor';
import { PostComponent } from './posts/post/post.component';
import { RegisterIndividualComponent } from './auth/registration/register-individual/register-individual.component';
import { RegisterOrganizationComponent } from './auth/registration/register-organization/register-organization.component';
import { RegisterAccountTypeSelectionComponent } from './auth/registration/register-account-type-selection/register-account-type-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterSuccessComponent,
    HomeComponent,
    AddPostComponent,
    PostComponent,
    RegisterIndividualComponent,
    RegisterOrganizationComponent,
    RegisterAccountTypeSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
