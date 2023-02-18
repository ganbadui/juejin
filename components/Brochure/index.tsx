import React, { memo, ReactElement } from 'react'
import type { FC } from 'react'
import Advertisement from './cpns/Advertisement'
import Footer from './cpns/Footer'
import AuthorList from './cpns/AuthorList'
import GuideBook from './cpns/GuideBook'
import styles from './index.module.scss'
import Arts from './cpns/Arts'
import useSlide from '@/hooks/useSlide'
import classNames from 'classnames'
// import { Affix } from 'antd'
// import { useState } from 'react'

export interface IProps {
  children?: ReactElement
}
export const Brochure: FC<IProps> = memo(props => {
  // const [top, setTop] = useState(120)
  const { sideFixed, isUp } = useSlide(2)
  const { children } = props
  return (
    <div className={styles.brochure}>
      {!sideFixed && <Footer></Footer>}
      {/* <Footer></Footer> */}

      {/* <Affix offsetTop={top}> */}
      <div
        className={classNames({
          [styles['side-fixed']]: sideFixed,
          [styles.top]: isUp
        })}
      >
        <Arts></Arts>
        <Arts></Arts>
        <Advertisement></Advertisement>
      </div>

      {/* </Affix> */}

      {!sideFixed && (
        <>
          <AuthorList></AuthorList>
          <GuideBook></GuideBook>
        </>
      )}
    </div>
  )
})

Brochure.displayName = 'Brochure'
