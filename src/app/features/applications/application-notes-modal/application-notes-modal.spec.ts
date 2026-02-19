import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationNotesModal } from './application-notes-modal';

describe('ApplicationNotesModal', () => {
  let component: ApplicationNotesModal;
  let fixture: ComponentFixture<ApplicationNotesModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationNotesModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationNotesModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
