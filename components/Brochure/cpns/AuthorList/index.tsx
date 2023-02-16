import React, { memo, ReactElement } from 'react'
import type { FC } from 'react'
import { Card, Space } from 'antd'
import Link from 'next/link'
import Authors from '../Authors'
import styles from './index.module.scss'
import { RightOutlined } from '@ant-design/icons'
export interface IProps {
  children?: ReactElement
}
const AuthorList: FC<IProps> = memo(props => {
  const { children } = props
  return (
    <div className={styles.authorlist}>
      <Card
        title="🎖️作者榜"
        bodyStyle={{ padding: 0 }}
        style={{ border: 'none' }}
        className={styles.bac}
      >
        <div className={styles.item}>
          <Authors></Authors>
        </div>
        {/* <div className={styles.item}>
          <Authors></Authors>
        </div>
        <div className={styles.item}>
          <Authors></Authors>
        </div> */}

        <Link href="#" className={styles.more}>
          <div className={styles.top}>
            <span>完整榜单</span>
            <RightOutlined />
          </div>
        </Link>
      </Card>
    </div>
  )
})

export default AuthorList
AuthorList.displayName = 'AuthorList'
