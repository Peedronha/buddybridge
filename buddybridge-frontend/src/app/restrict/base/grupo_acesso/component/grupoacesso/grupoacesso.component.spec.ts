import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoacessoComponent } from './grupoacesso.component';

describe('GrupoacessoComponent', () => {
  let component: GrupoacessoComponent;
  let fixture: ComponentFixture<GrupoacessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoacessoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoacessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
