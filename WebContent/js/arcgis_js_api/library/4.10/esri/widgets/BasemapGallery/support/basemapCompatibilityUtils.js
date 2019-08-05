// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/Error ../../../core/promiseUtils ../../../views/3d/terrain/terrainUtils ../../../views/3d/terrain/TilingScheme".split(" "),function(q,h,f,g,k,l){function m(a){var b=a.basemap,e=a.view;return b.load().then(function(){if(0!==b.baseLayers.length){var c=b.baseLayers.concat(b.referenceLayers),c=n(c);return c.length?g.reject(c[0]):b.baseLayers.getItemAt(0).load().then(function(c){return p(c,e)})}}).catch(function(c){var b=c.name,a=c.message;return g.reject(new f(void 0===
b?"basemap-compatibility:unknown-error":b,void 0===a?"Unknown basemap compatibility error":a,c.details))})}function n(a){var b=["ArcGISTiledImageServiceLayer","ArcGISTiledMapServiceLayer","OpenStreetMap","VectorTileLayer","WebTiledLayer"];return a.toArray().filter(function(a){return-1===b.indexOf(a.operationalLayerType)}).map(function(a){return new f("basemap-compatibility:unsupported-basemap-layer-type","Unsupported basemap layer type ${operationalLayerType}",{layer:a,operationalLayerType:a.operationalLayerType||
"unknown"})})}function p(a,b){var e=a.tileInfo;if(e){var c=b.get("viewingMode");if(c){var d;d=e.spatialReference;d=null==d?!1:"global"===c?d.isWebMercator||d.isWGS84:!d.isGeographic;if(!d)return g.reject(new f("basemapgalleryitem:spatial-reference-unsupported-"+c,"Basemap spatial reference is unsupported in "+c+" mode"));if("global"===c){if((d=k.checkIfTileInfoSupportedForView(e,a.fullExtent,null,c))&&a.compatibleTileInfo256&&!k.checkIfTileInfoSupportedForView(a.compatibleTileInfo256,a.fullExtent,
null,c)&&(d=null),d)return g.reject(new f("basemapgalleryitem:tiling-scheme-unsupported-"+(e.spatialReference.isWebMercator?"web-mercator":"wgs84")+"-global","Basemap tiling scheme is unsupported in global mode",{error:d}))}else if(l.checkUnsupported(e))return g.reject(new f("basemapgalleryitem:tiling-scheme-unsupported-local","Basemap tiling scheme is unsupported in local mode"));b=b.get("basemapTerrain.tilingScheme");if(!(!b||b.compatibleWith(e)||a.compatibleTileInfo256&&b.compatibleWith(a.compatibleTileInfo256)))return g.reject(new f("basemapgalleryitem:tiling-scheme-incompatible",
"Basemap tiling scheme is incompatible with the view"))}}}Object.defineProperty(h,"__esModule",{value:!0});h.default3DCompatibility=function(a){return m(a).then(function(){})};h.default2DCompatibility=function(a){var b=a.basemap,e=a.view;return b.load().then(function(){if(0!==b.baseLayers.length){var a=b.baseLayers.getItemAt(0);return a.load().then(function(){var b=(a.get("supportedSpatialReferences")||[a.get("tileInfo.spatialReference")]).filter(Boolean);if(0!==b.length&&b.every(function(a){return!e.spatialReference.equals(a)}))return g.reject(new f("basemap-compatibility:incompatible-spatial-reference",
"Basemap spatial reference is not compatible with the view"))})}})}});