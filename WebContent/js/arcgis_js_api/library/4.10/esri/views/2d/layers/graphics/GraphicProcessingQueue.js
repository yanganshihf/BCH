// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/Accessor ../../../../core/scheduling ../../../../core/accessorSupport/decorators".split(" "),function(d,g,h,f,k,l,c){Object.defineProperty(g,"__esModule",{value:!0});d=function(d){function b(a){a=d.call(this,a)||this;a._queue=new Map;a._onGoingGraphic=null;a._onGoingPromise=null;a._scheduledNextHandle=null;a._timestamp=Date.now();a._next=a._next.bind(a);a._finalize=a._finalize.bind(a);
return a}h(b,d);Object.defineProperty(b.prototype,"length",{get:function(){return this._queue.size},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"updating",{get:function(){return 0<this._queue.size||null!==this._onGoingPromise},enumerable:!0,configurable:!0});b.prototype.cancel=function(a){this._onGoingGraphic&&this._onGoingGraphic.graphic===a&&(this._onGoingPromise.cancel(),this._onGoingGraphic=this._onGoingPromise=null);this._queue.delete(a);this._scheduleNext();this.notifyChange("updating")};
b.prototype.clear=function(){this._queue.clear();this._onGoingPromise&&(this._onGoingPromise.cancel(),this._onGoingGraphic=this._onGoingPromise=null);this._cancelNext();this.notifyChange("updating")};b.prototype.has=function(a){return this._queue.has(a)};b.prototype.isOngoing=function(a){return this._onGoingGraphic&&this._onGoingGraphic.graphic===a};b.prototype.push=function(a,b,e){this._queue.has(a)||(this._queue.set(a,{graphic:a,addOrUpdate:b,timestamp:e||this._timestamp}),this._scheduleNext(),
this.notifyChange("updating"))};b.prototype.refresh=function(){this._timestamp=Date.now();this.reset()};b.prototype.reset=function(){var a=this._onGoingGraphic;a&&this.push(a.graphic,a.addOrUpdate,this._timestamp)};b.prototype._finalize=function(){this._onGoingPromise=this._onGoingGraphic=null;this.notifyChange("updating");this._scheduleNext()};b.prototype._cancelNext=function(){this._scheduledNextHandle&&(this._scheduledNextHandle.remove(),this._scheduledNextHandle=null)};b.prototype._scheduleNext=
function(){this._scheduledNextHandle||0===this._queue.size||null!=this._onGoingGraphic||(this._scheduledNextHandle=l.schedule(this._next))};b.prototype._next=function(){if(null==this._scheduledNextHandle||0===this._queue.size||this._onGoingGraphic)this._scheduledNextHandle=null;else{this._scheduledNextHandle=null;var a=this._peek(),b=a.graphic,e=a.addOrUpdate;this._queue.delete(b);this._onGoingGraphic=a;this._onGoingPromise=this.process(b,e,this._timestamp);this._onGoingPromise.then(this._finalize,
this._finalize);this.notifyChange("updating")}};b.prototype._peek=function(){var a=this,b=Number.NEGATIVE_INFINITY,e=null;this._queue.forEach(function(d,c){c=a._timestamp-d.timestamp;isNaN(c)?e=d:c===b?e=d:c>b&&(b=c,e=d)});return e};f([c.property({readOnly:!0})],b.prototype,"length",null);f([c.property({readOnly:!0})],b.prototype,"updating",null);f([c.property({constructOnly:!0})],b.prototype,"process",void 0);return b=f([c.subclass()],b)}(c.declared(k));g.default=d});