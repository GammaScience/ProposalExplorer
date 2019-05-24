import { Component } from '@angular/core';
import { ProposalService } from './proposal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

   get title() {
     return this.proposal.title;
   }

   get description() {
    return this.proposal.description;
   }

   constructor(
     public proposal: ProposalService
   ) { }
}
