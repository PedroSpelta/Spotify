import React from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";

function Sidebar() {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <div>
      <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen">
        <div className="space-y-4">
        <button className="flex space-x-2 items-center hover:text-white" onClick={signOut}>
            <p>Sign out</p>
          </button>
          <button className="flex space-x-2 items-center hover:text-white">
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </button>
          <button className="flex space-x-2 items-center hover:text-white">
            <SearchIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
          <button className="flex space-x-2 items-center hover:text-white">
            <LibraryIcon className="h-5 w-5" />
            <p>Your library</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-900" />

          <button className="flex space-x-2 items-center hover:text-white">
            <PlusCircleIcon className="h-5 w-5" />
            <p>Create playlist</p>
          </button>
          <button className="flex space-x-2 items-center hover:text-white">
            <SearchIcon className="h-5 w-5" />
            <p>Liked songs</p>
          </button>
          <button className="flex space-x-2 items-center hover:text-white">
            <LibraryIcon className="h-5 w-5" />
            <p>Your episodes</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-900" />

          {/* playlists */}

          <p className="cursor-pointer hover:text-white">
            Playlist placeholder
          </p>
          <p className="cursor-pointer hover:text-white">
            Playlist placeholder
          </p>
          <p className="cursor-pointer hover:text-white">
            Playlist placeholder
          </p>
          <p className="cursor-pointer hover:text-white">
            Playlist placeholder
          </p>
          <p className="cursor-pointer hover:text-white">
            Playlist placeholder
          </p>
          <p className="cursor-pointer hover:text-white">
            Playlist placeholder
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
