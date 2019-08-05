// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","./Util","../../../webgl/programUtils"],function(g,h,e,f){return function(){function c(a){this._programCacheByTemplate=new Map;this._globalOptions={viewingMode:"global"};this._rctx=a;this._programRefCount=[];this._commonUniforms={model:[],modelNormal:[],lightDirection:[],proj:[],shadowMapDistance:[],viewportPixelSz:[],lightingMainDirection:[]}}Object.defineProperty(c.prototype,"globalOptions",{get:function(){return this._globalOptions},enumerable:!0,configurable:!0});c.prototype.dispose=
function(){this._programCacheByTemplate.forEach(function(a){a.programs.forEach(function(a){a.dispose()})});this._programRefCount=this._programCacheByTemplate=null};c.prototype.getProgram=function(a,b){var c=this;this._programCacheByTemplate.has(a)||this.addProgramTemplate(a,function(b){return f.createProgram(c._rctx,a,b)});return this.getProgramTemplateInstance(a,b)};c.prototype.addProgramTemplate=function(a,b){this._programCacheByTemplate.set(a,{constructor:b,programs:new Map})};c.prototype.getProgramTemplateInstance=
function(a,b){if(a=this._programCacheByTemplate.get(a)){var c=b?JSON.stringify(b):"default";a.programs.has(c)||(b=a.constructor(b),a.programs.set(c,b));return a.programs.get(c)}return null};c.prototype.getProgramsUsingUniform=function(a){return this._commonUniforms[a]||[]};c.prototype.increaseRefCount=function(a){var b=a.id;this._programRefCount[b]?this._programRefCount[b]++:(this._programRefCount[b]=1,this._findCommonUniforms(a))};c.prototype.decreaseRefCount=function(a){var b=a.id;1<this._programRefCount[b]?
this._programRefCount[b]--:(this._forgetCommonUniforms(a),this._programRefCount[b]=0)};c.prototype._findCommonUniforms=function(a){for(var b in this._commonUniforms)a.hasUniform(b)&&(e.assert(-1===this._commonUniforms[b].indexOf(a),"common uniforms of program have already been determined"),this._commonUniforms[b].push(a))};c.prototype._forgetCommonUniforms=function(a){for(var b in this._commonUniforms){var c=this._commonUniforms[b],d=c.indexOf(a);-1<d&&(c[d]=c[c.length-1],c.pop())}};return c}()});