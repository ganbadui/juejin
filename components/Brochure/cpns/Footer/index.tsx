import React, { memo, ReactElement } from 'react'
import type { FC } from 'react'
import styles from './index.module.scss'
export interface IProps {
  children?: ReactElement
}
const Footer: FC<IProps> = memo(props => {
  const { children } = props
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.time}>
          <div className={styles.good}>早上好</div>
          <div className={styles.slogal}>点亮社区的每一天</div>
        </div>
        <button className={styles.attend}>
          <span>去签到</span>
        </button>
      </div>
    </div>
  )
})

export default Footer
Footer.displayName = 'Footer'
