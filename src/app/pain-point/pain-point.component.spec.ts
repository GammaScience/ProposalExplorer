import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatExpansionModule,
} from '@angular/material';

import { PainPointComponent } from './pain-point.component';
import { PainPoint } from '../painpoint.model';

describe('PainPointComponent', () => {
  let component: PainPointComponent;
  let fixture: ComponentFixture<PainPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
      ],
      declarations: [ PainPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainPointComponent);
    component = fixture.componentInstance;
    component.model = new PainPoint('title', '', 'description');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined model variable', () => {
    expect(component.model).toBeTruthy();
  });

  it('should have a display the model name', () => {
    const nativeEl = fixture.debugElement.nativeElement;
    expect(nativeEl.textContent ).toContain('title');
  });

  it('should have a display the model description', () => {
    const nativeEl = fixture.debugElement.nativeElement;
    expect(nativeEl.textContent ).toContain('description');
  });

});
