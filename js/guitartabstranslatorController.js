(function(){
    "use strict";

    angular.module("app-guitartabstranslator").controller("guitarTabsTranslatorController",guitarTabsTranslatorController);

    function guitarTabsTranslatorController(){
        var vm = this;

        vm.firstCard = {
            "cardType": "tabsCard",
            "selectedOption": "Guitar",
            "options": [{ 
                "name": "Guitar",
                "selectedOption": "Standard",
                "options": [
                    { "name": "Standard" },
                    { "name": "Drop D" },
                    { "name": "Open D"},
                    { "name": "Open C"},
                    { "name": "Open G"},
                    { "name": "Custom"}
                ]               
            }, { 
                "name": "Bass",
                "selectedOption": "Standard",
                "options": [
                    { "name": "Standard" },
                    { "name": "Dropped D" },
                    { "name": "Custom" }
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