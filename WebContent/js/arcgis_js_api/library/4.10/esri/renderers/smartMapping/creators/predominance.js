// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/assignHelper dojo/i18n!../../nls/smartMapping ../../../core/numberUtils ../../../core/promiseUtils ./size ./type ./support/utils ../statistics/summaryStatistics ../support/utils ../support/adapters/support/predominanceUtils ../symbology/predominance ../../support/AuthoringInfo ../../support/AuthoringInfoVisualVariable ../../visualVariables/OpacityVariable".split(" "),function(J,n,v,l,w,d,x,y,g,z,t,A,u,B,C,D){function E(a){if(!(a&&a.layer&&a.view&&a.fields&&
a.fields.length))return d.reject(g.createError("predominance-renderer:missing-parameters","'layer', 'view' and 'fields' parameters are required"));if(2>a.fields.length)return d.reject(g.createError("predominance-renderer:invalid-parameters","Minimum 2 fields are required"));if(10<a.fields.length)return d.reject(g.createError("predominance-renderer:invalid-parameters","Maximum 10 fields are supported"));var b=v({},a);b.symbolType=b.symbolType||"2d";b.defaultSymbolEnabled=null==b.defaultSymbolEnabled?
!0:b.defaultSymbolEnabled;b.includeOpacityVariable=a.includeOpacityVariable||!1;b.includeSizeVariable=a.includeSizeVariable||!1;b.sortBy=null==b.sortBy?"count":b.sortBy;a=[0,1,2];var c=t.createLayerAdapter(b.layer,a);return(b.layer=c)?c.load().then(function(){var a=c.geometryType,e=-1<b.symbolType.indexOf("3d");if("mesh"===a)b.symbolType="3d-volumetric",b.colorMixMode=b.colorMixMode||"replace",b.edgesType=b.edgesType||"none";else{if(e&&("polyline"===a||"polygon"===a))return d.reject(g.createError("predominance-renderer:not-supported",
"3d symbols are not supported for polyline and polygon layers"));if(-1<b.symbolType.indexOf("3d-volumetric")&&(!b.view||"3d"!==b.view.type))return d.reject(g.createError("predominance-renderer:invalid-parameters","'view' parameter should be an instance of SceneView when 'symbolType' parameter is '3d-volumetric' or '3d-volumetric-uniform'"))}a=b.fields.map(function(a){return a.name});return(a=g.verifyBasicFieldValidity(c,a,"predominance-renderer:invalid-parameters"))?d.reject(a):b}):d.reject(g.createError("predominance-renderer:invalid-parameters",
"'layer' must be one of these types: "+t.getLayerTypeLabels(a).join(", ")))}function F(a){var b=a.predominanceScheme,c=a.basemap;b?b=u.cloneScheme(b):(b=(a=u.getSchemes({basemap:a.basemap,geometryType:a.geometryType,numColors:a.numColors,theme:a.theme,worldScale:a.worldScale,view:a.view}))&&a.primaryScheme,c=a&&a.basemapId);return{scheme:b,basemapId:c}}function G(a,b,c,d){var e=a.layer;return e.getPredominantCategories(d,a.view).then(function(f){var k=f;f&&f.predominantCategoryInfos||(k={predominantCategoryInfos:d.map(function(a){return{value:a,
count:0}})});return y.createRenderer({layer:e,basemap:a.basemap,valueExpression:b.valueExpression,valueExpressionTitle:l.predominantCategory,numTypes:-1,defaultSymbolEnabled:a.defaultSymbolEnabled,sortBy:a.sortBy,typeScheme:c,statistics:{uniqueValueInfos:k.predominantCategoryInfos},legendOptions:a.legendOptions,symbolType:a.symbolType,colorMixMode:a.colorMixMode,edgesType:a.edgesType,view:a.view}).then(function(b){for(var f=b.renderer,d=f.uniqueValueInfos,k={},h=0,m=a.fields;h<m.length;h++){var q=
m[h],l=e.getField(q.name);k[l.name]=q.label||l&&l.alias||q.name}for(h=0;h<d.length;h++)m=d[h],m.label=k[m.value];if(a.includeSizeVariable){var p=e.geometryType,r=null;"polygon"===p?(k=c.sizeScheme,h=k.background,f.backgroundFillSymbol=g.createSymbol(h,h.color,e.geometryType,a.symbolType),r=k.marker.size,p="point"):r="polyline"===p?c.width:c.size;var n=g.createColors(c.colors,d.length);d.forEach(function(b,f){b.symbol=g.createSymbol(c,n[f],p,a.symbolType,a.colorMixMode,a.edgesType,r)})}return{renderer:f,
predominantCategoryInfos:d,excludedCategoryInfos:b.excludedUniqueValueInfos,predominanceScheme:c,basemapId:b.basemapId}})})}function H(a,b,c){return x.createVisualVariables({layer:a.layer,basemap:a.basemap,valueExpression:b.valueExpression,sqlExpression:b.statisticsQuery.sqlExpression,sqlWhere:b.statisticsQuery.sqlWhere,sizeScheme:c,worldScale:-1<a.symbolType.indexOf("3d-volumetric"),legendOptions:{title:l.sumOfCategories},view:a.view})}function I(a,b){return z({layer:a.layer,valueExpression:b.valueExpression,
sqlExpression:b.statisticsQuery.sqlExpression,sqlWhere:b.statisticsQuery.sqlWhere,view:a.view}).then(function(c){var d=null==c.avg||null==c.stddev,e=1/a.fields.length*100,f=d?100:c.avg+1.285*c.stddev;100<f&&(f=100);e=w.round([e,f],{strictBounds:!0});e=new D({valueExpression:b.valueExpression,stops:[{value:e[0],opacity:.15},{value:e[1],opacity:1}],legendOptions:{title:l.strengthOfPredominance}});f=new C({type:"opacity",minSliderValue:c.min,maxSliderValue:c.max});f=new B({visualVariables:[f]});return{visualVariable:e,
statistics:c,defaultValuesUsed:d,authoringInfo:f}})}Object.defineProperty(n,"__esModule",{value:!0});n.createRenderer=function(a){return E(a).then(function(a){var b=a.layer,g=F({basemap:a.basemap,geometryType:b.geometryType,numColors:a.fields.length,predominanceScheme:a.predominanceScheme,worldScale:-1<a.symbolType.indexOf("3d-volumetric"),view:a.view}).scheme,e=a.fields.map(function(a){return a.name}),b=A.getPredominanceExpressions(b,e),e=G(a,b.predominantCategory,g,e),g=a.includeSizeVariable?H(a,
b.size,g.sizeScheme):d.resolve();a=a.includeOpacityVariable?I(a,b.opacity):d.resolve();return d.all([e,g,a]).then(function(a){var b=a[0],c=a[1],d=a[2];a=[];c&&(Array.prototype.push.apply(a,c.visualVariables.map(function(a){return a.clone()})),delete c.sizeScheme,b.size=c);d&&(a.push(d.visualVariable),b.opacity=d);a.length&&(c=b.renderer.visualVariables||[],Array.prototype.push.apply(c,a),b.renderer.visualVariables=c);return b})})}});