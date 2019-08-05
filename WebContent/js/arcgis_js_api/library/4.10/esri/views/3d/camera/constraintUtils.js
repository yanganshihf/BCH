// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.10/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/libs/gl-matrix-2/gl-matrix ./constraintUtils/altitude ./constraintUtils/common ./constraintUtils/distance ./constraintUtils/surfaceCollision ./constraintUtils/tilt ../../animation/easing ./constraintUtils/tilt ./constraintUtils/altitude ./constraintUtils/distance ./constraintUtils/surfaceCollision".split(" "),function(z,a,r,e,m,f,t,g,u,n,p,q,v){Object.defineProperty(a,"__esModule",{value:!0});a.applyTilt=n.apply;a.tiltError=n.error;a.applyAltitude=p.apply;a.altitudeError=
p.error;a.applyDistance=q.apply;a.distanceError=q.error;a.applySurfaceCollision=v.apply;a.applyAll=function(d,b,c,a){void 0===c&&(c=w);void 0===a&&(a=b);var h=!1;a!==b&&a.copyFrom(b);a.markViewDirty();a.computeUp(d.state.mode);for(b=0;b<x;b++){for(var e=0,k=0,f=y;k<f.length;k++){var l=f[k];if(m.hasConstraintType(c.selection,l.type)){var g=Math.abs(l.error(d,a,c));l.apply(d,a,c)&&(h=!0,e+=g)}}if(0===e)break}b=m.hasConstraintType(c.selection,8);a:switch(c.interactionType){case 4:c=1;break a;case 5:c=
d.state.isGlobal?2:1;break a;default:c=0}b&&t.apply(d,a,c)&&(h=!0);h&&a.computeUp(d.state.mode);return h};a.pixelDistanceToInteractionFactor=function(a,b){a="number"===typeof a?a:r.vec2.distance(a,b);return u.inOutCubic(Math.min(1,a/150))};var y=[{type:1,error:function(a,b,c){return g.error(a,b,c)*b.distance},apply:g.apply},{type:2,error:e.error,apply:e.apply},{type:4,error:f.error,apply:f.apply}],w={selection:15,interactionType:0,interactionFactor:0,interactionStartCamera:null,interactionDirection:null,
tiltMode:0},x=5});