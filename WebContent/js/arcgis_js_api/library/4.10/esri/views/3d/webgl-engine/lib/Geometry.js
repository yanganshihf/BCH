// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ./BoundingInfo ./ComponentUtils ./geometryDataUtils ./IdGen ./Util ./Util".split(" "),function(y,z,r,t,u,w,x,h){return function(){function a(c,d,b){this.singleUse=!1;this._componentAABB=this._boundingInfo=null;this.id=a.__idGen.gen(d);this._data=c;this._boundingInfo=b}Object.defineProperty(a.prototype,"data",{get:function(){return this._data},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"componentCount",{get:function(){return t.componentCount(this.data.componentOffsets)},
enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"vertexCount",{get:function(){return this.data.indexCount},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"faceCount",{get:function(){return this.data.indexCount/3},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"boundingInfo",{get:function(){null==this._boundingInfo&&(this._boundingInfo=this._calculateBoundingInfo());return this._boundingInfo},enumerable:!0,configurable:!0});a.prototype.invalidateBoundingInfo=
function(){this._boundingInfo=null};a.prototype.getComponentAABB=function(c,d){null==this._componentAABB&&(this._componentAABB=this._computeComponentAABB());for(var b=0;6>b;b++)d[b]=this._componentAABB[6*c+b];return d};a.prototype._computeComponentAABB=function(){for(var c=this.componentCount,d=new Float32Array(6*c),b=0;b<c;b++)this._calculateAABB(b,d,6*b);return d};a.prototype._calculateAABB=function(c,d,b){void 0===b&&(b=0);var a=this.data.getIndices(h.VertexAttrConstants.POSITION),g=this.data.getAttribute(h.VertexAttrConstants.POSITION),
e=this.data.componentOffsets,r=e.length?e[c+1]:a.length,k=Infinity,l=Infinity,m=Infinity,n=-Infinity,p=-Infinity,q=-Infinity,t=g.offsetIdx,u=g.strideIdx;for(c=e.length?e[c]:0;c<r;c++)var f=t+u*a[c],e=g.data[f],v=g.data[f+1],f=g.data[f+2],k=Math.min(k,e),l=Math.min(l,v),m=Math.min(m,f),n=Math.max(n,e),p=Math.max(p,v),q=Math.max(q,f);d?(d[b]=k,d[b+1]=l,d[b+2]=m,d[b+3]=n,d[b+4]=p,d[b+5]=q):d=[k,l,m,n,p,q];return d};a.prototype._calculateBoundingInfo=function(){var c=this.data.getIndices(h.VertexAttrConstants.POSITION),
d=this.data.getAttribute(h.VertexAttrConstants.POSITION),b="triangle"===this.data.primitiveType?3:1;if(0===c.length)for(var c=new Uint32Array(b),a=0;a<b;++a)c[a]=a;a=c.length;x.assert(0===a%b);a=u.generateDefaultIndexArray(a/b);return new r(a,b,c,d)};a.__idGen=new w;return a}()});