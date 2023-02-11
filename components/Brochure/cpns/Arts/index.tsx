import React, { memo, ReactElement } from 'react'
import type { FC } from 'react'
import styles from './index.module.scss'
export interface IProps {
  children?: ReactElement
}
const Arts: FC<IProps> = memo(props => {
  const { children } = props
  return (
    <div className="arts">
      <div className={styles.banner}>
        <a href="https://juejin.cn/book/7180604185786712075?utm_source=web_banner&amp;utm_medium=banner&amp;utm_campaign=xiaoce_nacos_20230208">
          <img
            src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e74d078b35f4c1da88965f08adfa146~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?"
            width="240"
            height="200"
            className={styles.bannerimage}
          />
        </a>
      </div>
    </div>
  )
})

export default Arts
Arts.displayName = 'Arts'
