(function(){
    "use strict";

    angular.module("app-guitartabstranslator").controller("guitarTabsTranslatorController",guitarTabsTranslatorController);

    function guitarTabsTranslatorController(){
        var vm = this;

        vm.firstCard = {
            "cardType": "tabsCard",
            "selectedOption": "Guitar",
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
                            {"letter": "E", "octave": "4"},
                            {"letter": "B", "octave": "3"},
                            {"letter": "G", "octave": "3"},
                            {"letter": "D", "octave": "3"},
                            {"letter": "A", "octave": "2"},
                            {"letter": "E", "octave": "2"}
                        ]
                    },
                    { "name": "Drop D" , 
                        "strings": [
                            {"letter": "E", "octave": "4"},
                            {"letter": "B", "octave": "3"},
                            {"letter": "G", "octave": "3"},
                            {"letter": "D", "octave": "3"},
                            {"letter": "A", "octave": "2"},
                            {"letter": "D", "octave": "2"}
                        ]
                    },
                    { "name": "Open D" , 
                        "strings": [
                            {"letter": "D", "octave": "4"},
                            {"letter": "A", "octave": "3"},
                            {"letter": "F#", "octave": "3"},
                            {"letter": "D", "octave": "3"},
                            {"letter": "A", "octave": "2"},
                            {"letter": "D", "octave": "2"}
                        ]
                    },
                    { "name": "Open C", 
                        "strings": [
                            {"letter": "G", "octave": "4"},
                            {"letter": "E", "octave": "4"},
                            {"letter": "C", "octave": "4"},
                            {"letter": "G", "octave": "3"},
                            {"letter": "E", "octave": "3"},
                            {"letter": "C", "octave": "3"}
                        ]
                    },
                    { "name": "Open G", 
                        "strings": [
                            {"letter": "D", "octave": "4"},
                            {"letter": "B", "octave": "3"},
                            {"letter": "G", "octave": "3"},
                            {"letter": "D", "octave": "3"},
                            {"letter": "G", "octave": "2"},
                            {"letter": "D", "octave": "2"}
                        ]
                    },
                    { "name": "Custom", 
                        "strings": [
                            {"letter": "E", "octave": "4"},
                            {"letter": "B", "octave": "3"},
                            {"letter": "G", "octave": "3"},
                            {"letter": "D", "octave": "3"},
                            {"letter": "A", "octave": "2"},
                            {"letter": "E", "octave": "2"}
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
                            {"letter": "G", "octave": "2"},
                            {"letter": "D", "octave": "2"},
                            {"letter": "A", "octave": "1"},
                            {"letter": "E", "octave": "1"}
                        ]
                    },
                    { "name": "Dropped D" , 
                        "strings": [
                            {"letter": "G", "octave": "2"},
                            {"letter": "D", "octave": "2"},
                            {"letter": "A", "octave": "1"},
                            {"letter": "D", "octave": "1"}
                        ]
                    },
                    { "name": "Custom" , 
                        "strings": [
                            {"letter": "G", "octave": "2"},
                            {"letter": "D", "octave": "2"},
                            {"letter": "A", "octave": "1"},
                            {"letter": "E", "octave": "1"}
                        ]
                    },
                ]
            }]
        };

        vm.secondCard = {
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