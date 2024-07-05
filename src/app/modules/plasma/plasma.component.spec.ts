import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlasmaComponent } from './plasma.component';

describe('PlasmaComponent', () => {
  let component: PlasmaComponent;
  let fixture: ComponentFixture<PlasmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlasmaComponent]
    });
    fixture = TestBed.createComponent(PlasmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
