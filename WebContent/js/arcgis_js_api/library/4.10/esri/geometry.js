// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ./core/kebabDictionary ./geometry/Extent ./geometry/Geometry ./geometry/Mesh ./geometry/Multipoint ./geometry/Point ./geometry/Polygon ./geometry/Polyline ./geometry/ScreenPoint ./geometry/SpatialReference ./geometry/support/jsonUtils".split(" "),function(p,a,b,c,d,e,f,g,h,k,l,m,n){Object.defineProperty(a,"__esModule",{value:!0});a.Extent=c;a.BaseGeometry=d;a.Mesh=e;a.Multipoint=f;a.Point=g;a.Polygon=h;a.Polyline=k;a.ScreenPoint=l;a.SpatialReference=m;a.isGeometry=function(b){return b instanceof
a.BaseGeometry};a.fromJSON=n.fromJSON;a.typeKebabDictionary=b.strict()({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon",esriGeometryEnvelope:"extent",mesh:"mesh"});a.featureGeometryTypeKebabDictionary=b.strict()({esriGeometryPoint:"point",esriGeometryMultipoint:"multipoint",esriGeometryPolyline:"polyline",esriGeometryPolygon:"polygon"})});