import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStats } from './application-stats';

describe('ApplicationStats', () => {
  let component: ApplicationStats;
  let fixture: ComponentFixture<ApplicationStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
