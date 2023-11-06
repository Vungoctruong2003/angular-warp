import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  });


  headerRefreshToken = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
  });

}
