import { TestBed, waitForAsync } from '@angular/core/testing';
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
  const title = 'Testing title';
  const pps: Set<PainPoint> = new Set();
  const solutions: Set<Solution> = new Set();
  pps.add(new PainPoint('pp1', '', '', ));
  solutions.add(new Solution('sol1', '', '', new Set(), new Set()));
  beforeEach(waitForAsync(() => {
    const p = new ProposalService();
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
        HttpClientModule
      ],
      declarations: [
        MockPainPointComponent,
        MockSolutionComponent,
        AppComponent
      ],
      providers: [
        { provide: ProposalService,  useValue: p }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title the proposal's title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(title);
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(title);
  });

  it('should render all the painpoints in the propsoal in the painpoints div', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let checked = false;
    for (const pp of pps) {
      checked = true;
      expect(compiled.querySelector('.painpoints').textContent ).toContain(pp.name);
    }
    if ( !checked) {
      // tslint:disable-next-line:no-string-throw
      throw 'No painpoints rendered/checked';
    }
  });

  it('should render all the solutions in the propsoal in the solutions div', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let checked = false;
    for (const s of solutions) {
      checked = true;
      expect(compiled.querySelector('.solutions').textContent ).toContain(s.name);
    }
    if ( !checked) {
      // tslint:disable-next-line:no-string-throw
      throw 'No solutions rendered/checked';
    }
  });


});
