import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs/subscriber';
import { Observable } from 'rxjs/observable';

import { ScientificPitchNotation } from './classes/scientificPitchNotation';
import { StaveNote } from './classes/staveNote';
import { EasyScoreChord } from './classes/easyScoreChord';
import { ScoreNotationService } from './score-notation.service'; 

declare var Vex: any;

@Component({
    selector: 'score-notation-output',
    templateUrl: 'app/score-notation-output.component.html'
})
export class ScoreNotationOutputComponent implements OnInit {

   // staveNotes: StaveNote[];
   // private sciPitchNotationSubscriber: Subscriber<ScientificPitchNotation[]>;
   // private canvas: any;
   // private renderer: any;
   // private context: any;
   // private trebleStave: any;
   // private bassStave:any;
   // private formatter: any;
   private VF = Vex.Flow;
   private vf: any;
   private score:any;
   private system:any;
   private easyChords:  EasyScoreChord[];
    
    constructor(private scoreNotationService: ScoreNotationService) {};

    ngOnInit(){
        this.initEasyScore();
        this.scoreNotationService.getEasyScoreChordObservable()
            .subscribe(data => this.RenderEasyScore(data));
        this.scoreNotationService.resendScoreNotation();
    }

    //RenderObservableScore(stave: StaveNote[]): void{
    //    this.staveNotes = stave;
    //    this.RenderNotes();
    //};

    RenderEasyScore(chords: EasyScoreChord[]): void{
        this.easyChords = chords;
        this.RenderEasyNotes();
    };

    private initEasyScore(): void{
        this.vf = new this.VF.Factory({renderer:{selector: 'scoreCanvas', height:400}});
        this.score = this.vf.EasyScore();
        this.system = this.vf.System();
    };

    private RenderEasyNotes(): void{
        //replace element as "clear" since it seems that no valid documentation on resets outside of vex tab exists for this library :(
        let oldDiv = document.getElementById('scoreCanvas');
        if(oldDiv != null){
            let newDiv = document.createElement('div');
            newDiv.id = 'scoreCanvas';
            oldDiv.parentNode.replaceChild(newDiv, oldDiv);
            this.initEasyScore();
        

            if(this.easyChords !== undefined && this.easyChords.length > 0){
                let trebleVoice = this.easyChords.filter(chord => chord.clef == 'treble' )
                                        .map(chord => this.convertEasyChordToScoreNote(chord));
                                        
                let bassVoice = this.easyChords.filter(chord => chord.clef == 'bass' )
                                        .map(chord => this.convertEasyChordToScoreNote(chord));

                let trebleVoices = trebleVoice ;
                let bassVoices =  bassVoice ;
                if(trebleVoice.length < 1 || trebleVoice[0].tickables.length < 1){
                    trebleVoices = [];
                }

                if(bassVoice.length < 1 || bassVoice[0].tickables.length < 1){
                    bassVoices = [];
                }

                if(trebleVoices !== undefined && trebleVoices.length > 0){
                    this.system.addStave({
                        voices: trebleVoices
                    }).addClef('treble');
                }

                if(bassVoices !== undefined && bassVoices.length > 0){
                    this.system.addStave({
                        voices: bassVoices
                    }).addClef('bass');
                }
                
                if(trebleVoices !== undefined && bassVoices !== undefined
                && trebleVoices.length > 0 && bassVoices.length > 0){
                    this.system.addConnector();
                }

                if((trebleVoices !== undefined && trebleVoices.length > 0)
                || (bassVoices !== undefined && bassVoices.length > 0)){
                    this.vf.draw();
                }
                
            }
        }
    };

    private convertEasyChordToScoreNote(chord: EasyScoreChord): any{
        let keys = chord.keys + '/' + chord.duration;
        let notes = this.score.notes(keys, {clef: chord.clef });
        let voice = this.score.voice(notes);
        return voice;
    };

    //private initRenderer(): void{
    //    this.canvas = document.getElementById('scoreCanvas');
    //    this.renderer = new Vex.Flow.Renderer(this.canvas, Vex.Flow.Renderer.Backends.SVG);
    //    this.context = this.renderer.getContext();
    //    this.trebleStave = new Vex.Flow.Stave(10,0,150);
    //    this.bassStave = new Vex.Flow.Stave(10, 60, 150);
    //    this.formatter = new Vex.Flow.Formatter();
//        
//
    //    this.trebleStave.addClef("treble").setContext(this.context).draw();
    //    this.bassStave.addClef("bass").setContext(this.context).draw();
    //}

    //RenderNotes(): void{
    //    if(this.staveNotes !== undefined){
    //        let trebleNotesArray = [];
    //        let bassNotesArray = [];
//
//            trebleNotesArray = this.staveNotes.filter(note => note.clef === "treble")
//                                .map(note => new Vex.Flow.StaveNote({clef: note.clef, keys: note.keys, duration: note.duration}));
//            bassNotesArray = this.staveNotes.filter(note => note.clef === "bass")//
//                                .map(note => new Vex.Flow.StaveNote({clef: note.cl//ef, keys: note.keys, duration: note.duration}));
        //
        //    let trebleNotes = undefined;
//
//            if(trebleNotesArray !== null && trebleNotesArray.length > 0 
           // && trebleNotesArray[0].keys != null && trebleNotesArray[0].keys.length > 0){
           //     trebleNotes = trebleNotesArray[0];
           // }
//
//            let bassNotes = undefined;

//            if(bassNotesArray !== null && bassNotesArray.length > 0 
//            && bassNotesArray[0].keys != null && bassNotesArray[0].keys.length > 0){
//                bassNotes = bassNotesArray[0];
//            }

//            let trebleVoice = new Vex.Flow.Voice({ num_beats: 4, beat_value:4, resolution: Vex.Flow.RESOLUTION });
//            let bassVoice = new Vex.Flow.Voice({ num_beats: 4, beat_value:4, resolution: Vex.Flow.RESOLUTION });

//            let startX = Math.max(this.trebleStave.getNoteStartX(), this.bassStave.getNoteStartX());
//            this.trebleStave.setNoteStartX(startX);
//            this.bassStave.setNoteStartX(startX);

//            if(trebleNotes !== undefined && bassNotes !== undefined){
//                trebleVoice.addTickables(trebleNotes);
//                bassVoice.addTickables(bassNotes);

//                this.formatter.joinVoices([trebleVoice]);
//                this.formatter.joinVoices([bassVoice]);
//                this.formatter.format([trebleVoice, bassVoice], 150);
//
//                trebleVoice.draw(this.context, this.trebleStave);
//                bassVoice.draw(this.context, this.bassStave);
//            }
//            else if(trebleNotes != undefined){
//                trebleVoice.addTickables(trebleNotes);

//                this.formatter.joinVoices([trebleVoice]);
//                this.formatter.format([trebleVoice], 150);
//
//                trebleVoice.draw(this.context, this.trebleStave);
//            }
//            else if(bassNotes != undefined){
//                bassVoice.addTickables(bassNotes);
//                this.formatter.joinVoices([bassVoice]);
//                this.formatter.format([bassVoice], 150);
//                
//                bassVoice.draw(this.context, this.bassStave);
//            }
//        }
//    }
}