import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMenuAccessFormComponent } from './users-menu-access-form.component';

describe('UsersMenuAccessFormComponent', () => {
  let component: UsersMenuAccessFormComponent;
  let fixture: ComponentFixture<UsersMenuAccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMenuAccessFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersMenuAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
