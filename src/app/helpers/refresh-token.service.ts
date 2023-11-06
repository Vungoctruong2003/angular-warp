import {Injectable} from '@angular/core';
import {AuthService} from "../service/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor(
    private authService: AuthService,
  ) {
  }

  refreshToken() {
    this.authService.refreshToken().subscribe(res => {
      // @ts-ignore
      localStorage.setItem('access_token', res.data.access_token)
      // @ts-ignore
      localStorage.setItem('refresh_token', res.data.refresh_token)
      location.reload();
    })
  }
}
