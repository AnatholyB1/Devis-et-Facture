
"use client"
import { signIn, signOut, useSession } from 'next-auth/react';
import type { ReactElement } from 'react'
import Layout from '@/app/layout'
import type { NextPageWithLayout } from '@/app/_app'

 
const Page: NextPageWithLayout = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p>not logged in</p>
  }

  return <p>hello world</p>
}
 
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
 
export default Page