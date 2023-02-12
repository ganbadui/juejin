import { Author } from '@/components'
import MarkNav from 'markdown-navbar'
import { useState, useEffect } from 'react'
import { md } from './config'
import ReactMarkdown from 'react-markdown'
import 'github-markdown-css'
import 'markdown-navbar/dist/navbar.css'
import styles from './index.module.scss'
import { GetServerSideProps, NextPage } from 'next'
import RelatedArticles from '@/components/RelatedArticles'
import fetch from '@/service/fetch'

interface IProps {
  articleId: number
}

const Article: NextPage<IProps> = ({ articleId }) => {
  // const [md, changeMd] = useState()
  return (
    <div className={styles.article}>
      <div className={styles.content}>
        <div className={styles.title}>Vite知识体系 | 青训营笔记</div>
        <div>
          <ReactMarkdown className={`${styles.markdownContent} markdown-body`}>
            {md}
          </ReactMarkdown>
        </div>
      </div>
      <div className={styles.sider}>
        <Author />
        <RelatedArticles />
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
export const getServerSideProps: GetServerSideProps = async context => {
  const { articleId } = context.query

  return {
    props: {
      articleId
    }
  }
}

export default Article
