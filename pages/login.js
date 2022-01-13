import { getProviders, signIn } from "next-auth/react";
import React from "react";
import Sidebar from "../components/Sidebar";
import WebPlayback from "../components/WebPlayback";
import Head from "next/head";
import LoginForm from "../components/LoginForm";

function login({ providers }) {
  return (
    <div className="relative">
      <Head>
        <title>Spotify | Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-black h-screen overflow-hidden absolute">
        <main className="flex blur-sm">
          <div className="">
            <Sidebar />
          </div>
        </main>
        <div className="sticky bottom-0">{/* <WebPlayback /> */}</div>
      </div>
      <LoginForm providers={providers} />
    </div>
  );
}

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
