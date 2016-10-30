import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';

import { ScientificPitchNotation } from './classes/scientificPitchNotation';
import { StaveNote } from './classes/staveNote';
import { EasyScoreChord } from './classes/easyScoreChord';

import { MusicNotationService } from './music-notation.service';

declare var Vex:any;

const trebleThreshold: ScientificPitchNotation = { letter: "C", octave: 4 };

@Injectable()
export class ScoreNotationService {
    constructor(private musicNotationService: MusicNotationService){};

    getStaveNotesObservable(): Observable<StaveNote[]> {
        return this.musicNotationService.getScientificPitchSubject().map(pitches => this.convertScientificPitchesToStaveNotes(pitches));
    };

    resendScoreNotation(): void{
        this.musicNotationService.resendScientificPitch();
    };

    getEasyScoreChordObservable(): Observable<EasyScoreChord[]> {
        return this.musicNotationService.getScientificPitchSubject().map(pitches => this.convertScientificPitchNotationToEasyScoreChords(pitches));
    };

    private convertScientificPitchNotationToEasyScoreChords(sciPitches: ScientificPitchNotation[]): EasyScoreChord[] {
        let result: EasyScoreChord[] = [];

        let trebleEasyChord = new EasyScoreChord();
        trebleEasyChord.clef = 'treble';
        trebleEasyChord.duration = 'w';

        let bassEasyChord = new EasyScoreChord();
        bassEasyChord.clef = 'bass';
        bassEasyChord.duration = 'w';

        let trebleKeyObjs = sciPitches.filter(note => this.isNoteTreble(note));

        let trebleKeys = trebleKeyObjs.map(note => note.letter.toLowerCase() + note.octave )
            .reduce(function(acc, cur){
                return acc +  cur + ' ';
            }, ''); 
        if(trebleKeyObjs !== undefined && trebleKeyObjs.length > 1){
            trebleKeys = '(' + trebleKeys.trim() + ')';
        }

        let bassKeyObjs = sciPitches.filter(note => !this.isNoteTreble(note));            
        let bassKeys = bassKeyObjs.map(note => note.letter.toLowerCase() + note.octave )
            .reduce(function(acc, cur){
                return acc +  cur + ' ';
            },'');
        if(bassKeyObjs !== undefined && bassKeyObjs.length > 1){
            bassKeys = '(' + bassKeys.trim() + ')';
        }

        trebleEasyChord.keys = trebleKeys.trim();
        bassEasyChord.keys = bassKeys.trim();

        result.push(trebleEasyChord);
        result.push(bassEasyChord);

        return result;
    }

    private convertScientificPitchesToStaveNotes(sciPitches: ScientificPitchNotation[]): StaveNote[] {
        let result = new Array<StaveNote>();

        let trebleStaveNote = new StaveNote;
        trebleStaveNote.clef = 'treble';
        trebleStaveNote.duration = 'w';
        trebleStaveNote.keys = [];

        let bassStaveNote = new StaveNote;
        bassStaveNote.clef = 'bass';
        bassStaveNote.duration = 'w';
        bassStaveNote.keys = [];

        let trebleNotes = sciPitches.filter(note => this.isNoteTreble(note));
        let bassNotes = sciPitches.filter(note => !this.isNoteTreble(note));

        trebleStaveNote.keys = trebleNotes.map(note => this.convertSciPitchToStaveNoteKey(note));
        bassStaveNote.keys = bassNotes.map(note=>this.convertSciPitchToStaveNoteKey(note));

        result.push(trebleStaveNote);
        result.push(bassStaveNote);

        return result;
    }

    private convertSciPitchToStaveNoteKey(sciPitch: ScientificPitchNotation): string{
        return sciPitch.letter.toLowerCase() +"/"+sciPitch.octave;
    }

    private isNoteTreble(sciPitch: ScientificPitchNotation): boolean {
        let result = true;

        let sciPitchNum = this.convertSciPitchNotationToNumber(sciPitch);
        let thresholdNum = this.convertSciPitchNotationToNumber(trebleThreshold);

        if(sciPitchNum < thresholdNum) { result = false; }

        return result;
    }

    private convertSciPitchNotationToNumber(sciPitch: ScientificPitchNotation): number {
        let chrom = 0;
        switch(sciPitch.letter){
            case "C":
                chrom = 0;
                break;
            case "C#":
                chrom = 1;
                break;
            case "D":
                chrom = 2;
                break;
            case "D#":
                chrom = 3;
                break;
            case "E":
                chrom = 4;
                break;
            case "F":
                chrom = 5;
                break;
            case "F#":
                chrom = 6;
                break;
            case "G":
                chrom = 7;
                break;
            case "G#":
                chrom = 8;
                break;
            case "A":
                chrom = 9;
                break;
            case "A#":
                chrom = 10;
                break;
            case "B":
                chrom = 11;
                break; 
        }

        return chrom + (12 * (sciPitch.octave));
    };

}