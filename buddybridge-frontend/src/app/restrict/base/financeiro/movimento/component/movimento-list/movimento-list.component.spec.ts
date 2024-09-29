import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoListComponent } from './movimento-list.component';

describe('MovimentoListComponent', () => {
  let component: MovimentoListComponent;
  let fixture: ComponentFixture<MovimentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovimentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
