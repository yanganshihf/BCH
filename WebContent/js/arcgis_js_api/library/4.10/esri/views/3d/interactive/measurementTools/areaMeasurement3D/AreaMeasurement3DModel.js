// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/decorateHelper ../../../../../core/Accessor ../../../../../core/Collection ../../../../../core/compilerUtils ../../../../../core/Handles ../../../../../core/Quantity ../../../../../core/quantityUtils ../../../../../core/unitUtils ../../../../../core/watchUtils ../../../../../core/accessorSupport/decorators ../../../../../geometry/SpatialReference ./MeasurementData ./PathChanges ../support/measurementUtils ../support/Path ../support/setUtils ../support/UnitNormalizer ../../../support/mathUtils ../../../support/projectionUtils".split(" "),
function(B,C,p,d,q,r,t,u,h,k,e,v,b,l,w,m,f,x,n,y,z,A){return function(g){function a(){var c=null!==g&&g.apply(this,arguments)||this;c._unitNormalizer=new y;c._measurementData=new w;c._measurementDataChanges=new m;c._viewDataChanges=new m;c._handles=new u;c.path=new x;c.pathVersion=0;c.cursorPoint=null;c.hoveredVertexHandle=null;c.draggedVertices=new r;c.state="initial";c.mode="auto";c.unit="metric";c.editable=!0;c.active=!1;c.maxRelativeErrorCoplanar=.005;c.maxRelativeErrorAlmostCoplanar=.01;c.verticalAngleThreshold=
80;c.geodesicMeasurementDistanceThreshold=1E5;return c}p(a,g);a.prototype.initialize=function(){var c=this;this._handles.add(v.whenTrue(this.sceneView,"ready",function(){var a=c.sceneView,b=a.spatialReference;c._renderSpatialReference=a.renderSpatialReference;c._worldSpatialReference=!b||b.isWGS84||b.isWebMercator?A.WGS84ECEFSpatialReference:b;c._unitNormalizer.spatialReference=b;c._unitNormalizer.ignoredSpatialReferences=[l.WGS84,l.WebMercator]}),"scene-view");this.reset();var a=function(){c._set("pathVersion",
c.pathVersion+1)};this._handles.add(this.path.on("cleared",function(){c._measurementDataChanges.fullChange();c._set("pathVersion",0)}));this._handles.add(this.path.on("vertex-added",function(b){c._measurementDataChanges.fullChange();a()}));this._handles.add(this.path.on("vertex-inserted",function(b){c._measurementDataChanges.fullChange();a()}));this._handles.add(this.path.on("vertex-removed",function(b){c._measurementDataChanges.fullChange();a()}));this._handles.add(this.path.on("vertex-updated",
function(b){c._measurementDataChanges.incrementalChange(b.index);a()}))};a.prototype.destroy=function(){this._handles.destroy();this._handles=null};Object.defineProperty(a.prototype,"validMeasurement",{get:function(){return 3<=this.path.length&&"measured"===this.state||"editing"===this.state},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"isMeasuring",{get:function(){return 1<=this.path.length},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"measurementData",
{get:function(){this._viewDataChanges.merge(this._measurementDataChanges);var c=n.clone(this._measurementData.intersectingSegments),a=n.clone(this._measurementData.geodesicIntersectingSegments);this._measurementData.update(this.path,this._measurementDataChanges,this.sceneView,this._unitNormalizer,this.validMeasurement,this._renderSpatialReference,this._worldSpatialReference,{maxRelativeErrorCoplanar:this.maxRelativeErrorCoplanar,maxRelativeErrorAlmostCoplanar:this.maxRelativeErrorAlmostCoplanar,verticalAngleThreshold:this.verticalAngleThreshold});
f.compareSets(this._measurementData.intersectingSegments,c)||this._viewDataChanges.fullChange();f.compareSets(this._measurementData.geodesicIntersectingSegments,a)||this._viewDataChanges.fullChange();return this._measurementData},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"area",{get:function(){return this.measurementData.area},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"geodesicArea",{get:function(){return this.measurementData.geodesicArea},enumerable:!0,
configurable:!0});Object.defineProperty(a.prototype,"areaLabel",{get:function(){return this._formatAreaLabel("geodesic"===this.measurementMode?this.measurementData.geodesicArea:this.measurementData.area,this.unit)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"pathLength",{get:function(){return this.measurementData.pathLength},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"geodesicPathLength",{get:function(){return this.measurementData.geodesicPathLength},
enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"pathLengthLabel",{get:function(){return this._formatLengthLabel("geodesic"===this.measurementMode?this.measurementData.geodesicPathLength:this.measurementData.pathLength,this.unit)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"perimeterLength",{get:function(){return this.measurementData.perimeterLength},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"geodesicPerimeterLength",{get:function(){return this.measurementData.geodesicPathLength},
enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"perimeterLengthLabel",{get:function(){return this.measurementData.perimeterLength&&this._formatLengthLabel("geodesic"===this.measurementMode?this.measurementData.geodesicPathLength:this.measurementData.perimeterLength,this.unit)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"cursorSegmentLength",{get:function(){return this.path.back&&this.cursorPoint&&new h(this._unitNormalizer.normalizeDistance(f.segmentLengthEuclidean(this.path.back,
this.cursorPoint,this._worldSpatialReference)),"meters")},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"geodesicCursorSegmentLength",{get:function(){return this.path.back&&this.cursorPoint&&new h(f.segmentLengthGeodesic(this.path.back,this.cursorPoint),"meters")},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"cursorSegmentLengthLabel",{get:function(){return this._formatLengthLabel("geodesic"===this.measurementMode?this.geodesicCursorSegmentLength:this.cursorSegmentLength,
this.unit)},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"viewData",{get:function(){var c=this.measurementData,a="geodesic"===this.measurementMode,b=a?this.geodesicArea:this.area,d=1;b&&(b=this._toPreferredAreaUnit(b,this.unit),d=z.nextHighestPowerOfTen(Math.sqrt(b.value)/Math.sqrt(300)),d*=Math.sqrt(e.convertUnit(1,b.unit,"square-meters")),d/=this._unitNormalizer.normalizeDistance(1));return{validMeasurement:this.validMeasurement,path:this.path,pathChanges:this._viewDataChanges,
positionsGeographic:c.positionsGeographic,positionsRenderCoords:c.positionsRenderCoords,positionsProjected:c.positionsProjectedWorldCoords,positionsFittedRenderCoords:c.positionsFittedRenderCoords,intersectingSegments:a?c.geodesicIntersectingSegments:c.intersectingSegments,triangleIndices:a?c.geodesicTriangleIndices:c.triangleIndices,fittingMode:c.fittingMode,areaCentroid:a?c.geodesicAreaCentroidRenderCoords:c.areaCentroidRenderCoords,areaNormal:a?c.geodesicAreaNormalRenderCoords:c.areaNormalRenderCoords,
pathLengthLabelSegmentIndex:this.validMeasurement?0:this.path.length-2,perimeterLengthLabelSegmentIndex:0,checkerSize:d}},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"measurementMode",{get:function(){var c=this.mode;"auto"===c&&(c="euclidean",(this.geodesicPathLength?this.geodesicPathLength.value:0)+(!this.validMeasurement&&this.geodesicCursorSegmentLength?this.geodesicCursorSegmentLength.value:0)>this.geodesicMeasurementDistanceThreshold&&(c="geodesic"));!this.sceneView.ready||
this.sceneView.spatialReference.isWGS84||this.sceneView.spatialReference.isWebMercator||(c="euclidean");return c},enumerable:!0,configurable:!0});a.prototype.reset=function(){this.clearMeasurement()};a.prototype.clearMeasurement=function(){this.path.clear();this.state="initial";this.cursorPoint=null};a.prototype.finishMeasurement=function(){3>this.path.length?this.clearMeasurement():(this._measurementDataChanges.fullChange(),this.state="measured")};a.prototype._preferredAreaUnit=function(c,a){switch(a){case "metric":return e.preferredMetricAreaUnit(c.value,
c.unit);case "imperial":return e.preferredImperialAreaUnit(c.value,c.unit);default:return a}};a.prototype._preferredLengthUnit=function(a,b){b=this._deriveLengthUnitFromAreaUnit(b);switch(b){case "metric":return e.preferredMetricLengthUnit(a.value,a.unit);case "imperial":return e.preferredImperialLengthUnit(a.value,a.unit);default:return b}};a.prototype._toPreferredAreaUnit=function(a,b){return a.toUnit(this._preferredAreaUnit(a,b))};a.prototype._toPreferredLengthUnit=function(a,b){return a.toUnit(this._preferredLengthUnit(a,
b))};a.prototype._formatAreaLabel=function(a,b){return a&&k.formatDecimal(a,this._preferredAreaUnit(a,b))};a.prototype._formatLengthLabel=function(a,b){return a&&k.formatDecimal(a,this._preferredLengthUnit(a,b))};a.prototype._deriveLengthUnitFromAreaUnit=function(a){switch(a){case "metric":return"metric";case "imperial":return"imperial";case "square-inches":return"inches";case "square-feet":return"feet";case "square-yards":return"yards";case "square-miles":return"miles";case "square-us-feet":return"us-feet";
case "square-millimeters":return"millimeters";case "square-centimeters":return"centimeters";case "square-decimeters":return"decimeters";case "square-meters":return"meters";case "square-kilometers":return"kilometers";case "acres":return"imperial";case "ares":case "hectares":return"metric";default:t.neverReached(a)}throw Error("unhandled area unit");};d([b.property({constructOnly:!0})],a.prototype,"sceneView",void 0);d([b.property({readOnly:!0})],a.prototype,"path",void 0);d([b.property({readOnly:!0})],
a.prototype,"pathVersion",void 0);d([b.property()],a.prototype,"cursorPoint",void 0);d([b.property()],a.prototype,"hoveredVertexHandle",void 0);d([b.property({readOnly:!0})],a.prototype,"draggedVertices",void 0);d([b.property()],a.prototype,"state",void 0);d([b.property()],a.prototype,"mode",void 0);d([b.property()],a.prototype,"unit",void 0);d([b.property()],a.prototype,"editable",void 0);d([b.property()],a.prototype,"active",void 0);d([b.property({readOnly:!0,dependsOn:["path.length","state"]})],
a.prototype,"validMeasurement",null);d([b.property({readOnly:!0,dependsOn:["path.length"]})],a.prototype,"isMeasuring",null);d([b.property({readOnly:!0,dependsOn:["pathVersion","validMeasurement","maxRelativeErrorCoplanar","maxRelativeErrorAlmostCoplanar","verticalAngleThreshold"]})],a.prototype,"measurementData",null);d([b.property({readOnly:!0,dependsOn:["measurementData"]})],a.prototype,"area",null);d([b.property({readOnly:!0,dependsOn:["measurementData"]})],a.prototype,"geodesicArea",null);d([b.property({readOnly:!0,
dependsOn:["measurementData","unit","measurementMode"]})],a.prototype,"areaLabel",null);d([b.property({readOnly:!0,dependsOn:["measurementData"]})],a.prototype,"pathLength",null);d([b.property({readOnly:!0,dependsOn:["measurementData"]})],a.prototype,"geodesicPathLength",null);d([b.property({readOnly:!0,dependsOn:["measurementData","unit","measurementMode"]})],a.prototype,"pathLengthLabel",null);d([b.property({readOnly:!0,dependsOn:["measurementData"]})],a.prototype,"perimeterLength",null);d([b.property({readOnly:!0,
dependsOn:["measurementData"]})],a.prototype,"geodesicPerimeterLength",null);d([b.property({readOnly:!0,dependsOn:["measurementData","unit","measurementMode"]})],a.prototype,"perimeterLengthLabel",null);d([b.property({readOnly:!0,dependsOn:["path.back","cursorPoint"]})],a.prototype,"cursorSegmentLength",null);d([b.property({readOnly:!0,dependsOn:["path.back","cursorPoint"]})],a.prototype,"geodesicCursorSegmentLength",null);d([b.property({readOnly:!0,dependsOn:["measurementData","unit","measurementMode"]})],
a.prototype,"cursorSegmentLengthLabel",null);d([b.property({readOnly:!0,dependsOn:["unit","measurementMode","measurementData"]})],a.prototype,"viewData",null);d([b.property()],a.prototype,"maxRelativeErrorCoplanar",void 0);d([b.property()],a.prototype,"maxRelativeErrorAlmostCoplanar",void 0);d([b.property()],a.prototype,"verticalAngleThreshold",void 0);d([b.property()],a.prototype,"geodesicMeasurementDistanceThreshold",void 0);d([b.property({readOnly:!0,dependsOn:["mode","validMeasurement","geodesicPathLength",
"geodesicCursorSegmentLength","geodesicMeasurementDistanceThreshold"]})],a.prototype,"measurementMode",null);return a=d([b.subclass("esri.views.3d.interactive.measurementTools.areaMeasurement3D.AreaMeasurement3DModel")],a)}(b.declared(q))});