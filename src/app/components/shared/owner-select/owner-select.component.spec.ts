import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSelectComponent } from './owner-select.component';

describe('OwnerSelectComponent', () => {
  let component: OwnerSelectComponent;
  let fixture: ComponentFixture<OwnerSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
