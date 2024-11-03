import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashAdocaoComponent } from './dash-adocao.component';

describe('DashAdocaoComponent', () => {
  let component: DashAdocaoComponent;
  let fixture: ComponentFixture<DashAdocaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashAdocaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashAdocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
