import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainPointComponent } from './pain-point/pain-point.component';
import { SolutionComponent } from './solution/solution.component';
import { ProposalService } from './proposal.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  // MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatExpansionModule,
} from '@angular/material';

import { NgxMdModule } from 'ngx-md';


import { environment as env } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    PainPointComponent,
    SolutionComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    // MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    NgxMdModule.forRoot(),

  ],
  providers: [
    { provide: ProposalService, useValue: env.proposal }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
