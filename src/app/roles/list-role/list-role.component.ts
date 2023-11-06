import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {RoleService} from "../../service/role/role.service";
import {RefreshTokenService} from "../../helpers/refresh-token.service";

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {
  roles: any = [];
  selectedRoleId?: string
  showEditRoleComponent: boolean = false
  showCreateRoleComponent: boolean = false

  constructor(
    private roleService: RoleService,
    private toastr: ToastrService,
    private refreshTokenHelper: RefreshTokenService,
  ) {
  }

  selectEditRole(roleId: string) {
    this.selectedRoleId = roleId;
    this.showEditRoleComponent = true;
  }

  showCreateModel() {
    this.showCreateRoleComponent = true;
  }

  ngOnInit() {
    this.getRoles()
  }

  getRoles(): void {
    this.roleService.getAll().subscribe(res => {
      this.roles = res.data;
    }, error => {
      if (error.status == 403) {
        this.refreshTokenHelper.refreshToken()
      }
    });
  }

  delete(id: string) {
    if (confirm('muốn xoá thật không?')) {
      this.roleService.delete({'id': id}).subscribe(res => {

        // @ts-ignore
        this.roles = this.roles.filter(role => role._id !== id);
        this.toastr.success('Xoá thành công', 'Success');
      }, error => {
        if (error.status == 403) {
          this.refreshTokenHelper.refreshToken()
        }
      });
    }
  }

  edit(roleEdit: object) {
    // @ts-ignore
    const index = this.roles.findIndex(item => item._id === roleEdit._id);

    if (index !== -1) {
      this.roles [index] = roleEdit;
    }
  }

  create(roleCreate: object) {
    this.roles = [...this.roles, roleCreate];
  }

}
