
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

 
const Page: NextPageWithLayout = () => {

  useEffect(() => {

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