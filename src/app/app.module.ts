import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TracksService } from './tracks.service';
import { SearchPipe } from './search.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [TracksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
