import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  let location = useLocation();
  // console.log(location);
  // console.log(search);
  return (
    <>
      {showSearch && location.pathname == '/collection' ? (
        <div className='border-t border-b bg-rgb(213, 250, 139) text-center'>
          <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input className='text-black flex-1 outline-none bg-inherit text-sm' onChange={(e) => (setSearch(e.target.value))} type="text" placeholder='Search'/>
            <img className='w-4' src={assets.search_icon} alt="" />
          </div>
          <img onClick={() => (setShowSearch(false))} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="" />
        </div>
      ) : null}
    </>
  )
}

export default SearchBar
