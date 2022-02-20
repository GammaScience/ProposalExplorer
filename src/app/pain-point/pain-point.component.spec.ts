import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import {  NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMdModule } from 'ngx-md';

import { HttpClientModule } from '@angular/common/http';
import { PainPointComponent } from './pain-point.component';
import { PainPoint } from '../painpoint.model';

describe('PainPointComponent', () => {
  let component: PainPointComponent;
  let fixture: ComponentFixture<PainPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule,
        MatExpansionModule,
        MatTooltipModule,
        NgxMdModule,
        HttpClientModule
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
