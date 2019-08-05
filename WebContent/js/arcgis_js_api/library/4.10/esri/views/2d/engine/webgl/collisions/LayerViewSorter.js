// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","@dojo/framework/shim/Map"],function(f,g,k){function h(d){return"esri.views.2d.layers.FeatureLayerView2D"===d.declaredClass||"esri.views.2d.layers.StreamLayerView2D"===d.declaredClass}Object.defineProperty(g,"__esModule",{value:!0});f=function(){function d(a,b){this.registerLayer=a;this.unregisterLayer=b;this._layerViewState=new k.default}d.prototype.findIndex=function(a){return a.view.allLayerViews.findIndex(function(b){return b.uid===a.uid})};d.prototype.update=function(a){for(var b=
a.added,c=0,e=a.removed;c<e.length;c++)a=e[c],h(a)&&this._layerViewState.has(a)&&this._deleteState(a);for(c=0;c<b.length;c++){a=b[c];if(e=h(a))a:switch(a.get("layer.renderer.type")){case "class-breaks":case "simple":case "unique-value":e=!0;break a;default:e=!1}e&&!this._layerViewState.has(a)&&this._createState(a)}this._recomputeOrder()};d.prototype.destroy=function(){var a=this;this._layerViewState.forEach(function(b,c){return a._deleteState(c)})};d.prototype._createState=function(a){var b={priority:-1,
handle:null};b.handle=a.watch("labelsVisible",this._recomputeOrder.bind(this));this._layerViewState.set(a,b);return b};d.prototype._deleteState=function(a){if(this._layerViewState.has(a)){var b=this._layerViewState.get(a);b.handle.remove();-1!==b.priority&&this.unregisterLayer(a);this._layerViewState.delete(a)}};d.prototype._recomputeOrder=function(){var a=this;this._layerViewState.forEach(function(b,c){var e=c.view.map.allLayers.findIndex(function(a){return a.uid===c.layer.uid}),d=c.layer,e=d.visible&&
d.labelsVisible&&d.labelingInfo?4294967295-e:-1;e!==b.priority&&(b.priority=e,a.unregisterLayer(c),-1!==e&&a.registerLayer(c,e))})};return d}();g.default=f});