(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function rh(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const Mt={},lr=[],ri=()=>{},mf=()=>!1,Ia=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),oh=n=>n.startsWith("onUpdate:"),kt=Object.assign,ah=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Lm=Object.prototype.hasOwnProperty,ht=(n,e)=>Lm.call(n,e),ke=Array.isArray,cr=n=>co(n)==="[object Map]",La=n=>co(n)==="[object Set]",Kh=n=>co(n)==="[object Date]",Ke=n=>typeof n=="function",Pt=n=>typeof n=="string",li=n=>typeof n=="symbol",ut=n=>n!==null&&typeof n=="object",gf=n=>(ut(n)||Ke(n))&&Ke(n.then)&&Ke(n.catch),_f=Object.prototype.toString,co=n=>_f.call(n),Nm=n=>co(n).slice(8,-1),vf=n=>co(n)==="[object Object]",lh=n=>Pt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,kr=rh(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Na=n=>{const e=Object.create(null);return(t=>e[t]||(e[t]=n(t)))},Fm=/-\w/g,In=Na(n=>n.replace(Fm,e=>e.slice(1).toUpperCase())),Um=/\B([A-Z])/g,Fs=Na(n=>n.replace(Um,"-$1").toLowerCase()),Fa=Na(n=>n.charAt(0).toUpperCase()+n.slice(1)),il=Na(n=>n?`on${Fa(n)}`:""),Ps=(n,e)=>!Object.is(n,e),na=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},xf=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},Ua=n=>{const e=parseFloat(n);return isNaN(e)?n:e},Om=n=>{const e=Pt(n)?Number(n):NaN;return isNaN(e)?n:e};let Zh;const Oa=()=>Zh||(Zh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Ds(n){if(ke(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=Pt(i)?Vm(i):Ds(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(Pt(n)||ut(n))return n}const Bm=/;(?![^(]*\))/g,zm=/:([^]+)/,Hm=/\/\*[^]*?\*\//g;function Vm(n){const e={};return n.replace(Hm,"").split(Bm).forEach(t=>{if(t){const i=t.split(zm);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Ba(n){let e="";if(Pt(n))e=n;else if(ke(n))for(let t=0;t<n.length;t++){const i=Ba(n[t]);i&&(e+=i+" ")}else if(ut(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const Gm="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",km=rh(Gm);function yf(n){return!!n||n===""}function Wm(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=ho(n[i],e[i]);return t}function ho(n,e){if(n===e)return!0;let t=Kh(n),i=Kh(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=li(n),i=li(e),t||i)return n===e;if(t=ke(n),i=ke(e),t||i)return t&&i?Wm(n,e):!1;if(t=ut(n),i=ut(e),t||i){if(!t||!i)return!1;const s=Object.keys(n).length,r=Object.keys(e).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=e.hasOwnProperty(o);if(a&&!l||!a&&l||!ho(n[o],e[o]))return!1}}return String(n)===String(e)}function Xm(n,e){return n.findIndex(t=>ho(t,e))}const Mf=n=>!!(n&&n.__v_isRef===!0),Mn=n=>Pt(n)?n:n==null?"":ke(n)||ut(n)&&(n.toString===_f||!Ke(n.toString))?Mf(n)?Mn(n.value):JSON.stringify(n,Sf,2):String(n),Sf=(n,e)=>Mf(e)?Sf(n,e.value):cr(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[sl(i,r)+" =>"]=s,t),{})}:La(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>sl(t))}:li(e)?sl(e):ut(e)&&!ke(e)&&!vf(e)?String(e):e,sl=(n,e="")=>{var t;return li(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};let gn;class qm{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=gn,!e&&gn&&(this.index=(gn.scopes||(gn.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=gn;try{return gn=this,e()}finally{gn=t}}}on(){++this._on===1&&(this.prevScope=gn,gn=this)}off(){this._on>0&&--this._on===0&&(gn=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Ym(){return gn}let Et;const rl=new WeakSet;class Ef{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,gn&&gn.active&&gn.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,rl.has(this)&&(rl.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||wf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Jh(this),Tf(this);const e=Et,t=Gn;Et=this,Gn=!0;try{return this.fn()}finally{Af(this),Et=e,Gn=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)uh(e);this.deps=this.depsTail=void 0,Jh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?rl.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){tc(this)&&this.run()}get dirty(){return tc(this)}}let bf=0,Wr,Xr;function wf(n,e=!1){if(n.flags|=8,e){n.next=Xr,Xr=n;return}n.next=Wr,Wr=n}function ch(){bf++}function hh(){if(--bf>0)return;if(Xr){let e=Xr;for(Xr=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Wr;){let e=Wr;for(Wr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Tf(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Af(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),uh(i),jm(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function tc(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Cf(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Cf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===Zr)||(n.globalVersion=Zr,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!tc(n))))return;n.flags|=2;const e=n.dep,t=Et,i=Gn;Et=n,Gn=!0;try{Tf(n);const s=n.fn(n._value);(e.version===0||Ps(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{Et=t,Gn=i,Af(n),n.flags&=-3}}function uh(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)uh(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function jm(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let Gn=!0;const Rf=[];function Ui(){Rf.push(Gn),Gn=!1}function Oi(){const n=Rf.pop();Gn=n===void 0?!0:n}function Jh(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=Et;Et=void 0;try{e()}finally{Et=t}}}let Zr=0;class $m{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Pf{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!Et||!Gn||Et===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==Et)t=this.activeLink=new $m(Et,this),Et.deps?(t.prevDep=Et.depsTail,Et.depsTail.nextDep=t,Et.depsTail=t):Et.deps=Et.depsTail=t,Df(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=Et.depsTail,t.nextDep=void 0,Et.depsTail.nextDep=t,Et.depsTail=t,Et.deps===t&&(Et.deps=i)}return t}trigger(e){this.version++,Zr++,this.notify(e)}notify(e){ch();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{hh()}}}function Df(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Df(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const nc=new WeakMap,Is=Symbol(""),ic=Symbol(""),Jr=Symbol("");function Jt(n,e,t){if(Gn&&Et){let i=nc.get(n);i||nc.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new Pf),s.map=i,s.key=t),s.track()}}function Ri(n,e,t,i,s,r){const o=nc.get(n);if(!o){Zr++;return}const a=l=>{l&&l.trigger()};if(ch(),e==="clear")o.forEach(a);else{const l=ke(n),c=l&&lh(t);if(l&&t==="length"){const h=Number(i);o.forEach((d,u)=>{(u==="length"||u===Jr||!li(u)&&u>=h)&&a(d)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(Jr)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Is)),cr(n)&&a(o.get(ic)));break;case"delete":l||(a(o.get(Is)),cr(n)&&a(o.get(ic)));break;case"set":cr(n)&&a(o.get(Is));break}}hh()}function Hs(n){const e=pt(n);return e===n?e:(Jt(e,"iterate",Jr),kn(n)?e:e.map(Bi))}function za(n){return Jt(n=pt(n),"iterate",Jr),n}function Ji(n,e){return rs(n)?_r(Ls(n)?Bi(e):e):Bi(e)}const Km={__proto__:null,[Symbol.iterator](){return ol(this,Symbol.iterator,n=>Ji(this,n))},concat(...n){return Hs(this).concat(...n.map(e=>ke(e)?Hs(e):e))},entries(){return ol(this,"entries",n=>(n[1]=Ji(this,n[1]),n))},every(n,e){return mi(this,"every",n,e,void 0,arguments)},filter(n,e){return mi(this,"filter",n,e,t=>t.map(i=>Ji(this,i)),arguments)},find(n,e){return mi(this,"find",n,e,t=>Ji(this,t),arguments)},findIndex(n,e){return mi(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return mi(this,"findLast",n,e,t=>Ji(this,t),arguments)},findLastIndex(n,e){return mi(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return mi(this,"forEach",n,e,void 0,arguments)},includes(...n){return al(this,"includes",n)},indexOf(...n){return al(this,"indexOf",n)},join(n){return Hs(this).join(n)},lastIndexOf(...n){return al(this,"lastIndexOf",n)},map(n,e){return mi(this,"map",n,e,void 0,arguments)},pop(){return br(this,"pop")},push(...n){return br(this,"push",n)},reduce(n,...e){return Qh(this,"reduce",n,e)},reduceRight(n,...e){return Qh(this,"reduceRight",n,e)},shift(){return br(this,"shift")},some(n,e){return mi(this,"some",n,e,void 0,arguments)},splice(...n){return br(this,"splice",n)},toReversed(){return Hs(this).toReversed()},toSorted(n){return Hs(this).toSorted(n)},toSpliced(...n){return Hs(this).toSpliced(...n)},unshift(...n){return br(this,"unshift",n)},values(){return ol(this,"values",n=>Ji(this,n))}};function ol(n,e,t){const i=za(n),s=i[e]();return i!==n&&!kn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.done||(r.value=t(r.value)),r}),s}const Zm=Array.prototype;function mi(n,e,t,i,s,r){const o=za(n),a=o!==n&&!kn(n),l=o[e];if(l!==Zm[e]){const d=l.apply(n,r);return a?Bi(d):d}let c=t;o!==n&&(a?c=function(d,u){return t.call(this,Ji(n,d),u,n)}:t.length>2&&(c=function(d,u){return t.call(this,d,u,n)}));const h=l.call(o,c,i);return a&&s?s(h):h}function Qh(n,e,t,i){const s=za(n);let r=t;return s!==n&&(kn(n)?t.length>3&&(r=function(o,a,l){return t.call(this,o,a,l,n)}):r=function(o,a,l){return t.call(this,o,Ji(n,a),l,n)}),s[e](r,...i)}function al(n,e,t){const i=pt(n);Jt(i,"iterate",Jr);const s=i[e](...t);return(s===-1||s===!1)&&ph(t[0])?(t[0]=pt(t[0]),i[e](...t)):s}function br(n,e,t=[]){Ui(),ch();const i=pt(n)[e].apply(n,t);return hh(),Oi(),i}const Jm=rh("__proto__,__v_isRef,__isVue"),If=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(li));function Qm(n){li(n)||(n=String(n));const e=pt(this);return Jt(e,"has",n),e.hasOwnProperty(n)}class Lf{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?cg:Of:r?Uf:Ff).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=ke(e);if(!s){let l;if(o&&(l=Km[t]))return l;if(t==="hasOwnProperty")return Qm}const a=Reflect.get(e,t,cn(e)?e:i);if((li(t)?If.has(t):Jm(t))||(s||Jt(e,"get",t),r))return a;if(cn(a)){const l=o&&lh(t)?a:a.value;return s&&ut(l)?rc(l):l}return ut(a)?s?rc(a):Ha(a):a}}class Nf extends Lf{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];const o=ke(e)&&lh(t);if(!this._isShallow){const c=rs(r);if(!kn(i)&&!rs(i)&&(r=pt(r),i=pt(i)),!o&&cn(r)&&!cn(i))return c||(r.value=i),!0}const a=o?Number(t)<e.length:ht(e,t),l=Reflect.set(e,t,i,cn(e)?e:s);return e===pt(s)&&(a?Ps(i,r)&&Ri(e,"set",t,i):Ri(e,"add",t,i)),l}deleteProperty(e,t){const i=ht(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&Ri(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!li(t)||!If.has(t))&&Jt(e,"has",t),i}ownKeys(e){return Jt(e,"iterate",ke(e)?"length":Is),Reflect.ownKeys(e)}}class eg extends Lf{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const tg=new Nf,ng=new eg,ig=new Nf(!0);const sc=n=>n,Mo=n=>Reflect.getPrototypeOf(n);function sg(n,e,t){return function(...i){const s=this.__v_raw,r=pt(s),o=cr(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),h=t?sc:e?_r:Bi;return!e&&Jt(r,"iterate",l?ic:Is),kt(Object.create(c),{next(){const{value:d,done:u}=c.next();return u?{value:d,done:u}:{value:a?[h(d[0]),h(d[1])]:h(d),done:u}}})}}function So(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function rg(n,e){const t={get(s){const r=this.__v_raw,o=pt(r),a=pt(s);n||(Ps(s,a)&&Jt(o,"get",s),Jt(o,"get",a));const{has:l}=Mo(o),c=e?sc:n?_r:Bi;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Jt(pt(s),"iterate",Is),s.size},has(s){const r=this.__v_raw,o=pt(r),a=pt(s);return n||(Ps(s,a)&&Jt(o,"has",s),Jt(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=pt(a),c=e?sc:n?_r:Bi;return!n&&Jt(l,"iterate",Is),a.forEach((h,d)=>s.call(r,c(h),c(d),o))}};return kt(t,n?{add:So("add"),set:So("set"),delete:So("delete"),clear:So("clear")}:{add(s){!e&&!kn(s)&&!rs(s)&&(s=pt(s));const r=pt(this);return Mo(r).has.call(r,s)||(r.add(s),Ri(r,"add",s,s)),this},set(s,r){!e&&!kn(r)&&!rs(r)&&(r=pt(r));const o=pt(this),{has:a,get:l}=Mo(o);let c=a.call(o,s);c||(s=pt(s),c=a.call(o,s));const h=l.call(o,s);return o.set(s,r),c?Ps(r,h)&&Ri(o,"set",s,r):Ri(o,"add",s,r),this},delete(s){const r=pt(this),{has:o,get:a}=Mo(r);let l=o.call(r,s);l||(s=pt(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&Ri(r,"delete",s,void 0),c},clear(){const s=pt(this),r=s.size!==0,o=s.clear();return r&&Ri(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=sg(s,n,e)}),t}function dh(n,e){const t=rg(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ht(t,s)&&s in i?t:i,s,r)}const og={get:dh(!1,!1)},ag={get:dh(!1,!0)},lg={get:dh(!0,!1)};const Ff=new WeakMap,Uf=new WeakMap,Of=new WeakMap,cg=new WeakMap;function hg(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ug(n){return n.__v_skip||!Object.isExtensible(n)?0:hg(Nm(n))}function Ha(n){return rs(n)?n:fh(n,!1,tg,og,Ff)}function dg(n){return fh(n,!1,ig,ag,Uf)}function rc(n){return fh(n,!0,ng,lg,Of)}function fh(n,e,t,i,s){if(!ut(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=ug(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:t);return s.set(n,a),a}function Ls(n){return rs(n)?Ls(n.__v_raw):!!(n&&n.__v_isReactive)}function rs(n){return!!(n&&n.__v_isReadonly)}function kn(n){return!!(n&&n.__v_isShallow)}function ph(n){return n?!!n.__v_raw:!1}function pt(n){const e=n&&n.__v_raw;return e?pt(e):n}function Be(n){return!ht(n,"__v_skip")&&Object.isExtensible(n)&&xf(n,"__v_skip",!0),n}const Bi=n=>ut(n)?Ha(n):n,_r=n=>ut(n)?rc(n):n;function cn(n){return n?n.__v_isRef===!0:!1}function fg(n){return cn(n)?n.value:n}const pg={get:(n,e,t)=>e==="__v_raw"?n:fg(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return cn(s)&&!cn(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function Bf(n){return Ls(n)?n:new Proxy(n,pg)}class mg{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new Pf(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Zr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&Et!==this)return wf(this,!0),!0}get value(){const e=this.dep.track();return Cf(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function gg(n,e,t=!1){let i,s;return Ke(n)?i=n:(i=n.get,s=n.set),new mg(i,s,t)}const Eo={},ma=new WeakMap;let ys;function _g(n,e=!1,t=ys){if(t){let i=ma.get(t);i||ma.set(t,i=[]),i.push(n)}}function vg(n,e,t=Mt){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=t,c=M=>s?M:kn(M)||s===!1||s===0?Pi(M,1):Pi(M);let h,d,u,f,g=!1,v=!1;if(cn(n)?(d=()=>n.value,g=kn(n)):Ls(n)?(d=()=>c(n),g=!0):ke(n)?(v=!0,g=n.some(M=>Ls(M)||kn(M)),d=()=>n.map(M=>{if(cn(M))return M.value;if(Ls(M))return c(M);if(Ke(M))return l?l(M,2):M()})):Ke(n)?e?d=l?()=>l(n,2):n:d=()=>{if(u){Ui();try{u()}finally{Oi()}}const M=ys;ys=h;try{return l?l(n,3,[f]):n(f)}finally{ys=M}}:d=ri,e&&s){const M=d,A=s===!0?1/0:s;d=()=>Pi(M(),A)}const m=Ym(),p=()=>{h.stop(),m&&m.active&&ah(m.effects,h)};if(r&&e){const M=e;e=(...A)=>{M(...A),p()}}let _=v?new Array(n.length).fill(Eo):Eo;const E=M=>{if(!(!(h.flags&1)||!h.dirty&&!M))if(e){const A=h.run();if(s||g||(v?A.some((C,R)=>Ps(C,_[R])):Ps(A,_))){u&&u();const C=ys;ys=h;try{const R=[A,_===Eo?void 0:v&&_[0]===Eo?[]:_,f];_=A,l?l(e,3,R):e(...R)}finally{ys=C}}}else h.run()};return a&&a(E),h=new Ef(d),h.scheduler=o?()=>o(E,!1):E,f=M=>_g(M,!1,h),u=h.onStop=()=>{const M=ma.get(h);if(M){if(l)l(M,4);else for(const A of M)A();ma.delete(h)}},e?i?E(!0):_=h.run():o?o(E.bind(null,!0),!0):h.run(),p.pause=h.pause.bind(h),p.resume=h.resume.bind(h),p.stop=p,p}function Pi(n,e=1/0,t){if(e<=0||!ut(n)||n.__v_skip||(t=t||new Map,(t.get(n)||0)>=e))return n;if(t.set(n,e),e--,cn(n))Pi(n.value,e,t);else if(ke(n))for(let i=0;i<n.length;i++)Pi(n[i],e,t);else if(La(n)||cr(n))n.forEach(i=>{Pi(i,e,t)});else if(vf(n)){for(const i in n)Pi(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&Pi(n[i],e,t)}return n}function uo(n,e,t,i){try{return i?n(...i):n()}catch(s){Va(s,e,t)}}function Xn(n,e,t,i){if(Ke(n)){const s=uo(n,e,t,i);return s&&gf(s)&&s.catch(r=>{Va(r,e,t)}),s}if(ke(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Xn(n[r],e,t,i));return s}}function Va(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Mt;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const h=a.ec;if(h){for(let d=0;d<h.length;d++)if(h[d](n,l,c)===!1)return}a=a.parent}if(r){Ui(),uo(r,null,10,[n,l,c]),Oi();return}}xg(n,t,s,i,o)}function xg(n,e,t,i=!0,s=!1){if(s)throw n;console.error(n)}const an=[];let ei=-1;const hr=[];let Qi=null,sr=0;const zf=Promise.resolve();let ga=null;function Hf(n){const e=ga||zf;return n?e.then(this?n.bind(this):n):e}function yg(n){let e=ei+1,t=an.length;for(;e<t;){const i=e+t>>>1,s=an[i],r=Qr(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function mh(n){if(!(n.flags&1)){const e=Qr(n),t=an[an.length-1];!t||!(n.flags&2)&&e>=Qr(t)?an.push(n):an.splice(yg(e),0,n),n.flags|=1,Vf()}}function Vf(){ga||(ga=zf.then(kf))}function Mg(n){ke(n)?hr.push(...n):Qi&&n.id===-1?Qi.splice(sr+1,0,n):n.flags&1||(hr.push(n),n.flags|=1),Vf()}function eu(n,e,t=ei+1){for(;t<an.length;t++){const i=an[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;an.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function Gf(n){if(hr.length){const e=[...new Set(hr)].sort((t,i)=>Qr(t)-Qr(i));if(hr.length=0,Qi){Qi.push(...e);return}for(Qi=e,sr=0;sr<Qi.length;sr++){const t=Qi[sr];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Qi=null,sr=0}}const Qr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function kf(n){try{for(ei=0;ei<an.length;ei++){const e=an[ei];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),uo(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ei<an.length;ei++){const e=an[ei];e&&(e.flags&=-2)}ei=-1,an.length=0,Gf(),ga=null,(an.length||hr.length)&&kf()}}let wn=null,Wf=null;function _a(n){const e=wn;return wn=n,Wf=n&&n.type.__scopeId||null,e}function gh(n,e=wn,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&Ma(-1);const r=_a(e);let o;try{o=n(...s)}finally{_a(r),i._d&&Ma(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function _h(n,e){if(wn===null)return n;const t=qa(wn),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[r,o,a,l=Mt]=e[s];r&&(Ke(r)&&(r={mounted:r,updated:r}),r.deep&&Pi(o),i.push({dir:r,instance:t,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function cs(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(Ui(),Xn(l,t,8,[n.el,a,n,e]),Oi())}}function Sg(n,e){if(Qt){let t=Qt.provides;const i=Qt.parent&&Qt.parent.provides;i===t&&(t=Qt.provides=Object.create(i)),t[n]=e}}function ia(n,e,t=!1){const i=bp();if(i||dr){let s=dr?dr._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&Ke(e)?e.call(i&&i.proxy):e}}const Eg=Symbol.for("v-scx"),bg=()=>ia(Eg);function ll(n,e,t){return Xf(n,e,t)}function Xf(n,e,t=Mt){const{immediate:i,deep:s,flush:r,once:o}=t,a=kt({},t),l=e&&i||!e&&r!=="post";let c;if(no){if(r==="sync"){const f=bg();c=f.__watcherHandles||(f.__watcherHandles=[])}else if(!l){const f=()=>{};return f.stop=ri,f.resume=ri,f.pause=ri,f}}const h=Qt;a.call=(f,g,v)=>Xn(f,h,g,v);let d=!1;r==="post"?a.scheduler=f=>{pn(f,h&&h.suspense)}:r!=="sync"&&(d=!0,a.scheduler=(f,g)=>{g?f():mh(f)}),a.augmentJob=f=>{e&&(f.flags|=4),d&&(f.flags|=2,h&&(f.id=h.uid,f.i=h))};const u=vg(n,e,a);return no&&(c?c.push(u):l&&u()),u}function wg(n,e,t){const i=this.proxy,s=Pt(n)?n.includes(".")?qf(i,n):()=>i[n]:n.bind(i,i);let r;Ke(e)?r=e:(r=e.handler,t=e);const o=fo(this),a=Xf(s,r.bind(i),t);return o(),a}function qf(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const Tg=Symbol("_vte"),Yf=n=>n.__isTeleport,ti=Symbol("_leaveCb"),wr=Symbol("_enterCb");function Ag(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return tp(()=>{n.isMounted=!0}),np(()=>{n.isUnmounting=!0}),n}const Cn=[Function,Array],jf={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Cn,onEnter:Cn,onAfterEnter:Cn,onEnterCancelled:Cn,onBeforeLeave:Cn,onLeave:Cn,onAfterLeave:Cn,onLeaveCancelled:Cn,onBeforeAppear:Cn,onAppear:Cn,onAfterAppear:Cn,onAppearCancelled:Cn},$f=n=>{const e=n.subTree;return e.component?$f(e.component):e},Cg={name:"BaseTransition",props:jf,setup(n,{slots:e}){const t=bp(),i=Ag();return()=>{const s=e.default&&Jf(e.default(),!0);if(!s||!s.length)return;const r=Kf(s),o=pt(n),{mode:a}=o;if(i.isLeaving)return cl(r);const l=tu(r);if(!l)return cl(r);let c=oc(l,o,i,t,d=>c=d);l.type!==ln&&eo(l,c);let h=t.subTree&&tu(t.subTree);if(h&&h.type!==ln&&!Ms(h,l)&&$f(t).type!==ln){let d=oc(h,o,i,t);if(eo(h,d),a==="out-in"&&l.type!==ln)return i.isLeaving=!0,d.afterLeave=()=>{i.isLeaving=!1,t.job.flags&8||t.update(),delete d.afterLeave,h=void 0},cl(r);a==="in-out"&&l.type!==ln?d.delayLeave=(u,f,g)=>{const v=Zf(i,h);v[String(h.key)]=h,u[ti]=()=>{f(),u[ti]=void 0,delete c.delayedLeave,h=void 0},c.delayedLeave=()=>{g(),delete c.delayedLeave,h=void 0}}:h=void 0}else h&&(h=void 0);return r}}};function Kf(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==ln){e=t;break}}return e}const Rg=Cg;function Zf(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function oc(n,e,t,i,s){const{appear:r,mode:o,persisted:a=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:h,onEnterCancelled:d,onBeforeLeave:u,onLeave:f,onAfterLeave:g,onLeaveCancelled:v,onBeforeAppear:m,onAppear:p,onAfterAppear:_,onAppearCancelled:E}=e,M=String(n.key),A=Zf(t,n),C=(b,H)=>{b&&Xn(b,i,9,H)},R=(b,H)=>{const D=H[1];C(b,H),ke(b)?b.every(L=>L.length<=1)&&D():b.length<=1&&D()},y={mode:o,persisted:a,beforeEnter(b){let H=l;if(!t.isMounted)if(r)H=m||l;else return;b[ti]&&b[ti](!0);const D=A[M];D&&Ms(n,D)&&D.el[ti]&&D.el[ti](),C(H,[b])},enter(b){if(A[M]===n)return;let H=c,D=h,L=d;if(!t.isMounted)if(r)H=p||c,D=_||h,L=E||d;else return;let I=!1;b[wr]=U=>{I||(I=!0,U?C(L,[b]):C(D,[b]),y.delayedLeave&&y.delayedLeave(),b[wr]=void 0)};const B=b[wr].bind(null,!1);H?R(H,[b,B]):B()},leave(b,H){const D=String(n.key);if(b[wr]&&b[wr](!0),t.isUnmounting)return H();C(u,[b]);let L=!1;b[ti]=B=>{L||(L=!0,H(),B?C(v,[b]):C(g,[b]),b[ti]=void 0,A[D]===n&&delete A[D])};const I=b[ti].bind(null,!1);A[D]=n,f?R(f,[b,I]):I()},clone(b){const H=oc(b,e,t,i,s);return s&&s(H),H}};return y}function cl(n){if(Ga(n))return n=os(n),n.children=null,n}function tu(n){if(!Ga(n))return Yf(n.type)&&n.children?Kf(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&Ke(t.default))return t.default()}}function eo(n,e){n.shapeFlag&6&&n.component?(n.transition=e,eo(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function Jf(n,e=!1,t){let i=[],s=0;for(let r=0;r<n.length;r++){let o=n[r];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:r);o.type===_n?(o.patchFlag&128&&s++,i=i.concat(Jf(o.children,e,a))):(e||o.type!==ln)&&i.push(a!=null?os(o,{key:a}):o)}if(s>1)for(let r=0;r<i.length;r++)i[r].patchFlag=-2;return i}function Qf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function nu(n,e){let t;return!!((t=Object.getOwnPropertyDescriptor(n,e))&&!t.configurable)}const va=new WeakMap;function qr(n,e,t,i,s=!1){if(ke(n)){n.forEach((v,m)=>qr(v,e&&(ke(e)?e[m]:e),t,i,s));return}if(Yr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&qr(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?qa(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=e&&e.r,h=a.refs===Mt?a.refs={}:a.refs,d=a.setupState,u=pt(d),f=d===Mt?mf:v=>nu(h,v)?!1:ht(u,v),g=(v,m)=>!(m&&nu(h,m));if(c!=null&&c!==l){if(iu(e),Pt(c))h[c]=null,f(c)&&(d[c]=null);else if(cn(c)){const v=e;g(c,v.k)&&(c.value=null),v.k&&(h[v.k]=null)}}if(Ke(l))uo(l,a,12,[o,h]);else{const v=Pt(l),m=cn(l);if(v||m){const p=()=>{if(n.f){const _=v?f(l)?d[l]:h[l]:g()||!n.k?l.value:h[n.k];if(s)ke(_)&&ah(_,r);else if(ke(_))_.includes(r)||_.push(r);else if(v)h[l]=[r],f(l)&&(d[l]=h[l]);else{const E=[r];g(l,n.k)&&(l.value=E),n.k&&(h[n.k]=E)}}else v?(h[l]=o,f(l)&&(d[l]=o)):m&&(g(l,n.k)&&(l.value=o),n.k&&(h[n.k]=o))};if(o){const _=()=>{p(),va.delete(n)};_.id=-1,va.set(n,_),pn(_,t)}else iu(n),p()}}}function iu(n){const e=va.get(n);e&&(e.flags|=8,va.delete(n))}Oa().requestIdleCallback;Oa().cancelIdleCallback;const Yr=n=>!!n.type.__asyncLoader,Ga=n=>n.type.__isKeepAlive;function Pg(n,e){ep(n,"a",e)}function Dg(n,e){ep(n,"da",e)}function ep(n,e,t=Qt){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(ka(e,i,t),t){let s=t.parent;for(;s&&s.parent;)Ga(s.parent.vnode)&&Ig(i,e,t,s),s=s.parent}}function Ig(n,e,t,i){const s=ka(e,n,i,!0);ip(()=>{ah(i[e],s)},t)}function ka(n,e,t=Qt,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{Ui();const a=fo(t),l=Xn(e,t,n,o);return a(),Oi(),l});return i?s.unshift(r):s.push(r),r}}const Vi=n=>(e,t=Qt)=>{(!no||n==="sp")&&ka(n,(...i)=>e(...i),t)},Lg=Vi("bm"),tp=Vi("m"),Ng=Vi("bu"),Fg=Vi("u"),np=Vi("bum"),ip=Vi("um"),Ug=Vi("sp"),Og=Vi("rtg"),Bg=Vi("rtc");function zg(n,e=Qt){ka("ec",n,e)}const Hg="components";function ur(n,e){return Gg(Hg,n,!0,e)||n}const Vg=Symbol.for("v-ndc");function Gg(n,e,t=!0,i=!1){const s=wn||Qt;if(s){const r=s.type;{const a=A0(r,!1);if(a&&(a===e||a===In(e)||a===Fa(In(e))))return r}const o=su(s[n]||r[n],e)||su(s.appContext[n],e);return!o&&i?r:o}}function su(n,e){return n&&(n[e]||n[In(e)]||n[Fa(In(e))])}function xa(n,e,t,i){let s;const r=t,o=ke(n);if(o||Pt(n)){const a=o&&Ls(n);let l=!1,c=!1;a&&(l=!kn(n),c=rs(n),n=za(n)),s=new Array(n.length);for(let h=0,d=n.length;h<d;h++)s[h]=e(l?c?_r(Bi(n[h])):Bi(n[h]):n[h],h,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=e(a+1,a,void 0,r)}else if(ut(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>e(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const h=a[l];s[l]=e(n[h],h,l,r)}}else s=[];return s}const ac=n=>n?wp(n)?qa(n):ac(n.parent):null,jr=kt(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>ac(n.parent),$root:n=>ac(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>rp(n),$forceUpdate:n=>n.f||(n.f=()=>{mh(n.update)}),$nextTick:n=>n.n||(n.n=Hf.bind(n.proxy)),$watch:n=>wg.bind(n)}),hl=(n,e)=>n!==Mt&&!n.__isScriptSetup&&ht(n,e),kg={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;if(e[0]!=="$"){const u=o[e];if(u!==void 0)switch(u){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(hl(i,e))return o[e]=1,i[e];if(s!==Mt&&ht(s,e))return o[e]=2,s[e];if(ht(r,e))return o[e]=3,r[e];if(t!==Mt&&ht(t,e))return o[e]=4,t[e];lc&&(o[e]=0)}}const c=jr[e];let h,d;if(c)return e==="$attrs"&&Jt(n.attrs,"get",""),c(n);if((h=a.__cssModules)&&(h=h[e]))return h;if(t!==Mt&&ht(t,e))return o[e]=4,t[e];if(d=l.config.globalProperties,ht(d,e))return d[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return hl(s,e)?(s[e]=t,!0):i!==Mt&&ht(i,e)?(i[e]=t,!0):ht(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,props:r,type:o}},a){let l;return!!(t[a]||n!==Mt&&a[0]!=="$"&&ht(n,a)||hl(e,a)||ht(r,a)||ht(i,a)||ht(jr,a)||ht(s.config.globalProperties,a)||(l=o.__cssModules)&&l[a])},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:ht(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function ru(n){return ke(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let lc=!0;function Wg(n){const e=rp(n),t=n.proxy,i=n.ctx;lc=!1,e.beforeCreate&&ou(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:h,beforeMount:d,mounted:u,beforeUpdate:f,updated:g,activated:v,deactivated:m,beforeDestroy:p,beforeUnmount:_,destroyed:E,unmounted:M,render:A,renderTracked:C,renderTriggered:R,errorCaptured:y,serverPrefetch:b,expose:H,inheritAttrs:D,components:L,directives:I,filters:B}=e;if(c&&Xg(c,i,null),o)for(const V in o){const q=o[V];Ke(q)&&(i[V]=q.bind(t))}if(s){const V=s.call(t,t);ut(V)&&(n.data=Ha(V))}if(lc=!0,r)for(const V in r){const q=r[V],Q=Ke(q)?q.bind(t,t):Ke(q.get)?q.get.bind(t,t):ri,me=!Ke(q)&&Ke(q.set)?q.set.bind(t):ri,_e=R0({get:Q,set:me});Object.defineProperty(i,V,{enumerable:!0,configurable:!0,get:()=>_e.value,set:ie=>_e.value=ie})}if(a)for(const V in a)sp(a[V],i,t,V);if(l){const V=Ke(l)?l.call(t):l;Reflect.ownKeys(V).forEach(q=>{Sg(q,V[q])})}h&&ou(h,n,"c");function N(V,q){ke(q)?q.forEach(Q=>V(Q.bind(t))):q&&V(q.bind(t))}if(N(Lg,d),N(tp,u),N(Ng,f),N(Fg,g),N(Pg,v),N(Dg,m),N(zg,y),N(Bg,C),N(Og,R),N(np,_),N(ip,M),N(Ug,b),ke(H))if(H.length){const V=n.exposed||(n.exposed={});H.forEach(q=>{Object.defineProperty(V,q,{get:()=>t[q],set:Q=>t[q]=Q,enumerable:!0})})}else n.exposed||(n.exposed={});A&&n.render===ri&&(n.render=A),D!=null&&(n.inheritAttrs=D),L&&(n.components=L),I&&(n.directives=I),b&&Qf(n)}function Xg(n,e,t=ri){ke(n)&&(n=cc(n));for(const i in n){const s=n[i];let r;ut(s)?"default"in s?r=ia(s.from||i,s.default,!0):r=ia(s.from||i):r=ia(s),cn(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[i]=r}}function ou(n,e,t){Xn(ke(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function sp(n,e,t,i){let s=i.includes(".")?qf(t,i):()=>t[i];if(Pt(n)){const r=e[n];Ke(r)&&ll(s,r)}else if(Ke(n))ll(s,n.bind(t));else if(ut(n))if(ke(n))n.forEach(r=>sp(r,e,t,i));else{const r=Ke(n.handler)?n.handler.bind(t):e[n.handler];Ke(r)&&ll(s,r,n)}}function rp(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(e);let l;return a?l=a:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>ya(l,c,o,!0)),ya(l,e,o)),ut(e)&&r.set(e,l),l}function ya(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&ya(n,r,t,!0),s&&s.forEach(o=>ya(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=qg[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const qg={data:au,props:lu,emits:lu,methods:Hr,computed:Hr,beforeCreate:sn,created:sn,beforeMount:sn,mounted:sn,beforeUpdate:sn,updated:sn,beforeDestroy:sn,beforeUnmount:sn,destroyed:sn,unmounted:sn,activated:sn,deactivated:sn,errorCaptured:sn,serverPrefetch:sn,components:Hr,directives:Hr,watch:jg,provide:au,inject:Yg};function au(n,e){return e?n?function(){return kt(Ke(n)?n.call(this,this):n,Ke(e)?e.call(this,this):e)}:e:n}function Yg(n,e){return Hr(cc(n),cc(e))}function cc(n){if(ke(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function sn(n,e){return n?[...new Set([].concat(n,e))]:e}function Hr(n,e){return n?kt(Object.create(null),n,e):e}function lu(n,e){return n?ke(n)&&ke(e)?[...new Set([...n,...e])]:kt(Object.create(null),ru(n),ru(e??{})):e}function jg(n,e){if(!n)return e;if(!e)return n;const t=kt(Object.create(null),n);for(const i in e)t[i]=sn(n[i],e[i]);return t}function op(){return{app:null,config:{isNativeTag:mf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let $g=0;function Kg(n,e){return function(i,s=null){Ke(i)||(i=kt({},i)),s!=null&&!ut(s)&&(s=null);const r=op(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:$g++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:D0,get config(){return r.config},set config(h){},use(h,...d){return o.has(h)||(h&&Ke(h.install)?(o.add(h),h.install(c,...d)):Ke(h)&&(o.add(h),h(c,...d))),c},mixin(h){return r.mixins.includes(h)||r.mixins.push(h),c},component(h,d){return d?(r.components[h]=d,c):r.components[h]},directive(h,d){return d?(r.directives[h]=d,c):r.directives[h]},mount(h,d,u){if(!l){const f=c._ceVNode||Rt(i,s);return f.appContext=r,u===!0?u="svg":u===!1&&(u=void 0),n(f,h,u),l=!0,c._container=h,h.__vue_app__=c,qa(f.component)}},onUnmount(h){a.push(h)},unmount(){l&&(Xn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(h,d){return r.provides[h]=d,c},runWithContext(h){const d=dr;dr=c;try{return h()}finally{dr=d}}};return c}}let dr=null;const Zg=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${In(e)}Modifiers`]||n[`${Fs(e)}Modifiers`];function Jg(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||Mt;let s=t;const r=e.startsWith("update:"),o=r&&Zg(i,e.slice(7));o&&(o.trim&&(s=t.map(h=>Pt(h)?h.trim():h)),o.number&&(s=t.map(Ua)));let a,l=i[a=il(e)]||i[a=il(In(e))];!l&&r&&(l=i[a=il(Fs(e))]),l&&Xn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Xn(c,n,6,s)}}const Qg=new WeakMap;function ap(n,e,t=!1){const i=t?Qg:e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Ke(n)){const l=c=>{const h=ap(c,e,!0);h&&(a=!0,kt(o,h))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(ut(n)&&i.set(n,null),null):(ke(r)?r.forEach(l=>o[l]=null):kt(o,r),ut(n)&&i.set(n,o),o)}function Wa(n,e){return!n||!Ia(e)?!1:(e=e.slice(2).replace(/Once$/,""),ht(n,e[0].toLowerCase()+e.slice(1))||ht(n,Fs(e))||ht(n,e))}function cu(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:h,props:d,data:u,setupState:f,ctx:g,inheritAttrs:v}=n,m=_a(n);let p,_;try{if(t.shapeFlag&4){const M=s||i,A=M;p=ni(c.call(A,M,h,d,f,u,g)),_=a}else{const M=e;p=ni(M.length>1?M(d,{attrs:a,slots:o,emit:l}):M(d,null)),_=e.props?a:e0(a)}}catch(M){$r.length=0,Va(M,n,1),p=Rt(ln)}let E=p;if(_&&v!==!1){const M=Object.keys(_),{shapeFlag:A}=E;M.length&&A&7&&(r&&M.some(oh)&&(_=t0(_,r)),E=os(E,_,!1,!0))}return t.dirs&&(E=os(E,null,!1,!0),E.dirs=E.dirs?E.dirs.concat(t.dirs):t.dirs),t.transition&&eo(E,t.transition),p=E,_a(m),p}const e0=n=>{let e;for(const t in n)(t==="class"||t==="style"||Ia(t))&&((e||(e={}))[t]=n[t]);return e},t0=(n,e)=>{const t={};for(const i in n)(!oh(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function n0(n,e,t){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?hu(i,o,c):!!o;if(l&8){const h=e.dynamicProps;for(let d=0;d<h.length;d++){const u=h[d];if(lp(o,i,u)&&!Wa(c,u))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?hu(i,o,c):!0:!!o;return!1}function hu(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(lp(e,n,r)&&!Wa(t,r))return!0}return!1}function lp(n,e,t){const i=n[t],s=e[t];return t==="style"&&ut(i)&&ut(s)?!ho(i,s):i!==s}function i0({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const cp={},hp=()=>Object.create(cp),up=n=>Object.getPrototypeOf(n)===cp;function s0(n,e,t,i=!1){const s={},r=hp();n.propsDefaults=Object.create(null),dp(n,e,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);t?n.props=i?s:dg(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function r0(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=pt(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const h=n.vnode.dynamicProps;for(let d=0;d<h.length;d++){let u=h[d];if(Wa(n.emitsOptions,u))continue;const f=e[u];if(l)if(ht(r,u))f!==r[u]&&(r[u]=f,c=!0);else{const g=In(u);s[g]=hc(l,a,g,f,n,!1)}else f!==r[u]&&(r[u]=f,c=!0)}}}else{dp(n,e,s,r)&&(c=!0);let h;for(const d in a)(!e||!ht(e,d)&&((h=Fs(d))===d||!ht(e,h)))&&(l?t&&(t[d]!==void 0||t[h]!==void 0)&&(s[d]=hc(l,a,d,void 0,n,!0)):delete s[d]);if(r!==a)for(const d in r)(!e||!ht(e,d))&&(delete r[d],c=!0)}c&&Ri(n.attrs,"set","")}function dp(n,e,t,i){const[s,r]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(kr(l))continue;const c=e[l];let h;s&&ht(s,h=In(l))?!r||!r.includes(h)?t[h]=c:(a||(a={}))[h]=c:Wa(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=pt(t),c=a||Mt;for(let h=0;h<r.length;h++){const d=r[h];t[d]=hc(s,l,d,c[d],n,!ht(c,d))}}return o}function hc(n,e,t,i,s,r){const o=n[t];if(o!=null){const a=ht(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Ke(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const h=fo(s);i=c[t]=l.call(null,e),h()}}else i=l;s.ce&&s.ce._setProp(t,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===Fs(t))&&(i=!0))}return i}const o0=new WeakMap;function fp(n,e,t=!1){const i=t?o0:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Ke(n)){const h=d=>{l=!0;const[u,f]=fp(d,e,!0);kt(o,u),f&&a.push(...f)};!t&&e.mixins.length&&e.mixins.forEach(h),n.extends&&h(n.extends),n.mixins&&n.mixins.forEach(h)}if(!r&&!l)return ut(n)&&i.set(n,lr),lr;if(ke(r))for(let h=0;h<r.length;h++){const d=In(r[h]);uu(d)&&(o[d]=Mt)}else if(r)for(const h in r){const d=In(h);if(uu(d)){const u=r[h],f=o[d]=ke(u)||Ke(u)?{type:u}:kt({},u),g=f.type;let v=!1,m=!0;if(ke(g))for(let p=0;p<g.length;++p){const _=g[p],E=Ke(_)&&_.name;if(E==="Boolean"){v=!0;break}else E==="String"&&(m=!1)}else v=Ke(g)&&g.name==="Boolean";f[0]=v,f[1]=m,(v||ht(f,"default"))&&a.push(d)}}const c=[o,a];return ut(n)&&i.set(n,c),c}function uu(n){return n[0]!=="$"&&!kr(n)}const vh=n=>n==="_"||n==="_ctx"||n==="$stable",xh=n=>ke(n)?n.map(ni):[ni(n)],a0=(n,e,t)=>{if(e._n)return e;const i=gh((...s)=>xh(e(...s)),t);return i._c=!1,i},pp=(n,e,t)=>{const i=n._ctx;for(const s in n){if(vh(s))continue;const r=n[s];if(Ke(r))e[s]=a0(s,r,i);else if(r!=null){const o=xh(r);e[s]=()=>o}}},mp=(n,e)=>{const t=xh(e);n.slots.default=()=>t},gp=(n,e,t)=>{for(const i in e)(t||!vh(i))&&(n[i]=e[i])},l0=(n,e,t)=>{const i=n.slots=hp();if(n.vnode.shapeFlag&32){const s=e._;s?(gp(i,e,t),t&&xf(i,"_",s,!0)):pp(e,i)}else e&&mp(n,e)},c0=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,o=Mt;if(i.shapeFlag&32){const a=e._;a?t&&a===1?r=!1:gp(s,e,t):(r=!e.$stable,pp(e,s)),o=e}else e&&(mp(n,e),o={default:1});if(r)for(const a in s)!vh(a)&&o[a]==null&&delete s[a]},pn=p0;function h0(n){return u0(n)}function u0(n,e){const t=Oa();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:h,parentNode:d,nextSibling:u,setScopeId:f=ri,insertStaticContent:g}=n,v=(F,z,X,oe=null,Z=null,ae=null,P=void 0,he=null,le=!!z.dynamicChildren)=>{if(F===z)return;F&&!Ms(F,z)&&(oe=pe(F),ie(F,Z,ae,!0),F=null),z.patchFlag===-2&&(le=!1,z.dynamicChildren=null);const{type:re,ref:ce,shapeFlag:w}=z;switch(re){case Xa:m(F,z,X,oe);break;case ln:p(F,z,X,oe);break;case sa:F==null&&_(z,X,oe,P);break;case _n:L(F,z,X,oe,Z,ae,P,he,le);break;default:w&1?A(F,z,X,oe,Z,ae,P,he,le):w&6?I(F,z,X,oe,Z,ae,P,he,le):(w&64||w&128)&&re.process(F,z,X,oe,Z,ae,P,he,le,Ve)}ce!=null&&Z?qr(ce,F&&F.ref,ae,z||F,!z):ce==null&&F&&F.ref!=null&&qr(F.ref,null,ae,F,!0)},m=(F,z,X,oe)=>{if(F==null)i(z.el=a(z.children),X,oe);else{const Z=z.el=F.el;z.children!==F.children&&c(Z,z.children)}},p=(F,z,X,oe)=>{F==null?i(z.el=l(z.children||""),X,oe):z.el=F.el},_=(F,z,X,oe)=>{[F.el,F.anchor]=g(F.children,z,X,oe,F.el,F.anchor)},E=({el:F,anchor:z},X,oe)=>{let Z;for(;F&&F!==z;)Z=u(F),i(F,X,oe),F=Z;i(z,X,oe)},M=({el:F,anchor:z})=>{let X;for(;F&&F!==z;)X=u(F),s(F),F=X;s(z)},A=(F,z,X,oe,Z,ae,P,he,le)=>{if(z.type==="svg"?P="svg":z.type==="math"&&(P="mathml"),F==null)C(z,X,oe,Z,ae,P,he,le);else{const re=F.el&&F.el._isVueCE?F.el:null;try{re&&re._beginPatch(),b(F,z,Z,ae,P,he,le)}finally{re&&re._endPatch()}}},C=(F,z,X,oe,Z,ae,P,he)=>{let le,re;const{props:ce,shapeFlag:w,transition:x,dirs:O}=F;if(le=F.el=o(F.type,ae,ce&&ce.is,ce),w&8?h(le,F.children):w&16&&y(F.children,le,null,oe,Z,ul(F,ae),P,he),O&&cs(F,null,oe,"created"),R(le,F,F.scopeId,P,oe),ce){for(const ee in ce)ee!=="value"&&!kr(ee)&&r(le,ee,null,ce[ee],ae,oe);"value"in ce&&r(le,"value",null,ce.value,ae),(re=ce.onVnodeBeforeMount)&&jn(re,oe,F)}O&&cs(F,null,oe,"beforeMount");const Y=d0(Z,x);Y&&x.beforeEnter(le),i(le,z,X),((re=ce&&ce.onVnodeMounted)||Y||O)&&pn(()=>{re&&jn(re,oe,F),Y&&x.enter(le),O&&cs(F,null,oe,"mounted")},Z)},R=(F,z,X,oe,Z)=>{if(X&&f(F,X),oe)for(let ae=0;ae<oe.length;ae++)f(F,oe[ae]);if(Z){let ae=Z.subTree;if(z===ae||yp(ae.type)&&(ae.ssContent===z||ae.ssFallback===z)){const P=Z.vnode;R(F,P,P.scopeId,P.slotScopeIds,Z.parent)}}},y=(F,z,X,oe,Z,ae,P,he,le=0)=>{for(let re=le;re<F.length;re++){const ce=F[re]=he?Ci(F[re]):ni(F[re]);v(null,ce,z,X,oe,Z,ae,P,he)}},b=(F,z,X,oe,Z,ae,P)=>{const he=z.el=F.el;let{patchFlag:le,dynamicChildren:re,dirs:ce}=z;le|=F.patchFlag&16;const w=F.props||Mt,x=z.props||Mt;let O;if(X&&hs(X,!1),(O=x.onVnodeBeforeUpdate)&&jn(O,X,z,F),ce&&cs(z,F,X,"beforeUpdate"),X&&hs(X,!0),(w.innerHTML&&x.innerHTML==null||w.textContent&&x.textContent==null)&&h(he,""),re?H(F.dynamicChildren,re,he,X,oe,ul(z,Z),ae):P||q(F,z,he,null,X,oe,ul(z,Z),ae,!1),le>0){if(le&16)D(he,w,x,X,Z);else if(le&2&&w.class!==x.class&&r(he,"class",null,x.class,Z),le&4&&r(he,"style",w.style,x.style,Z),le&8){const Y=z.dynamicProps;for(let ee=0;ee<Y.length;ee++){const j=Y[ee],Me=w[j],de=x[j];(de!==Me||j==="value")&&r(he,j,Me,de,Z,X)}}le&1&&F.children!==z.children&&h(he,z.children)}else!P&&re==null&&D(he,w,x,X,Z);((O=x.onVnodeUpdated)||ce)&&pn(()=>{O&&jn(O,X,z,F),ce&&cs(z,F,X,"updated")},oe)},H=(F,z,X,oe,Z,ae,P)=>{for(let he=0;he<z.length;he++){const le=F[he],re=z[he],ce=le.el&&(le.type===_n||!Ms(le,re)||le.shapeFlag&198)?d(le.el):X;v(le,re,ce,null,oe,Z,ae,P,!0)}},D=(F,z,X,oe,Z)=>{if(z!==X){if(z!==Mt)for(const ae in z)!kr(ae)&&!(ae in X)&&r(F,ae,z[ae],null,Z,oe);for(const ae in X){if(kr(ae))continue;const P=X[ae],he=z[ae];P!==he&&ae!=="value"&&r(F,ae,he,P,Z,oe)}"value"in X&&r(F,"value",z.value,X.value,Z)}},L=(F,z,X,oe,Z,ae,P,he,le)=>{const re=z.el=F?F.el:a(""),ce=z.anchor=F?F.anchor:a("");let{patchFlag:w,dynamicChildren:x,slotScopeIds:O}=z;O&&(he=he?he.concat(O):O),F==null?(i(re,X,oe),i(ce,X,oe),y(z.children||[],X,ce,Z,ae,P,he,le)):w>0&&w&64&&x&&F.dynamicChildren&&F.dynamicChildren.length===x.length?(H(F.dynamicChildren,x,X,Z,ae,P,he),(z.key!=null||Z&&z===Z.subTree)&&_p(F,z,!0)):q(F,z,X,ce,Z,ae,P,he,le)},I=(F,z,X,oe,Z,ae,P,he,le)=>{z.slotScopeIds=he,F==null?z.shapeFlag&512?Z.ctx.activate(z,X,oe,P,le):B(z,X,oe,Z,ae,P,le):U(F,z,le)},B=(F,z,X,oe,Z,ae,P)=>{const he=F.component=S0(F,oe,Z);if(Ga(F)&&(he.ctx.renderer=Ve),E0(he,!1,P),he.asyncDep){if(Z&&Z.registerDep(he,N,P),!F.el){const le=he.subTree=Rt(ln);p(null,le,z,X),F.placeholder=le.el}}else N(he,F,z,X,Z,ae,P)},U=(F,z,X)=>{const oe=z.component=F.component;if(n0(F,z,X))if(oe.asyncDep&&!oe.asyncResolved){V(oe,z,X);return}else oe.next=z,oe.update();else z.el=F.el,oe.vnode=z},N=(F,z,X,oe,Z,ae,P)=>{const he=()=>{if(F.isMounted){let{next:w,bu:x,u:O,parent:Y,vnode:ee}=F;{const Ue=vp(F);if(Ue){w&&(w.el=ee.el,V(F,w,P)),Ue.asyncDep.then(()=>{pn(()=>{F.isUnmounted||re()},Z)});return}}let j=w,Me;hs(F,!1),w?(w.el=ee.el,V(F,w,P)):w=ee,x&&na(x),(Me=w.props&&w.props.onVnodeBeforeUpdate)&&jn(Me,Y,w,ee),hs(F,!0);const de=cu(F),De=F.subTree;F.subTree=de,v(De,de,d(De.el),pe(De),F,Z,ae),w.el=de.el,j===null&&i0(F,de.el),O&&pn(O,Z),(Me=w.props&&w.props.onVnodeUpdated)&&pn(()=>jn(Me,Y,w,ee),Z)}else{let w;const{el:x,props:O}=z,{bm:Y,m:ee,parent:j,root:Me,type:de}=F,De=Yr(z);hs(F,!1),Y&&na(Y),!De&&(w=O&&O.onVnodeBeforeMount)&&jn(w,j,z),hs(F,!0);{Me.ce&&Me.ce._hasShadowRoot()&&Me.ce._injectChildStyle(de);const Ue=F.subTree=cu(F);v(null,Ue,X,oe,F,Z,ae),z.el=Ue.el}if(ee&&pn(ee,Z),!De&&(w=O&&O.onVnodeMounted)){const Ue=z;pn(()=>jn(w,j,Ue),Z)}(z.shapeFlag&256||j&&Yr(j.vnode)&&j.vnode.shapeFlag&256)&&F.a&&pn(F.a,Z),F.isMounted=!0,z=X=oe=null}};F.scope.on();const le=F.effect=new Ef(he);F.scope.off();const re=F.update=le.run.bind(le),ce=F.job=le.runIfDirty.bind(le);ce.i=F,ce.id=F.uid,le.scheduler=()=>mh(ce),hs(F,!0),re()},V=(F,z,X)=>{z.component=F;const oe=F.vnode.props;F.vnode=z,F.next=null,r0(F,z.props,oe,X),c0(F,z.children,X),Ui(),eu(F),Oi()},q=(F,z,X,oe,Z,ae,P,he,le=!1)=>{const re=F&&F.children,ce=F?F.shapeFlag:0,w=z.children,{patchFlag:x,shapeFlag:O}=z;if(x>0){if(x&128){me(re,w,X,oe,Z,ae,P,he,le);return}else if(x&256){Q(re,w,X,oe,Z,ae,P,he,le);return}}O&8?(ce&16&&se(re,Z,ae),w!==re&&h(X,w)):ce&16?O&16?me(re,w,X,oe,Z,ae,P,he,le):se(re,Z,ae,!0):(ce&8&&h(X,""),O&16&&y(w,X,oe,Z,ae,P,he,le))},Q=(F,z,X,oe,Z,ae,P,he,le)=>{F=F||lr,z=z||lr;const re=F.length,ce=z.length,w=Math.min(re,ce);let x;for(x=0;x<w;x++){const O=z[x]=le?Ci(z[x]):ni(z[x]);v(F[x],O,X,null,Z,ae,P,he,le)}re>ce?se(F,Z,ae,!0,!1,w):y(z,X,oe,Z,ae,P,he,le,w)},me=(F,z,X,oe,Z,ae,P,he,le)=>{let re=0;const ce=z.length;let w=F.length-1,x=ce-1;for(;re<=w&&re<=x;){const O=F[re],Y=z[re]=le?Ci(z[re]):ni(z[re]);if(Ms(O,Y))v(O,Y,X,null,Z,ae,P,he,le);else break;re++}for(;re<=w&&re<=x;){const O=F[w],Y=z[x]=le?Ci(z[x]):ni(z[x]);if(Ms(O,Y))v(O,Y,X,null,Z,ae,P,he,le);else break;w--,x--}if(re>w){if(re<=x){const O=x+1,Y=O<ce?z[O].el:oe;for(;re<=x;)v(null,z[re]=le?Ci(z[re]):ni(z[re]),X,Y,Z,ae,P,he,le),re++}}else if(re>x)for(;re<=w;)ie(F[re],Z,ae,!0),re++;else{const O=re,Y=re,ee=new Map;for(re=Y;re<=x;re++){const Se=z[re]=le?Ci(z[re]):ni(z[re]);Se.key!=null&&ee.set(Se.key,re)}let j,Me=0;const de=x-Y+1;let De=!1,Ue=0;const ue=new Array(de);for(re=0;re<de;re++)ue[re]=0;for(re=O;re<=w;re++){const Se=F[re];if(Me>=de){ie(Se,Z,ae,!0);continue}let Ce;if(Se.key!=null)Ce=ee.get(Se.key);else for(j=Y;j<=x;j++)if(ue[j-Y]===0&&Ms(Se,z[j])){Ce=j;break}Ce===void 0?ie(Se,Z,ae,!0):(ue[Ce-Y]=re+1,Ce>=Ue?Ue=Ce:De=!0,v(Se,z[Ce],X,null,Z,ae,P,he,le),Me++)}const ge=De?f0(ue):lr;for(j=ge.length-1,re=de-1;re>=0;re--){const Se=Y+re,Ce=z[Se],Re=z[Se+1],Ze=Se+1<ce?Re.el||xp(Re):oe;ue[re]===0?v(null,Ce,X,Ze,Z,ae,P,he,le):De&&(j<0||re!==ge[j]?_e(Ce,X,Ze,2):j--)}}},_e=(F,z,X,oe,Z=null)=>{const{el:ae,type:P,transition:he,children:le,shapeFlag:re}=F;if(re&6){_e(F.component.subTree,z,X,oe);return}if(re&128){F.suspense.move(z,X,oe);return}if(re&64){P.move(F,z,X,Ve);return}if(P===_n){i(ae,z,X);for(let w=0;w<le.length;w++)_e(le[w],z,X,oe);i(F.anchor,z,X);return}if(P===sa){E(F,z,X);return}if(oe!==2&&re&1&&he)if(oe===0)he.beforeEnter(ae),i(ae,z,X),pn(()=>he.enter(ae),Z);else{const{leave:w,delayLeave:x,afterLeave:O}=he,Y=()=>{F.ctx.isUnmounted?s(ae):i(ae,z,X)},ee=()=>{ae._isLeaving&&ae[ti](!0),w(ae,()=>{Y(),O&&O()})};x?x(ae,Y,ee):ee()}else i(ae,z,X)},ie=(F,z,X,oe=!1,Z=!1)=>{const{type:ae,props:P,ref:he,children:le,dynamicChildren:re,shapeFlag:ce,patchFlag:w,dirs:x,cacheIndex:O}=F;if(w===-2&&(Z=!1),he!=null&&(Ui(),qr(he,null,X,F,!0),Oi()),O!=null&&(z.renderCache[O]=void 0),ce&256){z.ctx.deactivate(F);return}const Y=ce&1&&x,ee=!Yr(F);let j;if(ee&&(j=P&&P.onVnodeBeforeUnmount)&&jn(j,z,F),ce&6)lt(F.component,X,oe);else{if(ce&128){F.suspense.unmount(X,oe);return}Y&&cs(F,null,z,"beforeUnmount"),ce&64?F.type.remove(F,z,X,Ve,oe):re&&!re.hasOnce&&(ae!==_n||w>0&&w&64)?se(re,z,X,!1,!0):(ae===_n&&w&384||!Z&&ce&16)&&se(le,z,X),oe&&Ge(F)}(ee&&(j=P&&P.onVnodeUnmounted)||Y)&&pn(()=>{j&&jn(j,z,F),Y&&cs(F,null,z,"unmounted")},X)},Ge=F=>{const{type:z,el:X,anchor:oe,transition:Z}=F;if(z===_n){at(X,oe);return}if(z===sa){M(F);return}const ae=()=>{s(X),Z&&!Z.persisted&&Z.afterLeave&&Z.afterLeave()};if(F.shapeFlag&1&&Z&&!Z.persisted){const{leave:P,delayLeave:he}=Z,le=()=>P(X,ae);he?he(F.el,ae,le):le()}else ae()},at=(F,z)=>{let X;for(;F!==z;)X=u(F),s(F),F=X;s(z)},lt=(F,z,X)=>{const{bum:oe,scope:Z,job:ae,subTree:P,um:he,m:le,a:re}=F;du(le),du(re),oe&&na(oe),Z.stop(),ae&&(ae.flags|=8,ie(P,F,z,X)),he&&pn(he,z),pn(()=>{F.isUnmounted=!0},z)},se=(F,z,X,oe=!1,Z=!1,ae=0)=>{for(let P=ae;P<F.length;P++)ie(F[P],z,X,oe,Z)},pe=F=>{if(F.shapeFlag&6)return pe(F.component.subTree);if(F.shapeFlag&128)return F.suspense.next();const z=u(F.anchor||F.el),X=z&&z[Tg];return X?u(X):z};let xe=!1;const Ye=(F,z,X)=>{let oe;F==null?z._vnode&&(ie(z._vnode,null,null,!0),oe=z._vnode.component):v(z._vnode||null,F,z,null,null,null,X),z._vnode=F,xe||(xe=!0,eu(oe),Gf(),xe=!1)},Ve={p:v,um:ie,m:_e,r:Ge,mt:B,mc:y,pc:q,pbc:H,n:pe,o:n};return{render:Ye,hydrate:void 0,createApp:Kg(Ye)}}function ul({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function hs({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function d0(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function _p(n,e,t=!1){const i=n.children,s=e.children;if(ke(i)&&ke(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=Ci(s[r]),a.el=o.el),!t&&a.patchFlag!==-2&&_p(o,a)),a.type===Xa&&(a.patchFlag===-1&&(a=s[r]=Ci(a)),a.el=o.el),a.type===ln&&!a.el&&(a.el=o.el)}}function f0(n){const e=n.slice(),t=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,o=t.length-1;r<o;)a=r+o>>1,n[t[a]]<c?r=a+1:o=a;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function vp(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:vp(e)}function du(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}function xp(n){if(n.placeholder)return n.placeholder;const e=n.component;return e?xp(e.subTree):null}const yp=n=>n.__isSuspense;function p0(n,e){e&&e.pendingBranch?ke(n)?e.effects.push(...n):e.effects.push(n):Mg(n)}const _n=Symbol.for("v-fgt"),Xa=Symbol.for("v-txt"),ln=Symbol.for("v-cmt"),sa=Symbol.for("v-stc"),$r=[];let Tn=null;function Tt(n=!1){$r.push(Tn=n?null:[])}function m0(){$r.pop(),Tn=$r[$r.length-1]||null}let to=1;function Ma(n,e=!1){to+=n,n<0&&Tn&&e&&(Tn.hasOnce=!0)}function Mp(n){return n.dynamicChildren=to>0?Tn||lr:null,m0(),to>0&&Tn&&Tn.push(n),n}function It(n,e,t,i,s,r){return Mp(We(n,e,t,i,s,r,!0))}function Sp(n,e,t,i,s){return Mp(Rt(n,e,t,i,s,!0))}function Sa(n){return n?n.__v_isVNode===!0:!1}function Ms(n,e){return n.type===e.type&&n.key===e.key}const Ep=({key:n})=>n??null,ra=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Pt(n)||cn(n)||Ke(n)?{i:wn,r:n,k:e,f:!!t}:n:null);function We(n,e=null,t=null,i=0,s=null,r=n===_n?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Ep(e),ref:e&&ra(e),scopeId:Wf,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:wn};return a?(yh(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=Pt(t)?8:16),to>0&&!o&&Tn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&Tn.push(l),l}const Rt=g0;function g0(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===Vg)&&(n=ln),Sa(n)){const a=os(n,e,!0);return t&&yh(a,t),to>0&&!r&&Tn&&(a.shapeFlag&6?Tn[Tn.indexOf(n)]=a:Tn.push(a)),a.patchFlag=-2,a}if(C0(n)&&(n=n.__vccOpts),e){e=_0(e);let{class:a,style:l}=e;a&&!Pt(a)&&(e.class=Ba(a)),ut(l)&&(ph(l)&&!ke(l)&&(l=kt({},l)),e.style=Ds(l))}const o=Pt(n)?1:yp(n)?128:Yf(n)?64:ut(n)?4:Ke(n)?2:0;return We(n,e,t,i,s,o,r,!0)}function _0(n){return n?ph(n)||up(n)?kt({},n):n:null}function os(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=e?x0(s||{},e):s,h={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Ep(c),ref:e&&e.ref?t&&r?ke(r)?r.concat(ra(e)):[r,ra(e)]:ra(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==_n?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&os(n.ssContent),ssFallback:n.ssFallback&&os(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&eo(h,l.clone(h)),h}function Ea(n=" ",e=0){return Rt(Xa,null,n,e)}function v0(n,e){const t=Rt(sa,null,n);return t.staticCount=e,t}function Ss(n="",e=!1){return e?(Tt(),Sp(ln,null,n)):Rt(ln,null,n)}function ni(n){return n==null||typeof n=="boolean"?Rt(ln):ke(n)?Rt(_n,null,n.slice()):Sa(n)?Ci(n):Rt(Xa,null,String(n))}function Ci(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:os(n)}function yh(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(ke(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),yh(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!up(e)?e._ctx=wn:s===3&&wn&&(wn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Ke(e)?(e={default:e,_ctx:wn},t=32):(e=String(e),i&64?(t=16,e=[Ea(e)]):t=8);n.children=e,n.shapeFlag|=t}function x0(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Ba([e.class,i.class]));else if(s==="style")e.style=Ds([e.style,i.style]);else if(Ia(s)){const r=e[s],o=i[s];o&&r!==o&&!(ke(r)&&r.includes(o))&&(e[s]=r?[].concat(r,o):o)}else s!==""&&(e[s]=i[s])}return e}function jn(n,e,t,i=null){Xn(n,e,7,[t,i])}const y0=op();let M0=0;function S0(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||y0,r={uid:M0++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new qm(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:fp(i,s),emitsOptions:ap(i,s),emit:null,emitted:null,propsDefaults:Mt,inheritAttrs:i.inheritAttrs,ctx:Mt,data:Mt,props:Mt,attrs:Mt,slots:Mt,refs:Mt,setupState:Mt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Jg.bind(null,r),n.ce&&n.ce(r),r}let Qt=null;const bp=()=>Qt||wn;let ba,uc;{const n=Oa(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};ba=e("__VUE_INSTANCE_SETTERS__",t=>Qt=t),uc=e("__VUE_SSR_SETTERS__",t=>no=t)}const fo=n=>{const e=Qt;return ba(n),n.scope.on(),()=>{n.scope.off(),ba(e)}},fu=()=>{Qt&&Qt.scope.off(),ba(null)};function wp(n){return n.vnode.shapeFlag&4}let no=!1;function E0(n,e=!1,t=!1){e&&uc(e);const{props:i,children:s}=n.vnode,r=wp(n);s0(n,i,r,e),l0(n,s,t||e);const o=r?b0(n,e):void 0;return e&&uc(!1),o}function b0(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,kg);const{setup:i}=t;if(i){Ui();const s=n.setupContext=i.length>1?T0(n):null,r=fo(n),o=uo(i,n,0,[n.props,s]),a=gf(o);if(Oi(),r(),(a||n.sp)&&!Yr(n)&&Qf(n),a){if(o.then(fu,fu),e)return o.then(l=>{pu(n,l)}).catch(l=>{Va(l,n,0)});n.asyncDep=o}else pu(n,o)}else Tp(n)}function pu(n,e,t){Ke(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:ut(e)&&(n.setupState=Bf(e)),Tp(n)}function Tp(n,e,t){const i=n.type;n.render||(n.render=i.render||ri);{const s=fo(n);Ui();try{Wg(n)}finally{Oi(),s()}}}const w0={get(n,e){return Jt(n,"get",""),n[e]}};function T0(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,w0),slots:n.slots,emit:n.emit,expose:e}}function qa(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Bf(Be(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in jr)return jr[t](n)},has(e,t){return t in e||t in jr}})):n.proxy}function A0(n,e=!0){return Ke(n)?n.displayName||n.name:n.name||e&&n.__name}function C0(n){return Ke(n)&&"__vccOpts"in n}const R0=(n,e)=>gg(n,e,no);function P0(n,e,t){try{Ma(-1);const i=arguments.length;return i===2?ut(e)&&!ke(e)?Sa(e)?Rt(n,null,[e]):Rt(n,e):Rt(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&Sa(t)&&(t=[t]),Rt(n,e,t))}finally{Ma(1)}}const D0="3.5.29";let dc;const mu=typeof window<"u"&&window.trustedTypes;if(mu)try{dc=mu.createPolicy("vue",{createHTML:n=>n})}catch{}const Ap=dc?n=>dc.createHTML(n):n=>n,I0="http://www.w3.org/2000/svg",L0="http://www.w3.org/1998/Math/MathML",Ai=typeof document<"u"?document:null,gu=Ai&&Ai.createElement("template"),N0={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?Ai.createElementNS(I0,n):e==="mathml"?Ai.createElementNS(L0,n):t?Ai.createElement(n,{is:t}):Ai.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Ai.createTextNode(n),createComment:n=>Ai.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Ai.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const o=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{gu.innerHTML=Ap(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=gu.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Wi="transition",Tr="animation",io=Symbol("_vtc"),Cp={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},F0=kt({},jf,Cp),U0=n=>(n.displayName="Transition",n.props=F0,n),Rp=U0((n,{slots:e})=>P0(Rg,O0(n),e)),us=(n,e=[])=>{ke(n)?n.forEach(t=>t(...e)):n&&n(...e)},_u=n=>n?ke(n)?n.some(e=>e.length>1):n.length>1:!1;function O0(n){const e={};for(const L in n)L in Cp||(e[L]=n[L]);if(n.css===!1)return e;const{name:t="v",type:i,duration:s,enterFromClass:r=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:l=r,appearActiveClass:c=o,appearToClass:h=a,leaveFromClass:d=`${t}-leave-from`,leaveActiveClass:u=`${t}-leave-active`,leaveToClass:f=`${t}-leave-to`}=n,g=B0(s),v=g&&g[0],m=g&&g[1],{onBeforeEnter:p,onEnter:_,onEnterCancelled:E,onLeave:M,onLeaveCancelled:A,onBeforeAppear:C=p,onAppear:R=_,onAppearCancelled:y=E}=e,b=(L,I,B,U)=>{L._enterCancelled=U,ds(L,I?h:a),ds(L,I?c:o),B&&B()},H=(L,I)=>{L._isLeaving=!1,ds(L,d),ds(L,f),ds(L,u),I&&I()},D=L=>(I,B)=>{const U=L?R:_,N=()=>b(I,L,B);us(U,[I,N]),vu(()=>{ds(I,L?l:r),gi(I,L?h:a),_u(U)||xu(I,i,v,N)})};return kt(e,{onBeforeEnter(L){us(p,[L]),gi(L,r),gi(L,o)},onBeforeAppear(L){us(C,[L]),gi(L,l),gi(L,c)},onEnter:D(!1),onAppear:D(!0),onLeave(L,I){L._isLeaving=!0;const B=()=>H(L,I);gi(L,d),L._enterCancelled?(gi(L,u),Su(L)):(Su(L),gi(L,u)),vu(()=>{L._isLeaving&&(ds(L,d),gi(L,f),_u(M)||xu(L,i,m,B))}),us(M,[L,B])},onEnterCancelled(L){b(L,!1,void 0,!0),us(E,[L])},onAppearCancelled(L){b(L,!0,void 0,!0),us(y,[L])},onLeaveCancelled(L){H(L),us(A,[L])}})}function B0(n){if(n==null)return null;if(ut(n))return[dl(n.enter),dl(n.leave)];{const e=dl(n);return[e,e]}}function dl(n){return Om(n)}function gi(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[io]||(n[io]=new Set)).add(e)}function ds(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const t=n[io];t&&(t.delete(e),t.size||(n[io]=void 0))}function vu(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let z0=0;function xu(n,e,t,i){const s=n._endId=++z0,r=()=>{s===n._endId&&i()};if(t!=null)return setTimeout(r,t);const{type:o,timeout:a,propCount:l}=H0(n,e);if(!o)return i();const c=o+"end";let h=0;const d=()=>{n.removeEventListener(c,u),r()},u=f=>{f.target===n&&++h>=l&&d()};setTimeout(()=>{h<l&&d()},a+1),n.addEventListener(c,u)}function H0(n,e){const t=window.getComputedStyle(n),i=g=>(t[g]||"").split(", "),s=i(`${Wi}Delay`),r=i(`${Wi}Duration`),o=yu(s,r),a=i(`${Tr}Delay`),l=i(`${Tr}Duration`),c=yu(a,l);let h=null,d=0,u=0;e===Wi?o>0&&(h=Wi,d=o,u=r.length):e===Tr?c>0&&(h=Tr,d=c,u=l.length):(d=Math.max(o,c),h=d>0?o>c?Wi:Tr:null,u=h?h===Wi?r.length:l.length:0);const f=h===Wi&&/\b(?:transform|all)(?:,|$)/.test(i(`${Wi}Property`).toString());return{type:h,timeout:d,propCount:u,hasTransform:f}}function yu(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>Mu(t)+Mu(n[i])))}function Mu(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function Su(n){return(n?n.ownerDocument:document).body.offsetHeight}function V0(n,e,t){const i=n[io];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Eu=Symbol("_vod"),G0=Symbol("_vsh"),k0=Symbol(""),W0=/(?:^|;)\s*display\s*:/;function X0(n,e,t){const i=n.style,s=Pt(t);let r=!1;if(t&&!s){if(e)if(Pt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&oa(i,a,"")}else for(const o in e)t[o]==null&&oa(i,o,"");for(const o in t)o==="display"&&(r=!0),oa(i,o,t[o])}else if(s){if(e!==t){const o=i[k0];o&&(t+=";"+o),i.cssText=t,r=W0.test(t)}}else e&&n.removeAttribute("style");Eu in n&&(n[Eu]=r?i.display:"",n[G0]&&(i.display="none"))}const bu=/\s*!important$/;function oa(n,e,t){if(ke(t))t.forEach(i=>oa(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=q0(n,e);bu.test(t)?n.setProperty(Fs(i),t.replace(bu,""),"important"):n[i]=t}}const wu=["Webkit","Moz","ms"],fl={};function q0(n,e){const t=fl[e];if(t)return t;let i=In(e);if(i!=="filter"&&i in n)return fl[e]=i;i=Fa(i);for(let s=0;s<wu.length;s++){const r=wu[s]+i;if(r in n)return fl[e]=r}return e}const Tu="http://www.w3.org/1999/xlink";function Au(n,e,t,i,s,r=km(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Tu,e.slice(6,e.length)):n.setAttributeNS(Tu,e,t):t==null||r&&!yf(t)?n.removeAttribute(e):n.setAttribute(e,r?"":li(t)?String(t):t)}function Cu(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Ap(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=yf(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(s||e)}function Es(n,e,t,i){n.addEventListener(e,t,i)}function Y0(n,e,t,i){n.removeEventListener(e,t,i)}const Ru=Symbol("_vei");function j0(n,e,t,i,s=null){const r=n[Ru]||(n[Ru]={}),o=r[e];if(i&&o)o.value=i;else{const[a,l]=$0(e);if(i){const c=r[e]=J0(i,s);Es(n,a,c,l)}else o&&(Y0(n,a,o,l),r[e]=void 0)}}const Pu=/(?:Once|Passive|Capture)$/;function $0(n){let e;if(Pu.test(n)){e={};let i;for(;i=n.match(Pu);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):Fs(n.slice(2)),e]}let pl=0;const K0=Promise.resolve(),Z0=()=>pl||(K0.then(()=>pl=0),pl=Date.now());function J0(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;Xn(Q0(i,t.value),e,5,[i])};return t.value=n,t.attached=Z0(),t}function Q0(n,e){if(ke(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const Du=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,e_=(n,e,t,i,s,r)=>{const o=s==="svg";e==="class"?V0(n,i,o):e==="style"?X0(n,t,i):Ia(e)?oh(e)||j0(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):t_(n,e,i,o))?(Cu(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Au(n,e,i,o,r,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Pt(i))?Cu(n,In(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Au(n,e,i,o))};function t_(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Du(e)&&Ke(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="sandbox"&&n.tagName==="IFRAME"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Du(e)&&Pt(t)?!1:e in n}const wa=n=>{const e=n.props["onUpdate:modelValue"]||!1;return ke(e)?t=>na(e,t):e};function n_(n){n.target.composing=!0}function Iu(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const fr=Symbol("_assign");function Lu(n,e,t){return e&&(n=n.trim()),t&&(n=Ua(n)),n}const Pp={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n[fr]=wa(s);const r=i||s.props&&s.props.type==="number";Es(n,e?"change":"input",o=>{o.target.composing||n[fr](Lu(n.value,t,r))}),(t||r)&&Es(n,"change",()=>{n.value=Lu(n.value,t,r)}),e||(Es(n,"compositionstart",n_),Es(n,"compositionend",Iu),Es(n,"change",Iu))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:r}},o){if(n[fr]=wa(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?Ua(n.value):n.value,l=e??"";a!==l&&(document.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l))}},i_={deep:!0,created(n,{value:e,modifiers:{number:t}},i){const s=La(e);Es(n,"change",()=>{const r=Array.prototype.filter.call(n.options,o=>o.selected).map(o=>t?Ua(Ta(o)):Ta(o));n[fr](n.multiple?s?new Set(r):r:r[0]),n._assigning=!0,Hf(()=>{n._assigning=!1})}),n[fr]=wa(i)},mounted(n,{value:e}){Nu(n,e)},beforeUpdate(n,e,t){n[fr]=wa(t)},updated(n,{value:e}){n._assigning||Nu(n,e)}};function Nu(n,e){const t=n.multiple,i=ke(e);if(!(t&&!i&&!La(e))){for(let s=0,r=n.options.length;s<r;s++){const o=n.options[s],a=Ta(o);if(t)if(i){const l=typeof a;l==="string"||l==="number"?o.selected=e.some(c=>String(c)===String(a)):o.selected=Xm(e,a)>-1}else o.selected=e.has(a);else if(ho(Ta(o),e)){n.selectedIndex!==s&&(n.selectedIndex=s);return}}!t&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function Ta(n){return"_value"in n?n._value:n.value}const s_=kt({patchProp:e_},N0);let Fu;function r_(){return Fu||(Fu=h0(s_))}const o_=((...n)=>{const e=r_().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=l_(i);if(!s)return;const r=e._component;!Ke(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=t(s,!1,a_(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e});function a_(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function l_(n){return Pt(n)?document.querySelector(n):n}const Mh="183",pr={ROTATE:0,DOLLY:1,PAN:2},rr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},c_=0,Uu=1,h_=2,aa=1,Dp=2,Vr=3,ci=0,Yt=1,Di=2,Ni=0,mr=1,Ou=2,Bu=3,zu=4,u_=5,bs=100,d_=101,f_=102,p_=103,m_=104,g_=200,__=201,v_=202,x_=203,fc=204,pc=205,y_=206,M_=207,S_=208,E_=209,b_=210,w_=211,T_=212,A_=213,C_=214,mc=0,gc=1,_c=2,vr=3,vc=4,so=5,xc=6,yc=7,Ip=0,R_=1,P_=2,oi=0,Lp=1,Np=2,Fp=3,Sh=4,Up=5,Op=6,Bp=7,zp=300,Ns=301,xr=302,ml=303,gl=304,Ya=306,Mc=1e3,Li=1001,Sc=1002,Bt=1003,D_=1004,bo=1005,en=1006,_l=1007,Cs=1008,En=1009,Hp=1010,Vp=1011,ro=1012,Eh=1013,hi=1014,zn=1015,zi=1016,bh=1017,wh=1018,oo=1020,Gp=35902,kp=35899,Wp=1021,Xp=1022,Hn=1023,Hi=1026,Rs=1027,ja=1028,Th=1029,yr=1030,Ah=1031,Ch=1033,la=33776,ca=33777,ha=33778,ua=33779,Ec=35840,bc=35841,wc=35842,Tc=35843,Ac=36196,Cc=37492,Rc=37496,Pc=37488,Dc=37489,Ic=37490,Lc=37491,Nc=37808,Fc=37809,Uc=37810,Oc=37811,Bc=37812,zc=37813,Hc=37814,Vc=37815,Gc=37816,kc=37817,Wc=37818,Xc=37819,qc=37820,Yc=37821,jc=36492,$c=36494,Kc=36495,Zc=36283,Jc=36284,Qc=36285,eh=36286,I_=3200,qp=0,L_=1,is="",on="srgb",Mr="srgb-linear",Aa="linear",ft="srgb",Vs=7680,Hu=519,N_=512,F_=513,U_=514,Rh=515,O_=516,B_=517,Ph=518,z_=519,Vu=35044,Gu="300 es",si=2e3,ao=2001;function H_(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ca(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function V_(){const n=Ca("canvas");return n.style.display="block",n}const ku={};function Wu(...n){const e="THREE."+n.shift();console.log(e,...n)}function Yp(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function qe(...n){n=Yp(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function it(...n){n=Yp(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ra(...n){const e=n.join(" ");e in ku||(ku[e]=!0,qe(...n))}function G_(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const k_={[mc]:gc,[_c]:xc,[vc]:yc,[vr]:so,[gc]:mc,[xc]:_c,[yc]:vc,[so]:vr};class Us{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],da=Math.PI/180,th=180/Math.PI;function po(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function nt(n,e,t){return Math.max(e,Math.min(t,n))}function W_(n,e){return(n%e+e)%e}function vl(n,e,t){return(1-t)*n+t*e}function Ar(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function un(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const X_={DEG2RAD:da};class $e{constructor(e=0,t=0){$e.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}let bn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],u=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(d!==v||l!==u||c!==f||h!==g){let m=l*u+c*f+h*g+d*v;m<0&&(u=-u,f=-f,g=-g,v=-v,m=-m);let p=1-a;if(m<.9995){const _=Math.acos(m),E=Math.sin(_);p=Math.sin(p*_)/E,a=Math.sin(a*_)/E,l=l*p+u*a,c=c*p+f*a,h=h*p+g*a,d=d*p+v*a}else{l=l*p+u*a,c=c*p+f*a,h=h*p+g*a,d=d*p+v*a;const _=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=_,c*=_,h*=_,d*=_}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*d+l*f-c*u,e[t+1]=l*g+h*u+c*d-a*f,e[t+2]=c*g+h*f+a*u-l*d,e[t+3]=h*g-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),d=a(r/2),u=l(i/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:qe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=i+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>d){const f=2*Math.sqrt(1+i-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-i-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class W{constructor(e=0,t=0,i=0){W.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),h=2*(a*t-r*s),d=2*(r*i-o*t);return this.x=t+l*c+o*d-a*h,this.y=i+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xl.copy(this).projectOnVector(e),this.sub(xl)}reflect(e){return this.sub(xl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xl=new W,Xu=new bn;class Qe{constructor(e,t,i,s,r,o,a,l,c){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],v=s[0],m=s[3],p=s[6],_=s[1],E=s[4],M=s[7],A=s[2],C=s[5],R=s[8];return r[0]=o*v+a*_+l*A,r[3]=o*m+a*E+l*C,r[6]=o*p+a*M+l*R,r[1]=c*v+h*_+d*A,r[4]=c*m+h*E+d*C,r[7]=c*p+h*M+d*R,r[2]=u*v+f*_+g*A,r[5]=u*m+f*E+g*C,r[8]=u*p+f*M+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=t*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=d*v,e[1]=(s*c-h*i)*v,e[2]=(a*i-s*o)*v,e[3]=u*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(yl.makeScale(e,t)),this}rotate(e){return this.premultiply(yl.makeRotation(-e)),this}translate(e,t){return this.premultiply(yl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const yl=new Qe,qu=new Qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yu=new Qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function q_(){const n={enabled:!0,workingColorSpace:Mr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ft&&(s.r=Fi(s.r),s.g=Fi(s.g),s.b=Fi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ft&&(s.r=gr(s.r),s.g=gr(s.g),s.b=gr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===is?Aa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ra("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ra("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Mr]:{primaries:e,whitePoint:i,transfer:Aa,toXYZ:qu,fromXYZ:Yu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:on},outputColorSpaceConfig:{drawingBufferColorSpace:on}},[on]:{primaries:e,whitePoint:i,transfer:ft,toXYZ:qu,fromXYZ:Yu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:on}}}),n}const st=q_();function Fi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function gr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Gs;class Y_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Gs===void 0&&(Gs=Ca("canvas")),Gs.width=e.width,Gs.height=e.height;const s=Gs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Gs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ca("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Fi(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Fi(t[i]/255)*255):t[i]=Fi(t[i]);return{data:t,width:e.width,height:e.height}}else return qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let j_=0;class Dh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:j_++}),this.uuid=po(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ml(s[o].image)):r.push(Ml(s[o]))}else r=Ml(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ml(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Y_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(qe("Texture: Unable to serialize Texture."),{})}let $_=0;const Sl=new W;class tn extends Us{constructor(e=tn.DEFAULT_IMAGE,t=tn.DEFAULT_MAPPING,i=Li,s=Li,r=en,o=Cs,a=Hn,l=En,c=tn.DEFAULT_ANISOTROPY,h=is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$_++}),this.uuid=po(),this.name="",this.source=new Dh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Sl).x}get height(){return this.source.getSize(Sl).y}get depth(){return this.source.getSize(Sl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){qe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mc:e.x=e.x-Math.floor(e.x);break;case Li:e.x=e.x<0?0:1;break;case Sc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mc:e.y=e.y-Math.floor(e.y);break;case Li:e.y=e.y<0?0:1;break;case Sc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=zp;tn.DEFAULT_ANISOTROPY=1;class At{constructor(e=0,t=0,i=0,s=1){At.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,M=(f+1)/2,A=(p+1)/2,C=(h+u)/4,R=(d+v)/4,y=(g+m)/4;return E>M&&E>A?E<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(E),s=C/i,r=R/i):M>A?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=C/s,r=y/s):A<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),i=R/r,s=y/r),this.set(i,s,r,t),this}let _=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(d-v)/_,this.z=(u-h)/_,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class K_ extends Us{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:i.depth},r=new tn(s),o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Dh(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ai extends K_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class jp extends tn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Z_ extends tn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Bt,this.minFilter=Bt,this.wrapR=Li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xt{constructor(e,t,i,s,r,o,a,l,c,h,d,u,f,g,v,m){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,h,d,u,f,g,v,m)}set(e,t,i,s,r,o,a,l,c,h,d,u,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,s=1/ks.setFromMatrixColumn(e,0).length(),r=1/ks.setFromMatrixColumn(e,1).length(),o=1/ks.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=o*h,f=o*d,g=a*h,v=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=u-v*c,t[9]=-a*l,t[2]=v-u*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u+v*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=v+u*a,t[10]=o*l}else if(e.order==="ZXY"){const u=l*h,f=l*d,g=c*h,v=c*d;t[0]=u-v*a,t[4]=-o*d,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=v-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const u=o*h,f=o*d,g=a*h,v=a*d;t[0]=l*h,t[4]=g*c-f,t[8]=u*c+v,t[1]=l*d,t[5]=v*c+u,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const u=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=v-u*d,t[8]=g*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+g,t[10]=u-v*d}else if(e.order==="XZY"){const u=o*l,f=o*c,g=a*l,v=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+v,t[5]=o*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=a*h,t[10]=v*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(J_,e,Q_)}lookAt(e,t,i){const s=this.elements;return xn.subVectors(e,t),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),Xi.crossVectors(i,xn),Xi.lengthSq()===0&&(Math.abs(i.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),Xi.crossVectors(i,xn)),Xi.normalize(),wo.crossVectors(xn,Xi),s[0]=Xi.x,s[4]=wo.x,s[8]=xn.x,s[1]=Xi.y,s[5]=wo.y,s[9]=xn.y,s[2]=Xi.z,s[6]=wo.z,s[10]=xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],v=i[6],m=i[10],p=i[14],_=i[3],E=i[7],M=i[11],A=i[15],C=s[0],R=s[4],y=s[8],b=s[12],H=s[1],D=s[5],L=s[9],I=s[13],B=s[2],U=s[6],N=s[10],V=s[14],q=s[3],Q=s[7],me=s[11],_e=s[15];return r[0]=o*C+a*H+l*B+c*q,r[4]=o*R+a*D+l*U+c*Q,r[8]=o*y+a*L+l*N+c*me,r[12]=o*b+a*I+l*V+c*_e,r[1]=h*C+d*H+u*B+f*q,r[5]=h*R+d*D+u*U+f*Q,r[9]=h*y+d*L+u*N+f*me,r[13]=h*b+d*I+u*V+f*_e,r[2]=g*C+v*H+m*B+p*q,r[6]=g*R+v*D+m*U+p*Q,r[10]=g*y+v*L+m*N+p*me,r[14]=g*b+v*I+m*V+p*_e,r[3]=_*C+E*H+M*B+A*q,r[7]=_*R+E*D+M*U+A*Q,r[11]=_*y+E*L+M*N+A*me,r[15]=_*b+E*I+M*V+A*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15],_=l*f-c*u,E=a*f-c*d,M=a*u-l*d,A=o*f-c*h,C=o*u-l*h,R=o*d-a*h;return t*(v*_-m*E+p*M)-i*(g*_-m*A+p*C)+s*(g*E-v*A+p*R)-r*(g*M-v*C+m*R)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],_=t*a-i*o,E=t*l-s*o,M=t*c-r*o,A=i*l-s*a,C=i*c-r*a,R=s*c-r*l,y=h*v-d*g,b=h*m-u*g,H=h*p-f*g,D=d*m-u*v,L=d*p-f*v,I=u*p-f*m,B=_*I-E*L+M*D+A*H-C*b+R*y;if(B===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/B;return e[0]=(a*I-l*L+c*D)*U,e[1]=(s*L-i*I-r*D)*U,e[2]=(v*R-m*C+p*A)*U,e[3]=(u*C-d*R-f*A)*U,e[4]=(l*H-o*I-c*b)*U,e[5]=(t*I-s*H+r*b)*U,e[6]=(m*M-g*R-p*E)*U,e[7]=(h*R-u*M+f*E)*U,e[8]=(o*L-a*H+c*y)*U,e[9]=(i*H-t*L-r*y)*U,e[10]=(g*C-v*M+p*_)*U,e[11]=(d*M-h*C-f*_)*U,e[12]=(a*b-o*D-l*y)*U,e[13]=(t*D-i*b+s*y)*U,e[14]=(v*E-g*A-m*_)*U,e[15]=(h*A-d*E+u*_)*U,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,v=o*h,m=o*d,p=a*d,_=l*c,E=l*h,M=l*d,A=i.x,C=i.y,R=i.z;return s[0]=(1-(v+p))*A,s[1]=(f+M)*A,s[2]=(g-E)*A,s[3]=0,s[4]=(f-M)*C,s[5]=(1-(u+p))*C,s[6]=(m+_)*C,s[7]=0,s[8]=(g+E)*R,s[9]=(m-_)*R,s[10]=(1-(u+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),t.identity(),this;let o=ks.set(s[0],s[1],s[2]).length();const a=ks.set(s[4],s[5],s[6]).length(),l=ks.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Nn.copy(this);const c=1/o,h=1/a,d=1/l;return Nn.elements[0]*=c,Nn.elements[1]*=c,Nn.elements[2]*=c,Nn.elements[4]*=h,Nn.elements[5]*=h,Nn.elements[6]*=h,Nn.elements[8]*=d,Nn.elements[9]*=d,Nn.elements[10]*=d,t.setFromRotationMatrix(Nn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,t,i,s,r,o,a=si,l=!1){const c=this.elements,h=2*r/(t-e),d=2*r/(i-s),u=(t+e)/(t-e),f=(i+s)/(i-s);let g,v;if(l)g=r/(o-r),v=o*r/(o-r);else if(a===si)g=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===ao)g=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=si,l=!1){const c=this.elements,h=2/(t-e),d=2/(i-s),u=-(t+e)/(t-e),f=-(i+s)/(i-s);let g,v;if(l)g=1/(o-r),v=o/(o-r);else if(a===si)g=-2/(o-r),v=-(o+r)/(o-r);else if(a===ao)g=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ks=new W,Nn=new xt,J_=new W(0,0,0),Q_=new W(1,1,1),Xi=new W,wo=new W,xn=new W,ju=new xt,$u=new bn;class ui{constructor(e=0,t=0,i=0,s=ui.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ju.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ju,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $u.setFromEuler(this),this.setFromQuaternion($u,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ui.DEFAULT_ORDER="XYZ";class Ih{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ev=0;const Ku=new W,Ws=new bn,_i=new xt,To=new W,Cr=new W,tv=new W,nv=new bn,Zu=new W(1,0,0),Ju=new W(0,1,0),Qu=new W(0,0,1),ed={type:"added"},iv={type:"removed"},Xs={type:"childadded",child:null},El={type:"childremoved",child:null};class jt extends Us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ev++}),this.uuid=po(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new W,t=new ui,i=new bn,s=new W(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xt},normalMatrix:{value:new Qe}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ih,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ws.setFromAxisAngle(e,t),this.quaternion.multiply(Ws),this}rotateOnWorldAxis(e,t){return Ws.setFromAxisAngle(e,t),this.quaternion.premultiply(Ws),this}rotateX(e){return this.rotateOnAxis(Zu,e)}rotateY(e){return this.rotateOnAxis(Ju,e)}rotateZ(e){return this.rotateOnAxis(Qu,e)}translateOnAxis(e,t){return Ku.copy(e).applyQuaternion(this.quaternion),this.position.add(Ku.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zu,e)}translateY(e){return this.translateOnAxis(Ju,e)}translateZ(e){return this.translateOnAxis(Qu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?To.copy(e):To.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(Cr,To,this.up):_i.lookAt(To,Cr,this.up),this.quaternion.setFromRotationMatrix(_i),s&&(_i.extractRotation(s.matrixWorld),Ws.setFromRotationMatrix(_i),this.quaternion.premultiply(Ws.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(it("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ed),Xs.child=e,this.dispatchEvent(Xs),Xs.child=null):it("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(iv),El.child=e,this.dispatchEvent(El),El.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ed),Xs.child=e,this.dispatchEvent(Xs),Xs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,e,tv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cr,nv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}jt.DEFAULT_UP=new W(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ii extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sv={type:"move"};class bl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ii,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ii,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ii,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(sv)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ii;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const $p={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Ao={h:0,s:0,l:0};function wl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ot{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=on){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=st.workingColorSpace){if(e=W_(e,1),t=nt(t,0,1),i=nt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=wl(o,r,e+1/3),this.g=wl(o,r,e),this.b=wl(o,r,e-1/3)}return st.colorSpaceToWorking(this,s),this}setStyle(e,t=on){function i(r){r!==void 0&&parseFloat(r)<1&&qe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:qe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=on){const i=$p[e.toLowerCase()];return i!==void 0?this.setHex(i,t):qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fi(e.r),this.g=Fi(e.g),this.b=Fi(e.b),this}copyLinearToSRGB(e){return this.r=gr(e.r),this.g=gr(e.g),this.b=gr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=on){return st.workingToColorSpace(Zt.copy(this),e),Math.round(nt(Zt.r*255,0,255))*65536+Math.round(nt(Zt.g*255,0,255))*256+Math.round(nt(Zt.b*255,0,255))}getHexString(e=on){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(Zt.copy(this),t);const i=Zt.r,s=Zt.g,r=Zt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=on){st.workingToColorSpace(Zt.copy(this),e);const t=Zt.r,i=Zt.g,s=Zt.b;return e!==on?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(Ao);const i=vl(qi.h,Ao.h,t),s=vl(qi.s,Ao.s,t),r=vl(qi.l,Ao.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new ot;ot.NAMES=$p;class rv extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Fn=new W,vi=new W,Tl=new W,xi=new W,qs=new W,Ys=new W,td=new W,Al=new W,Cl=new W,Rl=new W,Pl=new At,Dl=new At,Il=new At;class Bn{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Fn.subVectors(e,t),s.cross(Fn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Fn.subVectors(s,t),vi.subVectors(i,t),Tl.subVectors(e,t);const o=Fn.dot(Fn),a=Fn.dot(vi),l=Fn.dot(Tl),c=vi.dot(vi),h=vi.dot(Tl),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,xi.x),l.addScaledVector(o,xi.y),l.addScaledVector(a,xi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return Pl.setScalar(0),Dl.setScalar(0),Il.setScalar(0),Pl.fromBufferAttribute(e,t),Dl.fromBufferAttribute(e,i),Il.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Pl,r.x),o.addScaledVector(Dl,r.y),o.addScaledVector(Il,r.z),o}static isFrontFacing(e,t,i,s){return Fn.subVectors(i,t),vi.subVectors(e,t),Fn.cross(vi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Fn.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Bn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;qs.subVectors(s,i),Ys.subVectors(r,i),Al.subVectors(e,i);const l=qs.dot(Al),c=Ys.dot(Al);if(l<=0&&c<=0)return t.copy(i);Cl.subVectors(e,s);const h=qs.dot(Cl),d=Ys.dot(Cl);if(h>=0&&d<=h)return t.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(qs,o);Rl.subVectors(e,r);const f=qs.dot(Rl),g=Ys.dot(Rl);if(g>=0&&f<=g)return t.copy(r);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Ys,a);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return td.subVectors(r,s),a=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(td,a);const p=1/(m+v+u);return o=v*p,a=u*p,t.copy(i).addScaledVector(qs,o).addScaledVector(Ys,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Os{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Un):Un.fromBufferAttribute(r,o),Un.applyMatrix4(e.matrixWorld),this.expandByPoint(Un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Co.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Co.copy(i.boundingBox)),Co.applyMatrix4(e.matrixWorld),this.union(Co)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Un),Un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rr),Ro.subVectors(this.max,Rr),js.subVectors(e.a,Rr),$s.subVectors(e.b,Rr),Ks.subVectors(e.c,Rr),Yi.subVectors($s,js),ji.subVectors(Ks,$s),fs.subVectors(js,Ks);let t=[0,-Yi.z,Yi.y,0,-ji.z,ji.y,0,-fs.z,fs.y,Yi.z,0,-Yi.x,ji.z,0,-ji.x,fs.z,0,-fs.x,-Yi.y,Yi.x,0,-ji.y,ji.x,0,-fs.y,fs.x,0];return!Ll(t,js,$s,Ks,Ro)||(t=[1,0,0,0,1,0,0,0,1],!Ll(t,js,$s,Ks,Ro))?!1:(Po.crossVectors(Yi,ji),t=[Po.x,Po.y,Po.z],Ll(t,js,$s,Ks,Ro))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const yi=[new W,new W,new W,new W,new W,new W,new W,new W],Un=new W,Co=new Os,js=new W,$s=new W,Ks=new W,Yi=new W,ji=new W,fs=new W,Rr=new W,Ro=new W,Po=new W,ps=new W;function Ll(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ps.fromArray(n,r);const a=s.x*Math.abs(ps.x)+s.y*Math.abs(ps.y)+s.z*Math.abs(ps.z),l=e.dot(ps),c=t.dot(ps),h=i.dot(ps);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Dt=new W,Do=new $e;let ov=0;class Wn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ov++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Vu,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Do.fromBufferAttribute(this,t),Do.applyMatrix3(e),this.setXY(t,Do.x,Do.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ar(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=un(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ar(t,this.array)),t}setX(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ar(t,this.array)),t}setY(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ar(t,this.array)),t}setZ(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ar(t,this.array)),t}setW(e,t){return this.normalized&&(t=un(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=un(t,this.array),i=un(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=un(t,this.array),i=un(i,this.array),s=un(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=un(t,this.array),i=un(i,this.array),s=un(s,this.array),r=un(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vu&&(e.usage=this.usage),e}}class Kp extends Wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Zp extends Wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class hn extends Wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}const av=new Os,Pr=new W,Nl=new W;class mo{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):av.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Pr.subVectors(e,this.center);const t=Pr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Pr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Pr.copy(e.center).add(Nl)),this.expandByPoint(Pr.copy(e.center).sub(Nl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let lv=0;const Rn=new xt,Fl=new jt,Zs=new W,yn=new Os,Dr=new Os,Gt=new W;class qn extends Us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:lv++}),this.uuid=po(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(H_(e)?Zp:Kp)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Qe().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,i){return Rn.makeTranslation(e,t,i),this.applyMatrix4(Rn),this}scale(e,t,i){return Rn.makeScale(e,t,i),this.applyMatrix4(Rn),this}lookAt(e){return Fl.lookAt(e),Fl.updateMatrix(),this.applyMatrix4(Fl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new hn(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Os);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];yn.setFromBufferAttribute(r),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&it('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){it("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){const i=this.boundingSphere.center;if(yn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Dr.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(yn.min,Dr.min),yn.expandByPoint(Gt),Gt.addVectors(yn.max,Dr.max),yn.expandByPoint(Gt)):(yn.expandByPoint(Dr.min),yn.expandByPoint(Dr.max))}yn.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Gt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Gt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Gt.fromBufferAttribute(a,c),l&&(Zs.fromBufferAttribute(e,c),Gt.add(Zs)),s=Math.max(s,i.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&it('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){it("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let y=0;y<i.count;y++)a[y]=new W,l[y]=new W;const c=new W,h=new W,d=new W,u=new $e,f=new $e,g=new $e,v=new W,m=new W;function p(y,b,H){c.fromBufferAttribute(i,y),h.fromBufferAttribute(i,b),d.fromBufferAttribute(i,H),u.fromBufferAttribute(r,y),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,H),h.sub(c),d.sub(c),f.sub(u),g.sub(u);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(D),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),a[y].add(v),a[b].add(v),a[H].add(v),l[y].add(m),l[b].add(m),l[H].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let y=0,b=_.length;y<b;++y){const H=_[y],D=H.start,L=H.count;for(let I=D,B=D+L;I<B;I+=3)p(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const E=new W,M=new W,A=new W,C=new W;function R(y){A.fromBufferAttribute(s,y),C.copy(A);const b=a[y];E.copy(b),E.sub(A.multiplyScalar(A.dot(b))).normalize(),M.crossVectors(C,b);const D=M.dot(l[y])<0?-1:1;o.setXYZW(y,E.x,E.y,E.z,D)}for(let y=0,b=_.length;y<b;++y){const H=_[y],D=H.start,L=H.count;for(let I=D,B=D+L;I<B;I+=3)R(e.getX(I+0)),R(e.getX(I+1)),R(e.getX(I+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new W,r=new W,o=new W,a=new W,l=new W,c=new W,h=new W,d=new W;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),v=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new Wn(u,h,d)}if(this.index===null)return qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new qn,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=e(u,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let cv=0,go=class extends Us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cv++}),this.uuid=po(),this.name="",this.type="Material",this.blending=mr,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fc,this.blendDst=pc,this.blendEquation=bs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ot(0,0,0),this.blendAlpha=0,this.depthFunc=vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vs,this.stencilZFail=Vs,this.stencilZPass=Vs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){qe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==mr&&(i.blending=this.blending),this.side!==ci&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==fc&&(i.blendSrc=this.blendSrc),this.blendDst!==pc&&(i.blendDst=this.blendDst),this.blendEquation!==bs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==vr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Vs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Vs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};const Mi=new W,Ul=new W,Io=new W,$i=new W,Ol=new W,Lo=new W,Bl=new W;let Lh=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ul.copy(e).add(t).multiplyScalar(.5),Io.copy(t).sub(e).normalize(),$i.copy(this.origin).sub(Ul);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Io),a=$i.dot(this.direction),l=-$i.dot(Io),c=$i.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ul).addScaledVector(Io,u),f}intersectSphere(e,t){Mi.subVectors(e.center,this.origin);const i=Mi.dot(this.direction),s=Mi.dot(Mi)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,i,s,r){Ol.subVectors(t,e),Lo.subVectors(i,e),Bl.crossVectors(Ol,Lo);let o=this.direction.dot(Bl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$i.subVectors(this.origin,e);const l=a*this.direction.dot(Lo.crossVectors($i,Lo));if(l<0)return null;const c=a*this.direction.dot(Ol.cross($i));if(c<0||l+c>o)return null;const h=-a*$i.dot(Bl);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class ws extends go{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ot(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=Ip,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const nd=new xt,ms=new Lh,No=new mo,id=new W,Fo=new W,Uo=new W,Oo=new W,zl=new W,Bo=new W,sd=new W,zo=new W;class Ot extends jt{constructor(e=new qn,t=new ws){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Bo.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],d=r[l];h!==0&&(zl.fromBufferAttribute(d,e),o?Bo.addScaledVector(zl,h):Bo.addScaledVector(zl.sub(t),h))}t.add(Bo)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),No.copy(i.boundingSphere),No.applyMatrix4(r),ms.copy(e.ray).recast(e.near),!(No.containsPoint(ms.origin)===!1&&(ms.intersectSphere(No,id)===null||ms.origin.distanceToSquared(id)>(e.far-e.near)**2))&&(nd.copy(r).invert(),ms.copy(e.ray).applyMatrix4(nd),!(i.boundingBox!==null&&ms.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ms)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=o[m.materialIndex],_=Math.max(m.start,f.start),E=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let M=_,A=E;M<A;M+=3){const C=a.getX(M),R=a.getX(M+1),y=a.getX(M+2);s=Ho(this,p,e,i,c,h,d,C,R,y),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const _=a.getX(m),E=a.getX(m+1),M=a.getX(m+2);s=Ho(this,o,e,i,c,h,d,_,E,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=o[m.materialIndex],_=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let M=_,A=E;M<A;M+=3){const C=M,R=M+1,y=M+2;s=Ho(this,p,e,i,c,h,d,C,R,y),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const _=m,E=m+1,M=m+2;s=Ho(this,o,e,i,c,h,d,_,E,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function hv(n,e,t,i,s,r,o,a){let l;if(e.side===Yt?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===ci,a),l===null)return null;zo.copy(a),zo.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(zo);return c<t.near||c>t.far?null:{distance:c,point:zo.clone(),object:n}}function Ho(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,Fo),n.getVertexPosition(l,Uo),n.getVertexPosition(c,Oo);const h=hv(n,e,t,i,Fo,Uo,Oo,sd);if(h){const d=new W;Bn.getBarycoord(sd,Fo,Uo,Oo,d),s&&(h.uv=Bn.getInterpolatedAttribute(s,a,l,c,d,new $e)),r&&(h.uv1=Bn.getInterpolatedAttribute(r,a,l,c,d,new $e)),o&&(h.normal=Bn.getInterpolatedAttribute(o,a,l,c,d,new W),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new W,materialIndex:0};Bn.getNormal(Fo,Uo,Oo,u.normal),h.face=u,h.barycoord=d}return h}class Nh extends tn{constructor(e=null,t=1,i=1,s,r,o,a,l,c=Bt,h=Bt,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rd extends Wn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Js=new xt,od=new xt,Vo=[],ad=new Os,uv=new xt,Ir=new Ot,Lr=new mo;class ld extends Ot{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new rd(new Float32Array(i*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,uv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Os),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Js),ad.copy(e.boundingBox).applyMatrix4(Js),this.boundingBox.union(ad)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mo),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Js),Lr.copy(e.boundingSphere).applyMatrix4(Js),this.boundingSphere.union(Lr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Ir.geometry=this.geometry,Ir.material=this.material,Ir.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Lr.copy(this.boundingSphere),Lr.applyMatrix4(i),e.ray.intersectsSphere(Lr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Js),od.multiplyMatrices(i,Js),Ir.matrixWorld=od,Ir.raycast(e,Vo);for(let o=0,a=Vo.length;o<a;o++){const l=Vo[o];l.instanceId=r,l.object=this,t.push(l)}Vo.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new rd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new Nh(new Float32Array(s*this.count),s,this.count,ja,zn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Hl=new W,dv=new W,fv=new Qe;let es=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Hl.subVectors(i,t).cross(dv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Hl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||fv.getNormalMatrix(e),s=this.coplanarPoint(Hl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};const gs=new mo,pv=new $e(.5,.5),Go=new W;class Fh{constructor(e=new es,t=new es,i=new es,s=new es,r=new es,o=new es){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=si,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],v=r[9],m=r[10],p=r[11],_=r[12],E=r[13],M=r[14],A=r[15];if(s[0].setComponents(c-o,f-h,p-g,A-_).normalize(),s[1].setComponents(c+o,f+h,p+g,A+_).normalize(),s[2].setComponents(c+a,f+d,p+v,A+E).normalize(),s[3].setComponents(c-a,f-d,p-v,A-E).normalize(),i)s[4].setComponents(l,u,m,M).normalize(),s[5].setComponents(c-l,f-u,p-m,A-M).normalize();else if(s[4].setComponents(c-l,f-u,p-m,A-M).normalize(),t===si)s[5].setComponents(c+l,f+u,p+m,A+M).normalize();else if(t===ao)s[5].setComponents(l,u,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gs)}intersectsSprite(e){gs.center.set(0,0,0);const t=pv.distanceTo(e.center);return gs.radius=.7071067811865476+t,gs.applyMatrix4(e.matrixWorld),this.intersectsSphere(gs)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Go.x=s.normal.x>0?e.max.x:e.min.x,Go.y=s.normal.y>0?e.max.y:e.min.y,Go.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Go)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Jp extends tn{constructor(e=[],t=Ns,i,s,r,o,a,l,c,h){super(e,t,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cd extends tn{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class lo extends tn{constructor(e,t,i=hi,s,r,o,a=Bt,l=Bt,c,h=Hi,d=1){if(h!==Hi&&h!==Rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Dh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class mv extends lo{constructor(e,t=hi,i=Ns,s,r,o=Bt,a=Bt,l,c=Hi){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,i,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Qp extends tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class qt extends qn{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new hn(c,3)),this.setAttribute("normal",new hn(h,3)),this.setAttribute("uv",new hn(d,2));function g(v,m,p,_,E,M,A,C,R,y,b){const H=M/R,D=A/y,L=M/2,I=A/2,B=C/2,U=R+1,N=y+1;let V=0,q=0;const Q=new W;for(let me=0;me<N;me++){const _e=me*D-I;for(let ie=0;ie<U;ie++){const Ge=ie*H-L;Q[v]=Ge*_,Q[m]=_e*E,Q[p]=B,c.push(Q.x,Q.y,Q.z),Q[v]=0,Q[m]=0,Q[p]=C>0?1:-1,h.push(Q.x,Q.y,Q.z),d.push(ie/R),d.push(1-me/y),V+=1}}for(let me=0;me<y;me++)for(let _e=0;_e<R;_e++){const ie=u+_e+U*me,Ge=u+_e+U*(me+1),at=u+(_e+1)+U*(me+1),lt=u+(_e+1)+U*me;l.push(ie,Ge,lt),l.push(Ge,at,lt),q+=6}a.addGroup(f,q,b),f+=q,u+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ts extends qn{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const v=[],m=i/2;let p=0;_(),o===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new hn(d,3)),this.setAttribute("normal",new hn(u,3)),this.setAttribute("uv",new hn(f,2));function _(){const M=new W,A=new W;let C=0;const R=(t-e)/i;for(let y=0;y<=r;y++){const b=[],H=y/r,D=H*(t-e)+e;for(let L=0;L<=s;L++){const I=L/s,B=I*l+a,U=Math.sin(B),N=Math.cos(B);A.x=D*U,A.y=-H*i+m,A.z=D*N,d.push(A.x,A.y,A.z),M.set(U,R,N).normalize(),u.push(M.x,M.y,M.z),f.push(I,1-H),b.push(g++)}v.push(b)}for(let y=0;y<s;y++)for(let b=0;b<r;b++){const H=v[b][y],D=v[b+1][y],L=v[b+1][y+1],I=v[b][y+1];(e>0||b!==0)&&(h.push(H,D,I),C+=3),(t>0||b!==r-1)&&(h.push(D,L,I),C+=3)}c.addGroup(p,C,0),p+=C}function E(M){const A=g,C=new $e,R=new W;let y=0;const b=M===!0?e:t,H=M===!0?1:-1;for(let L=1;L<=s;L++)d.push(0,m*H,0),u.push(0,H,0),f.push(.5,.5),g++;const D=g;for(let L=0;L<=s;L++){const B=L/s*l+a,U=Math.cos(B),N=Math.sin(B);R.x=b*N,R.y=m*H,R.z=b*U,d.push(R.x,R.y,R.z),u.push(0,H,0),C.x=U*.5+.5,C.y=N*.5*H+.5,f.push(C.x,C.y),g++}for(let L=0;L<s;L++){const I=A+L,B=D+L;M===!0?h.push(B,B+1,I):h.push(B+1,B,I),y+=3}c.addGroup(p,y,M===!0?1:2),p+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ts(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $a extends qn{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,d=e/a,u=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const _=p*u-o;for(let E=0;E<c;E++){const M=E*d-r;g.push(M,-_,0),v.push(0,0,1),m.push(E/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let _=0;_<a;_++){const E=_+c*p,M=_+c*(p+1),A=_+1+c*(p+1),C=_+1+c*p;f.push(E,M,C),f.push(M,A,C)}this.setIndex(f),this.setAttribute("position",new hn(g,3)),this.setAttribute("normal",new hn(v,3)),this.setAttribute("uv",new hn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $a(e.width,e.height,e.widthSegments,e.heightSegments)}}class ns extends qn{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const h=[],d=new W,u=new W,f=[],g=[],v=[],m=[];for(let p=0;p<=i;p++){const _=[],E=p/i;let M=0;p===0&&o===0?M=.5/t:p===i&&l===Math.PI&&(M=-.5/t);for(let A=0;A<=t;A++){const C=A/t;d.x=-e*Math.cos(s+C*r)*Math.sin(o+E*a),d.y=e*Math.cos(o+E*a),d.z=e*Math.sin(s+C*r)*Math.sin(o+E*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(C+M,1-E),_.push(c++)}h.push(_)}for(let p=0;p<i;p++)for(let _=0;_<t;_++){const E=h[p][_+1],M=h[p][_],A=h[p+1][_],C=h[p+1][_+1];(p!==0||o>0)&&f.push(E,M,C),(p!==i-1||l<Math.PI)&&f.push(M,A,C)}this.setIndex(f),this.setAttribute("position",new hn(g,3)),this.setAttribute("normal",new hn(v,3)),this.setAttribute("uv",new hn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ns(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Sr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function rn(n){const e={};for(let t=0;t<n.length;t++){const i=Sr(n[t]);for(const s in i)e[s]=i[s]}return e}function gv(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function em(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const _v={clone:Sr,merge:rn};var vv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class di extends go{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vv,this.fragmentShader=xv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Sr(e.uniforms),this.uniformsGroups=gv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class yv extends di{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class hd extends go{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ot(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ot(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qp,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Mv extends go{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=I_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sv extends go{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ka extends jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ot(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Ev extends Ka{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ot(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Vl=new xt,ud=new W,dd=new W;class tm{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=En,this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fh,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ud.setFromMatrixPosition(e.matrixWorld),t.position.copy(ud),dd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dd),t.updateMatrixWorld(),Vl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ao||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Vl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ko=new W,Wo=new bn,$n=new W;class nm extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ko,Wo,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ko,Wo,$n.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ko,Wo,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ko,Wo,$n.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ki=new W,fd=new $e,pd=new $e;class Sn extends nm{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=th*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(da*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return th*2*Math.atan(Math.tan(da*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ki.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ki.x,Ki.y).multiplyScalar(-e/Ki.z),Ki.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ki.x,Ki.y).multiplyScalar(-e/Ki.z)}getViewSize(e,t){return this.getViewBounds(e,fd,pd),t.subVectors(pd,fd)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(da*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class bv extends tm{constructor(){super(new Sn(90,1,.5,500)),this.isPointLightShadow=!0}}class wv extends Ka{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new bv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Uh extends nm{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Tv extends tm{constructor(){super(new Uh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class md extends Ka{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.target=new jt,this.shadow=new Tv}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Av extends Ka{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Qs=-90,er=1;class Cv extends jt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Sn(Qs,er,e,t);s.layers=this.layers,this.add(s);const r=new Sn(Qs,er,e,t);r.layers=this.layers,this.add(r);const o=new Sn(Qs,er,e,t);o.layers=this.layers,this.add(o);const a=new Sn(Qs,er,e,t);a.layers=this.layers,this.add(a);const l=new Sn(Qs,er,e,t);l.layers=this.layers,this.add(l);const c=new Sn(Qs,er,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===si)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ao)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Rv extends Sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const gd=new xt;class Pv{constructor(e,t,i=0,s=1/0){this.ray=new Lh(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Ih,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):it("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return gd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(gd),this}intersectObject(e,t=!0,i=[]){return nh(e,this,i,t),i.sort(_d),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)nh(e[s],this,i,t);return i.sort(_d),i}}function _d(n,e){return n.distance-e.distance}function nh(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)nh(r[o],e,t,!0)}}class vd{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=nt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(nt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Dv extends Us{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){qe("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function xd(n,e,t,i){const s=Iv(i);switch(t){case Wp:return n*e;case ja:return n*e/s.components*s.byteLength;case Th:return n*e/s.components*s.byteLength;case yr:return n*e*2/s.components*s.byteLength;case Ah:return n*e*2/s.components*s.byteLength;case Xp:return n*e*3/s.components*s.byteLength;case Hn:return n*e*4/s.components*s.byteLength;case Ch:return n*e*4/s.components*s.byteLength;case la:case ca:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ha:case ua:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bc:case Tc:return Math.max(n,16)*Math.max(e,8)/4;case Ec:case wc:return Math.max(n,8)*Math.max(e,8)/2;case Ac:case Cc:case Pc:case Dc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Rc:case Ic:case Lc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Nc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Fc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Uc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Oc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Bc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case zc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Hc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Vc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Gc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case kc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Wc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Xc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case qc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Yc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case jc:case $c:case Kc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Zc:case Jc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Qc:case eh:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Iv(n){switch(n){case En:case Hp:return{byteLength:1,components:1};case ro:case Vp:case zi:return{byteLength:2,components:1};case bh:case wh:return{byteLength:2,components:4};case hi:case Eh:case zn:return{byteLength:4,components:1};case Gp:case kp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mh}}));typeof window<"u"&&(window.__THREE__?qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mh);function im(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Lv(n){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const h=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],v=d[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++u,d[u]=v)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const v=d[f];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Nv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fv=`#ifdef USE_ALPHAHASH
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
#endif`,Uv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ov=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hv=`#ifdef USE_AOMAP
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
#endif`,Vv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gv=`#ifdef USE_BATCHING
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
#endif`,kv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yv=`#ifdef USE_IRIDESCENCE
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
#endif`,jv=`#ifdef USE_BUMPMAP
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
#endif`,$v=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ex=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,tx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,nx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ix=`#define PI 3.141592653589793
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
} // validated`,sx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rx=`vec3 transformedNormal = objectNormal;
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
#endif`,ox=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ax=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hx="gl_FragColor = linearToOutputTexel( gl_FragColor );",ux=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dx=`#ifdef USE_ENVMAP
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
#endif`,fx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,px=`#ifdef USE_ENVMAP
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
#endif`,mx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gx=`#ifdef USE_ENVMAP
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
#endif`,_x=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mx=`#ifdef USE_GRADIENTMAP
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
}`,Sx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ex=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wx=`uniform bool receiveShadow;
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
#endif`,Tx=`#ifdef USE_ENVMAP
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
#endif`,Ax=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Rx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Px=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dx=`PhysicalMaterial material;
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
#endif`,Ix=`uniform sampler2D dfgLUT;
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
}`,Lx=`
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
#endif`,Nx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Fx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ux=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ox=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,kx=`#if defined( USE_POINTS_UV )
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
#endif`,Wx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,jx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$x=`#ifdef USE_MORPHTARGETS
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
#endif`,Kx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ey=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ty=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ny=`#ifdef USE_NORMALMAP
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
#endif`,iy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ry=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,oy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ay=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ly=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,uy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,py=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,my=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_y=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,vy=`float getShadowMask() {
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
}`,xy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yy=`#ifdef USE_SKINNING
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
#endif`,My=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sy=`#ifdef USE_SKINNING
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
#endif`,Ey=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,by=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ty=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ay=`#ifdef USE_TRANSMISSION
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
#endif`,Cy=`#ifdef USE_TRANSMISSION
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
#endif`,Ry=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Py=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Iy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ly=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ny=`uniform sampler2D t2D;
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
}`,Fy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Oy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,By=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zy=`#include <common>
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
}`,Hy=`#if DEPTH_PACKING == 3200
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
}`,Vy=`#define DISTANCE
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
}`,Gy=`#define DISTANCE
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
}`,ky=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xy=`uniform float scale;
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
}`,qy=`uniform vec3 diffuse;
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
}`,Yy=`#include <common>
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
}`,jy=`uniform vec3 diffuse;
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
}`,$y=`#define LAMBERT
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
}`,Ky=`#define LAMBERT
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
}`,Zy=`#define MATCAP
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
}`,Jy=`#define MATCAP
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
}`,Qy=`#define NORMAL
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
}`,eM=`#define NORMAL
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
}`,tM=`#define PHONG
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
}`,nM=`#define PHONG
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
}`,iM=`#define STANDARD
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
}`,sM=`#define STANDARD
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
}`,rM=`#define TOON
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
}`,oM=`#define TOON
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
}`,aM=`uniform float size;
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
}`,lM=`uniform vec3 diffuse;
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
}`,cM=`#include <common>
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
}`,hM=`uniform vec3 color;
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
}`,uM=`uniform float rotation;
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
}`,dM=`uniform vec3 diffuse;
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
}`,et={alphahash_fragment:Nv,alphahash_pars_fragment:Fv,alphamap_fragment:Uv,alphamap_pars_fragment:Ov,alphatest_fragment:Bv,alphatest_pars_fragment:zv,aomap_fragment:Hv,aomap_pars_fragment:Vv,batching_pars_vertex:Gv,batching_vertex:kv,begin_vertex:Wv,beginnormal_vertex:Xv,bsdfs:qv,iridescence_fragment:Yv,bumpmap_pars_fragment:jv,clipping_planes_fragment:$v,clipping_planes_pars_fragment:Kv,clipping_planes_pars_vertex:Zv,clipping_planes_vertex:Jv,color_fragment:Qv,color_pars_fragment:ex,color_pars_vertex:tx,color_vertex:nx,common:ix,cube_uv_reflection_fragment:sx,defaultnormal_vertex:rx,displacementmap_pars_vertex:ox,displacementmap_vertex:ax,emissivemap_fragment:lx,emissivemap_pars_fragment:cx,colorspace_fragment:hx,colorspace_pars_fragment:ux,envmap_fragment:dx,envmap_common_pars_fragment:fx,envmap_pars_fragment:px,envmap_pars_vertex:mx,envmap_physical_pars_fragment:Tx,envmap_vertex:gx,fog_vertex:_x,fog_pars_vertex:vx,fog_fragment:xx,fog_pars_fragment:yx,gradientmap_pars_fragment:Mx,lightmap_pars_fragment:Sx,lights_lambert_fragment:Ex,lights_lambert_pars_fragment:bx,lights_pars_begin:wx,lights_toon_fragment:Ax,lights_toon_pars_fragment:Cx,lights_phong_fragment:Rx,lights_phong_pars_fragment:Px,lights_physical_fragment:Dx,lights_physical_pars_fragment:Ix,lights_fragment_begin:Lx,lights_fragment_maps:Nx,lights_fragment_end:Fx,logdepthbuf_fragment:Ux,logdepthbuf_pars_fragment:Ox,logdepthbuf_pars_vertex:Bx,logdepthbuf_vertex:zx,map_fragment:Hx,map_pars_fragment:Vx,map_particle_fragment:Gx,map_particle_pars_fragment:kx,metalnessmap_fragment:Wx,metalnessmap_pars_fragment:Xx,morphinstance_vertex:qx,morphcolor_vertex:Yx,morphnormal_vertex:jx,morphtarget_pars_vertex:$x,morphtarget_vertex:Kx,normal_fragment_begin:Zx,normal_fragment_maps:Jx,normal_pars_fragment:Qx,normal_pars_vertex:ey,normal_vertex:ty,normalmap_pars_fragment:ny,clearcoat_normal_fragment_begin:iy,clearcoat_normal_fragment_maps:sy,clearcoat_pars_fragment:ry,iridescence_pars_fragment:oy,opaque_fragment:ay,packing:ly,premultiplied_alpha_fragment:cy,project_vertex:hy,dithering_fragment:uy,dithering_pars_fragment:dy,roughnessmap_fragment:fy,roughnessmap_pars_fragment:py,shadowmap_pars_fragment:my,shadowmap_pars_vertex:gy,shadowmap_vertex:_y,shadowmask_pars_fragment:vy,skinbase_vertex:xy,skinning_pars_vertex:yy,skinning_vertex:My,skinnormal_vertex:Sy,specularmap_fragment:Ey,specularmap_pars_fragment:by,tonemapping_fragment:wy,tonemapping_pars_fragment:Ty,transmission_fragment:Ay,transmission_pars_fragment:Cy,uv_pars_fragment:Ry,uv_pars_vertex:Py,uv_vertex:Dy,worldpos_vertex:Iy,background_vert:Ly,background_frag:Ny,backgroundCube_vert:Fy,backgroundCube_frag:Uy,cube_vert:Oy,cube_frag:By,depth_vert:zy,depth_frag:Hy,distance_vert:Vy,distance_frag:Gy,equirect_vert:ky,equirect_frag:Wy,linedashed_vert:Xy,linedashed_frag:qy,meshbasic_vert:Yy,meshbasic_frag:jy,meshlambert_vert:$y,meshlambert_frag:Ky,meshmatcap_vert:Zy,meshmatcap_frag:Jy,meshnormal_vert:Qy,meshnormal_frag:eM,meshphong_vert:tM,meshphong_frag:nM,meshphysical_vert:iM,meshphysical_frag:sM,meshtoon_vert:rM,meshtoon_frag:oM,points_vert:aM,points_frag:lM,shadow_vert:cM,shadow_frag:hM,sprite_vert:uM,sprite_frag:dM},Ee={common:{diffuse:{value:new ot(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ot(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ot(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new ot(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},ii={basic:{uniforms:rn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:rn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new ot(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:rn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new ot(0)},specular:{value:new ot(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:rn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new ot(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:rn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new ot(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:rn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:rn([Ee.points,Ee.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:rn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:rn([Ee.common,Ee.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:rn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:rn([Ee.sprite,Ee.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:rn([Ee.common,Ee.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:rn([Ee.lights,Ee.fog,{color:{value:new ot(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};ii.physical={uniforms:rn([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new ot(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new ot(0)},specularColor:{value:new ot(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const Xo={r:0,b:0,g:0},_s=new ui,fM=new xt;function pM(n,e,t,i,s,r){const o=new ot(0);let a=s===!0?0:1,l,c,h=null,d=0,u=null;function f(_){let E=_.isScene===!0?_.background:null;if(E&&E.isTexture){const M=_.backgroundBlurriness>0;E=e.get(E,M)}return E}function g(_){let E=!1;const M=f(_);M===null?m(o,a):M&&M.isColor&&(m(M,1),E=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(_,E){const M=f(E);M&&(M.isCubeTexture||M.mapping===Ya)?(c===void 0&&(c=new Ot(new qt(1,1,1),new di({name:"BackgroundCubeMaterial",uniforms:Sr(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),_s.copy(E.backgroundRotation),_s.x*=-1,_s.y*=-1,_s.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(_s.y*=-1,_s.z*=-1),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(fM.makeRotationFromEuler(_s)),c.material.toneMapped=st.getTransfer(M.colorSpace)!==ft,(h!==M||d!==M.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=n.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Ot(new $a(2,2),new di({name:"BackgroundMaterial",uniforms:Sr(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=st.getTransfer(M.colorSpace)!==ft,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function m(_,E){_.getRGB(Xo,em(n)),t.buffers.color.setClear(Xo.r,Xo.g,Xo.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,E=1){o.set(_),a=E,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(_){a=_,m(o,a)},render:g,addToRenderList:v,dispose:p}}function mM(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,o=!1;function a(D,L,I,B,U){let N=!1;const V=d(D,B,I,L);r!==V&&(r=V,c(r.object)),N=f(D,B,I,U),N&&g(D,B,I,U),U!==null&&e.update(U,n.ELEMENT_ARRAY_BUFFER),(N||o)&&(o=!1,M(D,L,I,B),U!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return n.createVertexArray()}function c(D){return n.bindVertexArray(D)}function h(D){return n.deleteVertexArray(D)}function d(D,L,I,B){const U=B.wireframe===!0;let N=i[L.id];N===void 0&&(N={},i[L.id]=N);const V=D.isInstancedMesh===!0?D.id:0;let q=N[V];q===void 0&&(q={},N[V]=q);let Q=q[I.id];Q===void 0&&(Q={},q[I.id]=Q);let me=Q[U];return me===void 0&&(me=u(l()),Q[U]=me),me}function u(D){const L=[],I=[],B=[];for(let U=0;U<t;U++)L[U]=0,I[U]=0,B[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:I,attributeDivisors:B,object:D,attributes:{},index:null}}function f(D,L,I,B){const U=r.attributes,N=L.attributes;let V=0;const q=I.getAttributes();for(const Q in q)if(q[Q].location>=0){const _e=U[Q];let ie=N[Q];if(ie===void 0&&(Q==="instanceMatrix"&&D.instanceMatrix&&(ie=D.instanceMatrix),Q==="instanceColor"&&D.instanceColor&&(ie=D.instanceColor)),_e===void 0||_e.attribute!==ie||ie&&_e.data!==ie.data)return!0;V++}return r.attributesNum!==V||r.index!==B}function g(D,L,I,B){const U={},N=L.attributes;let V=0;const q=I.getAttributes();for(const Q in q)if(q[Q].location>=0){let _e=N[Q];_e===void 0&&(Q==="instanceMatrix"&&D.instanceMatrix&&(_e=D.instanceMatrix),Q==="instanceColor"&&D.instanceColor&&(_e=D.instanceColor));const ie={};ie.attribute=_e,_e&&_e.data&&(ie.data=_e.data),U[Q]=ie,V++}r.attributes=U,r.attributesNum=V,r.index=B}function v(){const D=r.newAttributes;for(let L=0,I=D.length;L<I;L++)D[L]=0}function m(D){p(D,0)}function p(D,L){const I=r.newAttributes,B=r.enabledAttributes,U=r.attributeDivisors;I[D]=1,B[D]===0&&(n.enableVertexAttribArray(D),B[D]=1),U[D]!==L&&(n.vertexAttribDivisor(D,L),U[D]=L)}function _(){const D=r.newAttributes,L=r.enabledAttributes;for(let I=0,B=L.length;I<B;I++)L[I]!==D[I]&&(n.disableVertexAttribArray(I),L[I]=0)}function E(D,L,I,B,U,N,V){V===!0?n.vertexAttribIPointer(D,L,I,U,N):n.vertexAttribPointer(D,L,I,B,U,N)}function M(D,L,I,B){v();const U=B.attributes,N=I.getAttributes(),V=L.defaultAttributeValues;for(const q in N){const Q=N[q];if(Q.location>=0){let me=U[q];if(me===void 0&&(q==="instanceMatrix"&&D.instanceMatrix&&(me=D.instanceMatrix),q==="instanceColor"&&D.instanceColor&&(me=D.instanceColor)),me!==void 0){const _e=me.normalized,ie=me.itemSize,Ge=e.get(me);if(Ge===void 0)continue;const at=Ge.buffer,lt=Ge.type,se=Ge.bytesPerElement,pe=lt===n.INT||lt===n.UNSIGNED_INT||me.gpuType===Eh;if(me.isInterleavedBufferAttribute){const xe=me.data,Ye=xe.stride,Ve=me.offset;if(xe.isInstancedInterleavedBuffer){for(let Xe=0;Xe<Q.locationSize;Xe++)p(Q.location+Xe,xe.meshPerAttribute);D.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let Xe=0;Xe<Q.locationSize;Xe++)m(Q.location+Xe);n.bindBuffer(n.ARRAY_BUFFER,at);for(let Xe=0;Xe<Q.locationSize;Xe++)E(Q.location+Xe,ie/Q.locationSize,lt,_e,Ye*se,(Ve+ie/Q.locationSize*Xe)*se,pe)}else{if(me.isInstancedBufferAttribute){for(let xe=0;xe<Q.locationSize;xe++)p(Q.location+xe,me.meshPerAttribute);D.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let xe=0;xe<Q.locationSize;xe++)m(Q.location+xe);n.bindBuffer(n.ARRAY_BUFFER,at);for(let xe=0;xe<Q.locationSize;xe++)E(Q.location+xe,ie/Q.locationSize,lt,_e,ie*se,ie/Q.locationSize*xe*se,pe)}}else if(V!==void 0){const _e=V[q];if(_e!==void 0)switch(_e.length){case 2:n.vertexAttrib2fv(Q.location,_e);break;case 3:n.vertexAttrib3fv(Q.location,_e);break;case 4:n.vertexAttrib4fv(Q.location,_e);break;default:n.vertexAttrib1fv(Q.location,_e)}}}}_()}function A(){b();for(const D in i){const L=i[D];for(const I in L){const B=L[I];for(const U in B){const N=B[U];for(const V in N)h(N[V].object),delete N[V];delete B[U]}}delete i[D]}}function C(D){if(i[D.id]===void 0)return;const L=i[D.id];for(const I in L){const B=L[I];for(const U in B){const N=B[U];for(const V in N)h(N[V].object),delete N[V];delete B[U]}}delete i[D.id]}function R(D){for(const L in i){const I=i[L];for(const B in I){const U=I[B];if(U[D.id]===void 0)continue;const N=U[D.id];for(const V in N)h(N[V].object),delete N[V];delete U[D.id]}}}function y(D){for(const L in i){const I=i[L],B=D.isInstancedMesh===!0?D.id:0,U=I[B];if(U!==void 0){for(const N in U){const V=U[N];for(const q in V)h(V[q].object),delete V[q];delete U[N]}delete I[B],Object.keys(I).length===0&&delete i[L]}}}function b(){H(),o=!0,r!==s&&(r=s,c(r.object))}function H(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:b,resetDefaultState:H,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfObject:y,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:_}}function gM(n,e,t){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function o(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),t.update(h,i,d))}function a(c,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];t.update(f,i,1)}function l(c,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let v=0;v<d;v++)g+=h[v]*u[v];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function _M(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Hn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const y=R===zi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==En&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==zn&&!y)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(qe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),E=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=n.getParameter(n.MAX_SAMPLES),C=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:_,maxVaryings:E,maxFragmentUniforms:M,maxSamples:A,samples:C}}function vM(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new es,a=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const _=r?0:i,E=_*4;let M=p.clippingState||null;l.value=M,M=h(g,u,E,f);for(let A=0;A!==E;++A)M[A]=t[A];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,_=u.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,M=f;E!==v;++E,M+=4)o.copy(d[E]).applyMatrix4(_,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}const ss=4,yd=[.125,.215,.35,.446,.526,.582],Ts=20,xM=256,Nr=new Uh,Md=new ot;let Gl=null,kl=0,Wl=0,Xl=!1;const yM=new W;class Sd{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=yM}=r;Gl=this._renderer.getRenderTarget(),kl=this._renderer.getActiveCubeFace(),Wl=this._renderer.getActiveMipmapLevel(),Xl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Gl,kl,Wl),this._renderer.xr.enabled=Xl,e.scissorTest=!1,tr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ns||e.mapping===xr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Gl=this._renderer.getRenderTarget(),kl=this._renderer.getActiveCubeFace(),Wl=this._renderer.getActiveMipmapLevel(),Xl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:en,minFilter:en,generateMipmaps:!1,type:zi,format:Hn,colorSpace:Mr,depthBuffer:!1},s=Ed(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ed(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=MM(r)),this._blurMaterial=EM(r,e,t),this._ggxMaterial=SM(r,e,t)}return s}_compileMaterial(e){const t=new Ot(new qn,e);this._renderer.compile(t,Nr)}_sceneToCubeUV(e,t,i,s,r){const l=new Sn(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Md),d.toneMapping=oi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ot(new qt,new ws({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let p=!1;const _=e.background;_?_.isColor&&(m.color.copy(_),e.background=null,p=!0):(m.color.copy(Md),p=!0);for(let E=0;E<6;E++){const M=E%3;M===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[E],r.y,r.z)):M===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[E]));const A=this._cubeSize;tr(s,M*A,E>2?A:0,A,A),d.setRenderTarget(s),p&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ns||e.mapping===xr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;tr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Nr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:g}=this,v=this._sizeLods[i],m=3*v*(i>g-ss?i-g+ss:0),p=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=g-t,tr(r,m,p,3*v,2*v),s.setRenderTarget(r),s.render(a,Nr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=g-i,tr(e,m,p,3*v,2*v),s.setRenderTarget(e),s.render(a,Nr)}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&it("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=c;const u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ts-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):Ts;m>Ts&&qe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ts}`);const p=[];let _=0;for(let R=0;R<Ts;++R){const y=R/v,b=Math.exp(-y*y/2);p.push(b),R===0?_+=b:R<m&&(_+=2*b)}for(let R=0;R<p.length;R++)p[R]=p[R]/_;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:E}=this;u.dTheta.value=g,u.mipInt.value=E-i;const M=this._sizeLods[s],A=3*M*(s>E-ss?s-E+ss:0),C=4*(this._cubeSize-M);tr(t,A,C,3*M,2*M),l.setRenderTarget(t),l.render(d,Nr)}}function MM(n){const e=[],t=[],i=[];let s=n;const r=n-ss+1+yd.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-ss?l=yd[o-n+ss-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,m=2,p=1,_=new Float32Array(v*g*f),E=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let C=0;C<f;C++){const R=C%3*2/3-1,y=C>2?0:-1,b=[R,y,0,R+2/3,y,0,R+2/3,y+1,0,R,y,0,R+2/3,y+1,0,R,y+1,0];_.set(b,v*g*C),E.set(u,m*g*C);const H=[C,C,C,C,C,C];M.set(H,p*g*C)}const A=new qn;A.setAttribute("position",new Wn(_,v)),A.setAttribute("uv",new Wn(E,m)),A.setAttribute("faceIndex",new Wn(M,p)),i.push(new Ot(A,null)),s>ss&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Ed(n,e,t){const i=new ai(n,e,t);return i.texture.mapping=Ya,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function tr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function SM(n,e,t){return new di({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:xM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function EM(n,e,t){const i=new Float32Array(Ts),s=new W(0,1,0);return new di({name:"SphericalGaussianBlur",defines:{n:Ts,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function bd(){return new di({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function wd(){return new di({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ni,depthTest:!1,depthWrite:!1})}function Za(){return`

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
	`}class sm extends ai{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Jp(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new qt(5,5,5),r=new di({name:"CubemapFromEquirect",uniforms:Sr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yt,blending:Ni});r.uniforms.tEquirect.value=t;const o=new Ot(s,r),a=t.minFilter;return t.minFilter===Cs&&(t.minFilter=en),new Cv(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}function bM(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===ml||f===gl)if(e.has(u)){const g=e.get(u).texture;return a(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const v=new sm(g.height);return v.fromEquirectangularTexture(n,u),e.set(u,v),u.addEventListener("dispose",c),a(v.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){const f=u.mapping,g=f===ml||f===gl,v=f===Ns||f===xr;if(g||v){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Sd(n)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const _=u.image;return g&&_&&_.height>0||v&&_&&l(_)?(i===null&&(i=new Sd(n)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,f){return f===ml?u.mapping=Ns:f===gl&&(u.mapping=xr),u}function l(u){let f=0;const g=6;for(let v=0;v<g;v++)u[v]!==void 0&&f++;return f===g}function c(u){const f=u.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function wM(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Ra("WebGLRenderer: "+i+" extension not supported."),s}}}function TM(n,e,t,i){const s={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)e.update(u[f],n.ARRAY_BUFFER)}function c(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(g===void 0)return;if(f!==null){const _=f.array;v=f.version;for(let E=0,M=_.length;E<M;E+=3){const A=_[E+0],C=_[E+1],R=_[E+2];u.push(A,C,C,R,R,A)}}else{const _=g.array;v=g.version;for(let E=0,M=_.length/3-1;E<M;E+=3){const A=E+0,C=E+1,R=E+2;u.push(A,C,C,R,R,A)}}const m=new(g.count>=65535?Zp:Kp)(u,1);m.version=v;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function AM(n,e,t){let i;function s(u){i=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){n.drawElements(i,f,r,u*o),t.update(f,i,1)}function c(u,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,u*o,g),t.update(f,i,g))}function h(u,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function d(u,f,g,v){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,u,0,v,0,g);let p=0;for(let _=0;_<g;_++)p+=f[_]*v[_];t.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function CM(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:it("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function RM(n,e,t){const i=new WeakMap,s=new At;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(a);if(u===void 0||u.count!==d){let H=function(){y.dispose(),i.delete(a),a.removeEventListener("dispose",H)};var f=H;u!==void 0&&u.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let M=0;g===!0&&(M=1),v===!0&&(M=2),m===!0&&(M=3);let A=a.attributes.position.count*M,C=1;A>e.maxTextureSize&&(C=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const R=new Float32Array(A*C*4*d),y=new jp(R,A,C,d);y.type=zn,y.needsUpdate=!0;const b=M*4;for(let D=0;D<d;D++){const L=p[D],I=_[D],B=E[D],U=A*C*4*D;for(let N=0;N<L.count;N++){const V=N*b;g===!0&&(s.fromBufferAttribute(L,N),R[U+V+0]=s.x,R[U+V+1]=s.y,R[U+V+2]=s.z,R[U+V+3]=0),v===!0&&(s.fromBufferAttribute(I,N),R[U+V+4]=s.x,R[U+V+5]=s.y,R[U+V+6]=s.z,R[U+V+7]=0),m===!0&&(s.fromBufferAttribute(B,N),R[U+V+8]=s.x,R[U+V+9]=s.y,R[U+V+10]=s.z,R[U+V+11]=B.itemSize===4?s.w:1)}}u={count:d,texture:y,size:new $e(A,C)},i.set(a,u),a.addEventListener("dispose",H)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",v),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function PM(n,e,t,i,s){let r=new WeakMap;function o(c){const h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}const DM={[Lp]:"LINEAR_TONE_MAPPING",[Np]:"REINHARD_TONE_MAPPING",[Fp]:"CINEON_TONE_MAPPING",[Sh]:"ACES_FILMIC_TONE_MAPPING",[Op]:"AGX_TONE_MAPPING",[Bp]:"NEUTRAL_TONE_MAPPING",[Up]:"CUSTOM_TONE_MAPPING"};function IM(n,e,t,i,s){const r=new ai(e,t,{type:n,depthBuffer:i,stencilBuffer:s}),o=new ai(e,t,{type:zi,depthBuffer:!1,stencilBuffer:!1}),a=new qn;a.setAttribute("position",new hn([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new hn([0,2,0,0,2,0],2));const l=new yv({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Ot(a,l),h=new Uh(-1,1,1,-1,0,1);let d=null,u=null,f=!1,g,v=null,m=[],p=!1;this.setSize=function(_,E){r.setSize(_,E),o.setSize(_,E);for(let M=0;M<m.length;M++){const A=m[M];A.setSize&&A.setSize(_,E)}},this.setEffects=function(_){m=_,p=m.length>0&&m[0].isRenderPass===!0;const E=r.width,M=r.height;for(let A=0;A<m.length;A++){const C=m[A];C.setSize&&C.setSize(E,M)}},this.begin=function(_,E){if(f||_.toneMapping===oi&&m.length===0)return!1;if(v=E,E!==null){const M=E.width,A=E.height;(r.width!==M||r.height!==A)&&this.setSize(M,A)}return p===!1&&_.setRenderTarget(r),g=_.toneMapping,_.toneMapping=oi,!0},this.hasRenderPass=function(){return p},this.end=function(_,E){_.toneMapping=g,f=!0;let M=r,A=o;for(let C=0;C<m.length;C++){const R=m[C];if(R.enabled!==!1&&(R.render(_,A,M,E),R.needsSwap!==!1)){const y=M;M=A,A=y}}if(d!==_.outputColorSpace||u!==_.toneMapping){d=_.outputColorSpace,u=_.toneMapping,l.defines={},st.getTransfer(d)===ft&&(l.defines.SRGB_TRANSFER="");const C=DM[u];C&&(l.defines[C]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,_.setRenderTarget(v),_.render(c,h),v=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),o.dispose(),a.dispose(),l.dispose()}}const rm=new tn,ih=new lo(1,1),om=new jp,am=new Z_,lm=new Jp,Td=[],Ad=[],Cd=new Float32Array(16),Rd=new Float32Array(9),Pd=new Float32Array(4);function Er(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Td[s];if(r===void 0&&(r=new Float32Array(s),Td[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function zt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ht(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ja(n,e){let t=Ad[e];t===void 0&&(t=new Int32Array(e),Ad[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function LM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function NM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;n.uniform2fv(this.addr,e),Ht(t,e)}}function FM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(zt(t,e))return;n.uniform3fv(this.addr,e),Ht(t,e)}}function UM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;n.uniform4fv(this.addr,e),Ht(t,e)}}function OM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(zt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,i))return;Pd.set(i),n.uniformMatrix2fv(this.addr,!1,Pd),Ht(t,i)}}function BM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(zt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,i))return;Rd.set(i),n.uniformMatrix3fv(this.addr,!1,Rd),Ht(t,i)}}function zM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(zt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(zt(t,i))return;Cd.set(i),n.uniformMatrix4fv(this.addr,!1,Cd),Ht(t,i)}}function HM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function VM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;n.uniform2iv(this.addr,e),Ht(t,e)}}function GM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;n.uniform3iv(this.addr,e),Ht(t,e)}}function kM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;n.uniform4iv(this.addr,e),Ht(t,e)}}function WM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function XM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(zt(t,e))return;n.uniform2uiv(this.addr,e),Ht(t,e)}}function qM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(zt(t,e))return;n.uniform3uiv(this.addr,e),Ht(t,e)}}function YM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(zt(t,e))return;n.uniform4uiv(this.addr,e),Ht(t,e)}}function jM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ih.compareFunction=t.isReversedDepthBuffer()?Ph:Rh,r=ih):r=rm,t.setTexture2D(e||r,s)}function $M(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||am,s)}function KM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||lm,s)}function ZM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||om,s)}function JM(n){switch(n){case 5126:return LM;case 35664:return NM;case 35665:return FM;case 35666:return UM;case 35674:return OM;case 35675:return BM;case 35676:return zM;case 5124:case 35670:return HM;case 35667:case 35671:return VM;case 35668:case 35672:return GM;case 35669:case 35673:return kM;case 5125:return WM;case 36294:return XM;case 36295:return qM;case 36296:return YM;case 35678:case 36198:case 36298:case 36306:case 35682:return jM;case 35679:case 36299:case 36307:return $M;case 35680:case 36300:case 36308:case 36293:return KM;case 36289:case 36303:case 36311:case 36292:return ZM}}function QM(n,e){n.uniform1fv(this.addr,e)}function eS(n,e){const t=Er(e,this.size,2);n.uniform2fv(this.addr,t)}function tS(n,e){const t=Er(e,this.size,3);n.uniform3fv(this.addr,t)}function nS(n,e){const t=Er(e,this.size,4);n.uniform4fv(this.addr,t)}function iS(n,e){const t=Er(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function sS(n,e){const t=Er(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function rS(n,e){const t=Er(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function oS(n,e){n.uniform1iv(this.addr,e)}function aS(n,e){n.uniform2iv(this.addr,e)}function lS(n,e){n.uniform3iv(this.addr,e)}function cS(n,e){n.uniform4iv(this.addr,e)}function hS(n,e){n.uniform1uiv(this.addr,e)}function uS(n,e){n.uniform2uiv(this.addr,e)}function dS(n,e){n.uniform3uiv(this.addr,e)}function fS(n,e){n.uniform4uiv(this.addr,e)}function pS(n,e,t){const i=this.cache,s=e.length,r=Ja(t,s);zt(i,r)||(n.uniform1iv(this.addr,r),Ht(i,r));let o;this.type===n.SAMPLER_2D_SHADOW?o=ih:o=rm;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function mS(n,e,t){const i=this.cache,s=e.length,r=Ja(t,s);zt(i,r)||(n.uniform1iv(this.addr,r),Ht(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||am,r[o])}function gS(n,e,t){const i=this.cache,s=e.length,r=Ja(t,s);zt(i,r)||(n.uniform1iv(this.addr,r),Ht(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||lm,r[o])}function _S(n,e,t){const i=this.cache,s=e.length,r=Ja(t,s);zt(i,r)||(n.uniform1iv(this.addr,r),Ht(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||om,r[o])}function vS(n){switch(n){case 5126:return QM;case 35664:return eS;case 35665:return tS;case 35666:return nS;case 35674:return iS;case 35675:return sS;case 35676:return rS;case 5124:case 35670:return oS;case 35667:case 35671:return aS;case 35668:case 35672:return lS;case 35669:case 35673:return cS;case 5125:return hS;case 36294:return uS;case 36295:return dS;case 36296:return fS;case 35678:case 36198:case 36298:case 36306:case 35682:return pS;case 35679:case 36299:case 36307:return mS;case 35680:case 36300:case 36308:case 36293:return gS;case 36289:case 36303:case 36311:case 36292:return _S}}class xS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=JM(t.type)}}class yS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vS(t.type)}}class MS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const ql=/(\w+)(\])?(\[|\.)?/g;function Dd(n,e){n.seq.push(e),n.map[e.id]=e}function SS(n,e,t){const i=n.name,s=i.length;for(ql.lastIndex=0;;){const r=ql.exec(i),o=ql.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Dd(t,c===void 0?new xS(a,n,e):new yS(a,n,e));break}else{let d=t.map[a];d===void 0&&(d=new MS(a),Dd(t,d)),t=d}}}class fa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);SS(a,l,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Id(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const ES=37297;let bS=0;function wS(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Ld=new Qe;function TS(n){st._getMatrix(Ld,st.workingColorSpace,n);const e=`mat3( ${Ld.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case Aa:return[e,"LinearTransferOETF"];case ft:return[e,"sRGBTransferOETF"];default:return qe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Nd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+wS(n.getShaderSource(e),a)}else return r}function AS(n,e){const t=TS(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const CS={[Lp]:"Linear",[Np]:"Reinhard",[Fp]:"Cineon",[Sh]:"ACESFilmic",[Op]:"AgX",[Bp]:"Neutral",[Up]:"Custom"};function RS(n,e){const t=CS[e];return t===void 0?(qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const qo=new W;function PS(){st.getLuminanceCoefficients(qo);const n=qo.x.toFixed(4),e=qo.y.toFixed(4),t=qo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function DS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gr).join(`
`)}function IS(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function LS(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Gr(n){return n!==""}function Fd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ud(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const NS=/^[ \t]*#include +<([\w\d./]+)>/gm;function sh(n){return n.replace(NS,US)}const FS=new Map;function US(n,e){let t=et[e];if(t===void 0){const i=FS.get(e);if(i!==void 0)t=et[i],qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return sh(t)}const OS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Od(n){return n.replace(OS,BS)}function BS(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bd(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}const zS={[aa]:"SHADOWMAP_TYPE_PCF",[Vr]:"SHADOWMAP_TYPE_VSM"};function HS(n){return zS[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const VS={[Ns]:"ENVMAP_TYPE_CUBE",[xr]:"ENVMAP_TYPE_CUBE",[Ya]:"ENVMAP_TYPE_CUBE_UV"};function GS(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":VS[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const kS={[xr]:"ENVMAP_MODE_REFRACTION"};function WS(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":kS[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const XS={[Ip]:"ENVMAP_BLENDING_MULTIPLY",[R_]:"ENVMAP_BLENDING_MIX",[P_]:"ENVMAP_BLENDING_ADD"};function qS(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":XS[n.combine]||"ENVMAP_BLENDING_NONE"}function YS(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function jS(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=HS(t),c=GS(t),h=WS(t),d=qS(t),u=YS(t),f=DS(t),g=IS(r),v=s.createProgram();let m,p,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Gr).join(`
`),p.length>0&&(p+=`
`)):(m=[Bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gr).join(`
`),p=[Bd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?et.tonemapping_pars_fragment:"",t.toneMapping!==oi?RS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,AS("linearToOutputTexel",t.outputColorSpace),PS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Gr).join(`
`)),o=sh(o),o=Fd(o,t),o=Ud(o,t),a=sh(a),a=Fd(a,t),a=Ud(a,t),o=Od(o),a=Od(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Gu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=_+m+o,M=_+p+a,A=Id(s,s.VERTEX_SHADER,E),C=Id(s,s.FRAGMENT_SHADER,M);s.attachShader(v,A),s.attachShader(v,C),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(D){if(n.debug.checkShaderErrors){const L=s.getProgramInfoLog(v)||"",I=s.getShaderInfoLog(A)||"",B=s.getShaderInfoLog(C)||"",U=L.trim(),N=I.trim(),V=B.trim();let q=!0,Q=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,A,C);else{const me=Nd(s,A,"vertex"),_e=Nd(s,C,"fragment");it("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+U+`
`+me+`
`+_e)}else U!==""?qe("WebGLProgram: Program Info Log:",U):(N===""||V==="")&&(Q=!1);Q&&(D.diagnostics={runnable:q,programLog:U,vertexShader:{log:N,prefix:m},fragmentShader:{log:V,prefix:p}})}s.deleteShader(A),s.deleteShader(C),y=new fa(s,v),b=LS(s,v)}let y;this.getUniforms=function(){return y===void 0&&R(this),y};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=s.getProgramParameter(v,ES)),H},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=bS++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=C,this}let $S=0;class KS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new ZS(e),t.set(e,i)),i}}class ZS{constructor(e){this.id=$S++,this.code=e,this.usedTimes=0}}function JS(n,e,t,i,s,r){const o=new Ih,a=new KS,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function v(y,b,H,D,L){const I=D.fog,B=L.geometry,U=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,N=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,V=e.get(y.envMap||U,N),q=V&&V.mapping===Ya?V.image.height:null,Q=f[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&qe("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const me=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,_e=me!==void 0?me.length:0;let ie=0;B.morphAttributes.position!==void 0&&(ie=1),B.morphAttributes.normal!==void 0&&(ie=2),B.morphAttributes.color!==void 0&&(ie=3);let Ge,at,lt,se;if(Q){const dt=ii[Q];Ge=dt.vertexShader,at=dt.fragmentShader}else Ge=y.vertexShader,at=y.fragmentShader,a.update(y),lt=a.getVertexShaderID(y),se=a.getFragmentShaderID(y);const pe=n.getRenderTarget(),xe=n.state.buffers.depth.getReversed(),Ye=L.isInstancedMesh===!0,Ve=L.isBatchedMesh===!0,Xe=!!y.map,F=!!y.matcap,z=!!V,X=!!y.aoMap,oe=!!y.lightMap,Z=!!y.bumpMap,ae=!!y.normalMap,P=!!y.displacementMap,he=!!y.emissiveMap,le=!!y.metalnessMap,re=!!y.roughnessMap,ce=y.anisotropy>0,w=y.clearcoat>0,x=y.dispersion>0,O=y.iridescence>0,Y=y.sheen>0,ee=y.transmission>0,j=ce&&!!y.anisotropyMap,Me=w&&!!y.clearcoatMap,de=w&&!!y.clearcoatNormalMap,De=w&&!!y.clearcoatRoughnessMap,Ue=O&&!!y.iridescenceMap,ue=O&&!!y.iridescenceThicknessMap,ge=Y&&!!y.sheenColorMap,Se=Y&&!!y.sheenRoughnessMap,Ce=!!y.specularMap,Re=!!y.specularColorMap,Ze=!!y.specularIntensityMap,G=ee&&!!y.transmissionMap,ye=ee&&!!y.thicknessMap,ve=!!y.gradientMap,Ie=!!y.alphaMap,fe=y.alphaTest>0,te=!!y.alphaHash,Ne=!!y.extensions;let je=oi;y.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(je=n.toneMapping);const St={shaderID:Q,shaderType:y.type,shaderName:y.name,vertexShader:Ge,fragmentShader:at,defines:y.defines,customVertexShaderID:lt,customFragmentShaderID:se,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ve,batchingColor:Ve&&L._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&L.instanceColor!==null,instancingMorph:Ye&&L.morphTexture!==null,outputColorSpace:pe===null?n.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:Mr,alphaToCoverage:!!y.alphaToCoverage,map:Xe,matcap:F,envMap:z,envMapMode:z&&V.mapping,envMapCubeUVHeight:q,aoMap:X,lightMap:oe,bumpMap:Z,normalMap:ae,displacementMap:P,emissiveMap:he,normalMapObjectSpace:ae&&y.normalMapType===L_,normalMapTangentSpace:ae&&y.normalMapType===qp,metalnessMap:le,roughnessMap:re,anisotropy:ce,anisotropyMap:j,clearcoat:w,clearcoatMap:Me,clearcoatNormalMap:de,clearcoatRoughnessMap:De,dispersion:x,iridescence:O,iridescenceMap:Ue,iridescenceThicknessMap:ue,sheen:Y,sheenColorMap:ge,sheenRoughnessMap:Se,specularMap:Ce,specularColorMap:Re,specularIntensityMap:Ze,transmission:ee,transmissionMap:G,thicknessMap:ye,gradientMap:ve,opaque:y.transparent===!1&&y.blending===mr&&y.alphaToCoverage===!1,alphaMap:Ie,alphaTest:fe,alphaHash:te,combine:y.combine,mapUv:Xe&&g(y.map.channel),aoMapUv:X&&g(y.aoMap.channel),lightMapUv:oe&&g(y.lightMap.channel),bumpMapUv:Z&&g(y.bumpMap.channel),normalMapUv:ae&&g(y.normalMap.channel),displacementMapUv:P&&g(y.displacementMap.channel),emissiveMapUv:he&&g(y.emissiveMap.channel),metalnessMapUv:le&&g(y.metalnessMap.channel),roughnessMapUv:re&&g(y.roughnessMap.channel),anisotropyMapUv:j&&g(y.anisotropyMap.channel),clearcoatMapUv:Me&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:de&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:ue&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:Se&&g(y.sheenRoughnessMap.channel),specularMapUv:Ce&&g(y.specularMap.channel),specularColorMapUv:Re&&g(y.specularColorMap.channel),specularIntensityMapUv:Ze&&g(y.specularIntensityMap.channel),transmissionMapUv:G&&g(y.transmissionMap.channel),thicknessMapUv:ye&&g(y.thicknessMap.channel),alphaMapUv:Ie&&g(y.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ae||ce),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!B.attributes.uv&&(Xe||Ie),fog:!!I,useFog:y.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||B.attributes.normal===void 0&&ae===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xe,skinning:L.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:ie,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&H.length>0,shadowMapType:n.shadowMap.type,toneMapping:je,decodeVideoTexture:Xe&&y.map.isVideoTexture===!0&&st.getTransfer(y.map.colorSpace)===ft,decodeVideoTextureEmissive:he&&y.emissiveMap.isVideoTexture===!0&&st.getTransfer(y.emissiveMap.colorSpace)===ft,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Di,flipSided:y.side===Yt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ne&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&y.extensions.multiDraw===!0||Ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return St.vertexUv1s=l.has(1),St.vertexUv2s=l.has(2),St.vertexUv3s=l.has(3),l.clear(),St}function m(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const H in y.defines)b.push(H),b.push(y.defines[H]);return y.isRawShaderMaterial===!1&&(p(b,y),_(b,y),b.push(n.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function p(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function _(y,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),y.push(o.mask)}function E(y){const b=f[y.type];let H;if(b){const D=ii[b];H=_v.clone(D.uniforms)}else H=y.uniforms;return H}function M(y,b){let H=h.get(b);return H!==void 0?++H.usedTimes:(H=new jS(n,b,y,s),c.push(H),h.set(b,H)),H}function A(y){if(--y.usedTimes===0){const b=c.indexOf(y);c[b]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function C(y){a.remove(y)}function R(){a.dispose()}return{getParameters:v,getProgramCacheKey:m,getUniforms:E,acquireProgram:M,releaseProgram:A,releaseShaderCache:C,programs:c,dispose:R}}function QS(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function eE(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function zd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Hd(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,g,v,m,p){let _=n[e];return _===void 0?(_={id:u.id,object:u,geometry:f,material:g,materialVariant:o(u),groupOrder:v,renderOrder:u.renderOrder,z:m,group:p},n[e]=_):(_.id=u.id,_.object=u,_.geometry=f,_.material=g,_.materialVariant=o(u),_.groupOrder=v,_.renderOrder=u.renderOrder,_.z=m,_.group=p),e++,_}function l(u,f,g,v,m,p){const _=a(u,f,g,v,m,p);g.transmission>0?i.push(_):g.transparent===!0?s.push(_):t.push(_)}function c(u,f,g,v,m,p){const _=a(u,f,g,v,m,p);g.transmission>0?i.unshift(_):g.transparent===!0?s.unshift(_):t.unshift(_)}function h(u,f){t.length>1&&t.sort(u||eE),i.length>1&&i.sort(f||zd),s.length>1&&s.sort(f||zd)}function d(){for(let u=e,f=n.length;u<f;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function tE(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Hd,n.set(i,[o])):s>=r.length?(o=new Hd,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function nE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new W,color:new ot};break;case"SpotLight":t={position:new W,direction:new W,color:new ot,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new ot,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new ot,groundColor:new ot};break;case"RectAreaLight":t={color:new ot,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function iE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let sE=0;function rE(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function oE(n){const e=new nE,t=iE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);const s=new W,r=new xt,o=new xt;function a(c){let h=0,d=0,u=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,_=0,E=0,M=0,A=0,C=0,R=0;c.sort(rE);for(let b=0,H=c.length;b<H;b++){const D=c[b],L=D.color,I=D.intensity,B=D.distance;let U=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===yr?U=D.shadow.map.texture:U=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=L.r*I,d+=L.g*I,u+=L.b*I;else if(D.isLightProbe){for(let N=0;N<9;N++)i.probe[N].addScaledVector(D.sh.coefficients[N],I);R++}else if(D.isDirectionalLight){const N=e.get(D);if(N.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const V=D.shadow,q=t.get(D);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,i.directionalShadow[f]=q,i.directionalShadowMap[f]=U,i.directionalShadowMatrix[f]=D.shadow.matrix,_++}i.directional[f]=N,f++}else if(D.isSpotLight){const N=e.get(D);N.position.setFromMatrixPosition(D.matrixWorld),N.color.copy(L).multiplyScalar(I),N.distance=B,N.coneCos=Math.cos(D.angle),N.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),N.decay=D.decay,i.spot[v]=N;const V=D.shadow;if(D.map&&(i.spotLightMap[A]=D.map,A++,V.updateMatrices(D),D.castShadow&&C++),i.spotLightMatrix[v]=V.matrix,D.castShadow){const q=t.get(D);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,i.spotShadow[v]=q,i.spotShadowMap[v]=U,M++}v++}else if(D.isRectAreaLight){const N=e.get(D);N.color.copy(L).multiplyScalar(I),N.halfWidth.set(D.width*.5,0,0),N.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=N,m++}else if(D.isPointLight){const N=e.get(D);if(N.color.copy(D.color).multiplyScalar(D.intensity),N.distance=D.distance,N.decay=D.decay,D.castShadow){const V=D.shadow,q=t.get(D);q.shadowIntensity=V.intensity,q.shadowBias=V.bias,q.shadowNormalBias=V.normalBias,q.shadowRadius=V.radius,q.shadowMapSize=V.mapSize,q.shadowCameraNear=V.camera.near,q.shadowCameraFar=V.camera.far,i.pointShadow[g]=q,i.pointShadowMap[g]=U,i.pointShadowMatrix[g]=D.shadow.matrix,E++}i.point[g]=N,g++}else if(D.isHemisphereLight){const N=e.get(D);N.skyColor.copy(D.color).multiplyScalar(I),N.groundColor.copy(D.groundColor).multiplyScalar(I),i.hemi[p]=N,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const y=i.hash;(y.directionalLength!==f||y.pointLength!==g||y.spotLength!==v||y.rectAreaLength!==m||y.hemiLength!==p||y.numDirectionalShadows!==_||y.numPointShadows!==E||y.numSpotShadows!==M||y.numSpotMaps!==A||y.numLightProbes!==R)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=M+A-C,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=R,y.directionalLength=f,y.pointLength=g,y.spotLength=v,y.rectAreaLength=m,y.hemiLength=p,y.numDirectionalShadows=_,y.numPointShadows=E,y.numSpotShadows=M,y.numSpotMaps=A,y.numLightProbes=R,i.version=sE++)}function l(c,h){let d=0,u=0,f=0,g=0,v=0;const m=h.matrixWorldInverse;for(let p=0,_=c.length;p<_;p++){const E=c[p];if(E.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),d++}else if(E.isSpotLight){const M=i.spot[f];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(E.isRectAreaLight){const M=i.rectArea[g];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(E.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(E.width*.5,0,0),M.halfHeight.set(0,E.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),g++}else if(E.isPointLight){const M=i.point[u];M.position.setFromMatrixPosition(E.matrixWorld),M.position.applyMatrix4(m),u++}else if(E.isHemisphereLight){const M=i.hemi[v];M.direction.setFromMatrixPosition(E.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function Vd(n){const e=new oE(n),t=[],i=[];function s(h){c.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function o(h){i.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function aE(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Vd(n),e.set(s,[a])):r>=o.length?(a=new Vd(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const lE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cE=`uniform sampler2D shadow_pass;
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
}`,hE=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],uE=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],Gd=new xt,Fr=new W,Yl=new W;function dE(n,e,t){let i=new Fh;const s=new $e,r=new $e,o=new At,a=new Mv,l=new Sv,c={},h=t.maxTextureSize,d={[ci]:Yt,[Yt]:ci,[Di]:Di},u=new di({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:lE,fragmentShader:cE}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new qn;g.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ot(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=aa;let p=this.type;this.render=function(C,R,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;this.type===Dp&&(qe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=aa);const b=n.getRenderTarget(),H=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),L=n.state;L.setBlending(Ni),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const I=p!==this.type;I&&R.traverse(function(B){B.material&&(Array.isArray(B.material)?B.material.forEach(U=>U.needsUpdate=!0):B.material.needsUpdate=!0)});for(let B=0,U=C.length;B<U;B++){const N=C[B],V=N.shadow;if(V===void 0){qe("WebGLShadowMap:",N,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const q=V.getFrameExtents();s.multiply(q),r.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,V.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,V.mapSize.y=r.y));const Q=n.state.buffers.depth.getReversed();if(V.camera._reversedDepth=Q,V.map===null||I===!0){if(V.map!==null&&(V.map.depthTexture!==null&&(V.map.depthTexture.dispose(),V.map.depthTexture=null),V.map.dispose()),this.type===Vr){if(N.isPointLight){qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}V.map=new ai(s.x,s.y,{format:yr,type:zi,minFilter:en,magFilter:en,generateMipmaps:!1}),V.map.texture.name=N.name+".shadowMap",V.map.depthTexture=new lo(s.x,s.y,zn),V.map.depthTexture.name=N.name+".shadowMapDepth",V.map.depthTexture.format=Hi,V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Bt,V.map.depthTexture.magFilter=Bt}else N.isPointLight?(V.map=new sm(s.x),V.map.depthTexture=new mv(s.x,hi)):(V.map=new ai(s.x,s.y),V.map.depthTexture=new lo(s.x,s.y,hi)),V.map.depthTexture.name=N.name+".shadowMap",V.map.depthTexture.format=Hi,this.type===aa?(V.map.depthTexture.compareFunction=Q?Ph:Rh,V.map.depthTexture.minFilter=en,V.map.depthTexture.magFilter=en):(V.map.depthTexture.compareFunction=null,V.map.depthTexture.minFilter=Bt,V.map.depthTexture.magFilter=Bt);V.camera.updateProjectionMatrix()}const me=V.map.isWebGLCubeRenderTarget?6:1;for(let _e=0;_e<me;_e++){if(V.map.isWebGLCubeRenderTarget)n.setRenderTarget(V.map,_e),n.clear();else{_e===0&&(n.setRenderTarget(V.map),n.clear());const ie=V.getViewport(_e);o.set(r.x*ie.x,r.y*ie.y,r.x*ie.z,r.y*ie.w),L.viewport(o)}if(N.isPointLight){const ie=V.camera,Ge=V.matrix,at=N.distance||ie.far;at!==ie.far&&(ie.far=at,ie.updateProjectionMatrix()),Fr.setFromMatrixPosition(N.matrixWorld),ie.position.copy(Fr),Yl.copy(ie.position),Yl.add(hE[_e]),ie.up.copy(uE[_e]),ie.lookAt(Yl),ie.updateMatrixWorld(),Ge.makeTranslation(-Fr.x,-Fr.y,-Fr.z),Gd.multiplyMatrices(ie.projectionMatrix,ie.matrixWorldInverse),V._frustum.setFromProjectionMatrix(Gd,ie.coordinateSystem,ie.reversedDepth)}else V.updateMatrices(N);i=V.getFrustum(),M(R,y,V.camera,N,this.type)}V.isPointLightShadow!==!0&&this.type===Vr&&_(V,y),V.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,H,D)};function _(C,R){const y=e.update(v);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ai(s.x,s.y,{format:yr,type:zi})),u.uniforms.shadow_pass.value=C.map.depthTexture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,n.setRenderTarget(C.mapPass),n.clear(),n.renderBufferDirect(R,null,y,u,v,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,n.setRenderTarget(C.map),n.clear(),n.renderBufferDirect(R,null,y,f,v,null)}function E(C,R,y,b){let H=null;const D=y.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(D!==void 0)H=D;else if(H=y.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const L=H.uuid,I=R.uuid;let B=c[L];B===void 0&&(B={},c[L]=B);let U=B[I];U===void 0&&(U=H.clone(),B[I]=U,R.addEventListener("dispose",A)),H=U}if(H.visible=R.visible,H.wireframe=R.wireframe,b===Vr?H.side=R.shadowSide!==null?R.shadowSide:R.side:H.side=R.shadowSide!==null?R.shadowSide:d[R.side],H.alphaMap=R.alphaMap,H.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,H.map=R.map,H.clipShadows=R.clipShadows,H.clippingPlanes=R.clippingPlanes,H.clipIntersection=R.clipIntersection,H.displacementMap=R.displacementMap,H.displacementScale=R.displacementScale,H.displacementBias=R.displacementBias,H.wireframeLinewidth=R.wireframeLinewidth,H.linewidth=R.linewidth,y.isPointLight===!0&&H.isMeshDistanceMaterial===!0){const L=n.properties.get(H);L.light=y}return H}function M(C,R,y,b,H){if(C.visible===!1)return;if(C.layers.test(R.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&H===Vr)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,C.matrixWorld);const I=e.update(C),B=C.material;if(Array.isArray(B)){const U=I.groups;for(let N=0,V=U.length;N<V;N++){const q=U[N],Q=B[q.materialIndex];if(Q&&Q.visible){const me=E(C,Q,b,H);C.onBeforeShadow(n,C,R,y,I,me,q),n.renderBufferDirect(y,null,I,me,C,q),C.onAfterShadow(n,C,R,y,I,me,q)}}}else if(B.visible){const U=E(C,B,b,H);C.onBeforeShadow(n,C,R,y,I,U,null),n.renderBufferDirect(y,null,I,U,C,null),C.onAfterShadow(n,C,R,y,I,U,null)}}const L=C.children;for(let I=0,B=L.length;I<B;I++)M(L[I],R,y,b,H)}function A(C){C.target.removeEventListener("dispose",A);for(const y in c){const b=c[y],H=C.target.uuid;H in b&&(b[H].dispose(),delete b[H])}}}function fE(n,e){function t(){let G=!1;const ye=new At;let ve=null;const Ie=new At(0,0,0,0);return{setMask:function(fe){ve!==fe&&!G&&(n.colorMask(fe,fe,fe,fe),ve=fe)},setLocked:function(fe){G=fe},setClear:function(fe,te,Ne,je,St){St===!0&&(fe*=je,te*=je,Ne*=je),ye.set(fe,te,Ne,je),Ie.equals(ye)===!1&&(n.clearColor(fe,te,Ne,je),Ie.copy(ye))},reset:function(){G=!1,ve=null,Ie.set(-1,0,0,0)}}}function i(){let G=!1,ye=!1,ve=null,Ie=null,fe=null;return{setReversed:function(te){if(ye!==te){const Ne=e.get("EXT_clip_control");te?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),ye=te;const je=fe;fe=null,this.setClear(je)}},getReversed:function(){return ye},setTest:function(te){te?pe(n.DEPTH_TEST):xe(n.DEPTH_TEST)},setMask:function(te){ve!==te&&!G&&(n.depthMask(te),ve=te)},setFunc:function(te){if(ye&&(te=k_[te]),Ie!==te){switch(te){case mc:n.depthFunc(n.NEVER);break;case gc:n.depthFunc(n.ALWAYS);break;case _c:n.depthFunc(n.LESS);break;case vr:n.depthFunc(n.LEQUAL);break;case vc:n.depthFunc(n.EQUAL);break;case so:n.depthFunc(n.GEQUAL);break;case xc:n.depthFunc(n.GREATER);break;case yc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ie=te}},setLocked:function(te){G=te},setClear:function(te){fe!==te&&(fe=te,ye&&(te=1-te),n.clearDepth(te))},reset:function(){G=!1,ve=null,Ie=null,fe=null,ye=!1}}}function s(){let G=!1,ye=null,ve=null,Ie=null,fe=null,te=null,Ne=null,je=null,St=null;return{setTest:function(dt){G||(dt?pe(n.STENCIL_TEST):xe(n.STENCIL_TEST))},setMask:function(dt){ye!==dt&&!G&&(n.stencilMask(dt),ye=dt)},setFunc:function(dt,fi,pi){(ve!==dt||Ie!==fi||fe!==pi)&&(n.stencilFunc(dt,fi,pi),ve=dt,Ie=fi,fe=pi)},setOp:function(dt,fi,pi){(te!==dt||Ne!==fi||je!==pi)&&(n.stencilOp(dt,fi,pi),te=dt,Ne=fi,je=pi)},setLocked:function(dt){G=dt},setClear:function(dt){St!==dt&&(n.clearStencil(dt),St=dt)},reset:function(){G=!1,ye=null,ve=null,Ie=null,fe=null,te=null,Ne=null,je=null,St=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,v=!1,m=null,p=null,_=null,E=null,M=null,A=null,C=null,R=new ot(0,0,0),y=0,b=!1,H=null,D=null,L=null,I=null,B=null;const U=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let N=!1,V=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(q)[1]),N=V>=1):q.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),N=V>=2);let Q=null,me={};const _e=n.getParameter(n.SCISSOR_BOX),ie=n.getParameter(n.VIEWPORT),Ge=new At().fromArray(_e),at=new At().fromArray(ie);function lt(G,ye,ve,Ie){const fe=new Uint8Array(4),te=n.createTexture();n.bindTexture(G,te),n.texParameteri(G,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(G,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ne=0;Ne<ve;Ne++)G===n.TEXTURE_3D||G===n.TEXTURE_2D_ARRAY?n.texImage3D(ye,0,n.RGBA,1,1,Ie,0,n.RGBA,n.UNSIGNED_BYTE,fe):n.texImage2D(ye+Ne,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,fe);return te}const se={};se[n.TEXTURE_2D]=lt(n.TEXTURE_2D,n.TEXTURE_2D,1),se[n.TEXTURE_CUBE_MAP]=lt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[n.TEXTURE_2D_ARRAY]=lt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),se[n.TEXTURE_3D]=lt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),pe(n.DEPTH_TEST),o.setFunc(vr),Z(!1),ae(Uu),pe(n.CULL_FACE),X(Ni);function pe(G){h[G]!==!0&&(n.enable(G),h[G]=!0)}function xe(G){h[G]!==!1&&(n.disable(G),h[G]=!1)}function Ye(G,ye){return d[G]!==ye?(n.bindFramebuffer(G,ye),d[G]=ye,G===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ye),G===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ye),!0):!1}function Ve(G,ye){let ve=f,Ie=!1;if(G){ve=u.get(ye),ve===void 0&&(ve=[],u.set(ye,ve));const fe=G.textures;if(ve.length!==fe.length||ve[0]!==n.COLOR_ATTACHMENT0){for(let te=0,Ne=fe.length;te<Ne;te++)ve[te]=n.COLOR_ATTACHMENT0+te;ve.length=fe.length,Ie=!0}}else ve[0]!==n.BACK&&(ve[0]=n.BACK,Ie=!0);Ie&&n.drawBuffers(ve)}function Xe(G){return g!==G?(n.useProgram(G),g=G,!0):!1}const F={[bs]:n.FUNC_ADD,[d_]:n.FUNC_SUBTRACT,[f_]:n.FUNC_REVERSE_SUBTRACT};F[p_]=n.MIN,F[m_]=n.MAX;const z={[g_]:n.ZERO,[__]:n.ONE,[v_]:n.SRC_COLOR,[fc]:n.SRC_ALPHA,[b_]:n.SRC_ALPHA_SATURATE,[S_]:n.DST_COLOR,[y_]:n.DST_ALPHA,[x_]:n.ONE_MINUS_SRC_COLOR,[pc]:n.ONE_MINUS_SRC_ALPHA,[E_]:n.ONE_MINUS_DST_COLOR,[M_]:n.ONE_MINUS_DST_ALPHA,[w_]:n.CONSTANT_COLOR,[T_]:n.ONE_MINUS_CONSTANT_COLOR,[A_]:n.CONSTANT_ALPHA,[C_]:n.ONE_MINUS_CONSTANT_ALPHA};function X(G,ye,ve,Ie,fe,te,Ne,je,St,dt){if(G===Ni){v===!0&&(xe(n.BLEND),v=!1);return}if(v===!1&&(pe(n.BLEND),v=!0),G!==u_){if(G!==m||dt!==b){if((p!==bs||M!==bs)&&(n.blendEquation(n.FUNC_ADD),p=bs,M=bs),dt)switch(G){case mr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ou:n.blendFunc(n.ONE,n.ONE);break;case Bu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:it("WebGLState: Invalid blending: ",G);break}else switch(G){case mr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ou:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Bu:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zu:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",G);break}_=null,E=null,A=null,C=null,R.set(0,0,0),y=0,m=G,b=dt}return}fe=fe||ye,te=te||ve,Ne=Ne||Ie,(ye!==p||fe!==M)&&(n.blendEquationSeparate(F[ye],F[fe]),p=ye,M=fe),(ve!==_||Ie!==E||te!==A||Ne!==C)&&(n.blendFuncSeparate(z[ve],z[Ie],z[te],z[Ne]),_=ve,E=Ie,A=te,C=Ne),(je.equals(R)===!1||St!==y)&&(n.blendColor(je.r,je.g,je.b,St),R.copy(je),y=St),m=G,b=!1}function oe(G,ye){G.side===Di?xe(n.CULL_FACE):pe(n.CULL_FACE);let ve=G.side===Yt;ye&&(ve=!ve),Z(ve),G.blending===mr&&G.transparent===!1?X(Ni):X(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),r.setMask(G.colorWrite);const Ie=G.stencilWrite;a.setTest(Ie),Ie&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),he(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?pe(n.SAMPLE_ALPHA_TO_COVERAGE):xe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Z(G){H!==G&&(G?n.frontFace(n.CW):n.frontFace(n.CCW),H=G)}function ae(G){G!==c_?(pe(n.CULL_FACE),G!==D&&(G===Uu?n.cullFace(n.BACK):G===h_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xe(n.CULL_FACE),D=G}function P(G){G!==L&&(N&&n.lineWidth(G),L=G)}function he(G,ye,ve){G?(pe(n.POLYGON_OFFSET_FILL),(I!==ye||B!==ve)&&(I=ye,B=ve,o.getReversed()&&(ye=-ye),n.polygonOffset(ye,ve))):xe(n.POLYGON_OFFSET_FILL)}function le(G){G?pe(n.SCISSOR_TEST):xe(n.SCISSOR_TEST)}function re(G){G===void 0&&(G=n.TEXTURE0+U-1),Q!==G&&(n.activeTexture(G),Q=G)}function ce(G,ye,ve){ve===void 0&&(Q===null?ve=n.TEXTURE0+U-1:ve=Q);let Ie=me[ve];Ie===void 0&&(Ie={type:void 0,texture:void 0},me[ve]=Ie),(Ie.type!==G||Ie.texture!==ye)&&(Q!==ve&&(n.activeTexture(ve),Q=ve),n.bindTexture(G,ye||se[G]),Ie.type=G,Ie.texture=ye)}function w(){const G=me[Q];G!==void 0&&G.type!==void 0&&(n.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(G){it("WebGLState:",G)}}function O(){try{n.compressedTexImage3D(...arguments)}catch(G){it("WebGLState:",G)}}function Y(){try{n.texSubImage2D(...arguments)}catch(G){it("WebGLState:",G)}}function ee(){try{n.texSubImage3D(...arguments)}catch(G){it("WebGLState:",G)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(G){it("WebGLState:",G)}}function Me(){try{n.compressedTexSubImage3D(...arguments)}catch(G){it("WebGLState:",G)}}function de(){try{n.texStorage2D(...arguments)}catch(G){it("WebGLState:",G)}}function De(){try{n.texStorage3D(...arguments)}catch(G){it("WebGLState:",G)}}function Ue(){try{n.texImage2D(...arguments)}catch(G){it("WebGLState:",G)}}function ue(){try{n.texImage3D(...arguments)}catch(G){it("WebGLState:",G)}}function ge(G){Ge.equals(G)===!1&&(n.scissor(G.x,G.y,G.z,G.w),Ge.copy(G))}function Se(G){at.equals(G)===!1&&(n.viewport(G.x,G.y,G.z,G.w),at.copy(G))}function Ce(G,ye){let ve=c.get(ye);ve===void 0&&(ve=new WeakMap,c.set(ye,ve));let Ie=ve.get(G);Ie===void 0&&(Ie=n.getUniformBlockIndex(ye,G.name),ve.set(G,Ie))}function Re(G,ye){const Ie=c.get(ye).get(G);l.get(ye)!==Ie&&(n.uniformBlockBinding(ye,Ie,G.__bindingPointIndex),l.set(ye,Ie))}function Ze(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Q=null,me={},d={},u=new WeakMap,f=[],g=null,v=!1,m=null,p=null,_=null,E=null,M=null,A=null,C=null,R=new ot(0,0,0),y=0,b=!1,H=null,D=null,L=null,I=null,B=null,Ge.set(0,0,n.canvas.width,n.canvas.height),at.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:pe,disable:xe,bindFramebuffer:Ye,drawBuffers:Ve,useProgram:Xe,setBlending:X,setMaterial:oe,setFlipSided:Z,setCullFace:ae,setLineWidth:P,setPolygonOffset:he,setScissorTest:le,activeTexture:re,bindTexture:ce,unbindTexture:w,compressedTexImage2D:x,compressedTexImage3D:O,texImage2D:Ue,texImage3D:ue,updateUBOMapping:Ce,uniformBlockBinding:Re,texStorage2D:de,texStorage3D:De,texSubImage2D:Y,texSubImage3D:ee,compressedTexSubImage2D:j,compressedTexSubImage3D:Me,scissor:ge,viewport:Se,reset:Ze}}function pE(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,x){return f?new OffscreenCanvas(w,x):Ca("canvas")}function v(w,x,O){let Y=1;const ee=ce(w);if((ee.width>O||ee.height>O)&&(Y=O/Math.max(ee.width,ee.height)),Y<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const j=Math.floor(Y*ee.width),Me=Math.floor(Y*ee.height);d===void 0&&(d=g(j,Me));const de=x?g(j,Me):d;return de.width=j,de.height=Me,de.getContext("2d").drawImage(w,0,0,j,Me),qe("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+j+"x"+Me+")."),de}else return"data"in w&&qe("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),w;return w}function m(w){return w.generateMipmaps}function p(w){n.generateMipmap(w)}function _(w){return w.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?n.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(w,x,O,Y,ee=!1){if(w!==null){if(n[w]!==void 0)return n[w];qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let j=x;if(x===n.RED&&(O===n.FLOAT&&(j=n.R32F),O===n.HALF_FLOAT&&(j=n.R16F),O===n.UNSIGNED_BYTE&&(j=n.R8)),x===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(j=n.R8UI),O===n.UNSIGNED_SHORT&&(j=n.R16UI),O===n.UNSIGNED_INT&&(j=n.R32UI),O===n.BYTE&&(j=n.R8I),O===n.SHORT&&(j=n.R16I),O===n.INT&&(j=n.R32I)),x===n.RG&&(O===n.FLOAT&&(j=n.RG32F),O===n.HALF_FLOAT&&(j=n.RG16F),O===n.UNSIGNED_BYTE&&(j=n.RG8)),x===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(j=n.RG8UI),O===n.UNSIGNED_SHORT&&(j=n.RG16UI),O===n.UNSIGNED_INT&&(j=n.RG32UI),O===n.BYTE&&(j=n.RG8I),O===n.SHORT&&(j=n.RG16I),O===n.INT&&(j=n.RG32I)),x===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(j=n.RGB8UI),O===n.UNSIGNED_SHORT&&(j=n.RGB16UI),O===n.UNSIGNED_INT&&(j=n.RGB32UI),O===n.BYTE&&(j=n.RGB8I),O===n.SHORT&&(j=n.RGB16I),O===n.INT&&(j=n.RGB32I)),x===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),O===n.UNSIGNED_INT&&(j=n.RGBA32UI),O===n.BYTE&&(j=n.RGBA8I),O===n.SHORT&&(j=n.RGBA16I),O===n.INT&&(j=n.RGBA32I)),x===n.RGB&&(O===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(j=n.R11F_G11F_B10F)),x===n.RGBA){const Me=ee?Aa:st.getTransfer(Y);O===n.FLOAT&&(j=n.RGBA32F),O===n.HALF_FLOAT&&(j=n.RGBA16F),O===n.UNSIGNED_BYTE&&(j=Me===ft?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function M(w,x){let O;return w?x===null||x===hi||x===oo?O=n.DEPTH24_STENCIL8:x===zn?O=n.DEPTH32F_STENCIL8:x===ro&&(O=n.DEPTH24_STENCIL8,qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===hi||x===oo?O=n.DEPTH_COMPONENT24:x===zn?O=n.DEPTH_COMPONENT32F:x===ro&&(O=n.DEPTH_COMPONENT16),O}function A(w,x){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Bt&&w.minFilter!==en?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function C(w){const x=w.target;x.removeEventListener("dispose",C),y(x),x.isVideoTexture&&h.delete(x)}function R(w){const x=w.target;x.removeEventListener("dispose",R),H(x)}function y(w){const x=i.get(w);if(x.__webglInit===void 0)return;const O=w.source,Y=u.get(O);if(Y){const ee=Y[x.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&b(w),Object.keys(Y).length===0&&u.delete(O)}i.remove(w)}function b(w){const x=i.get(w);n.deleteTexture(x.__webglTexture);const O=w.source,Y=u.get(O);delete Y[x.__cacheKey],o.memory.textures--}function H(w){const x=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let ee=0;ee<x.__webglFramebuffer[Y].length;ee++)n.deleteFramebuffer(x.__webglFramebuffer[Y][ee]);else n.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)n.deleteFramebuffer(x.__webglFramebuffer[Y]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const O=w.textures;for(let Y=0,ee=O.length;Y<ee;Y++){const j=i.get(O[Y]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(O[Y])}i.remove(w)}let D=0;function L(){D=0}function I(){const w=D;return w>=s.maxTextures&&qe("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),D+=1,w}function B(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function U(w,x){const O=i.get(w);if(w.isVideoTexture&&le(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&O.__version!==w.version){const Y=w.image;if(Y===null)qe("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)qe("WebGLRenderer: Texture marked for update but image is incomplete");else{se(O,w,x);return}}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+x)}function N(w,x){const O=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){se(O,w,x);return}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+x)}function V(w,x){const O=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){se(O,w,x);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+x)}function q(w,x){const O=i.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&O.__version!==w.version){pe(O,w,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+x)}const Q={[Mc]:n.REPEAT,[Li]:n.CLAMP_TO_EDGE,[Sc]:n.MIRRORED_REPEAT},me={[Bt]:n.NEAREST,[D_]:n.NEAREST_MIPMAP_NEAREST,[bo]:n.NEAREST_MIPMAP_LINEAR,[en]:n.LINEAR,[_l]:n.LINEAR_MIPMAP_NEAREST,[Cs]:n.LINEAR_MIPMAP_LINEAR},_e={[N_]:n.NEVER,[z_]:n.ALWAYS,[F_]:n.LESS,[Rh]:n.LEQUAL,[U_]:n.EQUAL,[Ph]:n.GEQUAL,[O_]:n.GREATER,[B_]:n.NOTEQUAL};function ie(w,x){if(x.type===zn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===en||x.magFilter===_l||x.magFilter===bo||x.magFilter===Cs||x.minFilter===en||x.minFilter===_l||x.minFilter===bo||x.minFilter===Cs)&&qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(w,n.TEXTURE_WRAP_S,Q[x.wrapS]),n.texParameteri(w,n.TEXTURE_WRAP_T,Q[x.wrapT]),(w===n.TEXTURE_3D||w===n.TEXTURE_2D_ARRAY)&&n.texParameteri(w,n.TEXTURE_WRAP_R,Q[x.wrapR]),n.texParameteri(w,n.TEXTURE_MAG_FILTER,me[x.magFilter]),n.texParameteri(w,n.TEXTURE_MIN_FILTER,me[x.minFilter]),x.compareFunction&&(n.texParameteri(w,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(w,n.TEXTURE_COMPARE_FUNC,_e[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Bt||x.minFilter!==bo&&x.minFilter!==Cs||x.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Ge(w,x){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",C));const Y=x.source;let ee=u.get(Y);ee===void 0&&(ee={},u.set(Y,ee));const j=B(x);if(j!==w.__cacheKey){ee[j]===void 0&&(ee[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,O=!0),ee[j].usedTimes++;const Me=ee[w.__cacheKey];Me!==void 0&&(ee[w.__cacheKey].usedTimes--,Me.usedTimes===0&&b(x)),w.__cacheKey=j,w.__webglTexture=ee[j].texture}return O}function at(w,x,O){return Math.floor(Math.floor(w/O)/x)}function lt(w,x,O,Y){const j=w.updateRanges;if(j.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,O,Y,x.data);else{j.sort((ue,ge)=>ue.start-ge.start);let Me=0;for(let ue=1;ue<j.length;ue++){const ge=j[Me],Se=j[ue],Ce=ge.start+ge.count,Re=at(Se.start,x.width,4),Ze=at(ge.start,x.width,4);Se.start<=Ce+1&&Re===Ze&&at(Se.start+Se.count-1,x.width,4)===Re?ge.count=Math.max(ge.count,Se.start+Se.count-ge.start):(++Me,j[Me]=Se)}j.length=Me+1;const de=n.getParameter(n.UNPACK_ROW_LENGTH),De=n.getParameter(n.UNPACK_SKIP_PIXELS),Ue=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ue=0,ge=j.length;ue<ge;ue++){const Se=j[ue],Ce=Math.floor(Se.start/4),Re=Math.ceil(Se.count/4),Ze=Ce%x.width,G=Math.floor(Ce/x.width),ye=Re,ve=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ze),n.pixelStorei(n.UNPACK_SKIP_ROWS,G),t.texSubImage2D(n.TEXTURE_2D,0,Ze,G,ye,ve,O,Y,x.data)}w.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,de),n.pixelStorei(n.UNPACK_SKIP_PIXELS,De),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ue)}}function se(w,x,O){let Y=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=n.TEXTURE_3D);const ee=Ge(w,x),j=x.source;t.bindTexture(Y,w.__webglTexture,n.TEXTURE0+O);const Me=i.get(j);if(j.version!==Me.__version||ee===!0){t.activeTexture(n.TEXTURE0+O);const de=st.getPrimaries(st.workingColorSpace),De=x.colorSpace===is?null:st.getPrimaries(x.colorSpace),Ue=x.colorSpace===is||de===De?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let ue=v(x.image,!1,s.maxTextureSize);ue=re(x,ue);const ge=r.convert(x.format,x.colorSpace),Se=r.convert(x.type);let Ce=E(x.internalFormat,ge,Se,x.colorSpace,x.isVideoTexture);ie(Y,x);let Re;const Ze=x.mipmaps,G=x.isVideoTexture!==!0,ye=Me.__version===void 0||ee===!0,ve=j.dataReady,Ie=A(x,ue);if(x.isDepthTexture)Ce=M(x.format===Rs,x.type),ye&&(G?t.texStorage2D(n.TEXTURE_2D,1,Ce,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,Ce,ue.width,ue.height,0,ge,Se,null));else if(x.isDataTexture)if(Ze.length>0){G&&ye&&t.texStorage2D(n.TEXTURE_2D,Ie,Ce,Ze[0].width,Ze[0].height);for(let fe=0,te=Ze.length;fe<te;fe++)Re=Ze[fe],G?ve&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,Re.width,Re.height,ge,Se,Re.data):t.texImage2D(n.TEXTURE_2D,fe,Ce,Re.width,Re.height,0,ge,Se,Re.data);x.generateMipmaps=!1}else G?(ye&&t.texStorage2D(n.TEXTURE_2D,Ie,Ce,ue.width,ue.height),ve&&lt(x,ue,ge,Se)):t.texImage2D(n.TEXTURE_2D,0,Ce,ue.width,ue.height,0,ge,Se,ue.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){G&&ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ie,Ce,Ze[0].width,Ze[0].height,ue.depth);for(let fe=0,te=Ze.length;fe<te;fe++)if(Re=Ze[fe],x.format!==Hn)if(ge!==null)if(G){if(ve)if(x.layerUpdates.size>0){const Ne=xd(Re.width,Re.height,x.format,x.type);for(const je of x.layerUpdates){const St=Re.data.subarray(je*Ne/Re.data.BYTES_PER_ELEMENT,(je+1)*Ne/Re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,je,Re.width,Re.height,1,ge,St)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,Re.width,Re.height,ue.depth,ge,Re.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,fe,Ce,Re.width,Re.height,ue.depth,0,Re.data,0,0);else qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else G?ve&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,fe,0,0,0,Re.width,Re.height,ue.depth,ge,Se,Re.data):t.texImage3D(n.TEXTURE_2D_ARRAY,fe,Ce,Re.width,Re.height,ue.depth,0,ge,Se,Re.data)}else{G&&ye&&t.texStorage2D(n.TEXTURE_2D,Ie,Ce,Ze[0].width,Ze[0].height);for(let fe=0,te=Ze.length;fe<te;fe++)Re=Ze[fe],x.format!==Hn?ge!==null?G?ve&&t.compressedTexSubImage2D(n.TEXTURE_2D,fe,0,0,Re.width,Re.height,ge,Re.data):t.compressedTexImage2D(n.TEXTURE_2D,fe,Ce,Re.width,Re.height,0,Re.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):G?ve&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,Re.width,Re.height,ge,Se,Re.data):t.texImage2D(n.TEXTURE_2D,fe,Ce,Re.width,Re.height,0,ge,Se,Re.data)}else if(x.isDataArrayTexture)if(G){if(ye&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ie,Ce,ue.width,ue.height,ue.depth),ve)if(x.layerUpdates.size>0){const fe=xd(ue.width,ue.height,x.format,x.type);for(const te of x.layerUpdates){const Ne=ue.data.subarray(te*fe/ue.data.BYTES_PER_ELEMENT,(te+1)*fe/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,te,ue.width,ue.height,1,ge,Se,Ne)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,ge,Se,ue.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,ue.width,ue.height,ue.depth,0,ge,Se,ue.data);else if(x.isData3DTexture)G?(ye&&t.texStorage3D(n.TEXTURE_3D,Ie,Ce,ue.width,ue.height,ue.depth),ve&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,ge,Se,ue.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,ue.width,ue.height,ue.depth,0,ge,Se,ue.data);else if(x.isFramebufferTexture){if(ye)if(G)t.texStorage2D(n.TEXTURE_2D,Ie,Ce,ue.width,ue.height);else{let fe=ue.width,te=ue.height;for(let Ne=0;Ne<Ie;Ne++)t.texImage2D(n.TEXTURE_2D,Ne,Ce,fe,te,0,ge,Se,null),fe>>=1,te>>=1}}else if(Ze.length>0){if(G&&ye){const fe=ce(Ze[0]);t.texStorage2D(n.TEXTURE_2D,Ie,Ce,fe.width,fe.height)}for(let fe=0,te=Ze.length;fe<te;fe++)Re=Ze[fe],G?ve&&t.texSubImage2D(n.TEXTURE_2D,fe,0,0,ge,Se,Re):t.texImage2D(n.TEXTURE_2D,fe,Ce,ge,Se,Re);x.generateMipmaps=!1}else if(G){if(ye){const fe=ce(ue);t.texStorage2D(n.TEXTURE_2D,Ie,Ce,fe.width,fe.height)}ve&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,Se,ue)}else t.texImage2D(n.TEXTURE_2D,0,Ce,ge,Se,ue);m(x)&&p(Y),Me.__version=j.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function pe(w,x,O){if(x.image.length!==6)return;const Y=Ge(w,x),ee=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,w.__webglTexture,n.TEXTURE0+O);const j=i.get(ee);if(ee.version!==j.__version||Y===!0){t.activeTexture(n.TEXTURE0+O);const Me=st.getPrimaries(st.workingColorSpace),de=x.colorSpace===is?null:st.getPrimaries(x.colorSpace),De=x.colorSpace===is||Me===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const Ue=x.isCompressedTexture||x.image[0].isCompressedTexture,ue=x.image[0]&&x.image[0].isDataTexture,ge=[];for(let te=0;te<6;te++)!Ue&&!ue?ge[te]=v(x.image[te],!0,s.maxCubemapSize):ge[te]=ue?x.image[te].image:x.image[te],ge[te]=re(x,ge[te]);const Se=ge[0],Ce=r.convert(x.format,x.colorSpace),Re=r.convert(x.type),Ze=E(x.internalFormat,Ce,Re,x.colorSpace),G=x.isVideoTexture!==!0,ye=j.__version===void 0||Y===!0,ve=ee.dataReady;let Ie=A(x,Se);ie(n.TEXTURE_CUBE_MAP,x);let fe;if(Ue){G&&ye&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,Ze,Se.width,Se.height);for(let te=0;te<6;te++){fe=ge[te].mipmaps;for(let Ne=0;Ne<fe.length;Ne++){const je=fe[Ne];x.format!==Hn?Ce!==null?G?ve&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne,0,0,je.width,je.height,Ce,je.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne,Ze,je.width,je.height,0,je.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne,0,0,je.width,je.height,Ce,Re,je.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne,Ze,je.width,je.height,0,Ce,Re,je.data)}}}else{if(fe=x.mipmaps,G&&ye){fe.length>0&&Ie++;const te=ce(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ie,Ze,te.width,te.height)}for(let te=0;te<6;te++)if(ue){G?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,ge[te].width,ge[te].height,Ce,Re,ge[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ze,ge[te].width,ge[te].height,0,Ce,Re,ge[te].data);for(let Ne=0;Ne<fe.length;Ne++){const St=fe[Ne].image[te].image;G?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne+1,0,0,St.width,St.height,Ce,Re,St.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne+1,Ze,St.width,St.height,0,Ce,Re,St.data)}}else{G?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Ce,Re,ge[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ze,Ce,Re,ge[te]);for(let Ne=0;Ne<fe.length;Ne++){const je=fe[Ne];G?ve&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne+1,0,0,Ce,Re,je.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,Ne+1,Ze,Ce,Re,je.image[te])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),j.__version=ee.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function xe(w,x,O,Y,ee,j){const Me=r.convert(O.format,O.colorSpace),de=r.convert(O.type),De=E(O.internalFormat,Me,de,O.colorSpace),Ue=i.get(x),ue=i.get(O);if(ue.__renderTarget=x,!Ue.__hasExternalTextures){const ge=Math.max(1,x.width>>j),Se=Math.max(1,x.height>>j);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,j,De,ge,Se,x.depth,0,Me,de,null):t.texImage2D(ee,j,De,ge,Se,0,Me,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,w),he(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,ee,ue.__webglTexture,0,P(x)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,ee,ue.__webglTexture,j),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ye(w,x,O){if(n.bindRenderbuffer(n.RENDERBUFFER,w),x.depthBuffer){const Y=x.depthTexture,ee=Y&&Y.isDepthTexture?Y.type:null,j=M(x.stencilBuffer,ee),Me=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;he(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,P(x),j,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,P(x),j,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,j,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Me,n.RENDERBUFFER,w)}else{const Y=x.textures;for(let ee=0;ee<Y.length;ee++){const j=Y[ee],Me=r.convert(j.format,j.colorSpace),de=r.convert(j.type),De=E(j.internalFormat,Me,de,j.colorSpace);he(x)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,P(x),De,x.width,x.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,P(x),De,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,De,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ve(w,x,O){const Y=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=i.get(x.depthTexture);if(ee.__renderTarget=x,(!ee.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),Y){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,x.depthTexture.addEventListener("dispose",C)),ee.__webglTexture===void 0){ee.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),ie(n.TEXTURE_CUBE_MAP,x.depthTexture);const Ue=r.convert(x.depthTexture.format),ue=r.convert(x.depthTexture.type);let ge;x.depthTexture.format===Hi?ge=n.DEPTH_COMPONENT24:x.depthTexture.format===Rs&&(ge=n.DEPTH24_STENCIL8);for(let Se=0;Se<6;Se++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,ge,x.width,x.height,0,Ue,ue,null)}}else U(x.depthTexture,0);const j=ee.__webglTexture,Me=P(x),de=Y?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,De=x.depthTexture.format===Rs?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===Hi)he(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,De,de,j,0,Me):n.framebufferTexture2D(n.FRAMEBUFFER,De,de,j,0);else if(x.depthTexture.format===Rs)he(x)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,De,de,j,0,Me):n.framebufferTexture2D(n.FRAMEBUFFER,De,de,j,0);else throw new Error("Unknown depthTexture format")}function Xe(w){const x=i.get(w),O=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const Y=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){const ee=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",ee)};Y.addEventListener("dispose",ee),x.__depthDisposeCallback=ee}x.__boundDepthTexture=Y}if(w.depthTexture&&!x.__autoAllocateDepthBuffer)if(O)for(let Y=0;Y<6;Y++)Ve(x.__webglFramebuffer[Y],w,Y);else{const Y=w.texture.mipmaps;Y&&Y.length>0?Ve(x.__webglFramebuffer[0],w,0):Ve(x.__webglFramebuffer,w,0)}else if(O){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=n.createRenderbuffer(),Ye(x.__webglDepthbuffer[Y],w,!1);else{const ee=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,j)}}else{const Y=w.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),Ye(x.__webglDepthbuffer,w,!1);else{const ee=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,j)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function F(w,x,O){const Y=i.get(w);x!==void 0&&xe(Y.__webglFramebuffer,w,w.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Xe(w)}function z(w){const x=w.texture,O=i.get(w),Y=i.get(x);w.addEventListener("dispose",R);const ee=w.textures,j=w.isWebGLCubeRenderTarget===!0,Me=ee.length>1;if(Me||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=x.version,o.memory.textures++),j){O.__webglFramebuffer=[];for(let de=0;de<6;de++)if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer[de]=[];for(let De=0;De<x.mipmaps.length;De++)O.__webglFramebuffer[de][De]=n.createFramebuffer()}else O.__webglFramebuffer[de]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){O.__webglFramebuffer=[];for(let de=0;de<x.mipmaps.length;de++)O.__webglFramebuffer[de]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(Me)for(let de=0,De=ee.length;de<De;de++){const Ue=i.get(ee[de]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=n.createTexture(),o.memory.textures++)}if(w.samples>0&&he(w)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let de=0;de<ee.length;de++){const De=ee[de];O.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[de]);const Ue=r.convert(De.format,De.colorSpace),ue=r.convert(De.type),ge=E(De.internalFormat,Ue,ue,De.colorSpace,w.isXRRenderTarget===!0),Se=P(w);n.renderbufferStorageMultisample(n.RENDERBUFFER,Se,ge,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,O.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),Ye(O.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),ie(n.TEXTURE_CUBE_MAP,x);for(let de=0;de<6;de++)if(x.mipmaps&&x.mipmaps.length>0)for(let De=0;De<x.mipmaps.length;De++)xe(O.__webglFramebuffer[de][De],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,De);else xe(O.__webglFramebuffer[de],w,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(x)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let de=0,De=ee.length;de<De;de++){const Ue=ee[de],ue=i.get(Ue);let ge=n.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ge=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,ue.__webglTexture),ie(ge,Ue),xe(O.__webglFramebuffer,w,Ue,n.COLOR_ATTACHMENT0+de,ge,0),m(Ue)&&p(ge)}t.unbindTexture()}else{let de=n.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(de=w.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,Y.__webglTexture),ie(de,x),x.mipmaps&&x.mipmaps.length>0)for(let De=0;De<x.mipmaps.length;De++)xe(O.__webglFramebuffer[De],w,x,n.COLOR_ATTACHMENT0,de,De);else xe(O.__webglFramebuffer,w,x,n.COLOR_ATTACHMENT0,de,0);m(x)&&p(de),t.unbindTexture()}w.depthBuffer&&Xe(w)}function X(w){const x=w.textures;for(let O=0,Y=x.length;O<Y;O++){const ee=x[O];if(m(ee)){const j=_(w),Me=i.get(ee).__webglTexture;t.bindTexture(j,Me),p(j),t.unbindTexture()}}}const oe=[],Z=[];function ae(w){if(w.samples>0){if(he(w)===!1){const x=w.textures,O=w.width,Y=w.height;let ee=n.COLOR_BUFFER_BIT;const j=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Me=i.get(w),de=x.length>1;if(de)for(let Ue=0;Ue<x.length;Ue++)t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const De=w.texture.mipmaps;De&&De.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let Ue=0;Ue<x.length;Ue++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),de){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Me.__webglColorRenderbuffer[Ue]);const ue=i.get(x[Ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ue,0)}n.blitFramebuffer(0,0,O,Y,0,0,O,Y,ee,n.NEAREST),l===!0&&(oe.length=0,Z.length=0,oe.push(n.COLOR_ATTACHMENT0+Ue),w.depthBuffer&&w.resolveDepthBuffer===!1&&(oe.push(j),Z.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Z)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,oe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let Ue=0;Ue<x.length;Ue++){t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,Me.__webglColorRenderbuffer[Ue]);const ue=i.get(x[Ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Me.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,ue,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const x=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function P(w){return Math.min(s.maxSamples,w.samples)}function he(w){const x=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function le(w){const x=o.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function re(w,x){const O=w.colorSpace,Y=w.format,ee=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==Mr&&O!==is&&(st.getTransfer(O)===ft?(Y!==Hn||ee!==En)&&qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",O)),x}function ce(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=L,this.setTexture2D=U,this.setTexture2DArray=N,this.setTexture3D=V,this.setTextureCube=q,this.rebindTextures=F,this.setupRenderTarget=z,this.updateRenderTargetMipmap=X,this.updateMultisampleRenderTarget=ae,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=he,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function mE(n,e){function t(i,s=is){let r;const o=st.getTransfer(s);if(i===En)return n.UNSIGNED_BYTE;if(i===bh)return n.UNSIGNED_SHORT_4_4_4_4;if(i===wh)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Gp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===kp)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Hp)return n.BYTE;if(i===Vp)return n.SHORT;if(i===ro)return n.UNSIGNED_SHORT;if(i===Eh)return n.INT;if(i===hi)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===zi)return n.HALF_FLOAT;if(i===Wp)return n.ALPHA;if(i===Xp)return n.RGB;if(i===Hn)return n.RGBA;if(i===Hi)return n.DEPTH_COMPONENT;if(i===Rs)return n.DEPTH_STENCIL;if(i===ja)return n.RED;if(i===Th)return n.RED_INTEGER;if(i===yr)return n.RG;if(i===Ah)return n.RG_INTEGER;if(i===Ch)return n.RGBA_INTEGER;if(i===la||i===ca||i===ha||i===ua)if(o===ft)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===la)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ha)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===la)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ca)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ha)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ua)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ec||i===bc||i===wc||i===Tc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ec)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===bc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Tc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ac||i===Cc||i===Rc||i===Pc||i===Dc||i===Ic||i===Lc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ac||i===Cc)return o===ft?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Rc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Pc)return r.COMPRESSED_R11_EAC;if(i===Dc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ic)return r.COMPRESSED_RG11_EAC;if(i===Lc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Nc||i===Fc||i===Uc||i===Oc||i===Bc||i===zc||i===Hc||i===Vc||i===Gc||i===kc||i===Wc||i===Xc||i===qc||i===Yc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Nc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Fc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Uc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Oc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Bc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===zc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Hc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Vc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Gc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===kc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Wc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Xc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===qc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Yc)return o===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===jc||i===$c||i===Kc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===jc)return o===ft?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===$c)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Kc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zc||i===Jc||i===Qc||i===eh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Zc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Jc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===eh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===oo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const gE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_E=`
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

}`;class vE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Qp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new di({vertexShader:gE,fragmentShader:_E,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ot(new $a(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xE extends Us{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new vE,p={},_=t.getContextAttributes();let E=null,M=null;const A=[],C=[],R=new $e;let y=null;const b=new Sn;b.viewport=new At;const H=new Sn;H.viewport=new At;const D=[b,H],L=new Rv;let I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let pe=A[se];return pe===void 0&&(pe=new bl,A[se]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(se){let pe=A[se];return pe===void 0&&(pe=new bl,A[se]=pe),pe.getGripSpace()},this.getHand=function(se){let pe=A[se];return pe===void 0&&(pe=new bl,A[se]=pe),pe.getHandSpace()};function U(se){const pe=C.indexOf(se.inputSource);if(pe===-1)return;const xe=A[pe];xe!==void 0&&(xe.update(se.inputSource,se.frame,c||o),xe.dispatchEvent({type:se.type,data:se.inputSource}))}function N(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",N),s.removeEventListener("inputsourceschange",V);for(let se=0;se<A.length;se++){const pe=C[se];pe!==null&&(C[se]=null,A[se].disconnect(pe))}I=null,B=null,m.reset();for(const se in p)delete p[se];e.setRenderTarget(E),f=null,u=null,d=null,s=null,M=null,lt.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){r=se,i.isPresenting===!0&&qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){a=se,i.isPresenting===!0&&qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(se){c=se},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(se){if(s=se,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",N),s.addEventListener("inputsourceschange",V),_.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(R),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Ye=null,Ve=null;_.depth&&(Ve=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=_.stencil?Rs:Hi,Ye=_.stencil?oo:hi);const Xe={colorFormat:t.RGBA8,depthFormat:Ve,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Xe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),M=new ai(u.textureWidth,u.textureHeight,{format:Hn,type:En,depthTexture:new lo(u.textureWidth,u.textureHeight,Ye,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const xe={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,xe),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new ai(f.framebufferWidth,f.framebufferHeight,{format:Hn,type:En,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),lt.setContext(s),lt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function V(se){for(let pe=0;pe<se.removed.length;pe++){const xe=se.removed[pe],Ye=C.indexOf(xe);Ye>=0&&(C[Ye]=null,A[Ye].disconnect(xe))}for(let pe=0;pe<se.added.length;pe++){const xe=se.added[pe];let Ye=C.indexOf(xe);if(Ye===-1){for(let Xe=0;Xe<A.length;Xe++)if(Xe>=C.length){C.push(xe),Ye=Xe;break}else if(C[Xe]===null){C[Xe]=xe,Ye=Xe;break}if(Ye===-1)break}const Ve=A[Ye];Ve&&Ve.connect(xe)}}const q=new W,Q=new W;function me(se,pe,xe){q.setFromMatrixPosition(pe.matrixWorld),Q.setFromMatrixPosition(xe.matrixWorld);const Ye=q.distanceTo(Q),Ve=pe.projectionMatrix.elements,Xe=xe.projectionMatrix.elements,F=Ve[14]/(Ve[10]-1),z=Ve[14]/(Ve[10]+1),X=(Ve[9]+1)/Ve[5],oe=(Ve[9]-1)/Ve[5],Z=(Ve[8]-1)/Ve[0],ae=(Xe[8]+1)/Xe[0],P=F*Z,he=F*ae,le=Ye/(-Z+ae),re=le*-Z;if(pe.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(re),se.translateZ(le),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),Ve[10]===-1)se.projectionMatrix.copy(pe.projectionMatrix),se.projectionMatrixInverse.copy(pe.projectionMatrixInverse);else{const ce=F+le,w=z+le,x=P-re,O=he+(Ye-re),Y=X*z/w*ce,ee=oe*z/w*ce;se.projectionMatrix.makePerspective(x,O,Y,ee,ce,w),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function _e(se,pe){pe===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(pe.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(s===null)return;let pe=se.near,xe=se.far;m.texture!==null&&(m.depthNear>0&&(pe=m.depthNear),m.depthFar>0&&(xe=m.depthFar)),L.near=H.near=b.near=pe,L.far=H.far=b.far=xe,(I!==L.near||B!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),I=L.near,B=L.far),L.layers.mask=se.layers.mask|6,b.layers.mask=L.layers.mask&-5,H.layers.mask=L.layers.mask&-3;const Ye=se.parent,Ve=L.cameras;_e(L,Ye);for(let Xe=0;Xe<Ve.length;Xe++)_e(Ve[Xe],Ye);Ve.length===2?me(L,b,H):L.projectionMatrix.copy(b.projectionMatrix),ie(se,L,Ye)};function ie(se,pe,xe){xe===null?se.matrix.copy(pe.matrixWorld):(se.matrix.copy(xe.matrixWorld),se.matrix.invert(),se.matrix.multiply(pe.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(pe.projectionMatrix),se.projectionMatrixInverse.copy(pe.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=th*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(se){l=se,u!==null&&(u.fixedFoveation=se),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=se)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(se){return p[se]};let Ge=null;function at(se,pe){if(h=pe.getViewerPose(c||o),g=pe,h!==null){const xe=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let Ye=!1;xe.length!==L.cameras.length&&(L.cameras.length=0,Ye=!0);for(let z=0;z<xe.length;z++){const X=xe[z];let oe=null;if(f!==null)oe=f.getViewport(X);else{const ae=d.getViewSubImage(u,X);oe=ae.viewport,z===0&&(e.setRenderTargetTextures(M,ae.colorTexture,ae.depthStencilTexture),e.setRenderTarget(M))}let Z=D[z];Z===void 0&&(Z=new Sn,Z.layers.enable(z),Z.viewport=new At,D[z]=Z),Z.matrix.fromArray(X.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(X.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(oe.x,oe.y,oe.width,oe.height),z===0&&(L.matrix.copy(Z.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ye===!0&&L.cameras.push(Z)}const Ve=s.enabledFeatures;if(Ve&&Ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=i.getBinding();const z=d.getDepthInformation(xe[0]);z&&z.isValid&&z.texture&&m.init(z,s.renderState)}if(Ve&&Ve.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let z=0;z<xe.length;z++){const X=xe[z].camera;if(X){let oe=p[X];oe||(oe=new Qp,p[X]=oe);const Z=d.getCameraImage(X);oe.sourceTexture=Z}}}}for(let xe=0;xe<A.length;xe++){const Ye=C[xe],Ve=A[xe];Ye!==null&&Ve!==void 0&&Ve.update(Ye,pe,c||o)}Ge&&Ge(se,pe),pe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pe}),g=null}const lt=new im;lt.setAnimationLoop(at),this.setAnimationLoop=function(se){Ge=se},this.dispose=function(){}}}const vs=new ui,yE=new xt;function ME(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,em(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,_,E,M){p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,_,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Yt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Yt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const _=e.get(p),E=_.envMap,M=_.envMapRotation;E&&(m.envMap.value=E,vs.copy(M),vs.x*=-1,vs.y*=-1,vs.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(vs.y*=-1,vs.z*=-1),m.envMapRotation.value.setFromMatrix4(yE.makeRotationFromEuler(vs)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,_,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*_,m.scale.value=E*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,_){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Yt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const _=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function SE(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,E){const M=E.program;i.uniformBlockBinding(_,M)}function c(_,E){let M=s[_.id];M===void 0&&(g(_),M=h(_),s[_.id]=M,_.addEventListener("dispose",m));const A=E.program;i.updateUBOMapping(_,A);const C=e.render.frame;r[_.id]!==C&&(u(_),r[_.id]=C)}function h(_){const E=d();_.__bindingPointIndex=E;const M=n.createBuffer(),A=_.__size,C=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,A,C),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,M),M}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const E=s[_.id],M=_.uniforms,A=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let C=0,R=M.length;C<R;C++){const y=Array.isArray(M[C])?M[C]:[M[C]];for(let b=0,H=y.length;b<H;b++){const D=y[b];if(f(D,C,b,A)===!0){const L=D.__offset,I=Array.isArray(D.value)?D.value:[D.value];let B=0;for(let U=0;U<I.length;U++){const N=I[U],V=v(N);typeof N=="number"||typeof N=="boolean"?(D.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,L+B,D.__data)):N.isMatrix3?(D.__data[0]=N.elements[0],D.__data[1]=N.elements[1],D.__data[2]=N.elements[2],D.__data[3]=0,D.__data[4]=N.elements[3],D.__data[5]=N.elements[4],D.__data[6]=N.elements[5],D.__data[7]=0,D.__data[8]=N.elements[6],D.__data[9]=N.elements[7],D.__data[10]=N.elements[8],D.__data[11]=0):(N.toArray(D.__data,B),B+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,L,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(_,E,M,A){const C=_.value,R=E+"_"+M;if(A[R]===void 0)return typeof C=="number"||typeof C=="boolean"?A[R]=C:A[R]=C.clone(),!0;{const y=A[R];if(typeof C=="number"||typeof C=="boolean"){if(y!==C)return A[R]=C,!0}else if(y.equals(C)===!1)return y.copy(C),!0}return!1}function g(_){const E=_.uniforms;let M=0;const A=16;for(let R=0,y=E.length;R<y;R++){const b=Array.isArray(E[R])?E[R]:[E[R]];for(let H=0,D=b.length;H<D;H++){const L=b[H],I=Array.isArray(L.value)?L.value:[L.value];for(let B=0,U=I.length;B<U;B++){const N=I[B],V=v(N),q=M%A,Q=q%V.boundary,me=q+Q;M+=Q,me!==0&&A-me<V.storage&&(M+=A-me),L.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=M,M+=V.storage}}}const C=M%A;return C>0&&(M+=A-C),_.__size=M,_.__cache={},this}function v(_){const E={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(E.boundary=4,E.storage=4):_.isVector2?(E.boundary=8,E.storage=8):_.isVector3||_.isColor?(E.boundary=16,E.storage=12):_.isVector4?(E.boundary=16,E.storage=16):_.isMatrix3?(E.boundary=48,E.storage=48):_.isMatrix4?(E.boundary=64,E.storage=64):_.isTexture?qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):qe("WebGLRenderer: Unsupported uniform value type.",_),E}function m(_){const E=_.target;E.removeEventListener("dispose",m);const M=o.indexOf(E.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const _ in s)n.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}const EE=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Kn=null;function bE(){return Kn===null&&(Kn=new Nh(EE,16,16,yr,zi),Kn.name="DFG_LUT",Kn.minFilter=en,Kn.magFilter=en,Kn.wrapS=Li,Kn.wrapT=Li,Kn.generateMipmaps=!1,Kn.needsUpdate=!0),Kn}class wE{constructor(e={}){const{canvas:t=V_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=En}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const v=f,m=new Set([Ch,Ah,Th]),p=new Set([En,hi,ro,oo,bh,wh]),_=new Uint32Array(4),E=new Int32Array(4);let M=null,A=null;const C=[],R=[];let y=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let H=!1;this._outputColorSpace=on;let D=0,L=0,I=null,B=-1,U=null;const N=new At,V=new At;let q=null;const Q=new ot(0);let me=0,_e=t.width,ie=t.height,Ge=1,at=null,lt=null;const se=new At(0,0,_e,ie),pe=new At(0,0,_e,ie);let xe=!1;const Ye=new Fh;let Ve=!1,Xe=!1;const F=new xt,z=new W,X=new At,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Z=!1;function ae(){return I===null?Ge:1}let P=i;function he(T,k){return t.getContext(T,k)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Mh}`),t.addEventListener("webglcontextlost",Ne,!1),t.addEventListener("webglcontextrestored",je,!1),t.addEventListener("webglcontextcreationerror",St,!1),P===null){const k="webgl2";if(P=he(k,T),P===null)throw he(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw it("WebGLRenderer: "+T.message),T}let le,re,ce,w,x,O,Y,ee,j,Me,de,De,Ue,ue,ge,Se,Ce,Re,Ze,G,ye,ve,Ie;function fe(){le=new wM(P),le.init(),ye=new mE(P,le),re=new _M(P,le,e,ye),ce=new fE(P,le),re.reversedDepthBuffer&&u&&ce.buffers.depth.setReversed(!0),w=new CM(P),x=new QS,O=new pE(P,le,ce,x,re,ye,w),Y=new bM(b),ee=new Lv(P),ve=new mM(P,ee),j=new TM(P,ee,w,ve),Me=new PM(P,j,ee,ve,w),Re=new RM(P,re,O),ge=new vM(x),de=new JS(b,Y,le,re,ve,ge),De=new ME(b,x),Ue=new tE,ue=new aE(le),Ce=new pM(b,Y,ce,Me,g,l),Se=new dE(b,Me,re),Ie=new SE(P,w,re,ce),Ze=new gM(P,le,w),G=new AM(P,le,w),w.programs=de.programs,b.capabilities=re,b.extensions=le,b.properties=x,b.renderLists=Ue,b.shadowMap=Se,b.state=ce,b.info=w}fe(),v!==En&&(y=new IM(v,t.width,t.height,s,r));const te=new xE(b,P);this.xr=te,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=le.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=le.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Ge},this.setPixelRatio=function(T){T!==void 0&&(Ge=T,this.setSize(_e,ie,!1))},this.getSize=function(T){return T.set(_e,ie)},this.setSize=function(T,k,J=!0){if(te.isPresenting){qe("WebGLRenderer: Can't change size while VR device is presenting.");return}_e=T,ie=k,t.width=Math.floor(T*Ge),t.height=Math.floor(k*Ge),J===!0&&(t.style.width=T+"px",t.style.height=k+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(_e*Ge,ie*Ge).floor()},this.setDrawingBufferSize=function(T,k,J){_e=T,ie=k,Ge=J,t.width=Math.floor(T*J),t.height=Math.floor(k*J),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(v===En){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(N)},this.getViewport=function(T){return T.copy(se)},this.setViewport=function(T,k,J,K){T.isVector4?se.set(T.x,T.y,T.z,T.w):se.set(T,k,J,K),ce.viewport(N.copy(se).multiplyScalar(Ge).round())},this.getScissor=function(T){return T.copy(pe)},this.setScissor=function(T,k,J,K){T.isVector4?pe.set(T.x,T.y,T.z,T.w):pe.set(T,k,J,K),ce.scissor(V.copy(pe).multiplyScalar(Ge).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(T){ce.setScissorTest(xe=T)},this.setOpaqueSort=function(T){at=T},this.setTransparentSort=function(T){lt=T},this.getClearColor=function(T){return T.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,J=!0){let K=0;if(T){let $=!1;if(I!==null){const we=I.texture.format;$=m.has(we)}if($){const we=I.texture.type,Pe=p.has(we),Te=Ce.getClearColor(),Fe=Ce.getClearAlpha(),ze=Te.r,Je=Te.g,tt=Te.b;Pe?(_[0]=ze,_[1]=Je,_[2]=tt,_[3]=Fe,P.clearBufferuiv(P.COLOR,0,_)):(E[0]=ze,E[1]=Je,E[2]=tt,E[3]=Fe,P.clearBufferiv(P.COLOR,0,E))}else K|=P.COLOR_BUFFER_BIT}k&&(K|=P.DEPTH_BUFFER_BIT),J&&(K|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&P.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ne,!1),t.removeEventListener("webglcontextrestored",je,!1),t.removeEventListener("webglcontextcreationerror",St,!1),Ce.dispose(),Ue.dispose(),ue.dispose(),x.dispose(),Y.dispose(),Me.dispose(),ve.dispose(),Ie.dispose(),de.dispose(),te.dispose(),te.removeEventListener("sessionstart",Gh),te.removeEventListener("sessionend",kh),as.stop()};function Ne(T){T.preventDefault(),Wu("WebGLRenderer: Context Lost."),H=!0}function je(){Wu("WebGLRenderer: Context Restored."),H=!1;const T=w.autoReset,k=Se.enabled,J=Se.autoUpdate,K=Se.needsUpdate,$=Se.type;fe(),w.autoReset=T,Se.enabled=k,Se.autoUpdate=J,Se.needsUpdate=K,Se.type=$}function St(T){it("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function dt(T){const k=T.target;k.removeEventListener("dispose",dt),fi(k)}function fi(T){pi(T),x.remove(T)}function pi(T){const k=x.get(T).programs;k!==void 0&&(k.forEach(function(J){de.releaseProgram(J)}),T.isShaderMaterial&&de.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,J,K,$,we){k===null&&(k=oe);const Pe=$.isMesh&&$.matrixWorld.determinant()<0,Te=Am(T,k,J,K,$);ce.setMaterial(K,Pe);let Fe=J.index,ze=1;if(K.wireframe===!0){if(Fe=j.getWireframeAttribute(J),Fe===void 0)return;ze=2}const Je=J.drawRange,tt=J.attributes.position;let He=Je.start*ze,gt=(Je.start+Je.count)*ze;we!==null&&(He=Math.max(He,we.start*ze),gt=Math.min(gt,(we.start+we.count)*ze)),Fe!==null?(He=Math.max(He,0),gt=Math.min(gt,Fe.count)):tt!=null&&(He=Math.max(He,0),gt=Math.min(gt,tt.count));const Ct=gt-He;if(Ct<0||Ct===1/0)return;ve.setup($,K,Te,J,Fe);let wt,_t=Ze;if(Fe!==null&&(wt=ee.get(Fe),_t=G,_t.setIndex(wt)),$.isMesh)K.wireframe===!0?(ce.setLineWidth(K.wireframeLinewidth*ae()),_t.setMode(P.LINES)):_t.setMode(P.TRIANGLES);else if($.isLine){let $t=K.linewidth;$t===void 0&&($t=1),ce.setLineWidth($t*ae()),$.isLineSegments?_t.setMode(P.LINES):$.isLineLoop?_t.setMode(P.LINE_LOOP):_t.setMode(P.LINE_STRIP)}else $.isPoints?_t.setMode(P.POINTS):$.isSprite&&_t.setMode(P.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)Ra("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),_t.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(le.get("WEBGL_multi_draw"))_t.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const $t=$._multiDrawStarts,Oe=$._multiDrawCounts,vn=$._multiDrawCount,rt=Fe?ee.get(Fe).bytesPerElement:1,Ln=x.get(K).currentProgram.getUniforms();for(let Yn=0;Yn<vn;Yn++)Ln.setValue(P,"_gl_DrawID",Yn),_t.render($t[Yn]/rt,Oe[Yn])}else if($.isInstancedMesh)_t.renderInstances(He,Ct,$.count);else if(J.isInstancedBufferGeometry){const $t=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Oe=Math.min(J.instanceCount,$t);_t.renderInstances(He,Ct,Oe)}else _t.render(He,Ct)};function Vh(T,k,J){T.transparent===!0&&T.side===Di&&T.forceSinglePass===!1?(T.side=Yt,T.needsUpdate=!0,yo(T,k,J),T.side=ci,T.needsUpdate=!0,yo(T,k,J),T.side=Di):yo(T,k,J)}this.compile=function(T,k,J=null){J===null&&(J=T),A=ue.get(J),A.init(k),R.push(A),J.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(A.pushLight($),$.castShadow&&A.pushShadow($))}),T!==J&&T.traverseVisible(function($){$.isLight&&$.layers.test(k.layers)&&(A.pushLight($),$.castShadow&&A.pushShadow($))}),A.setupLights();const K=new Set;return T.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const we=$.material;if(we)if(Array.isArray(we))for(let Pe=0;Pe<we.length;Pe++){const Te=we[Pe];Vh(Te,J,$),K.add(Te)}else Vh(we,J,$),K.add(we)}),A=R.pop(),K},this.compileAsync=function(T,k,J=null){const K=this.compile(T,k,J);return new Promise($=>{function we(){if(K.forEach(function(Pe){x.get(Pe).currentProgram.isReady()&&K.delete(Pe)}),K.size===0){$(T);return}setTimeout(we,10)}le.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let tl=null;function Tm(T){tl&&tl(T)}function Gh(){as.stop()}function kh(){as.start()}const as=new im;as.setAnimationLoop(Tm),typeof self<"u"&&as.setContext(self),this.setAnimationLoop=function(T){tl=T,te.setAnimationLoop(T),T===null?as.stop():as.start()},te.addEventListener("sessionstart",Gh),te.addEventListener("sessionend",kh),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;const J=te.enabled===!0&&te.isPresenting===!0,K=y!==null&&(I===null||J)&&y.begin(b,I);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(te.cameraAutoUpdate===!0&&te.updateCamera(k),k=te.getCamera()),T.isScene===!0&&T.onBeforeRender(b,T,k,I),A=ue.get(T,R.length),A.init(k),R.push(A),F.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),Ye.setFromProjectionMatrix(F,si,k.reversedDepth),Xe=this.localClippingEnabled,Ve=ge.init(this.clippingPlanes,Xe),M=Ue.get(T,C.length),M.init(),C.push(M),te.enabled===!0&&te.isPresenting===!0){const Pe=b.xr.getDepthSensingMesh();Pe!==null&&nl(Pe,k,-1/0,b.sortObjects)}nl(T,k,0,b.sortObjects),M.finish(),b.sortObjects===!0&&M.sort(at,lt),Z=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,Z&&Ce.addToRenderList(M,T),this.info.render.frame++,Ve===!0&&ge.beginShadows();const $=A.state.shadowsArray;if(Se.render($,T,k),Ve===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),(K&&y.hasRenderPass())===!1){const Pe=M.opaque,Te=M.transmissive;if(A.setupLights(),k.isArrayCamera){const Fe=k.cameras;if(Te.length>0)for(let ze=0,Je=Fe.length;ze<Je;ze++){const tt=Fe[ze];Xh(Pe,Te,T,tt)}Z&&Ce.render(T);for(let ze=0,Je=Fe.length;ze<Je;ze++){const tt=Fe[ze];Wh(M,T,tt,tt.viewport)}}else Te.length>0&&Xh(Pe,Te,T,k),Z&&Ce.render(T),Wh(M,T,k)}I!==null&&L===0&&(O.updateMultisampleRenderTarget(I),O.updateRenderTargetMipmap(I)),K&&y.end(b),T.isScene===!0&&T.onAfterRender(b,T,k),ve.resetDefaultState(),B=-1,U=null,R.pop(),R.length>0?(A=R[R.length-1],Ve===!0&&ge.setGlobalState(b.clippingPlanes,A.state.camera)):A=null,C.pop(),C.length>0?M=C[C.length-1]:M=null};function nl(T,k,J,K){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLight)A.pushLight(T),T.castShadow&&A.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ye.intersectsSprite(T)){K&&X.setFromMatrixPosition(T.matrixWorld).applyMatrix4(F);const Pe=Me.update(T),Te=T.material;Te.visible&&M.push(T,Pe,Te,J,X.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ye.intersectsObject(T))){const Pe=Me.update(T),Te=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),X.copy(T.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),X.copy(Pe.boundingSphere.center)),X.applyMatrix4(T.matrixWorld).applyMatrix4(F)),Array.isArray(Te)){const Fe=Pe.groups;for(let ze=0,Je=Fe.length;ze<Je;ze++){const tt=Fe[ze],He=Te[tt.materialIndex];He&&He.visible&&M.push(T,Pe,He,J,X.z,tt)}}else Te.visible&&M.push(T,Pe,Te,J,X.z,null)}}const we=T.children;for(let Pe=0,Te=we.length;Pe<Te;Pe++)nl(we[Pe],k,J,K)}function Wh(T,k,J,K){const{opaque:$,transmissive:we,transparent:Pe}=T;A.setupLightsView(J),Ve===!0&&ge.setGlobalState(b.clippingPlanes,J),K&&ce.viewport(N.copy(K)),$.length>0&&xo($,k,J),we.length>0&&xo(we,k,J),Pe.length>0&&xo(Pe,k,J),ce.buffers.depth.setTest(!0),ce.buffers.depth.setMask(!0),ce.buffers.color.setMask(!0),ce.setPolygonOffset(!1)}function Xh(T,k,J,K){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[K.id]===void 0){const He=le.has("EXT_color_buffer_half_float")||le.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[K.id]=new ai(1,1,{generateMipmaps:!0,type:He?zi:En,minFilter:Cs,samples:Math.max(4,re.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace})}const we=A.state.transmissionRenderTarget[K.id],Pe=K.viewport||N;we.setSize(Pe.z*b.transmissionResolutionScale,Pe.w*b.transmissionResolutionScale);const Te=b.getRenderTarget(),Fe=b.getActiveCubeFace(),ze=b.getActiveMipmapLevel();b.setRenderTarget(we),b.getClearColor(Q),me=b.getClearAlpha(),me<1&&b.setClearColor(16777215,.5),b.clear(),Z&&Ce.render(J);const Je=b.toneMapping;b.toneMapping=oi;const tt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),A.setupLightsView(K),Ve===!0&&ge.setGlobalState(b.clippingPlanes,K),xo(T,J,K),O.updateMultisampleRenderTarget(we),O.updateRenderTargetMipmap(we),le.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let gt=0,Ct=k.length;gt<Ct;gt++){const wt=k[gt],{object:_t,geometry:$t,material:Oe,group:vn}=wt;if(Oe.side===Di&&_t.layers.test(K.layers)){const rt=Oe.side;Oe.side=Yt,Oe.needsUpdate=!0,qh(_t,J,K,$t,Oe,vn),Oe.side=rt,Oe.needsUpdate=!0,He=!0}}He===!0&&(O.updateMultisampleRenderTarget(we),O.updateRenderTargetMipmap(we))}b.setRenderTarget(Te,Fe,ze),b.setClearColor(Q,me),tt!==void 0&&(K.viewport=tt),b.toneMapping=Je}function xo(T,k,J){const K=k.isScene===!0?k.overrideMaterial:null;for(let $=0,we=T.length;$<we;$++){const Pe=T[$],{object:Te,geometry:Fe,group:ze}=Pe;let Je=Pe.material;Je.allowOverride===!0&&K!==null&&(Je=K),Te.layers.test(J.layers)&&qh(Te,k,J,Fe,Je,ze)}}function qh(T,k,J,K,$,we){T.onBeforeRender(b,k,J,K,$,we),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),$.onBeforeRender(b,k,J,K,T,we),$.transparent===!0&&$.side===Di&&$.forceSinglePass===!1?($.side=Yt,$.needsUpdate=!0,b.renderBufferDirect(J,k,K,$,T,we),$.side=ci,$.needsUpdate=!0,b.renderBufferDirect(J,k,K,$,T,we),$.side=Di):b.renderBufferDirect(J,k,K,$,T,we),T.onAfterRender(b,k,J,K,$,we)}function yo(T,k,J){k.isScene!==!0&&(k=oe);const K=x.get(T),$=A.state.lights,we=A.state.shadowsArray,Pe=$.state.version,Te=de.getParameters(T,$.state,we,k,J),Fe=de.getProgramCacheKey(Te);let ze=K.programs;K.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,K.fog=k.fog;const Je=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;K.envMap=Y.get(T.envMap||K.environment,Je),K.envMapRotation=K.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,ze===void 0&&(T.addEventListener("dispose",dt),ze=new Map,K.programs=ze);let tt=ze.get(Fe);if(tt!==void 0){if(K.currentProgram===tt&&K.lightsStateVersion===Pe)return jh(T,Te),tt}else Te.uniforms=de.getUniforms(T),T.onBeforeCompile(Te,b),tt=de.acquireProgram(Te,Fe),ze.set(Fe,tt),K.uniforms=Te.uniforms;const He=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(He.clippingPlanes=ge.uniform),jh(T,Te),K.needsLights=Rm(T),K.lightsStateVersion=Pe,K.needsLights&&(He.ambientLightColor.value=$.state.ambient,He.lightProbe.value=$.state.probe,He.directionalLights.value=$.state.directional,He.directionalLightShadows.value=$.state.directionalShadow,He.spotLights.value=$.state.spot,He.spotLightShadows.value=$.state.spotShadow,He.rectAreaLights.value=$.state.rectArea,He.ltc_1.value=$.state.rectAreaLTC1,He.ltc_2.value=$.state.rectAreaLTC2,He.pointLights.value=$.state.point,He.pointLightShadows.value=$.state.pointShadow,He.hemisphereLights.value=$.state.hemi,He.directionalShadowMatrix.value=$.state.directionalShadowMatrix,He.spotLightMatrix.value=$.state.spotLightMatrix,He.spotLightMap.value=$.state.spotLightMap,He.pointShadowMatrix.value=$.state.pointShadowMatrix),K.currentProgram=tt,K.uniformsList=null,tt}function Yh(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=fa.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function jh(T,k){const J=x.get(T);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function Am(T,k,J,K,$){k.isScene!==!0&&(k=oe),O.resetTextureUnits();const we=k.fog,Pe=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?k.environment:null,Te=I===null?b.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Mr,Fe=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,ze=Y.get(K.envMap||Pe,Fe),Je=K.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,tt=!!J.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),He=!!J.morphAttributes.position,gt=!!J.morphAttributes.normal,Ct=!!J.morphAttributes.color;let wt=oi;K.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(wt=b.toneMapping);const _t=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,$t=_t!==void 0?_t.length:0,Oe=x.get(K),vn=A.state.lights;if(Ve===!0&&(Xe===!0||T!==U)){const Vt=T===U&&K.id===B;ge.setState(K,T,Vt)}let rt=!1;K.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==vn.state.version||Oe.outputColorSpace!==Te||$.isBatchedMesh&&Oe.batching===!1||!$.isBatchedMesh&&Oe.batching===!0||$.isBatchedMesh&&Oe.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&Oe.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&Oe.instancing===!1||!$.isInstancedMesh&&Oe.instancing===!0||$.isSkinnedMesh&&Oe.skinning===!1||!$.isSkinnedMesh&&Oe.skinning===!0||$.isInstancedMesh&&Oe.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Oe.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Oe.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Oe.instancingMorph===!1&&$.morphTexture!==null||Oe.envMap!==ze||K.fog===!0&&Oe.fog!==we||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ge.numPlanes||Oe.numIntersection!==ge.numIntersection)||Oe.vertexAlphas!==Je||Oe.vertexTangents!==tt||Oe.morphTargets!==He||Oe.morphNormals!==gt||Oe.morphColors!==Ct||Oe.toneMapping!==wt||Oe.morphTargetsCount!==$t)&&(rt=!0):(rt=!0,Oe.__version=K.version);let Ln=Oe.currentProgram;rt===!0&&(Ln=yo(K,k,$));let Yn=!1,ls=!1,Bs=!1;const yt=Ln.getUniforms(),Wt=Oe.uniforms;if(ce.useProgram(Ln.program)&&(Yn=!0,ls=!0,Bs=!0),K.id!==B&&(B=K.id,ls=!0),Yn||U!==T){ce.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),yt.setValue(P,"projectionMatrix",T.projectionMatrix),yt.setValue(P,"viewMatrix",T.matrixWorldInverse);const ki=yt.map.cameraPosition;ki!==void 0&&ki.setValue(P,z.setFromMatrixPosition(T.matrixWorld)),re.logarithmicDepthBuffer&&yt.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&yt.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),U!==T&&(U=T,ls=!0,Bs=!0)}if(Oe.needsLights&&(vn.state.directionalShadowMap.length>0&&yt.setValue(P,"directionalShadowMap",vn.state.directionalShadowMap,O),vn.state.spotShadowMap.length>0&&yt.setValue(P,"spotShadowMap",vn.state.spotShadowMap,O),vn.state.pointShadowMap.length>0&&yt.setValue(P,"pointShadowMap",vn.state.pointShadowMap,O)),$.isSkinnedMesh){yt.setOptional(P,$,"bindMatrix"),yt.setOptional(P,$,"bindMatrixInverse");const Vt=$.skeleton;Vt&&(Vt.boneTexture===null&&Vt.computeBoneTexture(),yt.setValue(P,"boneTexture",Vt.boneTexture,O))}$.isBatchedMesh&&(yt.setOptional(P,$,"batchingTexture"),yt.setValue(P,"batchingTexture",$._matricesTexture,O),yt.setOptional(P,$,"batchingIdTexture"),yt.setValue(P,"batchingIdTexture",$._indirectTexture,O),yt.setOptional(P,$,"batchingColorTexture"),$._colorsTexture!==null&&yt.setValue(P,"batchingColorTexture",$._colorsTexture,O));const Gi=J.morphAttributes;if((Gi.position!==void 0||Gi.normal!==void 0||Gi.color!==void 0)&&Re.update($,J,Ln),(ls||Oe.receiveShadow!==$.receiveShadow)&&(Oe.receiveShadow=$.receiveShadow,yt.setValue(P,"receiveShadow",$.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&k.environment!==null&&(Wt.envMapIntensity.value=k.environmentIntensity),Wt.dfgLUT!==void 0&&(Wt.dfgLUT.value=bE()),ls&&(yt.setValue(P,"toneMappingExposure",b.toneMappingExposure),Oe.needsLights&&Cm(Wt,Bs),we&&K.fog===!0&&De.refreshFogUniforms(Wt,we),De.refreshMaterialUniforms(Wt,K,Ge,ie,A.state.transmissionRenderTarget[T.id]),fa.upload(P,Yh(Oe),Wt,O)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(fa.upload(P,Yh(Oe),Wt,O),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&yt.setValue(P,"center",$.center),yt.setValue(P,"modelViewMatrix",$.modelViewMatrix),yt.setValue(P,"normalMatrix",$.normalMatrix),yt.setValue(P,"modelMatrix",$.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const Vt=K.uniformsGroups;for(let ki=0,zs=Vt.length;ki<zs;ki++){const $h=Vt[ki];Ie.update($h,Ln),Ie.bind($h,Ln)}}return Ln}function Cm(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Rm(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,k,J){const K=x.get(T);K.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),x.get(T.texture).__webglTexture=k,x.get(T.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:J,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const J=x.get(T);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0};const Pm=P.createFramebuffer();this.setRenderTarget=function(T,k=0,J=0){I=T,D=k,L=J;let K=null,$=!1,we=!1;if(T){const Te=x.get(T);if(Te.__useDefaultFramebuffer!==void 0){ce.bindFramebuffer(P.FRAMEBUFFER,Te.__webglFramebuffer),N.copy(T.viewport),V.copy(T.scissor),q=T.scissorTest,ce.viewport(N),ce.scissor(V),ce.setScissorTest(q),B=-1;return}else if(Te.__webglFramebuffer===void 0)O.setupRenderTarget(T);else if(Te.__hasExternalTextures)O.rebindTextures(T,x.get(T.texture).__webglTexture,x.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Je=T.depthTexture;if(Te.__boundDepthTexture!==Je){if(Je!==null&&x.has(Je)&&(T.width!==Je.image.width||T.height!==Je.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");O.setupDepthRenderbuffer(T)}}const Fe=T.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(we=!0);const ze=x.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ze[k])?K=ze[k][J]:K=ze[k],$=!0):T.samples>0&&O.useMultisampledRTT(T)===!1?K=x.get(T).__webglMultisampledFramebuffer:Array.isArray(ze)?K=ze[J]:K=ze,N.copy(T.viewport),V.copy(T.scissor),q=T.scissorTest}else N.copy(se).multiplyScalar(Ge).floor(),V.copy(pe).multiplyScalar(Ge).floor(),q=xe;if(J!==0&&(K=Pm),ce.bindFramebuffer(P.FRAMEBUFFER,K)&&ce.drawBuffers(T,K),ce.viewport(N),ce.scissor(V),ce.setScissorTest(q),$){const Te=x.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+k,Te.__webglTexture,J)}else if(we){const Te=k;for(let Fe=0;Fe<T.textures.length;Fe++){const ze=x.get(T.textures[Fe]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Fe,ze.__webglTexture,J,Te)}}else if(T!==null&&J!==0){const Te=x.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Te.__webglTexture,J)}B=-1},this.readRenderTargetPixels=function(T,k,J,K,$,we,Pe,Te=0){if(!(T&&T.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=x.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pe!==void 0&&(Fe=Fe[Pe]),Fe){ce.bindFramebuffer(P.FRAMEBUFFER,Fe);try{const ze=T.textures[Te],Je=ze.format,tt=ze.type;if(T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Te),!re.textureFormatReadable(Je)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(tt)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-K&&J>=0&&J<=T.height-$&&P.readPixels(k,J,K,$,ye.convert(Je),ye.convert(tt),we)}finally{const ze=I!==null?x.get(I).__webglFramebuffer:null;ce.bindFramebuffer(P.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(T,k,J,K,$,we,Pe,Te=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Fe=x.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pe!==void 0&&(Fe=Fe[Pe]),Fe)if(k>=0&&k<=T.width-K&&J>=0&&J<=T.height-$){ce.bindFramebuffer(P.FRAMEBUFFER,Fe);const ze=T.textures[Te],Je=ze.format,tt=ze.type;if(T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+Te),!re.textureFormatReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const He=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,He),P.bufferData(P.PIXEL_PACK_BUFFER,we.byteLength,P.STREAM_READ),P.readPixels(k,J,K,$,ye.convert(Je),ye.convert(tt),0);const gt=I!==null?x.get(I).__webglFramebuffer:null;ce.bindFramebuffer(P.FRAMEBUFFER,gt);const Ct=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await G_(P,Ct,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,He),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,we),P.deleteBuffer(He),P.deleteSync(Ct),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,J=0){const K=Math.pow(2,-J),$=Math.floor(T.image.width*K),we=Math.floor(T.image.height*K),Pe=k!==null?k.x:0,Te=k!==null?k.y:0;O.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,J,0,0,Pe,Te,$,we),ce.unbindTexture()};const Dm=P.createFramebuffer(),Im=P.createFramebuffer();this.copyTextureToTexture=function(T,k,J=null,K=null,$=0,we=0){let Pe,Te,Fe,ze,Je,tt,He,gt,Ct;const wt=T.isCompressedTexture?T.mipmaps[we]:T.image;if(J!==null)Pe=J.max.x-J.min.x,Te=J.max.y-J.min.y,Fe=J.isBox3?J.max.z-J.min.z:1,ze=J.min.x,Je=J.min.y,tt=J.isBox3?J.min.z:0;else{const Wt=Math.pow(2,-$);Pe=Math.floor(wt.width*Wt),Te=Math.floor(wt.height*Wt),T.isDataArrayTexture?Fe=wt.depth:T.isData3DTexture?Fe=Math.floor(wt.depth*Wt):Fe=1,ze=0,Je=0,tt=0}K!==null?(He=K.x,gt=K.y,Ct=K.z):(He=0,gt=0,Ct=0);const _t=ye.convert(k.format),$t=ye.convert(k.type);let Oe;k.isData3DTexture?(O.setTexture3D(k,0),Oe=P.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(O.setTexture2DArray(k,0),Oe=P.TEXTURE_2D_ARRAY):(O.setTexture2D(k,0),Oe=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,k.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,k.unpackAlignment);const vn=P.getParameter(P.UNPACK_ROW_LENGTH),rt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ln=P.getParameter(P.UNPACK_SKIP_PIXELS),Yn=P.getParameter(P.UNPACK_SKIP_ROWS),ls=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,wt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,wt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ze),P.pixelStorei(P.UNPACK_SKIP_ROWS,Je),P.pixelStorei(P.UNPACK_SKIP_IMAGES,tt);const Bs=T.isDataArrayTexture||T.isData3DTexture,yt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const Wt=x.get(T),Gi=x.get(k),Vt=x.get(Wt.__renderTarget),ki=x.get(Gi.__renderTarget);ce.bindFramebuffer(P.READ_FRAMEBUFFER,Vt.__webglFramebuffer),ce.bindFramebuffer(P.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let zs=0;zs<Fe;zs++)Bs&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,x.get(T).__webglTexture,$,tt+zs),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,x.get(k).__webglTexture,we,Ct+zs)),P.blitFramebuffer(ze,Je,Pe,Te,He,gt,Pe,Te,P.DEPTH_BUFFER_BIT,P.NEAREST);ce.bindFramebuffer(P.READ_FRAMEBUFFER,null),ce.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if($!==0||T.isRenderTargetTexture||x.has(T)){const Wt=x.get(T),Gi=x.get(k);ce.bindFramebuffer(P.READ_FRAMEBUFFER,Dm),ce.bindFramebuffer(P.DRAW_FRAMEBUFFER,Im);for(let Vt=0;Vt<Fe;Vt++)Bs?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Wt.__webglTexture,$,tt+Vt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Wt.__webglTexture,$),yt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Gi.__webglTexture,we,Ct+Vt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Gi.__webglTexture,we),$!==0?P.blitFramebuffer(ze,Je,Pe,Te,He,gt,Pe,Te,P.COLOR_BUFFER_BIT,P.NEAREST):yt?P.copyTexSubImage3D(Oe,we,He,gt,Ct+Vt,ze,Je,Pe,Te):P.copyTexSubImage2D(Oe,we,He,gt,ze,Je,Pe,Te);ce.bindFramebuffer(P.READ_FRAMEBUFFER,null),ce.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else yt?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(Oe,we,He,gt,Ct,Pe,Te,Fe,_t,$t,wt.data):k.isCompressedArrayTexture?P.compressedTexSubImage3D(Oe,we,He,gt,Ct,Pe,Te,Fe,_t,wt.data):P.texSubImage3D(Oe,we,He,gt,Ct,Pe,Te,Fe,_t,$t,wt):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,we,He,gt,Pe,Te,_t,$t,wt.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,we,He,gt,wt.width,wt.height,_t,wt.data):P.texSubImage2D(P.TEXTURE_2D,we,He,gt,Pe,Te,_t,$t,wt);P.pixelStorei(P.UNPACK_ROW_LENGTH,vn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,rt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ln),P.pixelStorei(P.UNPACK_SKIP_ROWS,Yn),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ls),we===0&&k.generateMipmaps&&P.generateMipmap(Oe),ce.unbindTexture()},this.initRenderTarget=function(T){x.get(T).__webglFramebuffer===void 0&&O.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?O.setTextureCube(T,0):T.isData3DTexture?O.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?O.setTexture2DArray(T,0):O.setTexture2D(T,0),ce.unbindTexture()},this.resetState=function(){D=0,L=0,I=null,ce.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}class Vn{constructor(e){e===void 0&&(e=[0,0,0,0,0,0,0,0,0]),this.elements=e}identity(){const e=this.elements;e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1}setZero(){const e=this.elements;e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e[8]=0}setTrace(e){const t=this.elements;t[0]=e.x,t[4]=e.y,t[8]=e.z}getTrace(e){e===void 0&&(e=new S);const t=this.elements;return e.x=t[0],e.y=t[4],e.z=t[8],e}vmult(e,t){t===void 0&&(t=new S);const i=this.elements,s=e.x,r=e.y,o=e.z;return t.x=i[0]*s+i[1]*r+i[2]*o,t.y=i[3]*s+i[4]*r+i[5]*o,t.z=i[6]*s+i[7]*r+i[8]*o,t}smult(e){for(let t=0;t<this.elements.length;t++)this.elements[t]*=e}mmult(e,t){t===void 0&&(t=new Vn);const i=this.elements,s=e.elements,r=t.elements,o=i[0],a=i[1],l=i[2],c=i[3],h=i[4],d=i[5],u=i[6],f=i[7],g=i[8],v=s[0],m=s[1],p=s[2],_=s[3],E=s[4],M=s[5],A=s[6],C=s[7],R=s[8];return r[0]=o*v+a*_+l*A,r[1]=o*m+a*E+l*C,r[2]=o*p+a*M+l*R,r[3]=c*v+h*_+d*A,r[4]=c*m+h*E+d*C,r[5]=c*p+h*M+d*R,r[6]=u*v+f*_+g*A,r[7]=u*m+f*E+g*C,r[8]=u*p+f*M+g*R,t}scale(e,t){t===void 0&&(t=new Vn);const i=this.elements,s=t.elements;for(let r=0;r!==3;r++)s[3*r+0]=e.x*i[3*r+0],s[3*r+1]=e.y*i[3*r+1],s[3*r+2]=e.z*i[3*r+2];return t}solve(e,t){t===void 0&&(t=new S);const i=3,s=4,r=[];let o,a;for(o=0;o<i*s;o++)r.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)r[o+s*a]=this.elements[o+3*a];r[3]=e.x,r[7]=e.y,r[11]=e.z;let l=3;const c=l;let h;const d=4;let u;do{if(o=c-l,r[o+s*o]===0){for(a=o+1;a<c;a++)if(r[o+s*a]!==0){h=d;do u=d-h,r[u+s*o]+=r[u+s*a];while(--h);break}}if(r[o+s*o]!==0)for(a=o+1;a<c;a++){const f=r[o+s*a]/r[o+s*o];h=d;do u=d-h,r[u+s*a]=u<=o?0:r[u+s*a]-r[u+s*o]*f;while(--h)}}while(--l);if(t.z=r[2*s+3]/r[2*s+2],t.y=(r[1*s+3]-r[1*s+2]*t.z)/r[1*s+1],t.x=(r[0*s+3]-r[0*s+2]*t.z-r[0*s+1]*t.y)/r[0*s+0],isNaN(t.x)||isNaN(t.y)||isNaN(t.z)||t.x===1/0||t.y===1/0||t.z===1/0)throw`Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;return t}e(e,t,i){if(i===void 0)return this.elements[t+3*e];this.elements[t+3*e]=i}copy(e){for(let t=0;t<e.elements.length;t++)this.elements[t]=e.elements[t];return this}toString(){let e="";for(let i=0;i<9;i++)e+=this.elements[i]+",";return e}reverse(e){e===void 0&&(e=new Vn);const t=3,i=6,s=TE;let r,o;for(r=0;r<3;r++)for(o=0;o<3;o++)s[r+i*o]=this.elements[r+3*o];s[3]=1,s[9]=0,s[15]=0,s[4]=0,s[10]=1,s[16]=0,s[5]=0,s[11]=0,s[17]=1;let a=3;const l=a;let c;const h=i;let d;do{if(r=l-a,s[r+i*r]===0){for(o=r+1;o<l;o++)if(s[r+i*o]!==0){c=h;do d=h-c,s[d+i*r]+=s[d+i*o];while(--c);break}}if(s[r+i*r]!==0)for(o=r+1;o<l;o++){const u=s[r+i*o]/s[r+i*r];c=h;do d=h-c,s[d+i*o]=d<=r?0:s[d+i*o]-s[d+i*r]*u;while(--c)}}while(--a);r=2;do{o=r-1;do{const u=s[r+i*o]/s[r+i*r];c=i;do d=i-c,s[d+i*o]=s[d+i*o]-s[d+i*r]*u;while(--c)}while(o--)}while(--r);r=2;do{const u=1/s[r+i*r];c=i;do d=i-c,s[d+i*r]=s[d+i*r]*u;while(--c)}while(r--);r=2;do{o=2;do{if(d=s[t+o+i*r],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;e.e(r,o,d)}while(o--)}while(r--);return e}setRotationFromQuaternion(e){const t=e.x,i=e.y,s=e.z,r=e.w,o=t+t,a=i+i,l=s+s,c=t*o,h=t*a,d=t*l,u=i*a,f=i*l,g=s*l,v=r*o,m=r*a,p=r*l,_=this.elements;return _[0]=1-(u+g),_[1]=h-p,_[2]=d+m,_[3]=h+p,_[4]=1-(c+g),_[5]=f-v,_[6]=d-m,_[7]=f+v,_[8]=1-(c+u),this}transpose(e){e===void 0&&(e=new Vn);const t=this.elements,i=e.elements;let s;return i[0]=t[0],i[4]=t[4],i[8]=t[8],s=t[1],i[1]=t[3],i[3]=s,s=t[2],i[2]=t[6],i[6]=s,s=t[5],i[5]=t[7],i[7]=s,e}}const TE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class S{constructor(e,t,i){e===void 0&&(e=0),t===void 0&&(t=0),i===void 0&&(i=0),this.x=e,this.y=t,this.z=i}cross(e,t){t===void 0&&(t=new S);const i=e.x,s=e.y,r=e.z,o=this.x,a=this.y,l=this.z;return t.x=a*r-l*s,t.y=l*i-o*r,t.z=o*s-a*i,t}set(e,t,i){return this.x=e,this.y=t,this.z=i,this}setZero(){this.x=this.y=this.z=0}vadd(e,t){if(t)t.x=e.x+this.x,t.y=e.y+this.y,t.z=e.z+this.z;else return new S(this.x+e.x,this.y+e.y,this.z+e.z)}vsub(e,t){if(t)t.x=this.x-e.x,t.y=this.y-e.y,t.z=this.z-e.z;else return new S(this.x-e.x,this.y-e.y,this.z-e.z)}crossmat(){return new Vn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const e=this.x,t=this.y,i=this.z,s=Math.sqrt(e*e+t*t+i*i);if(s>0){const r=1/s;this.x*=r,this.y*=r,this.z*=r}else this.x=0,this.y=0,this.z=0;return s}unit(e){e===void 0&&(e=new S);const t=this.x,i=this.y,s=this.z;let r=Math.sqrt(t*t+i*i+s*s);return r>0?(r=1/r,e.x=t*r,e.y=i*r,e.z=s*r):(e.x=1,e.y=0,e.z=0),e}length(){const e=this.x,t=this.y,i=this.z;return Math.sqrt(e*e+t*t+i*i)}lengthSquared(){return this.dot(this)}distanceTo(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z;return Math.sqrt((r-t)*(r-t)+(o-i)*(o-i)+(a-s)*(a-s))}distanceSquared(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z;return(r-t)*(r-t)+(o-i)*(o-i)+(a-s)*(a-s)}scale(e,t){t===void 0&&(t=new S);const i=this.x,s=this.y,r=this.z;return t.x=e*i,t.y=e*s,t.z=e*r,t}vmul(e,t){return t===void 0&&(t=new S),t.x=e.x*this.x,t.y=e.y*this.y,t.z=e.z*this.z,t}addScaledVector(e,t,i){return i===void 0&&(i=new S),i.x=this.x+e*t.x,i.y=this.y+e*t.y,i.z=this.z+e*t.z,i}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(e){return e===void 0&&(e=new S),e.x=-this.x,e.y=-this.y,e.z=-this.z,e}tangents(e,t){const i=this.length();if(i>0){const s=AE,r=1/i;s.set(this.x*r,this.y*r,this.z*r);const o=CE;Math.abs(s.x)<.9?(o.set(1,0,0),s.cross(o,e)):(o.set(0,1,0),s.cross(o,e)),s.cross(e,t)}else e.set(1,0,0),t.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}lerp(e,t,i){const s=this.x,r=this.y,o=this.z;i.x=s+(e.x-s)*t,i.y=r+(e.y-r)*t,i.z=o+(e.z-o)*t}almostEquals(e,t){return t===void 0&&(t=1e-6),!(Math.abs(this.x-e.x)>t||Math.abs(this.y-e.y)>t||Math.abs(this.z-e.z)>t)}almostZero(e){return e===void 0&&(e=1e-6),!(Math.abs(this.x)>e||Math.abs(this.y)>e||Math.abs(this.z)>e)}isAntiparallelTo(e,t){return this.negate(kd),kd.almostEquals(e,t)}clone(){return new S(this.x,this.y,this.z)}}S.ZERO=new S(0,0,0);S.UNIT_X=new S(1,0,0);S.UNIT_Y=new S(0,1,0);S.UNIT_Z=new S(0,0,1);const AE=new S,CE=new S,kd=new S;class An{constructor(e){e===void 0&&(e={}),this.lowerBound=new S,this.upperBound=new S,e.lowerBound&&this.lowerBound.copy(e.lowerBound),e.upperBound&&this.upperBound.copy(e.upperBound)}setFromPoints(e,t,i,s){const r=this.lowerBound,o=this.upperBound,a=i;r.copy(e[0]),a&&a.vmult(r,r),o.copy(r);for(let l=1;l<e.length;l++){let c=e[l];a&&(a.vmult(c,Wd),c=Wd),c.x>o.x&&(o.x=c.x),c.x<r.x&&(r.x=c.x),c.y>o.y&&(o.y=c.y),c.y<r.y&&(r.y=c.y),c.z>o.z&&(o.z=c.z),c.z<r.z&&(r.z=c.z)}return t&&(t.vadd(r,r),t.vadd(o,o)),s&&(r.x-=s,r.y-=s,r.z-=s,o.x+=s,o.y+=s,o.z+=s),this}copy(e){return this.lowerBound.copy(e.lowerBound),this.upperBound.copy(e.upperBound),this}clone(){return new An().copy(this)}extend(e){this.lowerBound.x=Math.min(this.lowerBound.x,e.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,e.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,e.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,e.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,e.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,e.upperBound.z)}overlaps(e){const t=this.lowerBound,i=this.upperBound,s=e.lowerBound,r=e.upperBound,o=s.x<=i.x&&i.x<=r.x||t.x<=r.x&&r.x<=i.x,a=s.y<=i.y&&i.y<=r.y||t.y<=r.y&&r.y<=i.y,l=s.z<=i.z&&i.z<=r.z||t.z<=r.z&&r.z<=i.z;return o&&a&&l}volume(){const e=this.lowerBound,t=this.upperBound;return(t.x-e.x)*(t.y-e.y)*(t.z-e.z)}contains(e){const t=this.lowerBound,i=this.upperBound,s=e.lowerBound,r=e.upperBound;return t.x<=s.x&&i.x>=r.x&&t.y<=s.y&&i.y>=r.y&&t.z<=s.z&&i.z>=r.z}getCorners(e,t,i,s,r,o,a,l){const c=this.lowerBound,h=this.upperBound;e.copy(c),t.set(h.x,c.y,c.z),i.set(h.x,h.y,c.z),s.set(c.x,h.y,h.z),r.set(h.x,c.y,h.z),o.set(c.x,h.y,c.z),a.set(c.x,c.y,h.z),l.copy(h)}toLocalFrame(e,t){const i=Xd,s=i[0],r=i[1],o=i[2],a=i[3],l=i[4],c=i[5],h=i[6],d=i[7];this.getCorners(s,r,o,a,l,c,h,d);for(let u=0;u!==8;u++){const f=i[u];e.pointToLocal(f,f)}return t.setFromPoints(i)}toWorldFrame(e,t){const i=Xd,s=i[0],r=i[1],o=i[2],a=i[3],l=i[4],c=i[5],h=i[6],d=i[7];this.getCorners(s,r,o,a,l,c,h,d);for(let u=0;u!==8;u++){const f=i[u];e.pointToWorld(f,f)}return t.setFromPoints(i)}overlapsRay(e){const{direction:t,from:i}=e,s=1/t.x,r=1/t.y,o=1/t.z,a=(this.lowerBound.x-i.x)*s,l=(this.upperBound.x-i.x)*s,c=(this.lowerBound.y-i.y)*r,h=(this.upperBound.y-i.y)*r,d=(this.lowerBound.z-i.z)*o,u=(this.upperBound.z-i.z)*o,f=Math.max(Math.max(Math.min(a,l),Math.min(c,h)),Math.min(d,u)),g=Math.min(Math.min(Math.max(a,l),Math.max(c,h)),Math.max(d,u));return!(g<0||f>g)}}const Wd=new S,Xd=[new S,new S,new S,new S,new S,new S,new S,new S];class qd{constructor(){this.matrix=[]}get(e,t){let{index:i}=e,{index:s}=t;if(s>i){const r=s;s=i,i=r}return this.matrix[(i*(i+1)>>1)+s-1]}set(e,t,i){let{index:s}=e,{index:r}=t;if(r>s){const o=r;r=s,s=o}this.matrix[(s*(s+1)>>1)+r-1]=i?1:0}reset(){for(let e=0,t=this.matrix.length;e!==t;e++)this.matrix[e]=0}setNumObjects(e){this.matrix.length=e*(e-1)>>1}}let cm=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;return i[e]===void 0&&(i[e]=[]),i[e].includes(t)||i[e].push(t),this}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return!!(i[e]!==void 0&&i[e].includes(t))}hasAnyEventListener(e){return this._listeners===void 0?!1:this._listeners[e]!==void 0}removeEventListener(e,t){if(this._listeners===void 0)return this;const i=this._listeners;if(i[e]===void 0)return this;const s=i[e].indexOf(t);return s!==-1&&i[e].splice(s,1),this}dispatchEvent(e){if(this._listeners===void 0)return this;const i=this._listeners[e.type];if(i!==void 0){e.target=this;for(let s=0,r=i.length;s<r;s++)i[s].call(this,e)}return this}};class Nt{constructor(e,t,i,s){e===void 0&&(e=0),t===void 0&&(t=0),i===void 0&&(i=0),s===void 0&&(s=1),this.x=e,this.y=t,this.z=i,this.w=s}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(e,t){const i=Math.sin(t*.5);return this.x=e.x*i,this.y=e.y*i,this.z=e.z*i,this.w=Math.cos(t*.5),this}toAxisAngle(e){e===void 0&&(e=new S),this.normalize();const t=2*Math.acos(this.w),i=Math.sqrt(1-this.w*this.w);return i<.001?(e.x=this.x,e.y=this.y,e.z=this.z):(e.x=this.x/i,e.y=this.y/i,e.z=this.z/i),[e,t]}setFromVectors(e,t){if(e.isAntiparallelTo(t)){const i=RE,s=PE;e.tangents(i,s),this.setFromAxisAngle(i,Math.PI)}else{const i=e.cross(t);this.x=i.x,this.y=i.y,this.z=i.z,this.w=Math.sqrt(e.length()**2*t.length()**2)+e.dot(t),this.normalize()}return this}mult(e,t){t===void 0&&(t=new Nt);const i=this.x,s=this.y,r=this.z,o=this.w,a=e.x,l=e.y,c=e.z,h=e.w;return t.x=i*h+o*a+s*c-r*l,t.y=s*h+o*l+r*a-i*c,t.z=r*h+o*c+i*l-s*a,t.w=o*h-i*a-s*l-r*c,t}inverse(e){e===void 0&&(e=new Nt);const t=this.x,i=this.y,s=this.z,r=this.w;this.conjugate(e);const o=1/(t*t+i*i+s*s+r*r);return e.x*=o,e.y*=o,e.z*=o,e.w*=o,e}conjugate(e){return e===void 0&&(e=new Nt),e.x=-this.x,e.y=-this.y,e.z=-this.z,e.w=this.w,e}normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(e=1/e,this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}normalizeFast(){const e=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}vmult(e,t){t===void 0&&(t=new S);const i=e.x,s=e.y,r=e.z,o=this.x,a=this.y,l=this.z,c=this.w,h=c*i+a*r-l*s,d=c*s+l*i-o*r,u=c*r+o*s-a*i,f=-o*i-a*s-l*r;return t.x=h*c+f*-o+d*-l-u*-a,t.y=d*c+f*-a+u*-o-h*-l,t.z=u*c+f*-l+h*-a-d*-o,t}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this}toEuler(e,t){t===void 0&&(t="YZX");let i,s,r;const o=this.x,a=this.y,l=this.z,c=this.w;switch(t){case"YZX":const h=o*a+l*c;if(h>.499&&(i=2*Math.atan2(o,c),s=Math.PI/2,r=0),h<-.499&&(i=-2*Math.atan2(o,c),s=-Math.PI/2,r=0),i===void 0){const d=o*o,u=a*a,f=l*l;i=Math.atan2(2*a*c-2*o*l,1-2*u-2*f),s=Math.asin(2*h),r=Math.atan2(2*o*c-2*a*l,1-2*d-2*f)}break;default:throw new Error(`Euler order ${t} not supported yet.`)}e.y=i,e.z=s,e.x=r}setFromEuler(e,t,i,s){s===void 0&&(s="XYZ");const r=Math.cos(e/2),o=Math.cos(t/2),a=Math.cos(i/2),l=Math.sin(e/2),c=Math.sin(t/2),h=Math.sin(i/2);return s==="XYZ"?(this.x=l*o*a+r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a-l*c*h):s==="YXZ"?(this.x=l*o*a+r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a+l*c*h):s==="ZXY"?(this.x=l*o*a-r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a-l*c*h):s==="ZYX"?(this.x=l*o*a-r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a+l*c*h):s==="YZX"?(this.x=l*o*a+r*c*h,this.y=r*c*a+l*o*h,this.z=r*o*h-l*c*a,this.w=r*o*a-l*c*h):s==="XZY"&&(this.x=l*o*a-r*c*h,this.y=r*c*a-l*o*h,this.z=r*o*h+l*c*a,this.w=r*o*a+l*c*h),this}clone(){return new Nt(this.x,this.y,this.z,this.w)}slerp(e,t,i){i===void 0&&(i=new Nt);const s=this.x,r=this.y,o=this.z,a=this.w;let l=e.x,c=e.y,h=e.z,d=e.w,u,f,g,v,m;return f=s*l+r*c+o*h+a*d,f<0&&(f=-f,l=-l,c=-c,h=-h,d=-d),1-f>1e-6?(u=Math.acos(f),g=Math.sin(u),v=Math.sin((1-t)*u)/g,m=Math.sin(t*u)/g):(v=1-t,m=t),i.x=v*s+m*l,i.y=v*r+m*c,i.z=v*o+m*h,i.w=v*a+m*d,i}integrate(e,t,i,s){s===void 0&&(s=new Nt);const r=e.x*i.x,o=e.y*i.y,a=e.z*i.z,l=this.x,c=this.y,h=this.z,d=this.w,u=t*.5;return s.x+=u*(r*d+o*h-a*c),s.y+=u*(o*d+a*l-r*h),s.z+=u*(a*d+r*c-o*l),s.w+=u*(-r*l-o*c-a*h),s}}const RE=new S,PE=new S,DE={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class Le{constructor(e){e===void 0&&(e={}),this.id=Le.idCounter++,this.type=e.type||0,this.boundingSphereRadius=0,this.collisionResponse=e.collisionResponse?e.collisionResponse:!0,this.collisionFilterGroup=e.collisionFilterGroup!==void 0?e.collisionFilterGroup:1,this.collisionFilterMask=e.collisionFilterMask!==void 0?e.collisionFilterMask:-1,this.material=e.material?e.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(e,t){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(e,t,i,s){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}Le.idCounter=0;Le.types=DE;class ct{constructor(e){e===void 0&&(e={}),this.position=new S,this.quaternion=new Nt,e.position&&this.position.copy(e.position),e.quaternion&&this.quaternion.copy(e.quaternion)}pointToLocal(e,t){return ct.pointToLocalFrame(this.position,this.quaternion,e,t)}pointToWorld(e,t){return ct.pointToWorldFrame(this.position,this.quaternion,e,t)}vectorToWorldFrame(e,t){return t===void 0&&(t=new S),this.quaternion.vmult(e,t),t}static pointToLocalFrame(e,t,i,s){return s===void 0&&(s=new S),i.vsub(e,s),t.conjugate(Yd),Yd.vmult(s,s),s}static pointToWorldFrame(e,t,i,s){return s===void 0&&(s=new S),t.vmult(i,s),s.vadd(e,s),s}static vectorToWorldFrame(e,t,i){return i===void 0&&(i=new S),e.vmult(t,i),i}static vectorToLocalFrame(e,t,i,s){return s===void 0&&(s=new S),t.w*=-1,t.vmult(i,s),t.w*=-1,s}}const Yd=new Nt;class Kr extends Le{constructor(e){e===void 0&&(e={});const{vertices:t=[],faces:i=[],normals:s=[],axes:r,boundingSphereRadius:o}=e;super({type:Le.types.CONVEXPOLYHEDRON}),this.vertices=t,this.faces=i,this.faceNormals=s,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=r?r.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const e=this.faces,t=this.vertices,i=this.uniqueEdges;i.length=0;const s=new S;for(let r=0;r!==e.length;r++){const o=e[r],a=o.length;for(let l=0;l!==a;l++){const c=(l+1)%a;t[o[l]].vsub(t[o[c]],s),s.normalize();let h=!1;for(let d=0;d!==i.length;d++)if(i[d].almostEquals(s)||i[d].almostEquals(s)){h=!0;break}h||i.push(s.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let e=0;e<this.faces.length;e++){for(let s=0;s<this.faces[e].length;s++)if(!this.vertices[this.faces[e][s]])throw new Error(`Vertex ${this.faces[e][s]} not found!`);const t=this.faceNormals[e]||new S;this.getFaceNormal(e,t),t.negate(t),this.faceNormals[e]=t;const i=this.vertices[this.faces[e][0]];if(t.dot(i)<0){console.error(`.faceNormals[${e}] = Vec3(${t.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let s=0;s<this.faces[e].length;s++)console.warn(`.vertices[${this.faces[e][s]}] = Vec3(${this.vertices[this.faces[e][s]].toString()})`)}}}getFaceNormal(e,t){const i=this.faces[e],s=this.vertices[i[0]],r=this.vertices[i[1]],o=this.vertices[i[2]];Kr.computeNormal(s,r,o,t)}static computeNormal(e,t,i,s){const r=new S,o=new S;t.vsub(e,o),i.vsub(t,r),r.cross(o,s),s.isZero()||s.normalize()}clipAgainstHull(e,t,i,s,r,o,a,l,c){const h=new S;let d=-1,u=-Number.MAX_VALUE;for(let g=0;g<i.faces.length;g++){h.copy(i.faceNormals[g]),r.vmult(h,h);const v=h.dot(o);v>u&&(u=v,d=g)}const f=[];for(let g=0;g<i.faces[d].length;g++){const v=i.vertices[i.faces[d][g]],m=new S;m.copy(v),r.vmult(m,m),s.vadd(m,m),f.push(m)}d>=0&&this.clipFaceAgainstHull(o,e,t,f,a,l,c)}findSeparatingAxis(e,t,i,s,r,o,a,l){const c=new S,h=new S,d=new S,u=new S,f=new S,g=new S;let v=Number.MAX_VALUE;const m=this;if(m.uniqueAxes)for(let p=0;p!==m.uniqueAxes.length;p++){i.vmult(m.uniqueAxes[p],c);const _=m.testSepAxis(c,e,t,i,s,r);if(_===!1)return!1;_<v&&(v=_,o.copy(c))}else{const p=a?a.length:m.faces.length;for(let _=0;_<p;_++){const E=a?a[_]:_;c.copy(m.faceNormals[E]),i.vmult(c,c);const M=m.testSepAxis(c,e,t,i,s,r);if(M===!1)return!1;M<v&&(v=M,o.copy(c))}}if(e.uniqueAxes)for(let p=0;p!==e.uniqueAxes.length;p++){r.vmult(e.uniqueAxes[p],h);const _=m.testSepAxis(h,e,t,i,s,r);if(_===!1)return!1;_<v&&(v=_,o.copy(h))}else{const p=l?l.length:e.faces.length;for(let _=0;_<p;_++){const E=l?l[_]:_;h.copy(e.faceNormals[E]),r.vmult(h,h);const M=m.testSepAxis(h,e,t,i,s,r);if(M===!1)return!1;M<v&&(v=M,o.copy(h))}}for(let p=0;p!==m.uniqueEdges.length;p++){i.vmult(m.uniqueEdges[p],u);for(let _=0;_!==e.uniqueEdges.length;_++)if(r.vmult(e.uniqueEdges[_],f),u.cross(f,g),!g.almostZero()){g.normalize();const E=m.testSepAxis(g,e,t,i,s,r);if(E===!1)return!1;E<v&&(v=E,o.copy(g))}}return s.vsub(t,d),d.dot(o)>0&&o.negate(o),!0}testSepAxis(e,t,i,s,r,o){const a=this;Kr.project(a,e,i,s,jl),Kr.project(t,e,r,o,$l);const l=jl[0],c=jl[1],h=$l[0],d=$l[1];if(l<d||h<c)return!1;const u=l-d,f=h-c;return u<f?u:f}calculateLocalInertia(e,t){const i=new S,s=new S;this.computeLocalAABB(s,i);const r=i.x-s.x,o=i.y-s.y,a=i.z-s.z;t.x=1/12*e*(2*o*2*o+2*a*2*a),t.y=1/12*e*(2*r*2*r+2*a*2*a),t.z=1/12*e*(2*o*2*o+2*r*2*r)}getPlaneConstantOfFace(e){const t=this.faces[e],i=this.faceNormals[e],s=this.vertices[t[0]];return-i.dot(s)}clipFaceAgainstHull(e,t,i,s,r,o,a){const l=new S,c=new S,h=new S,d=new S,u=new S,f=new S,g=new S,v=new S,m=this,p=[],_=s,E=p;let M=-1,A=Number.MAX_VALUE;for(let H=0;H<m.faces.length;H++){l.copy(m.faceNormals[H]),i.vmult(l,l);const D=l.dot(e);D<A&&(A=D,M=H)}if(M<0)return;const C=m.faces[M];C.connectedFaces=[];for(let H=0;H<m.faces.length;H++)for(let D=0;D<m.faces[H].length;D++)C.indexOf(m.faces[H][D])!==-1&&H!==M&&C.connectedFaces.indexOf(H)===-1&&C.connectedFaces.push(H);const R=C.length;for(let H=0;H<R;H++){const D=m.vertices[C[H]],L=m.vertices[C[(H+1)%R]];D.vsub(L,c),h.copy(c),i.vmult(h,h),t.vadd(h,h),d.copy(this.faceNormals[M]),i.vmult(d,d),t.vadd(d,d),h.cross(d,u),u.negate(u),f.copy(D),i.vmult(f,f),t.vadd(f,f);const I=C.connectedFaces[H];g.copy(this.faceNormals[I]);const B=this.getPlaneConstantOfFace(I);v.copy(g),i.vmult(v,v);const U=B-v.dot(t);for(this.clipFaceAgainstPlane(_,E,v,U);_.length;)_.shift();for(;E.length;)_.push(E.shift())}g.copy(this.faceNormals[M]);const y=this.getPlaneConstantOfFace(M);v.copy(g),i.vmult(v,v);const b=y-v.dot(t);for(let H=0;H<_.length;H++){let D=v.dot(_[H])+b;if(D<=r&&(console.log(`clamped: depth=${D} to minDist=${r}`),D=r),D<=o){const L=_[H];if(D<=1e-6){const I={point:L,normal:v,depth:D};a.push(I)}}}}clipFaceAgainstPlane(e,t,i,s){let r,o;const a=e.length;if(a<2)return t;let l=e[e.length-1],c=e[0];r=i.dot(l)+s;for(let h=0;h<a;h++){if(c=e[h],o=i.dot(c)+s,r<0)if(o<0){const d=new S;d.copy(c),t.push(d)}else{const d=new S;l.lerp(c,r/(r-o),d),t.push(d)}else if(o<0){const d=new S;l.lerp(c,r/(r-o),d),t.push(d),t.push(c)}l=c,r=o}return t}computeWorldVertices(e,t){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new S);const i=this.vertices,s=this.worldVertices;for(let r=0;r!==this.vertices.length;r++)t.vmult(i[r],s[r]),e.vadd(s[r],s[r]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(e,t){const i=this.vertices;e.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),t.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let s=0;s<this.vertices.length;s++){const r=i[s];r.x<e.x?e.x=r.x:r.x>t.x&&(t.x=r.x),r.y<e.y?e.y=r.y:r.y>t.y&&(t.y=r.y),r.z<e.z?e.z=r.z:r.z>t.z&&(t.z=r.z)}}computeWorldFaceNormals(e){const t=this.faceNormals.length;for(;this.worldFaceNormals.length<t;)this.worldFaceNormals.push(new S);const i=this.faceNormals,s=this.worldFaceNormals;for(let r=0;r!==t;r++)e.vmult(i[r],s[r]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let e=0;const t=this.vertices;for(let i=0;i!==t.length;i++){const s=t[i].lengthSquared();s>e&&(e=s)}this.boundingSphereRadius=Math.sqrt(e)}calculateWorldAABB(e,t,i,s){const r=this.vertices;let o,a,l,c,h,d,u=new S;for(let f=0;f<r.length;f++){u.copy(r[f]),t.vmult(u,u),e.vadd(u,u);const g=u;(o===void 0||g.x<o)&&(o=g.x),(c===void 0||g.x>c)&&(c=g.x),(a===void 0||g.y<a)&&(a=g.y),(h===void 0||g.y>h)&&(h=g.y),(l===void 0||g.z<l)&&(l=g.z),(d===void 0||g.z>d)&&(d=g.z)}i.set(o,a,l),s.set(c,h,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(e){e===void 0&&(e=new S);const t=this.vertices;for(let i=0;i<t.length;i++)e.vadd(t[i],e);return e.scale(1/t.length,e),e}transformAllPoints(e,t){const i=this.vertices.length,s=this.vertices;if(t){for(let r=0;r<i;r++){const o=s[r];t.vmult(o,o)}for(let r=0;r<this.faceNormals.length;r++){const o=this.faceNormals[r];t.vmult(o,o)}}if(e)for(let r=0;r<i;r++){const o=s[r];o.vadd(e,o)}}pointIsInside(e){const t=this.vertices,i=this.faces,s=this.faceNormals,r=new S;this.getAveragePointLocal(r);for(let o=0;o<this.faces.length;o++){let a=s[o];const l=t[i[o][0]],c=new S;e.vsub(l,c);const h=a.dot(c),d=new S;r.vsub(l,d);const u=a.dot(d);if(h<0&&u>0||h>0&&u<0)return!1}return-1}static project(e,t,i,s,r){const o=e.vertices.length,a=IE;let l=0,c=0;const h=LE,d=e.vertices;h.setZero(),ct.vectorToLocalFrame(i,s,t,a),ct.pointToLocalFrame(i,s,h,h);const u=h.dot(a);c=l=d[0].dot(a);for(let f=1;f<o;f++){const g=d[f].dot(a);g>l&&(l=g),g<c&&(c=g)}if(c-=u,l-=u,c>l){const f=c;c=l,l=f}r[0]=l,r[1]=c}}const jl=[],$l=[];new S;const IE=new S,LE=new S;class mn extends Le{constructor(e){super({type:Le.types.BOX}),this.halfExtents=e,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const e=this.halfExtents.x,t=this.halfExtents.y,i=this.halfExtents.z,s=S,r=[new s(-e,-t,-i),new s(e,-t,-i),new s(e,t,-i),new s(-e,t,-i),new s(-e,-t,i),new s(e,-t,i),new s(e,t,i),new s(-e,t,i)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new s(0,0,1),new s(0,1,0),new s(1,0,0)],l=new Kr({vertices:r,faces:o,axes:a});this.convexPolyhedronRepresentation=l,l.material=this.material}calculateLocalInertia(e,t){return t===void 0&&(t=new S),mn.calculateInertia(this.halfExtents,e,t),t}static calculateInertia(e,t,i){const s=e;i.x=1/12*t*(2*s.y*2*s.y+2*s.z*2*s.z),i.y=1/12*t*(2*s.x*2*s.x+2*s.z*2*s.z),i.z=1/12*t*(2*s.y*2*s.y+2*s.x*2*s.x)}getSideNormals(e,t){const i=e,s=this.halfExtents;if(i[0].set(s.x,0,0),i[1].set(0,s.y,0),i[2].set(0,0,s.z),i[3].set(-s.x,0,0),i[4].set(0,-s.y,0),i[5].set(0,0,-s.z),t!==void 0)for(let r=0;r!==i.length;r++)t.vmult(i[r],i[r]);return i}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(e,t,i){const s=this.halfExtents,r=[[s.x,s.y,s.z],[-s.x,s.y,s.z],[-s.x,-s.y,s.z],[-s.x,-s.y,-s.z],[s.x,-s.y,-s.z],[s.x,s.y,-s.z],[-s.x,s.y,-s.z],[s.x,-s.y,s.z]];for(let o=0;o<r.length;o++)Zi.set(r[o][0],r[o][1],r[o][2]),t.vmult(Zi,Zi),e.vadd(Zi,Zi),i(Zi.x,Zi.y,Zi.z)}calculateWorldAABB(e,t,i,s){const r=this.halfExtents;Zn[0].set(r.x,r.y,r.z),Zn[1].set(-r.x,r.y,r.z),Zn[2].set(-r.x,-r.y,r.z),Zn[3].set(-r.x,-r.y,-r.z),Zn[4].set(r.x,-r.y,-r.z),Zn[5].set(r.x,r.y,-r.z),Zn[6].set(-r.x,r.y,-r.z),Zn[7].set(r.x,-r.y,r.z);const o=Zn[0];t.vmult(o,o),e.vadd(o,o),s.copy(o),i.copy(o);for(let a=1;a<8;a++){const l=Zn[a];t.vmult(l,l),e.vadd(l,l);const c=l.x,h=l.y,d=l.z;c>s.x&&(s.x=c),h>s.y&&(s.y=h),d>s.z&&(s.z=d),c<i.x&&(i.x=c),h<i.y&&(i.y=h),d<i.z&&(i.z=d)}}}const Zi=new S,Zn=[new S,new S,new S,new S,new S,new S,new S,new S],Oh={DYNAMIC:1,STATIC:2,KINEMATIC:4},Bh={AWAKE:0,SLEEPY:1,SLEEPING:2};class be extends cm{constructor(e){e===void 0&&(e={}),super(),this.id=be.idCounter++,this.index=-1,this.world=null,this.vlambda=new S,this.collisionFilterGroup=typeof e.collisionFilterGroup=="number"?e.collisionFilterGroup:1,this.collisionFilterMask=typeof e.collisionFilterMask=="number"?e.collisionFilterMask:-1,this.collisionResponse=typeof e.collisionResponse=="boolean"?e.collisionResponse:!0,this.position=new S,this.previousPosition=new S,this.interpolatedPosition=new S,this.initPosition=new S,e.position&&(this.position.copy(e.position),this.previousPosition.copy(e.position),this.interpolatedPosition.copy(e.position),this.initPosition.copy(e.position)),this.velocity=new S,e.velocity&&this.velocity.copy(e.velocity),this.initVelocity=new S,this.force=new S;const t=typeof e.mass=="number"?e.mass:0;this.mass=t,this.invMass=t>0?1/t:0,this.material=e.material||null,this.linearDamping=typeof e.linearDamping=="number"?e.linearDamping:.01,this.type=t<=0?be.STATIC:be.DYNAMIC,typeof e.type==typeof be.STATIC&&(this.type=e.type),this.allowSleep=typeof e.allowSleep<"u"?e.allowSleep:!0,this.sleepState=be.AWAKE,this.sleepSpeedLimit=typeof e.sleepSpeedLimit<"u"?e.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof e.sleepTimeLimit<"u"?e.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new S,this.quaternion=new Nt,this.initQuaternion=new Nt,this.previousQuaternion=new Nt,this.interpolatedQuaternion=new Nt,e.quaternion&&(this.quaternion.copy(e.quaternion),this.initQuaternion.copy(e.quaternion),this.previousQuaternion.copy(e.quaternion),this.interpolatedQuaternion.copy(e.quaternion)),this.angularVelocity=new S,e.angularVelocity&&this.angularVelocity.copy(e.angularVelocity),this.initAngularVelocity=new S,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new S,this.invInertia=new S,this.invInertiaWorld=new Vn,this.invMassSolve=0,this.invInertiaSolve=new S,this.invInertiaWorldSolve=new Vn,this.fixedRotation=typeof e.fixedRotation<"u"?e.fixedRotation:!1,this.angularDamping=typeof e.angularDamping<"u"?e.angularDamping:.01,this.linearFactor=new S(1,1,1),e.linearFactor&&this.linearFactor.copy(e.linearFactor),this.angularFactor=new S(1,1,1),e.angularFactor&&this.angularFactor.copy(e.angularFactor),this.aabb=new An,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new S,this.isTrigger=!!e.isTrigger,e.shape&&this.addShape(e.shape),this.updateMassProperties()}wakeUp(){const e=this.sleepState;this.sleepState=be.AWAKE,this.wakeUpAfterNarrowphase=!1,e===be.SLEEPING&&this.dispatchEvent(be.wakeupEvent)}sleep(){this.sleepState=be.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(e){if(this.allowSleep){const t=this.sleepState,i=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),s=this.sleepSpeedLimit**2;t===be.AWAKE&&i<s?(this.sleepState=be.SLEEPY,this.timeLastSleepy=e,this.dispatchEvent(be.sleepyEvent)):t===be.SLEEPY&&i>s?this.wakeUp():t===be.SLEEPY&&e-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(be.sleepEvent))}}updateSolveMassProperties(){this.sleepState===be.SLEEPING||this.type===be.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(e,t){return t===void 0&&(t=new S),e.vsub(this.position,t),this.quaternion.conjugate().vmult(t,t),t}vectorToLocalFrame(e,t){return t===void 0&&(t=new S),this.quaternion.conjugate().vmult(e,t),t}pointToWorldFrame(e,t){return t===void 0&&(t=new S),this.quaternion.vmult(e,t),t.vadd(this.position,t),t}vectorToWorldFrame(e,t){return t===void 0&&(t=new S),this.quaternion.vmult(e,t),t}addShape(e,t,i){const s=new S,r=new Nt;return t&&s.copy(t),i&&r.copy(i),this.shapes.push(e),this.shapeOffsets.push(s),this.shapeOrientations.push(r),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=this,this}removeShape(e){const t=this.shapes.indexOf(e);return t===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(t,1),this.shapeOffsets.splice(t,1),this.shapeOrientations.splice(t,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=null,this)}updateBoundingRadius(){const e=this.shapes,t=this.shapeOffsets,i=e.length;let s=0;for(let r=0;r!==i;r++){const o=e[r];o.updateBoundingSphereRadius();const a=t[r].length(),l=o.boundingSphereRadius;a+l>s&&(s=a+l)}this.boundingRadius=s}updateAABB(){const e=this.shapes,t=this.shapeOffsets,i=this.shapeOrientations,s=e.length,r=NE,o=FE,a=this.quaternion,l=this.aabb,c=UE;for(let h=0;h!==s;h++){const d=e[h];a.vmult(t[h],r),r.vadd(this.position,r),a.mult(i[h],o),d.calculateWorldAABB(r,o,c.lowerBound,c.upperBound),h===0?l.copy(c):l.extend(c)}this.aabbNeedsUpdate=!1}updateInertiaWorld(e){const t=this.invInertia;if(!(t.x===t.y&&t.y===t.z&&!e)){const i=OE,s=BE;i.setRotationFromQuaternion(this.quaternion),i.transpose(s),i.scale(t,i),i.mmult(s,this.invInertiaWorld)}}applyForce(e,t){if(t===void 0&&(t=new S),this.type!==be.DYNAMIC)return;this.sleepState===be.SLEEPING&&this.wakeUp();const i=zE;t.cross(e,i),this.force.vadd(e,this.force),this.torque.vadd(i,this.torque)}applyLocalForce(e,t){if(t===void 0&&(t=new S),this.type!==be.DYNAMIC)return;const i=HE,s=VE;this.vectorToWorldFrame(e,i),this.vectorToWorldFrame(t,s),this.applyForce(i,s)}applyTorque(e){this.type===be.DYNAMIC&&(this.sleepState===be.SLEEPING&&this.wakeUp(),this.torque.vadd(e,this.torque))}applyImpulse(e,t){if(t===void 0&&(t=new S),this.type!==be.DYNAMIC)return;this.sleepState===be.SLEEPING&&this.wakeUp();const i=t,s=GE;s.copy(e),s.scale(this.invMass,s),this.velocity.vadd(s,this.velocity);const r=kE;i.cross(e,r),this.invInertiaWorld.vmult(r,r),this.angularVelocity.vadd(r,this.angularVelocity)}applyLocalImpulse(e,t){if(t===void 0&&(t=new S),this.type!==be.DYNAMIC)return;const i=WE,s=XE;this.vectorToWorldFrame(e,i),this.vectorToWorldFrame(t,s),this.applyImpulse(i,s)}updateMassProperties(){const e=qE;this.invMass=this.mass>0?1/this.mass:0;const t=this.inertia,i=this.fixedRotation;this.updateAABB(),e.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),mn.calculateInertia(e,this.mass,t),this.invInertia.set(t.x>0&&!i?1/t.x:0,t.y>0&&!i?1/t.y:0,t.z>0&&!i?1/t.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(e,t){const i=new S;return e.vsub(this.position,i),this.angularVelocity.cross(i,t),this.velocity.vadd(t,t),t}integrate(e,t,i){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===be.DYNAMIC||this.type===be.KINEMATIC)||this.sleepState===be.SLEEPING)return;const s=this.velocity,r=this.angularVelocity,o=this.position,a=this.force,l=this.torque,c=this.quaternion,h=this.invMass,d=this.invInertiaWorld,u=this.linearFactor,f=h*e;s.x+=a.x*f*u.x,s.y+=a.y*f*u.y,s.z+=a.z*f*u.z;const g=d.elements,v=this.angularFactor,m=l.x*v.x,p=l.y*v.y,_=l.z*v.z;r.x+=e*(g[0]*m+g[1]*p+g[2]*_),r.y+=e*(g[3]*m+g[4]*p+g[5]*_),r.z+=e*(g[6]*m+g[7]*p+g[8]*_),o.x+=s.x*e,o.y+=s.y*e,o.z+=s.z*e,c.integrate(this.angularVelocity,e,this.angularFactor,c),t&&(i?c.normalizeFast():c.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}be.idCounter=0;be.COLLIDE_EVENT_NAME="collide";be.DYNAMIC=Oh.DYNAMIC;be.STATIC=Oh.STATIC;be.KINEMATIC=Oh.KINEMATIC;be.AWAKE=Bh.AWAKE;be.SLEEPY=Bh.SLEEPY;be.SLEEPING=Bh.SLEEPING;be.wakeupEvent={type:"wakeup"};be.sleepyEvent={type:"sleepy"};be.sleepEvent={type:"sleep"};const NE=new S,FE=new Nt,UE=new An,OE=new Vn,BE=new Vn;new Vn;const zE=new S,HE=new S,VE=new S,GE=new S,kE=new S,WE=new S,XE=new S,qE=new S;class hm{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(e,t,i){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(e,t){return!((e.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&e.collisionFilterMask)===0||((e.type&be.STATIC)!==0||e.sleepState===be.SLEEPING)&&((t.type&be.STATIC)!==0||t.sleepState===be.SLEEPING))}intersectionTest(e,t,i,s){this.useBoundingBoxes?this.doBoundingBoxBroadphase(e,t,i,s):this.doBoundingSphereBroadphase(e,t,i,s)}doBoundingSphereBroadphase(e,t,i,s){const r=YE;t.position.vsub(e.position,r);const o=(e.boundingRadius+t.boundingRadius)**2;r.lengthSquared()<o&&(i.push(e),s.push(t))}doBoundingBoxBroadphase(e,t,i,s){e.aabbNeedsUpdate&&e.updateAABB(),t.aabbNeedsUpdate&&t.updateAABB(),e.aabb.overlaps(t.aabb)&&(i.push(e),s.push(t))}makePairsUnique(e,t){const i=jE,s=$E,r=KE,o=e.length;for(let a=0;a!==o;a++)s[a]=e[a],r[a]=t[a];e.length=0,t.length=0;for(let a=0;a!==o;a++){const l=s[a].id,c=r[a].id,h=l<c?`${l},${c}`:`${c},${l}`;i[h]=a,i.keys.push(h)}for(let a=0;a!==i.keys.length;a++){const l=i.keys.pop(),c=i[l];e.push(s[c]),t.push(r[c]),delete i[l]}}setWorld(e){}static boundingSphereCheck(e,t){const i=new S;e.position.vsub(t.position,i);const s=e.shapes[0],r=t.shapes[0];return Math.pow(s.boundingSphereRadius+r.boundingSphereRadius,2)>i.lengthSquared()}aabbQuery(e,t,i){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const YE=new S;new S;new Nt;new S;const jE={keys:[]},$E=[],KE=[];new S;new S;new S;class ZE extends hm{constructor(){super()}collisionPairs(e,t,i){const s=e.bodies,r=s.length;let o,a;for(let l=0;l!==r;l++)for(let c=0;c!==l;c++)o=s[l],a=s[c],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,t,i)}aabbQuery(e,t,i){i===void 0&&(i=[]);for(let s=0;s<e.bodies.length;s++){const r=e.bodies[s];r.aabbNeedsUpdate&&r.updateAABB(),r.aabb.overlaps(t)&&i.push(r)}return i}}class Pa{constructor(){this.rayFromWorld=new S,this.rayToWorld=new S,this.hitNormalWorld=new S,this.hitPointWorld=new S,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(e,t,i,s,r,o,a){this.rayFromWorld.copy(e),this.rayToWorld.copy(t),this.hitNormalWorld.copy(i),this.hitPointWorld.copy(s),this.shape=r,this.body=o,this.distance=a}}let um,dm,fm,pm,mm,gm,_m;const zh={CLOSEST:1,ANY:2,ALL:4};um=Le.types.SPHERE;dm=Le.types.PLANE;fm=Le.types.BOX;pm=Le.types.CYLINDER;mm=Le.types.CONVEXPOLYHEDRON;gm=Le.types.HEIGHTFIELD;_m=Le.types.TRIMESH;class Lt{get[um](){return this._intersectSphere}get[dm](){return this._intersectPlane}get[fm](){return this._intersectBox}get[pm](){return this._intersectConvex}get[mm](){return this._intersectConvex}get[gm](){return this._intersectHeightfield}get[_m](){return this._intersectTrimesh}constructor(e,t){e===void 0&&(e=new S),t===void 0&&(t=new S),this.from=e.clone(),this.to=t.clone(),this.direction=new S,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Lt.ANY,this.result=new Pa,this.hasHit=!1,this.callback=i=>{}}intersectWorld(e,t){return this.mode=t.mode||Lt.ANY,this.result=t.result||new Pa,this.skipBackfaces=!!t.skipBackfaces,this.collisionFilterMask=typeof t.collisionFilterMask<"u"?t.collisionFilterMask:-1,this.collisionFilterGroup=typeof t.collisionFilterGroup<"u"?t.collisionFilterGroup:-1,this.checkCollisionResponse=typeof t.checkCollisionResponse<"u"?t.checkCollisionResponse:!0,t.from&&this.from.copy(t.from),t.to&&this.to.copy(t.to),this.callback=t.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(jd),Kl.length=0,e.broadphase.aabbQuery(e,jd,Kl),this.intersectBodies(Kl),this.hasHit}intersectBody(e,t){t&&(this.result=t,this.updateDirection());const i=this.checkCollisionResponse;if(i&&!e.collisionResponse||(this.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&this.collisionFilterMask)===0)return;const s=JE,r=QE;for(let o=0,a=e.shapes.length;o<a;o++){const l=e.shapes[o];if(!(i&&!l.collisionResponse)&&(e.quaternion.mult(e.shapeOrientations[o],r),e.quaternion.vmult(e.shapeOffsets[o],s),s.vadd(e.position,s),this.intersectShape(l,r,s,e),this.result.shouldStop))break}}intersectBodies(e,t){t&&(this.result=t,this.updateDirection());for(let i=0,s=e.length;!this.result.shouldStop&&i<s;i++)this.intersectBody(e[i])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(e,t,i,s){const r=this.from;if(fb(r,this.direction,i)>e.boundingSphereRadius)return;const a=this[e.type];a&&a.call(this,e,t,i,s,e)}_intersectBox(e,t,i,s,r){return this._intersectConvex(e.convexPolyhedronRepresentation,t,i,s,r)}_intersectPlane(e,t,i,s,r){const o=this.from,a=this.to,l=this.direction,c=new S(0,0,1);t.vmult(c,c);const h=new S;o.vsub(i,h);const d=h.dot(c);a.vsub(i,h);const u=h.dot(c);if(d*u>0||o.distanceTo(a)<d)return;const f=c.dot(l);if(Math.abs(f)<this.precision)return;const g=new S,v=new S,m=new S;o.vsub(i,g);const p=-c.dot(g)/f;l.scale(p,v),o.vadd(v,m),this.reportIntersection(c,m,r,s,-1)}getAABB(e){const{lowerBound:t,upperBound:i}=e,s=this.to,r=this.from;t.x=Math.min(s.x,r.x),t.y=Math.min(s.y,r.y),t.z=Math.min(s.z,r.z),i.x=Math.max(s.x,r.x),i.y=Math.max(s.y,r.y),i.z=Math.max(s.z,r.z)}_intersectHeightfield(e,t,i,s,r){e.data,e.elementSize;const o=eb;o.from.copy(this.from),o.to.copy(this.to),ct.pointToLocalFrame(i,t,o.from,o.from),ct.pointToLocalFrame(i,t,o.to,o.to),o.updateDirection();const a=tb;let l,c,h,d;l=c=0,h=d=e.data.length-1;const u=new An;o.getAABB(u),e.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,a,!0),l=Math.max(l,a[0]),c=Math.max(c,a[1]),e.getIndexOfPosition(u.upperBound.x,u.upperBound.y,a,!0),h=Math.min(h,a[0]+1),d=Math.min(d,a[1]+1);for(let f=l;f<h;f++)for(let g=c;g<d;g++){if(this.result.shouldStop)return;if(e.getAabbAtIndex(f,g,u),!!u.overlapsRay(o)){if(e.getConvexTrianglePillar(f,g,!1),ct.pointToWorldFrame(i,t,e.pillarOffset,Yo),this._intersectConvex(e.pillarConvex,t,Yo,s,r,$d),this.result.shouldStop)return;e.getConvexTrianglePillar(f,g,!0),ct.pointToWorldFrame(i,t,e.pillarOffset,Yo),this._intersectConvex(e.pillarConvex,t,Yo,s,r,$d)}}}_intersectSphere(e,t,i,s,r){const o=this.from,a=this.to,l=e.radius,c=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-i.x)+(a.y-o.y)*(o.y-i.y)+(a.z-o.z)*(o.z-i.z)),d=(o.x-i.x)**2+(o.y-i.y)**2+(o.z-i.z)**2-l**2,u=h**2-4*c*d,f=nb,g=ib;if(!(u<0))if(u===0)o.lerp(a,u,f),f.vsub(i,g),g.normalize(),this.reportIntersection(g,f,r,s,-1);else{const v=(-h-Math.sqrt(u))/(2*c),m=(-h+Math.sqrt(u))/(2*c);if(v>=0&&v<=1&&(o.lerp(a,v,f),f.vsub(i,g),g.normalize(),this.reportIntersection(g,f,r,s,-1)),this.result.shouldStop)return;m>=0&&m<=1&&(o.lerp(a,m,f),f.vsub(i,g),g.normalize(),this.reportIntersection(g,f,r,s,-1))}}_intersectConvex(e,t,i,s,r,o){const a=sb,l=Kd,c=o&&o.faceList||null,h=e.faces,d=e.vertices,u=e.faceNormals,f=this.direction,g=this.from,v=this.to,m=g.distanceTo(v),p=c?c.length:h.length,_=this.result;for(let E=0;!_.shouldStop&&E<p;E++){const M=c?c[E]:E,A=h[M],C=u[M],R=t,y=i;l.copy(d[A[0]]),R.vmult(l,l),l.vadd(y,l),l.vsub(g,l),R.vmult(C,a);const b=f.dot(a);if(Math.abs(b)<this.precision)continue;const H=a.dot(l)/b;if(!(H<0)){f.scale(H,dn),dn.vadd(g,dn),On.copy(d[A[0]]),R.vmult(On,On),y.vadd(On,On);for(let D=1;!_.shouldStop&&D<A.length-1;D++){Jn.copy(d[A[D]]),Qn.copy(d[A[D+1]]),R.vmult(Jn,Jn),R.vmult(Qn,Qn),y.vadd(Jn,Jn),y.vadd(Qn,Qn);const L=dn.distanceTo(g);!(Lt.pointInTriangle(dn,On,Jn,Qn)||Lt.pointInTriangle(dn,Jn,On,Qn))||L>m||this.reportIntersection(a,dn,r,s,M)}}}}_intersectTrimesh(e,t,i,s,r,o){const a=rb,l=ub,c=db,h=Kd,d=ob,u=ab,f=lb,g=hb,v=cb,m=e.indices;e.vertices;const p=this.from,_=this.to,E=this.direction;c.position.copy(i),c.quaternion.copy(t),ct.vectorToLocalFrame(i,t,E,d),ct.pointToLocalFrame(i,t,p,u),ct.pointToLocalFrame(i,t,_,f),f.x*=e.scale.x,f.y*=e.scale.y,f.z*=e.scale.z,u.x*=e.scale.x,u.y*=e.scale.y,u.z*=e.scale.z,f.vsub(u,d),d.normalize();const M=u.distanceSquared(f);e.tree.rayQuery(this,c,l);for(let A=0,C=l.length;!this.result.shouldStop&&A!==C;A++){const R=l[A];e.getNormal(R,a),e.getVertex(m[R*3],On),On.vsub(u,h);const y=d.dot(a),b=a.dot(h)/y;if(b<0)continue;d.scale(b,dn),dn.vadd(u,dn),e.getVertex(m[R*3+1],Jn),e.getVertex(m[R*3+2],Qn);const H=dn.distanceSquared(u);!(Lt.pointInTriangle(dn,Jn,On,Qn)||Lt.pointInTriangle(dn,On,Jn,Qn))||H>M||(ct.vectorToWorldFrame(t,a,v),ct.pointToWorldFrame(i,t,dn,g),this.reportIntersection(v,g,r,s,R))}l.length=0}reportIntersection(e,t,i,s,r){const o=this.from,a=this.to,l=o.distanceTo(t),c=this.result;if(!(this.skipBackfaces&&e.dot(this.direction)>0))switch(c.hitFaceIndex=typeof r<"u"?r:-1,this.mode){case Lt.ALL:this.hasHit=!0,c.set(o,a,e,t,i,s,l),c.hasHit=!0,this.callback(c);break;case Lt.CLOSEST:(l<c.distance||!c.hasHit)&&(this.hasHit=!0,c.hasHit=!0,c.set(o,a,e,t,i,s,l));break;case Lt.ANY:this.hasHit=!0,c.hasHit=!0,c.set(o,a,e,t,i,s,l),c.shouldStop=!0;break}}static pointInTriangle(e,t,i,s){s.vsub(t,As),i.vsub(t,Ur),e.vsub(t,Zl);const r=As.dot(As),o=As.dot(Ur),a=As.dot(Zl),l=Ur.dot(Ur),c=Ur.dot(Zl);let h,d;return(h=l*a-o*c)>=0&&(d=r*c-o*a)>=0&&h+d<r*l-o*o}}Lt.CLOSEST=zh.CLOSEST;Lt.ANY=zh.ANY;Lt.ALL=zh.ALL;const jd=new An,Kl=[],Ur=new S,Zl=new S,JE=new S,QE=new Nt,dn=new S,On=new S,Jn=new S,Qn=new S;new S;new Pa;const $d={faceList:[0]},Yo=new S,eb=new Lt,tb=[],nb=new S,ib=new S,sb=new S;new S;new S;const Kd=new S,rb=new S,ob=new S,ab=new S,lb=new S,cb=new S,hb=new S;new An;const ub=[],db=new ct,As=new S,jo=new S;function fb(n,e,t){t.vsub(n,As);const i=As.dot(e);return e.scale(i,jo),jo.vadd(n,jo),t.distanceTo(jo)}class or extends hm{static checkBounds(e,t,i){let s,r;i===0?(s=e.position.x,r=t.position.x):i===1?(s=e.position.y,r=t.position.y):i===2&&(s=e.position.z,r=t.position.z);const o=e.boundingRadius,a=t.boundingRadius,l=s+o;return r-a<l}static insertionSortX(e){for(let t=1,i=e.length;t<i;t++){const s=e[t];let r;for(r=t-1;r>=0&&!(e[r].aabb.lowerBound.x<=s.aabb.lowerBound.x);r--)e[r+1]=e[r];e[r+1]=s}return e}static insertionSortY(e){for(let t=1,i=e.length;t<i;t++){const s=e[t];let r;for(r=t-1;r>=0&&!(e[r].aabb.lowerBound.y<=s.aabb.lowerBound.y);r--)e[r+1]=e[r];e[r+1]=s}return e}static insertionSortZ(e){for(let t=1,i=e.length;t<i;t++){const s=e[t];let r;for(r=t-1;r>=0&&!(e[r].aabb.lowerBound.z<=s.aabb.lowerBound.z);r--)e[r+1]=e[r];e[r+1]=s}return e}constructor(e){super(),this.axisList=[],this.world=null,this.axisIndex=0;const t=this.axisList;this._addBodyHandler=i=>{t.push(i.body)},this._removeBodyHandler=i=>{const s=t.indexOf(i.body);s!==-1&&t.splice(s,1)},e&&this.setWorld(e)}setWorld(e){this.axisList.length=0;for(let t=0;t<e.bodies.length;t++)this.axisList.push(e.bodies[t]);e.removeEventListener("addBody",this._addBodyHandler),e.removeEventListener("removeBody",this._removeBodyHandler),e.addEventListener("addBody",this._addBodyHandler),e.addEventListener("removeBody",this._removeBodyHandler),this.world=e,this.dirty=!0}collisionPairs(e,t,i){const s=this.axisList,r=s.length,o=this.axisIndex;let a,l;for(this.dirty&&(this.sortList(),this.dirty=!1),a=0;a!==r;a++){const c=s[a];for(l=a+1;l<r;l++){const h=s[l];if(this.needBroadphaseCollision(c,h)){if(!or.checkBounds(c,h,o))break;this.intersectionTest(c,h,t,i)}}}}sortList(){const e=this.axisList,t=this.axisIndex,i=e.length;for(let s=0;s!==i;s++){const r=e[s];r.aabbNeedsUpdate&&r.updateAABB()}t===0?or.insertionSortX(e):t===1?or.insertionSortY(e):t===2&&or.insertionSortZ(e)}autoDetectAxis(){let e=0,t=0,i=0,s=0,r=0,o=0;const a=this.axisList,l=a.length,c=1/l;for(let f=0;f!==l;f++){const g=a[f],v=g.position.x;e+=v,t+=v*v;const m=g.position.y;i+=m,s+=m*m;const p=g.position.z;r+=p,o+=p*p}const h=t-e*e*c,d=s-i*i*c,u=o-r*r*c;h>d?h>u?this.axisIndex=0:this.axisIndex=2:d>u?this.axisIndex=1:this.axisIndex=2}aabbQuery(e,t,i){i===void 0&&(i=[]),this.dirty&&(this.sortList(),this.dirty=!1);const s=this.axisIndex;let r="x";s===1&&(r="y"),s===2&&(r="z");const o=this.axisList;t.lowerBound[r],t.upperBound[r];for(let a=0;a<o.length;a++){const l=o[a];l.aabbNeedsUpdate&&l.updateAABB(),l.aabb.overlaps(t)&&i.push(l)}return i}}class pb{static defaults(e,t){e===void 0&&(e={});for(let i in t)i in e||(e[i]=t[i]);return e}}class Zd{constructor(){this.spatial=new S,this.rotational=new S}multiplyElement(e){return e.spatial.dot(this.spatial)+e.rotational.dot(this.rotational)}multiplyVectors(e,t){return e.dot(this.spatial)+t.dot(this.rotational)}}class _o{constructor(e,t,i,s){i===void 0&&(i=-1e6),s===void 0&&(s=1e6),this.id=_o.idCounter++,this.minForce=i,this.maxForce=s,this.bi=e,this.bj=t,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Zd,this.jacobianElementB=new Zd,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(e,t,i){const s=t,r=e,o=i;this.a=4/(o*(1+4*s)),this.b=4*s/(1+4*s),this.eps=4/(o*o*r*(1+4*s))}computeB(e,t,i){const s=this.computeGW(),r=this.computeGq(),o=this.computeGiMf();return-r*e-s*t-o*i}computeGq(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,s=this.bj,r=i.position,o=s.position;return e.spatial.dot(r)+t.spatial.dot(o)}computeGW(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,s=this.bj,r=i.velocity,o=s.velocity,a=i.angularVelocity,l=s.angularVelocity;return e.multiplyVectors(r,a)+t.multiplyVectors(o,l)}computeGWlambda(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,s=this.bj,r=i.vlambda,o=s.vlambda,a=i.wlambda,l=s.wlambda;return e.multiplyVectors(r,a)+t.multiplyVectors(o,l)}computeGiMf(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,s=this.bj,r=i.force,o=i.torque,a=s.force,l=s.torque,c=i.invMassSolve,h=s.invMassSolve;return r.scale(c,Jd),a.scale(h,Qd),i.invInertiaWorldSolve.vmult(o,ef),s.invInertiaWorldSolve.vmult(l,tf),e.multiplyVectors(Jd,ef)+t.multiplyVectors(Qd,tf)}computeGiMGt(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,s=this.bj,r=i.invMassSolve,o=s.invMassSolve,a=i.invInertiaWorldSolve,l=s.invInertiaWorldSolve;let c=r+o;return a.vmult(e.rotational,$o),c+=$o.dot(e.rotational),l.vmult(t.rotational,$o),c+=$o.dot(t.rotational),c}addToWlambda(e){const t=this.jacobianElementA,i=this.jacobianElementB,s=this.bi,r=this.bj,o=mb;s.vlambda.addScaledVector(s.invMassSolve*e,t.spatial,s.vlambda),r.vlambda.addScaledVector(r.invMassSolve*e,i.spatial,r.vlambda),s.invInertiaWorldSolve.vmult(t.rotational,o),s.wlambda.addScaledVector(e,o,s.wlambda),r.invInertiaWorldSolve.vmult(i.rotational,o),r.wlambda.addScaledVector(e,o,r.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}_o.idCounter=0;const Jd=new S,Qd=new S,ef=new S,tf=new S,$o=new S,mb=new S;class gb extends _o{constructor(e,t,i){i===void 0&&(i=1e6),super(e,t,0,i),this.restitution=0,this.ri=new S,this.rj=new S,this.ni=new S}computeB(e){const t=this.a,i=this.b,s=this.bi,r=this.bj,o=this.ri,a=this.rj,l=_b,c=vb,h=s.velocity,d=s.angularVelocity;s.force,s.torque;const u=r.velocity,f=r.angularVelocity;r.force,r.torque;const g=xb,v=this.jacobianElementA,m=this.jacobianElementB,p=this.ni;o.cross(p,l),a.cross(p,c),p.negate(v.spatial),l.negate(v.rotational),m.spatial.copy(p),m.rotational.copy(c),g.copy(r.position),g.vadd(a,g),g.vsub(s.position,g),g.vsub(o,g);const _=p.dot(g),E=this.restitution+1,M=E*u.dot(p)-E*h.dot(p)+f.dot(c)-d.dot(l),A=this.computeGiMf();return-_*t-M*i-e*A}getImpactVelocityAlongNormal(){const e=yb,t=Mb,i=Sb,s=Eb,r=bb;return this.bi.position.vadd(this.ri,i),this.bj.position.vadd(this.rj,s),this.bi.getVelocityAtWorldPoint(i,e),this.bj.getVelocityAtWorldPoint(s,t),e.vsub(t,r),this.ni.dot(r)}}const _b=new S,vb=new S,xb=new S,yb=new S,Mb=new S,Sb=new S,Eb=new S,bb=new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;class nf extends _o{constructor(e,t,i){super(e,t,-i,i),this.ri=new S,this.rj=new S,this.t=new S}computeB(e){this.a;const t=this.b;this.bi,this.bj;const i=this.ri,s=this.rj,r=wb,o=Tb,a=this.t;i.cross(a,r),s.cross(a,o);const l=this.jacobianElementA,c=this.jacobianElementB;a.negate(l.spatial),r.negate(l.rotational),c.spatial.copy(a),c.rotational.copy(o);const h=this.computeGW(),d=this.computeGiMf();return-h*t-e*d}}const wb=new S,Tb=new S;class Qa{constructor(e,t,i){i=pb.defaults(i,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=Qa.idCounter++,this.materials=[e,t],this.friction=i.friction,this.restitution=i.restitution,this.contactEquationStiffness=i.contactEquationStiffness,this.contactEquationRelaxation=i.contactEquationRelaxation,this.frictionEquationStiffness=i.frictionEquationStiffness,this.frictionEquationRelaxation=i.frictionEquationRelaxation}}Qa.idCounter=0;class el{constructor(e){e===void 0&&(e={});let t="";typeof e=="string"&&(t=e,e={}),this.name=t,this.id=el.idCounter++,this.friction=typeof e.friction<"u"?e.friction:-1,this.restitution=typeof e.restitution<"u"?e.restitution:-1}}el.idCounter=0;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new Lt;new S;new S;new S;new S(1,0,0),new S(0,1,0),new S(0,0,1);new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;class Ab extends Le{constructor(){super({type:Le.types.PLANE}),this.worldNormal=new S,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(e){const t=this.worldNormal;t.set(0,0,1),e.vmult(t,t),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(e,t){return t===void 0&&(t=new S),t}volume(){return Number.MAX_VALUE}calculateWorldAABB(e,t,i,s){Si.set(0,0,1),t.vmult(Si,Si);const r=Number.MAX_VALUE;i.set(-r,-r,-r),s.set(r,r,r),Si.x===1?s.x=e.x:Si.x===-1&&(i.x=e.x),Si.y===1?s.y=e.y:Si.y===-1&&(i.y=e.y),Si.z===1?s.z=e.z:Si.z===-1&&(i.z=e.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}}const Si=new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new An;new S;new An;new S;new S;new S;new S;new S;new S;new S;new An;new S;new ct;new An;class Cb{constructor(){this.equations=[]}solve(e,t){return 0}addEquation(e){e.enabled&&!e.bi.isTrigger&&!e.bj.isTrigger&&this.equations.push(e)}removeEquation(e){const t=this.equations,i=t.indexOf(e);i!==-1&&t.splice(i,1)}removeAllEquations(){this.equations.length=0}}class Rb extends Cb{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(e,t){let i=0;const s=this.iterations,r=this.tolerance*this.tolerance,o=this.equations,a=o.length,l=t.bodies,c=l.length,h=e;let d,u,f,g,v,m;if(a!==0)for(let M=0;M!==c;M++)l[M].updateSolveMassProperties();const p=Db,_=Ib,E=Pb;p.length=a,_.length=a,E.length=a;for(let M=0;M!==a;M++){const A=o[M];E[M]=0,_[M]=A.computeB(h),p[M]=1/A.computeC()}if(a!==0){for(let C=0;C!==c;C++){const R=l[C],y=R.vlambda,b=R.wlambda;y.set(0,0,0),b.set(0,0,0)}for(i=0;i!==s;i++){g=0;for(let C=0;C!==a;C++){const R=o[C];d=_[C],u=p[C],m=E[C],v=R.computeGWlambda(),f=u*(d-v-R.eps*m),m+f<R.minForce?f=R.minForce-m:m+f>R.maxForce&&(f=R.maxForce-m),E[C]+=f,g+=f>0?f:-f,R.addToWlambda(f)}if(g*g<r)break}for(let C=0;C!==c;C++){const R=l[C],y=R.velocity,b=R.angularVelocity;R.vlambda.vmul(R.linearFactor,R.vlambda),y.vadd(R.vlambda,y),R.wlambda.vmul(R.angularFactor,R.wlambda),b.vadd(R.wlambda,b)}let M=o.length;const A=1/h;for(;M--;)o[M].multiplier=E[M]*A}return i}}const Pb=[],Db=[],Ib=[];class Lb{constructor(){this.objects=[],this.type=Object}release(){const e=arguments.length;for(let t=0;t!==e;t++)this.objects.push(t<0||arguments.length<=t?void 0:arguments[t]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(e){const t=this.objects;for(;t.length>e;)t.pop();for(;t.length<e;)t.push(this.constructObject());return this}}class Nb extends Lb{constructor(){super(...arguments),this.type=S}constructObject(){return new S}}const bt={sphereSphere:Le.types.SPHERE,spherePlane:Le.types.SPHERE|Le.types.PLANE,boxBox:Le.types.BOX|Le.types.BOX,sphereBox:Le.types.SPHERE|Le.types.BOX,planeBox:Le.types.PLANE|Le.types.BOX,convexConvex:Le.types.CONVEXPOLYHEDRON,sphereConvex:Le.types.SPHERE|Le.types.CONVEXPOLYHEDRON,planeConvex:Le.types.PLANE|Le.types.CONVEXPOLYHEDRON,boxConvex:Le.types.BOX|Le.types.CONVEXPOLYHEDRON,sphereHeightfield:Le.types.SPHERE|Le.types.HEIGHTFIELD,boxHeightfield:Le.types.BOX|Le.types.HEIGHTFIELD,convexHeightfield:Le.types.CONVEXPOLYHEDRON|Le.types.HEIGHTFIELD,sphereParticle:Le.types.PARTICLE|Le.types.SPHERE,planeParticle:Le.types.PLANE|Le.types.PARTICLE,boxParticle:Le.types.BOX|Le.types.PARTICLE,convexParticle:Le.types.PARTICLE|Le.types.CONVEXPOLYHEDRON,cylinderCylinder:Le.types.CYLINDER,sphereCylinder:Le.types.SPHERE|Le.types.CYLINDER,planeCylinder:Le.types.PLANE|Le.types.CYLINDER,boxCylinder:Le.types.BOX|Le.types.CYLINDER,convexCylinder:Le.types.CONVEXPOLYHEDRON|Le.types.CYLINDER,heightfieldCylinder:Le.types.HEIGHTFIELD|Le.types.CYLINDER,particleCylinder:Le.types.PARTICLE|Le.types.CYLINDER,sphereTrimesh:Le.types.SPHERE|Le.types.TRIMESH,planeTrimesh:Le.types.PLANE|Le.types.TRIMESH};class Fb{get[bt.sphereSphere](){return this.sphereSphere}get[bt.spherePlane](){return this.spherePlane}get[bt.boxBox](){return this.boxBox}get[bt.sphereBox](){return this.sphereBox}get[bt.planeBox](){return this.planeBox}get[bt.convexConvex](){return this.convexConvex}get[bt.sphereConvex](){return this.sphereConvex}get[bt.planeConvex](){return this.planeConvex}get[bt.boxConvex](){return this.boxConvex}get[bt.sphereHeightfield](){return this.sphereHeightfield}get[bt.boxHeightfield](){return this.boxHeightfield}get[bt.convexHeightfield](){return this.convexHeightfield}get[bt.sphereParticle](){return this.sphereParticle}get[bt.planeParticle](){return this.planeParticle}get[bt.boxParticle](){return this.boxParticle}get[bt.convexParticle](){return this.convexParticle}get[bt.cylinderCylinder](){return this.convexConvex}get[bt.sphereCylinder](){return this.sphereConvex}get[bt.planeCylinder](){return this.planeConvex}get[bt.boxCylinder](){return this.boxConvex}get[bt.convexCylinder](){return this.convexConvex}get[bt.heightfieldCylinder](){return this.heightfieldCylinder}get[bt.particleCylinder](){return this.particleCylinder}get[bt.sphereTrimesh](){return this.sphereTrimesh}get[bt.planeTrimesh](){return this.planeTrimesh}constructor(e){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new Nb,this.world=e,this.currentContactMaterial=e.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(e,t,i,s,r,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=e,a.bj=t):a=new gb(e,t),a.enabled=e.collisionResponse&&t.collisionResponse&&i.collisionResponse&&s.collisionResponse;const l=this.currentContactMaterial;a.restitution=l.restitution,a.setSpookParams(l.contactEquationStiffness,l.contactEquationRelaxation,this.world.dt);const c=i.material||e.material,h=s.material||t.material;return c&&h&&c.restitution>=0&&h.restitution>=0&&(a.restitution=c.restitution*h.restitution),a.si=r||i,a.sj=o||s,a}createFrictionEquationsFromContact(e,t){const i=e.bi,s=e.bj,r=e.si,o=e.sj,a=this.world,l=this.currentContactMaterial;let c=l.friction;const h=r.material||i.material,d=o.material||s.material;if(h&&d&&h.friction>=0&&d.friction>=0&&(c=h.friction*d.friction),c>0){const u=c*(a.frictionGravity||a.gravity).length();let f=i.invMass+s.invMass;f>0&&(f=1/f);const g=this.frictionEquationPool,v=g.length?g.pop():new nf(i,s,u*f),m=g.length?g.pop():new nf(i,s,u*f);return v.bi=m.bi=i,v.bj=m.bj=s,v.minForce=m.minForce=-u*f,v.maxForce=m.maxForce=u*f,v.ri.copy(e.ri),v.rj.copy(e.rj),m.ri.copy(e.ri),m.rj.copy(e.rj),e.ni.tangents(v.t,m.t),v.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),m.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),v.enabled=m.enabled=e.enabled,t.push(v,m),!0}return!1}createFrictionFromAverage(e){let t=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(t,this.frictionResult)||e===1)return;const i=this.frictionResult[this.frictionResult.length-2],s=this.frictionResult[this.frictionResult.length-1];xs.setZero(),nr.setZero(),ir.setZero();const r=t.bi;t.bj;for(let a=0;a!==e;a++)t=this.result[this.result.length-1-a],t.bi!==r?(xs.vadd(t.ni,xs),nr.vadd(t.ri,nr),ir.vadd(t.rj,ir)):(xs.vsub(t.ni,xs),nr.vadd(t.rj,nr),ir.vadd(t.ri,ir));const o=1/e;nr.scale(o,i.ri),ir.scale(o,i.rj),s.ri.copy(i.ri),s.rj.copy(i.rj),xs.normalize(),xs.tangents(i.t,s.t)}getContacts(e,t,i,s,r,o,a){this.contactPointPool=r,this.frictionEquationPool=a,this.result=s,this.frictionResult=o;const l=Bb,c=zb,h=Ub,d=Ob;for(let u=0,f=e.length;u!==f;u++){const g=e[u],v=t[u];let m=null;g.material&&v.material&&(m=i.getContactMaterial(g.material,v.material)||null);const p=g.type&be.KINEMATIC&&v.type&be.STATIC||g.type&be.STATIC&&v.type&be.KINEMATIC||g.type&be.KINEMATIC&&v.type&be.KINEMATIC;for(let _=0;_<g.shapes.length;_++){g.quaternion.mult(g.shapeOrientations[_],l),g.quaternion.vmult(g.shapeOffsets[_],h),h.vadd(g.position,h);const E=g.shapes[_];for(let M=0;M<v.shapes.length;M++){v.quaternion.mult(v.shapeOrientations[M],c),v.quaternion.vmult(v.shapeOffsets[M],d),d.vadd(v.position,d);const A=v.shapes[M];if(!(E.collisionFilterMask&A.collisionFilterGroup&&A.collisionFilterMask&E.collisionFilterGroup)||h.distanceTo(d)>E.boundingSphereRadius+A.boundingSphereRadius)continue;let C=null;E.material&&A.material&&(C=i.getContactMaterial(E.material,A.material)||null),this.currentContactMaterial=C||m||i.defaultContactMaterial;const R=E.type|A.type,y=this[R];if(y){let b=!1;E.type<A.type?b=y.call(this,E,A,h,d,l,c,g,v,E,A,p):b=y.call(this,A,E,d,h,c,l,v,g,E,A,p),b&&p&&(i.shapeOverlapKeeper.set(E.id,A.id),i.bodyOverlapKeeper.set(g.id,v.id))}}}}}sphereSphere(e,t,i,s,r,o,a,l,c,h,d){if(d)return i.distanceSquared(s)<(e.radius+t.radius)**2;const u=this.createContactEquation(a,l,e,t,c,h);s.vsub(i,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(e.radius,u.ri),u.rj.scale(-t.radius,u.rj),u.ri.vadd(i,u.ri),u.ri.vsub(a.position,u.ri),u.rj.vadd(s,u.rj),u.rj.vsub(l.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(e,t,i,s,r,o,a,l,c,h,d){const u=this.createContactEquation(a,l,e,t,c,h);if(u.ni.set(0,0,1),o.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),u.ni.scale(e.radius,u.ri),i.vsub(s,Ko),u.ni.scale(u.ni.dot(Ko),sf),Ko.vsub(sf,u.rj),-Ko.dot(u.ni)<=e.radius){if(d)return!0;const f=u.ri,g=u.rj;f.vadd(i,f),f.vsub(a.position,f),g.vadd(s,g),g.vsub(l.position,g),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(e,t,i,s,r,o,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t.convexPolyhedronRepresentation,i,s,r,o,a,l,e,t,d)}sphereBox(e,t,i,s,r,o,a,l,c,h,d){const u=this.v3pool,f=uw;i.vsub(s,Zo),t.getSideNormals(f,o);const g=e.radius;let v=!1;const m=fw,p=pw,_=mw;let E=null,M=0,A=0,C=0,R=null;for(let N=0,V=f.length;N!==V&&v===!1;N++){const q=lw;q.copy(f[N]);const Q=q.length();q.normalize();const me=Zo.dot(q);if(me<Q+g&&me>0){const _e=cw,ie=hw;_e.copy(f[(N+1)%3]),ie.copy(f[(N+2)%3]);const Ge=_e.length(),at=ie.length();_e.normalize(),ie.normalize();const lt=Zo.dot(_e),se=Zo.dot(ie);if(lt<Ge&&lt>-Ge&&se<at&&se>-at){const pe=Math.abs(me-Q-g);if((R===null||pe<R)&&(R=pe,A=lt,C=se,E=Q,m.copy(q),p.copy(_e),_.copy(ie),M++,d))return!0}}}if(M){v=!0;const N=this.createContactEquation(a,l,e,t,c,h);m.scale(-g,N.ri),N.ni.copy(m),N.ni.negate(N.ni),m.scale(E,m),p.scale(A,p),m.vadd(p,m),_.scale(C,_),m.vadd(_,N.rj),N.ri.vadd(i,N.ri),N.ri.vsub(a.position,N.ri),N.rj.vadd(s,N.rj),N.rj.vsub(l.position,N.rj),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult)}let y=u.get();const b=dw;for(let N=0;N!==2&&!v;N++)for(let V=0;V!==2&&!v;V++)for(let q=0;q!==2&&!v;q++)if(y.set(0,0,0),N?y.vadd(f[0],y):y.vsub(f[0],y),V?y.vadd(f[1],y):y.vsub(f[1],y),q?y.vadd(f[2],y):y.vsub(f[2],y),s.vadd(y,b),b.vsub(i,b),b.lengthSquared()<g*g){if(d)return!0;v=!0;const Q=this.createContactEquation(a,l,e,t,c,h);Q.ri.copy(b),Q.ri.normalize(),Q.ni.copy(Q.ri),Q.ri.scale(g,Q.ri),Q.rj.copy(y),Q.ri.vadd(i,Q.ri),Q.ri.vsub(a.position,Q.ri),Q.rj.vadd(s,Q.rj),Q.rj.vsub(l.position,Q.rj),this.result.push(Q),this.createFrictionEquationsFromContact(Q,this.frictionResult)}u.release(y),y=null;const H=u.get(),D=u.get(),L=u.get(),I=u.get(),B=u.get(),U=f.length;for(let N=0;N!==U&&!v;N++)for(let V=0;V!==U&&!v;V++)if(N%3!==V%3){f[V].cross(f[N],H),H.normalize(),f[N].vadd(f[V],D),L.copy(i),L.vsub(D,L),L.vsub(s,L);const q=L.dot(H);H.scale(q,I);let Q=0;for(;Q===N%3||Q===V%3;)Q++;B.copy(i),B.vsub(I,B),B.vsub(D,B),B.vsub(s,B);const me=Math.abs(q),_e=B.length();if(me<f[Q].length()&&_e<g){if(d)return!0;v=!0;const ie=this.createContactEquation(a,l,e,t,c,h);D.vadd(I,ie.rj),ie.rj.copy(ie.rj),B.negate(ie.ni),ie.ni.normalize(),ie.ri.copy(ie.rj),ie.ri.vadd(s,ie.ri),ie.ri.vsub(i,ie.ri),ie.ri.normalize(),ie.ri.scale(g,ie.ri),ie.ri.vadd(i,ie.ri),ie.ri.vsub(a.position,ie.ri),ie.rj.vadd(s,ie.rj),ie.rj.vsub(l.position,ie.rj),this.result.push(ie),this.createFrictionEquationsFromContact(ie,this.frictionResult)}}u.release(H,D,L,I,B)}planeBox(e,t,i,s,r,o,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,t.convexPolyhedronRepresentation.id=t.id,this.planeConvex(e,t.convexPolyhedronRepresentation,i,s,r,o,a,l,e,t,d)}convexConvex(e,t,i,s,r,o,a,l,c,h,d,u,f){const g=Pw;if(!(i.distanceTo(s)>e.boundingSphereRadius+t.boundingSphereRadius)&&e.findSeparatingAxis(t,i,r,s,o,g,u,f)){const v=[],m=Dw;e.clipAgainstHull(i,r,t,s,o,g,-100,100,v);let p=0;for(let _=0;_!==v.length;_++){if(d)return!0;const E=this.createContactEquation(a,l,e,t,c,h),M=E.ri,A=E.rj;g.negate(E.ni),v[_].normal.negate(m),m.scale(v[_].depth,m),v[_].point.vadd(m,M),A.copy(v[_].point),M.vsub(i,M),A.vsub(s,A),M.vadd(i,M),M.vsub(a.position,M),A.vadd(s,A),A.vsub(l.position,A),this.result.push(E),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(E,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}}sphereConvex(e,t,i,s,r,o,a,l,c,h,d){const u=this.v3pool;i.vsub(s,gw);const f=t.faceNormals,g=t.faces,v=t.vertices,m=e.radius;let p=!1;for(let _=0;_!==v.length;_++){const E=v[_],M=yw;o.vmult(E,M),s.vadd(M,M);const A=xw;if(M.vsub(i,A),A.lengthSquared()<m*m){if(d)return!0;p=!0;const C=this.createContactEquation(a,l,e,t,c,h);C.ri.copy(A),C.ri.normalize(),C.ni.copy(C.ri),C.ri.scale(m,C.ri),M.vsub(s,C.rj),C.ri.vadd(i,C.ri),C.ri.vsub(a.position,C.ri),C.rj.vadd(s,C.rj),C.rj.vsub(l.position,C.rj),this.result.push(C),this.createFrictionEquationsFromContact(C,this.frictionResult);return}}for(let _=0,E=g.length;_!==E&&p===!1;_++){const M=f[_],A=g[_],C=Mw;o.vmult(M,C);const R=Sw;o.vmult(v[A[0]],R),R.vadd(s,R);const y=Ew;C.scale(-m,y),i.vadd(y,y);const b=bw;y.vsub(R,b);const H=b.dot(C),D=ww;if(i.vsub(R,D),H<0&&D.dot(C)>0){const L=[];for(let I=0,B=A.length;I!==B;I++){const U=u.get();o.vmult(v[A[I]],U),s.vadd(U,U),L.push(U)}if(aw(L,C,i)){if(d)return!0;p=!0;const I=this.createContactEquation(a,l,e,t,c,h);C.scale(-m,I.ri),C.negate(I.ni);const B=u.get();C.scale(-H,B);const U=u.get();C.scale(-m,U),i.vsub(s,I.rj),I.rj.vadd(U,I.rj),I.rj.vadd(B,I.rj),I.rj.vadd(s,I.rj),I.rj.vsub(l.position,I.rj),I.ri.vadd(i,I.ri),I.ri.vsub(a.position,I.ri),u.release(B),u.release(U),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult);for(let N=0,V=L.length;N!==V;N++)u.release(L[N]);return}else for(let I=0;I!==A.length;I++){const B=u.get(),U=u.get();o.vmult(v[A[(I+1)%A.length]],B),o.vmult(v[A[(I+2)%A.length]],U),s.vadd(B,B),s.vadd(U,U);const N=_w;U.vsub(B,N);const V=vw;N.unit(V);const q=u.get(),Q=u.get();i.vsub(B,Q);const me=Q.dot(V);V.scale(me,q),q.vadd(B,q);const _e=u.get();if(q.vsub(i,_e),me>0&&me*me<N.lengthSquared()&&_e.lengthSquared()<m*m){if(d)return!0;const ie=this.createContactEquation(a,l,e,t,c,h);q.vsub(s,ie.rj),q.vsub(i,ie.ni),ie.ni.normalize(),ie.ni.scale(m,ie.ri),ie.rj.vadd(s,ie.rj),ie.rj.vsub(l.position,ie.rj),ie.ri.vadd(i,ie.ri),ie.ri.vsub(a.position,ie.ri),this.result.push(ie),this.createFrictionEquationsFromContact(ie,this.frictionResult);for(let Ge=0,at=L.length;Ge!==at;Ge++)u.release(L[Ge]);u.release(B),u.release(U),u.release(q),u.release(_e),u.release(Q);return}u.release(B),u.release(U),u.release(q),u.release(_e),u.release(Q)}for(let I=0,B=L.length;I!==B;I++)u.release(L[I])}}}planeConvex(e,t,i,s,r,o,a,l,c,h,d){const u=Tw,f=Aw;f.set(0,0,1),r.vmult(f,f);let g=0;const v=Cw;for(let m=0;m!==t.vertices.length;m++)if(u.copy(t.vertices[m]),o.vmult(u,u),s.vadd(u,u),u.vsub(i,v),f.dot(v)<=0){if(d)return!0;const _=this.createContactEquation(a,l,e,t,c,h),E=Rw;f.scale(f.dot(v),E),u.vsub(E,E),E.vsub(i,_.ri),_.ni.copy(f),u.vsub(s,_.rj),_.ri.vadd(i,_.ri),_.ri.vsub(a.position,_.ri),_.rj.vadd(s,_.rj),_.rj.vsub(l.position,_.rj),this.result.push(_),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(_,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(e,t,i,s,r,o,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t,i,s,r,o,a,l,e,t,d)}sphereHeightfield(e,t,i,s,r,o,a,l,c,h,d){const u=t.data,f=e.radius,g=t.elementSize,v=kw,m=Gw;ct.pointToLocalFrame(s,o,i,m);let p=Math.floor((m.x-f)/g)-1,_=Math.ceil((m.x+f)/g)+1,E=Math.floor((m.y-f)/g)-1,M=Math.ceil((m.y+f)/g)+1;if(_<0||M<0||p>u.length||E>u[0].length)return;p<0&&(p=0),_<0&&(_=0),E<0&&(E=0),M<0&&(M=0),p>=u.length&&(p=u.length-1),_>=u.length&&(_=u.length-1),M>=u[0].length&&(M=u[0].length-1),E>=u[0].length&&(E=u[0].length-1);const A=[];t.getRectMinMax(p,E,_,M,A);const C=A[0],R=A[1];if(m.z-f>R||m.z+f<C)return;const y=this.result;for(let b=p;b<_;b++)for(let H=E;H<M;H++){const D=y.length;let L=!1;if(t.getConvexTrianglePillar(b,H,!1),ct.pointToWorldFrame(s,o,t.pillarOffset,v),i.distanceTo(v)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(L=this.sphereConvex(e,t.pillarConvex,i,v,r,o,a,l,e,t,d)),d&&L||(t.getConvexTrianglePillar(b,H,!0),ct.pointToWorldFrame(s,o,t.pillarOffset,v),i.distanceTo(v)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(L=this.sphereConvex(e,t.pillarConvex,i,v,r,o,a,l,e,t,d)),d&&L))return!0;if(y.length-D>2)return}}boxHeightfield(e,t,i,s,r,o,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexHeightfield(e.convexPolyhedronRepresentation,t,i,s,r,o,a,l,e,t,d)}convexHeightfield(e,t,i,s,r,o,a,l,c,h,d){const u=t.data,f=t.elementSize,g=e.boundingSphereRadius,v=Hw,m=Vw,p=zw;ct.pointToLocalFrame(s,o,i,p);let _=Math.floor((p.x-g)/f)-1,E=Math.ceil((p.x+g)/f)+1,M=Math.floor((p.y-g)/f)-1,A=Math.ceil((p.y+g)/f)+1;if(E<0||A<0||_>u.length||M>u[0].length)return;_<0&&(_=0),E<0&&(E=0),M<0&&(M=0),A<0&&(A=0),_>=u.length&&(_=u.length-1),E>=u.length&&(E=u.length-1),A>=u[0].length&&(A=u[0].length-1),M>=u[0].length&&(M=u[0].length-1);const C=[];t.getRectMinMax(_,M,E,A,C);const R=C[0],y=C[1];if(!(p.z-g>y||p.z+g<R))for(let b=_;b<E;b++)for(let H=M;H<A;H++){let D=!1;if(t.getConvexTrianglePillar(b,H,!1),ct.pointToWorldFrame(s,o,t.pillarOffset,v),i.distanceTo(v)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(D=this.convexConvex(e,t.pillarConvex,i,v,r,o,a,l,null,null,d,m,null)),d&&D||(t.getConvexTrianglePillar(b,H,!0),ct.pointToWorldFrame(s,o,t.pillarOffset,v),i.distanceTo(v)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(D=this.convexConvex(e,t.pillarConvex,i,v,r,o,a,l,null,null,d,m,null)),d&&D))return!0}}sphereParticle(e,t,i,s,r,o,a,l,c,h,d){const u=Fw;if(u.set(0,0,1),s.vsub(i,u),u.lengthSquared()<=e.radius*e.radius){if(d)return!0;const g=this.createContactEquation(l,a,t,e,c,h);u.normalize(),g.rj.copy(u),g.rj.scale(e.radius,g.rj),g.ni.copy(u),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(e,t,i,s,r,o,a,l,c,h,d){const u=Iw;u.set(0,0,1),a.quaternion.vmult(u,u);const f=Lw;if(s.vsub(a.position,f),u.dot(f)<=0){if(d)return!0;const v=this.createContactEquation(l,a,t,e,c,h);v.ni.copy(u),v.ni.negate(v.ni),v.ri.set(0,0,0);const m=Nw;u.scale(u.dot(s),m),s.vsub(m,m),v.rj.copy(m),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(e,t,i,s,r,o,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexParticle(e.convexPolyhedronRepresentation,t,i,s,r,o,a,l,e,t,d)}convexParticle(e,t,i,s,r,o,a,l,c,h,d){let u=-1;const f=Ow,g=Bw;let v=null;const m=Uw;if(m.copy(s),m.vsub(i,m),r.conjugate(rf),rf.vmult(m,m),e.pointIsInside(m)){e.worldVerticesNeedsUpdate&&e.computeWorldVertices(i,r),e.worldFaceNormalsNeedsUpdate&&e.computeWorldFaceNormals(r);for(let p=0,_=e.faces.length;p!==_;p++){const E=[e.worldVertices[e.faces[p][0]]],M=e.worldFaceNormals[p];s.vsub(E[0],of);const A=-M.dot(of);if(v===null||Math.abs(A)<Math.abs(v)){if(d)return!0;v=A,u=p,f.copy(M)}}if(u!==-1){const p=this.createContactEquation(l,a,t,e,c,h);f.scale(v,g),g.vadd(s,g),g.vsub(i,g),p.rj.copy(g),f.negate(p.ni),p.ri.set(0,0,0);const _=p.ri,E=p.rj;_.vadd(s,_),_.vsub(l.position,_),E.vadd(i,E),E.vsub(a.position,E),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(e,t,i,s,r,o,a,l,c,h,d){return this.convexHeightfield(t,e,s,i,o,r,l,a,c,h,d)}particleCylinder(e,t,i,s,r,o,a,l,c,h,d){return this.convexParticle(t,e,s,i,o,r,l,a,c,h,d)}sphereTrimesh(e,t,i,s,r,o,a,l,c,h,d){const u=Yb,f=jb,g=$b,v=Kb,m=Zb,p=Jb,_=nw,E=qb,M=Wb,A=iw;ct.pointToLocalFrame(s,o,i,m);const C=e.radius;_.lowerBound.set(m.x-C,m.y-C,m.z-C),_.upperBound.set(m.x+C,m.y+C,m.z+C),t.getTrianglesInAABB(_,A);const R=Xb,y=e.radius*e.radius;for(let I=0;I<A.length;I++)for(let B=0;B<3;B++)if(t.getVertex(t.indices[A[I]*3+B],R),R.vsub(m,M),M.lengthSquared()<=y){if(E.copy(R),ct.pointToWorldFrame(s,o,E,R),R.vsub(i,M),d)return!0;let U=this.createContactEquation(a,l,e,t,c,h);U.ni.copy(M),U.ni.normalize(),U.ri.copy(U.ni),U.ri.scale(e.radius,U.ri),U.ri.vadd(i,U.ri),U.ri.vsub(a.position,U.ri),U.rj.copy(R),U.rj.vsub(l.position,U.rj),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult)}for(let I=0;I<A.length;I++)for(let B=0;B<3;B++){t.getVertex(t.indices[A[I]*3+B],u),t.getVertex(t.indices[A[I]*3+(B+1)%3],f),f.vsub(u,g),m.vsub(f,p);const U=p.dot(g);m.vsub(u,p);let N=p.dot(g);if(N>0&&U<0&&(m.vsub(u,p),v.copy(g),v.normalize(),N=p.dot(v),v.scale(N,p),p.vadd(u,p),p.distanceTo(m)<e.radius)){if(d)return!0;const q=this.createContactEquation(a,l,e,t,c,h);p.vsub(m,q.ni),q.ni.normalize(),q.ni.scale(e.radius,q.ri),q.ri.vadd(i,q.ri),q.ri.vsub(a.position,q.ri),ct.pointToWorldFrame(s,o,p,p),p.vsub(l.position,q.rj),ct.vectorToWorldFrame(o,q.ni,q.ni),ct.vectorToWorldFrame(o,q.ri,q.ri),this.result.push(q),this.createFrictionEquationsFromContact(q,this.frictionResult)}}const b=Qb,H=ew,D=tw,L=kb;for(let I=0,B=A.length;I!==B;I++){t.getTriangleVertices(A[I],b,H,D),t.getNormal(A[I],L),m.vsub(b,p);let U=p.dot(L);if(L.scale(U,p),m.vsub(p,p),U=p.distanceTo(m),Lt.pointInTriangle(p,b,H,D)&&U<e.radius){if(d)return!0;let N=this.createContactEquation(a,l,e,t,c,h);p.vsub(m,N.ni),N.ni.normalize(),N.ni.scale(e.radius,N.ri),N.ri.vadd(i,N.ri),N.ri.vsub(a.position,N.ri),ct.pointToWorldFrame(s,o,p,p),p.vsub(l.position,N.rj),ct.vectorToWorldFrame(o,N.ni,N.ni),ct.vectorToWorldFrame(o,N.ri,N.ri),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult)}}A.length=0}planeTrimesh(e,t,i,s,r,o,a,l,c,h,d){const u=new S,f=Hb;f.set(0,0,1),r.vmult(f,f);for(let g=0;g<t.vertices.length/3;g++){t.getVertex(g,u);const v=new S;v.copy(u),ct.pointToWorldFrame(s,o,v,u);const m=Vb;if(u.vsub(i,m),f.dot(m)<=0){if(d)return!0;const _=this.createContactEquation(a,l,e,t,c,h);_.ni.copy(f);const E=Gb;f.scale(m.dot(f),E),u.vsub(E,E),_.ri.copy(E),_.ri.vsub(a.position,_.ri),_.rj.copy(u),_.rj.vsub(l.position,_.rj),this.result.push(_),this.createFrictionEquationsFromContact(_,this.frictionResult)}}}}const xs=new S,nr=new S,ir=new S,Ub=new S,Ob=new S,Bb=new Nt,zb=new Nt,Hb=new S,Vb=new S,Gb=new S,kb=new S,Wb=new S;new S;const Xb=new S,qb=new S,Yb=new S,jb=new S,$b=new S,Kb=new S,Zb=new S,Jb=new S,Qb=new S,ew=new S,tw=new S,nw=new An,iw=[],Ko=new S,sf=new S,sw=new S,rw=new S,ow=new S;function aw(n,e,t){let i=null;const s=n.length;for(let r=0;r!==s;r++){const o=n[r],a=sw;n[(r+1)%s].vsub(o,a);const l=rw;a.cross(e,l);const c=ow;t.vsub(o,c);const h=l.dot(c);if(i===null||h>0&&i===!0||h<=0&&i===!1){i===null&&(i=h>0);continue}else return!1}return!0}const Zo=new S,lw=new S,cw=new S,hw=new S,uw=[new S,new S,new S,new S,new S,new S],dw=new S,fw=new S,pw=new S,mw=new S,gw=new S,_w=new S,vw=new S,xw=new S,yw=new S,Mw=new S,Sw=new S,Ew=new S,bw=new S,ww=new S;new S;new S;const Tw=new S,Aw=new S,Cw=new S,Rw=new S,Pw=new S,Dw=new S,Iw=new S,Lw=new S,Nw=new S,Fw=new S,rf=new Nt,Uw=new S;new S;const Ow=new S,of=new S,Bw=new S,zw=new S,Hw=new S,Vw=[0],Gw=new S,kw=new S;class af{constructor(){this.current=[],this.previous=[]}getKey(e,t){if(t<e){const i=t;t=e,e=i}return e<<16|t}set(e,t){const i=this.getKey(e,t),s=this.current;let r=0;for(;i>s[r];)r++;if(i!==s[r]){for(let o=s.length-1;o>=r;o--)s[o+1]=s[o];s[r]=i}}tick(){const e=this.current;this.current=this.previous,this.previous=e,this.current.length=0}getDiff(e,t){const i=this.current,s=this.previous,r=i.length,o=s.length;let a=0;for(let l=0;l<r;l++){let c=!1;const h=i[l];for(;h>s[a];)a++;c=h===s[a],c||lf(e,h)}a=0;for(let l=0;l<o;l++){let c=!1;const h=s[l];for(;h>i[a];)a++;c=i[a]===h,c||lf(t,h)}}}function lf(n,e){n.push((e&4294901760)>>16,e&65535)}const Jl=(n,e)=>n<e?`${n}-${e}`:`${e}-${n}`;class Ww{constructor(){this.data={keys:[]}}get(e,t){const i=Jl(e,t);return this.data[i]}set(e,t,i){const s=Jl(e,t);this.get(e,t)||this.data.keys.push(s),this.data[s]=i}delete(e,t){const i=Jl(e,t),s=this.data.keys.indexOf(i);s!==-1&&this.data.keys.splice(s,1),delete this.data[i]}reset(){const e=this.data,t=e.keys;for(;t.length>0;){const i=t.pop();delete e[i]}}}class Xw extends cm{constructor(e){e===void 0&&(e={}),super(),this.dt=-1,this.allowSleep=!!e.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=e.quatNormalizeSkip!==void 0?e.quatNormalizeSkip:0,this.quatNormalizeFast=e.quatNormalizeFast!==void 0?e.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new S,e.gravity&&this.gravity.copy(e.gravity),e.frictionGravity&&(this.frictionGravity=new S,this.frictionGravity.copy(e.frictionGravity)),this.broadphase=e.broadphase!==void 0?e.broadphase:new ZE,this.bodies=[],this.hasActiveBodies=!1,this.solver=e.solver!==void 0?e.solver:new Rb,this.constraints=[],this.narrowphase=new Fb(this),this.collisionMatrix=new qd,this.collisionMatrixPrevious=new qd,this.bodyOverlapKeeper=new af,this.shapeOverlapKeeper=new af,this.contactmaterials=[],this.contactMaterialTable=new Ww,this.defaultMaterial=new el("default"),this.defaultContactMaterial=new Qa(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(e,t){return this.contactMaterialTable.get(e.id,t.id)}collisionMatrixTick(){const e=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=e,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(e){this.constraints.push(e)}removeConstraint(e){const t=this.constraints.indexOf(e);t!==-1&&this.constraints.splice(t,1)}rayTest(e,t,i){i instanceof Pa?this.raycastClosest(e,t,{skipBackfaces:!0},i):this.raycastAll(e,t,{skipBackfaces:!0},i)}raycastAll(e,t,i,s){return i===void 0&&(i={}),i.mode=Lt.ALL,i.from=e,i.to=t,i.callback=s,Ql.intersectWorld(this,i)}raycastAny(e,t,i,s){return i===void 0&&(i={}),i.mode=Lt.ANY,i.from=e,i.to=t,i.result=s,Ql.intersectWorld(this,i)}raycastClosest(e,t,i,s){return i===void 0&&(i={}),i.mode=Lt.CLOSEST,i.from=e,i.to=t,i.result=s,Ql.intersectWorld(this,i)}addBody(e){this.bodies.includes(e)||(e.index=this.bodies.length,this.bodies.push(e),e.world=this,e.initPosition.copy(e.position),e.initVelocity.copy(e.velocity),e.timeLastSleepy=this.time,e instanceof be&&(e.initAngularVelocity.copy(e.angularVelocity),e.initQuaternion.copy(e.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=e,this.idToBodyMap[e.id]=e,this.dispatchEvent(this.addBodyEvent))}removeBody(e){e.world=null;const t=this.bodies.length-1,i=this.bodies,s=i.indexOf(e);if(s!==-1){i.splice(s,1);for(let r=0;r!==i.length;r++)i[r].index=r;this.collisionMatrix.setNumObjects(t),this.removeBodyEvent.body=e,delete this.idToBodyMap[e.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(e){return this.idToBodyMap[e]}getShapeById(e){const t=this.bodies;for(let i=0;i<t.length;i++){const s=t[i].shapes;for(let r=0;r<s.length;r++){const o=s[r];if(o.id===e)return o}}return null}addContactMaterial(e){this.contactmaterials.push(e),this.contactMaterialTable.set(e.materials[0].id,e.materials[1].id,e)}removeContactMaterial(e){const t=this.contactmaterials.indexOf(e);t!==-1&&(this.contactmaterials.splice(t,1),this.contactMaterialTable.delete(e.materials[0].id,e.materials[1].id))}fixedStep(e,t){e===void 0&&(e=1/60),t===void 0&&(t=10);const i=Ut.now()/1e3;if(!this.lastCallTime)this.step(e,void 0,t);else{const s=i-this.lastCallTime;this.step(e,s,t)}this.lastCallTime=i}step(e,t,i){if(i===void 0&&(i=10),t===void 0)this.internalStep(e),this.time+=e;else{this.accumulator+=t;const s=Ut.now();let r=0;for(;this.accumulator>=e&&r<i&&(this.internalStep(e),this.accumulator-=e,r++,!(Ut.now()-s>e*1e3)););this.accumulator=this.accumulator%e;const o=this.accumulator/e;for(let a=0;a!==this.bodies.length;a++){const l=this.bodies[a];l.previousPosition.lerp(l.position,o,l.interpolatedPosition),l.previousQuaternion.slerp(l.quaternion,o,l.interpolatedQuaternion),l.previousQuaternion.normalize()}this.time+=t}}internalStep(e){this.dt=e;const t=this.contacts,i=Kw,s=Zw,r=this.bodies.length,o=this.bodies,a=this.solver,l=this.gravity,c=this.doProfiling,h=this.profile,d=be.DYNAMIC;let u=-1/0;const f=this.constraints,g=$w;l.length();const v=l.x,m=l.y,p=l.z;let _=0;for(c&&(u=Ut.now()),_=0;_!==r;_++){const I=o[_];if(I.type===d){const B=I.force,U=I.mass;B.x+=U*v,B.y+=U*m,B.z+=U*p}}for(let I=0,B=this.subsystems.length;I!==B;I++)this.subsystems[I].update();c&&(u=Ut.now()),i.length=0,s.length=0,this.broadphase.collisionPairs(this,i,s),c&&(h.broadphase=Ut.now()-u);let E=f.length;for(_=0;_!==E;_++){const I=f[_];if(!I.collideConnected)for(let B=i.length-1;B>=0;B-=1)(I.bodyA===i[B]&&I.bodyB===s[B]||I.bodyB===i[B]&&I.bodyA===s[B])&&(i.splice(B,1),s.splice(B,1))}this.collisionMatrixTick(),c&&(u=Ut.now());const M=jw,A=t.length;for(_=0;_!==A;_++)M.push(t[_]);t.length=0;const C=this.frictionEquations.length;for(_=0;_!==C;_++)g.push(this.frictionEquations[_]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(i,s,this,t,M,this.frictionEquations,g),c&&(h.narrowphase=Ut.now()-u),c&&(u=Ut.now()),_=0;_<this.frictionEquations.length;_++)a.addEquation(this.frictionEquations[_]);const R=t.length;for(let I=0;I!==R;I++){const B=t[I],U=B.bi,N=B.bj,V=B.si,q=B.sj;let Q;if(U.material&&N.material?Q=this.getContactMaterial(U.material,N.material)||this.defaultContactMaterial:Q=this.defaultContactMaterial,Q.friction,U.material&&N.material&&(U.material.friction>=0&&N.material.friction>=0&&U.material.friction*N.material.friction,U.material.restitution>=0&&N.material.restitution>=0&&(B.restitution=U.material.restitution*N.material.restitution)),a.addEquation(B),U.allowSleep&&U.type===be.DYNAMIC&&U.sleepState===be.SLEEPING&&N.sleepState===be.AWAKE&&N.type!==be.STATIC){const me=N.velocity.lengthSquared()+N.angularVelocity.lengthSquared(),_e=N.sleepSpeedLimit**2;me>=_e*2&&(U.wakeUpAfterNarrowphase=!0)}if(N.allowSleep&&N.type===be.DYNAMIC&&N.sleepState===be.SLEEPING&&U.sleepState===be.AWAKE&&U.type!==be.STATIC){const me=U.velocity.lengthSquared()+U.angularVelocity.lengthSquared(),_e=U.sleepSpeedLimit**2;me>=_e*2&&(N.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(U,N,!0),this.collisionMatrixPrevious.get(U,N)||(Or.body=N,Or.contact=B,U.dispatchEvent(Or),Or.body=U,N.dispatchEvent(Or)),this.bodyOverlapKeeper.set(U.id,N.id),this.shapeOverlapKeeper.set(V.id,q.id)}for(this.emitContactEvents(),c&&(h.makeContactConstraints=Ut.now()-u,u=Ut.now()),_=0;_!==r;_++){const I=o[_];I.wakeUpAfterNarrowphase&&(I.wakeUp(),I.wakeUpAfterNarrowphase=!1)}for(E=f.length,_=0;_!==E;_++){const I=f[_];I.update();for(let B=0,U=I.equations.length;B!==U;B++){const N=I.equations[B];a.addEquation(N)}}a.solve(e,this),c&&(h.solve=Ut.now()-u),a.removeAllEquations();const y=Math.pow;for(_=0;_!==r;_++){const I=o[_];if(I.type&d){const B=y(1-I.linearDamping,e),U=I.velocity;U.scale(B,U);const N=I.angularVelocity;if(N){const V=y(1-I.angularDamping,e);N.scale(V,N)}}}this.dispatchEvent(Yw),c&&(u=Ut.now());const H=this.stepnumber%(this.quatNormalizeSkip+1)===0,D=this.quatNormalizeFast;for(_=0;_!==r;_++)o[_].integrate(e,H,D);this.clearForces(),this.broadphase.dirty=!0,c&&(h.integrate=Ut.now()-u),this.stepnumber+=1,this.dispatchEvent(qw);let L=!0;if(this.allowSleep)for(L=!1,_=0;_!==r;_++){const I=o[_];I.sleepTick(this.time),I.sleepState!==be.SLEEPING&&(L=!0)}this.hasActiveBodies=L}emitContactEvents(){const e=this.hasAnyEventListener("beginContact"),t=this.hasAnyEventListener("endContact");if((e||t)&&this.bodyOverlapKeeper.getDiff(Ei,bi),e){for(let r=0,o=Ei.length;r<o;r+=2)Br.bodyA=this.getBodyById(Ei[r]),Br.bodyB=this.getBodyById(Ei[r+1]),this.dispatchEvent(Br);Br.bodyA=Br.bodyB=null}if(t){for(let r=0,o=bi.length;r<o;r+=2)zr.bodyA=this.getBodyById(bi[r]),zr.bodyB=this.getBodyById(bi[r+1]),this.dispatchEvent(zr);zr.bodyA=zr.bodyB=null}Ei.length=bi.length=0;const i=this.hasAnyEventListener("beginShapeContact"),s=this.hasAnyEventListener("endShapeContact");if((i||s)&&this.shapeOverlapKeeper.getDiff(Ei,bi),i){for(let r=0,o=Ei.length;r<o;r+=2){const a=this.getShapeById(Ei[r]),l=this.getShapeById(Ei[r+1]);wi.shapeA=a,wi.shapeB=l,a&&(wi.bodyA=a.body),l&&(wi.bodyB=l.body),this.dispatchEvent(wi)}wi.bodyA=wi.bodyB=wi.shapeA=wi.shapeB=null}if(s){for(let r=0,o=bi.length;r<o;r+=2){const a=this.getShapeById(bi[r]),l=this.getShapeById(bi[r+1]);Ti.shapeA=a,Ti.shapeB=l,a&&(Ti.bodyA=a.body),l&&(Ti.bodyB=l.body),this.dispatchEvent(Ti)}Ti.bodyA=Ti.bodyB=Ti.shapeA=Ti.shapeB=null}}clearForces(){const e=this.bodies,t=e.length;for(let i=0;i!==t;i++){const s=e[i];s.force,s.torque,s.force.set(0,0,0),s.torque.set(0,0,0)}}}new An;const Ql=new Lt,Ut=globalThis.performance||{};if(!Ut.now){let n=Date.now();Ut.timing&&Ut.timing.navigationStart&&(n=Ut.timing.navigationStart),Ut.now=()=>Date.now()-n}new S;const qw={type:"postStep"},Yw={type:"preStep"},Or={type:be.COLLIDE_EVENT_NAME,body:null,contact:null},jw=[],$w=[],Kw=[],Zw=[],Ei=[],bi=[],Br={type:"beginContact",bodyA:null,bodyB:null},zr={type:"endContact",bodyA:null,bodyB:null},wi={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Ti={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},cf={type:"change"},Hh={type:"start"},vm={type:"end"},Jo=new Lh,hf=new es,Jw=Math.cos(70*X_.DEG2RAD),Ft=new W,fn=2*Math.PI,vt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ec=1e-6;class Qw extends Dv{constructor(e,t=null){super(e,t),this.state=vt.NONE,this.target=new W,this.cursor=new W,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:pr.ROTATE,MIDDLE:pr.DOLLY,RIGHT:pr.PAN},this.touches={ONE:rr.ROTATE,TWO:rr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new W,this._lastQuaternion=new bn,this._lastTargetPosition=new W,this._quat=new bn().setFromUnitVectors(e.up,new W(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new vd,this._sphericalDelta=new vd,this._scale=1,this._panOffset=new W,this._rotateStart=new $e,this._rotateEnd=new $e,this._rotateDelta=new $e,this._panStart=new $e,this._panEnd=new $e,this._panDelta=new $e,this._dollyStart=new $e,this._dollyEnd=new $e,this._dollyDelta=new $e,this._dollyDirection=new W,this._mouse=new $e,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=tT.bind(this),this._onPointerDown=eT.bind(this),this._onPointerUp=nT.bind(this),this._onContextMenu=cT.bind(this),this._onMouseWheel=rT.bind(this),this._onKeyDown=oT.bind(this),this._onTouchStart=aT.bind(this),this._onTouchMove=lT.bind(this),this._onMouseDown=iT.bind(this),this._onMouseMove=sT.bind(this),this._interceptControlDown=hT.bind(this),this._interceptControlUp=uT.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(cf),this.update(),this.state=vt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Ft.copy(t).sub(this.target),Ft.applyQuaternion(this._quat),this._spherical.setFromVector3(Ft),this.autoRotate&&this.state===vt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=fn:i>Math.PI&&(i-=fn),s<-Math.PI?s+=fn:s>Math.PI&&(s-=fn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ft.setFromSpherical(this._spherical),Ft.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ft),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ft.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new W(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new W(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ft.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Jo.origin.copy(this.object.position),Jo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Jo.direction))<Jw?this.object.lookAt(this.target):(hf.setFromNormalAndCoplanarPoint(this.object.up,this.target),Jo.intersectPlane(hf,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ec||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ec||this._lastTargetPosition.distanceToSquared(this.target)>ec?(this.dispatchEvent(cf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?fn/60*this.autoRotateSpeed*e:fn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ft.setFromMatrixColumn(t,0),Ft.multiplyScalar(-e),this._panOffset.add(Ft)}_panUp(e,t){this.screenSpacePanning===!0?Ft.setFromMatrixColumn(t,1):(Ft.setFromMatrixColumn(t,0),Ft.crossVectors(this.object.up,Ft)),Ft.multiplyScalar(e),this._panOffset.add(Ft)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ft.copy(s).sub(this.target);let r=Ft.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/t.clientHeight),this._rotateUp(fn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-fn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(fn*this._rotateDelta.x/t.clientHeight),this._rotateUp(fn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new $e,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function eT(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function tT(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function nT(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(vm),this.state=vt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function iT(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case pr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=vt.DOLLY;break;case pr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=vt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=vt.ROTATE}break;case pr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=vt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=vt.PAN}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(Hh)}function sT(n){switch(this.state){case vt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case vt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function rT(n){this.enabled===!1||this.enableZoom===!1||this.state!==vt.NONE||(n.preventDefault(),this.dispatchEvent(Hh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(vm))}function oT(n){this.enabled!==!1&&this._handleKeyDown(n)}function aT(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case rr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=vt.TOUCH_ROTATE;break;case rr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=vt.TOUCH_PAN;break;default:this.state=vt.NONE}break;case 2:switch(this.touches.TWO){case rr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=vt.TOUCH_DOLLY_PAN;break;case rr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=vt.TOUCH_DOLLY_ROTATE;break;default:this.state=vt.NONE}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(Hh)}function lT(n){switch(this._trackPointer(n),this.state){case vt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case vt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case vt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case vt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=vt.NONE}}function cT(n){this.enabled!==!1&&n.preventDefault()}function hT(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function uT(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ae=(n,e,t)=>Be(new W(n,e,t)),mt=Ha({currentScreen:"main-menu",diceData:{interval:[null,null,null],allDone:[!1,!1,!1],diceCalc:{x:0,y:0,z:0},time:300,x:0,y:0,z:0},settings:{quality:2,outlineAppearance:"classic"},fields:{home:[{fields:[Ae(0,.5,0),Ae(0,.5,1),Ae(1,.5,0),Ae(1,.5,1)],color:"#CE0000"},{fields:[Ae(10,.5,0),Ae(9,.5,0),Ae(9,.5,1),Ae(10,.5,1)],color:"#F7D708"},{fields:[Ae(10,.5,10),Ae(9,.5,9),Ae(9,.5,10),Ae(10,.5,9)],color:"#009ECE"},{fields:[Ae(0,.5,10),Ae(0,.5,9),Ae(1,.5,9),Ae(1,.5,10)],color:"#9CCF31"}],target:[{fields:[Ae(1,.5,5),Ae(2,.5,5),Ae(3,.5,5),Ae(4,.5,5)],color:"#CE0000"},{fields:[Ae(5,.5,1),Ae(5,.5,2),Ae(5,.5,3),Ae(5,.5,4)],color:"#F7D708"},{fields:[Ae(9,.5,5),Ae(8,.5,5),Ae(7,.5,5),Ae(6,.5,5)],color:"#009ECE"},{fields:[Ae(5,.5,9),Ae(5,.5,8),Ae(5,.5,7),Ae(5,.5,6)],color:"#9CCF31"}],path:[Ae(0,.5,4),Ae(1,.5,4),Ae(2,.5,4),Ae(3,.5,4),Ae(4,.5,4),Ae(4,.5,3),Ae(4,.5,2),Ae(4,.5,1),Ae(4,.5,0),Ae(5,.5,0),Ae(6,.5,0),Ae(6,.5,1),Ae(6,.5,2),Ae(6,.5,3),Ae(6,.5,4),Ae(7,.5,4),Ae(8,.5,4),Ae(9,.5,4),Ae(10,.5,4),Ae(10,.5,5),Ae(10,.5,6),Ae(9,.5,6),Ae(8,.5,6),Ae(7,.5,6),Ae(6,.5,6),Ae(6,.5,7),Ae(6,.5,8),Ae(6,.5,9),Ae(6,.5,10),Ae(5,.5,10),Ae(4,.5,10),Ae(4,.5,9),Ae(4,.5,8),Ae(4,.5,7),Ae(4,.5,6),Ae(3,.5,6),Ae(2,.5,6),Ae(1,.5,6),Ae(0,.5,6),Ae(0,.5,5)]},players:[],currentPlayerId:-1,playingPlayerIndex:null,lastRolledDice:"Start",currentRound:0,gamePlayStatus:{isRolling:!1,isMoving:!1},controls:null}),dT=[{value:"off",label:"Off"},{value:"subtle",label:"Subtle"},{value:"classic",label:"Classic"},{value:"bold",label:"Bold"}],uf={off:{visible:!1,lineOpacity:0,lineScale:1},subtle:{visible:!0,lineOpacity:.42,lineScale:.985},classic:{visible:!0,lineOpacity:.78,lineScale:1},bold:{visible:!0,lineOpacity:1,lineScale:1.02}};function fT(n){return uf[n]||uf.classic}const vo=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},pT={name:"OutlineAppearanceSelect",props:{label:{type:String,default:"Outline Style"},selectId:{type:String,required:!0}},data(){return{store:mt,outlineAppearanceOptions:dT}}},mT={class:"form-row"},gT=["for"],_T={class:"nes-select is-dark is-full-width"},vT=["id"],xT=["value"];function yT(n,e,t,i,s,r){return Tt(),It("div",mT,[We("label",{for:t.selectId,class:"select-label"},Mn(t.label),9,gT),We("div",_T,[_h(We("select",{id:t.selectId,"onUpdate:modelValue":e[0]||(e[0]=o=>s.store.settings.outlineAppearance=o)},[(Tt(!0),It(_n,null,xa(s.outlineAppearanceOptions,o=>(Tt(),It("option",{key:o.value,value:o.value},Mn(o.label),9,xT))),128))],8,vT),[[i_,s.store.settings.outlineAppearance]])])])}const xm=vo(pT,[["render",yT]]),ym=1,Mm=3,df={1:{label:"Low",pixelRatioScale:.72,maxPixelRatio:1.1,shadowsEnabled:!1,shadowMapSize:0},2:{label:"Balanced",pixelRatioScale:.92,maxPixelRatio:1.5,shadowsEnabled:!0,shadowMapSize:768},3:{label:"High",pixelRatioScale:1.08,maxPixelRatio:2,shadowsEnabled:!0,shadowMapSize:1024}};function MT(n){const e=Number(n);return Number.isFinite(e)?Math.min(Mm,Math.max(ym,Math.round(e))):2}function Sm(n){return df[MT(n)]||df[2]}const ST={name:"RenderQualitySlider",props:{label:{type:String,default:"Render Quality"},sliderId:{type:String,required:!0}},data(){return{store:mt,min:ym,max:Mm}},computed:{currentPreset(){return Sm(this.store.settings.quality)}}},ET={class:"form-row"},bT=["for"],wT={class:"slider-value"},TT=["id","min","max"];function AT(n,e,t,i,s,r){return Tt(),It("div",ET,[We("label",{for:t.sliderId,class:"select-label slider-label"},[We("span",null,Mn(t.label),1),We("span",wT,Mn(r.currentPreset.label),1)],8,bT),_h(We("input",{id:t.sliderId,"onUpdate:modelValue":e[0]||(e[0]=o=>s.store.settings.quality=o),class:"quality-slider",type:"range",min:s.min,max:s.max,step:"1"},null,8,TT),[[Pp,s.store.settings.quality,void 0,{number:!0}]]),e[1]||(e[1]=We("div",{class:"quality-scale"},[We("span",null,"Low"),We("span",null,"Balanced"),We("span",null,"High")],-1))])}const Em=vo(ST,[["render",AT]]);class CT{constructor(){this.eventTarget=new EventTarget}fire(e,t=null){const i=new CustomEvent(e,{detail:t});this.eventTarget.dispatchEvent(i)}listen(e,t){if(typeof t!="function")return()=>{};const i=s=>t(s.detail);return this.eventTarget.addEventListener(e,i),()=>{this.eventTarget.removeEventListener(e,i)}}}const Pn=new CT,Dn={rollDice:"game.rollDice",game:{start:"game.start"},turns:{endTurn:"turns.endTurn",repeatTurn:"turns.repeatTurn"}},RT={components:{OutlineAppearanceSelect:xm,RenderQualitySlider:Em},data(){return{store:mt,settingsOpen:!1}},computed:{currentPlayer(){return this.store.players[this.store.currentPlayerId]||null},movablePawns(){return!this.currentPlayer||!this.store.gamePlayStatus.isMoving?[]:this.currentPlayer.pawns.filter(n=>n.isActive)},canRoll(){return this.store.gamePlayStatus.isRolling&&this.isHumanTurn},isHumanTurn(){return!!(this.currentPlayer&&!this.currentPlayer.isComputer)},statusMessage(){return this.currentPlayer?this.isHumanTurn?this.store.gamePlayStatus.isMoving?"Pick a pawn to move.":this.store.gamePlayStatus.isRolling?"Roll the dice!":"":`${this.currentPlayer.name} is thinking…`:"Setting up the board…"}},methods:{rollDice(){Pn.fire(Dn.rollDice)},movePawn(n){n.isActive&&n.move()},goToSetup(){this.settingsOpen=!1,this.store.currentScreen="add-players"},formatPlayerState(n){return n.pawns.map(e=>e.position===0?"H":e.position>40?"G":String(e.globalPosition+1)).join("·")}}},PT={class:"hud"},DT={class:"hud-status nes-container is-dark is-rounded"},IT={class:"hud-player-row"},LT={class:"hud-player-name"},NT={class:"hud-round"},FT={key:0,class:"hud-msg"},UT={key:1,class:"hud-last-roll"},OT={class:"hud-settings-area"},BT=["title"],zT={key:0,class:"hud-settings-panel nes-container is-dark is-rounded"},HT={class:"hud-bottom"},VT={class:"hud-actions"},GT={key:0,class:"hud-move-row"},kT=["onClick"],WT={class:"hud-player-strip"},XT={class:"hud-chip-text"},qT={class:"hud-chip-name"},YT={class:"hud-chip-meta"};function jT(n,e,t,i,s,r){const o=ur("outline-appearance-select"),a=ur("render-quality-slider");return Tt(),It("div",PT,[We("div",DT,[We("div",IT,[We("span",{class:"hud-dot",style:Ds({background:r.currentPlayer?.color||"#888"})},null,4),We("span",LT,Mn(r.currentPlayer?.name||"Waiting…"),1),We("span",NT,"R"+Mn(s.store.currentRound),1)]),r.statusMessage?(Tt(),It("p",FT,Mn(r.statusMessage),1)):Ss("",!0),s.store.lastRolledDice!=="Start"?(Tt(),It("p",UT,[e[3]||(e[3]=Ea(" Rolled: ",-1)),We("strong",null,Mn(s.store.lastRolledDice),1)])):Ss("",!0)]),We("div",OT,[We("button",{class:"nes-btn hud-icon-btn",title:s.settingsOpen?"Close":"Settings",onClick:e[0]||(e[0]=l=>s.settingsOpen=!s.settingsOpen)},Mn(s.settingsOpen?"✕":"⚙"),9,BT),Rt(Rp,{name:"settings-drop"},{default:gh(()=>[s.settingsOpen?(Tt(),It("div",zT,[Rt(o,{label:"Outline Style","select-id":"outline-style-hud"}),Rt(a,{label:"Render Quality","slider-id":"render-quality-hud"}),We("button",{class:"nes-btn is-warning hud-full-width",onClick:e[1]||(e[1]=(...l)=>r.goToSetup&&r.goToSetup(...l))},"New Game")])):Ss("",!0)]),_:1})]),We("div",HT,[We("div",VT,[r.movablePawns.length?(Tt(),It("div",GT,[(Tt(!0),It(_n,null,xa(r.movablePawns,l=>(Tt(),It("button",{key:l.id,class:"nes-btn is-success",onClick:c=>r.movePawn(l)}," Pawn "+Mn(l.startingPlace),9,kT))),128))])):Ss("",!0),r.canRoll?(Tt(),It("button",{key:1,class:"nes-btn is-primary hud-roll-btn",onClick:e[2]||(e[2]=(...l)=>r.rollDice&&r.rollDice(...l))}," Roll Dice ")):Ss("",!0)]),We("div",WT,[(Tt(!0),It(_n,null,xa(s.store.players,l=>(Tt(),It("div",{key:l.turn,class:Ba(["hud-chip nes-container is-dark is-rounded",{"hud-chip--active":l.isPlaying}]),style:Ds(l.isPlaying?{"--chip-color":l.color}:{})},[We("span",{class:"hud-dot hud-dot--sm",style:Ds({background:l.color})},null,4),We("div",XT,[We("span",qT,Mn(l.name),1),We("span",YT,Mn(r.formatPlayerState(l)),1)])],6))),128))])])])}const $T=vo(RT,[["render",jT]]),KT=["#CE0000","#F7D708","#009ECE","#9CCF31"],ZT={components:{GameInterface:$T,OutlineAppearanceSelect:xm,RenderQualitySlider:Em},data(){return{store:mt,playerNames:["","","",""],playerColors:KT}},methods:{switchScreen(n){this.store.currentScreen=n},startGame(){Pn.fire(Dn.game.start,this.playerNames.map(n=>n.trim()))}}},JT={class:"screen-overlay"},QT={key:"main-menu",class:"menu-center"},eA={class:"menu-card nes-container is-dark is-rounded"},tA={key:"add-players",class:"menu-center"},nA={class:"menu-card nes-container is-dark is-rounded"},iA={class:"player-slots"},sA={class:"player-slot-field"},rA=["onUpdate:modelValue","placeholder"],oA={class:"settings-drawer"},aA={class:"settings-body"},lA={class:"menu-row"};function cA(n,e,t,i,s,r){const o=ur("outline-appearance-select"),a=ur("render-quality-slider"),l=ur("game-interface");return Tt(),It("div",JT,[Rt(Rp,{name:"screen-fade",mode:"out-in"},{default:gh(()=>[s.store.currentScreen==="main-menu"?(Tt(),It("div",QT,[We("div",eA,[e[3]||(e[3]=We("h1",{class:"game-title"},[Ea("Burrec Mos"),We("br"),Ea("u Zemero")],-1)),e[4]||(e[4]=We("p",{class:"game-sub"},"Local board game · up to 4 players",-1)),We("button",{class:"nes-btn is-success menu-btn-full",onClick:e[0]||(e[0]=c=>r.switchScreen("add-players"))}," Start Game ")])])):s.store.currentScreen==="add-players"?(Tt(),It("div",tA,[We("div",nA,[e[6]||(e[6]=We("h2",{class:"panel-title"},"Players",-1)),e[7]||(e[7]=We("p",{class:"panel-desc"},"Leave a slot blank to use a computer player.",-1)),We("div",iA,[(Tt(!0),It(_n,null,xa(s.playerNames,(c,h)=>(Tt(),It("div",{key:h,class:"player-slot"},[We("span",{class:"player-dot",style:Ds({background:s.playerColors[h]})},null,4),We("div",sA,[_h(We("input",{"onUpdate:modelValue":d=>s.playerNames[h]=d,type:"text",class:"nes-input is-dark",placeholder:`Player ${h+1}`},null,8,rA),[[Pp,s.playerNames[h]]])])]))),128))]),We("details",oA,[e[5]||(e[5]=We("summary",{class:"settings-summary"},"Graphics",-1)),We("div",aA,[Rt(o,{label:"Outline Style","select-id":"outline-style-menu"}),Rt(a,{label:"Render Quality","slider-id":"render-quality-menu"})])]),We("div",lA,[We("button",{class:"nes-btn",onClick:e[1]||(e[1]=c=>r.switchScreen("main-menu"))},"Back"),We("button",{class:"nes-btn is-success",onClick:e[2]||(e[2]=(...c)=>r.startGame&&r.startGame(...c))},"Play")])])])):Ss("",!0)]),_:1}),s.store.currentScreen==="game-screen"?(Tt(),Sp(l,{key:0})):Ss("",!0)])}const hA=vo(ZT,[["render",cA]]),Da=220;class Qo{constructor(e,t,i=0,s){this.id="id-"+e+s,this.position=0,this.playerIndex=s,this.globalPosition=i,this.startingGlobalPosition=i,this.color=t,this.isActive=!1,this.isInDestinationField=!1,this.isSkipping=!1,this.isSkippingTo=0,this.startingPlace=e,this.isMoving=!1,this.activeMoveTimeout=null}move(){!this.isActive||this.isMoving||(this.lockMoveSelection(),this.isMoving=!0,this.position?this.moveToPosition():this.getOutOfHome())}getOutOfHome(){this.runMoveSequence([{position:1,globalPosition:this.startingGlobalPosition,isInDestinationField:!1}],{captureField:this.startingGlobalPosition})}endOfMove(){this.isMoving=!1,this.activeMoveTimeout=null,mt.lastRolledDice===6?Pn.fire(Dn.turns.repeatTurn):Pn.fire(Dn.turns.endTurn)}moveToPosition(){const e=mt.lastRolledDice,t=[];for(let s=1;s<=e;s+=1){const r=this.position+s,o=r>40;t.push({position:r,globalPosition:o?this.positionToGlobalPosition(40):this.positionToGlobalPosition(r),isInDestinationField:o})}const i=t[t.length-1];this.runMoveSequence(t,{captureField:i.position<=40?i.globalPosition:null})}toGlobalPosition(){return this.positionToGlobalPosition(this.position)}getPosition(e=0){const{x:t,y:i,z:s}=this.getCoordinates(e);return`${t} ${i} ${s}`}getCoordinates(e=0){let t,i,s,r=mt.fields;if(!this.position)t=r.home[this.playerIndex].fields[this.startingPlace-1].x,i=e,s=r.home[this.playerIndex].fields[this.startingPlace-1].z;else if(this.position<=40){const o=this.positionToGlobalPosition(this.position);t=r.path[o].x,i=e,s=r.path[o].z}else this.position>39&&(t=r.target[this.playerIndex].fields[this.position-41].x,i=e,s=r.target[this.playerIndex].fields[this.position-41].z);return{x:t,y:i,z:s}}classes(){return[this.isSkipping?"is-skipping":""]}returnHome(){this.activeMoveTimeout&&(clearTimeout(this.activeMoveTimeout),this.activeMoveTimeout=null),this.isMoving=!1,this.position=0,this.globalPosition=this.startingGlobalPosition,this.isInDestinationField=!1,this.isActive=!1}canLeaveHome(e){let t=!0;return mt.players[mt.playingPlayerIndex].pawns.forEach(function(s){s.position===1&&(t=!1)}),this.position===0&&e===6&&t}pathEnds(e){return this.position+e>=45}targetFieldIsEmpty(e){if(this.position===0)return!1;let t=this.position+e,i=!0;return mt.players[mt.playingPlayerIndex].pawns.forEach(r=>{r!==this&&r.position===t&&(i=!1)}),i}isAvaliable(e){return(this.canLeaveHome(e)||this.targetFieldIsEmpty(e))&&!this.pathEnds(e)}skippingAnimation(e){this.isSkippingTo=e,this.isSkipping=!0,setTimeout((function(){this.isSkipping=!1}).bind(this),100)}removeOpponentPawns(e){mt.players.forEach(function(t){t.isPlaying?t.wonGame()&&alert("congrats:"+t.name+"! You WON!!!"):t.pawns.forEach(function(i){i.globalPosition===e&&!i.isInDestinationField&&i.returnHome()})})}enterDestinationZone(e){this.isInDestinationField=!0,this.position+=e,this.globalPosition=-13*this.startingGlobalPosition,this.endOfMove()}positionToGlobalPosition(e){return e?(this.startingGlobalPosition+e-1)%40:this.startingGlobalPosition}lockMoveSelection(){const e=mt.players[mt.playingPlayerIndex];mt.gamePlayStatus.isMoving=!1,e?.pawns.forEach(t=>{t.isActive=!1})}applyMoveState(e,t){this.position=e.position,this.globalPosition=e.globalPosition,this.isInDestinationField=e.isInDestinationField,this.skippingAnimation(t)}runMoveSequence(e,t={}){const{captureField:i=null}=t;if(!e.length){this.endOfMove();return}const s=r=>{if(this.applyMoveState(e[r],r),r<e.length-1){this.activeMoveTimeout=window.setTimeout(()=>{s(r+1)},Da);return}this.activeMoveTimeout=window.setTimeout(()=>{i!==null&&this.removeOpponentPawns(i),this.endOfMove()},Da)};s(0)}}class uA{constructor(e,t,i,s=!0){this.index=i-1,this.isComputer=s,this.turn=i,this.name=e,this.isPlaying=!1,this.avaliablePawnsIndexes=[],this.color=t,this.pawns=[new Qo(1,t,(i-1)*10,i-1),new Qo(2,t,(i-1)*10,i-1),new Qo(3,t,(i-1)*10,i-1),new Qo(4,t,(i-1)*10,i-1)],this.indicatorIntervals=[],this.stillHome=!0,this.stillHomeCounter=0}startTurn(){mt.gamePlayStatus.isRolling=!0,mt.playingPlayerIndex=this.index,this.isPlaying=!0,this.isComputer&&setTimeout(()=>{Pn.fire(Dn.rollDice)},800)}endTurn(){this.indicatorIntervals.forEach(function(e){clearInterval(e)}),this.indicatorIntervals=[],this.isPlaying=!1,mt.playingPlayerIndex=null,this.pawns.forEach(function(e){e.isActive=!1})}pawnsAvailable(){return this.avaliablePawnsIndexes.length}rollDice(e){mt.lastRolledDice=e,this.setAvaliablePawns(e),this.pawnsAvailable()&&this.indicatorIntervals.push(setInterval(function(){},300)),this.pawnsAvailable()!==0||this.stillHome?this.stillHome&&e!==6?(mt.gamePlayStatus.isRolling=!0,mt.gamePlayStatus.isMoving=!1,this.stillHomeCounter++,this.stillHomeCounter>=3?(mt.gamePlayStatus.isRolling=!1,Pn.fire(Dn.turns.endTurn),this.stillHomeCounter=0):this.isComputer&&setTimeout(()=>{Pn.fire(Dn.rollDice)},1200)):this.stillHome&&e===6&&this.isComputer?(mt.gamePlayStatus.isRolling=!1,mt.gamePlayStatus.isMoving=!0,this.stillHome=!1,this.movePawnAutomatically()):(mt.gamePlayStatus.isRolling=!1,mt.gamePlayStatus.isMoving=!0,this.stillHome=!1,this.movePawnAutomatically()):this.pawnsAvailable()||Pn.fire(Dn.turns.endTurn)}movePawnAutomatically(){if(this.pawnsAvailable()==1||this.isComputer){let e=!1;this.pawns.forEach(function(t){t.isActive&&!e&&(t.move(),e=!0)})}}hasAllPawnsHome(){return this.pawns.every(function(e){return e.position===0})}setAvaliablePawns(e){this.avaliablePawnsIndexes=[],this.pawns.forEach((function(t,i){t.isAvaliable(e)&&(this.avaliablePawnsIndexes.push(i),t.isActive=!0)}).bind(this))}pawnPositions(){let e=[];return this.pawns.forEach(function(t){e.push(t.globalPosition)}),e}wonGame(){let e=[];return this.pawns.forEach((function(t,i){t.isInDestinationField&&e.push(i)}).bind(this)),e.length===4}setComputer(e){this.isComputer=e}}const dA=["#CE0000","#F7D708","#009ECE","#9CCF31"],fA="#1b1411",ar={x:5,z:5},nn=.9,ff=12.6,pf=11.3,ne={center:{x:16.1,y:-1.08,z:4.2},floor:{width:3.35,height:.12,depth:2.9},wallThickness:.18,wallHeight:.86,guardPadding:.42,guardThickness:.42,guardHeight:3.2},Xt={center:{x:ar.x,z:ar.z},topY:-.52,topSize:{width:14.2,height:.7,depth:14.2},floorY:-1.18},pA=[3,4,1,6,2,5],mA={1:new W(0,1,0),2:new W(0,0,1),3:new W(1,0,0),4:new W(-1,0,0),5:new W(0,0,-1),6:new W(0,-1,0)},ea=new W(0,1,0),ta={minimumMotionMs:500,faceUpDotThreshold:.94,recoveryCooldownMs:180,maxRecoveryAttempts:3},bm=.06,wm=.022,pa=bm+.04+wm,gA=bm+.05+wm,_A=pa+.085,vA=.04,xA=.016,yA={name:"AppRoot",components:{StartScreen:hA},watch:{"store.settings.outlineAppearance"(){this.applyOutlineAppearance(),this.hoverNeedsUpdate=!0},"store.settings.quality"(){this.applyRenderQuality(),this.hoverNeedsUpdate=!0}},data(){return{store:mt,camera:null,scene:null,renderer:null,shadowLight:null,controls:null,diceMesh:null,dicePhysicsBody:null,physicsWorld:null,physicsLastTime:null,pendingDiceRoll:null,pawnMeshes:Be({}),pawnHighlights:Be({}),pawnMotionStates:Be({}),diceHighlight:null,sharedGeometries:Be({}),sharedMaterials:Be({}),sharedTextures:Be({}),animationFrameId:null,eventUnsubscribers:[],resizeHandler:null,keydownHandler:null,pointerDownHandler:null,pointerMoveHandler:null,pointerLeaveHandler:null,clickHandler:null,raycaster:null,pointer:null,hoveredTarget:null,pointerDownPosition:null,isDraggingScene:!1,controlsChangeHandler:null,hoverNeedsUpdate:!1,isPointerInsideCanvas:!1}},mounted(){this.addEventListeners(),this.initThreeScene(),this.resizeHandler=()=>this.handleResize(),this.keydownHandler=n=>this.handleKeydown(n),this.pointerDownHandler=n=>this.handlePointerDown(n),this.pointerMoveHandler=n=>this.handlePointerMove(n),this.pointerLeaveHandler=()=>this.clearHoveredTarget(),this.clickHandler=n=>this.handleCanvasClick(n),window.addEventListener("resize",this.resizeHandler),window.addEventListener("keydown",this.keydownHandler),this.$refs.canvas.addEventListener("pointerdown",this.pointerDownHandler),this.$refs.canvas.addEventListener("mousemove",this.pointerMoveHandler),this.$refs.canvas.addEventListener("mouseleave",this.pointerLeaveHandler),this.$refs.canvas.addEventListener("click",this.clickHandler)},beforeUnmount(){this.eventUnsubscribers.forEach(n=>n()),this.resizeHandler&&window.removeEventListener("resize",this.resizeHandler),this.keydownHandler&&window.removeEventListener("keydown",this.keydownHandler),this.$refs.canvas&&this.pointerMoveHandler&&this.$refs.canvas.removeEventListener("mousemove",this.pointerMoveHandler),this.$refs.canvas&&this.pointerDownHandler&&this.$refs.canvas.removeEventListener("pointerdown",this.pointerDownHandler),this.$refs.canvas&&this.pointerLeaveHandler&&this.$refs.canvas.removeEventListener("mouseleave",this.pointerLeaveHandler),this.$refs.canvas&&this.clickHandler&&this.$refs.canvas.removeEventListener("click",this.clickHandler),this.animationFrameId&&cancelAnimationFrame(this.animationFrameId),Object.values(this.pawnMeshes).forEach(n=>this.scene?.remove(n)),this.diceMesh&&this.scene?.remove(this.diceMesh),Object.values(this.pawnHighlights).forEach(n=>this.scene?.remove(n)),this.diceHighlight&&this.scene?.remove(this.diceHighlight),this.dicePhysicsBody=null,this.physicsWorld=null,this.physicsLastTime=null,this.pendingDiceRoll=null,this.shadowLight=null,this.pawnMotionStates=Be({}),this.controls&&this.controlsChangeHandler&&this.controls.removeEventListener("change",this.controlsChangeHandler),this.controls&&this.controls.dispose(),this.renderer&&this.renderer.dispose(),this.disposeSharedResources()},methods:{addEventListeners(){this.eventUnsubscribers=[Pn.listen(Dn.turns.endTurn,this.changePlayersTurn),Pn.listen(Dn.turns.repeatTurn,this.repeatPlayersTurn),Pn.listen(Dn.rollDice,this.rollDice),Pn.listen(Dn.game.start,this.startGame)]},handleKeydown(n){n.code!=="Space"||this.store.currentScreen!=="game-screen"||(n.preventDefault(),this.rollDice())},initThreeScene(){const n=this.$refs.canvas,e=new rv;e.background=this.getSkyGradientTexture();const t=new Sn(45,window.innerWidth/window.innerHeight,.1,1e3);t.position.set(7.2,12.2,16.1),t.lookAt(new W(6.3,0,5));const i=new wE({antialias:!0,canvas:n});i.outputColorSpace=on,i.toneMapping=Sh,i.toneMappingExposure=.98,i.shadowMap.type=Dp,i.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),i.setSize(window.innerWidth,window.innerHeight,!1);const s=Be(new Qw(t,i.domElement));s.enableDamping=!0,s.dampingFactor=.08,s.enablePan=!1,s.minDistance=9,s.maxDistance=24,s.minPolarAngle=Math.PI/5,s.maxPolarAngle=Math.PI/2.15,s.target.set(6.3,.4,5),s.update(),this.scene=Be(e),this.camera=Be(t),this.renderer=Be(i),this.controls=s,this.raycaster=Be(new Pv),this.pointer=Be(new $e),this.controlsChangeHandler=()=>{this.isPointerInsideCanvas&&(this.hoverNeedsUpdate=!0)},s.addEventListener("change",this.controlsChangeHandler),this.createBoard(),this.createLights(),this.createPhysicsWorld(),this.createDice(),this.applyRenderQuality(),this.applyOutlineAppearance(),this.handleResize(),this.renderScene()},createBoard(){this.createCartoonSurroundings(),this.createGroundEnvironment();const n=this.createOutlinedMesh(this.getSharedGeometry("board-base",()=>new qt(ff,.3,ff)),this.createToonMaterial("board-base-material",{color:"#eca95d",roughness:.72,metalness:.03},{outlineThickness:.012,outlineColor:"#5b3115"}),{outlineScale:{x:1.022,y:1.008,z:1.022},receiveShadow:!0});n.position.set(ar.x,-.15,ar.z),this.scene.add(n);const e=this.createOutlinedMesh(this.getSharedGeometry("board-top",()=>new qt(pf,.08,pf)),this.createToonMaterial("board-top-material",{color:"#fff0bf",roughness:.88,metalness:.01},{outlineThickness:.0095,outlineColor:"#735227"}),{outlineScale:{x:1.014,y:1.01,z:1.014},receiveShadow:!0});e.position.set(ar.x,.02,ar.z),this.scene.add(e),this.createDiceTray();const t=this.getSharedGeometry("field-cylinder",()=>new ts(.37,.42,.08,20)),i=this.getSharedGeometry("start-cylinder",()=>new ts(.42,.46,.1,20)),s=this.createOutlinedInstancedSet(t,this.createToonMaterial("path-material",{color:"#fffaf0",roughness:.82,metalness:.01},{outlineThickness:.0068,outlineColor:"#85623c"}),this.store.fields.path.map(r=>({x:r.x,y:pa,z:r.z})),{outlineScale:{x:1.06,y:1.01,z:1.06},receiveShadow:!0});this.scene.add(s),this.store.fields.home.forEach((r,o)=>{const a=this.createToonMaterial(`field-material-${o}`,{color:r.color,roughness:.8,metalness:.02},{outlineThickness:.0072}),l=this.createOutlinedInstancedSet(t,a,[...r.fields.map(d=>({x:d.x,y:pa,z:d.z})),...this.store.fields.target[o].fields.map(d=>({x:d.x,y:pa,z:d.z}))],{outlineScale:{x:1.062,y:1.01,z:1.062},receiveShadow:!0});this.scene.add(l);const c=this.store.fields.path[o*10],h=this.createOutlinedInstancedSet(i,a,[{x:c.x,y:gA,z:c.z}],{outlineScale:{x:1.07,y:1.012,z:1.07},receiveShadow:!0});this.scene.add(h)})},createCartoonSurroundings(){const n=this.createOutlinedMesh(this.getSharedGeometry("meadow-top",()=>new ts(18.4,19.6,.42,48)),this.createToonMaterial("meadow-top-material",{color:"#8cdd68"},{outlineThickness:.012,outlineColor:"#1d3819"}));n.position.set(6.2,-1.58,5),this.scene.add(n);const e=this.createOutlinedMesh(this.getSharedGeometry("meadow-edge",()=>new ts(19.8,21.4,.6,48)),this.createToonMaterial("meadow-edge-material",{color:"#5ba34b"},{outlineThickness:.011,outlineColor:"#163216"}));e.position.set(6.2,-1.9,5),this.scene.add(e);const t=this.getSharedGeometry("surrounding-hill",()=>new ns(1,24,24));[{x:-8.8,y:-.18,z:-9.4,scale:[7.8,2.9,3.4],materialKey:"hill-a",color:"#7dcb6f"},{x:5.4,y:.06,z:-11.8,scale:[8.8,3.6,3.8],materialKey:"hill-b",color:"#8fda7d"},{x:18.4,y:-.2,z:-8.8,scale:[6.8,2.7,3],materialKey:"hill-c",color:"#6fc262"},{x:-9.8,y:-.12,z:18.2,scale:[8.6,3.1,3.6],materialKey:"hill-d",color:"#78c768"},{x:7.8,y:-.08,z:20.6,scale:[10.2,3.7,4.1],materialKey:"hill-e",color:"#89d876"},{x:20.6,y:-.16,z:18.4,scale:[7.4,2.8,3.3],materialKey:"hill-f",color:"#73c05e"}].forEach(a=>{const l=this.createOutlinedMesh(t,this.createToonMaterial(`surrounding-${a.materialKey}`,{color:a.color},{outlineThickness:.0092,outlineColor:"#1f381a"}));l.position.set(a.x,a.y,a.z),l.scale.set(a.scale[0],a.scale[1],a.scale[2]),this.scene.add(l)});const s=this.getSharedGeometry("surrounding-bush",()=>new ns(1,20,20)),r=this.createToonMaterial("surrounding-bush-material",{color:"#4ebf63"},{outlineThickness:.0084,outlineColor:"#173617"});[{x:-2.6,y:-1.04,z:-5.4,scale:[.9,.68,.7]},{x:12.6,y:-1.02,z:-4.8,scale:[1.1,.72,.78]},{x:-1.8,y:-1.02,z:14.9,scale:[1.15,.78,.84]},{x:13.8,y:-1.03,z:15.3,scale:[1.02,.7,.74]},{x:-5.8,y:-1.02,z:5.6,scale:[.96,.7,.72]},{x:18.1,y:-1.02,z:5.2,scale:[1.08,.76,.8]}].forEach(a=>{const l=this.createOutlinedMesh(s,r);l.position.set(a.x,a.y,a.z),l.scale.set(a.scale[0],a.scale[1],a.scale[2]),this.scene.add(l)});const o=this.createOutlinedMesh(this.getSharedGeometry("cartoon-sun",()=>new ns(1,24,24)),this.createToonMaterial("cartoon-sun-material",{color:"#ffd65c"},{outlineThickness:.01,outlineColor:"#8d5a18"}));o.position.set(-7.5,11.6,-17.5),o.scale.set(2.4,2.4,2.4),this.scene.add(o),this.createCloud({x:-9.8,y:9.4,z:-15.6},1.35),this.createCloud({x:3.8,y:11.2,z:-18.4},1.55),this.createCloud({x:18.2,y:10.1,z:-14.8},1.25),this.createCloud({x:15.6,y:8.5,z:-6.4},.96)},createGroundEnvironment(){const n=this.createOutlinedMesh(this.getSharedGeometry("table-top",()=>new qt(Xt.topSize.width,Xt.topSize.height,Xt.topSize.depth)),this.createToonMaterial("table-top-material",{color:"#c98748",roughness:.78,metalness:.04},{outlineThickness:.012,outlineColor:"#392012"}),{receiveShadow:!0});n.position.set(Xt.center.x,Xt.topY,Xt.center.z),this.scene.add(n);const e=this.createOutlinedMesh(this.getSharedGeometry("table-support",()=>new qt(11,.26,11)),this.createToonMaterial("table-support-material",{color:"#8f6037",roughness:.82,metalness:.03},{outlineThickness:.011,outlineColor:"#2a170f"}),{receiveShadow:!0});e.position.set(Xt.center.x,-.96,Xt.center.z),this.scene.add(e);const t=this.createOutlinedMesh(this.getSharedGeometry("table-floor",()=>new qt(26,.08,18.5)),this.createToonMaterial("table-floor-material",{color:"#e9d39d",roughness:.92,metalness:0},{outlineThickness:.01,outlineColor:"#705537"}),{receiveShadow:!0});t.position.set(6.2,-1.18,5),this.scene.add(t)},createLights(){const n=Be(new Av("#f6f0e7",.28)),e=Be(new Ev("#d2e6ff","#97ae72",.62)),t=Be(new md("#fff1db",1.45)),i=Be(new md("#c7dfff",.42)),s=Be(new wv("#ffd6a8",.18,12));t.position.set(-5.5,13.5,6.5),t.target.position.set(5.4,.7,5.1),t.castShadow=!0,t.shadow.mapSize.set(1024,1024),t.shadow.camera.near=1,t.shadow.camera.far=34,t.shadow.camera.left=-10,t.shadow.camera.right=10,t.shadow.camera.top=10,t.shadow.camera.bottom=-10,t.shadow.bias=-18e-5,t.shadow.normalBias=.025,i.position.set(16,7.5,14.5),s.position.set(ne.center.x,2.6,ne.center.z),this.shadowLight=t,this.scene.add(n),this.scene.add(e),this.scene.add(t),this.scene.add(t.target),this.scene.add(i),this.scene.add(s)},createDiceTray(){const n=Be(new Ii),e=this.createToonMaterial("dice-tray-floor-material",{color:"#f8d38c",roughness:.8,metalness:.03},{outlineThickness:.01,outlineColor:"#5a3319"}),t=this.createToonMaterial("dice-tray-wall-material",{color:"#c37d42",roughness:.74,metalness:.04},{outlineThickness:.01,outlineColor:"#4b2a18"}),i=this.createOutlinedMesh(this.getSharedGeometry("dice-tray-floor",()=>new qt(ne.floor.width,ne.floor.height,ne.floor.depth)),e,{outlineScale:{x:1.03,y:1.005,z:1.03},receiveShadow:!0});i.position.set(ne.center.x,ne.center.y,ne.center.z),n.add(i);const s=ne.center.y+ne.floor.height/2+ne.wallHeight/2,r=ne.floor.depth/2+ne.wallThickness/2,o=ne.floor.width/2+ne.wallThickness/2,a=this.createOutlinedMesh(this.getSharedGeometry("dice-tray-wall-z",()=>new qt(ne.floor.width+ne.wallThickness,ne.wallHeight,ne.wallThickness)),t,{outlineScale:1.04,castShadow:!0,receiveShadow:!0});a.position.set(ne.center.x,s,ne.center.z-r),n.add(a);const l=this.createOutlinedMesh(this.getSharedGeometry("dice-tray-wall-z",()=>new qt(ne.floor.width+ne.wallThickness,ne.wallHeight,ne.wallThickness)),t,{outlineScale:1.04,castShadow:!0,receiveShadow:!0});l.position.set(ne.center.x,s,ne.center.z+r),n.add(l);const c=this.createOutlinedMesh(this.getSharedGeometry("dice-tray-wall-x",()=>new qt(ne.wallThickness,ne.wallHeight,ne.floor.depth-ne.wallThickness)),t,{outlineScale:1.04,castShadow:!0,receiveShadow:!0});c.position.set(ne.center.x-o,s,ne.center.z),n.add(c);const h=this.createOutlinedMesh(this.getSharedGeometry("dice-tray-wall-x",()=>new qt(ne.wallThickness,ne.wallHeight,ne.floor.depth-ne.wallThickness)),t,{outlineScale:1.04,castShadow:!0,receiveShadow:!0});h.position.set(ne.center.x+o,s,ne.center.z),n.add(h),this.scene.add(n)},createPhysicsWorld(){const n=Be(new Xw({gravity:new S(0,-18,0)}));n.allowSleep=!0,n.broadphase=new or(n),n.defaultContactMaterial.friction=.24,n.defaultContactMaterial.restitution=.24;const e=new be({mass:0,shape:new mn(new S(ne.floor.width/2,ne.floor.height/2,ne.floor.depth/2)),position:new S(ne.center.x,ne.center.y,ne.center.z)});n.addBody(e);const t=new be({mass:0,shape:new mn(new S(Xt.topSize.width/2,Xt.topSize.height/2,Xt.topSize.depth/2)),position:new S(Xt.center.x,Xt.topY,Xt.center.z)});n.addBody(t);const i=new be({mass:0,shape:new Ab,position:new S(0,Xt.floorY,0)});i.quaternion.setFromEuler(-Math.PI/2,0,0),n.addBody(i);const s=ne.center.y+ne.floor.height/2+ne.wallHeight/2,r=ne.floor.depth/2+ne.wallThickness/2,o=ne.floor.width/2+ne.wallThickness/2;[new be({mass:0,shape:new mn(new S((ne.floor.width+ne.wallThickness)/2,ne.wallHeight/2,ne.wallThickness/2)),position:new S(ne.center.x,s,ne.center.z-r)}),new be({mass:0,shape:new mn(new S((ne.floor.width+ne.wallThickness)/2,ne.wallHeight/2,ne.wallThickness/2)),position:new S(ne.center.x,s,ne.center.z+r)}),new be({mass:0,shape:new mn(new S(ne.wallThickness/2,ne.wallHeight/2,(ne.floor.depth-ne.wallThickness)/2)),position:new S(ne.center.x-o,s,ne.center.z)}),new be({mass:0,shape:new mn(new S(ne.wallThickness/2,ne.wallHeight/2,(ne.floor.depth-ne.wallThickness)/2)),position:new S(ne.center.x+o,s,ne.center.z)})].forEach(u=>n.addBody(u));const l=ne.center.y+ne.guardHeight/2,c=ne.floor.depth/2+ne.guardPadding+ne.guardThickness/2,h=ne.floor.width/2+ne.guardPadding+ne.guardThickness/2;[new be({mass:0,shape:new mn(new S((ne.floor.width+ne.guardPadding*2+ne.guardThickness)/2,ne.guardHeight/2,ne.guardThickness/2)),position:new S(ne.center.x,l,ne.center.z-c)}),new be({mass:0,shape:new mn(new S((ne.floor.width+ne.guardPadding*2+ne.guardThickness)/2,ne.guardHeight/2,ne.guardThickness/2)),position:new S(ne.center.x,l,ne.center.z+c)}),new be({mass:0,shape:new mn(new S(ne.guardThickness/2,ne.guardHeight/2,(ne.floor.depth+ne.guardPadding*2)/2)),position:new S(ne.center.x-h,l,ne.center.z)}),new be({mass:0,shape:new mn(new S(ne.guardThickness/2,ne.guardHeight/2,(ne.floor.depth+ne.guardPadding*2)/2)),position:new S(ne.center.x+h,l,ne.center.z)})].forEach(u=>n.addBody(u)),this.physicsWorld=n,this.physicsLastTime=performance.now()},createDice(){const n=this.createOutlinedMesh(this.getSharedGeometry("dice-box",()=>new qt(nn,nn,nn)),this.createDiceMaterials(),{outlineScale:1.09,castShadow:!0,receiveShadow:!0});n.name="dice",this.diceMesh=Be(n),this.scene.add(n);const e=Be(new be({mass:1,shape:new mn(new S(nn/2,nn/2,nn/2)),allowSleep:!0,sleepSpeedLimit:.16,sleepTimeLimit:.35}));this.physicsWorld?.addBody(e),this.dicePhysicsBody=e,this.resetDiceBody(),this.syncDice(),this.createDiceHighlight()},renderScene(){const n=()=>{this.animationFrameId=requestAnimationFrame(n),this.controls&&this.controls.update(),this.stepPhysicsWorld(),this.syncDice(),this.syncPawns(),this.syncHighlights(),this.hoverNeedsUpdate&&this.refreshHoveredTarget(),this.renderer.render(this.scene,this.camera)};n()},syncDice(){!this.diceMesh||!this.dicePhysicsBody||(this.diceMesh.position.set(this.dicePhysicsBody.position.x,this.dicePhysicsBody.position.y+xA,this.dicePhysicsBody.position.z),this.diceMesh.quaternion.set(this.dicePhysicsBody.quaternion.x,this.dicePhysicsBody.quaternion.y,this.dicePhysicsBody.quaternion.z,this.dicePhysicsBody.quaternion.w))},stepPhysicsWorld(){if(!this.physicsWorld)return;const n=performance.now(),e=Math.min((n-(this.physicsLastTime??n))/1e3,1/20);if(this.physicsLastTime=n,this.physicsWorld.step(1/60,e,4),this.pendingDiceRoll&&this.dicePhysicsBody){const t=this.dicePhysicsBody.sleepState===be.SLEEPING,i=this.dicePhysicsBody.velocity.lengthSquared()<.03&&this.dicePhysicsBody.angularVelocity.lengthSquared()<.03,s=n-this.pendingDiceRoll.startedAt>ta.minimumMotionMs;if(this.dicePhysicsBody.position.y<Xt.floorY-2){this.resetDiceBody(),this.completeDiceRoll(1);return}if(!s||!t&&!i)return;const r=this.getDiceTopFaceData();if(r.dot>=ta.faceUpDotThreshold){this.snapDiceToFaceUp(r),this.completeDiceRoll(r.value);return}if(this.pendingDiceRoll.recoveryAttempts>=ta.maxRecoveryAttempts){this.snapDiceToFaceUp(r),this.completeDiceRoll(r.value);return}n-this.pendingDiceRoll.lastRecoveryAt>=ta.recoveryCooldownMs&&this.recoverTiltedDice(r,n)}},syncPawns(){const n=performance.now();this.store.players.forEach(e=>{e.pawns.forEach(t=>{this.ensurePawnMesh(t);const i=this.pawnMeshes[t.id],s=this.getPawnWorldState(t),r=this.getAnimatedPawnPosition(t,s,n);i.position.set(r.x,r.y,r.z),i.scale.setScalar(t.isActive?1.1:1)})})},getPawnWorldState(n){const e=n.getCoordinates(_A);return{key:`${n.position}:${n.globalPosition}:${n.isInDestinationField?1:0}`,jumpHeight:this.getPawnJumpHeight(n),position:{x:e.x,y:e.y+(n.isActive?vA:0),z:e.z}}},getPawnJumpHeight(n){return n.position===0?.2:n.position>40?.24:.34},cloneWorldPosition(n){return{x:n.x,y:n.y,z:n.z}},getAnimatedPawnPosition(n,e,t){this.pawnMotionStates[n.id]||(this.pawnMotionStates[n.id]=Be({current:this.cloneWorldPosition(e.position),from:this.cloneWorldPosition(e.position),to:this.cloneWorldPosition(e.position),logicalKey:e.key,startTime:t,duration:Da,jumpHeight:e.jumpHeight,isAnimating:!1}));const i=this.pawnMotionStates[n.id];if(i.logicalKey!==e.key&&(i.from=this.cloneWorldPosition(i.current),i.to=this.cloneWorldPosition(e.position),i.logicalKey=e.key,i.startTime=t,i.duration=Da,i.jumpHeight=e.jumpHeight,i.isAnimating=!0),!i.isAnimating)return i.current=this.cloneWorldPosition(e.position),i.current;const s=Math.min((t-i.startTime)/i.duration,1),r={x:i.from.x+(i.to.x-i.from.x)*s,y:i.from.y+(i.to.y-i.from.y)*s+Math.sin(Math.PI*s)*i.jumpHeight,z:i.from.z+(i.to.z-i.from.z)*s};return i.current=r,s>=1&&(i.current=this.cloneWorldPosition(i.to),i.isAnimating=!1),i.current},ensurePawnMesh(n){if(this.pawnMeshes[n.id])return;const e=Be(new Ii),t=this.createToonMaterial(`pawn-body-material-${n.playerIndex}`,{color:n.color},{outlineThickness:.01}),i=this.createToonMaterial(`pawn-head-material-${n.playerIndex}`,{color:n.color},{outlineThickness:.0095}),s=this.createOutlinedMesh(this.getSharedGeometry("pawn-body",()=>new ts(.08,.28,.75,24)),t,{castShadow:!0,receiveShadow:!0});s.position.y=.35,this.attachOutlineShell(s,1.055);const r=this.createOutlinedMesh(this.getSharedGeometry("pawn-head",()=>new ns(.18,24,24)),i,{castShadow:!0,receiveShadow:!0});r.position.y=.85,this.attachOutlineShell(r,1.075),e.name=`cube-${n.id}`,e.add(s),e.add(r),this.pawnMeshes[n.id]=e,this.scene.add(e),this.ensurePawnHighlight(n),this.applyOutlineAppearance()},createOutlinedMesh(n,e,t={}){const i=Be(new Ot(n,e));return i.castShadow=!!t.castShadow,i.receiveShadow=!!t.receiveShadow,t.outlineScale&&this.attachOutlineShell(i,t.outlineScale),i},createOutlinedInstancedSet(n,e,t,i={}){const s=Be(new ld(n,e,t.length));s.castShadow=!!i.castShadow,s.receiveShadow=!!i.receiveShadow;const r=new xt,o=new bn,a=new W(1,1,1);if(t.forEach((l,c)=>{r.compose(new W(l.x,l.y,l.z),o,a),s.setMatrixAt(c,r)}),s.instanceMatrix.needsUpdate=!0,i.outlineScale){const l=Be(new ld(n,this.getOutlineShellMaterial(),t.length));l.userData.isOutlineShell=!0,l.userData.baseOutlineScale=i.outlineScale,l.userData.outlinePositions=t.map(c=>({x:c.x,y:c.y,z:c.z})),l.renderOrder=1,l.castShadow=!1,l.receiveShadow=!1,s.renderOrder=2,this.applyInstancedOutlineMatrices(l,l.userData.outlinePositions,i.outlineScale,1),s.add(l)}return s},createDiceHighlight(){if(this.diceHighlight||!this.scene)return;const n=this.getSharedGeometry("dice-box",()=>new qt(nn,nn,nn)),e=Be(new Ii),t=Be(new Ot(n,this.getHighlightBehindMaterial()));t.renderOrder=49,t.castShadow=!1,t.receiveShadow=!1;const i=Be(new Ot(n,this.getHighlightOutlineMaterial()));i.renderOrder=50,i.castShadow=!1,i.receiveShadow=!1,i.scale.setScalar(1.3),e.add(t),e.add(i),e.userData.ringBehind=t,e.userData.ringOutline=i,e.visible=!1,this.diceHighlight=e,this.scene.add(e)},ensurePawnHighlight(n){if(this.pawnHighlights[n.id]||!this.scene)return;const e=this.getSharedGeometry("pawn-body",()=>new ts(.08,.28,.75,24)),t=this.getSharedGeometry("pawn-head",()=>new ns(.18,24,24)),i=Be(new Ii),s=Be(new Ot(e,this.getHighlightBehindMaterial()));s.position.y=.35,s.renderOrder=49,s.castShadow=!1,s.receiveShadow=!1;const r=Be(new Ot(t,this.getHighlightBehindMaterial()));r.position.y=.85,r.renderOrder=49,r.castShadow=!1,r.receiveShadow=!1;const o=Be(new Ot(e,this.getHighlightOutlineMaterial()));o.position.y=.35,o.renderOrder=50,o.castShadow=!1,o.receiveShadow=!1,o.scale.setScalar(1.22);const a=Be(new Ot(t,this.getHighlightOutlineMaterial()));a.position.y=.85,a.renderOrder=50,a.castShadow=!1,a.receiveShadow=!1,a.scale.setScalar(1.22),i.add(s),i.add(r),i.add(o),i.add(a),i.userData.bodyBehind=s,i.userData.headBehind=r,i.userData.bodyOutline=o,i.userData.headOutline=a,i.visible=!1,this.pawnHighlights[n.id]=i,this.scene.add(i)},getHighlightOutlineMaterial(){return this.getSharedMaterial("highlight-outline",()=>Be(new ws({color:"#ff7700",side:Yt,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1,toneMapped:!1})))},getHighlightOutlineHoverMaterial(){return this.getSharedMaterial("highlight-outline-hover",()=>Be(new ws({color:"#ffaa22",side:Yt,transparent:!0,opacity:.95,depthTest:!0,depthWrite:!1,toneMapped:!1})))},getHighlightBehindMaterial(){return this.getSharedMaterial("highlight-behind",()=>{const n=Be(new ws({color:"#ff7700",side:ci,transparent:!0,opacity:.8,depthTest:!0,depthWrite:!1,toneMapped:!1}));return n.depthFunc=so,n})},getHighlightBehindHoverMaterial(){return this.getSharedMaterial("highlight-behind-hover",()=>{const n=Be(new ws({color:"#ffaa22",side:ci,transparent:!0,opacity:.95,depthTest:!0,depthWrite:!1,toneMapped:!1}));return n.depthFunc=so,n})},syncHighlights(){const n=performance.now(),e=.45+.35*Math.sin(n*.0032),t=this.getHighlightOutlineMaterial(),i=this.getHighlightBehindMaterial();if(t.opacity=e,i.opacity=e,this.diceHighlight&&this.diceMesh)if(this.store.gamePlayStatus.isRolling&&this.isHumanTurn()){const r=this.hoveredTarget==="dice";this.diceHighlight.userData.ringOutline.material=r?this.getHighlightOutlineHoverMaterial():t,this.diceHighlight.userData.ringOutline.scale.setScalar(r?1.36:1.3),this.diceHighlight.userData.ringBehind.material=r?this.getHighlightBehindHoverMaterial():i,this.diceHighlight.visible=!0,this.diceHighlight.position.copy(this.diceMesh.position),this.diceHighlight.quaternion.copy(this.diceMesh.quaternion)}else this.diceHighlight.visible=!1;this.store.players.forEach(s=>{s.pawns.forEach(r=>{const o=this.pawnHighlights[r.id],a=this.pawnMeshes[r.id];if(!o||!a)return;if(this.store.gamePlayStatus.isMoving&&this.isHumanTurn()&&r.isActive){const c=this.hoveredTarget===a.name,h=c?this.getHighlightOutlineHoverMaterial():t,d=c?this.getHighlightBehindHoverMaterial():i,u=c?1.28:1.22;o.visible=!0,o.position.copy(a.position),o.userData.bodyOutline.material=h,o.userData.bodyOutline.scale.setScalar(u),o.userData.headOutline.material=h,o.userData.headOutline.scale.setScalar(u),o.userData.bodyBehind.material=d,o.userData.headBehind.material=d}else o.visible=!1})})},createToonMaterial(n,e){return this.getSharedMaterial(n,()=>{const t=Be(new hd({roughness:.78,metalness:.02,...e}));return this.prepareFillMaterial(t),t})},getOutlineShellMaterial(){return this.getSharedMaterial("outline-shell-material",()=>Be(new ws({color:fA,side:Yt,transparent:!0,opacity:.9,depthWrite:!1,toneMapped:!1})))},getOutlineScaleVector(n,e=1){const t=typeof n=="number"?{x:n,y:n,z:n}:{x:n?.x??1,y:n?.y??1,z:n?.z??1};return new W(1+(t.x-1)*e,1+(t.y-1)*e,1+(t.z-1)*e)},attachOutlineShell(n,e){const t=Be(new Ot(n.geometry,this.getOutlineShellMaterial()));t.userData.isOutlineShell=!0,t.userData.baseOutlineScale=e,t.renderOrder=1,t.castShadow=!1,t.receiveShadow=!1,t.scale.copy(this.getOutlineScaleVector(e,1)),n.renderOrder=2,n.add(t)},applyInstancedOutlineMatrices(n,e,t,i){const s=new xt,r=new bn,o=this.getOutlineScaleVector(t,i);e.forEach((a,l)=>{s.compose(new W(a.x,a.y,a.z),r,o),n.setMatrixAt(l,s)}),n.instanceMatrix.needsUpdate=!0},createDiceMaterials(){return pA.map(n=>this.getSharedMaterial(`dice-face-material-${n}`,()=>{const t=Be(new hd({color:"#ffffff",map:this.getDiceFaceTexture(n),roughness:.5,metalness:.01}));return this.prepareFillMaterial(t),t}))},getDiceFaceTexture(n){return this.getSharedTexture(`dice-face-texture-${n}`,()=>{const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d");t.fillStyle="#fff8e8",t.fillRect(0,0,e.width,e.height),t.strokeStyle="#e0d2b2",t.lineWidth=12,t.strokeRect(18,18,e.width-36,e.height-36),t.fillStyle="#231a15";const i=22,s={center:[128,128],topLeft:[72,72],topRight:[184,72],middleLeft:[72,128],middleRight:[184,128],bottomLeft:[72,184],bottomRight:[184,184]};({1:["center"],2:["topLeft","bottomRight"],3:["topLeft","center","bottomRight"],4:["topLeft","topRight","bottomLeft","bottomRight"],5:["topLeft","topRight","center","bottomLeft","bottomRight"],6:["topLeft","topRight","middleLeft","middleRight","bottomLeft","bottomRight"]})[n].forEach(a=>{const[l,c]=s[a];t.beginPath(),t.arc(l,c,i,0,Math.PI*2),t.fill()});const o=Be(new cd(e));return o.colorSpace=on,o.needsUpdate=!0,o})},getToonGradientMap(){return this.getSharedTexture("toon-gradient-map",()=>{const n=new Uint8Array([0,84,152,208,255]),e=Be(new Nh(n,n.length,1,ja));return e.minFilter=Bt,e.magFilter=Bt,e.generateMipmaps=!1,e.needsUpdate=!0,e})},getSkyGradientTexture(){return this.getSharedTexture("sky-gradient-texture",()=>{const n=document.createElement("canvas");n.width=64,n.height=512;const e=n.getContext("2d"),t=e.createLinearGradient(0,0,0,n.height);t.addColorStop(0,"#85d8ff"),t.addColorStop(.48,"#c2ecff"),t.addColorStop(.75,"#f9efc8"),t.addColorStop(1,"#ffd4a8"),e.fillStyle=t,e.fillRect(0,0,n.width,n.height),e.fillStyle="rgba(255, 255, 255, 0.14)",e.fillRect(0,n.height*.56,n.width,n.height*.06),e.fillStyle="rgba(255, 226, 177, 0.16)",e.fillRect(0,n.height*.76,n.width,n.height*.08);const i=Be(new cd(n));return i.colorSpace=on,i.needsUpdate=!0,i})},createCloud(n,e=1){const t=Be(new Ii),i=this.getSharedGeometry("cartoon-cloud-puff",()=>new ns(1,20,20)),s=this.createToonMaterial("cartoon-cloud-material",{color:"#ffffff"},{outlineThickness:.0082,outlineColor:"#68818f",outlineAlpha:.9});[{x:-1.35,y:0,z:.15,scale:[1.1,.82,.92]},{x:-.35,y:.3,z:0,scale:[1.28,.96,1.02]},{x:.7,y:.2,z:-.08,scale:[1.15,.88,.95]},{x:1.55,y:-.02,z:.1,scale:[.92,.7,.8]}].forEach(r=>{const o=this.createOutlinedMesh(i,s);o.position.set(r.x,r.y,r.z),o.scale.set(r.scale[0],r.scale[1],r.scale[2]),t.add(o)}),t.position.set(n.x,n.y,n.z),t.scale.setScalar(e),this.scene.add(t)},applyOutlineAppearance(){const n=fT(this.store.settings.outlineAppearance),e=this.getOutlineShellMaterial();e.opacity=n.visible?n.lineOpacity:0,e.transparent=!0,e.needsUpdate=!0,this.scene?.traverse(t=>{if(t.userData?.isOutlineShell){if(t.visible=n.visible,t.isInstancedMesh){this.applyInstancedOutlineMatrices(t,t.userData.outlinePositions||[],t.userData.baseOutlineScale||1.02,n.lineScale);return}t.scale.copy(this.getOutlineScaleVector(t.userData.baseOutlineScale||1.02,n.lineScale))}})},applyRenderQuality(){if(!this.renderer)return;const n=Sm(this.store.settings.quality),e=window.devicePixelRatio||1,t=Math.min(e*n.pixelRatioScale,n.maxPixelRatio);if(this.renderer.setPixelRatio(t),this.renderer.shadowMap.enabled=n.shadowsEnabled,this.shadowLight){if(this.shadowLight.castShadow=n.shadowsEnabled,n.shadowsEnabled&&n.shadowMapSize){const i=this.shadowLight.shadow.mapSize.width,s=this.shadowLight.shadow.mapSize.height;(i!==n.shadowMapSize||s!==n.shadowMapSize)&&(this.shadowLight.shadow.map?.dispose?.(),this.shadowLight.shadow.map=null,this.shadowLight.shadow.mapSize.set(n.shadowMapSize,n.shadowMapSize))}this.shadowLight.shadow.needsUpdate=!0}this.renderer.setSize(window.innerWidth,window.innerHeight,!1)},prepareFillMaterial(n){!n||n.polygonOffset||(n.polygonOffset=!0,n.polygonOffsetFactor=1,n.polygonOffsetUnits=2,n.needsUpdate=!0)},getSharedGeometry(n,e){return this.sharedGeometries[n]||(this.sharedGeometries[n]=Be(e())),this.sharedGeometries[n]},getSharedTexture(n,e){return this.sharedTextures[n]||(this.sharedTextures[n]=Be(e())),this.sharedTextures[n]},getSharedMaterial(n,e){return this.sharedMaterials[n]||(this.sharedMaterials[n]=Be(e())),this.sharedMaterials[n]},disposeSharedResources(){Object.values(this.sharedGeometries).forEach(n=>n.dispose?.()),Object.values(this.sharedTextures).forEach(n=>n.dispose?.()),Object.values(this.sharedMaterials).forEach(n=>n.dispose?.()),this.sharedGeometries=Be({}),this.sharedTextures=Be({}),this.sharedMaterials=Be({})},handleResize(){if(!this.camera||!this.renderer)return;const n=window.innerWidth,e=window.innerHeight;this.camera.aspect=n/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(n,e,!1),this.hoverNeedsUpdate=!0},isHumanTurn(){const n=this.store.players[this.store.currentPlayerId];return!!(n&&!n.isComputer)},setPointerFromEvent(n){if(!this.pointer||!this.$refs.canvas)return!1;const e=this.$refs.canvas.getBoundingClientRect();return this.pointer.x=(n.clientX-e.left)/e.width*2-1,this.pointer.y=-((n.clientY-e.top)/e.height)*2+1,!0},handlePointerDown(n){this.pointerDownPosition={x:n.clientX,y:n.clientY},this.isPointerInsideCanvas=!0,this.isDraggingScene=!1,this.setPointerFromEvent(n),this.hoverNeedsUpdate=!0},getInteractiveHit(){if(!this.raycaster||!this.camera)return null;const n=[];if(this.diceMesh&&this.store.gamePlayStatus.isRolling&&this.isHumanTurn()&&n.push(this.diceMesh),this.store.gamePlayStatus.isMoving&&this.isHumanTurn()&&Object.values(this.pawnMeshes).forEach(s=>{this.findPawnByMeshName(s.name)?.isActive&&n.push(s)}),!n.length)return null;this.raycaster.setFromCamera(this.pointer,this.camera);const e=this.raycaster.intersectObjects(n,!0);if(!e.length)return null;let i=e[0].object;for(;i;){if(i.name==="dice"||i.name.startsWith("cube-"))return i.name;i=i.parent}return null},refreshHoveredTarget(){if(!this.pointer){this.hoverNeedsUpdate=!1;return}const n=this.getInteractiveHit();if(this.hoveredTarget===n){this.hoverNeedsUpdate=!1;return}this.hoveredTarget=n,this.$refs.canvas&&(this.$refs.canvas.style.cursor=this.hoveredTarget?"pointer":"default"),this.hoverNeedsUpdate=!1},clearHoveredTarget(){this.hoveredTarget=null,this.pointerDownPosition=null,this.isDraggingScene=!1,this.isPointerInsideCanvas=!1,this.hoverNeedsUpdate=!1,this.$refs.canvas&&(this.$refs.canvas.style.cursor="default")},handlePointerMove(n){if(this.pointerDownPosition){const e=n.clientX-this.pointerDownPosition.x,t=n.clientY-this.pointerDownPosition.y;e*e+t*t>25&&(this.isDraggingScene=!0)}this.setPointerFromEvent(n)&&(this.isPointerInsideCanvas=!0,this.hoverNeedsUpdate=!0)},handleCanvasClick(n){if(this.isDraggingScene){this.isDraggingScene=!1,this.pointerDownPosition=null;return}if(this.pointerDownPosition=null,!this.setPointerFromEvent(n))return;const e=this.getInteractiveHit();if(!e)return;if(e==="dice"){this.rollDice(),this.hoverNeedsUpdate=!0;return}const t=this.findPawnByMeshName(e);t?.isActive&&(t.move(),this.hoverNeedsUpdate=!0)},findPawnByMeshName(n){const e=n.replace(/^cube-/,"");return this.store.players.flatMap(t=>t.pawns).find(t=>t.id===e)||null},resetGameState(){this.store.players.splice(0,this.store.players.length),this.store.currentPlayerId=-1,this.store.currentRound=0,this.store.playingPlayerIndex=null,this.store.lastRolledDice="Start",this.store.gamePlayStatus.isRolling=!1,this.store.gamePlayStatus.isMoving=!1,Object.values(this.pawnMeshes).forEach(n=>{this.scene.remove(n)}),Object.values(this.pawnHighlights).forEach(n=>{this.scene.remove(n)}),this.pawnMeshes=Be({}),this.pawnHighlights=Be({}),this.pawnMotionStates=Be({}),this.pendingDiceRoll=null,this.freezeDiceBody(),this.syncDice(),this.clearHoveredTarget()},createPlayers(n){n.forEach((e,t)=>{this.store.players.push(new uA(e||"Computer",dA[t],t+1,!e))})},startGame(n){const e=Array.isArray(n)?n.slice(0,4):[];for(;e.length<4;)e.push("");this.resetGameState(),this.createPlayers(e),this.store.currentRound=1,this.store.currentScreen="game-screen",this.changePlayersTurn(),this.hoverNeedsUpdate=!0},changePlayersTurn(){if(!this.store.players.length)return;mt.gamePlayStatus.isMoving=!1;const n=this.store.players[this.store.currentPlayerId];n&&n.endTurn(),this.store.currentPlayerId===this.store.players.length-1?(this.store.currentPlayerId=0,this.store.currentRound+=1):this.store.currentPlayerId+=1,this.store.players[this.store.currentPlayerId].startTurn(),this.hoverNeedsUpdate=!0},repeatPlayersTurn(){const n=this.store.players[this.store.currentPlayerId];n&&(mt.gamePlayStatus.isMoving=!1,n.endTurn(),n.startTurn(),this.hoverNeedsUpdate=!0)},resetDiceBody(){this.dicePhysicsBody&&(this.clearDiceBodyMotion(),this.dicePhysicsBody.position.set(ne.center.x,ne.center.y+ne.floor.height/2+nn/2,ne.center.z),this.dicePhysicsBody.quaternion.set(0,0,0,1),this.dicePhysicsBody.sleep())},getDiceTrayRestY(){return ne.center.y+ne.floor.height/2+nn/2},getDiceTrayBounds(){return{minX:ne.center.x-(ne.floor.width/2-nn*.56),maxX:ne.center.x+(ne.floor.width/2-nn*.56),minZ:ne.center.z-(ne.floor.depth/2-nn*.56),maxZ:ne.center.z+(ne.floor.depth/2-nn*.56)}},clearDiceBodyMotion(){this.dicePhysicsBody&&(this.dicePhysicsBody.velocity.setZero(),this.dicePhysicsBody.angularVelocity.setZero(),this.dicePhysicsBody.force.setZero(),this.dicePhysicsBody.torque.setZero())},freezeDiceBody(){this.dicePhysicsBody&&(this.clearDiceBodyMotion(),this.dicePhysicsBody.sleep())},startDiceRoll(){if(!this.dicePhysicsBody)return;const n=this.dicePhysicsBody,e=this.getDiceTrayBounds(),t=this.getDiceTrayRestY();(!Number.isFinite(n.position.x)||!Number.isFinite(n.position.y)||!Number.isFinite(n.position.z)||n.position.y<Xt.floorY-1.5)&&this.resetDiceBody(),n.wakeUp(),this.clearDiceBodyMotion(),n.position.set(Math.min(Math.max(n.position.x,e.minX),e.maxX),Math.max(n.position.y+.08,t+.06),Math.min(Math.max(n.position.z,e.minZ),e.maxZ));const i=new S(Math.random()-.5,Math.random()-.5,Math.random()-.5);i.normalize(),n.quaternion.setFromAxisAngle(i,Math.random()*Math.PI*2);const s=(ne.center.x-n.position.x)*1.25,r=(ne.center.z-n.position.z)*1.25,o=s+(Math.random()-.5)*3.4,a=r+(Math.random()-.5)*3.1;n.angularVelocity.set((Math.random()-.5)*30,(Math.random()-.5)*10,(Math.random()-.5)*30),n.applyImpulse(new S(o,5.1+Math.random()*.95,a),new S((Math.random()-.5)*.52,0,(Math.random()-.5)*.52)),this.pendingDiceRoll={startedAt:performance.now(),lastRecoveryAt:0,recoveryAttempts:0}},completeDiceRoll(n=this.getDiceResultFromBody()){this.pendingDiceRoll&&(this.pendingDiceRoll=null,this.store.lastRolledDice=n,this.hoverNeedsUpdate=!0,this.store.players[this.store.currentPlayerId]?.rollDice(n))},getDiceTopFaceData(){if(!this.dicePhysicsBody)return{value:1,dot:1,worldNormal:ea.clone(),quaternion:new bn};const n=new bn(this.dicePhysicsBody.quaternion.x,this.dicePhysicsBody.quaternion.y,this.dicePhysicsBody.quaternion.z,this.dicePhysicsBody.quaternion.w);let e=1,t=-1/0,i=ea.clone();return Object.entries(mA).forEach(([s,r])=>{const o=r.clone().applyQuaternion(n),a=o.dot(ea);a>t&&(t=a,e=Number(s),i=o)}),{value:e,dot:t,worldNormal:i,quaternion:n}},getDiceResultFromBody(){return this.getDiceTopFaceData().value},snapDiceToFaceUp(n=this.getDiceTopFaceData()){if(!this.dicePhysicsBody)return;const e=this.dicePhysicsBody,t=this.getDiceTrayBounds(),i=new bn().setFromUnitVectors(n.worldNormal.clone().normalize(),ea).multiply(n.quaternion.clone()).normalize();this.clearDiceBodyMotion(),e.position.set(Math.min(Math.max(e.position.x,t.minX),t.maxX),this.getDiceTrayRestY(),Math.min(Math.max(e.position.z,t.minZ),t.maxZ)),e.quaternion.set(i.x,i.y,i.z,i.w),e.sleep()},recoverTiltedDice(n,e){if(!this.dicePhysicsBody||!this.pendingDiceRoll)return;const t=this.dicePhysicsBody,i=this.getDiceTrayBounds(),s=n.worldNormal.clone();if(s.y=0,s.lengthSq()<1e-4){const o=Math.random()*Math.PI*2;s.set(Math.cos(o),0,Math.sin(o))}else s.normalize();t.wakeUp(),this.clearDiceBodyMotion(),t.position.set(Math.min(Math.max(t.position.x,i.minX),i.maxX),Math.max(t.position.y,this.getDiceTrayRestY()+.04),Math.min(Math.max(t.position.z,i.minZ),i.maxZ));const r=.22+Math.random()*.16;t.applyImpulse(new S(s.x*r,.42+Math.random()*.12,s.z*r),new S((Math.random()-.5)*.18,0,(Math.random()-.5)*.18)),t.angularVelocity.set((Math.random()-.5)*3.2+s.z*2.8,1.8+Math.random()*1.4,(Math.random()-.5)*3.2-s.x*2.8),this.pendingDiceRoll.startedAt=e,this.pendingDiceRoll.lastRecoveryAt=e,this.pendingDiceRoll.recoveryAttempts+=1},rollDice(n){!this.store.gamePlayStatus.isRolling||this.store.currentPlayerId<0||this.pendingDiceRoll||(this.store.gamePlayStatus.isRolling=!1,this.hoverNeedsUpdate=!0,this.startDiceRoll())}}},MA={class:"app-shell"},SA={ref:"canvas",class:"board-canvas"};function EA(n,e,t,i,s,r){const o=ur("start-screen");return Tt(),It("main",MA,[We("canvas",SA,null,512),Rt(o),e[0]||(e[0]=v0('<div class="mobile-block-overlay"><div class="mobile-block-panel"><p class="mobile-block-icon">🖥️</p><p class="mobile-block-title">Desktop Only</p><p class="mobile-block-message">This game is only playable on desktop. Please open it on a computer to play.</p></div></div>',1))])}const bA=vo(yA,[["render",EA]]);o_(bA).mount("#app");
