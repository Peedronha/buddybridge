import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsitucionalComponent } from './insitucional.component';

describe('InsitucionalComponent', () => {
  let component: InsitucionalComponent;
  let fixture: ComponentFixture<InsitucionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsitucionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsitucionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
