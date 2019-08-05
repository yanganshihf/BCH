// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ./core/tsSupport/assignHelper ./core/tsSupport/declareExtendsHelper ./core/tsSupport/decorateHelper ./Color ./core/asyncUtils ./core/Collection ./core/collectionUtils ./core/Error ./core/JSONSupport ./core/lang ./core/Loadable ./core/loadAll ./core/Logger ./core/promiseUtils ./core/accessorSupport/decorators ./core/accessorSupport/ensureType ./ground/navigationConstraints ./layers/ElevationLayer ./layers/Layer ./layers/support/ElevationQuery ./layers/support/types ./webdoc/support/opacityUtils".split(" "),
function(w,J,l,x,f,y,z,A,m,B,C,n,D,E,F,h,d,p,q,G,H,r,I,t){var g=A.ofType(H),u=F.getLogger("esri.Ground");return function(v){function c(a){var b=v.call(this)||this;b.opacity=1;b.surfaceColor=null;b.navigationConstraint=null;b.layers=new g;b.layers.on("after-add",function(a){a=a.item;a.parent&&a.parent!==b&&"remove"in a.parent&&a.parent.remove(a);a.parent=b;I.isOfType(a,["elevation","base-elevation"])||u.error("Layer '"+a.title+", id:"+a.id+"' of type '"+a.type+"' is not supported as a ground layer and will therefore be ignored. Only layers of type 'elevation' are supported.")});
b.layers.on("after-remove",function(a){a.item.parent=null});return b}x(c,v);k=c;c.prototype.initialize=function(){this.when().catch(function(a){u.error("#load()","Failed to load ground",a)});this.resourceInfo&&this.read(this.resourceInfo.data,this.resourceInfo.context)};c.prototype.normalizeCtorArgs=function(a){a&&"resourceInfo"in a&&(this._set("resourceInfo",a.resourceInfo),a=l({},a),delete a.resourceInfo);return a};Object.defineProperty(c.prototype,"layers",{set:function(a){this._set("layers",m.referenceSetter(a,
this._get("layers"),g))},enumerable:!0,configurable:!0});c.prototype.writeLayers=function(a,b,c,e){var d=[];a&&(e=l({},e,{layerContainerType:"ground"}),a.forEach(function(a){if(a.write){var b={};a.write(b,e)&&d.push(b)}else e&&e.messages&&e.messages.push(new B("layer:unsupported","Layers ("+a.title+", "+a.id+") of type '"+a.declaredClass+"' cannot be persisted in the ground",{layer:a}))}));b.layers=d};c.prototype.load=function(){this.addResolvingPromise(this._loadFromSource());return this.when()};
c.prototype.loadAll=function(){var a=this;return z.safeCast(E.loadAll(this,function(b){b(a.layers)}))};c.prototype.queryElevation=function(a,b){var c=new r.ElevationQuery,d=this.layers.filter(function(a){return"elevation"===a.type}).toArray();return c.queryAll(d,a,b)};c.prototype.createElevationSampler=function(a,b){var c=new r.ElevationQuery,d=this.layers.filter(function(a){return"elevation"===a.type}).toArray();return c.createSamplerAll(d,a,b)};c.prototype.clone=function(){var a={opacity:this.opacity,
surfaceColor:n.clone(this.surfaceColor),navigationConstraint:n.clone(this.navigationConstraint),layers:this.layers.slice()};this.loaded&&(a.loadStatus="loaded");return(new k({resourceInfo:this.resourceInfo})).set(a)};c.prototype.read=function(a,b){this.resourceInfo||this._set("resourceInfo",{data:a,context:b});return this.inherited(arguments)};c.prototype._loadFromSource=function(){var a=this.resourceInfo;return a?this._loadLayersFromJSON(a.data,a.context):h.resolve(null)};c.prototype._loadLayersFromJSON=
function(a,b){var c=this,d=b&&b.origin||"web-scene",f=b&&b.portal||null,g=b&&b.url||null;return h.create(function(a){return w(["./portal/support/layersCreator"],a)}).then(function(b){var e=[];a.layers&&Array.isArray(a.layers)&&e.push.apply(e,b.populateOperationalLayers(c.layers,a.layers,{context:{origin:d,url:g,portal:f,layerContainerType:"ground"},defaultLayerType:"ArcGISTiledElevationServiceLayer"}));return h.eachAlways(e)}).then(function(){})};var k;f([d.property({type:g,json:{type:[G],read:!1}}),
d.cast(m.castForReferenceSetter)],c.prototype,"layers",null);f([d.writer("layers")],c.prototype,"writeLayers",null);f([d.property({readOnly:!0})],c.prototype,"resourceInfo",void 0);f([d.property({type:Number,json:{type:p.Integer,read:{reader:t.transparencyToOpacity,source:"transparency"},write:{writer:function(a,b){b.transparency=t.opacityToTransparency(a)},target:"transparency"}}})],c.prototype,"opacity",void 0);f([d.property({type:y,json:{type:[p.Integer],write:function(a,b){b.surfaceColor=a.toJSON().slice(0,
3)}}})],c.prototype,"surfaceColor",void 0);f([d.property({types:q.navigationConstraintTypes,json:{read:q.readNavigationConstraint,write:!0}})],c.prototype,"navigationConstraint",void 0);return c=k=f([d.subclass("esri.Ground")],c)}(d.declared(C,D))});