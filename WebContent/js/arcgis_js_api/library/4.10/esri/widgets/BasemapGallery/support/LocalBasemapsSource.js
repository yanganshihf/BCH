// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../Basemap ../../../core/Accessor ../../../core/Collection ../../../core/accessorSupport/decorators".split(" "),function(l,m,f,c,g,h,k,b){var d=k.ofType(g);return function(e){function a(a){a=e.call(this)||this;a.basemaps=new d;return a}f(a,e);Object.defineProperty(a.prototype,"state",{get:function(){return"ready"},enumerable:!0,configurable:!0});a.prototype.refresh=function(){};c([b.property({type:d})],
a.prototype,"basemaps",void 0);c([b.property({readOnly:!0})],a.prototype,"state",null);return a=c([b.subclass("esri.widgets.BasemapGallery.support.LocalBasemapsSource")],a)}(b.declared(h))});