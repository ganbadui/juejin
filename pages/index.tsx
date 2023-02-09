import React from 'react'
import ArticleList from './articleList'
import { Author } from '@/components'
import styles from './index.module.scss'
export default function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.container}>
        <nav className={styles.nav} />
        <div className={styles.content}>
          <Author />
          <aside className={styles.aside} />
        </div>
      </div>
    </div>
  )
}
