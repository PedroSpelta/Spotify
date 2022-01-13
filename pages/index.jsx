import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/react";
import WebPlayback from "../components/WebPlayback";
import { useDataContext } from "../context/data";
import Lyrics from "../components/Lyrics";

export default function Home() {
  const { showLyrics } = useDataContext();

  return (
    <>
      <Head>
        <title>Spotify | Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          {showLyrics ? <Lyrics /> : <Center />}
        </main>
        <div className="sticky bottom-0">
          <WebPlayback />
        </div>
      </div>
    </>
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
