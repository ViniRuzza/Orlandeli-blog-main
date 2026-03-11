import{r as c,j as t,d2 as I,gN as be,gO as je,gP as Ze,af as qe,gQ as Qe,gR as Ye,gS as Xe,gT as Je,gU as et,gV as tt,gW as le,u as ot,a as P,R as F,I as w,U as V,i as h,gg as te,o as W,dB as H,gX as v,dc as nt,T as R,d9 as rt,da as st,c as oe,eD as Y,bI as Ce,eF as at,eH as it,eC as lt,eE as ct,eG as ye,gY as ut,gZ as dt,L as q,gu as ft,gv as pt,dG as gt,g_ as mt,ag as ht,fK as xt,g$ as vt,p as ce,P as ue,M as bt,O as jt}from"./strapi-CIj5qZNZ.js";function ne(e,o=[]){let n=[];function s(i,a){const l=c.createContext(a),d=n.length;n=[...n,a];const p=f=>{const{scope:b,children:C,...y}=f,m=b?.[e]?.[d]||l,g=c.useMemo(()=>y,Object.values(y));return t.jsx(m.Provider,{value:g,children:C})};p.displayName=i+"Provider";function u(f,b){const C=b?.[e]?.[d]||l,y=c.useContext(C);if(y)return y;if(a!==void 0)return a;throw new Error(`\`${f}\` must be used within \`${i}\``)}return[p,u]}const r=()=>{const i=n.map(a=>c.createContext(a));return function(l){const d=l?.[e]||i;return c.useMemo(()=>({[`__scope${e}`]:{...l,[e]:d}}),[l,d])}};return r.scopeName=e,[s,Ct(r,...o)]}function Ct(...e){const o=e[0];if(e.length===1)return o;const n=()=>{const s=e.map(r=>({useScope:r(),scopeName:r.scopeName}));return function(i){const a=s.reduce((l,{useScope:d,scopeName:p})=>{const f=d(i)[`__scope${p}`];return{...l,...f}},{});return c.useMemo(()=>({[`__scope${o.scopeName}`]:a}),[a])}};return n.scopeName=o.scopeName,n}function de(e,o){if(typeof e=="function")return e(o);e!=null&&(e.current=o)}function Ie(...e){return o=>{let n=!1;const s=e.map(r=>{const i=de(r,o);return!n&&typeof i=="function"&&(n=!0),i});if(n)return()=>{for(let r=0;r<s.length;r++){const i=s[r];typeof i=="function"?i():de(e[r],null)}}}}function X(...e){return c.useCallback(Ie(...e),e)}function J(e){const o=yt(e),n=c.forwardRef((s,r)=>{const{children:i,...a}=s,l=c.Children.toArray(i),d=l.find(wt);if(d){const p=d.props.children,u=l.map(f=>f===d?c.Children.count(p)>1?c.Children.only(null):c.isValidElement(p)?p.props.children:null:f);return t.jsx(o,{...a,ref:r,children:c.isValidElement(p)?c.cloneElement(p,void 0,u):null})}return t.jsx(o,{...a,ref:r,children:i})});return n.displayName=`${e}.Slot`,n}function yt(e){const o=c.forwardRef((n,s)=>{const{children:r,...i}=n;if(c.isValidElement(r)){const a=St(r),l=Rt(i,r.props);return r.type!==c.Fragment&&(l.ref=s?Ie(s,a):a),c.cloneElement(r,l)}return c.Children.count(r)>1?c.Children.only(null):null});return o.displayName=`${e}.SlotClone`,o}var It=Symbol("radix.slottable");function wt(e){return c.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===It}function Rt(e,o){const n={...o};for(const s in o){const r=e[s],i=o[s];/^on[A-Z]/.test(s)?r&&i?n[s]=(...l)=>{const d=i(...l);return r(...l),d}:r&&(n[s]=r):s==="style"?n[s]={...r,...i}:s==="className"&&(n[s]=[r,i].filter(Boolean).join(" "))}return{...e,...n}}function St(e){let o=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=o&&"isReactWarning"in o&&o.isReactWarning;return n?e.ref:(o=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=o&&"isReactWarning"in o&&o.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Tt=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],L=Tt.reduce((e,o)=>{const n=J(`Primitive.${o}`),s=c.forwardRef((r,i)=>{const{asChild:a,...l}=r,d=a?n:o;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),t.jsx(d,{...l,ref:i})});return s.displayName=`Primitive.${o}`,{...e,[o]:s}},{});function D(e,o,{checkForDefaultPrevented:n=!0}={}){return function(r){if(e?.(r),n===!1||!r.defaultPrevented)return o?.(r)}}function Et(e){const o=e+"CollectionProvider",[n,s]=ne(o),[r,i]=n(o,{collectionRef:{current:null},itemMap:new Map}),a=m=>{const{scope:g,children:j}=m,T=I.useRef(null),x=I.useRef(new Map).current;return t.jsx(r,{scope:g,itemMap:x,collectionRef:T,children:j})};a.displayName=o;const l=e+"CollectionSlot",d=J(l),p=I.forwardRef((m,g)=>{const{scope:j,children:T}=m,x=i(l,j),S=X(g,x.collectionRef);return t.jsx(d,{ref:S,children:T})});p.displayName=l;const u=e+"CollectionItemSlot",f="data-radix-collection-item",b=J(u),C=I.forwardRef((m,g)=>{const{scope:j,children:T,...x}=m,S=I.useRef(null),_=X(g,S),G=i(u,j);return I.useEffect(()=>(G.itemMap.set(S,{ref:S,...x}),()=>void G.itemMap.delete(S))),t.jsx(b,{[f]:"",ref:_,children:T})});C.displayName=u;function y(m){const g=i(e+"CollectionConsumer",m);return I.useCallback(()=>{const T=g.collectionRef.current;if(!T)return[];const x=Array.from(T.querySelectorAll(`[${f}]`));return Array.from(g.itemMap.values()).sort((G,O)=>x.indexOf(G.ref.current)-x.indexOf(O.ref.current))},[g.collectionRef,g.itemMap])}return[{Provider:a,Slot:p,ItemSlot:C},y,s]}var we=globalThis?.document?c.useLayoutEffect:()=>{},Mt=be[" useId ".trim().toString()]||(()=>{}),Ft=0;function Pt(e){const[o,n]=c.useState(Mt());return we(()=>{n(s=>s??String(Ft++))},[e]),o?`radix-${o}`:""}function $t(e){const o=c.useRef(e);return c.useEffect(()=>{o.current=e}),c.useMemo(()=>(...n)=>o.current?.(...n),[])}var At=be[" useInsertionEffect ".trim().toString()]||we;function K({prop:e,defaultProp:o,onChange:n=()=>{},caller:s}){const[r,i,a]=Dt({defaultProp:o,onChange:n}),l=e!==void 0,d=l?e:r;{const u=c.useRef(e!==void 0);c.useEffect(()=>{const f=u.current;f!==l&&console.warn(`${s} is changing from ${f?"controlled":"uncontrolled"} to ${l?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),u.current=l},[l,s])}const p=c.useCallback(u=>{if(l){const f=_t(u)?u(e):u;f!==e&&a.current?.(f)}else i(u)},[l,e,i,a]);return[d,p]}function Dt({defaultProp:e,onChange:o}){const[n,s]=c.useState(e),r=c.useRef(n),i=c.useRef(o);return At(()=>{i.current=o},[o]),c.useEffect(()=>{r.current!==n&&(i.current?.(n),r.current=n)},[n,r]),[n,s,i]}function _t(e){return typeof e=="function"}var Gt=c.createContext(void 0);function Re(e){const o=c.useContext(Gt);return e||o||"ltr"}var Q="rovingFocusGroup.onEntryFocus",Nt={bubbles:!1,cancelable:!0},k="RovingFocusGroup",[ee,Se,Lt]=Et(k),[kt,Te]=ne(k,[Lt]),[Ot,Vt]=kt(k),Ee=c.forwardRef((e,o)=>t.jsx(ee.Provider,{scope:e.__scopeRovingFocusGroup,children:t.jsx(ee.Slot,{scope:e.__scopeRovingFocusGroup,children:t.jsx(Ut,{...e,ref:o})})}));Ee.displayName=k;var Ut=c.forwardRef((e,o)=>{const{__scopeRovingFocusGroup:n,orientation:s,loop:r=!1,dir:i,currentTabStopId:a,defaultCurrentTabStopId:l,onCurrentTabStopIdChange:d,onEntryFocus:p,preventScrollOnEntryFocus:u=!1,...f}=e,b=c.useRef(null),C=X(o,b),y=Re(i),[m,g]=K({prop:a,defaultProp:l??null,onChange:d,caller:k}),[j,T]=c.useState(!1),x=$t(p),S=Se(n),_=c.useRef(!1),[G,O]=c.useState(0);return c.useEffect(()=>{const E=b.current;if(E)return E.addEventListener(Q,x),()=>E.removeEventListener(Q,x)},[x]),t.jsx(Ot,{scope:n,orientation:s,dir:y,loop:r,currentTabStopId:m,onItemFocus:c.useCallback(E=>g(E),[g]),onItemShiftTab:c.useCallback(()=>T(!0),[]),onFocusableItemAdd:c.useCallback(()=>O(E=>E+1),[]),onFocusableItemRemove:c.useCallback(()=>O(E=>E-1),[]),children:t.jsx(L.div,{tabIndex:j||G===0?-1:0,"data-orientation":s,...f,ref:C,style:{outline:"none",...e.style},onMouseDown:D(e.onMouseDown,()=>{_.current=!0}),onFocus:D(e.onFocus,E=>{const ze=!_.current;if(E.target===E.currentTarget&&ze&&!j){const ie=new CustomEvent(Q,Nt);if(E.currentTarget.dispatchEvent(ie),!ie.defaultPrevented){const Z=S().filter(A=>A.focusable),We=Z.find(A=>A.active),He=Z.find(A=>A.id===m),Ke=[We,He,...Z].filter(Boolean).map(A=>A.ref.current);Pe(Ke,u)}}_.current=!1}),onBlur:D(e.onBlur,()=>T(!1))})})}),Me="RovingFocusGroupItem",Fe=c.forwardRef((e,o)=>{const{__scopeRovingFocusGroup:n,focusable:s=!0,active:r=!1,tabStopId:i,children:a,...l}=e,d=Pt(),p=i||d,u=Vt(Me,n),f=u.currentTabStopId===p,b=Se(n),{onFocusableItemAdd:C,onFocusableItemRemove:y,currentTabStopId:m}=u;return c.useEffect(()=>{if(s)return C(),()=>y()},[s,C,y]),t.jsx(ee.ItemSlot,{scope:n,id:p,focusable:s,active:r,children:t.jsx(L.span,{tabIndex:f?0:-1,"data-orientation":u.orientation,...l,ref:o,onMouseDown:D(e.onMouseDown,g=>{s?u.onItemFocus(p):g.preventDefault()}),onFocus:D(e.onFocus,()=>u.onItemFocus(p)),onKeyDown:D(e.onKeyDown,g=>{if(g.key==="Tab"&&g.shiftKey){u.onItemShiftTab();return}if(g.target!==g.currentTarget)return;const j=Wt(g,u.orientation,u.dir);if(j!==void 0){if(g.metaKey||g.ctrlKey||g.altKey||g.shiftKey)return;g.preventDefault();let x=b().filter(S=>S.focusable).map(S=>S.ref.current);if(j==="last")x.reverse();else if(j==="prev"||j==="next"){j==="prev"&&x.reverse();const S=x.indexOf(g.currentTarget);x=u.loop?Ht(x,S+1):x.slice(S+1)}setTimeout(()=>Pe(x))}}),children:typeof a=="function"?a({isCurrentTabStop:f,hasTabStop:m!=null}):a})})});Fe.displayName=Me;var Bt={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function zt(e,o){return o!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function Wt(e,o,n){const s=zt(e.key,n);if(!(o==="vertical"&&["ArrowLeft","ArrowRight"].includes(s))&&!(o==="horizontal"&&["ArrowUp","ArrowDown"].includes(s)))return Bt[s]}function Pe(e,o=!1){const n=document.activeElement;for(const s of e)if(s===n||(s.focus({preventScroll:o}),document.activeElement!==n))return}function Ht(e,o){return e.map((n,s)=>e[(o+s)%e.length])}var Kt=Ee,Zt=Fe,$e="Toggle",Ae=c.forwardRef((e,o)=>{const{pressed:n,defaultPressed:s,onPressedChange:r,...i}=e,[a,l]=K({prop:n,onChange:r,defaultProp:s??!1,caller:$e});return t.jsx(L.button,{type:"button","aria-pressed":a,"data-state":a?"on":"off","data-disabled":e.disabled?"":void 0,...i,ref:o,onClick:D(e.onClick,()=>{e.disabled||l(!a)})})});Ae.displayName=$e;var $="ToggleGroup",[De]=ne($,[Te]),_e=Te(),re=I.forwardRef((e,o)=>{const{type:n,...s}=e;if(n==="single"){const r=s;return t.jsx(qt,{...r,ref:o})}if(n==="multiple"){const r=s;return t.jsx(Qt,{...r,ref:o})}throw new Error(`Missing prop \`type\` expected on \`${$}\``)});re.displayName=$;var[Ge,Ne]=De($),qt=I.forwardRef((e,o)=>{const{value:n,defaultValue:s,onValueChange:r=()=>{},...i}=e,[a,l]=K({prop:n,defaultProp:s??"",onChange:r,caller:$});return t.jsx(Ge,{scope:e.__scopeToggleGroup,type:"single",value:I.useMemo(()=>a?[a]:[],[a]),onItemActivate:l,onItemDeactivate:I.useCallback(()=>l(""),[l]),children:t.jsx(Le,{...i,ref:o})})}),Qt=I.forwardRef((e,o)=>{const{value:n,defaultValue:s,onValueChange:r=()=>{},...i}=e,[a,l]=K({prop:n,defaultProp:s??[],onChange:r,caller:$}),d=I.useCallback(u=>l((f=[])=>[...f,u]),[l]),p=I.useCallback(u=>l((f=[])=>f.filter(b=>b!==u)),[l]);return t.jsx(Ge,{scope:e.__scopeToggleGroup,type:"multiple",value:a,onItemActivate:d,onItemDeactivate:p,children:t.jsx(Le,{...i,ref:o})})});re.displayName=$;var[Yt,Xt]=De($),Le=I.forwardRef((e,o)=>{const{__scopeToggleGroup:n,disabled:s=!1,rovingFocus:r=!0,orientation:i,dir:a,loop:l=!0,...d}=e,p=_e(n),u=Re(a),f={role:"group",dir:u,...d};return t.jsx(Yt,{scope:n,rovingFocus:r,disabled:s,children:r?t.jsx(Kt,{asChild:!0,...p,orientation:i,dir:u,loop:l,children:t.jsx(L.div,{...f,ref:o})}):t.jsx(L.div,{...f,ref:o})})}),z="ToggleGroupItem",ke=I.forwardRef((e,o)=>{const n=Ne(z,e.__scopeToggleGroup),s=Xt(z,e.__scopeToggleGroup),r=_e(e.__scopeToggleGroup),i=n.value.includes(e.value),a=s.disabled||e.disabled,l={...e,pressed:i,disabled:a},d=I.useRef(null);return s.rovingFocus?t.jsx(Zt,{asChild:!0,...r,focusable:!a,active:i,ref:d,children:t.jsx(fe,{...l,ref:o})}):t.jsx(fe,{...l,ref:o})});ke.displayName=z;var fe=I.forwardRef((e,o)=>{const{__scopeToggleGroup:n,value:s,...r}=e,i=Ne(z,n),a={role:"radio","aria-checked":e.pressed,"aria-pressed":void 0},l=i.type==="single"?a:void 0;return t.jsx(Ae,{...l,...r,ref:o,onPressedChange:d=>{d?i.onItemActivate(s):i.onItemDeactivate(s)}})}),Jt=re,eo=ke;const to=je.injectEndpoints({endpoints:e=>({getFolders:e.query({query:(o={})=>{const{parentId:n}=o,s={};return n!=null?s.filters={$and:[{parent:{id:n}}]}:s.filters={$and:[{parent:{id:{$null:!0}}}]},{url:"/upload/folders",method:"GET",config:{params:s}}},transformResponse:o=>o.data,providesTags:o=>o?[...o.map(({id:n})=>({type:"Folder",id:n})),{type:"Folder",id:"LIST"}]:[{type:"Folder",id:"LIST"}]}),getFolder:e.query({query:({id:o})=>({url:`/upload/folders/${o}`,method:"GET",config:{params:{populate:{parent:{populate:{parent:"*"}},children:{count:!0},files:{count:!0}}}}}),transformResponse:o=>o.data,providesTags:(o,n,{id:s})=>[{type:"Folder",id:s}]})})}),{useGetFoldersQuery:oo,useGetFolderQuery:no}=to;var B=function(e){return e.Video="video",e.Image="image",e.Document="doc",e.Audio="audio",e}({});function pe(e,o=0){const n=typeof e=="string"?Number(e):e,{value:s,unit:r}=Ze(n*1e3,{precision:o});return r?`${s}${r.toUpperCase()}`:"0B"}const ro=e=>e&&e[0]==="."?e.substring(1):e,ge=e=>e&&e.startsWith("/")?`${window.strapi.backendURL}${e}`:e,so={pdf:tt,csv:et,xls:Je,zip:Xe},se=(e,o)=>{const n=ro(o);return e?.includes(B.Image)?qe:e?.includes(B.Video)?Qe:e?.includes(B.Audio)?Ye:n?so[n]||le:le},ae=()=>{const[{query:e},o]=ot();return{currentFolderId:e?.folder?Number(e.folder):null,navigateToFolder:r=>{o({folder:String(r.id)})}}},ao=h(rt)`
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: 8px;
  overflow: hidden;
`,io=h(F)`
  grid-column: 1 / -1;
`,lo=h(R)`
  width: 100%;
  padding: ${({theme:e})=>`${e.spaces[2]} ${e.spaces[3]}`}; // 8px 12px
  align-items: center;
  gap: ${({theme:e})=>e.spaces[2]}; // 8px
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: ${({theme:e})=>e.borderRadius};
  background: ${({theme:e})=>e.colors.neutral0};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({theme:e})=>e.colors.primary100};
  }

  &:focus-visible {
    outline: 2px solid ${({theme:e})=>e.colors.primary600};
    outline-offset: 2px;
  }
`,co=h(R)`
  flex-shrink: 0;
  color: ${({theme:e})=>e.colors.neutral600};
`,uo=h(w)`
  flex: 1;
  min-width: 0;
`,fo=({folder:e})=>{const{formatMessage:o}=P(),{navigateToFolder:n}=ae();return t.jsxs(lo,{onClick:()=>n(e),role:"button",tabIndex:0,children:[t.jsx(co,{children:t.jsx(te,{width:20,height:20})}),t.jsx(uo,{textColor:"neutral800",ellipsis:!0,children:e.name}),t.jsx(W,{label:o({id:v("control-card.more-actions"),defaultMessage:"More actions"}),variant:"ghost",onClick:s=>s.stopPropagation(),children:t.jsx(H,{})})]})},me=h(F)`
  position: relative;
  width: 100%;
  padding-bottom: 62.5%;
  height: 0;
  overflow: hidden;
  background: repeating-conic-gradient(
      ${({theme:e})=>e.colors.neutral100} 0% 25%,
      transparent 0% 50%
    )
    50% / 20px 20px;
`,po=h.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`,go=h(R)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: ${({theme:e})=>e.colors.neutral500};
  background: ${({theme:e})=>e.colors.neutral100};
`,mo=({asset:e})=>{const{alternativeText:o,ext:n,formats:s,mime:r,url:i}=e;if(r?.includes(B.Image)){const l=ge(s?.thumbnail?.url)??ge(i);if(l)return t.jsx(me,{children:t.jsx(po,{src:l,alt:o||""})})}const a=se(r,n);return t.jsx(me,{children:t.jsx(go,{justifyContent:"center",alignItems:"center",children:t.jsx(a,{width:48,height:48})})})},ho=h(st)`
  border-bottom: none;
`,xo=h(R)`
  min-width: 0;
`,vo=h(R)`
  color: ${({theme:e})=>e.colors.neutral600};
  flex-shrink: 0;
`,bo=h(w)`
  flex: 1;
  min-width: 0;
`,jo=({asset:e})=>{const{formatMessage:o}=P(),n=se(e.mime,e.ext);return t.jsxs(ao,{children:[t.jsx(ho,{children:t.jsx(mo,{asset:e})}),t.jsx(nt,{children:t.jsxs(xo,{alignItems:"center",gap:2,paddingTop:2,children:[t.jsx(vo,{children:t.jsx(n,{width:16,height:16})}),t.jsx(bo,{textColor:"primary800",ellipsis:!0,children:e.name}),t.jsx(W,{label:o({id:v("control-card.more-actions"),defaultMessage:"More actions"}),variant:"ghost",children:t.jsx(H,{})})]})})]})},Co=({assets:e,folders:o=[]})=>{const{formatMessage:n}=P();return o.length+e.length===0?t.jsx(F,{padding:8,children:t.jsx(w,{textColor:"neutral600",children:n({id:"app.components.EmptyStateLayout.content-document",defaultMessage:"No content found"})})}):t.jsxs(V.Root,{gap:4,children:[o.length>0&&t.jsx(io,{children:t.jsx(V.Root,{gap:4,children:o.map(r=>t.jsx(V.Item,{col:3,m:4,s:6,xs:12,children:t.jsx(fo,{folder:r})},`folder-${r.id}`))})}),e.map(r=>t.jsx(V.Item,{col:3,m:4,s:6,xs:12,direction:"column",alignItems:"stretch",children:t.jsx(jo,{asset:r})},r.id))]})},yo={view:"STRAPI_UPLOAD_LIBRARY_VIEW"},N={GRID:0,TABLE:1},he=[{name:"name",label:{id:v("list.table.header.name"),defaultMessage:"name"}},{name:"createdAt",label:{id:v("list.table.header.creationDate"),defaultMessage:"creation date"}},{name:"updatedAt",label:{id:v("list.table.header.lastModified"),defaultMessage:"last modified"}},{name:"size",label:{id:v("list.table.header.size"),defaultMessage:"size"}},{name:"actions",label:{id:v("list.table.header.actions"),defaultMessage:"actions"},isVisuallyHidden:!0}],Io=h(it)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid ${({theme:e})=>e.colors.neutral150};
  border-radius: 4px;
  overflow: hidden;
`,wo=h(lt)`
  background: ${({theme:e})=>e.colors.neutral100};

  tr {
    border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
  }
`,xe=h(ct)`
  height: 40px;
  padding: 0 ${({theme:e})=>e.spaces[4]};
  text-align: left;
`,M=h(ye)`
  padding: 0 ${({theme:e})=>e.spaces[4]};
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
`,Oe=h(Y)`
  height: 48px;
  background: ${({theme:e})=>e.colors.neutral0};

  &:last-child {
    ${M} {
      border-bottom: 0;
    }
  }
`,Ro=h(ye)`
  padding: ${({theme:e})=>e.spaces[4]};
  border-bottom: 1px solid ${({theme:e})=>e.colors.neutral150};
`,So=({asset:e})=>{const{ext:o,mime:n}=e,s=se(n,o);return t.jsx(R,{justifyContent:"center",alignItems:"center",borderRadius:"4px",color:"neutral500",width:"3.2rem",height:"3.2rem",shrink:0,children:t.jsx(s,{width:16,height:16})})},To=({asset:e})=>{const o=oe(),{formatDate:n,formatMessage:s}=P();return t.jsxs(Oe,{children:[t.jsx(M,{children:t.jsxs(R,{gap:3,alignItems:"center",children:[t.jsx(So,{asset:e}),t.jsxs(R,{direction:"column",alignItems:"flex-start",children:[t.jsx(w,{textColor:"neutral800",fontWeight:"semiBold",ellipsis:!0,children:e.name}),o&&t.jsx(w,{textColor:"neutral600",variant:"pi",children:e.size?pe(e.size,1):"-"})]})]})}),!o&&t.jsxs(t.Fragment,{children:[t.jsx(M,{children:t.jsx(w,{textColor:"neutral600",children:e.createdAt?n(new Date(e.createdAt),{dateStyle:"long"}):"-"})}),t.jsx(M,{children:t.jsx(w,{textColor:"neutral600",children:e.updatedAt?n(new Date(e.updatedAt),{dateStyle:"long"}):"-"})}),t.jsx(M,{children:t.jsx(w,{textColor:"neutral600",children:e.size?pe(e.size,1):"-"})})]}),t.jsx(M,{children:t.jsx(R,{justifyContent:"flex-end",children:t.jsx(W,{label:s({id:v("control-card.more-actions"),defaultMessage:"More actions"}),variant:"ghost",children:t.jsx(H,{})})})})]})},Eo=h(Oe)`
  cursor: pointer;

  &:hover {
    background: ${({theme:e})=>e.colors.primary100};
  }
`,Mo=({folder:e})=>{const o=oe(),{formatDate:n,formatMessage:s}=P(),{navigateToFolder:r}=ae();return t.jsxs(Eo,{onClick:()=>r(e),children:[t.jsx(M,{children:t.jsxs(R,{gap:3,alignItems:"center",children:[t.jsx(R,{justifyContent:"center",alignItems:"center",borderRadius:"4px",color:"neutral600",width:"3.2rem",height:"3.2rem",shrink:0,children:t.jsx(te,{width:20,height:20})}),t.jsx(w,{textColor:"neutral800",fontWeight:"semiBold",ellipsis:!0,children:e.name})]})}),!o&&t.jsxs(t.Fragment,{children:[t.jsx(M,{children:t.jsx(w,{textColor:"neutral600",children:e.createdAt?n(new Date(e.createdAt),{dateStyle:"long"}):"-"})}),t.jsx(M,{children:t.jsx(w,{textColor:"neutral600",children:e.updatedAt?n(new Date(e.updatedAt),{dateStyle:"long"}):"-"})}),t.jsx(M,{children:t.jsx(w,{textColor:"neutral600",children:"-"})})]}),t.jsx(M,{children:t.jsx(R,{justifyContent:"flex-end",children:t.jsx(W,{label:s({id:v("control-card.more-actions"),defaultMessage:"More actions"}),variant:"ghost",onClick:i=>i.stopPropagation(),children:t.jsx(H,{})})})})]})},Fo=({assets:e,folders:o=[]})=>{const n=oe(),{formatMessage:s}=P(),r=n?he.filter(a=>a.name==="name"||a.name==="actions"):he,i=o.length+e.length;return t.jsxs(Io,{colCount:r.length,rowCount:i+1,children:[t.jsx(wo,{children:t.jsx(Y,{children:r.map(a=>{const l=s(a.label);return"isVisuallyHidden"in a&&a.isVisuallyHidden?t.jsx(xe,{children:t.jsx(Ce,{children:s({id:v("table.header.actions"),defaultMessage:"actions"})})},a.name):t.jsx(xe,{children:t.jsx(w,{textColor:"neutral600",variant:"sigma",children:l})},a.name)})})}),t.jsx(at,{children:i===0?t.jsx(Y,{children:t.jsx(Ro,{colSpan:r.length,children:t.jsx(w,{textColor:"neutral600",children:s({id:"app.components.EmptyStateLayout.content-document",defaultMessage:"No content found"})})})}):t.jsxs(t.Fragment,{children:[o.map(a=>t.jsx(Mo,{folder:a},`folder-${a.id}`)),e.map(a=>t.jsx(To,{asset:a},a.id))]})})]})},Ve=c.createContext(null),Po=h(F)`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`,$o=({children:e,onDrop:o})=>{const[n,s]=c.useState(!1),r=c.useRef(0),i={isDragging:n};c.useEffect(()=>{const u=()=>{s(!1),r.current=0},f=b=>{b.relatedTarget||(s(!1),r.current=0)};return document.addEventListener("dragend",u),document.addEventListener("dragleave",f),()=>{document.removeEventListener("dragend",u),document.removeEventListener("dragleave",f)}},[]);const a=c.useCallback(u=>{u.preventDefault(),u.stopPropagation(),r.current+=1,u.dataTransfer.types.includes("Files")&&s(!0)},[]),l=c.useCallback(u=>{u.preventDefault(),u.stopPropagation(),r.current-=1,r.current<=0&&(s(!1),r.current=0)},[]),d=c.useCallback(u=>{u.preventDefault(),u.stopPropagation(),u.dataTransfer.dropEffect="copy"},[]),p=c.useCallback(u=>{u.preventDefault(),u.stopPropagation(),s(!1),r.current=0;const{files:f}=u.dataTransfer;f?.length&&o&&o(Array.from(f))},[o]);return t.jsx(Ve.Provider,{value:i,children:t.jsx(Po,{"data-testid":"assets-dropzone",onDragEnter:a,onDragLeave:l,onDragOver:d,onDrop:p,children:e})})},Ue=()=>{const e=c.useContext(Ve);if(!e)throw new Error("useUploadDropZone must be used within UploadDropZone");return{isDragging:e.isDragging}},Ao=(e,o)=>`${e}${Math.floor(o*255).toString(16).padStart(2,"0")}`,Do=h(F)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({theme:e})=>Ao(e.colors.primary200,.3)};
  border: 1px solid ${({theme:e})=>e.colors.primary700};
  border-radius: ${({theme:e})=>e.borderRadius};
  z-index: 1;
  pointer-events: none;
`,_o=({children:e})=>{const{isDragging:o}=Ue();return t.jsxs(F,{position:"relative",children:[o&&t.jsx(Do,{}),e]})},Go=h(F)`
  position: fixed;
  bottom: ${({theme:e})=>e.spaces[8]};
  left: 50%;
  transform: translateX(calc(-50% + ${({$leftContentWidth:e})=>e/2}px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({theme:e})=>e.spaces[2]};
  background: ${({theme:e})=>e.colors.primary600};
  padding: ${({theme:e})=>e.spaces[4]} ${({theme:e})=>e.spaces[6]};
  border-radius: ${({theme:e})=>e.borderRadius};
  z-index: 2;
`,No=({uploadDropZoneRef:e,folderName:o})=>{const{formatMessage:n}=P(),{isDragging:s}=Ue(),[r,i]=c.useState(0);return c.useEffect(()=>{if(!e?.current)return;const a=()=>{const d=e.current?.getBoundingClientRect();d&&i(p=>p!==d.left?d.left:p)};a();const l=new ResizeObserver(a);return l.observe(e.current),()=>l.disconnect()},[e]),s?t.jsxs(Go,{$leftContentWidth:r,children:[t.jsx(w,{textColor:"neutral0",children:n({id:v("dropzone.upload.message"),defaultMessage:"Drop here to upload to"})}),t.jsxs(R,{gap:2,alignItems:"center",children:[t.jsx(te,{width:20,height:20,fill:"neutral0"}),t.jsx(w,{textColor:"neutral0",fontWeight:"semiBold",children:o})]})]}):null},Lo=je.injectEndpoints({endpoints:e=>({getAssets:e.query({query:(o={})=>{const{folder:n,...s}=o,r={...s};return n!=null?r.filters={$and:[{folder:{id:n}}]}:r.filters={$and:[{folder:{id:{$null:!0}}}]},{url:"/upload/files",method:"GET",config:{params:r}}},transformResponse:o=>o,providesTags:o=>o?[...o.results.map(({id:n})=>({type:"Asset",id:n})),{type:"Asset",id:"LIST"}]:[{type:"Asset",id:"LIST"}]})})}),{useGetAssetsQuery:Be}=Lo,ko=e=>{const{formatMessage:o}=P(),{data:n,isLoading:s}=no({id:e},{skip:e===null}),{data:r,isLoading:i}=Be({folder:null,pageSize:1},{skip:e!==null}),a=o({id:v("plugin.home"),defaultMessage:"Home"});return e===null?i?{title:a,itemCount:0}:{title:a,itemCount:r?.pagination?.total??0}:s?{title:a,itemCount:0}:{title:n?.name??a,itemCount:n?.files?.count??0}},U=20,Oo=({folder:e=null,sort:o}={})=>{const[n,s]=c.useState(1),r=c.useRef([]),i=c.useRef(!0),{currentData:a,isLoading:l,isFetching:d,error:p}=Be({folder:e,page:n,pageSize:U,sort:o}),u=a?.pagination,f=c.useMemo(()=>{if(!a)return r.current;const m=a.results;if(n===1)r.current=m;else{const g=(n-1)*U;if(r.current.length<g-U)return r.current;r.current.length<n*U&&(r.current=[...r.current,...m])}return r.current},[a,n]);c.useEffect(()=>{if(i.current){i.current=!1;return}s(1),r.current=[]},[e,o]);const b=u?n<u.pageCount:!1,C=d&&n>1,y=c.useCallback(()=>{s(m=>m+1)},[]);return{assets:f,pagination:u,isLoading:l,isFetchingMore:C,hasNextPage:b,fetchNextPage:y,error:p}},Vo={threshold:.1},Uo=({view:e,folderId:o})=>{const{formatMessage:n}=P(),{assets:s,isLoading:r,isFetchingMore:i,hasNextPage:a,fetchNextPage:l,error:d}=Oo({folder:o}),{data:p=[],isLoading:u}=oo({parentId:o}),f=e===N.GRID,b=r||u,C=vt(c.useCallback(y=>{y&&a&&!i&&l()},[a,i,l]),Vo);return b?t.jsx(R,{justifyContent:"center",padding:8,children:t.jsx(ce,{children:n({id:"app.loading",defaultMessage:"Loading..."})})}):d?t.jsx(F,{padding:8,children:t.jsx(w,{textColor:"danger600",children:n({id:v("list.assets.error"),defaultMessage:"An error occurred while fetching assets."})})}):p.length===0&&s.length===0?t.jsx(F,{padding:8,children:t.jsx(w,{textColor:"neutral600",children:n({id:"app.components.EmptyStateLayout.content-document",defaultMessage:"No content found"})})}):t.jsxs(t.Fragment,{children:[f?t.jsx(Co,{folders:p,assets:s}):t.jsx(Fo,{assets:s,folders:p}),t.jsx("div",{ref:C,style:{height:1}}),i&&t.jsx(R,{justifyContent:"center",padding:4,children:t.jsx(ce,{children:n({id:v("list.assets.loading-more"),defaultMessage:"Loading more assets..."})})})]})},Bo=h(Jt)`
  display: flex;
  border: 1px solid ${({theme:e})=>e.colors.neutral200};
  border-radius: ${({theme:e})=>e.borderRadius};
  overflow: hidden;
`,ve=h(eo)`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spaces[2]};
  padding: ${({theme:e})=>`${e.spaces[2]} ${e.spaces[4]}`};
  border: none;
  background: ${({theme:e})=>e.colors.neutral0};
  color: ${({theme:e})=>e.colors.neutral800};
  cursor: pointer;
  font-size: ${({theme:e})=>e.fontSizes[1]};
  font-weight: ${({theme:e})=>e.fontWeights.semiBold};

  &:hover {
    background: ${({theme:e})=>e.colors.primary100};
  }

  &[data-state='on'] {
    background: ${({theme:e})=>e.colors.neutral150};
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`,zo=h.div`
  [data-strapi-header] {
    background: ${({theme:e})=>e.colors.neutral0};

    h1 {
      font-size: 1.8rem;
    }
  }
`,Wo=()=>{const{formatMessage:e}=P(),{currentFolderId:o}=ae(),{title:n,itemCount:s}=ko(o),r=e({id:v("header.content.item-count"),defaultMessage:"{count, plural, =1 {# item} other {# items}}"},{count:s}),[i,a]=ut(yo.view,N.GRID),l=i===N.GRID,d=c.useRef(null),p=c.useRef(null),[u]=dt(),f=async(m,g)=>{if(m.length===0)return;const j=new FormData,T=[];m.forEach(x=>{j.append("files",x),T.push({name:x.name,caption:null,alternativeText:null,folder:g})}),j.append("fileInfo",JSON.stringify(T));try{await u({formData:j,totalFiles:m.length}).unwrap()}catch{}},b=()=>{d.current?.click()},C=async m=>{const g=m.target.files;g&&g.length>0&&await f(Array.from(g),o),m.target.value=""},y=async m=>{await f(m,o)};return t.jsx($o,{onDrop:y,children:t.jsx(F,{ref:p,children:t.jsxs(q.Root,{minHeight:"100vh",background:"neutral0",children:[t.jsx(Ce,{children:t.jsx("input",{type:"file",ref:d,onChange:C,multiple:!0})}),t.jsx(zo,{children:t.jsx(q.Header,{title:`${n} (${r})`,primaryAction:t.jsx(gt,{popoverPlacement:"bottom-end",variant:"default",endIcon:t.jsx(xt,{}),label:e({id:v("new"),defaultMessage:"New"}),children:t.jsx(mt,{onSelect:b,startIcon:t.jsx(ht,{}),children:e({id:v("import-files"),defaultMessage:"Import files"})})}),subtitle:t.jsxs(R,{justifyContent:"space-between",alignItems:"center",gap:4,width:"100%",children:[t.jsx(R,{gap:4,alignItems:"center",children:"TODO: Filters and search"}),t.jsxs(R,{gap:4,alignItems:"center",children:[t.jsx(F,{children:"TODO: Sort"}),t.jsxs(Bo,{type:"single",value:l?"grid":"table",onValueChange:m=>m&&a(m==="grid"?N.GRID:N.TABLE),"aria-label":e({id:v("view.switch.label"),defaultMessage:"View options"}),children:[t.jsxs(ve,{value:"table","aria-label":e({id:v("view.table"),defaultMessage:"Table view"}),children:[t.jsx(ft,{}),e({id:v("view.table"),defaultMessage:"Table view"})]}),t.jsxs(ve,{value:"grid","aria-label":e({id:v("view.grid"),defaultMessage:"Grid view"}),children:[t.jsx(pt,{}),e({id:v("view.grid"),defaultMessage:"Grid view"})]})]})]})]})})}),t.jsx(q.Content,{children:t.jsxs(_o,{children:[t.jsx(No,{uploadDropZoneRef:p,folderName:n}),t.jsx(Uo,{view:i,folderId:o})]})})]})})})},Zo=()=>{const{formatMessage:e}=P(),o=e({id:v("plugin.name"),defaultMessage:"Media Library"});return t.jsxs(ue.Main,{children:[t.jsx(ue.Title,{children:o}),t.jsx(bt,{children:t.jsx(jt,{index:!0,element:t.jsx(Wo,{})})})]})};export{Zo as UnstableMediaLibrary};
