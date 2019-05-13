import { Component, OnInit, Input } from '@angular/core';
import { Solution } from '../solution.model';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.less']
})
export class SolutionComponent implements OnInit {

  @Input() model: Solution;
  constructor() { }

  ngOnInit() {
  }
  public toggleActive(e: Event) {
      try {
        this.model.active = !this.model.active;
      } catch {
          e.preventDefault();
      }
  }

}
