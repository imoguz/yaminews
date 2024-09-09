'use client'

import React, { useEffect, useState } from 'react'
import SliderCard from './SliderCard'
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md'

interface ITopHeadlinesProps {
  articles_th: IArticle[]
  category: string
}
const TopHeadlines: React.FC<ITopHeadlinesProps> = ({
  category,
  articles_th,
}) => {
  const [sliderData, setSliderData] = useState<IArticle[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(4)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSlidesPerView(Math.min(Math.floor(window.innerWidth / 315), 4))

      const handleResize = () => {
        setSlidesPerView(Math.min(Math.floor(window.innerWidth / 315), 4))
      }

      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  useEffect(() => {
    if (articles_th?.length > slidesPerView) {
      const visibleItems = articles_th.slice(
        startIndex,
        startIndex + slidesPerView
      )
      if (visibleItems.length < slidesPerView) {
        visibleItems.push(
          ...articles_th.slice(0, slidesPerView - visibleItems.length)
        )
      }
      setSliderData(visibleItems)
    } else setSliderData(articles_th)
  }, [articles_th, startIndex, slidesPerView])

  const handlePrev = () => {
    if (articles_th?.length > 0) {
      setStartIndex((prev) =>
        prev - 1 < 0 ? articles_th?.length - 1 : prev - 1
      )
    }
  }

  const handleNext = () => {
    if (articles_th?.length > 0) {
      setStartIndex((prev) => (prev + 1 >= articles_th?.length ? 0 : prev + 1))
    }
  }

  return (
    <React.Fragment>
      <p className='w-full text-2xl font-semibold mb-4 px-3 '>
        {category?.charAt(0).toUpperCase() + category?.slice(1, -3)}
      </p>
      <div className='w-full h-[275px] flex items-center select-none'>
        <MdArrowBackIosNew
          className={`h-20 text-xl w-[30px] ml-1 rounded-l-md hover:bg-blue-200  text-gray-400 hover:text-gray-100 active:text-gray-400 cursor-pointer transition-colors duration-300  ${
            articles_th?.length <= slidesPerView && 'hidden'
          }`}
          onClick={handlePrev}
        />
        <div
          className={`flex h-full flex-1 gap-2
            ${
              articles_th?.length > slidesPerView
                ? 'justify-center'
                : 'justify-start'
            } 
            `}
        >
          {sliderData?.length > 0 &&
            sliderData.map((article, index) => (
              <SliderCard key={index} article={article} />
            ))}
        </div>
        <MdArrowForwardIos
          className={`h-20 text-xl w-[30px] mr-1 rounded-r-md hover:bg-blue-200 text-gray-400 hover:text-gray-100 active:text-gray-400 cursor-pointer transition-colors duration-300  ${
            articles_th?.length <= slidesPerView && 'hidden'
          }`}
          onClick={handleNext}
        />
      </div>
    </React.Fragment>
  )
}

export default TopHeadlines
