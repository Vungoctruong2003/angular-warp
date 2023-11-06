import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) {

  }

  canActivate(): boolean {
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.toastr.error('Bạn chưa login', 'Error');
      return false;
    }
  }

}
