import { Pipe, PipeTransform } from '@angular/core'
/*
 * Pad Frets so they take a desired number of characters
 * Takes in a fret number that should ideally be null or a numeric value
 * Usage:
 *   value | fretFormat:length
 * Examples:
 *   {{ null | fretFormat:2}}
 *   formats to: --
 *   
 *   {{ 0 | fretFormat:3}}
 *   formats to: --0
*/
@Pipe({name: 'fretFormat'})
export class FretFormatPipe implements PipeTransform {
    transform(value: string, length: string){
        let intLength = parseInt(length);
        let strNumber = "";
        if(value !== null){
            strNumber = "" + value;
        }
        let prefix = "";
        for(let i = 0; i < intLength - strNumber.length; i++){
            prefix += "-";
        }



        return prefix + strNumber;
    }
}