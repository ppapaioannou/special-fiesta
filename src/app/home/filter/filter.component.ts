import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {PostService} from "../../posts/post.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  criteriaForm: FormGroup;

  orderBy = new FormControl('date')

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

  ages = [
    {id: 1, name: "< 6 months"},
    {id: 2, name: "6 months to 1 year"},
    {id: 3, name: "1 to 2 years"},
    {id: 4, name: "2 to 5 years"},
    {id: 5, name: "5+ years"},
    {id: 6, name: "Any"}
  ];
  age = new FormControl('');

  constructor(private router: Router, private postService: PostService) {
    this.criteriaForm = new FormGroup({
      orderBy: this.orderBy,
      animalType: this.animalType,
      size: this.size,
      gender: this.gender,
      age: this.age
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
    let filterCriteria: String[] = [];
    let criteria = ""

    for (const type of this.postType) {
      criteria += "postType:" + type + " OR "
    }
    // delete the last OR
    if (this.postType.length != 0) {
      criteria = "(" + criteria.slice(0,-4) + ")"
    }
    if (criteria != "") {
      filterCriteria.push(criteria)
      criteria = ""
    }


    if (this.animalType.value == 'Any') {
      criteria += "(animalCharacteristics.animalType:Dog OR animalCharacteristics.animalType:Cat)"
    }
    else if (this.animalType.value == 'Dogs' || this.animalType.value == 'Cats') {
      criteria += "(animalCharacteristics.animalType:" + this.animalType.value.slice(0,-1) + ")"
    }

    if (criteria != "") {
      filterCriteria.push(criteria)
      criteria = ""
    }


    if (this.size.value == 'Any') {
      criteria += "(animalCharacteristics.size:Small " +
        "OR animalCharacteristics.size:Medium " +
        "OR animalCharacteristics.size:Large)"
    }
    else if (this.size.value == 'Small' || this.size.value == 'Medium' || this.size.value == 'Large'){
      criteria += "(animalCharacteristics.size:" + this.size.value + ")"
    }

    if (criteria != "") {
      filterCriteria.push(criteria)
      criteria = ""
    }



    if (this.gender.value == 'Any') {
      criteria += "(animalCharacteristics.gender:Male OR animalCharacteristics.gender:Female)"
    }
    else if (this.gender.value == 'Male' || this.gender.value == 'Female'){
      criteria += "(animalCharacteristics.gender:" + this.gender.value + ")"
    }

    if (criteria != "") {
      filterCriteria.push(criteria)
      criteria = ""
    }

    if (this.age.value == 'Any') {
      criteria += "(animalCharacteristics.age:'< 6 months' " +
        "OR animalCharacteristics.age:'6 months to 1 year' " +
        "OR animalCharacteristics.age:'1 to 2 years' " +
        "OR animalCharacteristics.age:'2 to 5 years' " +
        "OR animalCharacteristics.age:'5+ years')"
    }
    else if (this.age.value != ''){
      criteria += "(animalCharacteristics.age:'" + this.age.value + "')"
    }

    if (criteria != "") {
      filterCriteria.push(criteria)
    }

    criteria = ""
    for (const filter of filterCriteria) {
      criteria += filter + " AND "
    }
    // delete the last AND
    if (criteria.length != 0) {
      criteria = criteria.slice(0,-5)
      criteria = " AND " + criteria
    }

    this.postService.setFilterCriteria(criteria, this.orderBy.value);

    this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
  }

}
