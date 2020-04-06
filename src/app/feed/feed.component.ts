import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

export interface Publication {
  id: String,
  author: String,
  content: String
}


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {


  author: String;
  message: String;

  publications: any[] = [];

  constructor(private feedService: FeedService, private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) {
    this.message = "";
    this.author = loginService.getUser();
  }

  ngOnInit() {
    this.getPublications();
    if(this.author == ""){
      this.router.navigate(['/']);
    }
  }

  getPublications() {
    this.feedService.getPublications().subscribe(publications => this.publications = publications as []);
  }

  postPublication() {
    this.snackBar.open("Publicando...", "Fechar", {duration: 2000} );

    if (this.author.length > 0 && this.message.trim().length > 0){
      this.feedService.postPublication(this.author, this.message).subscribe(() => {
        this.snackBar.open("Publicado!", "Fechar", {duration: 2000} );
        this.message = "";
        this.getPublications();
      })
    }
  }

  postComment(content: String, id: String) {
    console.log("está clicando");
    if(content.trim().length > 0){
      this.feedService.postComment(this.author, content, id).subscribe(() => {
        this.getPublications();
      })
    }
  }

  showDelete(user: String){
    return this.author == user || this.author == "viniciussousav";
  }

  deletePublication(id: String){
    this.feedService.deletePublication(id).subscribe(() => {
      this.getPublications();
    });
  }

  formatDate(date) {
    var newDate: Date = new Date(date);
    return "em " + newDate.toLocaleDateString() + " as " + newDate.toLocaleTimeString();
  }

}
