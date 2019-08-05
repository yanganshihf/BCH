// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/libs/gl-matrix-2/gl-matrix ../../support/earthUtils ../../support/geometryUtils ../../support/mathUtils ../../support/stack ../../support/geometryUtils/coordinateSystem ../../webgl-engine/lib/Camera".split(" "),function(ha,e,a,L,h,k,q,y,fa){function H(c,d,b){var f=q.sm4d.get();a.mat4.identity(f);a.mat4.rotate(f,f,b[3],b);a.vec3.subtract(c.eye,c.eye,d);a.vec3.transformMat4(c.eye,c.eye,f);a.vec3.add(c.eye,c.eye,d);a.vec3.subtract(c.center,c.center,d);a.vec3.transformMat4(c.center,
c.center,f);a.vec3.add(c.center,c.center,d);a.vec3.transformMat4(c.up,c.up,f);c.markViewDirty()}function M(c,d){a.vec3.set(d,0,0,0);for(var b=0;b<c.length;b++)a.vec3.add(d,d,c[b]);a.vec3.scale(d,d,1/c.length)}function N(c,d,b){return Math.sin(c/a.vec3.length(d))*(b+L.earthRadius)}function O(c,d,b,f){b=h.ray.fromScreenAtEye(d,b,I);h.sphere.closestPointOnSilhouette(c,b,z);return h.sphere.intersectRay(c,b,f)?a.vec3.squaredDistance(z,b.origin)<a.vec3.squaredDistance(f,b.origin)?(a.vec3.copy(f,z),!1):
!0:(a.vec3.subtract(t,d.eye,d.center),a.vec3.normalize(t,t),h.plane.fromNormalAndOffset(t,-a.vec3.dot(a.vec3.normalize(t,t),z),P),h.plane.intersectRay(P,b,f),!1)}function Q(c,d,b,f,m,g){a.vec3.cross(A,c,d);a.vec3.subtract(B,c,d);a.vec3.length(c)<=m||!f.aboveGround?(a.vec3.cross(b,B,f.eye),c=a.vec3.dot(c,d)/(a.vec3.length(c)*a.vec3.length(d)),g=Math.cos(k.clamp(k.cyclicalPI.normalize(k.deg2rad(g)),0,e.TiltThresholdPanningSpeed)),d=-k.acos(c)-Math.max(0,a.vec3.length(d)-m)/(g*m)):(a.vec3.subtract(R,
f.eye,f.center),a.vec3.cross(b,B,R),d=-a.vec3.length(B)/m);a.vec3.normalize(b,b);a.vec3.scale(b,b,a.vec3.length(A));return d}function J(c,a,b,f){f=Math.cos(k.clamp(k.cyclicalPI.normalize(k.deg2rad(f)),0,e.TiltThresholdPanningSpeed));a=a>b?-(a-b)/(f*b):a<-b?Math.PI-(a+b)/(f*b):k.acos(a/b);return((c>b?-(c-b)/(f*b):c<-b?Math.PI-(c+b)/(f*b):k.acos(c/b))-a)*b}function S(c,d,b,f,m,g,e,h,k,l){k=J(c[2],d[2],e.radius,k);d=l?J(c[0],d[0],e.radius,180):d[0]-c[0];c=Math.sin(h)*d-Math.cos(h)*k;h=Math.cos(h)*d+
Math.sin(h)*k;a.vec3.normalize(T,m);m=l?c/Math.sqrt(Math.abs(Math.pow(e.radius,2)-Math.pow(a.vec3.dot(b,T),2))):c/e.radius;b=h/Math.sqrt(Math.abs(Math.pow(e.radius,2)-Math.pow(a.vec3.dot(b,f),2)));a.vec2.set(g,m,b)}function U(c,d,b,f,e,g,h,k,l,n){a.vec3.cross(A,c,d);y.coordinateSystemFromOneAxisAndNormalVector(g.up,g.eye,C,D,E);y.coordinateSystemFromOneAxisAndNormalVector([0,0,1],g.eye,u,v,ga);a.vec3.copy(b,v);a.vec3.copy(f,u);a.vec3.normalize(b,b);a.vec3.scale(b,b,a.vec3.length(A));y.vectorCoordinates(c,
a.vec3.normalize(D,D),a.vec3.normalize(E,E),a.vec3.normalize(C,C),V);y.vectorCoordinates(d,D,E,C,W);S(V,W,c,u,v,e,h,k,l,n)}function X(c,d,b,f,e,g,h){a.mat4.identity(l);a.mat4.identity(n);a.mat4.identity(p);a.mat4.rotate(l,l,e,f);a.mat4.rotate(n,n,h,g);a.mat4.multiply(p,l,n);a.vec3.subtract(d,c,b);a.vec3.transformMat4(d,d,p);a.vec3.add(d,d,b)}function Y(c,d,b,f,e,g){a.mat4.identity(l);a.mat4.identity(n);a.mat4.identity(p);a.mat4.rotate(l,l,f,b);a.mat4.rotate(n,n,g,e);a.mat4.multiply(p,l,n);a.vec3.subtract(c.eye,
c.eye,d);a.vec3.transformMat4(c.eye,c.eye,p);a.vec3.add(c.eye,c.eye,d);a.vec3.subtract(c.center,c.center,d);a.vec3.transformMat4(c.center,c.center,p);a.vec3.add(c.center,c.center,d);a.vec3.subtract(c.up,c.up,d);a.vec3.transformMat4(c.up,c.up,p);a.vec3.add(c.up,c.up,d);c.markViewDirty()}function Z(a,d,b,f,m,g,h,k){a=Math.abs(a[2])<b*f||Math.abs(d)>b;return(Math.abs(g)>Math.PI-m||Math.abs(g)<m)&&a&&k.aboveGround&&h<e.PreservingHeadingThreshold.Tilt?!0:!1}function aa(a,d,b,f,e,g){g?(h.axisAngle.fromPoints(b,
f,ba),H(d,a.center,ba)):(b=Q(b,f,ca,d,a.radius,e),H(d,a.center,h.axisAngle.wrapAxisAngle(ca,b)))}function da(c,d,b,f,e,g,h){var m=h?20:1;a.vec3.copy(r,f);F.copyFrom(d);for(var k,l=0;l<m&&1E-12<a.vec3.squaredDistance(b,r);l++)if(f=a.vec3.squaredDistance(b,r),U(b,r,v,u,w,F,c,e,g,h),Y(F,c.center,u,w[1],v,w[0]),X(r,r,c.center,u,w[1],v,w[0]),k=a.vec3.squaredDistance(b,r),k<f||0===l)d.copyFrom(F);else break}Object.defineProperty(e,"__esModule",{value:!0});e.Earth=h.sphere.fromValues(L.earthRadius,a.vec3f64.create());
e.normalizeCoordinate=function(a,d,b){b[0]=d[0]/a.fullWidth;b[1]=d[1]/a.fullHeight;return b};e.sphereOrSilhouettePointFromScreenPoint=function(c,d,b,f){d=h.ray.fromScreenAtEye(d,b,I);b=h.sphere.intersectRay(c,d,f);c=h.sphere.closestPointOnSilhouette(c,d,q.sv3d.get());return!b||a.vec3.squaredDistance(c,d.origin)<a.vec3.squaredDistance(f,d.origin)?(a.vec3.copy(f,c),!1):!0};e.rotationFromPointsAroundAxis=function(c,d,b){var f=q.sv3d.get(),e=q.sv3d.get(),g=q.sv3d.get();a.vec3.copy(e,c);a.vec3.copy(g,
d);c=a.vec3.dot(e,b);d=a.vec3.dot(g,b);a.vec3.scale(f,b,c);a.vec3.subtract(e,e,f);a.vec3.normalize(e,e);a.vec3.scale(f,b,d);a.vec3.subtract(g,g,f);a.vec3.normalize(g,g);c=a.vec3.dot(e,g);a.vec3.cross(f,b,e);b=a.vec3.dot(g,f);return Math.atan2(b,c)};e.normalizeRotationDelta=function(a){for(;a>Math.PI;)a-=2*Math.PI;for(;a<-Math.PI;)a+=2*Math.PI;return a};e.applyRotation=H;e.intersectPlaneFromScreenPoint=function(a,d,b,e){return h.plane.intersectRay(a,h.ray.fromScreen(d,b,I),e)};e.applyZoomToPoint=function(c,
d,b,e){var f=q.sv3d.get();b=1-b;a.vec3.subtract(f,d,c.eye);var g=a.vec3.length(f),h=g*(1-b);0<=b&&h<e&&(h=e,b=-(h-g)/g);1E-6>Math.abs(g-h)||(a.vec3.scale(f,f,b),a.vec3.add(c.eye,c.eye,f),a.vec3.lerp(c.center,c.center,d,b))};e.applyZoomOnSphere=function(c,d,b){a.vec2.set(ea,d.padding[3]+d.width/2,d.padding[2]+d.height/2);h.sphere.intersectScreen(c,d,ea,d.center);d.markViewDirty();c=d.distance;b*=c;1E-6>Math.abs(c-b)||(b=a.vec3.scale(q.sv3d.get(),d.viewForward,b),a.vec3.subtract(d.eye,d.center,b),d.markViewDirty())};
var ea=a.vec2f64.create();e.navPointToScreenPoint=function(c,d,b){a.vec2.set(b,d.x,c.fullHeight-d.y)};e.centroidOnSphere=function(c,d,b){M(d,b);a.vec3.normalize(b,b);a.vec3.scale(b,b,c)};e.centroid=M;e.onSurfaceTiltToEyeTiltGlobal=N;e.offSurfaceTiltToEyeTiltGlobal=function(a,d,b){return N(Math.PI/2,d,b)+(a-Math.PI/2)};var x;(function(a){a[a.Vertical=0]="Vertical";a[a.Horizontal=1]="Horizontal"})(x=e.PanMode||(e.PanMode={}));e.VerticalPanTresholds={Elevation:3E4,Angle:k.deg2rad(8)};e.PreservingHeadingThreshold=
{Pole:.95,Angle:k.deg2rad(18),Tilt:80};e.TiltThresholdPanningSpeed=k.deg2rad(80);e.pickPointAndInitSphere=function(c,d,b,f){var k=a.vec3f64.create(),g=h.sphere.create(),l=!0;c.intersectScreen(b,k)?g.radius=a.vec3.length(k):(g.radius=d.aboveGround?Math.max(a.vec3.length(d.center),.9*e.Earth.radius):a.vec3.length(d.eye)-d.relativeElevation,f?O(g,d,b,k):l=h.sphere.intersectScreen(g,d,b,k));return{sphere:g,scenePickPoint:l?k:null}};e.decidePanMode=function(c,d,b){var f=a.vec3.length(c.eye);if(Math.abs(f-
e.Earth.radius)>e.VerticalPanTresholds.Elevation)return x.Horizontal;if(c.aboveGround===d.radius>f)return x.Vertical;a.vec3.subtract(G,c.eye,b);a.vec3.normalize(G,G);return Math.abs(.5*Math.PI-k.acos(a.vec3.dot(b,G)/a.vec3.length(b)))<e.VerticalPanTresholds.Angle?x.Vertical:x.Horizontal};var G=a.vec3f64.create();e.applyPanPlanar=function(c,d,b){a.vec3.subtract(K,b,d);a.vec3.subtract(c.eye,c.eye,K);a.vec3.subtract(c.center,c.center,K);c.markViewDirty()};var K=a.vec3f64.create();e.sphereOrPlanePointFromScreenPoint=
O;var z=a.vec3f64.create(),t=a.vec3f64.create(),P=h.plane.create();e.rotationAngleAndAxisDirectRotation=Q;var R=a.vec3f64.create();e.lengthFromPoints=J;e.rotationAnglesHeadingPreserving=S;e.rotationAnglesAndAxesHeadingPreserving=U;e.rotatePointAroundTwoAxes=X;e.applyRotationWithTwoAxes=Y;e.preserveHeadingThreshold=Z;e.applyPanSphericalDirectRotation=aa;e.applyPanSphericalPreserveHeading=da;e.panToPosition=function(c,d,b,f,h,g,l){Z(b,a.vec3.dot(d.up,b),c.radius,e.PreservingHeadingThreshold.Pole,e.PreservingHeadingThreshold.Angle,
-k.cyclicalPI.normalize(k.deg2rad(h)),g,d)?da(c,d,b,f,-k.cyclicalPI.normalize(k.deg2rad(h)),g,l):aa(c,d,b,f,g,l)};var u=a.vec3f64.create(),v=a.vec3f64.create(),ga=a.vec3f64.create(),C=a.vec3f64.create(),D=a.vec3f64.create(),E=a.vec3f64.create(),V=a.vec3f64.create(),W=a.vec3f64.create(),w=a.vec2f64.create(),ba=h.axisAngle.create(),l=a.mat4f64.create(),n=a.mat4f64.create(),p=a.mat4f64.create(),r=a.vec3f64.create(),T=a.vec3f64.create(),B=a.vec3f64.create(),F=new fa,A=a.vec3f64.create(),ca=a.vec3f64.create(),
I={origin:a.vec3f64.create(),direction:a.vec3f64.create()}});