// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/JSONSupport ../../core/kebabDictionary ../../core/accessorSupport/decorators".split(" "),function(k,l,f,c,g,h,b){var d=h({GPString:"string",GPDouble:"double",GPLong:"long",GPBoolean:"boolean",GPDate:"date",GPLinearUnit:"linear-unit",GPDataFile:"data-file",GPRasterData:"raster-data",GPRecordSet:"record-set",GPRasterDataLayer:"raster-data-layer",GPFeatureRecordSetLayer:"feature-record-set-layer",
GPMultiValue:"multi-value"});return function(e){function a(a){a=e.call(this)||this;a.dataType=null;a.value=null;return a}f(a,e);c([b.property({json:{read:d.read,write:d.write}})],a.prototype,"dataType",void 0);c([b.property()],a.prototype,"value",void 0);return a=c([b.subclass("esri.tasks.support.ParameterValue")],a)}(b.declared(g))});