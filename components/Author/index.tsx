import styles from './index.module.scss'
import { NextPage } from 'next'
export interface userInfo {
  userName: string
  occupation?: string
  introduce?: string
  author?: Record<string, any>
}

interface Iprops {
  userInfo?: userInfo
}

export const Author: NextPage<Iprops> = ({ userInfo }) => {
  return (
    <div className={styles.container}>
      <img className={styles.head}></img>
      <div className={styles.content}>
        <div className={styles.username}>{userInfo?.userName}</div>
        <div className={styles.introduce}>{userInfo?.introduce}</div>
      </div>
    </div>
  )
}
