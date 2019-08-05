// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/Error","../../../../core/promiseUtils"],function(e,f,g,h,c){Object.defineProperty(f,"__esModule",{value:!0});f.getControllerConfiguration=function(b){var d=b.source;return"stream"===b.type?c.resolve().then(function(){var a;if(a=b.filter){var c={};a.geometry&&(c.geometry=a.geometry.toJSON());a.where&&(c.where=a.where);a=c}else a=null;return{type:"stream",filter:a,purgeOptions:b.purgeOptions}}):b.capabilities.operations.supportsQuery?
d&&"openPorts"in d?c.resolve().then(function(){return{type:"memory",processing:b.processing&&b.processing.toWorker()||null}}):c.resolve({type:"on-demand",gdbVersion:b.gdbVersion,historicMoment:b.historicMoment&&b.historicMoment.getTime(),processing:b.processing&&b.processing.toWorker()||null}):c.reject(new h("graphicscontroller:query-capability-required","Service requires query capabilities to be used as a feature layer",{layer:b}))};f.createController=function(b,d){return("memory"===b?c.create(function(a){return e(["./controllers/MemoryController"],
a)}):"stream"===b?c.create(function(a){return e(["./controllers/StreamController"],a)}):c.create(function(a){return e(["./controllers/OnDemandController"],a)})).then(function(a){return a.default}).then(function(a){return new a(g({},d.serviceAndViewInfo,{tileStore:d.tileStore,remoteClient:d.remoteClient}))})}});