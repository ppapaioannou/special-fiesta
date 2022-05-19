import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterSuccessComponent } from './auth/registration/register-success/register-success.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import { SimplePostComponent } from './posts/add-post/simple-post/simple-post.component';
import { PostComponent } from './posts/post/post.component';
import { RegisterIndividualComponent } from './auth/registration/register-individual/register-individual.component';
import { RegisterOrganizationComponent } from './auth/registration/register-organization/register-organization.component';
import { RegisterAccountTypeSelectionComponent } from './auth/registration/register-account-type-selection/register-account-type-selection.component';
import {HttpClientInterceptor} from "./security/http-client.interceptor";
import { PostTypeSelectionComponent } from './posts/add-post/post-type-selection/post-type-selection.component';
import { MissingPostComponent } from './posts/add-post/missing-post/missing-post.component';
import { AdoptionPostComponent } from './posts/add-post/adoption-post/adoption-post.component';
import { StrayPostComponent } from './posts/add-post/stray-post/stray-post.component';
import { CommentComponent } from './posts/comments/comment/comment.component';
import { AddCommentComponent } from './posts/comments/add-comment/add-comment.component';
import { DiscussionComponent } from './posts/comments/discussion/discussion.component';
import { MapComponent } from './location/map/map.component';
import {GoogleMapsModule} from "@angular/google-maps";
import { NearMeComponent } from './home/near-me/near-me.component';
import { FilterComponent } from './home/filter/filter.component';
import { UserComponent } from './users/user/user.component';
import { ConnectionsComponent } from './users/connections/connections.component';
import { NotificationsComponent } from './users/notifications/notifications.component';
import { RegistrationHeaderComponent } from './auth/registration/registration-header/registration-header.component';
import { HomeEventsComponent } from './home/events/home-events/home-events.component';
import { HomeRescueModeComponent } from './home/home-rescue-mode/home-rescue-mode.component';
import { AddEventComponent } from './home/events/add-event/add-event.component';
import { EventComponent } from './home/events/event/event.component';
import { CommunityComponent } from './users/community/community.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterSuccessComponent,
    HomeRescueModeComponent,
    SimplePostComponent,
    PostComponent,
    RegisterIndividualComponent,
    RegisterOrganizationComponent,
    RegisterAccountTypeSelectionComponent,
    PostTypeSelectionComponent,
    MissingPostComponent,
    AdoptionPostComponent,
    StrayPostComponent,
    CommentComponent,
    AddCommentComponent,
    DiscussionComponent,
    MapComponent,
    NearMeComponent,
    FilterComponent,
    UserComponent,
    ConnectionsComponent,
    NotificationsComponent,
    RegistrationHeaderComponent,
    HomeEventsComponent,
    AddEventComponent,
    EventComponent,
    CommunityComponent,
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
