// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../core/tsSupport/assignHelper ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper dojo/string dojo/_base/url ../geometry ../request ../core/Error ../core/lang ../core/MultiOriginJSONSupport ../core/promiseUtils ../core/urlUtils ../core/accessorSupport/decorators ./Layer ./mixins/OperationalLayer ./mixins/PortalLayer ./mixins/RefreshableLayer ./mixins/ScaleRangeLayer ./support/commonProperties ./support/LOD ./support/TileInfo".split(" "),function(h,D,E,
r,e,t,k,g,u,v,w,x,l,m,d,y,z,A,B,C,n,c,p){return function(q){function b(a,f){a=q.call(this)||this;a.copyright="";a.fullExtent=new g.Extent(-2.0037508342787E7,-2.003750834278E7,2.003750834278E7,2.0037508342787E7,g.SpatialReference.WebMercator);a.legendEnabled=!0;a.popupEnabled=!0;a.spatialReference=g.SpatialReference.WebMercator;a.subDomains=null;a.tileInfo=new p({size:256,dpi:96,format:"PNG8",compressionQuality:0,origin:new g.Point({x:-2.0037508342787E7,y:2.0037508342787E7,spatialReference:g.SpatialReference.WebMercator}),
spatialReference:g.SpatialReference.WebMercator,lods:[new c({level:0,scale:5.91657527591555E8,resolution:156543.033928}),new c({level:1,scale:2.95828763795777E8,resolution:78271.5169639999}),new c({level:2,scale:1.47914381897889E8,resolution:39135.7584820001}),new c({level:3,scale:7.3957190948944E7,resolution:19567.8792409999}),new c({level:4,scale:3.6978595474472E7,resolution:9783.93962049996}),new c({level:5,scale:1.8489297737236E7,resolution:4891.96981024998}),new c({level:6,scale:9244648.868618,
resolution:2445.98490512499}),new c({level:7,scale:4622324.434309,resolution:1222.99245256249}),new c({level:8,scale:2311162.217155,resolution:611.49622628138}),new c({level:9,scale:1155581.108577,resolution:305.748113140558}),new c({level:10,scale:577790.554289,resolution:152.874056570411}),new c({level:11,scale:288895.277144,resolution:76.4370282850732}),new c({level:12,scale:144447.638572,resolution:38.2185141425366}),new c({level:13,scale:72223.819286,resolution:19.1092570712683}),new c({level:14,
scale:36111.909643,resolution:9.55462853563415}),new c({level:15,scale:18055.954822,resolution:4.77731426794937}),new c({level:16,scale:9027.977411,resolution:2.38865713397468}),new c({level:17,scale:4513.988705,resolution:1.19432856685505}),new c({level:18,scale:2256.994353,resolution:.597164283559817}),new c({level:19,scale:1128.497176,resolution:.298582141647617})]});a.type="web-tile";a.urlTemplate=null;return a}r(b,q);b.prototype.normalizeCtorArgs=function(a,f){return"string"===typeof a?w.mixin({urlTemplate:a},
f||{}):a};b.prototype.load=function(){var a=this,f=this.loadFromPortal({supportedTypes:["WMTS"]}).then(function(){if(!a.urlTemplate)throw new v("layer:load","WebTileLayer (title: '"+a.title+"', id: '"+a.id+"') is missing the required 'urlTemplate' property value");});this.addResolvingPromise(f);return this.when()};Object.defineProperty(b.prototype,"levelValues",{get:function(){var a=[];if(!this.tileInfo)return null;for(var f=0,b=this.tileInfo.lods;f<b.length;f++){var c=b[f];a[c.level]=c.levelValue||
c.level}return a},enumerable:!0,configurable:!0});b.prototype.readSpatialReference=function(a,f){return a||f.fullExtent&&f.fullExtent.spatialReference&&g.SpatialReference.fromJSON(f.fullExtent.spatialReference)};Object.defineProperty(b.prototype,"tileServers",{get:function(){if(!this.urlTemplate)return null;var a=[],f=this.subDomains,b=new k(this.urlTemplate),c=b.scheme?b.scheme+"://":"//",d=c+b.authority+"/";if(-1===b.authority.indexOf("{subDomain}"))a.push(d);else if(f&&0<f.length&&1<b.authority.split(".").length)for(d=
0;d<f.length;d++)a.push(c+b.authority.replace(/\{subDomain\}/gi,f[d])+"/");return a.map(function(a){"/"!==a.charAt(a.length-1)&&(a+="/");return a})},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"urlPath",{get:function(){if(!this.urlTemplate)return null;var a=this.urlTemplate,b=new k(a);return a.substring(((b.scheme?b.scheme+"://":"//")+b.authority+"/").length)},enumerable:!0,configurable:!0});b.prototype.readUrlTemplate=function(a,b){return a||b.templateUrl};b.prototype.writeUrlTemplate=
function(a,b,c){a&&m.isProtocolRelative(a)&&(a="https:"+a);b.templateUrl=a?m.normalize(a):a};b.prototype.fetchTile=function(a,b,c,d){a=this.getTileUrl(a,b,c);b={responseType:"image"};d&&d.timestamp&&(b.query={_ts:d.timestamp});return u(a,b).then(function(a){return a.data})};b.prototype.getTileUrl=function(a,b,c){a=this.levelValues[a];var d=this.tileServers[b%this.tileServers.length]+t.substitute(this.urlPath,{level:a,col:c,row:b});return d=d.replace(/\{level\}/gi,""+a).replace(/\{row\}/gi,""+b).replace(/\{col\}/gi,
""+c)};b.prototype.importLayerViewModule=function(a){switch(a.type){case "2d":return l.create(function(a){return h(["../views/2d/layers/TileLayerView2D"],a)});case "3d":return l.create(function(a){return h(["../views/3d/layers/TileLayerView3D"],a)})}};e([d.property({type:String,value:"",json:{write:!0}})],b.prototype,"copyright",void 0);e([d.property({type:g.Extent,json:{write:!0}})],b.prototype,"fullExtent",void 0);e([d.property(n.legendEnabled)],b.prototype,"legendEnabled",void 0);e([d.property({dependsOn:["tileInfo"]})],
b.prototype,"levelValues",null);e([d.property({type:["WebTiledLayer"],value:"WebTiledLayer"})],b.prototype,"operationalLayerType",void 0);e([d.property(n.popupEnabled)],b.prototype,"popupEnabled",void 0);e([d.property({type:g.SpatialReference})],b.prototype,"spatialReference",void 0);e([d.reader("spatialReference",["spatialReference","fullExtent.spatialReference"])],b.prototype,"readSpatialReference",null);e([d.property({type:[String],json:{write:!0}})],b.prototype,"subDomains",void 0);e([d.property({type:p,
json:{write:!0}})],b.prototype,"tileInfo",void 0);e([d.property({readOnly:!0,dependsOn:["urlTemplate","subDomains"]})],b.prototype,"tileServers",null);e([d.property({json:{read:!1}})],b.prototype,"type",void 0);e([d.property({dependsOn:["urlTemplate"]})],b.prototype,"urlPath",null);e([d.property({type:String,json:{origins:{"portal-item":{read:{source:"url"}}}}})],b.prototype,"urlTemplate",void 0);e([d.reader("urlTemplate",["urlTemplate","templateUrl"])],b.prototype,"readUrlTemplate",null);e([d.writer("urlTemplate",
{templateUrl:{type:String}})],b.prototype,"writeUrlTemplate",null);e([d.property({json:{write:!0}})],b.prototype,"wmtsInfo",void 0);return b=e([d.subclass("esri.layers.WebTileLayer")],b)}(d.declared(y,z,x,C,A,B))});