import React, { memo, ReactElement } from 'react'
import type { FC } from 'react'
import styles from './index.module.scss'
import { Articles } from './config'
import Link from 'next/link'

interface IArticles {
  article: string
  lover: number
  comment: number
}
interface IProps {
  children?: ReactElement
}
const RelatedArticles: FC<IProps> = memo(props => {
  const { children } = props

  return (
    <div className={styles.related}>
      <div className={styles.title}>相关文章</div>
      <Link href={'/'}>
        <div className={styles.entry}>
          {Articles?.map(item => (
            <div className={styles.list} key="index">
              <div className={styles.content}>{item?.article}</div>
              <div className={styles.meta}>
                <div className={styles.entrymeta}>{item.lover}点赞</div>
                <div className={styles.entrymeta}>&nbsp;·&nbsp;</div>
                <div className={styles.entrymeta}>{item.comment}评论</div>
              </div>
            </div>
          ))}
        </div>
      </Link>
    </div>
  )
})

export default RelatedArticles
RelatedArticles.displayName = 'RelatedArticles'
