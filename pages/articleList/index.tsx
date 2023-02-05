import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

import { EyeOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import { Avatar, List, Space, message } from 'antd'
import VirtualList from 'rc-virtual-list'

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: 'https://joeschmoe.io/api/v1/random',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
}))

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

interface ListItem {
  href: string
  title: string
  avatar: string
  content: string
}

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo'
const ContainerHeight = 400
const ArticleList: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([])

  const appendData = () => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(body => {
        setData(data.concat(body.results))
        message.success(`${body.results.length} more items loaded!`)
      })
  }

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

  return (
    <div className={styles.articleList}>
      <header className={`${styles.list_header}`}>
        <span>推荐</span>
        <span>最新</span>
        <span>最热</span>
      </header>

      <div className={styles.list_content}>
        <List itemLayout="vertical" size="large">
          <VirtualList
            data={data}
            height={ContainerHeight}
            itemHeight={47}
            onScroll={onScroll}
            itemKey="item.title"
          >
            {(item: ListItem) => (
              <List.Item
                key={item.title}
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
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
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
