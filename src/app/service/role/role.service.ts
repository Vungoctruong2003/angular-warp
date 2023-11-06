import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_DOMAIN, ROLE_PATH_PREFIX} from "../../constant";
import {BaseService} from "../base-service.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super()
  }

  getAll(): Observable<any> {
    return this.http.get(API_DOMAIN + ROLE_PATH_PREFIX, {headers: this.headers})
  }

  delete(id: object): Observable<any> {
    return this.http.post(API_DOMAIN + ROLE_PATH_PREFIX, id, {headers: this.headers})
  }

  detail(id: string | undefined): Observable<any> {
    return this.http.get(API_DOMAIN + ROLE_PATH_PREFIX + '/detail?id=' + id, {headers: this.headers})
  }

  create(data: object): Observable<any> {
    return this.http.post(API_DOMAIN + ROLE_PATH_PREFIX + '/create', data,
      {
        headers: this.headers
      }
    )
  }

  edit(id: string | undefined, editDataRole: object): Observable<any> {
    return this.http.put(API_DOMAIN + ROLE_PATH_PREFIX, {
      'id': id,
      'dataEditRole': editDataRole
    }, {headers: this.headers})
  }
}
