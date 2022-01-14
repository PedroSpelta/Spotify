import React, { useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import PlayerControl from "./PlayerControl";
import { usePlayerContext } from "../context/player";
import { useDataContext } from "../context/data";
import { FiMic } from "react-icons/fi";
import { BiVolumeLow } from "react-icons/bi";
import LoadingPlayback from "./LoadingPlayback";

function WebPlayback() {
  const { data, setData, setShowLyrics, currentTrack, setLyrics } =
    useDataContext();
  const { oplayer: player, isReady } = usePlayerContext();
  const spotifyApi = useSpotify();

  useEffect(async () => {
    console.log(await spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 }));
  }, []);

  if (!isReady) return <LoadingPlayback />;

  return (
    <>
      <div className="hidden h-24 bg-[#121212] text-white md:grid grid-cols-3 text-xs md:text-base md:px-8 border-t border-[#3d3d3d]">
        <div className="flex items-center space-x-4">
          <img
            className="hidden md:inline h-14 w-14"
            src={currentTrack?.album.images?.[0].url}
            alt=""
          />
          <div className="flex flex-col xl:w-[350px] lg:w-[280px] md:w-[150px] ">
            <p className="truncate font-bold">{currentTrack?.name}</p>
            <p className="text-gray-400 text-sm">
              {currentTrack?.artists?.[0]?.name}
            </p>
          </div>
        </div>
        <PlayerControl player={player} />
        <div className="flex items-center justify-center gap-3">
          <FiMic
            onClick={() => {
              setShowLyrics((state) => !state);
            }}
          />
          <BiVolumeLow />

          <div className="w-32">
            <Slider
              min={0}
              max={100}
              value={data.volume}
              railStyle={{ height: 6, background: "gray" }}
              handleStyle={{ border: 0, background: "white" }}
              trackStyle={{
                background: "white",
                height: 6,
              }}
              onAfterChange={(e) => {
                spotifyApi.setVolume(data.volume).catch(() => {});
              }}
              onChange={(e) => {
                setData((prev) => ({ ...prev, volume: e }));
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-24 bg-[#121212] text-white grid grid-cols-4 text-xs md:hidden border-t border-[#3d3d3d]">
        <div className="flex flex-col items-start ml-5 gap-1 justify-center col-span-3">
          <h3 className="text-lg font-bold truncate w-full">
            {currentTrack?.name}
          </h3>
          <p className="truncate">{currentTrack?.artists?.[0]?.name}</p>
          <div className="ml-[-10px]">
            <PlayerControl player={player} />
          </div>
        </div>
        <div className="flex items-center justify-end mr-3">
          <img
            className=" h-16 w-16 opacity-70 "
            src={currentTrack?.album.images?.[0].url}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default WebPlayback;
