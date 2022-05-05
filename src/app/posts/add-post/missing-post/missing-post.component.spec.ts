import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingPostComponent } from './missing-post.component';

describe('MissingPostComponent', () => {
  let component: MissingPostComponent;
  let fixture: ComponentFixture<MissingPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
