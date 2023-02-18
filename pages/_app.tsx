import 'antd/dist/reset.css'
import '../styles/global.scss'
import Layout from '@/components/Layout'
import { StoreProvider } from '@/store'
import { NextPage } from 'next'
import ErrorBoundary from '@/components/ErrorBoundary'
import service from '@/service/fetch'
import { Nav } from '@/store/modules/projectStore'

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

  return {
    initialValue: {
      project: {
        tags
      }
    }
  }
}

export default App
