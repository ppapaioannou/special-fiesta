import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTypeSelectionComponent } from './post-type-selection.component';

describe('PostTypeSelectionComponent', () => {
  let component: PostTypeSelectionComponent;
  let fixture: ComponentFixture<PostTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTypeSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
