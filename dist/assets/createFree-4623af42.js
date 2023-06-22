import{r as l,u as N,h as m,j as t,F as S,a as r,b as h,S as s}from"./index-9105bffc.js";import{p as j}from"./preview-16f2a924.js";import{c as C}from"./index-80b1f8a7.js";import{F as n}from"./FormField-6c9d36c9.js";const O=()=>{const[f,u]=l.useState(!1),[y,c]=l.useState(!1),g=N(),x=async o=>{try{const i=await(await fetch(`${h}user/id`,{headers:{authorization:`Bearer ${m}`}})).json(),{user:b}=i.data;p({name:b})}catch(a){console.log(a)}};l.useEffect(()=>{m||g("/login"),x()},[]);const[e,p]=l.useState({name:"",photo:"",prompt:"",photoName:"",category:""}),d=async o=>p({...e,[o.target.name]:o.target.value}),w=async o=>{const a=o.target.files[0];if(a.size>1048576)return o.target.value="",s("Wrong size","the maximum size is 1MB","warning",5e3),!1;if(a.type=="image/jpeg"||a.type=="image/png"||a.type=="image/jpeg"){const i=await C(o.target.files[0]);p({...e,photo:i})}else return s("Wrong file","this type of file is not allowed. Only jpg/jpeg/png files","warning",5e3),o.target.value="",!1},v=async o=>{if(o.preventDefault(),e.prompt&&e.photo&&e.photoName){if(c(!0),e.category=="none"||e.category==null)return c(!1),s("Category","select a category","warning",4e3);try{await(await fetch(`${h}post`,{method:"POST",headers:{"Content-Type":"application/json",authorization:`Bearer ${m}`},body:JSON.stringify({...e,isGlobal:!1,isWithAI:!1})})).json(),alert("Image created successfully")}catch(a){console.log(a)}finally{c(!1)}}else s("Warning","please enter a prompt and upload an image","warning",7e3)};return t(S,{children:r("section",{className:"max-w-7xl mx-auto",children:[r("div",{children:[t("h1",{className:"font-extrabold text-[#222328] text-[32px] text-center mt-5",children:" Create"}),t("p",{className:"mt-2 text-[#666e75] text-[16px] max-w[500px] text-center ",children:"Upload imaginative image  and share it with the community"})]}),r("form",{method:"post",className:"mt-16 max-w text-3xl",onSubmit:async o=>{if(o.preventDefault(),e.prompt&&e.photo&&e.photoName&&(e.category!="none"||e.category!=null)){u(!0);try{(await(await fetch(`${h}post`,{method:"POST",headers:{"Content-Type":"application/json",authorization:`Bearer ${m}`},body:JSON.stringify({...e,isGlobal:!0})})).json()).success&&g("/home")}catch(a){console.log(a)}finally{u(!1)}}else s("Warning","please enter a prompt and upload an image","warning",7e3)},children:[r("div",{className:"flex flex-col gap-5",children:[t(n,{isDisabled:!0,LabelName:"User Name",type:"text",name:"name",placeholder:"Write your name",value:e.name}),t(n,{LabelName:"Photo Name",type:"text",name:"photoName",placeholder:"Write the name for your image",value:e.photoName,handleChange:d}),t(n,{isMultiple:!0,LabelName:"Category",name:"category",value:e.category,handleChange:d}),t(n,{LabelName:"prompt",type:"text",name:"prompt",placeholder:"Write your prompt",value:e.prompt,handleChange:d}),t("div",{className:"relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64  flex items-center justify-center",children:e.photo?t("img",{src:e.photo,alt:e.prompt,className:"w-full h-full object-contain"}):t("img",{src:j,alt:"preview",className:"w-9/12 object-contain opacity-40"})})]}),t("div",{className:"mt-5 flex gap-5",children:t(n,{type:"file",className:"text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center",handleChange:w})}),r("div",{className:"mt-10",children:[t("p",{className:"mt-2 text-[#666e75] text-[14px]",children:"** Once you have created the image you want, you can share it with others in the community **"}),t("button",{type:"submit",id:"share",className:"mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center",children:f?"Sharing...":"Share with the Community"}),t("button",{type:"submit",id:"privatePost",onClick:v,className:"mt-3 ml-5 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center",children:y?"Saving...":"Save"})]})]})]})})};export{O as default};