// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/libs/gl-matrix-2/gl-matrix ./common ../../support/geometryUtils ../../support/mathUtils".split(" "),function(w,g,e,m,k,q){function n(b,c,d){void 0===d&&(d=m.defaultApplyOptions);if(!b.state.isLocal)return 0;var a=b.state.constraints.distance;if(!b.pointsOfInterest.surfaceOrigin.renderLocation||Infinity===a)return 0;h.min=0;h.max=a;var a=h,f=d.interactionType;if(0!==f){var g=a.min,k=a.max,l=d.interactionStartCamera;d=d.interactionFactor;var f=1===f||4===f,p=
n(b,l),l=0===p?0:e.vec3.distance(l.eye,b.pointsOfInterest.surfaceOrigin.renderLocation);a.min=g;a.max=k;m.adjustRangeForInteraction(p,l,f,d,.05*l,a)}b=e.vec3.distance(c.eye,b.pointsOfInterest.surfaceOrigin.renderLocation);b=h.max-b;return-1E-6<=b?0:b}Object.defineProperty(g,"__esModule",{value:!0});g.error=n;g.apply=function(b,c,d,a){void 0===d&&(d=m.defaultApplyOptions);void 0===a&&(a=c);a!==c&&a.copyFrom(c);var f=n(b,c,d);if(0===f)return!1;var g=b.pointsOfInterest.surfaceOrigin,f=e.vec3.distance(c.eye,
b.pointsOfInterest.surfaceOrigin.renderLocation)+f,h=e.vec3.copy(r,c.eye);d=m.interactionDirectionTowardsConstraintMinimization(b,c,d.interactionDirection,q.directionFromTo(t,c.eye,b.pointsOfInterest.surfaceOrigin.renderLocation),u);return k.sphere.intersectRay(k.sphere.wrap(f,g.renderLocation),k.ray.wrap(c.eye,d),a.eye)?(c=e.vec3.subtract(v,a.eye,h),e.vec3.add(a.center,a.center,c),a.markViewDirty(),c=b.renderCoordsHelper.getAltitude(a.center),b.renderCoordsHelper.intersectInfiniteManifold(a.ray,
c,a.center),a.markViewDirty(),!0):!1};var h={min:0,max:0},r=e.vec3f64.create(),v=e.vec3f64.create(),u=e.vec3f64.create(),t=e.vec3f64.create()});