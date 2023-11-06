import {Component} from '@angular/core';
import {RouterPath} from "../constant";
import {AuthService} from "../service/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loginLink = RouterPath.auth.login;
  registerLink = RouterPath.auth.register;
  userLink = RouterPath.users.getAll + '/users';
  roleLink = RouterPath.roles.getAll + '/roles';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
  }

  get _existedAccessToken() {
    return localStorage.getItem('access_token') === null;
  }

  logout() {
    this.authService.logout();
    this.toastr.success('Đăng xuất thành công', 'Success');
    this.router.navigate(['/login'])
  }
}
