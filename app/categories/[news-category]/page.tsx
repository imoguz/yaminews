'use client'

import { useEffect, useState } from 'react'
import MoreStories from '@/components/newsCard/MoreStories'
import TopStories from '@/components/newsCard/TopStories'
import { usePathname } from 'next/navigation'
import { SlArrowUp } from 'react-icons/sl'
import gNewsApi from '@/api/gNewsApi'
import fetchNews from '@/api/fetchNews'
import GStories from '@/components/newsCard/GStories'

export default function NewsCategory() {
  const [articles, setArticles] = useState<IArticle[]>([])
  const [gArticles, setGArticles] = useState<IArticle[]>([])
  const [error, setError] = useState<string | null>(null)
  const newsCategory = usePathname().replace(/\/categories\//g, '')
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchArticles = async () => {
      try {
        const data = await fetchNews(newsCategory)
        setArticles(data as IArticle[])
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError((error as Error).message)
        }
      }
    }

    const fetchGNews = async () => {
      try {
        const data = await gNewsApi(newsCategory)
        setGArticles(data as IArticle[])
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError((error as Error).message)
        }
      }
    }

    fetchGNews()
    fetchArticles()
    return () => abortController.abort()
  }, [newsCategory])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 1500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <main className='min-h-screen max-w-screen-xl mx-auto my-5 px-2'>
      <p className='text-4xl font-semibold mb-3'>
        {newsCategory.charAt(0).toUpperCase() + newsCategory.slice(1)}
      </p>

      <div className='flex flex-col lg:flex-row gap-5 w-full'>
        <div className='flex flex-wrap justify-between gap-y-5 flex-grow'>
          {articles?.length > 0 &&
            articles
              .slice(0, 7)
              .map((article, index) => (
                <TopStories key={index} {...{ article, index }} />
              ))}
        </div>
        <div className='w-full lg:w-[320px] h-full border border-transparent lg:border-blue-200 flex-shrink-0'>
          <p className='text-lg font-semibold px-2 py-3 '>
            Latest Headlines of{' '}
            {newsCategory.charAt(0).toUpperCase() + newsCategory.slice(1)}
          </p>
          <div className='flex flex-row lg:flex-col justify-center gap-3 flex-wrap md:flex-nowrap lg:gap-0'>
            {gArticles?.length > 0 &&
              gArticles.map((article, index) => (
                <GStories key={index} article={article} />
              ))}
          </div>
        </div>
      </div>
      {articles?.length > 7 && (
        <div className='max-w-[800px] mx-auto'>
          <p className='text-3xl font-semibold mb-3 mt-10'>
            More From{' '}
            {newsCategory.charAt(0).toUpperCase() + newsCategory.slice(1)}
          </p>
          {articles.slice(7).map((article, index) => (
            <div key={index}>
              <MoreStories {...{ article }} />
              {index < articles.length - 8 && (
                <hr className='my-2 border-blue-200' />
              )}
            </div>
          ))}
        </div>
      )}
      <div
        className={`fixed z-[500] overflow-hidden h-[72px] right-2 md:right-10 flex flex-col gap-1 items-center text-center shadow-sm w-min px-2 py-1 text-xs rounded-t-md cursor-pointer text-gray-100 bg-gray-600 bg-opacity-75 hover:bg-gray-700 active:bg-gray-600  transition-all duration-300  ${
          showScrollToTop ? '-bottom-2' : '-bottom-24'
        }`}
        onClick={scrollToTop}
      >
        <SlArrowUp className='text-lg' />
        RETURN TO TOP
      </div>
    </main>
  )
}
