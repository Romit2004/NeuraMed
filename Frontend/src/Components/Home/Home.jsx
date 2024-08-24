import React, { useState } from 'react'
import Diseases from '../Diseases/Diseases';

import '@fortawesome/fontawesome-free/css/all.min.css';
//import Diseases from '../Diseases/Diseases';




const Home = () => {





  return (
    <div className='h-full w-full relative flex justify-center mt-5 flex-col'>

      {/* <div>

        </div>
        <div className='h-100 w-60 bg-none'>
          <img src="public\doctor2.png" alt="Image" className='bottom-0 translate-y-80'/>
        </div> */}
      {/* <div className="relative w-full"> */}
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 h-[86vh] w-[75%] p-[20px] z-10 flex relative rounded-2xl border border-neutral-50 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg mb-12 shadow-3xl" id="box">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          {/* <svg
            width="30"
            height="36"
            viewBox="0 0 50 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
              fill="black"
            />
          </svg> */}
          {/* <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
            <div className="rounded-full bg-white p-1 px-2">
              <p className="text-sm font-medium">We&apos; hiring</p>
            </div>
            <p className="text-sm font-medium">Join our team &rarr;</p>
          </div> */}
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-6xl">
            People who care about your growth
          </h1>
          <p className="mt-8 text-lg text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur modi blanditiis
            dolores quasi eaque explicabo!
          </p>
          {/* <form action="" className="mt-8 flex items-start space-x-2">
            <div>
              <input
                className="flex w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Enter your email"
                id="email"
              ></input>
              <p className="mt-2 text-sm text-gray-500">We care about your privacy</p>
            </div>
            <div>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Subscribe
              </button>
            </div>
          </form> */}
          <button
            type="button"
            className="rounded-md bg-white bg-opacity-10 border-white border-2 mt-6 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Search
          </button>
        </div>
        {/* <div className="lg:col-span-5 lg:-mr-8 xl:col-span-6 flex justify-center">
          <img
            className="bg-none object-cover lg:h-[46vh] xl:aspect-[16/9] sm:h-[23vh] translate-y-10"
            src="public/doctor2.png"
            alt=""
          />
        </div> */}
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
    // </div>


  )
}
// "before:content-[''] before:absolute before:flex before:w-[330px]"
export default Home
