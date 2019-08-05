//>>built
(function(c,e){"function"===typeof define&&define.amd?define(e):"object"===typeof exports?module.exports=e():c.Globalize=e()})(this,function(){function c(a){if(!(this instanceof c))return new c(a);k(a,"locale");f(a,"locale");this._locale=a}var e=function(a,b){return a=a.replace(/{[0-9a-zA-Z-_. ]+}/g,function(a){a=a.replace(/^{([^}]*)}$/,"$1");a=b[a];return"string"===typeof a?a:"number"===typeof a?""+a:JSON.stringify(a)})},m=function(){var a=arguments[0];[].slice.call(arguments,1).forEach(function(b){for(var d in b)a[d]=
b[d]});return a},g=function(a,b,d){b=a+(b?": "+e(b,d):"");b=Error(b);b.code=a;m(b,d);return b},n=function(a){return[].reduce.call(a,function(a,d){d=d.charCodeAt(0);return(a<<5)-a+d|0},0)},k=function(a,b){b={name:b};if(void 0===a)throw g("E_MISSING_PARAMETER","Missing required parameter `{name}`.",b);},l=function(a,b,d,c){a={expected:c,name:b,value:a};if(!d)throw g("E_INVALID_PAR_TYPE","Invalid `{name}` parameter ({value}). {expected} expected.",a);},f=function(a,b){l(a,b,void 0===a||"string"===typeof a,
"a string")};c.locale=function(a){f(a,"locale");arguments.length&&(this._locale=a);return this._locale};c._createError=g;c._formatMessage=e;c._regexpEscape=function(a){return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")};c._runtimeKey=function(a,b,c,h){h=h||JSON.stringify(c);a=n(a+b+h);return 0<a?"a"+a:"b"+Math.abs(a)};c._stringPad=function(a,b,c){var d;"string"!==typeof a&&(a=String(a));for(d=a.length;d<b;d+=1)a=c?a+"0":"0"+a;return a};c._validateParameterPresence=k;c._validateParameterTypeString=
f;c._validateParameterType=l;return c});