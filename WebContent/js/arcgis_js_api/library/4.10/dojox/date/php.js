//>>built
define(["dojo/_base/kernel","dojo/_base/lang","dojo/date","dojox/string/tokenize"],function(e,h,f,g){var d=e.getObject("date.php",!0,dojox);d.format=function(a,b){return(new d.DateFormat(b)).format(a)};d.DateFormat=function(a){if(!this.regex){var b=[],c;for(c in this.constructor.prototype)e.isString(c)&&1==c.length&&e.isFunction(this[c])&&b.push(c);this.constructor.prototype.regex=new RegExp("(?:(\\\\.)|(["+b.join("")+"]))","g")}var d=[];this.tokens=g(a,this.regex,function(a,b,c){if(b)return d.push([c,
b]),b;if(a)return a.charAt(1)});this.replacements=d};e.extend(d.DateFormat,{weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),weekdays_3:"Sun Mon Tue Wed Thu Fri Sat".split(" "),months:"January February March April May June July August September October November December".split(" "),months_3:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),monthdays:[31,28,31,30,31,30,31,31,30,31,30,31],format:function(a){this.date=a;a=0;for(var b;b=this.replacements[a];a++)this.tokens[b[0]]=
this[b[1]]();return this.tokens.join("")},d:function(){var a=this.j();return 1==a.length?"0"+a:a},D:function(){return this.weekdays_3[this.date.getDay()]},j:function(){return this.date.getDate()+""},l:function(){return this.weekdays[this.date.getDay()]},N:function(){var a=this.w();return a?a:7},S:function(){switch(this.date.getDate()){case 11:case 12:case 13:return"th";case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th"}},w:function(){return this.date.getDay()+
""},z:function(){var a=this.date.getTime()-(new Date(this.date.getFullYear(),0,1)).getTime();return Math.floor(a/864E5)+""},W:function(){var a,b=(new Date(this.date.getFullYear(),0,1)).getDay()+1;a=this.date.getDay()+1;var c=parseInt(this.z());c<=8-b&&4<b?(a=new Date(this.date.getFullYear()-1,this.date.getMonth(),this.date.getDate()),a=5==b||6==b&&f.isLeapYear(a)?53:52):(this.L()?366:365)-c<4-a?a=1:(a=Math.ceil((c+(7-a)+(b-1))/7),4<b&&--a);return a},F:function(){return this.months[this.date.getMonth()]},
m:function(){var a=this.n();return 1==a.length?"0"+a:a},M:function(){return this.months_3[this.date.getMonth()]},n:function(){return this.date.getMonth()+1+""},t:function(){return this.L()&&1==this.date.getMonth()?29:this.monthdays[this.getMonth()]},L:function(){return f.isLeapYear(this.date)?"1":"0"},o:function(){},Y:function(){return this.date.getFullYear()+""},y:function(){return this.Y().slice(-2)},a:function(){return 12<=this.date.getHours()?"pm":"am"},b:function(){return this.a().toUpperCase()},
B:function(){for(var a=this.date.getTimezoneOffset()+60,a=3600*this.date.getHours()+60*this.date.getMinutes()+this.getSeconds()+60*a,a=Math.abs(Math.floor(a/86.4)%1E3)+"";2>a.length;)a="0"+a;return a},g:function(){return(this.date.getHours()%12||12)+""},G:function(){return this.date.getHours()+""},h:function(){var a=this.g();return 1==a.length?"0"+a:a},H:function(){var a=this.G();return 1==a.length?"0"+a:a},i:function(){var a=this.date.getMinutes()+"";return 1==a.length?"0"+a:a},s:function(){var a=
this.date.getSeconds()+"";return 1==a.length?"0"+a:a},e:function(){return f.getTimezoneName(this.date)},I:function(){},O:function(){var a=Math.abs(this.date.getTimezoneOffset()),b=Math.floor(a/60)+"",a=a%60+"";1==b.length&&(b="0"+b);1==a.length&&(b="0"+a);return(0>this.date.getTimezoneOffset()?"+":"-")+b+a},P:function(){var a=this.O();return a.substring(0,2)+":"+a.substring(2,4)},T:function(){return this.e().substring(0,3)},Z:function(){return-60*this.date.getTimezoneOffset()},c:function(){return this.Y()+
"-"+this.m()+"-"+this.d()+"T"+this.h()+":"+this.i()+":"+this.s()+this.P()},r:function(){return this.D()+", "+this.d()+" "+this.M()+" "+this.Y()+" "+this.H()+":"+this.i()+":"+this.s()+" "+this.O()},U:function(){return Math.floor(this.date.getTime()/1E3)}});return d});