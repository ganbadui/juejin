import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Divider, List, Skeleton } from 'antd'
import Link from 'next/link'
import { IconText } from '@/components'
import { NextPage } from 'next'
import formatTime from '@/utils/formatTime'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getAList } from '@/service/articleData'

export interface ListItem {
  id: number
  title: string
  description: string
  avatar: string
  tag: string
  //作者
  author: string
  //发布时间
  publishTime: string
}

interface IProps {
  listData: ListItem[]
}
const ArticleList: NextPage<IProps> = ({ listData }) => {
  const [active, setActive] = useState('推荐')
  const listTopData = ['推荐', '最新', '最热']
  const handleClick = (label: string) => {
    setActive(label)
    //todo: 请求数据
  }

  const router = useRouter()

  const [tagID, setTagId] = useState(2)
  const pageSize = 10
  const [list, setList] = useState(listData)
  const pageRef = useRef(1)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  const getList = async (isLoadMore?: boolean) => {
    setLoading(true)
    const res = await getAList({
      page: isLoadMore ? pageRef.current + 1 : 1,
      pageSize,
      tagId: tagID
    })
    setLoading(false)
    if (isLoadMore) {
      setList([...list, ...res.data.lsit])
      setPageRef(pageRef.current + 1)
    } else {
      setList(res.data.list)
      setPageRef(1)
    }
  }

  useEffect(() => {
    getList()
  }, [])
  // 用于更新 pageRef
  const setPageRef = useCallback(
    (newPage: number) => {
      pageRef.current = newPage
    },
    [pageRef]
  )
  const loadMoreData = async () => {
    if (!loading && hasMore) {
      setLoading(true)
      const res = await getAList({
        page: pageRef.current + 1,
        pageSize,
        tagId: tagID
      })
      setLoading(false)
      setList(prevList => [...prevList, ...res.data.list])
      setPageRef(pageRef.current + 1)
      setHasMore(res.data.list.length > 0 && res.data.list.length === pageSize)
    }
  }

  console.log('loading', loading)
  console.log('hasMore', hasMore)
  console.log('pageRef', pageRef.current)

  return (
    <div id="scrollableDiv" className={styles.articleList}>
      <header className={`${styles.list_header}`}>
        {listTopData.map(label => (
          <span
            key={label}
            onClick={() => handleClick(label)}
            className={active === label ? `${styles.active}` : ''}
          >
            {label}
          </span>
        ))}
      </header>

      <div className={styles.list_content}>
        <InfiniteScroll
          dataLength={list.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>没有更多了 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            itemLayout="vertical"
            size="large"
            dataSource={list}
            renderItem={(item: ListItem) => (
              <List.Item
                key={item.id}
                className={styles.list_item}
                onClick={() => router.push(`/article/${item.id}`)}
              >
                <div className={styles.list_item_header}>
                  <Link href={'/'} className={styles.list_item_header_author}>
                    {item.author}
                  </Link>
                  <div className={styles.list_item_header_date}>
                    {formatTime(item.publishTime)}
                  </div>
                  <span className={styles.list_item_header_tag}>
                    {item.tag}
                  </span>
                </div>
                <div className={styles.list_item_content}>
                  <div className={styles.list_item_content_left}>
                    <List.Item.Meta
                      title={<Link href={''}>{item.title}</Link>}
                      description={item.description}
                    />
                    <div className={styles.list_item_content_left_icon}>
                      <IconText
                        icon={EyeOutlined}
                        text="156"
                        key="list-vertical-star-o"
                      />

                      <IconText
                        icon={LikeOutlined}
                        text="156"
                        key="list-vertical-like-o"
                      />

                      <IconText
                        icon={MessageOutlined}
                        text="2"
                        key="list-vertical-message"
                      />
                    </div>
                  </div>

                  {item.avatar && (
                    <img className={styles.list_item_thumb} src={item.avatar} />
                  )}
                </div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default ArticleList
