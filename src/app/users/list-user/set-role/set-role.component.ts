import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoleService} from "../../../service/role/role.service";
import {FormBuilder} from "@angular/forms";
import {UserService} from "../../../service/user/user.service";
import {ToastrService} from "ngx-toastr";
import {RefreshTokenService} from "../../../helpers/refresh-token.service";

@Component({
  selector: 'app-set-role',
  templateUrl: './set-role.component.html',
  styleUrls: ['./set-role.component.css']
})
export class SetRoleComponent implements OnInit {
  formSetRole?: any
  currentRoles?: any
  _roles?: any;
  _userIdSelected?: any;

  @Output() setRoleUserEvent = new EventEmitter<object>();

  @Input() set userIdSelected(value) {
    this._userIdSelected = value;
  };

  get userIdSelected() {
    return this._userIdSelected;
  }

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private refreshTokenHelper: RefreshTokenService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.getAllRole();
    this.formSetRole = this.fb.group({
      roles: [''],
    })

    this.userService.detailUser(this._userIdSelected).subscribe(res => {
      this.currentRoles = res.data.roles;
      this.formSetRole?.patchValue({
        roles: res.data?.roles,
      })
    }, error => {
      if (error.status == 403) {
        this.refreshTokenHelper.refreshToken()
      }
    });
  }

  isRoleSelected(role: any): boolean {
    if (this.currentRoles != undefined) {
      // @ts-ignore
      return this.currentRoles.some(currentRole => currentRole._id === role._id);
    }
    return false;
  }

  get roles() {
    return this._roles;
  }

  getAllRole() {
    this.roleService.getAll().subscribe(res => {
      this._roles = res.data
    }, error => {
      if (error.status == 403) {
        this.refreshTokenHelper.refreshToken()
      }
    })
  }

  setRoleForUser() {
    this.userService.setRoleUser(this._userIdSelected, this.formSetRole.value.roles).subscribe(res => {

        this.setRoleUserEvent.emit(res);
        this.toastr.success('Cập nhật thành công', 'Success');
      },
      error => {
        if (error.status == 403) {
          this.refreshTokenHelper.refreshToken()
        }
        this.toastr.error('Bạn không phải admin', 'Error');
      }
    )
  }
}
