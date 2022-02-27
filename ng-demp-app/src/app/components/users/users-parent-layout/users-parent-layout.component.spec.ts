import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersParentLayoutComponent } from './users-parent-layout.component';

describe('UsersParentLayoutComponent', () => {
  let component: UsersParentLayoutComponent;
  let fixture: ComponentFixture<UsersParentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersParentLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersParentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
