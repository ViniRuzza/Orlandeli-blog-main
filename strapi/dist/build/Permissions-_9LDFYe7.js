import{aQ as J,h3 as We,bd as Ke,eZ as de,h4 as Te,h5 as ve,h6 as Xe,h7 as ze,h8 as Ye,h9 as qe,ha as Ze,d7 as Je,f0 as Me,hb as Qe,hc as Ue,hd as es,he as ss,hf as ts,hg as ns,hh as fe,hi as N,hj as is,hk as os,hl as _e,i as T,T as j,j as i,R as S,a as w,bH as L,I as E,r as A,hm as k,gK as rs,dl as as,z as re,cs as ls,co as I,cz as cs,cA as ds,b9 as ps,hn as us,cb as we,ho as pe,hp as hs,fK as gs,eP as Y,U as me,d0 as H}from"./strapi-CIj5qZNZ.js";import{c as oe}from"./cloneDeep-Dm1X6kj4.js";import{a as fs,_ as ms}from"./_baseEach-CMpTcDaj.js";var xs=Object.prototype,bs=xs.hasOwnProperty;function Cs(e,s){return e!=null&&bs.call(e,s)}var ys=Cs,js=ys,As=We;function ks(e,s){return e!=null&&As(e,s,js)}var Os=ks;const ee=J(Os);var Ss=qe,$s=ze,Ts=Xe,vs=de,Ms=Ke,_s=Te,ws=Ye,Ps=ve,Es="[object Map]",Ls="[object Set]",Ds=Object.prototype,Rs=Ds.hasOwnProperty;function Is(e){if(e==null)return!0;if(Ms(e)&&(vs(e)||typeof e=="string"||typeof e.splice=="function"||_s(e)||Ps(e)||Ts(e)))return!e.length;var s=$s(e);if(s==Es||s==Ls)return!e.size;if(ws(e))return!Ss(e).length;for(var n in e)if(Rs.call(e,n))return!1;return!0}var Ns=Is;const Z=J(Ns);var Fs=Ze;function Bs(e,s,n){return e==null?e:Fs(e,s,n)}var Hs=Bs;const D=J(Hs),[Vs,Gs]=Je("PermissionsDataManager"),z=()=>Gs("usePermissionsDataManager");var Ws=ts,Ks=es,Xs=fs,zs=Me,Ys=ss,qs=de,Zs=Te,Js=Ue,Qs=Qe,Us=ve;function et(e,s,n){var t=qs(e),o=t||Zs(e)||Us(e);if(s=zs(s),n==null){var a=e&&e.constructor;o?n=t?new a:[]:Qs(e)?n=Js(a)?Ks(Ys(e)):{}:n={}}return(o?Ws:Xs)(e,function(l,r,c){return s(n,l,r,c)}),n}var st=et;const tt=J(st);function xe(e,s){function n(t,o){return tt(t,(a,l,r)=>(ns(l,o[r])||(a[r]=fe(l)&&fe(o[r])?n(l,o[r]):l),a))}return n(e,s)}const Pe=e=>Array.isArray(e)?e.reduce((s,n)=>(Array.isArray(n)?s.push(...Pe(n)):s.push(n),s),[]):[],V=e=>N(e)?Pe(Object.values(e).map(s=>N(s)?V(s):s)):[],Ee=(e,s,n)=>e.find(t=>t.action===s&&t.subject===n),nt=e=>{const s=be(e.plugins),n=be(e.settings),t=Ce(e.collectionTypes),o=Ce(e.singleTypes);return[...s,...n,...t,...o]},be=e=>Object.values(e).reduce((s,n)=>{const t=Object.values(n).reduce((o,a)=>{const l=Object.entries(a).reduce((r,[c,{conditions:d,properties:{enabled:p}}])=>(p&&r.push({action:c,subject:null,conditions:ae(d),properties:{}}),r),[]);return[...o,...l]},[]);return[...s,...t]},[]),Ce=e=>Object.entries(e).reduce((n,t)=>{const[o,a]=t,l=Object.entries(a).reduce((r,c)=>{const[d,p]=c;if(!V(p).some(h=>h))return r;if(!p?.properties?.enabled){const h=Object.entries(p.properties).reduce((b,m)=>{const[u,f]=m;return b.properties[u]=Le(f),b},{action:d,subject:o,conditions:ae(p.conditions),properties:{}});return[...r,h]}return p.properties.enabled&&r.push({action:d,subject:o,properties:{},conditions:ae(p.conditions)}),r},[]);return[...n,...l]},[]),Le=(e,s="")=>Object.entries(e).reduce((n,t)=>{const[o,a]=t;return N(a)?[...n,...Le(a,`${s}${o}.`)]:(a&&!N(a)&&n.push(`${s}${o}`),n)},[]),ae=e=>Object.entries(e).filter(([,s])=>s).map(([s])=>s),De=(e,s=[])=>e.reduce((n,t)=>(n[t.id]=s.indexOf(t.id)!==-1,n),{}),ye=(e,s,n=[])=>e.reduce((t,{categoryId:o,childrenForm:a})=>{const l=a.reduce((r,c)=>(r[c.subCategoryId]=c.actions.reduce((d,p)=>{const g=Ee(n,p.action,null);return d[p.action]={properties:{enabled:g!==void 0},conditions:De(s,g?.conditions??[])},d},{}),r),{});return t[o]=l,t},{}),it=(e,s,n)=>{const t=({children:o=[]},a,l="")=>o.reduce((r,c)=>{if(c.children)return{...r,[c.value]:t(c,a,`${l}${c.value}.`)};const d=a.indexOf(`${l}${c.value}`)!==-1;return r[c.value]=d,r},{});return e.reduce((o,a)=>{const l=s.properties.find(({value:r})=>r===a);if(l){const r=n?.properties[l.value]??[],c=t(l,r);o.properties[a]=c}return o},{properties:{}})},je=({subjects:e,actions:s=[]},n,t=[])=>s.reduce((o,a)=>{const l=a.subjects.reduce((c,d)=>{const p=e.find(({uid:g})=>g===d)||null;return p&&(c[d]=p),c},{});if(Z(l))return o;const r=Object.keys(l).reduce((c,d)=>{const{actionId:p,applyToProperties:g}=a,m=l[d].properties.map(({value:x})=>x).every(x=>(g||[]).indexOf(x)===-1),u=Ee(t,p,d),f=De(n,u?.conditions??[]);if(c[d]||(c[d]={}),Z(g)||m)return c[d][p]={properties:{enabled:u!==void 0},conditions:f},c;const C=it(g,l[d],u);return c[d][p]={...C,conditions:f},c},{});return is(o,r)},{});function ot(e,s,n,t){for(var o=-1,a=e==null?0:e.length;++o<a;){var l=e[o];s(t,l,n(l),e)}return t}var rt=ot,at=ms;function lt(e,s,n,t){return at(e,function(o,a,l){s(t,o,n(o),l)}),t}var ct=lt,dt=rt,pt=ct,ut=Me,ht=de;function gt(e,s){return function(n,t){var o=ht(n)?dt:pt,a=s?s():{};return o(n,e,ut(t),a)}}var ft=gt,mt=os,xt=ft,bt=Object.prototype,Ct=bt.hasOwnProperty,yt=xt(function(e,s,n){Ct.call(e,n)?e[n].push(s):mt(e,n,[s])}),jt=yt;const le=J(jt),Ae=(e,s)=>Object.entries(le(e,s)).map(([n,t])=>({category:n,categoryId:n.split(" ").join("-"),childrenForm:Object.entries(le(t,"subCategory")).map(([o,a])=>({subCategoryName:o,subCategoryId:o.split(" ").join("-"),actions:a}))})),U=e=>Object.keys(e).reduce((s,n)=>{const t=e[n];if(N(t)&&!ee(t,"conditions"))return{...s,[n]:U(t)};if(N(t)&&ee(t,"conditions")&&!V(_e(t,"conditions")).some(a=>a)){const a=Object.keys(t.conditions).reduce((l,r)=>(l[r]=!1,l),{});return{...s,[n]:{...t,conditions:a}}}return s[n]=t,s},{}),q=(e,s,n=!1)=>Object.keys(e).reduce((t,o)=>{const a=e[o];return o==="conditions"&&!n?(t[o]=a,t):N(a)?{...t,[o]:q(a,s,o==="fields")}:(t[o]=s,t)},{}),R="12rem",ue="20rem",te="5.3rem",he=e=>e?Object.entries(e).reduce((s,[n,t])=>(n!=="conditions"&&(s[n]=t),s),{}):null,G=e=>{const s=he(e),n=V(s);if(!n.length)return{hasAllActionsSelected:!1,hasSomeActionsSelected:!1};const t=n.every(a=>a),o=n.some(a=>a)&&!t;return{hasAllActionsSelected:t,hasSomeActionsSelected:o}},Re=T(j)`
  padding-right: ${({theme:e})=>e.spaces[2]};
  overflow: hidden;
  flex: 1;
  ${({$isCollapsable:e})=>e&&"cursor: pointer;"}
`,ge=T.div`
  width: ${R};
`,Ie=()=>i.jsx(S,{color:"danger700",paddingLeft:1,children:"*"}),Ne=({checkboxName:e="",children:s,isActive:n=!1,isCollapsable:t=!1,isFormDisabled:o=!1,label:a,onChange:l,onClick:r,someChecked:c=!1,value:d})=>{const{formatMessage:p}=w(),g={title:a,alignItems:"center",$isCollapsable:t};return t&&Object.assign(g,{onClick:r,"aria-expanded":n,onKeyDown({key:h}){(h==="Enter"||h===" ")&&r()},tabIndex:0,role:"button"}),i.jsxs(j,{alignItems:"center",paddingLeft:6,width:ue,shrink:0,children:[i.jsx(S,{paddingRight:2,children:i.jsx(L,{name:e,"aria-label":p({id:"Settings.permissions.select-all-by-permission",defaultMessage:"Select all {label} permissions"},{label:a}),disabled:o,onCheckedChange:h=>l({target:{name:e,value:!!h}}),checked:c?"indeterminate":d})}),i.jsxs(Re,{...g,children:[i.jsx(E,{ellipsis:!0,children:a}),s]})]})},At=({availableActions:e=[],childrenForm:s=[],isFormDisabled:n,label:t,pathToData:o,propertyName:a})=>{const l=A.useMemo(()=>e.map(r=>{const c=Array.isArray(r.applyToProperties)&&r.applyToProperties.indexOf(a)!==-1&&r.isDisplayed;return{label:r.label,actionId:r.actionId,isActionRelatedToCurrentProperty:c}}),[e,a]);return i.jsxs(j,{display:"inline-flex",direction:"column",alignItems:"stretch",minWidth:0,children:[i.jsx(Pt,{label:t,headers:l}),i.jsx(S,{children:s.map(({children:r,label:c,value:d,required:p},g)=>i.jsx(kt,{childrenForm:r,label:c,isFormDisabled:n,name:d,required:p,propertyActions:l,pathToData:o,propertyName:a,isOdd:g%2===0},d))})]})},kt=({childrenForm:e=[],label:s,isFormDisabled:n=!1,name:t,required:o=!1,pathToData:a,propertyActions:l,propertyName:r,isOdd:c=!1})=>{const{formatMessage:d}=w(),[p,g]=A.useState(null),{modifiedData:h,onChangeCollectionTypeLeftActionRowCheckbox:b,onChangeParentCheckbox:m,onChangeSimpleCheckbox:u}=z(),f=p===t,C=A.useMemo(()=>Array.isArray(e)?e:[],[e]),x=C.length>0,y=A.useCallback(()=>{x&&g(O=>O===t?null:t)},[x,t]),$=({target:{value:O}})=>{b(a,r,t,O)},{hasAllActionsSelected:M,hasSomeActionsSelected:_}=A.useMemo(()=>Ot(l,h,a,r,t),[l,h,a,r,t]);return i.jsxs(i.Fragment,{children:[i.jsx(St,{alignItems:"center",$isCollapsable:x,$isActive:f,background:c?"neutral100":"neutral0",children:i.jsxs(j,{children:[i.jsxs(Ne,{onChange:$,onClick:y,isCollapsable:x,isFormDisabled:n,label:s,someChecked:_,value:M,isActive:f,children:[o&&i.jsx(Ie,{}),i.jsx(Q,{$isActive:f})]}),i.jsx(j,{children:l.map(({label:O,isActionRelatedToCurrentProperty:P,actionId:W})=>{if(!P)return i.jsx(ge,{},O);const v=[...a.split(".."),W,"properties",r,t];if(!x){const B=k(h,v,!1);return i.jsx(j,{width:R,position:"relative",justifyContent:"center",alignItems:"center",children:i.jsx(L,{disabled:n,name:v.join(".."),"aria-label":d({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${t} ${O}`}),onCheckedChange:Ge=>{u({target:{name:v.join(".."),value:!!Ge}})},checked:B})},W)}const K=k(h,v,{}),{hasAllActionsSelected:F,hasSomeActionsSelected:ie}=G(K);return i.jsx(j,{width:R,position:"relative",justifyContent:"center",alignItems:"center",children:i.jsx(L,{disabled:n,name:v.join(".."),onCheckedChange:B=>{m({target:{name:v.join(".."),value:!!B}})},"aria-label":d({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${t} ${O}`}),checked:ie?"indeterminate":F})},O)})})]})}),f&&i.jsx(Fe,{childrenForm:C,isFormDisabled:n,parentName:t,pathToDataFromActionRow:a,propertyName:r,propertyActions:l,recursiveLevel:0})]})},Ot=(e,s,n,t,o)=>{const l=e.reduce((r,c)=>(c.isActionRelatedToCurrentProperty&&r.push(c.actionId),r),[]).reduce((r,c)=>{const d=k(s,[...n.split(".."),c,"properties",t,o],!1);return r[c]=d,r},{});return G(l)},St=T(j)`
  height: ${te};
  flex: 1;

  &:hover {
    ${({$isCollapsable:e,theme:s})=>e&&se(s)}
  }

  ${({$isCollapsable:e})=>e&&`
      ${Q} {
        display: flex;
      }
  `}
  ${({$isActive:e,theme:s})=>e&&se(s)};
`,Q=T(as)`
  display: none;

  svg {
    width: 1.4rem;
  }

  path {
    fill: ${({theme:e})=>e.colors.neutral200};
  }

  transform: rotate(${({$isActive:e})=>e?"180":"0"}deg);
  margin-left: ${({theme:e})=>e.spaces[2]};
`,Fe=({childrenForm:e=[],isFormDisabled:s,recursiveLevel:n,pathToDataFromActionRow:t,propertyActions:o,parentName:a,propertyName:l})=>{const{formatMessage:r}=w(),{modifiedData:c,onChangeParentCheckbox:d,onChangeSimpleCheckbox:p}=z(),[g,h]=A.useState(null),b=u=>{h(f=>f===u?null:u)},m=A.useMemo(()=>g?e.find(({value:u})=>u===g):null,[g,e]);return i.jsxs(S,{paddingLeft:"3.2rem",children:[i.jsx(Mt,{}),e.map(({label:u,value:f,required:C,children:x},y)=>{const $=y+1<e.length,M=Array.isArray(x),_=g===f;return i.jsxs($t,{$isVisible:$,children:[i.jsxs(j,{height:te,children:[i.jsx(_t,{children:i.jsx(wt,{width:"20",height:"23",viewBox:"0 0 20 23",fill:"none",xmlns:"http://www.w3.org/2000/svg",$color:"primary200",children:i.jsx("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.02477 14.7513C8.65865 17.0594 11.6046 18.6059 17.5596 18.8856C18.6836 18.9384 19.5976 19.8435 19.5976 20.9688V20.9688C19.5976 22.0941 18.6841 23.0125 17.5599 22.9643C10.9409 22.6805 6.454 20.9387 3.75496 17.1258C0.937988 13.1464 0.486328 7.39309 0.486328 0.593262H4.50974C4.50974 7.54693 5.06394 11.9813 7.02477 14.7513Z",fill:"#D9D8FF"})})}),i.jsxs(j,{style:{flex:1},children:[i.jsx(Tt,{$level:n,$isActive:_,$isCollapsable:M,children:i.jsxs(Re,{alignItems:"center",$isCollapsable:M,...M&&{onClick:()=>b(f),"aria-expanded":_,onKeyDown:({key:O})=>(O==="Enter"||O===" ")&&b(f),tabIndex:0,role:"button"},title:u,children:[i.jsx(vt,{ellipsis:!0,children:u}),C&&i.jsx(Ie,{}),i.jsx(Q,{$isActive:_})]})}),i.jsx(j,{style:{flex:1},children:o.map(({actionId:O,label:P,isActionRelatedToCurrentProperty:W})=>{if(!W)return i.jsx(ge,{},O);const v=[...t.split(".."),O,"properties",l,...a.split(".."),f],K=k(c,v,!1);if(!x)return i.jsx(j,{position:"relative",width:R,justifyContent:"center",alignItems:"center",children:i.jsx(L,{disabled:s,name:v.join(".."),"aria-label":r({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${a} ${u} ${P}`}),onCheckedChange:B=>{p({target:{name:v.join(".."),value:!!B}})},checked:K})},P);const{hasAllActionsSelected:F,hasSomeActionsSelected:ie}=G(K);return i.jsx(j,{position:"relative",width:R,justifyContent:"center",alignItems:"center",children:i.jsx(L,{disabled:s,name:v.join(".."),"aria-label":r({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${a} ${u} ${P}`}),onCheckedChange:B=>{d({target:{name:v.join(".."),value:!!B}})},checked:ie?"indeterminate":F},P)},P)})})]})]}),m&&_&&i.jsx(S,{paddingBottom:2,children:i.jsx(Fe,{isFormDisabled:s,parentName:`${a}..${f}`,pathToDataFromActionRow:t,propertyActions:o,propertyName:l,recursiveLevel:n+1,childrenForm:m.children})})]},f)})]})},$t=T(S)`
  border-left: ${({$isVisible:e,theme:s})=>e?`4px solid ${s.colors.primary200}`:"4px solid transparent"};
`,Tt=T(j)`
  padding-left: ${({theme:e})=>e.spaces[4]};
  width: ${({$level:e})=>145-e*36}px;

  &:hover {
    ${({$isCollapsable:e,theme:s})=>e&&se(s)}
  }

  ${({$isCollapsable:e})=>e&&`
      ${Q} {
        display: flex;
      }
  `}
  ${({$isActive:e,theme:s})=>e&&se(s)};
`,vt=T(E)``,Mt=T.div`
  padding-top: ${({theme:e})=>e.spaces[2]};
  margin-top: ${({theme:e})=>e.spaces[2]};
  width: 0.4rem;
  background-color: ${({theme:e})=>e.colors.primary200};
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
`,_t=T(S)`
  transform: translate(-4px, -12px);

  &:before {
    content: '';
    width: 0.4rem;
    height: 1.2rem;
    background: ${({theme:e})=>e.colors.primary200};
    display: block;
  }
`,wt=T.svg`
  position: relative;
  flex-shrink: 0;
  transform: translate(-0.5px, -1px);

  * {
    fill: ${({theme:e,$color:s})=>e.colors[s]};
  }
`,Pt=({headers:e=[],label:s})=>{const{formatMessage:n}=w();return i.jsxs(j,{children:[i.jsx(j,{width:ue,height:te,shrink:0,alignItems:"center",paddingLeft:6,children:i.jsx(E,{variant:"sigma",textColor:"neutral500",children:n({id:"Settings.roles.form.permission.property-label",defaultMessage:"{label} permissions"},{label:s})})}),e.map(t=>t.isActionRelatedToCurrentProperty?i.jsx(j,{width:R,shrink:0,justifyContent:"center",children:i.jsx(E,{variant:"sigma",textColor:"neutral500",children:n({id:`Settings.roles.form.permissions.${t.label.toLowerCase()}`,defaultMessage:t.label})})},t.label):i.jsx(j,{width:R,shrink:0},t.label))]})},se=e=>rs`
  color: ${e.colors.primary600};
  font-weight: ${e.fontWeights.bold};

  ${Q} {
    path {
      fill: ${e.colors.primary600};
    }
  }
`,Et=A.forwardRef(({onClick:e,className:s,hasConditions:n=!1,variant:t="tertiary"},o)=>{const{formatMessage:a}=w();return i.jsx(Lt,{$hasConditions:n,className:s,children:i.jsx(re,{variant:t,startIcon:i.jsx(ls,{}),onClick:e,ref:o,type:"button",children:a({id:"global.settings",defaultMessage:"Settings"})})})}),Lt=T(S)`
  ${({$hasConditions:e,theme:s})=>e&&`
    &:before {
      content: '';
      position: absolute;
      top: -3px;
      left: -10px;
      width: 6px;
      height: 6px;
      border-radius: 2rem;
      background: ${s.colors.primary600};
    }
  `}
`,ne=T(Et)``,Be=({actions:e=[],headerBreadCrumbs:s=[],isFormDisabled:n,onClose:t})=>{const{formatMessage:o}=w(),{availableConditions:a,modifiedData:l,onChangeConditions:r}=z(),c=A.useMemo(()=>Object.entries(le(a,"category")),[a]),d=e.filter(({isDisplayed:u,hasSomeActionsSelected:f,hasAllActionsSelected:C})=>u&&!!(f||C)),[p,g]=A.useState(ke(d,l,c)),h=(u,f)=>{g(we(C=>{C[u]||(C[u]={}),C[u].default||(C[u].default={}),C[u].default=f}))},b=()=>{const u=Object.entries(p).reduce((f,C)=>{const[x,y]=C,$=Object.values(y).reduce((M,_)=>({...M,..._}),{});return f[x]=$,f},{});r(u),t&&t()},m=()=>{g(ke(d,l,c)),t&&t()};return i.jsxs(I.Content,{children:[i.jsx(I.Header,{children:i.jsx(cs,{id:"condition-modal-breadcrumbs",label:s.join(", "),children:s.map((u,f,C)=>i.jsx(ds,{isCurrent:f===C.length-1,children:ps(o({id:u,defaultMessage:u}))},u))})}),i.jsxs(I.Body,{children:[d.length===0&&i.jsx(E,{children:o({id:"Settings.permissions.conditions.no-actions",defaultMessage:"You first need to select actions (create, read, update, ...) before defining conditions on them."})}),i.jsx("ul",{children:d.map(({actionId:u,label:f,pathToConditionsObject:C},x)=>{const y=C.join("..");return i.jsx(Dt,{arrayOfOptionsGroupedByCategory:c,label:f,isFormDisabled:n,isGrey:x%2===0,name:y,onChange:h,value:k(p,y,{})},u)})})]}),i.jsxs(I.Footer,{children:[i.jsx(re,{variant:"tertiary",onClick:()=>m(),children:o({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),i.jsx(re,{onClick:b,children:o({id:"Settings.permissions.conditions.apply",defaultMessage:"Apply"})})]})]})},ke=(e,s,n)=>e.reduce((t,o)=>{const a=k(s,[...o.pathToConditionsObject,"conditions"],{}),l=n.reduce((r,c)=>{const[d,p]=c,g=p.reduce((h,b)=>(h[b.id]=k(a,b.id,!1),h),{});return r[d]=g,r},{});return t[o.pathToConditionsObject.join("..")]=l,t},{}),Dt=({arrayOfOptionsGroupedByCategory:e,isFormDisabled:s=!1,isGrey:n=!1,label:t,name:o,onChange:a,value:l})=>{const{formatMessage:r}=w(),c=d=>{a&&a(o,Nt(e,d))};return i.jsxs(j,{tag:"li",background:n?"neutral100":"neutral0",paddingBottom:3,paddingTop:3,justifyContent:"space-evenly",children:[i.jsxs(j,{style:{width:180},children:[i.jsxs(E,{variant:"sigma",textColor:"neutral600",children:[r({id:"Settings.permissions.conditions.can",defaultMessage:"Can"})," "]}),i.jsx(E,{variant:"sigma",title:t,textColor:"primary600",ellipsis:!0,children:r({id:`Settings.roles.form.permissions.${t.toLowerCase()}`,defaultMessage:t})}),i.jsxs(E,{variant:"sigma",textColor:"neutral600",children:[" ",r({id:"Settings.permissions.conditions.when",defaultMessage:"When"})]})]}),i.jsx(S,{style:{maxWidth:430,width:"100%"},children:i.jsx(us,{id:o,customizeContent:(d=[])=>`${d.length} currently selected`,onChange:c,value:Rt(l),options:It(e),disabled:s})})]})},Rt=e=>Object.values(e).map(s=>Object.entries(s).filter(([,n])=>n).map(([n])=>n)).flat(),It=e=>e.reduce((s,[n,t])=>(s.push({label:pe(n),children:t.map(o=>({label:o.displayName,value:o.id}))}),s),[]),Nt=(e,s)=>e.map(([,n])=>n).flat().reduce((n,t)=>({[t.id]:s.includes(t.id),...n}),{}),Ft=({actions:e=[],isFormDisabled:s,pathToData:n,subjects:t=[]})=>{const[o,a]=A.useState(null),l=r=>()=>{a(o===r?null:r)};return i.jsx(i.Fragment,{children:t.map(({uid:r,label:c,properties:d},p)=>{const g=o===r,h=e.map(b=>({...b,isDisplayed:Array.isArray(b.subjects)&&b.subjects.indexOf(r)!==-1}));return i.jsxs(j,{direction:"column",display:"inline-flex",alignItems:"stretch",minWidth:"100%",borderColor:g?"primary600":void 0,children:[i.jsx(Bt,{availableActions:h,isActive:g,isGrey:p%2===0,isFormDisabled:s,label:c,onClickToggle:l(r),pathToData:[n,r].join("..")}),g&&d.map(({label:b,value:m,children:u})=>i.jsx(At,{availableActions:h,childrenForm:u,isFormDisabled:s,label:b,pathToData:[n,r].join(".."),propertyName:m},m))]},r)})})},Bt=({availableActions:e=[],isActive:s=!1,isGrey:n=!1,isFormDisabled:t=!1,label:o,onClickToggle:a,pathToData:l})=>{const{formatMessage:r}=w(),{modifiedData:c,onChangeParentCheckbox:d,onChangeSimpleCheckbox:p}=z(),[g,h]=A.useState(!1),b=k(c,l.split(".."),{}),m=A.useMemo(()=>Object.keys(b).reduce((y,$)=>(y[$]=_e(b[$],"conditions"),y),{}),[b]),{hasAllActionsSelected:u,hasSomeActionsSelected:f}=G(m),C=A.useMemo(()=>Ht(e,c,l),[e,c,l]),x=C.some(y=>y.hasConditions);return i.jsxs(Vt,{$isActive:s,children:[i.jsxs(He,{height:te,flex:1,alignItems:"center",background:n?"neutral100":"neutral0",children:[i.jsx(Ne,{isCollapsable:!0,isFormDisabled:t,label:pe(o),checkboxName:l,onChange:d,onClick:a,someChecked:f,value:u,isActive:s,children:i.jsx(Ve,{paddingLeft:2,children:s?i.jsx(hs,{}):i.jsx(gs,{})})}),i.jsx(j,{style:{flex:1},children:C.map(({actionId:y,hasSomeActionsSelected:$,isDisplayed:M,..._})=>{if(!M)return i.jsx(ge,{},y);const{hasConditions:O,hasAllActionsSelected:P,isParentCheckbox:W,checkboxName:v,label:K}=_;return W?i.jsx(Oe,{justifyContent:"center",alignItems:"center",children:i.jsxs(S,{position:"relative",zIndex:1,children:[O&&i.jsx(S,{tag:"span",position:"absolute",top:"-6px",left:"37px",width:"6px",height:"6px",borderRadius:"20px",background:"primary600"}),i.jsx(L,{disabled:t,name:v,"aria-label":r({id:"Settings.permissions.select-by-permission",defaultMessage:"Select {label} permission"},{label:`${K} ${o}`}),onCheckedChange:F=>{d({target:{name:v,value:!!F}})},checked:$?"indeterminate":P})]})},y):i.jsxs(Oe,{justifyContent:"center",alignItems:"center",children:[O&&i.jsx(S,{tag:"span",position:"absolute",top:"-6px",left:"37px",width:"6px",height:"6px",borderRadius:"20px",background:"primary600"}),i.jsx(L,{disabled:t,name:v,onCheckedChange:F=>{p({target:{name:v,value:!!F}})},checked:O?"indeterminate":P})]},y)})})]}),i.jsx(S,{bottom:"10px",right:"9px",position:"absolute",children:i.jsxs(I.Root,{open:g,onOpenChange:()=>{h(y=>!y)},children:[i.jsx(I.Trigger,{children:i.jsx(ne,{hasConditions:x})}),i.jsx(Be,{headerBreadCrumbs:[o,"Settings.permissions.conditions.conditions"],actions:C,isFormDisabled:t,onClose:()=>{h(!1)}})]})})]})},Ht=(e,s,n)=>e.map(({actionId:t,isDisplayed:o,applyToProperties:a,label:l})=>{if(!o)return{actionId:t,hasSomeActionsSelected:!1,isDisplayed:o};const r=[...n.split(".."),t],c=Z(a)?[...r,"properties","enabled"]:r,d=k(s,[...r,"conditions"],null),p={actionId:t,checkboxName:c.join(".."),hasConditions:V(d).some(m=>m),isDisplayed:o,label:l,pathToConditionsObject:r};if(Z(a)){const m=k(s,c,!1);return{...p,hasAllActionsSelected:m,hasSomeActionsSelected:m,isParentCheckbox:!1}}const g=k(s,c,null),{hasAllActionsSelected:h,hasSomeActionsSelected:b}=G(g);return{...p,hasAllActionsSelected:h,hasSomeActionsSelected:b,isParentCheckbox:!0}}),ce=(e,s)=>`
  ${He} {
    background-color: ${e.colors.primary100};
    color: ${e.colors.primary600};
    border-radius: ${s?"2px 2px 0 0":"2px"};
    font-weight: ${e.fontWeights.bold};
  }

  ${Ve} {
    display: flex;
  }
  ${ne} {
    display: block;
  }

  &:focus-within {
    ${()=>ce(e,s)}
  }
`,He=T(j)`
  border: 1px solid transparent;
`,Vt=T.div`
  display: inline-flex;
  min-width: 100%;
  position: relative;

  ${ne} {
    display: none;
  }

  ${({$isActive:e,theme:s})=>e&&ce(s,e)}

  &:hover {
    ${({theme:e,$isActive:s})=>ce(e,s)}
  }
`,Oe=T(j)`
  width: ${R};
  position: relative;
`,Ve=T(S)`
  display: none;

  svg {
    width: 1.4rem;
  }

  path {
    fill: ${({theme:e})=>e.colors.primary600};
  }
`,Gt=({actions:e=[],isFormDisabled:s,kind:n})=>{const{formatMessage:t}=w(),{modifiedData:o,onChangeCollectionTypeGlobalActionCheckbox:a}=z(),l=e.filter(({subjects:c})=>c&&c.length),r=A.useMemo(()=>{const c=l.map(({actionId:h})=>h),d=o[n],p=c.reduce((h,b)=>(Object.keys(d).forEach(m=>{const u=k(d,[m,b]),f={[m]:he(u)};h[b]?h[b]={...h[b],...f}:h[b]=f}),h),{});return Object.keys(p).reduce((h,b)=>(h[b]=G(p[b]),h),{})},[o,l,n]);return i.jsx(S,{paddingBottom:4,paddingTop:6,style:{paddingLeft:ue},children:i.jsx(j,{gap:0,children:l.map(({label:c,actionId:d})=>i.jsxs(j,{shrink:0,width:R,direction:"column",alignItems:"center",justifyContent:"center",gap:3,children:[i.jsx(E,{variant:"sigma",textColor:"neutral500",children:t({id:`Settings.roles.form.permissions.${c.toLowerCase()}`,defaultMessage:c})}),i.jsx(L,{disabled:s,onCheckedChange:p=>{a(n,d,!!p)},name:d,"aria-label":t({id:"Settings.permissions.select-all-by-permission",defaultMessage:"Select all {label} permissions"},{label:t({id:`Settings.roles.form.permissions.${c.toLowerCase()}`,defaultMessage:c})}),checked:k(r,[d,"hasSomeActionsSelected"],!1)?"indeterminate":k(r,[d,"hasAllActionsSelected"],!1)})]},d))})})},Se=({isFormDisabled:e,kind:s,layout:{actions:n,subjects:t}})=>{const o=[...t].sort((a,l)=>a.label.localeCompare(l.label));return i.jsxs(S,{background:"neutral0",children:[i.jsx(Gt,{actions:n,kind:s,isFormDisabled:e}),i.jsx(Ft,{actions:n,isFormDisabled:e,pathToData:s,subjects:o})]})},$e=({layout:e,...s})=>i.jsx(S,{padding:6,background:"neutral0",children:i.jsx(Y.Root,{size:"M",children:e.map(({category:n,categoryId:t,childrenForm:o},a)=>i.jsx(Wt,{childrenForm:o,variant:a%2===1?"primary":"secondary",name:n,pathToData:[s.kind,t],...s},n))})}),Wt=({childrenForm:e,kind:s,name:n,isFormDisabled:t=!1,variant:o,pathToData:a})=>{const{formatMessage:l}=w(),r=n.split("::").pop()??"",c=r==="upload"?"Media Library":pe(r.replace(/-/g," "));return i.jsxs(Y.Item,{value:n,children:[i.jsx(Y.Header,{variant:o,children:i.jsx(Y.Trigger,{caretPosition:"right",description:`${l({id:"Settings.permissions.category",defaultMessage:r},{category:r})} ${s==="plugins"?"plugin":s}`,children:c})}),i.jsx(Y.Content,{children:i.jsx(S,{padding:6,children:e.map(({actions:d,subCategoryName:p,subCategoryId:g})=>i.jsx(Kt,{actions:d,categoryName:r,isFormDisabled:t,subCategoryName:p,pathToData:[...a,g]},p))})})]})},Kt=({actions:e=[],categoryName:s,isFormDisabled:n,subCategoryName:t,pathToData:o})=>{const{modifiedData:a,onChangeParentCheckbox:l,onChangeSimpleCheckbox:r}=z(),[c,d]=A.useState(!1),{formatMessage:p}=w(),g=k(a,o,{}),h=A.useMemo(()=>Object.keys(g).reduce((x,y)=>(x[y]=he(g[y]),x),{}),[g]),{hasAllActionsSelected:b,hasSomeActionsSelected:m}=G(h),u=A.useMemo(()=>e.map(x=>{const y=[...o,x.action,"properties","enabled"],$=k(a,y,!1),M=k(a,[...o,x.action,"conditions"],{}),_=V(M).some(O=>O);return{...x,isDisplayed:$,checkboxName:y.join(".."),hasSomeActionsSelected:$,value:$,hasConditions:_,label:x.displayName,actionId:x.action,pathToConditionsObject:[...o,x.action]}}),[e,a,o]),f=k(a,[...o],{}),C=V(Object.entries(f).reduce((x,y)=>{const[$,{conditions:M}]=y;return x[$]=M,x},{})).some(x=>x);return i.jsx(i.Fragment,{children:i.jsxs(S,{children:[i.jsxs(j,{justifyContent:"space-between",alignItems:"center",children:[i.jsx(S,{paddingRight:4,children:i.jsx(E,{variant:"sigma",textColor:"neutral600",children:t})}),i.jsx(Xt,{flex:1}),i.jsx(S,{paddingLeft:4,children:i.jsx(L,{name:o.join(".."),disabled:n,onCheckedChange:x=>{l({target:{name:o.join(".."),value:!!x}})},checked:m?"indeterminate":b,children:p({id:"app.utils.select-all",defaultMessage:"Select all"})})})]}),i.jsxs(j,{paddingTop:6,paddingBottom:6,children:[i.jsx(me.Root,{gap:2,style:{flex:1},children:u.map(({checkboxName:x,value:y,action:$,displayName:M,hasConditions:_})=>i.jsx(me.Item,{col:4,m:6,xs:12,direction:"column",alignItems:"start",children:i.jsx(zt,{$disabled:n,$hasConditions:_,children:i.jsx(L,{name:x,disabled:n,onCheckedChange:O=>{r({target:{name:x,value:!!O}})},checked:y,children:M})})},$))}),i.jsxs(I.Root,{open:c,onOpenChange:()=>{d(x=>!x)},children:[i.jsx(I.Trigger,{children:i.jsx(ne,{hasConditions:C})}),i.jsx(Be,{headerBreadCrumbs:[s,t],actions:u,isFormDisabled:n,onClose:()=>{d(!1)}})]})]})]})})},Xt=T(S)`
  align-self: center;
  border-top: 1px solid ${({theme:e})=>e.colors.neutral150};
`,zt=T.div`
  position: relative;
  word-break: keep-all;
  ${({$hasConditions:e,$disabled:s,theme:n})=>e&&`
    &:before {
      content: '';
      position: absolute;
      top: -0.4rem;
      left: -0.8rem;
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 2rem;
      background: ${s?n.colors.neutral100:n.colors.primary600};
    }
  `}
`,X=[{labelId:"app.components.LeftMenuLinkContainer.collectionTypes",defaultMessage:"Collection Types",id:"collectionTypes"},{labelId:"app.components.LeftMenuLinkContainer.singleTypes",id:"singleTypes",defaultMessage:"Single Types"},{labelId:"app.components.LeftMenuLinkContainer.plugins",defaultMessage:"Plugins",id:"plugins"},{labelId:"app.components.LeftMenuLinkContainer.settings",defaultMessage:"Settings",id:"settings"}],en=A.forwardRef(({layout:e,isFormDisabled:s,permissions:n=[]},t)=>{const[{initialData:o,layouts:a,modifiedData:l},r]=A.useReducer(qt,Yt,()=>Zt(e,n)),{formatMessage:c}=w();A.useImperativeHandle(t,()=>({getPermissions(){const m=xe(o.collectionTypes,l.collectionTypes),u=xe(o.singleTypes,l.singleTypes),f={...m,...u};let C;return Z(f)?C=!1:C=Object.values(f).some((x={})=>Object.values(x).some(y=>ee(y,"conditions"))),{permissionsToSend:nt(l),didUpdateConditions:C}},resetForm(){r({type:"RESET_FORM"})},setFormAfterSubmit(){r({type:"SET_FORM_AFTER_SUBMIT"})}}));const d=(m,u,f,C)=>{r({type:"ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX",pathToCollectionType:m,propertyName:u,rowName:f,value:C})},p=(m,u,f)=>{r({type:"ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX",collectionTypeKind:m,actionId:u,value:f})},g=m=>{r({type:"ON_CHANGE_CONDITIONS",conditions:m})},h=A.useCallback(({target:{name:m,value:u}})=>{r({type:"ON_CHANGE_SIMPLE_CHECKBOX",keys:m,value:u})},[]),b=A.useCallback(({target:{name:m,value:u}})=>{r({type:"ON_CHANGE_TOGGLE_PARENT_CHECKBOX",keys:m,value:u})},[]);return i.jsx(Vs,{availableConditions:e.conditions,modifiedData:l,onChangeConditions:g,onChangeSimpleCheckbox:h,onChangeParentCheckbox:b,onChangeCollectionTypeLeftActionRowCheckbox:d,onChangeCollectionTypeGlobalActionCheckbox:p,children:i.jsxs(H.Root,{defaultValue:X[0].id,children:[i.jsx(H.List,{"aria-label":c({id:"Settings.permissions.users.tabs.label",defaultMessage:"Tabs Permissions"}),children:X.map(m=>i.jsx(H.Trigger,{value:m.id,children:c({id:m.labelId,defaultMessage:m.defaultMessage})},m.id))}),i.jsx(H.Content,{value:X[0].id,children:i.jsx(Se,{layout:a.collectionTypes,kind:"collectionTypes",isFormDisabled:s})}),i.jsx(H.Content,{value:X[1].id,children:i.jsx(Se,{layout:a.singleTypes,kind:"singleTypes",isFormDisabled:s})}),i.jsx(H.Content,{value:X[2].id,children:i.jsx($e,{layout:a.plugins,kind:"plugins",isFormDisabled:s})}),i.jsx(H.Content,{value:X[3].id,children:i.jsx($e,{layout:a.settings,kind:"settings",isFormDisabled:s})})]})})}),Yt={initialData:{},modifiedData:{},layouts:{}},qt=(e,s)=>we(e,n=>{switch(s.type){case"ON_CHANGE_COLLECTION_TYPE_GLOBAL_ACTION_CHECKBOX":{const{collectionTypeKind:t,actionId:o,value:a}=s,l=["modifiedData",t];Object.keys(k(e,l)).forEach(r=>{const c=k(e,[...l,r,o],void 0);if(c){let d=q(c,a);if(!a&&d.conditions){const p=q(d.conditions,!1);d={...d,conditions:p}}D(n,[...l,r,o],d)}});break}case"ON_CHANGE_COLLECTION_TYPE_ROW_LEFT_CHECKBOX":{const{pathToCollectionType:t,propertyName:o,rowName:a,value:l}=s;let r=oe(e.modifiedData);const c=t.split(".."),d=k(r,c,{});Object.keys(d).forEach(p=>{if(ee(d[p],`properties.${o}`)){const g=k(d,[p,"properties",o,a]),h=[...c,p,"properties",o,a];if(!N(g))D(r,h,l);else{const b=q(g,l);D(r,h,b)}}}),l||(r=U(r)),D(n,"modifiedData",r);break}case"ON_CHANGE_CONDITIONS":{Object.entries(s.conditions).forEach(t=>{const[o,a]=t;D(n,["modifiedData",...o.split(".."),"conditions"],a)});break}case"ON_CHANGE_SIMPLE_CHECKBOX":{let t=oe(e.modifiedData);D(t,[...s.keys.split("..")],s.value),s.value||(t=U(t)),D(n,"modifiedData",t);break}case"ON_CHANGE_TOGGLE_PARENT_CHECKBOX":{const{keys:t,value:o}=s,a=[...t.split("..")];let l=oe(e.modifiedData);const r=k(l,a,{}),c=q(r,o);D(l,a,c),o||(l=U(l)),D(n,["modifiedData"],l);break}case"RESET_FORM":{n.modifiedData=e.initialData;break}case"SET_FORM_AFTER_SUBMIT":{n.initialData=e.modifiedData;break}default:return n}}),Zt=(e,s)=>{const{conditions:n,sections:{collectionTypes:t,singleTypes:o,plugins:a,settings:l}}=e,r={collectionTypes:t,singleTypes:o,plugins:Ae(a,"plugin"),settings:Ae(l,"category")},c={collectionTypes:je(t,n,s),singleTypes:je(o,n,s),plugins:ye(r.plugins,n,s),settings:ye(r.settings,n,s)};return{initialData:c,modifiedData:c,layouts:r}};export{en as P};
