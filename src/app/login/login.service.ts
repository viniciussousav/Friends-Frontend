import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'https://vinicius-friends.herokuapp.com/login/';

  user: String = "";

  constructor(private http: HttpClient) { }

  login(nickname: String, password: String) {

    const result = this.http.get(this.url + nickname + '/' + password);
    return result;
  }

  setUser(user: String): void {
    this.user = user;
  }

  getUser(): String {
    return this.user;
  }
}
