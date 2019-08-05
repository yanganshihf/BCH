// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ./MemoryRequirements ./TileBufferData ./TileDisplayData ./Utils ./Utils ./WGLDisplayObject ./WGLDisplayRecord ./mesh/VertexBuffer ./mesh/factories/MaterialStore ./util/Reader ./util/serializationUtils ./util/Writer".split(" "),function(G,H,p,t,u,y,v,z,A,B,C,w,D,E){var r=new p.default,n=new p.default;return function(){function h(){this.tileBufferData=this.tileDisplayData=null}h.prototype.reshuffle=function(){r.reset();var b=u.groupRecordsByGeometryType(this.tileDisplayData.displayObjects),
a;for(a in b)for(var c=b[a],d=0,f=c;d<f.length;d++){var e=f[d];r.needMore(e.geometryType,e.meshData?e.meshData.vertexCount:e.vertexCount,e.meshData?e.meshData.indexData.length:e.indexCount)}f=b.length;d=new t;for(a=0;a<f;++a){d.geometries[a].indexBuffer=new Uint32Array(Math.round(1.15*r.indicesFor(a)));var e=[],g;for(g in this.tileBufferData.geometries[a].vertexBuffer)e.push(this.tileBufferData.geometries[a].vertexBuffer[g].stride);var e=h._computeVertexAlignment(e),c=Math.round(1.15*r.verticesFor(a)),
e=h._align(c,e),k;for(k in this.tileBufferData.geometries[a].vertexBuffer)c=this.tileBufferData.geometries[a].vertexBuffer[k].stride,d.geometries[a].vertexBuffer[k]={stride:c,data:v.allocateTypedArrayBuffer(e,c)}}n.reset();this.tileDisplayData.displayList.clear();for(a=0;a<f;++a){c=b[a];g=0;for(k=c;g<k.length;g++){e=k[g];if(e.meshData)e.writeMeshDataToBuffers(n.verticesFor(a),d.geometries[a].vertexBuffer,n.indicesFor(a),d.geometries[a].indexBuffer),e.meshData=null;else{var m=this.tileBufferData.geometries[a].vertexBuffer,
l=this.tileBufferData.geometries[a].indexBuffer,F=d.geometries[a].vertexBuffer,q=d.geometries[a].indexBuffer,x=n.verticesFor(a),p=n.indicesFor(a);y.copyMeshData(x,p,F,q,e,m,l);e.vertexFrom=x;e.indexFrom=p}n.needMore(a,e.vertexCount,e.indexCount)}this.tileDisplayData.displayList.unified||this.tileDisplayData.displayList.addToList(c)}if(this.tileDisplayData.displayList.unified)for(b=0,a=this.tileDisplayData.displayObjects;b<a.length;b++)this.tileDisplayData.displayList.addToList(a[b].displayRecords);
this.tileBufferData=d};h.prototype.getStrides=function(){for(var b=[],a=0;a<this.tileBufferData.geometries.length;++a){var c=this.tileBufferData.geometries[a];b[a]={};for(var d in c.vertexBuffer)b[a][d]=c.vertexBuffer[d].stride}return b};h.prototype._guessSize=function(){for(var b=this.tileDisplayData.displayObjects,a=Math.min(b.length,4),c=0,d=0;d<a;d++)c=Math.max(c,b[d].displayRecords.length);return 2*(12*b.length+b.length*c*40)};h.prototype.serialize=function(){var b=this.tileBufferData.serialize(),
a=this.tileBufferData.getBuffers(),c=this.tileDisplayData.serialize(new E.default(Int32Array,this._guessSize())).buffer();a.push(c);return{result:{displayData:c,bufferData:b},transferList:a}};h.decode=function(b){var a=C.default.deserialize(new w.default(b.materialStore)),c=D.deserializeList(new w.default(b.displayObjects),z,{store:a}),d={},f;for(f in b.vertexBuffersMap)d[f]=B.VertexBuffers.decode(b.vertexBuffersMap[f]);return h.fromMeshData({materials:a,displayObjects:c,vertexBuffersMap:d},!1)};
h.fromMeshData=function(b,a){void 0===a&&(a=!0);var c=new h,d=new u.default,f=new t;d.displayObjects=b.displayObjects;a&&b.materials.hydrateObjects(d.displayObjects);for(var e in b.vertexBuffersMap)a=b.vertexBuffersMap[e],f.geometries[e].indexBuffer=a.indexBuffer,f.geometries[e].vertexBuffer=a.namedBuffers;c.tileDisplayData=d;c.tileBufferData=f;return c};h.bind=function(b,a){var c=new h;c.tileDisplayData=b;c.tileBufferData=a;return c};h.create=function(b,a){var c=new h;c.tileDisplayData=new u.default;
c.tileDisplayData.displayObjects=b;for(var d=[0,0,0,0,0],f=[0,0,0,0,0],e=[[],[],[],[],[]],g=0;g<b.length;g++)for(var k=0,m=b[g].displayRecords;k<m.length;k++){var l=m[k];e[l.geometryType].push(l);d[l.geometryType]+=l.meshData.vertexCount;f[l.geometryType]+=l.meshData.indexData.length}b=new t;a=[a.fill||{},a.line||{},a.icon||{},a.text||{},a.label||{}];for(g=0;5>g;g++){var k=new Uint32Array(f[g]),m=a[g],l=d[g],n={},q=void 0;for(q in m){var p={data:v.allocateTypedArrayBuffer(l,m[q]),stride:m[q]};n[q]=
p}m=n;A.writeAllMeshDataToBuffers(e[g],m,k);b.geometries[g]={indexBuffer:k,vertexBuffer:m}}c.tileBufferData=b;return c};h._align=function(b,a){var c=b%a;return 0===c?b:b+(a-c)};h._computeVertexAlignment=function(b){for(var a=!1,c=!1,d=0;d<b.length;d++){var f=b[d];2===f%4?a=!0:0!==f%4&&(c=!0)}return c?4:a?2:1};return h}()});