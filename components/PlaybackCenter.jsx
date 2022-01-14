import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Songs from "./Songs";

export default function PlaybackCenter() {
  const { data: session } = useSession();
  
  return (
    <div className="relative flex-grow h-screen overflow-y-scroll scrollbar-hide bg-[#141414]">
      <header className="absolute top-5 right-8">
        <div
          className="flex text-white items-center bg-[#141414] space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={signOut}
        >
          <img
            className="rounded-full w-10 h-10 "
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <Songs />
    </div>
  );
}
