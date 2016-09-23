import { Injectable } from '@angular/core';

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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
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
                ]
            },
            {
                name: "Drop D",
                strings: [
                    {baseTuning:{letter: "G", octave:2}, fret:null},
                    {baseTuning:{letter: "D", octave:2}, fret:null},
                    {baseTuning:{letter: "A", octave:1}, fret:null},
                    {baseTuning:{letter: "D", octave:1}, fret:null}
                ]
            }
        ],
        selectedTuning: {
                name: "Standard",
                strings: [
                    {baseTuning:{letter: "G", octave:2}, fret:null},
                    {baseTuning:{letter: "D", octave:2}, fret:null},
                    {baseTuning:{letter: "A", octave:1}, fret:null},
                    {baseTuning:{letter: "E", octave:1}, fret:null}
                ]
            }
    }
];


@Injectable()
export class GuitarTablatureService {

    guitars = GUITARS;

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
}