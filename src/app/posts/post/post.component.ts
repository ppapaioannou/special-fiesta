import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostPayload} from '../post-payload';
import {PostService} from "../post.service";
import {AuthService} from "../../auth/auth.service";
import {Observable} from "rxjs";
import {ImageService} from "../image.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: PostPayload;
  postImages: any;
  permalink!: Number;

  constructor(private aRoute: ActivatedRoute, private postService: PostService, private imageService: ImageService) {
    this.post = {
      animalType: "",
      body: "",
      breed: "",
      colors: [],
      createdAt: "",
      date: "",
      gender: "",
      id: "",
      microchipNumber: "",
      postType: "",
      size: "",
      thumbnail: "",
      title: "",
      username: "",
      userId: "",

      latitude: "",
      longitude: "",
      address: "",
      distance: ""
    };
  }

  ngOnInit() {
    this.aRoute.params.subscribe(params => {
      this.permalink = params['id'];
    });

    this.postService.getPost(this.permalink).subscribe({
      error: () => {
        console.log('Failure Response')
      }, next: (data:PostPayload) => {
        this.post = data;
      }
    });

    this.postImages = this.imageService.getPostImages(this.permalink);
  }
}
