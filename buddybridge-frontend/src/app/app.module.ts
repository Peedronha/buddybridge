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
import { MenuRestrictComponent } from './restrict/component/menu-restrict/menu-restrict.component';
import { LoginComponent } from './open/account/login/login.component';
import { RegisterComponent } from './open/account/register/register.component';
import { TopMenuOpenComponent } from './open/component/top-menu-open/top-menu-open.component';
import { InsitucionalComponent } from './open/insitucional/insitucional.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from './layout/app.layout.module';
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


@NgModule({
  declarations: [
    AppComponent,
    TopMenuOpenComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
      InsitucionalComponent,
    MenuRestrictComponent,
      DashboardComponent,
      InsitucionalComponent
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
  ],
  providers: [
    {provide: LocationStrategy, useClass: PathLocationStrategy },
    MessageService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
