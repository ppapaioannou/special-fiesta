import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRescueModeComponent } from './home-rescue-mode.component';

describe('HomeRescueModeComponent', () => {
  let component: HomeRescueModeComponent;
  let fixture: ComponentFixture<HomeRescueModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRescueModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRescueModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
