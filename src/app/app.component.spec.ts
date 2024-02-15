import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {  NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProposalService } from './proposal.service';
import { PainPoint } from './painpoint.model';
import { Component, OnInit, Input, Directive } from '@angular/core';
import { Solution } from './solution.model';
import { MarkdownModule } from 'ngx-markdown';
import { ProposalExportService } from './services/proposal-export.service';

/*
* Let's start by defining some simple dummy components which have behavior useful
* for our unit tests.
*/

@Directive()
class MockComponentDirective<T> implements OnInit {
  @Input() model: T;
  constructor() { }
  ngOnInit() {
  }
}
const templateHtml = `<div>
  {{ model.name }}
  {{ model.description }}
</div>  `;
const yamlData = `
---
title: test proposal
description: "# This is a title for the introductory text

  test overview

  ## test sub heading

  test sub text

  ### Small heading

  - Review Painpoints

  - Add Solutions

  - Export Choices
  "

solutions:
  - name: Solution 1
    summary: Summary of Solution 1
    description: '### I am solution 1.
    I do not require or block any other solutions. Eam aliquam dissentiet in, qui cu feugait indoctum.
    '
    blocks: []
    requires: []
    active: false

  - name: Solution 2
    summary: Summary of Solution 2
    description: I block solution 1. Eam aliquam dissentiet in, qui cu feugait indoctum.
    blocks: [Solution 1]
    requires: []

  - name: Solution 3
    summary: Summary of Solution 3
    description: I require solution 1. Eam aliquam dissentiet in, qui cu feugait indoctum.
    blocks: []
    requires: [Solution 1]

  - name: Solution 4
    summary: Summary of Solution 3
    description: I require solution 1 but I block solution 3. Eam aliquam dissentiet in, qui cu feugait indoctum.
    blocks: [Solution 3]
    requires: [Solution 1]

painPoints:
  - name: Pain Point 1
    summary: Summary of Pain Point 1
    description: Description of Pain Point 1. Eam aliquam dissentiet in, qui cu feugait indoctum.
    solvedBy: [Solution 1, Solution 2]

  - name: Pain Point 2
    summary: Summary of Pain Point 2
    description: Description of Pain Point 2. Eam aliquam dissentiet in, qui cu feugait indoctum.
    solvedBy: [Solution 2]

  - name: Pain Point 3
    summary: Summary of Pain Point 3
    description: Description of Pain Point 2. Eam aliquam dissentiet in, qui cu feugait indoctum.
    solvedBy: [Solution 3]

  - name: Pain Point 4
    summary: Summary of Pain Point 3
    description: Description of Pain Point 2. Eam aliquam dissentiet in, qui cu feugait indoctum.
    solvedBy: [Solution 4]
`;
@Component({
  selector: 'app-pain-point',
  template: templateHtml,
  styles: []
})
export class MockPainPointComponent extends MockComponentDirective<PainPoint> { }
@Component({
  selector: 'app-solution',
  template: templateHtml,
  styles: []
})
export class MockSolutionComponent extends MockComponentDirective<Solution> { }



describe('AppComponent', () => {
  const title = 'test proposal';
  const pps: Set<PainPoint> = new Set();
  const solutions: Set<Solution> = new Set();
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let proposalLoader: ProposalService;
  beforeEach(waitForAsync(() => {
    const p = new ProposalService();
    const ex = new ProposalExportService();
    p.title = title;
    p.painPoints = pps;
    p.solutions = solutions;
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MarkdownModule,
        HttpClientModule,
      ],
      declarations: [
        MockPainPointComponent,
        MockSolutionComponent,
        AppComponent
      ],
      providers: [
        { provide: ProposalService,  useValue: p },
        { provide: ProposalExportService,  useValue: ex }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    proposalLoader = TestBed.inject(ProposalService); // Inject ProposalLoaderService
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render all the painpoints in the proposal in the painpoints div', () => {
    const compiled = fixture.debugElement.nativeElement;
    for (const pp of pps) {
      expect(compiled.querySelector('.painpoints').textContent ).toContain(pp.name);
    }
  });

  it('should render all the solutions in the proposal in the solutions div', () => {
    const compiled = fixture.debugElement.nativeElement;
    for (const s of solutions) {
      expect(compiled.querySelector('.solutions').textContent ).toContain(s.name);
    }
  });
});
