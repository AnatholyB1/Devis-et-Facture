"use client"
import { type ReactElement, type ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useSession, signIn } from 'next-auth/react'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
}; 

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps: {  ...pageProps } }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  useSession()
  console.log('pageProps', pageProps)

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    }
  });

  if (status === "loading") {
    return <p>Loading....</p>;
  }


  return (
      getLayout(<Component {...pageProps} />)
  );
}