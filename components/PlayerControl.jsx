import React, { useEffect } from "react";
import { BiSkipPrevious, BiSkipNext, BiPlay } from "react-icons/bi";
import { IoIosPause } from "react-icons/io";
import TimeBar from "./TimeBar";
import { useDataContext } from "../context/data";

function PlayerControl({ player }) {
  const { is_paused } = useDataContext();

  useEffect(async () => {
    if (!player) return;
  }, [player]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center text-gray-600">
        <BiSkipPrevious
          className="w-10 h-10 hover:text-white"
          onClick={() => {
            player.previousTrack();
          }}
        />
        {is_paused ? (
          <div
            className="md:rounded-full w-9 h-9 md:bg-white flex justify-center items-center hover:scale-105"
            onClick={() => {
              player.resume();
            }}
          >
            <BiPlay className="md:pl-1 md:w-8 md:h-8 w-9 h-9 md:text-black " />
          </div>
        ) : (
          <div
            className="md:rounded-full w-9 h-9 md:bg-white flex justify-center items-center hover:scale-105"
            onClick={() => player.pause()}
          >
            <IoIosPause className="md:w-6 md:h-6 w-9 h-9 md:text-black" />
          </div>
        )}
        <BiSkipNext
          className="w-10 h-10 hover:text-white"
          onClick={() => {
            player.nextTrack();
          }}
        />
      </div>
      <TimeBar player={player} />
    </div>
  );
}

export default PlayerControl;
