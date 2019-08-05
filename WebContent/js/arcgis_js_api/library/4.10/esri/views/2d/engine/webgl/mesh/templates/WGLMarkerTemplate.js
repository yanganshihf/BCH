// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../../core/tsSupport/extendsHelper ../../../../../../core/Logger ../../../../../../core/screenUtils ../../../../../../core/libs/gl-matrix-2/gl-matrix ../../color ../../definitions ../../enums ../../number ../../WGLDisplayRecord ./WGLMeshTemplate".split(" "),function(v,y,B,C,t,p,z,D,w,u,E,F){Object.defineProperty(y,"__esModule",{value:!0});var A=C.getLogger("esri.views.2d.engine.webgl.WGLMeshTemplate");v=function(v){function d(c,a,b,q,g,k,e,h,l,x,n){var m=v.call(this)||
this;m.geometryType=w.WGLGeometryType.MARKER;var f=p.vec2f32.create(),r=p.mat2df32.create();e=0===e?0:Math.max(e,2);h=0===h?0:Math.max(h,2);var d=n.sdf?.5:1;p.mat2d.translate(r,r,p.vec2f32.fromValues(d*b,d*-q));g&&p.mat2d.rotate(r,r,3.14159265359/180*g);m._materialStore=c;m.vvFlags=a;m._materialId=c.createSpriteMaterial(n,m.geometryType,a);m._fillColor=k;m._outlineColor=l;m._sizeOutlineWidth=u.i8888to32(e,h,x,0);c=Math.round(n.rect.x/4)-128;a=Math.round(n.rect.y/4)-128;g=c+Math.round(n.rect.width/
4);n=a+Math.round(n.rect.height/4);p.vec2.set(f,-.5*e,-.5*h);p.vec2.transformMat2d(f,f,r);m._offsetAndTexUpperLeft=u.i8888to32(f[0],f[1],c,a);p.vec2.set(f,.5*e,-.5*h);p.vec2.transformMat2d(f,f,r);m._offsetAndTexUpperRight=u.i8888to32(f[0],f[1],g,a);p.vec2.set(f,-.5*e,.5*h);p.vec2.transformMat2d(f,f,r);m._offsetAndTexBottomLeft=u.i8888to32(f[0],f[1],c,n);p.vec2.set(f,.5*e,.5*h);p.vec2.transformMat2d(f,f,r);m._offsetAndTexBottomRight=u.i8888to32(f[0],f[1],g,n);m.height=h;m.width=e;m.xOffset=b;m.yOffset=
q;return m}B(d,v);d.fromPictureMarker=function(c,a,b,q,g){g=Math.round(t.pt2px(b.width));var k=Math.round(t.pt2px(b.height)),e=D.PICTURE_FILL_COLOR,h=Math.round(t.pt2px(b.xoffset||0)),l=Math.round(t.pt2px(b.yoffset||0));return new d(c,a,h,l,b.angle,e,g,k,0,0,q)};d.fromSimpleMarker=function(c,a,b,q,g){g=z.premultiplyAlphaRGBA(b.color);var k=Math.round(t.pt2px(b.size)),e=Math.round(t.pt2px(b.xoffset||0)),h=Math.round(t.pt2px(b.yoffset||0)),l=b.outline,x=(l&&l.color&&z.premultiplyAlphaRGBA(l.color))|
0,l=(l&&l.width&&Math.round(t.pt2px(l.width)))|0;return new d(c,a,e,h,b.angle,g,k,k,x,l,q)};d.prototype.writeMesh=function(c,a,b,q,g,k,e){k=this._materialStore.get(this._materialId);var h=a.indexVector,l=a.get("geometry");a=a.get("visibility");var d=new E(q,this.geometryType,this._materialId),n=this._getOffset(l,k);c.push(d);d.vertexFrom=n;d.indexFrom=h.length;switch(b){case "esriGeometryPoint":b=g.geometry;c=b.x;b=b.y;this._writeVertices(d,l,a,q,this._getPos(c,b),k,e);this._writeIndices(d,h,n);break;
case "esriGeometryPolyline":this._writeMany(d,h,l,a,n,q,g.geometry.paths[0],k,e);break;case "esriGeometryPolygon":(b=g.centroid)?(c=b.x,b=b.y,this._writeVertices(d,l,a,q,this._getPos(c,b),k,e),this._writeIndices(d,h,n)):A.error("Tried to render polygon geometries as markers, but found no centroid!");break;case "esriGeometryMultipoint":this._writeMany(d,h,l,a,n,q,g.geometry.points,k,e);break;default:A.error("Unable to handle geometryType: "+b)}};d.prototype._getPos=function(c,a){return u.i1616to32(c,
a)};d.prototype._writeMany=function(c,a,b,d,g,k,e,h,l){for(var q=0,n=0,m=0,f=0;f<e.length;f++){var r=e[f],p=r[0],r=r[1];this._writeVertices(c,b,d,k,this._getPos(p+q,r+n),h,l);this._writeIndices(c,a,g+m);q+=p;n+=r;m+=4}};d.prototype._getOffset=function(c,a){a=a.materialKeyInfo.hasVV()?10:6;return c.length/a};d.prototype._writeVertices=function(c,a,b,d,g,k,e){a.push(g);a.push(this._offsetAndTexUpperLeft);a.push(d);a.push(this._fillColor);a.push(this._outlineColor);a.push(this._sizeOutlineWidth);this._writeVV(a,
e,k);b.push(255);a.push(g);a.push(this._offsetAndTexUpperRight);a.push(d);a.push(this._fillColor);a.push(this._outlineColor);a.push(this._sizeOutlineWidth);this._writeVV(a,e,k);b.push(255);a.push(g);a.push(this._offsetAndTexBottomLeft);a.push(d);a.push(this._fillColor);a.push(this._outlineColor);a.push(this._sizeOutlineWidth);this._writeVV(a,e,k);b.push(255);a.push(g);a.push(this._offsetAndTexBottomRight);a.push(d);a.push(this._fillColor);a.push(this._outlineColor);a.push(this._sizeOutlineWidth);
this._writeVV(a,e,k);b.push(255);c.vertexCount+=4};d.prototype._writeVV=function(c,a,b){b.materialKeyInfo.hasVV()&&(c.push(a[w.VVType.SIZE]),c.push(a[w.VVType.COLOR]),c.push(a[w.VVType.OPACITY]),c.push(a[w.VVType.ROTATION]))};d.prototype._writeIndices=function(c,a,b){a.push(b+0);a.push(b+1);a.push(b+2);a.push(b+1);a.push(b+3);a.push(b+2);c.indexCount+=6};return d}(F.default);y.default=v});