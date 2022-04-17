import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {
  RegisterAccountTypeSelectionComponent
} from "./auth/registration/register-account-type-selection/register-account-type-selection.component";
import {RegisterIndividualComponent} from "./auth/registration/register-individual/register-individual.component";
import {RegisterOrganizationComponent} from "./auth/registration/register-organization/register-organization.component";
import {PostComponent} from "./posts/post/post.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterSuccessComponent} from "./auth/registration/register-success/register-success.component";
import {AddPostComponent} from "./posts/add-post/add-post.component";
import {AuthGuard} from "./security/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register-account-type-selection', component: RegisterAccountTypeSelectionComponent},
  {path: 'register-individual', component: RegisterIndividualComponent},
  {path: 'register-organization', component: RegisterOrganizationComponent},
  {path: 'post/:id', component: PostComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register-success/:email', component: RegisterSuccessComponent},
  {path: 'home', component: HomeComponent},
  {path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
