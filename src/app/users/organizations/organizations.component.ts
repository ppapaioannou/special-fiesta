import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {UserPayload} from "../user-payload";
import {UserService} from "../user.service";

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  searchForm: FormGroup;
  searchInput = new FormControl('')
  organizations!: Observable<Array<UserPayload>>;

  constructor(private userService: UserService) {
    this.searchForm = new FormGroup({
      searchInput: this.searchInput
    });
  }

  ngOnInit(): void {
    this.organizations = this.userService.getAllUsers("ORGANIZATION", false, "");
  }

  search() {
    let combined = ""
    if (this.searchInput.value != "") {
      for (const name of this.searchInput.value.split(" ")) {
        combined += "name:*" + name + "* OR "
      }
      // delete the last OR
      if (combined.length != 0) {
        combined = "(" + combined.slice(0,-4) + ")"
      }
      console.log(combined)
      this.organizations = this.userService.getAllUsers("ORGANIZATION", false, combined);
    }
    else {
      this.organizations = this.userService.getAllUsers("ORGANIZATION", false, "");
    }
  }

}
