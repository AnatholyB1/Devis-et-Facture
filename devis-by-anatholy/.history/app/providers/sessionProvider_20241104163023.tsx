//sessionProvider for next auth
import { SessionProvider } from 'next-auth/react';
import { signIn } from 'next-auth/react';

import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    //check if user is already logged in
    if (!pageProps.session) {
        //if user is logged in, redirect to sigin page
        signIn();
    }

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}