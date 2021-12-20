import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import { DataWrapper } from "../context/data";
import { PlayerWrapper } from "../context/player";
import "../pages/favorites/index.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <DataWrapper>
          <PlayerWrapper>
            <Component {...pageProps} />
          </PlayerWrapper>
        </DataWrapper>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
