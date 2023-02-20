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
  // const list = [
  //   {
  //     id: 0,
  //     name: '综合',
  //     url: '/recommended',
  //     badge: 0
  //   },
  //   {
  //     id: 1,
  //     name: '关注',
  //     url: '/following',
  //     badge: 2
  //   },
  //   {
  //     id: 2,
  //     name: '后端',
  //     url: '/backend',
  //     badge: 0,
  //     children: [
  //       {
  //         name: '后端',
  //         url: '/backend'
  //       },
  //       {
  //         name: 'Java',
  //         url: '/backend/java'
  //       },
  //       {
  //         name: '掘金·日新计划',
  //         url: '/backend'
  //       },
  //       {
  //         name: 'Go',
  //         url: '/backend/java'
  //       },
  //       {
  //         name: '架构',
  //         url: '/backend'
  //       },
  //       {
  //         name: '数据库',
  //         url: '/backend/java'
  //       },
  //       {
  //         name: 'Spring Boot',
  //         url: '/backend'
  //       },
  //       {
  //         name: '掘金·百日计划',
  //         url: '/backend/java'
  //       },
  //       {
  //         name: 'Spring',
  //         url: '/backend'
  //       },
  //       {
  //         name: 'ElasticSearch',
  //         url: '/backend/java'
  //       },
  //       {
  //         name: '算法',
  //         url: '/backend/java'
  //       },
  //       {
  //         name: '面试',
  //         url: '/backend/java'
  //       },
  //       {
  //         name: 'MySQL',
  //         url: '/backend/java'
  //       },
  //       {
  //         name: 'Redis',
  //         url: '/backend/java'
  //       },
  //       {
  //         name: 'Kubernetes',
  //         url: '/backend/java'
  //       }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     name: '前端',
  //     url: '/frontend',
  //     badge: 0
  //   },
  //   {
  //     id: 4,
  //     name: 'Android',
  //     url: '/android',
  //     badge: 0
  //   },
  //   {
  //     id: 5,
  //     name: 'iOS',
  //     url: '/ios',
  //     badge: 0
  //   },
  //   {
  //     id: 6,
  //     name: '人工智能',
  //     url: '/ai',
  //     badge: 0
  //   },
  //   {
  //     id: 7,
  //     name: '开发工具',
  //     url: '/freebie',
  //     badge: 0
  //   },
  //   {
  //     id: 8,
  //     name: '代码人生',
  //     url: '/career',
  //     badge: 0
  //   },
  //   {
  //     id: 9,
  //     name: '阅读',
  //     url: '/article',
  //     badge: 0
  //   }
  // ]

  const [tagId, setTagId] = useState(0)

  const { state, dispatch } = useContext(HomeContext)

  const handleClick = (id: number) => {
    setTagId(id)
  }

  useEffect(() => {
    let filterArticles = []
    if (tagId !== 0) {
      service.get(`/api/tagArticle?tagID=${tagId}`).then(res => {
        filterArticles = res.data as any
        dispatch({ type: 'UPDATE_TAG', data: filterArticles })
      })
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
