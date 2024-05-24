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
import {AnimalComponent} from "./restrict/base/animal/component/animal/animal.component";
import {AnimalFormComponent} from "./restrict/base/animal/component/animal-form/animal-form.component";
import {animalResolver} from "./restrict/base/animal/guard/animal.resolver";
import {RacaComponent} from "./restrict/base/raca/component/raca/raca.component";
import {RacaFormComponent} from "./restrict/base/raca/component/raca-form/raca-form.component";
import {racaResolver} from "./restrict/base/raca/guard/raca.resolver.guard";
import {TipoComponent} from "./restrict/base/tipo_animal/component/tipo/tipo.component";
import {FormTipoComponent} from "./restrict/base/tipo_animal/component/form-tipo/form-tipo.component";
import {tipoResolver} from "./restrict/base/tipo_animal/guard/tipo.resolver.guard";

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

      { path: 'volunteer', title: 'BuddyBridge - Voluntários', component: VolunteerComponent },
      { path: 'volunteer/addvolunteer', title: 'BuddyBridge - Novo Voluntário', component: VolunteerFormComponent, resolve: {volunteer : volunteerResolver} },
      { path: 'volunteer/editvolunteer/:id', title: 'BuddyBridge - Alterar Voluntário', component: VolunteerFormComponent, resolve: {volunteer : volunteerResolver} },

      { path: 'animal', title: 'BuddyBridge - Animais', component: AnimalComponent },
      { path: 'animal/addanimal', title: 'BuddyBridge - Novo Animal', component: AnimalFormComponent, resolve: {animal : animalResolver} },
      { path: 'animal/editanimal/:id', title: 'BuddyBridge - Alterar Animal', component: AnimalFormComponent, resolve: {animal : animalResolver} },

      { path: 'racas', title: 'BuddyBridge - Raca', component: RacaComponent },
      { path: 'racas/addraca', title: 'BuddyBridge - Novo Raca', component: RacaFormComponent, resolve: {raca : racaResolver} },
      { path: 'racas/editraca/:id', title: 'BuddyBridge - Alterar Raca', component: RacaFormComponent, resolve: {raca : racaResolver} },

      { path: 'tipos', title: 'BuddyBridge - Tipo', component: TipoComponent },
      { path: 'tipos/addtipo', title: 'BuddyBridge - Novo Tipo', component: FormTipoComponent, resolve: {raca : tipoResolver} },
      { path: 'tipos/edittipo/:id', title: 'BuddyBridge - Alterar Tipo', component: FormTipoComponent, resolve: {raca : tipoResolver} },

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
      { path: 'validatelogin', title: 'BuddyBridge - Validar código OTP', component: ValidateloginComponent },
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full'},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
