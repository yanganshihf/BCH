//>>built
(function(c){"object"===typeof module&&"object"===typeof module.exports?(c=c(require,exports),void 0!==c&&(module.exports=c)):"function"===typeof define&&define.amd&&define(["require","exports","./global"],c)})(function(c,b){function d(a){return"number"===typeof a&&e.default.isFinite(a)}function f(a){return d(a)&&Math.floor(a)===a}Object.defineProperty(b,"__esModule",{value:!0});var e=c("./global");b.EPSILON=1;b.MAX_SAFE_INTEGER=Math.pow(2,53)-1;b.MIN_SAFE_INTEGER=-b.MAX_SAFE_INTEGER;b.isNaN=function(a){return"number"===
typeof a&&e.default.isNaN(a)};b.isFinite=d;b.isInteger=f;b.isSafeInteger=function(a){return f(a)&&Math.abs(a)<=b.MAX_SAFE_INTEGER}});