import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProposalService } from './proposal.service';
import { PainPoint } from './painpoint.model';
import { Component, OnInit, Input } from '@angular/core';
import { Solution } from './solution.model';



/*
* Let's start by defining some simple dummy components which have behavior useful
* for our unit tests.
*/

class MockComponent<T> implements OnInit {
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
export class MockPainPointComponent extends MockComponent<PainPoint> { }
@Component({
  selector: 'app-solution',
  template: templateHtml,
  styles: []
})
export class MockSolutionComponent extends MockComponent<Solution> { }



describe('AppComponent', () => {
  const title = 'Testing title';
  const pps: Set<PainPoint> = new Set();
  const solutions: Set<Solution> = new Set();
  pps.add(new PainPoint('pp1', '', '', ));
  solutions.add(new Solution('sol1', '', '', new Set(), new Set()));
  beforeEach(async(() => {
    const p = new ProposalService();
    p.title = title;
    p.painPoints = pps;
    p.solutions = solutions;
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
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
      expect(compiled.querySelector('div.painpoints').textContent ).toContain(pp.name);
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
      expect(compiled.querySelector('div.solutions').textContent ).toContain(s.name);
    }
    if ( !checked) {
      // tslint:disable-next-line:no-string-throw
      throw 'No solutions rendered/checked';
    }
  });


});
