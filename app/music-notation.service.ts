import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';

import { ScientificPitchNotation } from './classes/scientificPitchNotation';

@Injectable()
export class MusicNotationService {
    sciNotes: ScientificPitchNotation[];
    private sciNotesSubject = new Subject<ScientificPitchNotation[]>();

    getScientificPitch(): Promise<ScientificPitchNotation[]> {
        return Promise.resolve(this.sciNotes);
    };

    getScientificPitchSubject(): Subject<ScientificPitchNotation[]>{
        return  this.sciNotesSubject;
    };

    setScientificPitch(newSciNotes: ScientificPitchNotation[]): Promise<ScientificPitchNotation[]> {
        this.sciNotes = newSciNotes;
        this.sciNotesSubject.next(this.sciNotes);
        return this.getScientificPitch();
    };
}