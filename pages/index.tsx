import React from 'react'
import ArticleList from './articleList'
import styles from './index.module.scss'
import { NavBar } from '@/components'
import Brochure from '@/components/Brochure'
export default function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <NavBar />
        </nav>
        <div className={styles.content}>
          <ArticleList />
          <div className={styles.rightcontent}>
            <Brochure></Brochure>
          </div>
        </div>
      </div>
    </div>
  )
}
