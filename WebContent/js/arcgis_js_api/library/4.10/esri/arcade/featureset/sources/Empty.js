// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper dojo/Deferred ../support/FeatureSet ../support/IdSet ../support/shared".split(" "),function(m,n,g,e,h,k,d){return function(f){function b(a){var c=f.call(this,a)||this;c.declaredClass="esri.layers.featureset.sources.Empty";c._maxProcessing=1E3;c._wset=new k([],[],!1,null);c._parent=a.parentfeatureset;c._databaseType=d.FeatureServiceDatabaseType.Standardised;return c}g(b,f);b.prototype._getSet=function(a){a=new e;a.resolve(this._wset);return a.promise};
b.prototype.optimisePagingFeatureQueries=function(a){};b.prototype._isInFeatureSet=function(a){return d.IdState.NotInFeatureSet};b.prototype._getFeature=function(a,c){a=new e;a.reject(Error("No Feature Found in EmptySet"));return a.promise};b.prototype._getFeatures=function(a,c,b,d){a=new e;a.resolve("success");return a.promise};b.prototype._featureFromCache=function(a){return null};b.prototype._fetchAndRefineFeatures=function(a,b,d){a=new e;a.reject(Error("Fetch and Refine should not be called in this featureset"));
return a.promise};b.prototype._getFilteredSet=function(a,b,d,f,l){a=new e;b=new k([],[],!1,null);a.resolve(b);return a.promise};b.prototype._stat=function(a,b,f,k,l,g,h){var c=new e;this._manualStat(a,b,g,h).then(d.callback(function(a){c.resolve(a)},c),d.errback(c));return c.promise};b.prototype._canDoAggregates=function(a,b,d,f,g){a=new e;a.resolve(!1);return a.promise};b.prototype.canBeBigDataFeatureSet=function(){return!1};b.prototype.shouldBeResolvedAsBigData=function(){return!1};return b}(h)});