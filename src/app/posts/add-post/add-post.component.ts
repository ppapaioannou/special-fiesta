import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PostPayload} from "./post-payload";
import {Router} from "@angular/router";
import {PostService} from "../post.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');

  constructor(private postService: PostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    });
    this.postPayload = {
      id: '',
      title: '',
      body: '',
      username: ''
    }
  }

  ngOnInit() {
  }

  addPost() {
    this.postPayload.title = this.addPostForm.value.title;
    this.postPayload.body = this.addPostForm.value.body;
    this.postService.addPost(this.postPayload).subscribe({
      complete: () => {
        console.log('posted successfully')
      }, error: () => {
        console.log('post upload failed')
      }, next: () => {
        this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
      }
    });
  }

}
