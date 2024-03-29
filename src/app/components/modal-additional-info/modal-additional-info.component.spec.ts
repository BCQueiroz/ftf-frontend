import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdditionalInfoComponent } from './modal-additional-info.component';

describe('ModalAdditionalInfoComponent', () => {
  let component: ModalAdditionalInfoComponent;
  let fixture: ComponentFixture<ModalAdditionalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAdditionalInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
