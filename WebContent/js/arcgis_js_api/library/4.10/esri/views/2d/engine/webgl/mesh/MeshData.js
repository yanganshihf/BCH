// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../util/serializationUtils","../util/Writer"],function(f,h,l,k){Object.defineProperty(h,"__esModule",{value:!0});f=function(){function b(a,b,c){this.displayObjects=a;this.vertexVectorsMap=b;this._materials=c}Object.defineProperty(b.prototype,"materials",{get:function(){return this._materials},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"vertexBuffersMap",{get:function(){if(!this._vertexBuffersMap){this._vertexBuffersMap={};for(var a=0;a<this.vertexVectorsMap.length;a++)this._vertexBuffersMap[a]=
this.vertexVectorsMap[a].intoBuffers();this.vertexVectorsMap=null}return this._vertexBuffersMap},enumerable:!0,configurable:!0});b.prototype.get=function(a){return this.vertexVectorsMap[a]};b.prototype.pushDisplayObject=function(a){this.displayObjects.push(a)};b.prototype.encode=function(a,b){var c=l.serializeList(new k.default(Uint32Array,this._guessSize()),this.displayObjects).buffer(),d=this._materials.serialize(new k.default(Uint32Array)).buffer(),g={};b.push(c);b.push(d);for(var e=0;e<this.vertexVectorsMap.length;e++){var f=
this.vertexVectorsMap[e];g[e]={};f.transfer(g[e],b)}a.displayObjects=c;a.materialStore=d;a.vertexBuffersMap=g;this.destroy()};b.prototype.destroy=function(){this.displayObjects=this.vertexVectorsMap=null};b.prototype._guessSize=function(){for(var a=this.displayObjects,b=Math.min(a.length,4),c=0,d=0;d<b;d++)c=Math.max(c,a[d].displayRecords.length);return 2*(12*a.length+a.length*c*40)};return b}();h.default=f});