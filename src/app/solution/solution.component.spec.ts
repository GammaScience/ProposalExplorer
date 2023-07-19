import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import {  NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';

import { HttpClientModule } from '@angular/common/http';

import { SolutionComponent } from './solution.component';
import { Solution } from '../solution.model';

class FakeModel {
  isActive  = false;

  public setActive( value: boolean ) {
    this.isActive = value;
  }
}

describe('SolutionComponent', () => {
  let component: SolutionComponent;
  let fixture: ComponentFixture<SolutionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDividerModule,
        MatExpansionModule,
        MarkdownModule,
        HttpClientModule
      ],
      declarations: [ SolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionComponent);
    component = fixture.componentInstance;
    component.model = new Solution('title', '', 'description', new Set(), new Set());
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
  it('should have toggle active function which toggles the models active property', () => {
    component.model = new FakeModel() as unknown as Solution; // type-cast hack for testing
    component.toggleActive(null);
    expect(component.model.isActive).toBeTruthy();
    component.toggleActive(null);
    expect(component.model.isActive).toBeFalsy();
  });


});
