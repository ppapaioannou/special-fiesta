import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PostPayload} from "../../../payloads/post-payload";
import {PostService} from "../../../services/post.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-home-events',
  templateUrl: './home-events.component.html',
  styleUrls: ['./home-events.component.css']
})
export class HomeEventsComponent implements OnInit {

  events!: Observable<Array<PostPayload>>;

  constructor(private postService: PostService, public authService: AuthService) {
  }

  ngOnInit() {
    this.events = this.postService.getAllEvents();
  }

}
