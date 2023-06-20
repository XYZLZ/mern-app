import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/solid'

const Header = () => {
  const [open, setOpen] = useState(false);
  const links = [
    {name:'Conmunity', link:'#company'},
    {name:'Features', link:'#features'},
    {name:'Market', link:'#market'},
    {name:'Testimonials', link:'#testimonials'},
    {name:'Plans', link:'#plans'}
  ];
  return (
    <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="https://flowbite.com" className="flex items-center">
          <img
            src={'https://flowbite.com/docs/images/logo.svg'}
            className="mr-3 h-20 sm:h-9 object-cover"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Neutral Art
          </span>
        </a>
        <div className="flex items-center lg:order-2">
          <Link
            to={'/login'}
            className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            Log in
          </Link>
          <Link
            to={'/register'}
            className="landing__btn"
          >
            Get started
          </Link>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            onClick={()=>{setOpen(!open)}}
          >
            <span className="sr-only">Open main menu</span>
            {open ? (
              <XMarkIcon className='w-6 h-6'/>
            ):(
              <Bars3Icon className='w-6 h-6'/>
            )}
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${open ? '' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
          {links.map(link => (
            <li key={link.name}>
              <a href={link.link} onClick={()=> {setOpen(false)}} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">{link.name}</a>
            </li>
          ))}
          </ul>
        </div>
      </div>
    </nav>
  </header>
  )
}

export default Header