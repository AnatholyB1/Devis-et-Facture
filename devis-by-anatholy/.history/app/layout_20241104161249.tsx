import Navbar from './components/navbar';
import Footer from './components/footer';
import { ReactNode } from 'react';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider  >
    <html lang="en">
      <head>
        <title>Devis by Anatholy</title>
        <meta name="description" content="App gratuite pour faire des factures et des devis" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
    </SessionProvider>
  );
}