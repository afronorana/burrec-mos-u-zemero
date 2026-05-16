(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function Wc(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const St={},Js=[],ni=()=>{},qd=()=>!1,ya=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),Xc=n=>n.startsWith("onUpdate:"),en=Object.assign,qc=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},im=Object.prototype.hasOwnProperty,ht=(n,e)=>im.call(n,e),We=Array.isArray,Qs=n=>Qr(n)==="[object Map]",Sa=n=>Qr(n)==="[object Set]",Uh=n=>Qr(n)==="[object Date]",Ze=n=>typeof n=="function",Dt=n=>typeof n=="string",ri=n=>typeof n=="symbol",xt=n=>n!==null&&typeof n=="object",Yd=n=>(xt(n)||Ze(n))&&Ze(n.then)&&Ze(n.catch),jd=Object.prototype.toString,Qr=n=>jd.call(n),sm=n=>Qr(n).slice(8,-1),$d=n=>Qr(n)==="[object Object]",Yc=n=>Dt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Nr=Wc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ma=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},rm=/-\w/g,Dn=Ma(n=>n.replace(rm,e=>e.slice(1).toUpperCase())),om=/\B([A-Z])/g,bs=Ma(n=>n.replace(om,"-$1").toLowerCase()),Ea=Ma(n=>n.charAt(0).toUpperCase()+n.slice(1)),Wa=Ma(n=>n?`on${Ea(n)}`:""),ys=(n,e)=>!Object.is(n,e),Yo=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Kd=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},ba=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let Oh;const wa=()=>Oh||(Oh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function kr(n){if(We(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=Dt(i)?hm(i):kr(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(Dt(n)||xt(n))return n}const am=/;(?![^(]*\))/g,lm=/:([^]+)/,cm=/\/\*[^]*?\*\//g;function hm(n){const e={};return n.replace(cm,"").split(am).forEach(t=>{if(t){const i=t.split(lm);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Ta(n){let e="";if(Dt(n))e=n;else if(We(n))for(let t=0;t<n.length;t++){const i=Ta(n[t]);i&&(e+=i+" ")}else if(xt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const um="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",dm=Wc(um);function Zd(n){return!!n||n===""}function fm(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=eo(n[i],e[i]);return t}function eo(n,e){if(n===e)return!0;let t=Uh(n),i=Uh(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=ri(n),i=ri(e),t||i)return n===e;if(t=We(n),i=We(e),t||i)return t&&i?fm(n,e):!1;if(t=xt(n),i=xt(e),t||i){if(!t||!i)return!1;const s=Object.keys(n).length,r=Object.keys(e).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=e.hasOwnProperty(o);if(a&&!l||!a&&l||!eo(n[o],e[o]))return!1}}return String(n)===String(e)}function pm(n,e){return n.findIndex(t=>eo(t,e))}const Jd=n=>!!(n&&n.__v_isRef===!0),An=n=>Dt(n)?n:n==null?"":We(n)||xt(n)&&(n.toString===jd||!Ze(n.toString))?Jd(n)?An(n.value):JSON.stringify(n,Qd,2):String(n),Qd=(n,e)=>Jd(e)?Qd(n,e.value):Qs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[Xa(i,r)+" =>"]=s,t),{})}:Sa(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Xa(t))}:ri(e)?Xa(e):xt(e)&&!We(e)&&!$d(e)?String(e):e,Xa=(n,e="")=>{var t;return ri(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};let pn;class mm{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=pn,!e&&pn&&(this.index=(pn.scopes||(pn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=pn;try{return pn=this,e()}finally{pn=t}}}on(){++this._on===1&&(this.prevScope=pn,pn=this)}off(){this._on>0&&--this._on===0&&(pn=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function gm(){return pn}let Et;const qa=new WeakSet;class ef{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,pn&&pn.active&&pn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,qa.has(this)&&(qa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||nf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Bh(this),sf(this);const e=Et,t=Gn;Et=this,Gn=!0;try{return this.fn()}finally{rf(this),Et=e,Gn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Kc(e);this.deps=this.depsTail=void 0,Bh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?qa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Hl(this)&&this.run()}get dirty(){return Hl(this)}}let tf=0,Fr,Ur;function nf(n,e=!1){if(n.flags|=8,e){n.next=Ur,Ur=n;return}n.next=Fr,Fr=n}function jc(){tf++}function $c(){if(--tf>0)return;if(Ur){let e=Ur;for(Ur=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Fr;){let e=Fr;for(Fr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function sf(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function rf(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),Kc(i),_m(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function Hl(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(of(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function of(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Wr)||(n.globalVersion=Wr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Hl(n))))return;n.flags|=2;const e=n.dep,t=Et,i=Gn;Et=n,Gn=!0;try{sf(n);const s=n.fn(n._value);(e.version===0||ys(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Et=t,Gn=i,rf(n),n.flags&=-3}}function Kc(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)Kc(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function _m(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Gn=!0;const af=[];function Di(){af.push(Gn),Gn=!1}function Ii(){const n=af.pop();Gn=n===void 0?!0:n}function Bh(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Et;Et=void 0;try{e()}finally{Et=t}}}let Wr=0;class vm{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class lf{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Et||!Gn||Et===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Et)t=this.activeLink=new vm(Et,this),Et.deps?(t.prevDep=Et.depsTail,Et.depsTail.nextDep=t,Et.depsTail=t):Et.deps=Et.depsTail=t,cf(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=Et.depsTail,t.nextDep=void 0,Et.depsTail.nextDep=t,Et.depsTail=t,Et.deps===t&&(Et.deps=i)}return t}trigger(e){this.version++,Wr++,this.notify(e)}notify(e){jc();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{$c()}}}function cf(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)cf(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Vl=new WeakMap,Ss=Symbol(""),Gl=Symbol(""),Xr=Symbol("");function $t(n,e,t){if(Gn&&Et){let i=Vl.get(n);i||Vl.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new lf),s.map=i,s.key=t),s.track()}}function Ti(n,e,t,i,s,r){const o=Vl.get(n);if(!o){Wr++;return}const a=l=>{l&&l.trigger()};if(jc(),e==="clear")o.forEach(a);else{const l=We(n),c=l&&Yc(t);if(l&&t==="length"){const h=Number(i);o.forEach((d,u)=>{(u==="length"||u===Xr||!ri(u)&&u>=h)&&a(d)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(Xr)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Ss)),Qs(n)&&a(o.get(Gl)));break;case"delete":l||(a(o.get(Ss)),Qs(n)&&a(o.get(Gl)));break;case"set":Qs(n)&&a(o.get(Ss));break}}$c()}function Rs(n){const e=gt(n);return e===n?e:($t(e,"iterate",Xr),kn(n)?e:e.map(Li))}function Aa(n){return $t(n=gt(n),"iterate",Xr),n}function qi(n,e){return Ji(n)?ar(Ms(n)?Li(e):e):Li(e)}const xm={__proto__:null,[Symbol.iterator](){return Ya(this,Symbol.iterator,n=>qi(this,n))},concat(...n){return Rs(this).concat(...n.map(e=>We(e)?Rs(e):e))},entries(){return Ya(this,"entries",n=>(n[1]=qi(this,n[1]),n))},every(n,e){return di(this,"every",n,e,void 0,arguments)},filter(n,e){return di(this,"filter",n,e,t=>t.map(i=>qi(this,i)),arguments)},find(n,e){return di(this,"find",n,e,t=>qi(this,t),arguments)},findIndex(n,e){return di(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return di(this,"findLast",n,e,t=>qi(this,t),arguments)},findLastIndex(n,e){return di(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return di(this,"forEach",n,e,void 0,arguments)},includes(...n){return ja(this,"includes",n)},indexOf(...n){return ja(this,"indexOf",n)},join(n){return Rs(this).join(n)},lastIndexOf(...n){return ja(this,"lastIndexOf",n)},map(n,e){return di(this,"map",n,e,void 0,arguments)},pop(){return mr(this,"pop")},push(...n){return mr(this,"push",n)},reduce(n,...e){return zh(this,"reduce",n,e)},reduceRight(n,...e){return zh(this,"reduceRight",n,e)},shift(){return mr(this,"shift")},some(n,e){return di(this,"some",n,e,void 0,arguments)},splice(...n){return mr(this,"splice",n)},toReversed(){return Rs(this).toReversed()},toSorted(n){return Rs(this).toSorted(n)},toSpliced(...n){return Rs(this).toSpliced(...n)},unshift(...n){return mr(this,"unshift",n)},values(){return Ya(this,"values",n=>qi(this,n))}};function Ya(n,e,t){const i=Aa(n),s=i[e]();return i!==n&&!kn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=t(r.value)),r}),s}const ym=Array.prototype;function di(n,e,t,i,s,r){const o=Aa(n),a=o!==n&&!kn(n),l=o[e];if(l!==ym[e]){const d=l.apply(n,r);return a?Li(d):d}let c=t;o!==n&&(a?c=function(d,u){return t.call(this,qi(n,d),u,n)}:t.length>2&&(c=function(d,u){return t.call(this,d,u,n)}));const h=l.call(o,c,i);return a&&s?s(h):h}function zh(n,e,t,i){const s=Aa(n);let r=t;return s!==n&&(kn(n)?t.length>3&&(r=function(o,a,l){return t.call(this,o,a,l,n)}):r=function(o,a,l){return t.call(this,o,qi(n,a),l,n)}),s[e](r,...i)}function ja(n,e,t){const i=gt(n);$t(i,"iterate",Xr);const s=i[e](...t);return(s===-1||s===!1)&&Qc(t[0])?(t[0]=gt(t[0]),i[e](...t)):s}function mr(n,e,t=[]){Di(),jc();const i=gt(n)[e].apply(n,t);return $c(),Ii(),i}const Sm=Wc("__proto__,__v_isRef,__isVue"),hf=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(ri));function Mm(n){ri(n)||(n=String(n));const e=gt(this);return $t(e,"has",n),e.hasOwnProperty(n)}class uf{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?Im:mf:r?pf:ff).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=We(e);if(!s){let l;if(o&&(l=xm[t]))return l;if(t==="hasOwnProperty")return Mm}const a=Reflect.get(e,t,on(e)?e:i);if((ri(t)?hf.has(t):Sm(t))||(s||$t(e,"get",t),r))return a;if(on(a)){const l=o&&Yc(t)?a:a.value;return s&&xt(l)?Wl(l):l}return xt(a)?s?Wl(a):Ca(a):a}}class df extends uf{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];const o=We(e)&&Yc(t);if(!this._isShallow){const c=Ji(r);if(!kn(i)&&!Ji(i)&&(r=gt(r),i=gt(i)),!o&&on(r)&&!on(i))return c||(r.value=i),!0}const a=o?Number(t)<e.length:ht(e,t),l=Reflect.set(e,t,i,on(e)?e:s);return e===gt(s)&&(a?ys(i,r)&&Ti(e,"set",t,i):Ti(e,"add",t,i)),l}deleteProperty(e,t){const i=ht(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&Ti(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!ri(t)||!hf.has(t))&&$t(e,"has",t),i}ownKeys(e){return $t(e,"iterate",We(e)?"length":Ss),Reflect.ownKeys(e)}}class Em extends uf{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const bm=new df,wm=new Em,Tm=new df(!0);const kl=n=>n,ho=n=>Reflect.getPrototypeOf(n);function Am(n,e,t){return function(...i){const s=this.__v_raw,r=gt(s),o=Qs(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),h=t?kl:e?ar:Li;return!e&&$t(r,"iterate",l?Gl:Ss),en(Object.create(c),{next(){const{value:d,done:u}=c.next();return u?{value:d,done:u}:{value:a?[h(d[0]),h(d[1])]:h(d),done:u}}})}}function uo(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function Cm(n,e){const t={get(s){const r=this.__v_raw,o=gt(r),a=gt(s);n||(ys(s,a)&&$t(o,"get",s),$t(o,"get",a));const{has:l}=ho(o),c=e?kl:n?ar:Li;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&$t(gt(s),"iterate",Ss),s.size},has(s){const r=this.__v_raw,o=gt(r),a=gt(s);return n||(ys(s,a)&&$t(o,"has",s),$t(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=gt(a),c=e?kl:n?ar:Li;return!n&&$t(l,"iterate",Ss),a.forEach((h,d)=>s.call(r,c(h),c(d),o))}};return en(t,n?{add:uo("add"),set:uo("set"),delete:uo("delete"),clear:uo("clear")}:{add(s){!e&&!kn(s)&&!Ji(s)&&(s=gt(s));const r=gt(this);return ho(r).has.call(r,s)||(r.add(s),Ti(r,"add",s,s)),this},set(s,r){!e&&!kn(r)&&!Ji(r)&&(r=gt(r));const o=gt(this),{has:a,get:l}=ho(o);let c=a.call(o,s);c||(s=gt(s),c=a.call(o,s));const h=l.call(o,s);return o.set(s,r),c?ys(r,h)&&Ti(o,"set",s,r):Ti(o,"add",s,r),this},delete(s){const r=gt(this),{has:o,get:a}=ho(r);let l=o.call(r,s);l||(s=gt(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&Ti(r,"delete",s,void 0),c},clear(){const s=gt(this),r=s.size!==0,o=s.clear();return r&&Ti(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=Am(s,n,e)}),t}function Zc(n,e){const t=Cm(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ht(t,s)&&s in i?t:i,s,r)}const Rm={get:Zc(!1,!1)},Pm={get:Zc(!1,!0)},Dm={get:Zc(!0,!1)};const ff=new WeakMap,pf=new WeakMap,mf=new WeakMap,Im=new WeakMap;function Lm(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Nm(n){return n.__v_skip||!Object.isExtensible(n)?0:Lm(sm(n))}function Ca(n){return Ji(n)?n:Jc(n,!1,bm,Rm,ff)}function Fm(n){return Jc(n,!1,Tm,Pm,pf)}function Wl(n){return Jc(n,!0,wm,Dm,mf)}function Jc(n,e,t,i,s){if(!xt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=Nm(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:t);return s.set(n,a),a}function Ms(n){return Ji(n)?Ms(n.__v_raw):!!(n&&n.__v_isReactive)}function Ji(n){return!!(n&&n.__v_isReadonly)}function kn(n){return!!(n&&n.__v_isShallow)}function Qc(n){return n?!!n.__v_raw:!1}function gt(n){const e=n&&n.__v_raw;return e?gt(e):n}function He(n){return!ht(n,"__v_skip")&&Object.isExtensible(n)&&Kd(n,"__v_skip",!0),n}const Li=n=>xt(n)?Ca(n):n,ar=n=>xt(n)?Wl(n):n;function on(n){return n?n.__v_isRef===!0:!1}function Um(n){return on(n)?n.value:n}const Om={get:(n,e,t)=>e==="__v_raw"?n:Um(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return on(s)&&!on(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function gf(n){return Ms(n)?n:new Proxy(n,Om)}class Bm{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new lf(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Wr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Et!==this)return nf(this,!0),!0}get value(){const e=this.dep.track();return of(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function zm(n,e,t=!1){let i,s;return Ze(n)?i=n:(i=n.get,s=n.set),new Bm(i,s,t)}const fo={},oa=new WeakMap;let ds;function Hm(n,e=!1,t=ds){if(t){let i=oa.get(t);i||oa.set(t,i=[]),i.push(n)}}function Vm(n,e,t=St){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=t,c=S=>s?S:kn(S)||s===!1||s===0?Ai(S,1):Ai(S);let h,d,u,f,g=!1,v=!1;if(on(n)?(d=()=>n.value,g=kn(n)):Ms(n)?(d=()=>c(n),g=!0):We(n)?(v=!0,g=n.some(S=>Ms(S)||kn(S)),d=()=>n.map(S=>{if(on(S))return S.value;if(Ms(S))return c(S);if(Ze(S))return l?l(S,2):S()})):Ze(n)?e?d=l?()=>l(n,2):n:d=()=>{if(u){Di();try{u()}finally{Ii()}}const S=ds;ds=h;try{return l?l(n,3,[f]):n(f)}finally{ds=S}}:d=ni,e&&s){const S=d,A=s===!0?1/0:s;d=()=>Ai(S(),A)}const p=gm(),m=()=>{h.stop(),p&&p.active&&qc(p.effects,h)};if(r&&e){const S=e;e=(...A)=>{S(...A),m()}}let _=v?new Array(n.length).fill(fo):fo;const E=S=>{if(!(!(h.flags&1)||!h.dirty&&!S))if(e){const A=h.run();if(s||g||(v?A.some((C,P)=>ys(C,_[P])):ys(A,_))){u&&u();const C=ds;ds=h;try{const P=[A,_===fo?void 0:v&&_[0]===fo?[]:_,f];_=A,l?l(e,3,P):e(...P)}finally{ds=C}}}else h.run()};return a&&a(E),h=new ef(d),h.scheduler=o?()=>o(E,!1):E,f=S=>Hm(S,!1,h),u=h.onStop=()=>{const S=oa.get(h);if(S){if(l)l(S,4);else for(const A of S)A();oa.delete(h)}},e?i?E(!0):_=h.run():o?o(E.bind(null,!0),!0):h.run(),m.pause=h.pause.bind(h),m.resume=h.resume.bind(h),m.stop=m,m}function Ai(n,e=1/0,t){if(e<=0||!xt(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,on(n))Ai(n.value,e,t);else if(We(n))for(let i=0;i<n.length;i++)Ai(n[i],e,t);else if(Sa(n)||Qs(n))n.forEach(i=>{Ai(i,e,t)});else if($d(n)){for(const i in n)Ai(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Ai(n[i],e,t)}return n}function to(n,e,t,i){try{return i?n(...i):n()}catch(s){Ra(s,e,t)}}function oi(n,e,t,i){if(Ze(n)){const s=to(n,e,t,i);return s&&Yd(s)&&s.catch(r=>{Ra(r,e,t)}),s}if(We(n)){const s=[];for(let r=0;r<n.length;r++)s.push(oi(n[r],e,t,i));return s}}function Ra(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||St;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const h=a.ec;if(h){for(let d=0;d<h.length;d++)if(h[d](n,l,c)===!1)return}a=a.parent}if(r){Di(),to(r,null,10,[n,l,c]),Ii();return}}Gm(n,t,s,i,o)}function Gm(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const rn=[];let Jn=-1;const er=[];let Yi=null,Ys=0;const _f=Promise.resolve();let aa=null;function vf(n){const e=aa||_f;return n?e.then(this?n.bind(this):n):e}function km(n){let e=Jn+1,t=rn.length;for(;e<t;){const i=e+t>>>1,s=rn[i],r=qr(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function eh(n){if(!(n.flags&1)){const e=qr(n),t=rn[rn.length-1];!t||!(n.flags&2)&&e>=qr(t)?rn.push(n):rn.splice(km(e),0,n),n.flags|=1,xf()}}function xf(){aa||(aa=_f.then(Sf))}function Wm(n){We(n)?er.push(...n):Yi&&n.id===-1?Yi.splice(Ys+1,0,n):n.flags&1||(er.push(n),n.flags|=1),xf()}function Hh(n,e,t=Jn+1){for(;t<rn.length;t++){const i=rn[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;rn.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function yf(n){if(er.length){const e=[...new Set(er)].sort((t,i)=>qr(t)-qr(i));if(er.length=0,Yi){Yi.push(...e);return}for(Yi=e,Ys=0;Ys<Yi.length;Ys++){const t=Yi[Ys];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Yi=null,Ys=0}}const qr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Sf(n){try{for(Jn=0;Jn<rn.length;Jn++){const e=rn[Jn];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),to(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Jn<rn.length;Jn++){const e=rn[Jn];e&&(e.flags&=-2)}Jn=-1,rn.length=0,yf(),aa=null,(rn.length||er.length)&&Sf()}}let En=null,Mf=null;function la(n){const e=En;return En=n,Mf=n&&n.type.__scopeId||null,e}function Xm(n,e=En,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Jh(-1);const r=la(e);let o;try{o=n(...s)}finally{la(r),i._d&&Jh(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function th(n,e){if(En===null)return n;const t=La(En),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[r,o,a,l=St]=e[s];r&&(Ze(r)&&(r={mounted:r,updated:r}),r.deep&&Ai(o),i.push({dir:r,instance:t,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function is(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(Di(),oi(l,t,8,[n.el,a,n,e]),Ii())}}function qm(n,e){if(Kt){let t=Kt.provides;const i=Kt.parent&&Kt.parent.provides;i===t&&(t=Kt.provides=Object.create(i)),t[n]=e}}function jo(n,e,t=!1){const i=$g();if(i||nr){let s=nr?nr._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&Ze(e)?e.call(i&&i.proxy):e}}const Ym=Symbol.for("v-scx"),jm=()=>jo(Ym);function $a(n,e,t){return Ef(n,e,t)}function Ef(n,e,t=St){const{immediate:i,deep:s,flush:r,once:o}=t,a=en({},t),l=e&&i||!e&&r!=="post";let c;if(jr){if(r==="sync"){const f=jm();c=f.__watcherHandles||(f.__watcherHandles=[])}else if(!l){const f=()=>{};return f.stop=ni,f.resume=ni,f.pause=ni,f}}const h=Kt;a.call=(f,g,v)=>oi(f,h,g,v);let d=!1;r==="post"?a.scheduler=f=>{dn(f,h&&h.suspense)}:r!=="sync"&&(d=!0,a.scheduler=(f,g)=>{g?f():eh(f)}),a.augmentJob=f=>{e&&(f.flags|=4),d&&(f.flags|=2,h&&(f.id=h.uid,f.i=h))};const u=Vm(n,e,a);return jr&&(c?c.push(u):l&&u()),u}function $m(n,e,t){const i=this.proxy,s=Dt(n)?n.includes(".")?bf(i,n):()=>i[n]:n.bind(i,i);let r;Ze(e)?r=e:(r=e.handler,t=e);const o=no(this),a=Ef(s,r.bind(i),t);return o(),a}function bf(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const Km=Symbol("_vte"),Zm=n=>n.__isTeleport,Jm=Symbol("_leaveCb");function nh(n,e){n.shapeFlag&6&&n.component?(n.transition=e,nh(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function wf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Vh(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const ca=new WeakMap;function Or(n,e,t,i,s=!1){if(We(n)){n.forEach((v,p)=>Or(v,e&&(We(e)?e[p]:e),t,i,s));return}if(Br(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Or(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?La(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=e&&e.r,h=a.refs===St?a.refs={}:a.refs,d=a.setupState,u=gt(d),f=d===St?qd:v=>Vh(h,v)?!1:ht(u,v),g=(v,p)=>!(p&&Vh(h,p));if(c!=null&&c!==l){if(Gh(e),Dt(c))h[c]=null,f(c)&&(d[c]=null);else if(on(c)){const v=e;g(c,v.k)&&(c.value=null),v.k&&(h[v.k]=null)}}if(Ze(l))to(l,a,12,[o,h]);else{const v=Dt(l),p=on(l);if(v||p){const m=()=>{if(n.f){const _=v?f(l)?d[l]:h[l]:g()||!n.k?l.value:h[n.k];if(s)We(_)&&qc(_,r);else if(We(_))_.includes(r)||_.push(r);else if(v)h[l]=[r],f(l)&&(d[l]=h[l]);else{const E=[r];g(l,n.k)&&(l.value=E),n.k&&(h[n.k]=E)}}else v?(h[l]=o,f(l)&&(d[l]=o)):p&&(g(l,n.k)&&(l.value=o),n.k&&(h[n.k]=o))};if(o){const _=()=>{m(),ca.delete(n)};_.id=-1,ca.set(n,_),dn(_,t)}else Gh(n),m()}}}function Gh(n){const e=ca.get(n);e&&(e.flags|=8,ca.delete(n))}wa().requestIdleCallback;wa().cancelIdleCallback;const Br=n=>!!n.type.__asyncLoader,Tf=n=>n.type.__isKeepAlive;function Qm(n,e){Af(n,"a",e)}function eg(n,e){Af(n,"da",e)}function Af(n,e,t=Kt){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Pa(e,i,t),t){let s=t.parent;for(;s&&s.parent;)Tf(s.parent.vnode)&&tg(i,e,t,s),s=s.parent}}function tg(n,e,t,i){const s=Pa(e,n,i,!0);Cf(()=>{qc(i[e],s)},t)}function Pa(n,e,t=Kt,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{Di();const a=no(t),l=oi(e,t,n,o);return a(),Ii(),l});return i?s.unshift(r):s.push(r),r}}const Ui=n=>(e,t=Kt)=>{(!jr||n==="sp")&&Pa(n,(...i)=>e(...i),t)},ng=Ui("bm"),ig=Ui("m"),sg=Ui("bu"),rg=Ui("u"),og=Ui("bum"),Cf=Ui("um"),ag=Ui("sp"),lg=Ui("rtg"),cg=Ui("rtc");function hg(n,e=Kt){Pa("ec",n,e)}const ug="components";function tr(n,e){return fg(ug,n,!0,e)||n}const dg=Symbol.for("v-ndc");function fg(n,e,t=!0,i=!1){const s=En||Kt;if(s){const r=s.type;{const a=e0(r,!1);if(a&&(a===e||a===Dn(e)||a===Ea(Dn(e))))return r}const o=kh(s[n]||r[n],e)||kh(s.appContext[n],e);return!o&&i?r:o}}function kh(n,e){return n&&(n[e]||n[Dn(e)]||n[Ea(Dn(e))])}function ha(n,e,t,i){let s;const r=t,o=We(n);if(o||Dt(n)){const a=o&&Ms(n);let l=!1,c=!1;a&&(l=!kn(n),c=Ji(n),n=Aa(n)),s=new Array(n.length);for(let h=0,d=n.length;h<d;h++)s[h]=e(l?c?ar(Li(n[h])):Li(n[h]):n[h],h,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=e(a+1,a,void 0,r)}else if(xt(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>e(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const h=a[l];s[l]=e(n[h],h,l,r)}}else s=[];return s}const Xl=n=>n?Zf(n)?La(n):Xl(n.parent):null,zr=en(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Xl(n.parent),$root:n=>Xl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Pf(n),$forceUpdate:n=>n.f||(n.f=()=>{eh(n.update)}),$nextTick:n=>n.n||(n.n=vf.bind(n.proxy)),$watch:n=>$m.bind(n)}),Ka=(n,e)=>n!==St&&!n.__isScriptSetup&&ht(n,e),pg={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(e[0]!=="$"){const u=o[e];if(u!==void 0)switch(u){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(Ka(i,e))return o[e]=1,i[e];if(s!==St&&ht(s,e))return o[e]=2,s[e];if(ht(r,e))return o[e]=3,r[e];if(t!==St&&ht(t,e))return o[e]=4,t[e];ql&&(o[e]=0)}}const c=zr[e];let h,d;if(c)return e==="$attrs"&&$t(n.attrs,"get",""),c(n);if((h=a.__cssModules)&&(h=h[e]))return h;if(t!==St&&ht(t,e))return o[e]=4,t[e];if(d=l.config.globalProperties,ht(d,e))return d[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return Ka(s,e)?(s[e]=t,!0):i!==St&&ht(i,e)?(i[e]=t,!0):ht(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(t[a]||n!==St&&a[0]!=="$"&&ht(n,a)||Ka(e,a)||ht(r,a)||ht(i,a)||ht(zr,a)||ht(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:ht(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function Wh(n){return We(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let ql=!0;function mg(n){const e=Pf(n),t=n.proxy,i=n.ctx;ql=!1,e.beforeCreate&&Xh(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:h,beforeMount:d,mounted:u,beforeUpdate:f,updated:g,activated:v,deactivated:p,beforeDestroy:m,beforeUnmount:_,destroyed:E,unmounted:S,render:A,renderTracked:C,renderTriggered:P,errorCaptured:y,serverPrefetch:T,expose:G,inheritAttrs:D,components:H,directives:L,filters:B}=e;if(c&&gg(c,i,null),o)for(const z in o){const q=o[z];Ze(q)&&(i[z]=q.bind(t))}if(s){const z=s.call(t,t);xt(z)&&(n.data=Ca(z))}if(ql=!0,r)for(const z in r){const q=r[z],Q=Ze(q)?q.bind(t,t):Ze(q.get)?q.get.bind(t,t):ni,me=!Ze(q)&&Ze(q.set)?q.set.bind(t):ni,_e=n0({get:Q,set:me});Object.defineProperty(i,z,{enumerable:!0,configurable:!0,get:()=>_e.value,set:ie=>_e.value=ie})}if(a)for(const z in a)Rf(a[z],i,t,z);if(l){const z=Ze(l)?l.call(t):l;Reflect.ownKeys(z).forEach(q=>{qm(q,z[q])})}h&&Xh(h,n,"c");function I(z,q){We(q)?q.forEach(Q=>z(Q.bind(t))):q&&z(q.bind(t))}if(I(ng,d),I(ig,u),I(sg,f),I(rg,g),I(Qm,v),I(eg,p),I(hg,y),I(cg,C),I(lg,P),I(og,_),I(Cf,S),I(ag,T),We(G))if(G.length){const z=n.exposed||(n.exposed={});G.forEach(q=>{Object.defineProperty(z,q,{get:()=>t[q],set:Q=>t[q]=Q,enumerable:!0})})}else n.exposed||(n.exposed={});A&&n.render===ni&&(n.render=A),D!=null&&(n.inheritAttrs=D),H&&(n.components=H),L&&(n.directives=L),T&&wf(n)}function gg(n,e,t=ni){We(n)&&(n=Yl(n));for(const i in n){const s=n[i];let r;xt(s)?"default"in s?r=jo(s.from||i,s.default,!0):r=jo(s.from||i):r=jo(s),on(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[i]=r}}function Xh(n,e,t){oi(We(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function Rf(n,e,t,i){let s=i.includes(".")?bf(t,i):()=>t[i];if(Dt(n)){const r=e[n];Ze(r)&&$a(s,r)}else if(Ze(n))$a(s,n.bind(t));else if(xt(n))if(We(n))n.forEach(r=>Rf(r,e,t,i));else{const r=Ze(n.handler)?n.handler.bind(t):e[n.handler];Ze(r)&&$a(s,r,n)}}function Pf(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(e);let l;return a?l=a:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>ua(l,c,o,!0)),ua(l,e,o)),xt(e)&&r.set(e,l),l}function ua(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&ua(n,r,t,!0),s&&s.forEach(o=>ua(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=_g[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const _g={data:qh,props:Yh,emits:Yh,methods:Dr,computed:Dr,beforeCreate:tn,created:tn,beforeMount:tn,mounted:tn,beforeUpdate:tn,updated:tn,beforeDestroy:tn,beforeUnmount:tn,destroyed:tn,unmounted:tn,activated:tn,deactivated:tn,errorCaptured:tn,serverPrefetch:tn,components:Dr,directives:Dr,watch:xg,provide:qh,inject:vg};function qh(n,e){return e?n?function(){return en(Ze(n)?n.call(this,this):n,Ze(e)?e.call(this,this):e)}:e:n}function vg(n,e){return Dr(Yl(n),Yl(e))}function Yl(n){if(We(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function tn(n,e){return n?[...new Set([].concat(n,e))]:e}function Dr(n,e){return n?en(Object.create(null),n,e):e}function Yh(n,e){return n?We(n)&&We(e)?[...new Set([...n,...e])]:en(Object.create(null),Wh(n),Wh(e??{})):e}function xg(n,e){if(!n)return e;if(!e)return n;const t=en(Object.create(null),n);for(const i in e)t[i]=tn(n[i],e[i]);return t}function Df(){return{app:null,config:{isNativeTag:qd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let yg=0;function Sg(n,e){return function(i,s=null){Ze(i)||(i=en({},i)),s!=null&&!xt(s)&&(s=null);const r=Df(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:yg++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:i0,get config(){return r.config},set config(h){},use(h,...d){return o.has(h)||(h&&Ze(h.install)?(o.add(h),h.install(c,...d)):Ze(h)&&(o.add(h),h(c,...d))),c},mixin(h){return r.mixins.includes(h)||r.mixins.push(h),c},component(h,d){return d?(r.components[h]=d,c):r.components[h]},directive(h,d){return d?(r.directives[h]=d,c):r.directives[h]},mount(h,d,u){if(!l){const f=c._ceVNode||an(i,s);return f.appContext=r,u===!0?u="svg":u===!1&&(u=void 0),n(f,h,u),l=!0,c._container=h,h.__vue_app__=c,La(f.component)}},onUnmount(h){a.push(h)},unmount(){l&&(oi(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(h,d){return r.provides[h]=d,c},runWithContext(h){const d=nr;nr=c;try{return h()}finally{nr=d}}};return c}}let nr=null;const Mg=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Dn(e)}Modifiers`]||n[`${bs(e)}Modifiers`];function Eg(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||St;let s=t;const r=e.startsWith("update:"),o=r&&Mg(i,e.slice(7));o&&(o.trim&&(s=t.map(h=>Dt(h)?h.trim():h)),o.number&&(s=t.map(ba)));let a,l=i[a=Wa(e)]||i[a=Wa(Dn(e))];!l&&r&&(l=i[a=Wa(bs(e))]),l&&oi(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,oi(c,n,6,s)}}const bg=new WeakMap;function If(n,e,t=!1){const i=t?bg:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Ze(n)){const l=c=>{const h=If(c,e,!0);h&&(a=!0,en(o,h))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(xt(n)&&i.set(n,null),null):(We(r)?r.forEach(l=>o[l]=null):en(o,r),xt(n)&&i.set(n,o),o)}function Da(n,e){return!n||!ya(e)?!1:(e=e.slice(2).replace(/Once$/,""),ht(n,e[0].toLowerCase()+e.slice(1))||ht(n,bs(e))||ht(n,e))}function jh(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:h,props:d,data:u,setupState:f,ctx:g,inheritAttrs:v}=n,p=la(n);let m,_;try{if(t.shapeFlag&4){const S=s||i,A=S;m=Qn(c.call(A,S,h,d,f,u,g)),_=a}else{const S=e;m=Qn(S.length>1?S(d,{attrs:a,slots:o,emit:l}):S(d,null)),_=e.props?a:wg(a)}}catch(S){Hr.length=0,Ra(S,n,1),m=an(Qi)}let E=m;if(_&&v!==!1){const S=Object.keys(_),{shapeFlag:A}=E;S.length&&A&7&&(r&&S.some(Xc)&&(_=Tg(_,r)),E=lr(E,_,!1,!0))}return t.dirs&&(E=lr(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(t.dirs):t.dirs),t.transition&&nh(E,t.transition),m=E,la(p),m}const wg=n=>{let e;for(const t in n)(t==="class"||t==="style"||ya(t))&&((e||(e={}))[t]=n[t]);return e},Tg=(n,e)=>{const t={};for(const i in n)(!Xc(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function Ag(n,e,t){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?$h(i,o,c):!!o;if(l&8){const h=e.dynamicProps;for(let d=0;d<h.length;d++){const u=h[d];if(Lf(o,i,u)&&!Da(c,u))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?$h(i,o,c):!0:!!o;return!1}function $h(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(Lf(e,n,r)&&!Da(t,r))return!0}return!1}function Lf(n,e,t){const i=n[t],s=e[t];return t==="style"&&xt(i)&&xt(s)?!eo(i,s):i!==s}function Cg({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const Nf={},Ff=()=>Object.create(Nf),Uf=n=>Object.getPrototypeOf(n)===Nf;function Rg(n,e,t,i=!1){const s={},r=Ff();n.propsDefaults=Object.create(null),Of(n,e,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);t?n.props=i?s:Fm(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Pg(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=gt(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const h=n.vnode.dynamicProps;for(let d=0;d<h.length;d++){let u=h[d];if(Da(n.emitsOptions,u))continue;const f=e[u];if(l)if(ht(r,u))f!==r[u]&&(r[u]=f,c=!0);else{const g=Dn(u);s[g]=jl(l,a,g,f,n,!1)}else f!==r[u]&&(r[u]=f,c=!0)}}}else{Of(n,e,s,r)&&(c=!0);let h;for(const d in a)(!e||!ht(e,d)&&((h=bs(d))===d||!ht(e,h)))&&(l?t&&(t[d]!==void 0||t[h]!==void 0)&&(s[d]=jl(l,a,d,void 0,n,!0)):delete s[d]);if(r!==a)for(const d in r)(!e||!ht(e,d))&&(delete r[d],c=!0)}c&&Ti(n.attrs,"set","")}function Of(n,e,t,i){const[s,r]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(Nr(l))continue;const c=e[l];let h;s&&ht(s,h=Dn(l))?!r||!r.includes(h)?t[h]=c:(a||(a={}))[h]=c:Da(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=gt(t),c=a||St;for(let h=0;h<r.length;h++){const d=r[h];t[d]=jl(s,l,d,c[d],n,!ht(c,d))}}return o}function jl(n,e,t,i,s,r){const o=n[t];if(o!=null){const a=ht(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Ze(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const h=no(s);i=c[t]=l.call(null,e),h()}}else i=l;s.ce&&s.ce._setProp(t,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===bs(t))&&(i=!0))}return i}const Dg=new WeakMap;function Bf(n,e,t=!1){const i=t?Dg:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Ze(n)){const h=d=>{l=!0;const[u,f]=Bf(d,e,!0);en(o,u),f&&a.push(...f)};!t&&e.mixins.length&&e.mixins.forEach(h),n.extends&&h(n.extends),n.mixins&&n.mixins.forEach(h)}if(!r&&!l)return xt(n)&&i.set(n,Js),Js;if(We(r))for(let h=0;h<r.length;h++){const d=Dn(r[h]);Kh(d)&&(o[d]=St)}else if(r)for(const h in r){const d=Dn(h);if(Kh(d)){const u=r[h],f=o[d]=We(u)||Ze(u)?{type:u}:en({},u),g=f.type;let v=!1,p=!0;if(We(g))for(let m=0;m<g.length;++m){const _=g[m],E=Ze(_)&&_.name;if(E==="Boolean"){v=!0;break}else E==="String"&&(p=!1)}else v=Ze(g)&&g.name==="Boolean";f[0]=v,f[1]=p,(v||ht(f,"default"))&&a.push(d)}}const c=[o,a];return xt(n)&&i.set(n,c),c}function Kh(n){return n[0]!=="$"&&!Nr(n)}const ih=n=>n==="_"||n==="_ctx"||n==="$stable",sh=n=>We(n)?n.map(Qn):[Qn(n)],Ig=(n,e,t)=>{if(e._n)return e;const i=Xm((...s)=>sh(e(...s)),t);return i._c=!1,i},zf=(n,e,t)=>{const i=n._ctx;for(const s in n){if(ih(s))continue;const r=n[s];if(Ze(r))e[s]=Ig(s,r,i);else if(r!=null){const o=sh(r);e[s]=()=>o}}},Hf=(n,e)=>{const t=sh(e);n.slots.default=()=>t},Vf=(n,e,t)=>{for(const i in e)(t||!ih(i))&&(n[i]=e[i])},Lg=(n,e,t)=>{const i=n.slots=Ff();if(n.vnode.shapeFlag&32){const s=e._;s?(Vf(i,e,t),t&&Kd(i,"_",s,!0)):zf(e,i)}else e&&Hf(n,e)},Ng=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,o=St;if(i.shapeFlag&32){const a=e._;a?t&&a===1?r=!1:Vf(s,e,t):(r=!e.$stable,zf(e,s)),o=e}else e&&(Hf(n,e),o={default:1});if(r)for(const a in s)!ih(a)&&o[a]==null&&delete s[a]},dn=zg;function Fg(n){return Ug(n)}function Ug(n,e){const t=wa();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:h,parentNode:d,nextSibling:u,setScopeId:f=ni,insertStaticContent:g}=n,v=(N,O,X,oe=null,Z=null,ae=null,R=void 0,he=null,le=!!O.dynamicChildren)=>{if(N===O)return;N&&!gr(N,O)&&(oe=pe(N),ie(N,Z,ae,!0),N=null),O.patchFlag===-2&&(le=!1,O.dynamicChildren=null);const{type:re,ref:ce,shapeFlag:b}=O;switch(re){case Ia:p(N,O,X,oe);break;case Qi:m(N,O,X,oe);break;case $o:N==null&&_(O,X,oe,R);break;case xn:H(N,O,X,oe,Z,ae,R,he,le);break;default:b&1?A(N,O,X,oe,Z,ae,R,he,le):b&6?L(N,O,X,oe,Z,ae,R,he,le):(b&64||b&128)&&re.process(N,O,X,oe,Z,ae,R,he,le,Ve)}ce!=null&&Z?Or(ce,N&&N.ref,ae,O||N,!O):ce==null&&N&&N.ref!=null&&Or(N.ref,null,ae,N,!0)},p=(N,O,X,oe)=>{if(N==null)i(O.el=a(O.children),X,oe);else{const Z=O.el=N.el;O.children!==N.children&&c(Z,O.children)}},m=(N,O,X,oe)=>{N==null?i(O.el=l(O.children||""),X,oe):O.el=N.el},_=(N,O,X,oe)=>{[N.el,N.anchor]=g(N.children,O,X,oe,N.el,N.anchor)},E=({el:N,anchor:O},X,oe)=>{let Z;for(;N&&N!==O;)Z=u(N),i(N,X,oe),N=Z;i(O,X,oe)},S=({el:N,anchor:O})=>{let X;for(;N&&N!==O;)X=u(N),s(N),N=X;s(O)},A=(N,O,X,oe,Z,ae,R,he,le)=>{if(O.type==="svg"?R="svg":O.type==="math"&&(R="mathml"),N==null)C(O,X,oe,Z,ae,R,he,le);else{const re=N.el&&N.el._isVueCE?N.el:null;try{re&&re._beginPatch(),T(N,O,Z,ae,R,he,le)}finally{re&&re._endPatch()}}},C=(N,O,X,oe,Z,ae,R,he)=>{let le,re;const{props:ce,shapeFlag:b,transition:x,dirs:U}=N;if(le=N.el=o(N.type,ae,ce&&ce.is,ce),b&8?h(le,N.children):b&16&&y(N.children,le,null,oe,Z,Za(N,ae),R,he),U&&is(N,null,oe,"created"),P(le,N,N.scopeId,R,oe),ce){for(const ee in ce)ee!=="value"&&!Nr(ee)&&r(le,ee,null,ce[ee],ae,oe);"value"in ce&&r(le,"value",null,ce.value,ae),(re=ce.onVnodeBeforeMount)&&qn(re,oe,N)}U&&is(N,null,oe,"beforeMount");const Y=Og(Z,x);Y&&x.beforeEnter(le),i(le,O,X),((re=ce&&ce.onVnodeMounted)||Y||U)&&dn(()=>{re&&qn(re,oe,N),Y&&x.enter(le),U&&is(N,null,oe,"mounted")},Z)},P=(N,O,X,oe,Z)=>{if(X&&f(N,X),oe)for(let ae=0;ae<oe.length;ae++)f(N,oe[ae]);if(Z){let ae=Z.subTree;if(O===ae||Xf(ae.type)&&(ae.ssContent===O||ae.ssFallback===O)){const R=Z.vnode;P(N,R,R.scopeId,R.slotScopeIds,Z.parent)}}},y=(N,O,X,oe,Z,ae,R,he,le=0)=>{for(let re=le;re<N.length;re++){const ce=N[re]=he?wi(N[re]):Qn(N[re]);v(null,ce,O,X,oe,Z,ae,R,he)}},T=(N,O,X,oe,Z,ae,R)=>{const he=O.el=N.el;let{patchFlag:le,dynamicChildren:re,dirs:ce}=O;le|=N.patchFlag&16;const b=N.props||St,x=O.props||St;let U;if(X&&ss(X,!1),(U=x.onVnodeBeforeUpdate)&&qn(U,X,O,N),ce&&is(O,N,X,"beforeUpdate"),X&&ss(X,!0),(b.innerHTML&&x.innerHTML==null||b.textContent&&x.textContent==null)&&h(he,""),re?G(N.dynamicChildren,re,he,X,oe,Za(O,Z),ae):R||q(N,O,he,null,X,oe,Za(O,Z),ae,!1),le>0){if(le&16)D(he,b,x,X,Z);else if(le&2&&b.class!==x.class&&r(he,"class",null,x.class,Z),le&4&&r(he,"style",b.style,x.style,Z),le&8){const Y=O.dynamicProps;for(let ee=0;ee<Y.length;ee++){const j=Y[ee],Se=b[j],de=x[j];(de!==Se||j==="value")&&r(he,j,Se,de,Z,X)}}le&1&&N.children!==O.children&&h(he,O.children)}else!R&&re==null&&D(he,b,x,X,Z);((U=x.onVnodeUpdated)||ce)&&dn(()=>{U&&qn(U,X,O,N),ce&&is(O,N,X,"updated")},oe)},G=(N,O,X,oe,Z,ae,R)=>{for(let he=0;he<O.length;he++){const le=N[he],re=O[he],ce=le.el&&(le.type===xn||!gr(le,re)||le.shapeFlag&198)?d(le.el):X;v(le,re,ce,null,oe,Z,ae,R,!0)}},D=(N,O,X,oe,Z)=>{if(O!==X){if(O!==St)for(const ae in O)!Nr(ae)&&!(ae in X)&&r(N,ae,O[ae],null,Z,oe);for(const ae in X){if(Nr(ae))continue;const R=X[ae],he=O[ae];R!==he&&ae!=="value"&&r(N,ae,he,R,Z,oe)}"value"in X&&r(N,"value",O.value,X.value,Z)}},H=(N,O,X,oe,Z,ae,R,he,le)=>{const re=O.el=N?N.el:a(""),ce=O.anchor=N?N.anchor:a("");let{patchFlag:b,dynamicChildren:x,slotScopeIds:U}=O;U&&(he=he?he.concat(U):U),N==null?(i(re,X,oe),i(ce,X,oe),y(O.children||[],X,ce,Z,ae,R,he,le)):b>0&&b&64&&x&&N.dynamicChildren&&N.dynamicChildren.length===x.length?(G(N.dynamicChildren,x,X,Z,ae,R,he),(O.key!=null||Z&&O===Z.subTree)&&Gf(N,O,!0)):q(N,O,X,ce,Z,ae,R,he,le)},L=(N,O,X,oe,Z,ae,R,he,le)=>{O.slotScopeIds=he,N==null?O.shapeFlag&512?Z.ctx.activate(O,X,oe,R,le):B(O,X,oe,Z,ae,R,le):F(N,O,le)},B=(N,O,X,oe,Z,ae,R)=>{const he=N.component=jg(N,oe,Z);if(Tf(N)&&(he.ctx.renderer=Ve),Kg(he,!1,R),he.asyncDep){if(Z&&Z.registerDep(he,I,R),!N.el){const le=he.subTree=an(Qi);m(null,le,O,X),N.placeholder=le.el}}else I(he,N,O,X,Z,ae,R)},F=(N,O,X)=>{const oe=O.component=N.component;if(Ag(N,O,X))if(oe.asyncDep&&!oe.asyncResolved){z(oe,O,X);return}else oe.next=O,oe.update();else O.el=N.el,oe.vnode=O},I=(N,O,X,oe,Z,ae,R)=>{const he=()=>{if(N.isMounted){let{next:b,bu:x,u:U,parent:Y,vnode:ee}=N;{const Ue=kf(N);if(Ue){b&&(b.el=ee.el,z(N,b,R)),Ue.asyncDep.then(()=>{dn(()=>{N.isUnmounted||re()},Z)});return}}let j=b,Se;ss(N,!1),b?(b.el=ee.el,z(N,b,R)):b=ee,x&&Yo(x),(Se=b.props&&b.props.onVnodeBeforeUpdate)&&qn(Se,Y,b,ee),ss(N,!0);const de=jh(N),De=N.subTree;N.subTree=de,v(De,de,d(De.el),pe(De),N,Z,ae),b.el=de.el,j===null&&Cg(N,de.el),U&&dn(U,Z),(Se=b.props&&b.props.onVnodeUpdated)&&dn(()=>qn(Se,Y,b,ee),Z)}else{let b;const{el:x,props:U}=O,{bm:Y,m:ee,parent:j,root:Se,type:de}=N,De=Br(O);ss(N,!1),Y&&Yo(Y),!De&&(b=U&&U.onVnodeBeforeMount)&&qn(b,j,O),ss(N,!0);{Se.ce&&Se.ce._hasShadowRoot()&&Se.ce._injectChildStyle(de);const Ue=N.subTree=jh(N);v(null,Ue,X,oe,N,Z,ae),O.el=Ue.el}if(ee&&dn(ee,Z),!De&&(b=U&&U.onVnodeMounted)){const Ue=O;dn(()=>qn(b,j,Ue),Z)}(O.shapeFlag&256||j&&Br(j.vnode)&&j.vnode.shapeFlag&256)&&N.a&&dn(N.a,Z),N.isMounted=!0,O=X=oe=null}};N.scope.on();const le=N.effect=new ef(he);N.scope.off();const re=N.update=le.run.bind(le),ce=N.job=le.runIfDirty.bind(le);ce.i=N,ce.id=N.uid,le.scheduler=()=>eh(ce),ss(N,!0),re()},z=(N,O,X)=>{O.component=N;const oe=N.vnode.props;N.vnode=O,N.next=null,Pg(N,O.props,oe,X),Ng(N,O.children,X),Di(),Hh(N),Ii()},q=(N,O,X,oe,Z,ae,R,he,le=!1)=>{const re=N&&N.children,ce=N?N.shapeFlag:0,b=O.children,{patchFlag:x,shapeFlag:U}=O;if(x>0){if(x&128){me(re,b,X,oe,Z,ae,R,he,le);return}else if(x&256){Q(re,b,X,oe,Z,ae,R,he,le);return}}U&8?(ce&16&&se(re,Z,ae),b!==re&&h(X,b)):ce&16?U&16?me(re,b,X,oe,Z,ae,R,he,le):se(re,Z,ae,!0):(ce&8&&h(X,""),U&16&&y(b,X,oe,Z,ae,R,he,le))},Q=(N,O,X,oe,Z,ae,R,he,le)=>{N=N||Js,O=O||Js;const re=N.length,ce=O.length,b=Math.min(re,ce);let x;for(x=0;x<b;x++){const U=O[x]=le?wi(O[x]):Qn(O[x]);v(N[x],U,X,null,Z,ae,R,he,le)}re>ce?se(N,Z,ae,!0,!1,b):y(O,X,oe,Z,ae,R,he,le,b)},me=(N,O,X,oe,Z,ae,R,he,le)=>{let re=0;const ce=O.length;let b=N.length-1,x=ce-1;for(;re<=b&&re<=x;){const U=N[re],Y=O[re]=le?wi(O[re]):Qn(O[re]);if(gr(U,Y))v(U,Y,X,null,Z,ae,R,he,le);else break;re++}for(;re<=b&&re<=x;){const U=N[b],Y=O[x]=le?wi(O[x]):Qn(O[x]);if(gr(U,Y))v(U,Y,X,null,Z,ae,R,he,le);else break;b--,x--}if(re>b){if(re<=x){const U=x+1,Y=U<ce?O[U].el:oe;for(;re<=x;)v(null,O[re]=le?wi(O[re]):Qn(O[re]),X,Y,Z,ae,R,he,le),re++}}else if(re>x)for(;re<=b;)ie(N[re],Z,ae,!0),re++;else{const U=re,Y=re,ee=new Map;for(re=Y;re<=x;re++){const Me=O[re]=le?wi(O[re]):Qn(O[re]);Me.key!=null&&ee.set(Me.key,re)}let j,Se=0;const de=x-Y+1;let De=!1,Ue=0;const ue=new Array(de);for(re=0;re<de;re++)ue[re]=0;for(re=U;re<=b;re++){const Me=N[re];if(Se>=de){ie(Me,Z,ae,!0);continue}let Ce;if(Me.key!=null)Ce=ee.get(Me.key);else for(j=Y;j<=x;j++)if(ue[j-Y]===0&&gr(Me,O[j])){Ce=j;break}Ce===void 0?ie(Me,Z,ae,!0):(ue[Ce-Y]=re+1,Ce>=Ue?Ue=Ce:De=!0,v(Me,O[Ce],X,null,Z,ae,R,he,le),Se++)}const ge=De?Bg(ue):Js;for(j=ge.length-1,re=de-1;re>=0;re--){const Me=Y+re,Ce=O[Me],Re=O[Me+1],$e=Me+1<ce?Re.el||Wf(Re):oe;ue[re]===0?v(null,Ce,X,$e,Z,ae,R,he,le):De&&(j<0||re!==ge[j]?_e(Ce,X,$e,2):j--)}}},_e=(N,O,X,oe,Z=null)=>{const{el:ae,type:R,transition:he,children:le,shapeFlag:re}=N;if(re&6){_e(N.component.subTree,O,X,oe);return}if(re&128){N.suspense.move(O,X,oe);return}if(re&64){R.move(N,O,X,Ve);return}if(R===xn){i(ae,O,X);for(let b=0;b<le.length;b++)_e(le[b],O,X,oe);i(N.anchor,O,X);return}if(R===$o){E(N,O,X);return}if(oe!==2&&re&1&&he)if(oe===0)he.beforeEnter(ae),i(ae,O,X),dn(()=>he.enter(ae),Z);else{const{leave:b,delayLeave:x,afterLeave:U}=he,Y=()=>{N.ctx.isUnmounted?s(ae):i(ae,O,X)},ee=()=>{ae._isLeaving&&ae[Jm](!0),b(ae,()=>{Y(),U&&U()})};x?x(ae,Y,ee):ee()}else i(ae,O,X)},ie=(N,O,X,oe=!1,Z=!1)=>{const{type:ae,props:R,ref:he,children:le,dynamicChildren:re,shapeFlag:ce,patchFlag:b,dirs:x,cacheIndex:U}=N;if(b===-2&&(Z=!1),he!=null&&(Di(),Or(he,null,X,N,!0),Ii()),U!=null&&(O.renderCache[U]=void 0),ce&256){O.ctx.deactivate(N);return}const Y=ce&1&&x,ee=!Br(N);let j;if(ee&&(j=R&&R.onVnodeBeforeUnmount)&&qn(j,O,N),ce&6)lt(N.component,X,oe);else{if(ce&128){N.suspense.unmount(X,oe);return}Y&&is(N,null,O,"beforeUnmount"),ce&64?N.type.remove(N,O,X,Ve,oe):re&&!re.hasOnce&&(ae!==xn||b>0&&b&64)?se(re,O,X,!1,!0):(ae===xn&&b&384||!Z&&ce&16)&&se(le,O,X),oe&&Ge(N)}(ee&&(j=R&&R.onVnodeUnmounted)||Y)&&dn(()=>{j&&qn(j,O,N),Y&&is(N,null,O,"unmounted")},X)},Ge=N=>{const{type:O,el:X,anchor:oe,transition:Z}=N;if(O===xn){at(X,oe);return}if(O===$o){S(N);return}const ae=()=>{s(X),Z&&!Z.persisted&&Z.afterLeave&&Z.afterLeave()};if(N.shapeFlag&1&&Z&&!Z.persisted){const{leave:R,delayLeave:he}=Z,le=()=>R(X,ae);he?he(N.el,ae,le):le()}else ae()},at=(N,O)=>{let X;for(;N!==O;)X=u(N),s(N),N=X;s(O)},lt=(N,O,X)=>{const{bum:oe,scope:Z,job:ae,subTree:R,um:he,m:le,a:re}=N;Zh(le),Zh(re),oe&&Yo(oe),Z.stop(),ae&&(ae.flags|=8,ie(R,N,O,X)),he&&dn(he,O),dn(()=>{N.isUnmounted=!0},O)},se=(N,O,X,oe=!1,Z=!1,ae=0)=>{for(let R=ae;R<N.length;R++)ie(N[R],O,X,oe,Z)},pe=N=>{if(N.shapeFlag&6)return pe(N.component.subTree);if(N.shapeFlag&128)return N.suspense.next();const O=u(N.anchor||N.el),X=O&&O[Km];return X?u(X):O};let xe=!1;const Ye=(N,O,X)=>{let oe;N==null?O._vnode&&(ie(O._vnode,null,null,!0),oe=O._vnode.component):v(O._vnode||null,N,O,null,null,null,X),O._vnode=N,xe||(xe=!0,Hh(oe),yf(),xe=!1)},Ve={p:v,um:ie,m:_e,r:Ge,mt:B,mc:y,pc:q,pbc:G,n:pe,o:n};return{render:Ye,hydrate:void 0,createApp:Sg(Ye)}}function Za({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function ss({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Og(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function Gf(n,e,t=!1){const i=n.children,s=e.children;if(We(i)&&We(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=wi(s[r]),a.el=o.el),!t&&a.patchFlag!==-2&&Gf(o,a)),a.type===Ia&&(a.patchFlag===-1&&(a=s[r]=wi(a)),a.el=o.el),a.type===Qi&&!a.el&&(a.el=o.el)}}function Bg(n){const e=n.slice(),t=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,o=t.length-1;r<o;)a=r+o>>1,n[t[a]]<c?r=a+1:o=a;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function kf(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:kf(e)}function Zh(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function Wf(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?Wf(e.subTree):null}const Xf=n=>n.__isSuspense;function zg(n,e){e&&e.pendingBranch?We(n)?e.effects.push(...n):e.effects.push(n):Wm(n)}const xn=Symbol.for("v-fgt"),Ia=Symbol.for("v-txt"),Qi=Symbol.for("v-cmt"),$o=Symbol.for("v-stc"),Hr=[];let bn=null;function Nt(n=!1){Hr.push(bn=n?null:[])}function Hg(){Hr.pop(),bn=Hr[Hr.length-1]||null}let Yr=1;function Jh(n,e=!1){Yr+=n,n<0&&bn&&e&&(bn.hasOnce=!0)}function qf(n){return n.dynamicChildren=Yr>0?bn||Js:null,Hg(),Yr>0&&bn&&bn.push(n),n}function kt(n,e,t,i,s,r){return qf(tt(n,e,t,i,s,r,!0))}function Yf(n,e,t,i,s){return qf(an(n,e,t,i,s,!0))}function jf(n){return n?n.__v_isVNode===!0:!1}function gr(n,e){return n.type===e.type&&n.key===e.key}const $f=({key:n})=>n??null,Ko=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Dt(n)||on(n)||Ze(n)?{i:En,r:n,k:e,f:!!t}:n:null);function tt(n,e=null,t=null,i=0,s=null,r=n===xn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&$f(e),ref:e&&Ko(e),scopeId:Mf,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:En};return a?(rh(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=Dt(t)?8:16),Yr>0&&!o&&bn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&bn.push(l),l}const an=Vg;function Vg(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===dg)&&(n=Qi),jf(n)){const a=lr(n,e,!0);return t&&rh(a,t),Yr>0&&!r&&bn&&(a.shapeFlag&6?bn[bn.indexOf(n)]=a:bn.push(a)),a.patchFlag=-2,a}if(t0(n)&&(n=n.__vccOpts),e){e=Gg(e);let{class:a,style:l}=e;a&&!Dt(a)&&(e.class=Ta(a)),xt(l)&&(Qc(l)&&!We(l)&&(l=en({},l)),e.style=kr(l))}const o=Dt(n)?1:Xf(n)?128:Zm(n)?64:xt(n)?4:Ze(n)?2:0;return tt(n,e,t,i,s,o,r,!0)}function Gg(n){return n?Qc(n)||Uf(n)?en({},n):n:null}function lr(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=e?Xg(s||{},e):s,h={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&$f(c),ref:e&&e.ref?t&&r?We(r)?r.concat(Ko(e)):[r,Ko(e)]:Ko(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==xn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&lr(n.ssContent),ssFallback:n.ssFallback&&lr(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&nh(h,l.clone(h)),h}function Kf(n=" ",e=0){return an(Ia,null,n,e)}function kg(n,e){const t=an($o,null,n);return t.staticCount=e,t}function Wg(n="",e=!1){return e?(Nt(),Yf(Qi,null,n)):an(Qi,null,n)}function Qn(n){return n==null||typeof n=="boolean"?an(Qi):We(n)?an(xn,null,n.slice()):jf(n)?wi(n):an(Ia,null,String(n))}function wi(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:lr(n)}function rh(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(We(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),rh(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!Uf(e)?e._ctx=En:s===3&&En&&(En.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Ze(e)?(e={default:e,_ctx:En},t=32):(e=String(e),i&64?(t=16,e=[Kf(e)]):t=8);n.children=e,n.shapeFlag|=t}function Xg(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Ta([e.class,i.class]));else if(s==="style")e.style=kr([e.style,i.style]);else if(ya(s)){const r=e[s],o=i[s];o&&r!==o&&!(We(r)&&r.includes(o))&&(e[s]=r?[].concat(r,o):o)}else s!==""&&(e[s]=i[s])}return e}function qn(n,e,t,i=null){oi(n,e,7,[t,i])}const qg=Df();let Yg=0;function jg(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||qg,r={uid:Yg++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new mm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Bf(i,s),emitsOptions:If(i,s),emit:null,emitted:null,propsDefaults:St,inheritAttrs:i.inheritAttrs,ctx:St,data:St,props:St,attrs:St,slots:St,refs:St,setupState:St,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Eg.bind(null,r),n.ce&&n.ce(r),r}let Kt=null;const $g=()=>Kt||En;let da,$l;{const n=wa(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};da=e("__VUE_INSTANCE_SETTERS__",t=>Kt=t),$l=e("__VUE_SSR_SETTERS__",t=>jr=t)}const no=n=>{const e=Kt;return da(n),n.scope.on(),()=>{n.scope.off(),da(e)}},Qh=()=>{Kt&&Kt.scope.off(),da(null)};function Zf(n){return n.vnode.shapeFlag&4}let jr=!1;function Kg(n,e=!1,t=!1){e&&$l(e);const{props:i,children:s}=n.vnode,r=Zf(n);Rg(n,i,r,e),Lg(n,s,t||e);const o=r?Zg(n,e):void 0;return e&&$l(!1),o}function Zg(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,pg);const{setup:i}=t;if(i){Di();const s=n.setupContext=i.length>1?Qg(n):null,r=no(n),o=to(i,n,0,[n.props,s]),a=Yd(o);if(Ii(),r(),(a||n.sp)&&!Br(n)&&wf(n),a){if(o.then(Qh,Qh),e)return o.then(l=>{eu(n,l)}).catch(l=>{Ra(l,n,0)});n.asyncDep=o}else eu(n,o)}else Jf(n)}function eu(n,e,t){Ze(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:xt(e)&&(n.setupState=gf(e)),Jf(n)}function Jf(n,e,t){const i=n.type;n.render||(n.render=i.render||ni);{const s=no(n);Di();try{mg(n)}finally{Ii(),s()}}}const Jg={get(n,e){return $t(n,"get",""),n[e]}};function Qg(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,Jg),slots:n.slots,emit:n.emit,expose:e}}function La(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(gf(He(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in zr)return zr[t](n)},has(e,t){return t in e||t in zr}})):n.proxy}function e0(n,e=!0){return Ze(n)?n.displayName||n.name:n.name||e&&n.__name}function t0(n){return Ze(n)&&"__vccOpts"in n}const n0=(n,e)=>zm(n,e,jr),i0="3.5.29";let Kl;const tu=typeof window<"u"&&window.trustedTypes;if(tu)try{Kl=tu.createPolicy("vue",{createHTML:n=>n})}catch{}const Qf=Kl?n=>Kl.createHTML(n):n=>n,s0="http://www.w3.org/2000/svg",r0="http://www.w3.org/1998/Math/MathML",Ei=typeof document<"u"?document:null,nu=Ei&&Ei.createElement("template"),o0={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?Ei.createElementNS(s0,n):e==="mathml"?Ei.createElementNS(r0,n):t?Ei.createElement(n,{is:t}):Ei.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Ei.createTextNode(n),createComment:n=>Ei.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Ei.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const o=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{nu.innerHTML=Qf(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=nu.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},a0=Symbol("_vtc");function l0(n,e,t){const i=n[a0];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const iu=Symbol("_vod"),c0=Symbol("_vsh"),h0=Symbol(""),u0=/(?:^|;)\s*display\s*:/;function d0(n,e,t){const i=n.style,s=Dt(t);let r=!1;if(t&&!s){if(e)if(Dt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&Zo(i,a,"")}else for(const o in e)t[o]==null&&Zo(i,o,"");for(const o in t)o==="display"&&(r=!0),Zo(i,o,t[o])}else if(s){if(e!==t){const o=i[h0];o&&(t+=";"+o),i.cssText=t,r=u0.test(t)}}else e&&n.removeAttribute("style");iu in n&&(n[iu]=r?i.display:"",n[c0]&&(i.display="none"))}const su=/\s*!important$/;function Zo(n,e,t){if(We(t))t.forEach(i=>Zo(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=f0(n,e);su.test(t)?n.setProperty(bs(i),t.replace(su,""),"important"):n[i]=t}}const ru=["Webkit","Moz","ms"],Ja={};function f0(n,e){const t=Ja[e];if(t)return t;let i=Dn(e);if(i!=="filter"&&i in n)return Ja[e]=i;i=Ea(i);for(let s=0;s<ru.length;s++){const r=ru[s]+i;if(r in n)return Ja[e]=r}return e}const ou="http://www.w3.org/1999/xlink";function au(n,e,t,i,s,r=dm(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(ou,e.slice(6,e.length)):n.setAttributeNS(ou,e,t):t==null||r&&!Zd(t)?n.removeAttribute(e):n.setAttribute(e,r?"":ri(t)?String(t):t)}function lu(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Qf(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=Zd(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(s||e)}function fs(n,e,t,i){n.addEventListener(e,t,i)}function p0(n,e,t,i){n.removeEventListener(e,t,i)}const cu=Symbol("_vei");function m0(n,e,t,i,s=null){const r=n[cu]||(n[cu]={}),o=r[e];if(i&&o)o.value=i;else{const[a,l]=g0(e);if(i){const c=r[e]=x0(i,s);fs(n,a,c,l)}else o&&(p0(n,a,o,l),r[e]=void 0)}}const hu=/(?:Once|Passive|Capture)$/;function g0(n){let e;if(hu.test(n)){e={};let i;for(;i=n.match(hu);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):bs(n.slice(2)),e]}let Qa=0;const _0=Promise.resolve(),v0=()=>Qa||(_0.then(()=>Qa=0),Qa=Date.now());function x0(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;oi(y0(i,t.value),e,5,[i])};return t.value=n,t.attached=v0(),t}function y0(n,e){if(We(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const uu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,S0=(n,e,t,i,s,r)=>{const o=s==="svg";e==="class"?l0(n,i,o):e==="style"?d0(n,t,i):ya(e)?Xc(e)||m0(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):M0(n,e,i,o))?(lu(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&au(n,e,i,o,r,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Dt(i))?lu(n,Dn(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),au(n,e,i,o))};function M0(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&uu(e)&&Ze(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return uu(e)&&Dt(t)?!1:e in n}const fa=n=>{const e=n.props["onUpdate:modelValue"]||!1;return We(e)?t=>Yo(e,t):e};function E0(n){n.target.composing=!0}function du(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const ir=Symbol("_assign");function fu(n,e,t){return e&&(n=n.trim()),t&&(n=ba(n)),n}const ep={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n[ir]=fa(s);const r=i||s.props&&s.props.type==="number";fs(n,e?"change":"input",o=>{o.target.composing||n[ir](fu(n.value,t,r))}),(t||r)&&fs(n,"change",()=>{n.value=fu(n.value,t,r)}),e||(fs(n,"compositionstart",E0),fs(n,"compositionend",du),fs(n,"change",du))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:r}},o){if(n[ir]=fa(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?ba(n.value):n.value,l=e??"";a!==l&&(document.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l))}},b0={deep:!0,created(n,{value:e,modifiers:{number:t}},i){const s=Sa(e);fs(n,"change",()=>{const r=Array.prototype.filter.call(n.options,o=>o.selected).map(o=>t?ba(pa(o)):pa(o));n[ir](n.multiple?s?new Set(r):r:r[0]),n._assigning=!0,vf(()=>{n._assigning=!1})}),n[ir]=fa(i)},mounted(n,{value:e}){pu(n,e)},beforeUpdate(n,e,t){n[ir]=fa(t)},updated(n,{value:e}){n._assigning||pu(n,e)}};function pu(n,e){const t=n.multiple,i=We(e);if(!(t&&!i&&!Sa(e))){for(let s=0,r=n.options.length;s<r;s++){const o=n.options[s],a=pa(o);if(t)if(i){const l=typeof a;l==="string"||l==="number"?o.selected=e.some(c=>String(c)===String(a)):o.selected=pm(e,a)>-1}else o.selected=e.has(a);else if(eo(pa(o),e)){n.selectedIndex!==s&&(n.selectedIndex=s);return}}!t&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function pa(n){return"_value"in n?n._value:n.value}const w0=en({patchProp:S0},o0);let mu;function T0(){return mu||(mu=Fg(w0))}const A0=((...n)=>{const e=T0().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=R0(i);if(!s)return;const r=e._component;!Ze(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=t(s,!1,C0(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function C0(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function R0(n){return Dt(n)?document.querySelector(n):n}const oh="183",sr={ROTATE:0,DOLLY:1,PAN:2},js={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},P0=0,gu=1,D0=2,Jo=1,tp=2,Ir=3,es=0,ln=1,Cn=2,Ri=0,rr=1,Vr=2,_u=3,vu=4,I0=5,ps=100,L0=101,N0=102,F0=103,U0=104,O0=200,B0=201,z0=202,H0=203,Zl=204,Jl=205,V0=206,G0=207,k0=208,W0=209,X0=210,q0=211,Y0=212,j0=213,$0=214,Ql=0,ec=1,tc=2,cr=3,nc=4,ic=5,sc=6,rc=7,np=0,K0=1,Z0=2,ii=0,ip=1,sp=2,rp=3,ah=4,op=5,ap=6,lp=7,cp=300,Es=301,hr=302,el=303,tl=304,Na=306,oc=1e3,Ci=1001,ac=1002,Ft=1003,J0=1004,po=1005,Jt=1006,nl=1007,vs=1008,Sn=1009,hp=1010,up=1011,$r=1012,lh=1013,ai=1014,zn=1015,Ni=1016,ch=1017,hh=1018,Kr=1020,dp=35902,fp=35899,pp=1021,mp=1022,Hn=1023,Fi=1026,xs=1027,Fa=1028,uh=1029,ur=1030,dh=1031,fh=1033,Qo=33776,ea=33777,ta=33778,na=33779,lc=35840,cc=35841,hc=35842,uc=35843,dc=36196,fc=37492,pc=37496,mc=37488,gc=37489,_c=37490,vc=37491,xc=37808,yc=37809,Sc=37810,Mc=37811,Ec=37812,bc=37813,wc=37814,Tc=37815,Ac=37816,Cc=37817,Rc=37818,Pc=37819,Dc=37820,Ic=37821,Lc=36492,Nc=36494,Fc=36495,Uc=36283,Oc=36284,Bc=36285,zc=36286,Q0=3200,gp=0,e_=1,$i="",sn="srgb",dr="srgb-linear",ma="linear",dt="srgb",Ps=7680,xu=519,t_=512,n_=513,i_=514,ph=515,s_=516,r_=517,mh=518,o_=519,yu=35044,Su="300 es",ti=2e3,Zr=2001;function a_(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ga(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function l_(){const n=ga("canvas");return n.style.display="block",n}const Mu={};function Eu(...n){const e="THREE."+n.shift();console.log(e,...n)}function _p(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Xe(...n){n=_p(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function it(...n){n=_p(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function _a(...n){const e=n.join(" ");e in Mu||(Mu[e]=!0,Xe(...n))}function c_(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const h_={[Ql]:ec,[tc]:sc,[nc]:rc,[cr]:ic,[ec]:Ql,[sc]:tc,[rc]:nc,[ic]:cr};class ws{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ia=Math.PI/180,Hc=180/Math.PI;function io(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(qt[n&255]+qt[n>>8&255]+qt[n>>16&255]+qt[n>>24&255]+"-"+qt[e&255]+qt[e>>8&255]+"-"+qt[e>>16&15|64]+qt[e>>24&255]+"-"+qt[t&63|128]+qt[t>>8&255]+"-"+qt[t>>16&255]+qt[t>>24&255]+qt[i&255]+qt[i>>8&255]+qt[i>>16&255]+qt[i>>24&255]).toLowerCase()}function nt(n,e,t){return Math.max(e,Math.min(t,n))}function u_(n,e){return(n%e+e)%e}function il(n,e,t){return(1-t)*n+t*e}function _r(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function cn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const d_={DEG2RAD:ia};class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}let Mn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],u=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(d!==v||l!==u||c!==f||h!==g){let p=l*u+c*f+h*g+d*v;p<0&&(u=-u,f=-f,g=-g,v=-v,p=-p);let m=1-a;if(p<.9995){const _=Math.acos(p),E=Math.sin(_);m=Math.sin(m*_)/E,a=Math.sin(a*_)/E,l=l*m+u*a,c=c*m+f*a,h=h*m+g*a,d=d*m+v*a}else{l=l*m+u*a,c=c*m+f*a,h=h*m+g*a,d=d*m+v*a;const _=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=_,c*=_,h*=_,d*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-a*f,e[t+2]=c*g+h*f+a*u-l*d,e[t+3]=h*g-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),d=a(r/2),u=l(i/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:Xe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>d){const f=2*Math.sqrt(1+i-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-i-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class W{constructor(e=0,t=0,i=0){W.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),h=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+l*c+o*d-a*h,this.y=i+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return sl.copy(this).projectOnVector(e),this.sub(sl)}reflect(e){return this.sub(sl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const sl=new W,bu=new Mn;class Je{constructor(e,t,i,s,r,o,a,l,c){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],v=s[0],p=s[3],m=s[6],_=s[1],E=s[4],S=s[7],A=s[2],C=s[5],P=s[8];return r[0]=o*v+a*_+l*A,r[3]=o*p+a*E+l*C,r[6]=o*m+a*S+l*P,r[1]=c*v+h*_+d*A,r[4]=c*p+h*E+d*C,r[7]=c*m+h*S+d*P,r[2]=u*v+f*_+g*A,r[5]=u*p+f*E+g*C,r[8]=u*m+f*S+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=t*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*c-h*i)*v,e[2]=(a*i-s*o)*v,e[3]=u*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(rl.makeScale(e,t)),this}rotate(e){return this.premultiply(rl.makeRotation(-e)),this}translate(e,t){return this.premultiply(rl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const rl=new Je,wu=new Je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Tu=new Je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function f_(){const n={enabled:!0,workingColorSpace:dr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===dt&&(s.r=Pi(s.r),s.g=Pi(s.g),s.b=Pi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===dt&&(s.r=or(s.r),s.g=or(s.g),s.b=or(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===$i?ma:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return _a("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return _a("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[dr]:{primaries:e,whitePoint:i,transfer:ma,toXYZ:wu,fromXYZ:Tu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:e,whitePoint:i,transfer:dt,toXYZ:wu,fromXYZ:Tu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}}),n}const st=f_();function Pi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function or(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ds;class p_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ds===void 0&&(Ds=ga("canvas")),Ds.width=e.width,Ds.height=e.height;const s=Ds.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ds}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ga("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Pi(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Pi(t[i]/255)*255):t[i]=Pi(t[i]);return{data:t,width:e.width,height:e.height}}else return Xe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let m_=0;class gh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:m_++}),this.uuid=io(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ol(s[o].image)):r.push(ol(s[o]))}else r=ol(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ol(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?p_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Xe("Texture: Unable to serialize Texture."),{})}let g_=0;const al=new W;class Qt extends ws{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,i=Ci,s=Ci,r=Jt,o=vs,a=Hn,l=Sn,c=Qt.DEFAULT_ANISOTROPY,h=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:g_++}),this.uuid=io(),this.name="",this.source=new gh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(al).x}get height(){return this.source.getSize(al).y}get depth(){return this.source.getSize(al).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Xe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Xe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case oc:e.x=e.x-Math.floor(e.x);break;case Ci:e.x=e.x<0?0:1;break;case ac:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case oc:e.y=e.y-Math.floor(e.y);break;case Ci:e.y=e.y<0?0:1;break;case ac:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=cp;Qt.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,i=0,s=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],p=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,S=(f+1)/2,A=(m+1)/2,C=(h+u)/4,P=(d+v)/4,y=(g+p)/4;return E>S&&E>A?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=C/i,r=P/i):S>A?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=C/s,r=y/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=P/r,s=y/r),this.set(i,s,r,t),this}let _=Math.sqrt((p-g)*(p-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(p-g)/_,this.y=(d-v)/_,this.z=(u-h)/_,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class __ extends ws{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new Qt(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new gh(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class si extends __{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class vp extends Qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class v_ extends Qt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vt{constructor(e,t,i,s,r,o,a,l,c,h,d,u,f,g,v,p){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,h,d,u,f,g,v,p)}set(e,t,i,s,r,o,a,l,c,h,d,u,f,g,v,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=g,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Is.setFromMatrixColumn(e,0).length(),r=1/Is.setFromMatrixColumn(e,1).length(),o=1/Is.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=o*h,f=o*d,g=a*h,v=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-v*c,t[9]=-a*l,t[2]=v-u*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u+v*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=v+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u-v*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=v-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*h,f=o*d,g=a*h,v=a*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=v-u*d,t[8]=g*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-v*d}else if(e.order==="XZY"){const u=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=o*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(x_,e,y_)}lookAt(e,t,i){const s=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),zi.crossVectors(i,gn),zi.lengthSq()===0&&(Math.abs(i.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),zi.crossVectors(i,gn)),zi.normalize(),mo.crossVectors(gn,zi),s[0]=zi.x,s[4]=mo.x,s[8]=gn.x,s[1]=zi.y,s[5]=mo.y,s[9]=gn.y,s[2]=zi.z,s[6]=mo.z,s[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],v=i[6],p=i[10],m=i[14],_=i[3],E=i[7],S=i[11],A=i[15],C=s[0],P=s[4],y=s[8],T=s[12],G=s[1],D=s[5],H=s[9],L=s[13],B=s[2],F=s[6],I=s[10],z=s[14],q=s[3],Q=s[7],me=s[11],_e=s[15];return r[0]=o*C+a*G+l*B+c*q,r[4]=o*P+a*D+l*F+c*Q,r[8]=o*y+a*H+l*I+c*me,r[12]=o*T+a*L+l*z+c*_e,r[1]=h*C+d*G+u*B+f*q,r[5]=h*P+d*D+u*F+f*Q,r[9]=h*y+d*H+u*I+f*me,r[13]=h*T+d*L+u*z+f*_e,r[2]=g*C+v*G+p*B+m*q,r[6]=g*P+v*D+p*F+m*Q,r[10]=g*y+v*H+p*I+m*me,r[14]=g*T+v*L+p*z+m*_e,r[3]=_*C+E*G+S*B+A*q,r[7]=_*P+E*D+S*F+A*Q,r[11]=_*y+E*H+S*I+A*me,r[15]=_*T+E*L+S*z+A*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],v=e[7],p=e[11],m=e[15],_=l*f-c*u,E=a*f-c*d,S=a*u-l*d,A=o*f-c*h,C=o*u-l*h,P=o*d-a*h;return t*(v*_-p*E+m*S)-i*(g*_-p*A+m*C)+s*(g*E-v*A+m*P)-r*(g*S-v*C+p*P)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],v=e[13],p=e[14],m=e[15],_=t*a-i*o,E=t*l-s*o,S=t*c-r*o,A=i*l-s*a,C=i*c-r*a,P=s*c-r*l,y=h*v-d*g,T=h*p-u*g,G=h*m-f*g,D=d*p-u*v,H=d*m-f*v,L=u*m-f*p,B=_*L-E*H+S*D+A*G-C*T+P*y;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const F=1/B;return e[0]=(a*L-l*H+c*D)*F,e[1]=(s*H-i*L-r*D)*F,e[2]=(v*P-p*C+m*A)*F,e[3]=(u*C-d*P-f*A)*F,e[4]=(l*G-o*L-c*T)*F,e[5]=(t*L-s*G+r*T)*F,e[6]=(p*S-g*P-m*E)*F,e[7]=(h*P-u*S+f*E)*F,e[8]=(o*H-a*G+c*y)*F,e[9]=(i*G-t*H-r*y)*F,e[10]=(g*C-v*S+m*_)*F,e[11]=(d*S-h*C-f*_)*F,e[12]=(a*T-o*D-l*y)*F,e[13]=(t*D-i*T+s*y)*F,e[14]=(v*E-g*A-p*_)*F,e[15]=(h*A-d*E+u*_)*F,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,v=o*h,p=o*d,m=a*d,_=l*c,E=l*h,S=l*d,A=i.x,C=i.y,P=i.z;return s[0]=(1-(v+m))*A,s[1]=(f+S)*A,s[2]=(g-E)*A,s[3]=0,s[4]=(f-S)*C,s[5]=(1-(u+m))*C,s[6]=(p+_)*C,s[7]=0,s[8]=(g+E)*P,s[9]=(p-_)*P,s[10]=(1-(u+v))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),t.identity(),this;let o=Is.set(s[0],s[1],s[2]).length();const a=Is.set(s[4],s[5],s[6]).length(),l=Is.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Nn.copy(this);const c=1/o,h=1/a,d=1/l;return Nn.elements[0]*=c,Nn.elements[1]*=c,Nn.elements[2]*=c,Nn.elements[4]*=h,Nn.elements[5]*=h,Nn.elements[6]*=h,Nn.elements[8]*=d,Nn.elements[9]*=d,Nn.elements[10]*=d,t.setFromRotationMatrix(Nn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,s,r,o,a=ti,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(i-s),u=(t+e)/(t-e),f=(i+s)/(i-s);let g,v;if(l)g=r/(o-r),v=o*r/(o-r);else if(a===ti)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===Zr)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=ti,l=!1){const c=this.elements,h=2/(t-e),d=2/(i-s),u=-(t+e)/(t-e),f=-(i+s)/(i-s);let g,v;if(l)g=1/(o-r),v=o/(o-r);else if(a===ti)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===Zr)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Is=new W,Nn=new vt,x_=new W(0,0,0),y_=new W(1,1,1),zi=new W,mo=new W,gn=new W,Au=new vt,Cu=new Mn;class li{constructor(e=0,t=0,i=0,s=li.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Xe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Au.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Au,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cu.setFromEuler(this),this.setFromQuaternion(Cu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}li.DEFAULT_ORDER="XYZ";class _h{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let S_=0;const Ru=new W,Ls=new Mn,fi=new vt,go=new W,vr=new W,M_=new W,E_=new Mn,Pu=new W(1,0,0),Du=new W(0,1,0),Iu=new W(0,0,1),Lu={type:"added"},b_={type:"removed"},Ns={type:"childadded",child:null},ll={type:"childremoved",child:null};class Wt extends ws{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:S_++}),this.uuid=io(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Wt.DEFAULT_UP.clone();const e=new W,t=new li,i=new Mn,s=new W(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new vt},normalMatrix:{value:new Je}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=Wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _h,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ls.setFromAxisAngle(e,t),this.quaternion.multiply(Ls),this}rotateOnWorldAxis(e,t){return Ls.setFromAxisAngle(e,t),this.quaternion.premultiply(Ls),this}rotateX(e){return this.rotateOnAxis(Pu,e)}rotateY(e){return this.rotateOnAxis(Du,e)}rotateZ(e){return this.rotateOnAxis(Iu,e)}translateOnAxis(e,t){return Ru.copy(e).applyQuaternion(this.quaternion),this.position.add(Ru.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Pu,e)}translateY(e){return this.translateOnAxis(Du,e)}translateZ(e){return this.translateOnAxis(Iu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(fi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?go.copy(e):go.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fi.lookAt(vr,go,this.up):fi.lookAt(go,vr,this.up),this.quaternion.setFromRotationMatrix(fi),s&&(fi.extractRotation(s.matrixWorld),Ls.setFromRotationMatrix(fi),this.quaternion.premultiply(Ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lu),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(b_),ll.child=e,this.dispatchEvent(ll),ll.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lu),Ns.child=e,this.dispatchEvent(Ns),Ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,e,M_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,E_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Wt.DEFAULT_UP=new W(0,1,0);Wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ki extends Wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const w_={type:"move"};class cl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,i),m=this._getHandJoint(c,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(w_)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ki;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const xp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},_o={h:0,s:0,l:0};function hl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ot{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=st.workingColorSpace){if(e=u_(e,1),t=nt(t,0,1),i=nt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=hl(o,r,e+1/3),this.g=hl(o,r,e),this.b=hl(o,r,e-1/3)}return st.colorSpaceToWorking(this,s),this}setStyle(e,t=sn){function i(r){r!==void 0&&parseFloat(r)<1&&Xe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Xe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Xe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=sn){const i=xp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Xe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=or(e.r),this.g=or(e.g),this.b=or(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=sn){return st.workingToColorSpace(Yt.copy(this),e),Math.round(nt(Yt.r*255,0,255))*65536+Math.round(nt(Yt.g*255,0,255))*256+Math.round(nt(Yt.b*255,0,255))}getHexString(e=sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(Yt.copy(this),t);const i=Yt.r,s=Yt.g,r=Yt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(Yt.copy(this),t),e.r=Yt.r,e.g=Yt.g,e.b=Yt.b,e}getStyle(e=sn){st.workingToColorSpace(Yt.copy(this),e);const t=Yt.r,i=Yt.g,s=Yt.b;return e!==sn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+t,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Hi),e.getHSL(_o);const i=il(Hi.h,_o.h,t),s=il(Hi.s,_o.s,t),r=il(Hi.l,_o.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Yt=new ot;ot.NAMES=xp;class T_ extends Wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new li,this.environmentIntensity=1,this.environmentRotation=new li,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Fn=new W,pi=new W,ul=new W,mi=new W,Fs=new W,Us=new W,Nu=new W,dl=new W,fl=new W,pl=new W,ml=new Tt,gl=new Tt,_l=new Tt;class Bn{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Fn.subVectors(e,t),s.cross(Fn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Fn.subVectors(s,t),pi.subVectors(i,t),ul.subVectors(e,t);const o=Fn.dot(Fn),a=Fn.dot(pi),l=Fn.dot(ul),c=pi.dot(pi),h=pi.dot(ul),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,mi.x),l.addScaledVector(o,mi.y),l.addScaledVector(a,mi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return ml.setScalar(0),gl.setScalar(0),_l.setScalar(0),ml.fromBufferAttribute(e,t),gl.fromBufferAttribute(e,i),_l.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ml,r.x),o.addScaledVector(gl,r.y),o.addScaledVector(_l,r.z),o}static isFrontFacing(e,t,i,s){return Fn.subVectors(i,t),pi.subVectors(e,t),Fn.cross(pi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fn.subVectors(this.c,this.b),pi.subVectors(this.a,this.b),Fn.cross(pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Bn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;Fs.subVectors(s,i),Us.subVectors(r,i),dl.subVectors(e,i);const l=Fs.dot(dl),c=Us.dot(dl);if(l<=0&&c<=0)return t.copy(i);fl.subVectors(e,s);const h=Fs.dot(fl),d=Us.dot(fl);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(Fs,o);pl.subVectors(e,r);const f=Fs.dot(pl),g=Us.dot(pl);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Us,a);const p=h*g-f*d;if(p<=0&&d-h>=0&&f-g>=0)return Nu.subVectors(r,s),a=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(Nu,a);const m=1/(p+v+u);return o=v*m,a=u*m,t.copy(i).addScaledVector(Fs,o).addScaledVector(Us,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ts{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Un):Un.fromBufferAttribute(r,o),Un.applyMatrix4(e.matrixWorld),this.expandByPoint(Un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vo.copy(i.boundingBox)),vo.applyMatrix4(e.matrixWorld),this.union(vo)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Un),Un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xr),xo.subVectors(this.max,xr),Os.subVectors(e.a,xr),Bs.subVectors(e.b,xr),zs.subVectors(e.c,xr),Vi.subVectors(Bs,Os),Gi.subVectors(zs,Bs),rs.subVectors(Os,zs);let t=[0,-Vi.z,Vi.y,0,-Gi.z,Gi.y,0,-rs.z,rs.y,Vi.z,0,-Vi.x,Gi.z,0,-Gi.x,rs.z,0,-rs.x,-Vi.y,Vi.x,0,-Gi.y,Gi.x,0,-rs.y,rs.x,0];return!vl(t,Os,Bs,zs,xo)||(t=[1,0,0,0,1,0,0,0,1],!vl(t,Os,Bs,zs,xo))?!1:(yo.crossVectors(Vi,Gi),t=[yo.x,yo.y,yo.z],vl(t,Os,Bs,zs,xo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const gi=[new W,new W,new W,new W,new W,new W,new W,new W],Un=new W,vo=new Ts,Os=new W,Bs=new W,zs=new W,Vi=new W,Gi=new W,rs=new W,xr=new W,xo=new W,yo=new W,os=new W;function vl(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){os.fromArray(n,r);const a=s.x*Math.abs(os.x)+s.y*Math.abs(os.y)+s.z*Math.abs(os.z),l=e.dot(os),c=t.dot(os),h=i.dot(os);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Ct=new W,So=new qe;let A_=0;class Wn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:A_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=yu,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)So.fromBufferAttribute(this,t),So.applyMatrix3(e),this.setXY(t,So.x,So.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=_r(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=cn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_r(t,this.array)),t}setX(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_r(t,this.array)),t}setY(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_r(t,this.array)),t}setZ(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_r(t,this.array)),t}setW(e,t){return this.normalized&&(t=cn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array),s=cn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=cn(t,this.array),i=cn(i,this.array),s=cn(s,this.array),r=cn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==yu&&(e.usage=this.usage),e}}class yp extends Wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Sp extends Wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Ht extends Wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const C_=new Ts,yr=new W,xl=new W;class so{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):C_.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yr.subVectors(e,this.center);const t=yr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(yr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yr.copy(e.center).add(xl)),this.expandByPoint(yr.copy(e.center).sub(xl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let R_=0;const Tn=new vt,yl=new Wt,Hs=new W,_n=new Ts,Sr=new Ts,zt=new W;class In extends ws{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:R_++}),this.uuid=io(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(a_(e)?Sp:yp)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Je().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,i){return Tn.makeTranslation(e,t,i),this.applyMatrix4(Tn),this}scale(e,t,i){return Tn.makeScale(e,t,i),this.applyMatrix4(Tn),this}lookAt(e){return yl.lookAt(e),yl.updateMatrix(),this.applyMatrix4(yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ht(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Xe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ts);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new so);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Sr.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(_n.min,Sr.min),_n.expandByPoint(zt),zt.addVectors(_n.max,Sr.max),_n.expandByPoint(zt)):(_n.expandByPoint(Sr.min),_n.expandByPoint(Sr.max))}_n.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(zt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)zt.fromBufferAttribute(a,c),l&&(Hs.fromBufferAttribute(e,c),zt.add(Hs)),s=Math.max(s,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let y=0;y<i.count;y++)a[y]=new W,l[y]=new W;const c=new W,h=new W,d=new W,u=new qe,f=new qe,g=new qe,v=new W,p=new W;function m(y,T,G){c.fromBufferAttribute(i,y),h.fromBufferAttribute(i,T),d.fromBufferAttribute(i,G),u.fromBufferAttribute(r,y),f.fromBufferAttribute(r,T),g.fromBufferAttribute(r,G),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(D),p.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),a[y].add(v),a[T].add(v),a[G].add(v),l[y].add(p),l[T].add(p),l[G].add(p))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let y=0,T=_.length;y<T;++y){const G=_[y],D=G.start,H=G.count;for(let L=D,B=D+H;L<B;L+=3)m(e.getX(L+0),e.getX(L+1),e.getX(L+2))}const E=new W,S=new W,A=new W,C=new W;function P(y){A.fromBufferAttribute(s,y),C.copy(A);const T=a[y];E.copy(T),E.sub(A.multiplyScalar(A.dot(T))).normalize(),S.crossVectors(C,T);const D=S.dot(l[y])<0?-1:1;o.setXYZW(y,E.x,E.y,E.z,D)}for(let y=0,T=_.length;y<T;++y){const G=_[y],D=G.start,H=G.count;for(let L=D,B=D+H;L<B;L+=3)P(e.getX(L+0)),P(e.getX(L+1)),P(e.getX(L+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new W,r=new W,o=new W,a=new W,l=new W,c=new W,h=new W,d=new W;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),v=e.getX(u+1),p=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,p=l.length;v<p;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let m=0;m<h;m++)u[g++]=c[f++]}return new Wn(u,h,d)}if(this.index===null)return Xe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new In,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let P_=0,ro=class extends ws{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:P_++}),this.uuid=io(),this.name="",this.type="Material",this.blending=rr,this.side=es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Zl,this.blendDst=Jl,this.blendEquation=ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=xu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ps,this.stencilZFail=Ps,this.stencilZPass=Ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Xe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Xe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==rr&&(i.blending=this.blending),this.side!==es&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Zl&&(i.blendSrc=this.blendSrc),this.blendDst!==Jl&&(i.blendDst=this.blendDst),this.blendEquation!==ps&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==cr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==xu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ps&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ps&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ps&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};const _i=new W,Sl=new W,Mo=new W,ki=new W,Ml=new W,Eo=new W,El=new W;let vh=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Sl.copy(e).add(t).multiplyScalar(.5),Mo.copy(t).sub(e).normalize(),ki.copy(this.origin).sub(Sl);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Mo),a=ki.dot(this.direction),l=-ki.dot(Mo),c=ki.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Sl).addScaledVector(Mo,u),f}intersectSphere(e,t){_i.subVectors(e.center,this.origin);const i=_i.dot(this.direction),s=_i.dot(_i)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,i,s,r){Ml.subVectors(t,e),Eo.subVectors(i,e),El.crossVectors(Ml,Eo);let o=this.direction.dot(El),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ki.subVectors(this.origin,e);const l=a*this.direction.dot(Eo.crossVectors(ki,Eo));if(l<0)return null;const c=a*this.direction.dot(Ml.cross(ki));if(c<0||l+c>o)return null;const h=-a*ki.dot(El);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class $s extends ro{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.combine=np,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Fu=new vt,as=new vh,bo=new so,Uu=new W,wo=new W,To=new W,Ao=new W,bl=new W,Co=new W,Ou=new W,Ro=new W;class Zt extends Wt{constructor(e=new In,t=new $s){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Co.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(bl.fromBufferAttribute(d,e),o?Co.addScaledVector(bl,h):Co.addScaledVector(bl.sub(t),h))}t.add(Co)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),bo.copy(i.boundingSphere),bo.applyMatrix4(r),as.copy(e.ray).recast(e.near),!(bo.containsPoint(as.origin)===!1&&(as.intersectSphere(bo,Uu)===null||as.origin.distanceToSquared(Uu)>(e.far-e.near)**2))&&(Fu.copy(r).invert(),as.copy(e.ray).applyMatrix4(Fu),!(i.boundingBox!==null&&as.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,as)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=o[p.materialIndex],_=Math.max(p.start,f.start),E=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let S=_,A=E;S<A;S+=3){const C=a.getX(S),P=a.getX(S+1),y=a.getX(S+2);s=Po(this,m,e,i,c,h,d,C,P,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const _=a.getX(p),E=a.getX(p+1),S=a.getX(p+2);s=Po(this,o,e,i,c,h,d,_,E,S),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const p=u[g],m=o[p.materialIndex],_=Math.max(p.start,f.start),E=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let S=_,A=E;S<A;S+=3){const C=S,P=S+1,y=S+2;s=Po(this,m,e,i,c,h,d,C,P,y),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=g,m=v;p<m;p+=3){const _=p,E=p+1,S=p+2;s=Po(this,o,e,i,c,h,d,_,E,S),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function D_(n,e,t,i,s,r,o,a){let l;if(e.side===ln?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===es,a),l===null)return null;Ro.copy(a),Ro.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Ro);return c<t.near||c>t.far?null:{distance:c,point:Ro.clone(),object:n}}function Po(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,wo),n.getVertexPosition(l,To),n.getVertexPosition(c,Ao);const h=D_(n,e,t,i,wo,To,Ao,Ou);if(h){const d=new W;Bn.getBarycoord(Ou,wo,To,Ao,d),s&&(h.uv=Bn.getInterpolatedAttribute(s,a,l,c,d,new qe)),r&&(h.uv1=Bn.getInterpolatedAttribute(r,a,l,c,d,new qe)),o&&(h.normal=Bn.getInterpolatedAttribute(o,a,l,c,d,new W),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new W,materialIndex:0};Bn.getNormal(wo,To,Ao,u.normal),h.face=u,h.barycoord=d}return h}class xh extends Qt{constructor(e=null,t=1,i=1,s,r,o,a,l,c=Ft,h=Ft,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bu extends Wn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Vs=new vt,zu=new vt,Do=[],Hu=new Ts,I_=new vt,Mr=new Zt,Er=new so;class Vu extends Zt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bu(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,I_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ts),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Vs),Hu.copy(e.boundingBox).applyMatrix4(Vs),this.boundingBox.union(Hu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new so),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Vs),Er.copy(e.boundingSphere).applyMatrix4(Vs),this.boundingSphere.union(Er)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Mr.geometry=this.geometry,Mr.material=this.material,Mr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Er.copy(this.boundingSphere),Er.applyMatrix4(i),e.ray.intersectsSphere(Er)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Vs),zu.multiplyMatrices(i,Vs),Mr.matrixWorld=zu,Mr.raycast(e,Do);for(let o=0,a=Do.length;o<a;o++){const l=Do[o];l.instanceId=r,l.object=this,t.push(l)}Do.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Bu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new xh(new Float32Array(s*this.count),s,this.count,Fa,zn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const wl=new W,L_=new W,N_=new Je;let ji=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=wl.subVectors(i,t).cross(L_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(wl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||N_.getNormalMatrix(e),s=this.coplanarPoint(wl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};const ls=new so,F_=new qe(.5,.5),Io=new W;class yh{constructor(e=new ji,t=new ji,i=new ji,s=new ji,r=new ji,o=new ji){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ti,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],v=r[9],p=r[10],m=r[11],_=r[12],E=r[13],S=r[14],A=r[15];if(s[0].setComponents(c-o,f-h,m-g,A-_).normalize(),s[1].setComponents(c+o,f+h,m+g,A+_).normalize(),s[2].setComponents(c+a,f+d,m+v,A+E).normalize(),s[3].setComponents(c-a,f-d,m-v,A-E).normalize(),i)s[4].setComponents(l,u,p,S).normalize(),s[5].setComponents(c-l,f-u,m-p,A-S).normalize();else if(s[4].setComponents(c-l,f-u,m-p,A-S).normalize(),t===ti)s[5].setComponents(c+l,f+u,m+p,A+S).normalize();else if(t===Zr)s[5].setComponents(l,u,p,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ls.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ls.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ls)}intersectsSprite(e){ls.center.set(0,0,0);const t=F_.distanceTo(e.center);return ls.radius=.7071067811865476+t,ls.applyMatrix4(e.matrixWorld),this.intersectsSphere(ls)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Io.x=s.normal.x>0?e.max.x:e.min.x,Io.y=s.normal.y>0?e.max.y:e.min.y,Io.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Io)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mp extends Qt{constructor(e=[],t=Es,i,s,r,o,a,l,c,h){super(e,t,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Lo extends Qt{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Jr extends Qt{constructor(e,t,i=ai,s,r,o,a=Ft,l=Ft,c,h=Fi,d=1){if(h!==Fi&&h!==xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new gh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class U_ extends Jr{constructor(e,t=ai,i=Es,s,r,o=Ft,a=Ft,l,c=Fi){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ep extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class jt extends In{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Ht(c,3)),this.setAttribute("normal",new Ht(h,3)),this.setAttribute("uv",new Ht(d,2));function g(v,p,m,_,E,S,A,C,P,y,T){const G=S/P,D=A/y,H=S/2,L=A/2,B=C/2,F=P+1,I=y+1;let z=0,q=0;const Q=new W;for(let me=0;me<I;me++){const _e=me*D-L;for(let ie=0;ie<F;ie++){const Ge=ie*G-H;Q[v]=Ge*_,Q[p]=_e*E,Q[m]=B,c.push(Q.x,Q.y,Q.z),Q[v]=0,Q[p]=0,Q[m]=C>0?1:-1,h.push(Q.x,Q.y,Q.z),d.push(ie/P),d.push(1-me/y),z+=1}}for(let me=0;me<y;me++)for(let _e=0;_e<P;_e++){const ie=u+_e+F*me,Ge=u+_e+F*(me+1),at=u+(_e+1)+F*(me+1),lt=u+(_e+1)+F*me;l.push(ie,Ge,lt),l.push(Ge,at,lt),q+=6}a.addGroup(f,q,T),f+=q,u+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Sh extends In{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],c=new W,h=new qe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=i+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Ht(o,3)),this.setAttribute("normal",new Ht(a,3)),this.setAttribute("uv",new Ht(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sh(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class bi extends In{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const v=[],p=i/2;let m=0;_(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Ht(d,3)),this.setAttribute("normal",new Ht(u,3)),this.setAttribute("uv",new Ht(f,2));function _(){const S=new W,A=new W;let C=0;const P=(t-e)/i;for(let y=0;y<=r;y++){const T=[],G=y/r,D=G*(t-e)+e;for(let H=0;H<=s;H++){const L=H/s,B=L*l+a,F=Math.sin(B),I=Math.cos(B);A.x=D*F,A.y=-G*i+p,A.z=D*I,d.push(A.x,A.y,A.z),S.set(F,P,I).normalize(),u.push(S.x,S.y,S.z),f.push(L,1-G),T.push(g++)}v.push(T)}for(let y=0;y<s;y++)for(let T=0;T<r;T++){const G=v[T][y],D=v[T+1][y],H=v[T+1][y+1],L=v[T][y+1];(e>0||T!==0)&&(h.push(G,D,L),C+=3),(t>0||T!==r-1)&&(h.push(D,H,L),C+=3)}c.addGroup(m,C,0),m+=C}function E(S){const A=g,C=new qe,P=new W;let y=0;const T=S===!0?e:t,G=S===!0?1:-1;for(let H=1;H<=s;H++)d.push(0,p*G,0),u.push(0,G,0),f.push(.5,.5),g++;const D=g;for(let H=0;H<=s;H++){const B=H/s*l+a,F=Math.cos(B),I=Math.sin(B);P.x=T*I,P.y=p*G,P.z=T*F,d.push(P.x,P.y,P.z),u.push(0,G,0),C.x=F*.5+.5,C.y=I*.5*G+.5,f.push(C.x,C.y),g++}for(let H=0;H<s;H++){const L=A+H,B=D+H;S===!0?h.push(B,B+1,L):h.push(B+1,B,L),y+=3}c.addGroup(m,y,S===!0?1:2),m+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ua extends In{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,d=e/a,u=t/l,f=[],g=[],v=[],p=[];for(let m=0;m<h;m++){const _=m*u-o;for(let E=0;E<c;E++){const S=E*d-r;g.push(S,-_,0),v.push(0,0,1),p.push(E/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<a;_++){const E=_+c*m,S=_+c*(m+1),A=_+1+c*(m+1),C=_+1+c*m;f.push(E,S,C),f.push(S,A,C)}this.setIndex(f),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(v,3)),this.setAttribute("uv",new Ht(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ua(e.width,e.height,e.widthSegments,e.heightSegments)}}class ms extends In{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new W,u=new W,f=[],g=[],v=[],p=[];for(let m=0;m<=i;m++){const _=[],E=m/i;let S=0;m===0&&o===0?S=.5/t:m===i&&l===Math.PI&&(S=-.5/t);for(let A=0;A<=t;A++){const C=A/t;d.x=-e*Math.cos(s+C*r)*Math.sin(o+E*a),d.y=e*Math.cos(o+E*a),d.z=e*Math.sin(s+C*r)*Math.sin(o+E*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),p.push(C+S,1-E),_.push(c++)}h.push(_)}for(let m=0;m<i;m++)for(let _=0;_<t;_++){const E=h[m][_+1],S=h[m][_],A=h[m+1][_],C=h[m+1][_+1];(m!==0||o>0)&&f.push(E,S,C),(m!==i-1||l<Math.PI)&&f.push(S,A,C)}this.setIndex(f),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(v,3)),this.setAttribute("uv",new Ht(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ms(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function fr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Xe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function nn(n){const e={};for(let t=0;t<n.length;t++){const i=fr(n[t]);for(const s in i)e[s]=i[s]}return e}function O_(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function bp(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const B_={clone:fr,merge:nn};var z_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,H_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ci extends ro{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=z_,this.fragmentShader=H_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fr(e.uniforms),this.uniformsGroups=O_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class V_ extends ci{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Gu extends ro{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gp,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new li,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class G_ extends ro{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Q0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class k_ extends ro{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Oa extends Wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class W_ extends Oa{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ot(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Tl=new vt,ku=new W,Wu=new W;class wp{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qe(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new yh,this._frameExtents=new qe(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ku.setFromMatrixPosition(e.matrixWorld),t.position.copy(ku),Wu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wu),t.updateMatrixWorld(),Tl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Zr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Tl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const No=new W,Fo=new Mn,Yn=new W;class Tp extends Wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(No,Fo,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(No,Fo,Yn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(No,Fo,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(No,Fo,Yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Wi=new W,Xu=new qe,qu=new qe;class yn extends Tp{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ia*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hc*2*Math.atan(Math.tan(ia*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Wi.x,Wi.y).multiplyScalar(-e/Wi.z)}getViewSize(e,t){return this.getViewBounds(e,Xu,qu),t.subVectors(qu,Xu)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ia*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class X_ extends wp{constructor(){super(new yn(90,1,.5,500)),this.isPointLightShadow=!0}}class q_ extends Oa{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new X_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Mh extends Tp{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Y_ extends wp{constructor(){super(new Mh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yu extends Oa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Wt.DEFAULT_UP),this.updateMatrix(),this.target=new Wt,this.shadow=new Y_}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class j_ extends Oa{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Gs=-90,ks=1;class $_ extends Wt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new yn(Gs,ks,e,t);s.layers=this.layers,this.add(s);const r=new yn(Gs,ks,e,t);r.layers=this.layers,this.add(r);const o=new yn(Gs,ks,e,t);o.layers=this.layers,this.add(o);const a=new yn(Gs,ks,e,t);a.layers=this.layers,this.add(a);const l=new yn(Gs,ks,e,t);l.layers=this.layers,this.add(l);const c=new yn(Gs,ks,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===ti)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Zr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class K_ extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ju=new vt;class Z_{constructor(e,t,i=0,s=1/0){this.ray=new vh(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new _h,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):it("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ju.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ju),this}intersectObject(e,t=!0,i=[]){return Vc(e,this,i,t),i.sort($u),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Vc(e[s],this,i,t);return i.sort($u),i}}function $u(n,e){return n.distance-e.distance}function Vc(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Vc(r[o],e,t,!0)}}class Ku{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=nt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(nt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class J_ extends ws{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Xe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Zu(n,e,t,i){const s=Q_(i);switch(t){case pp:return n*e;case Fa:return n*e/s.components*s.byteLength;case uh:return n*e/s.components*s.byteLength;case ur:return n*e*2/s.components*s.byteLength;case dh:return n*e*2/s.components*s.byteLength;case mp:return n*e*3/s.components*s.byteLength;case Hn:return n*e*4/s.components*s.byteLength;case fh:return n*e*4/s.components*s.byteLength;case Qo:case ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ta:case na:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case cc:case uc:return Math.max(n,16)*Math.max(e,8)/4;case lc:case hc:return Math.max(n,8)*Math.max(e,8)/2;case dc:case fc:case mc:case gc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case pc:case _c:case vc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Sc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Mc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case bc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case wc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Tc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ac:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Cc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Rc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Pc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Dc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ic:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Lc:case Nc:case Fc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Uc:case Oc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Bc:case zc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Q_(n){switch(n){case Sn:case hp:return{byteLength:1,components:1};case $r:case up:case Ni:return{byteLength:2,components:1};case ch:case hh:return{byteLength:2,components:4};case ai:case lh:case zn:return{byteLength:4,components:1};case dp:case fp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:oh}}));typeof window<"u"&&(window.__THREE__?Xe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=oh);function Ap(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function ev(n){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const h=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var tv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,iv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ov=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,av=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,hv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,uv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_v=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Sv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ev=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,bv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Av=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Iv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Nv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Fv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Uv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ov=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Bv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,kv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Xv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,qv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Yv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$v=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Zv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ex=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ix=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ox=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ax=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ux=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,px=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_x=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ex=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,bx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ax=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Px=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ix=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ux=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ox=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Gx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$x=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Kx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ey=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ty=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ny=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ry=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ay=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ly=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,hy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,py=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,my=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_y=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Sy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,My=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ey=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,by=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,wy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ty=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ay=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cy=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ry=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Py=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Iy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ly=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:tv,alphahash_pars_fragment:nv,alphamap_fragment:iv,alphamap_pars_fragment:sv,alphatest_fragment:rv,alphatest_pars_fragment:ov,aomap_fragment:av,aomap_pars_fragment:lv,batching_pars_vertex:cv,batching_vertex:hv,begin_vertex:uv,beginnormal_vertex:dv,bsdfs:fv,iridescence_fragment:pv,bumpmap_pars_fragment:mv,clipping_planes_fragment:gv,clipping_planes_pars_fragment:_v,clipping_planes_pars_vertex:vv,clipping_planes_vertex:xv,color_fragment:yv,color_pars_fragment:Sv,color_pars_vertex:Mv,color_vertex:Ev,common:bv,cube_uv_reflection_fragment:wv,defaultnormal_vertex:Tv,displacementmap_pars_vertex:Av,displacementmap_vertex:Cv,emissivemap_fragment:Rv,emissivemap_pars_fragment:Pv,colorspace_fragment:Dv,colorspace_pars_fragment:Iv,envmap_fragment:Lv,envmap_common_pars_fragment:Nv,envmap_pars_fragment:Fv,envmap_pars_vertex:Uv,envmap_physical_pars_fragment:Yv,envmap_vertex:Ov,fog_vertex:Bv,fog_pars_vertex:zv,fog_fragment:Hv,fog_pars_fragment:Vv,gradientmap_pars_fragment:Gv,lightmap_pars_fragment:kv,lights_lambert_fragment:Wv,lights_lambert_pars_fragment:Xv,lights_pars_begin:qv,lights_toon_fragment:jv,lights_toon_pars_fragment:$v,lights_phong_fragment:Kv,lights_phong_pars_fragment:Zv,lights_physical_fragment:Jv,lights_physical_pars_fragment:Qv,lights_fragment_begin:ex,lights_fragment_maps:tx,lights_fragment_end:nx,logdepthbuf_fragment:ix,logdepthbuf_pars_fragment:sx,logdepthbuf_pars_vertex:rx,logdepthbuf_vertex:ox,map_fragment:ax,map_pars_fragment:lx,map_particle_fragment:cx,map_particle_pars_fragment:hx,metalnessmap_fragment:ux,metalnessmap_pars_fragment:dx,morphinstance_vertex:fx,morphcolor_vertex:px,morphnormal_vertex:mx,morphtarget_pars_vertex:gx,morphtarget_vertex:_x,normal_fragment_begin:vx,normal_fragment_maps:xx,normal_pars_fragment:yx,normal_pars_vertex:Sx,normal_vertex:Mx,normalmap_pars_fragment:Ex,clearcoat_normal_fragment_begin:bx,clearcoat_normal_fragment_maps:wx,clearcoat_pars_fragment:Tx,iridescence_pars_fragment:Ax,opaque_fragment:Cx,packing:Rx,premultiplied_alpha_fragment:Px,project_vertex:Dx,dithering_fragment:Ix,dithering_pars_fragment:Lx,roughnessmap_fragment:Nx,roughnessmap_pars_fragment:Fx,shadowmap_pars_fragment:Ux,shadowmap_pars_vertex:Ox,shadowmap_vertex:Bx,shadowmask_pars_fragment:zx,skinbase_vertex:Hx,skinning_pars_vertex:Vx,skinning_vertex:Gx,skinnormal_vertex:kx,specularmap_fragment:Wx,specularmap_pars_fragment:Xx,tonemapping_fragment:qx,tonemapping_pars_fragment:Yx,transmission_fragment:jx,transmission_pars_fragment:$x,uv_pars_fragment:Kx,uv_pars_vertex:Zx,uv_vertex:Jx,worldpos_vertex:Qx,background_vert:ey,background_frag:ty,backgroundCube_vert:ny,backgroundCube_frag:iy,cube_vert:sy,cube_frag:ry,depth_vert:oy,depth_frag:ay,distance_vert:ly,distance_frag:cy,equirect_vert:hy,equirect_frag:uy,linedashed_vert:dy,linedashed_frag:fy,meshbasic_vert:py,meshbasic_frag:my,meshlambert_vert:gy,meshlambert_frag:_y,meshmatcap_vert:vy,meshmatcap_frag:xy,meshnormal_vert:yy,meshnormal_frag:Sy,meshphong_vert:My,meshphong_frag:Ey,meshphysical_vert:by,meshphysical_frag:wy,meshtoon_vert:Ty,meshtoon_frag:Ay,points_vert:Cy,points_frag:Ry,shadow_vert:Py,shadow_frag:Dy,sprite_vert:Iy,sprite_frag:Ly},Ee={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},ei={basic:{uniforms:nn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:nn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new ot(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:nn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:nn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:nn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new ot(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:nn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:nn([Ee.points,Ee.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:nn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:nn([Ee.common,Ee.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:nn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:nn([Ee.sprite,Ee.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:nn([Ee.common,Ee.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:nn([Ee.lights,Ee.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};ei.physical={uniforms:nn([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const Uo={r:0,b:0,g:0},cs=new li,Ny=new vt;function Fy(n,e,t,i,s,r){const o=new ot(0);let a=s===!0?0:1,l,c,h=null,d=0,u=null;function f(_){let E=_.isScene===!0?_.background:null;if(E&&E.isTexture){const S=_.backgroundBlurriness>0;E=e.get(E,S)}return E}function g(_){let E=!1;const S=f(_);S===null?p(o,a):S&&S.isColor&&(p(S,1),E=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(_,E){const S=f(E);S&&(S.isCubeTexture||S.mapping===Na)?(c===void 0&&(c=new Zt(new jt(1,1,1),new ci({name:"BackgroundCubeMaterial",uniforms:fr(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,C,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),cs.copy(E.backgroundRotation),cs.x*=-1,cs.y*=-1,cs.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(cs.y*=-1,cs.z*=-1),c.material.uniforms.envMap.value=S,c.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ny.makeRotationFromEuler(cs)),c.material.toneMapped=st.getTransfer(S.colorSpace)!==dt,(h!==S||d!==S.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=S,d=S.version,u=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Zt(new Ua(2,2),new ci({name:"BackgroundMaterial",uniforms:fr(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:es,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=st.getTransfer(S.colorSpace)!==dt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=S,d=S.version,u=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function p(_,E){_.getRGB(Uo,bp(n)),t.buffers.color.setClear(Uo.r,Uo.g,Uo.b,E,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,E=1){o.set(_),a=E,p(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,p(o,a)},render:g,addToRenderList:v,dispose:m}}function Uy(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,o=!1;function a(D,H,L,B,F){let I=!1;const z=d(D,B,L,H);r!==z&&(r=z,c(r.object)),I=f(D,B,L,F),I&&g(D,B,L,F),F!==null&&e.update(F,n.ELEMENT_ARRAY_BUFFER),(I||o)&&(o=!1,S(D,H,L,B),F!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(F).buffer))}function l(){return n.createVertexArray()}function c(D){return n.bindVertexArray(D)}function h(D){return n.deleteVertexArray(D)}function d(D,H,L,B){const F=B.wireframe===!0;let I=i[H.id];I===void 0&&(I={},i[H.id]=I);const z=D.isInstancedMesh===!0?D.id:0;let q=I[z];q===void 0&&(q={},I[z]=q);let Q=q[L.id];Q===void 0&&(Q={},q[L.id]=Q);let me=Q[F];return me===void 0&&(me=u(l()),Q[F]=me),me}function u(D){const H=[],L=[],B=[];for(let F=0;F<t;F++)H[F]=0,L[F]=0,B[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:L,attributeDivisors:B,object:D,attributes:{},index:null}}function f(D,H,L,B){const F=r.attributes,I=H.attributes;let z=0;const q=L.getAttributes();for(const Q in q)if(q[Q].location>=0){const _e=F[Q];let ie=I[Q];if(ie===void 0&&(Q==="instanceMatrix"&&D.instanceMatrix&&(ie=D.instanceMatrix),Q==="instanceColor"&&D.instanceColor&&(ie=D.instanceColor)),_e===void 0||_e.attribute!==ie||ie&&_e.data!==ie.data)return!0;z++}return r.attributesNum!==z||r.index!==B}function g(D,H,L,B){const F={},I=H.attributes;let z=0;const q=L.getAttributes();for(const Q in q)if(q[Q].location>=0){let _e=I[Q];_e===void 0&&(Q==="instanceMatrix"&&D.instanceMatrix&&(_e=D.instanceMatrix),Q==="instanceColor"&&D.instanceColor&&(_e=D.instanceColor));const ie={};ie.attribute=_e,_e&&_e.data&&(ie.data=_e.data),F[Q]=ie,z++}r.attributes=F,r.attributesNum=z,r.index=B}function v(){const D=r.newAttributes;for(let H=0,L=D.length;H<L;H++)D[H]=0}function p(D){m(D,0)}function m(D,H){const L=r.newAttributes,B=r.enabledAttributes,F=r.attributeDivisors;L[D]=1,B[D]===0&&(n.enableVertexAttribArray(D),B[D]=1),F[D]!==H&&(n.vertexAttribDivisor(D,H),F[D]=H)}function _(){const D=r.newAttributes,H=r.enabledAttributes;for(let L=0,B=H.length;L<B;L++)H[L]!==D[L]&&(n.disableVertexAttribArray(L),H[L]=0)}function E(D,H,L,B,F,I,z){z===!0?n.vertexAttribIPointer(D,H,L,F,I):n.vertexAttribPointer(D,H,L,B,F,I)}function S(D,H,L,B){v();const F=B.attributes,I=L.getAttributes(),z=H.defaultAttributeValues;for(const q in I){const Q=I[q];if(Q.location>=0){let me=F[q];if(me===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(me=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(me=D.instanceColor)),me!==void 0){const _e=me.normalized,ie=me.itemSize,Ge=e.get(me);if(Ge===void 0)continue;const at=Ge.buffer,lt=Ge.type,se=Ge.bytesPerElement,pe=lt===n.INT||lt===n.UNSIGNED_INT||me.gpuType===lh;if(me.isInterleavedBufferAttribute){const xe=me.data,Ye=xe.stride,Ve=me.offset;if(xe.isInstancedInterleavedBuffer){for(let ke=0;ke<Q.locationSize;ke++)m(Q.location+ke,xe.meshPerAttribute);D.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let ke=0;ke<Q.locationSize;ke++)p(Q.location+ke);n.bindBuffer(n.ARRAY_BUFFER,at);for(let ke=0;ke<Q.locationSize;ke++)E(Q.location+ke,ie/Q.locationSize,lt,_e,Ye*se,(Ve+ie/Q.locationSize*ke)*se,pe)}else{if(me.isInstancedBufferAttribute){for(let xe=0;xe<Q.locationSize;xe++)m(Q.location+xe,me.meshPerAttribute);D.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let xe=0;xe<Q.locationSize;xe++)p(Q.location+xe);n.bindBuffer(n.ARRAY_BUFFER,at);for(let xe=0;xe<Q.locationSize;xe++)E(Q.location+xe,ie/Q.locationSize,lt,_e,ie*se,ie/Q.locationSize*xe*se,pe)}}else if(z!==void 0){const _e=z[q];if(_e!==void 0)switch(_e.length){case 2:n.vertexAttrib2fv(Q.location,_e);break;case 3:n.vertexAttrib3fv(Q.location,_e);break;case 4:n.vertexAttrib4fv(Q.location,_e);break;default:n.vertexAttrib1fv(Q.location,_e)}}}}_()}function A(){T();for(const D in i){const H=i[D];for(const L in H){const B=H[L];for(const F in B){const I=B[F];for(const z in I)h(I[z].object),delete I[z];delete B[F]}}delete i[D]}}function C(D){if(i[D.id]===void 0)return;const H=i[D.id];for(const L in H){const B=H[L];for(const F in B){const I=B[F];for(const z in I)h(I[z].object),delete I[z];delete B[F]}}delete i[D.id]}function P(D){for(const H in i){const L=i[H];for(const B in L){const F=L[B];if(F[D.id]===void 0)continue;const I=F[D.id];for(const z in I)h(I[z].object),delete I[z];delete F[D.id]}}}function y(D){for(const H in i){const L=i[H],B=D.isInstancedMesh===!0?D.id:0,F=L[B];if(F!==void 0){for(const I in F){const z=F[I];for(const q in z)h(z[q].object),delete z[q];delete F[I]}delete L[B],Object.keys(L).length===0&&delete i[H]}}}function T(){G(),o=!0,r!==s&&(r=s,c(r.object))}function G(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:G,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfObject:y,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:p,disableUnusedAttributes:_}}function Oy(n,e,t){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function o(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),t.update(h,i,d))}function a(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];t.update(f,i,1)}function l(c,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v]*u[v];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function By(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==Hn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const y=P===Ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Sn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==zn&&!y)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(Xe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:_,maxVaryings:E,maxFragmentUniforms:S,maxSamples:A,samples:C}}function zy(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new ji,a=new Je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,m=n.get(d);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const _=r?0:i,E=_*4;let S=m.clippingState||null;l.value=S,S=h(g,u,E,f);for(let A=0;A!==E;++A)S[A]=t[A];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let p=null;if(v!==0){if(p=l.value,g!==!0||p===null){const m=f+v*4,_=u.matrixWorldInverse;a.getNormalMatrix(_),(p===null||p.length<m)&&(p=new Float32Array(m));for(let E=0,S=f;E!==v;++E,S+=4)o.copy(d[E]).applyMatrix4(_,a),o.normal.toArray(p,S),p[S+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}const Zi=4,Ju=[.125,.215,.35,.446,.526,.582],gs=20,Hy=256,br=new Mh,Qu=new ot;let Al=null,Cl=0,Rl=0,Pl=!1;const Vy=new W;class ed{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=Vy}=r;Al=this._renderer.getRenderTarget(),Cl=this._renderer.getActiveCubeFace(),Rl=this._renderer.getActiveMipmapLevel(),Pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=id(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Al,Cl,Rl),this._renderer.xr.enabled=Pl,e.scissorTest=!1,Ws(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Es||e.mapping===hr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Al=this._renderer.getRenderTarget(),Cl=this._renderer.getActiveCubeFace(),Rl=this._renderer.getActiveMipmapLevel(),Pl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:Ni,format:Hn,colorSpace:dr,depthBuffer:!1},s=td(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=td(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Gy(r)),this._blurMaterial=Wy(r,e,t),this._ggxMaterial=ky(r,e,t)}return s}_compileMaterial(e){const t=new Zt(new In,e);this._renderer.compile(t,br)}_sceneToCubeUV(e,t,i,s,r){const l=new yn(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Qu),d.toneMapping=ii,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Zt(new jt,new $s({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,p=v.material;let m=!1;const _=e.background;_?_.isColor&&(p.color.copy(_),e.background=null,m=!0):(p.color.copy(Qu),m=!0);for(let E=0;E<6;E++){const S=E%3;S===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):S===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const A=this._cubeSize;Ws(s,S*A,E>2?A:0,A,A),d.setRenderTarget(s),m&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Es||e.mapping===hr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=id()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Ws(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,br)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:g}=this,v=this._sizeLods[i],p=3*v*(i>g-Zi?i-g+Zi:0),m=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,Ws(r,p,m,3*v,2*v),s.setRenderTarget(r),s.render(a,br),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,Ws(e,p,m,3*v,2*v),s.setRenderTarget(e),s.render(a,br)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&it("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=c;const u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*gs-1),v=r/g,p=isFinite(r)?1+Math.floor(h*v):gs;p>gs&&Xe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${gs}`);const m=[];let _=0;for(let P=0;P<gs;++P){const y=P/v,T=Math.exp(-y*y/2);m.push(T),P===0?_+=T:P<p&&(_+=2*T)}for(let P=0;P<m.length;P++)m[P]=m[P]/_;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:E}=this;u.dTheta.value=g,u.mipInt.value=E-i;const S=this._sizeLods[s],A=3*S*(s>E-Zi?s-E+Zi:0),C=4*(this._cubeSize-S);Ws(t,A,C,3*S,2*S),l.setRenderTarget(t),l.render(d,br)}}function Gy(n){const e=[],t=[],i=[];let s=n;const r=n-Zi+1+Ju.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Zi?l=Ju[o-n+Zi-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,p=2,m=1,_=new Float32Array(v*g*f),E=new Float32Array(p*g*f),S=new Float32Array(m*g*f);for(let C=0;C<f;C++){const P=C%3*2/3-1,y=C>2?0:-1,T=[P,y,0,P+2/3,y,0,P+2/3,y+1,0,P,y,0,P+2/3,y+1,0,P,y+1,0];_.set(T,v*g*C),E.set(u,p*g*C);const G=[C,C,C,C,C,C];S.set(G,m*g*C)}const A=new In;A.setAttribute("position",new Wn(_,v)),A.setAttribute("uv",new Wn(E,p)),A.setAttribute("faceIndex",new Wn(S,m)),i.push(new Zt(A,null)),s>Zi&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function td(n,e,t){const i=new si(n,e,t);return i.texture.mapping=Na,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ws(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function ky(n,e,t){return new ci({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Hy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ba(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Wy(n,e,t){const i=new Float32Array(gs),s=new W(0,1,0);return new ci({name:"SphericalGaussianBlur",defines:{n:gs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function nd(){return new ci({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function id(){return new ci({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Ba(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Cp extends si{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Mp(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new jt(5,5,5),r=new ci({name:"CubemapFromEquirect",uniforms:fr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:Ri});r.uniforms.tEquirect.value=t;const o=new Zt(s,r),a=t.minFilter;return t.minFilter===vs&&(t.minFilter=Jt),new $_(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}function Xy(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===el||f===tl)if(e.has(u)){const g=e.get(u).texture;return a(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const v=new Cp(g.height);return v.fromEquirectangularTexture(n,u),e.set(u,v),u.addEventListener("dispose",c),a(v.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const f=u.mapping,g=f===el||f===tl,v=f===Es||f===hr;if(g||v){let p=t.get(u);const m=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return i===null&&(i=new ed(n)),p=g?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{const _=u.image;return g&&_&&_.height>0||v&&_&&l(_)?(i===null&&(i=new ed(n)),p=g?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function a(u,f){return f===el?u.mapping=Es:f===tl&&(u.mapping=hr),u}function l(u){let f=0;const g=6;for(let v=0;v<g;v++)u[v]!==void 0&&f++;return f===g}function c(u){const f=u.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function qy(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&_a("WebGLRenderer: "+i+" extension not supported."),s}}}function Yy(n,e,t,i){const s={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],n.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(g===void 0)return;if(f!==null){const _=f.array;v=f.version;for(let E=0,S=_.length;E<S;E+=3){const A=_[E+0],C=_[E+1],P=_[E+2];u.push(A,C,C,P,P,A)}}else{const _=g.array;v=g.version;for(let E=0,S=_.length/3-1;E<S;E+=3){const A=E+0,C=E+1,P=E+2;u.push(A,C,C,P,P,A)}}const p=new(g.count>=65535?Sp:yp)(u,1);p.version=v;const m=r.get(d);m&&e.remove(m),r.set(d,p)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function jy(n,e,t){let i;function s(u){i=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){n.drawElements(i,f,r,u*o),t.update(f,i,1)}function c(u,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,u*o,g),t.update(f,i,g))}function h(u,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];t.update(p,i,1)}function d(u,f,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<u.length;m++)c(u[m]/o,f[m],v[m]);else{p.multiDrawElementsInstancedWEBGL(i,f,0,r,u,0,v,0,g);let m=0;for(let _=0;_<g;_++)m+=f[_]*v[_];t.update(m,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function $y(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:it("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Ky(n,e,t){const i=new WeakMap,s=new Tt;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(a);if(u===void 0||u.count!==d){let G=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",G)};var f=G;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let S=0;g===!0&&(S=1),v===!0&&(S=2),p===!0&&(S=3);let A=a.attributes.position.count*S,C=1;A>e.maxTextureSize&&(C=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const P=new Float32Array(A*C*4*d),y=new vp(P,A,C,d);y.type=zn,y.needsUpdate=!0;const T=S*4;for(let D=0;D<d;D++){const H=m[D],L=_[D],B=E[D],F=A*C*4*D;for(let I=0;I<H.count;I++){const z=I*T;g===!0&&(s.fromBufferAttribute(H,I),P[F+z+0]=s.x,P[F+z+1]=s.y,P[F+z+2]=s.z,P[F+z+3]=0),v===!0&&(s.fromBufferAttribute(L,I),P[F+z+4]=s.x,P[F+z+5]=s.y,P[F+z+6]=s.z,P[F+z+7]=0),p===!0&&(s.fromBufferAttribute(B,I),P[F+z+8]=s.x,P[F+z+9]=s.y,P[F+z+10]=s.z,P[F+z+11]=B.itemSize===4?s.w:1)}}u={count:d,texture:y,size:new qe(A,C)},i.set(a,u),a.addEventListener("dispose",G)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Zy(n,e,t,i,s){let r=new WeakMap;function o(c){const h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}const Jy={[ip]:"LINEAR_TONE_MAPPING",[sp]:"REINHARD_TONE_MAPPING",[rp]:"CINEON_TONE_MAPPING",[ah]:"ACES_FILMIC_TONE_MAPPING",[ap]:"AGX_TONE_MAPPING",[lp]:"NEUTRAL_TONE_MAPPING",[op]:"CUSTOM_TONE_MAPPING"};function Qy(n,e,t,i,s){const r=new si(e,t,{type:n,depthBuffer:i,stencilBuffer:s}),o=new si(e,t,{type:Ni,depthBuffer:!1,stencilBuffer:!1}),a=new In;a.setAttribute("position",new Ht([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Ht([0,2,0,0,2,0],2));const l=new V_({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new Zt(a,l),h=new Mh(-1,1,1,-1,0,1);let d=null,u=null,f=!1,g,v=null,p=[],m=!1;this.setSize=function(_,E){r.setSize(_,E),o.setSize(_,E);for(let S=0;S<p.length;S++){const A=p[S];A.setSize&&A.setSize(_,E)}},this.setEffects=function(_){p=_,m=p.length>0&&p[0].isRenderPass===!0;const E=r.width,S=r.height;for(let A=0;A<p.length;A++){const C=p[A];C.setSize&&C.setSize(E,S)}},this.begin=function(_,E){if(f||_.toneMapping===ii&&p.length===0)return!1;if(v=E,E!==null){const S=E.width,A=E.height;(r.width!==S||r.height!==A)&&this.setSize(S,A)}return m===!1&&_.setRenderTarget(r),g=_.toneMapping,_.toneMapping=ii,!0},this.hasRenderPass=function(){return m},this.end=function(_,E){_.toneMapping=g,f=!0;let S=r,A=o;for(let C=0;C<p.length;C++){const P=p[C];if(P.enabled!==!1&&(P.render(_,A,S,E),P.needsSwap!==!1)){const y=S;S=A,A=y}}if(d!==_.outputColorSpace||u!==_.toneMapping){d=_.outputColorSpace,u=_.toneMapping,l.defines={},st.getTransfer(d)===dt&&(l.defines.SRGB_TRANSFER="");const C=Jy[u];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,_.setRenderTarget(v),_.render(c,h),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),o.dispose(),a.dispose(),l.dispose()}}const Rp=new Qt,Gc=new Jr(1,1),Pp=new vp,Dp=new v_,Ip=new Mp,sd=[],rd=[],od=new Float32Array(16),ad=new Float32Array(9),ld=new Float32Array(4);function pr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=sd[s];if(r===void 0&&(r=new Float32Array(s),sd[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ot(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function za(n,e){let t=rd[e];t===void 0&&(t=new Int32Array(e),rd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function eS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function tS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2fv(this.addr,e),Ot(t,e)}}function nS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;n.uniform3fv(this.addr,e),Ot(t,e)}}function iS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4fv(this.addr,e),Ot(t,e)}}function sS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;ld.set(i),n.uniformMatrix2fv(this.addr,!1,ld),Ot(t,i)}}function rS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;ad.set(i),n.uniformMatrix3fv(this.addr,!1,ad),Ot(t,i)}}function oS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ut(t,i))return;od.set(i),n.uniformMatrix4fv(this.addr,!1,od),Ot(t,i)}}function aS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function lS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2iv(this.addr,e),Ot(t,e)}}function cS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3iv(this.addr,e),Ot(t,e)}}function hS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4iv(this.addr,e),Ot(t,e)}}function uS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function dS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;n.uniform2uiv(this.addr,e),Ot(t,e)}}function fS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;n.uniform3uiv(this.addr,e),Ot(t,e)}}function pS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;n.uniform4uiv(this.addr,e),Ot(t,e)}}function mS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Gc.compareFunction=t.isReversedDepthBuffer()?mh:ph,r=Gc):r=Rp,t.setTexture2D(e||r,s)}function gS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Dp,s)}function _S(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Ip,s)}function vS(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Pp,s)}function xS(n){switch(n){case 5126:return eS;case 35664:return tS;case 35665:return nS;case 35666:return iS;case 35674:return sS;case 35675:return rS;case 35676:return oS;case 5124:case 35670:return aS;case 35667:case 35671:return lS;case 35668:case 35672:return cS;case 35669:case 35673:return hS;case 5125:return uS;case 36294:return dS;case 36295:return fS;case 36296:return pS;case 35678:case 36198:case 36298:case 36306:case 35682:return mS;case 35679:case 36299:case 36307:return gS;case 35680:case 36300:case 36308:case 36293:return _S;case 36289:case 36303:case 36311:case 36292:return vS}}function yS(n,e){n.uniform1fv(this.addr,e)}function SS(n,e){const t=pr(e,this.size,2);n.uniform2fv(this.addr,t)}function MS(n,e){const t=pr(e,this.size,3);n.uniform3fv(this.addr,t)}function ES(n,e){const t=pr(e,this.size,4);n.uniform4fv(this.addr,t)}function bS(n,e){const t=pr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function wS(n,e){const t=pr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function TS(n,e){const t=pr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function AS(n,e){n.uniform1iv(this.addr,e)}function CS(n,e){n.uniform2iv(this.addr,e)}function RS(n,e){n.uniform3iv(this.addr,e)}function PS(n,e){n.uniform4iv(this.addr,e)}function DS(n,e){n.uniform1uiv(this.addr,e)}function IS(n,e){n.uniform2uiv(this.addr,e)}function LS(n,e){n.uniform3uiv(this.addr,e)}function NS(n,e){n.uniform4uiv(this.addr,e)}function FS(n,e,t){const i=this.cache,s=e.length,r=za(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=Gc:o=Rp;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function US(n,e,t){const i=this.cache,s=e.length,r=za(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Dp,r[o])}function OS(n,e,t){const i=this.cache,s=e.length,r=za(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Ip,r[o])}function BS(n,e,t){const i=this.cache,s=e.length,r=za(t,s);Ut(i,r)||(n.uniform1iv(this.addr,r),Ot(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Pp,r[o])}function zS(n){switch(n){case 5126:return yS;case 35664:return SS;case 35665:return MS;case 35666:return ES;case 35674:return bS;case 35675:return wS;case 35676:return TS;case 5124:case 35670:return AS;case 35667:case 35671:return CS;case 35668:case 35672:return RS;case 35669:case 35673:return PS;case 5125:return DS;case 36294:return IS;case 36295:return LS;case 36296:return NS;case 35678:case 36198:case 36298:case 36306:case 35682:return FS;case 35679:case 36299:case 36307:return US;case 35680:case 36300:case 36308:case 36293:return OS;case 36289:case 36303:case 36311:case 36292:return BS}}class HS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=xS(t.type)}}class VS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zS(t.type)}}class GS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const Dl=/(\w+)(\])?(\[|\.)?/g;function cd(n,e){n.seq.push(e),n.map[e.id]=e}function kS(n,e,t){const i=n.name,s=i.length;for(Dl.lastIndex=0;;){const r=Dl.exec(i),o=Dl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){cd(t,c===void 0?new HS(a,n,e):new VS(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new GS(a),cd(t,d)),t=d}}}class sa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);kS(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function hd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const WS=37297;let XS=0;function qS(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const ud=new Je;function YS(n){st._getMatrix(ud,st.workingColorSpace,n);const e=`mat3( ${ud.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case ma:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return Xe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function dd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+qS(n.getShaderSource(e),a)}else return r}function jS(n,e){const t=YS(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const $S={[ip]:"Linear",[sp]:"Reinhard",[rp]:"Cineon",[ah]:"ACESFilmic",[ap]:"AgX",[lp]:"Neutral",[op]:"Custom"};function KS(n,e){const t=$S[e];return t===void 0?(Xe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Oo=new W;function ZS(){st.getLuminanceCoefficients(Oo);const n=Oo.x.toFixed(4),e=Oo.y.toFixed(4),t=Oo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function JS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lr).join(`
`)}function QS(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function eM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Lr(n){return n!==""}function fd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const tM=/^[ \t]*#include +<([\w\d./]+)>/gm;function kc(n){return n.replace(tM,iM)}const nM=new Map;function iM(n,e){let t=Qe[e];if(t===void 0){const i=nM.get(e);if(i!==void 0)t=Qe[i],Xe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return kc(t)}const sM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function md(n){return n.replace(sM,rM)}function rM(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function gd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const oM={[Jo]:"SHADOWMAP_TYPE_PCF",[Ir]:"SHADOWMAP_TYPE_VSM"};function aM(n){return oM[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const lM={[Es]:"ENVMAP_TYPE_CUBE",[hr]:"ENVMAP_TYPE_CUBE",[Na]:"ENVMAP_TYPE_CUBE_UV"};function cM(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":lM[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const hM={[hr]:"ENVMAP_MODE_REFRACTION"};function uM(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":hM[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const dM={[np]:"ENVMAP_BLENDING_MULTIPLY",[K0]:"ENVMAP_BLENDING_MIX",[Z0]:"ENVMAP_BLENDING_ADD"};function fM(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":dM[n.combine]||"ENVMAP_BLENDING_NONE"}function pM(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function mM(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=aM(t),c=cM(t),h=uM(t),d=fM(t),u=pM(t),f=JS(t),g=QS(r),v=s.createProgram();let p,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Lr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Lr).join(`
`),m.length>0&&(m+=`
`)):(p=[gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),m=[gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ii?"#define TONE_MAPPING":"",t.toneMapping!==ii?Qe.tonemapping_pars_fragment:"",t.toneMapping!==ii?KS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,jS("linearToOutputTexel",t.outputColorSpace),ZS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Lr).join(`
`)),o=kc(o),o=fd(o,t),o=pd(o,t),a=kc(a),a=fd(a,t),a=pd(a,t),o=md(o),a=md(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",t.glslVersion===Su?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Su?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const E=_+p+o,S=_+m+a,A=hd(s,s.VERTEX_SHADER,E),C=hd(s,s.FRAGMENT_SHADER,S);s.attachShader(v,A),s.attachShader(v,C),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(D){if(n.debug.checkShaderErrors){const H=s.getProgramInfoLog(v)||"",L=s.getShaderInfoLog(A)||"",B=s.getShaderInfoLog(C)||"",F=H.trim(),I=L.trim(),z=B.trim();let q=!0,Q=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,A,C);else{const me=dd(s,A,"vertex"),_e=dd(s,C,"fragment");it("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+F+`
`+me+`
`+_e)}else F!==""?Xe("WebGLProgram: Program Info Log:",F):(I===""||z==="")&&(Q=!1);Q&&(D.diagnostics={runnable:q,programLog:F,vertexShader:{log:I,prefix:p},fragmentShader:{log:z,prefix:m}})}s.deleteShader(A),s.deleteShader(C),y=new sa(s,v),T=eM(s,v)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let G=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return G===!1&&(G=s.getProgramParameter(v,WS)),G},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=XS++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=C,this}let gM=0;class _M{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new vM(e),t.set(e,i)),i}}class vM{constructor(e){this.id=gM++,this.code=e,this.usedTimes=0}}function xM(n,e,t,i,s,r){const o=new _h,a=new _M,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function v(y,T,G,D,H){const L=D.fog,B=H.geometry,F=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,I=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,z=e.get(y.envMap||F,I),q=z&&z.mapping===Na?z.image.height:null,Q=f[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&Xe("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const me=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,_e=me!==void 0?me.length:0;let ie=0;B.morphAttributes.position!==void 0&&(ie=1),B.morphAttributes.normal!==void 0&&(ie=2),B.morphAttributes.color!==void 0&&(ie=3);let Ge,at,lt,se;if(Q){const ut=ei[Q];Ge=ut.vertexShader,at=ut.fragmentShader}else Ge=y.vertexShader,at=y.fragmentShader,a.update(y),lt=a.getVertexShaderID(y),se=a.getFragmentShaderID(y);const pe=n.getRenderTarget(),xe=n.state.buffers.depth.getReversed(),Ye=H.isInstancedMesh===!0,Ve=H.isBatchedMesh===!0,ke=!!y.map,N=!!y.matcap,O=!!z,X=!!y.aoMap,oe=!!y.lightMap,Z=!!y.bumpMap,ae=!!y.normalMap,R=!!y.displacementMap,he=!!y.emissiveMap,le=!!y.metalnessMap,re=!!y.roughnessMap,ce=y.anisotropy>0,b=y.clearcoat>0,x=y.dispersion>0,U=y.iridescence>0,Y=y.sheen>0,ee=y.transmission>0,j=ce&&!!y.anisotropyMap,Se=b&&!!y.clearcoatMap,de=b&&!!y.clearcoatNormalMap,De=b&&!!y.clearcoatRoughnessMap,Ue=U&&!!y.iridescenceMap,ue=U&&!!y.iridescenceThicknessMap,ge=Y&&!!y.sheenColorMap,Me=Y&&!!y.sheenRoughnessMap,Ce=!!y.specularMap,Re=!!y.specularColorMap,$e=!!y.specularIntensityMap,V=ee&&!!y.transmissionMap,ye=ee&&!!y.thicknessMap,ve=!!y.gradientMap,Ie=!!y.alphaMap,fe=y.alphaTest>0,te=!!y.alphaHash,Ne=!!y.extensions;let je=ii;y.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(je=n.toneMapping);const Mt={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:Ge,fragmentShader:at,defines:y.defines,customVertexShaderID:lt,customFragmentShaderID:se,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ve,batchingColor:Ve&&H._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&H.instanceColor!==null,instancingMorph:Ye&&H.morphTexture!==null,outputColorSpace:pe===null?n.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:dr,alphaToCoverage:!!y.alphaToCoverage,map:ke,matcap:N,envMap:O,envMapMode:O&&z.mapping,envMapCubeUVHeight:q,aoMap:X,lightMap:oe,bumpMap:Z,normalMap:ae,displacementMap:R,emissiveMap:he,normalMapObjectSpace:ae&&y.normalMapType===e_,normalMapTangentSpace:ae&&y.normalMapType===gp,metalnessMap:le,roughnessMap:re,anisotropy:ce,anisotropyMap:j,clearcoat:b,clearcoatMap:Se,clearcoatNormalMap:de,clearcoatRoughnessMap:De,dispersion:x,iridescence:U,iridescenceMap:Ue,iridescenceThicknessMap:ue,sheen:Y,sheenColorMap:ge,sheenRoughnessMap:Me,specularMap:Ce,specularColorMap:Re,specularIntensityMap:$e,transmission:ee,transmissionMap:V,thicknessMap:ye,gradientMap:ve,opaque:y.transparent===!1&&y.blending===rr&&y.alphaToCoverage===!1,alphaMap:Ie,alphaTest:fe,alphaHash:te,combine:y.combine,mapUv:ke&&g(y.map.channel),aoMapUv:X&&g(y.aoMap.channel),lightMapUv:oe&&g(y.lightMap.channel),bumpMapUv:Z&&g(y.bumpMap.channel),normalMapUv:ae&&g(y.normalMap.channel),displacementMapUv:R&&g(y.displacementMap.channel),emissiveMapUv:he&&g(y.emissiveMap.channel),metalnessMapUv:le&&g(y.metalnessMap.channel),roughnessMapUv:re&&g(y.roughnessMap.channel),anisotropyMapUv:j&&g(y.anisotropyMap.channel),clearcoatMapUv:Se&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:de&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:Me&&g(y.sheenRoughnessMap.channel),specularMapUv:Ce&&g(y.specularMap.channel),specularColorMapUv:Re&&g(y.specularColorMap.channel),specularIntensityMapUv:$e&&g(y.specularIntensityMap.channel),transmissionMapUv:V&&g(y.transmissionMap.channel),thicknessMapUv:ye&&g(y.thicknessMap.channel),alphaMapUv:Ie&&g(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ae||ce),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!B.attributes.uv&&(ke||Ie),fog:!!L,useFog:y.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||B.attributes.normal===void 0&&ae===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xe,skinning:H.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:ie,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&G.length>0,shadowMapType:n.shadowMap.type,toneMapping:je,decodeVideoTexture:ke&&y.map.isVideoTexture===!0&&st.getTransfer(y.map.colorSpace)===dt,decodeVideoTextureEmissive:he&&y.emissiveMap.isVideoTexture===!0&&st.getTransfer(y.emissiveMap.colorSpace)===dt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Cn,flipSided:y.side===ln,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ne&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&y.extensions.multiDraw===!0||Ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Mt.vertexUv1s=l.has(1),Mt.vertexUv2s=l.has(2),Mt.vertexUv3s=l.has(3),l.clear(),Mt}function p(y){const T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(const G in y.defines)T.push(G),T.push(y.defines[G]);return y.isRawShaderMaterial===!1&&(m(T,y),_(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function m(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function _(y,T){o.disableAll(),T.instancing&&o.enable(0),T.instancingColor&&o.enable(1),T.instancingMorph&&o.enable(2),T.matcap&&o.enable(3),T.envMap&&o.enable(4),T.normalMapObjectSpace&&o.enable(5),T.normalMapTangentSpace&&o.enable(6),T.clearcoat&&o.enable(7),T.iridescence&&o.enable(8),T.alphaTest&&o.enable(9),T.vertexColors&&o.enable(10),T.vertexAlphas&&o.enable(11),T.vertexUv1s&&o.enable(12),T.vertexUv2s&&o.enable(13),T.vertexUv3s&&o.enable(14),T.vertexTangents&&o.enable(15),T.anisotropy&&o.enable(16),T.alphaHash&&o.enable(17),T.batching&&o.enable(18),T.dispersion&&o.enable(19),T.batchingColor&&o.enable(20),T.gradientMap&&o.enable(21),y.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.reversedDepthBuffer&&o.enable(4),T.skinning&&o.enable(5),T.morphTargets&&o.enable(6),T.morphNormals&&o.enable(7),T.morphColors&&o.enable(8),T.premultipliedAlpha&&o.enable(9),T.shadowMapEnabled&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),T.decodeVideoTextureEmissive&&o.enable(20),T.alphaToCoverage&&o.enable(21),y.push(o.mask)}function E(y){const T=f[y.type];let G;if(T){const D=ei[T];G=B_.clone(D.uniforms)}else G=y.uniforms;return G}function S(y,T){let G=h.get(T);return G!==void 0?++G.usedTimes:(G=new mM(n,T,y,s),c.push(G),h.set(T,G)),G}function A(y){if(--y.usedTimes===0){const T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function C(y){a.remove(y)}function P(){a.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:E,acquireProgram:S,releaseProgram:A,releaseShaderCache:C,programs:c,dispose:P}}function yM(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function SM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function _d(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function vd(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,g,v,p,m){let _=n[e];return _===void 0?(_={id:u.id,object:u,geometry:f,material:g,materialVariant:o(u),groupOrder:v,renderOrder:u.renderOrder,z:p,group:m},n[e]=_):(_.id=u.id,_.object=u,_.geometry=f,_.material=g,_.materialVariant=o(u),_.groupOrder=v,_.renderOrder=u.renderOrder,_.z=p,_.group=m),e++,_}function l(u,f,g,v,p,m){const _=a(u,f,g,v,p,m);g.transmission>0?i.push(_):g.transparent===!0?s.push(_):t.push(_)}function c(u,f,g,v,p,m){const _=a(u,f,g,v,p,m);g.transmission>0?i.unshift(_):g.transparent===!0?s.unshift(_):t.unshift(_)}function h(u,f){t.length>1&&t.sort(u||SM),i.length>1&&i.sort(f||_d),s.length>1&&s.sort(f||_d)}function d(){for(let u=e,f=n.length;u<f;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function MM(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new vd,n.set(i,[o])):s>=r.length?(o=new vd,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function EM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new W,color:new ot};break;case"SpotLight":t={position:new W,direction:new W,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function bM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let wM=0;function TM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function AM(n){const e=new EM,t=bM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);const s=new W,r=new vt,o=new vt;function a(c){let h=0,d=0,u=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let f=0,g=0,v=0,p=0,m=0,_=0,E=0,S=0,A=0,C=0,P=0;c.sort(TM);for(let T=0,G=c.length;T<G;T++){const D=c[T],H=D.color,L=D.intensity,B=D.distance;let F=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===ur?F=D.shadow.map.texture:F=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=H.r*L,d+=H.g*L,u+=H.b*L;else if(D.isLightProbe){for(let I=0;I<9;I++)i.probe[I].addScaledVector(D.sh.coefficients[I],L);P++}else if(D.isDirectionalLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const z=D.shadow,q=t.get(D);q.shadowIntensity=z.intensity,q.shadowBias=z.bias,q.shadowNormalBias=z.normalBias,q.shadowRadius=z.radius,q.shadowMapSize=z.mapSize,i.directionalShadow[f]=q,i.directionalShadowMap[f]=F,i.directionalShadowMatrix[f]=D.shadow.matrix,_++}i.directional[f]=I,f++}else if(D.isSpotLight){const I=e.get(D);I.position.setFromMatrixPosition(D.matrixWorld),I.color.copy(H).multiplyScalar(L),I.distance=B,I.coneCos=Math.cos(D.angle),I.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),I.decay=D.decay,i.spot[v]=I;const z=D.shadow;if(D.map&&(i.spotLightMap[A]=D.map,A++,z.updateMatrices(D),D.castShadow&&C++),i.spotLightMatrix[v]=z.matrix,D.castShadow){const q=t.get(D);q.shadowIntensity=z.intensity,q.shadowBias=z.bias,q.shadowNormalBias=z.normalBias,q.shadowRadius=z.radius,q.shadowMapSize=z.mapSize,i.spotShadow[v]=q,i.spotShadowMap[v]=F,S++}v++}else if(D.isRectAreaLight){const I=e.get(D);I.color.copy(H).multiplyScalar(L),I.halfWidth.set(D.width*.5,0,0),I.halfHeight.set(0,D.height*.5,0),i.rectArea[p]=I,p++}else if(D.isPointLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity),I.distance=D.distance,I.decay=D.decay,D.castShadow){const z=D.shadow,q=t.get(D);q.shadowIntensity=z.intensity,q.shadowBias=z.bias,q.shadowNormalBias=z.normalBias,q.shadowRadius=z.radius,q.shadowMapSize=z.mapSize,q.shadowCameraNear=z.camera.near,q.shadowCameraFar=z.camera.far,i.pointShadow[g]=q,i.pointShadowMap[g]=F,i.pointShadowMatrix[g]=D.shadow.matrix,E++}i.point[g]=I,g++}else if(D.isHemisphereLight){const I=e.get(D);I.skyColor.copy(D.color).multiplyScalar(L),I.groundColor.copy(D.groundColor).multiplyScalar(L),i.hemi[m]=I,m++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const y=i.hash;(y.directionalLength!==f||y.pointLength!==g||y.spotLength!==v||y.rectAreaLength!==p||y.hemiLength!==m||y.numDirectionalShadows!==_||y.numPointShadows!==E||y.numSpotShadows!==S||y.numSpotMaps!==A||y.numLightProbes!==P)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=S+A-C,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=P,y.directionalLength=f,y.pointLength=g,y.spotLength=v,y.rectAreaLength=p,y.hemiLength=m,y.numDirectionalShadows=_,y.numPointShadows=E,y.numSpotShadows=S,y.numSpotMaps=A,y.numLightProbes=P,i.version=wM++)}function l(c,h){let d=0,u=0,f=0,g=0,v=0;const p=h.matrixWorldInverse;for(let m=0,_=c.length;m<_;m++){const E=c[m];if(E.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),d++}else if(E.isSpotLight){const S=i.spot[f];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),f++}else if(E.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(p),o.identity(),r.copy(E.matrixWorld),r.premultiply(p),o.extractRotation(r),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const S=i.point[u];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(p),u++}else if(E.isHemisphereLight){const S=i.hemi[v];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(p),v++}}}return{setup:a,setupView:l,state:i}}function xd(n){const e=new AM(n),t=[],i=[];function s(h){c.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function o(h){i.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function CM(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new xd(n),e.set(s,[a])):r>=o.length?(a=new xd(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const RM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,PM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,DM=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],IM=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],yd=new vt,wr=new W,Il=new W;function LM(n,e,t){let i=new yh;const s=new qe,r=new qe,o=new Tt,a=new G_,l=new k_,c={},h=t.maxTextureSize,d={[es]:ln,[ln]:es,[Cn]:Cn},u=new ci({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:RM,fragmentShader:PM}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new In;g.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Zt(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jo;let m=this.type;this.render=function(C,P,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;this.type===tp&&(Xe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Jo);const T=n.getRenderTarget(),G=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),H=n.state;H.setBlending(Ri),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const L=m!==this.type;L&&P.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(F=>F.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,F=C.length;B<F;B++){const I=C[B],z=I.shadow;if(z===void 0){Xe("WebGLShadowMap:",I,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const q=z.getFrameExtents();s.multiply(q),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,z.mapSize.y=r.y));const Q=n.state.buffers.depth.getReversed();if(z.camera._reversedDepth=Q,z.map===null||L===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Ir){if(I.isPointLight){Xe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new si(s.x,s.y,{format:ur,type:Ni,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),z.map.texture.name=I.name+".shadowMap",z.map.depthTexture=new Jr(s.x,s.y,zn),z.map.depthTexture.name=I.name+".shadowMapDepth",z.map.depthTexture.format=Fi,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ft,z.map.depthTexture.magFilter=Ft}else I.isPointLight?(z.map=new Cp(s.x),z.map.depthTexture=new U_(s.x,ai)):(z.map=new si(s.x,s.y),z.map.depthTexture=new Jr(s.x,s.y,ai)),z.map.depthTexture.name=I.name+".shadowMap",z.map.depthTexture.format=Fi,this.type===Jo?(z.map.depthTexture.compareFunction=Q?mh:ph,z.map.depthTexture.minFilter=Jt,z.map.depthTexture.magFilter=Jt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ft,z.map.depthTexture.magFilter=Ft);z.camera.updateProjectionMatrix()}const me=z.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<me;_e++){if(z.map.isWebGLCubeRenderTarget)n.setRenderTarget(z.map,_e),n.clear();else{_e===0&&(n.setRenderTarget(z.map),n.clear());const ie=z.getViewport(_e);o.set(r.x*ie.x,r.y*ie.y,r.x*ie.z,r.y*ie.w),H.viewport(o)}if(I.isPointLight){const ie=z.camera,Ge=z.matrix,at=I.distance||ie.far;at!==ie.far&&(ie.far=at,ie.updateProjectionMatrix()),wr.setFromMatrixPosition(I.matrixWorld),ie.position.copy(wr),Il.copy(ie.position),Il.add(DM[_e]),ie.up.copy(IM[_e]),ie.lookAt(Il),ie.updateMatrixWorld(),Ge.makeTranslation(-wr.x,-wr.y,-wr.z),yd.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),z._frustum.setFromProjectionMatrix(yd,ie.coordinateSystem,ie.reversedDepth)}else z.updateMatrices(I);i=z.getFrustum(),S(P,y,z.camera,I,this.type)}z.isPointLightShadow!==!0&&this.type===Ir&&_(z,y),z.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(T,G,D)};function _(C,P){const y=e.update(v);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new si(s.x,s.y,{format:ur,type:Ni})),u.uniforms.shadow_pass.value=C.map.depthTexture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(P,null,y,u,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(P,null,y,f,v,null)}function E(C,P,y,T){let G=null;const D=y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)G=D;else if(G=y.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const H=G.uuid,L=P.uuid;let B=c[H];B===void 0&&(B={},c[H]=B);let F=B[L];F===void 0&&(F=G.clone(),B[L]=F,P.addEventListener("dispose",A)),G=F}if(G.visible=P.visible,G.wireframe=P.wireframe,T===Ir?G.side=P.shadowSide!==null?P.shadowSide:P.side:G.side=P.shadowSide!==null?P.shadowSide:d[P.side],G.alphaMap=P.alphaMap,G.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,G.map=P.map,G.clipShadows=P.clipShadows,G.clippingPlanes=P.clippingPlanes,G.clipIntersection=P.clipIntersection,G.displacementMap=P.displacementMap,G.displacementScale=P.displacementScale,G.displacementBias=P.displacementBias,G.wireframeLinewidth=P.wireframeLinewidth,G.linewidth=P.linewidth,y.isPointLight===!0&&G.isMeshDistanceMaterial===!0){const H=n.properties.get(G);H.light=y}return G}function S(C,P,y,T,G){if(C.visible===!1)return;if(C.layers.test(P.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&G===Ir)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,C.matrixWorld);const L=e.update(C),B=C.material;if(Array.isArray(B)){const F=L.groups;for(let I=0,z=F.length;I<z;I++){const q=F[I],Q=B[q.materialIndex];if(Q&&Q.visible){const me=E(C,Q,T,G);C.onBeforeShadow(n,C,P,y,L,me,q),n.renderBufferDirect(y,null,L,me,C,q),C.onAfterShadow(n,C,P,y,L,me,q)}}}else if(B.visible){const F=E(C,B,T,G);C.onBeforeShadow(n,C,P,y,L,F,null),n.renderBufferDirect(y,null,L,F,C,null),C.onAfterShadow(n,C,P,y,L,F,null)}}const H=C.children;for(let L=0,B=H.length;L<B;L++)S(H[L],P,y,T,G)}function A(C){C.target.removeEventListener("dispose",A);for(const y in c){const T=c[y],G=C.target.uuid;G in T&&(T[G].dispose(),delete T[G])}}}function NM(n,e){function t(){let V=!1;const ye=new Tt;let ve=null;const Ie=new Tt(0,0,0,0);return{setMask:function(fe){ve!==fe&&!V&&(n.colorMask(fe,fe,fe,fe),ve=fe)},setLocked:function(fe){V=fe},setClear:function(fe,te,Ne,je,Mt){Mt===!0&&(fe*=je,te*=je,Ne*=je),ye.set(fe,te,Ne,je),Ie.equals(ye)===!1&&(n.clearColor(fe,te,Ne,je),Ie.copy(ye))},reset:function(){V=!1,ve=null,Ie.set(-1,0,0,0)}}}function i(){let V=!1,ye=!1,ve=null,Ie=null,fe=null;return{setReversed:function(te){if(ye!==te){const Ne=e.get("EXT_clip_control");te?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),ye=te;const je=fe;fe=null,this.setClear(je)}},getReversed:function(){return ye},setTest:function(te){te?pe(n.DEPTH_TEST):xe(n.DEPTH_TEST)},setMask:function(te){ve!==te&&!V&&(n.depthMask(te),ve=te)},setFunc:function(te){if(ye&&(te=h_[te]),Ie!==te){switch(te){case Ql:n.depthFunc(n.NEVER);break;case ec:n.depthFunc(n.ALWAYS);break;case tc:n.depthFunc(n.LESS);break;case cr:n.depthFunc(n.LEQUAL);break;case nc:n.depthFunc(n.EQUAL);break;case ic:n.depthFunc(n.GEQUAL);break;case sc:n.depthFunc(n.GREATER);break;case rc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ie=te}},setLocked:function(te){V=te},setClear:function(te){fe!==te&&(fe=te,ye&&(te=1-te),n.clearDepth(te))},reset:function(){V=!1,ve=null,Ie=null,fe=null,ye=!1}}}function s(){let V=!1,ye=null,ve=null,Ie=null,fe=null,te=null,Ne=null,je=null,Mt=null;return{setTest:function(ut){V||(ut?pe(n.STENCIL_TEST):xe(n.STENCIL_TEST))},setMask:function(ut){ye!==ut&&!V&&(n.stencilMask(ut),ye=ut)},setFunc:function(ut,hi,ui){(ve!==ut||Ie!==hi||fe!==ui)&&(n.stencilFunc(ut,hi,ui),ve=ut,Ie=hi,fe=ui)},setOp:function(ut,hi,ui){(te!==ut||Ne!==hi||je!==ui)&&(n.stencilOp(ut,hi,ui),te=ut,Ne=hi,je=ui)},setLocked:function(ut){V=ut},setClear:function(ut){Mt!==ut&&(n.clearStencil(ut),Mt=ut)},reset:function(){V=!1,ye=null,ve=null,Ie=null,fe=null,te=null,Ne=null,je=null,Mt=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,v=!1,p=null,m=null,_=null,E=null,S=null,A=null,C=null,P=new ot(0,0,0),y=0,T=!1,G=null,D=null,H=null,L=null,B=null;const F=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,z=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(q)[1]),I=z>=1):q.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),I=z>=2);let Q=null,me={};const _e=n.getParameter(n.SCISSOR_BOX),ie=n.getParameter(n.VIEWPORT),Ge=new Tt().fromArray(_e),at=new Tt().fromArray(ie);function lt(V,ye,ve,Ie){const fe=new Uint8Array(4),te=n.createTexture();n.bindTexture(V,te),n.texParameteri(V,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(V,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<ve;Ne++)V===n.TEXTURE_3D||V===n.TEXTURE_2D_ARRAY?n.texImage3D(ye,0,n.RGBA,1,1,Ie,0,n.RGBA,n.UNSIGNED_BYTE,fe):n.texImage2D(ye+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,fe);return te}const se={};se[n.TEXTURE_2D]=lt(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=lt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=lt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=lt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),pe(n.DEPTH_TEST),o.setFunc(cr),Z(!1),ae(gu),pe(n.CULL_FACE),X(Ri);function pe(V){h[V]!==!0&&(n.enable(V),h[V]=!0)}function xe(V){h[V]!==!1&&(n.disable(V),h[V]=!1)}function Ye(V,ye){return d[V]!==ye?(n.bindFramebuffer(V,ye),d[V]=ye,V===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ye),V===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ye),!0):!1}function Ve(V,ye){let ve=f,Ie=!1;if(V){ve=u.get(ye),ve===void 0&&(ve=[],u.set(ye,ve));const fe=V.textures;if(ve.length!==fe.length||ve[0]!==n.COLOR_ATTACHMENT0){for(let te=0,Ne=fe.length;te<Ne;te++)ve[te]=n.COLOR_ATTACHMENT0+te;ve.length=fe.length,Ie=!0}}else ve[0]!==n.BACK&&(ve[0]=n.BACK,Ie=!0);Ie&&n.drawBuffers(ve)}function ke(V){return g!==V?(n.useProgram(V),g=V,!0):!1}const N={[ps]:n.FUNC_ADD,[L0]:n.FUNC_SUBTRACT,[N0]:n.FUNC_REVERSE_SUBTRACT};N[F0]=n.MIN,N[U0]=n.MAX;const O={[O0]:n.ZERO,[B0]:n.ONE,[z0]:n.SRC_COLOR,[Zl]:n.SRC_ALPHA,[X0]:n.SRC_ALPHA_SATURATE,[k0]:n.DST_COLOR,[V0]:n.DST_ALPHA,[H0]:n.ONE_MINUS_SRC_COLOR,[Jl]:n.ONE_MINUS_SRC_ALPHA,[W0]:n.ONE_MINUS_DST_COLOR,[G0]:n.ONE_MINUS_DST_ALPHA,[q0]:n.CONSTANT_COLOR,[Y0]:n.ONE_MINUS_CONSTANT_COLOR,[j0]:n.CONSTANT_ALPHA,[$0]:n.ONE_MINUS_CONSTANT_ALPHA};function X(V,ye,ve,Ie,fe,te,Ne,je,Mt,ut){if(V===Ri){v===!0&&(xe(n.BLEND),v=!1);return}if(v===!1&&(pe(n.BLEND),v=!0),V!==I0){if(V!==p||ut!==T){if((m!==ps||S!==ps)&&(n.blendEquation(n.FUNC_ADD),m=ps,S=ps),ut)switch(V){case rr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vr:n.blendFunc(n.ONE,n.ONE);break;case _u:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case vu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:it("WebGLState: Invalid blending: ",V);break}else switch(V){case rr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case _u:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vu:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",V);break}_=null,E=null,A=null,C=null,P.set(0,0,0),y=0,p=V,T=ut}return}fe=fe||ye,te=te||ve,Ne=Ne||Ie,(ye!==m||fe!==S)&&(n.blendEquationSeparate(N[ye],N[fe]),m=ye,S=fe),(ve!==_||Ie!==E||te!==A||Ne!==C)&&(n.blendFuncSeparate(O[ve],O[Ie],O[te],O[Ne]),_=ve,E=Ie,A=te,C=Ne),(je.equals(P)===!1||Mt!==y)&&(n.blendColor(je.r,je.g,je.b,Mt),P.copy(je),y=Mt),p=V,T=!1}function oe(V,ye){V.side===Cn?xe(n.CULL_FACE):pe(n.CULL_FACE);let ve=V.side===ln;ye&&(ve=!ve),Z(ve),V.blending===rr&&V.transparent===!1?X(Ri):X(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);const Ie=V.stencilWrite;a.setTest(Ie),Ie&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),he(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?pe(n.SAMPLE_ALPHA_TO_COVERAGE):xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Z(V){G!==V&&(V?n.frontFace(n.CW):n.frontFace(n.CCW),G=V)}function ae(V){V!==P0?(pe(n.CULL_FACE),V!==D&&(V===gu?n.cullFace(n.BACK):V===D0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xe(n.CULL_FACE),D=V}function R(V){V!==H&&(I&&n.lineWidth(V),H=V)}function he(V,ye,ve){V?(pe(n.POLYGON_OFFSET_FILL),(L!==ye||B!==ve)&&(L=ye,B=ve,o.getReversed()&&(ye=-ye),n.polygonOffset(ye,ve))):xe(n.POLYGON_OFFSET_FILL)}function le(V){V?pe(n.SCISSOR_TEST):xe(n.SCISSOR_TEST)}function re(V){V===void 0&&(V=n.TEXTURE0+F-1),Q!==V&&(n.activeTexture(V),Q=V)}function ce(V,ye,ve){ve===void 0&&(Q===null?ve=n.TEXTURE0+F-1:ve=Q);let Ie=me[ve];Ie===void 0&&(Ie={type:void 0,texture:void 0},me[ve]=Ie),(Ie.type!==V||Ie.texture!==ye)&&(Q!==ve&&(n.activeTexture(ve),Q=ve),n.bindTexture(V,ye||se[V]),Ie.type=V,Ie.texture=ye)}function b(){const V=me[Q];V!==void 0&&V.type!==void 0&&(n.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(V){it("WebGLState:",V)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(V){it("WebGLState:",V)}}function Y(){try{n.texSubImage2D(...arguments)}catch(V){it("WebGLState:",V)}}function ee(){try{n.texSubImage3D(...arguments)}catch(V){it("WebGLState:",V)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(V){it("WebGLState:",V)}}function Se(){try{n.compressedTexSubImage3D(...arguments)}catch(V){it("WebGLState:",V)}}function de(){try{n.texStorage2D(...arguments)}catch(V){it("WebGLState:",V)}}function De(){try{n.texStorage3D(...arguments)}catch(V){it("WebGLState:",V)}}function Ue(){try{n.texImage2D(...arguments)}catch(V){it("WebGLState:",V)}}function ue(){try{n.texImage3D(...arguments)}catch(V){it("WebGLState:",V)}}function ge(V){Ge.equals(V)===!1&&(n.scissor(V.x,V.y,V.z,V.w),Ge.copy(V))}function Me(V){at.equals(V)===!1&&(n.viewport(V.x,V.y,V.z,V.w),at.copy(V))}function Ce(V,ye){let ve=c.get(ye);ve===void 0&&(ve=new WeakMap,c.set(ye,ve));let Ie=ve.get(V);Ie===void 0&&(Ie=n.getUniformBlockIndex(ye,V.name),ve.set(V,Ie))}function Re(V,ye){const Ie=c.get(ye).get(V);l.get(ye)!==Ie&&(n.uniformBlockBinding(ye,Ie,V.__bindingPointIndex),l.set(ye,Ie))}function $e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Q=null,me={},d={},u=new WeakMap,f=[],g=null,v=!1,p=null,m=null,_=null,E=null,S=null,A=null,C=null,P=new ot(0,0,0),y=0,T=!1,G=null,D=null,H=null,L=null,B=null,Ge.set(0,0,n.canvas.width,n.canvas.height),at.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:pe,disable:xe,bindFramebuffer:Ye,drawBuffers:Ve,useProgram:ke,setBlending:X,setMaterial:oe,setFlipSided:Z,setCullFace:ae,setLineWidth:R,setPolygonOffset:he,setScissorTest:le,activeTexture:re,bindTexture:ce,unbindTexture:b,compressedTexImage2D:x,compressedTexImage3D:U,texImage2D:Ue,texImage3D:ue,updateUBOMapping:Ce,uniformBlockBinding:Re,texStorage2D:de,texStorage3D:De,texSubImage2D:Y,texSubImage3D:ee,compressedTexSubImage2D:j,compressedTexSubImage3D:Se,scissor:ge,viewport:Me,reset:$e}}function FM(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qe,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,x){return f?new OffscreenCanvas(b,x):ga("canvas")}function v(b,x,U){let Y=1;const ee=ce(b);if((ee.width>U||ee.height>U)&&(Y=U/Math.max(ee.width,ee.height)),Y<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const j=Math.floor(Y*ee.width),Se=Math.floor(Y*ee.height);d===void 0&&(d=g(j,Se));const de=x?g(j,Se):d;return de.width=j,de.height=Se,de.getContext("2d").drawImage(b,0,0,j,Se),Xe("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+j+"x"+Se+")."),de}else return"data"in b&&Xe("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),b;return b}function p(b){return b.generateMipmaps}function m(b){n.generateMipmap(b)}function _(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(b,x,U,Y,ee=!1){if(b!==null){if(n[b]!==void 0)return n[b];Xe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let j=x;if(x===n.RED&&(U===n.FLOAT&&(j=n.R32F),U===n.HALF_FLOAT&&(j=n.R16F),U===n.UNSIGNED_BYTE&&(j=n.R8)),x===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.R8UI),U===n.UNSIGNED_SHORT&&(j=n.R16UI),U===n.UNSIGNED_INT&&(j=n.R32UI),U===n.BYTE&&(j=n.R8I),U===n.SHORT&&(j=n.R16I),U===n.INT&&(j=n.R32I)),x===n.RG&&(U===n.FLOAT&&(j=n.RG32F),U===n.HALF_FLOAT&&(j=n.RG16F),U===n.UNSIGNED_BYTE&&(j=n.RG8)),x===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RG8UI),U===n.UNSIGNED_SHORT&&(j=n.RG16UI),U===n.UNSIGNED_INT&&(j=n.RG32UI),U===n.BYTE&&(j=n.RG8I),U===n.SHORT&&(j=n.RG16I),U===n.INT&&(j=n.RG32I)),x===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RGB8UI),U===n.UNSIGNED_SHORT&&(j=n.RGB16UI),U===n.UNSIGNED_INT&&(j=n.RGB32UI),U===n.BYTE&&(j=n.RGB8I),U===n.SHORT&&(j=n.RGB16I),U===n.INT&&(j=n.RGB32I)),x===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),U===n.UNSIGNED_INT&&(j=n.RGBA32UI),U===n.BYTE&&(j=n.RGBA8I),U===n.SHORT&&(j=n.RGBA16I),U===n.INT&&(j=n.RGBA32I)),x===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),x===n.RGBA){const Se=ee?ma:st.getTransfer(Y);U===n.FLOAT&&(j=n.RGBA32F),U===n.HALF_FLOAT&&(j=n.RGBA16F),U===n.UNSIGNED_BYTE&&(j=Se===dt?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function S(b,x){let U;return b?x===null||x===ai||x===Kr?U=n.DEPTH24_STENCIL8:x===zn?U=n.DEPTH32F_STENCIL8:x===$r&&(U=n.DEPTH24_STENCIL8,Xe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ai||x===Kr?U=n.DEPTH_COMPONENT24:x===zn?U=n.DEPTH_COMPONENT32F:x===$r&&(U=n.DEPTH_COMPONENT16),U}function A(b,x){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ft&&b.minFilter!==Jt?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function C(b){const x=b.target;x.removeEventListener("dispose",C),y(x),x.isVideoTexture&&h.delete(x)}function P(b){const x=b.target;x.removeEventListener("dispose",P),G(x)}function y(b){const x=i.get(b);if(x.__webglInit===void 0)return;const U=b.source,Y=u.get(U);if(Y){const ee=Y[x.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&T(b),Object.keys(Y).length===0&&u.delete(U)}i.remove(b)}function T(b){const x=i.get(b);n.deleteTexture(x.__webglTexture);const U=b.source,Y=u.get(U);delete Y[x.__cacheKey],o.memory.textures--}function G(b){const x=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let ee=0;ee<x.__webglFramebuffer[Y].length;ee++)n.deleteFramebuffer(x.__webglFramebuffer[Y][ee]);else n.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)n.deleteFramebuffer(x.__webglFramebuffer[Y]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const U=b.textures;for(let Y=0,ee=U.length;Y<ee;Y++){const j=i.get(U[Y]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(U[Y])}i.remove(b)}let D=0;function H(){D=0}function L(){const b=D;return b>=s.maxTextures&&Xe("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),D+=1,b}function B(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function F(b,x){const U=i.get(b);if(b.isVideoTexture&&le(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&U.__version!==b.version){const Y=b.image;if(Y===null)Xe("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Xe("WebGLRenderer: Texture marked for update but image is incomplete");else{se(U,b,x);return}}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+x)}function I(b,x){const U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){se(U,b,x);return}else b.isExternalTexture&&(U.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+x)}function z(b,x){const U=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){se(U,b,x);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+x)}function q(b,x){const U=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&U.__version!==b.version){pe(U,b,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+x)}const Q={[oc]:n.REPEAT,[Ci]:n.CLAMP_TO_EDGE,[ac]:n.MIRRORED_REPEAT},me={[Ft]:n.NEAREST,[J0]:n.NEAREST_MIPMAP_NEAREST,[po]:n.NEAREST_MIPMAP_LINEAR,[Jt]:n.LINEAR,[nl]:n.LINEAR_MIPMAP_NEAREST,[vs]:n.LINEAR_MIPMAP_LINEAR},_e={[t_]:n.NEVER,[o_]:n.ALWAYS,[n_]:n.LESS,[ph]:n.LEQUAL,[i_]:n.EQUAL,[mh]:n.GEQUAL,[s_]:n.GREATER,[r_]:n.NOTEQUAL};function ie(b,x){if(x.type===zn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Jt||x.magFilter===nl||x.magFilter===po||x.magFilter===vs||x.minFilter===Jt||x.minFilter===nl||x.minFilter===po||x.minFilter===vs)&&Xe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,Q[x.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,Q[x.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,Q[x.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,me[x.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,me[x.minFilter]),x.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,_e[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Ft||x.minFilter!==po&&x.minFilter!==vs||x.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Ge(b,x){let U=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",C));const Y=x.source;let ee=u.get(Y);ee===void 0&&(ee={},u.set(Y,ee));const j=B(x);if(j!==b.__cacheKey){ee[j]===void 0&&(ee[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),ee[j].usedTimes++;const Se=ee[b.__cacheKey];Se!==void 0&&(ee[b.__cacheKey].usedTimes--,Se.usedTimes===0&&T(x)),b.__cacheKey=j,b.__webglTexture=ee[j].texture}return U}function at(b,x,U){return Math.floor(Math.floor(b/U)/x)}function lt(b,x,U,Y){const j=b.updateRanges;if(j.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,U,Y,x.data);else{j.sort((ue,ge)=>ue.start-ge.start);let Se=0;for(let ue=1;ue<j.length;ue++){const ge=j[Se],Me=j[ue],Ce=ge.start+ge.count,Re=at(Me.start,x.width,4),$e=at(ge.start,x.width,4);Me.start<=Ce+1&&Re===$e&&at(Me.start+Me.count-1,x.width,4)===Re?ge.count=Math.max(ge.count,Me.start+Me.count-ge.start):(++Se,j[Se]=Me)}j.length=Se+1;const de=n.getParameter(n.UNPACK_ROW_LENGTH),De=n.getParameter(n.UNPACK_SKIP_PIXELS),Ue=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ue=0,ge=j.length;ue<ge;ue++){const Me=j[ue],Ce=Math.floor(Me.start/4),Re=Math.ceil(Me.count/4),$e=Ce%x.width,V=Math.floor(Ce/x.width),ye=Re,ve=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,$e),n.pixelStorei(n.UNPACK_SKIP_ROWS,V),t.texSubImage2D(n.TEXTURE_2D,0,$e,V,ye,ve,U,Y,x.data)}b.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,de),n.pixelStorei(n.UNPACK_SKIP_PIXELS,De),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ue)}}function se(b,x,U){let Y=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=n.TEXTURE_3D);const ee=Ge(b,x),j=x.source;t.bindTexture(Y,b.__webglTexture,n.TEXTURE0+U);const Se=i.get(j);if(j.version!==Se.__version||ee===!0){t.activeTexture(n.TEXTURE0+U);const de=st.getPrimaries(st.workingColorSpace),De=x.colorSpace===$i?null:st.getPrimaries(x.colorSpace),Ue=x.colorSpace===$i||de===De?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let ue=v(x.image,!1,s.maxTextureSize);ue=re(x,ue);const ge=r.convert(x.format,x.colorSpace),Me=r.convert(x.type);let Ce=E(x.internalFormat,ge,Me,x.colorSpace,x.isVideoTexture);ie(Y,x);let Re;const $e=x.mipmaps,V=x.isVideoTexture!==!0,ye=Se.__version===void 0||ee===!0,ve=j.dataReady,Ie=A(x,ue);if(x.isDepthTexture)Ce=S(x.format===xs,x.type),ye&&(V?t.texStorage2D(n.TEXTURE_2D,1,Ce,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,Ce,ue.width,ue.height,0,ge,Me,null));else if(x.isDataTexture)if($e.length>0){V&&ye&&t.texStorage2D(n.TEXTURE_2D,Ie,Ce,$e[0].width,$e[0].height);for(let fe=0,te=$e.length;fe<te;fe++)Re=$e[fe],V?ve&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,Re.width,Re.height,ge,Me,Re.data):t.texImage2D(n.TEXTURE_2D,fe,Ce,Re.width,Re.height,0,ge,Me,Re.data);x.generateMipmaps=!1}else V?(ye&&t.texStorage2D(n.TEXTURE_2D,Ie,Ce,ue.width,ue.height),ve&&lt(x,ue,ge,Me)):t.texImage2D(n.TEXTURE_2D,0,Ce,ue.width,ue.height,0,ge,Me,ue.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){V&&ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ie,Ce,$e[0].width,$e[0].height,ue.depth);for(let fe=0,te=$e.length;fe<te;fe++)if(Re=$e[fe],x.format!==Hn)if(ge!==null)if(V){if(ve)if(x.layerUpdates.size>0){const Ne=Zu(Re.width,Re.height,x.format,x.type);for(const je of x.layerUpdates){const Mt=Re.data.subarray(je*Ne/Re.data.BYTES_PER_ELEMENT,(je+1)*Ne/Re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,je,Re.width,Re.height,1,ge,Mt)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,Re.width,Re.height,ue.depth,ge,Re.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,fe,Ce,Re.width,Re.height,ue.depth,0,Re.data,0,0);else Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else V?ve&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,Re.width,Re.height,ue.depth,ge,Me,Re.data):t.texImage3D(n.TEXTURE_2D_ARRAY,fe,Ce,Re.width,Re.height,ue.depth,0,ge,Me,Re.data)}else{V&&ye&&t.texStorage2D(n.TEXTURE_2D,Ie,Ce,$e[0].width,$e[0].height);for(let fe=0,te=$e.length;fe<te;fe++)Re=$e[fe],x.format!==Hn?ge!==null?V?ve&&t.compressedTexSubImage2D(n.TEXTURE_2D,fe,0,0,Re.width,Re.height,ge,Re.data):t.compressedTexImage2D(n.TEXTURE_2D,fe,Ce,Re.width,Re.height,0,Re.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):V?ve&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,Re.width,Re.height,ge,Me,Re.data):t.texImage2D(n.TEXTURE_2D,fe,Ce,Re.width,Re.height,0,ge,Me,Re.data)}else if(x.isDataArrayTexture)if(V){if(ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ie,Ce,ue.width,ue.height,ue.depth),ve)if(x.layerUpdates.size>0){const fe=Zu(ue.width,ue.height,x.format,x.type);for(const te of x.layerUpdates){const Ne=ue.data.subarray(te*fe/ue.data.BYTES_PER_ELEMENT,(te+1)*fe/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,te,ue.width,ue.height,1,ge,Me,Ne)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,ge,Me,ue.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,ue.width,ue.height,ue.depth,0,ge,Me,ue.data);else if(x.isData3DTexture)V?(ye&&t.texStorage3D(n.TEXTURE_3D,Ie,Ce,ue.width,ue.height,ue.depth),ve&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,ge,Me,ue.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,ue.width,ue.height,ue.depth,0,ge,Me,ue.data);else if(x.isFramebufferTexture){if(ye)if(V)t.texStorage2D(n.TEXTURE_2D,Ie,Ce,ue.width,ue.height);else{let fe=ue.width,te=ue.height;for(let Ne=0;Ne<Ie;Ne++)t.texImage2D(n.TEXTURE_2D,Ne,Ce,fe,te,0,ge,Me,null),fe>>=1,te>>=1}}else if($e.length>0){if(V&&ye){const fe=ce($e[0]);t.texStorage2D(n.TEXTURE_2D,Ie,Ce,fe.width,fe.height)}for(let fe=0,te=$e.length;fe<te;fe++)Re=$e[fe],V?ve&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,ge,Me,Re):t.texImage2D(n.TEXTURE_2D,fe,Ce,ge,Me,Re);x.generateMipmaps=!1}else if(V){if(ye){const fe=ce(ue);t.texStorage2D(n.TEXTURE_2D,Ie,Ce,fe.width,fe.height)}ve&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,Me,ue)}else t.texImage2D(n.TEXTURE_2D,0,Ce,ge,Me,ue);p(x)&&m(Y),Se.__version=j.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function pe(b,x,U){if(x.image.length!==6)return;const Y=Ge(b,x),ee=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+U);const j=i.get(ee);if(ee.version!==j.__version||Y===!0){t.activeTexture(n.TEXTURE0+U);const Se=st.getPrimaries(st.workingColorSpace),de=x.colorSpace===$i?null:st.getPrimaries(x.colorSpace),De=x.colorSpace===$i||Se===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const Ue=x.isCompressedTexture||x.image[0].isCompressedTexture,ue=x.image[0]&&x.image[0].isDataTexture,ge=[];for(let te=0;te<6;te++)!Ue&&!ue?ge[te]=v(x.image[te],!0,s.maxCubemapSize):ge[te]=ue?x.image[te].image:x.image[te],ge[te]=re(x,ge[te]);const Me=ge[0],Ce=r.convert(x.format,x.colorSpace),Re=r.convert(x.type),$e=E(x.internalFormat,Ce,Re,x.colorSpace),V=x.isVideoTexture!==!0,ye=j.__version===void 0||Y===!0,ve=ee.dataReady;let Ie=A(x,Me);ie(n.TEXTURE_CUBE_MAP,x);let fe;if(Ue){V&&ye&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,$e,Me.width,Me.height);for(let te=0;te<6;te++){fe=ge[te].mipmaps;for(let Ne=0;Ne<fe.length;Ne++){const je=fe[Ne];x.format!==Hn?Ce!==null?V?ve&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne,0,0,je.width,je.height,Ce,je.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne,$e,je.width,je.height,0,je.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne,0,0,je.width,je.height,Ce,Re,je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne,$e,je.width,je.height,0,Ce,Re,je.data)}}}else{if(fe=x.mipmaps,V&&ye){fe.length>0&&Ie++;const te=ce(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,$e,te.width,te.height)}for(let te=0;te<6;te++)if(ue){V?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ge[te].width,ge[te].height,Ce,Re,ge[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,$e,ge[te].width,ge[te].height,0,Ce,Re,ge[te].data);for(let Ne=0;Ne<fe.length;Ne++){const Mt=fe[Ne].image[te].image;V?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne+1,0,0,Mt.width,Mt.height,Ce,Re,Mt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne+1,$e,Mt.width,Mt.height,0,Ce,Re,Mt.data)}}else{V?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ce,Re,ge[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,$e,Ce,Re,ge[te]);for(let Ne=0;Ne<fe.length;Ne++){const je=fe[Ne];V?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne+1,0,0,Ce,Re,je.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne+1,$e,Ce,Re,je.image[te])}}}p(x)&&m(n.TEXTURE_CUBE_MAP),j.__version=ee.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function xe(b,x,U,Y,ee,j){const Se=r.convert(U.format,U.colorSpace),de=r.convert(U.type),De=E(U.internalFormat,Se,de,U.colorSpace),Ue=i.get(x),ue=i.get(U);if(ue.__renderTarget=x,!Ue.__hasExternalTextures){const ge=Math.max(1,x.width>>j),Me=Math.max(1,x.height>>j);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,j,De,ge,Me,x.depth,0,Se,de,null):t.texImage2D(ee,j,De,ge,Me,0,Se,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),he(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,ee,ue.__webglTexture,0,R(x)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,ee,ue.__webglTexture,j),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ye(b,x,U){if(n.bindRenderbuffer(n.RENDERBUFFER,b),x.depthBuffer){const Y=x.depthTexture,ee=Y&&Y.isDepthTexture?Y.type:null,j=S(x.stencilBuffer,ee),Se=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;he(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,R(x),j,x.width,x.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,R(x),j,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,j,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Se,n.RENDERBUFFER,b)}else{const Y=x.textures;for(let ee=0;ee<Y.length;ee++){const j=Y[ee],Se=r.convert(j.format,j.colorSpace),de=r.convert(j.type),De=E(j.internalFormat,Se,de,j.colorSpace);he(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,R(x),De,x.width,x.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,R(x),De,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,De,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ve(b,x,U){const Y=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=i.get(x.depthTexture);if(ee.__renderTarget=x,(!ee.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),ee.__webglTexture===void 0){ee.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),ie(n.TEXTURE_CUBE_MAP,x.depthTexture);const Ue=r.convert(x.depthTexture.format),ue=r.convert(x.depthTexture.type);let ge;x.depthTexture.format===Fi?ge=n.DEPTH_COMPONENT24:x.depthTexture.format===xs&&(ge=n.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,ge,x.width,x.height,0,Ue,ue,null)}}else F(x.depthTexture,0);const j=ee.__webglTexture,Se=R(x),de=Y?n.TEXTURE_CUBE_MAP_POSITIVE_X+U:n.TEXTURE_2D,De=x.depthTexture.format===xs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Fi)he(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,De,de,j,0,Se):n.framebufferTexture2D(n.FRAMEBUFFER,De,de,j,0);else if(x.depthTexture.format===xs)he(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,De,de,j,0,Se):n.framebufferTexture2D(n.FRAMEBUFFER,De,de,j,0);else throw new Error("Unknown depthTexture format")}function ke(b){const x=i.get(b),U=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const Y=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){const ee=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",ee)};Y.addEventListener("dispose",ee),x.__depthDisposeCallback=ee}x.__boundDepthTexture=Y}if(b.depthTexture&&!x.__autoAllocateDepthBuffer)if(U)for(let Y=0;Y<6;Y++)Ve(x.__webglFramebuffer[Y],b,Y);else{const Y=b.texture.mipmaps;Y&&Y.length>0?Ve(x.__webglFramebuffer[0],b,0):Ve(x.__webglFramebuffer,b,0)}else if(U){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=n.createRenderbuffer(),Ye(x.__webglDepthbuffer[Y],b,!1);else{const ee=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,j)}}else{const Y=b.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Ye(x.__webglDepthbuffer,b,!1);else{const ee=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,j)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function N(b,x,U){const Y=i.get(b);x!==void 0&&xe(Y.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&ke(b)}function O(b){const x=b.texture,U=i.get(b),Y=i.get(x);b.addEventListener("dispose",P);const ee=b.textures,j=b.isWebGLCubeRenderTarget===!0,Se=ee.length>1;if(Se||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=x.version,o.memory.textures++),j){U.__webglFramebuffer=[];for(let de=0;de<6;de++)if(x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer[de]=[];for(let De=0;De<x.mipmaps.length;De++)U.__webglFramebuffer[de][De]=n.createFramebuffer()}else U.__webglFramebuffer[de]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){U.__webglFramebuffer=[];for(let de=0;de<x.mipmaps.length;de++)U.__webglFramebuffer[de]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(Se)for(let de=0,De=ee.length;de<De;de++){const Ue=i.get(ee[de]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&he(b)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let de=0;de<ee.length;de++){const De=ee[de];U.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[de]);const Ue=r.convert(De.format,De.colorSpace),ue=r.convert(De.type),ge=E(De.internalFormat,Ue,ue,De.colorSpace,b.isXRRenderTarget===!0),Me=R(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,ge,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,U.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Ye(U.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),ie(n.TEXTURE_CUBE_MAP,x);for(let de=0;de<6;de++)if(x.mipmaps&&x.mipmaps.length>0)for(let De=0;De<x.mipmaps.length;De++)xe(U.__webglFramebuffer[de][De],b,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,De);else xe(U.__webglFramebuffer[de],b,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);p(x)&&m(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){for(let de=0,De=ee.length;de<De;de++){const Ue=ee[de],ue=i.get(Ue);let ge=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ge=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,ue.__webglTexture),ie(ge,Ue),xe(U.__webglFramebuffer,b,Ue,n.COLOR_ATTACHMENT0+de,ge,0),p(Ue)&&m(ge)}t.unbindTexture()}else{let de=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(de=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,Y.__webglTexture),ie(de,x),x.mipmaps&&x.mipmaps.length>0)for(let De=0;De<x.mipmaps.length;De++)xe(U.__webglFramebuffer[De],b,x,n.COLOR_ATTACHMENT0,de,De);else xe(U.__webglFramebuffer,b,x,n.COLOR_ATTACHMENT0,de,0);p(x)&&m(de),t.unbindTexture()}b.depthBuffer&&ke(b)}function X(b){const x=b.textures;for(let U=0,Y=x.length;U<Y;U++){const ee=x[U];if(p(ee)){const j=_(b),Se=i.get(ee).__webglTexture;t.bindTexture(j,Se),m(j),t.unbindTexture()}}}const oe=[],Z=[];function ae(b){if(b.samples>0){if(he(b)===!1){const x=b.textures,U=b.width,Y=b.height;let ee=n.COLOR_BUFFER_BIT;const j=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Se=i.get(b),de=x.length>1;if(de)for(let Ue=0;Ue<x.length;Ue++)t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const De=b.texture.mipmaps;De&&De.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let Ue=0;Ue<x.length;Ue++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),de){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Se.__webglColorRenderbuffer[Ue]);const ue=i.get(x[Ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,U,Y,0,0,U,Y,ee,n.NEAREST),l===!0&&(oe.length=0,Z.length=0,oe.push(n.COLOR_ATTACHMENT0+Ue),b.depthBuffer&&b.resolveDepthBuffer===!1&&(oe.push(j),Z.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Z)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,oe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let Ue=0;Ue<x.length;Ue++){t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,Se.__webglColorRenderbuffer[Ue]);const ue=i.get(x[Ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Se.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const x=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function R(b){return Math.min(s.maxSamples,b.samples)}function he(b){const x=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function le(b){const x=o.render.frame;h.get(b)!==x&&(h.set(b,x),b.update())}function re(b,x){const U=b.colorSpace,Y=b.format,ee=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||U!==dr&&U!==$i&&(st.getTransfer(U)===dt?(Y!==Hn||ee!==Sn)&&Xe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",U)),x}function ce(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=H,this.setTexture2D=F,this.setTexture2DArray=I,this.setTexture3D=z,this.setTextureCube=q,this.rebindTextures=N,this.setupRenderTarget=O,this.updateRenderTargetMipmap=X,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=he,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function UM(n,e){function t(i,s=$i){let r;const o=st.getTransfer(s);if(i===Sn)return n.UNSIGNED_BYTE;if(i===ch)return n.UNSIGNED_SHORT_4_4_4_4;if(i===hh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===dp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===fp)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===hp)return n.BYTE;if(i===up)return n.SHORT;if(i===$r)return n.UNSIGNED_SHORT;if(i===lh)return n.INT;if(i===ai)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===Ni)return n.HALF_FLOAT;if(i===pp)return n.ALPHA;if(i===mp)return n.RGB;if(i===Hn)return n.RGBA;if(i===Fi)return n.DEPTH_COMPONENT;if(i===xs)return n.DEPTH_STENCIL;if(i===Fa)return n.RED;if(i===uh)return n.RED_INTEGER;if(i===ur)return n.RG;if(i===dh)return n.RG_INTEGER;if(i===fh)return n.RGBA_INTEGER;if(i===Qo||i===ea||i===ta||i===na)if(o===dt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Qo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Qo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ta)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===na)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===lc||i===cc||i===hc||i===uc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===lc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===cc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===hc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===uc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===dc||i===fc||i===pc||i===mc||i===gc||i===_c||i===vc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===dc||i===fc)return o===dt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===pc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===mc)return r.COMPRESSED_R11_EAC;if(i===gc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===_c)return r.COMPRESSED_RG11_EAC;if(i===vc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===xc||i===yc||i===Sc||i===Mc||i===Ec||i===bc||i===wc||i===Tc||i===Ac||i===Cc||i===Rc||i===Pc||i===Dc||i===Ic)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===xc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===yc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Sc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Mc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ec)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===bc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===wc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Tc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ac)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Cc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Rc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Pc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Dc)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ic)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Lc||i===Nc||i===Fc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Lc)return o===dt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Nc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Fc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Uc||i===Oc||i===Bc||i===zc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Uc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Oc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Bc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===zc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Kr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const OM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,BM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class zM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Ep(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new ci({vertexShader:OM,fragmentShader:BM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Zt(new Ua(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class HM extends ws{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",p=new zM,m={},_=t.getContextAttributes();let E=null,S=null;const A=[],C=[],P=new qe;let y=null;const T=new yn;T.viewport=new Tt;const G=new yn;G.viewport=new Tt;const D=[T,G],H=new K_;let L=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let pe=A[se];return pe===void 0&&(pe=new cl,A[se]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(se){let pe=A[se];return pe===void 0&&(pe=new cl,A[se]=pe),pe.getGripSpace()},this.getHand=function(se){let pe=A[se];return pe===void 0&&(pe=new cl,A[se]=pe),pe.getHandSpace()};function F(se){const pe=C.indexOf(se.inputSource);if(pe===-1)return;const xe=A[pe];xe!==void 0&&(xe.update(se.inputSource,se.frame,c||o),xe.dispatchEvent({type:se.type,data:se.inputSource}))}function I(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",I),s.removeEventListener("inputsourceschange",z);for(let se=0;se<A.length;se++){const pe=C[se];pe!==null&&(C[se]=null,A[se].disconnect(pe))}L=null,B=null,p.reset();for(const se in m)delete m[se];e.setRenderTarget(E),f=null,u=null,d=null,s=null,S=null,lt.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){r=se,i.isPresenting===!0&&Xe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){a=se,i.isPresenting===!0&&Xe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(se){c=se},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(se){if(s=se,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",I),s.addEventListener("inputsourceschange",z),_.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Ye=null,Ve=null;_.depth&&(Ve=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=_.stencil?xs:Fi,Ye=_.stencil?Kr:ai);const ke={colorFormat:t.RGBA8,depthFormat:Ve,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(ke),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),S=new si(u.textureWidth,u.textureHeight,{format:Hn,type:Sn,depthTexture:new Jr(u.textureWidth,u.textureHeight,Ye,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const xe={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,xe),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new si(f.framebufferWidth,f.framebufferHeight,{format:Hn,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),lt.setContext(s),lt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function z(se){for(let pe=0;pe<se.removed.length;pe++){const xe=se.removed[pe],Ye=C.indexOf(xe);Ye>=0&&(C[Ye]=null,A[Ye].disconnect(xe))}for(let pe=0;pe<se.added.length;pe++){const xe=se.added[pe];let Ye=C.indexOf(xe);if(Ye===-1){for(let ke=0;ke<A.length;ke++)if(ke>=C.length){C.push(xe),Ye=ke;break}else if(C[ke]===null){C[ke]=xe,Ye=ke;break}if(Ye===-1)break}const Ve=A[Ye];Ve&&Ve.connect(xe)}}const q=new W,Q=new W;function me(se,pe,xe){q.setFromMatrixPosition(pe.matrixWorld),Q.setFromMatrixPosition(xe.matrixWorld);const Ye=q.distanceTo(Q),Ve=pe.projectionMatrix.elements,ke=xe.projectionMatrix.elements,N=Ve[14]/(Ve[10]-1),O=Ve[14]/(Ve[10]+1),X=(Ve[9]+1)/Ve[5],oe=(Ve[9]-1)/Ve[5],Z=(Ve[8]-1)/Ve[0],ae=(ke[8]+1)/ke[0],R=N*Z,he=N*ae,le=Ye/(-Z+ae),re=le*-Z;if(pe.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(re),se.translateZ(le),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),Ve[10]===-1)se.projectionMatrix.copy(pe.projectionMatrix),se.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const ce=N+le,b=O+le,x=R-re,U=he+(Ye-re),Y=X*O/b*ce,ee=oe*O/b*ce;se.projectionMatrix.makePerspective(x,U,Y,ee,ce,b),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function _e(se,pe){pe===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(pe.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(s===null)return;let pe=se.near,xe=se.far;p.texture!==null&&(p.depthNear>0&&(pe=p.depthNear),p.depthFar>0&&(xe=p.depthFar)),H.near=G.near=T.near=pe,H.far=G.far=T.far=xe,(L!==H.near||B!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),L=H.near,B=H.far),H.layers.mask=se.layers.mask|6,T.layers.mask=H.layers.mask&-5,G.layers.mask=H.layers.mask&-3;const Ye=se.parent,Ve=H.cameras;_e(H,Ye);for(let ke=0;ke<Ve.length;ke++)_e(Ve[ke],Ye);Ve.length===2?me(H,T,G):H.projectionMatrix.copy(T.projectionMatrix),ie(se,H,Ye)};function ie(se,pe,xe){xe===null?se.matrix.copy(pe.matrixWorld):(se.matrix.copy(xe.matrixWorld),se.matrix.invert(),se.matrix.multiply(pe.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(pe.projectionMatrix),se.projectionMatrixInverse.copy(pe.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=Hc*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(se){l=se,u!==null&&(u.fixedFoveation=se),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=se)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(H)},this.getCameraTexture=function(se){return m[se]};let Ge=null;function at(se,pe){if(h=pe.getViewerPose(c||o),g=pe,h!==null){const xe=h.views;f!==null&&(e.setRenderTargetFramebuffer(S,f.framebuffer),e.setRenderTarget(S));let Ye=!1;xe.length!==H.cameras.length&&(H.cameras.length=0,Ye=!0);for(let O=0;O<xe.length;O++){const X=xe[O];let oe=null;if(f!==null)oe=f.getViewport(X);else{const ae=d.getViewSubImage(u,X);oe=ae.viewport,O===0&&(e.setRenderTargetTextures(S,ae.colorTexture,ae.depthStencilTexture),e.setRenderTarget(S))}let Z=D[O];Z===void 0&&(Z=new yn,Z.layers.enable(O),Z.viewport=new Tt,D[O]=Z),Z.matrix.fromArray(X.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(X.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(oe.x,oe.y,oe.width,oe.height),O===0&&(H.matrix.copy(Z.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Ye===!0&&H.cameras.push(Z)}const Ve=s.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=i.getBinding();const O=d.getDepthInformation(xe[0]);O&&O.isValid&&O.texture&&p.init(O,s.renderState)}if(Ve&&Ve.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let O=0;O<xe.length;O++){const X=xe[O].camera;if(X){let oe=m[X];oe||(oe=new Ep,m[X]=oe);const Z=d.getCameraImage(X);oe.sourceTexture=Z}}}}for(let xe=0;xe<A.length;xe++){const Ye=C[xe],Ve=A[xe];Ye!==null&&Ve!==void 0&&Ve.update(Ye,pe,c||o)}Ge&&Ge(se,pe),pe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pe}),g=null}const lt=new Ap;lt.setAnimationLoop(at),this.setAnimationLoop=function(se){Ge=se},this.dispose=function(){}}}const hs=new li,VM=new vt;function GM(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,bp(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,_,E,S){m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),d(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),u(p,m),m.isMeshPhysicalMaterial&&f(p,m,S)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),v(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,_,E):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===ln&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===ln&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const _=e.get(m),E=_.envMap,S=_.envMapRotation;E&&(p.envMap.value=E,hs.copy(S),hs.x*=-1,hs.y*=-1,hs.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),p.envMapRotation.value.setFromMatrix4(VM.makeRotationFromEuler(hs)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,_,E){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*_,p.scale.value=E*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function u(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,_){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===ln&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const _=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function kM(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,E){const S=E.program;i.uniformBlockBinding(_,S)}function c(_,E){let S=s[_.id];S===void 0&&(g(_),S=h(_),s[_.id]=S,_.addEventListener("dispose",p));const A=E.program;i.updateUBOMapping(_,A);const C=e.render.frame;r[_.id]!==C&&(u(_),r[_.id]=C)}function h(_){const E=d();_.__bindingPointIndex=E;const S=n.createBuffer(),A=_.__size,C=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,A,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,S),S}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const E=s[_.id],S=_.uniforms,A=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let C=0,P=S.length;C<P;C++){const y=Array.isArray(S[C])?S[C]:[S[C]];for(let T=0,G=y.length;T<G;T++){const D=y[T];if(f(D,C,T,A)===!0){const H=D.__offset,L=Array.isArray(D.value)?D.value:[D.value];let B=0;for(let F=0;F<L.length;F++){const I=L[F],z=v(I);typeof I=="number"||typeof I=="boolean"?(D.__data[0]=I,n.bufferSubData(n.UNIFORM_BUFFER,H+B,D.__data)):I.isMatrix3?(D.__data[0]=I.elements[0],D.__data[1]=I.elements[1],D.__data[2]=I.elements[2],D.__data[3]=0,D.__data[4]=I.elements[3],D.__data[5]=I.elements[4],D.__data[6]=I.elements[5],D.__data[7]=0,D.__data[8]=I.elements[6],D.__data[9]=I.elements[7],D.__data[10]=I.elements[8],D.__data[11]=0):(I.toArray(D.__data,B),B+=z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,H,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(_,E,S,A){const C=_.value,P=E+"_"+S;if(A[P]===void 0)return typeof C=="number"||typeof C=="boolean"?A[P]=C:A[P]=C.clone(),!0;{const y=A[P];if(typeof C=="number"||typeof C=="boolean"){if(y!==C)return A[P]=C,!0}else if(y.equals(C)===!1)return y.copy(C),!0}return!1}function g(_){const E=_.uniforms;let S=0;const A=16;for(let P=0,y=E.length;P<y;P++){const T=Array.isArray(E[P])?E[P]:[E[P]];for(let G=0,D=T.length;G<D;G++){const H=T[G],L=Array.isArray(H.value)?H.value:[H.value];for(let B=0,F=L.length;B<F;B++){const I=L[B],z=v(I),q=S%A,Q=q%z.boundary,me=q+Q;S+=Q,me!==0&&A-me<z.storage&&(S+=A-me),H.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=S,S+=z.storage}}}const C=S%A;return C>0&&(S+=A-C),_.__size=S,_.__cache={},this}function v(_){const E={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(E.boundary=4,E.storage=4):_.isVector2?(E.boundary=8,E.storage=8):_.isVector3||_.isColor?(E.boundary=16,E.storage=12):_.isVector4?(E.boundary=16,E.storage=16):_.isMatrix3?(E.boundary=48,E.storage=48):_.isMatrix4?(E.boundary=64,E.storage=64):_.isTexture?Xe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Xe("WebGLRenderer: Unsupported uniform value type.",_),E}function p(_){const E=_.target;E.removeEventListener("dispose",p);const S=o.indexOf(E.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function m(){for(const _ in s)n.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}const WM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let jn=null;function XM(){return jn===null&&(jn=new xh(WM,16,16,ur,Ni),jn.name="DFG_LUT",jn.minFilter=Jt,jn.magFilter=Jt,jn.wrapS=Ci,jn.wrapT=Ci,jn.generateMipmaps=!1,jn.needsUpdate=!0),jn}class qM{constructor(e={}){const{canvas:t=l_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Sn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const v=f,p=new Set([fh,dh,uh]),m=new Set([Sn,ai,$r,Kr,ch,hh]),_=new Uint32Array(4),E=new Int32Array(4);let S=null,A=null;const C=[],P=[];let y=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let G=!1;this._outputColorSpace=sn;let D=0,H=0,L=null,B=-1,F=null;const I=new Tt,z=new Tt;let q=null;const Q=new ot(0);let me=0,_e=t.width,ie=t.height,Ge=1,at=null,lt=null;const se=new Tt(0,0,_e,ie),pe=new Tt(0,0,_e,ie);let xe=!1;const Ye=new yh;let Ve=!1,ke=!1;const N=new vt,O=new W,X=new Tt,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Z=!1;function ae(){return L===null?Ge:1}let R=i;function he(w,k){return t.getContext(w,k)}try{const w={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${oh}`),t.addEventListener("webglcontextlost",Ne,!1),t.addEventListener("webglcontextrestored",je,!1),t.addEventListener("webglcontextcreationerror",Mt,!1),R===null){const k="webgl2";if(R=he(k,w),R===null)throw he(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw it("WebGLRenderer: "+w.message),w}let le,re,ce,b,x,U,Y,ee,j,Se,de,De,Ue,ue,ge,Me,Ce,Re,$e,V,ye,ve,Ie;function fe(){le=new qy(R),le.init(),ye=new UM(R,le),re=new By(R,le,e,ye),ce=new NM(R,le),re.reversedDepthBuffer&&u&&ce.buffers.depth.setReversed(!0),b=new $y(R),x=new yM,U=new FM(R,le,ce,x,re,ye,b),Y=new Xy(T),ee=new ev(R),ve=new Uy(R,ee),j=new Yy(R,ee,b,ve),Se=new Zy(R,j,ee,ve,b),Re=new Ky(R,re,U),ge=new zy(x),de=new xM(T,Y,le,re,ve,ge),De=new GM(T,x),Ue=new MM,ue=new CM(le),Ce=new Fy(T,Y,ce,Se,g,l),Me=new LM(T,Se,re),Ie=new kM(R,b,re,ce),$e=new Oy(R,le,b),V=new jy(R,le,b),b.programs=de.programs,T.capabilities=re,T.extensions=le,T.properties=x,T.renderLists=Ue,T.shadowMap=Me,T.state=ce,T.info=b}fe(),v!==Sn&&(y=new Qy(v,t.width,t.height,s,r));const te=new HM(T,R);this.xr=te,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const w=le.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=le.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Ge},this.setPixelRatio=function(w){w!==void 0&&(Ge=w,this.setSize(_e,ie,!1))},this.getSize=function(w){return w.set(_e,ie)},this.setSize=function(w,k,J=!0){if(te.isPresenting){Xe("WebGLRenderer: Can't change size while VR device is presenting.");return}_e=w,ie=k,t.width=Math.floor(w*Ge),t.height=Math.floor(k*Ge),J===!0&&(t.style.width=w+"px",t.style.height=k+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,w,k)},this.getDrawingBufferSize=function(w){return w.set(_e*Ge,ie*Ge).floor()},this.setDrawingBufferSize=function(w,k,J){_e=w,ie=k,Ge=J,t.width=Math.floor(w*J),t.height=Math.floor(k*J),this.setViewport(0,0,w,k)},this.setEffects=function(w){if(v===Sn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let k=0;k<w.length;k++)if(w[k].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(I)},this.getViewport=function(w){return w.copy(se)},this.setViewport=function(w,k,J,K){w.isVector4?se.set(w.x,w.y,w.z,w.w):se.set(w,k,J,K),ce.viewport(I.copy(se).multiplyScalar(Ge).round())},this.getScissor=function(w){return w.copy(pe)},this.setScissor=function(w,k,J,K){w.isVector4?pe.set(w.x,w.y,w.z,w.w):pe.set(w,k,J,K),ce.scissor(z.copy(pe).multiplyScalar(Ge).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(w){ce.setScissorTest(xe=w)},this.setOpaqueSort=function(w){at=w},this.setTransparentSort=function(w){lt=w},this.getClearColor=function(w){return w.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(w=!0,k=!0,J=!0){let K=0;if(w){let $=!1;if(L!==null){const we=L.texture.format;$=p.has(we)}if($){const we=L.texture.type,Pe=m.has(we),Te=Ce.getClearColor(),Fe=Ce.getClearAlpha(),Be=Te.r,Ke=Te.g,et=Te.b;Pe?(_[0]=Be,_[1]=Ke,_[2]=et,_[3]=Fe,R.clearBufferuiv(R.COLOR,0,_)):(E[0]=Be,E[1]=Ke,E[2]=et,E[3]=Fe,R.clearBufferiv(R.COLOR,0,E))}else K|=R.COLOR_BUFFER_BIT}k&&(K|=R.DEPTH_BUFFER_BIT),J&&(K|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&R.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ne,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",Mt,!1),Ce.dispose(),Ue.dispose(),ue.dispose(),x.dispose(),Y.dispose(),Se.dispose(),ve.dispose(),Ie.dispose(),de.dispose(),te.dispose(),te.removeEventListener("sessionstart",Ch),te.removeEventListener("sessionend",Rh),ts.stop()};function Ne(w){w.preventDefault(),Eu("WebGLRenderer: Context Lost."),G=!0}function je(){Eu("WebGLRenderer: Context Restored."),G=!1;const w=b.autoReset,k=Me.enabled,J=Me.autoUpdate,K=Me.needsUpdate,$=Me.type;fe(),b.autoReset=w,Me.enabled=k,Me.autoUpdate=J,Me.needsUpdate=K,Me.type=$}function Mt(w){it("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ut(w){const k=w.target;k.removeEventListener("dispose",ut),hi(k)}function hi(w){ui(w),x.remove(w)}function ui(w){const k=x.get(w).programs;k!==void 0&&(k.forEach(function(J){de.releaseProgram(J)}),w.isShaderMaterial&&de.releaseShaderCache(w))}this.renderBufferDirect=function(w,k,J,K,$,we){k===null&&(k=oe);const Pe=$.isMesh&&$.matrixWorld.determinant()<0,Te=Zp(w,k,J,K,$);ce.setMaterial(K,Pe);let Fe=J.index,Be=1;if(K.wireframe===!0){if(Fe=j.getWireframeAttribute(J),Fe===void 0)return;Be=2}const Ke=J.drawRange,et=J.attributes.position;let ze=Ke.start*Be,pt=(Ke.start+Ke.count)*Be;we!==null&&(ze=Math.max(ze,we.start*Be),pt=Math.min(pt,(we.start+we.count)*Be)),Fe!==null?(ze=Math.max(ze,0),pt=Math.min(pt,Fe.count)):et!=null&&(ze=Math.max(ze,0),pt=Math.min(pt,et.count));const At=pt-ze;if(At<0||At===1/0)return;ve.setup($,K,Te,J,Fe);let wt,mt=$e;if(Fe!==null&&(wt=ee.get(Fe),mt=V,mt.setIndex(wt)),$.isMesh)K.wireframe===!0?(ce.setLineWidth(K.wireframeLinewidth*ae()),mt.setMode(R.LINES)):mt.setMode(R.TRIANGLES);else if($.isLine){let Xt=K.linewidth;Xt===void 0&&(Xt=1),ce.setLineWidth(Xt*ae()),$.isLineSegments?mt.setMode(R.LINES):$.isLineLoop?mt.setMode(R.LINE_LOOP):mt.setMode(R.LINE_STRIP)}else $.isPoints?mt.setMode(R.POINTS):$.isSprite&&mt.setMode(R.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)_a("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),mt.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(le.get("WEBGL_multi_draw"))mt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const Xt=$._multiDrawStarts,Oe=$._multiDrawCounts,mn=$._multiDrawCount,rt=Fe?ee.get(Fe).bytesPerElement:1,Ln=x.get(K).currentProgram.getUniforms();for(let Xn=0;Xn<mn;Xn++)Ln.setValue(R,"_gl_DrawID",Xn),mt.render(Xt[Xn]/rt,Oe[Xn])}else if($.isInstancedMesh)mt.renderInstances(ze,At,$.count);else if(J.isInstancedBufferGeometry){const Xt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Oe=Math.min(J.instanceCount,Xt);mt.renderInstances(ze,At,Oe)}else mt.render(ze,At)};function Ah(w,k,J){w.transparent===!0&&w.side===Cn&&w.forceSinglePass===!1?(w.side=ln,w.needsUpdate=!0,co(w,k,J),w.side=es,w.needsUpdate=!0,co(w,k,J),w.side=Cn):co(w,k,J)}this.compile=function(w,k,J=null){J===null&&(J=w),A=ue.get(J),A.init(k),P.push(A),J.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(A.pushLight($),$.castShadow&&A.pushShadow($))}),w!==J&&w.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(A.pushLight($),$.castShadow&&A.pushShadow($))}),A.setupLights();const K=new Set;return w.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const we=$.material;if(we)if(Array.isArray(we))for(let Pe=0;Pe<we.length;Pe++){const Te=we[Pe];Ah(Te,J,$),K.add(Te)}else Ah(we,J,$),K.add(we)}),A=P.pop(),K},this.compileAsync=function(w,k,J=null){const K=this.compile(w,k,J);return new Promise($=>{function we(){if(K.forEach(function(Pe){x.get(Pe).currentProgram.isReady()&&K.delete(Pe)}),K.size===0){$(w);return}setTimeout(we,10)}le.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Ga=null;function Kp(w){Ga&&Ga(w)}function Ch(){ts.stop()}function Rh(){ts.start()}const ts=new Ap;ts.setAnimationLoop(Kp),typeof self<"u"&&ts.setContext(self),this.setAnimationLoop=function(w){Ga=w,te.setAnimationLoop(w),w===null?ts.stop():ts.start()},te.addEventListener("sessionstart",Ch),te.addEventListener("sessionend",Rh),this.render=function(w,k){if(k!==void 0&&k.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;const J=te.enabled===!0&&te.isPresenting===!0,K=y!==null&&(L===null||J)&&y.begin(T,L);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(te.cameraAutoUpdate===!0&&te.updateCamera(k),k=te.getCamera()),w.isScene===!0&&w.onBeforeRender(T,w,k,L),A=ue.get(w,P.length),A.init(k),P.push(A),N.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ye.setFromProjectionMatrix(N,ti,k.reversedDepth),ke=this.localClippingEnabled,Ve=ge.init(this.clippingPlanes,ke),S=Ue.get(w,C.length),S.init(),C.push(S),te.enabled===!0&&te.isPresenting===!0){const Pe=T.xr.getDepthSensingMesh();Pe!==null&&ka(Pe,k,-1/0,T.sortObjects)}ka(w,k,0,T.sortObjects),S.finish(),T.sortObjects===!0&&S.sort(at,lt),Z=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Z&&Ce.addToRenderList(S,w),this.info.render.frame++,Ve===!0&&ge.beginShadows();const $=A.state.shadowsArray;if(Me.render($,w,k),Ve===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),(K&&y.hasRenderPass())===!1){const Pe=S.opaque,Te=S.transmissive;if(A.setupLights(),k.isArrayCamera){const Fe=k.cameras;if(Te.length>0)for(let Be=0,Ke=Fe.length;Be<Ke;Be++){const et=Fe[Be];Dh(Pe,Te,w,et)}Z&&Ce.render(w);for(let Be=0,Ke=Fe.length;Be<Ke;Be++){const et=Fe[Be];Ph(S,w,et,et.viewport)}}else Te.length>0&&Dh(Pe,Te,w,k),Z&&Ce.render(w),Ph(S,w,k)}L!==null&&H===0&&(U.updateMultisampleRenderTarget(L),U.updateRenderTargetMipmap(L)),K&&y.end(T),w.isScene===!0&&w.onAfterRender(T,w,k),ve.resetDefaultState(),B=-1,F=null,P.pop(),P.length>0?(A=P[P.length-1],Ve===!0&&ge.setGlobalState(T.clippingPlanes,A.state.camera)):A=null,C.pop(),C.length>0?S=C[C.length-1]:S=null};function ka(w,k,J,K){if(w.visible===!1)return;if(w.layers.test(k.layers)){if(w.isGroup)J=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(k);else if(w.isLight)A.pushLight(w),w.castShadow&&A.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||Ye.intersectsSprite(w)){K&&X.setFromMatrixPosition(w.matrixWorld).applyMatrix4(N);const Pe=Se.update(w),Te=w.material;Te.visible&&S.push(w,Pe,Te,J,X.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||Ye.intersectsObject(w))){const Pe=Se.update(w),Te=w.material;if(K&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),X.copy(w.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),X.copy(Pe.boundingSphere.center)),X.applyMatrix4(w.matrixWorld).applyMatrix4(N)),Array.isArray(Te)){const Fe=Pe.groups;for(let Be=0,Ke=Fe.length;Be<Ke;Be++){const et=Fe[Be],ze=Te[et.materialIndex];ze&&ze.visible&&S.push(w,Pe,ze,J,X.z,et)}}else Te.visible&&S.push(w,Pe,Te,J,X.z,null)}}const we=w.children;for(let Pe=0,Te=we.length;Pe<Te;Pe++)ka(we[Pe],k,J,K)}function Ph(w,k,J,K){const{opaque:$,transmissive:we,transparent:Pe}=w;A.setupLightsView(J),Ve===!0&&ge.setGlobalState(T.clippingPlanes,J),K&&ce.viewport(I.copy(K)),$.length>0&&lo($,k,J),we.length>0&&lo(we,k,J),Pe.length>0&&lo(Pe,k,J),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function Dh(w,k,J,K){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[K.id]===void 0){const ze=le.has("EXT_color_buffer_half_float")||le.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[K.id]=new si(1,1,{generateMipmaps:!0,type:ze?Ni:Sn,minFilter:vs,samples:Math.max(4,re.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace})}const we=A.state.transmissionRenderTarget[K.id],Pe=K.viewport||I;we.setSize(Pe.z*T.transmissionResolutionScale,Pe.w*T.transmissionResolutionScale);const Te=T.getRenderTarget(),Fe=T.getActiveCubeFace(),Be=T.getActiveMipmapLevel();T.setRenderTarget(we),T.getClearColor(Q),me=T.getClearAlpha(),me<1&&T.setClearColor(16777215,.5),T.clear(),Z&&Ce.render(J);const Ke=T.toneMapping;T.toneMapping=ii;const et=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),A.setupLightsView(K),Ve===!0&&ge.setGlobalState(T.clippingPlanes,K),lo(w,J,K),U.updateMultisampleRenderTarget(we),U.updateRenderTargetMipmap(we),le.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let pt=0,At=k.length;pt<At;pt++){const wt=k[pt],{object:mt,geometry:Xt,material:Oe,group:mn}=wt;if(Oe.side===Cn&&mt.layers.test(K.layers)){const rt=Oe.side;Oe.side=ln,Oe.needsUpdate=!0,Ih(mt,J,K,Xt,Oe,mn),Oe.side=rt,Oe.needsUpdate=!0,ze=!0}}ze===!0&&(U.updateMultisampleRenderTarget(we),U.updateRenderTargetMipmap(we))}T.setRenderTarget(Te,Fe,Be),T.setClearColor(Q,me),et!==void 0&&(K.viewport=et),T.toneMapping=Ke}function lo(w,k,J){const K=k.isScene===!0?k.overrideMaterial:null;for(let $=0,we=w.length;$<we;$++){const Pe=w[$],{object:Te,geometry:Fe,group:Be}=Pe;let Ke=Pe.material;Ke.allowOverride===!0&&K!==null&&(Ke=K),Te.layers.test(J.layers)&&Ih(Te,k,J,Fe,Ke,Be)}}function Ih(w,k,J,K,$,we){w.onBeforeRender(T,k,J,K,$,we),w.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),$.onBeforeRender(T,k,J,K,w,we),$.transparent===!0&&$.side===Cn&&$.forceSinglePass===!1?($.side=ln,$.needsUpdate=!0,T.renderBufferDirect(J,k,K,$,w,we),$.side=es,$.needsUpdate=!0,T.renderBufferDirect(J,k,K,$,w,we),$.side=Cn):T.renderBufferDirect(J,k,K,$,w,we),w.onAfterRender(T,k,J,K,$,we)}function co(w,k,J){k.isScene!==!0&&(k=oe);const K=x.get(w),$=A.state.lights,we=A.state.shadowsArray,Pe=$.state.version,Te=de.getParameters(w,$.state,we,k,J),Fe=de.getProgramCacheKey(Te);let Be=K.programs;K.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?k.environment:null,K.fog=k.fog;const Ke=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;K.envMap=Y.get(w.envMap||K.environment,Ke),K.envMapRotation=K.environment!==null&&w.envMap===null?k.environmentRotation:w.envMapRotation,Be===void 0&&(w.addEventListener("dispose",ut),Be=new Map,K.programs=Be);let et=Be.get(Fe);if(et!==void 0){if(K.currentProgram===et&&K.lightsStateVersion===Pe)return Nh(w,Te),et}else Te.uniforms=de.getUniforms(w),w.onBeforeCompile(Te,T),et=de.acquireProgram(Te,Fe),Be.set(Fe,et),K.uniforms=Te.uniforms;const ze=K.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(ze.clippingPlanes=ge.uniform),Nh(w,Te),K.needsLights=Qp(w),K.lightsStateVersion=Pe,K.needsLights&&(ze.ambientLightColor.value=$.state.ambient,ze.lightProbe.value=$.state.probe,ze.directionalLights.value=$.state.directional,ze.directionalLightShadows.value=$.state.directionalShadow,ze.spotLights.value=$.state.spot,ze.spotLightShadows.value=$.state.spotShadow,ze.rectAreaLights.value=$.state.rectArea,ze.ltc_1.value=$.state.rectAreaLTC1,ze.ltc_2.value=$.state.rectAreaLTC2,ze.pointLights.value=$.state.point,ze.pointLightShadows.value=$.state.pointShadow,ze.hemisphereLights.value=$.state.hemi,ze.directionalShadowMatrix.value=$.state.directionalShadowMatrix,ze.spotLightMatrix.value=$.state.spotLightMatrix,ze.spotLightMap.value=$.state.spotLightMap,ze.pointShadowMatrix.value=$.state.pointShadowMatrix),K.currentProgram=et,K.uniformsList=null,et}function Lh(w){if(w.uniformsList===null){const k=w.currentProgram.getUniforms();w.uniformsList=sa.seqWithValue(k.seq,w.uniforms)}return w.uniformsList}function Nh(w,k){const J=x.get(w);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function Zp(w,k,J,K,$){k.isScene!==!0&&(k=oe),U.resetTextureUnits();const we=k.fog,Pe=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?k.environment:null,Te=L===null?T.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:dr,Fe=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Be=Y.get(K.envMap||Pe,Fe),Ke=K.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,et=!!J.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),ze=!!J.morphAttributes.position,pt=!!J.morphAttributes.normal,At=!!J.morphAttributes.color;let wt=ii;K.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(wt=T.toneMapping);const mt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Xt=mt!==void 0?mt.length:0,Oe=x.get(K),mn=A.state.lights;if(Ve===!0&&(ke===!0||w!==F)){const Bt=w===F&&K.id===B;ge.setState(K,w,Bt)}let rt=!1;K.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==mn.state.version||Oe.outputColorSpace!==Te||$.isBatchedMesh&&Oe.batching===!1||!$.isBatchedMesh&&Oe.batching===!0||$.isBatchedMesh&&Oe.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Oe.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Oe.instancing===!1||!$.isInstancedMesh&&Oe.instancing===!0||$.isSkinnedMesh&&Oe.skinning===!1||!$.isSkinnedMesh&&Oe.skinning===!0||$.isInstancedMesh&&Oe.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Oe.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Oe.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Oe.instancingMorph===!1&&$.morphTexture!==null||Oe.envMap!==Be||K.fog===!0&&Oe.fog!==we||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ge.numPlanes||Oe.numIntersection!==ge.numIntersection)||Oe.vertexAlphas!==Ke||Oe.vertexTangents!==et||Oe.morphTargets!==ze||Oe.morphNormals!==pt||Oe.morphColors!==At||Oe.toneMapping!==wt||Oe.morphTargetsCount!==Xt)&&(rt=!0):(rt=!0,Oe.__version=K.version);let Ln=Oe.currentProgram;rt===!0&&(Ln=co(K,k,$));let Xn=!1,ns=!1,As=!1;const yt=Ln.getUniforms(),Vt=Oe.uniforms;if(ce.useProgram(Ln.program)&&(Xn=!0,ns=!0,As=!0),K.id!==B&&(B=K.id,ns=!0),Xn||F!==w){ce.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),yt.setValue(R,"projectionMatrix",w.projectionMatrix),yt.setValue(R,"viewMatrix",w.matrixWorldInverse);const Bi=yt.map.cameraPosition;Bi!==void 0&&Bi.setValue(R,O.setFromMatrixPosition(w.matrixWorld)),re.logarithmicDepthBuffer&&yt.setValue(R,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&yt.setValue(R,"isOrthographic",w.isOrthographicCamera===!0),F!==w&&(F=w,ns=!0,As=!0)}if(Oe.needsLights&&(mn.state.directionalShadowMap.length>0&&yt.setValue(R,"directionalShadowMap",mn.state.directionalShadowMap,U),mn.state.spotShadowMap.length>0&&yt.setValue(R,"spotShadowMap",mn.state.spotShadowMap,U),mn.state.pointShadowMap.length>0&&yt.setValue(R,"pointShadowMap",mn.state.pointShadowMap,U)),$.isSkinnedMesh){yt.setOptional(R,$,"bindMatrix"),yt.setOptional(R,$,"bindMatrixInverse");const Bt=$.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),yt.setValue(R,"boneTexture",Bt.boneTexture,U))}$.isBatchedMesh&&(yt.setOptional(R,$,"batchingTexture"),yt.setValue(R,"batchingTexture",$._matricesTexture,U),yt.setOptional(R,$,"batchingIdTexture"),yt.setValue(R,"batchingIdTexture",$._indirectTexture,U),yt.setOptional(R,$,"batchingColorTexture"),$._colorsTexture!==null&&yt.setValue(R,"batchingColorTexture",$._colorsTexture,U));const Oi=J.morphAttributes;if((Oi.position!==void 0||Oi.normal!==void 0||Oi.color!==void 0)&&Re.update($,J,Ln),(ns||Oe.receiveShadow!==$.receiveShadow)&&(Oe.receiveShadow=$.receiveShadow,yt.setValue(R,"receiveShadow",$.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&k.environment!==null&&(Vt.envMapIntensity.value=k.environmentIntensity),Vt.dfgLUT!==void 0&&(Vt.dfgLUT.value=XM()),ns&&(yt.setValue(R,"toneMappingExposure",T.toneMappingExposure),Oe.needsLights&&Jp(Vt,As),we&&K.fog===!0&&De.refreshFogUniforms(Vt,we),De.refreshMaterialUniforms(Vt,K,Ge,ie,A.state.transmissionRenderTarget[w.id]),sa.upload(R,Lh(Oe),Vt,U)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(sa.upload(R,Lh(Oe),Vt,U),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&yt.setValue(R,"center",$.center),yt.setValue(R,"modelViewMatrix",$.modelViewMatrix),yt.setValue(R,"normalMatrix",$.normalMatrix),yt.setValue(R,"modelMatrix",$.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const Bt=K.uniformsGroups;for(let Bi=0,Cs=Bt.length;Bi<Cs;Bi++){const Fh=Bt[Bi];Ie.update(Fh,Ln),Ie.bind(Fh,Ln)}}return Ln}function Jp(w,k){w.ambientLightColor.needsUpdate=k,w.lightProbe.needsUpdate=k,w.directionalLights.needsUpdate=k,w.directionalLightShadows.needsUpdate=k,w.pointLights.needsUpdate=k,w.pointLightShadows.needsUpdate=k,w.spotLights.needsUpdate=k,w.spotLightShadows.needsUpdate=k,w.rectAreaLights.needsUpdate=k,w.hemisphereLights.needsUpdate=k}function Qp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(w,k,J){const K=x.get(w);K.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),x.get(w.texture).__webglTexture=k,x.get(w.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:J,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,k){const J=x.get(w);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0};const em=R.createFramebuffer();this.setRenderTarget=function(w,k=0,J=0){L=w,D=k,H=J;let K=null,$=!1,we=!1;if(w){const Te=x.get(w);if(Te.__useDefaultFramebuffer!==void 0){ce.bindFramebuffer(R.FRAMEBUFFER,Te.__webglFramebuffer),I.copy(w.viewport),z.copy(w.scissor),q=w.scissorTest,ce.viewport(I),ce.scissor(z),ce.setScissorTest(q),B=-1;return}else if(Te.__webglFramebuffer===void 0)U.setupRenderTarget(w);else if(Te.__hasExternalTextures)U.rebindTextures(w,x.get(w.texture).__webglTexture,x.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ke=w.depthTexture;if(Te.__boundDepthTexture!==Ke){if(Ke!==null&&x.has(Ke)&&(w.width!==Ke.image.width||w.height!==Ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(w)}}const Fe=w.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(we=!0);const Be=x.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Be[k])?K=Be[k][J]:K=Be[k],$=!0):w.samples>0&&U.useMultisampledRTT(w)===!1?K=x.get(w).__webglMultisampledFramebuffer:Array.isArray(Be)?K=Be[J]:K=Be,I.copy(w.viewport),z.copy(w.scissor),q=w.scissorTest}else I.copy(se).multiplyScalar(Ge).floor(),z.copy(pe).multiplyScalar(Ge).floor(),q=xe;if(J!==0&&(K=em),ce.bindFramebuffer(R.FRAMEBUFFER,K)&&ce.drawBuffers(w,K),ce.viewport(I),ce.scissor(z),ce.setScissorTest(q),$){const Te=x.get(w.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+k,Te.__webglTexture,J)}else if(we){const Te=k;for(let Fe=0;Fe<w.textures.length;Fe++){const Be=x.get(w.textures[Fe]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Fe,Be.__webglTexture,J,Te)}}else if(w!==null&&J!==0){const Te=x.get(w.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Te.__webglTexture,J)}B=-1},this.readRenderTargetPixels=function(w,k,J,K,$,we,Pe,Te=0){if(!(w&&w.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=x.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Pe!==void 0&&(Fe=Fe[Pe]),Fe){ce.bindFramebuffer(R.FRAMEBUFFER,Fe);try{const Be=w.textures[Te],Ke=Be.format,et=Be.type;if(w.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+Te),!re.textureFormatReadable(Ke)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(et)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=w.width-K&&J>=0&&J<=w.height-$&&R.readPixels(k,J,K,$,ye.convert(Ke),ye.convert(et),we)}finally{const Be=L!==null?x.get(L).__webglFramebuffer:null;ce.bindFramebuffer(R.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(w,k,J,K,$,we,Pe,Te=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=x.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Pe!==void 0&&(Fe=Fe[Pe]),Fe)if(k>=0&&k<=w.width-K&&J>=0&&J<=w.height-$){ce.bindFramebuffer(R.FRAMEBUFFER,Fe);const Be=w.textures[Te],Ke=Be.format,et=Be.type;if(w.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+Te),!re.textureFormatReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ze=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,ze),R.bufferData(R.PIXEL_PACK_BUFFER,we.byteLength,R.STREAM_READ),R.readPixels(k,J,K,$,ye.convert(Ke),ye.convert(et),0);const pt=L!==null?x.get(L).__webglFramebuffer:null;ce.bindFramebuffer(R.FRAMEBUFFER,pt);const At=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await c_(R,At,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,ze),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,we),R.deleteBuffer(ze),R.deleteSync(At),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,k=null,J=0){const K=Math.pow(2,-J),$=Math.floor(w.image.width*K),we=Math.floor(w.image.height*K),Pe=k!==null?k.x:0,Te=k!==null?k.y:0;U.setTexture2D(w,0),R.copyTexSubImage2D(R.TEXTURE_2D,J,0,0,Pe,Te,$,we),ce.unbindTexture()};const tm=R.createFramebuffer(),nm=R.createFramebuffer();this.copyTextureToTexture=function(w,k,J=null,K=null,$=0,we=0){let Pe,Te,Fe,Be,Ke,et,ze,pt,At;const wt=w.isCompressedTexture?w.mipmaps[we]:w.image;if(J!==null)Pe=J.max.x-J.min.x,Te=J.max.y-J.min.y,Fe=J.isBox3?J.max.z-J.min.z:1,Be=J.min.x,Ke=J.min.y,et=J.isBox3?J.min.z:0;else{const Vt=Math.pow(2,-$);Pe=Math.floor(wt.width*Vt),Te=Math.floor(wt.height*Vt),w.isDataArrayTexture?Fe=wt.depth:w.isData3DTexture?Fe=Math.floor(wt.depth*Vt):Fe=1,Be=0,Ke=0,et=0}K!==null?(ze=K.x,pt=K.y,At=K.z):(ze=0,pt=0,At=0);const mt=ye.convert(k.format),Xt=ye.convert(k.type);let Oe;k.isData3DTexture?(U.setTexture3D(k,0),Oe=R.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(U.setTexture2DArray(k,0),Oe=R.TEXTURE_2D_ARRAY):(U.setTexture2D(k,0),Oe=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,k.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,k.unpackAlignment);const mn=R.getParameter(R.UNPACK_ROW_LENGTH),rt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Ln=R.getParameter(R.UNPACK_SKIP_PIXELS),Xn=R.getParameter(R.UNPACK_SKIP_ROWS),ns=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,wt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,wt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Be),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ke),R.pixelStorei(R.UNPACK_SKIP_IMAGES,et);const As=w.isDataArrayTexture||w.isData3DTexture,yt=k.isDataArrayTexture||k.isData3DTexture;if(w.isDepthTexture){const Vt=x.get(w),Oi=x.get(k),Bt=x.get(Vt.__renderTarget),Bi=x.get(Oi.__renderTarget);ce.bindFramebuffer(R.READ_FRAMEBUFFER,Bt.__webglFramebuffer),ce.bindFramebuffer(R.DRAW_FRAMEBUFFER,Bi.__webglFramebuffer);for(let Cs=0;Cs<Fe;Cs++)As&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,x.get(w).__webglTexture,$,et+Cs),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,x.get(k).__webglTexture,we,At+Cs)),R.blitFramebuffer(Be,Ke,Pe,Te,ze,pt,Pe,Te,R.DEPTH_BUFFER_BIT,R.NEAREST);ce.bindFramebuffer(R.READ_FRAMEBUFFER,null),ce.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if($!==0||w.isRenderTargetTexture||x.has(w)){const Vt=x.get(w),Oi=x.get(k);ce.bindFramebuffer(R.READ_FRAMEBUFFER,tm),ce.bindFramebuffer(R.DRAW_FRAMEBUFFER,nm);for(let Bt=0;Bt<Fe;Bt++)As?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Vt.__webglTexture,$,et+Bt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Vt.__webglTexture,$),yt?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Oi.__webglTexture,we,At+Bt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Oi.__webglTexture,we),$!==0?R.blitFramebuffer(Be,Ke,Pe,Te,ze,pt,Pe,Te,R.COLOR_BUFFER_BIT,R.NEAREST):yt?R.copyTexSubImage3D(Oe,we,ze,pt,At+Bt,Be,Ke,Pe,Te):R.copyTexSubImage2D(Oe,we,ze,pt,Be,Ke,Pe,Te);ce.bindFramebuffer(R.READ_FRAMEBUFFER,null),ce.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else yt?w.isDataTexture||w.isData3DTexture?R.texSubImage3D(Oe,we,ze,pt,At,Pe,Te,Fe,mt,Xt,wt.data):k.isCompressedArrayTexture?R.compressedTexSubImage3D(Oe,we,ze,pt,At,Pe,Te,Fe,mt,wt.data):R.texSubImage3D(Oe,we,ze,pt,At,Pe,Te,Fe,mt,Xt,wt):w.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,we,ze,pt,Pe,Te,mt,Xt,wt.data):w.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,we,ze,pt,wt.width,wt.height,mt,wt.data):R.texSubImage2D(R.TEXTURE_2D,we,ze,pt,Pe,Te,mt,Xt,wt);R.pixelStorei(R.UNPACK_ROW_LENGTH,mn),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,rt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ln),R.pixelStorei(R.UNPACK_SKIP_ROWS,Xn),R.pixelStorei(R.UNPACK_SKIP_IMAGES,ns),we===0&&k.generateMipmaps&&R.generateMipmap(Oe),ce.unbindTexture()},this.initRenderTarget=function(w){x.get(w).__webglFramebuffer===void 0&&U.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?U.setTextureCube(w,0):w.isData3DTexture?U.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?U.setTexture2DArray(w,0):U.setTexture2D(w,0),ce.unbindTexture()},this.resetState=function(){D=0,H=0,L=null,ce.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}class Vn{constructor(e){e===void 0&&(e=[0,0,0,0,0,0,0,0,0]),this.elements=e}identity(){const e=this.elements;e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1}setZero(){const e=this.elements;e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e[8]=0}setTrace(e){const t=this.elements;t[0]=e.x,t[4]=e.y,t[8]=e.z}getTrace(e){e===void 0&&(e=new M);const t=this.elements;return e.x=t[0],e.y=t[4],e.z=t[8],e}vmult(e,t){t===void 0&&(t=new M);const i=this.elements,s=e.x,r=e.y,o=e.z;return t.x=i[0]*s+i[1]*r+i[2]*o,t.y=i[3]*s+i[4]*r+i[5]*o,t.z=i[6]*s+i[7]*r+i[8]*o,t}smult(e){for(let t=0;t<this.elements.length;t++)this.elements[t]*=e}mmult(e,t){t===void 0&&(t=new Vn);const i=this.elements,s=e.elements,r=t.elements,o=i[0],a=i[1],l=i[2],c=i[3],h=i[4],d=i[5],u=i[6],f=i[7],g=i[8],v=s[0],p=s[1],m=s[2],_=s[3],E=s[4],S=s[5],A=s[6],C=s[7],P=s[8];return r[0]=o*v+a*_+l*A,r[1]=o*p+a*E+l*C,r[2]=o*m+a*S+l*P,r[3]=c*v+h*_+d*A,r[4]=c*p+h*E+d*C,r[5]=c*m+h*S+d*P,r[6]=u*v+f*_+g*A,r[7]=u*p+f*E+g*C,r[8]=u*m+f*S+g*P,t}scale(e,t){t===void 0&&(t=new Vn);const i=this.elements,s=t.elements;for(let r=0;r!==3;r++)s[3*r+0]=e.x*i[3*r+0],s[3*r+1]=e.y*i[3*r+1],s[3*r+2]=e.z*i[3*r+2];return t}solve(e,t){t===void 0&&(t=new M);const i=3,s=4,r=[];let o,a;for(o=0;o<i*s;o++)r.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)r[o+s*a]=this.elements[o+3*a];r[3]=e.x,r[7]=e.y,r[11]=e.z;let l=3;const c=l;let h;const d=4;let u;do{if(o=c-l,r[o+s*o]===0){for(a=o+1;a<c;a++)if(r[o+s*a]!==0){h=d;do u=d-h,r[u+s*o]+=r[u+s*a];while(--h);break}}if(r[o+s*o]!==0)for(a=o+1;a<c;a++){const f=r[o+s*a]/r[o+s*o];h=d;do u=d-h,r[u+s*a]=u<=o?0:r[u+s*a]-r[u+s*o]*f;while(--h)}}while(--l);if(t.z=r[2*s+3]/r[2*s+2],t.y=(r[1*s+3]-r[1*s+2]*t.z)/r[1*s+1],t.x=(r[0*s+3]-r[0*s+2]*t.z-r[0*s+1]*t.y)/r[0*s+0],isNaN(t.x)||isNaN(t.y)||isNaN(t.z)||t.x===1/0||t.y===1/0||t.z===1/0)throw`Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;return t}e(e,t,i){if(i===void 0)return this.elements[t+3*e];this.elements[t+3*e]=i}copy(e){for(let t=0;t<e.elements.length;t++)this.elements[t]=e.elements[t];return this}toString(){let e="";for(let i=0;i<9;i++)e+=this.elements[i]+",";return e}reverse(e){e===void 0&&(e=new Vn);const t=3,i=6,s=YM;let r,o;for(r=0;r<3;r++)for(o=0;o<3;o++)s[r+i*o]=this.elements[r+3*o];s[3]=1,s[9]=0,s[15]=0,s[4]=0,s[10]=1,s[16]=0,s[5]=0,s[11]=0,s[17]=1;let a=3;const l=a;let c;const h=i;let d;do{if(r=l-a,s[r+i*r]===0){for(o=r+1;o<l;o++)if(s[r+i*o]!==0){c=h;do d=h-c,s[d+i*r]+=s[d+i*o];while(--c);break}}if(s[r+i*r]!==0)for(o=r+1;o<l;o++){const u=s[r+i*o]/s[r+i*r];c=h;do d=h-c,s[d+i*o]=d<=r?0:s[d+i*o]-s[d+i*r]*u;while(--c)}}while(--a);r=2;do{o=r-1;do{const u=s[r+i*o]/s[r+i*r];c=i;do d=i-c,s[d+i*o]=s[d+i*o]-s[d+i*r]*u;while(--c)}while(o--)}while(--r);r=2;do{const u=1/s[r+i*r];c=i;do d=i-c,s[d+i*r]=s[d+i*r]*u;while(--c)}while(r--);r=2;do{o=2;do{if(d=s[t+o+i*r],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;e.e(r,o,d)}while(o--)}while(r--);return e}setRotationFromQuaternion(e){const t=e.x,i=e.y,s=e.z,r=e.w,o=t+t,a=i+i,l=s+s,c=t*o,h=t*a,d=t*l,u=i*a,f=i*l,g=s*l,v=r*o,p=r*a,m=r*l,_=this.elements;return _[0]=1-(u+g),_[1]=h-m,_[2]=d+p,_[3]=h+m,_[4]=1-(c+g),_[5]=f-v,_[6]=d-p,_[7]=f+v,_[8]=1-(c+u),this}transpose(e){e===void 0&&(e=new Vn);const t=this.elements,i=e.elements;let s;return i[0]=t[0],i[4]=t[4],i[8]=t[8],s=t[1],i[1]=t[3],i[3]=s,s=t[2],i[2]=t[6],i[6]=s,s=t[5],i[5]=t[7],i[7]=s,e}}const YM=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class M{constructor(e,t,i){e===void 0&&(e=0),t===void 0&&(t=0),i===void 0&&(i=0),this.x=e,this.y=t,this.z=i}cross(e,t){t===void 0&&(t=new M);const i=e.x,s=e.y,r=e.z,o=this.x,a=this.y,l=this.z;return t.x=a*r-l*s,t.y=l*i-o*r,t.z=o*s-a*i,t}set(e,t,i){return this.x=e,this.y=t,this.z=i,this}setZero(){this.x=this.y=this.z=0}vadd(e,t){if(t)t.x=e.x+this.x,t.y=e.y+this.y,t.z=e.z+this.z;else return new M(this.x+e.x,this.y+e.y,this.z+e.z)}vsub(e,t){if(t)t.x=this.x-e.x,t.y=this.y-e.y,t.z=this.z-e.z;else return new M(this.x-e.x,this.y-e.y,this.z-e.z)}crossmat(){return new Vn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const e=this.x,t=this.y,i=this.z,s=Math.sqrt(e*e+t*t+i*i);if(s>0){const r=1/s;this.x*=r,this.y*=r,this.z*=r}else this.x=0,this.y=0,this.z=0;return s}unit(e){e===void 0&&(e=new M);const t=this.x,i=this.y,s=this.z;let r=Math.sqrt(t*t+i*i+s*s);return r>0?(r=1/r,e.x=t*r,e.y=i*r,e.z=s*r):(e.x=1,e.y=0,e.z=0),e}length(){const e=this.x,t=this.y,i=this.z;return Math.sqrt(e*e+t*t+i*i)}lengthSquared(){return this.dot(this)}distanceTo(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z;return Math.sqrt((r-t)*(r-t)+(o-i)*(o-i)+(a-s)*(a-s))}distanceSquared(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z;return(r-t)*(r-t)+(o-i)*(o-i)+(a-s)*(a-s)}scale(e,t){t===void 0&&(t=new M);const i=this.x,s=this.y,r=this.z;return t.x=e*i,t.y=e*s,t.z=e*r,t}vmul(e,t){return t===void 0&&(t=new M),t.x=e.x*this.x,t.y=e.y*this.y,t.z=e.z*this.z,t}addScaledVector(e,t,i){return i===void 0&&(i=new M),i.x=this.x+e*t.x,i.y=this.y+e*t.y,i.z=this.z+e*t.z,i}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(e){return e===void 0&&(e=new M),e.x=-this.x,e.y=-this.y,e.z=-this.z,e}tangents(e,t){const i=this.length();if(i>0){const s=jM,r=1/i;s.set(this.x*r,this.y*r,this.z*r);const o=$M;Math.abs(s.x)<.9?(o.set(1,0,0),s.cross(o,e)):(o.set(0,1,0),s.cross(o,e)),s.cross(e,t)}else e.set(1,0,0),t.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}lerp(e,t,i){const s=this.x,r=this.y,o=this.z;i.x=s+(e.x-s)*t,i.y=r+(e.y-r)*t,i.z=o+(e.z-o)*t}almostEquals(e,t){return t===void 0&&(t=1e-6),!(Math.abs(this.x-e.x)>t||Math.abs(this.y-e.y)>t||Math.abs(this.z-e.z)>t)}almostZero(e){return e===void 0&&(e=1e-6),!(Math.abs(this.x)>e||Math.abs(this.y)>e||Math.abs(this.z)>e)}isAntiparallelTo(e,t){return this.negate(Sd),Sd.almostEquals(e,t)}clone(){return new M(this.x,this.y,this.z)}}M.ZERO=new M(0,0,0);M.UNIT_X=new M(1,0,0);M.UNIT_Y=new M(0,1,0);M.UNIT_Z=new M(0,0,1);const jM=new M,$M=new M,Sd=new M;class wn{constructor(e){e===void 0&&(e={}),this.lowerBound=new M,this.upperBound=new M,e.lowerBound&&this.lowerBound.copy(e.lowerBound),e.upperBound&&this.upperBound.copy(e.upperBound)}setFromPoints(e,t,i,s){const r=this.lowerBound,o=this.upperBound,a=i;r.copy(e[0]),a&&a.vmult(r,r),o.copy(r);for(let l=1;l<e.length;l++){let c=e[l];a&&(a.vmult(c,Md),c=Md),c.x>o.x&&(o.x=c.x),c.x<r.x&&(r.x=c.x),c.y>o.y&&(o.y=c.y),c.y<r.y&&(r.y=c.y),c.z>o.z&&(o.z=c.z),c.z<r.z&&(r.z=c.z)}return t&&(t.vadd(r,r),t.vadd(o,o)),s&&(r.x-=s,r.y-=s,r.z-=s,o.x+=s,o.y+=s,o.z+=s),this}copy(e){return this.lowerBound.copy(e.lowerBound),this.upperBound.copy(e.upperBound),this}clone(){return new wn().copy(this)}extend(e){this.lowerBound.x=Math.min(this.lowerBound.x,e.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,e.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,e.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,e.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,e.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,e.upperBound.z)}overlaps(e){const t=this.lowerBound,i=this.upperBound,s=e.lowerBound,r=e.upperBound,o=s.x<=i.x&&i.x<=r.x||t.x<=r.x&&r.x<=i.x,a=s.y<=i.y&&i.y<=r.y||t.y<=r.y&&r.y<=i.y,l=s.z<=i.z&&i.z<=r.z||t.z<=r.z&&r.z<=i.z;return o&&a&&l}volume(){const e=this.lowerBound,t=this.upperBound;return(t.x-e.x)*(t.y-e.y)*(t.z-e.z)}contains(e){const t=this.lowerBound,i=this.upperBound,s=e.lowerBound,r=e.upperBound;return t.x<=s.x&&i.x>=r.x&&t.y<=s.y&&i.y>=r.y&&t.z<=s.z&&i.z>=r.z}getCorners(e,t,i,s,r,o,a,l){const c=this.lowerBound,h=this.upperBound;e.copy(c),t.set(h.x,c.y,c.z),i.set(h.x,h.y,c.z),s.set(c.x,h.y,h.z),r.set(h.x,c.y,h.z),o.set(c.x,h.y,c.z),a.set(c.x,c.y,h.z),l.copy(h)}toLocalFrame(e,t){const i=Ed,s=i[0],r=i[1],o=i[2],a=i[3],l=i[4],c=i[5],h=i[6],d=i[7];this.getCorners(s,r,o,a,l,c,h,d);for(let u=0;u!==8;u++){const f=i[u];e.pointToLocal(f,f)}return t.setFromPoints(i)}toWorldFrame(e,t){const i=Ed,s=i[0],r=i[1],o=i[2],a=i[3],l=i[4],c=i[5],h=i[6],d=i[7];this.getCorners(s,r,o,a,l,c,h,d);for(let u=0;u!==8;u++){const f=i[u];e.pointToWorld(f,f)}return t.setFromPoints(i)}overlapsRay(e){const{direction:t,from:i}=e,s=1/t.x,r=1/t.y,o=1/t.z,a=(this.lowerBound.x-i.x)*s,l=(this.upperBound.x-i.x)*s,c=(this.lowerBound.y-i.y)*r,h=(this.upperBound.y-i.y)*r,d=(this.lowerBound.z-i.z)*o,u=(this.upperBound.z-i.z)*o,f=Math.max(Math.max(Math.min(a,l),Math.min(c,h)),Math.min(d,u)),g=Math.min(Math.min(Math.max(a,l),Math.max(c,h)),Math.max(d,u));return!(g<0||f>g)}}const Md=new M,Ed=[new M,new M,new M,new M,new M,new M,new M,new M];class bd{constructor(){this.matrix=[]}get(e,t){let{index:i}=e,{index:s}=t;if(s>i){const r=s;s=i,i=r}return this.matrix[(i*(i+1)>>1)+s-1]}set(e,t,i){let{index:s}=e,{index:r}=t;if(r>s){const o=r;r=s,s=o}this.matrix[(s*(s+1)>>1)+r-1]=i?1:0}reset(){for(let e=0,t=this.matrix.length;e!==t;e++)this.matrix[e]=0}setNumObjects(e){this.matrix.length=e*(e-1)>>1}}let Lp=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;return i[e]===void 0&&(i[e]=[]),i[e].includes(t)||i[e].push(t),this}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return!!(i[e]!==void 0&&i[e].includes(t))}hasAnyEventListener(e){return this._listeners===void 0?!1:this._listeners[e]!==void 0}removeEventListener(e,t){if(this._listeners===void 0)return this;const i=this._listeners;if(i[e]===void 0)return this;const s=i[e].indexOf(t);return s!==-1&&i[e].splice(s,1),this}dispatchEvent(e){if(this._listeners===void 0)return this;const i=this._listeners[e.type];if(i!==void 0){e.target=this;for(let s=0,r=i.length;s<r;s++)i[s].call(this,e)}return this}};class Pt{constructor(e,t,i,s){e===void 0&&(e=0),t===void 0&&(t=0),i===void 0&&(i=0),s===void 0&&(s=1),this.x=e,this.y=t,this.z=i,this.w=s}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(e,t){const i=Math.sin(t*.5);return this.x=e.x*i,this.y=e.y*i,this.z=e.z*i,this.w=Math.cos(t*.5),this}toAxisAngle(e){e===void 0&&(e=new M),this.normalize();const t=2*Math.acos(this.w),i=Math.sqrt(1-this.w*this.w);return i<.001?(e.x=this.x,e.y=this.y,e.z=this.z):(e.x=this.x/i,e.y=this.y/i,e.z=this.z/i),[e,t]}setFromVectors(e,t){if(e.isAntiparallelTo(t)){const i=KM,s=ZM;e.tangents(i,s),this.setFromAxisAngle(i,Math.PI)}else{const i=e.cross(t);this.x=i.x,this.y=i.y,this.z=i.z,this.w=Math.sqrt(e.length()**2*t.length()**2)+e.dot(t),this.normalize()}return this}mult(e,t){t===void 0&&(t=new Pt);const i=this.x,s=this.y,r=this.z,o=this.w,a=e.x,l=e.y,c=e.z,h=e.w;return t.x=i*h+o*a+s*c-r*l,t.y=s*h+o*l+r*a-i*c,t.z=r*h+o*c+i*l-s*a,t.w=o*h-i*a-s*l-r*c,t}inverse(e){e===void 0&&(e=new Pt);const t=this.x,i=this.y,s=this.z,r=this.w;this.conjugate(e);const o=1/(t*t+i*i+s*s+r*r);return e.x*=o,e.y*=o,e.z*=o,e.w*=o,e}conjugate(e){return e===void 0&&(e=new Pt),e.x=-this.x,e.y=-this.y,e.z=-this.z,e.w=this.w,e}normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(e=1/e,this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}normalizeFast(){const e=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}vmult(e,t){t===void 0&&(t=new M);const i=e.x,s=e.y,r=e.z,o=this.x,a=this.y,l=this.z,c=this.w,h=c*i+a*r-l*s,d=c*s+l*i-o*r,u=c*r+o*s-a*i,f=-o*i-a*s-l*r;return t.x=h*c+f*-o+d*-l-u*-a,t.y=d*c+f*-a+u*-o-h*-l,t.z=u*c+f*-l+h*-a-d*-o,t}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this}toEuler(e,t){t===void 0&&(t="YZX");let i,s,r;const o=this.x,a=this.y,l=this.z,c=this.w;switch(t){case"YZX":const h=o*a+l*c;if(h>.499&&(i=2*Math.atan2(o,c),s=Math.PI/2,r=0),h<-.499&&(i=-2*Math.atan2(o,c),s=-Math.PI/2,r=0),i===void 0){const d=o*o,u=a*a,f=l*l;i=Math.atan2(2*a*c-2*o*l,1-2*u-2*f),s=Math.asin(2*h),r=Math.atan2(2*o*c-2*a*l,1-2*d-2*f)}break;default:throw new Error(`Euler order ${t} not supported yet.`)}e.y=i,e.z=s,e.x=r}setFromEuler(e,t,i,s){s===void 0&&(s="XYZ");const r=Math.cos(e/2),o=Math.cos(t/2),a=Math.cos(i/2),l=Math.sin(e/2),c=Math.sin(t/2),h=Math.sin(i/2);return s==="XYZ"?(this.x=l*o*a+r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a-l*c*h):s==="YXZ"?(this.x=l*o*a+r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a+l*c*h):s==="ZXY"?(this.x=l*o*a-r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a-l*c*h):s==="ZYX"?(this.x=l*o*a-r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a+l*c*h):s==="YZX"?(this.x=l*o*a+r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a-l*c*h):s==="XZY"&&(this.x=l*o*a-r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a+l*c*h),this}clone(){return new Pt(this.x,this.y,this.z,this.w)}slerp(e,t,i){i===void 0&&(i=new Pt);const s=this.x,r=this.y,o=this.z,a=this.w;let l=e.x,c=e.y,h=e.z,d=e.w,u,f,g,v,p;return f=s*l+r*c+o*h+a*d,f<0&&(f=-f,l=-l,c=-c,h=-h,d=-d),1-f>1e-6?(u=Math.acos(f),g=Math.sin(u),v=Math.sin((1-t)*u)/g,p=Math.sin(t*u)/g):(v=1-t,p=t),i.x=v*s+p*l,i.y=v*r+p*c,i.z=v*o+p*h,i.w=v*a+p*d,i}integrate(e,t,i,s){s===void 0&&(s=new Pt);const r=e.x*i.x,o=e.y*i.y,a=e.z*i.z,l=this.x,c=this.y,h=this.z,d=this.w,u=t*.5;return s.x+=u*(r*d+o*h-a*c),s.y+=u*(o*d+a*l-r*h),s.z+=u*(a*d+r*c-o*l),s.w+=u*(-r*l-o*c-a*h),s}}const KM=new M,ZM=new M,JM={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class Le{constructor(e){e===void 0&&(e={}),this.id=Le.idCounter++,this.type=e.type||0,this.boundingSphereRadius=0,this.collisionResponse=e.collisionResponse?e.collisionResponse:!0,this.collisionFilterGroup=e.collisionFilterGroup!==void 0?e.collisionFilterGroup:1,this.collisionFilterMask=e.collisionFilterMask!==void 0?e.collisionFilterMask:-1,this.material=e.material?e.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(e,t){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(e,t,i,s){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}Le.idCounter=0;Le.types=JM;class ct{constructor(e){e===void 0&&(e={}),this.position=new M,this.quaternion=new Pt,e.position&&this.position.copy(e.position),e.quaternion&&this.quaternion.copy(e.quaternion)}pointToLocal(e,t){return ct.pointToLocalFrame(this.position,this.quaternion,e,t)}pointToWorld(e,t){return ct.pointToWorldFrame(this.position,this.quaternion,e,t)}vectorToWorldFrame(e,t){return t===void 0&&(t=new M),this.quaternion.vmult(e,t),t}static pointToLocalFrame(e,t,i,s){return s===void 0&&(s=new M),i.vsub(e,s),t.conjugate(wd),wd.vmult(s,s),s}static pointToWorldFrame(e,t,i,s){return s===void 0&&(s=new M),t.vmult(i,s),s.vadd(e,s),s}static vectorToWorldFrame(e,t,i){return i===void 0&&(i=new M),e.vmult(t,i),i}static vectorToLocalFrame(e,t,i,s){return s===void 0&&(s=new M),t.w*=-1,t.vmult(i,s),t.w*=-1,s}}const wd=new Pt;class Gr extends Le{constructor(e){e===void 0&&(e={});const{vertices:t=[],faces:i=[],normals:s=[],axes:r,boundingSphereRadius:o}=e;super({type:Le.types.CONVEXPOLYHEDRON}),this.vertices=t,this.faces=i,this.faceNormals=s,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=r?r.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const e=this.faces,t=this.vertices,i=this.uniqueEdges;i.length=0;const s=new M;for(let r=0;r!==e.length;r++){const o=e[r],a=o.length;for(let l=0;l!==a;l++){const c=(l+1)%a;t[o[l]].vsub(t[o[c]],s),s.normalize();let h=!1;for(let d=0;d!==i.length;d++)if(i[d].almostEquals(s)||i[d].almostEquals(s)){h=!0;break}h||i.push(s.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let e=0;e<this.faces.length;e++){for(let s=0;s<this.faces[e].length;s++)if(!this.vertices[this.faces[e][s]])throw new Error(`Vertex ${this.faces[e][s]} not found!`);const t=this.faceNormals[e]||new M;this.getFaceNormal(e,t),t.negate(t),this.faceNormals[e]=t;const i=this.vertices[this.faces[e][0]];if(t.dot(i)<0){console.error(`.faceNormals[${e}] = Vec3(${t.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let s=0;s<this.faces[e].length;s++)console.warn(`.vertices[${this.faces[e][s]}] = Vec3(${this.vertices[this.faces[e][s]].toString()})`)}}}getFaceNormal(e,t){const i=this.faces[e],s=this.vertices[i[0]],r=this.vertices[i[1]],o=this.vertices[i[2]];Gr.computeNormal(s,r,o,t)}static computeNormal(e,t,i,s){const r=new M,o=new M;t.vsub(e,o),i.vsub(t,r),r.cross(o,s),s.isZero()||s.normalize()}clipAgainstHull(e,t,i,s,r,o,a,l,c){const h=new M;let d=-1,u=-Number.MAX_VALUE;for(let g=0;g<i.faces.length;g++){h.copy(i.faceNormals[g]),r.vmult(h,h);const v=h.dot(o);v>u&&(u=v,d=g)}const f=[];for(let g=0;g<i.faces[d].length;g++){const v=i.vertices[i.faces[d][g]],p=new M;p.copy(v),r.vmult(p,p),s.vadd(p,p),f.push(p)}d>=0&&this.clipFaceAgainstHull(o,e,t,f,a,l,c)}findSeparatingAxis(e,t,i,s,r,o,a,l){const c=new M,h=new M,d=new M,u=new M,f=new M,g=new M;let v=Number.MAX_VALUE;const p=this;if(p.uniqueAxes)for(let m=0;m!==p.uniqueAxes.length;m++){i.vmult(p.uniqueAxes[m],c);const _=p.testSepAxis(c,e,t,i,s,r);if(_===!1)return!1;_<v&&(v=_,o.copy(c))}else{const m=a?a.length:p.faces.length;for(let _=0;_<m;_++){const E=a?a[_]:_;c.copy(p.faceNormals[E]),i.vmult(c,c);const S=p.testSepAxis(c,e,t,i,s,r);if(S===!1)return!1;S<v&&(v=S,o.copy(c))}}if(e.uniqueAxes)for(let m=0;m!==e.uniqueAxes.length;m++){r.vmult(e.uniqueAxes[m],h);const _=p.testSepAxis(h,e,t,i,s,r);if(_===!1)return!1;_<v&&(v=_,o.copy(h))}else{const m=l?l.length:e.faces.length;for(let _=0;_<m;_++){const E=l?l[_]:_;h.copy(e.faceNormals[E]),r.vmult(h,h);const S=p.testSepAxis(h,e,t,i,s,r);if(S===!1)return!1;S<v&&(v=S,o.copy(h))}}for(let m=0;m!==p.uniqueEdges.length;m++){i.vmult(p.uniqueEdges[m],u);for(let _=0;_!==e.uniqueEdges.length;_++)if(r.vmult(e.uniqueEdges[_],f),u.cross(f,g),!g.almostZero()){g.normalize();const E=p.testSepAxis(g,e,t,i,s,r);if(E===!1)return!1;E<v&&(v=E,o.copy(g))}}return s.vsub(t,d),d.dot(o)>0&&o.negate(o),!0}testSepAxis(e,t,i,s,r,o){const a=this;Gr.project(a,e,i,s,Ll),Gr.project(t,e,r,o,Nl);const l=Ll[0],c=Ll[1],h=Nl[0],d=Nl[1];if(l<d||h<c)return!1;const u=l-d,f=h-c;return u<f?u:f}calculateLocalInertia(e,t){const i=new M,s=new M;this.computeLocalAABB(s,i);const r=i.x-s.x,o=i.y-s.y,a=i.z-s.z;t.x=1/12*e*(2*o*2*o+2*a*2*a),t.y=1/12*e*(2*r*2*r+2*a*2*a),t.z=1/12*e*(2*o*2*o+2*r*2*r)}getPlaneConstantOfFace(e){const t=this.faces[e],i=this.faceNormals[e],s=this.vertices[t[0]];return-i.dot(s)}clipFaceAgainstHull(e,t,i,s,r,o,a){const l=new M,c=new M,h=new M,d=new M,u=new M,f=new M,g=new M,v=new M,p=this,m=[],_=s,E=m;let S=-1,A=Number.MAX_VALUE;for(let G=0;G<p.faces.length;G++){l.copy(p.faceNormals[G]),i.vmult(l,l);const D=l.dot(e);D<A&&(A=D,S=G)}if(S<0)return;const C=p.faces[S];C.connectedFaces=[];for(let G=0;G<p.faces.length;G++)for(let D=0;D<p.faces[G].length;D++)C.indexOf(p.faces[G][D])!==-1&&G!==S&&C.connectedFaces.indexOf(G)===-1&&C.connectedFaces.push(G);const P=C.length;for(let G=0;G<P;G++){const D=p.vertices[C[G]],H=p.vertices[C[(G+1)%P]];D.vsub(H,c),h.copy(c),i.vmult(h,h),t.vadd(h,h),d.copy(this.faceNormals[S]),i.vmult(d,d),t.vadd(d,d),h.cross(d,u),u.negate(u),f.copy(D),i.vmult(f,f),t.vadd(f,f);const L=C.connectedFaces[G];g.copy(this.faceNormals[L]);const B=this.getPlaneConstantOfFace(L);v.copy(g),i.vmult(v,v);const F=B-v.dot(t);for(this.clipFaceAgainstPlane(_,E,v,F);_.length;)_.shift();for(;E.length;)_.push(E.shift())}g.copy(this.faceNormals[S]);const y=this.getPlaneConstantOfFace(S);v.copy(g),i.vmult(v,v);const T=y-v.dot(t);for(let G=0;G<_.length;G++){let D=v.dot(_[G])+T;if(D<=r&&(console.log(`clamped: depth=${D} to minDist=${r}`),D=r),D<=o){const H=_[G];if(D<=1e-6){const L={point:H,normal:v,depth:D};a.push(L)}}}}clipFaceAgainstPlane(e,t,i,s){let r,o;const a=e.length;if(a<2)return t;let l=e[e.length-1],c=e[0];r=i.dot(l)+s;for(let h=0;h<a;h++){if(c=e[h],o=i.dot(c)+s,r<0)if(o<0){const d=new M;d.copy(c),t.push(d)}else{const d=new M;l.lerp(c,r/(r-o),d),t.push(d)}else if(o<0){const d=new M;l.lerp(c,r/(r-o),d),t.push(d),t.push(c)}l=c,r=o}return t}computeWorldVertices(e,t){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new M);const i=this.vertices,s=this.worldVertices;for(let r=0;r!==this.vertices.length;r++)t.vmult(i[r],s[r]),e.vadd(s[r],s[r]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(e,t){const i=this.vertices;e.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),t.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let s=0;s<this.vertices.length;s++){const r=i[s];r.x<e.x?e.x=r.x:r.x>t.x&&(t.x=r.x),r.y<e.y?e.y=r.y:r.y>t.y&&(t.y=r.y),r.z<e.z?e.z=r.z:r.z>t.z&&(t.z=r.z)}}computeWorldFaceNormals(e){const t=this.faceNormals.length;for(;this.worldFaceNormals.length<t;)this.worldFaceNormals.push(new M);const i=this.faceNormals,s=this.worldFaceNormals;for(let r=0;r!==t;r++)e.vmult(i[r],s[r]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let e=0;const t=this.vertices;for(let i=0;i!==t.length;i++){const s=t[i].lengthSquared();s>e&&(e=s)}this.boundingSphereRadius=Math.sqrt(e)}calculateWorldAABB(e,t,i,s){const r=this.vertices;let o,a,l,c,h,d,u=new M;for(let f=0;f<r.length;f++){u.copy(r[f]),t.vmult(u,u),e.vadd(u,u);const g=u;(o===void 0||g.x<o)&&(o=g.x),(c===void 0||g.x>c)&&(c=g.x),(a===void 0||g.y<a)&&(a=g.y),(h===void 0||g.y>h)&&(h=g.y),(l===void 0||g.z<l)&&(l=g.z),(d===void 0||g.z>d)&&(d=g.z)}i.set(o,a,l),s.set(c,h,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(e){e===void 0&&(e=new M);const t=this.vertices;for(let i=0;i<t.length;i++)e.vadd(t[i],e);return e.scale(1/t.length,e),e}transformAllPoints(e,t){const i=this.vertices.length,s=this.vertices;if(t){for(let r=0;r<i;r++){const o=s[r];t.vmult(o,o)}for(let r=0;r<this.faceNormals.length;r++){const o=this.faceNormals[r];t.vmult(o,o)}}if(e)for(let r=0;r<i;r++){const o=s[r];o.vadd(e,o)}}pointIsInside(e){const t=this.vertices,i=this.faces,s=this.faceNormals,r=new M;this.getAveragePointLocal(r);for(let o=0;o<this.faces.length;o++){let a=s[o];const l=t[i[o][0]],c=new M;e.vsub(l,c);const h=a.dot(c),d=new M;r.vsub(l,d);const u=a.dot(d);if(h<0&&u>0||h>0&&u<0)return!1}return-1}static project(e,t,i,s,r){const o=e.vertices.length,a=QM;let l=0,c=0;const h=eE,d=e.vertices;h.setZero(),ct.vectorToLocalFrame(i,s,t,a),ct.pointToLocalFrame(i,s,h,h);const u=h.dot(a);c=l=d[0].dot(a);for(let f=1;f<o;f++){const g=d[f].dot(a);g>l&&(l=g),g<c&&(c=g)}if(c-=u,l-=u,c>l){const f=c;c=l,l=f}r[0]=l,r[1]=c}}const Ll=[],Nl=[];new M;const QM=new M,eE=new M;class fn extends Le{constructor(e){super({type:Le.types.BOX}),this.halfExtents=e,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const e=this.halfExtents.x,t=this.halfExtents.y,i=this.halfExtents.z,s=M,r=[new s(-e,-t,-i),new s(e,-t,-i),new s(e,t,-i),new s(-e,t,-i),new s(-e,-t,i),new s(e,-t,i),new s(e,t,i),new s(-e,t,i)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new s(0,0,1),new s(0,1,0),new s(1,0,0)],l=new Gr({vertices:r,faces:o,axes:a});this.convexPolyhedronRepresentation=l,l.material=this.material}calculateLocalInertia(e,t){return t===void 0&&(t=new M),fn.calculateInertia(this.halfExtents,e,t),t}static calculateInertia(e,t,i){const s=e;i.x=1/12*t*(2*s.y*2*s.y+2*s.z*2*s.z),i.y=1/12*t*(2*s.x*2*s.x+2*s.z*2*s.z),i.z=1/12*t*(2*s.y*2*s.y+2*s.x*2*s.x)}getSideNormals(e,t){const i=e,s=this.halfExtents;if(i[0].set(s.x,0,0),i[1].set(0,s.y,0),i[2].set(0,0,s.z),i[3].set(-s.x,0,0),i[4].set(0,-s.y,0),i[5].set(0,0,-s.z),t!==void 0)for(let r=0;r!==i.length;r++)t.vmult(i[r],i[r]);return i}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(e,t,i){const s=this.halfExtents,r=[[s.x,s.y,s.z],[-s.x,s.y,s.z],[-s.x,-s.y,s.z],[-s.x,-s.y,-s.z],[s.x,-s.y,-s.z],[s.x,s.y,-s.z],[-s.x,s.y,-s.z],[s.x,-s.y,s.z]];for(let o=0;o<r.length;o++)Xi.set(r[o][0],r[o][1],r[o][2]),t.vmult(Xi,Xi),e.vadd(Xi,Xi),i(Xi.x,Xi.y,Xi.z)}calculateWorldAABB(e,t,i,s){const r=this.halfExtents;$n[0].set(r.x,r.y,r.z),$n[1].set(-r.x,r.y,r.z),$n[2].set(-r.x,-r.y,r.z),$n[3].set(-r.x,-r.y,-r.z),$n[4].set(r.x,-r.y,-r.z),$n[5].set(r.x,r.y,-r.z),$n[6].set(-r.x,r.y,-r.z),$n[7].set(r.x,-r.y,r.z);const o=$n[0];t.vmult(o,o),e.vadd(o,o),s.copy(o),i.copy(o);for(let a=1;a<8;a++){const l=$n[a];t.vmult(l,l),e.vadd(l,l);const c=l.x,h=l.y,d=l.z;c>s.x&&(s.x=c),h>s.y&&(s.y=h),d>s.z&&(s.z=d),c<i.x&&(i.x=c),h<i.y&&(i.y=h),d<i.z&&(i.z=d)}}}const Xi=new M,$n=[new M,new M,new M,new M,new M,new M,new M,new M],Eh={DYNAMIC:1,STATIC:2,KINEMATIC:4},bh={AWAKE:0,SLEEPY:1,SLEEPING:2};class be extends Lp{constructor(e){e===void 0&&(e={}),super(),this.id=be.idCounter++,this.index=-1,this.world=null,this.vlambda=new M,this.collisionFilterGroup=typeof e.collisionFilterGroup=="number"?e.collisionFilterGroup:1,this.collisionFilterMask=typeof e.collisionFilterMask=="number"?e.collisionFilterMask:-1,this.collisionResponse=typeof e.collisionResponse=="boolean"?e.collisionResponse:!0,this.position=new M,this.previousPosition=new M,this.interpolatedPosition=new M,this.initPosition=new M,e.position&&(this.position.copy(e.position),this.previousPosition.copy(e.position),this.interpolatedPosition.copy(e.position),this.initPosition.copy(e.position)),this.velocity=new M,e.velocity&&this.velocity.copy(e.velocity),this.initVelocity=new M,this.force=new M;const t=typeof e.mass=="number"?e.mass:0;this.mass=t,this.invMass=t>0?1/t:0,this.material=e.material||null,this.linearDamping=typeof e.linearDamping=="number"?e.linearDamping:.01,this.type=t<=0?be.STATIC:be.DYNAMIC,typeof e.type==typeof be.STATIC&&(this.type=e.type),this.allowSleep=typeof e.allowSleep<"u"?e.allowSleep:!0,this.sleepState=be.AWAKE,this.sleepSpeedLimit=typeof e.sleepSpeedLimit<"u"?e.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof e.sleepTimeLimit<"u"?e.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new M,this.quaternion=new Pt,this.initQuaternion=new Pt,this.previousQuaternion=new Pt,this.interpolatedQuaternion=new Pt,e.quaternion&&(this.quaternion.copy(e.quaternion),this.initQuaternion.copy(e.quaternion),this.previousQuaternion.copy(e.quaternion),this.interpolatedQuaternion.copy(e.quaternion)),this.angularVelocity=new M,e.angularVelocity&&this.angularVelocity.copy(e.angularVelocity),this.initAngularVelocity=new M,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new M,this.invInertia=new M,this.invInertiaWorld=new Vn,this.invMassSolve=0,this.invInertiaSolve=new M,this.invInertiaWorldSolve=new Vn,this.fixedRotation=typeof e.fixedRotation<"u"?e.fixedRotation:!1,this.angularDamping=typeof e.angularDamping<"u"?e.angularDamping:.01,this.linearFactor=new M(1,1,1),e.linearFactor&&this.linearFactor.copy(e.linearFactor),this.angularFactor=new M(1,1,1),e.angularFactor&&this.angularFactor.copy(e.angularFactor),this.aabb=new wn,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new M,this.isTrigger=!!e.isTrigger,e.shape&&this.addShape(e.shape),this.updateMassProperties()}wakeUp(){const e=this.sleepState;this.sleepState=be.AWAKE,this.wakeUpAfterNarrowphase=!1,e===be.SLEEPING&&this.dispatchEvent(be.wakeupEvent)}sleep(){this.sleepState=be.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(e){if(this.allowSleep){const t=this.sleepState,i=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),s=this.sleepSpeedLimit**2;t===be.AWAKE&&i<s?(this.sleepState=be.SLEEPY,this.timeLastSleepy=e,this.dispatchEvent(be.sleepyEvent)):t===be.SLEEPY&&i>s?this.wakeUp():t===be.SLEEPY&&e-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(be.sleepEvent))}}updateSolveMassProperties(){this.sleepState===be.SLEEPING||this.type===be.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(e,t){return t===void 0&&(t=new M),e.vsub(this.position,t),this.quaternion.conjugate().vmult(t,t),t}vectorToLocalFrame(e,t){return t===void 0&&(t=new M),this.quaternion.conjugate().vmult(e,t),t}pointToWorldFrame(e,t){return t===void 0&&(t=new M),this.quaternion.vmult(e,t),t.vadd(this.position,t),t}vectorToWorldFrame(e,t){return t===void 0&&(t=new M),this.quaternion.vmult(e,t),t}addShape(e,t,i){const s=new M,r=new Pt;return t&&s.copy(t),i&&r.copy(i),this.shapes.push(e),this.shapeOffsets.push(s),this.shapeOrientations.push(r),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=this,this}removeShape(e){const t=this.shapes.indexOf(e);return t===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(t,1),this.shapeOffsets.splice(t,1),this.shapeOrientations.splice(t,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=null,this)}updateBoundingRadius(){const e=this.shapes,t=this.shapeOffsets,i=e.length;let s=0;for(let r=0;r!==i;r++){const o=e[r];o.updateBoundingSphereRadius();const a=t[r].length(),l=o.boundingSphereRadius;a+l>s&&(s=a+l)}this.boundingRadius=s}updateAABB(){const e=this.shapes,t=this.shapeOffsets,i=this.shapeOrientations,s=e.length,r=tE,o=nE,a=this.quaternion,l=this.aabb,c=iE;for(let h=0;h!==s;h++){const d=e[h];a.vmult(t[h],r),r.vadd(this.position,r),a.mult(i[h],o),d.calculateWorldAABB(r,o,c.lowerBound,c.upperBound),h===0?l.copy(c):l.extend(c)}this.aabbNeedsUpdate=!1}updateInertiaWorld(e){const t=this.invInertia;if(!(t.x===t.y&&t.y===t.z&&!e)){const i=sE,s=rE;i.setRotationFromQuaternion(this.quaternion),i.transpose(s),i.scale(t,i),i.mmult(s,this.invInertiaWorld)}}applyForce(e,t){if(t===void 0&&(t=new M),this.type!==be.DYNAMIC)return;this.sleepState===be.SLEEPING&&this.wakeUp();const i=oE;t.cross(e,i),this.force.vadd(e,this.force),this.torque.vadd(i,this.torque)}applyLocalForce(e,t){if(t===void 0&&(t=new M),this.type!==be.DYNAMIC)return;const i=aE,s=lE;this.vectorToWorldFrame(e,i),this.vectorToWorldFrame(t,s),this.applyForce(i,s)}applyTorque(e){this.type===be.DYNAMIC&&(this.sleepState===be.SLEEPING&&this.wakeUp(),this.torque.vadd(e,this.torque))}applyImpulse(e,t){if(t===void 0&&(t=new M),this.type!==be.DYNAMIC)return;this.sleepState===be.SLEEPING&&this.wakeUp();const i=t,s=cE;s.copy(e),s.scale(this.invMass,s),this.velocity.vadd(s,this.velocity);const r=hE;i.cross(e,r),this.invInertiaWorld.vmult(r,r),this.angularVelocity.vadd(r,this.angularVelocity)}applyLocalImpulse(e,t){if(t===void 0&&(t=new M),this.type!==be.DYNAMIC)return;const i=uE,s=dE;this.vectorToWorldFrame(e,i),this.vectorToWorldFrame(t,s),this.applyImpulse(i,s)}updateMassProperties(){const e=fE;this.invMass=this.mass>0?1/this.mass:0;const t=this.inertia,i=this.fixedRotation;this.updateAABB(),e.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),fn.calculateInertia(e,this.mass,t),this.invInertia.set(t.x>0&&!i?1/t.x:0,t.y>0&&!i?1/t.y:0,t.z>0&&!i?1/t.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(e,t){const i=new M;return e.vsub(this.position,i),this.angularVelocity.cross(i,t),this.velocity.vadd(t,t),t}integrate(e,t,i){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===be.DYNAMIC||this.type===be.KINEMATIC)||this.sleepState===be.SLEEPING)return;const s=this.velocity,r=this.angularVelocity,o=this.position,a=this.force,l=this.torque,c=this.quaternion,h=this.invMass,d=this.invInertiaWorld,u=this.linearFactor,f=h*e;s.x+=a.x*f*u.x,s.y+=a.y*f*u.y,s.z+=a.z*f*u.z;const g=d.elements,v=this.angularFactor,p=l.x*v.x,m=l.y*v.y,_=l.z*v.z;r.x+=e*(g[0]*p+g[1]*m+g[2]*_),r.y+=e*(g[3]*p+g[4]*m+g[5]*_),r.z+=e*(g[6]*p+g[7]*m+g[8]*_),o.x+=s.x*e,o.y+=s.y*e,o.z+=s.z*e,c.integrate(this.angularVelocity,e,this.angularFactor,c),t&&(i?c.normalizeFast():c.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}be.idCounter=0;be.COLLIDE_EVENT_NAME="collide";be.DYNAMIC=Eh.DYNAMIC;be.STATIC=Eh.STATIC;be.KINEMATIC=Eh.KINEMATIC;be.AWAKE=bh.AWAKE;be.SLEEPY=bh.SLEEPY;be.SLEEPING=bh.SLEEPING;be.wakeupEvent={type:"wakeup"};be.sleepyEvent={type:"sleepy"};be.sleepEvent={type:"sleep"};const tE=new M,nE=new Pt,iE=new wn,sE=new Vn,rE=new Vn;new Vn;const oE=new M,aE=new M,lE=new M,cE=new M,hE=new M,uE=new M,dE=new M,fE=new M;class Np{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(e,t,i){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(e,t){return!((e.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&e.collisionFilterMask)===0||((e.type&be.STATIC)!==0||e.sleepState===be.SLEEPING)&&((t.type&be.STATIC)!==0||t.sleepState===be.SLEEPING))}intersectionTest(e,t,i,s){this.useBoundingBoxes?this.doBoundingBoxBroadphase(e,t,i,s):this.doBoundingSphereBroadphase(e,t,i,s)}doBoundingSphereBroadphase(e,t,i,s){const r=pE;t.position.vsub(e.position,r);const o=(e.boundingRadius+t.boundingRadius)**2;r.lengthSquared()<o&&(i.push(e),s.push(t))}doBoundingBoxBroadphase(e,t,i,s){e.aabbNeedsUpdate&&e.updateAABB(),t.aabbNeedsUpdate&&t.updateAABB(),e.aabb.overlaps(t.aabb)&&(i.push(e),s.push(t))}makePairsUnique(e,t){const i=mE,s=gE,r=_E,o=e.length;for(let a=0;a!==o;a++)s[a]=e[a],r[a]=t[a];e.length=0,t.length=0;for(let a=0;a!==o;a++){const l=s[a].id,c=r[a].id,h=l<c?`${l},${c}`:`${c},${l}`;i[h]=a,i.keys.push(h)}for(let a=0;a!==i.keys.length;a++){const l=i.keys.pop(),c=i[l];e.push(s[c]),t.push(r[c]),delete i[l]}}setWorld(e){}static boundingSphereCheck(e,t){const i=new M;e.position.vsub(t.position,i);const s=e.shapes[0],r=t.shapes[0];return Math.pow(s.boundingSphereRadius+r.boundingSphereRadius,2)>i.lengthSquared()}aabbQuery(e,t,i){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const pE=new M;new M;new Pt;new M;const mE={keys:[]},gE=[],_E=[];new M;new M;new M;class vE extends Np{constructor(){super()}collisionPairs(e,t,i){const s=e.bodies,r=s.length;let o,a;for(let l=0;l!==r;l++)for(let c=0;c!==l;c++)o=s[l],a=s[c],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,t,i)}aabbQuery(e,t,i){i===void 0&&(i=[]);for(let s=0;s<e.bodies.length;s++){const r=e.bodies[s];r.aabbNeedsUpdate&&r.updateAABB(),r.aabb.overlaps(t)&&i.push(r)}return i}}class va{constructor(){this.rayFromWorld=new M,this.rayToWorld=new M,this.hitNormalWorld=new M,this.hitPointWorld=new M,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(e,t,i,s,r,o,a){this.rayFromWorld.copy(e),this.rayToWorld.copy(t),this.hitNormalWorld.copy(i),this.hitPointWorld.copy(s),this.shape=r,this.body=o,this.distance=a}}let Fp,Up,Op,Bp,zp,Hp,Vp;const wh={CLOSEST:1,ANY:2,ALL:4};Fp=Le.types.SPHERE;Up=Le.types.PLANE;Op=Le.types.BOX;Bp=Le.types.CYLINDER;zp=Le.types.CONVEXPOLYHEDRON;Hp=Le.types.HEIGHTFIELD;Vp=Le.types.TRIMESH;class Rt{get[Fp](){return this._intersectSphere}get[Up](){return this._intersectPlane}get[Op](){return this._intersectBox}get[Bp](){return this._intersectConvex}get[zp](){return this._intersectConvex}get[Hp](){return this._intersectHeightfield}get[Vp](){return this._intersectTrimesh}constructor(e,t){e===void 0&&(e=new M),t===void 0&&(t=new M),this.from=e.clone(),this.to=t.clone(),this.direction=new M,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Rt.ANY,this.result=new va,this.hasHit=!1,this.callback=i=>{}}intersectWorld(e,t){return this.mode=t.mode||Rt.ANY,this.result=t.result||new va,this.skipBackfaces=!!t.skipBackfaces,this.collisionFilterMask=typeof t.collisionFilterMask<"u"?t.collisionFilterMask:-1,this.collisionFilterGroup=typeof t.collisionFilterGroup<"u"?t.collisionFilterGroup:-1,this.checkCollisionResponse=typeof t.checkCollisionResponse<"u"?t.checkCollisionResponse:!0,t.from&&this.from.copy(t.from),t.to&&this.to.copy(t.to),this.callback=t.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Td),Fl.length=0,e.broadphase.aabbQuery(e,Td,Fl),this.intersectBodies(Fl),this.hasHit}intersectBody(e,t){t&&(this.result=t,this.updateDirection());const i=this.checkCollisionResponse;if(i&&!e.collisionResponse||(this.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&this.collisionFilterMask)===0)return;const s=xE,r=yE;for(let o=0,a=e.shapes.length;o<a;o++){const l=e.shapes[o];if(!(i&&!l.collisionResponse)&&(e.quaternion.mult(e.shapeOrientations[o],r),e.quaternion.vmult(e.shapeOffsets[o],s),s.vadd(e.position,s),this.intersectShape(l,r,s,e),this.result.shouldStop))break}}intersectBodies(e,t){t&&(this.result=t,this.updateDirection());for(let i=0,s=e.length;!this.result.shouldStop&&i<s;i++)this.intersectBody(e[i])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(e,t,i,s){const r=this.from;if(NE(r,this.direction,i)>e.boundingSphereRadius)return;const a=this[e.type];a&&a.call(this,e,t,i,s,e)}_intersectBox(e,t,i,s,r){return this._intersectConvex(e.convexPolyhedronRepresentation,t,i,s,r)}_intersectPlane(e,t,i,s,r){const o=this.from,a=this.to,l=this.direction,c=new M(0,0,1);t.vmult(c,c);const h=new M;o.vsub(i,h);const d=h.dot(c);a.vsub(i,h);const u=h.dot(c);if(d*u>0||o.distanceTo(a)<d)return;const f=c.dot(l);if(Math.abs(f)<this.precision)return;const g=new M,v=new M,p=new M;o.vsub(i,g);const m=-c.dot(g)/f;l.scale(m,v),o.vadd(v,p),this.reportIntersection(c,p,r,s,-1)}getAABB(e){const{lowerBound:t,upperBound:i}=e,s=this.to,r=this.from;t.x=Math.min(s.x,r.x),t.y=Math.min(s.y,r.y),t.z=Math.min(s.z,r.z),i.x=Math.max(s.x,r.x),i.y=Math.max(s.y,r.y),i.z=Math.max(s.z,r.z)}_intersectHeightfield(e,t,i,s,r){e.data,e.elementSize;const o=SE;o.from.copy(this.from),o.to.copy(this.to),ct.pointToLocalFrame(i,t,o.from,o.from),ct.pointToLocalFrame(i,t,o.to,o.to),o.updateDirection();const a=ME;let l,c,h,d;l=c=0,h=d=e.data.length-1;const u=new wn;o.getAABB(u),e.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,a,!0),l=Math.max(l,a[0]),c=Math.max(c,a[1]),e.getIndexOfPosition(u.upperBound.x,u.upperBound.y,a,!0),h=Math.min(h,a[0]+1),d=Math.min(d,a[1]+1);for(let f=l;f<h;f++)for(let g=c;g<d;g++){if(this.result.shouldStop)return;if(e.getAabbAtIndex(f,g,u),!!u.overlapsRay(o)){if(e.getConvexTrianglePillar(f,g,!1),ct.pointToWorldFrame(i,t,e.pillarOffset,Bo),this._intersectConvex(e.pillarConvex,t,Bo,s,r,Ad),this.result.shouldStop)return;e.getConvexTrianglePillar(f,g,!0),ct.pointToWorldFrame(i,t,e.pillarOffset,Bo),this._intersectConvex(e.pillarConvex,t,Bo,s,r,Ad)}}}_intersectSphere(e,t,i,s,r){const o=this.from,a=this.to,l=e.radius,c=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-i.x)+(a.y-o.y)*(o.y-i.y)+(a.z-o.z)*(o.z-i.z)),d=(o.x-i.x)**2+(o.y-i.y)**2+(o.z-i.z)**2-l**2,u=h**2-4*c*d,f=EE,g=bE;if(!(u<0))if(u===0)o.lerp(a,u,f),f.vsub(i,g),g.normalize(),this.reportIntersection(g,f,r,s,-1);else{const v=(-h-Math.sqrt(u))/(2*c),p=(-h+Math.sqrt(u))/(2*c);if(v>=0&&v<=1&&(o.lerp(a,v,f),f.vsub(i,g),g.normalize(),this.reportIntersection(g,f,r,s,-1)),this.result.shouldStop)return;p>=0&&p<=1&&(o.lerp(a,p,f),f.vsub(i,g),g.normalize(),this.reportIntersection(g,f,r,s,-1))}}_intersectConvex(e,t,i,s,r,o){const a=wE,l=Cd,c=o&&o.faceList||null,h=e.faces,d=e.vertices,u=e.faceNormals,f=this.direction,g=this.from,v=this.to,p=g.distanceTo(v),m=c?c.length:h.length,_=this.result;for(let E=0;!_.shouldStop&&E<m;E++){const S=c?c[E]:E,A=h[S],C=u[S],P=t,y=i;l.copy(d[A[0]]),P.vmult(l,l),l.vadd(y,l),l.vsub(g,l),P.vmult(C,a);const T=f.dot(a);if(Math.abs(T)<this.precision)continue;const G=a.dot(l)/T;if(!(G<0)){f.scale(G,hn),hn.vadd(g,hn),On.copy(d[A[0]]),P.vmult(On,On),y.vadd(On,On);for(let D=1;!_.shouldStop&&D<A.length-1;D++){Kn.copy(d[A[D]]),Zn.copy(d[A[D+1]]),P.vmult(Kn,Kn),P.vmult(Zn,Zn),y.vadd(Kn,Kn),y.vadd(Zn,Zn);const H=hn.distanceTo(g);!(Rt.pointInTriangle(hn,On,Kn,Zn)||Rt.pointInTriangle(hn,Kn,On,Zn))||H>p||this.reportIntersection(a,hn,r,s,S)}}}}_intersectTrimesh(e,t,i,s,r,o){const a=TE,l=IE,c=LE,h=Cd,d=AE,u=CE,f=RE,g=DE,v=PE,p=e.indices;e.vertices;const m=this.from,_=this.to,E=this.direction;c.position.copy(i),c.quaternion.copy(t),ct.vectorToLocalFrame(i,t,E,d),ct.pointToLocalFrame(i,t,m,u),ct.pointToLocalFrame(i,t,_,f),f.x*=e.scale.x,f.y*=e.scale.y,f.z*=e.scale.z,u.x*=e.scale.x,u.y*=e.scale.y,u.z*=e.scale.z,f.vsub(u,d),d.normalize();const S=u.distanceSquared(f);e.tree.rayQuery(this,c,l);for(let A=0,C=l.length;!this.result.shouldStop&&A!==C;A++){const P=l[A];e.getNormal(P,a),e.getVertex(p[P*3],On),On.vsub(u,h);const y=d.dot(a),T=a.dot(h)/y;if(T<0)continue;d.scale(T,hn),hn.vadd(u,hn),e.getVertex(p[P*3+1],Kn),e.getVertex(p[P*3+2],Zn);const G=hn.distanceSquared(u);!(Rt.pointInTriangle(hn,Kn,On,Zn)||Rt.pointInTriangle(hn,On,Kn,Zn))||G>S||(ct.vectorToWorldFrame(t,a,v),ct.pointToWorldFrame(i,t,hn,g),this.reportIntersection(v,g,r,s,P))}l.length=0}reportIntersection(e,t,i,s,r){const o=this.from,a=this.to,l=o.distanceTo(t),c=this.result;if(!(this.skipBackfaces&&e.dot(this.direction)>0))switch(c.hitFaceIndex=typeof r<"u"?r:-1,this.mode){case Rt.ALL:this.hasHit=!0,c.set(o,a,e,t,i,s,l),c.hasHit=!0,this.callback(c);break;case Rt.CLOSEST:(l<c.distance||!c.hasHit)&&(this.hasHit=!0,c.hasHit=!0,c.set(o,a,e,t,i,s,l));break;case Rt.ANY:this.hasHit=!0,c.hasHit=!0,c.set(o,a,e,t,i,s,l),c.shouldStop=!0;break}}static pointInTriangle(e,t,i,s){s.vsub(t,_s),i.vsub(t,Tr),e.vsub(t,Ul);const r=_s.dot(_s),o=_s.dot(Tr),a=_s.dot(Ul),l=Tr.dot(Tr),c=Tr.dot(Ul);let h,d;return(h=l*a-o*c)>=0&&(d=r*c-o*a)>=0&&h+d<r*l-o*o}}Rt.CLOSEST=wh.CLOSEST;Rt.ANY=wh.ANY;Rt.ALL=wh.ALL;const Td=new wn,Fl=[],Tr=new M,Ul=new M,xE=new M,yE=new Pt,hn=new M,On=new M,Kn=new M,Zn=new M;new M;new va;const Ad={faceList:[0]},Bo=new M,SE=new Rt,ME=[],EE=new M,bE=new M,wE=new M;new M;new M;const Cd=new M,TE=new M,AE=new M,CE=new M,RE=new M,PE=new M,DE=new M;new wn;const IE=[],LE=new ct,_s=new M,zo=new M;function NE(n,e,t){t.vsub(n,_s);const i=_s.dot(e);return e.scale(i,zo),zo.vadd(n,zo),t.distanceTo(zo)}class Ks extends Np{static checkBounds(e,t,i){let s,r;i===0?(s=e.position.x,r=t.position.x):i===1?(s=e.position.y,r=t.position.y):i===2&&(s=e.position.z,r=t.position.z);const o=e.boundingRadius,a=t.boundingRadius,l=s+o;return r-a<l}static insertionSortX(e){for(let t=1,i=e.length;t<i;t++){const s=e[t];let r;for(r=t-1;r>=0&&!(e[r].aabb.lowerBound.x<=s.aabb.lowerBound.x);r--)e[r+1]=e[r];e[r+1]=s}return e}static insertionSortY(e){for(let t=1,i=e.length;t<i;t++){const s=e[t];let r;for(r=t-1;r>=0&&!(e[r].aabb.lowerBound.y<=s.aabb.lowerBound.y);r--)e[r+1]=e[r];e[r+1]=s}return e}static insertionSortZ(e){for(let t=1,i=e.length;t<i;t++){const s=e[t];let r;for(r=t-1;r>=0&&!(e[r].aabb.lowerBound.z<=s.aabb.lowerBound.z);r--)e[r+1]=e[r];e[r+1]=s}return e}constructor(e){super(),this.axisList=[],this.world=null,this.axisIndex=0;const t=this.axisList;this._addBodyHandler=i=>{t.push(i.body)},this._removeBodyHandler=i=>{const s=t.indexOf(i.body);s!==-1&&t.splice(s,1)},e&&this.setWorld(e)}setWorld(e){this.axisList.length=0;for(let t=0;t<e.bodies.length;t++)this.axisList.push(e.bodies[t]);e.removeEventListener("addBody",this._addBodyHandler),e.removeEventListener("removeBody",this._removeBodyHandler),e.addEventListener("addBody",this._addBodyHandler),e.addEventListener("removeBody",this._removeBodyHandler),this.world=e,this.dirty=!0}collisionPairs(e,t,i){const s=this.axisList,r=s.length,o=this.axisIndex;let a,l;for(this.dirty&&(this.sortList(),this.dirty=!1),a=0;a!==r;a++){const c=s[a];for(l=a+1;l<r;l++){const h=s[l];if(this.needBroadphaseCollision(c,h)){if(!Ks.checkBounds(c,h,o))break;this.intersectionTest(c,h,t,i)}}}}sortList(){const e=this.axisList,t=this.axisIndex,i=e.length;for(let s=0;s!==i;s++){const r=e[s];r.aabbNeedsUpdate&&r.updateAABB()}t===0?Ks.insertionSortX(e):t===1?Ks.insertionSortY(e):t===2&&Ks.insertionSortZ(e)}autoDetectAxis(){let e=0,t=0,i=0,s=0,r=0,o=0;const a=this.axisList,l=a.length,c=1/l;for(let f=0;f!==l;f++){const g=a[f],v=g.position.x;e+=v,t+=v*v;const p=g.position.y;i+=p,s+=p*p;const m=g.position.z;r+=m,o+=m*m}const h=t-e*e*c,d=s-i*i*c,u=o-r*r*c;h>d?h>u?this.axisIndex=0:this.axisIndex=2:d>u?this.axisIndex=1:this.axisIndex=2}aabbQuery(e,t,i){i===void 0&&(i=[]),this.dirty&&(this.sortList(),this.dirty=!1);const s=this.axisIndex;let r="x";s===1&&(r="y"),s===2&&(r="z");const o=this.axisList;t.lowerBound[r],t.upperBound[r];for(let a=0;a<o.length;a++){const l=o[a];l.aabbNeedsUpdate&&l.updateAABB(),l.aabb.overlaps(t)&&i.push(l)}return i}}class FE{static defaults(e,t){e===void 0&&(e={});for(let i in t)i in e||(e[i]=t[i]);return e}}class Rd{constructor(){this.spatial=new M,this.rotational=new M}multiplyElement(e){return e.spatial.dot(this.spatial)+e.rotational.dot(this.rotational)}multiplyVectors(e,t){return e.dot(this.spatial)+t.dot(this.rotational)}}class oo{constructor(e,t,i,s){i===void 0&&(i=-1e6),s===void 0&&(s=1e6),this.id=oo.idCounter++,this.minForce=i,this.maxForce=s,this.bi=e,this.bj=t,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Rd,this.jacobianElementB=new Rd,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(e,t,i){const s=t,r=e,o=i;this.a=4/(o*(1+4*s)),this.b=4*s/(1+4*s),this.eps=4/(o*o*r*(1+4*s))}computeB(e,t,i){const s=this.computeGW(),r=this.computeGq(),o=this.computeGiMf();return-r*e-s*t-o*i}computeGq(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,s=this.bj,r=i.position,o=s.position;return e.spatial.dot(r)+t.spatial.dot(o)}computeGW(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,s=this.bj,r=i.velocity,o=s.velocity,a=i.angularVelocity,l=s.angularVelocity;return e.multiplyVectors(r,a)+t.multiplyVectors(o,l)}computeGWlambda(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,s=this.bj,r=i.vlambda,o=s.vlambda,a=i.wlambda,l=s.wlambda;return e.multiplyVectors(r,a)+t.multiplyVectors(o,l)}computeGiMf(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,s=this.bj,r=i.force,o=i.torque,a=s.force,l=s.torque,c=i.invMassSolve,h=s.invMassSolve;return r.scale(c,Pd),a.scale(h,Dd),i.invInertiaWorldSolve.vmult(o,Id),s.invInertiaWorldSolve.vmult(l,Ld),e.multiplyVectors(Pd,Id)+t.multiplyVectors(Dd,Ld)}computeGiMGt(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,s=this.bj,r=i.invMassSolve,o=s.invMassSolve,a=i.invInertiaWorldSolve,l=s.invInertiaWorldSolve;let c=r+o;return a.vmult(e.rotational,Ho),c+=Ho.dot(e.rotational),l.vmult(t.rotational,Ho),c+=Ho.dot(t.rotational),c}addToWlambda(e){const t=this.jacobianElementA,i=this.jacobianElementB,s=this.bi,r=this.bj,o=UE;s.vlambda.addScaledVector(s.invMassSolve*e,t.spatial,s.vlambda),r.vlambda.addScaledVector(r.invMassSolve*e,i.spatial,r.vlambda),s.invInertiaWorldSolve.vmult(t.rotational,o),s.wlambda.addScaledVector(e,o,s.wlambda),r.invInertiaWorldSolve.vmult(i.rotational,o),r.wlambda.addScaledVector(e,o,r.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}oo.idCounter=0;const Pd=new M,Dd=new M,Id=new M,Ld=new M,Ho=new M,UE=new M;class OE extends oo{constructor(e,t,i){i===void 0&&(i=1e6),super(e,t,0,i),this.restitution=0,this.ri=new M,this.rj=new M,this.ni=new M}computeB(e){const t=this.a,i=this.b,s=this.bi,r=this.bj,o=this.ri,a=this.rj,l=BE,c=zE,h=s.velocity,d=s.angularVelocity;s.force,s.torque;const u=r.velocity,f=r.angularVelocity;r.force,r.torque;const g=HE,v=this.jacobianElementA,p=this.jacobianElementB,m=this.ni;o.cross(m,l),a.cross(m,c),m.negate(v.spatial),l.negate(v.rotational),p.spatial.copy(m),p.rotational.copy(c),g.copy(r.position),g.vadd(a,g),g.vsub(s.position,g),g.vsub(o,g);const _=m.dot(g),E=this.restitution+1,S=E*u.dot(m)-E*h.dot(m)+f.dot(c)-d.dot(l),A=this.computeGiMf();return-_*t-S*i-e*A}getImpactVelocityAlongNormal(){const e=VE,t=GE,i=kE,s=WE,r=XE;return this.bi.position.vadd(this.ri,i),this.bj.position.vadd(this.rj,s),this.bi.getVelocityAtWorldPoint(i,e),this.bj.getVelocityAtWorldPoint(s,t),e.vsub(t,r),this.ni.dot(r)}}const BE=new M,zE=new M,HE=new M,VE=new M,GE=new M,kE=new M,WE=new M,XE=new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;class Nd extends oo{constructor(e,t,i){super(e,t,-i,i),this.ri=new M,this.rj=new M,this.t=new M}computeB(e){this.a;const t=this.b;this.bi,this.bj;const i=this.ri,s=this.rj,r=qE,o=YE,a=this.t;i.cross(a,r),s.cross(a,o);const l=this.jacobianElementA,c=this.jacobianElementB;a.negate(l.spatial),r.negate(l.rotational),c.spatial.copy(a),c.rotational.copy(o);const h=this.computeGW(),d=this.computeGiMf();return-h*t-e*d}}const qE=new M,YE=new M;class Ha{constructor(e,t,i){i=FE.defaults(i,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=Ha.idCounter++,this.materials=[e,t],this.friction=i.friction,this.restitution=i.restitution,this.contactEquationStiffness=i.contactEquationStiffness,this.contactEquationRelaxation=i.contactEquationRelaxation,this.frictionEquationStiffness=i.frictionEquationStiffness,this.frictionEquationRelaxation=i.frictionEquationRelaxation}}Ha.idCounter=0;class Va{constructor(e){e===void 0&&(e={});let t="";typeof e=="string"&&(t=e,e={}),this.name=t,this.id=Va.idCounter++,this.friction=typeof e.friction<"u"?e.friction:-1,this.restitution=typeof e.restitution<"u"?e.restitution:-1}}Va.idCounter=0;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new Rt;new M;new M;new M;new M(1,0,0),new M(0,1,0),new M(0,0,1);new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;class jE extends Le{constructor(){super({type:Le.types.PLANE}),this.worldNormal=new M,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(e){const t=this.worldNormal;t.set(0,0,1),e.vmult(t,t),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(e,t){return t===void 0&&(t=new M),t}volume(){return Number.MAX_VALUE}calculateWorldAABB(e,t,i,s){vi.set(0,0,1),t.vmult(vi,vi);const r=Number.MAX_VALUE;i.set(-r,-r,-r),s.set(r,r,r),vi.x===1?s.x=e.x:vi.x===-1&&(i.x=e.x),vi.y===1?s.y=e.y:vi.y===-1&&(i.y=e.y),vi.z===1?s.z=e.z:vi.z===-1&&(i.z=e.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}}const vi=new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new M;new wn;new M;new wn;new M;new M;new M;new M;new M;new M;new M;new wn;new M;new ct;new wn;class $E{constructor(){this.equations=[]}solve(e,t){return 0}addEquation(e){e.enabled&&!e.bi.isTrigger&&!e.bj.isTrigger&&this.equations.push(e)}removeEquation(e){const t=this.equations,i=t.indexOf(e);i!==-1&&t.splice(i,1)}removeAllEquations(){this.equations.length=0}}class KE extends $E{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(e,t){let i=0;const s=this.iterations,r=this.tolerance*this.tolerance,o=this.equations,a=o.length,l=t.bodies,c=l.length,h=e;let d,u,f,g,v,p;if(a!==0)for(let S=0;S!==c;S++)l[S].updateSolveMassProperties();const m=JE,_=QE,E=ZE;m.length=a,_.length=a,E.length=a;for(let S=0;S!==a;S++){const A=o[S];E[S]=0,_[S]=A.computeB(h),m[S]=1/A.computeC()}if(a!==0){for(let C=0;C!==c;C++){const P=l[C],y=P.vlambda,T=P.wlambda;y.set(0,0,0),T.set(0,0,0)}for(i=0;i!==s;i++){g=0;for(let C=0;C!==a;C++){const P=o[C];d=_[C],u=m[C],p=E[C],v=P.computeGWlambda(),f=u*(d-v-P.eps*p),p+f<P.minForce?f=P.minForce-p:p+f>P.maxForce&&(f=P.maxForce-p),E[C]+=f,g+=f>0?f:-f,P.addToWlambda(f)}if(g*g<r)break}for(let C=0;C!==c;C++){const P=l[C],y=P.velocity,T=P.angularVelocity;P.vlambda.vmul(P.linearFactor,P.vlambda),y.vadd(P.vlambda,y),P.wlambda.vmul(P.angularFactor,P.wlambda),T.vadd(P.wlambda,T)}let S=o.length;const A=1/h;for(;S--;)o[S].multiplier=E[S]*A}return i}}const ZE=[],JE=[],QE=[];class eb{constructor(){this.objects=[],this.type=Object}release(){const e=arguments.length;for(let t=0;t!==e;t++)this.objects.push(t<0||arguments.length<=t?void 0:arguments[t]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(e){const t=this.objects;for(;t.length>e;)t.pop();for(;t.length<e;)t.push(this.constructObject());return this}}class tb extends eb{constructor(){super(...arguments),this.type=M}constructObject(){return new M}}const bt={sphereSphere:Le.types.SPHERE,spherePlane:Le.types.SPHERE|Le.types.PLANE,boxBox:Le.types.BOX|Le.types.BOX,sphereBox:Le.types.SPHERE|Le.types.BOX,planeBox:Le.types.PLANE|Le.types.BOX,convexConvex:Le.types.CONVEXPOLYHEDRON,sphereConvex:Le.types.SPHERE|Le.types.CONVEXPOLYHEDRON,planeConvex:Le.types.PLANE|Le.types.CONVEXPOLYHEDRON,boxConvex:Le.types.BOX|Le.types.CONVEXPOLYHEDRON,sphereHeightfield:Le.types.SPHERE|Le.types.HEIGHTFIELD,boxHeightfield:Le.types.BOX|Le.types.HEIGHTFIELD,convexHeightfield:Le.types.CONVEXPOLYHEDRON|Le.types.HEIGHTFIELD,sphereParticle:Le.types.PARTICLE|Le.types.SPHERE,planeParticle:Le.types.PLANE|Le.types.PARTICLE,boxParticle:Le.types.BOX|Le.types.PARTICLE,convexParticle:Le.types.PARTICLE|Le.types.CONVEXPOLYHEDRON,cylinderCylinder:Le.types.CYLINDER,sphereCylinder:Le.types.SPHERE|Le.types.CYLINDER,planeCylinder:Le.types.PLANE|Le.types.CYLINDER,boxCylinder:Le.types.BOX|Le.types.CYLINDER,convexCylinder:Le.types.CONVEXPOLYHEDRON|Le.types.CYLINDER,heightfieldCylinder:Le.types.HEIGHTFIELD|Le.types.CYLINDER,particleCylinder:Le.types.PARTICLE|Le.types.CYLINDER,sphereTrimesh:Le.types.SPHERE|Le.types.TRIMESH,planeTrimesh:Le.types.PLANE|Le.types.TRIMESH};class nb{get[bt.sphereSphere](){return this.sphereSphere}get[bt.spherePlane](){return this.spherePlane}get[bt.boxBox](){return this.boxBox}get[bt.sphereBox](){return this.sphereBox}get[bt.planeBox](){return this.planeBox}get[bt.convexConvex](){return this.convexConvex}get[bt.sphereConvex](){return this.sphereConvex}get[bt.planeConvex](){return this.planeConvex}get[bt.boxConvex](){return this.boxConvex}get[bt.sphereHeightfield](){return this.sphereHeightfield}get[bt.boxHeightfield](){return this.boxHeightfield}get[bt.convexHeightfield](){return this.convexHeightfield}get[bt.sphereParticle](){return this.sphereParticle}get[bt.planeParticle](){return this.planeParticle}get[bt.boxParticle](){return this.boxParticle}get[bt.convexParticle](){return this.convexParticle}get[bt.cylinderCylinder](){return this.convexConvex}get[bt.sphereCylinder](){return this.sphereConvex}get[bt.planeCylinder](){return this.planeConvex}get[bt.boxCylinder](){return this.boxConvex}get[bt.convexCylinder](){return this.convexConvex}get[bt.heightfieldCylinder](){return this.heightfieldCylinder}get[bt.particleCylinder](){return this.particleCylinder}get[bt.sphereTrimesh](){return this.sphereTrimesh}get[bt.planeTrimesh](){return this.planeTrimesh}constructor(e){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new tb,this.world=e,this.currentContactMaterial=e.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(e,t,i,s,r,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=e,a.bj=t):a=new OE(e,t),a.enabled=e.collisionResponse&&t.collisionResponse&&i.collisionResponse&&s.collisionResponse;const l=this.currentContactMaterial;a.restitution=l.restitution,a.setSpookParams(l.contactEquationStiffness,l.contactEquationRelaxation,this.world.dt);const c=i.material||e.material,h=s.material||t.material;return c&&h&&c.restitution>=0&&h.restitution>=0&&(a.restitution=c.restitution*h.restitution),a.si=r||i,a.sj=o||s,a}createFrictionEquationsFromContact(e,t){const i=e.bi,s=e.bj,r=e.si,o=e.sj,a=this.world,l=this.currentContactMaterial;let c=l.friction;const h=r.material||i.material,d=o.material||s.material;if(h&&d&&h.friction>=0&&d.friction>=0&&(c=h.friction*d.friction),c>0){const u=c*(a.frictionGravity||a.gravity).length();let f=i.invMass+s.invMass;f>0&&(f=1/f);const g=this.frictionEquationPool,v=g.length?g.pop():new Nd(i,s,u*f),p=g.length?g.pop():new Nd(i,s,u*f);return v.bi=p.bi=i,v.bj=p.bj=s,v.minForce=p.minForce=-u*f,v.maxForce=p.maxForce=u*f,v.ri.copy(e.ri),v.rj.copy(e.rj),p.ri.copy(e.ri),p.rj.copy(e.rj),e.ni.tangents(v.t,p.t),v.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),p.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),v.enabled=p.enabled=e.enabled,t.push(v,p),!0}return!1}createFrictionFromAverage(e){let t=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(t,this.frictionResult)||e===1)return;const i=this.frictionResult[this.frictionResult.length-2],s=this.frictionResult[this.frictionResult.length-1];us.setZero(),Xs.setZero(),qs.setZero();const r=t.bi;t.bj;for(let a=0;a!==e;a++)t=this.result[this.result.length-1-a],t.bi!==r?(us.vadd(t.ni,us),Xs.vadd(t.ri,Xs),qs.vadd(t.rj,qs)):(us.vsub(t.ni,us),Xs.vadd(t.rj,Xs),qs.vadd(t.ri,qs));const o=1/e;Xs.scale(o,i.ri),qs.scale(o,i.rj),s.ri.copy(i.ri),s.rj.copy(i.rj),us.normalize(),us.tangents(i.t,s.t)}getContacts(e,t,i,s,r,o,a){this.contactPointPool=r,this.frictionEquationPool=a,this.result=s,this.frictionResult=o;const l=rb,c=ob,h=ib,d=sb;for(let u=0,f=e.length;u!==f;u++){const g=e[u],v=t[u];let p=null;g.material&&v.material&&(p=i.getContactMaterial(g.material,v.material)||null);const m=g.type&be.KINEMATIC&&v.type&be.STATIC||g.type&be.STATIC&&v.type&be.KINEMATIC||g.type&be.KINEMATIC&&v.type&be.KINEMATIC;for(let _=0;_<g.shapes.length;_++){g.quaternion.mult(g.shapeOrientations[_],l),g.quaternion.vmult(g.shapeOffsets[_],h),h.vadd(g.position,h);const E=g.shapes[_];for(let S=0;S<v.shapes.length;S++){v.quaternion.mult(v.shapeOrientations[S],c),v.quaternion.vmult(v.shapeOffsets[S],d),d.vadd(v.position,d);const A=v.shapes[S];if(!(E.collisionFilterMask&A.collisionFilterGroup&&A.collisionFilterMask&E.collisionFilterGroup)||h.distanceTo(d)>E.boundingSphereRadius+A.boundingSphereRadius)continue;let C=null;E.material&&A.material&&(C=i.getContactMaterial(E.material,A.material)||null),this.currentContactMaterial=C||p||i.defaultContactMaterial;const P=E.type|A.type,y=this[P];if(y){let T=!1;E.type<A.type?T=y.call(this,E,A,h,d,l,c,g,v,E,A,m):T=y.call(this,A,E,d,h,c,l,v,g,E,A,m),T&&m&&(i.shapeOverlapKeeper.set(E.id,A.id),i.bodyOverlapKeeper.set(g.id,v.id))}}}}}sphereSphere(e,t,i,s,r,o,a,l,c,h,d){if(d)return i.distanceSquared(s)<(e.radius+t.radius)**2;const u=this.createContactEquation(a,l,e,t,c,h);s.vsub(i,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(e.radius,u.ri),u.rj.scale(-t.radius,u.rj),u.ri.vadd(i,u.ri),u.ri.vsub(a.position,u.ri),u.rj.vadd(s,u.rj),u.rj.vsub(l.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(e,t,i,s,r,o,a,l,c,h,d){const u=this.createContactEquation(a,l,e,t,c,h);if(u.ni.set(0,0,1),o.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),u.ni.scale(e.radius,u.ri),i.vsub(s,Vo),u.ni.scale(u.ni.dot(Vo),Fd),Vo.vsub(Fd,u.rj),-Vo.dot(u.ni)<=e.radius){if(d)return!0;const f=u.ri,g=u.rj;f.vadd(i,f),f.vsub(a.position,f),g.vadd(s,g),g.vsub(l.position,g),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(e,t,i,s,r,o,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t.convexPolyhedronRepresentation,i,s,r,o,a,l,e,t,d)}sphereBox(e,t,i,s,r,o,a,l,c,h,d){const u=this.v3pool,f=Ib;i.vsub(s,Go),t.getSideNormals(f,o);const g=e.radius;let v=!1;const p=Nb,m=Fb,_=Ub;let E=null,S=0,A=0,C=0,P=null;for(let I=0,z=f.length;I!==z&&v===!1;I++){const q=Rb;q.copy(f[I]);const Q=q.length();q.normalize();const me=Go.dot(q);if(me<Q+g&&me>0){const _e=Pb,ie=Db;_e.copy(f[(I+1)%3]),ie.copy(f[(I+2)%3]);const Ge=_e.length(),at=ie.length();_e.normalize(),ie.normalize();const lt=Go.dot(_e),se=Go.dot(ie);if(lt<Ge&&lt>-Ge&&se<at&&se>-at){const pe=Math.abs(me-Q-g);if((P===null||pe<P)&&(P=pe,A=lt,C=se,E=Q,p.copy(q),m.copy(_e),_.copy(ie),S++,d))return!0}}}if(S){v=!0;const I=this.createContactEquation(a,l,e,t,c,h);p.scale(-g,I.ri),I.ni.copy(p),I.ni.negate(I.ni),p.scale(E,p),m.scale(A,m),p.vadd(m,p),_.scale(C,_),p.vadd(_,I.rj),I.ri.vadd(i,I.ri),I.ri.vsub(a.position,I.ri),I.rj.vadd(s,I.rj),I.rj.vsub(l.position,I.rj),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}let y=u.get();const T=Lb;for(let I=0;I!==2&&!v;I++)for(let z=0;z!==2&&!v;z++)for(let q=0;q!==2&&!v;q++)if(y.set(0,0,0),I?y.vadd(f[0],y):y.vsub(f[0],y),z?y.vadd(f[1],y):y.vsub(f[1],y),q?y.vadd(f[2],y):y.vsub(f[2],y),s.vadd(y,T),T.vsub(i,T),T.lengthSquared()<g*g){if(d)return!0;v=!0;const Q=this.createContactEquation(a,l,e,t,c,h);Q.ri.copy(T),Q.ri.normalize(),Q.ni.copy(Q.ri),Q.ri.scale(g,Q.ri),Q.rj.copy(y),Q.ri.vadd(i,Q.ri),Q.ri.vsub(a.position,Q.ri),Q.rj.vadd(s,Q.rj),Q.rj.vsub(l.position,Q.rj),this.result.push(Q),this.createFrictionEquationsFromContact(Q,this.frictionResult)}u.release(y),y=null;const G=u.get(),D=u.get(),H=u.get(),L=u.get(),B=u.get(),F=f.length;for(let I=0;I!==F&&!v;I++)for(let z=0;z!==F&&!v;z++)if(I%3!==z%3){f[z].cross(f[I],G),G.normalize(),f[I].vadd(f[z],D),H.copy(i),H.vsub(D,H),H.vsub(s,H);const q=H.dot(G);G.scale(q,L);let Q=0;for(;Q===I%3||Q===z%3;)Q++;B.copy(i),B.vsub(L,B),B.vsub(D,B),B.vsub(s,B);const me=Math.abs(q),_e=B.length();if(me<f[Q].length()&&_e<g){if(d)return!0;v=!0;const ie=this.createContactEquation(a,l,e,t,c,h);D.vadd(L,ie.rj),ie.rj.copy(ie.rj),B.negate(ie.ni),ie.ni.normalize(),ie.ri.copy(ie.rj),ie.ri.vadd(s,ie.ri),ie.ri.vsub(i,ie.ri),ie.ri.normalize(),ie.ri.scale(g,ie.ri),ie.ri.vadd(i,ie.ri),ie.ri.vsub(a.position,ie.ri),ie.rj.vadd(s,ie.rj),ie.rj.vsub(l.position,ie.rj),this.result.push(ie),this.createFrictionEquationsFromContact(ie,this.frictionResult)}}u.release(G,D,H,L,B)}planeBox(e,t,i,s,r,o,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,t.convexPolyhedronRepresentation.id=t.id,this.planeConvex(e,t.convexPolyhedronRepresentation,i,s,r,o,a,l,e,t,d)}convexConvex(e,t,i,s,r,o,a,l,c,h,d,u,f){const g=Zb;if(!(i.distanceTo(s)>e.boundingSphereRadius+t.boundingSphereRadius)&&e.findSeparatingAxis(t,i,r,s,o,g,u,f)){const v=[],p=Jb;e.clipAgainstHull(i,r,t,s,o,g,-100,100,v);let m=0;for(let _=0;_!==v.length;_++){if(d)return!0;const E=this.createContactEquation(a,l,e,t,c,h),S=E.ri,A=E.rj;g.negate(E.ni),v[_].normal.negate(p),p.scale(v[_].depth,p),v[_].point.vadd(p,S),A.copy(v[_].point),S.vsub(i,S),A.vsub(s,A),S.vadd(i,S),S.vsub(a.position,S),A.vadd(s,A),A.vsub(l.position,A),this.result.push(E),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(E,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}}sphereConvex(e,t,i,s,r,o,a,l,c,h,d){const u=this.v3pool;i.vsub(s,Ob);const f=t.faceNormals,g=t.faces,v=t.vertices,p=e.radius;let m=!1;for(let _=0;_!==v.length;_++){const E=v[_],S=Vb;o.vmult(E,S),s.vadd(S,S);const A=Hb;if(S.vsub(i,A),A.lengthSquared()<p*p){if(d)return!0;m=!0;const C=this.createContactEquation(a,l,e,t,c,h);C.ri.copy(A),C.ri.normalize(),C.ni.copy(C.ri),C.ri.scale(p,C.ri),S.vsub(s,C.rj),C.ri.vadd(i,C.ri),C.ri.vsub(a.position,C.ri),C.rj.vadd(s,C.rj),C.rj.vsub(l.position,C.rj),this.result.push(C),this.createFrictionEquationsFromContact(C,this.frictionResult);return}}for(let _=0,E=g.length;_!==E&&m===!1;_++){const S=f[_],A=g[_],C=Gb;o.vmult(S,C);const P=kb;o.vmult(v[A[0]],P),P.vadd(s,P);const y=Wb;C.scale(-p,y),i.vadd(y,y);const T=Xb;y.vsub(P,T);const G=T.dot(C),D=qb;if(i.vsub(P,D),G<0&&D.dot(C)>0){const H=[];for(let L=0,B=A.length;L!==B;L++){const F=u.get();o.vmult(v[A[L]],F),s.vadd(F,F),H.push(F)}if(Cb(H,C,i)){if(d)return!0;m=!0;const L=this.createContactEquation(a,l,e,t,c,h);C.scale(-p,L.ri),C.negate(L.ni);const B=u.get();C.scale(-G,B);const F=u.get();C.scale(-p,F),i.vsub(s,L.rj),L.rj.vadd(F,L.rj),L.rj.vadd(B,L.rj),L.rj.vadd(s,L.rj),L.rj.vsub(l.position,L.rj),L.ri.vadd(i,L.ri),L.ri.vsub(a.position,L.ri),u.release(B),u.release(F),this.result.push(L),this.createFrictionEquationsFromContact(L,this.frictionResult);for(let I=0,z=H.length;I!==z;I++)u.release(H[I]);return}else for(let L=0;L!==A.length;L++){const B=u.get(),F=u.get();o.vmult(v[A[(L+1)%A.length]],B),o.vmult(v[A[(L+2)%A.length]],F),s.vadd(B,B),s.vadd(F,F);const I=Bb;F.vsub(B,I);const z=zb;I.unit(z);const q=u.get(),Q=u.get();i.vsub(B,Q);const me=Q.dot(z);z.scale(me,q),q.vadd(B,q);const _e=u.get();if(q.vsub(i,_e),me>0&&me*me<I.lengthSquared()&&_e.lengthSquared()<p*p){if(d)return!0;const ie=this.createContactEquation(a,l,e,t,c,h);q.vsub(s,ie.rj),q.vsub(i,ie.ni),ie.ni.normalize(),ie.ni.scale(p,ie.ri),ie.rj.vadd(s,ie.rj),ie.rj.vsub(l.position,ie.rj),ie.ri.vadd(i,ie.ri),ie.ri.vsub(a.position,ie.ri),this.result.push(ie),this.createFrictionEquationsFromContact(ie,this.frictionResult);for(let Ge=0,at=H.length;Ge!==at;Ge++)u.release(H[Ge]);u.release(B),u.release(F),u.release(q),u.release(_e),u.release(Q);return}u.release(B),u.release(F),u.release(q),u.release(_e),u.release(Q)}for(let L=0,B=H.length;L!==B;L++)u.release(H[L])}}}planeConvex(e,t,i,s,r,o,a,l,c,h,d){const u=Yb,f=jb;f.set(0,0,1),r.vmult(f,f);let g=0;const v=$b;for(let p=0;p!==t.vertices.length;p++)if(u.copy(t.vertices[p]),o.vmult(u,u),s.vadd(u,u),u.vsub(i,v),f.dot(v)<=0){if(d)return!0;const _=this.createContactEquation(a,l,e,t,c,h),E=Kb;f.scale(f.dot(v),E),u.vsub(E,E),E.vsub(i,_.ri),_.ni.copy(f),u.vsub(s,_.rj),_.ri.vadd(i,_.ri),_.ri.vsub(a.position,_.ri),_.rj.vadd(s,_.rj),_.rj.vsub(l.position,_.rj),this.result.push(_),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(_,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(e,t,i,s,r,o,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t,i,s,r,o,a,l,e,t,d)}sphereHeightfield(e,t,i,s,r,o,a,l,c,h,d){const u=t.data,f=e.radius,g=t.elementSize,v=hw,p=cw;ct.pointToLocalFrame(s,o,i,p);let m=Math.floor((p.x-f)/g)-1,_=Math.ceil((p.x+f)/g)+1,E=Math.floor((p.y-f)/g)-1,S=Math.ceil((p.y+f)/g)+1;if(_<0||S<0||m>u.length||E>u[0].length)return;m<0&&(m=0),_<0&&(_=0),E<0&&(E=0),S<0&&(S=0),m>=u.length&&(m=u.length-1),_>=u.length&&(_=u.length-1),S>=u[0].length&&(S=u[0].length-1),E>=u[0].length&&(E=u[0].length-1);const A=[];t.getRectMinMax(m,E,_,S,A);const C=A[0],P=A[1];if(p.z-f>P||p.z+f<C)return;const y=this.result;for(let T=m;T<_;T++)for(let G=E;G<S;G++){const D=y.length;let H=!1;if(t.getConvexTrianglePillar(T,G,!1),ct.pointToWorldFrame(s,o,t.pillarOffset,v),i.distanceTo(v)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(H=this.sphereConvex(e,t.pillarConvex,i,v,r,o,a,l,e,t,d)),d&&H||(t.getConvexTrianglePillar(T,G,!0),ct.pointToWorldFrame(s,o,t.pillarOffset,v),i.distanceTo(v)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(H=this.sphereConvex(e,t.pillarConvex,i,v,r,o,a,l,e,t,d)),d&&H))return!0;if(y.length-D>2)return}}boxHeightfield(e,t,i,s,r,o,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexHeightfield(e.convexPolyhedronRepresentation,t,i,s,r,o,a,l,e,t,d)}convexHeightfield(e,t,i,s,r,o,a,l,c,h,d){const u=t.data,f=t.elementSize,g=e.boundingSphereRadius,v=aw,p=lw,m=ow;ct.pointToLocalFrame(s,o,i,m);let _=Math.floor((m.x-g)/f)-1,E=Math.ceil((m.x+g)/f)+1,S=Math.floor((m.y-g)/f)-1,A=Math.ceil((m.y+g)/f)+1;if(E<0||A<0||_>u.length||S>u[0].length)return;_<0&&(_=0),E<0&&(E=0),S<0&&(S=0),A<0&&(A=0),_>=u.length&&(_=u.length-1),E>=u.length&&(E=u.length-1),A>=u[0].length&&(A=u[0].length-1),S>=u[0].length&&(S=u[0].length-1);const C=[];t.getRectMinMax(_,S,E,A,C);const P=C[0],y=C[1];if(!(m.z-g>y||m.z+g<P))for(let T=_;T<E;T++)for(let G=S;G<A;G++){let D=!1;if(t.getConvexTrianglePillar(T,G,!1),ct.pointToWorldFrame(s,o,t.pillarOffset,v),i.distanceTo(v)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(D=this.convexConvex(e,t.pillarConvex,i,v,r,o,a,l,null,null,d,p,null)),d&&D||(t.getConvexTrianglePillar(T,G,!0),ct.pointToWorldFrame(s,o,t.pillarOffset,v),i.distanceTo(v)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(D=this.convexConvex(e,t.pillarConvex,i,v,r,o,a,l,null,null,d,p,null)),d&&D))return!0}}sphereParticle(e,t,i,s,r,o,a,l,c,h,d){const u=nw;if(u.set(0,0,1),s.vsub(i,u),u.lengthSquared()<=e.radius*e.radius){if(d)return!0;const g=this.createContactEquation(l,a,t,e,c,h);u.normalize(),g.rj.copy(u),g.rj.scale(e.radius,g.rj),g.ni.copy(u),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(e,t,i,s,r,o,a,l,c,h,d){const u=Qb;u.set(0,0,1),a.quaternion.vmult(u,u);const f=ew;if(s.vsub(a.position,f),u.dot(f)<=0){if(d)return!0;const v=this.createContactEquation(l,a,t,e,c,h);v.ni.copy(u),v.ni.negate(v.ni),v.ri.set(0,0,0);const p=tw;u.scale(u.dot(s),p),s.vsub(p,p),v.rj.copy(p),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(e,t,i,s,r,o,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexParticle(e.convexPolyhedronRepresentation,t,i,s,r,o,a,l,e,t,d)}convexParticle(e,t,i,s,r,o,a,l,c,h,d){let u=-1;const f=sw,g=rw;let v=null;const p=iw;if(p.copy(s),p.vsub(i,p),r.conjugate(Ud),Ud.vmult(p,p),e.pointIsInside(p)){e.worldVerticesNeedsUpdate&&e.computeWorldVertices(i,r),e.worldFaceNormalsNeedsUpdate&&e.computeWorldFaceNormals(r);for(let m=0,_=e.faces.length;m!==_;m++){const E=[e.worldVertices[e.faces[m][0]]],S=e.worldFaceNormals[m];s.vsub(E[0],Od);const A=-S.dot(Od);if(v===null||Math.abs(A)<Math.abs(v)){if(d)return!0;v=A,u=m,f.copy(S)}}if(u!==-1){const m=this.createContactEquation(l,a,t,e,c,h);f.scale(v,g),g.vadd(s,g),g.vsub(i,g),m.rj.copy(g),f.negate(m.ni),m.ri.set(0,0,0);const _=m.ri,E=m.rj;_.vadd(s,_),_.vsub(l.position,_),E.vadd(i,E),E.vsub(a.position,E),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(e,t,i,s,r,o,a,l,c,h,d){return this.convexHeightfield(t,e,s,i,o,r,l,a,c,h,d)}particleCylinder(e,t,i,s,r,o,a,l,c,h,d){return this.convexParticle(t,e,s,i,o,r,l,a,c,h,d)}sphereTrimesh(e,t,i,s,r,o,a,l,c,h,d){const u=pb,f=mb,g=gb,v=_b,p=vb,m=xb,_=Eb,E=fb,S=ub,A=bb;ct.pointToLocalFrame(s,o,i,p);const C=e.radius;_.lowerBound.set(p.x-C,p.y-C,p.z-C),_.upperBound.set(p.x+C,p.y+C,p.z+C),t.getTrianglesInAABB(_,A);const P=db,y=e.radius*e.radius;for(let L=0;L<A.length;L++)for(let B=0;B<3;B++)if(t.getVertex(t.indices[A[L]*3+B],P),P.vsub(p,S),S.lengthSquared()<=y){if(E.copy(P),ct.pointToWorldFrame(s,o,E,P),P.vsub(i,S),d)return!0;let F=this.createContactEquation(a,l,e,t,c,h);F.ni.copy(S),F.ni.normalize(),F.ri.copy(F.ni),F.ri.scale(e.radius,F.ri),F.ri.vadd(i,F.ri),F.ri.vsub(a.position,F.ri),F.rj.copy(P),F.rj.vsub(l.position,F.rj),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult)}for(let L=0;L<A.length;L++)for(let B=0;B<3;B++){t.getVertex(t.indices[A[L]*3+B],u),t.getVertex(t.indices[A[L]*3+(B+1)%3],f),f.vsub(u,g),p.vsub(f,m);const F=m.dot(g);p.vsub(u,m);let I=m.dot(g);if(I>0&&F<0&&(p.vsub(u,m),v.copy(g),v.normalize(),I=m.dot(v),v.scale(I,m),m.vadd(u,m),m.distanceTo(p)<e.radius)){if(d)return!0;const q=this.createContactEquation(a,l,e,t,c,h);m.vsub(p,q.ni),q.ni.normalize(),q.ni.scale(e.radius,q.ri),q.ri.vadd(i,q.ri),q.ri.vsub(a.position,q.ri),ct.pointToWorldFrame(s,o,m,m),m.vsub(l.position,q.rj),ct.vectorToWorldFrame(o,q.ni,q.ni),ct.vectorToWorldFrame(o,q.ri,q.ri),this.result.push(q),this.createFrictionEquationsFromContact(q,this.frictionResult)}}const T=yb,G=Sb,D=Mb,H=hb;for(let L=0,B=A.length;L!==B;L++){t.getTriangleVertices(A[L],T,G,D),t.getNormal(A[L],H),p.vsub(T,m);let F=m.dot(H);if(H.scale(F,m),p.vsub(m,m),F=m.distanceTo(p),Rt.pointInTriangle(m,T,G,D)&&F<e.radius){if(d)return!0;let I=this.createContactEquation(a,l,e,t,c,h);m.vsub(p,I.ni),I.ni.normalize(),I.ni.scale(e.radius,I.ri),I.ri.vadd(i,I.ri),I.ri.vsub(a.position,I.ri),ct.pointToWorldFrame(s,o,m,m),m.vsub(l.position,I.rj),ct.vectorToWorldFrame(o,I.ni,I.ni),ct.vectorToWorldFrame(o,I.ri,I.ri),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}}A.length=0}planeTrimesh(e,t,i,s,r,o,a,l,c,h,d){const u=new M,f=ab;f.set(0,0,1),r.vmult(f,f);for(let g=0;g<t.vertices.length/3;g++){t.getVertex(g,u);const v=new M;v.copy(u),ct.pointToWorldFrame(s,o,v,u);const p=lb;if(u.vsub(i,p),f.dot(p)<=0){if(d)return!0;const _=this.createContactEquation(a,l,e,t,c,h);_.ni.copy(f);const E=cb;f.scale(p.dot(f),E),u.vsub(E,E),_.ri.copy(E),_.ri.vsub(a.position,_.ri),_.rj.copy(u),_.rj.vsub(l.position,_.rj),this.result.push(_),this.createFrictionEquationsFromContact(_,this.frictionResult)}}}}const us=new M,Xs=new M,qs=new M,ib=new M,sb=new M,rb=new Pt,ob=new Pt,ab=new M,lb=new M,cb=new M,hb=new M,ub=new M;new M;const db=new M,fb=new M,pb=new M,mb=new M,gb=new M,_b=new M,vb=new M,xb=new M,yb=new M,Sb=new M,Mb=new M,Eb=new wn,bb=[],Vo=new M,Fd=new M,wb=new M,Tb=new M,Ab=new M;function Cb(n,e,t){let i=null;const s=n.length;for(let r=0;r!==s;r++){const o=n[r],a=wb;n[(r+1)%s].vsub(o,a);const l=Tb;a.cross(e,l);const c=Ab;t.vsub(o,c);const h=l.dot(c);if(i===null||h>0&&i===!0||h<=0&&i===!1){i===null&&(i=h>0);continue}else return!1}return!0}const Go=new M,Rb=new M,Pb=new M,Db=new M,Ib=[new M,new M,new M,new M,new M,new M],Lb=new M,Nb=new M,Fb=new M,Ub=new M,Ob=new M,Bb=new M,zb=new M,Hb=new M,Vb=new M,Gb=new M,kb=new M,Wb=new M,Xb=new M,qb=new M;new M;new M;const Yb=new M,jb=new M,$b=new M,Kb=new M,Zb=new M,Jb=new M,Qb=new M,ew=new M,tw=new M,nw=new M,Ud=new Pt,iw=new M;new M;const sw=new M,Od=new M,rw=new M,ow=new M,aw=new M,lw=[0],cw=new M,hw=new M;class Bd{constructor(){this.current=[],this.previous=[]}getKey(e,t){if(t<e){const i=t;t=e,e=i}return e<<16|t}set(e,t){const i=this.getKey(e,t),s=this.current;let r=0;for(;i>s[r];)r++;if(i!==s[r]){for(let o=s.length-1;o>=r;o--)s[o+1]=s[o];s[r]=i}}tick(){const e=this.current;this.current=this.previous,this.previous=e,this.current.length=0}getDiff(e,t){const i=this.current,s=this.previous,r=i.length,o=s.length;let a=0;for(let l=0;l<r;l++){let c=!1;const h=i[l];for(;h>s[a];)a++;c=h===s[a],c||zd(e,h)}a=0;for(let l=0;l<o;l++){let c=!1;const h=s[l];for(;h>i[a];)a++;c=i[a]===h,c||zd(t,h)}}}function zd(n,e){n.push((e&4294901760)>>16,e&65535)}const Ol=(n,e)=>n<e?`${n}-${e}`:`${e}-${n}`;class uw{constructor(){this.data={keys:[]}}get(e,t){const i=Ol(e,t);return this.data[i]}set(e,t,i){const s=Ol(e,t);this.get(e,t)||this.data.keys.push(s),this.data[s]=i}delete(e,t){const i=Ol(e,t),s=this.data.keys.indexOf(i);s!==-1&&this.data.keys.splice(s,1),delete this.data[i]}reset(){const e=this.data,t=e.keys;for(;t.length>0;){const i=t.pop();delete e[i]}}}class dw extends Lp{constructor(e){e===void 0&&(e={}),super(),this.dt=-1,this.allowSleep=!!e.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=e.quatNormalizeSkip!==void 0?e.quatNormalizeSkip:0,this.quatNormalizeFast=e.quatNormalizeFast!==void 0?e.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new M,e.gravity&&this.gravity.copy(e.gravity),e.frictionGravity&&(this.frictionGravity=new M,this.frictionGravity.copy(e.frictionGravity)),this.broadphase=e.broadphase!==void 0?e.broadphase:new vE,this.bodies=[],this.hasActiveBodies=!1,this.solver=e.solver!==void 0?e.solver:new KE,this.constraints=[],this.narrowphase=new nb(this),this.collisionMatrix=new bd,this.collisionMatrixPrevious=new bd,this.bodyOverlapKeeper=new Bd,this.shapeOverlapKeeper=new Bd,this.contactmaterials=[],this.contactMaterialTable=new uw,this.defaultMaterial=new Va("default"),this.defaultContactMaterial=new Ha(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(e,t){return this.contactMaterialTable.get(e.id,t.id)}collisionMatrixTick(){const e=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=e,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(e){this.constraints.push(e)}removeConstraint(e){const t=this.constraints.indexOf(e);t!==-1&&this.constraints.splice(t,1)}rayTest(e,t,i){i instanceof va?this.raycastClosest(e,t,{skipBackfaces:!0},i):this.raycastAll(e,t,{skipBackfaces:!0},i)}raycastAll(e,t,i,s){return i===void 0&&(i={}),i.mode=Rt.ALL,i.from=e,i.to=t,i.callback=s,Bl.intersectWorld(this,i)}raycastAny(e,t,i,s){return i===void 0&&(i={}),i.mode=Rt.ANY,i.from=e,i.to=t,i.result=s,Bl.intersectWorld(this,i)}raycastClosest(e,t,i,s){return i===void 0&&(i={}),i.mode=Rt.CLOSEST,i.from=e,i.to=t,i.result=s,Bl.intersectWorld(this,i)}addBody(e){this.bodies.includes(e)||(e.index=this.bodies.length,this.bodies.push(e),e.world=this,e.initPosition.copy(e.position),e.initVelocity.copy(e.velocity),e.timeLastSleepy=this.time,e instanceof be&&(e.initAngularVelocity.copy(e.angularVelocity),e.initQuaternion.copy(e.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=e,this.idToBodyMap[e.id]=e,this.dispatchEvent(this.addBodyEvent))}removeBody(e){e.world=null;const t=this.bodies.length-1,i=this.bodies,s=i.indexOf(e);if(s!==-1){i.splice(s,1);for(let r=0;r!==i.length;r++)i[r].index=r;this.collisionMatrix.setNumObjects(t),this.removeBodyEvent.body=e,delete this.idToBodyMap[e.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(e){return this.idToBodyMap[e]}getShapeById(e){const t=this.bodies;for(let i=0;i<t.length;i++){const s=t[i].shapes;for(let r=0;r<s.length;r++){const o=s[r];if(o.id===e)return o}}return null}addContactMaterial(e){this.contactmaterials.push(e),this.contactMaterialTable.set(e.materials[0].id,e.materials[1].id,e)}removeContactMaterial(e){const t=this.contactmaterials.indexOf(e);t!==-1&&(this.contactmaterials.splice(t,1),this.contactMaterialTable.delete(e.materials[0].id,e.materials[1].id))}fixedStep(e,t){e===void 0&&(e=1/60),t===void 0&&(t=10);const i=Lt.now()/1e3;if(!this.lastCallTime)this.step(e,void 0,t);else{const s=i-this.lastCallTime;this.step(e,s,t)}this.lastCallTime=i}step(e,t,i){if(i===void 0&&(i=10),t===void 0)this.internalStep(e),this.time+=e;else{this.accumulator+=t;const s=Lt.now();let r=0;for(;this.accumulator>=e&&r<i&&(this.internalStep(e),this.accumulator-=e,r++,!(Lt.now()-s>e*1e3)););this.accumulator=this.accumulator%e;const o=this.accumulator/e;for(let a=0;a!==this.bodies.length;a++){const l=this.bodies[a];l.previousPosition.lerp(l.position,o,l.interpolatedPosition),l.previousQuaternion.slerp(l.quaternion,o,l.interpolatedQuaternion),l.previousQuaternion.normalize()}this.time+=t}}internalStep(e){this.dt=e;const t=this.contacts,i=_w,s=vw,r=this.bodies.length,o=this.bodies,a=this.solver,l=this.gravity,c=this.doProfiling,h=this.profile,d=be.DYNAMIC;let u=-1/0;const f=this.constraints,g=gw;l.length();const v=l.x,p=l.y,m=l.z;let _=0;for(c&&(u=Lt.now()),_=0;_!==r;_++){const L=o[_];if(L.type===d){const B=L.force,F=L.mass;B.x+=F*v,B.y+=F*p,B.z+=F*m}}for(let L=0,B=this.subsystems.length;L!==B;L++)this.subsystems[L].update();c&&(u=Lt.now()),i.length=0,s.length=0,this.broadphase.collisionPairs(this,i,s),c&&(h.broadphase=Lt.now()-u);let E=f.length;for(_=0;_!==E;_++){const L=f[_];if(!L.collideConnected)for(let B=i.length-1;B>=0;B-=1)(L.bodyA===i[B]&&L.bodyB===s[B]||L.bodyB===i[B]&&L.bodyA===s[B])&&(i.splice(B,1),s.splice(B,1))}this.collisionMatrixTick(),c&&(u=Lt.now());const S=mw,A=t.length;for(_=0;_!==A;_++)S.push(t[_]);t.length=0;const C=this.frictionEquations.length;for(_=0;_!==C;_++)g.push(this.frictionEquations[_]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(i,s,this,t,S,this.frictionEquations,g),c&&(h.narrowphase=Lt.now()-u),c&&(u=Lt.now()),_=0;_<this.frictionEquations.length;_++)a.addEquation(this.frictionEquations[_]);const P=t.length;for(let L=0;L!==P;L++){const B=t[L],F=B.bi,I=B.bj,z=B.si,q=B.sj;let Q;if(F.material&&I.material?Q=this.getContactMaterial(F.material,I.material)||this.defaultContactMaterial:Q=this.defaultContactMaterial,Q.friction,F.material&&I.material&&(F.material.friction>=0&&I.material.friction>=0&&F.material.friction*I.material.friction,F.material.restitution>=0&&I.material.restitution>=0&&(B.restitution=F.material.restitution*I.material.restitution)),a.addEquation(B),F.allowSleep&&F.type===be.DYNAMIC&&F.sleepState===be.SLEEPING&&I.sleepState===be.AWAKE&&I.type!==be.STATIC){const me=I.velocity.lengthSquared()+I.angularVelocity.lengthSquared(),_e=I.sleepSpeedLimit**2;me>=_e*2&&(F.wakeUpAfterNarrowphase=!0)}if(I.allowSleep&&I.type===be.DYNAMIC&&I.sleepState===be.SLEEPING&&F.sleepState===be.AWAKE&&F.type!==be.STATIC){const me=F.velocity.lengthSquared()+F.angularVelocity.lengthSquared(),_e=F.sleepSpeedLimit**2;me>=_e*2&&(I.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(F,I,!0),this.collisionMatrixPrevious.get(F,I)||(Ar.body=I,Ar.contact=B,F.dispatchEvent(Ar),Ar.body=F,I.dispatchEvent(Ar)),this.bodyOverlapKeeper.set(F.id,I.id),this.shapeOverlapKeeper.set(z.id,q.id)}for(this.emitContactEvents(),c&&(h.makeContactConstraints=Lt.now()-u,u=Lt.now()),_=0;_!==r;_++){const L=o[_];L.wakeUpAfterNarrowphase&&(L.wakeUp(),L.wakeUpAfterNarrowphase=!1)}for(E=f.length,_=0;_!==E;_++){const L=f[_];L.update();for(let B=0,F=L.equations.length;B!==F;B++){const I=L.equations[B];a.addEquation(I)}}a.solve(e,this),c&&(h.solve=Lt.now()-u),a.removeAllEquations();const y=Math.pow;for(_=0;_!==r;_++){const L=o[_];if(L.type&d){const B=y(1-L.linearDamping,e),F=L.velocity;F.scale(B,F);const I=L.angularVelocity;if(I){const z=y(1-L.angularDamping,e);I.scale(z,I)}}}this.dispatchEvent(pw),c&&(u=Lt.now());const G=this.stepnumber%(this.quatNormalizeSkip+1)===0,D=this.quatNormalizeFast;for(_=0;_!==r;_++)o[_].integrate(e,G,D);this.clearForces(),this.broadphase.dirty=!0,c&&(h.integrate=Lt.now()-u),this.stepnumber+=1,this.dispatchEvent(fw);let H=!0;if(this.allowSleep)for(H=!1,_=0;_!==r;_++){const L=o[_];L.sleepTick(this.time),L.sleepState!==be.SLEEPING&&(H=!0)}this.hasActiveBodies=H}emitContactEvents(){const e=this.hasAnyEventListener("beginContact"),t=this.hasAnyEventListener("endContact");if((e||t)&&this.bodyOverlapKeeper.getDiff(xi,yi),e){for(let r=0,o=xi.length;r<o;r+=2)Cr.bodyA=this.getBodyById(xi[r]),Cr.bodyB=this.getBodyById(xi[r+1]),this.dispatchEvent(Cr);Cr.bodyA=Cr.bodyB=null}if(t){for(let r=0,o=yi.length;r<o;r+=2)Rr.bodyA=this.getBodyById(yi[r]),Rr.bodyB=this.getBodyById(yi[r+1]),this.dispatchEvent(Rr);Rr.bodyA=Rr.bodyB=null}xi.length=yi.length=0;const i=this.hasAnyEventListener("beginShapeContact"),s=this.hasAnyEventListener("endShapeContact");if((i||s)&&this.shapeOverlapKeeper.getDiff(xi,yi),i){for(let r=0,o=xi.length;r<o;r+=2){const a=this.getShapeById(xi[r]),l=this.getShapeById(xi[r+1]);Si.shapeA=a,Si.shapeB=l,a&&(Si.bodyA=a.body),l&&(Si.bodyB=l.body),this.dispatchEvent(Si)}Si.bodyA=Si.bodyB=Si.shapeA=Si.shapeB=null}if(s){for(let r=0,o=yi.length;r<o;r+=2){const a=this.getShapeById(yi[r]),l=this.getShapeById(yi[r+1]);Mi.shapeA=a,Mi.shapeB=l,a&&(Mi.bodyA=a.body),l&&(Mi.bodyB=l.body),this.dispatchEvent(Mi)}Mi.bodyA=Mi.bodyB=Mi.shapeA=Mi.shapeB=null}}clearForces(){const e=this.bodies,t=e.length;for(let i=0;i!==t;i++){const s=e[i];s.force,s.torque,s.force.set(0,0,0),s.torque.set(0,0,0)}}}new wn;const Bl=new Rt,Lt=globalThis.performance||{};if(!Lt.now){let n=Date.now();Lt.timing&&Lt.timing.navigationStart&&(n=Lt.timing.navigationStart),Lt.now=()=>Date.now()-n}new M;const fw={type:"postStep"},pw={type:"preStep"},Ar={type:be.COLLIDE_EVENT_NAME,body:null,contact:null},mw=[],gw=[],_w=[],vw=[],xi=[],yi=[],Cr={type:"beginContact",bodyA:null,bodyB:null},Rr={type:"endContact",bodyA:null,bodyB:null},Si={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Mi={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Hd={type:"change"},Th={type:"start"},Gp={type:"end"},ko=new vh,Vd=new ji,xw=Math.cos(70*d_.DEG2RAD),It=new W,un=2*Math.PI,_t={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},zl=1e-6;class yw extends J_{constructor(e,t=null){super(e,t),this.state=_t.NONE,this.target=new W,this.cursor=new W,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:sr.ROTATE,MIDDLE:sr.DOLLY,RIGHT:sr.PAN},this.touches={ONE:js.ROTATE,TWO:js.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new W,this._lastQuaternion=new Mn,this._lastTargetPosition=new W,this._quat=new Mn().setFromUnitVectors(e.up,new W(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Ku,this._sphericalDelta=new Ku,this._scale=1,this._panOffset=new W,this._rotateStart=new qe,this._rotateEnd=new qe,this._rotateDelta=new qe,this._panStart=new qe,this._panEnd=new qe,this._panDelta=new qe,this._dollyStart=new qe,this._dollyEnd=new qe,this._dollyDelta=new qe,this._dollyDirection=new W,this._mouse=new qe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Mw.bind(this),this._onPointerDown=Sw.bind(this),this._onPointerUp=Ew.bind(this),this._onContextMenu=Pw.bind(this),this._onMouseWheel=Tw.bind(this),this._onKeyDown=Aw.bind(this),this._onTouchStart=Cw.bind(this),this._onTouchMove=Rw.bind(this),this._onMouseDown=bw.bind(this),this._onMouseMove=ww.bind(this),this._interceptControlDown=Dw.bind(this),this._interceptControlUp=Iw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Hd),this.update(),this.state=_t.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;It.copy(t).sub(this.target),It.applyQuaternion(this._quat),this._spherical.setFromVector3(It),this.autoRotate&&this.state===_t.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=un:i>Math.PI&&(i-=un),s<-Math.PI?s+=un:s>Math.PI&&(s-=un),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(It.setFromSpherical(this._spherical),It.applyQuaternion(this._quatInverse),t.copy(this.target).add(It),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=It.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new W(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new W(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=It.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ko.origin.copy(this.object.position),ko.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ko.direction))<xw?this.object.lookAt(this.target):(Vd.setFromNormalAndCoplanarPoint(this.object.up,this.target),ko.intersectPlane(Vd,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>zl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>zl||this._lastTargetPosition.distanceToSquared(this.target)>zl?(this.dispatchEvent(Hd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?un/60*this.autoRotateSpeed*e:un/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){It.setFromMatrixColumn(t,0),It.multiplyScalar(-e),this._panOffset.add(It)}_panUp(e,t){this.screenSpacePanning===!0?It.setFromMatrixColumn(t,1):(It.setFromMatrixColumn(t,0),It.crossVectors(this.object.up,It)),It.multiplyScalar(e),this._panOffset.add(It)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;It.copy(s).sub(this.target);let r=It.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(un*this._rotateDelta.x/t.clientHeight),this._rotateUp(un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(un*this._rotateDelta.x/t.clientHeight),this._rotateUp(un*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new qe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Sw(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Mw(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Ew(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Gp),this.state=_t.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function bw(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case sr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=_t.DOLLY;break;case sr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=_t.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=_t.ROTATE}break;case sr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=_t.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=_t.PAN}break;default:this.state=_t.NONE}this.state!==_t.NONE&&this.dispatchEvent(Th)}function ww(n){switch(this.state){case _t.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case _t.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case _t.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Tw(n){this.enabled===!1||this.enableZoom===!1||this.state!==_t.NONE||(n.preventDefault(),this.dispatchEvent(Th),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Gp))}function Aw(n){this.enabled!==!1&&this._handleKeyDown(n)}function Cw(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case js.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=_t.TOUCH_ROTATE;break;case js.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=_t.TOUCH_PAN;break;default:this.state=_t.NONE}break;case 2:switch(this.touches.TWO){case js.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=_t.TOUCH_DOLLY_PAN;break;case js.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=_t.TOUCH_DOLLY_ROTATE;break;default:this.state=_t.NONE}break;default:this.state=_t.NONE}this.state!==_t.NONE&&this.dispatchEvent(Th)}function Rw(n){switch(this._trackPointer(n),this.state){case _t.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case _t.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case _t.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case _t.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=_t.NONE}}function Pw(n){this.enabled!==!1&&n.preventDefault()}function Dw(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Iw(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ae=(n,e,t)=>He(new W(n,e,t)),ft=Ca({currentScreen:"main-menu",diceData:{interval:[null,null,null],allDone:[!1,!1,!1],diceCalc:{x:0,y:0,z:0},time:300,x:0,y:0,z:0},settings:{quality:2,outlineAppearance:"classic"},fields:{home:[{fields:[Ae(0,.5,0),Ae(0,.5,1),Ae(1,.5,0),Ae(1,.5,1)],color:"#CE0000"},{fields:[Ae(10,.5,0),Ae(9,.5,0),Ae(9,.5,1),Ae(10,.5,1)],color:"#F7D708"},{fields:[Ae(10,.5,10),Ae(9,.5,9),Ae(9,.5,10),Ae(10,.5,9)],color:"#009ECE"},{fields:[Ae(0,.5,10),Ae(0,.5,9),Ae(1,.5,9),Ae(1,.5,10)],color:"#9CCF31"}],target:[{fields:[Ae(1,.5,5),Ae(2,.5,5),Ae(3,.5,5),Ae(4,.5,5)],color:"#CE0000"},{fields:[Ae(5,.5,1),Ae(5,.5,2),Ae(5,.5,3),Ae(5,.5,4)],color:"#F7D708"},{fields:[Ae(9,.5,5),Ae(8,.5,5),Ae(7,.5,5),Ae(6,.5,5)],color:"#009ECE"},{fields:[Ae(5,.5,9),Ae(5,.5,8),Ae(5,.5,7),Ae(5,.5,6)],color:"#9CCF31"}],path:[Ae(0,.5,4),Ae(1,.5,4),Ae(2,.5,4),Ae(3,.5,4),Ae(4,.5,4),Ae(4,.5,3),Ae(4,.5,2),Ae(4,.5,1),Ae(4,.5,0),Ae(5,.5,0),Ae(6,.5,0),Ae(6,.5,1),Ae(6,.5,2),Ae(6,.5,3),Ae(6,.5,4),Ae(7,.5,4),Ae(8,.5,4),Ae(9,.5,4),Ae(10,.5,4),Ae(10,.5,5),Ae(10,.5,6),Ae(9,.5,6),Ae(8,.5,6),Ae(7,.5,6),Ae(6,.5,6),Ae(6,.5,7),Ae(6,.5,8),Ae(6,.5,9),Ae(6,.5,10),Ae(5,.5,10),Ae(4,.5,10),Ae(4,.5,9),Ae(4,.5,8),Ae(4,.5,7),Ae(4,.5,6),Ae(3,.5,6),Ae(2,.5,6),Ae(1,.5,6),Ae(0,.5,6),Ae(0,.5,5)]},players:[],currentPlayerId:-1,playingPlayerIndex:null,lastRolledDice:"Start",currentRound:0,gamePlayStatus:{isRolling:!1,isMoving:!1},controls:null}),Lw=[{value:"off",label:"Off"},{value:"subtle",label:"Subtle"},{value:"classic",label:"Classic"},{value:"bold",label:"Bold"}],Gd={off:{visible:!1,lineOpacity:0,lineScale:1},subtle:{visible:!0,lineOpacity:.42,lineScale:.985},classic:{visible:!0,lineOpacity:.78,lineScale:1},bold:{visible:!0,lineOpacity:1,lineScale:1.02}};function Nw(n){return Gd[n]||Gd.classic}const ao=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},Fw={name:"OutlineAppearanceSelect",props:{label:{type:String,default:"Outline Style"},selectId:{type:String,required:!0}},data(){return{store:ft,outlineAppearanceOptions:Lw}}},Uw={class:"form-row"},Ow=["for"],Bw={class:"nes-select is-dark is-full-width"},zw=["id"],Hw=["value"];function Vw(n,e,t,i,s,r){return Nt(),kt("div",Uw,[tt("label",{for:t.selectId,class:"select-label"},An(t.label),9,Ow),tt("div",Bw,[th(tt("select",{id:t.selectId,"onUpdate:modelValue":e[0]||(e[0]=o=>s.store.settings.outlineAppearance=o)},[(Nt(!0),kt(xn,null,ha(s.outlineAppearanceOptions,o=>(Nt(),kt("option",{key:o.value,value:o.value},An(o.label),9,Hw))),128))],8,zw),[[b0,s.store.settings.outlineAppearance]])])])}const kp=ao(Fw,[["render",Vw]]),Wp=1,Xp=3,kd={1:{label:"Low",pixelRatioScale:.72,maxPixelRatio:1.1,shadowsEnabled:!1,shadowMapSize:0},2:{label:"Balanced",pixelRatioScale:.92,maxPixelRatio:1.5,shadowsEnabled:!0,shadowMapSize:768},3:{label:"High",pixelRatioScale:1.08,maxPixelRatio:2,shadowsEnabled:!0,shadowMapSize:1024}};function Gw(n){const e=Number(n);return Number.isFinite(e)?Math.min(Xp,Math.max(Wp,Math.round(e))):2}function qp(n){return kd[Gw(n)]||kd[2]}const kw={name:"RenderQualitySlider",props:{label:{type:String,default:"Render Quality"},sliderId:{type:String,required:!0}},data(){return{store:ft,min:Wp,max:Xp}},computed:{currentPreset(){return qp(this.store.settings.quality)}}},Ww={class:"form-row"},Xw=["for"],qw={class:"slider-value"},Yw=["id","min","max"];function jw(n,e,t,i,s,r){return Nt(),kt("div",Ww,[tt("label",{for:t.sliderId,class:"select-label slider-label"},[tt("span",null,An(t.label),1),tt("span",qw,An(r.currentPreset.label),1)],8,Xw),th(tt("input",{id:t.sliderId,"onUpdate:modelValue":e[0]||(e[0]=o=>s.store.settings.quality=o),class:"quality-slider",type:"range",min:s.min,max:s.max,step:"1"},null,8,Yw),[[ep,s.store.settings.quality,void 0,{number:!0}]]),e[1]||(e[1]=tt("div",{class:"quality-scale"},[tt("span",null,"Low"),tt("span",null,"Balanced"),tt("span",null,"High")],-1))])}const Yp=ao(kw,[["render",jw]]);class $w{constructor(){this.eventTarget=new EventTarget}fire(e,t=null){const i=new CustomEvent(e,{detail:t});this.eventTarget.dispatchEvent(i)}listen(e,t){if(typeof t!="function")return()=>{};const i=s=>t(s.detail);return this.eventTarget.addEventListener(e,i),()=>{this.eventTarget.removeEventListener(e,i)}}}const Rn=new $w,Pn={rollDice:"game.rollDice",game:{start:"game.start"},turns:{endTurn:"turns.endTurn",repeatTurn:"turns.repeatTurn"}},Kw={components:{OutlineAppearanceSelect:kp,RenderQualitySlider:Yp},data(){return{store:ft}},computed:{currentPlayer(){return this.store.players[this.store.currentPlayerId]||null},movablePawns(){return!this.currentPlayer||!this.store.gamePlayStatus.isMoving?[]:this.currentPlayer.pawns.filter(n=>n.isActive)},canRoll(){return this.store.gamePlayStatus.isRolling&&this.isHumanTurn},isHumanTurn(){return!!(this.currentPlayer&&!this.currentPlayer.isComputer)},statusMessage(){return this.currentPlayer?this.isHumanTurn?this.store.gamePlayStatus.isMoving?"Select a highlighted pawn or click it on the board.":this.store.gamePlayStatus.isRolling?"Roll the dice from the button, the board, or Space.":"Waiting for the next turn.":`${this.currentPlayer.name} is taking a turn.`:"Preparing the board."}},methods:{rollDice(){Rn.fire(Pn.rollDice)},movePawn(n){n.isActive&&n.move()},goToSetup(){this.store.currentScreen="add-players"},formatPlayerState(n){return n.pawns.map(e=>e.position===0?"Home":e.position>40?`Goal ${e.position-40}`:`Tile ${e.globalPosition+1}`).join(" | ")}}},Zw={class:"game-interface-wrapper"},Jw={class:"hud-panel nes-container is-dark with-title is-rounded"},Qw={key:1},eT={class:"hud-status"},tT={class:"hud-buttons"},nT=["disabled"],iT=["onClick"],sT={class:"player-grid"},rT={class:"player-meta"};function oT(n,e,t,i,s,r){const o=tr("outline-appearance-select"),a=tr("render-quality-slider");return Nt(),kt("div",Zw,[tt("section",Jw,[e[3]||(e[3]=tt("p",{class:"title"},"Game Status",-1)),tt("p",null,"Round "+An(s.store.currentRound),1),tt("p",null,[e[2]||(e[2]=Kf(" Turn: ",-1)),r.currentPlayer?(Nt(),kt("span",{key:0,style:kr({color:r.currentPlayer.color})},An(r.currentPlayer.name),5)):(Nt(),kt("span",Qw,"Waiting"))]),tt("p",null,"Last roll: "+An(s.store.lastRolledDice),1),tt("p",eT,An(r.statusMessage),1),an(o,{label:"Outline Style","select-id":"outline-style-hud"}),an(a,{label:"Render Quality","slider-id":"render-quality-hud"}),tt("div",tT,[tt("button",{class:"nes-btn is-primary is-full-width",disabled:!r.canRoll,onClick:e[0]||(e[0]=(...l)=>r.rollDice&&r.rollDice(...l))}," Roll Dice ",8,nT),(Nt(!0),kt(xn,null,ha(r.movablePawns,l=>(Nt(),kt("button",{key:l.id,class:"nes-btn is-success is-full-width",onClick:c=>r.movePawn(l)}," Move Pawn "+An(l.startingPlace),9,iT))),128)),tt("button",{class:"nes-btn is-warning is-full-width",onClick:e[1]||(e[1]=(...l)=>r.goToSetup&&r.goToSetup(...l))}," New Game ")]),e[4]||(e[4]=tt("p",{class:"hud-hint"},"Press Space to roll the dice.",-1))]),tt("div",sT,[(Nt(!0),kt(xn,null,ha(s.store.players,l=>(Nt(),kt("div",{key:l.turn,class:Ta(["player-name nes-container is-dark is-rounded",{"is-active-player":l.isPlaying}]),style:kr({color:l.color})},[tt("p",null,An(l.name),1),tt("p",rT,An(r.formatPlayerState(l)),1)],6))),128))])])}const aT=ao(Kw,[["render",oT]]),lT={components:{GameInterface:aT,OutlineAppearanceSelect:kp,RenderQualitySlider:Yp},data(){return{store:ft,playerNames:["","","",""]}},methods:{switchScreen(n){this.store.currentScreen=n},startGame(){const n=this.playerNames.map(e=>e.trim());Rn.fire(Pn.game.start,n)}}},cT={class:"screen-overlay"},hT={key:0,class:"menu-shell"},uT={class:"menu-panel nes-container is-dark with-title is-rounded"},dT={key:1,class:"menu-shell"},fT={class:"menu-panel nes-container is-dark with-title is-rounded"},pT=["onUpdate:modelValue","placeholder"],mT={class:"menu-actions"};function gT(n,e,t,i,s,r){const o=tr("outline-appearance-select"),a=tr("render-quality-slider"),l=tr("game-interface");return Nt(),kt("div",cT,[s.store.currentScreen==="main-menu"?(Nt(),kt("div",hT,[tt("section",uT,[e[3]||(e[3]=tt("p",{class:"title"},"Main Menu",-1)),e[4]||(e[4]=tt("p",null,"Welcome to Burrec mos u zemero.",-1)),e[5]||(e[5]=tt("p",null,"Start a local game for up to four players. Empty slots become computer players.",-1)),tt("button",{onClick:e[0]||(e[0]=c=>r.switchScreen("add-players")),class:"nes-btn is-success is-full-width"}," Start New Game ")])])):s.store.currentScreen==="add-players"?(Nt(),kt("div",dT,[tt("section",fT,[e[6]||(e[6]=tt("p",{class:"title"},"Add Players",-1)),e[7]||(e[7]=tt("p",null,"Enter player names. Leave any slot blank to use a computer player.",-1)),(Nt(!0),kt(xn,null,ha(s.playerNames,(c,h)=>(Nt(),kt("div",{key:h,class:"form-row nes-field"},[th(tt("input",{"onUpdate:modelValue":d=>s.playerNames[h]=d,type:"text",class:"nes-input is-dark",placeholder:`Player ${h+1}`},null,8,pT),[[ep,s.playerNames[h]]])]))),128)),an(o,{label:"Outline Style","select-id":"outline-style-menu"}),an(a,{label:"Render Quality","slider-id":"render-quality-menu"}),tt("div",mT,[tt("button",{onClick:e[1]||(e[1]=(...c)=>r.startGame&&r.startGame(...c)),class:"nes-btn is-success is-full-width"},"Ready"),tt("button",{onClick:e[2]||(e[2]=c=>r.switchScreen("main-menu")),class:"nes-btn is-warning is-full-width"},"Back")])])])):s.store.currentScreen==="game-screen"?(Nt(),Yf(l,{key:2})):Wg("",!0)])}const _T=ao(lT,[["render",gT]]),xa=220;class Wo{constructor(e,t,i=0,s){this.id="id-"+e+s,this.position=0,this.playerIndex=s,this.globalPosition=i,this.startingGlobalPosition=i,this.color=t,this.isActive=!1,this.isInDestinationField=!1,this.isSkipping=!1,this.isSkippingTo=0,this.startingPlace=e,this.isMoving=!1,this.activeMoveTimeout=null}move(){!this.isActive||this.isMoving||(this.lockMoveSelection(),this.isMoving=!0,this.position?this.moveToPosition():this.getOutOfHome())}getOutOfHome(){this.runMoveSequence([{position:1,globalPosition:this.startingGlobalPosition,isInDestinationField:!1}],{captureField:this.startingGlobalPosition})}endOfMove(){this.isMoving=!1,this.activeMoveTimeout=null,ft.lastRolledDice===6?Rn.fire(Pn.turns.repeatTurn):Rn.fire(Pn.turns.endTurn)}moveToPosition(){const e=ft.lastRolledDice,t=[];for(let s=1;s<=e;s+=1){const r=this.position+s,o=r>40;t.push({position:r,globalPosition:o?this.positionToGlobalPosition(40):this.positionToGlobalPosition(r),isInDestinationField:o})}const i=t[t.length-1];this.runMoveSequence(t,{captureField:i.position<=40?i.globalPosition:null})}toGlobalPosition(){return this.positionToGlobalPosition(this.position)}getPosition(e=0){const{x:t,y:i,z:s}=this.getCoordinates(e);return`${t} ${i} ${s}`}getCoordinates(e=0){let t,i,s,r=ft.fields;if(!this.position)t=r.home[this.playerIndex].fields[this.startingPlace-1].x,i=e,s=r.home[this.playerIndex].fields[this.startingPlace-1].z;else if(this.position<=40){const o=this.positionToGlobalPosition(this.position);t=r.path[o].x,i=e,s=r.path[o].z}else this.position>39&&(t=r.target[this.playerIndex].fields[this.position-41].x,i=e,s=r.target[this.playerIndex].fields[this.position-41].z);return{x:t,y:i,z:s}}classes(){return[this.isSkipping?"is-skipping":""]}returnHome(){this.activeMoveTimeout&&(clearTimeout(this.activeMoveTimeout),this.activeMoveTimeout=null),this.isMoving=!1,this.position=0,this.globalPosition=this.startingGlobalPosition,this.isInDestinationField=!1,this.isActive=!1}canLeaveHome(e){let t=!0;return ft.players[ft.playingPlayerIndex].pawns.forEach(function(s){s.position===1&&(t=!1)}),this.position===0&&e===6&&t}pathEnds(e){return this.position+e>=45}targetFieldIsEmpty(e){if(this.position===0)return!1;let t=this.position+e,i=!0;return ft.players[ft.playingPlayerIndex].pawns.forEach(r=>{r!==this&&r.position===t&&(i=!1)}),i}isAvaliable(e){return(this.canLeaveHome(e)||this.targetFieldIsEmpty(e))&&!this.pathEnds(e)}skippingAnimation(e){this.isSkippingTo=e,this.isSkipping=!0,setTimeout((function(){this.isSkipping=!1}).bind(this),100)}removeOpponentPawns(e){ft.players.forEach(function(t){t.isPlaying?t.wonGame()&&alert("congrats:"+t.name+"! You WON!!!"):t.pawns.forEach(function(i){i.globalPosition===e&&!i.isInDestinationField&&i.returnHome()})})}enterDestinationZone(e){this.isInDestinationField=!0,this.position+=e,this.globalPosition=-13*this.startingGlobalPosition,this.endOfMove()}positionToGlobalPosition(e){return e?(this.startingGlobalPosition+e-1)%40:this.startingGlobalPosition}lockMoveSelection(){const e=ft.players[ft.playingPlayerIndex];ft.gamePlayStatus.isMoving=!1,e?.pawns.forEach(t=>{t.isActive=!1})}applyMoveState(e,t){this.position=e.position,this.globalPosition=e.globalPosition,this.isInDestinationField=e.isInDestinationField,this.skippingAnimation(t)}runMoveSequence(e,t={}){const{captureField:i=null}=t;if(!e.length){this.endOfMove();return}const s=r=>{if(this.applyMoveState(e[r],r),r<e.length-1){this.activeMoveTimeout=window.setTimeout(()=>{s(r+1)},xa);return}this.activeMoveTimeout=window.setTimeout(()=>{i!==null&&this.removeOpponentPawns(i),this.endOfMove()},xa)};s(0)}}class vT{constructor(e,t,i,s=!0){this.index=i-1,this.isComputer=s,this.turn=i,this.name=e,this.isPlaying=!1,this.avaliablePawnsIndexes=[],this.color=t,this.pawns=[new Wo(1,t,(i-1)*10,i-1),new Wo(2,t,(i-1)*10,i-1),new Wo(3,t,(i-1)*10,i-1),new Wo(4,t,(i-1)*10,i-1)],this.indicatorIntervals=[],this.stillHome=!0,this.stillHomeCounter=0}startTurn(){ft.gamePlayStatus.isRolling=!0,ft.playingPlayerIndex=this.index,this.isPlaying=!0,this.isComputer&&setTimeout(()=>{Rn.fire(Pn.rollDice)},800)}endTurn(){this.indicatorIntervals.forEach(function(e){clearInterval(e)}),this.indicatorIntervals=[],this.isPlaying=!1,ft.playingPlayerIndex=null,this.pawns.forEach(function(e){e.isActive=!1})}pawnsAvailable(){return this.avaliablePawnsIndexes.length}rollDice(e){ft.lastRolledDice=e,this.setAvaliablePawns(e),this.pawnsAvailable()&&this.indicatorIntervals.push(setInterval(function(){},300)),this.pawnsAvailable()!==0||this.stillHome?this.stillHome&&e!==6?(ft.gamePlayStatus.isRolling=!0,ft.gamePlayStatus.isMoving=!1,this.stillHomeCounter++,this.stillHomeCounter>=3?(ft.gamePlayStatus.isRolling=!1,Rn.fire(Pn.turns.endTurn),this.stillHomeCounter=0):this.isComputer&&setTimeout(()=>{Rn.fire(Pn.rollDice)},1200)):this.stillHome&&e===6&&this.isComputer?(ft.gamePlayStatus.isRolling=!1,ft.gamePlayStatus.isMoving=!0,this.stillHome=!1,this.movePawnAutomatically()):(ft.gamePlayStatus.isRolling=!1,ft.gamePlayStatus.isMoving=!0,this.stillHome=!1,this.movePawnAutomatically()):this.pawnsAvailable()||Rn.fire(Pn.turns.endTurn)}movePawnAutomatically(){if(this.pawnsAvailable()==1||this.isComputer){let e=!1;this.pawns.forEach(function(t){t.isActive&&!e&&(t.move(),e=!0)})}}hasAllPawnsHome(){return this.pawns.every(function(e){return e.position===0})}setAvaliablePawns(e){this.avaliablePawnsIndexes=[],this.pawns.forEach((function(t,i){t.isAvaliable(e)&&(this.avaliablePawnsIndexes.push(i),t.isActive=!0)}).bind(this))}pawnPositions(){let e=[];return this.pawns.forEach(function(t){e.push(t.globalPosition)}),e}wonGame(){let e=[];return this.pawns.forEach((function(t,i){t.isInDestinationField&&e.push(i)}).bind(this)),e.length===4}setComputer(e){this.isComputer=e}}const xT=["#CE0000","#F7D708","#009ECE","#9CCF31"],yT="#1b1411",Zs={x:5,z:5},vn=.9,Wd=12.6,Xd=11.3,ne={center:{x:16.1,y:-1.08,z:4.2},floor:{width:3.35,height:.12,depth:2.9},wallThickness:.18,wallHeight:.86,guardPadding:.42,guardThickness:.42,guardHeight:3.2},Gt={center:{x:Zs.x,z:Zs.z},topY:-.52,topSize:{width:14.2,height:.7,depth:14.2},floorY:-1.18},ST=[3,4,1,6,2,5],MT={1:new W(0,1,0),2:new W(0,0,1),3:new W(1,0,0),4:new W(-1,0,0),5:new W(0,0,-1),6:new W(0,-1,0)},Xo=new W(0,1,0),qo={minimumMotionMs:500,faceUpDotThreshold:.94,recoveryCooldownMs:180,maxRecoveryAttempts:3},jp=.06,$p=.022,ra=jp+.04+$p,ET=jp+.05+$p,bT=ra+.085,wT=.04,TT=.016,Pr={pulseSpeed:.0052,dice:{beamHeight:2.5,topRadius:.09,bottomRadius:.64,haloRadius:.5,anchorOffsetY:-vn/2+.06},pawn:{beamHeight:2.15,topRadius:.08,bottomRadius:.46,haloRadius:.34,anchorOffsetY:-.02}},AT={name:"AppRoot",components:{StartScreen:_T},watch:{"store.settings.outlineAppearance"(){this.applyOutlineAppearance(),this.hoverNeedsUpdate=!0},"store.settings.quality"(){this.applyRenderQuality(),this.hoverNeedsUpdate=!0}},data(){return{store:ft,camera:null,scene:null,renderer:null,shadowLight:null,controls:null,diceMesh:null,diceIndicator:null,dicePhysicsBody:null,physicsWorld:null,physicsLastTime:null,pendingDiceRoll:null,pawnMeshes:He({}),pawnIndicators:He({}),pawnMotionStates:He({}),sharedGeometries:He({}),sharedMaterials:He({}),sharedTextures:He({}),animationFrameId:null,eventUnsubscribers:[],resizeHandler:null,keydownHandler:null,pointerDownHandler:null,pointerMoveHandler:null,pointerLeaveHandler:null,clickHandler:null,raycaster:null,pointer:null,hoveredTarget:null,pointerDownPosition:null,isDraggingScene:!1,controlsChangeHandler:null,hoverNeedsUpdate:!1,isPointerInsideCanvas:!1}},mounted(){this.addEventListeners(),this.initThreeScene(),this.resizeHandler=()=>this.handleResize(),this.keydownHandler=n=>this.handleKeydown(n),this.pointerDownHandler=n=>this.handlePointerDown(n),this.pointerMoveHandler=n=>this.handlePointerMove(n),this.pointerLeaveHandler=()=>this.clearHoveredTarget(),this.clickHandler=n=>this.handleCanvasClick(n),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.$refs.canvas.addEventListener("pointerdown",this.pointerDownHandler),this.$refs.canvas.addEventListener("mousemove",this.pointerMoveHandler),this.$refs.canvas.addEventListener("mouseleave",this.pointerLeaveHandler),this.$refs.canvas.addEventListener("click",this.clickHandler)},beforeUnmount(){this.eventUnsubscribers.forEach(n=>n()),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.$refs.canvas&&this.pointerMoveHandler&&this.$refs.canvas.removeEventListener("mousemove",this.pointerMoveHandler),this.$refs.canvas&&this.pointerDownHandler&&this.$refs.canvas.removeEventListener("pointerdown",this.pointerDownHandler),this.$refs.canvas&&this.pointerLeaveHandler&&this.$refs.canvas.removeEventListener("mouseleave",this.pointerLeaveHandler),this.$refs.canvas&&this.clickHandler&&this.$refs.canvas.removeEventListener("click",this.clickHandler),this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),Object.values(this.pawnMeshes).forEach(n=>this.scene?.remove(n)),this.diceMesh&&this.scene?.remove(this.diceMesh),this.diceIndicator&&this.scene?.remove(this.diceIndicator),Object.values(this.pawnIndicators).forEach(n=>this.scene?.remove(n)),this.dicePhysicsBody=null,this.physicsWorld=null,this.physicsLastTime=null,this.pendingDiceRoll=null,this.shadowLight=null,this.diceIndicator=null,this.pawnIndicators=He({}),this.pawnMotionStates=He({}),this.controls&&this.controlsChangeHandler&&this.controls.removeEventListener("change",this.controlsChangeHandler),this.controls&&this.controls.dispose(),this.renderer&&this.renderer.dispose(),this.disposeSharedResources()},methods:{addEventListeners(){this.eventUnsubscribers=[Rn.listen(Pn.turns.endTurn,this.changePlayersTurn),Rn.listen(Pn.turns.repeatTurn,this.repeatPlayersTurn),Rn.listen(Pn.rollDice,this.rollDice),Rn.listen(Pn.game.start,this.startGame)]},handleKeydown(n){n.code!=="Space"||this.store.currentScreen!=="game-screen"||(n.preventDefault(),this.rollDice())},initThreeScene(){const n=this.$refs.canvas,e=new T_;e.background=this.getSkyGradientTexture();const t=new yn(45,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(7.2,12.2,16.1),t.lookAt(new W(6.3,0,5));const i=new qM({antialias:!0,canvas:n});i.outputColorSpace=sn,i.toneMapping=ah,i.toneMappingExposure=.98,i.shadowMap.type=tp,i.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),i.setSize(window.innerWidth,window.innerHeight,!1);const s=He(new yw(t,i.domElement));s.enableDamping=!0,s.dampingFactor=.08,s.enablePan=!1,s.minDistance=9,s.maxDistance=24,s.minPolarAngle=Math.PI/5,s.maxPolarAngle=Math.PI/2.15,s.target.set(6.3,.4,5),s.update(),this.scene=He(e),this.camera=He(t),this.renderer=He(i),this.controls=s,this.raycaster=He(new Z_),this.pointer=He(new qe),this.controlsChangeHandler=()=>{this.isPointerInsideCanvas&&(this.hoverNeedsUpdate=!0)},s.addEventListener("change",this.controlsChangeHandler),this.createBoard(),this.createLights(),this.createPhysicsWorld(),this.createDice(),this.applyRenderQuality(),this.applyOutlineAppearance(),this.handleResize(),this.renderScene()},createBoard(){this.createCartoonSurroundings(),this.createGroundEnvironment();const n=this.createOutlinedMesh(this.getSharedGeometry("board-base",()=>new jt(Wd,.3,Wd)),this.createToonMaterial("board-base-material",{color:"#eca95d",roughness:.72,metalness:.03},{outlineThickness:.012,outlineColor:"#5b3115"}),{outlineScale:{x:1.022,y:1.008,z:1.022},receiveShadow:!0});n.position.set(Zs.x,-.15,Zs.z),this.scene.add(n);const e=this.createOutlinedMesh(this.getSharedGeometry("board-top",()=>new jt(Xd,.08,Xd)),this.createToonMaterial("board-top-material",{color:"#fff0bf",roughness:.88,metalness:.01},{outlineThickness:.0095,outlineColor:"#735227"}),{outlineScale:{x:1.014,y:1.01,z:1.014},receiveShadow:!0});e.position.set(Zs.x,.02,Zs.z),this.scene.add(e),this.createDiceTray();const t=this.getSharedGeometry("field-cylinder",()=>new bi(.37,.42,.08,20)),i=this.getSharedGeometry("start-cylinder",()=>new bi(.42,.46,.1,20)),s=this.createOutlinedInstancedSet(t,this.createToonMaterial("path-material",{color:"#fffaf0",roughness:.82,metalness:.01},{outlineThickness:.0068,outlineColor:"#85623c"}),this.store.fields.path.map(r=>({x:r.x,y:ra,z:r.z})),{outlineScale:{x:1.06,y:1.01,z:1.06},receiveShadow:!0});this.scene.add(s),this.store.fields.home.forEach((r,o)=>{const a=this.createToonMaterial(`field-material-${o}`,{color:r.color,roughness:.8,metalness:.02},{outlineThickness:.0072}),l=this.createOutlinedInstancedSet(t,a,[...r.fields.map(d=>({x:d.x,y:ra,z:d.z})),...this.store.fields.target[o].fields.map(d=>({x:d.x,y:ra,z:d.z}))],{outlineScale:{x:1.062,y:1.01,z:1.062},receiveShadow:!0});this.scene.add(l);const c=this.store.fields.path[o*10],h=this.createOutlinedInstancedSet(i,a,[{x:c.x,y:ET,z:c.z}],{outlineScale:{x:1.07,y:1.012,z:1.07},receiveShadow:!0});this.scene.add(h)})},createCartoonSurroundings(){const n=this.createOutlinedMesh(this.getSharedGeometry("meadow-top",()=>new bi(18.4,19.6,.42,48)),this.createToonMaterial("meadow-top-material",{color:"#8cdd68"},{outlineThickness:.012,outlineColor:"#1d3819"}));n.position.set(6.2,-1.58,5),this.scene.add(n);const e=this.createOutlinedMesh(this.getSharedGeometry("meadow-edge",()=>new bi(19.8,21.4,.6,48)),this.createToonMaterial("meadow-edge-material",{color:"#5ba34b"},{outlineThickness:.011,outlineColor:"#163216"}));e.position.set(6.2,-1.9,5),this.scene.add(e);const t=this.getSharedGeometry("surrounding-hill",()=>new ms(1,24,24));[{x:-8.8,y:-.18,z:-9.4,scale:[7.8,2.9,3.4],materialKey:"hill-a",color:"#7dcb6f"},{x:5.4,y:.06,z:-11.8,scale:[8.8,3.6,3.8],materialKey:"hill-b",color:"#8fda7d"},{x:18.4,y:-.2,z:-8.8,scale:[6.8,2.7,3],materialKey:"hill-c",color:"#6fc262"},{x:-9.8,y:-.12,z:18.2,scale:[8.6,3.1,3.6],materialKey:"hill-d",color:"#78c768"},{x:7.8,y:-.08,z:20.6,scale:[10.2,3.7,4.1],materialKey:"hill-e",color:"#89d876"},{x:20.6,y:-.16,z:18.4,scale:[7.4,2.8,3.3],materialKey:"hill-f",color:"#73c05e"}].forEach(a=>{const l=this.createOutlinedMesh(t,this.createToonMaterial(`surrounding-${a.materialKey}`,{color:a.color},{outlineThickness:.0092,outlineColor:"#1f381a"}));l.position.set(a.x,a.y,a.z),l.scale.set(a.scale[0],a.scale[1],a.scale[2]),this.scene.add(l)});const s=this.getSharedGeometry("surrounding-bush",()=>new ms(1,20,20)),r=this.createToonMaterial("surrounding-bush-material",{color:"#4ebf63"},{outlineThickness:.0084,outlineColor:"#173617"});[{x:-2.6,y:-1.04,z:-5.4,scale:[.9,.68,.7]},{x:12.6,y:-1.02,z:-4.8,scale:[1.1,.72,.78]},{x:-1.8,y:-1.02,z:14.9,scale:[1.15,.78,.84]},{x:13.8,y:-1.03,z:15.3,scale:[1.02,.7,.74]},{x:-5.8,y:-1.02,z:5.6,scale:[.96,.7,.72]},{x:18.1,y:-1.02,z:5.2,scale:[1.08,.76,.8]}].forEach(a=>{const l=this.createOutlinedMesh(s,r);l.position.set(a.x,a.y,a.z),l.scale.set(a.scale[0],a.scale[1],a.scale[2]),this.scene.add(l)});const o=this.createOutlinedMesh(this.getSharedGeometry("cartoon-sun",()=>new ms(1,24,24)),this.createToonMaterial("cartoon-sun-material",{color:"#ffd65c"},{outlineThickness:.01,outlineColor:"#8d5a18"}));o.position.set(-7.5,11.6,-17.5),o.scale.set(2.4,2.4,2.4),this.scene.add(o),this.createCloud({x:-9.8,y:9.4,z:-15.6},1.35),this.createCloud({x:3.8,y:11.2,z:-18.4},1.55),this.createCloud({x:18.2,y:10.1,z:-14.8},1.25),this.createCloud({x:15.6,y:8.5,z:-6.4},.96)},createGroundEnvironment(){const n=this.createOutlinedMesh(this.getSharedGeometry("table-top",()=>new jt(Gt.topSize.width,Gt.topSize.height,Gt.topSize.depth)),this.createToonMaterial("table-top-material",{color:"#c98748",roughness:.78,metalness:.04},{outlineThickness:.012,outlineColor:"#392012"}),{receiveShadow:!0});n.position.set(Gt.center.x,Gt.topY,Gt.center.z),this.scene.add(n);const e=this.createOutlinedMesh(this.getSharedGeometry("table-support",()=>new jt(11,.26,11)),this.createToonMaterial("table-support-material",{color:"#8f6037",roughness:.82,metalness:.03},{outlineThickness:.011,outlineColor:"#2a170f"}),{receiveShadow:!0});e.position.set(Gt.center.x,-.96,Gt.center.z),this.scene.add(e);const t=this.createOutlinedMesh(this.getSharedGeometry("table-floor",()=>new jt(26,.08,18.5)),this.createToonMaterial("table-floor-material",{color:"#e9d39d",roughness:.92,metalness:0},{outlineThickness:.01,outlineColor:"#705537"}),{receiveShadow:!0});t.position.set(6.2,-1.18,5),this.scene.add(t)},createLights(){const n=He(new j_("#f6f0e7",.28)),e=He(new W_("#d2e6ff","#97ae72",.62)),t=He(new Yu("#fff1db",1.45)),i=He(new Yu("#c7dfff",.42)),s=He(new q_("#ffd6a8",.18,12));t.position.set(-5.5,13.5,6.5),t.target.position.set(5.4,.7,5.1),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.camera.near=1,t.shadow.camera.far=34,t.shadow.camera.left=-10,t.shadow.camera.right=10,t.shadow.camera.top=10,t.shadow.camera.bottom=-10,t.shadow.bias=-18e-5,t.shadow.normalBias=.025,i.position.set(16,7.5,14.5),s.position.set(ne.center.x,2.6,ne.center.z),this.shadowLight=t,this.scene.add(n),this.scene.add(e),this.scene.add(t),this.scene.add(t.target),this.scene.add(i),this.scene.add(s)},createDiceTray(){const n=He(new Ki),e=this.createToonMaterial("dice-tray-floor-material",{color:"#f8d38c",roughness:.8,metalness:.03},{outlineThickness:.01,outlineColor:"#5a3319"}),t=this.createToonMaterial("dice-tray-wall-material",{color:"#c37d42",roughness:.74,metalness:.04},{outlineThickness:.01,outlineColor:"#4b2a18"}),i=this.createOutlinedMesh(this.getSharedGeometry("dice-tray-floor",()=>new jt(ne.floor.width,ne.floor.height,ne.floor.depth)),e,{outlineScale:{x:1.03,y:1.005,z:1.03},receiveShadow:!0});i.position.set(ne.center.x,ne.center.y,ne.center.z),n.add(i);const s=ne.center.y+ne.floor.height/2+ne.wallHeight/2,r=ne.floor.depth/2+ne.wallThickness/2,o=ne.floor.width/2+ne.wallThickness/2,a=this.createOutlinedMesh(this.getSharedGeometry("dice-tray-wall-z",()=>new jt(ne.floor.width+ne.wallThickness,ne.wallHeight,ne.wallThickness)),t,{outlineScale:1.04,castShadow:!0,receiveShadow:!0});a.position.set(ne.center.x,s,ne.center.z-r),n.add(a);const l=this.createOutlinedMesh(this.getSharedGeometry("dice-tray-wall-z",()=>new jt(ne.floor.width+ne.wallThickness,ne.wallHeight,ne.wallThickness)),t,{outlineScale:1.04,castShadow:!0,receiveShadow:!0});l.position.set(ne.center.x,s,ne.center.z+r),n.add(l);const c=this.createOutlinedMesh(this.getSharedGeometry("dice-tray-wall-x",()=>new jt(ne.wallThickness,ne.wallHeight,ne.floor.depth-ne.wallThickness)),t,{outlineScale:1.04,castShadow:!0,receiveShadow:!0});c.position.set(ne.center.x-o,s,ne.center.z),n.add(c);const h=this.createOutlinedMesh(this.getSharedGeometry("dice-tray-wall-x",()=>new jt(ne.wallThickness,ne.wallHeight,ne.floor.depth-ne.wallThickness)),t,{outlineScale:1.04,castShadow:!0,receiveShadow:!0});h.position.set(ne.center.x+o,s,ne.center.z),n.add(h),this.scene.add(n)},createPhysicsWorld(){const n=He(new dw({gravity:new M(0,-18,0)}));n.allowSleep=!0,n.broadphase=new Ks(n),n.defaultContactMaterial.friction=.24,n.defaultContactMaterial.restitution=.24;const e=new be({mass:0,shape:new fn(new M(ne.floor.width/2,ne.floor.height/2,ne.floor.depth/2)),position:new M(ne.center.x,ne.center.y,ne.center.z)});n.addBody(e);const t=new be({mass:0,shape:new fn(new M(Gt.topSize.width/2,Gt.topSize.height/2,Gt.topSize.depth/2)),position:new M(Gt.center.x,Gt.topY,Gt.center.z)});n.addBody(t);const i=new be({mass:0,shape:new jE,position:new M(0,Gt.floorY,0)});i.quaternion.setFromEuler(-Math.PI/2,0,0),n.addBody(i);const s=ne.center.y+ne.floor.height/2+ne.wallHeight/2,r=ne.floor.depth/2+ne.wallThickness/2,o=ne.floor.width/2+ne.wallThickness/2;[new be({mass:0,shape:new fn(new M((ne.floor.width+ne.wallThickness)/2,ne.wallHeight/2,ne.wallThickness/2)),position:new M(ne.center.x,s,ne.center.z-r)}),new be({mass:0,shape:new fn(new M((ne.floor.width+ne.wallThickness)/2,ne.wallHeight/2,ne.wallThickness/2)),position:new M(ne.center.x,s,ne.center.z+r)}),new be({mass:0,shape:new fn(new M(ne.wallThickness/2,ne.wallHeight/2,(ne.floor.depth-ne.wallThickness)/2)),position:new M(ne.center.x-o,s,ne.center.z)}),new be({mass:0,shape:new fn(new M(ne.wallThickness/2,ne.wallHeight/2,(ne.floor.depth-ne.wallThickness)/2)),position:new M(ne.center.x+o,s,ne.center.z)})].forEach(u=>n.addBody(u));const l=ne.center.y+ne.guardHeight/2,c=ne.floor.depth/2+ne.guardPadding+ne.guardThickness/2,h=ne.floor.width/2+ne.guardPadding+ne.guardThickness/2;[new be({mass:0,shape:new fn(new M((ne.floor.width+ne.guardPadding*2+ne.guardThickness)/2,ne.guardHeight/2,ne.guardThickness/2)),position:new M(ne.center.x,l,ne.center.z-c)}),new be({mass:0,shape:new fn(new M((ne.floor.width+ne.guardPadding*2+ne.guardThickness)/2,ne.guardHeight/2,ne.guardThickness/2)),position:new M(ne.center.x,l,ne.center.z+c)}),new be({mass:0,shape:new fn(new M(ne.guardThickness/2,ne.guardHeight/2,(ne.floor.depth+ne.guardPadding*2)/2)),position:new M(ne.center.x-h,l,ne.center.z)}),new be({mass:0,shape:new fn(new M(ne.guardThickness/2,ne.guardHeight/2,(ne.floor.depth+ne.guardPadding*2)/2)),position:new M(ne.center.x+h,l,ne.center.z)})].forEach(u=>n.addBody(u)),this.physicsWorld=n,this.physicsLastTime=performance.now()},createDice(){const n=this.createOutlinedMesh(this.getSharedGeometry("dice-box",()=>new jt(vn,vn,vn)),this.createDiceMaterials(),{outlineScale:1.09,castShadow:!0,receiveShadow:!0});n.name="dice",this.diceMesh=He(n),this.scene.add(n);const e=He(new be({mass:1,shape:new fn(new M(vn/2,vn/2,vn/2)),allowSleep:!0,sleepSpeedLimit:.16,sleepTimeLimit:.35}));this.physicsWorld?.addBody(e),this.dicePhysicsBody=e,this.resetDiceBody(),this.syncDice(),this.createDiceIndicator()},renderScene(){const n=()=>{this.animationFrameId=requestAnimationFrame(n),this.controls&&this.controls.update(),this.stepPhysicsWorld(),this.syncDice(),this.syncPawns(),this.syncInteractionIndicators(performance.now()),this.hoverNeedsUpdate&&this.refreshHoveredTarget(),this.renderer.render(this.scene,this.camera)};n()},syncDice(){!this.diceMesh||!this.dicePhysicsBody||(this.diceMesh.position.set(this.dicePhysicsBody.position.x,this.dicePhysicsBody.position.y+TT,this.dicePhysicsBody.position.z),this.diceMesh.quaternion.set(this.dicePhysicsBody.quaternion.x,this.dicePhysicsBody.quaternion.y,this.dicePhysicsBody.quaternion.z,this.dicePhysicsBody.quaternion.w))},stepPhysicsWorld(){if(!this.physicsWorld)return;const n=performance.now(),e=Math.min((n-(this.physicsLastTime??n))/1e3,1/20);if(this.physicsLastTime=n,this.physicsWorld.step(1/60,e,4),this.pendingDiceRoll&&this.dicePhysicsBody){const t=this.dicePhysicsBody.sleepState===be.SLEEPING,i=this.dicePhysicsBody.velocity.lengthSquared()<.03&&this.dicePhysicsBody.angularVelocity.lengthSquared()<.03,s=n-this.pendingDiceRoll.startedAt>qo.minimumMotionMs;if(this.dicePhysicsBody.position.y<Gt.floorY-2){this.resetDiceBody(),this.completeDiceRoll(1);return}if(!s||!t&&!i)return;const r=this.getDiceTopFaceData();if(r.dot>=qo.faceUpDotThreshold){this.snapDiceToFaceUp(r),this.completeDiceRoll(r.value);return}if(this.pendingDiceRoll.recoveryAttempts>=qo.maxRecoveryAttempts){this.snapDiceToFaceUp(r),this.completeDiceRoll(r.value);return}n-this.pendingDiceRoll.lastRecoveryAt>=qo.recoveryCooldownMs&&this.recoverTiltedDice(r,n)}},syncPawns(){const n=performance.now();this.store.players.forEach(e=>{e.pawns.forEach(t=>{this.ensurePawnMesh(t);const i=this.pawnMeshes[t.id],s=this.getPawnWorldState(t),r=this.getAnimatedPawnPosition(t,s,n);i.position.set(r.x,r.y,r.z),i.scale.setScalar(t.isActive?1.1:1)})})},syncInteractionIndicators(n){!!(this.diceIndicator&&this.diceMesh&&this.store.gamePlayStatus.isRolling&&this.isHumanTurn())?this.updateSunrayIndicator(this.diceIndicator,{x:this.diceMesh.position.x,y:this.diceMesh.position.y+Pr.dice.anchorOffsetY,z:this.diceMesh.position.z},n,this.hoveredTarget==="dice"?1.08:1):this.diceIndicator&&(this.diceIndicator.visible=!1),this.store.players.forEach(t=>{t.pawns.forEach(i=>{const s=this.pawnIndicators[i.id],r=this.pawnMeshes[i.id],o=!!(s&&r&&this.store.gamePlayStatus.isMoving&&this.isHumanTurn()&&i.isActive);if(s){if(!o){s.visible=!1;return}this.updateSunrayIndicator(s,{x:r.position.x,y:r.position.y+Pr.pawn.anchorOffsetY,z:r.position.z},n,this.hoveredTarget===r.name?1.08:1)}})})},getPawnWorldState(n){const e=n.getCoordinates(bT);return{key:`${n.position}:${n.globalPosition}:${n.isInDestinationField?1:0}`,jumpHeight:this.getPawnJumpHeight(n),position:{x:e.x,y:e.y+(n.isActive?wT:0),z:e.z}}},getPawnJumpHeight(n){return n.position===0?.2:n.position>40?.24:.34},cloneWorldPosition(n){return{x:n.x,y:n.y,z:n.z}},getAnimatedPawnPosition(n,e,t){this.pawnMotionStates[n.id]||(this.pawnMotionStates[n.id]=He({current:this.cloneWorldPosition(e.position),from:this.cloneWorldPosition(e.position),to:this.cloneWorldPosition(e.position),logicalKey:e.key,startTime:t,duration:xa,jumpHeight:e.jumpHeight,isAnimating:!1}));const i=this.pawnMotionStates[n.id];if(i.logicalKey!==e.key&&(i.from=this.cloneWorldPosition(i.current),i.to=this.cloneWorldPosition(e.position),i.logicalKey=e.key,i.startTime=t,i.duration=xa,i.jumpHeight=e.jumpHeight,i.isAnimating=!0),!i.isAnimating)return i.current=this.cloneWorldPosition(e.position),i.current;const s=Math.min((t-i.startTime)/i.duration,1),r={x:i.from.x+(i.to.x-i.from.x)*s,y:i.from.y+(i.to.y-i.from.y)*s+Math.sin(Math.PI*s)*i.jumpHeight,z:i.from.z+(i.to.z-i.from.z)*s};return i.current=r,s>=1&&(i.current=this.cloneWorldPosition(i.to),i.isAnimating=!1),i.current},ensurePawnMesh(n){if(this.pawnMeshes[n.id])return;const e=He(new Ki),t=this.createToonMaterial(`pawn-body-material-${n.playerIndex}`,{color:n.color},{outlineThickness:.01}),i=this.createToonMaterial(`pawn-head-material-${n.playerIndex}`,{color:n.color},{outlineThickness:.0095}),s=this.createOutlinedMesh(this.getSharedGeometry("pawn-body",()=>new bi(.08,.28,.75,24)),t,{castShadow:!0,receiveShadow:!0});s.position.y=.35,this.attachOutlineShell(s,1.055);const r=this.createOutlinedMesh(this.getSharedGeometry("pawn-head",()=>new ms(.18,24,24)),i,{castShadow:!0,receiveShadow:!0});r.position.y=.85,this.attachOutlineShell(r,1.075),e.name=`cube-${n.id}`,e.add(s),e.add(r),this.pawnMeshes[n.id]=e,this.scene.add(e),this.ensurePawnIndicator(n),this.applyOutlineAppearance()},createOutlinedMesh(n,e,t={}){const i=He(new Zt(n,e));return i.castShadow=!!t.castShadow,i.receiveShadow=!!t.receiveShadow,t.outlineScale&&this.attachOutlineShell(i,t.outlineScale),i},createOutlinedInstancedSet(n,e,t,i={}){const s=He(new Vu(n,e,t.length));s.castShadow=!!i.castShadow,s.receiveShadow=!!i.receiveShadow;const r=new vt,o=new Mn,a=new W(1,1,1);if(t.forEach((l,c)=>{r.compose(new W(l.x,l.y,l.z),o,a),s.setMatrixAt(c,r)}),s.instanceMatrix.needsUpdate=!0,i.outlineScale){const l=He(new Vu(n,this.getOutlineShellMaterial(),t.length));l.userData.isOutlineShell=!0,l.userData.baseOutlineScale=i.outlineScale,l.userData.outlinePositions=t.map(c=>({x:c.x,y:c.y,z:c.z})),l.renderOrder=1,l.castShadow=!1,l.receiveShadow=!1,s.renderOrder=2,this.applyInstancedOutlineMatrices(l,l.userData.outlinePositions,i.outlineScale,1),s.add(l)}return s},createDiceIndicator(){this.diceIndicator||!this.scene||(this.diceIndicator=this.createSunrayIndicator("dice",Pr.dice),this.scene.add(this.diceIndicator))},ensurePawnIndicator(n){if(this.pawnIndicators[n.id]||!this.scene)return;const e=this.createSunrayIndicator(`pawn-${n.id}`,Pr.pawn);this.pawnIndicators[n.id]=e,this.scene.add(e)},createSunrayIndicator(n,e){const t=He(new Ki),i=He(new Zt(this.getSharedGeometry(`sunray-beam-${n}`,()=>new bi(e.topRadius,e.bottomRadius,e.beamHeight,18,1,!0)),this.getSunrayBeamMaterial())),s=He(new Zt(this.getSharedGeometry(`sunray-core-${n}`,()=>new bi(e.topRadius*.52,e.bottomRadius*.42,e.beamHeight*.88,16,1,!0)),this.getSunrayCoreMaterial())),r=He(new Zt(this.getSharedGeometry(`sunray-halo-${n}`,()=>new Sh(e.haloRadius,28)),this.getSunrayHaloMaterial()));return i.position.y=e.beamHeight*.5,s.position.y=e.beamHeight*.46,r.position.y=.014,r.rotation.x=-Math.PI/2,[i,s,r].forEach(o=>{o.castShadow=!1,o.receiveShadow=!1,o.renderOrder=30}),t.userData.beam=i,t.userData.core=s,t.userData.halo=r,t.userData.phase=Math.random()*Math.PI*2,t.visible=!1,t.add(i),t.add(s),t.add(r),t},updateSunrayIndicator(n,e,t,i=1){if(!n)return;const s=n.userData.phase||0,r=1+Math.sin(t*Pr.pulseSpeed+s)*.05*i,o=1+Math.sin(t*.0072+s)*.08*i,a=Math.sin(t*.0035+s)*.015,l=n.userData.beam,c=n.userData.core,h=n.userData.halo;n.visible=!0,n.position.set(e.x,e.y+a,e.z),l.scale.set(r,1,r),c.scale.set(r*.88,1,r*.88),h.scale.setScalar(o)},createToonMaterial(n,e){return this.getSharedMaterial(n,()=>{const t=He(new Gu({roughness:.78,metalness:.02,...e}));return this.prepareFillMaterial(t),t})},getOutlineShellMaterial(){return this.getSharedMaterial("outline-shell-material",()=>He(new $s({color:yT,side:ln,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!1})))},getSunrayBeamMaterial(){return this.getSharedMaterial("sunray-beam-material",()=>He(new $s({color:"#ffe3a0",transparent:!0,opacity:.38,alphaMap:this.getSunrayBeamTexture(),blending:Vr,depthWrite:!1,side:Cn,toneMapped:!1})))},getSunrayCoreMaterial(){return this.getSharedMaterial("sunray-core-material",()=>He(new $s({color:"#fff6cf",transparent:!0,opacity:.26,alphaMap:this.getSunrayBeamTexture(),blending:Vr,depthWrite:!1,side:Cn,toneMapped:!1})))},getSunrayHaloMaterial(){return this.getSharedMaterial("sunray-halo-material",()=>He(new $s({color:"#ffe4a8",transparent:!0,opacity:.52,alphaMap:this.getSunrayHaloTexture(),blending:Vr,depthWrite:!1,side:Cn,toneMapped:!1})))},getSunrayBeamTexture(){return this.getSharedTexture("sunray-beam-texture",()=>{const n=document.createElement("canvas");n.width=32,n.height=256;const e=n.getContext("2d"),t=e.createLinearGradient(0,0,0,n.height);t.addColorStop(0,"#000000"),t.addColorStop(.16,"#4a4a4a"),t.addColorStop(.5,"#ffffff"),t.addColorStop(.84,"#7f7f7f"),t.addColorStop(1,"#000000"),e.fillStyle=t,e.fillRect(0,0,n.width,n.height);const i=He(new Lo(n));return i.needsUpdate=!0,i})},getSunrayHaloTexture(){return this.getSharedTexture("sunray-halo-texture",()=>{const n=document.createElement("canvas");n.width=256,n.height=256;const e=n.getContext("2d"),t=e.createRadialGradient(128,128,12,128,128,128);t.addColorStop(0,"#ffffff"),t.addColorStop(.28,"#e8e8e8"),t.addColorStop(.62,"#7f7f7f"),t.addColorStop(1,"#000000"),e.fillStyle=t,e.fillRect(0,0,n.width,n.height);const i=He(new Lo(n));return i.needsUpdate=!0,i})},getOutlineScaleVector(n,e=1){const t=typeof n=="number"?{x:n,y:n,z:n}:{x:n?.x??1,y:n?.y??1,z:n?.z??1};return new W(1+(t.x-1)*e,1+(t.y-1)*e,1+(t.z-1)*e)},attachOutlineShell(n,e){const t=He(new Zt(n.geometry,this.getOutlineShellMaterial()));t.userData.isOutlineShell=!0,t.userData.baseOutlineScale=e,t.renderOrder=1,t.castShadow=!1,t.receiveShadow=!1,t.scale.copy(this.getOutlineScaleVector(e,1)),n.renderOrder=2,n.add(t)},applyInstancedOutlineMatrices(n,e,t,i){const s=new vt,r=new Mn,o=this.getOutlineScaleVector(t,i);e.forEach((a,l)=>{s.compose(new W(a.x,a.y,a.z),r,o),n.setMatrixAt(l,s)}),n.instanceMatrix.needsUpdate=!0},createDiceMaterials(){return ST.map(n=>this.getSharedMaterial(`dice-face-material-${n}`,()=>{const t=He(new Gu({color:"#ffffff",map:this.getDiceFaceTexture(n),roughness:.5,metalness:.01}));return this.prepareFillMaterial(t),t}))},getDiceFaceTexture(n){return this.getSharedTexture(`dice-face-texture-${n}`,()=>{const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");t.fillStyle="#fff8e8",t.fillRect(0,0,e.width,e.height),t.strokeStyle="#e0d2b2",t.lineWidth=12,t.strokeRect(18,18,e.width-36,e.height-36),t.fillStyle="#231a15";const i=22,s={center:[128,128],topLeft:[72,72],topRight:[184,72],middleLeft:[72,128],middleRight:[184,128],bottomLeft:[72,184],bottomRight:[184,184]};({1:["center"],2:["topLeft","bottomRight"],3:["topLeft","center","bottomRight"],4:["topLeft","topRight","bottomLeft","bottomRight"],5:["topLeft","topRight","center","bottomLeft","bottomRight"],6:["topLeft","topRight","middleLeft","middleRight","bottomLeft","bottomRight"]})[n].forEach(a=>{const[l,c]=s[a];t.beginPath(),t.arc(l,c,i,0,Math.PI*2),t.fill()});const o=He(new Lo(e));return o.colorSpace=sn,o.needsUpdate=!0,o})},getToonGradientMap(){return this.getSharedTexture("toon-gradient-map",()=>{const n=new Uint8Array([0,84,152,208,255]),e=He(new xh(n,n.length,1,Fa));return e.minFilter=Ft,e.magFilter=Ft,e.generateMipmaps=!1,e.needsUpdate=!0,e})},getSkyGradientTexture(){return this.getSharedTexture("sky-gradient-texture",()=>{const n=document.createElement("canvas");n.width=64,n.height=512;const e=n.getContext("2d"),t=e.createLinearGradient(0,0,0,n.height);t.addColorStop(0,"#85d8ff"),t.addColorStop(.48,"#c2ecff"),t.addColorStop(.75,"#f9efc8"),t.addColorStop(1,"#ffd4a8"),e.fillStyle=t,e.fillRect(0,0,n.width,n.height),e.fillStyle="rgba(255, 255, 255, 0.14)",e.fillRect(0,n.height*.56,n.width,n.height*.06),e.fillStyle="rgba(255, 226, 177, 0.16)",e.fillRect(0,n.height*.76,n.width,n.height*.08);const i=He(new Lo(n));return i.colorSpace=sn,i.needsUpdate=!0,i})},createCloud(n,e=1){const t=He(new Ki),i=this.getSharedGeometry("cartoon-cloud-puff",()=>new ms(1,20,20)),s=this.createToonMaterial("cartoon-cloud-material",{color:"#ffffff"},{outlineThickness:.0082,outlineColor:"#68818f",outlineAlpha:.9});[{x:-1.35,y:0,z:.15,scale:[1.1,.82,.92]},{x:-.35,y:.3,z:0,scale:[1.28,.96,1.02]},{x:.7,y:.2,z:-.08,scale:[1.15,.88,.95]},{x:1.55,y:-.02,z:.1,scale:[.92,.7,.8]}].forEach(r=>{const o=this.createOutlinedMesh(i,s);o.position.set(r.x,r.y,r.z),o.scale.set(r.scale[0],r.scale[1],r.scale[2]),t.add(o)}),t.position.set(n.x,n.y,n.z),t.scale.setScalar(e),this.scene.add(t)},applyOutlineAppearance(){const n=Nw(this.store.settings.outlineAppearance),e=this.getOutlineShellMaterial();e.opacity=n.visible?n.lineOpacity:0,e.transparent=!0,e.needsUpdate=!0,this.scene?.traverse(t=>{if(t.userData?.isOutlineShell){if(t.visible=n.visible,t.isInstancedMesh){this.applyInstancedOutlineMatrices(t,t.userData.outlinePositions||[],t.userData.baseOutlineScale||1.02,n.lineScale);return}t.scale.copy(this.getOutlineScaleVector(t.userData.baseOutlineScale||1.02,n.lineScale))}})},applyRenderQuality(){if(!this.renderer)return;const n=qp(this.store.settings.quality),e=window.devicePixelRatio||1,t=Math.min(e*n.pixelRatioScale,n.maxPixelRatio);if(this.renderer.setPixelRatio(t),this.renderer.shadowMap.enabled=n.shadowsEnabled,this.shadowLight){if(this.shadowLight.castShadow=n.shadowsEnabled,n.shadowsEnabled&&n.shadowMapSize){const i=this.shadowLight.shadow.mapSize.width,s=this.shadowLight.shadow.mapSize.height;(i!==n.shadowMapSize||s!==n.shadowMapSize)&&(this.shadowLight.shadow.map?.dispose?.(),this.shadowLight.shadow.map=null,this.shadowLight.shadow.mapSize.set(n.shadowMapSize,n.shadowMapSize))}this.shadowLight.shadow.needsUpdate=!0}this.renderer.setSize(window.innerWidth,window.innerHeight,!1)},prepareFillMaterial(n){!n||n.polygonOffset||(n.polygonOffset=!0,n.polygonOffsetFactor=1,n.polygonOffsetUnits=2,n.needsUpdate=!0)},getSharedGeometry(n,e){return this.sharedGeometries[n]||(this.sharedGeometries[n]=He(e())),this.sharedGeometries[n]},getSharedTexture(n,e){return this.sharedTextures[n]||(this.sharedTextures[n]=He(e())),this.sharedTextures[n]},getSharedMaterial(n,e){return this.sharedMaterials[n]||(this.sharedMaterials[n]=He(e())),this.sharedMaterials[n]},disposeSharedResources(){Object.values(this.sharedGeometries).forEach(n=>n.dispose?.()),Object.values(this.sharedTextures).forEach(n=>n.dispose?.()),Object.values(this.sharedMaterials).forEach(n=>n.dispose?.()),this.sharedGeometries=He({}),this.sharedTextures=He({}),this.sharedMaterials=He({})},handleResize(){if(!this.camera||!this.renderer)return;const n=window.innerWidth,e=window.innerHeight;this.camera.aspect=n/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(n,e,!1),this.hoverNeedsUpdate=!0},isHumanTurn(){const n=this.store.players[this.store.currentPlayerId];return!!(n&&!n.isComputer)},setPointerFromEvent(n){if(!this.pointer||!this.$refs.canvas)return!1;const e=this.$refs.canvas.getBoundingClientRect();return this.pointer.x=(n.clientX-e.left)/e.width*2-1,this.pointer.y=-((n.clientY-e.top)/e.height)*2+1,!0},handlePointerDown(n){this.pointerDownPosition={x:n.clientX,y:n.clientY},this.isPointerInsideCanvas=!0,this.isDraggingScene=!1,this.setPointerFromEvent(n),this.hoverNeedsUpdate=!0},getInteractiveHit(){if(!this.raycaster||!this.camera)return null;const n=[];if(this.diceMesh&&this.store.gamePlayStatus.isRolling&&this.isHumanTurn()&&n.push(this.diceMesh),this.store.gamePlayStatus.isMoving&&this.isHumanTurn()&&Object.values(this.pawnMeshes).forEach(s=>{this.findPawnByMeshName(s.name)?.isActive&&n.push(s)}),!n.length)return null;this.raycaster.setFromCamera(this.pointer,this.camera);const e=this.raycaster.intersectObjects(n,!0);if(!e.length)return null;let i=e[0].object;for(;i;){if(i.name==="dice"||i.name.startsWith("cube-"))return i.name;i=i.parent}return null},refreshHoveredTarget(){if(!this.pointer){this.hoverNeedsUpdate=!1;return}const n=this.getInteractiveHit();if(this.hoveredTarget===n){this.hoverNeedsUpdate=!1;return}this.hoveredTarget=n,this.$refs.canvas&&(this.$refs.canvas.style.cursor=this.hoveredTarget?"pointer":"default"),this.hoverNeedsUpdate=!1},clearHoveredTarget(){this.hoveredTarget=null,this.pointerDownPosition=null,this.isDraggingScene=!1,this.isPointerInsideCanvas=!1,this.hoverNeedsUpdate=!1,this.$refs.canvas&&(this.$refs.canvas.style.cursor="default")},handlePointerMove(n){if(this.pointerDownPosition){const e=n.clientX-this.pointerDownPosition.x,t=n.clientY-this.pointerDownPosition.y;e*e+t*t>25&&(this.isDraggingScene=!0)}this.setPointerFromEvent(n)&&(this.isPointerInsideCanvas=!0,this.hoverNeedsUpdate=!0)},handleCanvasClick(n){if(this.isDraggingScene){this.isDraggingScene=!1,this.pointerDownPosition=null;return}if(this.pointerDownPosition=null,!this.setPointerFromEvent(n))return;const e=this.getInteractiveHit();if(!e)return;if(e==="dice"){this.rollDice(),this.hoverNeedsUpdate=!0;return}const t=this.findPawnByMeshName(e);t?.isActive&&(t.move(),this.hoverNeedsUpdate=!0)},findPawnByMeshName(n){const e=n.replace(/^cube-/,"");return this.store.players.flatMap(t=>t.pawns).find(t=>t.id===e)||null},resetGameState(){this.store.players.splice(0,this.store.players.length),this.store.currentPlayerId=-1,this.store.currentRound=0,this.store.playingPlayerIndex=null,this.store.lastRolledDice="Start",this.store.gamePlayStatus.isRolling=!1,this.store.gamePlayStatus.isMoving=!1,Object.values(this.pawnMeshes).forEach(n=>{this.scene.remove(n)}),Object.values(this.pawnIndicators).forEach(n=>{this.scene.remove(n)}),this.pawnMeshes=He({}),this.pawnIndicators=He({}),this.pawnMotionStates=He({}),this.pendingDiceRoll=null,this.freezeDiceBody(),this.syncDice(),this.diceIndicator&&(this.diceIndicator.visible=!1),this.clearHoveredTarget()},createPlayers(n){n.forEach((e,t)=>{this.store.players.push(new vT(e||"Computer",xT[t],t+1,!e))})},startGame(n){const e=Array.isArray(n)?n.slice(0,4):[];for(;e.length<4;)e.push("");this.resetGameState(),this.createPlayers(e),this.store.currentRound=1,this.store.currentScreen="game-screen",this.changePlayersTurn(),this.hoverNeedsUpdate=!0},changePlayersTurn(){if(!this.store.players.length)return;ft.gamePlayStatus.isMoving=!1;const n=this.store.players[this.store.currentPlayerId];n&&n.endTurn(),this.store.currentPlayerId===this.store.players.length-1?(this.store.currentPlayerId=0,this.store.currentRound+=1):this.store.currentPlayerId+=1,this.store.players[this.store.currentPlayerId].startTurn(),this.hoverNeedsUpdate=!0},repeatPlayersTurn(){const n=this.store.players[this.store.currentPlayerId];n&&(ft.gamePlayStatus.isMoving=!1,n.endTurn(),n.startTurn(),this.hoverNeedsUpdate=!0)},resetDiceBody(){this.dicePhysicsBody&&(this.clearDiceBodyMotion(),this.dicePhysicsBody.position.set(ne.center.x,ne.center.y+ne.floor.height/2+vn/2,ne.center.z),this.dicePhysicsBody.quaternion.set(0,0,0,1),this.dicePhysicsBody.sleep())},getDiceTrayRestY(){return ne.center.y+ne.floor.height/2+vn/2},getDiceTrayBounds(){return{minX:ne.center.x-(ne.floor.width/2-vn*.56),maxX:ne.center.x+(ne.floor.width/2-vn*.56),minZ:ne.center.z-(ne.floor.depth/2-vn*.56),maxZ:ne.center.z+(ne.floor.depth/2-vn*.56)}},clearDiceBodyMotion(){this.dicePhysicsBody&&(this.dicePhysicsBody.velocity.setZero(),this.dicePhysicsBody.angularVelocity.setZero(),this.dicePhysicsBody.force.setZero(),this.dicePhysicsBody.torque.setZero())},freezeDiceBody(){this.dicePhysicsBody&&(this.clearDiceBodyMotion(),this.dicePhysicsBody.sleep())},startDiceRoll(){if(!this.dicePhysicsBody)return;const n=this.dicePhysicsBody,e=this.getDiceTrayBounds(),t=this.getDiceTrayRestY();(!Number.isFinite(n.position.x)||!Number.isFinite(n.position.y)||!Number.isFinite(n.position.z)||n.position.y<Gt.floorY-1.5)&&this.resetDiceBody(),n.wakeUp(),this.clearDiceBodyMotion(),n.position.set(Math.min(Math.max(n.position.x,e.minX),e.maxX),Math.max(n.position.y+.08,t+.06),Math.min(Math.max(n.position.z,e.minZ),e.maxZ));const i=(ne.center.x-n.position.x)*1.25,s=(ne.center.z-n.position.z)*1.25,r=i+(Math.random()-.5)*3.4,o=s+(Math.random()-.5)*3.1;n.angularVelocity.set((Math.random()-.5)*18,10+Math.random()*12,(Math.random()-.5)*18),n.applyImpulse(new M(r,5.1+Math.random()*.95,o),new M((Math.random()-.5)*.24,0,(Math.random()-.5)*.24)),this.pendingDiceRoll={startedAt:performance.now(),lastRecoveryAt:0,recoveryAttempts:0}},completeDiceRoll(n=this.getDiceResultFromBody()){this.pendingDiceRoll&&(this.pendingDiceRoll=null,this.store.lastRolledDice=n,this.hoverNeedsUpdate=!0,this.store.players[this.store.currentPlayerId]?.rollDice(n))},getDiceTopFaceData(){if(!this.dicePhysicsBody)return{value:1,dot:1,worldNormal:Xo.clone(),quaternion:new Mn};const n=new Mn(this.dicePhysicsBody.quaternion.x,this.dicePhysicsBody.quaternion.y,this.dicePhysicsBody.quaternion.z,this.dicePhysicsBody.quaternion.w);let e=1,t=-1/0,i=Xo.clone();return Object.entries(MT).forEach(([s,r])=>{const o=r.clone().applyQuaternion(n),a=o.dot(Xo);a>t&&(t=a,e=Number(s),i=o)}),{value:e,dot:t,worldNormal:i,quaternion:n}},getDiceResultFromBody(){return this.getDiceTopFaceData().value},snapDiceToFaceUp(n=this.getDiceTopFaceData()){if(!this.dicePhysicsBody)return;const e=this.dicePhysicsBody,t=this.getDiceTrayBounds(),i=new Mn().setFromUnitVectors(n.worldNormal.clone().normalize(),Xo).multiply(n.quaternion.clone()).normalize();this.clearDiceBodyMotion(),e.position.set(Math.min(Math.max(e.position.x,t.minX),t.maxX),this.getDiceTrayRestY(),Math.min(Math.max(e.position.z,t.minZ),t.maxZ)),e.quaternion.set(i.x,i.y,i.z,i.w),e.sleep()},recoverTiltedDice(n,e){if(!this.dicePhysicsBody||!this.pendingDiceRoll)return;const t=this.dicePhysicsBody,i=this.getDiceTrayBounds(),s=n.worldNormal.clone();if(s.y=0,s.lengthSq()<1e-4){const o=Math.random()*Math.PI*2;s.set(Math.cos(o),0,Math.sin(o))}else s.normalize();t.wakeUp(),this.clearDiceBodyMotion(),t.position.set(Math.min(Math.max(t.position.x,i.minX),i.maxX),Math.max(t.position.y,this.getDiceTrayRestY()+.04),Math.min(Math.max(t.position.z,i.minZ),i.maxZ));const r=.22+Math.random()*.16;t.applyImpulse(new M(s.x*r,.42+Math.random()*.12,s.z*r),new M((Math.random()-.5)*.18,0,(Math.random()-.5)*.18)),t.angularVelocity.set((Math.random()-.5)*3.2+s.z*2.8,1.8+Math.random()*1.4,(Math.random()-.5)*3.2-s.x*2.8),this.pendingDiceRoll.startedAt=e,this.pendingDiceRoll.lastRecoveryAt=e,this.pendingDiceRoll.recoveryAttempts+=1},rollDice(n){!this.store.gamePlayStatus.isRolling||this.store.currentPlayerId<0||this.pendingDiceRoll||(this.store.gamePlayStatus.isRolling=!1,this.hoverNeedsUpdate=!0,this.startDiceRoll())}}},CT={class:"app-shell"},RT={ref:"canvas",class:"board-canvas"};function PT(n,e,t,i,s,r){const o=tr("start-screen");return Nt(),kt("main",CT,[tt("canvas",RT,null,512),an(o),e[0]||(e[0]=kg('<div class="mobile-block-overlay"><div class="mobile-block-panel"><p class="mobile-block-icon">🖥️</p><p class="mobile-block-title">Desktop Only</p><p class="mobile-block-message">This game is only playable on desktop. Please open it on a computer to play.</p></div></div>',1))])}const DT=ao(AT,[["render",PT]]);A0(DT).mount("#app");
