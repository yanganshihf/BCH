//>>built
(function(d,b){"object"===typeof exports&&"undefined"!==typeof module&&"function"===typeof require?b(require("../moment")):"function"===typeof define&&define.amd?define(["../moment"],b):b(d.moment)})(this,function(d){function b(a,b,c,d){a={s:["viensas secunds","'iensas secunds"],ss:[a+" secunds",""+a+" secunds"],m:["'n m\u00edut","'iens m\u00edut"],mm:[a+" m\u00eduts",""+a+" m\u00eduts"],h:["'n \u00feora","'iensa \u00feora"],hh:[a+" \u00feoras",""+a+" \u00feoras"],d:["'n ziua","'iensa ziua"],dd:[a+
" ziuas",""+a+" ziuas"],M:["'n mes","'iens mes"],MM:[a+" mesen",""+a+" mesen"],y:["'n ar","'iens ar"],yy:[a+" ars",""+a+" ars"]};return d?a[c][0]:b?a[c][0]:a[c][1]}return d.defineLocale("tzl",{months:"Januar Fevraglh Mar\u00e7 Avr\u00efu Mai G\u00fcn Julia Guscht Setemvar Listop\u00e4ts Noemvar Zecemvar".split(" "),monthsShort:"Jan Fev Mar Avr Mai G\u00fcn Jul Gus Set Lis Noe Zec".split(" "),weekdays:"S\u00faladi L\u00fane\u00e7i Maitzi M\u00e1rcuri Xh\u00faadi Vi\u00e9ner\u00e7i S\u00e1turi".split(" "),
weekdaysShort:"S\u00fal L\u00fan Mai M\u00e1r Xh\u00fa Vi\u00e9 S\u00e1t".split(" "),weekdaysMin:"S\u00fa L\u00fa Ma M\u00e1 Xh Vi S\u00e1".split(" "),longDateFormat:{LT:"HH.mm",LTS:"HH.mm.ss",L:"DD.MM.YYYY",LL:"D. MMMM [dallas] YYYY",LLL:"D. MMMM [dallas] YYYY HH.mm",LLLL:"dddd, [li] D. MMMM [dallas] YYYY HH.mm"},meridiemParse:/d\'o|d\'a/i,isPM:function(a){return"d'o"===a.toLowerCase()},meridiem:function(a,b,c){return 11<a?c?"d'o":"D'O":c?"d'a":"D'A"},calendar:{sameDay:"[oxhi \u00e0] LT",nextDay:"[dem\u00e0 \u00e0] LT",
nextWeek:"dddd [\u00e0] LT",lastDay:"[ieiri \u00e0] LT",lastWeek:"[s\u00fcr el] dddd [lasteu \u00e0] LT",sameElse:"L"},relativeTime:{future:"osprei %s",past:"ja%s",s:b,ss:b,m:b,mm:b,h:b,hh:b,d:b,dd:b,M:b,MM:b,y:b,yy:b},dayOfMonthOrdinalParse:/\d{1,2}\./,ordinal:"%d.",week:{dow:1,doy:4}})});