// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(l,b){function f(c,a,d){void 0===a&&(a={});var e;switch(d){case "webgl":e=["webgl","experimental-webgl","webkit-3d","moz-webgl"];break;case "webgl2":e=["webgl2"];break;default:e=["webgl","experimental-webgl","webkit-3d","moz-webgl"]}d=null;for(var b=0;b<e.length;b++){var f=e[b];try{d=c.getContext(f,a)}catch(m){}if(d)break}return d}function g(c,a){(c=c.parentNode)&&(c.innerHTML='\x3ctable style\x3d"background-color: #8CE; width: 100%; height: 100%;"\x3e\x3ctr\x3e\x3ctd align\x3d"center"\x3e\x3cdiv style\x3d"display: table-cell; vertical-align: middle;"\x3e\x3cdiv style\x3d""\x3e'+
a+"\x3c/div\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e")}Object.defineProperty(b,"__esModule",{value:!0});b.createContextOrErrorHTML=function(c,a,b){void 0===a&&(a={});if(!window.WebGLRenderingContext)return g(c,h),null;a=f(c,a,b);return a?a:(g(c,k),null)};b.createContext=f;var h='This page requires a browser that supports WebGL.\x3cbr/\x3e\x3ca href\x3d"http://get.webgl.org"\x3eClick here to upgrade your browser.\x3c/a\x3e',k='It doesn\'t appear your computer can support WebGL.\x3cbr/\x3e\x3ca href\x3d"http://get.webgl.org/troubleshooting/"\x3eClick here for more information.\x3c/a\x3e'});