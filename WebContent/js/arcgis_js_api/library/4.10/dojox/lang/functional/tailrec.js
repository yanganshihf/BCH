//>>built
define(["dojo","dijit","dojox","dojo/require!dojox/lang/functional/lambda,dojox/lang/functional/util"],function(b,p,n){b.provide("dojox.lang.functional.tailrec");b.require("dojox.lang.functional.lambda");b.require("dojox.lang.functional.util");(function(){var c=n.lang.functional,b=c.inlineLambda;c.tailrec=function(a,d,e){var k,h,l,m={},f={},g=function(a){m[a]=1};"string"==typeof a?a=b(a,"_x",g):(k=c.lambda(a),a="_c.apply(this, _x)",f["_c\x3d_t.c"]=1);"string"==typeof d?d=b(d,"_x",g):(h=c.lambda(d),
d="_t.t.apply(this, _x)");"string"==typeof e?e=b(e,"_x",g):(l=c.lambda(e),e="_b.apply(this, _x)",f["_b\x3d_t.b"]=1);g=c.keys(m);f=c.keys(f);a=new Function([],"var _x\x3darguments,_t\x3d_x.callee,_c\x3d_t.c,_b\x3d_t.b".concat(g.length?","+g.join(","):"",f.length?",_t\x3d_x.callee,"+f.join(","):h?",_t\x3d_x.callee":"",";for(;!",a,";_x\x3d",e,");return ",d));k&&(a.c=k);h&&(a.t=h);l&&(a.b=l);return a}})()});