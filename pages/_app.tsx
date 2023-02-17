import 'antd/dist/reset.css'
import '../styles/global.scss'
import Layout from '@/components/Layout'
import { StoreProvider } from '@/store'
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
  // const tags = await service.get('api/tags')

  const tags = [
    { id: 2, label: '首页', value: '/', isActive: false },
    { id: 3, label: '沸点', value: '/hotpoint', isActive: false },
    { id: 4, label: '课程', value: '/course', isActive: false },
    { id: 5, label: '直播', value: '/live', isActive: false },
    { id: 8, label: '竞赛', value: '/competition', isActive: true },
    { id: 9, label: '商城', value: '/shop', isActive: false },
    { id: 10, label: 'APP', value: '/APP', isActive: true },
    { id: 11, label: '插件', value: '/plugin', isActive: false }
  ]

  return {
    initialValue: {
      tags: tags
    }
  }
}

export default App
