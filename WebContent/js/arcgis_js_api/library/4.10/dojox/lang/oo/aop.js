//>>built
define(["dojo","dijit","dojox","dojo/require!dojox/lang/oo/Decorator,dojox/lang/oo/general"],function(d,l,k){d.provide("dojox.lang.oo.aop");d.require("dojox.lang.oo.Decorator");d.require("dojox.lang.oo.general");(function(){var a=k.lang.oo,e=a.makeDecorator,g=a.general,a=a.aop,f=d.isFunction;a.before=g.before;a.around=g.wrap;a.afterReturning=e(function(a,c,b){return f(b)?function(){var a=b.apply(this,arguments);c.call(this,a);return a}:function(){c.call(this)}});a.afterThrowing=e(function(a,c,b){return f(b)?
function(){var a;try{a=b.apply(this,arguments)}catch(h){throw c.call(this,h),h;}return a}:b});a.after=e(function(a,c,b){return f(b)?function(){var a;try{a=b.apply(this,arguments)}finally{c.call(this)}return a}:function(){c.call(this)}})})()});