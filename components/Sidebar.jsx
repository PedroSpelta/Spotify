import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Link from "next/link";
import SpotifyLogo from "./SpotifyLogo";

function Sidebar() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [spotifyApi, session]);

  return (
    <div>
      <div className="text-gray-300 bg-black p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide md:min-w-[15rem] sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
        <div className="space-y-4">
          <div className="mb-10">
            <SpotifyLogo />
          </div>

          {/* Link inicio */}
          <Link href={"/"}>
            <button className="flex space-x-2 items-center hover:text-white duration-300 font-semibold">
              <HomeIcon className="h-5 w-5" />
              <p>Início</p>
            </button>
          </Link>

          {/* Link procurar */}
          <Link href={"/search"}>
            <button className="flex space-x-2 items-center hover:text-white duration-300  font-semibold">
              <SearchIcon className="h-5 w-5" />
              <p>Procurar</p>
            </button>
          </Link>

          <hr className="border-t-[0.1px] border-gray-500" />

          {/* Link curtidas */}
          <Link href={"/liked"} passHref>
            <button className="flex space-x-2 items-center hover:text-white duration-300  font-semibold">
              <HeartIcon className="h-5 w-5" />
              <p>Curtidas</p>
            </button>
          </Link>

          {/* Link favoritas */}
          <Link href={"/favorites"}>
            <button className="flex space-x-2 items-center hover:text-white duration-300  font-semibold">
              <StarIcon className="h-5 w-5" />
              <p>Favoritos</p>
            </button>
          </Link>

          {/* Link historico */}
          <Link href={"/history"}>
            <button className="flex space-x-2 items-center hover:text-white duration-300  font-semibold">
              <LibraryIcon className="h-5 w-5" />
              <p>Histórico</p>
            </button>
          </Link>
          <hr className="border-t-[0.1px] border-gray-500" />

          {/* playlists */}

          {playlists.map((playlist) => (
            <Link href={"/"} passHref key={playlist.id}>
              <p
                className="cursor-pointer hover:text-white duration-300  font-semibold"
                onClick={async () => {
                  setPlaylistId(playlist.id);
                }}
              >
                {playlist.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
