// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/libs/gl-matrix-2/gl-matrix"],function(a,b,c){Object.defineProperty(b,"__esModule",{value:!0});a=function(){return function(d,a,b){void 0===d&&(d=c.vec3f64.create());void 0===a&&(a=c.vec3f64.fromValues(.57735,.57735,.57735));void 0===b&&(b=!0);this.intensity=d;this.direction=a;this.castShadows=b}}();b.MainLight=a;a=function(){return function(a,b){void 0===a&&(a=c.vec3f64.create());void 0===b&&(b=c.vec3f64.fromValues(.57735,.57735,.57735));this.intensity=
c.vec3f64.create();this.direction=c.vec3f64.create();this.intensity=a;this.direction=b}}();b.FillLight=a;a=function(){return function(a){void 0===a&&(a=c.vec3f64.create());this.intensity=a}}();b.AmbientLight=a;a=function(){return function(){this.sh={r:[0],g:[0],b:[0]}}}();b.SphericalHarmonicsLight=a});