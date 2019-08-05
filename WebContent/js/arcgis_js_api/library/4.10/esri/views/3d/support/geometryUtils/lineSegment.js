// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/ObjectStack ../../../../core/libs/gl-matrix-2/gl-matrix ../mathUtils ../stack".split(" "),function(z,f,x,e,q,l){function p(b){return b?{origin:e.vec3f64.clone(b.origin),vector:e.vec3f64.clone(b.vector)}:{origin:e.vec3f64.create(),vector:e.vec3f64.create()}}function t(b,a){var c=y.get();c.origin=b;c.vector=a;return c}function u(b,a,c){void 0===c&&(c=p());e.vec3.copy(c.origin,b);e.vec3.copy(c.vector,a);return c}function v(b,a){a=e.vec3.subtract(l.sv3d.get(),
a,b.origin);var c=e.vec3.dot(b.vector,a),f=e.vec3.dot(b.vector,b.vector),c=q.clamp(c/f,0,1);b=e.vec3.subtract(l.sv3d.get(),e.vec3.scale(l.sv3d.get(),b.vector,c),a);return e.vec3.dot(b,b)}function w(b,a,c,f,k){var g=b.vector,d=b.origin;a=e.vec3.subtract(l.sv3d.get(),a,d);d=e.vec3.length(g);a=e.vec3.dot(g,a)/d;e.vec3.scale(k,g,q.clamp(a,c,f));return e.vec3.add(k,k,b.origin)}function r(b,a,c,f){var k=b.origin,g=e.vec3.add(l.sv3d.get(),k,b.vector);b=a.origin;var d=e.vec3.add(l.sv3d.get(),b,a.vector),
h=l.sv3d.get();a=l.sv3d.get();h[0]=k[0]-b[0];h[1]=k[1]-b[1];h[2]=k[2]-b[2];a[0]=d[0]-b[0];a[1]=d[1]-b[1];a[2]=d[2]-b[2];if(1E-6>Math.abs(a[0])&&1E-6>Math.abs(a[1])&&1E-6>Math.abs(a[2]))return!1;d=l.sv3d.get();d[0]=g[0]-k[0];d[1]=g[1]-k[1];d[2]=g[2]-k[2];if(1E-6>Math.abs(d[0])&&1E-6>Math.abs(d[1])&&1E-6>Math.abs(d[2]))return!1;var g=h[0]*a[0]+h[1]*a[1]+h[2]*a[2],n=a[0]*d[0]+a[1]*d[1]+a[2]*d[2],m=a[0]*a[0]+a[1]*a[1]+a[2]*a[2],p=(d[0]*d[0]+d[1]*d[1]+d[2]*d[2])*m-n*n;if(1E-6>Math.abs(p))return!1;h=(g*
n-(h[0]*d[0]+h[1]*d[1]+h[2]*d[2])*m)/p;g=(g+n*h)/m;c&&(h=q.clamp(h,0,1),g=q.clamp(g,0,1));c=l.sv3d.get();n=l.sv3d.get();c[0]=k[0]+h*d[0];c[1]=k[1]+h*d[1];c[2]=k[2]+h*d[2];n[0]=b[0]+g*a[0];n[1]=b[1]+g*a[1];n[2]=b[2]+g*a[2];f.tA=h;f.tB=g;f.pA=c;f.pB=n;f.distance2=e.vec3.squaredDistance(c,n);return!0}Object.defineProperty(f,"__esModule",{value:!0});f.create=p;f.wrap=t;f.copy=function(b,a){void 0===a&&(a=p());return u(b.origin,b.vector,a)};f.fromValues=u;f.fromPoints=function(b,a,c){void 0===c&&(c=p());
e.vec3.copy(c.origin,b);e.vec3.subtract(c.vector,a,b);return c};f.distance2=v;f.distance=function(b,a){return Math.sqrt(v(b,a))};f.projectPoint=function(b,a,c){return w(b,a,0,1,c)};f.projectPointClamp=w;f.closestRayDistance2=function(b,a){if(r(b,t(a.origin,a.direction),!1,m)){a=m.tA;var c=m.pB,f=m.distance2;if(0<=a&&1>=a)return f;if(0>a)return e.vec3.squaredDistance(b.origin,c);if(1<a)return e.vec3.squaredDistance(e.vec3.add(l.sv3d.get(),b.origin,b.vector),c)}return null};f.closestLineSegmentPoint=
function(b,a,c){return r(b,a,!0,m)?(e.vec3.copy(c,m.pA),!0):!1};f.closestLineSegmentDistance2=function(b,a){return r(b,a,!0,m)?m.distance2:null};var m={tA:0,tB:0,pA:e.vec3f64.create(),pB:e.vec3f64.create(),distance2:0},y=new x.ObjectStack(function(){return{origin:null,vector:null}})});