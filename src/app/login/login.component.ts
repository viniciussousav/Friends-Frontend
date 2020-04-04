import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   nickname: String;
   password: String;
   error: boolean;


  constructor(private loginService: LoginService, private router: Router) { 
    this.nickname = "";
    this.password = "";
    this.error = false;
  }

  ngOnInit() {

  }

  login(){
    return this.loginService.login(this.nickname, this.password).subscribe(a => {
      if(a){
        this.loginService.setUser(this.nickname);
        console.log(this.loginService.getUser());
        this.router.navigate(['/feed']);
      } else {
        this.error = true;
      }
    });
  }
}
