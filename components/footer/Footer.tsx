import { FaXTwitter, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { moreMenuItems } from '../header/menuItems'
import { navMenuItems } from '../header/menuItems'
import Link from 'next/link'

function Footer() {
  const socialMedia = [
    {
      icon: <FaXTwitter />,
      link: 'https://twitter.com/',
      label: 'X',
      color: '#242424',
    },
    {
      icon: <FaInstagram />,
      link: 'https://www.instagram.com/',
      label: 'Instagram',
      color: '#F08080',
    },
    {
      icon: <FaLinkedin />,
      link: 'https://www.linkedin.com/imoguz',
      label: 'Linkedin',
      color: '#0077b5',
    },
    {
      icon: <FaYoutube />,
      link: 'https://www.youtube.com',
      label: 'Youtube',
      color: 'red',
    },
  ]

  const currentYear = new Date().getFullYear()
  const menuItems: IMenuItem[] = navMenuItems.concat(moreMenuItems)

  return (
    <footer className='flex flex-col pt-3 bg-[#365d87] '>
      <section className='mx-auto w-[90%] md:max-w-[75%] lg:max-w-[50%] text-gray-950 '>
        <p className='text-center mb-2 font-semibold'>News Categories</p>
        <div className='flex flex-wrap justify-center'>
          {menuItems.map((item) => (
            <Link key={item.title} href={item.path}>
              <p className='min-w-32 lg:min-w-40 hover:text-white'>
                {item.title}
              </p>
            </Link>
          ))}
        </div>
      </section>
      <hr className='border-0 border-t border-gray-300 my-3 mx-80' />

      <section className='flex justify-center items-center h-12 gap-8 text-3xl'>
        {socialMedia.map((item) => (
          <a
            style={{ color: item.color }}
            className='hover:scale-110 transition-scale duration-300'
            key={item.label}
            href={item.link}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={item.label}
          >
            {item.icon}
          </a>
        ))}
      </section>
      <section className='flex justify-center items-center bg-[#224f7c] text-gray-200 w-full h-8 text-xs'>
        {`© ${currentYear} YAMINEWS. All Rights Reserved.`}
      </section>
    </footer>
  )
}

export default Footer
