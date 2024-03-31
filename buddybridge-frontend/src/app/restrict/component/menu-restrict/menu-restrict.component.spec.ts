import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRestrictComponent } from './menu-restrict.component';

describe('MenuRestrictComponent', () => {
  let component: MenuRestrictComponent;
  let fixture: ComponentFixture<MenuRestrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuRestrictComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuRestrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
