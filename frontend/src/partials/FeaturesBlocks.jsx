import React from 'react'

const FeaturesBlocks = () => {
  return (
    <section id='market' className="bg-white dark:bg-gray-900">
    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
      <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        <h2 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-white">
        AI Image Generator is the Future
        </h2>
        <p className="mb-4">
        Now it's AI period. Create amazing artwork by yourself using the power of Fotor's Artificial Intelligence image generator. Turn your imagination into paintings automatically. Try the best AI art generator now.
        </p>
        <p>
        you can join a creative community of unlimited resources
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        <img
          className="w-[284px] rounded-lg h-[394px] object-cover"
          src="http://res.cloudinary.com/dvzct9cdx/image/upload/v1681503405/nkssc9qags3ibhoja3ib.jpg"
          alt="image content 1"
        />
        <img
          className="mt-4 w-[284px] rounded-lg lg:mt-10 h-[394px] object-cover"
          src="http://res.cloudinary.com/dvzct9cdx/image/upload/v1680924621/olsgibrjr0jysalyps1n.png"
          alt="image content 2"
        />
      </div>
    </div>
  </section>
  )
}

export default FeaturesBlocks