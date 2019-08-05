<%@ page language="java" contentType="text/html; charset=utf-8"    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>视音频播放器</title>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/jPlayer-2.9.1/skin/pink.flag/jplayer.pink.flag.css"/>
<script
	src="${pageContext.request.contextPath}/js/jquery-2.1.4/jquery.js"
	type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/js/jPlayer-2.9.1/dist/jplayer/jquery.jplayer.min.js" type="text/javascript"></script>
<style>
html, body {
   height: 100%;
   width: 100%;
   margin: 0;
}
</style>
</head>
 
<script type="text/javascript">
$(document).ready(function() {
	
	/* var parentWinWidth = $(window.parent.window).width();
	var parentWinHeight = $(window.parent.window).height(); */
	
   var fileName = decodeURI(location.href.split("?")[1]);
   $("#jquery_jplayer_1").jPlayer({
       ready : function() {
           $(this).jPlayer("setMedia", {
               title : fileName,
               m4v : "/ResourceMonitor/eventMedia/"+fileName
           }).jPlayer("play");
       },
       swfPath : "/ResourceMonitor/js/jPlayer-2.9.1/dist/jplayer",
       supplied : "m4a,m4v",
       size: {
           width: "100%",
           height: "100%",
           cssClass: "jp-video-full"
       },
       solution: 'html, flash',
       fullScreen : true,
       preload: 'metadata',
       volume: 0.8,
       muted: false,
       backgroundColor: '#000000',
       cssSelectorAncestor: '#jp_container_1',
       cssSelector: {
        videoPlay: '.jp-video-play',
        play: '.jp-play',
        pause: '.jp-pause',
        stop: '.jp-stop',
        seekBar: '.jp-seek-bar',
        playBar: '.jp-play-bar',
        mute: '.jp-mute',
        unmute: '.jp-unmute',
        volumeBar: '.jp-volume-bar',
        volumeBarValue: '.jp-volume-bar-value',
        volumeMax: '.jp-volume-max',
        playbackRateBar: '.jp-playback-rate-bar',
        playbackRateBarValue: '.jp-playback-rate-bar-value',
        currentTime: '.jp-current-time',
        duration: '.jp-duration',
        title: '.jp-title',
        fullScreen: '.jp-full-screen',
        restoreScreen: '.jp-restore-screen',
        repeat: '.jp-repeat',
        repeatOff: '.jp-repeat-off',
        gui: '.jp-gui',
        noSolution: '.jp-no-solution'
       },
       errorAlerts: false,
       warningAlerts: false
   });
});
</script>
<body>
<div id="jp_container_1" class="jp-video jp-video-360p" role="application" aria-label="media player">
   <div class="jp-type-single">
       <div id="jquery_jplayer_1" class="jp-jplayer"></div>
       <div class="jp-gui">
           <div class="jp-video-play">
               <button class="jp-video-play-icon" role="button" tabindex="0">play</button>
           </div>
           <div class="jp-interface">
               <div class="jp-progress">
                   <div class="jp-seek-bar">
                       <div class="jp-play-bar"></div>
                   </div>
               </div>
               <div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>
               <div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>
               <div class="jp-details">
                   <div class="jp-title" aria-label="title">&nbsp;</div>
               </div>
               <div class="jp-controls-holder">
                   <div class="jp-volume-controls">
                       <button class="jp-mute" role="button" tabindex="0">mute</button>
                       <button class="jp-volume-max" role="button" tabindex="0">max volume</button>
                       <div class="jp-volume-bar">
                           <div class="jp-volume-bar-value"></div>
                       </div>
                   </div>
                   <div class="jp-controls">
                       <button class="jp-play" role="button" tabindex="0">play</button>
                       <button class="jp-stop" role="button" tabindex="0">stop</button>
                   </div>
                   <div class="jp-toggles">
                       <button class="jp-repeat" role="button" tabindex="0">repeat</button>
                   </div>
               </div>
           </div>
       </div>
   </div>                                                           
</div>
</body>
</html>