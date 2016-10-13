import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/subject';

import { ScientificPitchNotation } from './classes/scientificPitchNotation';
import { GuitarString } from './classes/guitarString';
import { GuitarTuning } from './classes/guitarTuning';
import { Guitar } from './classes/guitar';

import { MusicNotationService } from './music-notation.service';

const GUITARS: Guitar[] = [
    {
        name: "Guitar",
        tunings: [
            {
                name: "Standard",
                strings: [
                    {baseTuning:{letter: "E", octave:4}, fret:null},
                    {baseTuning:{letter: "B", octave:3}, fret:null},
                    {baseTuning:{letter: "G", octave:3}, fret:null},
                    {baseTuning:{letter: "D", octave:3}, fret:null},
                    {baseTuning:{letter: "A", octave:2}, fret:null},
                    {baseTuning:{letter: "E", octave:2}, fret:null}
                ],
                fingerSpreadMetric: null
            },
            {
                name: "Drop D",
                strings: [
                    {baseTuning:{letter: "E", octave:4}, fret:null},
                    {baseTuning:{letter: "B", octave:3}, fret:null},
                    {baseTuning:{letter: "G", octave:3}, fret:null},
                    {baseTuning:{letter: "D", octave:3}, fret:null},
                    {baseTuning:{letter: "A", octave:2}, fret:null},
                    {baseTuning:{letter: "D", octave:2}, fret:null}
                ],
                fingerSpreadMetric: null
            },
            {
                name: "Open D",
                strings: [
                    {baseTuning:{letter: "D", octave:4}, fret:null},
                    {baseTuning:{letter: "A", octave:3}, fret:null},
                    {baseTuning:{letter: "F#", octave:3}, fret:null},
                    {baseTuning:{letter: "D", octave:3}, fret:null},
                    {baseTuning:{letter: "A", octave:2}, fret:null},
                    {baseTuning:{letter: "D", octave:2}, fret:null}
                ],
                fingerSpreadMetric: null
            },
            {
                name: "Open C",
                strings: [
                    {baseTuning:{letter: "G", octave:4}, fret:null},
                    {baseTuning:{letter: "E", octave:4}, fret:null},
                    {baseTuning:{letter: "C", octave:4}, fret:null},
                    {baseTuning:{letter: "G", octave:3}, fret:null},
                    {baseTuning:{letter: "E", octave:3}, fret:null},
                    {baseTuning:{letter: "C", octave:3}, fret:null}
                ],
                fingerSpreadMetric: null
            },
            {
                name: "Open G",
                strings: [
                    {baseTuning:{letter: "D", octave:4}, fret:null},
                    {baseTuning:{letter: "B", octave:3}, fret:null},
                    {baseTuning:{letter: "G", octave:3}, fret:null},
                    {baseTuning:{letter: "D", octave:3}, fret:null},
                    {baseTuning:{letter: "G", octave:2}, fret:null},
                    {baseTuning:{letter: "D", octave:2}, fret:null}
                ],
                fingerSpreadMetric: null
            }
        ],
        selectedTuning: {
                name: "Standard",
                strings: [
                    {baseTuning:{letter: "E", octave:4}, fret:null},
                    {baseTuning:{letter: "B", octave:3}, fret:null},
                    {baseTuning:{letter: "G", octave:3}, fret:null},
                    {baseTuning:{letter: "D", octave:3}, fret:null},
                    {baseTuning:{letter: "A", octave:2}, fret:null},
                    {baseTuning:{letter: "E", octave:2}, fret:null}
                ],
                fingerSpreadMetric: null
            }
    },
    {
        name: "Bass",
        tunings: [
            {
                name: "Standard",
                strings: [
                    {baseTuning:{letter: "G", octave:2}, fret:null},
                    {baseTuning:{letter: "D", octave:2}, fret:null},
                    {baseTuning:{letter: "A", octave:1}, fret:null},
                    {baseTuning:{letter: "E", octave:1}, fret:null}
                ],
                fingerSpreadMetric: null
            },
            {
                name: "Drop D",
                strings: [
                    {baseTuning:{letter: "G", octave:2}, fret:null},
                    {baseTuning:{letter: "D", octave:2}, fret:null},
                    {baseTuning:{letter: "A", octave:1}, fret:null},
                    {baseTuning:{letter: "D", octave:1}, fret:null}
                ],
                fingerSpreadMetric: null
            }
        ],
        selectedTuning: {
                name: "Standard",
                strings: [
                    {baseTuning:{letter: "G", octave:2}, fret:null},
                    {baseTuning:{letter: "D", octave:2}, fret:null},
                    {baseTuning:{letter: "A", octave:1}, fret:null},
                    {baseTuning:{letter: "E", octave:1}, fret:null}
                ],
                fingerSpreadMetric: null
            }
    }
];


@Injectable()
export class GuitarTablatureService {

    guitars = GUITARS;
    maxFrets = 19;

    constructor(private musicNotesService: MusicNotationService ) {};

    setGuitarStrings(guitarStrings: GuitarString[]): Promise<GuitarString[]> {
        //let resolvedNotes = guitarStrings.map(this.guitarStringToScientificPitchNotation);
        let resolvedNotes = guitarStrings.filter(function(string){return string.fret > 0; })
                                        .map(this.convertStringToResolvedPitchNumber)
                                        .map(this.convertNumberToSciPitchNotation);
        
        
        let returnedNotes = this.musicNotesService.setScientificPitch(resolvedNotes);

        //Eventually we want to swap this code with something from the result of this.musicNotesService
        return Promise.resolve(guitarStrings);
    };
    
    getGuitarOptions(): Promise<Guitar[]>{
        return Promise.resolve(this.guitars);
    };

    getTabsObservable(guitarTuning:GuitarTuning): Observable<GuitarTuning[]> {
        return this.musicNotesService.getScientificPitchSubject().map(pitches => this.getFingerings(guitarTuning, pitches));
    };

    resendTabs(): void{
        this.musicNotesService.resendScientificPitch();
    };

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
    
    private convertNumberToSciPitchNotation(pitchNumber: number): ScientificPitchNotation {
        let octave = Math.floor(pitchNumber / 12);
        let letterNumber = pitchNumber % 12;
        let letter = "C";

        switch (letterNumber){
            case 0:
                letter = "C";
                break;
            case 1:
                letter = "C#";
                break;
            case 2:
                letter = "D";
                break;
            case 3:
                letter = "D#";
                break;
            case 4:
                letter = "E";
                break;
            case 5:
                letter = "F";
                break;
            case 6:
                letter = "F#";
                break;
            case 7:
                letter = "G";
                break;
            case 8:
                letter = "G#";
                break;
            case 9:
                letter = "A";
                break;
            case 10:
                letter = "A#";
                break;
            case 11:
                letter = "B";
                break;
        }

        return {"letter": letter, "octave": octave};
    };

    private convertStringToResolvedPitchNumber(guitarString: GuitarString): number {
        let baseNote = 0;
        switch(guitarString.baseTuning.letter){
            case "C":
                baseNote = 0;
                break;
            case "C#":
                baseNote = 1;
                break;
            case "D":
                baseNote = 2;
                break;
            case "D#":
                baseNote = 3;
                break;
            case "E":
                baseNote = 4;
                break;
            case "F":
                baseNote = 5;
                break;
            case "F#":
                baseNote = 6;
                break;
            case "G":
                baseNote = 7;
                break;
            case "G#":
                baseNote = 8;
                break;
            case "A":
                baseNote = 9;
                break;
            case "A#":
                baseNote = 10;
                break;
            case "B":
                baseNote = 11;
                break; 
        }

        baseNote = baseNote + (12 * (guitarString.baseTuning.octave));
        return baseNote + guitarString.fret;
    };

    private getFingerings(tuning: GuitarTuning, desiredNotes: ScientificPitchNotation[]): GuitarTuning[]{
        let noteTuning = desiredNotes.map(function(note){return {note: note, tuning: tuning}});

        let noteOptions = noteTuning.map(itm => this.getFingeringPossibilitiesOnNote(itm));

        let result: GuitarTuning[] = new Array<GuitarTuning>();

        //permute the options to get a list of raw guitar tunings, each tuning plays each note once (although they may be impossible fingerings at this point)
        let rawPossibleOptions:number = 1;
        let indexSelection = new Array<number>();
        for(var i = 0; i < noteOptions.length; i++){ 
            rawPossibleOptions = rawPossibleOptions * noteOptions[i].possibilities.length; 
            indexSelection.push(0); 
        }
        for(var i = 0; i < rawPossibleOptions; i++){ 
            let tempTuning = new GuitarTuning();
            tempTuning.strings = new Array<GuitarString>();
            result.push(tempTuning); 
        }

        for(var i = 0; i < rawPossibleOptions; i++){
            //push current index selection
            for(var j = 0; j < indexSelection.length; j++){
                result[i].strings.push(noteOptions[j].possibilities[indexSelection[j]]);
            }

            if( i < (rawPossibleOptions - 1)){
                //increment index selection
                // // Find lowest unwrapping indexSelection index and increment
                let lowestWrapper = noteOptions.length - 1;
                let lowestIndexFound = false;
                for(var j = lowestWrapper; j >= 0 && !lowestIndexFound; j--){
                    if(indexSelection[j] < (noteOptions[j].possibilities.length - 1)){
                        lowestIndexFound = true;
                        lowestWrapper = j;
                        indexSelection[j]++;
                    }
                }
                // // reset all lower sig fig indexes (higher indexes than the incrementing one)
                for(var j = lowestWrapper + 1; j < noteOptions.length; j++){
                    indexSelection[j] = 0;
                }
            }
        }

        //filter out impossible guitar tunings
        result = result.filter(function(judgedTuning){
            let isGood = true;
            
            let usedStringPaintArray = tuning.strings.map(function(guitarString){
                return {baseNote: guitarString.baseTuning, allocated: false};
            });

            judgedTuning.strings.forEach(function(guitarString){
                if(usedStringPaintArray.filter((a)=>a.baseNote === guitarString.baseTuning && a.allocated === false).length > 0){
                    var found = false;
                    for(var i = 0; i < usedStringPaintArray.length && !found; i++){
                        if(!usedStringPaintArray[i].allocated && usedStringPaintArray[i].baseNote === guitarString.baseTuning){
                            usedStringPaintArray[i].allocated = true;
                            found = true;
                        }
                    }
                }else{
                    isGood = false;
                }
            });

            return isGood;
        });

        //Map results on to current tuning (allows for correct ordering and for "non played" notes to be filled in)
        result = result.map(function(validTuning){
            let filledTuning:GuitarTuning = new GuitarTuning();
            
            filledTuning.name = tuning.name;

            filledTuning.strings = tuning.strings.map(function(tString){
                let coalescedString: GuitarString = new GuitarString();
                coalescedString.baseTuning = tString.baseTuning;

                if(validTuning.strings.findIndex(vString => vString.baseTuning == tString.baseTuning)>-1){
                   coalescedString.fret = validTuning.strings.find(vString => vString.baseTuning == tString.baseTuning).fret;
                }
                else {
                    coalescedString.fret = null;
                }
                return coalescedString;
            })

            return filledTuning;
        });

        //Score based on finger spread
        result = result.map(curTuning => this.scoreFingerSpread(curTuning));

        //Sort based on finger spread score
        result = result.sort(function(a, b){ return a.fingerSpreadMetric - b.fingerSpreadMetric});

        return result;
    }

    private getFingeringPossibilitiesOnNote(noteTuning){
        let note: ScientificPitchNotation = noteTuning.note;
        let tuning: GuitarTuning = noteTuning.tuning;
        let possibilities = this.findPitchOnTuning(tuning, note);
        return {note: note, possibilities: possibilities };
    }

    private findPitchOnTuning(tuning:GuitarTuning, desiredNote: ScientificPitchNotation): GuitarString[]{
        if(tuning !== null){
            let stringNotes = tuning.strings.map(function(guitarString){ return {guitarString: guitarString, sciPitch: desiredNote} });

            return stringNotes.map(itm => this.findPitchForStringNote(itm))
                            .filter(function(guitarString){return guitarString.fret !== null;});
        }
        else {
            return null;
        }
    }

    private findPitchForStringNote(stringNote){
        let guitarString = stringNote.guitarString;
        let sciPitch = stringNote.sciPitch;
        return this.findPitchOnString(guitarString, sciPitch);
    }

    private findPitchOnString(guitarString: GuitarString, sciPitch: ScientificPitchNotation): GuitarString {
        let baseString = new GuitarString();
        baseString.baseTuning = guitarString.baseTuning;
        baseString.fret = 0;

        let minStringNote = this.convertStringToResolvedPitchNumber(baseString);
        let maxStringNote = minStringNote + this.maxFrets;

        let desiredNote = this.convertSciPitchNotationToNumber(sciPitch);

        // note can't be played on this string. Return a string with the same tuning but with a null fret to indicate this
        if(desiredNote < minStringNote || desiredNote > maxStringNote){
            baseString.fret = null;
            return baseString;
        }
        else{
            let fret = desiredNote - minStringNote;
            baseString.fret = fret;
            return baseString;
        }
    }

    private scoreFingerSpread(tuning: GuitarTuning): GuitarTuning{
        let score = 0;
        let playedStrings = tuning.strings.filter(string => string.fret !== null && string.fret !== 0);
        for(let i = 1; i < playedStrings.length; i++){
            score += Math.abs(playedStrings[i-1].fret - playedStrings[i].fret);
        }

        let result = tuning;
        result.fingerSpreadMetric = score;
        return result;
    }
}