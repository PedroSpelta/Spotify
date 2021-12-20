import React, { useState }  from 'react'
import { millisToMinutesAndSeconds } from '../lib/time'
import { BsThreeDots } from 'react-icons/bs'

function SearchSong({ track, order, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="grid grid-cols-2 text-gray-400 py-1 px-2 hover:bg-[#282828] rounded-sm cursor-pointer mr-10"
      onClick={() => onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-4">
        <img src={track.album.images[0].url} alt="" className="h-10 w-10" />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.name}</p>
          <p className="w-40 truncate">{track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-end ml-auto md:ml-0 mr-10">
        <p className={`${!isHovered && 'mr-7'}`}>{millisToMinutesAndSeconds(track.duration_ms)}</p>
        <BsThreeDots className={`ml-3 w-4 h-4 ${!isHovered && 'hidden'}`} onClick={() => console.log('teste')}/>
      </div>
    </div>
  )
}

export default SearchSong
