import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import {headerToken} from '../services'
import {Header, HeroHome, Features, FeaturesBlocks, Testimonials, Pricing, Footer, Galery} from '../partials';



const Landing = () => {
    const  navigate = useNavigate();
  
    useEffect(()=>{
    if (headerToken) {
      navigate('/home'); 
    }
  }, [])

  return (
    <div >
      <Header/>
    <HeroHome/>
  
    <Galery/>
  <Features/>

  <FeaturesBlocks/>
  <Testimonials/>
  <Pricing/>
  <Footer/>
</div>


  )
}

export default Landing