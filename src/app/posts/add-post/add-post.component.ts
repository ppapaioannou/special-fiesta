import { Component, OnInit } from '@angular/core';
import {appProperties} from "../../app-properties";
import {FormControl, FormGroup} from "@angular/forms";
import {PostPayload} from "../../payload/post-payload";
import {PostService} from "../../service/post.service";
import {ImageService} from "../../service/image.service";
import {Router} from "@angular/router";
import {LocationPayload} from "../../payload/location-payload";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postType!: string;

  animalTypes = appProperties.animalTypes;
  dogBreeds = appProperties.dogBreeds;
  catBreeds = appProperties.catBreeds;
  ages = appProperties.ages;
  genders = appProperties.genders;
  colors = appProperties.colors;
  sizes = appProperties.sizes;
  actions = appProperties.actions;

  addPostForm: FormGroup;
  postPayload: PostPayload;

  previews: string[] = [];

  request: FormData = new FormData();


  constructor(public postService: PostService, public imageService: ImageService, private router: Router) {
    this.postType = router.url.slice(10)

    this.addPostForm = new FormGroup({
      animalType: new FormControl(),
      title: new FormControl(),
      location: new FormControl(),
      date: new FormControl(),
      breed: new FormControl(),
      gender: new FormControl(),
      color: new FormControl([]),
      size: new FormControl(),
      microchipNumber: new FormControl(),
      body: new FormControl(),
      actionTaken: new FormControl(),
      actionTakenOther: new FormControl(),
      age: new FormControl(),
      neutered: new FormControl(),
      goodWithChildren: new FormControl(),
      goodWithAnimals: new FormControl(),
      time: new FormControl('12:00')
    });
    this.postPayload = {
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
      eventAttendees: "",
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
    };
  }

  ngOnInit() { }

  setPostColors(event: any) {
    if (this.addPostForm.value['color'].includes(event.target.value)) {
      const index: number = this.addPostForm.value['color'].indexOf(event.target.value);
      this.addPostForm.value['color'].splice(index, 1)
    }
    else {
      this.addPostForm.value['color'].push(event.target.value)
    }
  }

  setLocation(locationPayload: LocationPayload) {
    this.postPayload.latitude = locationPayload.latitude;
    this.postPayload.longitude = locationPayload.longitude;
    this.postPayload.address =locationPayload.address;
  }

  addPost() {
    this.postPayload.animalType = this.addPostForm.value['animalType'];
    this.postPayload.body = this.addPostForm.value['body'];
    this.postPayload.breed = this.addPostForm.value['breed'];
    this.postPayload.colors = this.addPostForm.value['color'];
    this.postPayload.gender = this.addPostForm.value['gender'];
    this.postPayload.size = this.addPostForm.value['size'];
    this.postPayload.title = this.addPostForm.value['title'];
    this.postPayload.age = this.addPostForm.value['age'];
    this.postPayload.neutered = this.addPostForm.value['neutered'];
    this.postPayload.goodWithChildren = this.addPostForm.value['goodWithChildren'];
    this.postPayload.goodWithAnimals = this.addPostForm.value['goodWithAnimals'];
    this.postPayload.date = this.addPostForm.value['date'];
    this.postPayload.microchipNumber = this.addPostForm.value['microchipNumber'];

    if (this.addPostForm.value.actionTaken == 'Other') {
      this.postPayload.actionTaken = this.addPostForm.value.actionTakenOther;
    }
    else {
      this.postPayload.actionTaken = this.addPostForm.value.actionTaken;
    }

    this.postPayload.time = this.addPostForm.value['time'] + ":00";

    this.request.append('payload', JSON.stringify(this.postPayload))

    this.postService.addPost(this.request, this.postType).subscribe({
      next: () => {
        console.log('posted successfully')
        this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
      },
      error: (err) => {
        this.router.navigateByUrl('/post-error').then(() => console.log('error: ' + err.status));
      }
    });
  }

}
