import React, { useRef } from 'react'

import styles from './index.module.scss'
import { Brochure, NavBar } from '@/components'
import ArticleList, { ListItem } from '@/components/articleList'
import { getAList } from '@/service/articleData'
import { GetServerSideProps } from 'next'
import { useScroll } from '@/hooks/useScroll'

interface IProps {
  listData: ListItem[]
}

export default function Home({ listData }: IProps) {
  const NavRef = useRef<HTMLDivElement>(null)

  useScroll(() => {
    if (document.documentElement.scrollTop > 200) {
      NavRef.current!.style.top = '0px'
    } else {
      NavRef.current!.style.top = '5rem'
    }
  })

  return (
    <div className={styles.Home}>
      <div className={styles.container}>
        <nav className={styles.nav} ref={NavRef}>
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
  const pageSize = 15
  const listData = await getAList(page, pageSize)

  return {
    props: {
      listData: listData.data
    }
  }
}
