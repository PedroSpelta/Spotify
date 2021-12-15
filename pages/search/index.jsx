import { getSession } from "next-auth/react";
import React from "react";
import SearchCenter from "../../components/SearchCenter";
import Sidebar from "../../components/Sidebar";
import WebPlayback from "../../components/WebPlayback";

export default function index() {
  return (
    <div className="bg-[#121212] h-screen">
      <main className="flex">
        <Sidebar />
        <SearchCenter />
      </main>
      <div className="sticky bottom-0">
        <WebPlayback />
      </div>
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