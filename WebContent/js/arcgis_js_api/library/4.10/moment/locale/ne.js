//>>built
(function(c,b){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?b(require("../moment")):"function"===typeof define&&define.amd?define(["../moment"],b):b(c.moment)})(this,function(c){var b={1:"\u0967",2:"\u0968",3:"\u0969",4:"\u096a",5:"\u096b",6:"\u096c",7:"\u096d",8:"\u096e",9:"\u096f",0:"\u0966"},d={"\u0967":"1","\u0968":"2","\u0969":"3","\u096a":"4","\u096b":"5","\u096c":"6","\u096d":"7","\u096e":"8","\u096f":"9","\u0966":"0"};return c.defineLocale("ne",{months:"\u091c\u0928\u0935\u0930\u0940 \u092b\u0947\u092c\u094d\u0930\u0941\u0935\u0930\u0940 \u092e\u093e\u0930\u094d\u091a \u0905\u092a\u094d\u0930\u093f\u0932 \u092e\u0908 \u091c\u0941\u0928 \u091c\u0941\u0932\u093e\u0908 \u0905\u0917\u0937\u094d\u091f \u0938\u0947\u092a\u094d\u091f\u0947\u092e\u094d\u092c\u0930 \u0905\u0915\u094d\u091f\u094b\u092c\u0930 \u0928\u094b\u092d\u0947\u092e\u094d\u092c\u0930 \u0921\u093f\u0938\u0947\u092e\u094d\u092c\u0930".split(" "),
monthsShort:"\u091c\u0928. \u092b\u0947\u092c\u094d\u0930\u0941. \u092e\u093e\u0930\u094d\u091a \u0905\u092a\u094d\u0930\u093f. \u092e\u0908 \u091c\u0941\u0928 \u091c\u0941\u0932\u093e\u0908. \u0905\u0917. \u0938\u0947\u092a\u094d\u091f. \u0905\u0915\u094d\u091f\u094b. \u0928\u094b\u092d\u0947. \u0921\u093f\u0938\u0947.".split(" "),monthsParseExact:!0,weekdays:"\u0906\u0907\u0924\u092c\u093e\u0930 \u0938\u094b\u092e\u092c\u093e\u0930 \u092e\u0919\u094d\u0917\u0932\u092c\u093e\u0930 \u092c\u0941\u0927\u092c\u093e\u0930 \u092c\u093f\u0939\u093f\u092c\u093e\u0930 \u0936\u0941\u0915\u094d\u0930\u092c\u093e\u0930 \u0936\u0928\u093f\u092c\u093e\u0930".split(" "),
weekdaysShort:"\u0906\u0907\u0924. \u0938\u094b\u092e. \u092e\u0919\u094d\u0917\u0932. \u092c\u0941\u0927. \u092c\u093f\u0939\u093f. \u0936\u0941\u0915\u094d\u0930. \u0936\u0928\u093f.".split(" "),weekdaysMin:"\u0906. \u0938\u094b. \u092e\u0902. \u092c\u0941. \u092c\u093f. \u0936\u0941. \u0936.".split(" "),weekdaysParseExact:!0,longDateFormat:{LT:"A\u0915\u094b h:mm \u092c\u091c\u0947",LTS:"A\u0915\u094b h:mm:ss \u092c\u091c\u0947",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY, A\u0915\u094b h:mm \u092c\u091c\u0947",
LLLL:"dddd, D MMMM YYYY, A\u0915\u094b h:mm \u092c\u091c\u0947"},preparse:function(a){return a.replace(/[\u0967\u0968\u0969\u096a\u096b\u096c\u096d\u096e\u096f\u0966]/g,function(a){return d[a]})},postformat:function(a){return a.replace(/\d/g,function(a){return b[a]})},meridiemParse:/\u0930\u093e\u0924\u093f|\u092c\u093f\u0939\u093e\u0928|\u0926\u093f\u0909\u0901\u0938\u094b|\u0938\u093e\u0901\u091d/,meridiemHour:function(a,b){12===a&&(a=0);if("\u0930\u093e\u0924\u093f"===b)return 4>a?a:a+12;if("\u092c\u093f\u0939\u093e\u0928"===
b)return a;if("\u0926\u093f\u0909\u0901\u0938\u094b"===b)return 10<=a?a:a+12;if("\u0938\u093e\u0901\u091d"===b)return a+12},meridiem:function(a,b,c){return 3>a?"\u0930\u093e\u0924\u093f":12>a?"\u092c\u093f\u0939\u093e\u0928":16>a?"\u0926\u093f\u0909\u0901\u0938\u094b":20>a?"\u0938\u093e\u0901\u091d":"\u0930\u093e\u0924\u093f"},calendar:{sameDay:"[\u0906\u091c] LT",nextDay:"[\u092d\u094b\u0932\u093f] LT",nextWeek:"[\u0906\u0909\u0901\u0926\u094b] dddd[,] LT",lastDay:"[\u0939\u093f\u091c\u094b] LT",
lastWeek:"[\u0917\u090f\u0915\u094b] dddd[,] LT",sameElse:"L"},relativeTime:{future:"%s\u092e\u093e",past:"%s \u0905\u0917\u093e\u0921\u093f",s:"\u0915\u0947\u0939\u0940 \u0915\u094d\u0937\u0923",ss:"%d \u0938\u0947\u0915\u0947\u0923\u094d\u0921",m:"\u090f\u0915 \u092e\u093f\u0928\u0947\u091f",mm:"%d \u092e\u093f\u0928\u0947\u091f",h:"\u090f\u0915 \u0918\u0923\u094d\u091f\u093e",hh:"%d \u0918\u0923\u094d\u091f\u093e",d:"\u090f\u0915 \u0926\u093f\u0928",dd:"%d \u0926\u093f\u0928",M:"\u090f\u0915 \u092e\u0939\u093f\u0928\u093e",
MM:"%d \u092e\u0939\u093f\u0928\u093e",y:"\u090f\u0915 \u092c\u0930\u094d\u0937",yy:"%d \u092c\u0930\u094d\u0937"},week:{dow:0,doy:6}})});