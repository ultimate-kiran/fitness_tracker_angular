import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionhomeComponent } from './nutritionhome.component';

describe('NutritionhomeComponent', () => {
  let component: NutritionhomeComponent;
  let fixture: ComponentFixture<NutritionhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionhomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
