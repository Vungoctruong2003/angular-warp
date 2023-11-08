import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from "./service/middlewares/auth.service";
import {LoginComponent} from "./auth/login/login.component";
import {IsAdminService} from "./service/middlewares/isadmin.service";
import {ListUserComponent} from "./users/list-user/list-user.component";

const routes: Routes = [
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

if (!localStorage.getItem('access_token')) {
  routes.push({
      path: '',
      component: LoginComponent
    },
  )
} else {
  routes.push({
      path: '',
      component: ListUserComponent
    },
  )
}


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
