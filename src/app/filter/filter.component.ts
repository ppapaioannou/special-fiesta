import { Component, OnInit } from '@angular/core';
import {colors} from "@angular/cli/utilities/color";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../posts/post.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  criteriaForm: FormGroup;
  filterCriteria = ""

  postTypes = [
    { id: 1, name: "Missing" },
    { id: 2, name: "Adoption" },
    { id: 3, name: "Stray" },
    { id: 4, name: "Simple" }
  ];

  postType: String[] = [];

  animalTypes = [
    { id: 1, name: "Dogs" },
    { id: 2, name: "Cats" },
    { id: 3, name: "Any" }
  ];
  animalType = new FormControl('');

  sizes = [
    { id: 1, name: "Small" },
    { id: 2, name: "Medium" },
    { id: 3, name: "Large" },
    { id: 4, name: "Any" }
  ];
  size = new FormControl('');

  genders = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Any" }
  ];
  gender = new FormControl('');

  constructor(private router: Router, private postService: PostService) {
    this.criteriaForm = new FormGroup({
      animalType: this.animalType,
      size: this.size,
      gender: this.gender

    });
  }

  ngOnInit(): void {
  }

  onCbChange(e: any) {
    if (this.postType.includes(e.target.value)) {
      const index: number = this.postType.indexOf(e.target.value);
      this.postType.splice(index, 1)
    }
    else {
      this.postType.push(e.target.value)
    }
  }

  filter() {
    this.filterCriteria = ""

    for (const type of this.postType) {
      this.filterCriteria += "postType:'" + type + "' OR "
    }
    if (this.postType.length != 0) {
      this.filterCriteria = "(" + this.filterCriteria.slice(0,-4) + ")"

      this.filterCriteria += " AND "
    }


    if (this.animalType.value == 'Any') {
      this.filterCriteria += "(animalCharacteristics.animalType:'Dog' OR animalCharacteristics.animalType:'Cat')"
      this.filterCriteria += " AND "
    }
    else if (this.animalType.value == 'Dogs' || this.animalType.value == 'Cats') {
      this.filterCriteria += "(animalCharacteristics.animalType:'" + this.animalType.value.slice(0,-1) + "')"
      this.filterCriteria += " AND "
    }



    if (this.size.value == 'Any') {
      this.filterCriteria += "(animalCharacteristics.size:'Small' " +
        "OR animalCharacteristics.size:'Medium' " +
        "OR animalCharacteristics.size:'Large')"
      this.filterCriteria += " AND "
    }
    else if (this.size.value == 'Small' || this.size.value == 'Medium' || this.size.value == 'Large'){
      this.filterCriteria += "(animalCharacteristics.size:'" + this.size.value + "')"
    }



    if (this.gender.value == 'Any') {
      this.filterCriteria += "(animalCharacteristics.gender:'Male' OR animalCharacteristics.gender:'Female')"
    }
    else if (this.gender.value == 'Male' || this.gender.value == 'Female'){
      this.filterCriteria += "(animalCharacteristics.gender:'" + this.gender.value + "')"
    }

    //console.log(this.filterCriteria)
    if (this.filterCriteria != "") {
      this.postService.addFilterCriteria("(" + this.filterCriteria + ")");
    }

    this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
  }

}
