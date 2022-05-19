import { Component, OnInit } from '@angular/core';
import {forkJoin, map, mergeMap, Observable} from "rxjs";
import {PostPayload} from "../../posts/post-payload";
import {PostService} from "../../posts/post.service";

@Component({
  selector: 'app-home-rescue-mode',
  templateUrl: './home-rescue-mode.component.html',
  styleUrls: ['./home-rescue-mode.component.css']
})
export class HomeRescueModeComponent implements OnInit {

  posts!: Array<PostPayload>;

  orderBy: string

  constructor(private postService: PostService) {
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
  }

}
