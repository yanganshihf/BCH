// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Accessor ../../../core/Collection ../../../core/Evented ../../../core/accessorSupport/decorators ../../../support/actions/ActionBase ../../../support/actions/ActionButton ../../../support/actions/ActionToggle".split(" "),function(c,q,h,e,k,f,l,d,m,n,p){c=f.ofType({key:"type",defaultKeyValue:"button",base:m,typeMap:{button:n,toggle:p}});var g=f.ofType(c);return function(c){function b(a){a=
c.call(this,a)||this;a.actionsSections=new g;return a}h(b,c);b.prototype.triggerAction=function(a){a&&this.emit("trigger-action",{action:a})};e([d.property({type:g})],b.prototype,"actionsSections",void 0);e([d.property()],b.prototype,"triggerAction",null);return b=e([d.subclass("esri.widgets.support.ActionCollection")],b)}(d.declared(k,l))});