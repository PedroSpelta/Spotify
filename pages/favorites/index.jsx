import { getSession } from "next-auth/react";
import React from "react";
import Center from "../../components/Center";
import FavoritesCenter from "../../components/FavoritesCenter";
import Sidebar from "../../components/Sidebar";
import WebPlayback from "../../components/WebPlayback";
import useSpotify from "../../hooks/useSpotify";

export default function index() {
  const spotifyApi = useSpotify();
  
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <FavoritesCenter />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: {
      session,
    }
  }
}
