import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainPointComponent } from './pain-point/pain-point.component';
import { SolutionComponent } from './solution/solution.component';
import { ProposalService } from './proposal.service';

@NgModule({
  declarations: [
    AppComponent,
    PainPointComponent,
    SolutionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ProposalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
