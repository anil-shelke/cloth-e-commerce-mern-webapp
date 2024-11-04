import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text2={'US'}/>
    </div>

    <div className='mu-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit accusantium necessitatibus placeat provident error quibusdam debitis velit libero magnam ex Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid recusandae?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid recusandae unde repudiandae corrupti! Nostrum at ducimus dolorem quas atque Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit accusantium necessitatibus placeat.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta commodi suscipit enim cumque quo, tempora quos deleniti ex ab officiis.</p>
        </div>
    </div>


    <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
    </div>

    <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className=' px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className=' px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-freindly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className=' px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
    </div>

    <NewsletterBox/>

    </div>
  )
}

export default About
