import React, { memo, ReactElement, ReactNode } from 'react'
import type { FC } from 'react'
import styles from './index.module.scss'
import { NextPage } from 'next'
import { Avatar, Space } from 'antd'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import service from '@/service/fetch'
import { IAuthor } from '@/components/Brochure/types/author'

interface IProps {
  children?: ReactElement
  authorList: IAuthor[]
}
const Authors: FC<IProps> = memo(props => {
  const { authorList } = props
  const data: any[] = authorList.slice(0, 3)
  // const [data, setData] = useState<any>([])
  // const dataRef = useRef(data)
  // useEffect(() => {
  //   setTimeout(() => {
  //     const fetchData = async () => {
  //       const res = await axios('https://api.skyseek.top/api/user-names')
  //       setData(res.data.data)
  //     }
  //     fetchData()
  //   }, 0)
  // }, [])
  // useEffect(() => {
  //   setTimeout(() => {
  //     dataRef.current = data
  //   })
  // }, [])
  // console.log(data)
  // const { authorsData } = props
  // console.log(authorsData)
  return (
    <div className={styles.container}>
      <div>
        {/* <div className={styles.username}>hhh</div> */}
        {data?.map(
          (item: {
            id: number
            name: string
            introduce: string
            avatar: string
          }) => (
            <div key={item.id} className={styles.content}>
              <div className={styles.head}>
                <img src={item.avatar} alt="" />
              </div>
              <div className={styles.message}>
                <div className={styles.name}>
                  <div className={styles.username}>{item?.name}</div>
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
