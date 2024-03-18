import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLocalsComponent } from './search-locals.component';

describe('SearchLocalsComponent', () => {
  let component: SearchLocalsComponent;
  let fixture: ComponentFixture<SearchLocalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchLocalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchLocalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
