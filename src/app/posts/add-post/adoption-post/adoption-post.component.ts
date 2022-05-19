import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PostPayload} from "../../post-payload";
import {PostService} from "../../post.service";
import {Router} from "@angular/router";
import {LocationPayload} from "../../../location/location-payload";

@Component({
  selector: 'app-adoption-post',
  templateUrl: './adoption-post.component.html',
  styleUrls: ['./adoption-post.component.css']
})
export class AdoptionPostComponent implements OnInit {
  //TODO instead of selecting location, use organizations address.

  animalTypes = [
    {id: 1, name: "Dog"},
    {id: 2, name: "Cat"},
    {id: 3, name: "Other"}
  ];

  dogBreeds = [
    {id: 1, name: "Mixed breed"},
    {id: 2, name: "German Shepherd"},
    {id: 3, name: "Golden Retriever"},
    {id: 4, name: "Greek Sheepdog"},
    {id: 5, name: "Labrador"},
    {id: 6, name: "Greek Sheepdog"},
    {id: 7, name: "Beagle"},
    {id: 8, name: "Boxer"},
    {id: 9, name: "Other"}
  ];

  catBreeds = [
    {id: 1, name: "Mixed breed"},
    {id: 2, name: "Siamese"},
    {id: 3, name: "Persian"},
    {id: 4, name: "Maine Coon"},
    {id: 5, name: "Sphynx"},
    {id: 6, name: "Bengal"},
    {id: 7, name: "Abyssinian"},
    {id: 8, name: "Birman"},
    {id: 9, name: "Other"}
  ];

  ages = [
    {id: 1, name: "< 6 months"},
    {id: 2, name: "6 months to 1 year"},
    {id: 3, name: "1 to 2 years"},
    {id: 4, name: "2 to 5 years"},
    {id: 5, name: "5+ years"}
  ];

  genders = [
    {id: 1, name: "Male"},
    {id: 2, name: "Female"}
  ];

  colors = [
    {id: 1, name: "Black"},
    {id: 2, name: "Brown"},
    {id: 3, name: "Grey"},
    {id: 4, name: "White"},
    {id: 5, name: "Orange"}
  ];
  color: String[] = [];

  sizes = [
    {id: 1, name: "Small"},
    {id: 2, name: "Medium"},
    {id: 3, name: "Large"},
  ];

  addPostForm: FormGroup;
  postPayload: PostPayload;
  animalType = new FormControl('')
  title = new FormControl('');
  location = new FormControl('');
  breed = new FormControl('');
  age = new FormControl('');
  gender = new FormControl('');
  size = new FormControl('');
  neutered = new FormControl('');
  goodWithChildren = new FormControl('');
  goodWithAnimals = new FormControl('');
  body = new FormControl('');

  selectedFiles?: FileList;
  previews: string[] = [];

  formData: FormData = new FormData();


  constructor(private postService: PostService, private router: Router) {
    this.addPostForm = new FormGroup({
      animalType: this.animalType,
      title: this.title,
      location: this.location,
      breed: this.breed,
      gender: this.gender,
      size: this.size,
      body: this.body,
      age: this.age,
      neutered: this.neutered,
      goodWithChildren: this.goodWithChildren,
      goodWithAnimals: this.goodWithAnimals
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
    } else {
      this.color.push(e.target.value)
    }
  }

  setLocation(locationPayload: LocationPayload) {
    this.postPayload.latitude = locationPayload.latitude;
    this.postPayload.longitude = locationPayload.longitude;
    this.postPayload.address = locationPayload.address;
  }

  addPost() {
    this.postPayload.animalType = this.addPostForm.value.animalType;
    this.postPayload.body = this.addPostForm.value.body;
    this.postPayload.breed = this.addPostForm.value.breed;
    this.postPayload.colors = this.color;
    this.postPayload.gender = this.addPostForm.value.gender;
    this.postPayload.postType = "adoption";
    this.postPayload.size = this.addPostForm.value.size;
    this.postPayload.title = this.addPostForm.value.title;
    this.postPayload.age = this.addPostForm.value.age;
    this.postPayload.neutered = this.addPostForm.value.neutered;
    this.postPayload.goodWithChildren = this.addPostForm.value.goodWithChildren;
    this.postPayload.goodWithAnimals = this.addPostForm.value.goodWithAnimals;

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
