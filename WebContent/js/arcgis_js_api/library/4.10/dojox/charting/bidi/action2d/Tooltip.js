//>>built
define(["dojo/_base/declare","dojo/dom-style"],function(e,f){return e(null,{_recheckPosition:function(a,b,c){if(this.chart.isRightToLeft()){var d=this.chart.offsets.l-this.chart.offsets.r;"marker"==a.element?(b.x=this.chart.dim.width-a.cx+d,c[0]="before-centered",c[1]="after-centered"):"circle"==a.element?b.x=this.chart.dim.width-a.cx-a.cr+d:"bar"==a.element||"column"==a.element?(b.x=this.chart.dim.width-b.width-b.x+d,"bar"==a.element&&(c[0]="before-centered",c[1]="after-centered")):"candlestick"==
a.element?b.x=this.chart.dim.width+d-a.x:"slice"==a.element&&("before-centered"!=c[0]&&"after-centered"!=c[0]||c.reverse(),b.x=a.cx+(a.cx-b.x))}},_format:function(a){var b="rtl"==f.get(this.chart.node,"direction"),c="rtl"==this.chart.getTextDir(a);return c&&!b?"\x3cspan dir \x3d 'rtl'\x3e"+a+"\x3c/span\x3e":!c&&b?"\x3cspan dir \x3d 'ltr'\x3e"+a+"\x3c/span\x3e":a}})});