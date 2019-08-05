// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Accessor ../../core/Collection ../../core/Handles ../../core/Identifiable ../../core/watchUtils ../../core/accessorSupport/decorators ../../layers/support/Sublayer ../../support/actions/ActionBase ../../support/actions/ActionButton ../../support/actions/ActionSlider ../../support/actions/ActionToggle ./ListItemPanel ./support/layerListUtils".split(" "),function(f,y,n,d,p,k,q,r,e,c,t,u,
v,w,x,l,g){f=k.ofType({key:"type",defaultKeyValue:"button",base:u,typeMap:{button:v,toggle:x,slider:w}});var m=k.ofType(f);return function(f){function b(a){a=f.call(this)||this;a._handles=new q;a._layerViewPromise=null;a.actionsSections=new m;a.actionsOpen=!1;a.children=new (k.ofType(h));a.error=null;a.layer=null;a.layerView=null;a.open=!1;a.panel=null;a.parent=null;a.view=null;a.visible=null;return a}n(b,f);h=b;b.prototype.initialize=function(){var a=this;this._handles.add([e.init(this,"layer",function(b){return a._watchLayerProperties(b)}),
e.init(this,"view",function(b){return a._updateChildren(b)}),e.init(this,"panel",function(b){return a._setListItemOnPanel(b)}),e.init(this,["layer","view"],function(){return a._getLayerView()})])};b.prototype.destroy=function(){this._layerViewPromise&&this._layerViewPromise.cancel();this._layerViewPromise=null;this._handles.destroy();this.view=this._handles=null};b.prototype.castPanel=function(a){this.get("panel.open")&&!a.hasOwnProperty("open")&&(a.open=!0);return a?new l(a):null};Object.defineProperty(b.prototype,
"title",{get:function(){var a=this.get("layer.layer");return(!a||a&&this.get("layer.layer.loaded"))&&this.get("layer.title")||""},set:function(a){void 0===a?this._clearOverride("title"):this._override("title",a)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"updating",{get:function(){var a=this.layerView;return a?a.updating:this._isLayerUpdating(this.layer)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"visibleAtCurrentScale",{get:function(){return!g.isLayerOutsideScaleRange(this.layer,
this.get("view.scale"))},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"visibilityMode",{get:function(){return g.findLayerVisibilityMode(this.layer)||"independent"},enumerable:!0,configurable:!0});b.prototype.clone=function(){return new h({actionsSections:this.actionsSections.clone(),actionsOpen:this.actionsOpen,children:this.children.clone(),layer:this.layer,open:this.open,panel:this.panel,title:this.title,view:this.view,visible:this.visible})};b.prototype._setListItemOnPanel=
function(a){a&&(a.listItem=this)};b.prototype._updateChildren=function(a){var b=this.children;b&&b.forEach(function(b){return b.view=a})};b.prototype._addChildren=function(a){var b=this;this.children.removeAll();if(a){this._handles.remove("child-list-mode");a.forEach(function(c){b._handles.add(e.watch(c,"listMode",function(){return b._addChildren(a)}),"child-list-mode")});var c=[];a.filter(function(a){return"hide"!==g.findLayerListMode(a)}).forEach(function(a){g.canDisplayLayer(a)&&(a=new h({layer:a,
parent:b,view:b.view}),c.unshift(a))});this.children.addMany(c)}};b.prototype._watchSublayerChanges=function(a){var b=this;a&&this._handles.add(a.on("change",function(){b._addChildren(a)}),"layer")};b.prototype._initializeChildLayers=function(a){this._addChildren(a);this._watchSublayerChanges(a)};b.prototype._watchLayerProperties=function(a){var b=this;if(this._handles&&(this._handles.remove("layer"),a)){var c=g.getNormalizedChildLayerProperty(a);c&&this._handles.add(e.init(a,c,function(){a.hasOwnProperty(c)&&
b._initializeChildLayers(a[c])}),"layer")}};b.prototype._getLayerView=function(){var a=this,b=this.layer,c=this.view;if(b&&c){var d=this._layerViewPromise=c.whenLayerView(b);d.then(function(b){d===a._layerViewPromise&&(a._layerViewPromise=null,a._set("layerView",b))}).catch(function(b){d===a._layerViewPromise&&(a._layerViewPromise=null)})}};b.prototype._isLayerUpdating=function(a){return a instanceof t?!1:a&&"loading"===a.loadStatus};var h;d([c.property({type:m})],b.prototype,"actionsSections",void 0);
d([c.property()],b.prototype,"actionsOpen",void 0);d([c.property({type:k})],b.prototype,"children",void 0);d([c.aliasOf("layer.loadError?")],b.prototype,"error",void 0);d([c.property()],b.prototype,"layer",void 0);d([c.property({readOnly:!0})],b.prototype,"layerView",void 0);d([c.property()],b.prototype,"open",void 0);d([c.property({type:l})],b.prototype,"panel",void 0);d([c.cast("panel")],b.prototype,"castPanel",null);d([c.property()],b.prototype,"parent",void 0);d([c.property({dependsOn:["layer.layer?.loaded",
"layer.title"]})],b.prototype,"title",null);d([c.property({dependsOn:["layer.loadStatus?","layerView.updating"],readOnly:!0})],b.prototype,"updating",null);d([c.property({value:null})],b.prototype,"view",void 0);d([c.aliasOf("layer.visible")],b.prototype,"visible",void 0);d([c.property({dependsOn:["layer.minScale","layer.maxScale","view.scale"],readOnly:!0})],b.prototype,"visibleAtCurrentScale",null);d([c.property({dependsOn:["layer.visibilityMode?"],readOnly:!0})],b.prototype,"visibilityMode",null);
return b=h=d([c.subclass("esri.widgets.LayerList.ListItem")],b)}(c.declared(p,r.Identifiable))});