import React from 'react'
import Image from 'next/image'

interface IarticleCardProps {
  article: IArticle
}
const articlerCard: React.FC<IarticleCardProps> = ({ article }) => {
  const formattedDate = new Date(
    article.publishedAt || article.published || 0
  ).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return (
    <div className='h-[275px] w-[280px] border border-blue-200 cursor-pointer'>
      <div className={`relative overflow-hidden w-full h-[200px]`}>
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
      <div className='flex items-center w-full h-[73px] px-2 bg-blue-50  '>
        <p className='line-clamp-3'> {article.title}</p>
      </div>
    </div>
  )
}

export default articlerCard
