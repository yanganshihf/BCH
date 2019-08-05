//>>built
(function(c,a){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?a(require("../moment")):"function"===typeof define&&define.amd?define(["../moment"],a):a(c.moment)})(this,function(c){return c.defineLocale("ug-cn",{months:"\u064a\u0627\u0646\u06cb\u0627\u0631 \u0641\u06d0\u06cb\u0631\u0627\u0644 \u0645\u0627\u0631\u062a \u0626\u0627\u067e\u0631\u06d0\u0644 \u0645\u0627\u064a \u0626\u0649\u064a\u06c7\u0646 \u0626\u0649\u064a\u06c7\u0644 \u0626\u0627\u06cb\u063a\u06c7\u0633\u062a \u0633\u06d0\u0646\u062a\u06d5\u0628\u0649\u0631 \u0626\u06c6\u0643\u062a\u06d5\u0628\u0649\u0631 \u0646\u0648\u064a\u0627\u0628\u0649\u0631 \u062f\u06d0\u0643\u0627\u0628\u0649\u0631".split(" "),
monthsShort:"\u064a\u0627\u0646\u06cb\u0627\u0631 \u0641\u06d0\u06cb\u0631\u0627\u0644 \u0645\u0627\u0631\u062a \u0626\u0627\u067e\u0631\u06d0\u0644 \u0645\u0627\u064a \u0626\u0649\u064a\u06c7\u0646 \u0626\u0649\u064a\u06c7\u0644 \u0626\u0627\u06cb\u063a\u06c7\u0633\u062a \u0633\u06d0\u0646\u062a\u06d5\u0628\u0649\u0631 \u0626\u06c6\u0643\u062a\u06d5\u0628\u0649\u0631 \u0646\u0648\u064a\u0627\u0628\u0649\u0631 \u062f\u06d0\u0643\u0627\u0628\u0649\u0631".split(" "),weekdays:"\u064a\u06d5\u0643\u0634\u06d5\u0646\u0628\u06d5 \u062f\u06c8\u0634\u06d5\u0646\u0628\u06d5 \u0633\u06d5\u064a\u0634\u06d5\u0646\u0628\u06d5 \u0686\u0627\u0631\u0634\u06d5\u0646\u0628\u06d5 \u067e\u06d5\u064a\u0634\u06d5\u0646\u0628\u06d5 \u062c\u06c8\u0645\u06d5 \u0634\u06d5\u0646\u0628\u06d5".split(" "),
weekdaysShort:"\u064a\u06d5 \u062f\u06c8 \u0633\u06d5 \u0686\u0627 \u067e\u06d5 \u062c\u06c8 \u0634\u06d5".split(" "),weekdaysMin:"\u064a\u06d5 \u062f\u06c8 \u0633\u06d5 \u0686\u0627 \u067e\u06d5 \u062c\u06c8 \u0634\u06d5".split(" "),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY-\u064a\u0649\u0644\u0649M-\u0626\u0627\u064a\u0646\u0649\u06adD-\u0643\u06c8\u0646\u0649",LLL:"YYYY-\u064a\u0649\u0644\u0649M-\u0626\u0627\u064a\u0646\u0649\u06adD-\u0643\u06c8\u0646\u0649\u060c HH:mm",
LLLL:"dddd\u060c YYYY-\u064a\u0649\u0644\u0649M-\u0626\u0627\u064a\u0646\u0649\u06adD-\u0643\u06c8\u0646\u0649\u060c HH:mm"},meridiemParse:/\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5|\u0633\u06d5\u06be\u06d5\u0631|\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646|\u0686\u06c8\u0634|\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646|\u0643\u06d5\u0686/,meridiemHour:function(a,b){12===a&&(a=0);return"\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5"===
b||"\u0633\u06d5\u06be\u06d5\u0631"===b||"\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646"===b?a:"\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646"===b||"\u0643\u06d5\u0686"===b?a+12:11<=a?a:a+12},meridiem:function(a,b,c){a=100*a+b;return 600>a?"\u064a\u06d0\u0631\u0649\u0645 \u0643\u06d0\u0686\u06d5":900>a?"\u0633\u06d5\u06be\u06d5\u0631":1130>a?"\u0686\u06c8\u0634\u062a\u0649\u0646 \u0628\u06c7\u0631\u06c7\u0646":1230>a?"\u0686\u06c8\u0634":1800>a?"\u0686\u06c8\u0634\u062a\u0649\u0646 \u0643\u06d0\u064a\u0649\u0646":
"\u0643\u06d5\u0686"},calendar:{sameDay:"[\u0628\u06c8\u06af\u06c8\u0646 \u0633\u0627\u0626\u06d5\u062a] LT",nextDay:"[\u0626\u06d5\u062a\u06d5 \u0633\u0627\u0626\u06d5\u062a] LT",nextWeek:"[\u0643\u06d0\u0644\u06d5\u0631\u0643\u0649] dddd [\u0633\u0627\u0626\u06d5\u062a] LT",lastDay:"[\u062a\u06c6\u0646\u06c8\u06af\u06c8\u0646] LT",lastWeek:"[\u0626\u0627\u0644\u062f\u0649\u0646\u0642\u0649] dddd [\u0633\u0627\u0626\u06d5\u062a] LT",sameElse:"L"},relativeTime:{future:"%s \u0643\u06d0\u064a\u0649\u0646",
past:"%s \u0628\u06c7\u0631\u06c7\u0646",s:"\u0646\u06d5\u0686\u0686\u06d5 \u0633\u06d0\u0643\u0648\u0646\u062a",ss:"%d \u0633\u06d0\u0643\u0648\u0646\u062a",m:"\u0628\u0649\u0631 \u0645\u0649\u0646\u06c7\u062a",mm:"%d \u0645\u0649\u0646\u06c7\u062a",h:"\u0628\u0649\u0631 \u0633\u0627\u0626\u06d5\u062a",hh:"%d \u0633\u0627\u0626\u06d5\u062a",d:"\u0628\u0649\u0631 \u0643\u06c8\u0646",dd:"%d \u0643\u06c8\u0646",M:"\u0628\u0649\u0631 \u0626\u0627\u064a",MM:"%d \u0626\u0627\u064a",y:"\u0628\u0649\u0631 \u064a\u0649\u0644",
yy:"%d \u064a\u0649\u0644"},dayOfMonthOrdinalParse:/\d{1,2}(-\u0643\u06c8\u0646\u0649|-\u0626\u0627\u064a|-\u06be\u06d5\u067e\u062a\u06d5)/,ordinal:function(a,b){switch(b){case "d":case "D":case "DDD":return a+"-\u0643\u06c8\u0646\u0649";case "w":case "W":return a+"-\u06be\u06d5\u067e\u062a\u06d5";default:return a}},preparse:function(a){return a.replace(/\u060c/g,",")},postformat:function(a){return a.replace(/,/g,"\u060c")},week:{dow:1,doy:7}})});