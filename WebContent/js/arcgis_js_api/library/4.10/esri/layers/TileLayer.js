// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/assignHelper ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper dojo/io-query ../geometry ../request ../core/promiseUtils ../core/urlUtils ../core/accessorSupport/decorators ./Layer ./mixins/ArcGISCachedService ./mixins/ArcGISMapService ./mixins/OperationalLayer ./mixins/PortalLayer ./mixins/RefreshableLayer ./mixins/ScaleRangeLayer ./mixins/SublayersOwner ./support/arcgisLayers ./support/arcgisLayerUrl ./support/commonProperties".split(" "),
function(h,E,f,q,d,r,k,l,g,m,c,t,u,v,w,x,y,z,A,B,C,D){var n="Canvas/World_Dark_Gray_Base Canvas/World_Dark_Gray_Reference Canvas/World_Light_Gray_Base Canvas/World_Light_Gray_Reference Elevation/World_Hillshade Ocean/World_Ocean_Base Ocean/World_Ocean_Reference Ocean_Basemap Reference/World_Boundaries_and_Places Reference/World_Boundaries_and_Places_Alternate Reference/World_Transportation World_Imagery World_Street_Map World_Topo_Map".split(" ");return function(p){function b(a,e){a=p.call(this)||
this;a.spatialReference=null;a.sublayers=null;a.type="tile";a.url=null;return a}q(b,p);b.prototype.normalizeCtorArgs=function(a,e){return"string"===typeof a?f({url:a},e):a};b.prototype.load=function(){var a=this;this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service","Map Service"]}).then(function(){return a._fetchService()},function(){return a._fetchService()}));return this.when()};Object.defineProperty(b.prototype,"attributionDataUrl",{get:function(){return this._getDefaultAttribution(this._getMapName(this.parsedUrl.path.toLowerCase()))},
enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"operationalLayerType",{get:function(){if(this.capabilities)return this.capabilities.operations.supportsExportMap?"ArcGISTiledMapServiceLayer":"ArcGISTiledImageServiceLayer";var a=this.url||this.portalItem&&this.portalItem.url;return a&&/\/ImageServer(\/|\/?$)/i.test(a)?"ArcGISTiledImageServiceLayer":"ArcGISTiledMapServiceLayer"},enumerable:!0,configurable:!0});b.prototype.readSpatialReference=function(a,e){return(a=a||e.tileInfo&&
e.tileInfo.spatialReference)&&k.SpatialReference.fromJSON(a)};Object.defineProperty(b.prototype,"tileServers",{get:function(){return this._getDefaultTileServers(this.parsedUrl.path)},enumerable:!0,configurable:!0});b.prototype.castTileServers=function(a){return Array.isArray(a)?a.map(function(a){return m.urlToObject(a).path}):null};b.prototype.fetchTile=function(a,e,b,c){a=this.getTileUrl(a,e,b);e={responseType:"image"};c&&c.timestamp&&(e.query={_ts:c.timestamp});return l(a,e).then(function(a){return a.data})};
b.prototype.getTileUrl=function(a,e,b){var c=r.objectToQuery(f({},this.parsedUrl.query,{blankTile:!this.tilemapCache&&this.supportsBlankTile?!1:null,token:this.token?encodeURIComponent(this.token):null})),d=this.tileServers;return(d&&d.length?d[e%d.length]:this.parsedUrl.path)+"/tile/"+a+"/"+e+"/"+b+(c?"?"+c:"")};b.prototype.importLayerViewModule=function(a){switch(a.type){case "2d":return g.create(function(a){return h(["../views/2d/layers/TileLayerView2D"],a)});case "3d":return g.create(function(a){return h(["../views/3d/layers/TileLayerView3D"],
a)})}};b.prototype._fetchService=function(){var a=this;return g.create(function(b,c){a.resourceInfo?b({data:a.resourceInfo}):l(a.parsedUrl.path,{query:f({f:"json"},a.parsedUrl.query),responseType:"json"}).then(b,c)}).then(function(b){b.ssl&&(a.url=a.url.replace(/^http:/i,"https:"));a.read(b.data,{origin:"service",url:a.parsedUrl});if(10.1===a.version&&!C.isHostedAgolService(a.url))return B.fetchServerVersion(a.url).then(function(b){a.read({currentVersion:b})}).catch(function(){})})};b.prototype._getMapName=
function(a){return(a=a.match(/^(?:https?:)?\/\/(server|services)\.arcgisonline\.com\/arcgis\/rest\/services\/([^\/]+(\/[^\/]+)*)\/mapserver/i))&&a[2]};b.prototype._getDefaultAttribution=function(a){if(a){var b;a=a.toLowerCase();for(var c=0,d=n.length;c<d;c++)if(b=n[c],-1<b.toLowerCase().indexOf(a))return m.makeAbsolute("//static.arcgis.com/attribution/"+b)}};b.prototype._getDefaultTileServers=function(a){var b=-1!==a.search(/^(?:https?:)?\/\/server\.arcgisonline\.com/i),c=-1!==a.search(/^(?:https?:)?\/\/services\.arcgisonline\.com/i);
return b||c?[a,a.replace(b?/server\.arcgisonline/i:/services\.arcgisonline/i,b?"services.arcgisonline":"server.arcgisonline")]:[]};d([c.property({readOnly:!0,dependsOn:["parsedUrl"]})],b.prototype,"attributionDataUrl",null);d([c.property({readOnly:!0})],b.prototype,"operationalLayerType",null);d([c.property()],b.prototype,"popupTemplates",void 0);d([c.property({type:k.SpatialReference})],b.prototype,"spatialReference",void 0);d([c.reader("spatialReference",["spatialReference","tileInfo"])],b.prototype,
"readSpatialReference",null);d([c.property()],b.prototype,"resourceInfo",void 0);d([c.property({readOnly:!0})],b.prototype,"sublayers",void 0);d([c.property({dependsOn:["parsedUrl"],readOnly:!0})],b.prototype,"tileServers",null);d([c.cast("tileServers")],b.prototype,"castTileServers",null);d([c.property({readOnly:!0,json:{read:!1}})],b.prototype,"type",void 0);d([c.property(D.url)],b.prototype,"url",void 0);return b=d([c.subclass("esri.layers.TileLayer")],b)}(c.declared(t,A.default,v,u,z,w,x,y))});