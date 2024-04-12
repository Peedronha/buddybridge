import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { TopMenuOpenComponent } from './open/component/top-menu-open/top-menu-open.component';
import { MenuRestrictComponent } from './restrict/component/menu-restrict/menu-restrict.component';
import { DashboardComponent } from './restrict/dashboard/dashboard.component';
import { AuthGuard } from './open/account/shared/auth.guard';
import { HomeComponent } from './open/home/home.component';
import { LoginComponent } from './open/account/login/login.component';
import { RegisterComponent } from './open/account/register/register.component';
import { InsitucionalComponent } from './open/insitucional/insitucional.component';
import {RecoveryComponent} from "./open/account/recovery/recovery.component";
import {RegisterVolunteerComponent} from "./open/account/volunteer/register-volunteer/register-volunteer.component";
import {ListVolunteerComponent} from "./open/account/volunteer/list-volunteer/list-volunteer.component";
const routes: Routes = [
  {
    path: '',
    component: MenuRestrictComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', title: 'BuddyBridge - DashBoard', component: DashboardComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: TopMenuOpenComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', title: 'BuddyBridge - Home', component: HomeComponent },
      { path: 'institucional', title: 'BuddyBridge - Institucional', component: InsitucionalComponent },
      { path: 'register', title: 'BuddyBridge - Criar Conta', component: RegisterComponent },
      { path: 'login', title: 'BuddyBridge - Login', component: LoginComponent },
      { path: 'recovery', title: 'BuddyBridge - Recovery', component: RecoveryComponent },
      { path: 'register-volunteer', title: 'BuddyBridge - Recovery', component: RegisterVolunteerComponent },
      { path: 'volunteer', title: 'BuddyBridge - Recovery', component: ListVolunteerComponent },
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
