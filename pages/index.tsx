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
  // const listData = await getAList(page, pageSize)

  const listData = {
    data: [
      {
        id: 1,
        title: 'title1',
        description: 'description1',
        avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
        tag: 'tag1',
        author: 'author1',
        publishTime: '2021-01-01'
      }
    ]
  }

  return {
    props: {
      listData: listData.data
    }
  }
}
