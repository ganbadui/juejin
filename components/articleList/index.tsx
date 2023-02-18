import React, { useState } from 'react'
import styles from './index.module.scss'

import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { List } from 'antd'
import Link from 'next/link'
import { IconText } from '@/components'
import { NextPage } from 'next'
import formatTime from '@/utils/formatTime'

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
  return (
    <div className={styles.articleList}>
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
        <List
          itemLayout="vertical"
          size="large"
          dataSource={listData}
          renderItem={(item: ListItem) => (
            <List.Item key={item.id} className={styles.list_item}>
              <div className={styles.list_item_header}>
                <Link href={'/'} className={styles.list_item_header_author}>
                  {item.author}
                </Link>
                <div className={styles.list_item_header_date}>
                  {formatTime(item.publishTime)}
                </div>
                <span className={styles.list_item_header_tag}>{item.tag}</span>
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
      </div>
    </div>
  )
}

export default ArticleList
