import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { GetServerSideProps, NextPage } from 'next'

interface IProps {
  articleId: number
}

const Article: NextPage<IProps> = ({ articleId }) => {
  const store = useStore()

  const demo = store.demo.demoInfo

  return (
    <div>
      <h1>文章{articleId}</h1>
      <main>内容:{demo.value}</main>
    </div>
  )
}

// 服务端获取数据
export const getServerSideProps: GetServerSideProps = async context => {
  const { articleId } = context.query
  return {
    props: {
      articleId
    }
  }
}

export default observer(Article)
