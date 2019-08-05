// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/libs/gl-matrix-2/gl-matrix","../mathUtils","../stack"],function(v,d,e,u,f){function g(a){void 0===a&&(a=d.UP);return[a[0],a[1],a[2],a[3]]}function m(a,b){void 0===b&&(b=g());return k(a[0],a[1],a[2],a[3],b)}function k(a,b,c,d,e){void 0===e&&(e=g());e[0]=a;e[1]=b;e[2]=c;e[3]=d;return e}function p(a,b,c){void 0===c&&(c=g());e.vec3.copy(c,b);b=e.vec3.dot(b,b);1E-5<Math.abs(b-1)&&e.vec3.scale(c,c,1/Math.sqrt(b));q(c,a,c);return c}function q(a,b,c){a!==c&&m(a,
c);c[3]=-e.vec3.dot(c,b);return c}function r(a,b,c,d){void 0===d&&(d=g());a=e.vec3.cross(f.sv3d.get(),b,a);return p(c,a,d)}function t(a,b,c){a=e.vec3.scale(f.sv3d.get(),a,e.vec3.dot(a,b));e.vec3.subtract(c,b,a);return c}function h(a,b){return e.vec3.dot(a,b)+a[3]}function l(a,b,c,d,f,g){var n=e.vec3.dot(a,c);if(0===n)return!1;a=-(e.vec3.dot(a,b)+a[3])/n;f&&(a=d?Math.max(0,a):u.clamp(a,0,1));if(0>a||!d&&1<a)return!1;e.vec3.add(g,b,e.vec3.scale(g,c,a));return!0}Object.defineProperty(d,"__esModule",
{value:!0});d.create=g;d.wrap=function(a,b,c,d){return k(a,b,c,d,f.sv4d.get())};d.copy=m;d.fromValues=k;d.fromNormalAndOffset=function(a,b,c){void 0===c&&(c=g());e.vec3.copy(c,a);c[3]=b;return c};d.fromPositionAndNormal=p;d.fromPoints=function(a,b,c,d){void 0===d&&(d=g());return r(e.vec3.subtract(f.sv3d.get(),a,b),e.vec3.subtract(f.sv3d.get(),c,b),a,d)};d.setOffsetFromPoint=q;d.negate=function(a,b){b[0]=-a[0];b[1]=-a[1];b[2]=-a[2];b[3]=-a[3];return b};d.fromVectorsAndPoint=r;d.intersectRay=function(a,
b,c){return l(a,b.origin,b.direction,!0,!1,c)};d.intersectLineSegment=function(a,b,c){return l(a,b.origin,b.vector,!1,!1,c)};d.intersectLineSegmentClamp=function(a,b,c){return l(a,b.origin,b.vector,!1,!0,c)};d.isSphereFullyInside=function(a,b){var c=b.radius;return 0<=h(a,b.center)-c};d.isSphereFullyOutside=function(a,b){var c=b.radius;return 0>h(a,b.center)+c};d.isPointInside=function(a,b){return 0<=h(a,b)};d.isPointOutside=function(a,b){return 0>h(a,b)};d.isAABBFullyInside=function(a,b){var c=b[0],
d=b[1],e=b[2],f=b[3],g=b[4];b=b[5];return 0<=a[0]*(0<a[0]?c:f)+a[1]*(0<a[1]?d:g)+a[2]*(0<a[2]?e:b)+a[3]};d.clip=function(a,b){var c=e.vec3.dot(a,b.ray.direction);a=-h(a,b.ray.origin);if(0>a&&0<=c)return!1;if(-1E-6<c&&1E-6>c)return 0<a;if((0>a||0>c)&&!(0>a&&0>c))return!0;a/=c;0<c?a<b.c1&&(b.c1=a):a>b.c0&&(b.c0=a);return b.c0<=b.c1};d.projectPoint=function(a,b,c){var d=e.vec3.scale(f.sv3d.get(),a,-a[3]);b=e.vec3.subtract(f.sv3d.get(),b,d);a=t(a,b,f.sv3d.get());e.vec3.add(c,a,d);return c};d.projectVector=
t;d.distance=function(a,b){return Math.abs(h(a,b))};d.signedDistance=h;d.UP=[0,0,1,0]});