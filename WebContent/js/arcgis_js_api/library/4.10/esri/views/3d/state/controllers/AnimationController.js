// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../ViewAnimation","./CameraController"],function(f,g,h,e,a){Object.defineProperty(g,"__esModule",{value:!0});f=function(d){function c(b){void 0===b&&(b=new e);var a=d.call(this)||this;a.viewAnimation=b;return a}h(c,d);Object.defineProperty(c.prototype,"canStop",{get:function(){return!0},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"asyncResult",{get:function(){return this._asyncResult},set:function(b){this._asyncResult&&
this._asyncResult.reject();this._asyncResult=b;if(this.state===a.State.Finished||this.state===a.State.Stopped)this._asyncResult=null,this.state===a.State.Finished?b.resolve():b.reject()},enumerable:!0,configurable:!0});c.prototype.onControllerStart=function(a){var b=this;d.prototype.onControllerStart.call(this,a);this.viewAnimation&&this.viewAnimation.when().catch(function(){}).then(function(){b.updateStateFromViewAnimation()})};c.prototype.updateStateFromViewAnimation=function(){!this.viewAnimation||
this.state!==a.State.Ready&&this.state!==a.State.Running||(this.viewAnimation.state===e.State.FINISHED?this.finish():this.viewAnimation.state===e.State.STOPPED&&(this.state=a.State.Stopped))};c.prototype.onControllerEnd=function(b){this.viewAnimation&&(this.viewAnimation.done||(this.state===a.State.Finished?this.viewAnimation.finish():this.state===a.State.Stopped&&this.viewAnimation.stop()));this._asyncResult&&(this.state===a.State.Finished?this._asyncResult.resolve():this._asyncResult.reject());
d.prototype.onControllerEnd.call(this,b)};c.prototype.finish=function(){this.finishController()};return c}(a.CameraController);g.AnimationController=f});