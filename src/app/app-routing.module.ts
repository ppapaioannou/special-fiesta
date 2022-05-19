import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterAccountTypeSelectionComponent} from "./auth/registration/register-account-type-selection/register-account-type-selection.component";
import {RegisterIndividualComponent} from "./auth/registration/register-individual/register-individual.component";
import {RegisterOrganizationComponent} from "./auth/registration/register-organization/register-organization.component";
import {PostComponent} from "./posts/post/post.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterSuccessComponent} from "./auth/registration/register-success/register-success.component";
import {SimplePostComponent} from "./posts/add-post/simple-post/simple-post.component";
import {AuthGuard} from "./security/auth.guard";
import {PostTypeSelectionComponent} from "./posts/add-post/post-type-selection/post-type-selection.component";
import {MissingPostComponent} from "./posts/add-post/missing-post/missing-post.component";
import {AdoptionPostComponent} from "./posts/add-post/adoption-post/adoption-post.component";
import {StrayPostComponent} from "./posts/add-post/stray-post/stray-post.component";
import {DiscussionComponent} from "./posts/comments/discussion/discussion.component";
import {AddCommentComponent} from "./posts/comments/add-comment/add-comment.component";
import {NearMeComponent} from "./home/near-me/near-me.component";
import {FilterComponent} from "./home/filter/filter.component";
import {UserComponent} from "./users/user/user.component";
import {ConnectionsComponent} from "./users/connections/connections.component";
import {NotificationsComponent} from "./users/notifications/notifications.component";
import {HomeEventsComponent} from "./home/events/home-events/home-events.component";
import {HomeRescueModeComponent} from "./home/home-rescue-mode/home-rescue-mode.component";
import {AddEventComponent} from "./home/events/add-event/add-event.component";
import {EventComponent} from "./home/events/event/event.component";
import {CommunityComponent} from "./users/community/community.component";

const routes: Routes = [
  {path: '', component: HomeRescueModeComponent},
  {path: 'home', component: HomeRescueModeComponent},
  {path: 'register-account-type-selection', component: RegisterAccountTypeSelectionComponent},
  {path: 'register-individual', component: RegisterIndividualComponent},
  {path: 'register-organization', component: RegisterOrganizationComponent},
  {path: 'register-success/:email', component: RegisterSuccessComponent},
  {path: 'login', component: LoginComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'post-type-selection', component: PostTypeSelectionComponent, canActivate: [AuthGuard]},
  {path: 'missing-post', component: MissingPostComponent, canActivate: [AuthGuard]},
  {path: 'adoption-post', component: AdoptionPostComponent, canActivate: [AuthGuard]},
  {path: 'stray-post', component: StrayPostComponent, canActivate: [AuthGuard]},
  {path: 'simple-post', component: SimplePostComponent, canActivate: [AuthGuard]},
  {path: 'discussion/:id', component: DiscussionComponent, canActivate: [AuthGuard]},
  {path: 'add-comment/:id', component: AddCommentComponent, canActivate: [AuthGuard]},
  {path: 'near-me', component: NearMeComponent, canActivate: [AuthGuard]},
  {path: 'filter', component: FilterComponent},
  {path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'connections', component: ConnectionsComponent, canActivate: [AuthGuard]},
  {path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
  {path: 'events', component: HomeEventsComponent},
  {path: 'event/:id', component: EventComponent},
  {path: 'add-event', component: AddEventComponent, canActivate: [AuthGuard]},
  {path: 'community', component: CommunityComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
