import React, { useEffect, useRef, useState } from 'react'
import { moreMenuItems } from './menuItems'
import { navMenuItems } from './menuItems'
import { IoClose } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

interface INavbarDrawerProps {
  openDrawer: boolean
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>
}
const NavbarDrawer: React.FC<INavbarDrawerProps> = ({
  openDrawer,
  setOpenDrawer,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenDrawer(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openDrawer, setOpenDrawer])

  const menuItems: IMenuItem[] = navMenuItems.concat(moreMenuItems)

  const handleClickMenuItem = (path: string) => {
    router.push(path)
    setOpenDrawer(false)
  }

  return (
    <div
      ref={ref}
      className={`fixed inset-y-0 right-0 w-52 bg-[#2d5883] z-50 transition-transform duration-300 transform ${
        openDrawer ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className='p-5'>
        <IoClose
          className='text-gray-200 hover:text-white size-5 cursor-pointer'
          onClick={() => setOpenDrawer(false)}
        />
      </div>
      <div className='w-full flex flex-col items-left justify-center'>
        {menuItems &&
          menuItems.map((item) => (
            <p
              key={item.title}
              className='px-5 py-1.5 text-gray-200 hover:bg-[#577593] cursor-pointer'
              onClick={() => handleClickMenuItem(item.path)}
            >
              {item.title}
            </p>
          ))}
      </div>
    </div>
  )
}

export default NavbarDrawer
