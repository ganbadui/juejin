import { Author } from '@/components'
import { AvatarData, UserInfo } from '@/components/Author'
import { Column } from '@/components/Column'
import { Banner } from '@/components/Banner'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import ReactMarkdown from 'react-markdown'
import markdownCss from './juejin.module.scss'
import styles from './index.module.scss'
import { GetServerSideProps, NextPage } from 'next'
import RelatedArticles, {
  RelatedArticlesType
} from '@/components/RelatedArticles'
import service from '@/service/fetch'
import { observer } from 'mobx-react-lite'
import { useScroll } from '@/hooks/useScroll'
import { useStore } from '@/store'

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
  userInfo: UserInfo
  pagination?: Pagination
  avartarData: AvatarData
}

interface IProps {
  article: Article
  relatedArticles: RelatedArticlesType
  avatarData: AvatarData
}

const Article: NextPage<IProps> = ({
  article,
  relatedArticles,
  avatarData
}) => {
  const store = useStore().project

  useScroll(() => {
    if (document.documentElement.scrollTop > 200) {
      store.setNeedMove(true)
    } else {
      store.setNeedMove(false)
    }
  })
  // const [md, changeMd] = useState()
  return (
    <div className={styles.article}>
      <div className={styles.content}>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.author}>
          <Author userInfo={article.userInfo} avatarData={avatarData} />
        </div>
        <div>
          <ReactMarkdown
            className={`${styles.markdownContent} ${markdownCss.markdownBody}`}
          >
            {article.content}
          </ReactMarkdown>
        </div>
        <div className={styles.tagListBox}>
          <div className={styles.tagList}>
            分类： <span>{article.acticleTag?.tagName}</span>
          </div>
          <div className={styles.tagList}>
            标签：
            <span className={styles.tag}>{article.acticleTag?.tagName}</span>
          </div>
        </div>
        <Column></Column>
        <Banner></Banner>
      </div>
      <div className={styles.sider}>
        <Author userInfo={article.userInfo} avatarData={avatarData} />
        <RelatedArticles relatedArticles={relatedArticles} />
        <div className={styles.navbar}>
          <div className={styles.navTitle}>目录</div>
          <MarkNav
            source={article.content}
            headingTopOffset={80}
            ordered={false}
          />
        </div>
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
    `api/relatedArticles?tagName=${tagName}&pageSize=${10}`
  )

  const avatarData = await service.get(`/api/avatar?id=${article.userInfo.id}`)

  return {
    props: {
      article,
      relatedArticles,
      avatarData
    }
  }
}

export default observer(Article)
