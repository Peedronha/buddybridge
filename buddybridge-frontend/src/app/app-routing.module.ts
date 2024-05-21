import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { TopMenuOpenComponent } from './open/top-menu-open/top-menu-open.component';
import { DashboardComponent } from './restrict/dashboard/dashboard.component';
import { AuthGuard } from './open/account/shared/auth.guard';
import { HomeComponent } from './open/home/home.component';
import { LoginComponent } from './open/account/login/login.component';
import { RegisterComponent } from './open/account/register/register.component';
import { InsitucionalComponent } from './open/insitucional/insitucional.component';
import { RecoveryComponent } from "./open/account/recovery/recovery.component";
import { AppLayoutComponent } from './restrict/layout/app.layout.component';
import { ProfileComponent } from './restrict/base/account/component/profile/profile.component';
import { AccountComponent } from './restrict/base/account/component/container/account/account.component';
import { AccountFormComponent } from './restrict/base/account/component/container/account-form/account-form.component';
import { accountResolver } from './restrict/base/account/guards/account.resolver';
import { ValidateloginComponent } from './open/account/validatelogin/validatelogin.component';
import { AccountFormSenhaComponent } from './restrict/base/account/component/container/account-form-senha/account-form-senha.component';
import {
  VolunteerFormComponent
} from "./restrict/base/volunteer/component/container/volunteer-form/volunteer-form.component";
import {VolunteerComponent} from "./restrict/base/volunteer/component/container/volunteer/volunteer.component";
import {volunteerResolver} from "./restrict/base/volunteer/guards/volunteer.resolver";
import { LoginGuard } from './open/account/shared/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},

      { path: 'restrict/home', title: 'BuddyBridge - Home', component: HomeComponent },
      { path: 'restrict/institucional', title: 'BuddyBridge - Institucional', component: InsitucionalComponent },

      { path: 'dashboard', title: 'BuddyBridge - DashBoard', component: DashboardComponent },
      { path: 'profile', title: 'BuddyBridge - Meu Perfil', component: ProfileComponent },
      { path: 'account', title: 'BuddyBridge - Usuários', component: AccountComponent },
      { path: 'account/addaccount', title: 'BuddyBridge - Novo Usuário', component: AccountFormComponent, resolve: {account : accountResolver} },
      { path: 'account/editaccount/:id', title: 'BuddyBridge - Alterar Usuário', component: AccountFormComponent, resolve: {account : accountResolver} },
      { path: 'account/editpassword/:id', title: 'BuddyBridge - Alterar Usuário', component: AccountFormSenhaComponent, resolve: {account : accountResolver} },

      { path: 'volunteer', title: 'BuddyBridge - Voluntários', component: VolunteerComponent },
      { path: 'volunteer/addvolunteer', title: 'BuddyBridge - Novo Voluntário', component: VolunteerFormComponent, resolve: {volunteer : volunteerResolver} },
      { path: 'volunteer/editvolunteer/:id', title: 'BuddyBridge - Alterar Voluntário', component: VolunteerFormComponent, resolve: {volunteer : volunteerResolver} },

    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: TopMenuOpenComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', title: 'BuddyBridge - Home', component: HomeComponent, canActivate: [LoginGuard] },
      { path: 'institucional', title: 'BuddyBridge - Institucional', component: InsitucionalComponent, canActivate: [LoginGuard] },
      { path: 'register', title: 'BuddyBridge - Criar Conta', component: RegisterComponent, canActivate: [LoginGuard] },
      { path: 'login', title: 'BuddyBridge - Login', component: LoginComponent, canActivate: [LoginGuard] },
      { path: 'recovery', title: 'BuddyBridge - Recovery', component: RecoveryComponent, canActivate: [LoginGuard] },
      { path: 'validatelogin', title: 'BuddyBridge - Validar código OTP', component: ValidateloginComponent, canActivate: [LoginGuard] },
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
