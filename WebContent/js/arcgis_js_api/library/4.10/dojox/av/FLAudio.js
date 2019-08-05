//>>built
define(["dojo","dojox/embed/Flash","dojox/timing/doLater"],function(b,d){b.experimental("dojox.av.FLVideo");return b.declare("dojox.av.FLAudio",null,{id:"",initialVolume:.7,initialPan:0,isDebug:!1,statusInterval:200,_swfPath:b.moduleUrl("dojox.av","resources/audio.swf"),allowScriptAccess:"always",allowNetworking:"all",constructor:function(a){b.global.swfIsInHTML=function(){return!0};b.mixin(this,a||{});this.id||(this.id="flaudio_"+(new Date).getTime());this.domNode=b.doc.createElement("div");b.style(this.domNode,
{position:"relative",width:"1px",height:"1px",top:"1px",left:"1px"});b.body().appendChild(this.domNode);this.init()},init:function(){this._subs=[];this.initialVolume=this._normalizeVolume(this.initialVolume);var a={path:this._swfPath,width:"1px",height:"1px",minimumVersion:9,expressInstall:!0,params:{wmode:"transparent",allowScriptAccess:this.allowScriptAccess,allowNetworking:this.allowNetworking},vars:{id:this.id,autoPlay:this.autoPlay,initialVolume:this.initialVolume,initialPan:this.initialPan,
statusInterval:this.statusInterval,isDebug:this.isDebug}};this._sub("mediaError","onError");this._sub("filesProgress","onLoadStatus");this._sub("filesAllLoaded","onAllLoaded");this._sub("mediaPosition","onPlayStatus");this._sub("mediaEnd","onComplete");this._sub("mediaMeta","onID3");this._flashObject=new dojox.embed.Flash(a,this.domNode);this._flashObject.onError=b.hitch(this,this.onError);this._flashObject.onLoad=b.hitch(this,function(a){this.flashMedia=a;this.isPlaying=this.autoPlay;this.isStopped=
!this.autoPlay;this.onLoad(this.flashMedia)})},load:function(a){if(dojox.timing.doLater(this.flashMedia,this))return!1;if(a.url)a.url=this._normalizeUrl(a.url);else throw Error("An url is required for loading media");this.flashMedia.load(a);return a.url},doPlay:function(a){this.flashMedia.doPlay(a)},pause:function(a){this.flashMedia.pause(a)},stop:function(a){this.flashMedia.doStop(a)},setVolume:function(a){this.flashMedia.setVolume(a)},setPan:function(a){this.flashMedia.setPan(a)},getVolume:function(a){return this.flashMedia.getVolume(a)},
getPan:function(a){return this.flashMedia.getPan(a)},getPosition:function(a){return this.flashMedia.getPosition(a)},onError:function(a){console.warn("SWF ERROR:",a)},onLoadStatus:function(a){},onAllLoaded:function(){},onPlayStatus:function(a){},onComplete:function(a){},onLoad:function(){},onID3:function(a){},destroy:function(){this.flashMedia?(b.forEach(this._subs,function(a){b.unsubscribe(a)}),b.forEach(this._cons,function(a){b.disconnect(a)}),this._flashObject.destroy()):this._cons.push(b.connect(this,
"onLoad",this,"destroy"))},_sub:function(a,c){b.subscribe(this.id+"/"+a,this,c)},_normalizeVolume:function(a){if(1<a)for(;1<a;)a*=.1;return a},_normalizeUrl:function(a){if(a&&0>a.toLowerCase().indexOf("http")){var b=window.location.href.split("/");b.pop();b=b.join("/")+"/";a=b+a}return a}})});