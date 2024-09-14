import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoacessoListComponent } from './grupoacesso-list.component';

describe('GrupoacessoListComponent', () => {
  let component: GrupoacessoListComponent;
  let fixture: ComponentFixture<GrupoacessoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoacessoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoacessoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
