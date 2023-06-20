import React from 'react'
import { Link } from 'react-router-dom'
import {HeroImage} from '../images'

const HeroHome = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="grid py-8 px-4 mx-auto max-w-screen-xl lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div className="place-self-center mr-auto lg:col-span-7">
        <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
        Generate unique and creative images
        </h1>
        <p className="mb-6 max-w-2xl font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
        Find the visual resources you need for your designs or unique creations
        </p>
        <Link
          to={'/register'}
          className="inline-flex landing__btn"
        >
          Get started
          <svg
            className="ml-2 -mr-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <a
          href="#plans"
          className="inline-flex justify-center items-center landing__btn  "
        >
          choose your plan
        </a>
      </div>
      <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
        <img
          // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
          src={HeroImage}
          alt="main image"
          
        />
      </div>
    </div>
  </section>
  )
}

export default HeroHome