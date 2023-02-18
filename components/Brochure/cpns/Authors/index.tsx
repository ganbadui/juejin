import React, { memo, ReactElement, ReactNode } from 'react'
import type { FC } from 'react'
import styles from './index.module.scss'
import { NextPage } from 'next'
import { Avatar, Space } from 'antd'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import service from '@/service/fetch'
export interface IProps {
  children?: ReactElement
}
export interface IData {
  user_name: string
  introduce?: string
  id: number
}

interface Iprops {
  data: IData
}
const Authors: FC<IProps> = memo(props => {
  const { children } = props
  const [data, setData] = useState<any>([])
  const dataRef = useRef(data)
  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        const res = await axios('https://api.skyseek.top/api/user-names')
        setData(res.data.data)
      }
      fetchData()
    }, 0)
  }, [])
  useEffect(() => {
    setTimeout(() => {
      dataRef.current = data
    })
  }, [])
  // console.log(data)
  return (
    <div className={styles.container}>
      <div>
        {/* <div className={styles.username}>hhh</div> */}
        {data?.map(
          (item: {
            id: number
            user_name: string
            userName: string
            introduce: string
          }) => (
            <div key={item.id} className={styles.content}>
              <div className={styles.head}>
                <Avatar
                  size={48}
                  src="https://th.bing.com/th/id/R.160ae87eb242e65162dca36eb63e2afb?rik=NCipDHpOILkd4w&riu=http%3a%2f%2fimg2.woyaogexing.com%2f2017%2f07%2f08%2fb7ebc7eb1c765bf5!400x400_big.jpg&ehk=Age%2fj8yR9anev1Nkk%2fFt1o%2fijYCJfkwcH1Y%2bbakWju0%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1"
                />
              </div>
              <div className={styles.message}>
                <div className={styles.name}>
                  <div className={styles.username}>{item?.user_name}</div>
                  <img
                    src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-5.d08789d.png"
                    alt=""
                    width={35}
                    height={16}
                  />
                </div>
                <div className={styles.introduce}>{item?.introduce}</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
})

export default Authors
Authors.displayName = 'Authors'
