//>>built
define("dojox/html/ellipsis",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/array","dojo/_base/Color","dojo/colors"],function(c){if(7>c.isFF){var f=1;"dojoxFFEllipsisDelay"in c.config&&(f=Number(c.config.dojoxFFEllipsisDelay),isNaN(f)&&(f=1));try{var n=function(){var a=document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul","window"),b=document.createElementNS("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul","description");b.setAttribute("crop",
"end");a.appendChild(b);return function(b){var c=a.cloneNode(!0);c.firstChild.setAttribute("value",b.textContent);b.innerHTML="";b.appendChild(c)}}()}catch(a){}var m=c.create,p=c.doc,q=c.place,r=m("iframe",{className:"dojoxEllipsisIFrame",src:"javascript:'\x3chtml\x3e\x3chead\x3e\x3cscript\x3eif(\"loadFirebugConsole\" in window){window.loadFirebugConsole();}\x3c/script\x3e\x3c/head\x3e\x3cbody\x3e\x3c/body\x3e\x3c/html\x3e'",style:{display:"none"}}),k=function(a,b){if(!a.collapsed)if(0<b){do k(a),
b--;while(b)}else 3==a.endContainer.nodeType&&0<a.endOffset?a.setEnd(a.endContainer,a.endOffset-1):3==a.endContainer.nodeType?(a.setEndBefore(a.endContainer),k(a)):a.endOffset&&a.endContainer.childNodes.length>=a.endOffset?(b=a.endContainer.childNodes[a.endOffset-1],3==b.nodeType?a.setEnd(b,b.length-1):(b.childNodes.length?a.setEnd(b,b.childNodes.length):a.setEndBefore(b),k(a))):(a.setEndBefore(a.endContainer),k(a))},t=function(a){var b=m("div",{className:"dojoxEllipsisContainer"}),c=m("div",{className:"dojoxEllipsisShown",
style:{display:"none"}});a.parentNode.replaceChild(b,a);b.appendChild(a);b.appendChild(c);var d=r.cloneNode(!0),f=a.style,g=c.style,e=function(){f.display="";g.display="none";if(!(a.scrollWidth<=a.offsetWidth)){var b=p.createRange();b.selectNodeContents(a);f.display="none";g.display="";var d=!1;do{var e=1;q(b.cloneContents(),c,"only");var l=c.scrollWidth,h=c.offsetWidth,d=l<=h,l=1-1*h/l;0<l&&(e=Math.max(Math.round(c.textContent.length*l)-1,1));k(b,e)}while(!b.collapsed&&!d)}};d.onload=function(){d.contentWindow.onresize=
e;e()};b.appendChild(d)},u=c.hasClass,g=c.doc,d,e,h;g.querySelectorAll?(d=g,e="querySelectorAll",h=".dojoxEllipsis"):g.getElementsByClassName?(d=g,e="getElementsByClassName",h="dojoxEllipsis"):(d=c,e="query",h=".dojoxEllipsis");fx=function(){c.forEach(d[e].apply(d,[h]),function(a){a&&!a._djx_ellipsis_done&&(a._djx_ellipsis_done=!0,n&&a.textContent==a.innerHTML&&!u(a,"dojoxEllipsisSelectable")?n(a):t(a))})};c.addOnLoad(function(){var a=null,b=null,d=function(){b&&(c.disconnect(b),b=null);a&&clearTimeout(a);
a=setTimeout(function(){a=null;fx();b=c.connect(c.body(),"DOMSubtreeModified",d)},f)};d()})}});