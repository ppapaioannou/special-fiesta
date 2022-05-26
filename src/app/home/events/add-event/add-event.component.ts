import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PostPayload} from "../../../posts/post-payload";
import {PostService} from "../../../posts/post.service";
import {Router} from "@angular/router";
import {LocationPayload} from "../../../location/location-payload";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  animalTypes = [
    { id: 1, name: "Dog" },
    { id: 2, name: "Cat" },
    { id: 3, name: "Other"}
  ];

  dogBreeds = [
    { id: 1, name: "Mixed breed" },
    { id: 2, name: "German Shepherd" },
    { id: 3, name: "Golden Retriever" },
    { id: 4, name: "Greek Sheepdog" },
    { id: 5, name: "Labrador" },
    { id: 6, name: "Greek Sheepdog" },
    { id: 7, name: "Beagle" },
    { id: 8, name: "Boxer" },
    { id: 9, name: "Other" }
  ];

  catBreeds = [
    { id: 1, name: "Mixed breed" },
    { id: 2, name: "Siamese" },
    { id: 3, name: "Persian" },
    { id: 4, name: "Maine Coon" },
    { id: 5, name: "Sphynx" },
    { id: 6, name: "Bengal" },
    { id: 7, name: "Abyssinian" },
    { id: 8, name: "Birman" },
    { id: 9, name: "Other" }
  ];

  genders = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" }
  ];

  colors = [
    { id: 1, name: "Black" },
    { id: 2, name: "Brown" },
    { id: 3, name: "Grey" },
    { id: 4, name: "White" },
    { id: 5, name: "Orange" }
  ];
  color: String[] = [];

  sizes = [
    { id: 1, name: "Small" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Large" },
  ];

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  location = new FormControl('');
  date = new FormControl('');
  time = new FormControl('12:00')
  body = new FormControl('');

  selectedFiles?: FileList;
  previews: string[] = [];

  formData: FormData = new FormData();


  constructor(private postService: PostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      location: this.location,
      date: this.date,
      time: this.time,
      body: this.body
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
      goodWithAnimals: false,
      goodWithChildren: false,
      id: "",
      latitude: "",
      longitude: "",
      microchipNumber: "",
      neutered: false,
      numberOfComments: 0,
      postType: "",
      size: "",
      thumbnail: undefined,
      time: "",
      title: "",
      userId: "",
      username: ""
    };
  }

  ngOnInit() {
  }

  previewImages(event: any) {
    this.selectedFiles = event.target.files;

    this.previews = [];
    this.formData.delete('file')
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          //console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
        this.formData.append('file', this.selectedFiles[i])
        //this.postPayload.imagesData.push(this.selectedFiles[i])
      }
    }
  }

  onCbChange(e: any) {
    if (this.color.includes(e.target.value)) {
      const index: number = this.color.indexOf(e.target.value);
      this.color.splice(index, 1)
    }
    else {
      this.color.push(e.target.value)
    }
  }

  setLocation(locationPayload: LocationPayload) {
    this.postPayload.latitude = locationPayload.latitude;
    this.postPayload.longitude = locationPayload.longitude;
    this.postPayload.address =locationPayload.address;
  }

  addPost() {
    this.postPayload.body = this.addPostForm.value.body;
    this.postPayload.date = this.addPostForm.value.date;
    this.postPayload.time = this.addPostForm.value.time + ":00"; //seconds
    this.postPayload.postType = "event";
    this.postPayload.title = this.addPostForm.value.title;

    this.formData.append('request', JSON.stringify(this.postPayload))


    this.postService.addPost(this.postPayload, this.formData).subscribe({
      complete: () => {
        console.log('posted successfully')
      }, error: () => {
        console.log('post upload failed')
      }, next: () => {
        this.router.navigateByUrl('/events').then(() => console.log('redirecting to home'))
      }
    });
  }
}
