import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {RouterPath} from '../constant'

const routes: Routes = [
  {
    path: RouterPath.auth.login,
    component: LoginComponent
  },
  {
    path: RouterPath.auth.register,
    component: RegisterComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
