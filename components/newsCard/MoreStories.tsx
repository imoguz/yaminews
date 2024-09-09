import Image from 'next/image'
import React from 'react'

interface IMoreStoriesProps {
  article: IArticle
}
const MoreStories: React.FC<IMoreStoriesProps> = ({ article }) => {
  const formattedDate = new Date(article.publishedAt || 0).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <div className='flex flex-col sm:flex-row gap-3 text-xs text-gray-700 px-2'>
      <div className='max-w-28 mt-1.5 order-2 sm:order-1'>{formattedDate}</div>
      <div className='max-w-[500px] order-3 sm:order-2'>
        <a
          className='text-xl font-semibold hover:underline'
          href={article.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {article.title}
        </a>
        <p>{article.description}</p>
        <p>By {article.author || 'publisher'}</p>
      </div>
      <div className='relative overflow-hidden w-full sm:w-[200px] h-52 sm:h-[120px] order-1 sm:order-3'>
        <Image
          src={article.image || '/images/imageComingSoon.jpg'}
          alt='Article Image'
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          priority
          className='hover:scale-105 transition-scale duration-300'
        />
      </div>
    </div>
  )
}

export default MoreStories
