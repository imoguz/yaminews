'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BiUser } from 'react-icons/bi'
import Link from 'next/link'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import MoreMenu from './MoreMenu'
import weatherApi from '@/api/weatherApi'
import exchangerateApi from '@/api/exchangerateApi'
import WeatherForecast from './WeatherForecast'
import StockExchange from './Exchangerate'
import Search from './Search'
import { IoMenu } from 'react-icons/io5'
import NavbarDrawer from './NavbarDrawer'
import { navMenuItems } from './menuItems'

const Header = () => {
  const [moreMenu, setMoreMenu] = useState(false)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [currentWeather, setCurrentWeather] = useState<IWeatherData[] | []>([])
  const [exchangerateData, setExchangerateData] = useState<
    IExchangerateData[] | []
  >([])

  useEffect(() => {
    const abortController = new AbortController()

    const fetchData = async () => {
      try {
        const [weatherData, exchangeData] = await Promise.all([
          weatherApi(),
          exchangerateApi(),
        ])

        setCurrentWeather(weatherData as IWeatherData[])
        setExchangerateData(exchangeData as IExchangerateData[])
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.log((error as Error).message)
        }
      }
    }

    fetchData()
    return () => abortController.abort()
  }, [])

  const user = 'Guest'

  return (
    <>
      <div
        className={`fixed inset-0 top-0 bg-black ${
          openDrawer
            ? 'bg-opacity-60 z-30 transition-opacity duration-300'
            : 'opacity-0 -z-50'
        }`}
      />
      <header className='fixed top-0 left-0 z-50 flex flex-col md:flex-row h-[140px] md:h-[90px] w-full bg-[#e40808]'>
        <div className='h-full min-w-[200px] hidden md:block'>
          <Link href='/'>
            <div className='relative w-full h-full'>
              <Image
                src='/images/logo.jpg'
                alt='Article Image'
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                priority
                className='object-fill'
              />
            </div>
          </Link>
        </div>
        <div className='w-full flex md:hidden border-b'>
          <div className='h-full w-1/3 min-h-12'>
            <Link href='/'>
              <div className='relative w-full h-full'>
                <Image
                  src='/images/logo.jpg'
                  alt='Article Image'
                  fill
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  priority
                  className='object-fill'
                />
              </div>
            </Link>
          </div>
          <div className='w-2/3 px-3 flex items-center justify-end gap-2 text-sm text-[#faffe1] font-semibold'>
            <span className='cursor-pointer text-[#faffe1] hover:text-gray-200 active:text-gray-800'>
              Help
            </span>
            |
            {user ? (
              <div
                className='relative group flex items-center cursor-pointer h-12'
                // onMouseEnter={() => setOpenUserMenu(true)}
                // onMouseLeave={() => setOpenUserMenu(false)}
              >
                <div className='text-sm font-semibold mr-2 text-[#faffe1] group-hover:text-gray-200 max-w-32 text-right line-clamp-1'>
                  Hi, {user}
                </div>

                <BiUser className='text-xl text-[#edf7b9] group-hover:text-gray-200' />

                {/* <UserMenu {...{ openUserMenu, setOpenUserMenu }} /> */}
              </div>
            ) : (
              <span
                className='cursor-pointer text-gray-800 hover:text-gray-200 active:text-gray-800'
                // onClick={() => navigate('/sign-in')}
              >
                Sign in
              </span>
            )}
          </div>
        </div>
        <div className='h-full flex-grow'>
          <div className='h-1/2 w-full flex border-b border-[#fdfff2]'>
            <div className='h-full w-1/2 md:w-1/3 xl:w-1/2 pl-3'>
              <WeatherForecast {...{ currentWeather }} />
            </div>
            <div className='hidden lg:flex xl:hidden justify-center w-60 px-2 items-center'>
              <Search />
            </div>
            <div className='h-full w-1/2 md:w-1/3 xl:w-1/2 text-right pr-3'>
              <StockExchange {...{ exchangerateData }} />
            </div>
            <div className='h-full min-w-fit border-l px-3 hidden md:flex items-center gap-2 pr-10 text-sm text-[#faffe1] font-semibold'>
              <span className='cursor-pointer text-[#faffe1] hover:text-gray-200 active:text-gray-800'>
                Help
              </span>
              |
              {user ? (
                <div
                  className='relative group flex items-center cursor-pointer h-16'
                  // onMouseEnter={() => setOpenUserMenu(true)}
                  // onMouseLeave={() => setOpenUserMenu(false)}
                >
                  <div className='text-sm font-semibold mr-2 text-[#faffe1] group-hover:text-gray-200 max-w-32 text-right line-clamp-1'>
                    Hi, {user}
                  </div>

                  <BiUser className='text-xl text-[#edf7b9] group-hover:text-gray-200' />

                  {/* <UserMenu {...{ openUserMenu, setOpenUserMenu }} /> */}
                </div>
              ) : (
                <span
                  className='cursor-pointer text-gray-800 hover:text-gray-200 active:text-gray-800'
                  // onClick={() => navigate('/sign-in')}
                >
                  Sign in
                </span>
              )}
            </div>
          </div>
          <div className='h-1/2 w-full flex'>
            <nav className='hidden lg:flex gap-5 items-center justify-center px-5 font-semibold flex-grow'>
              {navMenuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  className='flex items-center h-full px-1 border-b-2 border-[#f00] text-[#faffe1] hover:text-[#edf7b9] hover:border-[#2d5883] cursor-pointer'
                >
                  {item.title}
                </Link>
              ))}
              <div
                onMouseOver={() => setMoreMenu(true)}
                onMouseLeave={() => setMoreMenu(false)}
                className='relative flex items-center gap-1 h-full px-1 text-[#faffe1] hover:border-gray-800 cursor-pointer'
              >
                More {moreMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                <MoreMenu {...{ moreMenu, setMoreMenu }} />
              </div>
            </nav>
            <div className='flex lg:hidden xl:flex justify-center w-72 px-5 items-center'>
              <Search />
            </div>
            <div className='flex flex-grow justify-end items-center lg:hidden pr-3'>
              <IoMenu
                className='size-7 text-gray-100 cursor-pointer'
                onClick={() => setOpenDrawer(true)}
              />
            </div>
          </div>
        </div>
        <NavbarDrawer {...{ openDrawer, setOpenDrawer, navMenuItems }} />
      </header>
      <div className='h-[160px] md:h-[120px] mb-5' />
    </>
  )
}

export default Header
