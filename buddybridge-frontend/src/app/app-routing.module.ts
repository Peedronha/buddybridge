import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './open/account/login/login.component';
import { RecoveryComponent } from "./open/account/recovery/recovery.component";
import { RegisterComponent } from './open/account/register/register.component';
import { AuthGuard } from './open/account/shared/auth.guard';
import { LoginGuard } from './open/account/shared/login.guard';
import { ValidateloginComponent } from './open/account/validatelogin/validatelogin.component';
import { HomeComponent } from './open/home/home.component';
import { InsitucionalComponent } from './open/insitucional/insitucional.component';
import { TopMenuOpenComponent } from './open/top-menu-open/top-menu-open.component';
import { AccountFormSenhaComponent } from './restrict/base/account/component/container/account-form-senha/account-form-senha.component';
import { AccountFormComponent } from './restrict/base/account/component/container/account-form/account-form.component';
import { AccountComponent } from './restrict/base/account/component/container/account/account.component';
import { ProfileComponent } from './restrict/base/account/component/profile/profile.component';
import { accountResolver } from './restrict/base/account/guards/account.resolver';
import { AnimalFormComponent } from "./restrict/base/animal/component/animal-form/animal-form.component";
import { AnimalComponent } from "./restrict/base/animal/component/animal/animal.component";
import { animalResolver } from "./restrict/base/animal/guard/animal.resolver";
import { OngComponent } from './restrict/base/ong/component/ong/ong.component';
import { RacaFormComponent } from "./restrict/base/raca/component/raca-form/raca-form.component";
import { RacaComponent } from "./restrict/base/raca/component/raca/raca.component";
import { racaResolver } from "./restrict/base/raca/guard/raca.resolver.guard";
import { FormTipoComponent } from "./restrict/base/tipo_animal/component/form-tipo/form-tipo.component";
import { TipoComponent } from "./restrict/base/tipo_animal/component/tipo/tipo.component";
import { tipoResolver } from "./restrict/base/tipo_animal/guard/tipo.resolver.guard";
import { VolunteerFormComponent } from "./restrict/base/volunteer/component/container/volunteer-form/volunteer-form.component";
import { VolunteerComponent } from "./restrict/base/volunteer/component/container/volunteer/volunteer.component";
import { volunteerResolver } from "./restrict/base/volunteer/guards/volunteer.resolver";
import { DashboardComponent } from './restrict/dashboard/dashboard.component';
import { AppLayoutComponent } from './restrict/layout/app.layout.component';
import { ErrorComponent } from './restrict/layout/error/error/error.component';
import {AdoptionProfileComponent} from "./restrict/base/adoption-profile/component/adoption/adoption-profile.component";
import {
  AdoptionProfileFormComponent
} from "./restrict/base/adoption-profile/component/adoption-form/adoption-profile-form.component";
import {adoptionProfileResolver} from "./restrict/base/adoption-profile/guards/adoption-profile.resolver.guard";
import {AdoptionComponent} from "./open/adoption/components/adoption-header/adoption.component";
import {
  AdoptionSubmissionFormComponent
} from "./open/adoption/components/adoption-submission-form/adoption-submission-form.component";
import {AdoptionListComponent} from "./open/adoption/components/adoption-list/adoption-list.component";
import {AdoptionUpdateComponent} from "./open/adoption/components/adoption-update/adoption-update.component";

const routes: Routes = [
  { path: 'errorBuddyBridge', title: 'BuddyBridge - Erro', component: ErrorComponent },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},

      { path: 'restrict/home', title: 'BuddyBridge - Home', component: HomeComponent },
      { path: 'restrict/institucional', title: 'BuddyBridge - Institucional', component: InsitucionalComponent },

      { path: 'restrict/adocao', title: 'BuddyBridge - Adocao', component: AdoptionComponent },
      { path: 'restrict/adocao/addadocao/:id', title: 'BuddyBridge - Adocao', component: AdoptionSubmissionFormComponent, resolve: {adocao : adoptionProfileResolver} },
      { path: 'restrict/adocao/list', title: 'BuddyBridge - Adocao', component: AdoptionListComponent },
      { path: 'restrict/adocao/editsubmission/:id', title: 'BuddyBridge - Adocao', component: AdoptionUpdateComponent },


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
      { path: 'tipos/addtipo', title: 'BuddyBridge - Novo Tipo', component: FormTipoComponent, resolve: {tipo : tipoResolver} },
      { path: 'tipos/edittipo/:id', title: 'BuddyBridge - Alterar Tipo', component: FormTipoComponent, resolve: {tipo : tipoResolver} },

      { path: 'perfil-adocao', title: 'BuddyBridge - Perfil de Adoção', component: AdoptionProfileComponent },
      { path: 'perfil-adocao/addperfil', title: 'BuddyBridge - Novo Perfil de Adoção', component: AdoptionProfileFormComponent, resolve: {perfil : adoptionProfileResolver} },
      { path: 'perfil-adocao/editperfil/:id', title: 'BuddyBridge - Alterar Perfil de Adoção', component: AdoptionProfileFormComponent, resolve: {perfil : adoptionProfileResolver} },

      { path: 'ong', title: 'BuddyBridge - Institucional', component: OngComponent },

    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: TopMenuOpenComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'adocao', title: 'BuddyBridge - Quero Adotar', component: AdoptionComponent, canActivate: [LoginGuard] },
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
