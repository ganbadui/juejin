import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { List, Space, message } from 'antd'
import VirtualList from 'rc-virtual-list'

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

interface ListItem {
  id: number
  title: string
  avatar: string
  content: string
}

// 内容高度，用于判断是否滚动到底部
const ContainerHeight = 1000
const ArticleList: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([])

  //设置假数据
  useEffect(() => {
    const data = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      title: `ant design part ${i}`,
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
        <List itemLayout="vertical" size="large">
          <VirtualList
            data={data}
            itemHeight={47}
            height={ContainerHeight}
            onScroll={onScroll}
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
                extra={<img width={272} alt="logo" src={item.avatar} />}
              >
                <List.Item.Meta title={item.title} />
                {item.content}
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
