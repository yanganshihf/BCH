//>>built
define(["dojo/_base/declare","dojo/_base/lang","dojo/has"],function(b,e,f){return b("dojox.mvc._InlineTemplateMixin",null,{buildRendering:function(){var a=this.srcNodeRef;if(a){for(var a=a.querySelectorAll("script[type\x3d'dojox/mvc/InlineTemplate']"),d=[],c=0,b=a.length;c<b;++c)d.push(a[c].innerHTML);if(a=e.trim(d.join("")))this.templateString=a}this.inherited(arguments)}})});