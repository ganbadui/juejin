import React, { memo, ReactElement } from 'react'
import type { FC } from 'react'
import { items } from './config'
import Link from 'next/link'
import styles from './index.module.scss'
import { Image } from 'antd'
export interface IProps {
  children?: ReactElement
}
const GuideBook: FC<IProps> = memo(props => {
  const { children } = props
  return (
    <div className="GuideBook">
      <ul className={styles.links}>
        {items.map(({ href, image, title }, index) => (
          <li key={index}>
            <Link href={href} className={styles.item}>
              <Image
                className={styles.img}
                src={image.src}
                alt={title}
                width={image.width}
                height={image.height}
              />
              <span className={styles.title}>{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
})

export default GuideBook
GuideBook.displayName = 'GuideBook'
