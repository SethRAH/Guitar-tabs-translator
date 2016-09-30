import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import './rxjs-extensions';
import { AppComponent } from './app.component';
import { GuitarTablatureInputComponent } from './guitar-tablature-input.component';
import { ScientificNotationOutputComponent } from './scientific-notation-output.component';
import { InputSwitchComponent } from './input-switch.component';
import { OutputSwitchComponent } from './output-switch.component';
import { ScientificNotationInputComponent } from './scientific-notation-input.component';

import { MusicNotationService } from './music-notation.service';
import { GuitarTablatureService } from './guitar-tablature.service';
import { ScientificNotationService } from './scientific-notation.service';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule
    ],
  declarations: [ 
    AppComponent,
    GuitarTablatureInputComponent,
    ScientificNotationOutputComponent,
    InputSwitchComponent,
    OutputSwitchComponent,
    ScientificNotationInputComponent
    ],
  providers: [
    MusicNotationService,
    GuitarTablatureService,
    ScientificNotationService
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
