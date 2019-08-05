//>>built
define("dojo/_base/array dojo/_base/lang dojo/_base/declare dojo/_base/connect dojo/_base/event dojo/_base/sniff dojo/query ./util dojo/_base/html".split(" "),function(p,r,t,d,g,m,u,q,f){return t("dojox.grid._FocusManager",null,{constructor:function(a){this.grid=a;this.cell=null;this.rowIndex=-1;this._connects=[];this._headerConnects=[];this.headerMenu=this.grid.headerMenu;this._connects.push(d.connect(this.grid.domNode,"onfocus",this,"doFocus"));this._connects.push(d.connect(this.grid.domNode,"onblur",
this,"doBlur"));this._connects.push(d.connect(this.grid.domNode,"mousedown",this,"_mouseDown"));this._connects.push(d.connect(this.grid.domNode,"mouseup",this,"_mouseUp"));this._connects.push(d.connect(this.grid.domNode,"oncontextmenu",this,"doContextMenu"));this._connects.push(d.connect(this.grid.lastFocusNode,"onfocus",this,"doLastNodeFocus"));this._connects.push(d.connect(this.grid.lastFocusNode,"onblur",this,"doLastNodeBlur"));this._connects.push(d.connect(this.grid,"_onFetchComplete",this,"_delayedCellFocus"));
this._connects.push(d.connect(this.grid,"postrender",this,"_delayedHeaderFocus"))},destroy:function(){p.forEach(this._connects,d.disconnect);p.forEach(this._headerConnects,d.disconnect);delete this.grid;delete this.cell},_colHeadNode:null,_colHeadFocusIdx:null,_contextMenuBindNode:null,tabbingOut:!1,focusClass:"dojoxGridCellFocus",focusView:null,initFocusView:function(){this.focusView=this.grid.views.getFirstScrollingView()||this.focusView||this.grid.views.views[0];this._initColumnHeaders()},isFocusCell:function(a,
b){return this.cell==a&&this.rowIndex==b},isLastFocusCell:function(){return this.cell?this.rowIndex==this.grid.rowCount-1&&this.cell.index==this.grid.layout.cellCount-1:!1},isFirstFocusCell:function(){return this.cell?0===this.rowIndex&&0===this.cell.index:!1},isNoFocusCell:function(){return 0>this.rowIndex||!this.cell},isNavHeader:function(){return!!this._colHeadNode},getHeaderIndex:function(){return this._colHeadNode?p.indexOf(this._findHeaderCells(),this._colHeadNode):-1},_focusifyCellNode:function(a){var b=
this.cell&&this.cell.getNode(this.rowIndex);if(b&&(f.toggleClass(b,this.focusClass,a),a)){a=this.scrollIntoView();try{if(m("webkit")||!this.grid.edit.isEditing())q.fire(b,"focus"),a&&(this.cell.view.scrollboxNode.scrollLeft=a)}catch(c){}}},_delayedCellFocus:function(){if(!this.isNavHeader()&&this.grid.focused){var a=this.cell&&this.cell.getNode(this.rowIndex);if(a)try{this.grid.edit.isEditing()||(f.toggleClass(a,this.focusClass,!0),this._colHeadNode&&this.blurHeader(),q.fire(a,"focus"))}catch(b){}}},
_delayedHeaderFocus:function(){this.isNavHeader()&&this.focusHeader()},_initColumnHeaders:function(){p.forEach(this._headerConnects,d.disconnect);this._headerConnects=[];for(var a=this._findHeaderCells(),b=0;b<a.length;b++)this._headerConnects.push(d.connect(a[b],"onfocus",this,"doColHeaderFocus")),this._headerConnects.push(d.connect(a[b],"onblur",this,"doColHeaderBlur"))},_findHeaderCells:function(){for(var a=u("th",this.grid.viewsHeaderNode),b=[],c=0;c<a.length;c++){var k=a[c],e=f.hasAttr(k,"tabIndex"),
d=f.attr(k,"tabIndex");e&&0>d&&b.push(k)}return b},_setActiveColHeader:function(a,b,c){this.grid.domNode.setAttribute("aria-activedescendant",a.id);null!=c&&0<=c&&c!=b&&f.toggleClass(this._findHeaderCells()[c],this.focusClass,!1);f.toggleClass(a,this.focusClass,!0);this._colHeadNode=a;this._colHeadFocusIdx=b;this._scrollHeader(this._colHeadFocusIdx)},scrollIntoView:function(){var a=this.cell?this._scrollInfo(this.cell):null;if(!a||!a.s)return null;var b=this.grid.scroller.findScrollTop(this.rowIndex);
a.n&&a.sr&&(a.n.offsetLeft+a.n.offsetWidth>a.sr.l+a.sr.w?a.s.scrollLeft=a.n.offsetLeft+a.n.offsetWidth-a.sr.w:a.n.offsetLeft<a.sr.l&&(a.s.scrollLeft=a.n.offsetLeft));a.r&&a.sr&&(b+a.r.offsetHeight>a.sr.t+a.sr.h?this.grid.setScrollTop(b+a.r.offsetHeight-a.sr.h):b<a.sr.t&&this.grid.setScrollTop(b));return a.s.scrollLeft},_scrollInfo:function(a,b){if(a){var c=a.view.scrollboxNode,k={w:c.clientWidth,l:c.scrollLeft,t:c.scrollTop,h:c.clientHeight},e=a.view.getRowNode(this.rowIndex);return{c:a,s:c,sr:k,
n:b?b:a.getNode(this.rowIndex),r:e}}return null},_scrollHeader:function(a){var b=null;if(this._colHeadNode){var c=this.grid.getCell(a);if(!c)return;b=this._scrollInfo(c,c.getNode(0))}b&&b.s&&b.sr&&b.n&&(b.n.offsetLeft+b.n.offsetWidth>b.sr.l+b.sr.w?b.s.scrollLeft=b.n.offsetLeft+b.n.offsetWidth-b.sr.w:b.n.offsetLeft<b.sr.l?b.s.scrollLeft=b.n.offsetLeft:7>=m("ie")&&c&&c.view.headerNode&&(c.view.headerNode.scrollLeft=b.s.scrollLeft))},_isHeaderHidden:function(){var a=this.focusView;if(!a)for(var b=0,
c;c=this.grid.views.views[b];b++)if(c.headerNode){a=c;break}return a&&"none"==f.getComputedStyle(a.headerNode).display},colSizeAdjust:function(a,b,c){var k=this._findHeaderCells(),e=this.focusView;if(!e||!e.header.tableMap.map)for(var d=0,f;f=this.grid.views.views[d];d++)if(f.header.tableMap.map){e=f;break}d=k[b];!e||b==k.length-1&&0===b||(e.content.baseDecorateEvent(a),a.cellNode=d,a.cellIndex=e.content.getCellNodeIndex(a.cellNode),a.cell=0<=a.cellIndex?this.grid.getCell(a.cellIndex):null,e.header.canResize(a)&&
(b={l:c},a=e.header.colResizeSetup(a,!1),e.header.doResizeColumn(a,null,b),e.update()))},styleRow:function(a){},setFocusIndex:function(a,b){this.setFocusCell(this.grid.getCell(b),a)},setFocusCell:function(a,b){a&&!this.isFocusCell(a,b)&&(this.tabbingOut=!1,this._colHeadNode&&this.blurHeader(),this._colHeadNode=this._colHeadFocusIdx=null,this.focusGridView(),this._focusifyCellNode(!1),this.cell=a,this.rowIndex=b,this._focusifyCellNode(!0));if(m("opera"))setTimeout(r.hitch(this.grid,"onCellFocus",this.cell,
this.rowIndex),1);else this.grid.onCellFocus(this.cell,this.rowIndex)},next:function(){if(this.cell){var a=this.rowIndex,b=this.cell.index+1,c=this.grid.layout.cellCount-1,d=this.grid.rowCount-1;b>c&&(b=0,a++);a>d&&(b=c,a=d);if(this.grid.edit.isEditing()&&(c=this.grid.getCell(b),!this.isLastFocusCell()&&(!c.editable||this.grid.canEdit&&!this.grid.canEdit(c,a)))){this.cell=c;this.rowIndex=a;this.next();return}this.setFocusIndex(a,b)}},previous:function(){if(this.cell){var a=this.rowIndex||0,b=(this.cell.index||
0)-1;0>b&&(b=this.grid.layout.cellCount-1,a--);0>a&&(b=a=0);if(this.grid.edit.isEditing()){var c=this.grid.getCell(b);if(!this.isFirstFocusCell()&&!c.editable){this.cell=c;this.rowIndex=a;this.previous();return}}this.setFocusIndex(a,b)}},move:function(a,b){var c=0>b?-1:1;if(this.isNavHeader()){a=this._findHeaderCells();var d=currentIdx=p.indexOf(a,this._colHeadNode);for(currentIdx+=b;0<=currentIdx&&currentIdx<a.length&&"none"==a[currentIdx].style.display;)currentIdx+=c;0<=currentIdx&&currentIdx<a.length&&
this._setActiveColHeader(a[currentIdx],currentIdx,d)}else if(this.cell){var e=this.grid.scroller,d=this.rowIndex,g=this.grid.rowCount-1,l=Math.min(g,Math.max(0,d+a));a&&(0<a?l>e.getLastPageRow(e.page)&&this.grid.setScrollTop(this.grid.scrollTop+e.findScrollTop(l)-e.findScrollTop(d)):0>a&&l<=e.getPageRow(e.page)&&this.grid.setScrollTop(this.grid.scrollTop-e.findScrollTop(d)-e.findScrollTop(l)));for(var e=this.grid.layout.cellCount-1,m=this.cell.index,h=Math.min(e,Math.max(0,m+b)),n=this.grid.getCell(h);0<=
h&&h<e&&n&&!0===n.hidden;)h+=c,n=this.grid.getCell(h);n&&!0!==n.hidden||(h=m);c=n.getNode(l);!c&&a?0<=l+a&&l+a<=g&&this.move(0<a?++a:--a,b):c&&"none"!==f.style(c,"display")||!b?(this.setFocusIndex(l,h),a&&this.grid.updateRow(d)):0<=h+b&&h+b<=e&&this.move(a,0<b?++b:--b)}},previousKey:function(a){this.grid.edit.isEditing()?(g.stop(a),this.previous()):this.isNavHeader()||this._isHeaderHidden()?(this.tabOut(this.grid.domNode),null!=this._colHeadFocusIdx&&(f.toggleClass(this._findHeaderCells()[this._colHeadFocusIdx],
this.focusClass,!1),this._colHeadFocusIdx=null),this._focusifyCellNode(!1)):(this.grid.domNode.focus(),g.stop(a))},nextKey:function(a){a.target===this.grid.domNode&&null==this._colHeadFocusIdx?(this.focusHeader(),g.stop(a)):this.isNavHeader()?(this.blurHeader(),this.findAndFocusGridCell()||this.tabOut(this.grid.lastFocusNode),this._colHeadNode=this._colHeadFocusIdx=null):this.grid.edit.isEditing()?(g.stop(a),this.next()):this.tabOut(this.grid.lastFocusNode)},tabOut:function(a){this.tabbingOut=!0;
a.focus()},focusGridView:function(){q.fire(this.focusView,"focus")},focusGrid:function(a){this.focusGridView();this._focusifyCellNode(!0)},findAndFocusGridCell:function(){var a=!0,b=0===this.grid.rowCount;this.isNoFocusCell()&&!b?(b=0,this.grid.getCell(b).hidden&&(b=this.isNavHeader()?this._colHeadFocusIdx:0),this.setFocusIndex(0,b)):this.cell&&!b?(this.focusView&&!this.focusView.rowNodes[this.rowIndex]&&this.grid.scrollToRow(this.rowIndex),this.focusGrid()):a=!1;this._colHeadNode=this._colHeadFocusIdx=
null;return a},focusHeader:function(){var a=this._findHeaderCells(),b=this._colHeadFocusIdx;this._isHeaderHidden()?this.findAndFocusGridCell():this._colHeadFocusIdx||(this.isNoFocusCell()?this._colHeadFocusIdx=0:this._colHeadFocusIdx=this.cell.index);for(this._colHeadNode=a[this._colHeadFocusIdx];this._colHeadNode&&0<=this._colHeadFocusIdx&&this._colHeadFocusIdx<a.length&&"none"==this._colHeadNode.style.display;)this._colHeadFocusIdx++,this._colHeadNode=a[this._colHeadFocusIdx];this._colHeadNode&&
"none"!=this._colHeadNode.style.display?(this.headerMenu&&this._contextMenuBindNode!=this.grid.domNode&&(this.headerMenu.unBindDomNode(this.grid.viewsHeaderNode),this.headerMenu.bindDomNode(this.grid.domNode),this._contextMenuBindNode=this.grid.domNode),this._setActiveColHeader(this._colHeadNode,this._colHeadFocusIdx,b),this._scrollHeader(this._colHeadFocusIdx),this._focusifyCellNode(!1)):this.findAndFocusGridCell()},blurHeader:function(){f.removeClass(this._colHeadNode,this.focusClass);f.removeAttr(this.grid.domNode,
"aria-activedescendant");if(this.headerMenu&&this._contextMenuBindNode==this.grid.domNode){var a=this.grid.viewsHeaderNode;this.headerMenu.unBindDomNode(this.grid.domNode);this.headerMenu.bindDomNode(a);this._contextMenuBindNode=a}},doFocus:function(a){a&&a.target!=a.currentTarget?g.stop(a):this._clickFocus||(this.tabbingOut||this.focusHeader(),this.tabbingOut=!1,g.stop(a))},doBlur:function(a){g.stop(a)},doContextMenu:function(a){this.headerMenu||g.stop(a)},doLastNodeFocus:function(a){this.tabbingOut?
this._focusifyCellNode(!1):0<this.grid.rowCount?(this.isNoFocusCell()&&this.setFocusIndex(0,0),this._focusifyCellNode(!0)):this.focusHeader();this.tabbingOut=!1;g.stop(a)},doLastNodeBlur:function(a){g.stop(a)},doColHeaderFocus:function(a){this._setActiveColHeader(a.target,f.attr(a.target,"idx"),this._colHeadFocusIdx);this._scrollHeader(this.getHeaderIndex());g.stop(a)},doColHeaderBlur:function(a){f.toggleClass(a.target,this.focusClass,!1)},_mouseDown:function(a){this._clickFocus=dojo.some(this.grid.views.views,
function(b){return b.scrollboxNode===a.target})},_mouseUp:function(a){this._clickFocus=!1}})});