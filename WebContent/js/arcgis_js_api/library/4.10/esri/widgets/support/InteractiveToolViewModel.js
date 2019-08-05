// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/Handles ../../core/watchUtils ../../core/accessorSupport/decorators ../../views/interactive/interactiveToolUtils".split(" "),function(m,n,f,d,g,h,k,c,l){return function(e){function b(a){a=e.call(this,a)||this;a.tool=null;a._baseHandles=new h;a._loggedUnsupportedErrorOnce=!1;a._readyPromise=null;return a}f(b,e);b.prototype.initialize=function(){var a=this;this._baseHandles.add(k.init(this,
["view.ready","isSupported"],function(){a.view&&a.view.ready&&!a.isSupported?a._loggedUnsupportedErrorOnce||(a.logUnsupportedError(),a._loggedUnsupportedErrorOnce=!0):a._loggedUnsupportedErrorOnce=!1}))};b.prototype.destroy=function(){this.tool&&(l.setActive(this.tool,!1),this.view&&this.view.tools.remove(this.tool),this.tool.destroy(),this._set("tool",null));this.view=null;this._baseHandles.destroy();this._baseHandles=null;this._readyPromise&&(this._readyPromise.cancel(),this._readyPromise=null)};
Object.defineProperty(b.prototype,"isSupported",{get:function(){return!this.view||this.view.type===this.supportedViewType},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"view",{get:function(){return this._get("view")},set:function(a){var b=this;a&&(a!==this.view&&this.view&&this.tool&&(this.view.tools.remove(this.tool),this._set("tool",null)),this._readyPromise&&this._readyPromise.cancel(),this._readyPromise=a.whenReady().then(function(){if(!b.tool){var c=b.createTool(a);c.visible=
b.visible;b._set("tool",c)}a.tools.add(b.tool)}));this._set("view",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"visible",{set:function(a){this._set("visible",a);this.tool&&(this.tool.visible=a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"active",{get:function(){return!!this.tool&&this.tool.active},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"isDisabled",{get:function(){return!this.tool||!this.view||!this.view.ready||!this.isSupported},
enumerable:!0,configurable:!0});d([c.property({constructOnly:!0})],b.prototype,"tool",void 0);d([c.property({dependsOn:["view.type"]})],b.prototype,"isSupported",null);d([c.property({value:null})],b.prototype,"view",null);d([c.property({type:Boolean,value:!0})],b.prototype,"visible",null);d([c.property({dependsOn:["tool.active"]})],b.prototype,"active",null);d([c.property({dependsOn:["tool","view","view.ready","isSupported"]})],b.prototype,"isDisabled",null);return b=d([c.subclass("esri.widgets.support.InteractiveToolViewModel")],
b)}(c.declared(g))});