import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFormDemoComponent } from './angular-form-demo.component';

describe('AngularFormDemoComponent', () => {
  let component: AngularFormDemoComponent;
  let fixture: ComponentFixture<AngularFormDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularFormDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFormDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
