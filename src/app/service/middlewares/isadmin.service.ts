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

  async canActivate(): Promise<boolean> {
    try {
      const res = await this.authService.getMe().toPromise();

      this.myRole = res.data.role_users;

      if (this.myRole.length == 0) {
        this.toastr.error('Admin mới có thể truy cập', 'Error');
        return false;
      }

      const containsAdmin = this.myRole.some((item: { name: string; }) => item.name === "admin");
      if (!containsAdmin) {
        this.toastr.error('Admin mới có thể truy cập', 'Error');
        return false;
      }

      return true;
    } catch (error) {
      // @ts-ignore
      if (error.status === 403) {
        this.refreshTokenHelper.refreshToken();
      }
      return false;
    }

  }
}
