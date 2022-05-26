import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {CommentPayload} from "../../../payloads/comment-payload";
import {CommentService} from "../../../services/comment.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {
  postId!: Number
  comments!: Observable<Array<CommentPayload>>;

  constructor(private aRoute: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params => {
      this.postId = params['id'];
    });

    this.comments = this.commentService.getAllComments(this.postId);
    console.log(this.postId);
  }

}
