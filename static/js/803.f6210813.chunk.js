"use strict";(self.webpackChunkx_career_reactjs=self.webpackChunkx_career_reactjs||[]).push([[803],{67461:function(e,t,a){a.d(t,{Z:function(){return s}});var n=a(82388),r=a(39910);class s extends r.T{constructor(){super({endpoint:"api/tasks"}),this.createNew=async e=>await(0,n.Z)({method:"POST",url:"".concat(this.api,"/").concat(this.endpoint,"/createTask"),data:{task:e}}),this.getAll=async()=>await(0,n.Z)({method:"GET",url:"".concat(this.api,"/").concat(this.endpoint,"/getAllTasksOfAllBoards"),data:null}),this.updateByID=async(e,t)=>await(0,n.Z)({method:"PUT",url:"".concat(this.api,"/").concat(this.endpoint,"/updateTaskByID?id=").concat(e),data:{task:t}})}}},97815:function(e,t,a){var n=a(72791),r=a(66934),s=a(12065),i=a(65117),o=a(24518),l=a(61889),d=a(68096),c=a(17133),h=a(79012),x=a(85523),m=a(94454),p=a(93044),u=a(58956),g=a(80184);const j=(0,r.ZP)((e=>(0,g.jsx)(i.Z,{elevation:0,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},...e})))((e=>{let{theme:t}=e;return{"& .MuiPaper-root":{borderRadius:6,marginTop:t.spacing(1),minWidth:180,color:"light"===t.palette.mode?"rgb(55, 65, 81)":t.palette.grey[300],boxShadow:"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px","& .MuiMenu-list":{padding:"4px 0"},"& .MuiMenuItem-root":{"& .MuiSvgIcon-root":{fontSize:18,color:t.palette.text.secondary,marginRight:t.spacing(1.5)},"&:active":{backgroundColor:(0,s.Fq)(t.palette.primary.main,t.palette.action.selectedOpacity)}}}}}));t.Z=e=>{const{page:t,userId:a,check:r,checkNone:s,handleFilterMemberNone:i,handleFilterMember:Z,member:b,board:v,date:y,dateID:w,handleFilterDate:f,checkDate:k}=e,[P,C]=(0,n.useState)(null),I=Boolean(P);return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(o.Z,{id:"demo-customized-button","aria-controls":I?"demo-customized-menu":void 0,"aria-haspopup":"true","aria-expanded":I?"true":void 0,variant:"contained",disableElevation:!0,onClick:e=>{C(e.currentTarget)},startIcon:(0,g.jsx)(u.wHY,{size:20}),children:"filter"}),(0,g.jsxs)(j,{id:"demo-customized-menu",MenuListProps:{"aria-labelledby":"demo-customized-button"},anchorEl:P,open:I,onClose:()=>{C(null)},children:["board"===t&&(0,g.jsxs)(l.ZP,{sx:{display:"flex",flexDirection:"column"},children:[(0,g.jsxs)(d.Z,{sx:{m:"16px 16px 0 16px"},component:"fieldset",variant:"standard",children:[(0,g.jsx)(c.Z,{component:"legend",children:"Filter by member"}),(0,g.jsxs)(h.Z,{children:[(0,g.jsx)(x.Z,{control:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(m.Z,{checked:s,onChange:e=>{i(e)}}),(0,g.jsx)(p.Z,{src:"",sx:{width:20,height:20,mr:1}})]}),label:"No membres"}),b&&b.map((e=>(0,g.jsx)(x.Z,{control:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(m.Z,{checked:a===e._id&&r,onChange:t=>{Z(t,e._id)}}),(0,g.jsx)(p.Z,{src:e.avatar.data,sx:{width:20,height:20,mr:1}})]}),label:e.name},e._id)))]})]}),(0,g.jsxs)(d.Z,{sx:{m:2},component:"fieldset",variant:"standard",children:[(0,g.jsx)(c.Z,{component:"legend",children:"Filter by date"}),(0,g.jsx)(h.Z,{children:y&&y.map((e=>(0,g.jsx)(x.Z,{control:(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(m.Z,{checked:w===e.id&&k,onChange:t=>{f(t,e.id)}}),(0,g.jsx)(u.joI,{size:20,color:e.iconColor,style:{marginRight:"10px"}})]}),label:e.label},e.id)))})]})]}),"user"===t&&(0,g.jsx)(l.ZP,{sx:{display:"flex",flexDirection:"column"},children:(0,g.jsxs)(d.Z,{sx:{m:"16px 16px 0 16px"},component:"fieldset",variant:"standard",children:[(0,g.jsx)(c.Z,{component:"legend",children:"Filter by board"}),(0,g.jsx)(h.Z,{children:v&&v.map((e=>(0,g.jsx)(x.Z,{control:(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(m.Z,{checked:a===e._id&&r,onChange:t=>{Z(t,e._id)}})}),label:e.name},e._id)))})]})})]})]})}},54259:function(e,t,a){a.r(t);var n=a(72791),r=a(5289),s=a(64554),i=a(65661),o=a(39157),l=a(61889),d=a(20890),c=a(28029),h=a(88970),x=a(85523),m=a(61419),p=a(24518),u=a(62062),g=a.n(u),j=a(54233),Z=a(9707),b=a(26594),v=a(73243),y=a(44428),w=a(39910),f=a(80184);const k=new j.Z,P=(0,y.ZP)(w.h,{transports:["websocket","polling"],withCredentials:!0});t.default=e=>{const{open:t,onClose:a,formData:u}=e,[j,y]=(0,n.useState)({}),w=()=>{a(!t)},C=e=>{const t=e.target.name,a=e.target.value;y({...j,[t]:a})};return(0,n.useEffect)((()=>{y(u)}),[u]),(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(r.Z,{open:t,onClose:w,scroll:"body",children:(0,f.jsxs)(s.Z,{component:"form",onSubmit:async e=>{e.preventDefault();const n=new FormData(e.currentTarget),r={name:n.get("name"),email:n.get("email"),gender:n.get("gender"),group:n.get("group"),position:n.get("position"),address:n.get("address")};if(""===r.name)g()({text:"Name is required.",buttons:!1,timer:2e3,icon:"warning"});else if(""!==r.email&&/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(r.email))if(""!==n.get("avatar").name){const e=await(0,b.Z)(n.get("avatar"));"image/"===e.type.match(/[^:/]\w+\//)[0]?(r.avatar=e,k.updateByID(j._id,r).then((e=>{!0===e.data.success&&(P.emit("user",e.data.data),g()({text:"Successfully updated profile.",buttons:!1,timer:3e3,icon:"success"}),setTimeout((()=>{a(!t)}),3e3))})).catch((()=>{g()({text:"Sorry, something went wrong. Please contact to admin for support.",buttons:!1,timer:5e3,icon:"error"})}))):g()({text:"Wrong file's type, please choose only image.",buttons:!1,timer:3e3,icon:"warning"})}else k.updateByID(j._id,r).then((e=>{!0===e.data.success&&(P.emit("user",e.data.data),g()({text:"Successfully updated profile.",buttons:!1,timer:3e3,icon:"success"}),setTimeout((()=>{a(!t)}),3e3))})).catch((()=>{g()({text:"Sorry, something went wrong. Please contact to admin for support.",buttons:!1,timer:5e3,icon:"error"})}));else g()({text:"Email is required and must be a valid email.",buttons:!1,timer:3e3,icon:"warning"})},noValidate:!0,sx:{mt:1,width:500},children:[(0,f.jsx)(i.Z,{sx:{textAlign:"center"},color:"primary",variant:"h2",children:"Edit profile"}),(0,f.jsxs)(o.Z,{spacing:2,dividers:!0,children:[(0,f.jsxs)(l.ZP,{container:!0,alignItems:"center",children:[(0,f.jsx)(d.Z,{sx:{mr:15},color:"primary",variant:"h5",children:"Avatar:"}),(0,f.jsx)(Z.Z,{defaultValue:j.avatar&&j.avatar.data,name:"avatar"})]}),(0,f.jsxs)(l.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{height:70},children:[(0,f.jsx)(d.Z,{color:"primary",variant:"h5",children:"Display name:"}),(0,f.jsx)(c.Z,{sx:{width:2/3},id:"name",type:"text",value:j.name,name:"name",onChange:C,placeholder:"Enter display name"})]}),(0,f.jsxs)(l.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{height:70},children:[(0,f.jsx)(d.Z,{color:"primary",variant:"h5",children:"Email address:"}),(0,f.jsx)(c.Z,{sx:{width:2/3},id:"email",type:"email",value:j.email,name:"email",onChange:C,placeholder:"Enter email address"})]}),(0,f.jsxs)(l.ZP,{container:!0,alignItems:"center",sx:{height:70},children:[(0,f.jsx)(d.Z,{sx:{mr:15},color:"primary",variant:"h5",children:"Gender:"}),(0,f.jsxs)(h.Z,{row:!0,name:"gender",value:j.gender,onChange:C,children:[(0,f.jsx)(x.Z,{value:"Female",control:(0,f.jsx)(m.Z,{}),label:"Female"}),(0,f.jsx)(x.Z,{value:"Male",control:(0,f.jsx)(m.Z,{}),label:"Male"})]})]}),(0,f.jsxs)(l.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{height:70},children:[(0,f.jsx)(d.Z,{color:"primary",variant:"h5",children:"Group:"}),(0,f.jsx)(c.Z,{sx:{width:2/3},id:"group",type:"text",value:j.group,name:"group",onChange:C,placeholder:"Enter group"})]}),(0,f.jsxs)(l.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{height:70},children:[(0,f.jsx)(d.Z,{color:"primary",variant:"h5",children:"Position:"}),(0,f.jsx)(c.Z,{sx:{width:2/3},id:"position",type:"text",value:j.position,name:"position",onChange:C,placeholder:"Enter position"})]}),(0,f.jsxs)(l.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{height:70},children:[(0,f.jsx)(d.Z,{color:"primary",variant:"h5",children:"Address:"}),(0,f.jsx)(c.Z,{sx:{width:2/3},id:"address",type:"text",name:"address",value:j.address,onChange:C,placeholder:"Enter address"})]})]}),(0,f.jsxs)(l.ZP,{container:!0,alignItems:"center",justifyContent:"space-around",sx:{my:2},children:[(0,f.jsx)(v.Z,{children:(0,f.jsx)(p.Z,{disableElevation:!0,size:"large",onClick:w,variant:"contained",color:"secondary",children:"Cancel"})}),(0,f.jsx)(v.Z,{children:(0,f.jsx)(p.Z,{disableElevation:!0,size:"large",type:"submit",variant:"contained",color:"primary",children:"Save"})})]})]})})})}},25803:function(e,t,a){a.r(t),a.d(t,{default:function(){return G}});var n=a(72791),r=a(16871),s=a(61889),i=a(93044),o=a(20890),l=a(2199),d=a(24518),c=a(54233),h=a(54259),x=a(53767),m=a(94721),p=a(44428),u=a(39910),g=a(80184);const j=new c.Z,Z=(0,p.ZP)(u.h,{transports:["websocket","polling"],withCredentials:!0});var b=()=>{const{userId:e}=(0,r.UO)(),[t,a]=(0,n.useState)({}),i=e=>{j.getByID(e).then((e=>a(e.data[0])))};return(0,n.useEffect)((()=>{i(e),Z.on("user",(()=>{i(e)}))}),[e]),(0,g.jsx)(s.ZP,{sx:{my:5,px:45},children:(0,g.jsxs)(x.Z,{spacing:2,sx:{mx:10},children:[(0,g.jsxs)(s.ZP,{container:!0,alignItems:"center",children:[(0,g.jsx)(o.Z,{sx:{mr:2},color:"primary",variant:"h5",children:"Display name:"}),(0,g.jsx)(o.Z,{variant:"h5",children:void 0===t.name?t.email:t.name})]}),(0,g.jsx)(m.Z,{sx:{borderBottom:"1px solid"}}),(0,g.jsxs)(s.ZP,{container:!0,alignItems:"center",children:[(0,g.jsx)(o.Z,{sx:{mr:8},color:"primary",variant:"h5",children:"Email:"}),(0,g.jsx)(o.Z,{variant:"h5",children:t.email})]}),(0,g.jsx)(m.Z,{sx:{borderBottom:"1px solid"}}),(0,g.jsxs)(s.ZP,{container:!0,alignItems:"center",children:[(0,g.jsx)(o.Z,{sx:{mr:7},color:"primary",variant:"h5",children:"Gender:"}),(0,g.jsx)(o.Z,{variant:"h5",children:t.gender})]}),(0,g.jsx)(m.Z,{sx:{borderBottom:"1px solid"}}),(0,g.jsxs)(s.ZP,{container:!0,alignItems:"center",children:[(0,g.jsx)(o.Z,{sx:{mr:8},color:"primary",variant:"h5",children:"Group:"}),(0,g.jsx)(o.Z,{variant:"h5",children:t.group})]}),(0,g.jsx)(m.Z,{sx:{borderBottom:"1px solid"}}),(0,g.jsxs)(s.ZP,{container:!0,alignItems:"center",children:[(0,g.jsx)(o.Z,{sx:{mr:6},color:"primary",variant:"h5",children:"Position:"}),(0,g.jsx)(o.Z,{variant:"h5",children:t.position})]}),(0,g.jsx)(m.Z,{sx:{borderBottom:"1px solid"}}),(0,g.jsxs)(s.ZP,{container:!0,alignItems:"center",children:[(0,g.jsx)(o.Z,{sx:{mr:6},color:"primary",variant:"h5",children:"Address:"}),(0,g.jsx)(o.Z,{variant:"h5",children:t.address})]}),(0,g.jsx)(m.Z,{sx:{borderBottom:"1px solid"}})]})})},v=a(39281),y=a(79836),w=a(53382),f=a(35855),k=a(53994),P=a(26812),C=a(56890),I=a(58956),S=a(45074),D=a(32065),E=a(67461),_=a(62915),F=a(97815);const T=new S.Z,B=new D.Z,z=new E.Z,A=(0,p.ZP)(u.h,{transports:["websocket","polling"],withCredentials:!0}),M=[{id:0,title:"Backlog"},{id:1,title:"To-Do"},{id:2,title:"Doing"},{id:3,title:"Done"}];var W=()=>{const{userId:e}=(0,r.UO)(),t=(0,r.s0)(),[a,l]=(0,n.useState)([]),[d,c]=(0,n.useState)([]),[h,x]=(0,n.useState)([]),[m,p]=(0,n.useState)(0),[u,j]=(0,n.useState)(5),[Z,b]=(0,n.useState)(0),[S,D]=(0,n.useState)(5),[E,W]=(0,n.useState)(),[O,R]=(0,n.useState)(!1),G=e=>{T.getAll().then((t=>{let a=[];t.data.data.map((t=>{t.member.map((n=>{n._id===e&&a.push(t)}))})),l(a)})),B.getAll().then((t=>{let a=[];t.data.data.map((t=>{t.member.map((n=>{n._id===e&&a.push(t)}))})),c(a)})),z.getAll().then((t=>{let a=[];t.data.data.map((t=>{t.member.map((n=>{n._id===e&&a.push(t)}))})),x(a)}))};return(0,n.useEffect)((()=>{G(e),A.on("workspace",(()=>{G(e)})),A.on("board",(()=>{G(e)})),A.on("task",(()=>{G(e)}))}),[e]),(0,g.jsxs)(s.ZP,{sx:{my:5,px:20},children:[(0,g.jsxs)(s.ZP,{sx:{px:30},children:[(0,g.jsxs)(s.ZP,{item:!0,display:"flex",alignItems:"center",children:[(0,g.jsx)(I.SrG,{}),(0,g.jsx)(o.Z,{variant:"h3",sx:{ml:2},children:"Workspaces"})]}),0===a.length?(0,g.jsx)(s.ZP,{container:!0,justifyContent:"center",alignItems:"center",sx:{mt:2,height:150,bgcolor:"rgba(128, 128, 128, 0.1)"},children:(0,g.jsx)(o.Z,{variant:"h4",children:"Can't see any workspace. You must be added to the workspace to see them."})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(v.Z,{sx:{maxHeight:500,overflow:"hidden","&:hover":{overflow:"auto","&::-webkit-scrollbar":{width:7},"&::-webkit-scrollbar-track":{background:"#f1f1f1",borderRadius:10},"&::-webkit-scrollbar-thumb":{background:"#888",borderRadius:10},"&::-webkit-scrollbar-thumb:hover":{background:"#555"}}},children:(0,g.jsx)(y.Z,{children:(0,g.jsx)(w.Z,{children:a.slice(m*u,m*u+u).map((e=>(0,g.jsx)(f.Z,{hover:!0,onClick:()=>{t("/w/detail/".concat(e._id),{replace:!0})},sx:{cursor:"pointer"},children:(0,g.jsxs)(k.Z,{sx:{display:"flex",alignItems:"center"},children:[e.logo&&(0,g.jsx)(g.Fragment,{children:""===e.logo.data?(0,g.jsx)(_.Z,{name:e.name,h:30,w:30,f:24}):(0,g.jsx)(i.Z,{src:e.logo.data,variant:"rounded",sx:{height:30,width:30}})}),(0,g.jsx)(o.Z,{variant:"h5",sx:{ml:2},children:e.name})]})},e._id)))})})}),(0,g.jsx)(P.Z,{sx:{overflow:"hidden"},rowsPerPageOptions:[5,10,25,50,100],component:"div",count:a.length,rowsPerPage:u,page:m,onPageChange:(e,t)=>{p(t)},onRowsPerPageChange:e=>{j(+e.target.value),p(0)}})]})]}),(0,g.jsxs)(s.ZP,{children:[(0,g.jsxs)(s.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",children:[(0,g.jsxs)(s.ZP,{item:!0,display:"flex",alignItems:"center",children:[(0,g.jsx)(I.ZdG,{}),(0,g.jsx)(o.Z,{variant:"h3",sx:{ml:2},children:"Work"})]}),(0,g.jsx)(F.Z,{page:"user",id:E,check:O,board:d,handleFilterMember:(t,a)=>{W(a),R(t.target.checked),z.getAll().then((n=>{let r=[],s=[];n.data.data.map((t=>{t.member.map((n=>{n._id===e&&(r.push(t),t.boardID._id===a&&s.push(t))}))})),!0===t.target.checked?x(s):x(r)}))}})]}),0===h.length?(0,g.jsx)(s.ZP,{container:!0,justifyContent:"center",alignItems:"center",sx:{mt:2,height:150,bgcolor:"rgba(128, 128, 128, 0.1)"},children:(0,g.jsx)(o.Z,{variant:"h3",children:"Can't see any task. You must be added to the task to see them."})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(v.Z,{sx:{maxHeight:500,"&::-webkit-scrollbar":{width:10,height:10},"&::-webkit-scrollbar-track":{background:"#f1f1f1",borderRadius:10},"&::-webkit-scrollbar-thumb":{background:"#888",borderRadius:10},"&::-webkit-scrollbar-thumb:hover":{background:"#555"}},children:(0,g.jsxs)(y.Z,{stickyHeader:!0,children:[(0,g.jsx)(C.Z,{children:(0,g.jsxs)(f.Z,{children:[(0,g.jsx)(k.Z,{children:"#"}),(0,g.jsx)(k.Z,{sx:{minWidth:300},children:"Task"}),(0,g.jsx)(k.Z,{sx:{minWidth:300},children:"Describe"}),(0,g.jsx)(k.Z,{sx:{minWidth:200},children:"Member"}),(0,g.jsx)(k.Z,{sx:{minWidth:100},children:"Status"}),(0,g.jsx)(k.Z,{sx:{minWidth:250},children:"Board"}),(0,g.jsx)(k.Z,{sx:{minWidth:250},children:"Expiration date"})]})}),(0,g.jsx)(w.Z,{children:h.slice(Z*S,Z*S+S).map(((e,a)=>(0,g.jsxs)(f.Z,{hover:!0,onClick:()=>{t("/b/".concat(e.boardID._id),{replace:!0})},sx:{cursor:"pointer",borderTop:"2px solid",borderBottom:"2px solid"},children:[(0,g.jsx)(k.Z,{children:a+1}),(0,g.jsx)(k.Z,{children:(0,g.jsx)(o.Z,{variant:"h5",children:e.task})}),(0,g.jsx)(k.Z,{children:(0,g.jsx)(o.Z,{variant:"h5",children:e.describe})}),(0,g.jsx)(k.Z,{children:e.member!==[]&&(0,g.jsx)("div",{style:{display:"flex",flexWrap:"wrap"},children:e.member.map((e=>(0,g.jsx)(i.Z,{src:e.avatar.data,sx:{width:24,height:24}},e._id)))})}),(0,g.jsx)(k.Z,{children:(0,g.jsx)(o.Z,{variant:"h5",children:M.map((t=>(0,g.jsx)("div",{children:t.id===e.status&&(0,g.jsx)(g.Fragment,{children:t.title})},t.id)))})}),(0,g.jsx)(k.Z,{children:(0,g.jsx)(o.Z,{variant:"h5",children:e.boardID.name})}),(0,g.jsx)(k.Z,{children:e.day&&""!==e.day.startTime&&""!==e.day.expirationDate&&""!==e.day.expirationTime?(0,g.jsxs)(o.Z,{variant:"h5",children:[e.day.startTime," - ",e.day.expirationDate," at ",e.day.expirationTime]}):(0,g.jsx)(o.Z,{variant:"h5",children:"The task has no expiration date"})})]},e._id)))})]})}),(0,g.jsx)(P.Z,{rowsPerPageOptions:[5,10,25,50,100],component:"div",count:h.length,rowsPerPage:S,page:Z,onPageChange:(e,t)=>{b(t)},onRowsPerPageChange:e=>{D(+e.target.value),b(0)}})]})]})]})};const O=new c.Z,R=(0,p.ZP)(u.h,{transports:["websocket","polling"],withCredentials:!0});var G=()=>{const{userId:e}=(0,r.UO)(),t=sessionStorage.getItem("id"),[a,c]=(0,n.useState)({}),[x,m]=(0,n.useState)(!0),[p,u]=(0,n.useState)(!1),j=a=>{O.getByID(a).then((e=>c(e.data[0]))),e!==t&&m(!1)};return(0,n.useEffect)((()=>{j(e),R.on("user",(()=>{j(e)}))}),[e]),(0,g.jsxs)(s.ZP,{children:[(0,g.jsxs)(s.ZP,{container:!0,direction:"column",alignItems:"center",sx:{bgcolor:"rgba(128, 128, 128, 0.1)"},children:[(0,g.jsxs)(s.ZP,{container:!0,justifyContent:"center",alignItems:"center",sx:{my:5},children:[(0,g.jsx)(i.Z,{alt:"profile user",src:a.avatar&&a.avatar.data,sx:{height:120,width:120,mr:2}}),(0,g.jsx)(o.Z,{variant:"h1",children:a.name})]}),(0,g.jsxs)(l.Z,{variant:"text","aria-label":"text button group",sx:{width:"100%",justifyContent:"center"},children:[(0,g.jsx)(d.Z,{disableElevation:!0,onClick:()=>{m(!0)},children:"Personal Infomation"}),(0,g.jsx)(d.Z,{disableElevation:!0,onClick:()=>{m(!1)},children:"Work"}),(0,g.jsx)(d.Z,{disableElevation:!0,disabled:e!==t,onClick:()=>{u(!0)},children:"Edit Profile"})]})]}),!0===x?(0,g.jsx)(b,{}):(0,g.jsx)(W,{}),(0,g.jsx)(h.default,{open:p,onClose:()=>{u(!1)},formData:a})]})}}}]);
//# sourceMappingURL=803.f6210813.chunk.js.map