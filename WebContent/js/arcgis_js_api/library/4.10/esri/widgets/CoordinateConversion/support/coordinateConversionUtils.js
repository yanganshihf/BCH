// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/assignHelper ../../../geometry ../../../core/Error ../../../core/promiseUtils ../../../geometry/support/webMercatorUtils".split(" "),function(x,d,t,l,m,n,u){function q(a,b){b=r(b);return[a[0].toFixed(b),a[1].toFixed(b)]}function r(a){return 500<=a?6:500>a&&50<=a?7:50>a&&5<=a?8:9}function h(a){return"number"===typeof a&&isFinite(a)}function p(a){return a&&h(a.x)&&h(a.y)}function k(a,b){return a.spatialReference.isGeographic&&b?(a=q([a.x,a.y],b),a[0]+
", "+a[1]):a.x.toFixed(3)+", "+a.y.toFixed(3)}Object.defineProperty(d,"__esModule",{value:!0});var v={utm:{conversionMode:"utmDefault",addSpaces:!0},usng:{numOfDigits:5,rounding:!1,addSpaces:!1},mgrs:{rounding:!1}},f=Array(3);d.clipLonLat=q;d.getDegreePrecision=r;d.debounceDeferred=function(a,b,e){var c,g;return function(){c&&(clearTimeout(c),c=null);g&&g.cancel(null);var w=arguments;return g=n.create(function(g,d){c=setTimeout(function(){c=null;a.apply(b,w).then(function(a){return g(a)}).catch(function(a){return d(a)})},
e)})}};d.fromGeoCoordinateString=function(a){var b=a.coordinate,e=a.spatialReference,c=a.formatName;return a.geometryServicePromise.then(function(a){return a.fromGeoCoordinateString({strings:[b],sr:e,conversionType:c}).then(function(a){var b=new l.Point({x:a[0][0],y:a[0][1],spatialReference:e});if(!p(b))throw a;return b}).catch(function(a){throw new m("coordinate-conversion:from-geo-coordinate-string-failed","Failed to convert coordinate notation",{notationResult:a});})})};d.fromXY=function(a,b){var e=
0<=a.indexOf(",")?",":" ",c=a.split(e).map(function(a){return(a=a.trim())?Number(a):null});a=c[0];e=c[1];c=c[2];if(!h(a)||!h(e))return null;b=new l.Point({x:a,y:e,spatialReference:b||l.SpatialReference.WGS84});c&&(b.z=c,b.hasZ=!0);return b};d.isValidPoint=p;d.pointToCoordinate=k;d.project=function(a){var b=a.spatialReference,e=a.geometryServicePromise,c=a.location,d=a.scale;if(!b||c.spatialReference.wkid===b.wkid)return n.resolve({location:c,coordinate:k(c,d)});if((c.spatialReference.isWGS84||c.spatialReference.isWebMercator)&&
(b.isWGS84||b.isWebMercator))return n.resolve({location:u.project(c,b),coordinate:k(c,d)});if(f[0]===c&&f[1]===b.wkid)return f[2];f[0]=c;f[1]=b.wkid;a=e.then(function(a){return a.project({geometries:[c],outSpatialReference:b}).then(function(a){if(!p(a[0]))throw a[0];return{location:a[0],coordinate:k(a[0],d)}}).catch(function(a){throw new m("coordinate-conversion:projection-failed","Failed to project point",{projectionResult:a});})});return f[2]=a};d.toGeoCoordinateString=function(a){var b=a.formatName,
d=a.location;a=a.geometryServicePromise;var c=t({coordinates:[[d.x,d.y]],sr:d.spatialReference,conversionType:b},v[b]||{});return a.then(function(a){return a.toGeoCoordinateString(c).then(function(a){var b=a[0];if(!b)throw a;return b}).catch(function(a){throw new m("coordinate-conversion:to-geo-coordinate-string-failed","Failed to convert coordinate notation",{notationResult:a});})})};d.isSupportedNotation=function(a){return"dd"===a||"dms"===a||"ddm"===a||"mgrs"===a||"usng"===a||"utm"===a}});