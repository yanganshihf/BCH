// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/extendsHelper ../../../../../core/libs/gl-matrix-2/gl-matrix ../../../camera/constraintUtils ./MomentumController ../../utils/navigationUtils ../../../support/geometryUtils".split(" "),function(c,g,k,d,l,m,e,h){Object.defineProperty(g,"__esModule",{value:!0});c=function(c){function f(a,b,e,f,g){a=c.call(this,a,1)||this;a.momentum=b;a.screenCenter=d.vec2f64.create();a.sceneCenter=d.vec3f64.create();a.tmpSceneCenter=d.vec3f64.create();a.tmpZoomAxisAngle=
h.axisAngle.create();a.sphere=h.sphere.create();d.vec2.copy(a.screenCenter,e);d.vec3.copy(a.sceneCenter,f);a.sphere.radius=g;return a}k(f,c);f.prototype.momentumStep=function(a,b){a=this.momentum.valueDelta(0,a);e.applyZoomOnSphere(this.sphere,b,a);this.constraintOptions.interactionType=1;l.applyAll(this.view,b,this.constraintOptions);e.sphereOrPlanePointFromScreenPoint(this.sphere,b,this.screenCenter,this.tmpSceneCenter);h.axisAngle.fromPoints(this.sceneCenter,this.tmpSceneCenter,this.tmpZoomAxisAngle);
e.applyRotation(b,this.sphere.center,this.tmpZoomAxisAngle);this.constraintOptions.interactionType=4};return f}(m.MomentumController);g.ZoomSphericalMomentumController=c});