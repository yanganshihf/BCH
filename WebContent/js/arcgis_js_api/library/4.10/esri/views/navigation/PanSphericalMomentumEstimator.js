// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/extendsHelper ../../core/libs/gl-matrix-2/gl-matrix ../3d/state/utils/navigationUtils ./FilteredFiniteDifference ./FilteredValue ./Momentum".split(" "),function(l,e,q,c,m,g,n,r){Object.defineProperty(e,"__esModule",{value:!0});var p=function(c){function b(a,b,t,d,h,k,e){void 0===k&&(k=0);a=c.call(this,a,b,t)||this;a.angularVelocity1=d;a.axis1=h;a.angularVelocity2=k;a.axis2=e;return a}q(b,c);b.prototype.value1=function(a){return c.prototype.valueFromInitialVelocity.call(this,
this.angularVelocity1,a)};b.prototype.value2=function(a){return c.prototype.valueFromInitialVelocity.call(this,this.angularVelocity2,a)};return b}(r.Momentum);e.PanSphericalMomentum=p;l=function(){function d(b,a,f){void 0===b&&(b=300);void 0===a&&(a=12);void 0===f&&(f=.84);this.minimumInitialVelocity=b;this.stopVelocity=a;this.friction=f;this.tmpAxis1=c.vec3f64.create();this.tmpAxis2=c.vec3f64.create();this.tmpAngles=c.vec2f64.create();this.time=new g.FilteredFiniteDifference(.3);this.screen=[new g.FilteredFiniteDifference(.4),
new g.FilteredFiniteDifference(.4)];this.angle1=new n.FilteredValue(.6);this.angle2=new n.FilteredValue(.6);this.axis1=c.vec3f64.create();this.axis2=c.vec3f64.create();this.lastScene=c.vec3f64.create()}d.prototype.addMomentumDirectRotation=function(b,a,f,d,e,h){if(this.time.hasLastValue){if(.01>this.time.computeDelta(f))return;d=m.rotationAngleAndAxisDirectRotation(this.lastScene,a,this.tmpAxis2,d,e,h);this.angle2.update(0);1E-5>c.vec3.squaredLength(this.tmpAxis2)?d=0:c.vec3.normalize(this.axis1,
this.tmpAxis2);this.angle1.update(d);c.vec3.copy(this.lastScene,a)}this.screen[0].update(b[0]);this.screen[1].update(b[1]);this.time.update(f)};d.prototype.addMomentumPreserveHeading=function(b,a,d,e,g,h,k){if(this.time.hasLastValue){if(.01>this.time.computeDelta(d))return;m.rotationAnglesAndAxesHeadingPreserving(this.lastScene,a,this.tmpAxis2,this.tmpAxis1,this.tmpAngles,e,g,h,k,!1);1E-5>c.vec3.squaredLength(this.tmpAxis2)?(this.angle1.update(0),this.angle2.update(0)):(this.angle1.update(this.tmpAngles[1]),
this.angle2.update(this.tmpAngles[0]),c.vec3.normalize(this.axis1,this.tmpAxis1),c.vec3.normalize(this.axis2,this.tmpAxis2));c.vec3.copy(this.lastScene,a)}this.screen[0].update(b[0]);this.screen[1].update(b[1]);this.time.update(d)};d.prototype.reset=function(){this.screen[0].reset();this.screen[1].reset();this.angle1.reset();this.angle2.reset();this.time.reset()};d.prototype.evaluateMomentum=function(){if(!this.screen[0].hasFilteredDelta)return null;var b=this.screen[0].filteredDelta,a=this.screen[1].filteredDelta,
b=Math.sqrt(b*b+a*a)/this.time.filteredDelta;return Math.abs(b)<this.minimumInitialVelocity?null:this.createMomentum(b,this.stopVelocity,this.friction)};d.prototype.createMomentum=function(b,a,c){return new p(b,a,c,this.angle1.filteredValue/this.time.filteredDelta,this.axis1,this.angle2.filteredValue/this.time.filteredDelta,this.axis2)};return d}();e.PanSphericalMomentumEstimator=l});