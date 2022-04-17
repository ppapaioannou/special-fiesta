import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostPayload} from '../add-post/post-payload';
import {PostService} from "../post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: PostPayload;
  permalink!: Number;

  constructor(private router: ActivatedRoute, private postService: PostService) {
    this.post = {
      id: '',
      title: '',
      body: '',
      username: ''
    };
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.permalink = params['id'];
    });

    //this.postService.getPost(this.permalink).subscribe((data:PostPayload) => {
    //  this.post = data;
    //},(error: any) => {
    //  console.log('Failure Response');
    //})
    this.postService.getPost(this.permalink).subscribe({
      error: () => {
        console.log('register failed')
      }, next: (data:PostPayload) => {
        this.post = data;
      }
    });
  }

}
