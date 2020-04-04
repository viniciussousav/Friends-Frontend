import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  url: string = 'https://vinicius-friends.herokuapp.com/users';

  constructor(private http: HttpClient) { }

  add(name, surname, description, nickname, password) {

    var newFriend = {
      name: name,
      surname: surname,
      description: description,
      nickname: nickname,
      password: password
    };

    return this.http.post<any>(this.url, newFriend, { headers: this.headers });

  }
}
