import { Component } from '@angular/core';

import { ScientificPitchNotation } from './classes/scientificPitchNotation';

import { ScientificNotationService } from './scientific-notation.service'; 

@Component({
    selector: 'scientific-notation-input',
    templateUrl: 'app/scientific-notation-input.component.html'
})
export class ScientificNotationInputComponent {

    sciPitchNotes = new Array<ScientificPitchNotation>();

    constructor(private scientificNotationService: ScientificNotationService) {};

    addInput(): void {
        this.sciPitchNotes.push({letter: "C", octave: 4});
        this.setPitches();
    };

    remove(pitch: ScientificPitchNotation): void{
        this.sciPitchNotes = this.sciPitchNotes.filter(item => item !== pitch);
        this.setPitches();
    };

    setPitches(): void{
        let filteredPitches = this.sciPitchNotes.filter(function(item){
            return item != null && item.letter != null && item.letter.length > 0 && item.octave != null;
        })

        this.scientificNotationService.setScientificPitchNotations(filteredPitches);
    };
}