System.register([],function(r){"use strict";return{execute:function(){var e="/";var t="./";var n=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");var a=function(r,a){var u=[];var s=0;var v=0;var c="";var o=a&&a.delimiter||e;var l=a&&a.delimiters||t;var h=false;var p;while((p=n.exec(r))!==null){var d=p[0];var g=p[1];var m=p.index;c+=r.slice(v,m);v=m+d.length;if(g){c+=g[1];h=true;continue}var y="";var x=r[v];var A=p[2];var O=p[3];var b=p[4];var E=p[5];if(!h&&c.length){var R=c.length-1;if(l.indexOf(c[R])>-1){y=c[R];c=c.slice(0,R)}}if(c){u.push(c);c="";h=false}var k=y!==""&&x!==undefined&&x!==y;var w=E==="+"||E==="*";var j=E==="?"||E==="*";var _=y||o;var $=O||b;u.push({name:A||s++,prefix:y,delimiter:_,optional:j,repeat:w,partial:k,pattern:$?f($):"[^"+i(_)+"]+?"})}if(c||v<r.length){u.push(c+r.substr(v))}return u};var i=function(r){return r.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")};var f=function(r){return r.replace(/([=!:$\/()])/g,"\\$1")};var u=function(r){return r&&r.sensitive?"":"i"};var s=function(r,e){if(!e)return r;var t=r.source.match(/\((?!\?)/g);if(t){for(var n=0;n<t.length;n++){e.push({name:n,prefix:null,delimiter:null,optional:false,repeat:false,partial:false,pattern:null})}}return r};var v=function(r,e,t){var n=[];for(var a=0;a<r.length;a++){n.push(l(r[a],e,t).source)}return new RegExp("(?:"+n.join("|")+")",u(t))};var c=function(r,e,t){return o(a(r,t),e,t)};var o=function(r,n,a){a=a||{};var f=a.strict;var s=a.end!==false;var v=i(a.delimiter||e);var c=a.delimiters||t;var o=[].concat(a.endsWith||[]).map(i).concat("$").join("|");var l="";var h=false;for(var p=0;p<r.length;p++){var d=r[p];if(typeof d==="string"){l+=i(d);h=p===r.length-1&&c.indexOf(d[d.length-1])>-1}else{var g=i(d.prefix||"");var m=d.repeat?"(?:"+d.pattern+")(?:"+g+"(?:"+d.pattern+"))*":d.pattern;if(n)n.push(d);if(d.optional){if(d.partial){l+=g+"("+m+")?"}else{l+="(?:"+g+"("+m+"))?"}}else{l+=g+"("+m+")"}}}if(s){if(!f)l+="(?:"+v+")?";l+=o==="$"?"$":"(?="+o+")"}else{if(!f)l+="(?:"+v+"(?="+o+"))?";if(!h)l+="(?="+v+"|"+o+")"}return new RegExp("^"+l,u(a))};var l=function(r,e,t){if(r instanceof RegExp){return s(r,e)}if(Array.isArray(r)){return v(r,e,t)}return c(r,e,t)};var h=r("i",function(r,e){return new RegExp("^"+e+"(\\/|\\?|#|$)","i").test(r)});var p=r("j",function(r,e){return h(r,e)?r.substr(e.length):r});var d=r("d",function(r){return r.charAt(r.length-1)==="/"?r.slice(0,-1):r});var g=r("e",function(r){return r.charAt(0)==="/"?r:"/"+r});var m=r("o",function(r){return r.charAt(0)==="/"?r.substr(1):r});var y=function(r){var e=r||"/";var t="";var n="";var a=e.indexOf("#");if(a!==-1){n=e.substr(a);e=e.substr(0,a)}var i=e.indexOf("?");if(i!==-1){t=e.substr(i);e=e.substr(0,i)}return{pathname:e,search:t==="?"?"":t,hash:n==="#"?"":n,query:{},key:""}};var x=r("k",function(r){var e=r.pathname,t=r.search,n=r.hash;var a=e||"/";if(t&&t!=="?"){a+=t.charAt(0)==="?"?t:"?"+t}if(n&&n!=="#"){a+=n.charAt(0)==="#"?n:"#"+n}return a});var A=function(r){if(!r){return{}}return(/^[?#]/.test(r)?r.slice(1):r).split("&").reduce(function(r,e){var t=e.split("="),n=t[0],a=t[1];r[n]=a?decodeURIComponent(a.replace(/\+/g," ")):"";return r},{})};var O=function(r){return r.charAt(0)==="/"};var b=r("h",function(r){return Math.random().toString(36).substr(2,r)});var E=function(r,e){for(var t=e,n=t+1,a=r.length;n<a;t+=1,n+=1){r[t]=r[n]}r.pop()};var R=function(r,e){if(e===void 0){e=""}var t=e&&e.split("/")||[];var n;var a=0;var i=r&&r.split("/")||[];var f=r&&O(r);var u=e&&O(e);var s=f||u;if(r&&O(r)){t=i}else if(i.length){t.pop();t=t.concat(i)}if(!t.length){return"/"}if(t.length){var v=t[t.length-1];n=v==="."||v===".."||v===""}else{n=false}for(var c=t.length;c>=0;c--){var o=t[c];if(o==="."){E(t,c)}else if(o===".."){E(t,c);a++}else if(a){E(t,c);a--}}if(!s){for(;a--;a){t.unshift("..")}}if(s&&t[0]!==""&&(!t[0]||!O(t[0]))){t.unshift("")}var l=t.join("/");if(n&&l.substr(-1)!=="/"){l+="/"}return l};var k=function(r,e){if(r===e){return true}if(r==null||e==null){return false}if(Array.isArray(r)){return Array.isArray(e)&&r.length===e.length&&r.every(function(r,t){return k(r,e[t])})}var t=typeof r;var n=typeof e;if(t!==n){return false}if(t==="object"){var a=r.valueOf();var i=e.valueOf();if(a!==r||i!==e){return k(a,i)}var f=Object.keys(r);var u=Object.keys(e);if(f.length!==u.length){return false}return f.every(function(t){return k(r[t],e[t])})}return false};var w=r("p",function(r,e){return r.pathname===e.pathname&&r.search===e.search&&r.hash===e.hash&&r.key===e.key&&k(r.state,e.state)});var j=r("f",function(r,e,t,n){var a;if(typeof r==="string"){a=y(r);if(e!==undefined){a.state=e}}else{a=Object.assign({pathname:""},r);if(a.search&&a.search.charAt(0)!=="?"){a.search="?"+a.search}if(a.hash&&a.hash.charAt(0)!=="#"){a.hash="#"+a.hash}if(e!==undefined&&a.state===undefined){a.state=e}}try{a.pathname=decodeURI(a.pathname)}catch(r){if(r instanceof URIError){throw new URIError('Pathname "'+a.pathname+'" could not be decoded. '+"This is likely caused by an invalid percent-encoding.")}else{throw r}}a.key=t;if(n){if(!a.pathname){a.pathname=n.pathname}else if(a.pathname.charAt(0)!=="/"){a.pathname=R(a.pathname,n.pathname)}}else{if(!a.pathname){a.pathname="/"}}a.query=A(a.search||"");return a});var _=0;var $={};var S=1e4;var I=function(r,e){var t=""+e.end+e.strict;var n=$[t]||($[t]={});var a=JSON.stringify(r);if(n[a]){return n[a]}var i=[];var f=l(r,i,e);var u={re:f,keys:i};if(_<S){n[a]=u;_+=1}return u};var U=r("m",function(r,e){if(e===void 0){e={}}if(typeof e==="string"){e={path:e}}var t=e.path,n=t===void 0?"/":t,a=e.exact,i=a===void 0?false:a,f=e.strict,u=f===void 0?false:f;var s=I(n,{end:i,strict:u}),v=s.re,c=s.keys;var o=v.exec(r);if(!o){return null}var l=o[0],h=o.slice(1);var p=r===l;if(i&&!p){return null}return{path:n,url:n==="/"&&l===""?"/":l,isExact:p,params:c.reduce(function(r,e,t){r[e.name]=h[t];return r},{})}});var C=r("a",function(r,e){if(r==null&&e==null){return true}if(e==null){return false}return r&&e&&r.path===e.path&&r.url===e.url&&k(r.params,e.params)});var K=r("g",function(r,e,t){return t(r.confirm(e))});var M=r("q",function(r){return r.metaKey||r.altKey||r.ctrlKey||r.shiftKey});var q=r("b",function(r){var e=r.navigator.userAgent;if((e.indexOf("Android 2.")!==-1||e.indexOf("Android 4.0")!==-1)&&e.indexOf("Mobile Safari")!==-1&&e.indexOf("Chrome")===-1&&e.indexOf("Windows Phone")===-1){return false}return r.history&&"pushState"in r.history});var D=r("c",function(r){return r.userAgent.indexOf("Trident")===-1});var T=r("n",function(r){return r.userAgent.indexOf("Firefox")===-1});var N=r("l",function(r,e){return e.state===undefined&&r.userAgent.indexOf("CriOS")===-1});var P=r("s",function(r,e){var t=r[e];var n="__storage_test__";try{t.setItem(n,n);t.removeItem(n);return true}catch(r){return r instanceof DOMException&&(r.code===22||r.code===1014||r.name==="QuotaExceededError"||r.name==="NS_ERROR_DOM_QUOTA_REACHED")&&t.length!==0}})}}});