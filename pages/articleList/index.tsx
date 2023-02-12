import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { List, Space, message } from 'antd'
import VirtualList from 'rc-virtual-list'
import Link from 'next/link'

interface ListItem {
  id: number
  title: string
  avatar: string
  content: string
}
const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)
// 内容高度，用于判断是否滚动到底部
const ContainerHeight = 2531
const ArticleList: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([])

  //设置假数据
  useEffect(() => {
    const data = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      title: `我被骂了，但我学会了如何构造高性能的树状结构🔥${i}`,
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',
      content: 'aas tsete'
    }))
    setData(data)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const appendData = () => {}

  useEffect(() => {
    appendData()
  }, [])
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData()
    }
  }

  const [active, setActive] = useState('推荐')
  const listData = ['推荐', '最新', '最热']
  const handleClick = (label: string) => {
    setActive(label)
    //todo: 请求数据
  }
  return (
    <div className={styles.articleList} onScroll={onScroll}>
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
        <List itemLayout="vertical" size="large">
          <VirtualList
            data={data}
            itemHeight={47}
            height={ContainerHeight}
            itemKey="item.title"
          >
            {(item: ListItem) => (
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
                  <span>test</span>
                  <span>一个月前</span>
                  <span>分类.标签</span>
                </div>
                <List.Item.Meta
                  title={<Link href={''}>{item.title}</Link>}
                  description={item.content}
                />
              </List.Item>
            )}
          </VirtualList>
        </List>
      </div>
    </div>
  )
}

// 服务端获取数据
// export async function getServerSideProps() {}

export default ArticleList
