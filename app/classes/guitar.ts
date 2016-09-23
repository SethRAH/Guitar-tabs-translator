import { ScientificPitchNotation } from './scientificPitchNotation';
import { GuitarString } from './guitarString';
import { GuitarTuning } from './guitarTuning';

export class Guitar {
    name: string;
    tunings: GuitarTuning[];
    selectedTuning: GuitarTuning;
}