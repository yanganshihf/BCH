// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/libs/gl-matrix-2/gl-matrix ../../../geometry/Point ../../../geometry/support/aaBoundingRect ../support/earthUtils ../webgl-engine/lib/Selector".split(" "),function(x,h,e,t,u,m,v){function l(a,b){return a.renderCoordsHelper.fromRenderCoords(b,n,a.basemapTerrain.spatialReference)?a.basemapTerrain.getElevation(n)||0:0}function p(a,b,c){if(!a.state.isGlobal)return!1;var d=l(a,b);a=a.stateManager.constraintsManager.nearFarHeuristic.compute(b,c,a.dataExtent,d,w).far;
a*=a;return e.vec3.squaredDistance(b,c)>a}Object.defineProperty(h,"__esModule",{value:!0});h.eyeWithinExtent=function(a,b,c,d){return a.renderCoordsHelper.fromRenderCoords(b.eye,q,d)&&u.containsPoint(c,q)};h.surfaceElevationBelowEye=function(a,b){return l(a,b.eye)};h.surfaceElevationBelowRenderPoint=l;h.cameraOnContentAlongViewDirection=function(a,b,c,d){var f=a.state.camera.copy();b&&(f.eye=b);c&&(f.center=c);d&&(f.up=d);a:{b=f.ray;c=g;void 0===c&&(c=e.vec3f64.create());d=r[a.viewingMode];d||(d=
new v(a.viewingMode),d.enableBackfacesTerrain=!a.state.isGlobal,d.enableInvisibleTerrain=!0,r[a.viewingMode]=d);var h=a.state.isGlobal;if(!a.sceneIntersectionHelper.intersectRay(b,c,d)||p(a,b.origin,c))if(!a.renderCoordsHelper.intersectManifold(b,0,c)||p(a,b.origin,c))if(h)d=e.vec3.dot(b.origin,b.origin)-m.earthRadius*m.earthRadius,e.vec3.scale(c,b.direction,(0<d?Math.sqrt(d)/3:1)/e.vec3.length(b.direction)),e.vec3.add(c,c,b.origin);else{b=!1;break a}b=!0}b||e.vec3.copy(g,f.center);c=a.state.constraints;
d=c.minimumPoiDistance;e.vec3.squaredDistance(f.eye,g)<d&&(b=c.collision.enabled,e.vec3.copy(k,f.viewForward),e.vec3.scale(k,k,d),b?e.vec3.subtract(f.eye,g,k):e.vec3.add(g,f.eye,k),a=a.renderCoordsHelper,d=a.getAltitude(f.eye),c=c.collision.elevationMargin,b&&d<c&&(e.vec3.subtract(k,g,f.eye),a.setAltitude(c,f.eye),e.vec3.add(g,f.eye,k)));f.center=g;return f};var r={},q=e.vec3f64.create(),g=e.vec3f64.create(),n=new t,k=e.vec3f64.create(),w={near:0,far:0}});