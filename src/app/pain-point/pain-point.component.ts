import { Component, OnInit, Input } from '@angular/core';
import { PainPoint } from '../painpoint.model';
import { Solution } from '../solution.model';

@Component({
  selector: 'app-pain-point',
  templateUrl: './pain-point.component.html',
  styleUrls: ['./pain-point.component.less']
})
export class PainPointComponent implements OnInit {

  @Input() model: PainPoint;

  constructor() { }

  ngOnInit() {
  }

  blockedByInfo( primsol: Solution): string {
    if ( primsol.isActive ) {
      // We are active so we don't need to say what we are blocked by
      return '';
    }
    const blocktxt = `${primsol.name} is blocked by: `;
    const names = Array.from( primsol.blocks ).map( (sol) => {
      // Only say what is blocking us
      return sol.isActive ? sol.name : '';
    })
    .filter( name => name !== '');
    if ( names.length === 0 ) {
      // No blocking items just remove tooltip
      return '';
    }
    return `${blocktxt} ${names.join(', ')}`;
  }
}
