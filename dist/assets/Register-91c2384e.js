import{u,r as i,h as p,j as e,a as s,c as g,b as f}from"./index-9105bffc.js";const b=()=>{const m=u(),[r,d]=i.useState({user:"",email:"",pass:""}),[o,c]=i.useState("");i.useEffect(()=>{p&&m("/home")},[]);const h=async t=>{t.preventDefault();try{const n=`${f}user`,a=await(await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).json();return a.error?(console.log(a.error.message),c(a.error.message)):a.message?c(a.message):console.log(a),a.newUser&&m(`/confirmR?userEmail=${a.newUser.email}`),a}catch(n){console.log(n.message)}},l=({currentTarget:t})=>{d({...r,[t.name]:t.value})};return e("div",{className:"w-full h-screen overflow-hidden dark:bg-gray-800",children:s("div",{className:"mt-8 sm:mx-auto sm:w-full sm:max-w-md",children:[e("h1",{className:"text-center text-black font-bold  text-3xl mb-6 dark:text-white",children:"Register"}),s("div",{className:"bg-white py-8 px-6 shadow rounded-lg sm:px-10 dark:bg-gray-700",children:[s("form",{method:"post",className:"mb-0 space-y-6",onSubmit:h,children:[s("div",{children:[e("label",{htmlFor:"user",className:"form__label font-medium",children:"Username"}),e("div",{className:"mt-1",children:e("input",{type:"text",name:"user",value:r.user,className:"form__input",onChange:l,required:!0})})]}),s("div",{children:[e("label",{htmlFor:"email",className:"form__label font-medium",children:"Email Address"}),e("div",{className:"mt-1",children:e("input",{type:"email",name:"email",value:r.email,className:"form__input",onChange:l,required:!0})})]}),s("div",{children:[e("label",{htmlFor:"pass",className:"form__label font-medium",children:"Password"}),e("div",{className:"mt-1",children:e("input",{type:"password",value:r.pass,name:"pass",className:"form__input",onChange:l,required:!0})})]}),e("div",{children:s("div",{className:"mt-1",children:[e("button",{type:"submit",className:"form__btn",children:"Sign Up"}),o&&e("div",{className:"error_msg font-medium",children:o})]})})]}),s("p",{className:"text-center mt-6 text-gray-800 dark:text-white",children:["Already Registered? ",e(g,{to:"/login",className:"text-[var(--primary)] hover:opacity-80",children:"Login"})]})]})]})})};export{b as default};