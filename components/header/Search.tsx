import React from 'react'
import { SlMagnifier } from 'react-icons/sl'

const Search = () => {
  return (
    <>
      <form className='relative h-8 w-full'>
        <input
          className='border border-gray-400 h-full w-full rounded-full bg-gray-100 pl-8 pr-2 text-sm text-gray-800 focus:outline-none  focus:border-blue-400'
          type='search'
          name='query'
          placeholder='Search...'
        />
        <button
          type='submit'
          className='absolute top-[1px] left-[1px] flex items-center justify-center rounded-l-full hover:bg-gray-200 h-[30px] w-[30px] cursor-pointer'
        >
          <SlMagnifier className='text-sm' />
        </button>
      </form>
    </>
  )
}

export default Search
