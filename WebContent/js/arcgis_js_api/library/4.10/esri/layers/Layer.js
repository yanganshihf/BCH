// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require ../core/Accessor ../core/Error ../core/Evented ../core/Identifiable ../core/Loadable ../core/urlUtils ../core/promiseUtils ../core/Logger ../config ../kernel ../request ../geometry/SpatialReference ../geometry/Extent".split(" "),function(g,c,e,n,f,p,q,d,h,r,k,t,l,u){f=f.Identifiable;var v=0,m=h.getLogger("esri.layers.Layer");c=c.createSubclass([n,f,p],{declaredClass:"esri.layers.Layer",properties:{attributionDataUrl:null,credential:{value:null,readOnly:!0,dependsOn:["loaded","parsedUrl"],
get:function(){return this.loaded&&this.parsedUrl&&k.id&&k.id.findCredential(this.parsedUrl.path)||null}},fullExtent:new u(-180,-90,180,90,l.WGS84),hasAttributionData:{readOnly:!0,dependsOn:["attributionDataUrl"],get:function(){return null!=this.attributionDataUrl}},id:{get:function(){return Date.now().toString(16)+"-layer-"+v++}},legendEnabled:!0,listMode:{type:["show","hide","hide-children"],value:"show"},opacity:{value:1,type:Number,nonNullable:!0,cast:function(a){return 0>a?0:1<a?1:a}},parent:null,
parsedUrl:{readOnly:!0,dependsOn:["url"],get:function(){var a=this._get("url");return a?q.urlToObject(a):null}},popupEnabled:!0,attributionVisible:!0,spatialReference:l.WGS84,title:null,token:{dependsOn:["credential.token"],get:function(){var a=this.get("parsedUrl.query.token"),b=this.get("credential.token");return a||b||null},set:function(a){a?this._override("token",a):this._clearOverride("token")}},type:{type:String,readOnly:!0,value:null,json:{read:!1}},url:{value:null},visible:{value:!0,nonNullable:!0,
type:Boolean}},initialize:function(){this.when().catch(function(a){h.getLogger(this.declaredClass).error("#load()","Failed to load layer (title: '"+this.title+"', id: '"+this.id+"')",a)}.bind(this))},createLayerView:function(a){return a?this.importLayerViewModule(a).then(function(b){b.default&&(b=b.default);return new b({layer:this,view:a})}.bind(this)):d.reject(new e("layerview:module-unavailable","No LayerView module available for layer '${layer.declaredClass}' and view type: '${view.type}'",{view:a,
layer:this}))},destroyLayerView:function(a){a.destroy()},fetchAttributionData:function(){var a=this.attributionDataUrl;return this.hasAttributionData&&a?t(a,{query:{f:"json"},responseType:"json"}).then(function(a){return a.data}):d.reject(new e("layer:no-attribution-data","Layer does not have attribution data"))},refresh:function(){this.emit("refresh")},importLayerViewModule:function(a){return d.reject(new e("layerview:override-method","Must provide implementation in '${layer.declaredClass}'",{view:a,
layer:this}))}});c.fromArcGISServerUrl=function(a){"string"===typeof a&&(a={url:a});var b=d.create(function(a){g(["./support/arcgisLayers"],a)}).then(function(b){return b.fromUrl(a)});b.catch(function(b){m.error("#fromArcGISServerUrl({ url: '"+a.url+"'})","Failed to create layer from arcgis server url",b)});return b};c.fromPortalItem=function(a){!a||a.portalItem||"object"!==typeof a||a.declaredClass&&"esri.portal.PortalItem"!==a.declaredClass||(a={portalItem:a});var b=d.create(function(a){g(["../portal/support/portalLayers"],
a)}).then(function(b){return b.fromItem(a)});b.catch(function(b){var c=a&&a.portalItem;m.error("#fromPortalItem()","Failed to create layer from portal item (portal: '"+(c&&c.portal&&c.portal.url||r.portalUrl)+"', id: '"+(c&&c.id||"unset")+"')",b)});return b};return c});