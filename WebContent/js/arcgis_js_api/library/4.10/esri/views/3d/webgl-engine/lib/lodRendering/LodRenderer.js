// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/extendsHelper ../../../../../core/libs/gl-matrix-2/gl-matrix ../../../../../geometry/support/aaBoundingBox ../../../support/debugFlags ../../../support/buffer/glUtil ../Camera ../DefaultVertexAttributeLocations ./InstanceData ./InstanceOctree ./LevelSelector ./RenderInstanceData ./utils ../../materials/DefaultMaterial ../../materials/internal/MaterialUtil ../../../../webgl/BufferObject ../../../../webgl/Util ../../../../webgl/VertexArrayObject".split(" "),
function(z,r,T,f,u,A,B,M,x,k,N,O,C,y,P,Q,R,w,S){function D(c,a,b,m){y.encodeDoubleVec3(c.modelOrigin,a,b.modelOriginHi,b.modelOriginLo,m);b.model.copyFrom(m,c.model,a);b.modelNormal.copyFrom(m,c.modelNormal,a);c.color&&b.color&&b.color.copyFrom(m,c.color,a);c.featureAttribute&&b.featureAttribute&&b.featureAttribute.copyFrom(m,c.featureAttribute,a)}Object.defineProperty(r,"__esModule",{value:!0});var v=w.assert,E=function(c){var a=c.baseBoundingSphere.radius;c=c.levels.map(function(a){return a.minScreenSpaceRadius});
return new O.LevelSelector(a,c)};r.setLevelSelectorFactory=function(c){E=c};var F=function(){function c(a,b){this.glMaterials={};var c=a.rctx,g=b.geometry;b=b.material;var d=g.data.toRenderData();this.materialRep=a.materialRep;b.setParameterValues({instancedDoublePrecision:!0});a=b.bufferWriter;var h=a.vertexBufferLayout,e=a.elementCount(d),t=a.allocate(e);a.write({},d,void 0,t,0);this.geometry=g;this.material=b;this.glMaterials=y.acquireGLMaterials(b,this.materialRep);this.vertexBufferLayout=h;this.vbo=
R.createVertex(c,35044,t.buffer);this.vao=new S(c,x.Default3D,{geometry:B.glLayout(h)},{geometry:this.vbo});this.vertexCount=e}c.prototype.destroy=function(){y.releaseGLMaterials(this.material,this.materialRep);this.vbo.dispose();this.vao.dispose()};Object.defineProperty(c.prototype,"boundingInfo",{get:function(){return this.geometry.boundingInfo},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"triangleCount",{get:function(){return this.vertexCount/3},enumerable:!0,configurable:!0});
c.prototype.intersect=function(a,b,c,g,d,h){var m=this.geometry.id,t=d.toString();this.material.intersect(this.geometry,null,a.transform,a,c,g,function(c,g,e,k,n,f){if(0<=c&&(null==b||b(a.p0,a.p1,c))){n={type:"external",metadata:h(d)};if(null==a.minResult.priority||k>=a.minResult.priority)if(null==a.minResult.dist||c<a.minResult.dist)a.minResult.set(n,t,c,g,a.transform,k,null,m,e),a.minResult.setIntersector("LodRenderer");if(null==a.maxResult.priority||k>=a.maxResult.priority)if(null==a.maxResult.dist||
c>a.maxResult.dist)a.maxResult.set(n,t,c,g,a.transform,k,null,m,e),a.minResult.setIntersector("LodRenderer")}},null)};return c}();r.LodComponentData=F;var G=function(){function c(a,b){var c=this;this.components=[];this.minScreenSpaceRadius=b.minScreenSpaceRadius;b.components.forEach(function(b){c.components.push(new F(a,b))})}c.prototype.destroy=function(){this.components.forEach(function(a){a.destroy()})};c.prototype.intersect=function(a,b,c,g,d,h){this.components.forEach(function(m){m.intersect(a,
b,c,g,d,h)})};Object.defineProperty(c.prototype,"boundingBox",{get:function(){if(!this._boundingBox){var a=u.empty();this.components.forEach(function(b){u.expand(a,b.boundingInfo.bbMin);u.expand(a,b.boundingInfo.bbMax)});this._boundingBox=a}return this._boundingBox},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"boundingSphere",{get:function(){if(!this._boundingSphere){var a=this.boundingBox,b=f.vec3f64.create();u.center(a,b);this._boundingSphere={center:b,radius:.5*u.diameter(a)}}return this._boundingSphere},
enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"triangleCount",{get:function(){return this.components.reduce(function(a,b){return a+b.triangleCount},0)},enumerable:!0,configurable:!0});return c}();r.LodLevelData=G;z=function(){function c(a,b,c,g){var d=this;this._levels=[];this._renderInstanceData=[];this._highlightRenderInstanceData=[];this._instanceIndex=0;this._slicePlaneEnabled=!1;this._enableLevelSelection=!0;this._lastCamera=new M;this._updateCyclesWithStaticCamera=-1;this.didRender=
this._needFullCycle=!1;this._symbol=a;this._optionalFields=b;this._instanceToMetadata=c;this._instanceBufferLayout=P.getInstanceBufferLayout({instancedDoublePrecision:!0,instanced:b});this._glInstanceBufferLayout=B.glLayout(this._instanceBufferLayout,{divisor:1});this._instanceData=new k.InstanceData(this._optionalFields,g);this._instanceData.on("instance-added",function(a){d.requestUpdateCycle()});this._instanceData.on("instance-removed",function(a){d.requestUpdateCycle()});this._instanceData.on("instance-transform-changed",
function(a){d.requestUpdateCycle()});this._instanceData.on("instance-visibility-changed",function(a){d.requestUpdateCycle(!0)});this._instanceData.on("instance-highlight-changed",function(a){d.requestUpdateCycle(!0)});this._enableLevelSelection=1<this._symbol.levels.length;r.lodRenderers.push(this)}c.prototype.destroy=function(){r.lodRenderers.splice(r.lodRenderers.indexOf(this),1)};Object.defineProperty(c.prototype,"levels",{get:function(){return this._levels},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,
"baseBoundingBox",{get:function(){return this._levels[this._levels.length-1].boundingBox},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"baseBoundingSphere",{get:function(){return this._levels[this._levels.length-1].boundingSphere},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"baseMaterial",{get:function(){return this._levels[this._levels.length-1].components[0].material},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"slicePlaneEnabled",
{get:function(){return this._slicePlaneEnabled},set:function(a){this._slicePlaneEnabled=a},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"instanceData",{get:function(){return this._instanceData},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"memoryUsage",{get:function(){var a={cpu:0,gpu:0};this._renderInstanceData.forEach(function(b){b=b.memoryUsage;a.cpu+=b.cpu;a.gpu+=b.gpu});this._highlightRenderInstanceData.forEach(function(b){b=b.memoryUsage;a.cpu+=b.cpu;
a.gpu+=b.gpu});return a},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"renderStats",{get:function(){var a=this,b=this._instanceData.size,c=[];this._levels.forEach(function(b,d){d=a._renderInstanceData[d].size+a._highlightRenderInstanceData[d].size;b=b.triangleCount;c.push({renderedInstances:d,renderedTriangles:d*b,trianglesPerInstance:b})});return{totalInstances:b,renderedInstances:c.reduce(function(a,b){return a+b.renderedInstances},0),renderedTriangles:c.reduce(function(a,b){return a+
b.renderedTriangles},0),levels:c}},enumerable:!0,configurable:!0});c.prototype.initializeRenderContext=function(a){var b=this,c=a.rctx;this._symbol.levels.forEach(function(m){b._levels.push(new G(a,m));b._renderInstanceData.push(new C.RenderInstanceData(c,b._instanceBufferLayout));b._highlightRenderInstanceData.push(new C.RenderInstanceData(c,b._instanceBufferLayout))});this._levelSelector=E(this)};c.prototype.uninitializeRenderContext=function(a){this._levels.forEach(function(a){a.destroy()});this._renderInstanceData.forEach(function(a){a.destroy()});
this._highlightRenderInstanceData.forEach(function(a){a.destroy()})};Object.defineProperty(c.prototype,"slots",{get:function(){return[5,7]},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"needsHighlight",{get:function(){return 0<this._highlightRenderInstanceData.reduce(function(a,b){return a+b.size},0)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"needsRender",{get:function(){return this.needsUpdates()},enumerable:!0,configurable:!0});c.prototype.resetNeedsRender=
function(){this.didRender&&(this.didRender=!1)};c.prototype.prepareRender=function(a){this.runUpdates(a)};c.prototype.render=function(a){var b=a.rctx,c=5===a.slot?4:7===a.slot?6:null;if(c){if(!this.baseMaterial.isVisible())return!1;var g={view:a.camera.viewMatrix,proj:a.camera.projectionMatrix,origin:[0,0,0],viewInvTransp:a.camera.viewInverseTransposeMatrix,lightingData:a.lightingData,viewport:a.camera.viewport,fovY:a.camera.fovY,nearFar:[a.camera.near,a.camera.far],framebufferTex:a.offscreenRenderingHelper?
a.offscreenRenderingHelper.colorTexture:null,shadowMap:a.shadowMap,shadowMappingEnabled:!!a.shadowMap&&a.shadowMap.enabled,ssaoEnabled:!!a.ssaoHelper&&a.ssaoHelper.enabled,pixelRatio:a.pixelRatio,slicePlane:a.sliceHelper&&a.sliceHelper.plane,cameraAboveGround:a.camera.aboveGround,hudVisibilityTexture:a.offscreenRenderingHelper?a.offscreenRenderingHelper.hudVisibilityTexture:null};b.bindVAO();for(b=0;b<this._levels.length;++b)this.renderLevel(a,c,g,a.isHighlightPass?this._highlightRenderInstanceData[b]:
this._renderInstanceData[b],b);return!0}};c.prototype.intersect=function(a,b,c,g,d){var m=this;if(this.baseMaterial.isVisible()){d=f.vec3f64.create();f.vec3.subtract(d,g,c);var e=function(d){m._instanceData.getCombinedModelTransform(d,H);a.setTransform(H);f.vec3.transformMat4(I,c,a.transformInverse);f.vec3.transformMat4(J,g,a.transformInverse);var e=m._instanceData.getState(d),h=m._instanceData.getLodLevel(d);v(e&k.StateFlags.ACTIVE,"invalid instance state");v(0<=h&&h<m._levels.length,"invaid lod level");
m._levels[h].intersect(a,b,I,J,d,m._instanceToMetadata)};this.baseMaterial.getParameterValues().verticalOffset?this.octree.forEach(e):this.octree.forEachAlongRay(c,d,e)}};c.prototype.queryDepthRange=function(a){return this.queryDepthRangeOctree(a)};c.prototype.notifyShaderTransformationChanged=function(){this.invalidateOctree()};c.prototype.requestUpdateCycle=function(a){void 0===a&&(a=!1);this._updateCyclesWithStaticCamera=-1;a&&(this._needFullCycle=!0)};c.prototype.needsUpdates=function(){return 0<
this._instanceData.size&&1>this._updateCyclesWithStaticCamera};c.prototype.runUpdates=function(a){if(!A.LOD_INSTANCE_RENDERER_DISABLE_UPDATES){if(this._enableLevelSelection){var b=a.equivalent(this._lastCamera);this._lastCamera.copyFrom(a);b||this.requestUpdateCycle()}b=this._needFullCycle?this._instanceData.size:2E3;this._needFullCycle=!1;this.updateInstances(a,b)}};Object.defineProperty(c.prototype,"octree",{get:function(){this._octree||(this._octree=this.buildOctree());return this._octree},enumerable:!0,
configurable:!0});c.prototype.invalidateOctree=function(){this._octree=null};c.prototype.buildOctree=function(){for(var a=new N.InstanceOctree(this._instanceData,this.baseBoundingSphere),b=this._instanceData,b=b.view?b.view.state:null,c=0;c<this._instanceData.capacity;++c)b.get(c)&k.StateFlags.ACTIVE&&a.addInstance(c);return a};c.prototype.queryDepthRangeOctree=function(a){var b=a.eye,c=a.viewForward,g=this.octree.findClosest(c,"front-to-back",a.frustum),d=this.octree.findClosest(c,"back-to-front",
a.frustum);return null!=g&&null!=d?(this._instanceData.view.boundingSphere.getVec(g,p),f.vec3.subtract(p,p,b),g=f.vec3.dot(p,c)-p[3],this._instanceData.view.boundingSphere.getVec(d,p),f.vec3.subtract(p,p,b),b=f.vec3.dot(p,c)+p[3],{near:Math.max(a.near,g),far:Math.min(a.far,b)}):{near:Infinity,far:-Infinity}};c.prototype.startUpdateCycle=function(){this._updateCyclesWithStaticCamera++;this._renderInstanceData.forEach(function(a){a.startUpdateCylce()});this._highlightRenderInstanceData.forEach(function(a){a.startUpdateCylce()})};
c.prototype.updateInstances=function(a,b){var c=this._enableLevelSelection,g=this._levelSelector;g.updateCamera(a);this._renderInstanceData.forEach(function(a){a.beginUpdate()});this._highlightRenderInstanceData.forEach(function(a){a.beginUpdate()});a=this._instanceData;var d=this._instanceData.view,h=a.capacity,e=this._instanceIndex;b=Math.min(a.size,b);for(var t=0;t<b;++t){0===e&&this.startUpdateCycle();var f=d.state.get(e),q=0;if(f&k.StateFlags.ALLOCATED){var l=d.lodLevel.get(e);f&k.StateFlags.ACTIVE&&
this._renderInstanceData[l].freeTail();f&k.StateFlags.HIGHLIGHT_ACTIVE&&this._highlightRenderInstanceData[l].freeTail();if(f&k.StateFlags.REMOVE)a.freeInstance(e);else if(f&k.StateFlags.VISIBLE){l=0;c&&(d.modelOrigin.getVec(e,K),l=g.selectLevel(K,a.getCombinedScaleFactor(e)));q=f&~(k.StateFlags.ACTIVE|k.StateFlags.HIGHLIGHT_ACTIVE|k.StateFlags.TRANSFORM_CHANGED);if(0<=l){var p=this._renderInstanceData[l],n=p.allocateHead();D(d,e,p.view,n);q|=k.StateFlags.ACTIVE;f&k.StateFlags.HIGHLIGHT&&(p=this._highlightRenderInstanceData[l],
n=p.allocateHead(),D(d,e,p.view,n),q|=k.StateFlags.HIGHLIGHT_ACTIVE)}d.state.set(e,q);d.lodLevel.set(e,l)}else q=f&~(k.StateFlags.ACTIVE|k.StateFlags.HIGHLIGHT_ACTIVE|k.StateFlags.TRANSFORM_CHANGED),d.state.set(e,q);this._octree&&(l=!!(f&k.StateFlags.ACTIVE),q=!!(q&k.StateFlags.ACTIVE),!l&&q?this._octree.addInstance(e):l&&!q?this._octree.removeInstance(e):l&&q&&f&k.StateFlags.TRANSFORM_CHANGED&&(this._octree.removeInstance(e),this._octree.addInstance(e)));e=(e+1)%h}else e=(e+1)%h,b++}this._instanceIndex=
e;this._renderInstanceData.forEach(function(a){a.endUpdate()});this._highlightRenderInstanceData.forEach(function(a){a.endUpdate()})};c.prototype.renderLevel=function(a,b,c,g,d){var h=this;this._levels[d].components.forEach(function(e){h.renderComponent(a,b,c,g,e,d)})};c.prototype.renderComponent=function(a,b,c,g,d,h){var e=d.glMaterials[a.pass];if(e&&e.beginSlot(b)&&e.isVisible&&0!==g.size){var f=a.rctx,k=f.capabilities.instancing,m=e.getDrawMode();c.origin=[0,0,0];2===b&&(a.stencilRenderingHelper.enabled=
!0,a.stencilRenderingHelper.prepareStencilWritePass());e.bind(f,c);f.bindVAO(d.vao);b=e.getProgram();w.assertCompatibleVertexAttributeLocations(d.vao,b);a.isHighlightPass&&(f.bindTexture(a.offscreenRenderingHelper?a.offscreenRenderingHelper.depthTexture:null,5),b.setUniform1i("depthTex",5),b.setUniform4f("highlightViewportPixelSz",0,0,1/c.viewport[2],1/c.viewport[3]));e.bindView(f,c);A.LOD_INSTANCE_RENDERER_COLORIZE_BY_LEVEL&&0===a.pass&&(b.setUniform4fv("externalColor",L[Math.min(h,L.length-1)]),
b.setUniform1i("colorMixMode",Q.colorMixModes.replace));a=g.capacity;h=g.headIndex;b=g.tailIndex;var l=g.firstIndex,p=this._glInstanceBufferLayout,n=function(a,b){w.bindVertexBufferLayout(f,x.Default3D,g.buffer,p,a);k.drawArraysInstanced(m,0,d.vertexCount,b-a);w.unbindVertexBufferLayout(f,x.Default3D,g.buffer,p)};d.material.getParams().transparent&&null!=l?h>b?(v(l>=b&&l<=h,"invalid firstIndex"),n(l,h),n(b,l)):h<b&&(l<=h?(v(0<=l&&l<=h,"invalid firstIndex"),n(l,h),n(b,a),n(0,l)):(v(l>=b&&l<=a,"invalid firstIndex"),
n(l,a),n(0,h),n(b,l))):h>b?n(b,h):h<b&&(n(0,h),n(b,a));f.bindVAO(null);e.release(f,c)}};return c}();r.LodRenderer=z;r.lodRenderers=[];var K=f.vec3f64.create(),p=f.vec4f64.create(),H=f.mat4f64.create(),I=f.vec3f64.create(),J=f.vec3f64.create(),L=[[1,0,1,1],[0,0,1,1],[0,1,0,1],[1,1,0,1],[1,0,0,1]]});