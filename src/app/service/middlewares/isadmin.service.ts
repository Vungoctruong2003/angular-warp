import {Injectable} from '@angular/core';
import {CanActivate} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../auth/auth.service";
import {RefreshTokenService} from "../../helpers/refresh-token.service";

@Injectable({
  providedIn: 'root'
})
export class IsAdminService implements CanActivate {

  private myRole?: any;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private refreshTokenHelper: RefreshTokenService,
  ) {
  }

  canActivate(): boolean {
    this.authService.getMe().subscribe(res => {
      this.myRole = res.data.roles;
    }, error => {
      if (error.status == 403) {
        this.refreshTokenHelper.refreshToken()
      }
    });

    if (!this.myRole) {
      this.toastr.error('Admin mới có thể truy cập', 'Error');
      return false;
    }
    // @ts-ignore
    const containsAdmin = this.myRole.some(item => item.name === "admin");
    if (!containsAdmin) {
      this.toastr.error('Admin mới có thể truy cập', 'Error');
      return false
    }
    return true;
  }
}
