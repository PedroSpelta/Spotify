import React from 'react'

function Artist({artist}) {
  return (
    <div className='bg-[#202020] flex flex-col hover:bg-[#282828] duration-500 w-36 items-center'>
      <img src={artist.images[0].url} alt="" className='w-32 h-32 rounded-full' />
      <p className='text-white text-base truncate'>{artist.name}</p>
      <p className='text-gray-300 text-sm'>Artista</p>
    </div>
  )
}

export default Artist
