import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTagListComponent } from './modal-tag-list.component';

describe('ModalTagListComponent', () => {
  let component: ModalTagListComponent;
  let fixture: ComponentFixture<ModalTagListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTagListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
