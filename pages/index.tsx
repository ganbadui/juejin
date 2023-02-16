import React from 'react'

import styles from './index.module.scss'
import { Brochure, NavBar } from '@/components'
import ArticleList from './articleList'

export default function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <NavBar />
        </nav>
        <div className={styles.content}>
          <ArticleList listData={[]} />
          <div className={styles.rightcontent}>
            <Brochure />
          </div>
        </div>
      </div>
    </div>
  )
}
