//>>built
define(["./has"],function(a){if(a("host-browser")){var c=navigator,b=c.userAgent,c=c.appVersion,d=parseFloat(c);a.add("edge",parseFloat(b.split("Edge/")[1])||void 0);a.add("webkit",!a("edge")&&parseFloat(b.split("WebKit/")[1])||void 0);a.add("chrome",!a("edge")&&!0&&parseFloat(b.split("Chrome/")[1])||void 0);a.add("safari",0<=c.indexOf("Safari")&&!a("chrome")&&!a("edge")?parseFloat(c.split("Version/")[1]):void 0);a.add("mac",0<=c.indexOf("Macintosh"));if(b.match(/(iPhone|iPod|iPad)/)){var f=RegExp.$1.replace(/P/,
"p"),e=b.match(/OS ([\d_]+)/)?RegExp.$1:"1",e=parseFloat(e.replace(/_/,".").replace(/_/g,""));a.add(f,e);a.add("ios",e)}a.add("trident",parseFloat(c.split("Trident/")[1])||void 0);a("webkit")||(0<=b.indexOf("Opera")&&a.add("opera",9.8<=d?parseFloat(b.split("Version/")[1])||d:d),0<=b.indexOf("Gecko")&&!a("trident")&&!a("edge")&&a.add("mozilla",d),a("mozilla")&&a.add("ff",parseFloat(b.split("Firefox/")[1]||b.split("Minefield/")[1])||void 0),document.all&&!a("opera")&&(b=parseFloat(c.split("MSIE ")[1])||
void 0,(c=document.documentMode)&&5!=c&&Math.floor(b)!=c&&(b=c),a.add("ie",b)))}return a});