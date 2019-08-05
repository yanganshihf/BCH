// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/assignHelper ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper dojo/errors/CancelError ../../../Color ../../../Graphic ../../../core/arrayUtils ../../../core/asyncUtils ../../../core/Collection ../../../core/compilerUtils ../../../core/Evented ../../../core/HandleOwner ../../../core/has ../../../core/iteratorUtils ../../../core/lang ../../../core/Logger ../../../core/Promise ../../../core/promiseUtils ../../../core/requireUtils ../../../core/scheduling ../../../core/watchUtils ../../../core/workers ../../../core/accessorSupport/decorators ../../../core/libs/gl-matrix-2/gl-matrix ../../../geometry/support/aaBoundingBox ../../../geometry/support/scaleUtils ../../../layers/graphics/controllers/I3SOnDemandController ../../../symbols/Symbol3D ../../../symbols/support/unitConversionUtils ./SceneLayerWorker ./graphics/graphicUtils ./i3s/Highlights ./i3s/I3SElevationProvider ./i3s/I3SProjectionUtil ./i3s/I3SUtil ./i3s/IDBCache ./support/attributeUtils ./support/edgeUtils ./support/layerViewUpdatingProperties ./support/symbolColorUtils ../support/mathUtils ../support/orientedBoundingBox ../support/projectionUtils ../support/buffer/glUtil ../support/buffer/typedArrayUtil ../webgl-engine/Stage ../webgl-engine/lib/Geometry ../webgl-engine/lib/Layer ../webgl-engine/lib/Object3D ../webgl-engine/lib/PreinterleavedGeometryData ../webgl-engine/lib/Texture ../webgl-engine/lib/Util ../webgl-engine/lib/TextureBackedBuffer/BufferManager ../webgl-engine/materials/DefaultMaterial module".split(" "),
function(ea,R,S,fa,l,ga,ha,D,E,ia,ja,ka,la,ma,T,na,U,oa,pa,z,qa,ra,t,sa,h,G,B,ta,ua,va,wa,xa,V,ya,za,Aa,r,W,H,Ba,Ca,K,L,Da,M,Ea,X,Fa,Ga,Ha,Ia,N,O,x,Ja,Y,Ka){function La(y,c,h,a,b){var e=!1,d;c.encoding===r.DDS_ENCODING_STRING?d=O.DDS_ENCODING:e=!(L.isPowerOfTwo(y.width)&&L.isPowerOfTwo(y.height));h=((y=c.usedByEngineMats.some(function(a){return a.getParams().atlasRegions})||c.atlas)?a:h)&&!e;return{mipmap:h,wrap:y||!c.wrap?{s:33071,t:33071}:{s:10497,t:10497},disableAnisotropy:y&&h&&b,encoding:d,noUnpackFlip:!0}}
function Z(h){return X.isArrayBuffer(h.data)}function aa(h,c){for(var m=1024,a=0;a<h.length;a++)var b=h[a],m=m+(b.interleavedVertexData.byteLength+(b.indices?b.indices.byteLength:0)),m=m+(b.positionData.data.byteLength+b.positionData.indices.byteLength);for(h=0;h<c.length;h++)a=c[h],X.isArrayBuffer(a.data)&&(m+=a.data.byteLength);return m}function ba(h,c){return 104857600<c.byteSize?(n.warn("Node is too big to store in IndexedDB cache: "+h.baseUrl+" ("+c.byteSize+" bytes)"),!1):!0}var m=Fa.ModelContentType,
n=oa.getLogger("esri.views.3d.layers.SceneLayerView3D"),ca=[1,1,1,1],Ma=[.8,.8,.8],Na=[.5,.5,.5],Oa=function(){return function(){}}();R=function(y){function c(){var a=null!==y&&y.apply(this,arguments)||this;a._layerUid="";a._highlights=new ya(a);a._elevationProvider=null;a._worker=new xa;a._workerThread=null;a._texId2Meta=new Map;a._nodeId2Meta=new Map;a._addTasks=new Map;a._rendererVersion=0;a._rendererFields=null;a._colorVariable=null;a._opacityVariable=null;a._symbolInfos=new Map;a._idbCache=new W.IDBCache("esri-scenelayer-cache",
"geometries",10);a._cancelCount=0;a._hasColors=!1;a._hasTextures=!1;a._hasData=!1;a.slicePlaneEnabled=!1;a.alwaysLoadEverythingModeEnabled=!1;a._cacheKeySuffix=null;a._definitionExpressionErrors=0;a._maxDefinitionExpressionErrors=20;a._tmpAttributeOnlyGraphic=new D(null,null,{});return a}fa(c,y);C=c;Object.defineProperty(c.prototype,"hasTexturesOrVertexColors",{get:function(){return this._hasData?this._hasTextures||this._hasColors?"yes":"probably-not":"unknown"},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,
"rendererNeedsTextures",{get:function(){return r.rendererNeedsTextures(this.layer.renderer)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"elevationOffset",{get:function(){var a=null!=this.layer?this.layer.elevationInfo:null;if(null!=a&&"absolute-height"===a.mode){var b=ta.getMetersPerVerticalUnitForSR(this.layer.spatialReference),e=wa.getMetersPerUnit(a.unit);return(a.offset||0)*e/b}return 0},enumerable:!0,configurable:!0});c.prototype._enableSecretAlwayLoadMode=function(){this.layer.store.lodModel&&
"always-load"===this.layer.store.lodModel&&(this.alwaysLoadEverythingModeEnabled=!0)};Object.defineProperty(c.prototype,"uncompressedTextureDownsamplingEnabled",{get:function(){return this.view.qualitySettings.sceneService.uncompressedTextureDownsamplingEnabled&&!this.useCompressedTextures},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"useCompressedTextures",{get:function(){var a=this.layer.version,a=!T("trident")||1<a.major||1===a.major&&3<a.minor;return this.view._stage.has("s3tc")&&
a},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"_enableMipMaps",{get:function(){return!this.uncompressedTextureDownsamplingEnabled},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"_enableAtlasMipMaps",{get:function(){return this._enableMipMaps},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"_atlasBiasCompensationEnabled",{get:function(){return this.view&&this.view._stage&&!this.view._stage.has("shaderTextureLOD")&&this._enableAtlasMipMaps},
enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"_disableAtlasAnisotropy",{get:function(){return this._atlasBiasCompensationEnabled},enumerable:!0,configurable:!0});c.prototype.initialize=function(){var a=this;sa.open(qa.getAbsMid("./SceneLayerWorker",ea,Ka)).then(function(b){a.destroyed?b.close():a._workerThread=b});r.checkSceneLayerValid(this.layer);r.checkSceneLayerCompatibleWithView(this.layer,this.view);this._layerUid=this.layer.uid;this._controller=new ua({layerView:this});
this.geoMemoryEstimate=this.texMemoryEstimate=this.gpuMemoryEstimate=0;this._stage=this.view._stage;if(this._isIntegratedMesh||!this.layer.store.defaultGeometrySchema)this._hasSymbolColors=!1;else{var b=this.layer.store.defaultGeometrySchema.featureAttributes;this._hasSymbolColors=!!(b&&b.faceRange&&b.id)}this._hasVertexColors=null!=this.layer.store.defaultGeometrySchema.vertexAttributes.color&&(null==this.layer.cachedDrawingInfo||!this.layer.cachedDrawingInfo.color);this._isIntegratedMesh||(this._edgeView=
this._stage.view.getEdgeView());this._memCache=this.view.resourceController.getMemCache(this.layer.uid,function(b){return a._deleteNodeStageData(b)});this._addThisLayerToStage();this._elevationProvider=new za({layerView:this,stageLayer:this._stageLayer});this.handles.add([t.init(this.view,"clippingArea",function(){return a._clippingAreaChanged()}),t.init(this.layer,"renderer",function(b){return a._rendererChange(b)}),t.init(this.layer,"objectIdFilter",function(){return a._filterChange()}),t.init(this,
"_controller.parsedDefinitionExpression",function(){return a._filterChange()}),t.watch(this,"fullOpacity",function(b){return a._opacityChange(b)}),t.watch(this,"slicePlaneEnabled",function(b){return a._slicePlaneEnabledChange(b)}),t.watch(this,"elevationOffset",function(b,d){return a._reloadAll(d)}),t.watch(this,["rendererNeedsTextures","uncompressedTextureDownsamplingEnabled"],function(){a._reloadAll();a._memCache.clear()}),t.init(this,"suspended",function(b){return a._suspendedChange(b)})],"sceneLayerHandles");
T("disable-feature:single-idb-cache")&&(this._idbCache=new W.IDBCache("esri-scenelayer-cache-v10","geometries",10));this._idbCache.init().catch(function(a){n.warn("Failed to initialize IndexedDB cache: "+a)});this._cacheKeySuffix=r.getCacheKeySuffix(this.layer.spatialReference,this.view.renderSpatialReference);this._componentColorManager=this._hasSymbolColors?new Ja.BufferManager(this._stage.view.renderingContext):null;this._enableSecretAlwayLoadMode()};c.prototype.destroy=function(){this.handles.remove("sceneLayerHandles");
this._workerThread&&(this._workerThread.close(),this._workerThread=null);this._removeAllNodeDataFromStage();this._memCache.destroy();this._memCache=null;this._removeThisLayerFromStage();this._stage=null;this._idbCache&&(this._idbCache.destroy(),this._idbCache=null);null!=this._controller&&(this._controller.destroy(),this._controller=null);this._highlights.destroy();this._nodeId2Meta=this._texId2Meta=null;this.emit("visible-geometry-changed");this._visibleGeometryChangedSchedulerHandle&&(this._visibleGeometryChangedSchedulerHandle.remove(),
this._visibleGeometryChangedSchedulerHandle=null)};c.prototype.memEstimateTextureAdded=function(a){a=a.getEstimatedTexMemRequired();this.gpuMemoryEstimate+=a;this.texMemoryEstimate+=a;return a};c.prototype.memEstimateTextureRemoved=function(a){a=a.getEstimatedTexMemRequired();this.gpuMemoryEstimate-=a;this.texMemoryEstimate-=a};c.prototype.memEstimateGeometryAdded=function(a){a=a.estimateGpuMemoryUsage();this.gpuMemoryEstimate+=a;this.geoMemoryEstimate+=a;return a};c.prototype.memEstimateGeometryRemoved=
function(a){a=a.estimateGpuMemoryUsage();this.gpuMemoryEstimate-=a;this.geoMemoryEstimate-=a};c.prototype.isNodeLoaded=function(a){return this._nodeId2Meta.has(a.id)};c.prototype.getUsedMemory=function(){var a=0;this._nodeId2Meta.forEach(function(b){return a+=b.node.memory});return a};c.prototype.getUnloadedMemory=function(){return this._controller?this._controller.unloadedMemoryEstimate:0};c.prototype.ignoresMemoryFactor=function(){return!1};c.prototype._suspendedChange=function(a){a?(this._removeAllNodeDataFromStage(),
this.view.elevationProvider.unregister(this._elevationProvider)):this.view.elevationProvider.register(this._elevationContext,this._elevationProvider)};c.prototype.getStats=function(){var a={index:0,nodes:this._nodeId2Meta.size.toString(),textures:this._texId2Meta.size,"Total GPU Memory Estimate":(this.gpuMemoryEstimate/1048576).toFixed(1)+"MB","Geometry Memory Estimate":(this.geoMemoryEstimate/1048576).toFixed(1)+"MB","Texture Memory Estimate":(this.texMemoryEstimate/1048576).toFixed(1)+"MB"};this._controller&&
(this._cachingEnabled()&&(a.IDBCache=Math.round(100*this._idbCache.getHitRate())+"% hit"),this._controller.updateStats(a));return a};c.prototype._addThisLayerToStage=function(){for(var a=this._stage,b=new Uint8Array(256),e=0;e<b.length;e++)b[e]=255;this._whiteTexture=new O(b,"white",{width:8,height:8});a.add(m.TEXTURE,this._whiteTexture);b=this.layer.id+"";this._stageLayer=b=new Ha(b,{},b);a.add(m.LAYER,b);this._stage.addToViewContent([b.id])};c.prototype._removeThisLayerFromStage=function(){if(null!=
this._stageLayer){var a=this._stage;a.remove(m.TEXTURE,this._whiteTexture.id);this._removeAllNodeDataFromStage();x.assert(0===this._nodeId2Meta.size);x.assert(0===this._texId2Meta.size);a.remove(m.LAYER,this._stageLayer.id);this._stageLayer=void 0;this.gpuMemoryEstimate=0}};c.prototype.getLoadedAttributes=function(a){if((a=this._nodeId2Meta.get(a.id))&&a.attributeInfo)return a.attributeInfo.loadedAttributes};c.prototype.getAttributeData=function(a){if((a=this._nodeId2Meta.get(a.id))&&a.attributeInfo)return a.attributeInfo.attributeData};
c.prototype.setAttributeData=function(a,b){var e=this._nodeId2Meta.get(a.id);e&&(e.attributeInfo=b,e.cachedRendererVersion=this._getInvalidRendererVersion(),this._updateEngineObject(a,e))};c.prototype.getLoadedNodeIDs=function(){return E.keysOfMap(this._nodeId2Meta)};c.prototype._calcEngineMaterialTransparencyParams=function(a,b,e){var d=this.fullOpacity,g=1-L.clamp(x.fallbackIfUndefined(b.transparency,0),0,1);a=1>g||1>d||a&&U.endsWith(a.channels,"a")||!0===b.useVertexColorAlpha||e;return{opacity:g,
layerOpacity:d,transparent:a}};c.prototype._calcEngineMaterialDoubleSidedParams=function(a){return null!=a.doubleSided?a.doubleSided:!0};c.prototype._calcEngineMaterialCullFaceParams=function(a){return a.cullFace?a.cullFace:null!=a.doubleSided?a.doubleSided?"none":"back":"none"};c.prototype._getMaterialParameters=function(a,b,e,d){var g;null!=a&&(g=(g=this._texId2Meta.get(b))&&g.engineTex?g.engineTex.id:this._whiteTexture.id);b=e.params;var c=x.fallbackIfUndefined(b.diffuse,Ma);"standard"!==e.type&&
n.warn("Unknown material type '"+e.type+"', must be 'standard'");e=this._isIntegratedMesh;d={ambient:c,diffuse:c,specular:x.fallbackIfUndefined(b.specular,Na),atlasRegions:b.vertexRegions,textureId:g,vertexColors:this._hasVertexColors,componentIndices:this._hasSymbolColors,componentColorBuffer:this._hasSymbolColors&&d?d.textureBuffer:null,flipV:!1,doubleSided:this._calcEngineMaterialDoubleSidedParams(b),cullFace:this._calcEngineMaterialCullFaceParams(b),writeStencil:e,receiveSSAO:!e,groundNormalShading:e,
compressedNormals:!e};e||(a=this._calcEngineMaterialTransparencyParams(a,b),U.mixin(d,a));return d};c.prototype._createEngineMaterial=function(a,b,e,d,g,c,p){var f=null==b?null:this._getI3STexEncoding(b);p=this._getMaterialParameters(b,e,d,p);p=new Y(p,g);p.metadata={i3sMatId:g,i3sTexId:e,i3sTex:b,i3sMatParams:d.params};if(null!=b){(d=this._texId2Meta.get(e))?d.usedByEngineMats.push(p):(d={id:e,usedByEngineMats:[p],images:b.images,encoding:f,atlas:!0===b.atlas,wrap:"none"!==b.wrap[0]||"none"!==b.wrap[1]},
this._texId2Meta.set(e,d));a:{for(b=0;b<c.length;b++)if(f=c[b],f.i3sTexId===e){e=f.data;break a}e=null}null!=e&&null==d.engineTex&&(c=La(e,d,this._enableMipMaps,this._enableAtlasMipMaps,this._disableAtlasAnisotropy),d.engineTex=new O(e,d.id,c),this._stage.add(m.TEXTURE,d.engineTex),a.memory+=this.memEstimateTextureAdded(d.engineTex));if(null!=d.engineTex)for(a=d.engineTex.id,e=0,c=d.usedByEngineMats;e<c.length;e++)c[e].setParameterValues({textureId:a})}return p};c.prototype._getI3STexEncoding=function(a){var b=
r.getAppropriateTextureEncoding(a.encoding,this.useCompressedTextures);return-1<b?a.encoding[b]:a.encoding};c.prototype._getVertexBufferLayout=function(a,b){var e=a.params.materialID,d=b.materialDefinitions[e];x.assert(void 0!==d,"geometry wants unknown material "+e);a=a.params.textureID||"none";var c;"none"!==a&&(null!=b.textureDefinitions&&null!=b.textureDefinitions[a]||n.warn("textureDefinitions missing in shared resource"),c=b.textureDefinitions[a]);b=this._getMaterialParameters(c,a,d);return Ea.glLayout(Y.getVertexBufferLayout(b))};
c.prototype._createEngineMat=function(a,b,e,d,c){var g=b.params.materialID,p=e.materialDefinitions[g];x.assert(void 0!==p,"geometry wants unknown material "+g);b=b.params.textureID||"none";var w;"none"!==b&&(null!=e.textureDefinitions&&null!=e.textureDefinitions[b]||n.warn("textureDefinitions missing in shared resource"),w=e.textureDefinitions[b]);return this._createEngineMaterial(a,w,b,p,g,d,c)};c.prototype._getObjectIdField=function(){return this.layer.objectIdField||"OBJECTID"};c.prototype._findGraphicNodeAndIndex=
function(a){var b=H.attributeLookup(a.attributes,this._getObjectIdField()),e=null;na.everyMap(this._nodeId2Meta,function(a,c){c=a.featureIds.indexOf(b);if(-1===c)return!0;e={node:a.node,index:c};return!1});return e};c.prototype._getGraphicIndices=function(a,b){a=this._nodeId2Meta.get(a.id);if(!a)return[];for(var e=[],d=this._getObjectIdField(),c=0;c<b.length;c++){var f=H.attributeLookup(b[c].attributes,d),f=a.featureIds.indexOf(f);-1!==f&&e.push(f)}return e};c.prototype.whenGraphicBounds=function(a){a=
this._findGraphicNodeAndIndex(a);if(!a)return z.reject();var b=this._nodeId2Meta.get(a.node.id).engineObject;a=this._boundingBoxCornerPoints(a.index,b,new Float64Array(24));if(M.bufferToBuffer(a,this.view.renderSpatialReference,0,a,this.view.spatialReference,0,8))return b=B.empty(),B.expandWithBuffer(b,a,0,8),z.resolve({boundingBox:b,screenSpaceObjects:[]})};c.prototype.whenGraphicAttributes=function(a,b){var e=this;return r.whenGraphicAttributes(this.layer,a,this._getObjectIdField(),b,function(a){for(var b=
new Map,d=[],c=0;c<a.length;c++){var w=a[c],h=e._findGraphicNodeAndIndex(w),k=b.get(h.node);k||(k={node:h.node,indices:[],graphics:[]},d.push(k));k.indices.push(h.index);k.graphics.push(w)}return d},{ignoreUnavailableFields:!0,populateObjectId:!0})};c.prototype.getGraphicFromStageObject=function(a,b){if(this._isIntegratedMesh)return z.reject();var e=this._getMetadata(a);a=a.getComponentFromTriangleNr(0,b);return null!=a&&null!=e.featureIds&&a<e.featureIds.length?(e=this._createGraphic(a,e),z.resolve(e)):
z.reject()};c.prototype.hasStageObject=function(a){var b=a.getMetadata();return(b=this._nodeId2Meta.get(b.i3sNode))&&b.engineObject===a};c.prototype._getMetadata=function(a){a=a.getMetadata();return this._nodeId2Meta.get(a.i3sNode)};c.prototype._getCacheKey=function(a){return a.baseUrl+this._cacheKeySuffix};c.prototype._getMemCacheKey=function(a,b){void 0===b&&(b=this.elevationOffset);return a+"#"+b};c.prototype._cachingEnabled=function(){return!this._controller.disableIDBCache&&0===this.elevationOffset&&
null!=this._cacheKeySuffix};c.prototype.additionalCancelNodeLoadingHandler=function(){this._cancelCount=(this._cancelCount|0)+1|0};c.prototype._handleCancelled=function(a){if(0<((this._cancelCount|0)+(-a|0)|0))throw new ga;};c.prototype.loadCachedGPUData=function(a){return this._memCache.pop(this._getMemCacheKey(a.id))};c.prototype.loadCachedNodeData=function(a,b){var e=this,d=this._cancelCount;return this._cachingEnabled()?this._idbCache.get(this._getCacheKey(a)).then(function(c){if(null==c)return null;
e._handleCancelled(d);if(c.nodeVersion!==a.version)return e._idbCache.remove(e._getCacheKey(a)),null;a.obb||(a.obb=Da.clone(c.nodeObb),e._controller.updateVisibility(a.id));var g=function(a){if(null==a.data)return!0;var b=e._getI3STexEncoding(c.sharedResource.textureDefinitions[a.i3sTexId]);return a.encoding!==b};return e.rendererNeedsTextures&&c.textureData.some(g)?b(c.allGeometryData,c.sharedResource).then(function(b){c.textureData=b;c.byteSize=aa(c.transformedGeometries,c.textureData);b.every(Z)&&
ba(a,c)&&e._idbCache.put(e._getCacheKey(a),c).catch(function(b){b&&"indexedb:not-initialized"===b.name||n.warn("Failed to update node with textures in IndexedDB cache: "+a.id+": "+b)});e._handleCancelled(d);return c}):c}):z.resolve(null)};c.prototype.addNodeData=function(a,b){var e=this;return this._addData(a,b.attributeDataInfo,function(){return e._transformBundle(a,b).then(function(b){return e._controller.reschedule(a.id,b)}).then(function(d){a.obb||(a.obb=d.obb,e._controller.updateVisibility(a.id));
d={allGeometryData:b.allGeometryData,transformedGeometries:d.transformedGeometries,textureData:b.textureData,sharedResource:b.sharedResource,nodeVersion:a.version,nodeObb:a.obb,byteSize:e._cachingEnabled()?aa(d.transformedGeometries,b.textureData):0};if(ba(a,d)&&0<d.byteSize){var c=d.textureData.map(function(a){return Z(a)?a:{i3sTexId:a.i3sTexId,encoding:a.encoding,data:null}});e._idbCache.put(e._getCacheKey(a),S({},d,{textureData:c})).catch(function(b){return n.warn("Failed to store node in IndexedDB cache: "+
a.id+": "+b)})}return e._addCachedNodeData(a,d)})})};c.prototype._transformBundle=function(a,b){for(var e=this,d=[],c=[b.geometryBuffer],f=0,p=b.allGeometryData;f<p.length;f++)for(var w=0,h=p[f].geometries;w<h.length;w++)d.push(this._getVertexBufferLayout(h[w],b.sharedResource));b={geometryBuffer:b.geometryBuffer,geometryData:b.allGeometryData,layouts:d,mbs:a.mbs,obb:a.obb,elevationOffset:this.elevationOffset,needNormals:!this._isIntegratedMesh&&this._controller.isMeshPyramid,normalReferenceFrame:this.layer.normalReferenceFrame||
"none",indexSR:this._controller.crsIndex.toJSON(),vertexSR:this._controller.crsVertex.toJSON(),renderSR:this.view.renderSpatialReference.toJSON()};return this._workerThread?this._workerThread.invoke("process",b,{transferList:c}):this._controller.reschedule(a.id,b).then(function(a){return e._worker.transform(a)})};c.prototype.addCachedGPUData=function(a,b){if(this.alwaysLoadEverythingModeEnabled||this._controller.isGeometryVisible(a)){this._nodeId2Meta.set(a.id,b);b.engineObject.setHidden(b.engineObject.geometryRecords[0],
!1);for(var e=0,d=b.engineObject.getGeometryRecords();e<d.length;e++)d[e].material.setParameterValues({slicePlaneEnabled:this.slicePlaneEnabled});this._updateEngineObject(a,b);this._highlights.objectCreated(b.engineObject)}else this._memCache.put(this._getMemCacheKey(a.id),b,a.memory)};c.prototype.addCachedNodeData=function(a,b,e){var d=this;return this._addData(a,e,function(){return d._addCachedNodeData(a,b)})};c.prototype._addCachedNodeData=function(a,b){var e=this;if(this.suspended||!this.alwaysLoadEverythingModeEnabled&&
!this._controller.isGeometryVisible(a))return z.resolve();var d=b.allGeometryData,c=b.transformedGeometries,f=b.textureData;b=b.sharedResource;if(0===d.length)return z.resolve();1!==d.length&&console.warn("Node with",d.length,"geometries is unsupported");if(!this.rendererNeedsTextures)for(var p=0;p<f.length;p++)f[p].data=null;var h={};h[m.OBJECT]={};h[m.GEOMETRY]={};h[m.MATERIAL]={};var p=0,P=!1;a.memory=0;var k=d[0],d=k.componentOffsets,q=k.geometries,k=k.featureIds,J=null,l=null;if(this._hasSymbolColors)for(var J=
this._componentColorManager.getBuffer(k.length),l=new Uint16Array(k.length),r=0;r<k.length;r++)l[r]=J.aquireIndex();for(var r=a.id+"|"+k[0],n=[],t=[],x=[],y=[],A,B=0;B<q.length;B++){var I=q[B],C=this._createEngineMat(a,I,b,f,J),v=c[p++];A=v.corMatrices.globalTrafo;P=P||v.hasColors;v=new N(new Float32Array(v.interleavedVertexData),v.layout,v.positionData,d||N.DefaultOffsets,v.indices||N.DefaultIndices,!0);this._hasSymbolColors&&this._setComponentIndices(v,l);var I=null!=I.transformation?G.mat4f64.clone(I.transformation):
G.mat4f64.create(),D=n.length,v=new Ga(v,r+(0<D?"_"+D:""));n.push(v);x.push(I);y.push(C);t.push(Aa.createOrigin(a.mbs,this.elevationOffset,this._controller.crsIndex,this.view.renderSpatialReference));a.memory+=this.memEstimateGeometryAdded(v.data);h[m.MATERIAL][C.id]=C;h[m.GEOMETRY][v.id]=v}var F=new Ia({idHint:a.id,name:r,geometries:n,materials:y,transformations:x,origins:t,castShadow:!0,metadata:{i3sNode:a.id,layerUid:this._layerUid}});F.setObjectTransformation(A);h[m.OBJECT][F.id]=F;var E=this._addTasks.get(a.id),
u=new Oa;u.node=a;u.engineObject=F;u.featureIds=k;u.componentColorBuffer=J;u.componentIndices=l;u.cachedRendererVersion=this._getInvalidRendererVersion();u.cachedSymbolInfos=[];u.attributeInfo=E.attributeInfo;!this._hasTextures&&null!=a.textureData&&0<a.textureData.length&&(this._hasTextures=!0);this._hasColors||(this._hasColors=P);this._hasData=!0;this.notifyChange("hasTexturesOrVertexColors");var H=this.slicePlaneEnabled;return this._addOrUpdateEdgeRendering(u).then(function(){var b=e._stageLayer,
d=e._stage,c=h[m.OBJECT],g;for(g in c)c.hasOwnProperty(g)&&b.addObject(c[g]);for(var f in h)if(h.hasOwnProperty(f)){var b=h[f],p;for(p in b)b.hasOwnProperty(p)&&null==d.get(f,p)&&d.add(f,b[p])}e._nodeId2Meta.set(a.id,u);if(e.suspended)e._removeNodeStageData(a.id);else for(u.attributeInfo=E.attributeInfo,u.cachedRendererVersion===e._rendererVersion&&H===e.slicePlaneEnabled||e._addOrUpdateEdgeRendering(u),e._setObjectSymbology(u),e._applyFilters(a),e.visibleGeometryChanged(F),e._highlights.objectCreated(F),
d=0,f=u.engineObject.getGeometryRecords();d<f.length;d++)f[d].material.setParameterValues({slicePlaneEnabled:e.slicePlaneEnabled})})};c.prototype._addData=function(a,b,e){var d=this,c=this._addTasks.get(a.id);c?c.attributeInfo=b:(c=S({},z.createResolver(),{attributeInfo:b}),this._addTasks.set(a.id,c),e().then(c.resolve,c.reject).then(function(){return d._addTasks.delete(a.id)}));return c.promise};c.prototype._clippingAreaChanged=function(){var a=B.create();M.extentToBoundingBox(this.view.clippingArea,
a,this.view.renderSpatialReference)?this._clippingArea=a:this._clippingArea=null;this._filterChange();this._controller&&this._controller.updateClippingArea(this.view.clippingArea)};c.prototype._filterChange=function(){var a=this;this._filters=this.getFilters();this._nodeId2Meta.forEach(function(b){return a._applyFilters(b.node)})};c.prototype.getFilters=function(){var a=this,b=[];if(this.layer.objectIdFilter){var e=new Float64Array(this.layer.objectIdFilter.ids),d="include"===this.layer.objectIdFilter.method;
e.sort();b.push(function(b){return a._objectIdFilter(e,d,b)})}if(this._controller&&this._controller.parsedDefinitionExpression&&this._controller.definitionExpressionFields){this._definitionExpressionErrors=0;var c=this._controller.parsedDefinitionExpression,f=this._controller.definitionExpressionFields;b.push(function(b,e){return a._sqlFilter(b,e,c,f)})}this._clippingArea&&b.push(function(b,e){return a._boundingboxFilter(b,e,a._clippingArea)});return b};c.prototype._sqlFilter=function(a,b,e,d){var c=
this,f={},h=this._createLayerGraphic(f),w=this.layer.objectIdField,m=b.featureIds,k=b.attributeInfo.attributeData;d.every(function(a){return null!=k[a]||a===w})&&C.filterInPlace(a,m,function(a){f[w]=m[a];for(var b=0;b<d.length;b++){var g=d[b];g!==w&&(f[g]=r.getCachedAttributeValue(k[g],a))}return c._evaluateClause(e,h)})};c.filterInPlace=function(a,b,e){for(var d=0,c=0,f=0;f<b.length&&d<a.length;f++)a[d]===b[f]&&(e(f)&&(a[c]=a[d],c++),d++);a.length=c};c.prototype._evaluateClause=function(a,b){try{return a.testFeature(b)}catch(e){return this._definitionExpressionErrors<
this._maxDefinitionExpressionErrors&&n.error("Error while evaluating definitionExpression: "+e),this._definitionExpressionErrors++,this._definitionExpressionErrors===this._maxDefinitionExpressionErrors&&n.error("Further errors are ignored"),!1}};c.prototype._objectIdFilter=function(a,b,e){for(var d=0,c=0;d<e.length;)0<=E.binaryIndexOf(a,e[d])===b&&(e[c]=e[d],c++),d++;e.length=c};c.prototype._boundingboxFilter=function(a,b,e){var d=[0,0,0,0];M.mbsToMbs(b.node.mbs,this._controller.crsIndex,d,this.view.renderSpatialReference);
d=null!=e?r.intersectBoundingBoxWithMbs(e,d):2;if(2!==d)if(0===d)a.length=0;else{var d=b.engineObject.getObjectTransformation(),c=b.engineObject.getGeometryRecords()[0].getShaderTransformation();G.mat4.multiply(d,d,c);if(0===d[1]&&0===d[2]&&0===d[3]&&0===d[4]&&0===d[6]&&0===d[7]&&0===d[8]&&0===d[9]&&0===d[11]&&1===d[15]){var f=da;f[0]=(e[0]-d[12])/d[0];f[1]=(e[1]-d[13])/d[5];f[2]=(e[2]-d[14])/d[10];f[3]=(e[3]-d[12])/d[0];f[4]=(e[4]-d[13])/d[5];f[5]=(e[5]-d[14])/d[10];var h=b.engineObject.getGeometryRecords()[0].geometry;
h.componentCount===b.featureIds.length&&C.filterInPlace(a,b.featureIds,function(a){return B.intersects(f,h.getComponentAABB(a,Pa))})}}};c.prototype._addOrUpdateEdgeRendering=function(a,b){void 0===b&&(b=!0);if(!this._edgeView)return z.resolve();var e=a.engineObject,c=this._edgeView.hasObject(e),g=this._extractObjectEdgeMaterials(a);a=g.perFeatureEdgeMaterials;var f={slicePlaneEnabled:this.slicePlaneEnabled};if(g.hasEdges)if(g=!e.isHidden(e.geometryRecords[0]),c)this._edgeView.updateAllComponentMaterials(e,
a,f,b),this._edgeView.updateObjectVisibility(e,g);else{if(g)return ia.safeCast(this._edgeView.addObject(e,a,f))}else c&&this._edgeView.removeObject(e);return z.resolve()};c.prototype._applyFilters=function(a){var b=this._nodeId2Meta.get(a.id);b&&(this._applyFiltersToObjects(a,b),this._updateEdgeRendering(b))};c.prototype._applyFiltersToObjects=function(a,b){a=b.engineObject;a.unhideAllComponents();if(0!==this._filters.length){for(var e=b.featureIds,c=e.slice(),g=0,f=this._filters;g<f.length;g++)(0,f[g])(c,
b);if(c.length!==e.length)for(b=0,g=a.getGeometryRecords()[0],f=0;f<e.length;f++){var h=e[f];b>=c.length||c[b]!==h?a.setComponentVisibility(g,f,!1):b++}}};c.prototype._removeAllNodeDataFromStage=function(a){var b=this;void 0===a&&(a=this.elevationOffset);this._nodeId2Meta.forEach(function(e,c){return b._removeNodeStageData(c,a)})};c.prototype.removeNodeData=function(a){var b=this;a.forEach(function(a){return b._removeNodeStageData(a.id)})};c.prototype._removeNodeStageData=function(a,b){void 0===b&&
(b=this.elevationOffset);var e=this._nodeId2Meta.get(a);if(e){var c=e.engineObject;c.setHidden(c.geometryRecords[0],!0);this.visibleGeometryChanged(c);this._addOrUpdateEdgeRendering(e);this._nodeId2Meta.delete(a);this._highlights.objectDeleted(c);this._memCache.put(this._getMemCacheKey(a,b),e,e.node.memory)}};c.prototype._deleteNodeStageData=function(a){var b=this._stage,e=this._stageLayer,c=a.engineObject;this._edgeView&&this._edgeView.removeObject(c);e.removeObject(c);for(var e=0,g=c.getGeometryRecords();e<
g.length;e++){var f=g[e];this.memEstimateGeometryRemoved(f.geometry.data);b.remove(m.GEOMETRY,f.geometry.id);this._removeMaterial(f.material,b)}if(a.componentIndices){for(e=0;e<a.componentIndices.length;e++)a.componentColorBuffer.releaseIndex(a.componentIndices[e]);this._componentColorManager.garbageCollect()}b.remove(m.OBJECT,c.id)};c.prototype._removeMaterial=function(a,b){b.remove(m.MATERIAL,a.id);var c=a.metadata.i3sTexId;if(c){var d=this._texId2Meta.get(c);if(d){var g=d.usedByEngineMats;E.removeUnordered(g,
a)||n.error("Missing reference from material to texture");0===g.length&&((a=d.engineTex)&&a!==this._whiteTexture&&(this.memEstimateTextureRemoved(a),b.remove(m.TEXTURE,d.engineTex.id)),this._texId2Meta.delete(c))}}};c.prototype.setPolygonOffset=function(a,b){var c=this._nodeId2Meta.get(a.id);if(c)for(a=0,c=c.engineObject.getGeometryRecords();a<c.length;a++)c[a].material.setParameterValues({polygonOffset:b})};c.prototype._getInvalidRendererVersion=function(){return(this._rendererVersion|0)+-1|0};c.prototype._rendererChange=
function(a){this._currentRenderer=a;this._rendererVersion=(this._rendererVersion|0)+1|0;this._opacityVariable=this._colorVariable=this._rendererFields=null;a&&a.requiredFields&&(this._rendererFields=r.findFieldsCaseInsensitive(a.requiredFields,this.layer.fields));if(a&&"visualVariables"in a&&a.visualVariables)for(var b=0,c=a.visualVariables;b<c.length;b++){var d=c[b];"color"===d.type?this._colorVariable=d:"opacity"===d.type?this._opacityVariable=d:n.warn("Unsupported visual variable type for 3D Object Scene Services: "+
d.type)}if(a)for(b=0,a=a.getSymbols();b<a.length;b++)c=a[b],"mesh-3d"!==c.type&&n.error("Symbols of type '"+c.type+"' are not supported for 3D Object Scene Services.");this.view.resourceController.setMemoryDirty()};c.prototype._getSymbolInfos=function(a){this._hasSymbolColors&&a.cachedRendererVersion!==this._rendererVersion&&this._updateCachedRendererData(a);return a.cachedSymbolInfos};c.prototype._getSymbolColors=function(a){this._hasSymbolColors&&a.cachedRendererVersion!==this._rendererVersion&&
this._updateCachedRendererData(a);return a.cachedSymbolColors};c.prototype._updateCachedRendererData=function(a){a.cachedRendererVersion=this._rendererVersion;if(this._hasSymbolColors){var b=a.featureIds?a.featureIds.length:1,c={},d=this._tmpAttributeOnlyGraphic;d.attributes=c;for(var g=this._currentRenderer,f=a.attributeInfo.attributeData,h=null!=a.featureIds?this.layer.objectIdField:null,m=null!=f?this._rendererFields:null,l=0;l<b;l++){null!=h&&(c[h]=a.featureIds[l]);if(null!=m)for(var k=0,q=m;k<
q.length;k++){var n=q[k];f[n]&&(c[n]=r.getCachedAttributeValue(f[n],l))}q=g&&g.getSymbol(d);k=null;q instanceof va&&(this._symbolInfos.has(q.id)||this._symbolInfos.set(q.id,r.getSymbolInfo(q)),k=this._symbolInfos.get(q.id));a.cachedSymbolInfos[l]=k;null==a.cachedSymbolColors&&(a.cachedSymbolColors=new Uint8Array(4*a.featureIds.length));n=q=null;if(g&&"visualVariables"in g){if(this._colorVariable){var t=g.getColor(d,{colorInfo:this._colorVariable,color:Qa});t&&(q=Q,q[0]=t.r/255,q[1]=t.g/255,q[2]=t.b/
255,this._opacityVariable||null===t.a||(n=t.a))}this._opacityVariable&&(n=g.getOpacity(d,{opacityInfo:this._opacityVariable}))}k&&k.material?(k=k.material,q=null==q||null==n?V.overrideColor(q,n,k.color,k.alpha,ca,Q):V.overrideColor(q,n,null,null,ca,Q),K.encodeSymbolColor(q,k.colorMixMode,a.cachedSymbolColors,4*l)):K.encodeSymbolColor(null,null,a.cachedSymbolColors,4*l)}}};c.prototype._extractObjectEdgeMaterials=function(a){var b=[],c=a.engineObject,d=a.featureIds?a.featureIds.length:1,g={opacity:this.fullOpacity},
f=this._edgeView.createSolidEdgeMaterial({color:[0,0,0,0],opacity:0}),h=!1,m=null,l=null;a=this._getSymbolInfos(a);for(var k=0;k<d;k++){var n=a[k];c.getComponentVisibility(c.getGeometryRecords()[0],k)&&n?(l!==n&&(l=n,(m=Ba.createMaterialFromEdges(this._edgeView,n.edges,g))&&(h=!0)),b.push(ka.isSome(m)?m:f)):b.push(f)}return{hasEdges:h,perFeatureEdgeMaterials:b}};c.prototype._setObjectSymbology=function(a){if(this._hasSymbolColors){for(var b=a.featureIds?a.featureIds.length:1,c=!1,d=this._getSymbolColors(a),
g=a.componentColorBuffer.textureBuffer,f=0;f<b;f++){var h=4*f;g.setData(a.componentIndices[f],0,d[h],d[h+1],d[h+2],d[h+3]);K.isOpaqueSymbolColor(d,h)||(c=!0)}this._updateObjectOpacity(a.engineObject,c)}};c.prototype._setComponentIndices=function(a,b){for(var c=a.getAttribute(x.VertexAttrConstants.COMPONENTINDEX),d=c.data,g=c.offsetIdx,c=c.strideIdx,f=a.getIndices(x.VertexAttrConstants.COMPONENTINDEX),h=0;h<b.length;h++)for(var m=a.componentOffsets[h+1],l=a.componentOffsets[h];l<m;l++)d[g+f[l]*c]=
b[h]};c.prototype._reloadAll=function(a){void 0===a&&(a=this.elevationOffset);this._removeAllNodeDataFromStage(a);null!=this._controller&&this._controller.restartNodeLoading()};c.prototype._opacityChange=function(a){var b=this;this._nodeId2Meta.forEach(function(a){b._updateObjectOpacity(a.engineObject);b._updateEdgeRendering(a)})};c.prototype._updateObjectOpacity=function(a,b){var c=0;for(a=a.getGeometryRecords();c<a.length;c++){var d=a[c].material,g=d.metadata;void 0!==b&&(g.symbolIsTransparent=
b);var f=d.getParams(),g=this._calcEngineMaterialTransparencyParams(g.i3sTex,g.i3sMatParams,g.symbolIsTransparent);f.transparent===g.transparent&&f.layerOpacity===g.layerOpacity||d.setParameterValues(g)}};c.prototype._updateEngineObject=function(a,b){this._setObjectSymbology(b);this._addOrUpdateEdgeRendering(b);this._applyFilters(a);this.visibleGeometryChanged(b.engineObject)};c.prototype._slicePlaneEnabledChange=function(a){var b=this,c={slicePlaneEnabled:a};this._stageLayer.isSliceable=a;this._nodeId2Meta.forEach(function(a){for(var e=
0,d=a.engineObject.getGeometryRecords();e<d.length;e++)d[e].material.setParameterValues(c);b._updateEdgeRendering(a,!1)})};c.prototype._updateEdgeRendering=function(a,b){void 0===b&&(b=!0);this._edgeView&&this._edgeView.hasObject(a.engineObject)&&this._addOrUpdateEdgeRendering(a,b)};c.prototype._forAllFeatures=function(a,b,c){var e=this;this._nodeId2Meta.forEach(function(d,f){e._forAllFeaturesOfNode(d,a,c);b&&b(d.node)})};c.prototype._forAllFeaturesOfNode=function(a,b,c){for(var e=a.featureIds,g=
a.engineObject.getGeometryRecords()[0],f=0;f<e.length;f++)(c||a.engineObject.getComponentVisibility(g,f))&&b(e[f],f,a,g)};c.prototype._createGraphic=function(a,b){var c={};null!=b.featureIds&&(c[this._getObjectIdField()]=b.featureIds[a]);b=b.attributeInfo.attributeData;if(null!=b)for(var d=0,g=Object.keys(b);d<g.length;d++){var f=g[d];c[f]=r.getCachedAttributeValue(b[f],a)}return this._createLayerGraphic(c)};c.prototype._boundingBoxCornerPoints=function(a,b,c){a=b.geometries[0].getComponentAABB(a,
da);for(var d=0;8>d;++d)A[0]=d&1?a[0]:a[3],A[1]=d&2?a[1]:a[4],A[2]=d&4?a[2]:a[5],G.vec3.transformMat4(A,A,b.objectTransformation),c[3*d]=A[0],c[3*d+1]=A[1],c[3*d+2]=A[2];return c};c.prototype.highlight=function(a,b){var c=this;void 0===b&&(b={});var d=this._highlights;"number"===typeof a?a=[a]:a instanceof D?a=[a]:a instanceof ja&&(a=a.toArray());if(Array.isArray(a)&&0<a.length){if(a[0]instanceof D){a=a.map(function(a){return H.attributeLookup(a.attributes,c._getObjectIdField())});var g=d.acquireSet(b);
b=g.set;g=g.handle;d.setFeatureIds(b,a);return g}if("number"===typeof a[0])return g=d.acquireSet(b),b=g.set,g=g.handle,d.setFeatureIds(b,a),g}return{remove:function(){}}};c.prototype.visibleGeometryChanged=function(a){var b=this;a?this._elevationProvider.objectChanged(a):this._elevationProvider.layerChanged();null==this._visibleGeometryChangedSchedulerHandle&&(this._visibleGeometryChangedSchedulerHandle=ra.schedule(function(){b.emit("visible-geometry-changed");b._visibleGeometryChangedSchedulerHandle=
null}))};var C;l([h.property()],c.prototype,"view",void 0);l([h.property()],c.prototype,"layer",void 0);l([h.property()],c.prototype,"_controller",void 0);l([h.property({dependsOn:["_controller.updating"]})],c.prototype,"updating",void 0);l([h.property({dependsOn:["_controller.rootNodeVisible"]})],c.prototype,"suspended",void 0);l([h.property(Ca.updatingPercentage)],c.prototype,"updatingPercentage",void 0);l([h.property({readOnly:!0,aliasOf:"_controller.updatingPercentage"})],c.prototype,"updatingPercentageValue",
void 0);l([h.property({readOnly:!0})],c.prototype,"hasTexturesOrVertexColors",null);l([h.property({readOnly:!0,dependsOn:["layer.renderer"]})],c.prototype,"rendererNeedsTextures",null);l([h.property({readOnly:!0,dependsOn:["layer.elevationInfo"]})],c.prototype,"elevationOffset",null);l([h.property({type:Boolean})],c.prototype,"slicePlaneEnabled",void 0);l([h.property()],c.prototype,"alwaysLoadEverythingModeEnabled",void 0);l([h.property({dependsOn:["view.qualitySettings.sceneService.uncompressedTextureDownsamplingEnabled",
"useCompressedTextures"]})],c.prototype,"uncompressedTextureDownsamplingEnabled",null);l([h.property({dependsOn:["layer.version"]})],c.prototype,"useCompressedTextures",null);return c=C=l([h.subclass("esri.views.3d.layers.I3SMeshView3D")],c)}(h.declared(ma,la,pa));var A=G.vec3f64.create(),da=B.create(),Pa=B.create(),Q=[0,0,0,0],Qa=new ha([0,0,0,0]);return R});