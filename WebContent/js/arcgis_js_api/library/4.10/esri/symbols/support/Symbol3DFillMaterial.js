// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ./Symbol3DMaterial".split(" "),function(a,b,f,e,d,g){Object.defineProperty(b,"__esModule",{value:!0});a=function(a){function c(){return null!==a&&a.apply(this,arguments)||this}f(c,a);b=c;c.prototype.clone=function(){return new b({color:this.color?this.color.clone():null,colorMixMode:this.colorMixMode})};var b;e([d.enumeration.serializable()({multiply:"multiply",
replace:"replace",tint:"tint"})],c.prototype,"colorMixMode",void 0);return c=b=e([d.subclass("esri.symbols.support.Symbol3DFillMaterial")],c)}(d.declared(g.default));b.Symbol3DFillMaterial=a;b.default=a});