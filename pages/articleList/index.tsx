import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { List } from 'antd'
import Link from 'next/link'
import { getArticleList } from '@/service/articleData'
import { IconText } from '@/components'

interface ListItem {
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

const ArticleList: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([])

  //设置假数据
  useEffect(() => {
    const page = 1
    const pageSize = 10
    getArticleList(page, pageSize).then(res => {
      console.log(res.data.data)
      const list = res.data.data
      setData(list)
    })
  }, [])

  const [active, setActive] = useState('推荐')
  const listData = ['推荐', '最新', '最热']
  const handleClick = (label: string) => {
    setActive(label)
    //todo: 请求数据
  }
  return (
    <div className={styles.articleList}>
      <header className={`${styles.list_header}`}>
        {listData.map(label => (
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
          dataSource={data}
          renderItem={(item: ListItem) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText
                  icon={EyeOutlined}
                  text="156"
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={LikeOutlined}
                  text="156"
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text="2"
                  key="list-vertical-message"
                />
              ]}
              extra={
                <img width={120} height={80} alt="logo" src={item.avatar} />
              }
              className={styles.list_item}
            >
              <div className="list_item_header">
                <span>{item.author}</span>
                <span>{item.publishTime}</span>
                <span>{item.tag}</span>
              </div>
              <List.Item.Meta
                title={<Link href={''}>{item.title}</Link>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default ArticleList
