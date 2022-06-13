import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostPayload} from '../../payload/post-payload';
import {PostService} from "../../service/post.service";
import {ImageService} from "../../service/image.service";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: PostPayload;
  postImages: any;
  permalink!: number;

  numberOfAttendees?: number;
  isAttending: boolean;

  constructor(private aRoute: ActivatedRoute, private postService: PostService,
              private imageService: ImageService, public authService: AuthService) {
    this.isAttending = false;
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
      distance: 0,
      eventAttendees: [],
      gender: "",
      goodWithAnimals: "",
      goodWithChildren: "",
      id: "",
      latitude: "",
      longitude: "",
      microchipNumber: "",
      neutered: "",
      numberOfComments: 0,
      postType: "",
      size: "",
      thumbnail: "",
      time: "",
      title: "",
      userId: "",
      userName: ""
    }
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
        this.numberOfAttendees = data.eventAttendees?.length;
        this.isAttending = !!data.eventAttendees?.some(e => e.id === this.authService.getUserId());
      }
    });

    this.postImages = this.imageService.getPostImages(this.permalink);
  }

  attendEvent() {
    this.postService.attendEvent(this.permalink).subscribe({
      next: () => {
        console.log('response updated successfully')
        this.ngOnInit()
      }, error: () => {
        console.log('response update failed')
      },
    });
  }
}
