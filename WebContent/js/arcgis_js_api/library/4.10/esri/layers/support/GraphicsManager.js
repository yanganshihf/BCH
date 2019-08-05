// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["../../core/Accessor"],function(p){var q=0;return p.createSubclass({constructor:function(){this._deletedGraphicsIndex=new Set;this._intentsIndex=new Map},destroy:function(){this.removeAll();this._intentsIndex=this._deletedGraphicsIndex=null},properties:{graphics:null,indexById:{value:null,dependsOn:["graphics","objectIdField"],get:function(){return this._createIndexById(this.graphics&&this.graphics.toArray(),this.objectIdField)}},numGraphics:{value:0,dependsOn:["indexById"],get:function(){return this.indexById?
this.indexById.size:0}},objectIdField:null,updating:{value:!1,dependsOn:["_intentsIndex"],get:function(){return!!(this._intentsIndex&&0<this._intentsIndex.size)}},_intentsIndex:{value:null}},_oldIndex:null,_deletedGraphicsIndex:null,beginPagedUpdate:function(){this._oldIndex=this.indexById;this.indexById=null;this.notifyChange("numGraphics")},addPage:function(a,b){this.add(a,b)},revertPagedUpdate:function(){var a=this._removeLeftOnly(this.indexById,this._oldIndex);this.indexById=this._oldIndex;this._oldIndex=
null;this.graphics.removeMany(a);this.notifyChange("numGraphics")},endPagedUpdate:function(){var a=this._removeLeftOnly(this._oldIndex,this.indexById);this._oldIndex=null;this.graphics.removeMany(a);this.notifyChange("numGraphics")},findGraphic:function(a){return(a=this.indexById&&this.indexById.get(a))&&a.graphic},removeAll:function(){this.indexById=this._oldIndex=null;this.graphics.removeAll();this.notifyChange("numGraphics")},add:function(a,b){if(a&&a.length){for(var d=this.objectIdField,c=this.indexById=
this.indexById||new Map,e=this._oldIndex,f=this._createIndexById(a,d),f=this._extractObjectIds(f),c=this._extractObjectIds(c),e=this._extractObjectIds(e),c=c.concat(e),g=[],m=c.length,e=0;e<m;e++){var h=c[e];-1<f.indexOf(h)&&g.push(h)}g.length&&this._remove(g,!1);b=this.findIntent(b);f=new Map;c=a.length;for(e=0;e<c;e++)(g=a[e])&&g.attributes&&f.set(g.attributes[d],b);a.length&&this._add(a,f)}},remove:function(a){this._remove(a,!1)},delete:function(a){this._remove(a,!0)},isDeleted:function(a){return this._deletedGraphicsIndex.has(a)},
createIntentToAdd:function(a){a&&this._intentsIndex.forEach(function(b,c){a.forEach(function(a){b.ignoredIds.add(a)})},this);var b=q++;this._intentsIndex.set(b,{ignoredIds:new Set});this.notifyChange("updating");return b},findIntent:function(a){return this._intentsIndex.get(a)},removeIntent:function(a){this._intentsIndex.delete(a);this.notifyChange("updating")},update:function(a,b){if(a&&a.length){var d=this.objectIdField,c=this.indexById=this.indexById||new Map,e=this._oldIndex;a=this._createIndexById(a,
d);for(var d=this._extractObjectIds(a),f=this._extractObjectIds(c),g=this._extractObjectIds(e),f=f.concat(g),g=[],m=f.length,h=0;h<m;h++){var k=f[h];if(-1===d.indexOf(k))g.push(k);else{var l=c.get(k)||e.get(k),l=l&&l.graphic&&l.graphic._ts,n=a.get(k);(n&&n.graphic&&n.graphic._ts)>l&&g.push(k)}}c=[];e=d.length;for(h=0;h<e;h++)k=d[h],(-1===f.indexOf(k)||-1<g.indexOf(k))&&c.push(k);g.length&&this._remove(g,!1);c.length&&this._add(this._extractGraphics(c,a),b)}},_createIndexById:function(a,b){var d;if(a&&
a.length&&b){var c,e,f;d=new Map;for(c=0;e=a[c];c++)f=e.attributes&&e.attributes[b],null!=f&&d.set(f,{graphic:e,refCount:1})}return d},_add:function(a,b){var d=this.objectIdField;a.forEach(function(a){var c=b.get(a.attributes&&a.attributes[d]);this._addToIndex(a,this.indexById,c)},this);this.graphics.addMany(a);this.notifyChange("numGraphics")},_addToIndex:function(a,b,d){var c=a.attributes&&a.attributes[this.objectIdField];b&&null!=c&&(b.has(c)?d&&d.ignoredIds.has(c)||(d=b.get(c),b.set(c,{graphic:a,
refCount:d.refCount+1})):this.isDeleted(c)||b.set(c,{graphic:a,refCount:1}))},_remove:function(a,b){a=a||[];a="object"===typeof a[0]?a.map(function(a){return a.attributes&&a.attributes[this.objectIdField]}.bind(this)):a;var d=this._extractGraphics(a,this._oldIndex),c=this._extractGraphics(a,this.indexById);a.forEach(function(a){b&&this._deletedGraphicsIndex.add(a);this._removeFromIndex(a,this._oldIndex,b);this._removeFromIndex(a,this.indexById,b)}.bind(this));this.graphics.removeMany(d.concat(c));
this.notifyChange("numGraphics")},_removeFromIndex:function(a,b,d){if(b&&b.has(a))if(d)b.delete(a);else{d=b.get(a);var c=d.refCount-1;0===c?b.delete(a):d.refCount=c}},_removeLeftOnly:function(a,b){var d=[];a&&a.forEach(function(c,e){var f=c.graphic;!f||b&&b.has(e)||(--c.refCount,0===c.refCount&&a.delete(e),d.push(f))});return d},_extractGraphics:function(a,b){return a&&b?a.map(function(a){return(a=b.get(a))&&a.graphic}):[]},_extractObjectIds:function(a){var b=[];a&&a.forEach(function(a,c){b.push(c)});
return b}})});