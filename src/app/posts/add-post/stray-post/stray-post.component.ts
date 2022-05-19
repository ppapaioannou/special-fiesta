import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PostPayload} from "../../post-payload";
import {PostService} from "../../post.service";
import {Router} from "@angular/router";
import {LocationPayload} from "../../../location/location-payload";

@Component({
  selector: 'app-stray-post',
  templateUrl: './stray-post.component.html',
  styleUrls: ['./stray-post.component.css']
})
export class StrayPostComponent implements OnInit {

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
    { id: 2, name: "Female" },
    { id: 3, name: "Unknown"}
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
    { id: 4, name: "Unknown"}
  ];

  actions = [
    { id: 1, name: "No actions taken" },
    { id: 2, name: "Brought it to an animal shelter" },
    { id: 3, name: "Informed the competent municipality / local police" },
    { id: 4, name: "Brought it to a vet or an animal clinic" },
    { id: 5, name: "Adopted" },
    { id: 6, name: "Other" }
  ];

  addPostForm: FormGroup;
  postPayload: PostPayload;
  animalType = new FormControl('')
  title = new FormControl('');
  location = new FormControl('');
  date = new FormControl('');
  breed = new FormControl('');
  gender = new FormControl('');
  size = new FormControl('');
  microchipNumber = new FormControl('');
  body = new FormControl('');
  actionTaken = new FormControl('');
  actionTakenOther = new FormControl('');

  selectedFiles?: FileList;
  previews: string[] = [];

  formData: FormData = new FormData();


  constructor(private postService: PostService, private router: Router) {
    this.addPostForm = new FormGroup({
      animalType: this.animalType,
      title: this.title,
      location: this.location,
      date: this.date,
      breed: this.breed,
      gender: this.gender,
      size: this.size,
      microchipNumber: this.microchipNumber,
      body: this.body,
      actionTaken: this.actionTaken,
      actionTakenOther: this.actionTakenOther
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
    }
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
    this.postPayload.animalType = this.addPostForm.value.animalType;
    this.postPayload.body = this.addPostForm.value.body;
    this.postPayload.breed = this.addPostForm.value.breed;
    this.postPayload.colors = this.color;
    this.postPayload.date = this.addPostForm.value.date;
    this.postPayload.gender = this.addPostForm.value.gender;
    this.postPayload.microchipNumber = this.addPostForm.value.microchipNumber;
    this.postPayload.postType = "stray";
    this.postPayload.size = this.addPostForm.value.size;
    this.postPayload.title = this.addPostForm.value.title;

    if (this.addPostForm.value.actionTaken == 'Other') {
      this.postPayload.actionTaken = this.addPostForm.value.actionTakenOther;
    }
    else {
      this.postPayload.actionTaken = this.addPostForm.value.actionTaken;
    }

    this.formData.append('request', JSON.stringify(this.postPayload))


    this.postService.addPost(this.postPayload, this.formData).subscribe({
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
