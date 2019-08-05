// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["./lib/literals","./lib/operators","./lib/builtins"],function(x,q,y){"use strict;";var z="block-comment line-comment preprocessor operator integer float ident builtin keyword whitespace eof integer".split(" ");return function(){function f(a){a.length&&m.push({type:z[e],data:a,position:h,line:r,column:n})}function A(){c=c.length?[]:c;if("/"===d&&"*"===a)return h=k+b-1,e=0,d=a,b+1;if("/"===d&&"/"===a)return h=k+b-1,e=1,d=a,b+1;if("#"===a)return e=2,h=k+b,b;if(/\s/.test(a))return e=9,h=k+b,b;
t=/\d/.test(a);u=/[^\w_]/.test(a);h=k+b;e=t?4:u?3:9999;return b}function v(){if(("\r"===a||"\n"===a)&&"\\"!==d)return f(c.join("")),e=999,b;c.push(a);d=a;return b+1}function B(){if("."===d&&/\d/.test(a))return e=5,b;if("/"===d&&"*"===a)return e=0,b;if("/"===d&&"/"===a)return e=1,b;if("."===a&&c.length){for(;p(c););e=5;return b}if(";"===a||")"===a||"("===a){if(c.length)for(;p(c););f(a);e=999;return b+1}var g=2===c.length&&"\x3d"!==a;if(/[\w_\d\s]/.test(a)||g){for(;p(c););e=999;return b}c.push(a);d=
a;return b+1}function p(a){var b=0,e,d;do{e=q.indexOf(a.slice(0,a.length+b).join(""));d=q[e];if(-1===e){if(0<b--+a.length)continue;d=a.slice(0,1).join("")}f(d);h+=d.length;c=c.slice(d.length);return c.length}while(1)}function C(){if("."===a||/[eE]/.test(a))return c.push(a),e=5,d=a,b+1;if("x"===a&&1===c.length&&"0"===c[0])return e=11,c.push(a),d=a,b+1;if(/[^\d]/.test(a))return f(c.join("")),e=999,b;c.push(a);d=a;return b+1}function D(){"f"===a&&(c.push(a),d=a,b+=1);if(/[eE]/.test(a)||"-"===a&&/[eE]/.test(d))return c.push(a),
d=a,b+1;if(/[^\d]/.test(a))return f(c.join("")),e=999,b;c.push(a);d=a;return b+1}var b=0,k=0,e=999,a,d,c=[],m=[],r=1,n=0,h=0,t=!1,u=!1,l="",w;return function(g){m=[];if(null!==g){g=g.replace?g.replace(/\r\n/g,"\n"):g;b=0;l+=g;for(w=l.length;a=l[b],b<w;){g=b;switch(e){case 0:"/"===a&&"*"===d?(c.push(a),f(c.join("")),e=999):(c.push(a),d=a);b+=1;break;case 1:b=v();break;case 2:b=v();break;case 3:b=B();break;case 4:b=C();break;case 11:/[^a-fA-F0-9]/.test(a)?(f(c.join("")),e=999):(c.push(a),d=a,b+=1);
break;case 5:b=D();break;case 9999:if(/[^\d\w_]/.test(a)){var h=c.join("");e=-1<x.indexOf(h)?8:-1<y.indexOf(h)?7:6;f(c.join(""));e=999}else c.push(a),d=a,b+=1;break;case 9:/[^\s]/g.test(a)?(f(c.join("")),e=999):(c.push(a),d=a,b+=1);break;case 999:b=A()}if(g!==b)switch(l[g]){case "\n":n=0;++r;break;default:++n}}k+=b;l=l.slice(b);return m}c.length&&f(c.join(""));e=10;f("(eof)");return m}}});