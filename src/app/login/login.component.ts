import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   nickname: String;
   password: String;


  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { 
    this.nickname = "";
    this.password = "";
  }

  ngOnInit() {
    this.loginService.setUser("");
  }

  login(){

    this.snackBar.open("Logando...", "Fechar", {duration: 2000} );
    
    return this.loginService.login(this.nickname, this.password).subscribe(a => {
      if(a){
        this.snackBar.open("Logado!", "Fechar", {duration: 2000} );
        this.loginService.setUser(this.nickname);
        this.router.navigate(['/feed']);
      } else {
        this.snackBar.open("Dados incorretos", "Entendi", {duration: 3000} );
      }
    });
  }
}
