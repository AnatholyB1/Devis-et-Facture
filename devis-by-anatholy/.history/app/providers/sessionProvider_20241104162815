//sessionProvider for next auth
import { Provider } from 'next-auth/client';
import { signIn } from 'next-auth/react';

export default function App({ Component, pageProps }) {
    //check if user is already logged in
    if (!pageProps.session) {
        //if user is logged in, redirect to sigin page
        signIn();
    }

  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}