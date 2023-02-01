import 'antd/dist/reset.css'
import '../styles/global.scss'
import '../styles/vars.scss'
import Layout from '@/components/Layout'
import { StoreProvider } from '@/store'
import { NextPage } from 'next'
import ErrorBoundary from '@/components/ErrorBoundary'

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
  return {
    initialValue: {
      demo: {
        value: 'value',
        state: 'state'
      }
    }
  }
}

export default App
