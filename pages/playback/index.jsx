import { getSession } from "next-auth/react";
import React from "react";
import PlaybackCenter from "../../components/PlaybackCenter";
import Sidebar from "../../components/Sidebar";

export default function index() {
  return (
    <div className="bg-[#121212] h-screen">
      <main className="flex">
        <Sidebar />
        <PlaybackCenter />
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
