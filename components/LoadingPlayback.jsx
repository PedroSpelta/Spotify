import React from "react";
import { BiVolumeLow } from "react-icons/bi";
import { FiMic } from "react-icons/fi";
import PlayerControl from "./PlayerControl";
import Slider from "rc-slider";

function LoadingPlayback() {
  return (
    <>
      <div className="hidden h-24 bg-[#121212] text-white md:grid grid-cols-3 text-xs md:text-base md:px-8 border-t border-[#3d3d3d]">
        <div className="flex items-center space-x-4">
          <div className="hidden md:inline h-14 w-14 bg-white animate-pulse rounded-sm"></div>
          <div className="flex flex-col xl:w-[350px] lg:w-[280px] md:w-[150px] ">
            <p className="w-40 h-4 mt-1 bg-white animate-pulse rounded-md"></p>
            <p className="w-20 h-3 mt-2.5 bg-gray-400 animate-pulse rounded-md"></p>
          </div>
        </div>
        <PlayerControl />
        <div className="flex items-center justify-center gap-3">
          <FiMic />
          <BiVolumeLow />
          <div className="w-32">
            <Slider
              min={0}
              max={100}
              value={100}
              railStyle={{ height: 6, background: "gray" }}
              handleStyle={{ border: 0, background: "white" }}
              trackStyle={{
                background: "white",
                height: 6,
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-24 bg-[#121212] text-white grid grid-cols-4 text-xs md:hidden border-t border-[#3d3d3d]">
        <div className="flex flex-col items-start ml-5 gap-1 justify-center col-span-3">
          <p className="w-40 h-4 mt-2.5 bg-white animate-pulse rounded-md"></p>
          <p className="w-20 h-3 mt-1.5 bg-gray-400 animate-pulse rounded-md"></p>
          <div className="ml-[-10px]">
            <PlayerControl />
          </div>
        </div>
        <div className="flex items-center justify-end mr-3">
          <div className="h-16 w-16 bg-white rounded-sm animate-pulse"></div>
        </div>
      </div>
    </>
  );
}

export default LoadingPlayback;
