// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/date ../../core/JSONSupport ../../core/accessorSupport/decorators ../../core/accessorSupport/ensureType".split(" "),function(l,m,f,c,g,h,b,k){return function(e){function a(a){a=e.call(this)||this;a.dateFormat=null;a.digitSeparator=!1;a.places=null;return a}f(a,e);d=a;a.prototype.clone=function(){return new d({dateFormat:this.dateFormat,digitSeparator:this.digitSeparator,places:this.places})};
var d;c([b.enumeration.serializable()(g.dictionary)],a.prototype,"dateFormat",void 0);c([b.property({type:Boolean,json:{write:!0}})],a.prototype,"digitSeparator",void 0);c([b.property({type:k.Integer,json:{write:!0}})],a.prototype,"places",void 0);return a=d=c([b.subclass("esri.support.FieldInfo.Format")],a)}(b.declared(h))});