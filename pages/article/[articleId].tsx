import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import { Author } from '@/components'
import styles from './index.module.scss'
import { Layout } from 'antd'
import { GetServerSideProps, NextPage } from 'next'
import RelatedArticles from '@/components/RelatedArticles'

const { Content, Sider } = Layout
interface IProps {
  articleId: number
}

const Article: NextPage<IProps> = ({ articleId }) => {
  const store = useStore()

  const demo = store.demo.demoInfo

  return (
    <div className={styles.article}>
      <div className={styles.content}>
        <h1>文章{articleId}</h1>
        <main>内容:{demo.value}</main>
      </div>
      <div className={styles.sider}>
        <Author />
        <RelatedArticles />
      </div>
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
