import { Author } from '@/components'
import { userInfo } from '@/components/Author'
import MarkNav from 'markdown-navbar'
import { md } from './config'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css'
import 'markdown-navbar/dist/navbar.css'
import styles from './index.module.scss'
import { GetServerSideProps, NextPage } from 'next'
import RelatedArticles, {
  RelatedArticlesType
} from '@/components/RelatedArticles'
import service from '@/service/fetch'

interface articleTag {
  id: number
  tagName: string
}

interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface Article {
  id: number
  title: string
  description: string
  content: string
  acticleTag?: articleTag
  userInfo?: userInfo
  pagination?: Pagination
}

interface IProps {
  article: Article
  relatedArticles: RelatedArticlesType
}

const Article: NextPage<IProps> = ({ article, relatedArticles }) => {
  // const [md, changeMd] = useState()
  return (
    <div className={styles.article}>
      <div className={styles.content}>
        <div className={styles.title}>{article.title}</div>
        <div>
          <ReactMarkdown className={`${styles.markdownContent} markdown-body`}>
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
      <div className={styles.sider}>
        <Author userInfo={article.userInfo} />
        <RelatedArticles relatedArticles={relatedArticles} />
        <MarkNav
          className={styles.navbar}
          source={md}
          headingTopOffset={80}
          ordered={false}
        />
      </div>
    </div>
  )
}

// 服务端获取数据
export const getServerSideProps: GetServerSideProps = async ({
  params
}: any) => {
  const articleId = params.articleId

  const article: Article = await service.get(
    `api/article?articleId=${articleId}`
  )

  const tagName = article.acticleTag?.tagName
  const pagination = article.pagination

  const relatedArticles = await service.get(
    `api/relatedArticles?tagName=${tagName}&pageSize=${
      pagination?.pageSize || 5
    }`
  )

  return {
    props: {
      article,
      relatedArticles
    }
  }
}

export default Article
