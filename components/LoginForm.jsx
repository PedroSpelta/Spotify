import React from "react";
import SpotifyIcon from "./SpotifyIcon";
import SpotifyLogo from "./SpotifyLogo";
import Link from "next/link";
import { signIn } from "next-auth/react";

function LoginForm({ providers }) {
  return (
    <div className="flex w-full h-screen justify-center items-center from-gray-600 to-black bg-gradient-to-b">
      <div className="filter-none w-full max-w-lg bg-[#121212] h-96 flex flex-col items-center pt-10 rounded-md relative">
        <SpotifyLogo />
        <p className="text-white text-xl font-bold mt-10">
          Faça login para Continuar
        </p>
        <div
          className="cursor-pointer relative w-60 p-3 mt-4 text-center font-semibold rounded-full bg-[#1DB954] text-white"
          onClick={() => {
            signIn(providers.spotify.id, { callbackUrl: "/" });
          }}
        >
          Login com Spotify
          <SpotifyIcon />
        </div>
        <Link href={"https://www.spotify.com/br/premium/"} passHref>
          <div className="text-sm underline text-white bottom-5 absolute cursor-pointer">
            Não tem conta premium?
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
