import { Component, OnInit, Input } from '@angular/core';
import { PainPoint } from '../painpoint.model';

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

}
