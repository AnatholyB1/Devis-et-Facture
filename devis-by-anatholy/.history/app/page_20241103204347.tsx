import type { ReactElement } from 'react'
import Layout from '@/app/layout'
import type { NextPageWithLayout } from './_app'

 
const Page: NextPageWithLayout = () => {
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