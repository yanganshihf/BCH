// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/Handles ../../core/Logger ../../core/watchUtils ../../core/accessorSupport/decorators ../../geometry/support/scaleUtils ../../views/3d/interactive/measurementTools/areaMeasurement3D/AreaMeasurement3DTool ../support/InteractiveToolViewModel".split(" "),function(r,t,h,d,k,l,m,c,n,p,q){var e="metric imperial square-inches square-feet square-yards square-miles square-us-feet square-meters square-kilometers acres ares hectares".split(" "),
f=l.getLogger("esri.widgets.AreaMeasurement3D.AreaMeasurement3DViewModel");return function(g){function b(a){a=g.call(this,a)||this;a.supportedViewType="3d";a._handles=new k;a._userUnitOptions=null;a._userUnit=null;a.tool=null;return a}h(b,g);b.prototype.initialize=function(){var a=this;this._handles.add([m.init(this,"unit",function(b){a.tool&&(a.tool.unit=b)})])};Object.defineProperty(b.prototype,"state",{get:function(){if(this.isDisabled)return"disabled";var a=this.tool.state;return"measured"===
a?"measuring":a},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"measurement",{get:function(){if(this.isDisabled)return null;var a=this.tool.model,b=a.measurementMode,c=a.measurementData,d=a.validMeasurement,e=(c=0===("euclidean"===b?c.intersectingSegments:c.geodesicIntersectingSegments).size)?d?"available":"unavailable":"invalid";return{mode:b,area:{text:c&&d?a.areaLabel:null,state:e},perimeterLength:{text:c&&d?a.perimeterLengthLabel:null,state:e}}},enumerable:!0,configurable:!0});
Object.defineProperty(b.prototype,"defaultUnit",{get:function(){return this.defaultUnitFromPortal||this.defaultUnitFromSpatialReference||"metric"},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"defaultUnitFromSpatialReference",{get:function(){return n.getDefaultUnitSystem(this.view&&this.view.spatialReference)},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"defaultUnitFromPortal",{get:function(){var a=this.get("view.map.portalItem.portal");if(!a)return null;
switch(a.user&&a.user.units||a.units){case "metric":return"metric";case "english":return"imperial";default:return null}},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"unitOptions",{get:function(){return this._filteredOrAllUnits(this._userUnitOptions)},set:function(a){this._userUnitOptions=a;this._set("unitOptions",this._filteredOrAllUnits(this._userUnitOptions))},enumerable:!0,configurable:!0});Object.defineProperty(b.prototype,"unit",{get:function(){return this._userUnit?this._userUnit=
this._findSelectableUnit(this._userUnit,this.defaultUnit):this._findSelectableUnit(this.defaultUnit)},set:function(a){this._userUnit=a?this._findSelectableUnit(a,this._userUnit):null;this.notifyChange("unit")},enumerable:!0,configurable:!0});b.prototype.newMeasurement=function(){this.tool&&this.tool.newMeasurement()};b.prototype.clearMeasurement=function(){this.tool&&this.tool.clearMeasurement()};b.prototype.createTool=function(a){return new p({view:a,unit:this.unit})};b.prototype.logUnsupportedError=
function(){f.error("AreaMeasurement3D widget is not implemented for MapView")};b.prototype.logError=function(){for(var a=[],b=0;b<arguments.length;b++)a[b]=arguments[b];f.error.apply(f,a)};b.prototype._findSelectableUnit=function(a,b){var c=this.unitOptions;return-1!==c.indexOf(a)?a:b?this._findSelectableUnit(b):c[0]};b.prototype._filteredOrAllUnits=function(a){if(!a)return e.slice();a=a.filter(function(a){return-1!==e.indexOf(a)});return 0===a.length?e.slice():a};d([c.property({dependsOn:["view.ready",
"isDisabled","tool.state"],readOnly:!0})],b.prototype,"state",null);d([c.property({dependsOn:"view.ready tool.area tool.geodesicArea tool.areaLabel tool.perimeterLength tool.geodesicPerimeterLength tool.model.perimeterLengthLabel tool.model.measurementMode tool.model.measurementData".split(" "),readOnly:!0})],b.prototype,"measurement",null);d([c.property({constructOnly:!0})],b.prototype,"tool",void 0);d([c.property({readOnly:!0,dependsOn:["defaultUnitFromPortal","defaultUnitFromSpatialReference"]})],
b.prototype,"defaultUnit",null);d([c.property({readOnly:!0,dependsOn:["view.spatialReference"]})],b.prototype,"defaultUnitFromSpatialReference",null);d([c.property({readOnly:!0,dependsOn:["view.map.portalItem.portal.units","view.map.portalItem.portal.user.units"]})],b.prototype,"defaultUnitFromPortal",null);d([c.property({dependsOn:["view.spatialReference"]})],b.prototype,"unitOptions",null);d([c.property({dependsOn:["unitOptions","defaultUnit"]})],b.prototype,"unit",null);d([c.property()],b.prototype,
"clearMeasurement",null);return b=d([c.subclass("esri.widgets.AreaMeasurement3D.AreaMeasurement3DViewModel")],b)}(c.declared(q))});