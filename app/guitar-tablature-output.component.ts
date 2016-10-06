import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs/subscriber';

import { GuitarTablatureService } from './guitar-tablature.service'

import { Guitar } from './classes/guitar';
import { GuitarString } from './classes/guitarstring';
import { GuitarTuning} from './classes/guitartuning';

@Component({
    selector: 'guitar-tablature-output',
    templateUrl: 'app/guitar-tablature-output.component.html'
})
export class GuitarTablatureOutputComponent implements OnInit {

    guitars: Guitar[];
    selectedGuitar: Guitar;
    selectedTuning: GuitarTuning;
    fingeringOptions: GuitarTuning[];
    private guitarFingeringsSubscriber: Subscriber<GuitarTuning[]>;
    
    constructor(private guitarTabsService: GuitarTablatureService) {};

    ngOnInit(){
        this.getGuitars();
    }

    getGuitars(): void {
        this.guitarTabsService.getGuitarOptions()
            .then(guitars => this.guitars = guitars)
            .then(()=> this.selectGuitar(this.guitars[0]))
            .then(()=> this.selectTuning(this.selectedGuitar.tunings[0]))
            .then(()=>this.guitarTabsService.getTabsObservable(this.selectedTuning).subscribe(data => this.fingeringOptions = data));
    }

    selectGuitar(guitar: Guitar): void {
        this.selectedGuitar = guitar;
        this.selectedTuning = this.selectedGuitar.selectedTuning;
        this.guitarTabsService.getTabsObservable(this.selectedTuning).subscribe(data => this.fingeringOptions = data);
    }

    selectTuning(selectedTuning: GuitarTuning): void{
        this.selectedGuitar.selectedTuning = selectedTuning;
        this.selectedTuning = selectedTuning; 
        this.guitarTabsService.getTabsObservable(this.selectedTuning).subscribe(data => this.fingeringOptions = data);     
    }

}