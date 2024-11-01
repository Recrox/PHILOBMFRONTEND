import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSelectComponent } from './car-select.component';

describe('CarComponent', () => {
  let component: CarSelectComponent;
  let fixture: ComponentFixture<CarSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
