import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainPointComponent } from './pain-point/pain-point.component';
import { SolutionComponent } from './solution/solution.component';
import { ProposalService } from './proposal.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';


import { environment as env } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ProposalLoaderService } from './services/proposal-loader.service';
import { ProposalExportService } from './services/proposal-export.service';


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
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatExpansionModule,
    MatTooltipModule,
    MarkdownModule.forRoot(),
    MatIconModule,
    HttpClientModule,
  ],
  providers: [
    //{ provide: ProposalService, useValue: env.proposal },
    ProposalLoaderService,
    ProposalExportService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
