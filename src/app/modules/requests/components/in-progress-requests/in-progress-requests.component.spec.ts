import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressRequestsComponent } from './in-progress-requests.component';

describe('InProgressRequestsComponent', () => {
  let component: InProgressRequestsComponent;
  let fixture: ComponentFixture<InProgressRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InProgressRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InProgressRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
