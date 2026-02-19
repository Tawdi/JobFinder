import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRemoveModal } from './application-remove-modal';

describe('ApplicationRemoveModal', () => {
  let component: ApplicationRemoveModal;
  let fixture: ComponentFixture<ApplicationRemoveModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationRemoveModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationRemoveModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
