//>>built
define(["dojo/_base/declare","dojo/keys","./_Spinner","./NumberTextBox"],function(g,d,h,k){return g("dijit.form.NumberSpinner",[h,k.Mixin],{baseClass:"dijitTextBox dijitSpinner dijitNumberTextBox",adjust:function(a,b){var c=this.constraints,d=isNaN(a),e=!isNaN(c.max),f=!isNaN(c.min);d&&0!=b&&(a=0<b?f?c.min:e?c.max:0:e?this.constraints.max:f?c.min:0);b=a+b;if(d||isNaN(b))return a;e&&b>c.max&&(b=c.max);f&&b<c.min&&(b=c.min);return b},_onKeyDown:function(a){if(!(this.disabled||this.readOnly||a.keyCode!=
d.HOME&&a.keyCode!=d.END||a.ctrlKey||a.altKey||a.metaKey||"undefined"==typeof this.get("value"))){var b=this.constraints[a.keyCode==d.HOME?"min":"max"];"number"==typeof b&&this._setValueAttr(b,!1);a.stopPropagation();a.preventDefault()}}})});