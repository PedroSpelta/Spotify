import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import { useSession, signOut } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import Link from "next/link";
import SpotifyLogo from "./SpotifyLogo";

function Sidebar() {
  const { data: session, status } = useSession();
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
          <Link href={"/"}>
            <button className="flex space-x-2 items-center hover:text-white duration-300 font-semibold">
              <HomeIcon className="h-5 w-5" />
              <p>Início</p>
            </button>
          </Link>
          <Link href={'/search'} >
          <button className="flex space-x-2 items-center hover:text-white duration-300  font-semibold">
            <SearchIcon className="h-5 w-5" />
            <p>Procurar</p>
          </button>
          </Link>
          <Link href={'/'}>
          <button className="flex space-x-2 items-center hover:text-white duration-300  font-semibold">
            <LibraryIcon className="h-5 w-5" />
            <p>Social</p>
          </button>
          </Link>
          <hr className="border-t-[0.1px] border-gray-500" />

          <button className="flex space-x-2 items-center hover:text-white duration-300  font-semibold">
            <PlusCircleIcon className="h-5 w-5" />
            <p>Criar playlist</p>
          </button>
          <button className="flex space-x-2 items-center hover:text-white duration-300  font-semibold">
            <SearchIcon className="h-5 w-5" />
            <p>Músicas curtidas</p>
          </button>
          <Link href={"/favorites"}>
            <button className="flex space-x-2 items-center hover:text-white duration-300  font-semibold">
              <LibraryIcon className="h-5 w-5" />
              <p>Favoritos</p>
            </button>
          </Link>
          <hr className="border-t-[0.1px] border-gray-500" />

          {/* playlists */}

          {playlists.map((playlist) => (
            <p
              key={playlist.id}
              className="cursor-pointer hover:text-white duration-300  font-semibold"
              onClick={() => setPlaylistId(playlist.id)}
            >
              {playlist.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
