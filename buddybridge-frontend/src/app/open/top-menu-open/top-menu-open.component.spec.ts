import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMenuOpenComponent } from './top-menu-open.component';

describe('TopMenuOpenComponent', () => {
  let component: TopMenuOpenComponent;
  let fixture: ComponentFixture<TopMenuOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopMenuOpenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopMenuOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
