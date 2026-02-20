import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStatusModal } from './application-status-modal';

describe('ApplicationStatusModal', () => {
  let component: ApplicationStatusModal;
  let fixture: ComponentFixture<ApplicationStatusModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationStatusModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationStatusModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
