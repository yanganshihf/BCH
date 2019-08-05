// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../geometry ../../core/Accessor ../../core/accessorSupport/decorators ../../geometry/support/geodesicUtils ../../geometry/support/normalizeUtils ../../geometry/support/webMercatorUtils ../../geometry/support/WKIDUnitConversion".split(" "),function(v,w,p,l,h,q,k,r,t,u,m){function n(g,d){g="decimal-degrees"===g?u.webMercatorToGeographic(d,!0):d;return[g.x,g.y]}return function(g){function d(a){a=
g.call(this)||this;a.scaleComputedFrom=new h.ScreenPoint;a.view=null;return a}p(d,g);Object.defineProperty(d.prototype,"state",{get:function(){return this.get("view.ready")&&"2d"===this.get("view.type")?"ready":"disabled"},enumerable:!0,configurable:!0});d.prototype.getScaleBarProperties=function(a,c){if("disabled"===this.state||isNaN(a)||!c)return null;var b=this._getDistanceInKm(this.get("view.extent"));return"metric"===c?this._getScaleBarProps(a,b,"metric"):this._getScaleBarProps(a,b/1.609,"non-metric")};
d.prototype._getLocationUnit=function(){var a=this.get("view.spatialReference"),c=a.wkid,b=a.wkt;return a.isWebMercator||b&&-1<b.indexOf("WGS_1984_Web_Mercator")?"decimal-degrees":null!=m[c]||b&&-1<b.indexOf("PROJCS")?"linear-unit":"unknown"};d.prototype._getDistanceInKm=function(a){var c=this.view,b=c.width,d=c.height,e=c.position,f=c.spatialReference,c=this._getLocationUnit();if("linear-unit"===c)return a=Math.abs(a.xmax-a.xmin),b=f.wkid,null!=m[b]?b=m.values[m[b]]:(b=f.wkt,d=b.lastIndexOf(",")+
1,c=b.lastIndexOf("]]"),b=parseFloat(b.substring(d,c))),a*b/1E3;e=this.scaleComputedFrom.y-e[1];e>d?e=d:0>e&&(e=0);f=new h.ScreenPoint(0,e);e=new h.ScreenPoint(b,e);f=new h.Point(a.xmin+f.x/(b/a.width),a.ymax-f.y/(d/a.height),a.spatialReference);a=new h.Point(a.xmin+e.x/(b/a.width),a.ymax-e.y/(d/a.height),a.spatialReference);a=new h.Polyline({paths:[[n(c,f),n(c,a)]],spatialReference:4326});a=t.straightLineDensify(a,10);return r.geodesicLengths([a],"kilometers")[0]};d.prototype._getScaleBarProps=function(a,
c,b){c=a*c/this.view.width;b="metric"===b?"km":"mi";.1>c&&("mi"===b?(c*=5280,b="ft"):"km"===b&&(c*=1E3,b="m"));for(var d=0;1<=c;)c/=10,d++;var e=this._getConstraints(c);if(!e)return null;var f=e.min,e=e.max,f=e/c>=c/f?f:e;return{length:f/c*a,value:Math.pow(10,d)*f,unit:b}};d.prototype._getConstraints=function(a){if(.5<a)return{min:.5,max:1};if(.3<a)return{min:.3,max:.5};if(.2<a)return{min:.2,max:.3};if(.15<a)return{min:.15,max:.2};if(.1<=a)return{min:.15,max:.1}};l([k.property()],d.prototype,"scaleComputedFrom",
void 0);l([k.property({readOnly:!0,dependsOn:["view.ready"]})],d.prototype,"state",null);l([k.property()],d.prototype,"view",void 0);return d=l([k.subclass("esri.widgets.Scalebar.ScaleBarViewModel")],d)}(k.declared(q))});