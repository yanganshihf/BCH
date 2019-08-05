// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper dojo/Deferred ../support/FeatureSet ../support/IdSet ../support/shared".split(" "),function(u,v,t,k,m,q,e){var r=function(l){function d(a){var b=l.call(this,a)||this;b._topnum=0;b.declaredClass="esri.arcade.featureset.actions.Top";b._countedin=0;b._maxProcessing=100;b._topnum=a.topnum;b._parent=a.parentfeatureset;return b}t(d,l);d.prototype._getSet=function(a){var b=this,g=new k;null===this._wset?this._ensureLoaded().then(e.callback(function(){b._parent._getSet(a).then(e.callback(function(a){b._wset=
new q(a._candidates.slice(0),a._known.slice(0),!1,b._clonePageDefinition(a.pagesDefinition));b._setKnownLength(b._wset)>b._topnum&&(b._wset._known=b._wset._known.slice(0,b._topnum));b._setKnownLength(b._wset)>=b._topnum&&(b._wset._candidates=[]);g.resolve(b._wset)},g),e.errback(g))},g),e.errback(g)):g.resolve(this._wset);return g.promise};d.prototype._setKnownLength=function(a){return 0<a._known.length&&"GETPAGES"===a._known[a._known.length-1]?a._known.length-1:a._known.length};d.prototype._isInFeatureSet=
function(a){var b=this._parent._isInFeatureSet(a);if(b===e.IdState.NotInFeatureSet)return b;var g=this._idstates[a];return g===e.IdState.InFeatureSet||g===e.IdState.NotInFeatureSet?g:b===e.IdState.InFeatureSet&&void 0===g?this._countedin<this._topnum?(this._idstates[a]=e.IdState.InFeatureSet,this._countedin++,e.IdState.InFeatureSet):this._idstates[a]=e.IdState.NotInFeatureSet:e.IdState.Unknown};d.prototype._expandPagedSet=function(a,b,g,h,n){var c=this,f=new k;if(null===this._parent)return b=new k,
b.reject(Error("Parent Paging not implemented")),b.promise;b>this._topnum&&(b=this._topnum);if(this._countedin>=this._topnum&&a.pagesDefinition.internal.set.length<=a.pagesDefinition.resultOffset)return b=a._known.length,0<b&&"GETPAGES"===a._known[b-1]&&(a._known.length=b-1),b=a._candidates.length,0<b&&"GETPAGES"===a._candidates[b-1]&&(a._candidates.length=b-1),f.resolve("success"),f.promise;this._parent._expandPagedSet(a,b,g,h,n).then(e.callback(function(b){c._setKnownLength(a)>c._topnum&&(a._known.length=
c._topnum);c._setKnownLength(a)>=c._topnum&&(a._candidates.length=0);f.resolve(b)},f),e.errback(f));return f.promise};d.prototype._getFeatures=function(a,b,g,h){var n=this,c=new k,f=[],d=this._maxQueryRate();if(!0===this._checkIfNeedToExpandKnownPage(a,d,h))return this._expandPagedSet(a,d,0,0,h).then(e.callback(function(f){n._getFeatures(a,b,g,h).then(e.callback(function(a){c.resolve(a)},c),e.errback(c))},c),e.errback(c)),c.promise;-1!==b&&void 0===this._featureCache[b]&&f.push(b);for(var l=0,p=a._lastFetchedIndex;p<
a._known.length&&!(l++,l<=g&&(a._lastFetchedIndex+=1),void 0===this._featureCache[a._known[p]]&&(a._known[p]!==b&&f.push(a._known[p]),f.length>d-1));p++);if(0===f.length)c.resolve("success");else{var d=new q([],f,!1,null),m=Math.min(f.length,g);this._parent._getFeatures(d,-1,m,h).then(e.callback(function(a){for(a=0;a<m;a++){var b=n._parent._featureFromCache(f[a]);void 0!==b&&(n._featureCache[f[a]]=b)}c.resolve("success")},c),e.errback(c))}return c.promise};d.prototype._getFilteredSet=function(a,b,
g,h,d){var c=this,f=new k;this._ensureLoaded().then(e.callback(function(){c._getSet(d).then(e.callback(function(a){a=new q(a._candidates.slice(0).concat(a._known.slice(0)),[],!1,c._clonePageDefinition(a.pagesDefinition));f.resolve(a)},f),e.errback(f))},f),e.errback(f));return f.promise};d.prototype._refineKnowns=function(a,b){for(var g=0,h=null,d=[],c=0;c<a._candidates.length;c++){var f=this._isInFeatureSet(a._candidates[c]);if(f===e.IdState.InFeatureSet){if(a._known.push(a._candidates[c]),g+=1,null===
h?h={start:c,end:c}:h.end===c-1?h.end=c:(d.push(h),h={start:c,end:c}),a._known.length>=this._topnum)break}else if(f===e.IdState.NotInFeatureSet)null===h?h={start:c,end:c}:h.end===c-1?h.end=c:(d.push(h),h={start:c,end:c}),g+=1;else if(f===e.IdState.Unknown)break;if(g>=b)break}null!==h&&d.push(h);for(b=d.length-1;0<=b;b--)a._candidates.splice(d[b].start,d[b].end-d[b].start+1);this._setKnownLength(a)>this._topnum&&(a._known=a._known.slice(0,this._topnum));this._setKnownLength(a)>=this._topnum&&(a._candidates=
[])};d.prototype._stat=function(a,b,d,e,l,c,f){a=new k;a.resolve({calculated:!1});return a.promise};d.prototype._canDoAggregates=function(a,b,d,e,l){a=new k;a.resolve(!1);return a.promise};d.prototype.arcadeScriptStep=function(a,b,d){a=this.arcadeAssignNextScriptStepIdentifiers(d);return"var "+a.newFeatureSet+" \x3d "+this.bigDataCachePipeline("top( "+a.currentFeatureSet+","+this._topnum.toString()+")")+"; "};return d}(m);m._featuresetFunctions.top=function(e){return new r({parentfeatureset:this,
topnum:e})};return r});