(function(){
    "use strict";

    angular.module("app-guitartabstranslator").controller("guitarTabsTranslatorController",guitarTabsTranslatorController);

    function guitarTabsTranslatorController(){
        var vm = this;

        vm.firstCard = {
            "cardType": "tabsCard",
            "options": [
                { "name": "Guitar"},
                { "name": "Bass"}
            ]
        };

        vm.secondCard = {
            "cardType": "scoreCard",
            "options": [
                { "name": "Trebble"},
                { "name": "Bass"}
            ]
        };

        vm.switchCards = function(){
            var tempCard = vm.firstCard;
            vm.firstCard = vm.secondCard;
            vm.secondCard = tempCard;
        };
    }

})();