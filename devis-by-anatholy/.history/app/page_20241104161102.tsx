
"use client"
import { useEffect, type ReactElement } from 'react'
import type { NextPageWithLayout } from './_app'
import Layout from '@/layout'
import {
  LoginButton,
  LogoutButton,
  ProfileButton,
  RegisterButton,
} from "@/ui/login/login-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

 
const Page: NextPageWithLayout = () => {

  useEffect(() => {
    const session = getServerSession(authOptions)
    console.log(session);
  }, [])



  console.log()

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