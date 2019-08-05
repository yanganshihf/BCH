// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/assignHelper ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../geometry ../Viewpoint ../core/Error ../core/Handles ../core/Logger ../core/promiseUtils ../core/accessorSupport/decorators ../geometry/support/webMercatorUtils ../layers/support/TileInfo ./PopupView ./View ./ViewAnimation ./2d/AnimationManager ./2d/FrameTask ./2d/MapViewConstraints ./2d/PaddedViewState ./2d/tiling ./2d/viewpointUtils".split(" "),function(H,I,m,w,e,h,p,
q,x,y,r,d,n,z,A,B,C,D,E,t,F,G,k){var g=y.getLogger("esri.views.MapView");return function(u){function c(a){var b=u.call(this,a)||this;b._frameTask=new E.default(b);b._mapViewBaseHandles=new x;b._setup=!1;b.featuresTilingScheme=null;b.fullOpacity=1;b.interacting=!1;b.initialExtent=null;b.labelManager=null;b.resizeAlign="center";b.type="2d";b.constraints=new t;b.padding={top:0,right:0,bottom:0,left:0};var c=function(){this._set("updating",!this.layerViewManager||this.layerViewManager.factory.working||
this.allLayerViews.some(function(a){return!0===a.updating})||this.labelManager&&!0===this.labelManager.updating)}.bind(b),f=b._mapViewBaseHandles;f.add([b.watch("viewpoint",function(a){return b._flipStationary()},!0),b.on("resize",function(a){return b._resizeHandler(a)}),b.watch("animationManager.animation",function(a){b.animation=a}),b.watch("labelManager.updating",c),b.allLayerViews.on("change",function(){c();f.remove("layerViewsUpdating");f.add(b.allLayerViews.map(function(a){return a.watch("updating",
c)}).toArray(),"layerViewsUpdating")})]);c();b.watch("ready",function(a){a?(b._startup(),b._frameTask&&b._frameTask.start()):(b._frameTask&&b._frameTask.stop(),b._tearDown())},!0);return b}w(c,u);c.prototype.destroy=function(){this.destroyed||(this._set("ready",!1),this._mapViewBaseHandles.removeAll(),this.layerViewManager.clear(),this._frameTask.destroy(),this._tearDown(),this._gotoTask=this._mapViewBaseHandles=this._frameTask=null)};Object.defineProperty(c.prototype,"animation",{set:function(a){var b=
this,c=this._get("animation");a!==c&&(c&&c.stop(),!a||a.isFulfilled()?this._set("animation",null):(this._set("animation",a),c=function(){a===b._get("animation")&&(b._set("animation",null),b._frameTask.requestFrame())},a.when(c,c)))},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"center",{get:function(){if(!this._setup)return this._get("center");var a=this.content.center;return new h.Point({x:a[0],y:a[1],spatialReference:this.content.spatialReference})},set:function(a){if(null!=
a)if(this._normalizeInput(a))if(this._setup){var b=this.viewpoint;k.centerAt(b,b,a);this.viewpoint=b}else this._set("center",a),this.notifyChange("initialExtentRequired");else g.error("#center","incompatible spatialReference "+JSON.stringify(a.spatialReference)+" with view's spatialReference "+JSON.stringify(this.spatialReference))},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"constraints",{set:function(a){var b=this,c=this._get("constraints");c&&(this._mapViewBaseHandles.remove("constraints"),
c.destroy());this._set("constraints",a);a&&(a.view=this,this._setup&&(this.state.viewpoint=a.fit(this.content.viewpoint)),this._mapViewBaseHandles.add(a.on("update",function(){b._setup&&b.state&&(b.state.viewpoint=a.fit(b.content.viewpoint))}),"constraints"))},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"extent",{get:function(){return this._setup?this.content.extent.clone():this._get("extent")},set:function(a){if(null!=a){var b=this._normalizeInput(a);b?b.width&&b.height?this._setup?
(a=this.viewpoint,k.setExtent(a,a,b,this.size,{constraints:this.constraints}),this.viewpoint=a):(this._set("extent",b),this._set("center",null),this._set("viewpoint",null),this._set("scale",0),this._set("zoom",-1),this.notifyChange("initialExtentRequired")):g.error("#extent","invalid extent size"):g.error("#center","incompatible spatialReference "+JSON.stringify(a.spatialReference)+" with view's spatialReference "+JSON.stringify(this.spatialReference))}},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,
"initialExtentRequired",{get:function(){var a=this.extent,b=this.center,c=this.scale,f=this.viewpoint,d=this.zoom;return this.get("map.initialViewProperties.viewpoint")||a||b&&(0!==c||-1!==d)||f?!1:!0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"padding",{get:function(){return this._setup?this.state.padding:this._get("padding")},set:function(a){this._setup?(this.state.padding=a,this._set("padding",this.state.padding)):this._set("padding",a)},enumerable:!0,configurable:!0});
Object.defineProperty(c.prototype,"resolution",{get:function(){return this.state?this.state.resolution:0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"rotation",{get:function(){return this._setup?this.content.rotation:this._get("rotation")},set:function(a){if(!isNaN(a))if(this._setup){var b=this.viewpoint;k.rotateTo(b,b,a);this.viewpoint=b}else this._set("rotation",a)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"scale",{get:function(){return this._setup?
this.content.scale:this._get("scale")},set:function(a){if(a&&!isNaN(a))if(this._setup){var b=this.viewpoint;k.scaleTo(b,b,a);this.viewpoint=b}else{this._set("scale",a);this._set("zoom",-1);if(a=this._get("extent"))this._set("extent",null),this._set("center",a.center);this.notifyChange("initialExtentRequired")}},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"stationary",{get:function(){return!this.animation&&!this.interacting&&!this._get("resizing")&&!this._stationaryTimer},enumerable:!0,
configurable:!0});Object.defineProperty(c.prototype,"viewpoint",{get:function(){if(!this._setup)return this._get("viewpoint");var a=this.content;return a&&a.viewpoint.clone()},set:function(a){if(null!=a){var b=this._normalizeInput(a);b?this._setup?(a=k.create(),k.copy(a,b),this.constraints.constrain(a,this.content.viewpoint),this.state.viewpoint=a,this._frameTask.requestFrame(),this._set("viewpoint",a)):(this._set("viewpoint",b),this._set("extent",null),this._set("center",null),this._set("zoom",-1),
this._set("scale",0),this.notifyChange("initialExtentRequired")):!a.scale||isNaN(a.scale)?g.error("#viewpoint","invalid scale value of "+a.scale):a.targetGeometry?g.error("#viewpoint","incompatible spatialReference "+JSON.stringify(a.targetGeometry.spatialReference)+" with view's spatialReference "+JSON.stringify(this.spatialReference)):g.error("#viewpoint","geometry not defined")}},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"zoom",{get:function(){return this._setup?this.constraints.scaleToZoom(this.scale):
this._get("zoom")},set:function(a){if(null!=a){if(!this._setup){this.notifyChange("initialExtentRequired");this._set("zoom",a);this._set("scale",0);var b=this._get("extent");b&&(this._set("extent",null),this._set("center",b.center))}this.constraints.effectiveLODs&&(b=this.viewpoint,k.scaleTo(b,b,this.constraints.zoomToScale(a)),this.viewpoint=b,this._set("zoom",this.constraints.scaleToZoom(this.scale)))}},enumerable:!0,configurable:!0});c.prototype.goTo=function(a,b){this.animation&&(this.animation=
null);if(this._setup)return b=m({animate:!0},b),a=k.createAsync(a,this),this._gotoTask={},b.animate?this._gotoAnimated(a,b):this._gotoImmediate(a,b);g.error("#goTo()","MapView cannot be used before it is ready")};c.prototype.hitTest=function(a){return r.reject("Should be implemented by subclasses")};c.prototype.popupHitTest=function(a){var b=this;return this.hitTest(a).then(function(c){return m({},c,{mapPoint:b.toMap(a)})})};c.prototype.toMap=function(a,b,c){if(!this._setup)return null;a&&null!=a.x&&
(c=b,b=a.y,a=a.x);var f=[0,0];this.state.toMap(f,[a,b]);c=c||new h.Point;c.x=f[0];c.y=f[1];c.spatialReference=this.spatialReference;return c};c.prototype.isTileInfoRequired=function(){return!0};c.prototype.toScreen=function(a,b,c,f){if(!this._setup)return null;a&&"object"===typeof a?(f=b||new h.ScreenPoint,a=this._normalizeInput(a),b=a.y,a=a.x):f="number"===typeof c||null==c?f||new h.ScreenPoint:c||new h.ScreenPoint;a=[a,b];this.state.toScreen(a,a);f.x=a[0];f.y=a[1];return f};c.prototype.pixelSizeAt=
function(a,b){if(!this._setup)return NaN;a&&null!=a.x&&(b=a.y,a=a.x);return this.content.pixelSizeAt([a,b])};c.prototype.requestLayerViewUpdate=function(a){this._setup&&this._frameTask.requestLayerViewUpdate(a)};c.prototype.requestUpdate=function(a){this._setup&&this._frameTask.requestUpdate(a)};c.prototype.getDefaultSpatialReference=function(){return this.get("map.initialViewProperties.spatialReference")||this.get("defaultsFromMap.spatialReference")||null};c.prototype.isSpatialReferenceSupported=
function(a,b){return b||this._get("ready")?!0:null!==this._getDefaultViewpoint()};c.prototype._createOrReplaceAnimation=function(a){if(!this.animation||this.animation.done)this.animation=new C;this.animation.update(a);return this.animation};c.prototype._cancellableGoTo=function(a,b,c){var f=this,d=c.then(function(){a===f._gotoTask&&(f.animation=null)}).catch(function(c){a===f._gotoTask&&(f.animation=null,b.done||b.stop());throw c;}),v=r.create(function(a){return a(d)},function(){a!==f._gotoTask||
b.done||b.stop()});b.when().catch(function(){a===f._gotoTask&&v.cancel()});return v};c.prototype._gotoImmediate=function(a,b){var c=this,f=this._gotoTask,d=this._createOrReplaceAnimation(a);a=a.then(function(a){if(f!==c._gotoTask)throw new q("view:goto-interrupted","Goto was interrupted");c.viewpoint=d.target=a;d.finish()});return this._cancellableGoTo(f,d,a)};c.prototype._gotoAnimated=function(a,b){var c=this,f=this._gotoTask,d=this._createOrReplaceAnimation(a);a=a.then(function(a){if(f!==c._gotoTask)throw new q("view:goto-interrupted",
"Goto was interrupted");d.update(a);c.animationManager.animate(d,c.viewpoint,b);return d.when().then(function(){})});return this._cancellableGoTo(f,d,a)};c.prototype._resizeHandler=function(a){var b=this.state;if(b){var c=this.content.viewpoint,d=this.content.size.concat();b.size=[a.width,a.height];k.resize(c,c,d,this.content.size,this.resizeAlign);c=this.constraints.constrain(c,null);this.state.viewpoint=c}};c.prototype._startup=function(){if(!this._setup){var a=this._getDefaultViewpoint();this.constraints.view=
this;this.constraints.fit(a);this._set("animationManager",new D({view:this}));this._set("state",new F({padding:this._get("padding"),size:this.size,viewpoint:a}));this._set("content",this.state.content);this._set("featuresTilingScheme",new G.TileInfoView(z.create({spatialReference:this.spatialReference,size:512})));this._setup=!0}};c.prototype._tearDown=function(){if(this._setup){this._setup=!1;this._stationaryTimer&&(clearTimeout(this._stationaryTimer),this._stationaryTimer=null,this.notifyChange("stationary"));
var a=this._get("content"),b=a.center,c=a.spatialReference,b=new h.Point({x:b[0],y:b[1],spatialReference:c});this._set("viewpoint",null);this._set("extent",null);this._set("center",b);this._set("zoom",-1);this._set("rotation",a.rotation);this._set("scale",a.scale);this._set("spatialReference",c);this.constraints.view=null;this.animationManager.destroy();this._set("animationManager",null);this._set("state",null);this._set("content",null);this.animation=null}};c.prototype._flipStationary=function(){var a=
this;this._stationaryTimer&&clearTimeout(this._stationaryTimer);this._stationaryTimer=setTimeout(function(){a._stationaryTimer=null;a.notifyChange("stationary")},160);this.notifyChange("stationary")};c.prototype._normalizeInput=function(a,b){void 0===b&&(b=this.spatialReference);var c=a&&a.targetGeometry||a;return b?c?b.equals(c.spatialReference)?a:n.canProject(c,b)?a&&"esri.Viewpoint"===a.declaredClass?(a.targetGeometry=n.project(c,b),a):n.project(c,b):null:null:a};c.prototype._getDefaultViewpoint=
function(){var a=this.constraints,b=this._get("zoom"),c=this._get("scale"),d=this._normalizeInput(this._get("center")),e=this._normalizeInput(this._get("extent")),h=this._get("rotation"),g=this._normalizeInput(this._get("viewpoint"));a.effectiveLODs?-1!==b&&(c=a.zoomToScale(b)):b=-1;var m=null,n=null,b=0,a=g&&g.rotation,l=g&&g.targetGeometry;l&&("extent"===l.type?m=l:"point"===l.type&&(n=l,b=g.scale));g=this._normalizeInput(this.get("map.initialViewProperties.viewpoint.targetGeometry.extent"));l=
this._normalizeInput(this.initialExtent);e=e||m||g||l;d=d||n||e&&e.center;c=c||b||e&&k.extentToScale(e,this.size);return d&&c?new p({targetGeometry:d,scale:c,rotation:h||a||0}):null};e([d.property()],c.prototype,"animation",null);e([d.property({readOnly:!0})],c.prototype,"animationManager",void 0);e([d.property({value:null,type:h.Point,dependsOn:["content.viewpoint"]})],c.prototype,"center",null);e([d.property({type:t})],c.prototype,"constraints",null);e([d.property({readOnly:!0})],c.prototype,"content",
void 0);e([d.property({value:null,type:h.Extent,dependsOn:["content.viewpoint"]})],c.prototype,"extent",null);e([d.property({readOnly:!0})],c.prototype,"featuresTilingScheme",void 0);e([d.property()],c.prototype,"fullOpacity",void 0);e([d.property({readOnly:!0})],c.prototype,"interacting",void 0);e([d.property({type:h.Extent})],c.prototype,"initialExtent",void 0);e([d.property({dependsOn:["map.initialViewProperties?.viewpoint"]})],c.prototype,"initialExtentRequired",null);e([d.property()],c.prototype,
"labelManager",void 0);e([d.property({value:{top:0,right:0,bottom:0,left:0},cast:function(a){return m({top:0,right:0,bottom:0,left:0},a)}})],c.prototype,"padding",null);e([d.property()],c.prototype,"resizeAlign",void 0);e([d.property({readOnly:!0,dependsOn:["content.viewpoint"]})],c.prototype,"resolution",null);e([d.property({value:0,type:Number,dependsOn:["content.viewpoint"]})],c.prototype,"rotation",null);e([d.property({value:0,type:Number,dependsOn:["content.viewpoint"]})],c.prototype,"scale",
null);e([d.property({type:h.SpatialReference,dependsOn:["map.initialViewProperties?.spatialReference","defaultsFromMap.isSpatialReferenceDone"]})],c.prototype,"spatialReference",void 0);e([d.property({readOnly:!0})],c.prototype,"state",void 0);e([d.property()],c.prototype,"stationary",null);e([d.property({readOnly:!0})],c.prototype,"type",void 0);e([d.property({value:null,type:p,dependsOn:["content.viewpoint"]})],c.prototype,"viewpoint",null);e([d.property({value:-1,dependsOn:["scale"]})],c.prototype,
"zoom",null);return c=e([d.subclass("esri.views.MapViewBase")],c)}(d.declared(B,A))});