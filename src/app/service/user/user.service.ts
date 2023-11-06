import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_DOMAIN, USER_PATH_PREFIX} from "../../constant";
import {BaseService} from "../base-service.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super()
  }

  getAllUser(queryParam: object): Observable<any> {
    // @ts-ignore
    let queryString = '?perpage=' + queryParam.perPage + '&page=' + queryParam.page + '&keySearch=' + queryParam.keySearch;
    return this.http.get(API_DOMAIN + USER_PATH_PREFIX + queryString, {headers: this.headers})
  }

  deleteUser(id: object): Observable<any> {
    return this.http.post(API_DOMAIN + USER_PATH_PREFIX, id, {headers: this.headers})
  }

  detailUser(id: string | undefined): Observable<any> {
    return this.http.get(API_DOMAIN + USER_PATH_PREFIX + '/detail?id=' + id, {headers: this.headers})
  }

  editUser(id: string | undefined, editDataUser: object): Observable<any> {
    return this.http.put(API_DOMAIN + USER_PATH_PREFIX, {
      'id': id,
      'dataEditUser': editDataUser
    }, {headers: this.headers})
  }

  setRoleUser(userId: any, roles: any) {
    return this.http.put(API_DOMAIN + USER_PATH_PREFIX + '/set-role', {
      'user_id': userId,
      roles
    }, {headers: this.headers})
  }
}
