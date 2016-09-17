(function(){
    "use strict";

    angular.module("app-guitartabstranslator").controller("guitarTabsTranslatorController",guitarTabsTranslatorController);

    function guitarTabsTranslatorController(){
        var vm = this;

        vm.firstCard = {
            "cardType": "tabsCard",
            "selectedOption": "Guitar",
            "getSelectedScientificPitches": function(){
                var selPrimOption = this.getSelectedOption();
                var selSecOption = selPrimOption.getSelectedOption();
                var filledOutStrings = easyArray.filter(selSecOption.strings, function(string){ return string.fret != null && string.fret.length > 0;});
                var notes = easyArray.map(filledOutStrings, function(string){
                    var baseNoteNumber = musicUtility.convertScientificPitchNameToNumber(string.letter, string.octave);
                    var playedNoteNumber = baseNoteNumber + parseInt(string.fret);
                    return musicUtility.convertScientificPitchNumberToName(playedNoteNumber);
                });
                return notes;
            },
            "getSelectedOption": function(){
                var result = {};
                var primaryOption = this;
                var filterResult = easyArray.filter(this.options, function(itm){ return itm.name == primaryOption.selectedOption; });
                if(filterResult.length > 0) {
                    result = filterResult[0];
                }
                return result;
            },
            "options": [{ 
                "name": "Guitar",
                "selectedOption": "Standard",
                "getSelectedOption": function(){
                    var result = {};
                    var secondaryOption = this;
                    var filterResult = easyArray.filter(this.options, function(itm){ return itm.name == secondaryOption.selectedOption; });
                    if(filterResult.length > 0) {
                        result = filterResult[0];
                    }
                    return result;
                },
                "options": [
                    { 
                        "name": "Standard", 
                        "strings": [
                            {"letter": "E", "octave": "4", "fret": null},
                            {"letter": "B", "octave": "3", "fret": null},
                            {"letter": "G", "octave": "3", "fret": null},
                            {"letter": "D", "octave": "3", "fret": null},
                            {"letter": "A", "octave": "2", "fret": null},
                            {"letter": "E", "octave": "2", "fret": null}
                        ]
                    },
                    { "name": "Drop D" , 
                        "strings": [
                            {"letter": "E", "octave": "4", "fret": null},
                            {"letter": "B", "octave": "3", "fret": null},
                            {"letter": "G", "octave": "3", "fret": null},
                            {"letter": "D", "octave": "3", "fret": null},
                            {"letter": "A", "octave": "2", "fret": null},
                            {"letter": "D", "octave": "2", "fret": null}
                        ]
                    },
                    { "name": "Open D" , 
                        "strings": [
                            {"letter": "D", "octave": "4", "fret": null},
                            {"letter": "A", "octave": "3", "fret": null},
                            {"letter": "F#", "octave": "3", "fret": null},
                            {"letter": "D", "octave": "3", "fret": null},
                            {"letter": "A", "octave": "2", "fret": null},
                            {"letter": "D", "octave": "2", "fret": null}
                        ]
                    },
                    { "name": "Open C", 
                        "strings": [
                            {"letter": "G", "octave": "4", "fret": null},
                            {"letter": "E", "octave": "4", "fret": null},
                            {"letter": "C", "octave": "4", "fret": null},
                            {"letter": "G", "octave": "3", "fret": null},
                            {"letter": "E", "octave": "3", "fret": null},
                            {"letter": "C", "octave": "3", "fret": null}
                        ]
                    },
                    { "name": "Open G", 
                        "strings": [
                            {"letter": "D", "octave": "4", "fret": null},
                            {"letter": "B", "octave": "3", "fret": null},
                            {"letter": "G", "octave": "3", "fret": null},
                            {"letter": "D", "octave": "3", "fret": null},
                            {"letter": "G", "octave": "2", "fret": null},
                            {"letter": "D", "octave": "2", "fret": null}
                        ]
                    },
                    { "name": "Custom", 
                        "strings": [
                            {"letter": "E", "octave": "4", "fret": null},
                            {"letter": "B", "octave": "3", "fret": null},
                            {"letter": "G", "octave": "3", "fret": null},
                            {"letter": "D", "octave": "3", "fret": null},
                            {"letter": "A", "octave": "2", "fret": null},
                            {"letter": "E", "octave": "2", "fret": null}
                        ]
                    }
                ]               
            }, { 
                "name": "Bass",
                "selectedOption": "Standard",
                "getSelectedOption": function(){
                    var result = {};
                    var secondaryOption = this;
                    var filterResult = easyArray.filter(this.options, function(itm){ return itm.name == secondaryOption.selectedOption; });
                    if(filterResult.length > 0) {
                        result = filterResult[0];
                    }
                    return result;
                },
                "options": [
                    { "name": "Standard" , 
                        "strings": [
                            {"letter": "G", "octave": "2", "fret": null},
                            {"letter": "D", "octave": "2", "fret": null},
                            {"letter": "A", "octave": "1", "fret": null},
                            {"letter": "E", "octave": "1", "fret": null}
                        ]
                    },
                    { "name": "Dropped D" , 
                        "strings": [
                            {"letter": "G", "octave": "2", "fret": null},
                            {"letter": "D", "octave": "2", "fret": null},
                            {"letter": "A", "octave": "1", "fret": null},
                            {"letter": "D", "octave": "1", "fret": null}
                        ]
                    },
                    { "name": "Custom" , 
                        "strings": [
                            {"letter": "G", "octave": "2", "fret": null},
                            {"letter": "D", "octave": "2", "fret": null},
                            {"letter": "A", "octave": "1", "fret": null},
                            {"letter": "E", "octave": "1", "fret": null}
                        ]
                    },
                ]
            }]
        };

        vm.secondCard = {
            "cardType": "scientiicPitchNotationCard",
            "selectedOption": "Scientific Pitch Notation",
            "updateModel": function(){
                this.pitches = vm.firstCard.getSelectedScientificPitches();
            },
            "pitches": [],
            "options": [
                {"name": "Scientific Pitch Notation"}
            ]
        };

        vm.notUsedCard = {
            "cardType": "scoreCard",
            "selectedOption": "Trebble",
            "options": [
                { "name": "Trebble"},
                { "name": "Bass"}
            ]
        };

        vm.selectPrimaryOption = function(card, option){
            card["selectedOption"] = option;
        };

        vm.selectSecondaryOption = function(primaryOption, secondaryOption){
            primaryOption["selectedOption"] = secondaryOption;
        }

        vm.switchCards = function(){
            var tempCard = vm.firstCard;
            vm.firstCard = vm.secondCard;
            vm.secondCard = tempCard;
        };
    }

})();