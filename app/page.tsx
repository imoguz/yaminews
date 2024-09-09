'use client'

import { useEffect, useState } from 'react'
import TopStories from '@/components/newsCard/TopStories'
import { SlArrowUp } from 'react-icons/sl'
import fetchNews from '@/api/fetchNews'
import TopHeadlines from '@/components/newsSlider/TopHeadlines'

export default function Home() {
  const [error, setError] = useState<string | null>(null)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [articles, setArticles] = useState<{ [key: string]: IArticle[] }>({})

  const th_Categories = [
    'general_th',
    'sports_th',
    'health_th',
    'science_th',
    'business_th',
    'technology_th',
    'entertainment_th',
  ]

  useEffect(() => {
    const abortController = new AbortController()

    const fetchArticles = async (category: string) => {
      try {
        const data = await fetchNews(category)
        if (data) {
          setArticles((prev) => ({
            ...prev,
            [category]: data as IArticle[],
          }))
        }
      } catch (error) {
        setError((error as Error).message)
      }
    }

    const fetchAllCategories = async () => {
      try {
        await Promise.all(
          th_Categories.map((category) => fetchArticles(category))
        )
      } catch (error) {
        console.error('Error fetching categories', error)
      }
    }

    fetchAllCategories()

    return () => abortController.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <p className='text-4xl font-semibold mb-3'>Top-Headlines</p>
      <div className='flex flex-wrap justify-between gap-y-5 flex-grow'>
        {articles?.general_th?.length > 0 &&
          articles.general_th
            .slice(
              0,
              articles.general_th.length -
                ((articles.general_th.length - 3) % 4)
            )
            .map((article, index) => (
              <TopStories key={index} {...{ article, index }} />
            ))}
      </div>
      <div className='relative w-full border-b border-gray-300 flex justify-center py-12'>
        <p className='absolute -bottom-3 bg-white px-4 text-xl font-semibold text-gray-700'>
          More Top-Headlines
        </p>
      </div>
      <div className='mt-10'>
        {th_Categories.slice(1).map((category) => (
          <div key={category} className='mb-5'>
            <TopHeadlines {...{ category, articles_th: articles[category] }} />
          </div>
        ))}
      </div>

      <div
        className={`fixed overflow-hidden h-[72px] right-2 md:right-10 flex flex-col gap-1 items-center text-center shadow-sm w-min px-2 py-1 text-xs rounded-t-md cursor-pointer text-gray-100 bg-gray-600 bg-opacity-75 hover:bg-gray-700 active:bg-gray-600  transition-all duration-300  ${
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
