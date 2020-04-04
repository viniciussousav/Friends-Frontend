import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { LoginService } from '../login/login.service';

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

  constructor(private feedService: FeedService, private loginService: LoginService) {
    this.message = "";
    this.author = loginService.getUser();
  }

  ngOnInit() {
    this.getPublications();
  }

  getPublications() {
    this.feedService.getPublications().subscribe(publications => this.publications = publications as []);
  }

  postPublication() {
    if (this.author.length > 0 && this.message.length > 0){
      this.feedService.postPublication(this.author, this.message).subscribe(() => {
        this.getPublications();
      })
    }
  }

  showDelete(user: String){
    return this.author == user;
  }

  deletePublication(id: String){
    this.feedService.deletePublication(id).subscribe(() => {
      this.getPublications();
    });
  }

  formatDate(date) {
    var newDate: Date = new Date(date);
    return "Publicado em " + newDate.toLocaleDateString() + " as " + newDate.toLocaleTimeString();
  }

}
