import 'antd/dist/reset.css'
import '../styles/global.scss'
import Layout from '@/components/Layout'
import { IContextProps, Nav, StoreProvider, useStore } from '@/store'
import { NextPage } from 'next'
import ErrorBoundary from '@/components/ErrorBoundary'
import service from '@/service/fetch'

interface IProps {
  initialValue: Record<any, any>
  Component: NextPage
  pageProps: any
}

function App({ Component, pageProps, initialValue }: IProps) {
  return (
    <ErrorBoundary>
      <StoreProvider initialValue={initialValue}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </ErrorBoundary>
  )
}

App.getInitialProps = async ({ ctx }: { ctx: any }) => {

  const tags = (await service.get('/api/tags')) as Nav[]

  const context: IContextProps = {
    tags: tags
  }


  return {
    initialValue: context
  }
}

export default App
