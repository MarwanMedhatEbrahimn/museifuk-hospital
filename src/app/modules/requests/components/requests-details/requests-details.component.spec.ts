import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsDetailsComponent } from './requests-details.component';

describe('RequestsDetailsComponent', () => {
  let component: RequestsDetailsComponent;
  let fixture: ComponentFixture<RequestsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
