// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/arrayUtils ../../../core/libs/gl-matrix-2/gl-matrix ../../../geometry/support/aaBoundingRect ../support/mathUtils ../support/buffer/typedArrayUtil ./ElevationData ./ElevationTileAgent ./MapTileAgent ./TerrainConst ./terrainUtils ./TileAgent ./TilePerLayerInfo ./tileUtils ../../vectorTiles/VectorTileDisplayObject ../../webgl/Texture".split(" "),function(I,J,t,f,u,q,D,z,v,w,g,A,E,B,x,F,G){function y(e){e instanceof v?v.Pool.release(e):e instanceof w&&w.Pool.release(e)}
var C=A.weakAssert,r=f.vec3f64.create(),l=f.vec3f64.create(),k=f.vec4f64.create(),H=f.vec3f64.create(),m=E.AGENT_DONE;return function(){function e(a){this.lij=[0,0,0];this.extent=u.create();this.elevationBounds=f.vec2f64.create();this.children=[null,null,null,null];this.layerInfo=Array(g.LayerClass.COUNT);this.extentWGS84Rad=u.create();this.centerAtSeaLevel=f.vec3f64.create();this.center=f.vec3f64.create();this.tileUp=H;this.intersectsClippingArea=this.isWithinClippingArea=!0;this.clippingArea=null;
this._memoryUsed=this.radius=this.edgeLen2=this.edgeLen=this.renderOrder=this.screenDepth=this._maxTesselation=0;this.numSubdivisionsAtLevel=a}Object.defineProperty(e.prototype,"memoryUsed",{get:function(){return this._memoryUsed},enumerable:!0,configurable:!0});e.prototype.init=function(a,b,c,d){this.lij[0]=a[0];this.lij[1]=a[1];this.lij[2]=a[2];d.getExtent(a[0],a[1],a[2],this.extent,this.extentWGS84Rad);this.intersectsClippingArea=this.isWithinClippingArea=!0;this.clippingArea=null;this.radius=
this.edgeLen2=this.edgeLen=0;this.vlevel=a?a[0]:0;b&&b.elevationBounds?f.vec2.copy(this.elevationBounds,b.elevationBounds):f.vec2.set(this.elevationBounds,0,0);this.pendingUpdates=0;this.renderData=null;this.screenDepth=0;this.visible=!1;this.parent=b;this.parentSurface=c;for(a=0;4>a;a++)this.children[a]=null;for(a=0;a<g.LayerClass.COUNT;a++)if(c){b=c.numLayers(a);var h=void 0;this.layerInfo[a]?(h=this.layerInfo[a],h.length=b):(h=Array(b),this.layerInfo[a]=h);for(var e=0;e<b;e++)h[e]=B.makeEmptyLayerInfo(a,
h[e]),a===g.LayerClass.ELEVATION&&this.findElevationBoundsForLayer(e,-1)}else this.layerInfo[a]=null;this.computeElevationBounds();this._maxTesselation=Math.min(d.pixelSize[0],g.MAX_TILE_TESSELATION)};e.prototype.dispose=function(){for(var a=0;a<g.LayerClass.COUNT;a++)for(var b=0,c=this.layerInfo[a];b<c.length;b++)c[b].dispose();this.updateMemoryUsed()};e.prototype.updateMemoryUsed=function(){for(var a=this.parentSurface.tilingScheme.pixelSize,a=a[0]*a[1]*4,b=this._memoryUsed=0,c=this.layerInfo[g.LayerClass.MAP];b<
c.length;b++){var d=c[b],d=d.data;d instanceof G?this._memoryUsed+=1.3*d.descriptor.width*d.descriptor.height*4:d instanceof HTMLImageElement?this._memoryUsed+=a:d instanceof F&&(this._memoryUsed+=d.getGpuMemoryUsage()+d.getCpuMemoryUsage())}b=0;for(c=this.layerInfo[g.LayerClass.ELEVATION];b<c.length;b++)d=c[b],this._memoryUsed+=d.data?a:0;this.renderData&&(this._memoryUsed+=this.renderData.estimateGeometryMemoryUsage(),a=this.renderData.texture?this.renderData.texture.descriptor:null)&&(this._memoryUsed+=
1.3*a.width*a.height*4)};e.prototype.updateScreenDepth=function(a){f.vec3.copy(k,this.center);k[3]=1;f.vec4.transformMat4(k,k,a);this.screenDepth=k[2]/k[3]};e.prototype.shouldSplit=function(a,b){var c=this.lij[0];f.vec3.subtract(r,this.center,b);var d=f.vec3.squaredLength(r),h=a[4];if(d<this.edgeLen2&&c<h)return g.TileUpdateTypes.SPLIT;var e=a[1],d=2*Math.sqrt(d),n=this.edgeLen/(a[0]*d);return n<e?this.vlevel!==this.lij[0]?(this.vlevel=this.lij[0],g.TileUpdateTypes.VSPLITMERGE):g.TileUpdateTypes.NONE:
c>=h?(a=c+Math.ceil(-q.log2(e/n)),a!==this.vlevel?(this.vlevel=a,g.TileUpdateTypes.VSPLITMERGE):g.TileUpdateTypes.NONE):6<c&&(f.vec3.scale(l,this.tileUp,f.vec3.dot(this.tileUp,r)),f.vec3.subtract(l,l,r),c=f.vec3.squaredLength(l),c>this.radius*this.radius&&(f.vec3.scale(l,l,this.radius/Math.sqrt(c)),f.vec3.add(l,l,this.center),f.vec3.subtract(l,b,l),b=this.elevationBounds[1]-this.elevationBounds[0],Math.min(1,(Math.abs(f.vec3.dot(l,this.tileUp))+.5*b+this.curvatureHeight)/f.vec3.length(l))*(this.edgeLen/
(a[2]*d))<.1/a[5]*a[3]))?g.TileUpdateTypes.NONE:g.TileUpdateTypes.SPLIT};e.prototype.decodeElevationData=function(a){var b;if(D.isArrayBuffer(a))try{b=z.createFromLERC(this.lij,this.extent,a,g.noDataValueOpt)}catch(c){console.warn("Error decoding raw data: %s",c.message)}else b=z.createFromFetchTileResult(this.lij,this.extent,a);return b};e.prototype.getWGS84Extent=function(){var a=this.extentWGS84Rad;return u.fromValues(q.rad2deg(a[0]),q.rad2deg(a[1]),q.rad2deg(a[2]),q.rad2deg(a[3]))};e.prototype.load=
function(a){for(var b=0;b<g.LayerClass.COUNT;b++)this.layerInfo[b]&&this._createOrUpdateAgents(0,b);a.loadTile(this)};e.prototype.unload=function(a){this.renderData&&a.unloadTile(this);for(a=0;a<g.LayerClass.COUNT;a++)for(var b=this.layerInfo[a],c=0;c<b.length;c++){var d=b[c];d.loadingAgent&&d.loadingAgent!==m&&(d.loadingAgent.dispose(),y(d.loadingAgent),d.loadingAgent=null);d.pendingUpdates=0}this.pendingUpdates&=~g.TileUpdateTypes.UPDATE_GEOMETRY;this.pendingUpdates&=~g.TileUpdateTypes.UPDATE_TEXTURE};
e.prototype.updateClippingStatus=function(a){if(t.equals(a,this.clippingArea))return!1;var b=this.intersectsClippingArea,c=this.isWithinClippingArea;a?(this.intersectsClippingArea=this.intersectsExtent(a),this.isWithinClippingArea=this.isWithinExtent(a)):this.isWithinClippingArea=this.intersectsClippingArea=!0;this.clippingArea=a;a=c&&this.isWithinClippingArea;b=!c&&!b&&!this.isWithinClippingArea&&!this.intersectsClippingArea;!this.renderData||a||b||this.updateGeometry();return!0};e.prototype.updateVisibility=
function(a){a=this.isVisible(a)&&this.intersectsClippingArea;if(a!==this.visible){this.visible=a;for(var b=this.layerInfo[0],c=0;c<b.length;c++){var d=b[c];d.loadingAgent&&d.loadingAgent!==m&&d.loadingAgent.setSuspension(!a)}}return a};e.prototype.getLayerInfo=function(a,b){return this.layerInfo[b][a]};e.prototype.hasLayerData=function(a,b){return(a=this.layerInfo[b][a])&&a.data&&!a.dataInvalidated};e.prototype.hasDataAvailable=function(a,b,c){return(b=this.layerInfo[c][b].tilemap)?"unavailable"!==
b.getAvailability(a.lij[1],a.lij[2]):!0};e.prototype.requestLayerData=function(a,b,c){g.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d requested by tile %s",this.lij.toString(),b,a,c.tile.lij.toString());var d=this.layerInfo[b][a];if(-1<d.waitingAgents.indexOf(c))return console.warn("agent already requested this piece of map data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),c.tile.lij.toString(),b,a),!0;d.waitingAgents.push(c);if(d.data&&!d.dataInvalidated)return console.warn("agent requested existing data (tile %s, agent tile %s, layer: %d/%d)",
this.lij.toString(),c.tile.lij.toString(),b,a),setTimeout(c.dataArrived.bind(c,this),0),!0;if(d.pendingUpdates&g.TileUpdateTypes.DECODE_ELEVATION||d.requestPromise)return!0;var h=this.parentSurface.requestTileData(this,a,b);if(!h||h.isFulfilled())return!1;a=function(){d.requestPromise===h&&(d.requestPromise=null)};d.requestPromise=h;h.then(a,a);return!0};e.prototype.descendants=function(a){a||(a=[]);for(var b=0;4>b;b++){var c=this.children[b];c&&(c.descendants(a),a.unshift(this.children[b]))}return a};
e.prototype.hasLij=function(a){return this.lij[0]===a[0]&&this.lij[1]===a[1]&&this.lij[2]===a[2]};e.prototype.findByLij=function(a){if(this.hasLij(a))return this;for(var b=0;4>b;b++){var c=this.children[b];if(c&&(c=c.findByLij(a)))return c}return null};e.prototype.unrequestLayerData=function(a,b,c){g.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d canceled by tile %s",this.lij.toString(),b,a,c.tile.lij.toString());var d=this.layerInfo[b][a],h=d.waitingAgents;c=null!=t.removeUnordered(h,c);
C(c,"agent has not requested this piece of map data");1>h.length&&(h=d.requestPromise,c=!1,b===g.LayerClass.MAP&&(c=this.parentSurface.layerViewByIndex(a,g.LayerClass.MAP),c=A.isVectorTileLayerView(c)),c||C(h||d.rawData,"no pending operations on layerInfo that agents were waiting for"),h&&!h.isFulfilled()&&(h.cancel(),d.requestPromise=null),g.TILE_LOADING_DEBUGLOG&&console.log("tile %s layer %d/%d request/loading canceled",this.lij.toString(),b,a),this.updateMemoryUsed())};e.prototype.dataArrived=
function(a,b,c){a=this.layerInfo[b][a];a.data=c;a.dataInvalidated=!1;for(c=0;c<a.waitingAgents.length;c++)a.waitingAgents[c].dataArrived(this);a.waitingAgents.length=0;this.updateMemoryUsed()};e.prototype.dataMissing=function(a,b,c){c.notInTilemap||console.error("Tile %s layer %d/%d error",this.lij.toString(),b,a);a=this.layerInfo[b][a];a.dataMissing=!0;for(b=0;b<a.waitingAgents.length;b++)a.waitingAgents[b].dataMissing(this);a.waitingAgents.length=0;this.updateMemoryUsed()};e.prototype.updateTexture=
function(a){void 0===a&&(a=!1);this.renderData&&(a?this.parentSurface.renderer.updateTileTexture(this):(this.pendingUpdates|=g.TileUpdateTypes.UPDATE_TEXTURE,this.parentSurface.setPendingUpdates()))};e.prototype.invalidateLayerData=function(a,b){this.layerInfo[b][a].invalidateSourceData();this.restartAgents(b)};e.prototype.computeElevationBounds=function(){f.vec2.set(this.elevationBounds,Number.MAX_VALUE,-Number.MAX_VALUE);for(var a=this.layerInfo[g.LayerClass.ELEVATION],b=!1,c=0;c<a.length;c++){var d=
a[c];d.elevationBounds&&(this.elevationBounds[0]=Math.min(this.elevationBounds[0],d.elevationBounds[0]),this.elevationBounds[1]=Math.max(this.elevationBounds[1],d.elevationBounds[1]),b=!0)}b||f.vec2.set(this.elevationBounds,0,0);this.updateRadiusAndCenter()};e.prototype.updateRadiusAndCenter=function(){f.vec3.scale(l,this.tileUp,.5*(this.elevationBounds[0]+this.elevationBounds[1]));f.vec3.add(this.center,this.centerAtSeaLevel,l)};e.prototype.findElevationBoundsForLayer=function(a,b){var c=this.layerInfo[g.LayerClass.ELEVATION][a];
if(!c.elevationBounds||c.elevationBounds[2]<b)if(b=this.parentSurface.layerViewByIndex(a,g.LayerClass.ELEVATION),x.fallsWithinLayer(this,b.layer,!1)){b=!1;if(c.data){var d=c.data;f.vec2.copy(k,d.bounds);k[2]=this.lij[0];b=!0}else{for(var h=this.parent,e=0,n=null,d=c.data;h&&(!d||e<g.ELEVATION_DESIRED_RESOLUTION_LEVEL);){e=this.vlevel-h.lij[0];n=d||n;d=h.layerInfo[g.LayerClass.ELEVATION][a].data;if(!d&&n&&e>=g.ELEVATION_DESIRED_RESOLUTION_LEVEL)break;h=h.parent}if(d=d||n)d.computeMinMaxValue(this.lij[0],
this.lij[1],this.lij[2],k),Infinity!==k[0]&&(k[2]=d.level,b=!0)}b&&(c.elevationBounds?f.vec3.copy(c.elevationBounds,k):c.elevationBounds=[k[0],k[1],k[2]])}};e.prototype.updateGeometry=function(){this.pendingUpdates|=g.TileUpdateTypes.UPDATE_GEOMETRY;this.parentSurface.setPendingUpdates()};e.prototype.modifyLayers=function(a,b,c){for(var d=this.layerInfo[c],e=0;e<d.length;e++){var f=d[e];f.loadingAgent&&f.loadingAgent!==m&&(f.loadingAgent.dispose(),y(f.loadingAgent),f.loadingAgent=null);f.waitingAgents.length=
0}if(c===g.LayerClass.MAP)for(e=0;e<d.length;++e)void 0===a[e]&&d[e].dispose();a=b.length;f=Array(a);for(e=0;e<a;e++){var n=b[e];f[e]=-1<n?d[n]:B.makeEmptyLayerInfo(c)}this.layerInfo[c]=f;this.updateMemoryUsed()};e.prototype.restartAgents=function(a){if(this.renderData)if(this._createOrUpdateAgents(0,a),a===g.LayerClass.ELEVATION){this.updateGeometry();a=this.layerInfo[a];for(var b=0;b<a.length;b++)a[b].pendingUpdates|=g.TileUpdateTypes.UPDATE_GEOMETRY;this.parentSurface.setPendingUpdates()}else this.updateTexture(!0)};
e.prototype.updateAgents=function(a){if(this.renderData){for(var b=this.layerInfo[a],c=0;c<b.length;c++){var d=b[c];d.loadingAgent===m&&(d.loadingAgent=null)}this._createOrUpdateAgents(0,a)}};e.prototype.removeLayerAgent=function(a,b){a=this.layerInfo[b][a];a.loadingAgent&&a.loadingAgent!==m&&a.loadingAgent.dispose();a.loadingAgent=null};e.prototype.agentDone=function(a,b){var c=this.layerInfo[b],d=c[a];d.loadingAgent=m;d.data||d.upsampleFromTile||a<c.length-1&&this._createOrUpdateAgents(a+1,b)};
e.prototype._createOrUpdateAgents=function(a,b){for(var c=b===g.LayerClass.ELEVATION?!1:!this.visible,d=this.layerInfo[b];a<d.length;++a){var e=d[a],f=!1,n=this.parentSurface.layerViewByIndex(a,b);if(e.loadingAgent)e.loadingAgent!==m&&(f=e.loadingAgent.update());else if(x.fallsWithinLayer(this,n.layer,!1)){var k;k=b===g.LayerClass.ELEVATION?v.Pool.acquire():w.Pool.acquire();(f=k.init(this,a,b,c))?e.loadingAgent=k:(k.dispose(),y(k),e.loadingAgent=m)}if(f&&n.isOpaque)break}};e.prototype.geometryState=
function(a){var b,c=this._getElevationInfo(a?a.samplerData:null),d=this.lij[0];c.samplerData?(b=this.vlevel-d,b=Math.max(d-c.maxTileLevel,g.ELEVATION_DESIRED_RESOLUTION_LEVEL-b),d=this._maxTesselation,b=q.clamp((d>>b)+1,2,d+1)):b=8>d?this.numSubdivisionsAtLevel[d]+1:2;d=this.clippingArea;if(!this.intersectsClippingArea||this.isWithinClippingArea)d=null;a?(a.needsUpdate=!1,a.numVertsPerRow!==b&&(a.numVertsPerRow=b,a.needsUpdate=!0),c.changed&&(a.samplerData=c.samplerData,a.needsUpdate=!0),t.equals(a.clippingArea,
d)||(a.clippingArea=d,a.needsUpdate=!0)):a={numVertsPerRow:b,samplerData:c.samplerData,needsUpdate:!0,clippingArea:d};return a};e.prototype._getElevationInfo=function(a){for(var b=this.layerInfo[g.LayerClass.ELEVATION],c=b.length,d=Array(c),e=0,f=0,k=!1,l=0;l<c;l++){var m=b[l];if(m.upsampleFromTile){var m=m.upsampleFromTile.tile,p=m.layerInfo[g.LayerClass.ELEVATION][l].data;a&&a[e]===p.samplerData||(k=!0);d[e++]=p.samplerData;f=Math.max(f,m.lij[0])}else m.data&&(p=this.parentSurface.layerViewByIndex(l,
g.LayerClass.ELEVATION),x.fallsWithinLayer(this,p.layer,!1)&&(p=m.data,a&&a[e]===p.samplerData||(k=!0),d[e++]=p.samplerData,f=this.lij[0]))}a&&a.length!==e&&(k=!0);0<e?d.length=e:d=null;return{changed:k,samplerData:d,maxTileLevel:f}};e.prototype.isWithinExtent=function(a){var b=this.extent;return b[0]>=a[0]&&a[2]>=b[2]&&b[1]>=a[1]&&a[3]>=b[3]};e.prototype.intersectsExtent=function(a){var b=this.extent;return b[2]>=a[0]&&a[2]>=b[0]&&b[3]>=a[1]&&a[3]>=b[1]};return e}()});