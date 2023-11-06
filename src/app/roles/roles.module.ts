import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import {ListRoleComponent} from "./list-role/list-role.component";
import { EditRoleComponent } from './edit-role/edit-role.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateRoleComponent } from './create-role/create-role.component';


@NgModule({
  declarations: [
    ListRoleComponent,
    EditRoleComponent,
    CreateRoleComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RolesModule { }
