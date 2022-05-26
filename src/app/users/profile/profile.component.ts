import { Component, OnInit } from '@angular/core';
import {UserPayload} from "../../payloads/user-payload";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: UserPayload;
  permalink!: Number;

  updateProfileForm: FormGroup;

  name = new FormControl('')
  lastName = new FormControl('');
  dateOfBirth = new FormControl('');
  phoneNumber = new FormControl('');
  description = new FormControl('');

  contactEmail = new FormControl('');
  websiteUrl = new FormControl('');
  facebookPageUrl = new FormControl('');
  organizationNeeds = new FormControl('');

  selectedFiles?: FileList;
  previews: string[] = [];

  formData: FormData = new FormData();

  constructor(private aRoute: ActivatedRoute, private userService: UserService) {
    this.user = {
      accountType: "",
      communityStanding: "",
      contactEmail: "",
      dateOfBirth: "",
      description: "",
      email: "",
      facebookPageUrl: "",
      id: "",
      lastName: "",
      name: "",
      organizationNeeds: "",
      phoneNumber: "",
      profileImage: undefined,
      websiteUrl: ""
    }

    this.updateProfileForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      phoneNumber: this.phoneNumber,
      description: this.description,
      contactEmail: this.contactEmail,
      websiteUrl: this.websiteUrl,
      facebookPageUrl: this.facebookPageUrl,
      organizationNeeds: this.organizationNeeds
    });
  }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params => {
      this.permalink = params['id'];
    });

    this.userService.getUser(this.permalink).subscribe({
      error: () => {
        console.log('Failure Response')
      }, next: (data:UserPayload) => {
        this.user = data;
      }
    });
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

  updateProfile() {
    this.user.name = this.name.value;
    this.user.lastName = this.lastName.value;
    this.user.dateOfBirth = this.dateOfBirth.value;
    this.user.phoneNumber = this.phoneNumber.value;
    this.user.description = this.description.value;

    this.user.contactEmail = this.contactEmail.value;
    this.user.websiteUrl = this.websiteUrl.value;
    this.user.facebookPageUrl = this.facebookPageUrl.value;
    this.user.organizationNeeds = this.organizationNeeds.value;


    this.formData.append('request', JSON.stringify(this.user))

    this.userService.updateUserInfo(this.formData).subscribe({
      complete: () => {
        console.log('user info updated successfully')
      }, error: () => {
        console.log('error while updating user info')
      }, next: () => {
        window.location.reload();
      }
    });
  }
}
