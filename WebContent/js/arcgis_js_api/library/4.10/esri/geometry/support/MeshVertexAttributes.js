// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/JSONSupport ../../core/lang ../../core/Logger ../../core/accessorSupport/decorators".split(" "),function(n,l,r,e,t,p,u,c){function q(b,a,d,f){var g=a.loggerTag;a=a.stride;return 0!==b.length%a?(f.error(g,"Invalid array length, expected a multiple of "+a),new d([])):b}function h(b,a,d,f,g){if(!b)return b;if(b instanceof a)return q(b,f,a,g);for(var c=0;c<d.length;c++)if(b instanceof d[c])return q(new a(b),
f,a,g);if(Array.isArray(b))return q(new a(b),f,a,g);d=d.map(function(a){return"'"+a.name+"'"});g.error("Failed to set property, expected one of "+d+", but got "+b.constructor.name);return new a([])}function m(b,a,c){for(var f=Array(b.length),d=0;d<b.length;d++)f[d]=b[d];a[c]=f}Object.defineProperty(l,"__esModule",{value:!0});var k=u.getLogger("esri.geometry.support.MeshVertexAttributes");n=function(b){function a(a){a=b.call(this)||this;a.color=null;a.position=new Float64Array(0);a.uv=null;a.normal=
null;return a}r(a,b);d=a;a.prototype.castColor=function(a){return h(a,Uint8Array,[Uint8ClampedArray],{loggerTag:".color\x3d",stride:4},k)};a.prototype.castPosition=function(a){a&&a instanceof Float32Array&&k.warn(".position\x3d","Setting position attribute from a Float32Array may cause precision problems. Consider storing data in a Float64Array or a regular number array");return h(a,Float64Array,[Float32Array],{loggerTag:".position\x3d",stride:3},k)};a.prototype.castUv=function(a){return h(a,Float32Array,
[Float64Array],{loggerTag:".uv\x3d",stride:2},k)};a.prototype.castNormal=function(a){return h(a,Float32Array,[Float64Array],{loggerTag:".normal\x3d",stride:3},k)};a.prototype.clone=function(){return new d({position:p.clone(this.position),uv:p.clone(this.uv),normal:p.clone(this.normal)})};var d;e([c.property({json:{write:m}})],a.prototype,"color",void 0);e([c.cast("color")],a.prototype,"castColor",null);e([c.property({nonNullable:!0,json:{write:m}})],a.prototype,"position",void 0);e([c.cast("position")],
a.prototype,"castPosition",null);e([c.property({json:{write:m}})],a.prototype,"uv",void 0);e([c.cast("uv")],a.prototype,"castUv",null);e([c.property({json:{write:m}})],a.prototype,"normal",void 0);e([c.cast("normal")],a.prototype,"castNormal",null);return a=d=e([c.subclass("esri.geometry.support.MeshVertexAttributes")],a)}(c.declared(t));l.MeshVertexAttributes=n;l.castArray=h;l.default=n});