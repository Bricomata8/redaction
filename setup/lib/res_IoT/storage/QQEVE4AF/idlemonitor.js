/* Idle Timer - v1.0.1 - 2014-03-21
* https://github.com/thorst/jquery-idletimer
* Copyright (c) 2014 Paul Irish; Licensed MIT */
(function(a){a.idleTimer=function(j,c){var b;if(typeof j==="object"){b=j;j=null}else{if(typeof j==="number"){b={timeout:j};j=null}}c=c||document;b=a.extend({idle:false,timeout:30000,events:"mousemove keydown wheel DOMMouseScroll mousewheel mousedown touchstart touchmove MSPointerDown MSPointerMove"},b);var e=a(c),f=e.data("idleTimerObj")||{},g=function(p){var o=a.data(c,"idleTimerObj")||{};o.idle=!o.idle;o.olddate=+new Date();var n=a.Event((o.idle?"idle":"active")+".idleTimer");a(c).trigger(n,[c,a.extend({},o),p])},i=function(p){var o=a.data(c,"idleTimerObj")||{};if(o.remaining!=null){return}if(p.type==="mousemove"){if(p.pageX===o.pageX&&p.pageY===o.pageY){return}if(typeof p.pageX==="undefined"&&typeof p.pageY==="undefined"){return}var n=(+new Date())-o.olddate;if(n<200){return}}clearTimeout(o.tId);if(o.idle){g(p)}o.lastActive=+new Date();o.pageX=p.pageX;o.pageY=p.pageY;o.tId=setTimeout(g,o.timeout)},h=function(){var n=a.data(c,"idleTimerObj")||{};n.idle=n.idleBackup;n.olddate=+new Date();n.lastActive=n.olddate;n.remaining=null;clearTimeout(n.tId);if(!n.idle){n.tId=setTimeout(g,n.timeout)}},m=function(){var n=a.data(c,"idleTimerObj")||{};if(n.remaining!=null){return}n.remaining=n.timeout-((+new Date())-n.olddate);clearTimeout(n.tId)},d=function(){var n=a.data(c,"idleTimerObj")||{};if(n.remaining==null){return}if(!n.idle){n.tId=setTimeout(g,n.remaining)}n.remaining=null},k=function(){var n=a.data(c,"idleTimerObj")||{};clearTimeout(n.tId);e.removeData("idleTimerObj");e.off("._idleTimer")},l=function(){var o=a.data(c,"idleTimerObj")||{};if(o.idle){return 0}if(o.remaining!=null){return o.remaining}var n=o.timeout-((+new Date())-o.lastActive);if(n<0){n=0}return n};if(j===null&&typeof f.idle!=="undefined"){h();return e}else{if(j===null){}else{if(j!==null&&typeof f.idle==="undefined"){return false}else{if(j==="destroy"){k();return e}else{if(j==="pause"){m();return e}else{if(j==="resume"){d();return e}else{if(j==="reset"){h();return e}else{if(j==="getRemainingTime"){return l()}else{if(j==="getElapsedTime"){return(+new Date())-f.olddate}else{if(j==="getLastActiveTime"){return f.lastActive}else{if(j==="isIdle"){return f.idle}}}}}}}}}}}e.on(a.trim((b.events+" ").split(" ").join("._idleTimer ")),function(n){i(n)});f=a.extend({},{olddate:+new Date(),lastActive:+new Date(),idle:b.idle,idleBackup:b.idle,timeout:b.timeout,remaining:null,tId:null,pageX:null,pageY:null});if(!f.idle){f.tId=setTimeout(g,f.timeout)}a.data(c,"idleTimerObj",f);return e};a.fn.idleTimer=function(b){if(this[0]){return a.idleTimer(b,this[0])}return this}})(jQuery);PrimeFaces.widget.IdleMonitor=PrimeFaces.widget.BaseWidget.extend({init:function(a){this._super(a);var b=this;$(document).on("idle.idleTimer",function(){if(b.cfg.onidle){b.cfg.onidle.call(b)}if(b.cfg.behaviors){var c=b.cfg.behaviors.idle;if(c){c.call(b)}}}).on("active.idleTimer",function(){if(b.cfg.onactive){b.cfg.onactive.call(this)}if(b.cfg.behaviors){var c=b.cfg.behaviors.active;if(c){c.call(b)}}});$.idleTimer(this.cfg.timeout)},pause:function(){$.idleTimer("pause")},resume:function(){$.idleTimer("resume")},reset:function(){$.idleTimer("reset")}});