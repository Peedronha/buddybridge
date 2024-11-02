import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashfinanceiroComponent } from './dashfinanceiro.component';

describe('DashfinanceiroComponent', () => {
  let component: DashfinanceiroComponent;
  let fixture: ComponentFixture<DashfinanceiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashfinanceiroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashfinanceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
