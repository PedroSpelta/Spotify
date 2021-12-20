import React from 'react'

function Artist({artist}) {
  return (
    <div className='bg-[#181818] flex flex-col hover:bg-[#282828] duration-500 w-[200px] items-start justify-start p-5'>
      <img src={artist.images[0]?.url} alt="" className='w-40 h-40 rounded-full drop-shadow-2xl mb-5' />
      <p className='text-white text-base truncate font-semibold'>{artist.name}</p>
      <p className='text-gray-400 text-sm'>Artista</p>
    </div>
  )
}

export default Artist
