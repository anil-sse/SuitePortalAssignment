import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DialogSuccessComponent} from "./shared-helpers/dialog-success/dialog-success.component";
import {LoginComponent} from "./login/login.component";

import {AppRoutingModule} from "./app.routing.module";
import {JwtInterceptor} from "./services/jwt.interceptor";
import {CommonModule} from "@angular/common";
import {DialogConfirmationComponent} from "./shared-helpers/dialog-confirmation/dialog-confirmation.component";

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DialogSuccessComponent,
    DialogConfirmationComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
