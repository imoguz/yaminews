import React from 'react'
import Image from 'next/image'

interface ITopStoriesProps {
  article: IArticle
  index: number
}
const TopStories: React.FC<ITopStoriesProps> = ({ article, index }) => {
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
      className={`border border-blue-200 hover:border-blue-300 shadow-sm ${
        index === 0
          ? 'w-full'
          : index < 3
          ? 'w-[calc(50%-10px)]'
          : 'w-[calc(50%-10px)] sm:w-[calc(25%-15px)]'
      }`}
    >
      <div
        className={`relative w-full ${
          index === 0 ? 'h-[450px]' : index < 3 ? 'h-[275px]' : 'h-[150px]'
        }`}
      >
        <Image
          src={article.image || '/images/imageComingSoon.jpg'}
          alt='Article Image'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority={index === 0 ? true : false}
        />
        <div className='absolute bottom-0 right-0 text-gray-50 bg-blue-500 bg-opacity-50 px-2 py-0.5 text-xs min-w-fit'>
          {formattedDate}
        </div>
      </div>
      <div
        className={`w-full text-blue-900 px-3 py-2 font-semibold hover:underline underline-offset-4 ${
          index === 0 ? 'text-3xl' : index < 3 ? 'text-xl' : 'text-md'
        }`}
      >
        <a href={article.url} target='_blank' rel='noopener noreferrer'>
          {article.title}
        </a>
      </div>
    </div>
  )
}

export default TopStories
