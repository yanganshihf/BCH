//>>built
define("dojo/aspect dojo/_base/array dojo/_base/lang dijit/_WidgetBase ./_atBindingMixin dijit/registry".split(" "),function(b,f,d,g,e){return function(g){f.forEach(arguments,function(a){a.dataBindAttr?console.warn("Detected a widget or a widget class that has already been applied data binding extension. Skipping..."):(d._mixin(a,e.mixin),b.before(a,"postscript",function(a,b){this._dbpostscript(a,b)}),b.before(a,"startup",function(){this._started||this._startAtWatchHandles()}),b.before(a,"destroy",
function(){this._stopAtWatchHandles()}),b.around(a,"set",function(a){return function(b,c){return b==e.prototype.dataBindAttr?this._setBind(c):"dojox.mvc.at"==(c||{}).atsignature?this._setAtWatchHandle(b,c):a.apply(this,d._toArray(arguments))}}))});return arguments}});