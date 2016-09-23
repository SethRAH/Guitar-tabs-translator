import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/subject';

import { ScientificPitchNotation } from './classes/scientificPitchNotation';

import { MusicNotationService } from './music-notation.service';

@Injectable()
export class ScientificNotationService {
    constructor(private musicNotationService: MusicNotationService){};

    getScientificPitchNotations(): Promise<ScientificPitchNotation[]> {
        return this.musicNotationService.getScientificPitch();
    }

    getScientificPitchNotationsSubject(): Subject<ScientificPitchNotation[]> {
        return this.musicNotationService.getScientificPitchSubject();
    };

    setScientificPitchNotations(sciNoPitches: ScientificPitchNotation[]): Promise<ScientificPitchNotation[]>{
        return this.musicNotationService.setScientificPitch(sciNoPitches);
    }

}