import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from "./service/middlewares/auth.service";
import {LoginComponent} from "./auth/login/login.component";
import {IsAdminService} from "./service/middlewares/isadmin.service";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then(module => module.AuthRoutingModule)
  },
  {
    path: 'users',
    canActivate: [AuthService],
    loadChildren: () => import('./users/users-routing.module').then(module => module.UsersRoutingModule)
  },
  {
    path: 'roles',
    canActivate: [AuthService, IsAdminService],
    loadChildren: () => import('./roles/roles-routing.module').then(module => module.RolesRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
