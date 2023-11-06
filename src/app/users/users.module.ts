import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {ListUserComponent} from "./list-user/list-user.component";
import { PaginatorComponent } from './list-user/paginator/paginator.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchComponent } from './list-user/search/search.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SetRoleComponent } from './list-user/set-role/set-role.component';

@NgModule({
  declarations: [
     ListUserComponent,
     PaginatorComponent,
     SearchComponent,
     EditUserComponent,
     SetRoleComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UsersModule { }
