//>>built
define(["dojo/_base/array","dijit/_BidiSupport"],function(d,e){var c={enforceTextDirWithUcc:function(a,b){return b?(b="auto"===b?e.prototype._checkContextual(a):b,("rtl"===b?c.MARK.RLE:c.MARK.LRE)+a+c.MARK.PDF):a},removeUCCFromText:function(a){return a?a.replace(/\u202A|\u202B|\u202C/g,""):a},setTextDirForButtons:function(a){var b=a.getChildren();b&&a.textDir&&d.forEach(b,function(b){b.set("textDir",a.textDir)},a)},MARK:{LRE:"\u202a",RLE:"\u202b",PDF:"\u202c"}};return c});