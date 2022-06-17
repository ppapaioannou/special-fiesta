import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {PostService} from "../../service/post.service";
import {appProperties} from "../../app-properties";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  postTypes = appProperties.postTypes;
  animalTypes = appProperties.animalTypesFilter;
  sizes = appProperties.sizesFilter;
  genders = appProperties.gendersFilter;
  ages = appProperties.agesFilter;

  criteriaForm: FormGroup;

  constructor(private router: Router, private postService: PostService) {
    this.criteriaForm = new FormGroup({
      orderBy: new FormControl('date'),
      postType: new FormControl([]),
      animalType: new FormControl(),
      size: new FormControl(),
      gender: new FormControl(),
      age: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  // post type selection
  // create array with the types of posts
  onCbChange(event: any) {
    if (this.criteriaForm.value['postType'].includes(event.target.value)) {
      const index: number = this.criteriaForm.value['postType'].indexOf(event.target.value);
      this.criteriaForm.value['postType'].splice(index, 1)
    }
    else {
      this.criteriaForm.value['postType'].push(event.target.value)
    }
  }

  filter() {
    let filterCriteria: String[] = [];
    let criteria = ""

    for (const type of this.criteriaForm.value['postType']) {
      criteria += "postType:" + type + " OR "
    }
    // delete the last OR
    if (this.criteriaForm.value['postType'].length != 0) {
      criteria = "(" + criteria.slice(0,-4) + ")"
    }
    if (criteria != "") {
      filterCriteria.push(criteria)
      criteria = ""
    }


    if (this.criteriaForm.value['animalType'] == 'Any') {
      criteria += "(animalCharacteristics.animalType:Dog OR animalCharacteristics.animalType:Cat)"
    }
    else if (this.criteriaForm.value['animalType'] == 'Dogs' || this.criteriaForm.value['animalType'] == 'Cats') {
      criteria += "(animalCharacteristics.animalType:" + this.criteriaForm.value['animalType'].slice(0,-1) + ")"
    }

    if (criteria != "") {
      filterCriteria.push(criteria)
      criteria = ""
    }


    if (this.criteriaForm.value['size'] == 'Any') {
      criteria += "(animalCharacteristics.size:Small " +
        "OR animalCharacteristics.size:Medium " +
        "OR animalCharacteristics.size:Large)"
    }
    else if (this.criteriaForm.value['size'] == 'Small' || this.criteriaForm.value['size'] == 'Medium' || this.criteriaForm.value['size'] == 'Large'){
      criteria += "(animalCharacteristics.size:" + this.criteriaForm.value['size'] + ")"
    }

    if (criteria != "") {
      filterCriteria.push(criteria)
      criteria = ""
    }



    if (this.criteriaForm.value['gender'] == 'Any') {
      criteria += "(animalCharacteristics.gender:Male OR animalCharacteristics.gender:Female)"
    }
    else if (this.criteriaForm.value['gender'] == 'Male' || this.criteriaForm.value['gender'] == 'Female'){
      criteria += "(animalCharacteristics.gender:" + this.criteriaForm.value['gender'] + ")"
    }

    if (criteria != "") {
      filterCriteria.push(criteria)
      criteria = ""
    }

    if (this.criteriaForm.value['age'] == 'Any') {
      criteria += "(animalCharacteristics.age:'< 6 months' " +
        "OR animalCharacteristics.age:'6 months to 1 year' " +
        "OR animalCharacteristics.age:'1 to 2 years' " +
        "OR animalCharacteristics.age:'2 to 5 years' " +
        "OR animalCharacteristics.age:'5+ years')"
    }
    else if (this.criteriaForm.value['age'] != ''){
      criteria += "(animalCharacteristics.age:'" + this.criteriaForm.value['age'] + "')"
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

    this.postService.setFilterCriteria(criteria, this.criteriaForm.value['orderBy']);

    this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
  }

}
