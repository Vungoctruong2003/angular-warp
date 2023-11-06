import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouterPath} from "../constant";
import {ListRoleComponent} from "./list-role/list-role.component";

const routes: Routes = [
  {
    path: RouterPath.roles.getAll,
    component: ListRoleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {
}
