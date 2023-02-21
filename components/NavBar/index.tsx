import React, { useContext, useEffect, useState } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'
import { NextPage } from 'next'
import { HomeContext } from '@/pages'
import service from '@/service/fetch'
import classNames from 'classnames'

interface IProps {
  tagsData: any[]
}
export const NavBar: NextPage<IProps> = ({ tagsData }) => {
  const [tagId, setTagId] = useState(2)

  const { state, dispatch } = useContext(HomeContext)

  const handleClick = (id: number) => {
    setTagId(id)
  }

  useEffect(() => {
    let filterArticles = []
    if (tagId !== 2) {
      service.get(`/api/tagArticle?tagID=${tagId}`).then(res => {
        filterArticles = res.data as any
        dispatch({ type: 'UPDATE_TAG', data: filterArticles })
      })
    } else if (tagId === 2) {
      filterArticles = (
        localStorage.getItem('bigData')
          ? JSON.parse(localStorage.getItem('bigData') as any)
          : localStorage.setItem('bigData', JSON.stringify(state.listData))
      ) as any

      dispatch({ type: 'UPDATE_TAG', data: filterArticles })
    }
  }, [tagId])

  return (
    <div className={styles.navContainer}>
      <ul className={styles.navList}>
        {tagsData.map(item => {
          return (
            <li
              key={item.id}
              className={classNames(styles.navItem, {
                [styles['active']]: item.id === tagId
              })}
              onClick={() => {
                handleClick(item.id)
              }}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
      <Link href={'/'} className={styles.navItemRight}>
        标签管理
      </Link>
    </div>
  )
}
