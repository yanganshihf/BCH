// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","./tsSupport/generatorHelper"],function(p,q,n){var f;(function(f){function l(b,a,d,g){for(var c=a,e=d>>>1,f=b[c-1];a<=e;){a=c<<1;a<d&&0>g(b[a-1],b[a])&&++a;var k=b[a-1];if(0>=g(k,f))break;b[c-1]=k;c=a}b[c-1]=f}function m(b,a){return b<a?-1:b>a?1:0}f.sort=function(b,a,d,g){void 0===a&&(a=0);void 0===d&&(d=b.length);void 0===g&&(g=m);for(var c=d>>>1;c>a;c--)l(b,c,d,g);for(var e=a+1,c=d-1;c>a;c--)d=b[a],b[a]=b[c],b[c]=d,l(b,e,c,g)};f.iterableSort=function(b,a,d,g,c){var e,
f,k;return n(this,function(h){switch(h.label){case 0:void 0===a&&(a=0),void 0===d&&(d=b.length),void 0===g&&(g=m),e=d>>>1,h.label=1;case 1:return e>a?c&&c()?[4]:[3,3]:[3,5];case 2:h.sent(),h.label=3;case 3:l(b,e,d,g),h.label=4;case 4:return e--,[3,1];case 5:f=a+1,e=d-1,h.label=6;case 6:return e>a?c&&c()?[4]:[3,8]:[3,10];case 7:h.sent(),h.label=8;case 8:k=b[a],b[a]=b[e],b[e]=k,l(b,f,e,g),h.label=9;case 9:return e--,[3,6];case 10:return[2]}})}})(f||(f={}));return f});