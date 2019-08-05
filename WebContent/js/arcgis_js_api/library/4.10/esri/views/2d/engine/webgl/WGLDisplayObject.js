// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","./WGLDisplayRecord","./collisions/Metric","./util/serializationUtils"],function(k,l,g,h,e){return function(){function b(a){this.insertAfter=null;this.id=a;this.displayRecords=[];this.metrics=[]}b.prototype.copy=function(){var a=new b(this.id);a.set(this);return a};b.prototype.set=function(a){this.id=a.id;this.displayRecords=a.displayRecords;this.metrics=a.metrics;this.insertAfter=a.insertAfter};b.prototype.serialize=function(a){a.push(this.id);e.serializeList(a,this.metrics);
e.serializeList(a,this.displayRecords);return a};b.deserialize=function(a,c){var f=c.store,d=a.readInt32();c=new b(d);f={id:d,store:f};d=e.deserializeList(a,h.default);d.length&&(c.metrics=d);c.displayRecords=e.deserializeList(a,g,f);return c};return b}()});