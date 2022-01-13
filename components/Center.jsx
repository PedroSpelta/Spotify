import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import UserHeaderImg from "./UserHeaderImg";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log(err));

  }, [spotifyApi, playlistId]);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  return (
    <div className="relative flex-grow h-screen overflow-y-scroll scrollbar-hide bg-[#141414]">
      <UserHeaderImg />
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-[#141414] ${color} h-80 text-white p-8`}
      >
        <img
          className="w-44 h-44 shadow-2xl"
          src={playlist?.images[0].url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <Songs />
    </div>
  );
}

export default Center;
