import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {CommentService} from "../comment.service";
import {PostPayload} from "../../post-payload";
import {CommentPayload} from "../comment-payload";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  postId!: Number;
  addCommentForm: FormGroup;
  commentPayload: CommentPayload;
  body = new FormControl('');

  constructor(private aRoute: ActivatedRoute, private commentService: CommentService, private router: Router) {
    this.addCommentForm = new FormGroup({
      body: this.body
    });
    this.commentPayload = {
      body: "",
      createdAt: "",
      username: "",
      postId: ""

    }
  }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params => {
      this.postId = params['id'];
    });
  }

  addComment(): void {
    this.commentPayload.body = this.addCommentForm.value.body
    this.commentService.addComment(this.postId, this.commentPayload).subscribe({
      complete: () => {
        console.log('commented successfully')
      }, error: () => {
        console.log('comment upload failed')
      }, next: () => {
        this.router.navigateByUrl('/discussion/' + this.postId).then(() => console.log('redirecting back to post comments'))
      }
    });
  }

}
