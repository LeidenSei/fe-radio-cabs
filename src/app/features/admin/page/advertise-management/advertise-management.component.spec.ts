import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseManagementComponent } from './advertise-management.component';

describe('AdvertiseManagementComponent', () => {
  let component: AdvertiseManagementComponent;
  let fixture: ComponentFixture<AdvertiseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertiseManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertiseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
