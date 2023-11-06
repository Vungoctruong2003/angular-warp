import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AuthModule} from "./auth/auth.module";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UsersModule} from "./users/users.module";
import {RolesModule} from "./roles/roles.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    UsersModule,
    RolesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

