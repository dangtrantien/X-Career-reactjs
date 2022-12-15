"use strict";(self.webpackChunkx_career_reactjs=self.webpackChunkx_career_reactjs||[]).push([[245],{14387:function(e,n,t){t(72791);t.p},97754:function(e,n,t){var r=t(64554),s=t(16999),i=t(80184);n.Z=e=>{let{children:n,...t}=e;return(0,i.jsx)(s.Z,{sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1,...t,children:(0,i.jsx)(r.Z,{sx:{p:{xs:2,sm:3,xl:5}},children:n})})}},63907:function(e,n,t){const r=(0,t(66934).ZP)("div")((e=>{let{theme:n}=e;return{backgroundColor:n.palette.primary.light,minHeight:"100vh"}}));n.Z=r},46245:function(e,n,t){t.r(n),t.d(n,{default:function(){return H}});var r=t(43504),s=t(13967),i=t(95193),a=t(61889),o=t(53767),l=t(20890),c=t(94721),d=t(63907),m=t(97754),x=t(72791),h=t(59434),u=t(16871),j=t(64554),p=t(68096),Z=t(94925),g=t(28029),w=t(47071),b=t(63466),f=t(13400),v=t(85523),P=t(94454),y=t(24518),C=t(81724),k=t(92506),I=t(73243),S=t(3746),B=t(20165),q=(t(14387),t(82388)),W=t(62062),_=t.n(W),z=t(54233),A=t(80184);const D=new z.Z;var E=e=>{let{...n}=e;const t=(0,s.Z)(),r=(0,u.s0)(),[c,d]=((0,i.Z)(t.breakpoints.down("md")),(0,h.v9)((e=>e.customization)),(0,x.useState)(!0)),[m,W]=(0,x.useState)(!1),z=()=>{W(!m)},E=e=>{e.preventDefault()};return(0,A.jsx)(A.Fragment,{children:(0,A.jsxs)(a.ZP,{container:!0,direction:"column",justifyContent:"center",spacing:2,children:[(0,A.jsx)(a.ZP,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:(0,A.jsx)(j.Z,{sx:{mb:2},children:(0,A.jsx)(l.Z,{variant:"subtitle1",children:"Sign in with Email address"})})}),(0,A.jsx)(k.J9,{initialValues:{email:"",password:"",submit:null},validationSchema:C.Ry().shape({email:C.Z_().email("Must be a valid email").max(255).required("Email is required."),password:C.Z_().max(255).required("Password is required.")}),onSubmit:e=>{e.password.length<7?_()({text:"Password is required and must have at least 7 characters.",buttons:!1,timer:5e3,icon:"error"}):D.signIn(e.email,e.password).then((e=>{if(!0===e.data.existed){const n=e.data.token,t=e.data.id;sessionStorage.setItem("token",n),sessionStorage.setItem("id",t),q.Z.interceptors.request.use((e=>(e.headers.Authorization="Bearer ".concat(n),e)),(e=>Promise.reject(e))),r("/",{replace:!0})}})).catch((e=>{400===e.request.status?_()({text:"Wrong email or password.",buttons:!1,timer:3e3,icon:"error"}):_()({text:"Sorry, something went wrong. Please contact to admin for support.",buttons:!1,timer:5e3,icon:"error"})}))},children:e=>{let{errors:r,handleBlur:s,handleChange:i,handleSubmit:a,touched:x,values:h}=e;return(0,A.jsxs)("form",{noValidate:!0,onSubmit:a,...n,children:[(0,A.jsxs)(p.Z,{fullWidth:!0,error:Boolean(x.email&&r.email),sx:{...t.typography.customInput},children:[(0,A.jsx)(Z.Z,{htmlFor:"outlined-adornment-email-login",children:"Email Address / Username"}),(0,A.jsx)(g.Z,{id:"outlined-adornment-email-login",type:"email",value:h.email,name:"email",onBlur:s,onChange:i,label:"Email Address / Username",inputProps:{}}),x.email&&r.email&&(0,A.jsx)(w.Z,{error:!0,id:"standard-weight-helper-text-email-login",children:r.email})]}),(0,A.jsxs)(p.Z,{fullWidth:!0,error:Boolean(x.password&&r.password),sx:{...t.typography.customInput},children:[(0,A.jsx)(Z.Z,{htmlFor:"outlined-adornment-password-login",children:"Password"}),(0,A.jsx)(g.Z,{id:"outlined-adornment-password-login",type:m?"text":"password",value:h.password,name:"password",onBlur:s,onChange:i,endAdornment:(0,A.jsx)(b.Z,{position:"end",children:(0,A.jsx)(f.Z,{"aria-label":"toggle password visibility",onClick:z,onMouseDown:E,edge:"end",size:"large",children:m?(0,A.jsx)(S.Z,{}):(0,A.jsx)(B.Z,{})})}),label:"Password",inputProps:{}}),x.password&&r.password&&(0,A.jsx)(w.Z,{error:!0,id:"standard-weight-helper-text-password-login",children:r.password})]}),(0,A.jsxs)(o.Z,{direction:"row",alignItems:"center",justifyContent:"space-between",spacing:1,children:[(0,A.jsx)(v.Z,{control:(0,A.jsx)(P.Z,{checked:c,onChange:e=>d(e.target.checked),name:"checked",color:"primary"}),label:"Remember me"}),(0,A.jsx)(l.Z,{variant:"subtitle1",color:"secondary",sx:{textDecoration:"none",cursor:"pointer"},children:"Forgot Password?"})]}),r.submit&&(0,A.jsx)(j.Z,{sx:{mt:3},children:(0,A.jsx)(w.Z,{error:!0,children:r.submit})}),(0,A.jsx)(j.Z,{sx:{mt:2},children:(0,A.jsx)(I.Z,{children:(0,A.jsx)(y.Z,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Sign in"})})})]})}})]})})},F=t(24904);var H=()=>{const e=(0,s.Z)(),n=(0,i.Z)(e.breakpoints.down("md"));return(0,A.jsx)(d.Z,{children:(0,A.jsx)(a.ZP,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:(0,A.jsx)(a.ZP,{item:!0,xs:12,children:(0,A.jsx)(a.ZP,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:(0,A.jsx)(a.ZP,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:(0,A.jsx)(m.Z,{children:(0,A.jsxs)(a.ZP,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[(0,A.jsx)(a.ZP,{item:!0,sx:{mb:3},children:(0,A.jsx)(r.rU,{to:"/",children:(0,A.jsx)(F.Z,{})})}),(0,A.jsx)(a.ZP,{item:!0,xs:12,children:(0,A.jsx)(a.ZP,{container:!0,direction:n?"column-reverse":"row",alignItems:"center",justifyContent:"center",children:(0,A.jsx)(a.ZP,{item:!0,children:(0,A.jsxs)(o.Z,{alignItems:"center",justifyContent:"center",spacing:1,children:[(0,A.jsx)(l.Z,{color:e.palette.secondary.main,gutterBottom:!0,variant:n?"h3":"h2",children:"Hi, Welcome Back"}),(0,A.jsx)(l.Z,{variant:"caption",fontSize:"16px",textAlign:n?"center":"inherit",children:"Enter your credentials to continue"})]})})})}),(0,A.jsx)(a.ZP,{item:!0,xs:12,children:(0,A.jsx)(E,{})}),(0,A.jsx)(a.ZP,{item:!0,xs:12,children:(0,A.jsx)(c.Z,{})}),(0,A.jsx)(a.ZP,{item:!0,xs:12,children:(0,A.jsx)(a.ZP,{item:!0,container:!0,direction:"column",alignItems:"center",xs:12,children:(0,A.jsx)(l.Z,{component:r.rU,to:"/register",variant:"subtitle1",sx:{textDecoration:"none"},children:"Don't have an account?"})})})]})})})})})})})}}}]);
//# sourceMappingURL=245.598b7e08.chunk.js.map