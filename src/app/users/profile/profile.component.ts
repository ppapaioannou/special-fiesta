import { Component, OnInit } from '@angular/core';
import {UserPayload} from "../../payload/user-payload";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ImageService} from "../../service/image.service";

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

  previews: string[] = [];

  request: FormData = new FormData();

  constructor(private aRoute: ActivatedRoute, private userService: UserService, public imageService: ImageService) {
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
      next: (data:UserPayload) => {
        this.user = data;
      },
      error: () => {
        console.log('Failure Response')
      }
    });
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


    this.request.append('payload', JSON.stringify(this.user))

    this.userService.updateUserInfo(this.request).subscribe({
      next: () => {
        console.log('user info updated successfully')
        this.ngOnInit()
      },
      error: () => {
        console.log('error while updating user info')
      }
    });
  }
}
