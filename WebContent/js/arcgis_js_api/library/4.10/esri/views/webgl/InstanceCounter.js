// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(b,c){return function(){function a(){this._instanceCount={textureCount:0,bufferCount:0,vaoCount:0,programCount:0,framebufferCount:0,renderBufferCount:0}}a.prototype.incrementCount=function(a){switch(a){case 0:this._instanceCount.textureCount++;break;case 1:this._instanceCount.bufferCount++;break;case 2:this._instanceCount.vaoCount++;break;case 3:this._instanceCount.programCount++;break;case 4:this._instanceCount.framebufferCount++;break;case 5:this._instanceCount.renderBufferCount++}};
a.prototype.decrementCount=function(a){switch(a){case 0:this._instanceCount.textureCount--;break;case 1:this._instanceCount.bufferCount--;break;case 2:this._instanceCount.vaoCount--;break;case 3:this._instanceCount.programCount--;break;case 4:this._instanceCount.framebufferCount--;break;case 5:this._instanceCount.renderBufferCount--}};a.prototype.printResourceCount=function(){console.log("Live objects:");console.log("Textures: "+this._instanceCount.textureCount);console.log("Buffers: "+this._instanceCount.bufferCount);
console.log("VAOs: "+this._instanceCount.vaoCount);console.log("Programs: "+this._instanceCount.programCount);console.log("Framebuffers: "+this._instanceCount.framebufferCount);console.log("Renderbuffers: "+this._instanceCount.renderBufferCount)};return a}()});