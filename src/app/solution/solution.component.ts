import { Component, OnInit, Input, ElementRef  } from '@angular/core';
import { Solution } from '../solution.model';
import { timer } from 'rxjs';
import { tap, switchMap, filter } from 'rxjs/operators';

const timerdelay = 1000;

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.less']
})
export class SolutionComponent implements OnInit {

  public reveal = false;

  @Input() model: Solution;
  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.model.identify_watcher().pipe(
      tap( sol => {
        this.reveal = true;
        if ( this.elementRef.nativeElement.scrollIntoViewIfNeeded !== undefined) {
          this.elementRef.nativeElement.scrollIntoViewIfNeeded(false);
        } else {
          this.elementRef.nativeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }),
      switchMap( (sol) => timer(timerdelay) ),
      filter( v => v === 0 ),
    ).subscribe( sol => {
      this.reveal = false;
    });
  }
  public toggleActive(event: Event) {
      if (event) {
        event.stopPropagation();
      }
      try {
        this.model.setActive(!this.model.isActive );
      } catch (err) {
        event.preventDefault();
      }
  }

}
