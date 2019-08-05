// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(g,e){Object.defineProperty(e,"__esModule",{value:!0});var f=function(){function b(b){void 0===b&&(b=32);this._maxBits=b;this._fields=new Map;this._totalBits=0}b.prototype.field=function(b,c){var d=this._totalBits,a=(1<<c)-1;this._totalBits+=c;if(this._totalBits>this._maxBits)throw Error("Bitset layout number of required bits "+this._totalBits+" exceeds maximum number of bits "+this._maxBits);this._fields.set(b,{offset:d,bits:c,maxValue:a,mask:a<<d});return this};
b.prototype.create=function(){var b=this,c=0,d=new Map;this._fields.forEach(function(a,b){return d.set(b,a)});return{set:function(a,b){a=d.get(a);c=c&~a.mask|b<<a.offset&a.mask},setClamped:function(a,b){a=d.get(a);b=Math.max(Math.min(b,a.maxValue),0);c=c&~a.mask|b<<a.offset&a.mask},get:function(a){a=d.get(a);return(c&a.mask)>>a.offset},value:function(){return c},binaryString:function(){for(var a="",d=c,e=0;e<b._totalBits;e++)a=(d&1?"1":"0")+a,d>>=1;return a}}};return b}();e.bitPackLayout=function(b){void 0===
b&&(b=32);return new f(b)}});