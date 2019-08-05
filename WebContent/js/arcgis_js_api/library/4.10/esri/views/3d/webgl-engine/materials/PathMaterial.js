// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/assignHelper ../../../../core/tsSupport/extendsHelper ../../../../core/libs/gl-matrix-2/gl-matrix ../../../../geometry/support/aaBoundingBox ../../support/buffer/BufferView ../../support/buffer/InterleavedLayout ../lib/GLMaterialTexture ../lib/Material ../lib/pathGeometryUtils ../lib/Util ../lib/Util ./VisualVariableMaterialParameters ./internal/bufferWriters ./internal/MaterialUtil ./internal/MaterialUtil ../shaders/PathPrograms".split(" "),function(P,
ja,Q,z,r,V,R,W,A,X,N,Y,h,Z,O,G,g,H){function B(e,c,a){a=c.slicePlaneEnabled?!1:c.cullFace?"none"!==c.cullFace:!c.transparent&&!c.doubleSided;a?(e.setFaceCullingEnabled(!0),"front"===c.cullFace?e.setCullFace(1028):e.setCullFace(1029)):e.setFaceCullingEnabled(!1)}function C(e,c){c.vvSizeEnabled&&(e.setUniform3fv("vvSizeMinSize",c.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",c.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",c.vvSizeOffset),e.setUniform3fv("vvSizeFactor",c.vvSizeFactor));c.vvColorEnabled&&
(e.setUniform1fv("vvColorValues",c.vvColorValues),e.setUniform4fv("vvColorColors",c.vvColorColors))}var L=Y.assert;P=function(e){function c(a,b){b=e.call(this,b)||this;b.supportsEdges=!0;b.params=g.copyParameters(a,aa);b.vertexBufferLayout=c.getVertexBufferLayout(b.params);b.bufferWriter=new ba(b.vertexBufferLayout);return b}z(c,e);c.prototype.isVisible=function(){var a=this.params;if(!e.prototype.isVisible.call(this)||0===a.layerOpacity)return!1;var b=a.vertexColors,f=a.symbolColors,c=a.vvColorEnabled,
g="replace"===a.colorMixMode,h=0<a.opacity,a=a.externalColor&&0<a.externalColor[3];return b&&(c||f)?g?!0:h:b?g?a:h:c||f?g?!0:h:g?a:h};c.prototype.getParams=function(){return this.params};c.prototype.getParameterValues=function(){return g.copyParameters(this.params)};c.prototype.setParameterValues=function(a){var b=this.params,f;for(f in a)"textureId"===f&&L(b.textureId,"Can only change texture of material that already has a texture"),"castShadows"===f&&L(a.castShadows===b.castShadows,"Can not change shadow casting behavior."),
"wireframe"===f&&L(b.wireframe,"wireframe flag affects drawmode (lines instead of triangles) and therefore can only be set during contruction"),!a[f]||"vvSizeMinSize"!==f&&"vvSizeMaxSize"!==f&&"vvSizeOffset"!==f&&"vvSizeFactor"!==f?b[f]=a[f]:r.vec3.set(b[f],a[f][0],a[f][1],a[f][2]);this.notifyDirty("matChanged")};c.prototype.intersectTriangles=function(a,b,f,c,e,h,k,l,E,z,L){var d=a[0],S=a[1];a=a[2];var D=b[0]-d,A=b[1]-S;b=b[2]-a;for(var p=Q({},this.params,{origin:ca,direction:da,auxpos2X:0});f<c;f++){var v=
z?z[f]:f,n=k.offsetIdx+k.strideIdx*e[3*v],w=k.offsetIdx+k.strideIdx*e[3*v+1],x=k.offsetIdx+k.strideIdx*e[3*v+2],t=l.offsetIdx+l.strideIdx*e[3*v],y=l.offsetIdx+l.strideIdx*e[3*v+1],I=l.offsetIdx+l.strideIdx*e[3*v+2],u=[0,0,0];if(p.vvSizeEnabled){var J=E.offsetIdx+E.strideIdx*h[3*v+1],m=E.offsetIdx+E.strideIdx*h[3*v+2];u[0]=E.data[E.offsetIdx+E.strideIdx*h[3*v]];u[1]=E.data[J];u[2]=E.data[m]}r.vec3.set(p.origin,k.data[n],k.data[n+1],k.data[n+2]);r.vec3.set(p.direction,l.data[t],l.data[t+1],l.data[t+
2]);p.auxpos2X=u[0];N.Builder.queryVertexPosition(q,p);m=q[0];t=q[1];n=q[2];r.vec3.set(p.origin,k.data[w],k.data[w+1],k.data[w+2]);r.vec3.set(p.direction,l.data[y],l.data[y+1],l.data[y+2]);p.auxpos2X=u[1];N.Builder.queryVertexPosition(q,p);J=q[0];y=q[1];w=q[2];r.vec3.set(p.origin,k.data[x],k.data[x+1],k.data[x+2]);r.vec3.set(p.direction,l.data[I],l.data[I+1],l.data[I+2]);p.auxpos2X=u[2];N.Builder.queryVertexPosition(q,p);var x=J-m,I=y-t,u=w-n,w=q[0]-m,y=q[1]-t,J=q[2]-n,F=A*J-y*b,G=b*w-J*D,H=D*y-w*
A,M=x*F+I*G+u*H,m=d-m,B=S-t,C=a-n,n=B*u-I*C,t=C*x-u*m,K=m*I-x*B;if(M>T){m=m*F+B*G+C*H;if(0>m||m>M)continue;F=D*n+A*t+b*K;if(0>F||m+F>M)continue}else if(M<-T){m=m*F+B*G+C*H;if(0<m||m<M)continue;F=D*n+A*t+b*K;if(0<F||m+F<M)continue}else continue;n=(w*n+y*t+J*K)/M;0<=n&&(x=g.computeNormal(x,I,u,w,y,J,ea),L(n,x,v))}};c.prototype.intersect=function(a,b,f,c,e,D,k,l){"triangle"===a.data.primitiveType&&(b=0,b=this.params.vvSizeEnabled?Math.max(this.params.vvSizeMaxSize[0],Math.max(this.params.vvSizeMaxSize[1],
this.params.vvSizeMaxSize[2])):this.params.size,b=V.fromValues(a.boundingInfo.bbMin[0]-b,a.boundingInfo.bbMin[1]-b,a.boundingInfo.bbMin[2]-b,a.boundingInfo.bbMax[0]+b,a.boundingInfo.bbMax[1]+b,a.boundingInfo.bbMax[2]+b),f=[D[0]-e[0],D[1]-e[1],D[2]-e[2]],l=Math.sqrt(f[0]*f[0]+f[1]*f[1]+f[2]*f[2]),g.intersectAabbInvDir(b,e,[l/f[0],l/f[1],l/f[2]],c.tolerance)&&this.intersectTriangles(e,D,0,a.data.indexCount/3,a.data.getIndices(h.VertexAttrConstants.POSITION),a.data.getIndices(h.VertexAttrConstants.AUXPOS2),
a.data.getAttribute(h.VertexAttrConstants.POSITION),a.data.getAttribute(h.VertexAttrConstants.AUXPOS1),a.data.getAttribute(h.VertexAttrConstants.AUXPOS2),null,k))};c.prototype.getGLMaterials=function(){return{color:fa,depth:U,depthShadowMap:this.params.castShadows?ga:null,normal:ha,highlight:ia}};c.prototype.getAllTextureIds=function(){return this.params.textureId?[this.params.textureId]:[]};c.getVertexBufferLayout=function(a){var b=W.newLayout().vec3f("position");b.vec4f(h.VertexAttrConstants.AUXPOS1);
a.groundNormalShading||(b=a.compressedNormals?b.vec2i16("normalCompressed",{glNormalized:!0}):b.vec3f("normal"));a.textureId&&(b=b.vec2f("uv0"),a.atlasRegions&&(b=b.vec4u16("region",{glNormalized:!0})));a.vertexColors&&(b=b.vec4u8("color"));a.symbolColors&&(b=b.vec4u8("symbolColor"));a.componentIndices&&(b=b.u16("componentIndex").u16("_padding",{glPadding:!0}));if(a.vvColorEnabled||a.vvSizeEnabled)b=b.vec4f(h.VertexAttrConstants.AUXPOS2);return b};return c}(X);var fa=function(e){function c(a,b,f){var c=
this,h=a.getParams(),c=e.call(this,a,b,f,h.textureId,h.textureInitTransparent)||this;c.params=g.copyParameters(h);a=c.params;c.slot=a.transparent?6:a.writeStencil?2:4;c.texturing=a.textureId?a.atlasRegions?"AtlasTextured":"Textured":"none";c._createPrograms();return c}z(c,e);c.prototype._createPrograms=function(){var a=this;this.programs=G.BindParametersMap.create(this.params,function(b){return a._createProgram(b)})};c.prototype._createProgram=function(a){var b=this.params;return this.programRep.getProgram(H.colorPass,
{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,vertexColors:b.vertexColors,symbolColors:b.symbolColors,flipV:b.flipV,doubleSided:b.doubleSided&&"normal"===b.doubleSidedType,windowOrderDoubleSided:b.doubleSided&&"winding-order"===b.doubleSidedType,receiveShadows:a.receiveShadows,receiveSSAO:a.receiveSSAO,vvSize:b.vvSizeEnabled,vvColor:b.vvColorEnabled,verticalOffset:null!==b.verticalOffset,screenSizePerspective:null!==b.screenSizePerspective,slice:b.slicePlaneEnabled,
groundNormalShading:b.groundNormalShading,compressedNormals:b.compressedNormals,componentColor:null!=b.componentColorBuffer,transparencyDiscard:b.transparent,alphaCoverageCorrection:K,wireframe:b.wireframe})};c.prototype.beginSlot=function(a){return a===this.slot};c.prototype.getProgram=function(){return this.program||this.getPrograms()[0]};c.prototype.getPrograms=function(){return G.BindParametersMap.programs(this.programs)};c.prototype.updateParameters=function(){this.params=this.material.getParameterValues();
this.slot=this.params.transparent?6:this.params.writeStencil?2:4;this.updateTexture(this.params.textureId);this._createPrograms()};c.prototype.bind=function(a,b){var c=this.params,d=this.program=G.BindParametersMap.lookup(this.programs,b);a.bindProgram(d);d.setUniform1f("size",c.size);d.setUniform3fv("ambient",c.ambient);d.setUniform3fv("diffuse",c.diffuse);d.setUniform3fv("specular",c.specular);d.setUniform4fv("externalColor",c.externalColor);d.setUniform1i("colorMixMode",g.colorMixModes[c.colorMixMode]);
d.setUniform1f("opacity",c.opacity);d.setUniform1f("layerOpacity",c.layerOpacity);g.bindVerticalOffset(c.verticalOffset,b,d);g.bindScreenSizePerspective(c.screenSizePerspective,b,d);C(d,c);this.bindTexture(a,d);"none"!==this.texturing&&this.bindTextureSize(a,d);a.setBlendFunctionSeparate(770,771,1,771);c.inverseWindingOrder&&a.setFrontFace(2304);c.transparent?(a.setBlendingEnabled(!0),c.blendModeOneOne?(a.setBlendFunction(1,1),a.setDepthWriteEnabled(!1)):a.setBlendFunctionSeparate(770,771,1,771)):
a.setBlendingEnabled(!1);c.polygonOffset&&(a.setPolygonOffsetFillEnabled(!0),a.setPolygonOffset(2,2));B(a,c,b);a.setDepthTestEnabled(!0);c.componentIndices&&c.componentColorBuffer&&(c.componentColorBuffer.updateTexture(),c.componentColorBuffer.bind(d,{texName:"uComponentColorTex",invDimName:"uComponentColorTexInvDim",unit:1}))};c.prototype.release=function(a,b){a.setPolygonOffsetFillEnabled(!1);a.setFaceCullingEnabled(!1);a.setBlendingEnabled(!1);a.setBlendFunctionSeparate(770,771,1,771);a.setDepthWriteEnabled(!0);
a.setFrontFace(2305)};c.prototype.bindView=function(a,b){a=this.program=G.BindParametersMap.lookup(this.programs,b);var c=this.params,d=b.origin;g.bindView(d,b.view,a);g.bindCamPos(d,b.viewInvTransp,a);c.slicePlaneEnabled&&g.bindSlicePlane(d,b.slicePlane,a);b.shadowMappingEnabled&&b.shadowMap.bindView(a,d)};c.prototype.bindInstance=function(a,b){a=this.program;a.setUniformMatrix4fv("model",b.transformation);a.setUniformMatrix4fv("modelNormal",b.transformationNormal)};c.prototype.getDrawMode=function(){return this.params.wireframe?
1:4};return c}(A),U=function(e){function c(a,b,c,d){void 0===d&&(d=!1);b=e.call(this,a,b,c,a.getParams().textureId)||this;b.params=g.copyParameters(a.getParams());b.texturing=a.bufferWriter.vertexBufferLayout.hasField("uv0")?b.params.atlasRegions?"AtlasTextured":"Textured":"none";b.biased=d;b.selectProgram();b.selectSlot();return b}z(c,e);c.prototype.beginSlot=function(a){return a===this.slot};c.prototype.getProgram=function(){return this.program};c.prototype.selectProgram=function(){this.program=
this.programRep.getProgram(H.depthPass,{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,flipV:this.params.flipV,shadowMap:this.biased,vvSize:this.params.vvSizeEnabled,verticalOffset:null!==this.params.verticalOffset,screenSizePerspective:null!==this.params.screenSizePerspective,slice:this.params.slicePlaneEnabled,transparencyDiscard:this.params.transparent,alphaCoverageCorrection:K})};c.prototype.selectSlot=function(){this.slot=this.params.transparent?6:this.params.writeStencil?
2:4};c.prototype.updateParameters=function(){this.params=this.material.getParameterValues();this.selectProgram();this.selectSlot();this.updateTexture(this.params.textureId)};c.prototype.bind=function(a,b){var c=this.program,d=this.params;a.bindProgram(c);c.setUniform1f("size",d.size);c.setUniform2fv("nearFar",b.nearFar);d.inverseWindingOrder&&a.setFrontFace(2304);g.bindVerticalOffset(d.verticalOffset,b,c);g.bindScreenSizePerspective(d.screenSizePerspective,b,c);C(c,d);this.bindTexture(a,c);B(a,d,
b);a.setDepthTestEnabled(!0)};c.prototype.release=function(a){var b=this.params;a.setFaceCullingEnabled(!1);b.inverseWindingOrder&&a.setFrontFace(2305)};c.prototype.bindView=function(a,b){a=this.program;var c=this.params,d=b.origin;g.bindView(d,b.view,a);c.slicePlaneEnabled&&g.bindSlicePlane(b.origin,b.slicePlane,a);c.screenSizePerspective&&g.bindCamPos(d,b.viewInvTransp,a)};c.prototype.bindInstance=function(a,b){this.program.setUniformMatrix4fv("model",b.transformation)};c.prototype.getDrawMode=
function(){return this.params.wireframe?1:4};return c}(A),ga=function(e){function c(a,b,c){return e.call(this,a,b,c,!0)||this}z(c,e);return c}(U),ha=function(e){function c(a,b,c,d){void 0===d&&(d=!1);b=e.call(this,a,b,c,a.getParams().textureId)||this;b.params=g.copyParameters(a.getParams());b.texturing=a.bufferWriter.vertexBufferLayout.hasField("uv0")?b.params.atlasRegions?"AtlasTextured":"Textured":"none";b.selectProgram();b.selectSlot();return b}z(c,e);c.prototype.beginSlot=function(a){return a===
this.slot};c.prototype.getProgram=function(){return this.program};c.prototype.selectProgram=function(){this.program=this.programRep.getProgram(H.normalPass,{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,flipV:this.params.flipV,vvSize:this.params.vvSizeEnabled,verticalOffset:null!==this.params.verticalOffset,screenSizePerspective:null!==this.params.screenSizePerspective,slice:this.params.slicePlaneEnabled,compressedNormals:this.params.compressedNormals,transparencyDiscard:this.params.transparent,
alphaCoverageCorrection:K})};c.prototype.selectSlot=function(){this.slot=this.params.transparent?6:this.params.writeStencil?2:4};c.prototype.updateParameters=function(){this.params=this.material.getParameterValues();this.selectProgram();this.selectSlot();this.updateTexture(this.params.textureId)};c.prototype.bind=function(a,b){var c=this.program,d=this.params;a.bindProgram(c);c.setUniform1f("size",d.size);this.bindTexture(a,c);g.bindVerticalOffset(d.verticalOffset,b,c);g.bindScreenSizePerspective(d.screenSizePerspective,
b,c);C(c,d);B(a,d,b);d.inverseWindingOrder&&a.setFrontFace(2304);a.setDepthTestEnabled(!0)};c.prototype.release=function(a){var b=this.params;a.setFaceCullingEnabled(!1);b.inverseWindingOrder&&a.setFrontFace(2305)};c.prototype.bindView=function(a,b){a=this.program;var c=this.params,d=b.origin;g.bindView(d,b.view,a);a.setUniformMatrix4fv("viewNormal",b.viewInvTransp);c.slicePlaneEnabled&&g.bindSlicePlane(b.origin,b.slicePlane,a);c.screenSizePerspective&&g.bindCamPos(d,b.viewInvTransp,a)};c.prototype.bindInstance=
function(a,b){a=this.program;a.setUniformMatrix4fv("model",b.transformation);a.setUniformMatrix4fv("modelNormal",b.transformationNormal)};c.prototype.getDrawMode=function(){return this.params.wireframe?1:4};return c}(A),ia=function(e){function c(a,b,c,d){void 0===d&&(d=!1);b=e.call(this,a,b,c,a.getParams().textureId)||this;b.params=g.copyParameters(a.getParams());b.texturing=a.bufferWriter.vertexBufferLayout.hasField("uv0")?b.params.atlasRegions?"AtlasTextured":"Textured":"none";b.selectProgram();
b.selectSlot();return b}z(c,e);c.prototype.beginSlot=function(a){return a===this.slot};c.prototype.getProgram=function(){return this.program};c.prototype.selectProgram=function(){this.program=this.programRep.getProgram(H.highlightPass,{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,flipV:this.params.flipV,vvSize:this.params.vvSizeEnabled,verticalOffset:null!==this.params.verticalOffset,screenSizePerspective:null!==this.params.screenSizePerspective,slice:this.params.slicePlaneEnabled,
transparencyDiscard:this.params.transparent,alphaCoverageCorrection:K})};c.prototype.selectSlot=function(){this.slot=this.params.transparent?6:this.params.writeStencil?2:4};c.prototype.updateParameters=function(){this.params=this.material.getParameterValues();this.selectProgram();this.selectSlot();this.updateTexture(this.params.textureId)};c.prototype.bind=function(a,b){var c=this.program,d=this.params;a.bindProgram(c);c.setUniform1f("size",d.size);this.bindTexture(a,c);g.bindVerticalOffset(d.verticalOffset,
b,c);g.bindScreenSizePerspective(d.screenSizePerspective,b,c);C(c,d);B(a,d,b);d.inverseWindingOrder&&a.setFrontFace(2304);a.setDepthTestEnabled(!0)};c.prototype.release=function(a){var b=this.params;a.setFaceCullingEnabled(!1);b.inverseWindingOrder&&a.setFrontFace(2304)};c.prototype.bindView=function(a,b){a=this.program;var c=this.params,d=b.origin;g.bindView(d,b.view,a);c.slicePlaneEnabled&&g.bindSlicePlane(b.origin,b.slicePlane,a);c.screenSizePerspective&&g.bindCamPos(d,b.viewInvTransp,a)};c.prototype.bindInstance=
function(a,b){a=this.program;a.setUniformMatrix4fv("model",b.transformation);a.setUniformMatrix4fv("modelNormal",b.transformationNormal)};c.prototype.getDrawMode=function(){return this.params.wireframe?1:4};return c}(A),aa=Q({size:1,wireframe:!1,textureId:void 0,textureInitTransparent:!1,ambient:[.2,.2,.2],diffuse:[.8,.8,.8],specular:[0,0,0],externalColor:[1,1,1,1],colorMixMode:"multiply",opacity:1,layerOpacity:1,blendModeOneOne:!1,inverseWindingOrder:!1,vertexColors:!1,symbolColors:!1,componentIndices:!1,
componentColorBuffer:null,flipV:!1,doubleSided:!1,doubleSidedType:"normal",cullFace:void 0,compressedNormals:!1,groundNormalShading:!1,writeStencil:!1,receiveSSAO:!0,castShadows:!0,verticalOffset:null,screenSizePerspective:null,slicePlaneEnabled:!1,transparent:!1,polygonOffset:!1,atlasRegions:!1},Z.Default),ba=function(){function e(c){this.vertexBufferLayout=c}e.prototype.allocate=function(c){return this.vertexBufferLayout.createBuffer(c)};e.prototype.elementCount=function(c){return c.indices.position.length};
e.prototype.write=function(c,a,b,e,d){if(h.VertexAttrConstants.AUXPOS1 in a.vertexAttr){var f=a.vertexAttr[h.VertexAttrConstants.AUXPOS1],g=a.indices[h.VertexAttrConstants.AUXPOS1];L(4===f.size);var k=e.getField(h.VertexAttrConstants.AUXPOS1,R.BufferViewVec4f);if(k)O.writeBufferVec4(g,f.data,k,d);else throw Error("unable to aquire view for "+h.VertexAttrConstants.AUXPOS1);}if(h.VertexAttrConstants.AUXPOS2 in a.vertexAttr)if(f=a.vertexAttr[h.VertexAttrConstants.AUXPOS2],g=a.indices[h.VertexAttrConstants.AUXPOS2],
L(4===f.size),k=e.getField(h.VertexAttrConstants.AUXPOS2,R.BufferViewVec4f))O.writeBufferVec4(g,f.data,k,d);else throw Error("unable to aquire view for "+h.VertexAttrConstants.AUXPOS2);O.writeDefaultAttributes(a,b,this.vertexBufferLayout,c.transformation,c.invTranspTransformation,e,d)};return e}(),K=!0,T=Math.pow(2,-52),q=r.vec3f64.create(),ca=r.vec3f64.create(),da=r.vec3f64.create(),ea=r.vec3f64.create();return P});