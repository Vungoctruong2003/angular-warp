import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RoleService} from "../../../service/role/role.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() searchEvent = new EventEmitter<string>();
  @Output() searchRoleEvent = new EventEmitter<string>();

  searchTerm: string = '';
  _roles: any = [];
  roleSelectSearch?: string = '';

  search() {
    this.searchEvent.emit(this.searchTerm);
  }

  searchRole() {
    this.searchRoleEvent.emit(this.roleSelectSearch);
  }

  get roles() {
    return this._roles;
  }

  constructor(
    private roleService: RoleService
  ) {
  }

  ngOnInit() {
    this.roleService.getAll().subscribe(res => {
      this._roles = res.data
    })
  }

}
