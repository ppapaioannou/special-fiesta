import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterSuccessComponent } from './auth/registration/register-success/register-success.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import { PostComponent } from './posts/post/post.component';
import { RegisterAccountTypeSelectionComponent } from './auth/registration/register-account-type-selection/register-account-type-selection.component';
import {HttpClientInterceptor} from "./security/http-client.interceptor";
import { PostTypeSelectionComponent } from './posts/post-type-selection/post-type-selection.component';
import { AddCommentComponent } from './posts/comments/add-comment/add-comment.component';
import { DiscussionComponent } from './posts/comments/discussion/discussion.component';
import { MapComponent } from './map/map.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { NearMeComponent } from './home/near-me/near-me.component';
import { FilterComponent } from './home/filter/filter.component';
import { UserComponent } from './users/user/user.component';
import { ConnectionsComponent } from './users/connections/connections.component';
import { NotificationsComponent } from './users/notifications/notifications.component';
import { CommunityComponent } from './users/community/community.component';
import { ProfileComponent } from './users/profile/profile.component';
import { LoginErrorComponent } from './errors/login-error/login-error.component';
import { RegisterErrorComponent } from './errors/register-error/register-error.component';
import { PostErrorComponent } from './errors/post-error/post-error.component';
import { LocationErrorComponent } from './errors/location-error/location-error.component';
import { HomePageComponent } from './home/homepage/homepage.component';
import { RegisterComponent } from './auth/registration/register/register.component';
import { RegisterHeaderComponent } from './auth/registration/register-header/register-header.component';
import { AddPostComponent } from './posts/add-post/add-post.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterSuccessComponent,
    PostComponent,
    RegisterAccountTypeSelectionComponent,
    PostTypeSelectionComponent,
    AddCommentComponent,
    DiscussionComponent,
    MapComponent,
    NearMeComponent,
    FilterComponent,
    UserComponent,
    ConnectionsComponent,
    NotificationsComponent,
    CommunityComponent,
    ProfileComponent,
    LoginErrorComponent,
    RegisterErrorComponent,
    PostErrorComponent,
    LocationErrorComponent,
    HomePageComponent,
    RegisterComponent,
    RegisterHeaderComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
