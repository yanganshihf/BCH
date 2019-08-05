// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/Logger ../../../core/MemCache ../layers/support/MemoryManagedLayerView ./Evented".split(" "),function(m,n,g,f,h,k){var l=g.getLogger("esri.views.3d.support.MemoryController");return function(){function b(a){this._view=a;this._minQuality=.1;this._memoryHWM=this._maxQuality=1;this._memoryLWM=.75;this._divideRate=1.3;this._throttle=5;this.events=new k.Evented;this._maxMemory=500;this._additionalCacheMemory=100;this._quality=1;this._memoryCommitted=this._memoryUsed=
this._throttled=this._stableQuality=0;this._cacheStorage=new f.Storage;this.updating=!1}b.prototype.getMemCache=function(a,c){return new f(a,this._cacheStorage,c)};b.prototype.setMaxGpuMemory=function(a){null!=a&&0<a&&(this._maxMemory=a,this.setDirty())};b.prototype.setAdditionalCacheMemory=function(a){null!=a&&0<=a&&(this._additionalCacheMemory=a)};b.prototype.disableMemCache=function(){this._additionalCacheMemory=-4096};b.prototype.getMemoryFactor=function(){return this._quality};b.prototype._updateQuality=
function(a){a=Math.min(Math.max(a,this._minQuality),this._maxQuality);if(a===this._quality)return!1;this._quality=a;this.events.emit("quality-changed",this._quality);return!0};b.prototype.getUsedMemory=function(){return this._memoryUsed};b.prototype.setDirty=function(){this._stableQuality=0;this._updateQuality(this._maxQuality)};b.prototype.update=function(){this._updateMemory();if(!(0>=this._memoryCommitted)){this._throttled=Math.max(0,this._throttled-1);var a=this._layersUpdating();if(a){if(this._quality<=
this._minQuality)return;if(this._memoryCommitted>1.1*this._memoryHWM||this._memoryUsed>this._memoryHWM)if(0<this._stableQuality)this._updateQuality(this._stableQuality);else if(0===this._throttled||1.05<this._memoryUsed)this._updateQuality(this._quality/this._divideRate),this._throttled=this._throttle}else this._memoryUsed>this._memoryHWM&&(this._stableQuality=0,a=this._updateQuality(this._quality/this._divideRate)),this._memoryCommitted<this._memoryLWM&&this._quality<this._maxQuality&&this._stableQuality!==
this._quality&&(this._stableQuality=this._quality,a=this._updateQuality(this._quality+.1*(this._memoryLWM-this._memoryCommitted+.1)));this.updating!==a&&(this.updating=a,this.events.emit("updating-changed",this.updating))}};b.prototype._layersUpdating=function(){var a=!1;this._view.allLayerViews.forEach(function(c){a=a||c.updating});return a};b.prototype._updateMemory=function(){var a=this,c=0,b=0;this._view.basemapTerrain&&this._view.basemapTerrain.getUsedMemory&&(c+=this._view.basemapTerrain.getUsedMemory());
var d=this._view._stage&&this._view._stage.view&&this._view._stage.view.getEdgeView();d&&(c+=d.getGpuMemoryUsage());this._view.allLayerViews&&this._view.allLayerViews.forEach(function(d){if(h.isMemoryManagedLayerView(d)){var e=d.ignoresMemoryFactor()?a._quality:1;c+=d.getUsedMemory()*e;b+=d.getUnloadedMemory()*e}});var e=null==this._warnMemoryUsage||Math.round(10*c)!==Math.round(10*this._warnMemoryUsage),d=1048576*this._maxMemory;if(c>d&&e){this._warnMemoryUsage=c;var e=function(a){return(a/1048576).toLocaleString(void 0,
{maximumFractionDigits:1})+" MB"},f=Math.round(100*this._quality);l.warn("GPU Memory Limit exceeded! Limit: "+e(d)+" Current: "+e(c)+" Projected: "+e(c+b)+" Quality: "+f+"%")}this._memoryUsed=c/d;this._memoryCommitted=(c+b)/d;this._cacheStorage.maxSize=Math.max(0,d-c+1048576*this._additionalCacheMemory);this.events.emit("memory-used",this._memoryUsed)};Object.defineProperty(b.prototype,"debug",{get:function(){return{cacheStorage:this._cacheStorage}},enumerable:!0,configurable:!0});return b}()});