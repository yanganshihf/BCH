//>>built
(function(a,b){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?b(require("../moment")):"function"===typeof define&&define.amd?define(["../moment"],b):b(a.moment)})(this,function(a){return a.defineLocale("fo",{months:"januar februar mars apr\u00edl mai juni juli august september oktober november desember".split(" "),monthsShort:"jan feb mar apr mai jun jul aug sep okt nov des".split(" "),weekdays:"sunnudagur m\u00e1nadagur t\u00fdsdagur mikudagur h\u00f3sdagur fr\u00edggjadagur leygardagur".split(" "),
weekdaysShort:"sun m\u00e1n t\u00fds mik h\u00f3s fr\u00ed ley".split(" "),weekdaysMin:"su m\u00e1 t\u00fd mi h\u00f3 fr le".split(" "),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D. MMMM, YYYY HH:mm"},calendar:{sameDay:"[\u00cd dag kl.] LT",nextDay:"[\u00cd morgin kl.] LT",nextWeek:"dddd [kl.] LT",lastDay:"[\u00cd gj\u00e1r kl.] LT",lastWeek:"[s\u00ed\u00f0stu] dddd [kl] LT",sameElse:"L"},relativeTime:{future:"um %s",past:"%s s\u00ed\u00f0ani",
s:"f\u00e1 sekund",ss:"%d sekundir",m:"ein minutt",mm:"%d minuttir",h:"ein t\u00edmi",hh:"%d t\u00edmar",d:"ein dagur",dd:"%d dagar",M:"ein m\u00e1na\u00f0i",MM:"%d m\u00e1na\u00f0ir",y:"eitt \u00e1r",yy:"%d \u00e1r"},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}})});