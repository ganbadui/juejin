import React, { memo, ReactElement } from 'react'
import type { FC } from 'react'
import styles from './index.module.scss'
import { Articles } from './config'
import Link from 'next/link'
import { Article } from '@/pages/article/[articleId]'
import { NextPage } from 'next'

interface IArticles {
  article: string
  lover: number
  comment: number
}

export interface RelatedArticlesType {
  id: number
  tagName: string
  articles: Article[]
}

interface IProps {
  relatedArticles: RelatedArticlesType
}

const RelatedArticles: NextPage<IProps> = memo(({ relatedArticles }) => {
  let articles = relatedArticles.articles
  if (articles.length > 10) {
    articles = articles.slice(0, 10)
  }

  return (
    <div className={styles.related}>
      <div className={styles.title}>相关文章</div>
      {articles?.map(item => (
        <Link key={item.id} href={`/article/${item.id}`}>
          <div className={styles.entry}>
            <div className={styles.list} key="index">
              <div className={styles.content}>{item?.title}</div>
              <div className={styles.meta}>
                <div className={styles.entrymeta}>{200}点赞</div>
                <div className={styles.entrymeta}>&nbsp;·&nbsp;</div>
                <div className={styles.entrymeta}>{10}评论</div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
})

export default RelatedArticles
RelatedArticles.displayName = 'RelatedArticles'
