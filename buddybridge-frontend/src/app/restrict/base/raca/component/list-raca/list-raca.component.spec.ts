import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRacaComponent } from './list-raca.component';

describe('ListRacaComponent', () => {
  let component: ListRacaComponent;
  let fixture: ComponentFixture<ListRacaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListRacaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
