(function(){
    "use strict";
    
    var _easyArray = {};

    _easyArray.map = function(array, projectionFunction){
        var results = [];

        array.forEach(function(itemInArray){
            results.push(projectionFunction(itemInArray));
        });

        return results;
    };

    _easyArray.filter = function(array, predicateFunction) {
        var results = [];
        array.forEach(function(itemInArray){
            if (predicateFunction(itemInArray)){
                results.push(itemInArray);
            }
        });

        return results
    };
    
    // Expose it as a public
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = _easyArray;
        }
        exports.easyArray = _easyArray;
    } else {
        this.easyArray = _easyArray;
    }

    // AMD registration  
    if (typeof define === 'function' && define.amd) {
        define('easyArray', [], function () {
        return _easyArray;
        });
    }
    
}.call(this));