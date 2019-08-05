// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../request ../../core/asyncUtils ../../core/Error ../../core/ItemCache ../../core/promiseUtils ../../geometry/support/aaBoundingBox ../../views/3d/layers/graphics/Graphics3DIconSymbolLayer ../../views/3d/layers/graphics/graphicUtils ../../views/3d/layers/graphics/objectResourceUtils ../../views/3d/layers/graphics/primitiveObjectSymbolUtils".split(" "),function(y,c,k,l,m,f,d,n,p,q,r,t){function g(a){if(a.resource.href)return u(a.resource.href).then(function(a){return[a.width,
a.height]});if(a.resource.primitive)return d.resolve(p.PRIMITIVE_SIZE)}function v(a){return g(a).then(function(b){if(null==a.size)return b;b=b[0]/b[1];return 1<b?[a.size,a.size/b]:[a.size*b,a.size]})}function u(a){return k(a,{responseType:"image"}).then(function(a){return a.data})}function h(a){return w(a).then(function(a){return n.size(a)})}function x(a){return h(a).then(function(b){return q.computeSizeWithResourceSize(b,a)})}function w(a){if(a.isPrimitive){var b=null;a.resource&&a.resource.primitive&&
(b=t.primitiveBoundingBox(a.resource.primitive));return b?d.resolve(b):d.reject(new m("symbol:invalid-resource","The symbol does not have a valid resource"))}var c=a.resource.href;a=e.get(c);return void 0!==a?d.resolve(a):l.safeCast(r.fetch(c,{disableTextures:!0}).then(function(a){e.put(c,a.referenceBoundingBox);return a.referenceBoundingBox}))}Object.defineProperty(c,"__esModule",{value:!0});var e=new f(50);c.clearBoundingBoxCache=function(){e=new f(50)};c.computeLayerResourceSize=function(a){if("icon"===
a.type)return g(a);if("object"===a.type)return h(a)};c.computeLayerSize=function(a){if("icon"===a.type)return v(a);if("object"===a.type)return x(a)}});