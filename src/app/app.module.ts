import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PainPointComponent } from './pain-point/pain-point.component';
import { SolutionComponent } from './solution/solution.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
