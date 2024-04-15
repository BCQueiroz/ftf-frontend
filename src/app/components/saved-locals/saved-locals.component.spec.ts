import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedLocalsComponent } from './saved-locals.component';

describe('SavedLocalsComponent', () => {
  let component: SavedLocalsComponent;
  let fixture: ComponentFixture<SavedLocalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedLocalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedLocalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
