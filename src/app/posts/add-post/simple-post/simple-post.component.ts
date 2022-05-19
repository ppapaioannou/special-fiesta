import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PostPayload} from "../../post-payload";
import {Router} from "@angular/router";
import {PostService} from "../../post.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-simple-post',
  templateUrl: './simple-post.component.html',
  styleUrls: ['./simple-post.component.css']
})
export class SimplePostComponent implements OnInit {

  addPostForm: FormGroup;
  postPayload: PostPayload;
  title = new FormControl('');
  body = new FormControl('');

  selectedFiles?: FileList;
  previews: string[] = [];

  formData: FormData = new FormData();


  constructor(private postService: PostService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
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

  addPost() {
    this.postPayload.body = this.addPostForm.value.body;
    this.postPayload.postType = "simple";
    this.postPayload.title = this.addPostForm.value.title;

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
