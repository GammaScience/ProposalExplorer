import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainPointComponent } from './pain-point/pain-point.component';
import { SolutionComponent } from './solution/solution.component';
import { ProposalService } from './proposal.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
// MatButtonModule,
MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule,
    NgxMdModule.forRoot(),
    HttpClientModule      //  We don't use this module bu NgxMd links to it

  ],
  providers: [
    { provide: ProposalService, useValue: env.proposal }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
