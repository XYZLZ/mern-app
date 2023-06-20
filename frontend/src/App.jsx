import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import {
//   CreatePost,
//   Home,
//   Login,
//   Register,
//   Landing,
//   Profile,
//   myPost,
//   imageInfo,
//   CreateFree,
//   Plans,
//   ConfirmRegister,
// } from "./pages";
const CreatePost = lazy(()=> import('./pages/CreatePost'));
const Home = lazy(()=> import('./pages/Home'));
const Login = lazy(()=> import('./pages/Login'));
const Register = lazy(()=> import('./pages/Register'));
const Landing = lazy(()=> import('./pages/Landing'));
const Profile = lazy(()=> import('./pages/Profile'));
const myPost = lazy(()=> import('./pages/myPost'));
const imageInfo = lazy(()=> import('./pages/imageInfo'));
const CreateFree = lazy(()=> import('./pages/CreateFree'));
const Plans = lazy(()=> import('./pages/Plans'));
const ConfirmEmail = lazy(()=> import('./pages/ConfirmEmail'));
const NotFound = lazy(()=> import('./pages/NotFound'));
const ConfirmRegister = lazy(()=> import('./pages/ConfirmRegister'));

import "./index.css";
import { Loader } from "./components";

function App() {
  return (
    <>
      <Suspense fallback={<Loader className={'flex justify-center items-center min-h-screen'}/>}>
        <BrowserRouter>
          {/* <main className='sm:p-8 px-4 py-8 w-full relative bg-[#f9fafe] min-h-[calc(100vh-73px)]'> */}
          <Routes>
            <Route exact path="/" Component={Landing} />
            <Route path="/home" Component={Home} />
            <Route path="/create-post" Component={CreatePost} />
            <Route path="/create-free" Component={CreateFree} />
            <Route path="/profile" Component={Profile} />
            <Route path="/my-post" Component={myPost} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/image/:id" Component={imageInfo} />
            <Route path="/plans" Component={Plans} />
            <Route path="/confirmR" Component={ConfirmRegister} />
            <Route path="/confirm" Component={ConfirmEmail} />
            <Route path="*" Component={NotFound} />
          </Routes>
          {/* </main> */}
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
