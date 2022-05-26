import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserPayload} from "../user-payload";
import {UserService} from "../user.service";
import {FormControl, FormGroup} from "@angular/forms";
import {PostPayload} from "../../posts/post-payload";

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.css']
})
export class IndividualsComponent implements OnInit {
  searchForm: FormGroup;
  searchInput = new FormControl('')
  individuals!: Observable<Array<UserPayload>>;

  constructor(private userService: UserService) {
    this.searchForm = new FormGroup({
      searchInput: this.searchInput
    });
  }

  ngOnInit(): void {
    this.individuals = this.userService.getAllUsers("INDIVIDUAL", false, "");
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
      this.individuals = this.userService.getAllUsers("INDIVIDUAL", false, combined);
    }
    else {
      this.individuals = this.userService.getAllUsers("INDIVIDUAL", false, "");
    }
  }

}
