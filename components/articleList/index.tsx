import React, { useEffect, useRef, useState } from 'react'
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
  const [loading, setLoading] = useState(false)

  const data = [...listData]
  //使得data动态更新

  const [list, setList] = useState(data)
  const [page, setPage] = useState(2)
  const loadMoreData = async () => {
    if (loading) {
      return
    }
    setLoading(true)

    const pageSize = 10
    // 调用文章列表接口
    const newData: any = await (await getAList(page, pageSize)).data

    // 更新数据
    setList(list.concat(newData))

    setLoading(true)
    console.log(list)

    // 更新页码
    setPage(page + 1)

    console.log(page)
  }
  useEffect(() => {
    loadMoreData()
  }, [])

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
          hasMore={list.length < 15}
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
