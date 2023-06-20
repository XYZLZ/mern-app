import React from "react";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  Square3Stack3DIcon,
  PresentationChartLineIcon,
  Cog8ToothIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";

const Features = () => {
  return (
    <section id="features" className="bg-gray-50 dark:bg-gray-800">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mb-8 max-w-screen-md lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
            Fuel your imagination
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Visualize new ideas by adding keywords that inspire you, then watch
            your words come to life.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <PresentationChartLineIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:invert" />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Power up your proyects
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              find a large number of visual resources to enrich your projects.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <Square3Stack3DIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:invert" />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Minimalist
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              we provide you with an intuitive interface to create and navigate.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <UserGroupIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:invert" />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Community
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Join a great community of creators.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <CurrencyDollarIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:invert" />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Accessible
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Plans accessible to anyone. while you focus on your creative
              freedom
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <RectangleStackIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:invert" />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Enterprise Design
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Create beautiful experiences for both marketing and products with
              the resources of the community.
            </p>
          </div>
          <div>
            <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
              <Cog8ToothIcon className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300 dark:invert" />
            </div>
            <h3 className="mb-2 text-xl font-bold dark:text-white">Support</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Platform support from our experts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
