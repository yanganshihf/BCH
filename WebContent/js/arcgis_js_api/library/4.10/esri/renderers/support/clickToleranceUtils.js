// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(f,e){function c(a,b){return b&&b.xoffset?Math.max(a,Math.abs(b.xoffset)):b&&b.yoffset?Math.max(a,Math.abs(b.yoffset)):a}Object.defineProperty(e,"__esModule",{value:!0});e.calculateTolerance=function(a){if(!a)return 6;if("simple"===a.type)return c(6,a.symbol);if("unique-value"===a.type){var b=6;a.uniqueValueInfos.forEach(function(a){b=c(b,a.symbol)});return b}if("class-breaks"===a.type){var d=6;a.classBreakInfos.forEach(function(a){d=c(d,a.symbol)});return d}return 6}});