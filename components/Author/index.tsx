import React from 'react'
import styles from './index.module.scss'
interface userInfo {
  userName: string
  occupation: string
  introduce: string
  author?: object
}
//todo 对接接口，prop传数据进来
export const Author: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.head}></div>
      <div className={styles.content}>
        <div className={styles.username}>杨鹏</div>
        <div className={styles.introduce}>大二在读 加油</div>
      </div>
    </div>
  )
}
