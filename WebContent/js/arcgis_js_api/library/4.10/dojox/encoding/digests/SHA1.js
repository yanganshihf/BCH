//>>built
define(["./_base"],function(f){function k(b,c){b[c>>5]|=128<<24-c%32;b[(c+64>>9<<4)+15]=c;c=Array(80);for(var a=1732584193,d=-271733879,h=-1732584194,e=271733878,l=-1009589776,k=0;k<b.length;k+=16){for(var m=a,p=d,q=h,r=e,t=l,g=0;80>g;g++){if(16>g)c[g]=b[k+g];else{var n=c[g-3]^c[g-8]^c[g-14]^c[g-16];c[g]=n<<1|n>>>31}n=f.addWords(f.addWords(a<<5|a>>>27,20>g?d&h|~d&e:40>g?d^h^e:60>g?d&h|d&e|h&e:d^h^e),f.addWords(f.addWords(l,c[g]),20>g?1518500249:40>g?1859775393:60>g?-1894007588:-899497514));l=e;e=
h;h=d<<30|d>>>2;d=a;a=n}a=f.addWords(a,m);d=f.addWords(d,p);h=f.addWords(h,q);e=f.addWords(e,r);l=f.addWords(l,t)}return[a,d,h,e,l]}function m(b){for(var c=[],a=0,d=8*b.length;a<d;a+=8)c[a>>5]|=(b.charCodeAt(a/8)&255)<<24-a%32;return c}function p(b){for(var c=[],a=0,d=4*b.length;a<d;a++)c.push("0123456789abcdef".charAt(b[a>>2]>>8*(3-a%4)+4&15),"0123456789abcdef".charAt(b[a>>2]>>8*(3-a%4)&15));return c.join("")}function q(b){for(var c=[],a=0,d=32*b.length;a<d;a+=8)c.push(String.fromCharCode(b[a>>5]>>>
24-a%32&255));return c.join("")}function r(b){for(var c=[],a=0,d=4*b.length;a<d;a+=3)for(var f=(b[a>>2]>>8*(3-a%4)&255)<<16|(b[a+1>>2]>>8*(3-(a+1)%4)&255)<<8|b[a+2>>2]>>8*(3-(a+2)%4)&255,e=0;4>e;e++)8*a+6*e>32*b.length?c.push("\x3d"):c.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f>>6*(3-e)&63));return c.join("")}f.SHA1=function(b,c){c=c||f.outputTypes.Base64;b=k(m(b),8*b.length);switch(c){case f.outputTypes.Raw:return b;case f.outputTypes.Hex:return p(b);case f.outputTypes.String:return q(b);
default:return r(b)}};f.SHA1._hmac=function(b,c,a){a=a||f.outputTypes.Base64;var d=m(c);16<d.length&&(d=k(d,8*c.length));var h=Array(16);c=Array(16);for(var e=0;16>e;e++)h[e]=d[e]^909522486,c[e]=d[e]^1549556828;b=k(h.concat(m(b)),512+8*b.length);b=k(c.concat(b),672);switch(a){case f.outputTypes.Raw:return b;case f.outputTypes.Hex:return p(b);case f.outputTypes.String:return q(b);default:return r(b)}};return f.SHA1});