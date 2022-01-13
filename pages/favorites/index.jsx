import { getSession } from "next-auth/react";
import React from "react";
import FavoritesCenter from "../../components/FavoritesCenter";
import Lyrics from "../../components/Lyrics";
import Sidebar from "../../components/Sidebar";
import WebPlayback from "../../components/WebPlayback";
import { useDataContext } from "../../context/data";

export default function index() {
  const { showLyrics } = useDataContext();

  return (
    <div className="bg-[#121212] h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        {showLyrics ? <Lyrics /> : <FavoritesCenter />}
      </main>
      <div className="sticky bottom-0">
        <WebPlayback />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
