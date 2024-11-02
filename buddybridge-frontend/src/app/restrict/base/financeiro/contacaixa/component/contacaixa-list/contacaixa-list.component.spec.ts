import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContacaixaListComponent } from './contacaixa-list.component';

describe('ContacaixaListComponent', () => {
  let component: ContacaixaListComponent;
  let fixture: ComponentFixture<ContacaixaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContacaixaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContacaixaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
