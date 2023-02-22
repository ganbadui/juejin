import React, { useContext, useEffect, useState } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'
import { NextPage } from 'next'
import { HomeContext } from '@/pages'
import service from '@/service/fetch'
import classNames from 'classnames'
import { getAList } from '@/service/articleData'

interface IProps {
  tagsData: any[]
}
export const NavBar: NextPage<IProps> = ({ tagsData }) => {
  const [tagId, setTagId] = useState(2)

  const page = 1
  const pageSize = 15

  const { state, dispatch } = useContext(HomeContext)

  const handleClick = (id: number) => {
    setTagId(id)
  }

  useEffect(() => {
    let filterArticles = []
    getAList({ page, pageSize, tagId: tagId }).then(res => {
      filterArticles = res.data as any
      dispatch({ type: 'UPDATE_TAG', data: filterArticles })
    })
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
