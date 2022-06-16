import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostComponent} from "./posts/post/post.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterSuccessComponent} from "./auth/registration/register-success/register-success.component";
import {AuthGuard} from "./security/auth.guard";
import {DiscussionComponent} from "./posts/comments/discussion/discussion.component";
import {AddCommentComponent} from "./posts/comments/add-comment/add-comment.component";
import {NearMeComponent} from "./home/near-me/near-me.component";
import {FilterComponent} from "./home/filter/filter.component";
import {UserComponent} from "./users/user/user.component";
import {ConnectionsComponent} from "./users/connections/connections.component";
import {NotificationsComponent} from "./users/notifications/notifications.component";
import {CommunityComponent} from "./users/community/community.component";
import {ProfileComponent} from "./users/profile/profile.component";
import {LoginErrorComponent} from "./errors/login-error/login-error.component";
import {RegisterErrorComponent} from "./errors/register-error/register-error.component";
import {PostErrorComponent} from "./errors/post-error/post-error.component";
import {LocationErrorComponent} from "./errors/location-error/location-error.component";
import {HomePageComponent} from "./home/home-page/home-page.component";
import {RegisterComponent} from "./auth/registration/register/register.component";
import {AddPostComponent} from "./posts/add-post/add-post.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'home', component: HomePageComponent},
  {path: 'near-me', component: NearMeComponent, canActivate: [AuthGuard]},
  {path: 'filter', component: FilterComponent},

  {path: 'register', component: RegisterComponent},
  {path: 'register/individual', component: RegisterComponent},
  {path: 'register/individual/ref/:id', component: RegisterComponent},
  {path: 'register/organization', component: RegisterComponent},
  {path: 'register-success/:email', component: RegisterSuccessComponent},
  {path: 'login', component: LoginComponent},

  {path: 'post/:id', component: PostComponent},
  {path: 'event/:id', component: PostComponent},
  {path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]},
  {path: 'add-post/missing', component: AddPostComponent, canActivate: [AuthGuard]},
  {path: 'add-post/adoption', component: AddPostComponent, canActivate: [AuthGuard]},
  {path: 'add-post/stray', component: AddPostComponent, canActivate: [AuthGuard]},
  {path: 'add-post/simple', component: AddPostComponent, canActivate: [AuthGuard]},
  {path: 'add-post/event', component: AddPostComponent, canActivate: [AuthGuard]},
  {path: 'discussion/:id', component: DiscussionComponent, canActivate: [AuthGuard]},
  {path: 'add-comment/:id', component: AddCommentComponent, canActivate: [AuthGuard]},

  {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'user/me/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'community', component: CommunityComponent, canActivate: [AuthGuard]},
  {path: 'community/individuals', component: CommunityComponent, canActivate: [AuthGuard]},
  {path: 'community/organizations', component: CommunityComponent, canActivate: [AuthGuard]},

  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'connections', component: ConnectionsComponent, canActivate: [AuthGuard]},
  {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},

  {path: 'login-error', component: LoginErrorComponent},
  {path: 'register-error', component: RegisterErrorComponent},
  {path: 'post-error', component: PostErrorComponent, canActivate: [AuthGuard]},
  {path: 'location-error', component: LocationErrorComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
