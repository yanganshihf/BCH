//>>built
(function(e){"object"===typeof module&&"object"===typeof module.exports?(e=e(require,exports),void 0!==e&&(module.exports=e)):"function"===typeof define&&define.amd&&define(["require","exports","tslib"],e)})(function(e,d){function p(c,b){return c.map(function(a){return Array.isArray(a)?p(a,b):"[object Object]"!==Object.prototype.toString.call(a)?a:k({deep:!0,inherited:b,sources:[a],target:{}})})}function k(c){for(var b=c.deep,a=c.inherited,n=c.target,f=c.copied||[],d=q.__spread(f),e=0;e<c.sources.length;e++){var h=
c.sources[e];if(null!==h&&void 0!==h)for(var m in h)if(a||r.call(h,m)){var g=h[m];if(-1===d.indexOf(g)){if(b)if(Array.isArray(g))g=p(g,a);else if("[object Object]"===Object.prototype.toString.call(g)){var l=n[m]||{};f.push(h);g=k({deep:!0,inherited:a,sources:[g],target:l,copied:f})}n[m]=g}}}return n}function l(c,b){function a(){var d=Date.now()-e;null==b||d>=b?c():f=setTimeout(a,b-d)}var e=Date.now(),f;f=setTimeout(a,b);return{destroy:function(){null!=f&&(clearTimeout(f),f=null)}}}Object.defineProperty(d,
"__esModule",{value:!0});var q=e("tslib"),t=Array.prototype.slice,r=Object.prototype.hasOwnProperty;d.deepAssign=function(c){for(var b=[],a=1;a<arguments.length;a++)b[a-1]=arguments[a];return k({deep:!0,inherited:!1,sources:b,target:c})};d.deepMixin=function(c){for(var b=[],a=1;a<arguments.length;a++)b[a-1]=arguments[a];return k({deep:!0,inherited:!0,sources:b,target:c})};d.mixin=function(c){for(var b=[],a=1;a<arguments.length;a++)b[a-1]=arguments[a];return k({deep:!1,inherited:!0,sources:b,target:c})};
d.partial=function(c){for(var b=[],a=1;a<arguments.length;a++)b[a-1]=arguments[a];return function(){var a=arguments.length?b.concat(t.call(arguments)):b;return c.apply(this,a)}};d.guaranteeMinimumTimeout=l;d.debounce=function(c,b){var a;return function(){a&&a.destroy();var d=this,e=arguments;a=l(function(){c.apply(d,e);e=d=a=null},b)}};d.throttle=function(c,b){var a;return function(){a||(a=!0,c.apply(this,arguments),l(function(){a=null},b))}};d.uuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
function(c){var b=16*Math.random()|0;return("x"===c?b:b&3|8).toString(16)})}});