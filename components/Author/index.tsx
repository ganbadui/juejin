import { useEffect } from 'react'
import styles from './index.module.scss'
import { NextPage } from 'next'
import service from '@/service/fetch'
export interface UserInfo {
  id: number
  userName: string
  occupation?: string
  introduce?: string
  author?: Record<string, any>
}

export interface AvatarData {
  id: number
  name: string
  picture: string
}

interface Iprops {
  userInfo: UserInfo
  avatarData: AvatarData
}

export const Author: NextPage<Iprops> = ({ userInfo, avatarData }) => {
  return (
    <div className={styles.container}>
      <img className={styles.head} src={avatarData.picture}></img>
      <div className={styles.content}>
        <div className={styles.username}>{userInfo?.userName}</div>
        <div className={styles.introduce}>{userInfo?.introduce}</div>
      </div>
    </div>
  )
}
