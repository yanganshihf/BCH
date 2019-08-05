// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/ObjectPool ../../../core/libs/gl-matrix-2/gl-matrix ../support/earthUtils ../support/geometryUtils ../support/mathUtils ./Tile ./TileGeometryFactory".split(" "),function(u,v,n,q,f,g,k,p,r,t){function l(f,c,a,b){a=g.earthRadius+a;var d=Math.cos(f);b[0]=Math.cos(c)*d*a;b[1]=Math.sin(c)*d*a;b[2]=Math.sin(f)*a}return function(m){function c(a,b,d,e){var h=m.call(this,c.NumSubdivisionsAtLevel)||this;h.obb=[];h.isWebMercator=!1;
h.tileUp=f.vec3f64.create();h.obb=Array(8);for(var g=0;8>g;g++)h.obb[g]=f.vec3f64.create();void 0!==a&&h.init(a,b,d,e);return h}n(c,m);c.prototype.init=function(a,b,d,e){m.prototype.init.call(this,a,b,d,e);this.isWebMercator=e.spatialReference.isWebMercator;b=this.extentWGS84Rad[0];d=this.extentWGS84Rad[1];e=this.extentWGS84Rad[2];var c=this.extentWGS84Rad[3];a=a[0];var k=p.lerp(d,c,.5),n=p.lerp(b,e,.5);this.edgeLen=(e-b)*Math.cos(0===a?0:Math.min(Math.abs(d),Math.abs(c)))*g.earthRadius;this.edgeLen2=
this.edgeLen*this.edgeLen;this.curvatureHeight=g.earthRadius-Math.sqrt(g.earthRadius*g.earthRadius-this.edgeLen2/4);l(k,n,0,this.centerAtSeaLevel);f.vec3.copy(this.tileUp,this.centerAtSeaLevel);f.vec3.normalize(this.tileUp,this.tileUp);this._updateOBB();this.updateRadiusAndCenter()};c.prototype.updateRadiusAndCenter=function(){if(0===this.lij[0])f.vec3.set(this.center,0,0,0),this.radius=g.earthRadius+this.elevationBounds[1];else{m.prototype.updateRadiusAndCenter.call(this);var a=Math.max(f.vec3.squaredDistance(this.center,
this.obb[0]),f.vec3.squaredDistance(this.center,this.obb[1]));this.radius=Math.sqrt(a)}};c.prototype.isVisible=function(a){if(!this.intersectsClippingArea)return!1;var b=a.planes;if(9<this.lij[0]){a=this.obb;for(var d=0;6>d;d++){for(var e=void 0,e=0;8>e&&!k.plane.isPointOutside(b[d],a[e]);e++);if(8===e)return!1}return!0}return k.frustum.intersectsSphere(a,k.sphere.wrap(this.radius,this.center))};c.prototype.computeElevationBounds=function(){m.prototype.computeElevationBounds.call(this);this._updateOBB()};
c.prototype.createGeometry=function(a,b,d){var e=this._isPole(this.lij[1],this.lij[0]);a.needsUpdate=!1;t.createSphericalGlobeTile(a.numVertsPerRow,this.extent,this.extentWGS84Rad,this.isWebMercator,a.samplerData,b,e,d,this.renderData);this.updateMemoryUsed()};c.prototype._updateOBB=function(){for(var a=this.extentWGS84Rad,b=this.obb,d=0;2>d;d++){var e=this.elevationBounds[d],c=4*d;l(a[1],a[0],e,b[c++]);l(a[3],a[0],e,b[c++]);l(a[3],a[2],e,b[c++]);l(a[1],a[2],e,b[c++])}this.isWebMercator&&(a=this._isPole(this.lij[1],
this.lij[0]),2===a?(f.vec3.set(b[1],0,0,g.earthRadius),f.vec3.set(b[2],0,0,g.earthRadius),f.vec3.set(b[5],0,0,g.earthRadius),f.vec3.set(b[6],0,0,g.earthRadius)):1===a&&(f.vec3.set(b[0],0,0,-g.earthRadius),f.vec3.set(b[3],0,0,-g.earthRadius),f.vec3.set(b[4],0,0,-g.earthRadius),f.vec3.set(b[7],0,0,-g.earthRadius)))};c.prototype._isPole=function(a,b){var c=0;a===(1<<b)-1&&(c+=1);0===a&&(c+=2);return c};c.NumSubdivisionsAtLevel=[128,64,32,16,16,8,8,4];c.Pool=new q(c);return c}(r)});