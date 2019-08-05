// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../factories/quatf64 ../factories/vec3f64 ./common ./mat4 ./quat".split(" "),function(E,f,A,B,m,w,t){function x(a,b,c){var d=.5*c[0],e=.5*c[1];c=.5*c[2];var g=b[0],h=b[1],k=b[2];b=b[3];a[0]=g;a[1]=h;a[2]=k;a[3]=b;a[4]=d*b+e*k-c*h;a[5]=e*b+c*g-d*k;a[6]=c*b+d*h-e*g;a[7]=-d*g-e*h-c*k;return a}function y(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=b[4];a[5]=b[5];a[6]=b[6];a[7]=b[7];return a}function z(a,b,c){var d=b[0],e=b[1],g=b[2],h=b[3],k=c[4],l=c[5],n=c[6],f=c[7],p=b[4],
q=b[5],r=b[6];b=b[7];var u=c[0],v=c[1],m=c[2];c=c[3];a[0]=d*c+h*u+e*m-g*v;a[1]=e*c+h*v+g*u-d*m;a[2]=g*c+h*m+d*v-e*u;a[3]=h*c-d*u-e*v-g*m;a[4]=d*f+h*k+e*n-g*l+p*c+b*u+q*m-r*v;a[5]=e*f+h*l+g*k-d*n+q*c+b*v+r*u-p*m;a[6]=g*f+h*n+d*l-e*k+r*c+b*m+p*v-q*u;a[7]=h*f-d*k-e*l-g*n+b*c-p*u-q*v-r*m;return a}Object.defineProperty(f,"__esModule",{value:!0});f.fromRotationTranslation=x;f.fromTranslation=function(a,b){a[0]=0;a[1]=0;a[2]=0;a[3]=1;a[4]=.5*b[0];a[5]=.5*b[1];a[6]=.5*b[2];a[7]=0;return a};f.fromRotation=
function(a,b){a[0]=b[0];a[1]=b[1];a[2]=b[2];a[3]=b[3];a[4]=0;a[5]=0;a[6]=0;a[7]=0;return a};f.fromMat4=function(a,b){var c=C;w.getRotation(c,b);var d=D;w.getTranslation(d,b);x(a,c,d);return a};var C=A.create(),D=B.create();f.copy=y;f.identity=function(a){a[0]=0;a[1]=0;a[2]=0;a[3]=1;a[4]=0;a[5]=0;a[6]=0;a[7]=0;return a};f.set=function(a,b,c,d,e,g,h,k,l){a[0]=b;a[1]=c;a[2]=d;a[3]=e;a[4]=g;a[5]=h;a[6]=k;a[7]=l;return a};f.getReal=t.copy;f.getDual=function(a,b){a[0]=b[4];a[1]=b[5];a[2]=b[6];a[3]=b[7];
return a};f.setReal=t.copy;f.setDual=function(a,b){a[4]=b[0];a[5]=b[1];a[6]=b[2];a[7]=b[3];return a};f.getTranslation=function(a,b){var c=b[4],d=b[5],e=b[6],g=b[7],h=-b[0],k=-b[1],l=-b[2];b=b[3];a[0]=2*(c*b+g*h+d*l-e*k);a[1]=2*(d*b+g*k+e*h-c*l);a[2]=2*(e*b+g*l+c*k-d*h);return a};f.translate=function(a,b,c){var d=b[0],e=b[1],g=b[2],h=b[3],k=.5*c[0],l=.5*c[1];c=.5*c[2];var n=b[4],f=b[5],p=b[6];b=b[7];a[0]=d;a[1]=e;a[2]=g;a[3]=h;a[4]=h*k+e*c-g*l+n;a[5]=h*l+g*k-d*c+f;a[6]=h*c+d*l-e*k+p;a[7]=-d*k-e*l-
g*c+b;return a};f.rotateX=function(a,b,c){var d=-b[0],e=-b[1],g=-b[2],h=b[3],k=b[4],l=b[5],n=b[6],f=b[7],p=k*h+f*d+l*g-n*e,q=l*h+f*e+n*d-k*g,r=n*h+f*g+k*e-l*d,k=f*h-k*d-l*e-n*g;t.rotateX(a,b,c);d=a[0];e=a[1];g=a[2];h=a[3];a[4]=p*h+k*d+q*g-r*e;a[5]=q*h+k*e+r*d-p*g;a[6]=r*h+k*g+p*e-q*d;a[7]=k*h-p*d-q*e-r*g;return a};f.rotateY=function(a,b,c){var d=-b[0],e=-b[1],g=-b[2],h=b[3],k=b[4],l=b[5],f=b[6],m=b[7],p=k*h+m*d+l*g-f*e,q=l*h+m*e+f*d-k*g,r=f*h+m*g+k*e-l*d,k=m*h-k*d-l*e-f*g;t.rotateY(a,b,c);d=a[0];
e=a[1];g=a[2];h=a[3];a[4]=p*h+k*d+q*g-r*e;a[5]=q*h+k*e+r*d-p*g;a[6]=r*h+k*g+p*e-q*d;a[7]=k*h-p*d-q*e-r*g;return a};f.rotateZ=function(a,b,c){var d=-b[0],e=-b[1],g=-b[2],h=b[3],k=b[4],l=b[5],f=b[6],m=b[7],p=k*h+m*d+l*g-f*e,q=l*h+m*e+f*d-k*g,r=f*h+m*g+k*e-l*d,k=m*h-k*d-l*e-f*g;t.rotateZ(a,b,c);d=a[0];e=a[1];g=a[2];h=a[3];a[4]=p*h+k*d+q*g-r*e;a[5]=q*h+k*e+r*d-p*g;a[6]=r*h+k*g+p*e-q*d;a[7]=k*h-p*d-q*e-r*g;return a};f.rotateByQuatAppend=function(a,b,c){var d=c[0],e=c[1],g=c[2];c=c[3];var h=b[0],k=b[1],
l=b[2],f=b[3];a[0]=h*c+f*d+k*g-l*e;a[1]=k*c+f*e+l*d-h*g;a[2]=l*c+f*g+h*e-k*d;a[3]=f*c-h*d-k*e-l*g;h=b[4];k=b[5];l=b[6];f=b[7];a[4]=h*c+f*d+k*g-l*e;a[5]=k*c+f*e+l*d-h*g;a[6]=l*c+f*g+h*e-k*d;a[7]=f*c-h*d-k*e-l*g;return a};f.rotateByQuatPrepend=function(a,b,c){var d=b[0],e=b[1],g=b[2];b=b[3];var h=c[0],k=c[1],f=c[2],n=c[3];a[0]=d*n+b*h+e*f-g*k;a[1]=e*n+b*k+g*h-d*f;a[2]=g*n+b*f+d*k-e*h;a[3]=b*n-d*h-e*k-g*f;h=c[4];k=c[5];f=c[6];n=c[7];a[4]=d*n+b*h+e*f-g*k;a[5]=e*n+b*k+g*h-d*f;a[6]=g*n+b*f+d*k-e*h;a[7]=
b*n-d*h-e*k-g*f;return a};f.rotateAroundAxis=function(a,b,c,d){if(Math.abs(d)<m.EPSILON)return y(a,b);var e=Math.sqrt(c[0]*c[0]+c[1]*c[1]+c[2]*c[2]);d*=.5;var g=Math.sin(d),h=g*c[0]/e,k=g*c[1]/e;c=g*c[2]/e;d=Math.cos(d);var e=b[0],g=b[1],f=b[2],n=b[3];a[0]=e*d+n*h+g*c-f*k;a[1]=g*d+n*k+f*h-e*c;a[2]=f*d+n*c+e*k-g*h;a[3]=n*d-e*h-g*k-f*c;e=b[4];g=b[5];f=b[6];b=b[7];a[4]=e*d+b*h+g*c-f*k;a[5]=g*d+b*k+f*h-e*c;a[6]=f*d+b*c+e*k-g*h;a[7]=b*d-e*h-g*k-f*c;return a};f.add=function(a,b,c){a[0]=b[0]+c[0];a[1]=b[1]+
c[1];a[2]=b[2]+c[2];a[3]=b[3]+c[3];a[4]=b[4]+c[4];a[5]=b[5]+c[5];a[6]=b[6]+c[6];a[7]=b[7]+c[7];return a};f.multiply=z;f.mul=z;f.scale=function(a,b,c){a[0]=b[0]*c;a[1]=b[1]*c;a[2]=b[2]*c;a[3]=b[3]*c;a[4]=b[4]*c;a[5]=b[5]*c;a[6]=b[6]*c;a[7]=b[7]*c;return a};f.dot=t.dot;f.lerp=function(a,b,c,d){var e=1-d;0>f.dot(b,c)&&(d=-d);a[0]=b[0]*e+c[0]*d;a[1]=b[1]*e+c[1]*d;a[2]=b[2]*e+c[2]*d;a[3]=b[3]*e+c[3]*d;a[4]=b[4]*e+c[4]*d;a[5]=b[5]*e+c[5]*d;a[6]=b[6]*e+c[6]*d;a[7]=b[7]*e+c[7]*d;return a};f.invert=function(a,
b){var c=f.squaredLength(b);a[0]=-b[0]/c;a[1]=-b[1]/c;a[2]=-b[2]/c;a[3]=b[3]/c;a[4]=-b[4]/c;a[5]=-b[5]/c;a[6]=-b[6]/c;a[7]=b[7]/c;return a};f.conjugate=function(a,b){a[0]=-b[0];a[1]=-b[1];a[2]=-b[2];a[3]=b[3];a[4]=-b[4];a[5]=-b[5];a[6]=-b[6];a[7]=b[7];return a};f.length=t.length;f.len=f.length;f.squaredLength=t.squaredLength;f.sqrLen=f.squaredLength;f.normalize=function(a,b){var c=f.squaredLength(b);if(0<c){var c=Math.sqrt(c),d=b[0]/c,e=b[1]/c,g=b[2]/c,h=b[3]/c,k=b[4],l=b[5],n=b[6];b=b[7];var m=d*
k+e*l+g*n+h*b;a[0]=d;a[1]=e;a[2]=g;a[3]=h;a[4]=(k-d*m)/c;a[5]=(l-e*m)/c;a[6]=(n-g*m)/c;a[7]=(b-h*m)/c}return a};f.str=function(a){return"quat2("+a[0]+", "+a[1]+", "+a[2]+", "+a[3]+", "+a[4]+", "+a[5]+", "+a[6]+", "+a[7]+")"};f.exactEquals=function(a,b){return a[0]===b[0]&&a[1]===b[1]&&a[2]===b[2]&&a[3]===b[3]&&a[4]===b[4]&&a[5]===b[5]&&a[6]===b[6]&&a[7]===b[7]};f.equals=function(a,b){var c=a[0],d=a[1],e=a[2],f=a[3],h=a[4],k=a[5],l=a[6];a=a[7];var n=b[0],t=b[1],p=b[2],q=b[3],r=b[4],u=b[5],v=b[6];b=
b[7];return Math.abs(c-n)<=m.EPSILON*Math.max(1,Math.abs(c),Math.abs(n))&&Math.abs(d-t)<=m.EPSILON*Math.max(1,Math.abs(d),Math.abs(t))&&Math.abs(e-p)<=m.EPSILON*Math.max(1,Math.abs(e),Math.abs(p))&&Math.abs(f-q)<=m.EPSILON*Math.max(1,Math.abs(f),Math.abs(q))&&Math.abs(h-r)<=m.EPSILON*Math.max(1,Math.abs(h),Math.abs(r))&&Math.abs(k-u)<=m.EPSILON*Math.max(1,Math.abs(k),Math.abs(u))&&Math.abs(l-v)<=m.EPSILON*Math.max(1,Math.abs(l),Math.abs(v))&&Math.abs(a-b)<=m.EPSILON*Math.max(1,Math.abs(a),Math.abs(b))}});