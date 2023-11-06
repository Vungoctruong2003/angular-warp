import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_DOMAIN, AUTH_PATH_PREFIX} from "../../constant";
import {BaseService} from "../base-service.service";

@Injectable({
  providedIn: 'root'
})


export class AuthService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  login(data: any): Observable<any> {
    return this.http.post(API_DOMAIN + AUTH_PATH_PREFIX + '/login', data)
  }

  register(data: any): Observable<any> {
    return this.http.post(API_DOMAIN + AUTH_PATH_PREFIX + '/register', data)
  }

  refreshToken() {
    return this.http.get(API_DOMAIN + AUTH_PATH_PREFIX + '/refresh-token', {headers: this.headerRefreshToken})
  }


  getMe(): Observable<any> {
    return this.http.get(API_DOMAIN + AUTH_PATH_PREFIX + '/get-me', {headers: this.headers})
  }

  logout() {
    localStorage.removeItem('refresh_token')
    return localStorage.removeItem('access_token')
  }
}
