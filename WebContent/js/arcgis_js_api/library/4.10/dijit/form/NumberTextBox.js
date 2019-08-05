//>>built
define("dojo/_base/declare dojo/_base/lang dojo/i18n dojo/string dojo/number ./RangeBoundTextBox".split(" "),function(d,g,h,m,f,n){var k=function(a){a=a||{};var c=h.getLocalization("dojo.cldr","number",h.normalizeLocale(a.locale)),b=a.pattern?a.pattern:c[(a.type||"decimal")+"Format"];a="number"==typeof a.places?a.places:"string"===typeof a.places&&0<a.places.length?a.places.replace(/.*,/,""):-1!=b.indexOf(".")?b.split(".")[1].replace(/[^#0]/g,"").length:0;return{sep:c.decimal,places:a}},l=d("dijit.form.NumberTextBoxMixin",
null,{pattern:function(a){return"("+(this.focused&&this.editOptions?this._regExpGenerator(g.delegate(a,this.editOptions))+"|":"")+this._regExpGenerator(a)+")"},value:NaN,editOptions:{pattern:"#.######"},_formatter:f.format,_regExpGenerator:f.regexp,_decimalInfo:k(),postMixInProperties:function(){this.inherited(arguments);this._set("type","text")},_setConstraintsAttr:function(a){var c="number"==typeof a.places?a.places:0;c&&c++;"number"!=typeof a.max&&(a.max=9*Math.pow(10,15-c));"number"!=typeof a.min&&
(a.min=-9*Math.pow(10,15-c));this.inherited(arguments,[a]);this.focusNode&&this.focusNode.value&&!isNaN(this.value)&&this.set("value",this.value);this._decimalInfo=k(a)},_onFocus:function(){if(!this.disabled&&!this.readOnly){var a=this.get("value");"number"!=typeof a||isNaN(a)||(a=this.format(a,this.constraints),void 0!==a&&(this.textbox.value=a));this.inherited(arguments)}},format:function(a,c){var b=String(a);if("number"!=typeof a)return b;if(isNaN(a))return"";if(!("rangeCheck"in this&&this.rangeCheck(a,
c))&&!1!==c.exponent&&/\de[-+]?\d/i.test(b))return b;this.editOptions&&this.focused&&(c=g.mixin({},c,this.editOptions));return this._formatter(a,c)},_parser:f.parse,parse:function(a,c){var b=g.mixin({},c,this.editOptions&&this.focused?this.editOptions:{});if(this.focused&&null!=b.places){var e=b.places,e="number"===typeof e?e:Number(e.split(",").pop());b.places="0,"+e}b=this._parser(a,b);this.editOptions&&this.focused&&isNaN(b)&&(b=this._parser(a,c));return b},_getDisplayedValueAttr:function(){var a=
this.inherited(arguments);return isNaN(a)?this.textbox.value:a},filter:function(a){if(null==a||"string"==typeof a&&""==a)return NaN;"number"!=typeof a||isNaN(a)||0==a||(a=f.round(a,this._decimalInfo.places));return this.inherited(arguments,[a])},serialize:function(a,c){return"number"!=typeof a||isNaN(a)?"":this.inherited(arguments)},_setBlurValue:function(){var a=g.hitch(g.delegate(this,{focused:!0}),"get")("value");this._setValueAttr(a,!0)},_setValueAttr:function(a,c,b){if(void 0!==a&&void 0===b)if(b=
String(a),"number"==typeof a)if(isNaN(a))b="";else{if("rangeCheck"in this&&this.rangeCheck(a,this.constraints)||!1===this.constraints.exponent||!/\de[-+]?\d/i.test(b))b=void 0}else a?a=void 0:(b="",a=NaN);this.inherited(arguments,[a,c,b])},_getValueAttr:function(){var a=this.inherited(arguments);if(isNaN(a)&&""!==this.textbox.value){if(!1!==this.constraints.exponent&&/\de[-+]?\d/i.test(this.textbox.value)&&(new RegExp("^"+f._realNumberRegexp(g.delegate(this.constraints))+"$")).test(this.textbox.value))return a=
Number(this.textbox.value),isNaN(a)?void 0:a}else return a},isValid:function(a){if(!this.focused||this._isEmpty(this.textbox.value))return this.inherited(arguments);var c=this.get("value");return!isNaN(c)&&this.rangeCheck(c,this.constraints)?!1!==this.constraints.exponent&&/\de[-+]?\d/i.test(this.textbox.value)?!0:this.inherited(arguments):!1},_isValidSubset:function(){var a="number"==typeof this.constraints.min,c="number"==typeof this.constraints.max,b=this.get("value");if(isNaN(b)||!a&&!c)return this.inherited(arguments);
var e=b|0,g=0>b,d=-1!=this.textbox.value.indexOf(this._decimalInfo.sep),f=(this.maxLength||20)-this.textbox.value.length,h=d?this.textbox.value.split(this._decimalInfo.sep)[1].replace(/[^0-9]/g,""):"",e=d?e+"."+h:e+"",f=m.rep("9",f),d=b;g?d=Number(e+f):b=Number(e+f);return!(a&&b<this.constraints.min||c&&d>this.constraints.max)}});d=d("dijit.form.NumberTextBox",[n,l],{baseClass:"dijitTextBox dijitNumberTextBox"});d.Mixin=l;return d});