import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionProfileListComponent } from './adoption-profile-list.component';

describe('AdoptionListComponent', () => {
  let component: AdoptionProfileListComponent;
  let fixture: ComponentFixture<AdoptionProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionProfileListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
