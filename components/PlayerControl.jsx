import React from 'react'
import useWebPlayback from '../hooks/useWebPlayback';
import { useRecoilValue } from 'recoil';
import { isPaused } from '../atoms/songAtom';
import { BiSkipPrevious, BiSkipNext, BiPlay, BiStop } from "react-icons/bi";
import TimeBar from './TimeBar';
import useSpotify from "../hooks/useSpotify";

function PlayerControl() {
  const is_paused = useRecoilValue(isPaused);
  const player = useWebPlayback();
  const spotifyApi = useSpotify();
  // console.log(spotifyApi.getMyRecentlyPlayedTracks());

  return (
    <div className='flex items-center justify-center flex-col'>
        <div className="flex items-center justify-center text-gray-600">
          <BiSkipPrevious
            className="w-10 h-10 hover:text-white"
            onClick={() => {
              console.log(player);
              player.previousTrack();
            }}
          />
          {is_paused ? (
            <div
              className="rounded-full w-10 h-10 bg-white flex justify-center items-center hover:scale-105"
              onClick={() => player.resume()}
            >
              <BiPlay className="pl-1 w-8 h-8 text-black" />
            </div>
          ) : (
            <div
              className="rounded-full w-10 h-10 bg-white flex justify-center items-center hover:scale-105"
              onClick={() => player.pause()}
            >
              <BiStop className="w-6 h-6 text-black" />
            </div>
          )}
          <BiSkipNext
            className="w-8 h-8 hover:text-white"
            onClick={() => {player.nextTrack()}}
          />
        </div>
        {/* <TimeBar player = {player}/> */}
      </div>
  )
}

export default PlayerControl
