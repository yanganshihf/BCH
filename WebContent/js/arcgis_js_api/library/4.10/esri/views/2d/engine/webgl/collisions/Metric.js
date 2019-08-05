// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/Logger ../../../../../core/libs/gl-matrix-2/gl-matrix ../definitions ./BoundingBox ../util/serializationUtils".split(" "),function(h,k,l,m,f,q,r){Object.defineProperty(k,"__esModule",{value:!0});var n=l.getLogger("esri/views/2d/engine/webgl/collisions/Metric");h=function(){function e(a,b,c,d,g){this.id=a;this.range=b;this.boxes=null;this.minZoom=-1;this.offsetY=this.offsetX=this.directionY=this.directionX=this.size=this.vv=0;this.anchor=m.vec2f32.fromValues(c,
d);this.baseZoom=g}e.prototype.add=function(a){this.bounds?(this.boxes?this.boxes.push(a):(this.boxes=[this.bounds,a],this.bounds=this.bounds.clone()),this.bounds.extend(a)):this.bounds=a};e.prototype.computeIndex=function(){var a=this.bounds,b=this.anchor[0],c=this.anchor[1],d=Math.floor(b/f.COLLISION_BUCKET_SIZE),g=Math.floor(c/f.COLLISION_BUCKET_SIZE),e=0;if(d>f.COLLISION_TILE_BOX_SIZE||g>f.COLLISION_TILE_BOX_SIZE)g=d=f.COLLISION_TILE_BOX_SIZE,e=1;if(0>d||0>g)g=d=0,e=1;a=2*Math.max(a.halfWidth+
Math.abs(a.center[0]),a.halfHeight+Math.abs(a.center[1]));b%=f.COLLISION_BUCKET_SIZE;c%=f.COLLISION_BUCKET_SIZE;this.xBucket=d;this.yBucket=g;this.xOverflow=Math.ceil(Math.abs((a-b)/f.COLLISION_BUCKET_SIZE))+e;this.yOverflow=Math.ceil(Math.abs((a-c)/f.COLLISION_BUCKET_SIZE))+e};e.prototype.findCollisionDelta=function(a){var b=this.bounds.findCollisionDelta(a.bounds),c=this.boxes&&this.boxes.length,d=a.boxes&&a.boxes.length;return Math.abs(b)>f.COLLISION_MAX_ZOOM_DELTA||!c&&!d?b:c&&d?this._boxesToBoxes(a):
c?this._boxesToBox(a):this._boxToBoxes(a)};e.prototype.computeOffset=function(a){a||n.error("mapview-labeling","Unable to compute label offset. Expected an evaluator function but found "+a);a=a(this.vv);a=isNaN(this.vv)||isNaN(a)?this.size:a;this.offsetX=this.directionX*(a/2+f.COLLISION_PLACEMENT_PADDING);this.offsetY=this.directionY*(a/2+f.COLLISION_PLACEMENT_PADDING)};e.prototype.setVV=function(a,b,c,d){this.vv=a;this.size=b;this.directionX=c;this.directionY=d};e.prototype._boxToBoxes=function(a){var b=
-Infinity,c=0;for(a=a.boxes;c<a.length;c++)var d=this.bounds.findCollisionDelta(a[c]),b=Math.max(d,b);return b};e.prototype._boxesToBox=function(a){for(var b=this.boxes[0].findCollisionDelta(a.bounds),c=1;c<this.boxes.length;c++)var d=this.boxes[c].findCollisionDelta(a.bounds),b=Math.max(d,b);return b};e.prototype._boxesToBoxes=function(a){for(var b=-Infinity,c=0;c<this.boxes.length;c++)for(var d=this.boxes[c],e=0,f=a.boxes;e<f.length;e++)var p=d.findCollisionDelta(f[e]),b=Math.max(p,b);return b};
e.prototype.serialize=function(a){a.push(this.id);this.bounds.serialize(a);a.push(this.range.from);a.push(this.range.count);a.push(this.anchor[0]);a.push(this.anchor[1]);a.push(this.baseZoom);a.writeF32(this.vv);a.push(this.size);a.push(this.directionX);a.push(this.directionY);a.push(this.offsetX);a.push(this.offsetY);r.serializeList(a,this.boxes);return a};e.deserialize=function(a){var b=a.readInt32(),c=q.default.deserialize(a),d=a.readInt32(),f=a.readInt32(),h={from:d,count:f},p=a.readInt32(),k=
a.readInt32(),l=a.readInt32(),d=a.readF32(),f=a.readInt32(),m=a.readInt32(),n=a.readInt32(),t=a.readInt32(),u=a.readInt32();a=r.deserializeList(a,q.default);b=new e(b,h,p,k,l);b.bounds=c;b.boxes=a;b.computeIndex();b.setVV(d,f,m,n);b.offsetX=t;b.offsetY=u;return b};return e}();k.default=h});