// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define(["../../core/Accessor","../../core/kebabDictionary"],function(d,c){var e=c({preserveShape:"preserve-shape"}),f=c({esriAcres:"acres",esriHectares:"hectares",esriSquareMiles:"square-miles",esriSquareKilometers:"square-kilometers",esriSquareMeters:"square-meters",esriSquareFeet:"square-feet",esriSquareYards:"square-yards",esriAres:"ares"}),g=c({9001:"meters",9002:"feet",9036:"kilometers",9093:"miles",109012:"nautical-miles",109001:"yards"});return d.createSubclass({declaredClass:"esri.tasks.support.AreasAndLengthsParameters",
properties:{areaUnit:null,calculationType:null,lengthUnit:null,polygons:null},toJSON:function(){var b={};if(this.polygons&&0<this.polygons.length){var a=this.polygons.map(function(a){return a.toJSON()});b.polygons=JSON.stringify(a);a=this.polygons[0].spatialReference;b.sr=a.wkid?a.wkid:JSON.stringify(a.toJSON())}this.lengthUnit&&(b.lengthUnit=g.toJSON(this.lengthUnit));this.areaUnit&&(a=f.toJSON(this.areaUnit),b.areaUnit="string"==typeof a?JSON.stringify({areaUnit:a}):a);this.calculationType&&(b.calculationType=
e.toJSON(this.calculationType));return b}})});