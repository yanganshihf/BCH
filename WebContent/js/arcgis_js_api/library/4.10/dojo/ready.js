//>>built
define(["./_base/kernel","./has","require","./has!host-browser?./domReady","./_base/lang"],function(c,h,a,b,k){var n=0,f=[],l=0;h=function(){n=1;c._postLoad=c.config.afterOnLoad=!0;g()};var g=function(){if(!l){for(l=1;n&&(!b||0==b._Q.length)&&(a.idle?a.idle():1)&&f.length;){var c=f.shift();try{c()}catch(d){if(d.info=d.message,a.signal)a.signal("error",d);else throw d;}}l=0}};a.on&&a.on("idle",g);b&&(b._onQEmpty=g);var p=c.ready=c.addOnLoad=function(a,d,b){var e=k._toArray(arguments);"number"!=typeof a?
(b=d,d=a,a=1E3):e.shift();b=b?k.hitch.apply(c,e):function(){d()};b.priority=a;for(e=0;e<f.length&&a>=f[e].priority;e++);f.splice(e,0,b);g()},m=c.config.addOnLoad;if(m)p[k.isArray(m)?"apply":"call"](c,m);b?b(h):h();return p});