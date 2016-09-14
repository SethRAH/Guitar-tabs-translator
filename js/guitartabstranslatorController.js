(function(){
    "use strict";

    angular.module("app-guitartabstranslator").controller("guitarTabsTranslatorController",guitarTabsTranslatorController);

    function guitarTabsTranslatorController(){
        var vm = this;

        vm.firstCard = {
            "cardType": "tabsCard",
            "selectedOption": "Guitar",
            "options": [
                { "name": "Guitar"},
                { "name": "Bass"}
            ]
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

        vm.switchCards = function(){
            var tempCard = vm.firstCard;
            vm.firstCard = vm.secondCard;
            vm.secondCard = tempCard;
        };
    }

})();