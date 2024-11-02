import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacaixaFormComponent } from './contacaixa-form.component';

describe('ContacaixaFormComponent', () => {
  let component: ContacaixaFormComponent;
  let fixture: ComponentFixture<ContacaixaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContacaixaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContacaixaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
