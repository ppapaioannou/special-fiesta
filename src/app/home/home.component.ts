import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {PostPayload} from '../posts/add-post/post-payload';
import {PostService} from "../posts/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts!: Observable<Array<PostPayload>>;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getAllPosts();
  }

}
