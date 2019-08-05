// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../enums","../visualVariablesUtils"],function(k,d,c,h){function e(a,b){void 0===b&&(b=!1);var d=c.WGLVVFlag.SIZE_FIELD_STOPS|c.WGLVVFlag.SIZE_MINMAX_VALUE|c.WGLVVFlag.SIZE_SCALE_STOPS|c.WGLVVFlag.SIZE_UNIT_VALUE;a=(a&(c.WGLVVTarget.FIELD_TARGETS_OUTLINE|c.WGLVVTarget.MINMAX_TARGETS_OUTLINE|c.WGLVVTarget.SCALE_TARGETS_OUTLINE|c.WGLVVTarget.UNIT_TARGETS_OUTLINE))>>>4;return b?d&a:d&~a}function g(a){var b=e(a,!1);return a&(c.WGLVVFlag.COLOR|c.WGLVVFlag.OPACITY|c.WGLVVFlag.ROTATION|
b)}Object.defineProperty(d,"__esModule",{value:!0});d.getVVFlags=function(a){if(!a)return c.WGLVVFlag.NONE;for(var b=0,d=0;d<a.length;d++){var f=a[d];if("size"===f.type){var e=h.getTypeOfSizeVisualVariable(f),b=b|e;"outline"===f.target&&(b|=e<<4)}else"color"===f.type?b|=c.WGLVVFlag.COLOR:"opacity"===f.type?b|=c.WGLVVFlag.OPACITY:"rotation"===f.type&&(b|=c.WGLVVFlag.ROTATION)}return b};d.getSizeFlagsMask=e;d.getMarkerVVFlags=g;d.getFillVVFlags=function(a){return a&(c.WGLVVFlag.COLOR|c.WGLVVFlag.OPACITY)};
d.getLineVVFlags=function(a,b){if(b)return b=e(a,!0),a&b;b=e(a,!1);return a&(c.WGLVVFlag.COLOR|c.WGLVVFlag.OPACITY|b)};d.getTextVVFlags=function(a){return g(a)};d.getLabelVVFlags=function(a){var b=e(a,!1);return a&b}});