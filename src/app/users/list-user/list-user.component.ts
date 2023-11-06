import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {ToastrService} from "ngx-toastr";
import {RoleService} from "../../service/role/role.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth/auth.service";
import {RefreshTokenService} from "../../helpers/refresh-token.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: any[] = [];
  totalPage!: number;
  currentPage!: number;
  queryParam: object = {
    perPage: 10,
    page: 1,
    keySearch: ''
  }
  selectedUserId?: string
  showEditUserComponent: boolean = false

  selectedSetRoleUserId?: string
  showSetRoleUserComponent: boolean = false

  selectEditUser(userId: string) {
    this.selectedUserId = userId;
    this.showEditUserComponent = true;
  }

  selectSetRoleUser(userId: string) {
    this.selectedSetRoleUserId = userId;
    this.showSetRoleUserComponent = true;
  }


  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private refreshTokenHelper: RefreshTokenService,
  ) {
  }

  ngOnInit(): void {
    this.getUsers(this.queryParam);
  }

  toPage(page: number) {
    // @ts-ignore
    this.queryParam.page = page;
    this.getUsers(this.queryParam)
  }

  toPerPage(perPage: number) {
    // @ts-ignore
    this.queryParam.perPage = perPage;
    this.getUsers(this.queryParam)
  }

  search(keyword: string) {
    // @ts-ignore
    this.queryParam.keySearch = keyword;
    this.getUsers(this.queryParam)
  }

  getUsers(queryParam: object): void {
    this.userService.getAllUser(queryParam).subscribe(res => {
        this.users = res.data.users;
        this.totalPage = res.data.totalPage;
        this.currentPage = res.data.currentPage;
      }, error => {
        if (error.status == 403) {
          this.refreshTokenHelper.refreshToken()
        }
      }
    );
  }

  deleteUser(id: string) {
    if (confirm('muốn xoá thật không?')) {
      this.userService.deleteUser({'id': id}).subscribe(res => {
        this.users = this.users.filter(user => user._id !== id);
        this.toastr.success('Xoá thành công', 'Success');
      }, error => {
        if (error.status == 403) {
          this.refreshTokenHelper.refreshToken()
        }
      });
    }
  }

  editUser(userEdit: object) {

    // @ts-ignore
    const index = this.users.findIndex(item => item._id === userEdit._id);

    if (index !== -1) {
      this.users [index] = userEdit;
    }
  }

  setRoleUser(userSetRole: object) {
    // @ts-ignore
    const index = this.users.findIndex(item => item._id === userSetRole._id);
    if (index !== -1) {
      this.users [index] = userSetRole;
    }
  }

}
