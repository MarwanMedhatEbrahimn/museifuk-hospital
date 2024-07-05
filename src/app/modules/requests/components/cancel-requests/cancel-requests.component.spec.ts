import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRequestsComponent } from './cancel-requests.component';

describe('CancelRequestsComponent', () => {
  let component: CancelRequestsComponent;
  let fixture: ComponentFixture<CancelRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
