import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs/subscriber';

import { ScientificPitchNotation } from './classes/scientificPitchNotation';

import { ScientificNotationService } from './scientific-notation.service'; 

declare var Vex: any;

@Component({
    selector: 'score-notation-output',
    templateUrl: 'app/score-notation-output.component.html'
})
export class ScoreNotationOutputComponent implements OnInit {

    sciPitchNotes: ScientificPitchNotation[];
    private sciPitchNotationSubscriber: Subscriber<ScientificPitchNotation[]>;
    
    constructor(private scientificNotationService: ScientificNotationService) {};

    ngOnInit(){
        this.scientificNotationService.getScientificPitchNotationsSubject()
                                                    .subscribe(data => this.sciPitchNotes = data);
        this.scientificNotationService.resendScientificPitchNotations();
        this.RenderScore();
    }

    RenderScore(): void{
        let canvas = document.getElementById('scoreCanvas');
        let renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.SVG);
        let context = renderer.getContext();
        let trebleStave = new Vex.Flow.Stave(10,0,150);
        let bassStave = new Vex.Flow.Stave(10, 60, 150);
        
        trebleStave.addClef("treble").setContext(context).draw();
        bassStave.addClef("bass").setContext(context).draw();

        let trebleNotes = [
            new Vex.Flow.StaveNote({ clef: "treble", keys: ["c/4", "e/4"], duration:"w" })
        ];

        let bassNotes = [
            new Vex.Flow.StaveNote({ clef: "bass", keys: ["c/3", "g/3"], duration:"w" })
        ];

        let trebleVoice = new Vex.Flow.Voice({ num_beats: 4, beat_value:4, resolution: Vex.Flow.RESOLUTION });
        let bassVoice = new Vex.Flow.Voice({ num_beats: 4, beat_value:4, resolution: Vex.Flow.RESOLUTION });

        let startX = Math.max(trebleStave.getNoteStartX(), bassStave.getNoteStartX());
        trebleStave.setNoteStartX(startX);
        bassStave.setNoteStartX(startX);

        trebleVoice.addTickables(trebleNotes);
        bassVoice.addTickables(bassNotes);


        let formatter = new Vex.Flow.Formatter();
        formatter.joinVoices([trebleVoice]);
        formatter.joinVoices([bassVoice]);
        formatter.format([trebleVoice, bassVoice], 150);

        trebleVoice.draw(context, trebleStave);
        bassVoice.draw(context, bassStave);
    }
}