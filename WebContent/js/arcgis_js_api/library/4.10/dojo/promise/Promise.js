//>>built
define(["../_base/lang"],function(c){function b(){throw new TypeError("abstract");}return c.extend(function(){},{then:function(a,c,d){b()},cancel:function(a,c){b()},isResolved:function(){b()},isRejected:function(){b()},isFulfilled:function(){b()},isCanceled:function(){b()},always:function(a){return this.then(a,a)},"catch":function(a){return this.then(null,a)},otherwise:function(a){return this.then(null,a)},trace:function(){return this},traceRejected:function(){return this},toString:function(){return"[object Promise]"}})});