import { Component, OnInit } from '@angular/core';

import { ScientificPitchNotation } from './classes/scientificPitchNotation';
import { GuitarString } from './classes/guitarString';
import { GuitarTuning } from './classes/guitarTuning';
import { Guitar } from './classes/guitar';

import { GuitarTablatureService } from './guitar-tablature.service';

@Component({
    selector: 'guitar-tablature-input',
    templateUrl: 'app/guitar-tablature-input.component.html'
})
export class GuitarTablatureInputComponent implements OnInit {
    guitars: Guitar[];
    selectedGuitar: Guitar;
    selectedTuning: GuitarTuning;

    constructor(private guitarTablatureService: GuitarTablatureService){};

    ngOnInit(): void {
        this.getGuitars();
    }

    getGuitars(): void {
        this.guitarTablatureService.getGuitarOptions()
            .then(guitars => this.guitars = guitars);
    }

    selectGuitar(selectedGuitar: Guitar): void{
        this.selectedGuitar = selectedGuitar;
        this.selectedTuning = this.selectedGuitar.selectedTuning;
        this.setTuning();
    }

    selectTuning(selectedTuning: GuitarTuning): void{
        this.selectedGuitar.selectedTuning = selectedTuning;
        this.selectedTuning = selectedTuning;      
        this.setTuning();  
    }

    setTuning(): void{
        this.guitarTablatureService.setGuitarStrings(this.selectedTuning.strings);
    }
    
}