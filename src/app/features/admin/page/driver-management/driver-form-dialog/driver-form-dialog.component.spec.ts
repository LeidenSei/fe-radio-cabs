import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverFormDialogComponent } from './driver-form-dialog.component';

describe('DriverFormDialogComponent', () => {
  let component: DriverFormDialogComponent;
  let fixture: ComponentFixture<DriverFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
