import React, {useEffect, useState} from 'react'
import {Card} from '../components'
import {api_url} from '../services'

const RenderCards = ({data, title}) => {
  if (data?.length > 0) {
      return data.map(post => <Card key={post._id} {...post} idInfo={post._id}/>)
  }

  return (
      <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>
          {title}
      </h2>
  )
}



const Galery = () => {
  const [allPost, setAllPost] = useState(null);


  const fetchPosts = async()=> {
      

    try {
        const res = await fetch(`${api_url}post/public`);
  
        if (res.ok) {
            const result = await res.json();
            console.log(result.data);
            setAllPost(result.data.docs.reverse());
        }
    } catch (error) {
        
        console.log(error);
    }
  
  }

  useEffect(()=> {
      fetchPosts()
  }, [])

    return (
      <section id='company' className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <h2 className="mb-8 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 lg:mb-16 dark:text-white md:text-4xl">
        See the latest images from our creators 
        </h2>
        <div className='mt-10'>

                    <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-1 gap-3'>
                      <RenderCards data={allPost} title="No post found"/>  
                    </div> 
            </div>
      </div>
    </section>
    )
}


export default Galery