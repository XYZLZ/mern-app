import React from 'react'
import Done from '../images/done.svg'
import {Link, useLocation} from 'react-router-dom'
import {PaypalPayment} from '../components'
import {headerToken} from '../services'

const Pricing = () => {
    const location = useLocation();
    return (
        <section id='plans' className="bg-white dark:bg-gray-900">


            <div className="min-h-screen flex justify-center items-center flex-col">
        <div className="">
            <div className="text-center font-semibold">
                <h1 className="text-5xl">
                    <span className="text-blue-700 tracking-wide">Flexible </span>
                    <span className='dark:text-white'>Plans</span>
                </h1>
                <p className="pt-6 text-xl text-gray-400 font-normal w-full px-8 md:w-full">
                    Choose a plan that works best for you 
                </p>
            </div>
            <div className="pt-24 flex flex-col md:flex-row  xs:gap-36 md:gap-10">
                {/* <!-- Basic Card --> */}
                <div className="dark:bg-gray-900 dark:border-4 w-72 ml-14 p-8 xs:w-96 xs:ml-0 md:w-72 xl:w-96 bg-white text-center rounded-3xl pr-16 shadow-xl xs:self-center">
                    <h1 className="text-black dark:text-white font-semibold text-2xl">Basic</h1>
                    <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top">$ </span>
                        <span className="text-3xl font-semibold dark:text-white">Free</span>
                        <span className="text-gray-400 font-medium">/ user</span>
                    </p>
                    <hr className="mt-4 border-1"/>
                    <div className="pt-8">
                        <p className="font-semibold text-gray-400 text-left">
                            
                            <img src={Done} className=" align-middle inline-block dark:invert" />    
                            <span className="pl-2">
                            Community made  <span className="text-black dark:text-white">content</span>
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                        <img src={Done} className=" align-middle inline-block dark:invert" />
                            <span className="pl-2">
                            Limited use of  <span className="text-black dark:text-white">AI</span>
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                        <img src={Done} className=" align-middle inline-block dark:invert" />
                            <span className="pl-2">
                                <span className="text-black dark:text-white">upload</span> and share content
                            </span>
                        </p>

                        {headerToken && location.pathname != '/' ? (
                            <Link to={'/register'} className=''>
                            <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                                <span className="font-medium">
                                    Actual Plan
                                </span>
                            
                            </p>
                        </Link>
                        ):(
                            <Link to={'/register'}>
                            <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white">
                                <span className="font-medium">
                                    Choose Plan
                                </span>
                            
                            </p>
                        </Link>
                        )}
                    </div>
                </div>
                {/* <!-- StartUp Card --> */}
                <div className="dark:bg-white dark:border-0 w-72 ml-14 p-8 xs:w-96 xs:ml-0 md:w-72 xl:w-96 bg-gray-900 text-center rounded-3xl text-white border-4 shadow-xl border-white transform  xs:self-center  md:transform md:scale-110">
                    <h1 className="text-white font-semibold text-2xl dark:invert">Creator</h1>
                    <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top">$ </span>
                        <span className="text-3xl font-semibold dark:invert">24</span>
                        <span className="text-gray-400 font-medium dark:invert">/ user</span>
                    </p>
                    <hr className="mt-4 border-1 border-gray-600"/>
                    <div className="pt-8">
                        <p className="font-semibold text-gray-400 text-left">
                        <img src={Done} className=" align-middle inline-block invert dark:invert-0" />
                            <span className="pl-2">
                                All features in <span className="text-white dark:invert">Basic</span>
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                        <img src={Done} className=" align-middle inline-block invert dark:invert-0" />
                            <span className="pl-2">
                            <span className="text-white dark:invert">Extended</span> use of AI
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                        <img src={Done} className=" align-middle inline-block invert dark:invert-0" />
                            <span className="pl-2">
                                <span className="text-white dark:invert">15 TB</span> cloud storage
                            </span>
                        </p>

                        {headerToken && location.pathname != '/' ? (
                            <div className='mt-4'>
                                <PaypalPayment typePlan={'Creator'} price={'24.00'}/>
                            </div>
                        ):(
                            <Link to={'/register'}> 
                            <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white"> 
                                <span className="font-medium"> 
                                Choose plan                                    
                            </span> 
                            
                            </p> 
                        </Link> 
                        )}
                        
                    </div>
                    <div className="absolute top-4 right-4">
                        <p className="bg-blue-700 font-semibold px-4 py-1 rounded-full uppercase text-xs">Popular</p>
                    </div>
                </div>
                {/* <!-- Enterprise Card --> */}
                <div className="dark:bg-gray-900 dark:border-4 w-72 ml-14 p-8 xs:w-96 xs:ml-0 md:w-72 xl:w-96 bg-white text-center rounded-3xl pl-16 shadow-xl xs:self-center">
                    <h1 className="text-black font-semibold text-2xl dark:text-white">Enterprise</h1>
                    <p className="pt-2 tracking-wide">
                        <span className="text-gray-400 align-top">$ </span>
                        <span className="text-3xl font-semibold dark:text-white">35</span>
                        <span className="text-gray-400 font-medium">/ user</span>
                    </p>
                    <hr className="mt-4 border-1"/>
                    <div className="pt-8">
                        <p className="font-semibold text-gray-400 text-left">
                        <img src={Done} className=" align-middle inline-block dark:invert" />
                            <span className="pl-2">
                                All features in <span className="text-black dark:text-white">Creator</span>
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                        <img src={Done} className=" align-middle inline-block dark:invert" />
                            <span className="pl-2">
                                <span className="text-black dark:text-white">Unlimited</span> use of AI
                            </span>
                        </p>
                        <p className="font-semibold text-gray-400 text-left pt-5">
                        <img src={Done} className=" align-middle inline-block dark:invert" />
                            <span className="pl-2">
                                <span className="text-black dark:text-white">Unlimited</span> cloud storage
                            </span>
                        </p>
                        {headerToken && location.pathname != '/' ? (
                            <div className='mt-4'>
                                <PaypalPayment typePlan={'Enterprice'} price={'35.00'}/>
                            </div>
                        ):(
                            <Link to={'/register'}> 
                            <p className="w-full py-4 bg-blue-600 mt-8 rounded-xl text-white"> 
                                <span className="font-medium"> 
                                Choose plan                                    
                            </span> 
                            
                            </p> 
                        </Link> 
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    </div>





        
    </section>
    )
}

export default Pricing