// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../Color ../../core/lang ../../core/screenUtils ../../core/accessorSupport/decorators ./Callout3D ./LineCallout3DBorder ../support/materialUtils".split(" "),function(p,q,h,c,k,e,l,b,m,n,f){return function(g){function a(a){a=g.call(this)||this;a.type="line";a.color=new k([0,0,0,1]);a.size=l.px2pt(1);a.border=null;return a}h(a,g);d=a;Object.defineProperty(a.prototype,"visible",{get:function(){return 0<
this.size&&0<this.color.a},enumerable:!0,configurable:!0});a.prototype.clone=function(){return new d({color:e.clone(this.color),size:this.size,border:e.clone(this.border)})};var d;c([b.property({type:["line"]})],a.prototype,"type",void 0);c([b.property(f.colorAndTransparencyProperty)],a.prototype,"color",void 0);c([b.property(f.screenSizeProperty)],a.prototype,"size",void 0);c([b.property({type:n.default,json:{write:!0}})],a.prototype,"border",void 0);c([b.property({dependsOn:["size","color"],readOnly:!0})],
a.prototype,"visible",null);return a=d=c([b.subclass("esri.symbols.callouts.LineCallout3D")],a)}(b.declared(m))});