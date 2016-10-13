import { ScientificPitchNotation } from './scientificPitchNotation';
import { GuitarString } from './guitarString';

export class GuitarTuning {
    name: string;
    strings: GuitarString[];
    fingerSpreadMetric: number;
}