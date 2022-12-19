"use strict";(self.webpackChunkx_career_reactjs=self.webpackChunkx_career_reactjs||[]).push([[436],{24574:function(e,n,t){t.d(n,{Z:function(){return S}});var a=t(72791),r=t(16871),i=t(63366),o=t(87462),s=t(28182),c=t(94419),d=t(31402),l=t(66934),m=t(21217);function h(e){return(0,m.Z)("MuiCardMedia",e)}(0,t(75878).Z)("MuiCardMedia",["root","media","img"]);var p=t(80184);const u=["children","className","component","image","src","style"],x=(0,l.ZP)("div",{name:"MuiCardMedia",slot:"Root",overridesResolver:(e,n)=>{const{ownerState:t}=e,{isMediaComponent:a,isImageComponent:r}=t;return[n.root,a&&n.media,r&&n.img]}})((e=>{let{ownerState:n}=e;return(0,o.Z)({display:"block",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},n.isMediaComponent&&{width:"100%"},n.isImageComponent&&{objectFit:"cover"})})),g=["video","audio","picture","iframe","img"],Z=["picture","img"];var j=a.forwardRef((function(e,n){const t=(0,d.Z)({props:e,name:"MuiCardMedia"}),{children:a,className:r,component:l="div",image:m,src:j,style:v}=t,C=(0,i.Z)(t,u),b=-1!==g.indexOf(l),f=!b&&m?(0,o.Z)({backgroundImage:'url("'.concat(m,'")')},v):v,w=(0,o.Z)({},t,{component:l,isMediaComponent:b,isImageComponent:-1!==Z.indexOf(l)}),k=(e=>{const{classes:n,isMediaComponent:t,isImageComponent:a}=e,r={root:["root",t&&"media",a&&"img"]};return(0,c.Z)(r,h,n)})(w);return(0,p.jsx)(x,(0,o.Z)({className:(0,s.Z)(k.root,r),as:l,role:!b&&m?"img":void 0,ref:n,style:f,ownerState:w,src:b?m||j:void 0},C,{children:a}))})),v=t(61889),C=t(20890),b=t(57621),f=t(45074),w=t(89554),k=t(44428),I=t(39910);const y=new f.Z,M=(0,k.ZP)(I.h,{withCredentials:!0});var S=e=>{let{id:n,page:t}=e;const i=(0,r.s0)(),o=sessionStorage.getItem("id"),[s,c]=(0,a.useState)([]),[d,l]=(0,a.useState)(!1),[m,h]=(0,a.useState)(),u=e=>{y.getByID(e).then((e=>{let n=[],t=0;e.data[0].boards.map((e=>{e.member.map((a=>{a._id===o&&(n.push(e),t++)}))})),c(n),h(t)}))};return(0,a.useEffect)((()=>{u(n),M.on("board",(()=>{u(n)}))}),[n]),(0,p.jsxs)(p.Fragment,{children:[0===m&&"dashboard"===t?(0,p.jsxs)(v.ZP,{container:!0,alignItems:"center",children:[(0,p.jsx)(C.Z,{variant:"h4",fontWeight:300,sx:{my:2,mr:1},children:"You don't have any panels in this Workspace yet. The boards you create or join will show up here."}),(0,p.jsx)(C.Z,{variant:"subtitle1",sx:{cursor:"pointer",textDecoration:"underline","&:hover":{color:"#90CAF9"}},onClick:()=>{l(!0)},children:"Create Table"})]}):(0,p.jsx)(p.Fragment,{children:s.map((e=>(0,p.jsxs)(v.ZP,{item:!0,xs:3,sm:3,md:3,sx:{position:"relative"},children:[(0,p.jsx)(b.Z,{children:(0,p.jsx)(j,{height:130,sx:{cursor:"pointer"},component:"img",alt:"board",src:e.bgImg.data,onClick:()=>i("/b/".concat(e._id),{replace:!0})})}),(0,p.jsx)(C.Z,{sx:{position:"absolute",top:40,left:40,color:"white"},variant:"h3",children:e.name})]},e._id)))}),(0,p.jsx)(w.Z,{open:d,onClose:()=>{l(!1)},wsId:n,dialogForm:0})]})}},31436:function(e,n,t){t.r(n);var a=t(72791),r=t(16871),i=t(20890),o=t(61889),s=t(53767),c=t(93044),d=t(24518),l=t(94721),m=t(16999),h=t(45074),p=t(24574),u=t(73243),x=t(62915),g=t(98064),Z=t(44428),j=t(39910),v=t(80184);const C=new h.Z,b=(0,Z.ZP)(j.h,{withCredentials:!0});n.default=e=>{let{page:n}=e;const t=(0,r.s0)(),h=sessionStorage.getItem("id"),[Z,j]=(0,a.useState)([]),[f,w]=(0,a.useState)(!1),k=e=>{C.getAll().then((n=>{let t=[];n.data.data.map((n=>{n.member.map((a=>{a._id===e&&t.push(n)}))})),j(t)}))};return(0,a.useEffect)((()=>{k(h),b.on("workspace",(()=>{k(h)}))}),[h]),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(i.Z,{variant:"h2",sx:{mb:3},children:"Your Work Spaces"}),(0,v.jsx)(m.Z,{sx:{height:"100%"},children:0===Z.length?(0,v.jsxs)(o.ZP,{container:!0,alignItems:"center",children:[(0,v.jsx)(i.Z,{variant:"h4",sx:{mr:1},children:"You are not a member of any workspace."}),(0,v.jsx)(i.Z,{variant:"subtitle1",sx:{cursor:"pointer",textDecoration:"underline","&:hover":{color:"#90CAF9"}},onClick:()=>{w(!0)},children:"Create a Workspace"})]}):(0,v.jsx)(s.Z,{spacing:2,children:Z.map((e=>(0,v.jsxs)("div",{children:[(0,v.jsxs)(s.Z,{spacing:2,sx:{mb:4},children:[(0,v.jsxs)(o.ZP,{item:!0,display:"flex",justifyContent:"space-between",alignItems:"center",children:[(0,v.jsxs)(o.ZP,{container:!0,alignItems:"center",children:[""===e.logo.data?(0,v.jsx)(x.Z,{name:e.name,h:50,w:50,f:30}):(0,v.jsx)(c.Z,{src:e.logo.data,variant:"rounded"}),(0,v.jsx)(i.Z,{variant:"h2",sx:{ml:1,fontWeight:500},children:e.name})]}),(0,v.jsx)(u.Z,{children:(0,v.jsx)(d.Z,{disableElevation:!0,sx:{width:100},onClick:()=>t("/w/detail/".concat(e._id),{replace:!0}),variant:"contained",color:"primary",children:"Detail"})})]}),(0,v.jsx)(o.ZP,{container:!0,spacing:2,children:(0,v.jsx)(p.Z,{id:e._id,page:n})})]}),(0,v.jsx)(l.Z,{})]},e._id)))})}),(0,v.jsx)(g.Z,{open:f,onClose:()=>{w(!1)},dialogForm:0})]})}}}]);
//# sourceMappingURL=436.c5b1f680.chunk.js.map