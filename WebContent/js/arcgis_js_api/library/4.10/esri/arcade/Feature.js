// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/assignHelper ./Dictionary ./ImmutableArray ./languageUtils ../geometry/Geometry ../geometry/Point ../geometry/support/jsonUtils ../layers/graphics/featureConversionUtils".split(" "),function(t,u,q,l,m,g,n,p,k,r){return function(){function e(){this.declaredClass="esri.arcade.Feature";this._layer=this.attributes=this._geometry=this._optimizedGeomDefinition=null;this.immutable=this.immutable=this._datesfixed=!0}e.createFromGraphic=function(a){var b=new e;b._geometry=
a.geometry?a.geometry:null;b.attributes=void 0===a.attributes?{}:null===a.attributes?{}:a.attributes;a._sourceLayer?(b._layer=a._sourceLayer,b._datesfixed=!1):a._layer?(b._layer=a._layer,b._datesfixed=!1):a.layer&&(b._layer=a.layer,b._datesfixed=!1);return b};e.createFromArcadeFeature=function(a){var b=new e;b._datesfixed=a._datesfixed;b.attributes=a.attributes;b._geometry=a._geometry;b._optimizedGeomDefinition=a._optimizedGeomDefinition;a._layer&&(b._layer=a._layer);return b};e.createFromOptimisedFeature=
function(a,b,c){var d=new e;d._geometry=a.geometry?{geometry:a.geometry}:null;d._optimizedGeomDefinition=c;d.attributes=a.attributes||{};d._layer=b;d._datesfixed=!1;return d};e.createFromArcadeDictionary=function(a){var b=new e;b.attributes=a.field("attributes");null!==b.attributes?b.attributes instanceof l?(b.attributes=b.attributes.attributes,null===b.attributes&&(b.attributes={})):b.attributes={}:b.attributes={};b._geometry=a.field("geometry");null!==b._geometry&&(b._geometry instanceof l?b._geometry=
e.parseGeometryFromDictionary(b._geometry):b._geometry instanceof n||(b._geometry=null));return b};e.createFromGraphicLikeObject=function(a,b,c){void 0===c&&(c=null);var d=new e;null===b&&(b={});d.attributes=b;d._geometry=a?a:null;d._layer=c;d._layer&&(d._datesfixed=!1);return d};e.prototype.repurposeFromGraphicLikeObject=function(a,b,c){void 0===c&&(c=null);null===b&&(b={});this.attributes=b;this._geometry=a?a:null;this._datesfixed=(this._layer=c)?!1:!0};e.prototype.castToText=function(){var a="",
b;for(b in this.attributes){""!==a&&(a+=",");var c=this.attributes[b];null==c?a+=JSON.stringify(b)+":null":g.isBoolean(c)||g.isNumber(c)||g.isString(c)?a+=JSON.stringify(b)+":"+JSON.stringify(c):c instanceof n?a+=JSON.stringify(b)+":"+g.toStringExplicit(c):c instanceof m?a+=JSON.stringify(b)+":"+g.toStringExplicit(c):c instanceof Array?a+=JSON.stringify(b)+":"+g.toStringExplicit(c):c instanceof Date?a+=JSON.stringify(b)+":"+JSON.stringify(c):null!==c&&"object"===typeof c&&void 0!==c.castToText&&(a+=
JSON.stringify(b)+":"+c.castToText())}return'{"geometry":'+(null===this.geometry()?"null":g.toStringExplicit(this.geometry()))+',"attributes":{'+a+"}}"};e.prototype._fixDates=function(){for(var a=[],b=0;b<this._layer.fields.length;b++){var c=this._layer.fields[b];"date"!==c.type&&"esriFieldTypeDate"!==c.type||a.push(c.name)}0<a.length&&this._fixDateFields(a);this._datesfixed=!0};e.prototype._fixDateFields=function(a){this.attributes=q({},this.attributes);for(var b=0;b<a.length;b++){var c=this.attributes[a[b]];
if(null!==c)if(void 0===c)for(var d in this.attributes){if(d.toLowerCase()===a[b]){c=this.attributes[d];null===c||c instanceof Date||(this.attributes[d]=new Date(c));break}}else c instanceof Date||(this.attributes[a[b]]=new Date(c))}};e.prototype.geometry=function(){if(null===this._geometry)return this._geometry;this._geometry instanceof n||(this._optimizedGeomDefinition?(this._geometry=k.fromJSON(r.convertToGeometry(this._geometry,this._optimizedGeomDefinition.geometryType,this._optimizedGeomDefinition.hasZ,
this._optimizedGeomDefinition.hasM)),this._geometry.spatialReference=this._optimizedGeomDefinition.spatialReference):this._geometry=k.fromJSON(this._geometry));return this._geometry};e.prototype.field=function(a){!1===this._datesfixed&&this._fixDates();var b=a.toLowerCase();a=this.attributes[a];if(void 0!==a)return a;for(var c in this.attributes)if(c.toLowerCase()===b)return this.attributes[c];if(this._hasFieldDefinition(b))return null;throw Error("Field not Found");};e.prototype._hasFieldDefinition=
function(a){if(null===this._layer)return!1;for(var b=0;b<this._layer.fields.length;b++)if(this._layer.fields[b].name.toLowerCase()===a)return!0;return!1};e.prototype._field=function(a){!1===this._datesfixed&&this._fixDates();var b=a.toLowerCase();a=this.attributes[a];if(void 0!==a)return a;for(var c in this.attributes)if(c.toLowerCase()===b)return this.attributes[c];return null};e.prototype.setField=function(a,b){if(this.immutable)throw Error("Feature is Immutable");if(!1===g.isSimpleType(b))throw Error("Illegal Value Assignment to Feature");
var c=a.toLowerCase();if(void 0===this.attributes[a])for(var d in this.attributes)if(d.toLowerCase()===c){this.attributes[d]=b;return}this.attributes[a]=b};e.prototype.hasField=function(a){var b=a.toLowerCase();if(void 0!==this.attributes[a])return!0;for(var c in this.attributes)if(c.toLowerCase()===b)return!0;return this._hasFieldDefinition(b)?!0:!1};e.prototype.keys=function(){var a=[],b={},c;for(c in this.attributes)a.push(c),b[c.toLowerCase()]=1;if(null!==this._layer)for(c=0;c<this._layer.fields.length;c++){var d=
this._layer.fields[c];1!==b[d.name.toLowerCase()]&&a.push(d.name)}return a=a.sort()};e.parseGeometryFromDictionary=function(a){a=e.convertDictionaryToJson(a,!0);void 0!==a.spatialreference&&(a.spatialReference=a.spatialreference,delete a.spatialreference);void 0!==a.rings&&(a.rings=this.fixPathArrays(a.rings,!0===a.hasZ,!0===a.hasM));void 0!==a.paths&&(a.paths=this.fixPathArrays(a.paths,!0===a.hasZ,!0===a.hasM));void 0!==a.points&&(a.points=this.fixPointArrays(a.points,!0===a.hasZ,!0===a.hasM));return k.fromJSON(a)};
e.fixPathArrays=function(a,b,c){var d=[];if(a instanceof Array)for(var e=0;e<a.length;e++)d.push(this.fixPointArrays(a[e],b,c));else if(a instanceof m)for(e=0;e<a.length();e++)d.push(this.fixPointArrays(a.get(e),b,c));return d};e.fixPointArrays=function(a,b,c){var d=[];if(a instanceof Array)for(var e=0;e<a.length;e++){var f=a[e];f instanceof p?b&&c?d.push([f.x,f.y,f.z,f.m]):b?d.push([f.x,f.y,f.z]):c?d.push([f.x,f.y,f.m]):d.push([f.x,f.y]):d.push(f)}else if(a instanceof m)for(e=0;e<a.length();e++)f=
a.get(e),f instanceof p?b&&c?d.push([f.x,f.y,f.z,f.m]):b?d.push([f.x,f.y,f.z]):c?d.push([f.x,f.y,f.m]):d.push([f.x,f.y]):d.push(f);return d};e.convertDictionaryToJson=function(a,b){void 0===b&&(b=!1);var c={},d;for(d in a.attributes){var g=a.attributes[d];g instanceof l&&(g=e.convertDictionaryToJson(g));b?c[d.toLowerCase()]=g:c[d]=g}return c};e.parseAttributesFromDictionary=function(a){var b={},c;for(c in a.attributes){var d=a.attributes[c];if(g.isSimpleType(d))b[c]=d;else throw Error("Illegal Argument");
}return b};e.fromJson=function(a){var b=null;null!==a.geometry&&void 0!==a.geometry&&(b=k.fromJSON(a.geometry));var c={};if(null!==a.attributes&&void 0!==a.attributes)for(var d in a.attributes){var h=a.attributes[d];if(null===h)c[d]=h;else if(g.isString(h)||g.isNumber(h)||g.isBoolean(h)||g.isDate(h))c[d]=h;else throw Error("Illegal Argument");}return e.createFromGraphicLikeObject(b,c,null)};e.prototype.domainValueLookup=function(a,b,c){if(null===this._layer||!this._layer.fields)return null;c=g.getDomain(a,
this._layer,this,c);if(void 0===b)try{b=this.field(a)}catch(d){return null}return g.getDomainValue(c,b)};e.prototype.domainCodeLookup=function(a,b,c){if(null===this._layer||!this._layer.fields)return null;if(void 0===b){try{b=this.field(a)}catch(d){return null}return b}a=g.getDomain(a,this._layer,this,c);return g.getDomainCode(a,b)};return e}()});