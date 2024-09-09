import { useRouter } from 'next/navigation'
import * as React from 'react'
import { moreMenuItems } from './menuItems'

interface IMoreMenuProps {
  moreMenu: boolean
  setMoreMenu: React.Dispatch<React.SetStateAction<boolean>>
}
const MoreMenu: React.FC<IMoreMenuProps> = ({ moreMenu, setMoreMenu }) => {
  const router = useRouter()

  return (
    <div
      className={`absolute top-12 -left-2 z-50 bg-white text-gray-800 shadow-md w-max rounded-md shadow-gray-500 overflow-hidden transition-height duration-200
        ${moreMenu ? 'h-76 py-2' : 'h-0'} `}
    >
      {moreMenuItems.map((moreItem) => (
        <p
          key={moreItem.title}
          className='hover:bg-gray-200 px-3 py-1 cursor-pointer'
          onClick={() => router.push(moreItem.path)}
        >
          {moreItem.title}
        </p>
      ))}
    </div>
  )
}

export default MoreMenu
