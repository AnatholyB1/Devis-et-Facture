
"use client"
import { type ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import Layout from '@/layout'
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/ui/login/login-button";
import { useSession, signIn } from 'next-auth/react'

 
const Page: NextPageWithLayout = () => {

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
    <main
      className='flex justify-center items-center h-70vh' 
    >
      <div>
        <LoginButton />
        <RegisterButton />
        <LogoutButton />
        <ProfileButton />
      </div>
    </main>
  );
}
 
Page.getLayout = function getLayout(page: ReactElement) {

  return (
    <Layout>
      {page}
    </Layout>
  )
}
 
export default Page