// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/assignHelper ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/lang ../core/accessorSupport/decorators ./PointCloudRenderer ./support/LegendOptions ./support/pointCloud/ColorUniqueValueInfo".split(" "),function(n,p,h,k,c,e,b,d,l,m){return function(g){function a(a){a=g.call(this)||this;a.type="point-cloud-unique-value";a.field=null;a.fieldTransformType=null;a.colorUniqueValueInfos=null;a.legendOptions=null;return a}k(a,g);f=a;
a.prototype.clone=function(){return new f(h({},this.cloneProperties(),{field:e.clone(this.field),fieldTransformType:e.clone(this.fieldTransformType),colorUniqueValueInfos:e.clone(this.colorUniqueValueInfos),legendOptions:e.clone(this.legendOptions)}))};var f;c([b.enumeration.serializable()({pointCloudUniqueValueRenderer:"point-cloud-unique-value"})],a.prototype,"type",void 0);c([b.property({json:{write:!0},type:String})],a.prototype,"field",void 0);c([b.property({type:d.fieldTransformTypeKebabDict.apiValues,
json:{type:d.fieldTransformTypeKebabDict.jsonValues,read:d.fieldTransformTypeKebabDict.read,write:d.fieldTransformTypeKebabDict.write}})],a.prototype,"fieldTransformType",void 0);c([b.property({type:[m.default],json:{write:!0}})],a.prototype,"colorUniqueValueInfos",void 0);c([b.property({type:l.default,json:{write:!0}})],a.prototype,"legendOptions",void 0);return a=f=c([b.subclass("esri.renderers.PointCloudUniqueValueRenderer")],a)}(b.declared(d))});