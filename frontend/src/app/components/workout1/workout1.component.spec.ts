import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Workout1Component} from './workout1.component';

describe('Workout1Component', () => {
  let component: Workout1Component;
  let fixture: ComponentFixture<Workout1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Workout1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Workout1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
