import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrayPostComponent } from './stray-post.component';

describe('StrayPostComponent', () => {
  let component: StrayPostComponent;
  let fixture: ComponentFixture<StrayPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrayPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrayPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
