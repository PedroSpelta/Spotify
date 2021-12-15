import { getSession } from "next-auth/react";
import React from "react";
import FavoritesCenter from "../../components/FavoritesCenter";
import Sidebar from "../../components/Sidebar";

export default function index() {
  return (
    <div className="bg-[#121212] h-screen">
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
