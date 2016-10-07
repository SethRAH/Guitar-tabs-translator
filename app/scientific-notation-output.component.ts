import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs/subscriber';

import { ScientificPitchNotation } from './classes/scientificPitchNotation';

import { ScientificNotationService } from './scientific-notation.service'; 

@Component({
    selector: 'scientific-notation-output',
    templateUrl: 'app/scientific-notation-output.component.html'
})
export class ScientificNotationOutputComponent implements OnInit {

    sciPitchNotes: ScientificPitchNotation[];
    private sciPitchNotationSubscriber: Subscriber<ScientificPitchNotation[]>;
    
    constructor(private scientificNotationService: ScientificNotationService) {};

    ngOnInit(){
        this.scientificNotationService.getScientificPitchNotationsSubject()
                                                    .subscribe(data => this.sciPitchNotes = data);
        this.scientificNotationService.resendScientificPitchNotations();
    }
}