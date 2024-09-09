import React from 'react'
import Image from 'next/image'

interface IGStoriesProps {
  article: IArticle
}
const GStories: React.FC<IGStoriesProps> = ({ article }) => {
  const formattedDate = new Date(article.publishedAt || 0).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <div
      className={`border border-blue-200 shadow-sm w-[48%] sm:w-[32%] md:w-full`}
    >
      <div className={`relative overflow-hidden w-full h-[150px]`}>
        <Image
          src={article.image || '/images/imageComingSoon.jpg'}
          alt='Article Image'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='hover:scale-105 transition-scale duration-300'
        />
        <div className='absolute bottom-0 right-0 text-gray-50 bg-blue-500 bg-opacity-50 px-2 py-0.5 text-xs min-w-fit'>
          {formattedDate}
        </div>
      </div>
      <div
        className={`w-full text-blue-900 px-3 py-2 font-semibold hover:underline underline-offset-4 text-md`}
      >
        <a href={article.url} target='_blank' rel='noopener noreferrer'>
          {article.title}
        </a>
      </div>
    </div>
  )
}

export default GStories
