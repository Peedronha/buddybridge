import { MessagesModule } from 'primeng/messages';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { StyleClassModule } from 'primeng/styleclass';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './open/home/home.component';
import { DashboardComponent } from './restrict/dashboard/dashboard.component';
import { AppLayoutComponent } from './restrict/layout/app.layout.component';
import { LoginComponent } from './open/account/login/login.component';
import { RegisterComponent } from './open/account/register/register.component';
import { TopMenuOpenComponent } from './open/top-menu-open/top-menu-open.component';
import { InsitucionalComponent } from './open/insitucional/insitucional.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from './restrict/layout/app.layout.module';
import {RecoveryComponent} from "./open/account/recovery/recovery.component";
import { CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputOtpModule} from "primeng/inputotp";
import { TableModule} from "primeng/table";
import { SplitButtonModule} from "primeng/splitbutton";
import { DialogModule} from "primeng/dialog";
import { CheckboxModule} from "primeng/checkbox";
import { InputTextareaModule} from "primeng/inputtextarea";
import { RippleModule} from "primeng/ripple";
import { SplitterModule} from "primeng/splitter";
import { AppConfigModule } from './restrict/layout/config/config.module';
import { ProfileComponent } from './restrict/base/account/component/profile/profile.component';
import { AccountListComponent } from './restrict/base/account/component/account-list/account-list.component';
import { AccountFormComponent } from './restrict/base/account/component/container/account-form/account-form.component';
import { AccountComponent } from './restrict/base/account/component/container/account/account.component';
import { ValidateloginComponent } from './open/account/validatelogin/validatelogin.component';
import { AccountFormSenhaComponent } from './restrict/base/account/component/container/account-form-senha/account-form-senha.component';
import { RegisterVolunteerComponent } from "./restrict/base/volunteer/component/container/register-volunteer/register-volunteer.component";
import { ListVolunteerComponent } from "./restrict/base/volunteer/component/container/list-volunteer/list-volunteer.component";
import { VolunteerComponent } from './restrict/base/volunteer/component/container/volunteer/volunteer.component';
import { VolunteerFormComponent} from "./restrict/base/volunteer/component/container/volunteer-form/volunteer-form.component";
import { AnimalFormComponent } from './restrict/base/animal/component/animal-form/animal-form.component';
import { AnimalComponent } from './restrict/base/animal/component/animal/animal.component';
import { ListAnimalComponent } from './restrict/base/animal/component/list-animal/list-animal.component';
import { InputNumberModule} from "primeng/inputnumber";
import { RacaComponent } from './restrict/base/raca/component/raca/raca.component';
import { RacaFormComponent } from './restrict/base/raca/component/raca-form/raca-form.component';
import { ListRacaComponent } from './restrict/base/raca/component/list-raca/list-raca.component';
import { DropdownModule} from "primeng/dropdown";
import { TipoComponent } from './restrict/base/tipo_animal/component/tipo/tipo.component';
import { ListTipoComponent } from './restrict/base/tipo_animal/component/list-tipo/list-tipo.component';
import { FormTipoComponent } from './restrict/base/tipo_animal/component/form-tipo/form-tipo.component';
import { OngComponent } from './restrict/base/ong/component/ong/ong.component';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuOpenComponent,
      LoginComponent,
      RegisterComponent,
      RecoveryComponent,
      HomeComponent,
      InsitucionalComponent,
      RegisterVolunteerComponent,
      ListVolunteerComponent,
      InsitucionalComponent,
      ProfileComponent,
      AccountListComponent,
      AccountFormComponent,
      AccountComponent,
      ValidateloginComponent,
      AccountFormSenhaComponent,
      VolunteerComponent,
      VolunteerFormComponent,
      AnimalFormComponent,
      AnimalComponent,
      ListAnimalComponent,
      OngComponent,
      DashboardComponent,
      ListAnimalComponent,
      RacaComponent,
      RacaFormComponent,
      ListRacaComponent,
      TipoComponent,
      ListTipoComponent,
      FormTipoComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    StyleClassModule,
    BrowserAnimationsModule,
    AppLayoutModule,
    CommonModule,
    DividerModule,
    ChartModule,
    PanelModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    InputOtpModule,
    TableModule,
    SplitButtonModule,
    DialogModule,
    CheckboxModule,
    InputTextareaModule,
    RippleModule,
    SplitterModule,
    AppConfigModule,
    MessagesModule,
    InputNumberModule,
    DropdownModule,
    MenuModule,

  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy },
    MessageService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
