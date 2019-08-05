//>>built
define(["./_base","dojo/_base/lang","./matrix"],function(r,m,h){function l(a,b){return Math.abs(a-b)<=1E-6*(Math.abs(a)+Math.abs(b))}function k(a,b,d,c){if(!isFinite(a))return d;if(!isFinite(d))return a;b=Math.abs(b);c=Math.abs(c);return(b*a+c*d)/(b+c)}function n(a){a=h.normalize(a);var b=-a.xx-a.yy,d=a.xx*a.yy-a.xy*a.yx,c=Math.sqrt(b*b-4*d),b=-(b+(0>b?-c:c))/2,d=d/b,c=a.xy/(b-a.xx),f=1,e=a.xy/(d-a.xx),g=1;l(b,d)&&(c=1,e=f=0,g=1);isFinite(c)||(c=1,f=(b-a.xx)/a.xy,isFinite(f)||(c=(b-a.yy)/a.yx,f=1,
isFinite(c)||(c=1,f=a.yx/(b-a.yy))));isFinite(e)||(e=1,g=(d-a.xx)/a.xy,isFinite(g)||(e=(d-a.yy)/a.yx,g=1,isFinite(e)||(e=1,g=a.yx/(d-a.yy))));a=Math.sqrt(c*c+f*f);var k=Math.sqrt(e*e+g*g);isFinite(c/=a)||(c=0);isFinite(f/=a)||(f=0);isFinite(e/=k)||(e=0);isFinite(g/=k)||(g=0);return{value1:b,value2:d,vector1:{x:c,y:f},vector2:{x:e,y:g}}}function p(a,b){var d=0>a.xx*a.yy||0<a.xy*a.yx?-1:1,c=b.angle1=(Math.atan2(a.yx,a.yy)+Math.atan2(-d*a.xy,d*a.xx))/2,d=Math.cos(c),c=Math.sin(c);b.sx=k(a.xx/d,d,-a.xy/
c,c);b.sy=k(a.yy/d,d,a.yx/c,c);return b}function q(a,b){var d=0>a.xx*a.yy||0<a.xy*a.yx?-1:1,c=b.angle2=(Math.atan2(d*a.yx,d*a.xx)+Math.atan2(-a.xy,a.yy))/2,d=Math.cos(c),c=Math.sin(c);b.sx=k(a.xx/d,d,a.yx/c,c);b.sy=k(a.yy/d,d,-a.xy/c,c);return b}return r.decompose=function(a){var b=h.normalize(a);a={dx:b.dx,dy:b.dy,sx:1,sy:1,angle1:0,angle2:0};if(l(b.xy,0)&&l(b.yx,0))return m.mixin(a,{sx:b.xx,sy:b.yy});if(l(b.xx*b.yx,-b.xy*b.yy))return p(b,a);if(l(b.xx*b.xy,-b.yx*b.yy))return q(b,a);var d,c=new h.Matrix2D(b);
d=m.mixin(c,{dx:0,dy:0,xy:c.yx,yx:c.xy});c=n([b,d]);d=n([d,b]);c=new h.Matrix2D({xx:c.vector1.x,xy:c.vector2.x,yx:c.vector1.y,yy:c.vector2.y});d=new h.Matrix2D({xx:d.vector1.x,xy:d.vector1.y,yx:d.vector2.x,yy:d.vector2.y});b=new h.Matrix2D([h.invert(c),b,h.invert(d)]);p(d,a);b.xx*=a.sx;b.yy*=a.sy;q(c,a);b.xx*=a.sx;b.yy*=a.sy;return m.mixin(a,{sx:b.xx,sy:b.yy})}});