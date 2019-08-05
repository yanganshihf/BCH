// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/extendsHelper ../../../../../core/libs/gl-matrix-2/gl-matrix ../../../camera/constraintUtils ../InteractiveController ../../utils/navigationUtils ../../../support/geometryUtils ../../../support/mathUtils".split(" "),function(c,h,m,a,k,n,g,l,p){Object.defineProperty(h,"__esModule",{value:!0});c=function(c){function d(e,f){var b=c.call(this)||this;b.view=e;b.intersectionHelper=f;b.tmpP=a.vec3f64.create();b.tmpN=a.vec3f64.create();b.tmpP0=a.vec2f64.create();
b.tmpPoi=a.vec3f64.create();b.tmpRayDir=a.vec3f64.create();b.dragBeginPoint=a.vec2f64.create();b.normalizedAnchorPoint=a.vec2f64.create();b.constraintOptions={selection:15,interactionType:1,interactionFactor:0,interactionStartCamera:null,interactionDirection:a.vec3f64.create(),tiltMode:0};b.plane=l.plane.create();return b}m(d,c);d.prototype.begin=function(e){this.active&&(a.vec2.copy(this.dragBeginPoint,e),g.normalizeCoordinate(this.beginCamera,e,this.normalizedAnchorPoint),this.intersectionHelper.intersectScreenFreePointFallback(e,
this.tmpP),a.vec3.subtract(this.tmpN,this.beginCamera.eye,this.beginCamera.center),a.vec3.normalize(this.tmpN,this.tmpN),0>this.tmpN[1]&&a.vec3.negate(this.tmpN,this.tmpN),l.plane.fromPositionAndNormal(this.tmpP,this.tmpN,this.plane),this.constraintOptions.interactionStartCamera=this.beginCamera)};d.prototype.update=function(e){if(this.active){g.intersectPlaneFromScreenPoint(this.plane,this.currentCamera,this.dragBeginPoint,this.tmpPoi)||a.vec3.copy(this.tmpPoi,this.currentCamera.center);g.normalizeCoordinate(this.currentCamera,
e,this.tmpP0);var f=4*(this.normalizedAnchorPoint[1]-this.tmpP0[1]);a.vec2.copy(this.normalizedAnchorPoint,this.tmpP0);a.vec3.subtract(this.tmpRayDir,this.tmpPoi,this.currentCamera.eye);var b=a.vec3.length(this.tmpRayDir),c=b*(1-f);a.vec3.copy(this.constraintOptions.interactionDirection,this.tmpRayDir);a.vec3.scale(this.constraintOptions.interactionDirection,this.constraintOptions.interactionDirection,p.sign(f)/b);var d=this.view.state.constraints.minimumPoiDistance;0<=f&&c<d&&(c=d,f=-(c-b)/b);1E-6>
Math.abs(b-c)||(a.vec3.scale(this.tmpRayDir,this.tmpRayDir,f),a.vec3.add(this.currentCamera.eye,this.currentCamera.eye,this.tmpRayDir),a.vec3.lerp(this.currentCamera.center,this.currentCamera.center,this.tmpPoi,f),this.currentCamera.center[2]=this.tmpPoi[2]>this.beginCamera.center[2]?Math.max(this.beginCamera.center[2],this.currentCamera.center[2]):Math.min(this.beginCamera.center[2],this.currentCamera.center[2]),this.currentCamera.markViewDirty(),this.constraintOptions.interactionFactor=k.pixelDistanceToInteractionFactor(this.dragBeginPoint,
e),k.applyAll(this.view,this.currentCamera,this.constraintOptions))}};d.prototype.end=function(){this.active&&this.finishController()};return d}(n.InteractiveController);h.ZoomController=c});