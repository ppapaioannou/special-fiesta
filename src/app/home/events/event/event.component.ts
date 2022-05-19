import { Component, OnInit } from '@angular/core';
import {PostPayload} from "../../../posts/post-payload";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../../posts/post.service";
import {ImageService} from "../../../posts/image.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  post: PostPayload;
  postImages: any;
  permalink!: Number;

  constructor(private aRoute: ActivatedRoute, private postService: PostService, private imageService: ImageService) {
    this.post = {
      actionTaken: "",
      address: "",
      age: "",
      animalType: "",
      body: "",
      breed: "",
      colors: [],
      createdAt: "",
      date: "",
      time: "",
      eventAttendees: "",
      distance: 0,
      gender: "",
      goodWithAnimals: false,
      goodWithChildren: false,
      id: "",
      latitude: "",
      longitude: "",
      microchipNumber: "",
      neutered: false,
      postType: "",
      size: "",
      thumbnail: undefined,
      title: "",
      userId: "",
      username: ""
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

  willNotAttendEvent() {
  }

  willAttendEvent() {
    this.postService.willAttendEvent(this.permalink).subscribe({
      complete: () => {
        console.log('response updated successfully')
      }, error: () => {
        console.log('response update failed')
      }, next: () => {
        window.location.reload();
      }
    });
  }
}
