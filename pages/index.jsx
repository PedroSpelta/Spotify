import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import {getSession} from "next-auth/react"
import Player from "../components/Player";
import WebPlayback from "../components/WebPlayback";

export default function Home() {
  return (
    <>
      <Head>
        <title>Spotify | Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>
        <div className="sticky bottom-0">
          <WebPlayback />
        </div>
      </div>
    </>
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