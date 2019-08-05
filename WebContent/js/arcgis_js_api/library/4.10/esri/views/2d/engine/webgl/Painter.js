// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/assignHelper ../../../../core/has ../../../../core/libs/gl-matrix-2/gl-matrix ./BitBlitRenderer ./enums ./MaterialManager ./TextureManager ./Utils ./VertexStream ./brushes/WGLBrushInfo ./brushes/WGLBrushStencil ./brushes/WGLGeometryBrushFill ./brushes/WGLGeometryBrushLabel ./brushes/WGLGeometryBrushLine ./brushes/WGLGeometryBrushMarker ./brushes/WGLGeometryBrushText ./painter/WGLHighlightPainter ./shaders/RasterPrograms ../../../webgl/FramebufferObject ../../../webgl/programUtils".split(" "),
function(r,t,C,Q,g,D,f,E,F,m,G,H,I,J,v,K,L,M,N,w,x,y){Object.defineProperty(t,"__esModule",{value:!0});r=function(){function d(){this._initialized=!1}d.prototype.registerPass=function(a,c){this._initialize();for(var b=0;b<f.WGLDrawPhase.NUM_DRAW_PHASES-2;b++){var e=1<<b;e&c&&this._passMap.set(e,a)}return this};d.prototype.getPaintPassTs=function(a){this._initialize();return this._passMap.has(a)?[this._passMap.get(a)]:[]};d.prototype._initialize=function(){this._initialized||(this._passMap=new Map,
this._initialized=!0)};return d}();t.PainterOptions=r;var z=new Uint8Array(4*m.C_HITTEST_SEARCH_SIZE*m.C_HITTEST_SEARCH_SIZE),O=new Uint32Array(z.buffer);r=function(){function d(a){var c=this;this.context=a;this._hlPainter=new N;this._blitRenderer=new D;this._boundFBO=this._globalOpacityFBO=null;this.textureManager=new F;this.stencilRef=-1;this.drawImage=function(){var a=g.vec3f32.create();return function(b,d,n,h,B,l,p,P,r,u,t){var e=b.getViewport(),A=e.width,e=e.height,q,k=c._transform,m=c._quadVertexStream;
t===f.WGLDrawPhase.CLIP?(b.setStencilFunction(519,c.stencilRef,255),q=c._transformSolidProgram):(b.setStencilFunction(514,c.stencilRef,255),q=c._transformTextureProgram);q.setUniform1f("u_positionScale",m.positionScale);g.mat4.identity(k);g.mat4.scale(k,k,g.vec3.set(a,2*u/A,2*u/e,1));g.mat4.translate(k,k,g.vec3.set(a,n-A/2/u,-h+e/2/u,0));g.mat4.rotateZ(k,k,p);g.mat4.translate(k,k,g.vec3.set(a,B/2,-l/2,0));g.mat4.rotateZ(k,k,-P);g.mat4.scale(k,k,g.vec3.set(a,B/2,l/2,1));q.setUniformMatrix4fv("u_transform",
k);t!==f.WGLDrawPhase.CLIP&&(q.setUniform1f("u_texcoordScale",m.texcoordScale),b.bindTexture(d,0),q.setUniform1i("u_texture",0));q.setUniform1f("u_opacity",r);m.draw()}}();this.materialManager=new E(a);this._quadVertexStream=new G(a,[-32768,-32768,0,0,32767,-32768,32767,0,-32768,32767,0,32767,32767,32767,32767,32767],[0,1,2,1,3,2]);this._quadVertexStream.positionScale=1;this._quadVertexStream.texcoordScale=1;this._transformTextureProgram=y.createProgram(a,w.transformTexture);this._transformSolidProgram=
y.createProgram(a,w.transformSolid);this._transform=g.mat4f32.create()}d.prototype.dispose=function(){this.materialManager.dispose();this.textureManager.dispose();this._hlPainter&&(this._hlPainter.dispose(),this._hlPainter=null);this._blitRenderer&&(this._blitRenderer.dispose(),this._blitRenderer=null);this._globalOpacityFBO&&(this._globalOpacityFBO.dispose(),this._globalOpacityFBO=null);this._boundFBO=null;this._hittestFBO&&(this._hittestFBO.dispose(),this._hittestFBO=null);this._passes&&(this._passes.forEach(function(a){return a.dispose()}),
this._passes.clear());this._brushes&&(this._brushes.forEach(function(a){return a.forEach(function(a){return a.dispose()})}),this._brushes.clear());this._geometryBrushes&&(this._geometryBrushes.forEach(function(a){return a.dispose()}),this._geometryBrushes.clear());this._quadVertexStream.dispose()};d.prototype.getBrushes=function(a){if(a===f.WGLDrawPhase.MAP)throw Error("Painter: Tried to get brush for the MAP phase; use a specific geometry type and call getMapBrush() instead.");if(!this._brushes){var c=
[this.getGeometryBrush(f.WGLGeometryType.FILL),this.getGeometryBrush(f.WGLGeometryType.LINE),this.getGeometryBrush(f.WGLGeometryType.MARKER),this.getGeometryBrush(f.WGLGeometryType.TEXT)],b=new v.default,e=new H.default,d=new I.default;this._brushes=new Map;this._brushes.set(f.WGLDrawPhase.LABEL,[b]);this._brushes.set(f.WGLDrawPhase.LABEL_ALPHA,[b]);this._brushes.set(f.WGLDrawPhase.HITTEST,c);this._brushes.set(f.WGLDrawPhase.HIGHLIGHT,c);this._brushes.set(f.WGLDrawPhase.CLIP,[d]);this._brushes.set(f.WGLDrawPhase.DEBUG,
[e])}if(!this._brushes.has(a))throw Error("Painter: Tried to get brush for unknown phase: "+a);return this._brushes.get(a)};d.prototype.getGeometryBrush=function(a){if(!this._geometryBrushes){var c=new J.default,b=new K.default,e=new L.default,d=new M.default,n=new v.default;this._geometryBrushes=new Map;this._geometryBrushes.set(f.WGLGeometryType.FILL,c);this._geometryBrushes.set(f.WGLGeometryType.LINE,b);this._geometryBrushes.set(f.WGLGeometryType.MARKER,e);this._geometryBrushes.set(f.WGLGeometryType.TEXT,
d);this._geometryBrushes.set(f.WGLGeometryType.LABEL,n)}return this._geometryBrushes.get(a)};d.prototype.draw=function(a,c,b,e){this._setGlobalOpacity(a,b);0===(b&(f.WGLDrawPhase.LABEL_ALPHA|f.WGLDrawPhase.LABEL))&&this._drawClippingRects(a,c);var d=this.context;d.setBlendingEnabled(!0);d.setStencilWriteMask(0);d.setBlendFunctionSeparate(1,771,1,771);this._drawPhases(a,c,b,e);this._applyGlobalOpacity(a,b);this._debugTiles(a,c)};d.prototype.setHighlightOptions=function(a){this._hlPainter.setHighlightOptions(a)};
d.prototype.highlight=function(a,c){var b=this.context,e=b.getViewport();this._hlPainter.setup(b,e.width,e.height);this._hlPainter.startMaskDraw(b);this._drawClippingRects(a,c);b.setBlendingEnabled(!0);b.setStencilWriteMask(0);b.setBlendFunctionSeparate(1,771,1,771);this._drawPhases(a,c,f.WGLDrawPhase.HIGHLIGHT);this._hlPainter.draw(b)};d.prototype.hitTest=function(a,c){var b=this.context,e=m.C_HITTEST_SEARCH_SIZE,d=[0,0],n=[0,0],h=a.state;h.toMap(d,[0,0]);h.toMap(n,[e,e]);if(0===c.filter(function(a){return!(d[0]>
a.bounds[2]||n[0]<a.bounds[0]||d[1]<a.bounds[1]||n[1]>a.bounds[3])}).length)return[];this._hittestFBO||(this._hittestFBO=x.create(b,{colorTarget:0,depthStencilTarget:3,width:e,height:e}));var h=b.getViewport(),g=b.getBoundFramebufferObject();b.bindFramebuffer(this._hittestFBO);b.setViewport(0,0,e,e);this._drawClippingRects(a,c);var l=b.gl;b.setClearColor(1,1,1,1);b.clear(l.COLOR_BUFFER_BIT);b.setBlendingEnabled(!1);b.setStencilWriteMask(0);this._drawPhases(a,c,f.WGLDrawPhase.HITTEST);b.setBlendingEnabled(!0);
this._hittestFBO.readPixels(0,0,e,e,6408,5121,z);a=e*e;c=new Set;for(e=0;e<a;e++)l=O[e],4294967295!==l&&c.add(l);b.bindFramebuffer(g);b.setViewport(h.x,h.y,h.width,h.height);var p=[];c.forEach(function(a){p.push(a)});return p};d.prototype.startStencilBurn=function(){this.context.setStencilTestEnabled(!0);this.context.setStencilWriteMask(255);this.context.setClearStencil(0);this.context.clear(this.context.gl.STENCIL_BUFFER_BIT);this.context.setStencilOp(7680,7680,7681);this.context.setColorMask(!1,
!1,!1,!1);this.context.setBlendingEnabled(!1);this._quadVertexStream.bind();this.context.bindProgram(this._transformSolidProgram)};d.prototype.startStencilDraw=function(){this.context.setStencilWriteMask(0);this.context.setStencilOp(7680,7680,7680);this.context.setColorMask(!0,!0,!0,!0);this.context.setBlendingEnabled(!0);this.context.setBlendFunction(1,771);this._quadVertexStream.bind();this.context.bindProgram(this._transformTextureProgram)};d.prototype.endStencilDraw=function(){this.context.setStencilTestEnabled(!1);
this._quadVertexStream.unbind();this.context.bindProgram()};d.prototype._getPaintPass=function(a){this._passes||(this._passes=new Map);if(!this._passes.has(a))try{this._passes.set(a,new a)}catch(c){throw Error("Tried to instantiate WGLPaintPass with unknown constructor: "+a+",\n"+c);}return this._passes.get(a)};d.prototype._getPaintPasses=function(a,c){var b=this;return c.getPaintPassTs(a).map(function(a){return b._getPaintPass(a)})};d.prototype._drawPhases=function(a,c,b,e){var d=this.context;d.setStencilTestEnabled(!0);
for(var g=0;g<f.WGLDrawPhase.NUM_DRAW_PHASES-2;g++){var h=1<<g;if(h&b){var m=e?this._getPaintPasses(h,e):[],h=C({},a,{drawPhase:h});m.forEach(function(b){return b.preRender(a,a.rendererInfo)});for(var l=0,p=c;l<p.length;l++)p[l].doRender(h);m.reverse().forEach(function(b){return b.postRender(a,a.rendererInfo)})}}d.setStencilTestEnabled(!1)};d.prototype._debugTiles=function(a,c){};d.prototype._drawClippingRects=function(a,c){if(0!==c.length){var b=this.context;b.setDepthWriteEnabled(!1);b.setDepthTestEnabled(!1);
b.setStencilTestEnabled(!0);b.setBlendingEnabled(!1);b.setColorMask(!1,!1,!1,!1);b.setStencilOp(7680,7680,7681);b.setClearStencil(0);b.clear(b.gl.STENCIL_BUFFER_BIT);b.setStencilWriteMask(255);for(var e=0,d=c.length;e<c.length;e++,d--){var g=c[e];g.attached&&(g.stencilRef=d)}this._drawPhases(a,c,f.WGLDrawPhase.CLIP);b.setColorMask(!0,!0,!0,!0)}};d.prototype._setGlobalOpacity=function(a,c){if(c===f.WGLDrawPhase.MAP&&1!==a.globalOpacity){c=a.context;var b=a.pixelRatio,d=a.state.size;a=Math.round(d[0]*
b);b=Math.round(d[1]*b);if(null===this._globalOpacityFBO||this._globalOpacityFBO.width!==a||this._globalOpacityFBO.height!==b)null!==this._globalOpacityFBO&&this._globalOpacityFBO.dispose(),this._globalOpacityFBO=x.create(c,{colorTarget:0,depthStencilTarget:3,width:a,height:b});this._boundFBO=c.getBoundFramebufferObject();c.bindFramebuffer(this._globalOpacityFBO);c.setDepthWriteEnabled(!0);c.setStencilWriteMask(255);c.setClearColor(0,0,0,0);c.setClearDepth(1);c.setClearStencil(0);c.clear(c.gl.COLOR_BUFFER_BIT|
c.gl.DEPTH_BUFFER_BIT|c.gl.STENCIL_BUFFER_BIT);c.setDepthWriteEnabled(!1)}};d.prototype._applyGlobalOpacity=function(a,c){c===f.WGLDrawPhase.MAP&&1!==a.globalOpacity&&(c=a.context,c.bindFramebuffer(this._boundFBO),this._blitRenderer.render(c,this._globalOpacityFBO.colorTexture,9728,a.globalOpacity),this._boundFBO=null)};return d}();t.default=r});