// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","./Utils","../../../webgl/BufferObject"],function(g,h,k,l){Object.defineProperty(h,"__esModule",{value:!0});g=function(){function d(a){this.geometryMap=k.createGeometryData(function(b){return{indexBuffer:l.createIndex(a,35044),vao:null}},function(b,c){return{vertexBuffer:l.createVertex(a,k.C_VBO_INFO[c])}})}d.prototype.dispose=function(){for(var a in this.geometryMap){var b=this.geometryMap[a];b.data.vao&&b.data.vao.dispose(!1);b.data.indexBuffer&&b.data.indexBuffer.dispose();
for(var c in b.buffers)b.buffers[c]&&b.buffers[c].data.vertexBuffer.dispose()}};d.prototype.get=function(a){var b=this.geometryMap[a];a={};for(var c in b.buffers)a[c]=b.buffers[c].data.vertexBuffer;return{indexBuffer:b.data.indexBuffer,get vao(){return b.data.vao},set vao(a){b.data.vao=a},vertexBufferMap:a}};d.prototype.has=function(a){return null!=this.geometryMap[a]};d.prototype.upload=function(a,b){var c=this;b.forEach(function(b,e){c._upload(b,e,a)})};d.prototype._upload=function(a,b,c){a.indices&&
(a.indices.allDirty?this._uploadIndices(c,b):null!=a.indices.from&&null!=a.indices.count&&this._uploadIndices(c,b,a.indices.from,a.indices.count));if(a.vertices){a=a.vertices;for(var f in a){var e=a[f];e.allDirty?this._uploadVertices(c,b,f):null!=e.from&&null!=e.count&&this._uploadVertices(c,b,f,e.from,e.count)}}};d.prototype._uploadVertices=function(a,b,c,f,e){var d=this.geometryMap[b];d&&(b=a.geometries[b].vertexBuffer[c])&&(a=b.stride,b=b.data.buffer,d.buffers[c]&&0<b.byteLength&&(null!=f&&null!=
e?d.buffers[c].data.vertexBuffer.setSubData(b,f*a,f*a,(f+e)*a):d.buffers[c].data.vertexBuffer.setData(b)))};d.prototype._uploadIndices=function(a,b,c,d){var e=this.geometryMap[b];e&&(a=a.geometries[b].indexBuffer.buffer,e.data.indexBuffer&&0<a.byteLength&&(null!=c&&null!=d?e.data.indexBuffer.setSubData(a,4*c,4*c,4*(c+d)):e.data.indexBuffer.setData(a)))};return d}();h.default=g});