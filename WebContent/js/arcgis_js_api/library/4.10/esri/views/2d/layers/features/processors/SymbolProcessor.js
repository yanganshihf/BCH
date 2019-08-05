// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/decorateHelper ../../../../../core/tsSupport/assignHelper ../../../../../arcade/Dictionary ../../../../../core/Error ../../../../../core/Logger ../../../../../core/MapPool ../../../../../core/promiseUtils ../../../../../core/accessorSupport/decorators ../../../../../geometry/SpatialReference ../../../../../layers/support/LabelClass ../../../../../renderers/support/jsonUtils ../../../engine/webgl/definitions ../../../engine/webgl/rendererInfoUtils ../../../engine/webgl/Utils ../../../engine/webgl/collisions/CollisionGrid ../../../engine/webgl/mesh/factories/matcherUtils ../../../engine/webgl/mesh/factories/MaterialStore ../../../engine/webgl/mesh/factories/WGLMeshFactory ../../../engine/webgl/mesh/templates/WGLTemplateStore ../../../engine/webgl/util/BidiText ./BaseProcessor".split(" "),
function(B,C,J,g,D,K,L,M,v,q,d,E,w,F,G,N,H,O,P,Q,R,S,T,U){function V(d){var c=d&&d.getSymbols();return d&&("unique-value"===d.type||"class-breaks"===d.type)&&null!==d.backgroundFillSymbol||c.some(function(b){return"simple-fill"===b.type||"picture-fill"===b.type})}function W(d,c){switch(d){case "esriGeometryPoint":return!0;case "esriGeometryPolyline":return!0;case "esriGeometryMultipoint":return!0;case "esriGeometryPolygon":return V(c);default:return I.error(new L("mapview-invalid-type",d+" is not supported")),
!1}}Object.defineProperty(C,"__esModule",{value:!0});var I=M.getLogger("esri.views.2d.layers.features.processors.SymbolProcessor");B=function(A){function c(){var b=null!==A&&A.apply(this,arguments)||this;b._symbolToMosaicItemMap=new Map;b._visualSetPromises=new Map;b.type="symbol";return b}J(c,A);c.prototype.destroy=function(){this._visualSetPromises.forEach(function(b,a){b.cancel()});this._visualSetPromises.clear();this._symbolToMosaicItemMap.clear();this.notifyChange("updating")};Object.defineProperty(c.prototype,
"supportsTileUpdates",{get:function(){return!0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"labelingInfo",{get:function(){return this.configuration&&this.configuration.labelingInfo?this.configuration.labelingInfo.map(function(b){return w.fromJSON(b)}):null},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"labelClassInfos",{get:function(){var b=this;return this.labelingInfo?this.labelingInfo.map(function(a){return{labelOptions:a.getOptions(b.spatialReference),
labelExpression:a.getLabelExpression(),labelClass:a}}):null},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"hydrate",{get:function(){return H.createHydrateFactory(this.service.geometryType)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"factory",{get:function(){var b=this;if(!this.configuration)return null;var a=this.service,h=a.geometryType,c=a.objectIdField,d=a.fields,f=this.configuration,a=f.devicePixelRatio,m=f.hasGeometryExpr,f=E.fromJSON(this.spatialReference),
d={hasGeometryExpr:m,geometryType:h,fields:d,spatialReference:f},m=new Q.default,k=new S.default(function(a){return b.remoteClient.invoke("tileRenderer.getMaterialItems",a)},a);this._matcher=P.createMatcher(this.renderer,m,k,d);return new R.default(h,c,this.renderer.visualVariables,d,a,f,m,k,this.labelingInfo,this.tileStore.tileScheme.tileInfo)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"queryInfo",{get:function(){var b=this.configuration,a=b.renderer,h=b.definitionExpression,
c=b.outFields,d=b.gdbVersion,b=b.historicMoment,f=this.service.geometryType,m=this._getReturnCentroid(this.rendererInfo.renderer),k=W(f,this.rendererInfo.renderer),f="esriGeometryPoint"===f||"esriGeometryMultipoint"===f||m?20:0,e=null;(a=a.visualVariables)&&a.some(function(a){if("size"===a.type&&a.field&&!a.normalizationField)return e=[a.field+" DESC"],!0});return{definitionExpression:h,orderByFields:e,outFields:c,pixelBuffer:f,returnCentroid:m,returnGeometry:k,gdbVersion:d,historicMoment:b}},enumerable:!0,
configurable:!0});Object.defineProperty(c.prototype,"renderer",{get:function(){return this.configuration?F.fromJSON(this.configuration.renderer):null},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"rendererInfo",{get:function(){return this.configuration?N.createRendererInfo(F.fromJSON(this.configuration.renderer),this.tileStore.tileScheme.spatialReference,{fields:this.service.fields}):null},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"updating",{get:function(){return 0<
this._visualSetPromises.size},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"fields",{get:function(){return this.service.fields},enumerable:!0,configurable:!0});c.prototype.onTileData=function(b,a){var c=this,d=a.addOrUpdate,g=a.remove,f=a.clear;a=(d&&d.length?this._processFeatures(b,d,a.transformParams):q.resolve()).then(function(a){return c.remoteClient.invoke("tileRenderer.onTileData",{tileKey:b.id,data:{addOrUpdate:a&&a.message||null,remove:g,clear:f}},{transferList:a&&a.transferList||
null})}).catch(function(a){return c._handleError(b,a)});this._visualSetPromises.set(b,a);a.then(function(){return c._cleanPromise(b)},function(){return c._cleanPromise(b)});this.notifyChange("updating");return a};c.prototype.onTileError=function(b,a){var c=this;a=this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:b.id,error:a});this._visualSetPromises.set(b,a);a.then(function(){return c._cleanPromise(b)},function(){return c._cleanPromise(b)});this.notifyChange("updating");return a};c.prototype.onTileUpdate=
function(b){var a=0;for(b=b.removed;a<b.length;a++){var c=b[a],d=this._visualSetPromises;if(!d.has(c))break;d.get(c).cancel();d.delete(c);this.notifyChange("updating")}};c.prototype._cleanPromise=function(b){this._visualSetPromises.delete(b);this.notifyChange("updating")};c.prototype._processFeatures=function(b,a,c){var d=this;if(!a||!a.length)return q.resolve(null);var h=this.factory;return h.analyze(a,this._matcher,c,{viewingMode:"",scale:b.scale}).then(function(a){return d._getLabelMosaicItems(b,
a,c).then(function(f){return d._writeFeatures(b,a,c,f,h)})})};c.prototype._writeFeatures=function(b,a,c,d,g){for(var h=g.createMeshData(a.length),m={viewingMode:"",scale:b.scale},k=this._symbolToMosaicItemMap,e=0;e<a.length;e++)g.write(h,a[e],c,m,b.level,d,k);return this._encodeDisplayData(h)};c.prototype._encodeDisplayData=function(b){var a={},c=[];b.encode(a,c);return{message:a,transferList:c}};c.prototype._handleError=function(b,a){if(a&&"cancel"!==a.dojoType)return this.remoteClient.invoke("tileRenderer.onTileError",
{tileKey:b.id,error:a.message})};c.prototype._getReturnCentroid=function(b){function a(a){if(!a)return!1;a=a.type;return"simple-marker"===a||"picture-marker"===a||"text"===a}if("esriGeometryPolygon"===this.service.geometryType&&this.labelingInfo)return!0;if("esriGeometryPolygon"!==this.service.geometryType)return!1;switch(b.type){case "simple":return a(b.symbol);case "unique-value":return a(b.defaultSymbol)||b.uniqueValueInfos.some(function(b){return a(b.symbol)});case "class-breaks":return a(b.defaultSymbol)||
b.classBreakInfos.some(function(b){return a(b.symbol)});default:return!0}};c.prototype._getLabelMosaicItems=function(b,a,c){var d=v.acquire(),h=this._createLabelFeatures(b.scale,a,d,c),f=this._symbolToMosaicItemMap,g=v.acquire(),k=[],e=0;d.forEach(function(a,b){if(f.has(b.id)){var c=f.get(b.id).glyphMosaicItems,d=[];a.forEach(function(a){if(c&&c.length<a||!c[a])d[a]=a});0<d.length&&(g.set(e,b),k.push({symbol:b.toJSON(),id:e,glyphIds:d}),e++)}else{g.set(e,b);var h=[];a.forEach(function(a){return h.push(a)});
k.push({symbol:b.toJSON(),id:e,glyphIds:h});e++}});if(0<k.length)return this.remoteClient.invoke("tileRenderer.getMaterialItems",k).then(function(a){for(var b=0;b<a.length;b++){var c=a[b],d=g.get(c.id);if(d)if(H.isTextSymbol(d))if(f.has(d.id)){if(d=f.get(d.id).glyphMosaicItems,c=c.mosaicItem.glyphMosaicItems)for(var e=0;e<c.length;e++)null!=c[e]&&(d[e]=c[e])}else f.set(d.id,c.mosaicItem);else f.set(d.id,c.mosaicItem)}v.release(g);return h});v.release(d);return q.resolve(h)};c.prototype._getLabelClassInfos=
function(b){return this.labelClassInfos.map(function(a,b){return{id:b,labelClassInfo:a}}).filter(function(a){a=a.labelClassInfo;return(!a.labelClass.minScale||a.labelClass.minScale>=b||0===a.labelClass.minScale)&&(!a.labelClass.maxScale||a.labelClass.maxScale<=b||0===a.labelClass.maxScale)})};c.prototype._createLabelFeatures=function(b,a,c,d){if(!this.labelingInfo||!a||0===a.length)return null;var g=new K({viewingMode:"",scale:b});b=this._getLabelClassInfos(b);if(0===b.length)return null;for(var f=
v.acquire(),h=new O.default(G.COLLISION_EARLY_REJECT_BUCKET_SIZE),k=0;k<a.length;k++){var e=a[k],n=this.service.geometryType,t=0,r=0;if("esriGeometryPoint"===n||"esriGeometryPolygon"===n)if("esriGeometryPoint"===n?(n=e.geometry,t=n.x,r=n.y):(t=e.centroid.x,r=e.centroid.y),h.checkOverlap(t,r))continue;t=e.attributes[this.service.objectIdField];n=[];for(r=0;r<b.length;r++){var z=b[r],x=z.labelClassInfo,z=z.id,l=e;if(this.configuration.hasGeometryExpr){if(!d){I.error("mapview-labeling","Tried to evaluate geometry expression but no transformation found");
return}var l=this.hydrate(e.geometry,d.transform,d.hasZ,d.hasM),u=D({},e,{geometry:l});l.spatialReference=E.fromJSON(this.spatialReference);l=u}u=T.bidiText(this._evaluateLabelExpression(l,x,g));l=u[0];u=u[1];if(G.DEBUG_LABELS)var p="-"+t,l=l.substring(0,l.length-p.length)+p;if(l&&l.length){var p=x.labelClass.symbol,x=l,y=c;y.has(p)||y.set(p,new Set);for(var p=y.get(p),y=x.length,q=0;q<y;q++){var w=x.charCodeAt(q);p.add(w)}n.push({text:l,rtl:u,id:z})}}f.set(t,n)}return f};c.prototype._evaluateLabelExpression=
function(b,a,c){if(!a.labelClass.symbol||!w.evaluateWhere(a.labelClass.where,b.attributes)||!a.labelExpression.expression)return"";c=D({view:c},a.labelOptions);return w.buildLabelText(a.labelExpression.expression,b,this.fields,c)};g([d.property({readOnly:!0})],c.prototype,"supportsTileUpdates",null);g([d.property()],c.prototype,"configuration",void 0);g([d.property({dependsOn:["configuration"]})],c.prototype,"labelingInfo",null);g([d.property({dependsOn:["labelingInfo"]})],c.prototype,"labelClassInfos",
null);g([d.property({dependsOn:["service"]})],c.prototype,"hydrate",null);g([d.property({dependsOn:["configuration","service","fields","tileStore"]})],c.prototype,"factory",null);g([d.property({constructOnly:!0})],c.prototype,"queryInfo",null);g([d.property({dependsOn:["configuration"]})],c.prototype,"renderer",null);g([d.property({dependsOn:["configuration"]})],c.prototype,"rendererInfo",null);g([d.property({readOnly:!0})],c.prototype,"updating",null);g([d.property({dependsOn:["service"]})],c.prototype,
"fields",null);return c=g([d.subclass()],c)}(d.declared(U.default));C.default=B});