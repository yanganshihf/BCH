// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../state/controllers/global/ZoomStepController ../../state/controllers/local/ZoomStepController ../../../input/InputHandler".split(" "),function(a,e,f,g,h,k){Object.defineProperty(e,"__esModule",{value:!0});a=function(a){function d(l,b){var c=a.call(this,!0)||this;c.view=l;c.registerIncoming("mouse-wheel",b,function(a){return c.handleMouseWheel(a)});return c}f(d,a);d.prototype.handleMouseWheel=function(a){var b=a.data;this.cameraController&&
this.cameraController.active||(this.cameraController=this.view.state.isGlobal?new g.ZoomStepController(this.view,"interaction"):new h.ZoomStepController(this.view,"interaction"),this.view.state.switchCameraController(this.cameraController));this.cameraController.zoomStep(-1/60*b.deltaY,[b.x,this.view.height-b.y]);a.stopPropagation()};return d}(k.InputHandler);e.MouseWheelZoom=a});