import React, { useRef } from 'react'

import styles from './index.module.scss'
import { Brochure, NavBar } from '@/components'
import ArticleList, { ListItem } from '@/components/articleList'
import { getAList } from '@/service/articleData'
import { GetServerSideProps } from 'next'
import { useScroll } from '@/hooks/useScroll'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'

interface IProps {
  listData: ListItem[]
}

function Home({ listData }: IProps) {
  const store = useStore().project

  useScroll(() => {
    if (document.documentElement.scrollTop > 200) {
      store.setNeedMove(true)
    } else {
      store.setNeedMove(false)
    }
  })

  return (
    <div className={styles.Home}>
      <div className={styles.container}>
        <nav className={classNames(styles.nav, { move: store.needMove })}>
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

export default observer(Home)
