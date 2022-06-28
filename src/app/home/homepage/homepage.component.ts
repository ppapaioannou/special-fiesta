import { Component, OnInit } from '@angular/core';
import {PostPayload} from "../../payload/post-payload";
import {PostService} from "../../service/post.service";
import {map, Observable} from "rxjs";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomePageComponent implements OnInit {

  posts!: Array<PostPayload>;
  events!: Observable<Array<PostPayload>>;

  orderBy: string

  constructor(private postService: PostService, public authService: AuthService) {
    this.orderBy = postService.getOrderBy();
  }

  ngOnInit() {
    this.postService.getAllPosts().pipe(
      map(values => {
        if (this.orderBy == 'distance') {
          values.sort((a,b) => a.distance - b.distance);
        }
        this.posts = values;
      })
    ).subscribe();

    this.events = this.postService.getAllEvents();
  }

}
