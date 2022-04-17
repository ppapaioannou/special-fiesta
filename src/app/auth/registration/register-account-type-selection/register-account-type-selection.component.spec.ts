import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAccountTypeSelectionComponent } from './register-account-type-selection.component';

describe('RegisterAccountTypeSelectionComponent', () => {
  let component: RegisterAccountTypeSelectionComponent;
  let fixture: ComponentFixture<RegisterAccountTypeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAccountTypeSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAccountTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
