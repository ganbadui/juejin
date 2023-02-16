import React, { memo, ReactElement } from 'react'
import type { FC } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'

export interface IProps {
  children?: ReactElement
}
const Advertisement: FC<IProps> = memo(props => {
  const { children } = props
  return (
    <div className="downloadApp">
      <Link href="https://juejin.cn/app">
        <div className={styles.card}>
          <div className={styles.content}>
            <div>
              <img
                src={
                  'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png'
                }
                alt=""
              />
            </div>

            <div className={styles.right}>
              <div className={styles.title}> 下载稀土掘金APP </div>
              <div className={styles.desc}> 一个帮助开发者成长的社区 </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
})

export default Advertisement
Advertisement.displayName = 'Advertisement'
