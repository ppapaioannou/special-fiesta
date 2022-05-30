import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from "../../../service/comment.service";
import {CommentPayload} from "../../../payload/comment-payload";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  postId!: number;
  addCommentForm: FormGroup;
  commentPayload: CommentPayload;
  body = new FormControl();

  constructor(private aRoute: ActivatedRoute, private commentService: CommentService, private router: Router) {
    this.addCommentForm = new FormGroup({
      body: this.body
    });
    this.commentPayload = {
      id: 0,
      postId: 0,
      body: "",
      userId: 0,
      userName: "",
      createdAt: ""
    }
  }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params => {
      this.postId = params['id'];
    });
  }

  addComment(): void {
    this.commentPayload.postId = this.postId;
    this.commentPayload.body = this.addCommentForm.value.body

    this.commentService.addComment(this.postId, this.commentPayload).subscribe({
      next: () => {
        console.log('commented successfully')
        this.router.navigateByUrl('/discussion/' + this.postId).then(() => console.log('redirecting back to post comments'))
      },
      error: () => {
        console.log('comment upload failed')
      }
    });
  }

}
