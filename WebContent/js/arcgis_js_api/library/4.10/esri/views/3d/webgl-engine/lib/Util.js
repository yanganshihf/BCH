// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/libs/gl-matrix-2/gl-matrix","../../support/mathUtils"],function(G,c,g,n){function x(a,b){if(!a)throw a=Error("dummy"),a.stack&&console.log(a.stack),new y(b);}function z(a){for(var b in a)return b}function A(a,b){a[12]=b[0];a[13]=b[1];a[14]=b[2]}function B(a,b){void 0===b&&(b=0);for(var d=0,h=0;4>h;h++)d+=a[b+h]*C[h];return d}function D(a){return a-Math.floor(a)}Object.defineProperty(c,"__esModule",{value:!0});var f=g.vec4f64.create(),r=g.vec2f64.create(),
t=g.vec2f64.create(),p=g.vec2f64.create(),m=g.vec2f64.create(),q=g.vec2f64.create(),v=g.vec2f64.create(),y=function(){function a(a){this.message=a}a.prototype.toString=function(){return"AssertException: "+this.message};return a}();c.AssertException=y;c.VertexAttrConstants={POSITION:"position",NORMAL:"normal",NORMALCOMPRESSED:"normalCompressed",UV0:"uv0",AUXPOS1:"auxpos1",AUXPOS2:"auxpos2",COLOR:"color",SYMBOLCOLOR:"symbolColor",SIZE:"size",REGION:"region",COMPONENTINDEX:"componentIndex"};c.assert=
x;c.verify=function(a,b){a||(console.log("Verify failed: "+b),console.log(Error("dummy").stack))};c.encodeInt16=function(a){return n.clamp(Math.round(32767*a),-32767,32767)};c.encodeNormal=function(a,b){var d=Math.abs(a[0]),h=Math.abs(a[1]),e=1/(d+h+Math.abs(a[2])),c=Math.min(a[2]*e,0);b[0]=(0>a[0]?-1:1)*(d*e-c);b[1]=(0>a[1]?-1:1)*(h*e-c)};c.fallbackIfUndefined=function(a,b){return void 0===a?b:a};c.hex2rgb=function(a){a=Math.floor(a);return[(a>>16&255)/255,(a>>8&255)/255,(a&255)/255]};c.rgb2hex=
function(a){var b=n.clamp(Math.round(255*a[0]),0,255),d=n.clamp(Math.round(255*a[1]),0,255);a=n.clamp(Math.round(255*a[2]),0,255);return"0x"+((b<<16)+(d<<8)+a).toString(16)};c.dec2hex=function(a){a=a.toString(16);return"00000000".substr(0,8-a.length)+a};c.rayTriangle3D=function(a,b,d,h,e,c,u,k,l){void 0===l&&(l=g.vec3f64.create());var f=h[u]-d[c],w=h[u+1]-d[c+1],m=h[u+2]-d[c+2];h=e[k]-d[c];u=e[k+1]-d[c+1];e=e[k+2]-d[c+2];var n=b[1]*e-u*b[2],p=b[2]*h-e*b[0],q=b[0]*u-h*b[1];k=f*n+w*p+m*q;if(-1E-5<k&&
1E-5>k)return!1;k=1/k;var r=a[0]-d[c],t=a[1]-d[c+1];a=a[2]-d[c+2];l[1]=k*(r*n+t*p+a*q);if(0>l[1]||1<l[1])return!1;d=t*m-w*a;a=a*f-m*r;f=r*w-f*t;l[2]=k*(b[0]*d+b[1]*a+b[2]*f);if(0>l[2]||1<l[1]+l[2])return!1;l[0]=k*(h*d+u*a+e*f);return!0};c.rayBoxTest=function(a,b,d,h){var c,f=(d[0]-a[0])/b[0],g=(h[0]-a[0])/b[0];f>g&&(c=f,f=g,g=c);var k=(d[1]-a[1])/b[1],l=(h[1]-a[1])/b[1];k>l&&(c=k,k=l,l=c);if(f>l||k>g)return!1;k>f&&(f=k);l<g&&(g=l);d=(d[2]-a[2])/b[2];a=(h[2]-a[2])/b[2];d>a&&(c=d,d=a,a=c);if(f>a||d>
g)return!1;a<g&&(g=a);return 0>g?!1:!0};c.rayRay2D=function(a,b,d,c,e,f){void 0===f&&(f=g.vec2f64.create());var h=(c[e]-d[e])*(b[0]-a[0])-(c[0]-d[0])*(b[e]-a[e]);if(0===h)return!1;d=((c[0]-d[0])*(a[e]-d[e])-(c[e]-d[e])*(a[0]-d[0]))/h;f[0]=a[0]+d*(b[0]-a[0]);f[1]=a[e]+d*(b[e]-a[e]);return!0};c.project=function(a,b,d,c,e){e||(e=a);f[0]=a[0];f[1]=a[1];f[2]=a[2];f[3]=1;g.vec4.transformMat4(f,f,b);2<e.length&&(e[2]=-f[2]);g.vec4.transformMat4(f,f,d);x(0!==f[3]);e[0]=f[0]/f[3];e[1]=f[1]/f[3];e[2]=f[2]/
f[3];e[0]=(.5*e[0]+.5)*c[2]+c[0];e[1]=(.5*e[1]+.5)*c[3]+c[1]};c.getFirstObjectKey=z;c.getFirstObjectValue=function(a){return a[z(a)]};c.objectEmpty=function(a){for(var b in a)return!1;return!0};c.logWithBase=function(a,b){return Math.log(a)/Math.log(b)};c.setMatrixTranslation=A;c.setMatrixTranslation3=function(a,b,d,c){a[12]=b;a[13]=d;a[14]=c};c.getMatrixTranslation=function(a,b){void 0===b&&(b=g.vec3f64.create());b[0]=a[12];b[1]=a[13];b[2]=a[14];return b};c.createTranslationMatrix=function(a,b){a=
g.mat4.identity(a);A(a,b);return a};c.isTranslationMatrix=function(a){return 1===a[0]&&0===a[1]&&0===a[2]&&0===a[3]&&0===a[4]&&1===a[5]&&0===a[6]&&0===a[7]&&0===a[8]&&0===a[9]&&1===a[10]&&0===a[11]&&1===a[15]};c.fovx2fovy=function(a,b,d){return 2*Math.atan(d*Math.tan(.5*a)/b)};c.fovy2fovx=function(a,b,d){return 2*Math.atan(b*Math.tan(.5*a)/d)};c.fovx2fovd=function(a,b,d){return 2*Math.atan(Math.sqrt(b*b+d*d)*Math.tan(.5*a)/b)};c.fovy2fovd=function(a,b,d){return 2*Math.atan(Math.sqrt(b*b+d*d)*Math.tan(.5*
a)/d)};c.fovd2fovx=function(a,b,d){return 2*Math.atan(b*Math.tan(.5*a)/Math.sqrt(b*b+d*d))};c.fovd2fovy=function(a,b,d){return 2*Math.atan(d*Math.tan(.5*a)/Math.sqrt(b*b+d*d))};c.pointLineSegmentDistanceSquared2D=function(a,b,d){m[0]=b[0]-a[0];m[1]=b[1]-a[1];q[0]=d[0]-a[0];q[1]=d[1]-a[1];v[0]=d[0];v[1]=d[1];b=g.vec2.dot(q,m);d=g.vec2.dot(m,m);b=n.clamp(b/d,0,1);p[0]=m[0]*b;p[1]=m[1]*b;r[0]=a[0]+p[0];r[1]=a[1]+p[1];g.vec2.subtract(t,v,r);a=g.vec2.dot(t,t);b=g.vec2.dot(q,q);d=g.vec2.dot(m,m);var c=
g.vec2.dot(p,p);if(c>b||c>d)a=Number.MAX_VALUE;return a};c.packFloatRGBA=function(a,b,d){void 0===d&&(d=0);a=n.clamp(a,0,E);for(var c=0;4>c;c++)b[d+c]=Math.floor(256*D(a*F[c]))};c.unpackFloatRGBA=B;var F=[1,256,65536,16777216],C=[1/256,1/65536,1/16777216,1/4294967296],E=B(new Uint8ClampedArray([255,255,255,255]));c.inverseProjectionInfo=function(a,b,d,c,e){0===a[11]?(c[0]=2/(b*a[0]),c[1]=2/(d*a[5]),c[2]=(1+a[12])/a[0],c[3]=(1+a[13])/a[5],g.vec2.set(e,0,1)):(c[0]=-2/(b*a[0]),c[1]=-2/(d*a[5]),c[2]=
(1-a[8])/a[0],c[3]=(1-a[9])/a[5],g.vec2.set(e,1,0))}});