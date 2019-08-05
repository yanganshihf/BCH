// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../Basemap ../core/Collection ../core/Logger ../core/urlUtils ../core/accessorSupport/ensureType ./basemapDefinitions".split(" "),function(A,d,f,v,w,x,y,e){function k(a,b){var c;if("string"===typeof a){if(!(a in e))return b=Object.keys(e).map(function(a){return'"'+a+'"'}).join(", "),z.warn("Unable to find basemap definition for: "+a+". Try one of these: "+b),null;b&&(c=b[a]);c||(c=f.fromId(a),b&&(b[a]=c))}else c=y.default(f,a);return c}function l(a,b){return a.map(function(a){return b.find(function(b){return m(g(a),
g(b))})||a})}function h(a){return a?!a.loaded&&a.resourceInfo?n(a.resourceInfo.data):{baseLayers:p(a.baseLayers),referenceLayers:p(a.referenceLayers)}:null}function p(a){return(v.isCollection(a)?a.toArray():a).map(g)}function g(a){return{type:a.type,url:q(a.urlTemplate||a.url||a.styleUrl),minScale:null!=a.minScale?a.minScale:0,maxScale:null!=a.maxScale?a.maxScale:0,opacity:null!=a.opacity?a.opacity:1,visible:null!=a.visible?!!a.visible:!0}}function n(a){return a?{baseLayers:r(a.baseMapLayers.filter(function(a){return!a.isReference})),
referenceLayers:r(a.baseMapLayers.filter(function(a){return a.isReference}))}:null}function r(a){return a.map(function(a){var b;switch(a.layerType){case "VectorTileLayer":b="vector-tile";break;case "ArcGISTiledMapServiceLayer":b="tile";break;default:b="unknown"}return{type:b,url:q(a.templateUrl||a.urlTemplate||a.styleUrl||a.url),minScale:null!=a.minScale?a.minScale:0,maxScale:null!=a.maxScale?a.maxScale:0,opacity:null!=a.opacity?a.opacity:1,visible:null!=a.visibility?!!a.visibility:!0}})}function t(a,
b,c){return null!=a!==(null!=b)?"not-equal":a?u(a.baseLayers,b.baseLayers)?u(a.referenceLayers,b.referenceLayers)?"equal":c.mustMatchReferences?"not-equal":"base-layers-equal":"not-equal":"equal"}function u(a,b){if(a.length!==b.length)return!1;for(var c=0;c<a.length;c++)if(!m(a[c],b[c]))return!1;return!0}function m(a,b){return a.type===b.type&&a.url===b.url&&a.minScale===b.minScale&&a.maxScale===b.maxScale&&a.visible===b.visible&&a.opacity===b.opacity}function q(a){return a?x.normalize(a).replace(/^\s*https?:/i,
"").toLowerCase():""}Object.defineProperty(d,"__esModule",{value:!0});var z=w.getLogger("esri.support.basemapUtils");d.createCache=function(){return{}};d.ensureType=k;d.clonePreservingTiledLayers=function(a,b){void 0===b&&(b=null);a=k(a);if(!a)return null;var c=new f({id:a.id,title:a.title,baseLayers:a.baseLayers.slice(),referenceLayers:a.referenceLayers.slice()});b&&(c.baseLayers=l(c.baseLayers,b.baseLayers),c.referenceLayers=l(c.referenceLayers,b.referenceLayers));c.load();c.portalItem=a.portalItem;
return c};d.getWellKnownBasemapId=function(a){var b=null;a=h(a);for(var c in e){var d=n(e[c]),d=t(a,d,{mustMatchReferences:!1});if("equal"===d){b=c;break}else"base-layers-equal"===d&&(b=c)}return b};d.contentEquals=function(a,b){if(a===b)return!0;a=h(a);b=h(b);return"equal"===t(a,b,{mustMatchReferences:!0})}});