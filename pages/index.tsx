import React from 'react'

import styles from './index.module.scss'
import { Brochure, NavBar } from '@/components'
import ArticleList, { ListItem } from '@/components/articleList'
import { getAList } from '@/service/articleData'
import { GetServerSideProps } from 'next'

interface IProps {
  listData: ListItem[]
}

export default function Home({ listData }: IProps) {
  return (
    <div className={styles.Home}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <NavBar />
        </nav>
        <div className={styles.content}>
          <ArticleList listData={listData} />
          <div className={styles.rightcontent}>
            <Brochure />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const page = 1
  const pageSize = 10
  const listData = await getAList(page, pageSize)

  return {
    props: {
      listData: listData.data
    }
  }
}
