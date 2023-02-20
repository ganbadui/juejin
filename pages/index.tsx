import React, { useReducer, useRef, createContext } from 'react'

import styles from './index.module.scss'
import { Brochure, NavBar } from '@/components'
import ArticleList, { ListItem } from '@/components/articleList'
import { getAList, getArticleTag } from '@/service/articleData'
import { GetServerSideProps } from 'next'
import { useScroll } from '@/hooks/useScroll'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'

export const HomeContext = createContext<any>({})

interface IProps {
  listData: ListItem[]
  tagsData: any[]
}

function Home({ listData, tagsData }: IProps) {
  const store = useStore().project

  useScroll(() => {
    if (document.documentElement.scrollTop > 200) {
      store.setNeedMove(true)
    } else {
      store.setNeedMove(false)
    }
  })

  const initialState: IProps = {
    listData,
    tagsData
  }

  function reducer(state: IProps, action: any) {
    switch (action.type) {
      case 'UPDATE_TAG':
        return {
          ...state,
          listData: action.data
        }
      default:
        return initialState
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className={styles.Home}>
      <div className={styles.container}>
        <HomeContext.Provider value={{ state, dispatch }}>
          <nav className={classNames(styles.nav, { move: store.needMove })}>
            <NavBar tagsData={state.tagsData} />
          </nav>
          <div className={styles.content}>
            <ArticleList listData={state.listData} />
            <div className={styles.rightcontent}>
              <Brochure />
            </div>
          </div>
        </HomeContext.Provider>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const page = 1
  const pageSize = 15
  const listData = await getAList(page, pageSize)

  const tagsData = await getArticleTag()

  return {
    props: {
      listData: listData.data,
      tagsData: tagsData.data
    }
  }
}

export default observer(Home)
