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
import { IAuthor } from '@/components/Brochure/types/author'

export interface IProps {
  children?: ReactElement
  authorList: IAuthor[]
}
export const Brochure: FC<IProps> = memo(props => {
  const { authorList } = props

  const { sideFixed, isUp } = useSlide(2)
  const { children } = props
  return (
    <div className={styles.brochure}>
      {!sideFixed && <Footer></Footer>}

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
          <AuthorList authorList={authorList}></AuthorList>
          <GuideBook></GuideBook>
        </>
      )}
    </div>
  )
})

Brochure.displayName = 'Brochure'
