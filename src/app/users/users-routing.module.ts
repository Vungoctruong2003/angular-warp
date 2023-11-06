import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouterPath} from "../constant";
import {ListUserComponent} from "./list-user/list-user.component";

const routes: Routes = [
  {
    path: RouterPath.users.getAll,
    component: ListUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
