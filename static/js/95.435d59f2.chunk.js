"use strict";(self.webpackChunkx_career_reactjs=self.webpackChunkx_career_reactjs||[]).push([[95,259],{54259:function(e,r,n){n.r(r);var t=n(72791),a=n(5289),s=n(64554),i=n(65661),o=n(94721),l=n(39157),c=n(61889),d=n(20890),x=n(28029),m=n(10765),h=n(85523),p=n(61419),j=n(24518),g=n(62062),Z=n.n(g),u=n(54233),v=n(9707),y=n(26594),f=n(73243),P=n(44428),b=n(39910),I=n(80184);const w=new u.Z,C=(0,P.ZP)(b.h);r.default=e=>{const{open:r,onClose:n,formData:g}=e,[u,P]=(0,t.useState)({}),b=()=>{n(!r)},E=e=>{const r=e.target.name,n=e.target.value;P({...u,[r]:n})};return(0,t.useEffect)((()=>{P(g)}),[g]),(0,I.jsx)(I.Fragment,{children:(0,I.jsx)(a.Z,{open:r,onClose:b,scroll:"body",children:(0,I.jsxs)(s.Z,{component:"form",onSubmit:async e=>{e.preventDefault();const t=new FormData(e.currentTarget),a={name:t.get("name"),email:t.get("email"),gender:t.get("gender"),group:t.get("group"),position:t.get("position"),address:t.get("address")};if(""!==t.get("avatar").name){const e=await(0,y.Z)(t.get("avatar"));"image/"===e.type.match(/[^:/]\w+\//)[0]?(a.avatar=e,w.updateByID(u._id,a).then((e=>{!0===e.data.success&&(C.emit("user",e.data.data),Z()({text:"Successfully updated profile.",buttons:!1,timer:3e3,icon:"success"}),setTimeout((()=>{n(!r)}),3e3))})).catch((()=>{Z()({text:"Sorry, something went wrong. Please contact to admin for support.",buttons:!1,timer:5e3,icon:"error"})}))):Z()({text:"Wrong file's type, please choose only image.",buttons:!1,timer:3e3,icon:"warning"})}else w.updateByID(u._id,a).then((e=>{!0===e.data.success&&(C.emit("user",e.data.data),Z()({text:"Successfully updated profile.",buttons:!1,timer:3e3,icon:"success"}),setTimeout((()=>{n(!r)}),3e3))})).catch((()=>{Z()({text:"Sorry, something went wrong. Please contact to admin for support.",buttons:!1,timer:5e3,icon:"error"})}))},noValidate:!0,sx:{mt:1},children:[(0,I.jsx)(i.Z,{sx:{textAlign:"center"},color:"primary",variant:"h2",children:"Edit profile"}),(0,I.jsx)(o.Z,{sx:{borderBottom:"1px solid"}}),(0,I.jsxs)(l.Z,{spacing:2,children:[(0,I.jsxs)(c.ZP,{container:!0,alignItems:"center",children:[(0,I.jsx)(d.Z,{sx:{mr:9},color:"primary",variant:"h5",children:"Avatar:"}),(0,I.jsx)(v.Z,{defaultValue:u.avatar.data,name:"avatar"})]}),(0,I.jsxs)(c.ZP,{container:!0,alignItems:"center",sx:{height:70},children:[(0,I.jsx)(d.Z,{sx:{mr:2},color:"primary",variant:"h5",children:"Display name:"}),(0,I.jsx)(x.Z,{id:"name",type:"text",value:u.name,name:"name",onChange:E,placeholder:"Enter display name"})]}),(0,I.jsxs)(c.ZP,{container:!0,alignItems:"center",sx:{height:70},children:[(0,I.jsx)(d.Z,{sx:{mr:2},color:"primary",variant:"h5",children:"Email address:"}),(0,I.jsx)(x.Z,{id:"email",type:"email",value:u.email,name:"email",onChange:E,placeholder:"Enter email address"})]}),(0,I.jsxs)(c.ZP,{container:!0,alignItems:"center",sx:{height:70},children:[(0,I.jsx)(d.Z,{sx:{mr:8},color:"primary",variant:"h5",children:"Gender:"}),(0,I.jsxs)(m.Z,{row:!0,name:"gender",value:u.gender,onChange:E,children:[(0,I.jsx)(h.Z,{value:"Female",control:(0,I.jsx)(p.Z,{}),label:"Female"}),(0,I.jsx)(h.Z,{value:"Male",control:(0,I.jsx)(p.Z,{}),label:"Male"})]})]}),(0,I.jsxs)(c.ZP,{container:!0,alignItems:"center",sx:{height:70},children:[(0,I.jsx)(d.Z,{sx:{mr:8},color:"primary",variant:"h5",children:"Group:"}),(0,I.jsx)(x.Z,{id:"group",type:"text",value:u.group,name:"group",onChange:E,placeholder:"Enter group"})]}),(0,I.jsxs)(c.ZP,{container:!0,alignItems:"center",sx:{height:70},children:[(0,I.jsx)(d.Z,{sx:{mr:6},color:"primary",variant:"h5",children:"Position:"}),(0,I.jsx)(x.Z,{id:"position",type:"text",value:u.position,name:"position",onChange:E,placeholder:"Enter position"})]}),(0,I.jsxs)(c.ZP,{container:!0,alignItems:"center",sx:{height:70},children:[(0,I.jsx)(d.Z,{sx:{mr:6},color:"primary",variant:"h5",children:"Address:"}),(0,I.jsx)(x.Z,{id:"address",type:"text",name:"address",value:u.address,onChange:E,placeholder:"Enter address"})]}),(0,I.jsxs)(c.ZP,{container:!0,alignItems:"center",justifyContent:"space-around",sx:{mt:4},children:[(0,I.jsx)(f.Z,{sx:{mr:4},children:(0,I.jsx)(j.Z,{disableElevation:!0,size:"large",onClick:b,variant:"contained",color:"secondary",children:"Cancel"})}),(0,I.jsx)(f.Z,{children:(0,I.jsx)(j.Z,{disableElevation:!0,size:"large",type:"submit",variant:"contained",color:"primary",children:"Save"})})]})]})]})})})}},89095:function(e,r,n){n.r(r);var t=n(72791),a=n(61889),s=n(93044),i=n(53767),o=n(20890),l=n(24518),c=n(94721),d=n(54233),x=n(73243),m=n(54259),h=n(44428),p=n(39910),j=n(80184);const g=new d.Z,Z=(0,h.ZP)(p.h);r.default=()=>{const[e,r]=(0,t.useState)(!1),[n,d]=(0,t.useState)({name:"",email:"",avatar:{name:"",data:""},gender:"",group:"",position:"",address:""}),h=sessionStorage.getItem("id"),p=e=>{g.getByID(e).then((e=>d(e.data[0])))};return(0,t.useEffect)((()=>{p(h),Z.on("user",(()=>{p(h)}))}),[h]),(0,j.jsx)(j.Fragment,{children:(0,j.jsxs)(a.ZP,{container:!0,width:"100%",children:[(0,j.jsxs)(a.ZP,{container:!0,direction:"column",justifyContent:"space-between",alignItems:"center",sx:{width:"100%",height:"50%",bgcolor:"rgba(128, 128, 128, 0.1)"},children:[(0,j.jsxs)(a.ZP,{container:!0,justifyContent:"center",alignItems:"center",sx:{pt:15},children:[(0,j.jsx)(s.Z,{alt:"profile user",src:n.avatar.data,sx:{height:120,width:120,mr:2}}),(0,j.jsx)(a.ZP,{item:!0,sx:{mr:2},children:(0,j.jsxs)(i.Z,{spacing:2,children:[(0,j.jsx)(o.Z,{color:"grey[900]",variant:"h1",children:void 0===n.name?n.email:n.name}),(0,j.jsxs)(o.Z,{variant:"h5",color:"secondary",children:["ID: ",h]})]})})]}),(0,j.jsxs)(a.ZP,{container:!0,justifyContent:"space-between",alignItems:"center",sx:{width:"100%",pt:5,px:50},children:[(0,j.jsx)(o.Z,{color:"primary",variant:"h2",children:"Personal Information"}),(0,j.jsx)(x.Z,{children:(0,j.jsx)(l.Z,{disableElevation:!0,onClick:()=>{r(!0)},variant:"contained",color:"primary",children:"Edit Profile"})})]})]}),(0,j.jsx)(m.default,{open:e,onClose:()=>{r(!1)},formData:n}),(0,j.jsx)(a.ZP,{item:!0,sx:{width:"100%",mt:5,px:50},children:(0,j.jsxs)(i.Z,{spacing:2,sx:{mx:10},children:[(0,j.jsxs)(a.ZP,{container:!0,alignItems:"center",children:[(0,j.jsx)(o.Z,{sx:{mr:2},color:"primary",variant:"h5",children:"Display name:"}),(0,j.jsx)(o.Z,{variant:"h5",children:void 0===n.name?n.email:n.name})]}),(0,j.jsx)(c.Z,{sx:{borderBottom:"1px solid"}}),(0,j.jsxs)(a.ZP,{container:!0,alignItems:"center",children:[(0,j.jsx)(o.Z,{sx:{mr:8},color:"primary",variant:"h5",children:"Email:"}),(0,j.jsx)(o.Z,{variant:"h5",children:n.email})]}),(0,j.jsx)(c.Z,{sx:{borderBottom:"1px solid"}}),(0,j.jsxs)(a.ZP,{container:!0,alignItems:"center",children:[(0,j.jsx)(o.Z,{sx:{mr:7},color:"primary",variant:"h5",children:"Gender:"}),(0,j.jsx)(o.Z,{variant:"h5",children:n.gender})]}),(0,j.jsx)(c.Z,{sx:{borderBottom:"1px solid"}}),(0,j.jsxs)(a.ZP,{container:!0,alignItems:"center",children:[(0,j.jsx)(o.Z,{sx:{mr:8},color:"primary",variant:"h5",children:"Group:"}),(0,j.jsx)(o.Z,{variant:"h5",children:n.group})]}),(0,j.jsx)(c.Z,{sx:{borderBottom:"1px solid"}}),(0,j.jsxs)(a.ZP,{container:!0,alignItems:"center",children:[(0,j.jsx)(o.Z,{sx:{mr:6},color:"primary",variant:"h5",children:"Position:"}),(0,j.jsx)(o.Z,{variant:"h5",children:n.position})]}),(0,j.jsx)(c.Z,{sx:{borderBottom:"1px solid"}}),(0,j.jsxs)(a.ZP,{container:!0,alignItems:"center",children:[(0,j.jsx)(o.Z,{sx:{mr:6},color:"primary",variant:"h5",children:"Address:"}),(0,j.jsx)(o.Z,{variant:"h5",children:n.address})]})]})})]})})}}}]);
//# sourceMappingURL=95.435d59f2.chunk.js.map