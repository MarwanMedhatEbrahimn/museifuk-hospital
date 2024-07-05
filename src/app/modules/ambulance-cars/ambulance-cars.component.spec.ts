import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceCarsComponent } from './ambulance-cars.component';

describe('AmbulanceCarsComponent', () => {
  let component: AmbulanceCarsComponent;
  let fixture: ComponentFixture<AmbulanceCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbulanceCarsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AmbulanceCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
