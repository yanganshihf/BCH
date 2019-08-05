// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
require({cache:{"url:esri/widgets/SizeSlider/templates/SizeSlider.html":'\x3cdiv class\x3d"${_css.container}"\x3e\r\n  \x3cdiv data-dojo-attach-point\x3d"_containerNode"\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"_titleNode"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"_sliderNode"\x3e\x3c/div\x3e\r\n    \x3cdiv data-dojo-attach-point\x3d"_scaleNode"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("./Widgette ./RendererSlider ./RendererSlider/sliderUtils ../Color ../core/numberUtils dijit/_TemplatedMixin dojo/debounce dojo/dom-style dojo/dom-construct dojo/dom-class dojox/gfx dojo/text!./SizeSlider/templates/SizeSlider.html".split(" "),function(m,n,h,k,p,q,r,e,t,u,g,v){return m.createSubclass([q],{_rampNode:null,_sliderHeight:null,_barsGroup:null,_updateTimer:null,_css:null,_defaultHeight:200,_handles:[0,1],declaredClass:"esri.widgets.SizeSlider",templateString:v,properties:{visualVariable:null,
values:null,minValue:{dependsOn:["statistics"],get:function(){return this.get("statistics.min")||0},set:function(a){if(void 0===a)return this._clearOverride("minValue");this._override("minValue",a)}},maxValue:{dependsOn:["statistics"],get:function(){return this.get("statistics.max")||100},set:function(a){if(void 0===a)return this._clearOverride("maxValue");this._override("maxValue",a)}},minSize:null,maxSize:null,histogram:null,statistics:null,zoomOptions:null,histogramVisible:!0,statisticsVisible:!0,
labelsVisible:!0,ticksVisible:!0,handlesVisible:!0,histogramWidth:100,rampWidth:26,symbolWidth:50,isDate:!1,isRatio:!1},constructor:function(){this._css={container:"esri-size-info-slider",handlerTickSize:"esri-handler-tick-size"};this._attachSymbols=r(this._attachSymbols,0)},postCreate:function(){this.inherited(arguments);this._setUpDataDefaults()},startup:function(){this.inherited(arguments);this._slider=new n({type:"SizeSlider",values:this.values,isDate:this.isDate,minimum:this.zoomOptions?this.zoomOptions.minSliderValue:
this.minValue,maximum:this.zoomOptions?this.zoomOptions.maxSliderValue:this.maxValue,_minZoomLabel:this.zoomOptions?this.minValue:null,_maxZoomLabel:this.zoomOptions?this.maxValue:null,_isZoomed:this.zoomOptions?!0:!1,labelsVisible:this.labelsVisible,ticksVisible:this.ticksVisible,handlesVisible:this.handlesVisible,handles:this._handles},this._sliderNode);this._slider.startup();this._rampNode=this._slider._sliderAreaRight;this._sliderHeight=e.get(this._rampNode,"height")||this._defaultHeight;this._createSVGSurfaces();
this._slider.on("slide",function(a){this._fillRamp(a.values)}.bind(this));this._slider.on("data-change",function(a){this._updateVisualVariable(a.values);this.values=a.values;this._fillRamp();this.emit("data-change",{})}.bind(this));this._slider.on("handle-value-change",function(a){this._updateVisualVariable(a.values);this.values=a.values;this._updateRendererSlider();this.emit("handle-value-change",{})}.bind(this));this._slider.on("data-value-change",function(a){this.set({minValue:a.min,maxValue:a.max});
this._updateRendererSlider();this.emit("data-value-change",{})}.bind(this));this._slider.on("stop",function(){this.emit("handle-value-change",{})}.bind(this));this._slider.on("zoom-out",function(){this.zoomOptions=null}.bind(this));this.statistics&&this.statisticsVisible&&this._generateStatistics();this.histogramVisible&&(this.histogram||this.zoomOptions&&this.zoomOptions.histogram)&&this._generateHistogram();this.watch("minValue, maxValue, symbol, visualVariable, minSize, maxSize, statistics, histogram, zoomOptions",
this._updateTimeout);this.watch("histogramVisible",this._toggleHistogram);this.watch("zoomOptions",this._zoomEventHandler)},destroy:function(){this._slider&&this._slider.destroy();this._avgHandleObjs&&this._avgHandleObjs.avgHandleTooltip&&this._avgHandleObjs.avgHandleTooltip.destroy();this.countTooltips&&this.countTooltips.forEach(function(a){a.destroy()})},refresh:function(){this._updateTimeout()},_updateTimeout:function(){this._updateRendererSlider()},_updateRendererSlider:function(){var a=this.visualVariable,
b=this._calculateMinValue(),c=this._calculateMaxValue();this.set({minSize:a.minSize,maxSize:a.maxSize,values:[b,c]});null!==this.zoomOptions&&!1!==this.zoomOptions?(this.toggleSliderBottom=this.zoomOptions.minSliderValue>this.minValue,this.toggleSliderTop=this.zoomOptions.maxSliderValue<this.maxValue,this._slider.set({minimum:this.zoomOptions.minSliderValue,maximum:this.zoomOptions.maxSliderValue,_minZoomLabel:this.minValue,_maxZoomLabel:this.maxValue,_isZoomed:!0})):this._slider.set({minimum:this.minValue,
maximum:this.maxValue,_minZoomLabel:null,_maxZoomLabel:null,_isZoomed:!1});this._slider.set("values",this.values);this._slider._reset();this._slider._updateRoundedLabels();this._slider._generateMoveables();this._clearRect();this._createSVGSurfaces();this.statistics&&this.statisticsVisible&&this._generateStatistics();this.histogramVisible&&(this.histogram||this.zoomOptions&&this.zoomOptions.histogram)&&this._generateHistogram()},_updateVisualVariable:function(a){this.set({"visualVariable.minDataValue":a[0],
"visualVariable.maxDataValue":a[1]})},_zoomEventHandler:function(){this.emit("zoom",{zoomed:!!this.zoomOptions})},_setUpDataDefaults:function(){var a=this.visualVariable,b=a.minDataValue,c=a.maxDataValue;this.set({minSize:a.minSize,maxSize:a.maxSize});null!==this.zoomOptions&&!1!==this.zoomOptions&&(this.toggleSliderBottom=this.zoomOptions.minSliderValue>this.minValue,this.toggleSliderTop=this.zoomOptions.maxSliderValue<this.maxValue);null===b&&null===c||0===b&&0===c?null===this.minValue&&null===
this.maxValue&&this.set({minValue:0,maxValue:100,values:[20,80]}):this.minValue===this.maxValue?0===this.minValue||null===this.minValue?this.set({minValue:0,maxValue:100,values:[20,80]}):this.set({minValue:0,maxValue:2*this.minValue,values:[this.maxValue/5,this.maxValue/5*4]}):(a=this._calculateMinValue(),b=this._calculateMaxValue(),this.values=[a,b]);null===this.minValue&&(this.minValue=0);null===this.maxValue&&(this.maxValue=100)},_calculateMinValue:function(){if(!this.visualVariable)return this.minValue;
var a=this.visualVariable.minDataValue;return void 0===a||null===a?this.minValue:a<this.minValue?this.minValue:a},_calculateMaxValue:function(){if(!this.visualVariable)return this.maxValue;var a=this.visualVariable.maxDataValue;return void 0===a||null===a?this.maxValue:a>this.maxValue?this.maxValue:a},_createSVGSurfaces:function(){this._proportionalSymbolSurface=g.createSurface(this._rampNode,this.rampWidth,this._sliderHeight);this._surfaceRect=this._proportionalSymbolSurface.createRect({width:this.rampWidth,
height:this._sliderHeight});this._histogramSurface=h.generateHistogramSurface(this._rampNode,this.histogramWidth,this._sliderHeight,this.rampWidth);this._fillRamp();this._attachSymbols()},_attachSymbols:function(){this._attachSymbol(this._slider.moveables[0],this.minSize,"min");this._attachSymbol(this._slider.moveables[1],this.maxSize,"max")},_attachSymbol:function(a,b){var c=e.get(a.handleContainer,"height"),d=this.symbol||{type:"custom"};a.symbol||(a.symbol=t.create("div",{style:"position: absolute; left: 10px;"},
a));switch(d.type){case "simple-line":b=b===this.minSize?5:13;this._generateLineSymbol(a,b,c);break;case "simple-marker":b=b===this.minSize?12:48;this._generateCircleSymbol(a.symbol,b,c);break;default:b=b===this.minSize?12:48,this._generateCircleSymbol(a.symbol,b,c)}return a.symbol},_generateLineSymbol:function(a,b,c){var d=a.symbol;u.add(a.tick,this._css.handlerTickSize);e.set(d,"top",c/2-b+"px");e.set(d,"height",2*b+"px");e.set(d,"width",b-4+"px");d.innerHTML="";a=g.createSurface(d);a.rawNode.style.position=
"absolute";a.rawNode.style.top=1===b?"1px":b/2+"px";this.isLeftToRight()||(a.rawNode.style.left="-45px");a.setDimensions(this.rampWidth,b);a.createRect({width:this.rampWidth,height:b}).setFill(new k([0,121,193,.8]));return a},_generateCircleSymbol:function(a,b,c){var d=b/2;b=12===b?!0:!1;var l=this.isLeftToRight();e.set(a,"top",c/2-(d+1)+"px");e.set(a,"height",2*(d+1)+"px");e.set(a,"width",b?2*(d+1):d+"px");e.set(a,"left",b?"8px":"10px");a.innerHTML="";a=g.createSurface(a);a.rawNode.style.position=
"absolute";l||(a.rawNode.style.left=b?"-35px":"-53px");b?(a.setDimensions(2*(d+1),2*(d+1)),a.createCircle({cx:7,cy:d+1,r:d}).setFill(new k([0,121,193,.8])).setStroke("#fff")):(a.setDimensions(d+1,2*(d+1)),a.createCircle({cx:l?0:23,cy:d+1,r:d}).setFill(new k([0,121,193,.8])).setStroke("#fff"));return a},_fillRamp:function(a){var b=this._slider,c=this._sliderHeight,d=Math.round(c-((a?a[0]:b.values[0])-b.minimum)/(b.maximum-b.minimum)*c);a=Math.round(c-((a?a[1]:b.values[1])-b.minimum)/(b.maximum-b.minimum)*
c);b=this.rampWidth;this.isLeftToRight()?(this._proportionalSymbolSurface.clear(),this._proportionalSymbolSurface.createPath().moveTo(b,0).lineTo(b,a).lineTo(10,d).lineTo(10,c).lineTo(0,c).lineTo(0,0).closePath().setFill("#9a9a9a")):(this._proportionalSymbolSurface.clear(),this._proportionalSymbolSurface.createPath().moveTo(b,0).lineTo(b,c).lineTo(b-10,c).lineTo(b-10,d).lineTo(0,a).lineTo(0,0).closePath().setFill("#9a9a9a"));e.set(this._proportionalSymbolSurface.rawNode,"overflow","visible");e.set(this._proportionalSymbolSurface.rawNode,
"background-color","#d9d9d9");null!==this.zoomOptions&&!1!==this.zoomOptions&&(this.toggleSliderBottom&&this.toggleSliderTop?(this._proportionalSymbolSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({color:"#fff",width:3}).setTransform(g.matrix.translate(0,5)),this._proportionalSymbolSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({color:"#fff",width:3}).setTransform(g.matrix.translate(0,195))):this.toggleSliderBottom?this._proportionalSymbolSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({color:"#fff",
width:3}).setTransform(g.matrix.translate(0,195)):this.toggleSliderTop&&this._proportionalSymbolSurface.createPath("M0,1 L6.25,-1 L12.5,1 L18.75,-1 L25,1").setStroke({color:"#fff",width:3}).setTransform(g.matrix.translate(0,5)))},_clearRect:function(){this._proportionalSymbolSurface.destroy();this._histogramSurface.destroy()},_showHistogram:function(){this.histogram||this.zoomOptions&&this.zoomOptions.histogram?this._generateHistogram():this._barsGroup&&(this._barsGroup.destroy(),this._barsGroup=
null)},_toggleHistogram:function(){this.histogramVisible?(e.set(this._barsGroup.rawNode,"display","inline-block"),this._showHistogram()):e.set(this._barsGroup.rawNode,"display","none")},_generateHistogram:function(){var a=this.zoomOptions&&this.zoomOptions.histogram?this.zoomOptions.histogram:this.histogram;this._barsGroup=h.generateHistogram(this._histogramSurface,a,this.histogramWidth,this.rampWidth,this.isLeftToRight());this.countTooltips=h.generateCountTooltips(a,this._barsGroup)},_generateStatistics:function(){if(!(2>
this.statistics.count||isNaN(this.statistics.avg))){var a,b=this.statistics;a=this._slider;var c=this.zoomOptions||null,d=h.getPrecision(this.maxValue),e,f;b.min===b.max&&b.min===b.avg?(e=0,f=2*b.avg):(e=b.min,f=b.max);if(e!==a.minimum||f!==a.maximum)e=a.minimum,f=a.maximum;c&&(e=c.minSliderValue,f=c.maxSliderValue);a=this._sliderHeight*(f-b.avg)/(f-e);b=p.round([b.avg,f,e])[0];this._avgHandleObjs=h.generateAvgLine(this._histogramSurface,b,a,d,this.isLeftToRight(),this.isDate,this.isRatio)}}})});