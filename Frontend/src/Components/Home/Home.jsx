import React, { useState } from 'react'
import Diseases from '../Diseases/Diseases';

import '@fortawesome/fontawesome-free/css/all.min.css';





const Home = () => {





  return (
    <div className='h-full w-full relative flex justify-center mt-5 flex-col'>

      
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 h-[86vh] w-[75%] p-[20px] z-10 flex relative rounded-2xl border border-neutral-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg mb-12 shadow-3xl" id="box">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
         
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-6xl">
            People who care about your growth
          </h1>
          <p className="mt-8 text-lg text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur modi blanditiis
            dolores quasi eaque explicabo!
          </p>
          
          <button
            type="button"
            className="rounded-md bg-white bg-opacity-10 border-white border-2 mt-6 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Search
          </button>
        </div>
        
        <div className='h-[60vh] w-60  flex justify-center items-center translate-x-32'>
          <img src="public\doctor2.png" alt="Image" className='aspect-[16/9] bg-none object-cover lg:aspect-[16/9] lg:h-[46vh] xl:aspect-[16/9]  translate-y-40  h-[60vh] w-[60vh] sm:h-0' />
        </div>
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-6xl mx-auto mt-12 mb-12">
        Diseases
      </h1>
      <div 
      data-aos="zoom-in"
    
      >
    <Diseases />
      </div>

 

    </div>
   

  )
}

export default Home
