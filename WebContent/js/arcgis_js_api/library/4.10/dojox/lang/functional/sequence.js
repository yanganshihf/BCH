//>>built
define(["dojo/_base/kernel","dojo/_base/lang","./lambda"],function(h,k,f){k.mixin(f,{repeat:function(d,c,a,b){b=b||h.global;c=f.lambda(c);var e=Array(d),g=1;for(e[0]=a;g<d;e[g]=a=c.call(b,a),++g);return e},until:function(d,c,a,b){b=b||h.global;c=f.lambda(c);d=f.lambda(d);for(var e=[];!d.call(b,a);e.push(a),a=c.call(b,a));return e}});return f});