import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileQuickActions } from './profile-quick-actions';

describe('ProfileQuickActions', () => {
  let component: ProfileQuickActions;
  let fixture: ComponentFixture<ProfileQuickActions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileQuickActions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileQuickActions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
