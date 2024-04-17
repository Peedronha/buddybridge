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
import { RegisterVolunteerComponent } from "./open/account/volunteer/register-volunteer/register-volunteer.component";
import { ListVolunteerComponent } from "./open/account/volunteer/list-volunteer/list-volunteer.component";
import { AppLayoutComponent } from './restrict/layout/app.layout.component';
import { ProfileComponent } from './restrict/base/account/component/profile/profile.component';
import { AccountComponent } from './restrict/base/account/component/container/account/account.component';
import { AccountFormComponent } from './restrict/base/account/component/container/account-form/account-form.component';
import { accountResolver } from './restrict/base/account/guards/account.resolver';
import { ValidateloginComponent } from './open/account/validatelogin/validatelogin.component';
import { AccountFormSenhaComponent } from './restrict/base/account/component/container/account-form-senha/account-form-senha.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', title: 'BuddyBridge - DashBoard', component: DashboardComponent },
      { path: 'profile', title: 'BuddyBridge - Meu Perfil', component: ProfileComponent },
      { path: 'account', title: 'BuddyBridge - Usuários', component: AccountComponent },
      { path: 'account/addaccount', title: 'BuddyBridge - Novo Usuário', component: AccountFormComponent, resolve: {account : accountResolver} },
      { path: 'account/editaccount/:id', title: 'BuddyBridge - Alterar Usuário', component: AccountFormComponent, resolve: {account : accountResolver} },
      { path: 'account/editpassword/:id', title: 'BuddyBridge - Alterar Usuário', component: AccountFormSenhaComponent, resolve: {account : accountResolver} },
      { path: 'volunteer', title: 'BuddyBridge - Recovery', component: ListVolunteerComponent },
      { path: 'register-volunteer', title: 'BuddyBridge - Recovery', component: RegisterVolunteerComponent },

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
      { path: 'validate-login', title: 'BuddyBridge - Validar código OTP', component: ValidateloginComponent },
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
