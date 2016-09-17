(function(){
    "use strict";
    
    var _musicUtility = {};

    _musicUtility.convertScientificPitchNameToNumber = function(letter, octave){
        var chrom = 0;
        switch(letter){
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

        return chrom + (12 * (octave));
    };

    _musicUtility.convertScientificPitchNumberToName = function(number){
        var octave = Math.floor(number / 12);
        var letterNum = number % 12;
        var letter = "C"
        switch (letterNum){
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
    }
    
    // Expose it as a public
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = _musicUtility;
        }
        exports.musicUtility = _musicUtility;
    } else {
        this.musicUtility = _musicUtility;
    }

    // AMD registration  
    if (typeof define === 'function' && define.amd) {
        define('musicUtility', [], function () {
        return _musicUtility;
        });
    }
    
}.call(this));