import React, { memo, ReactElement } from 'react'
import type { FC } from 'react'
import Advertisement from './cpns/Advertisement'
import Footer from './cpns/Footer'
import AuthorList from './cpns/AuthorList'
import GuideBook from './cpns/GuideBook'
import styles from './index.module.scss'
import Arts from './cpns/Arts'

export interface IProps {
  children?: ReactElement
}
const Brochure: FC<IProps> = memo(props => {
  const { children } = props
  return (
    <div className={styles.brochure}>
      <Footer></Footer>
      <Arts></Arts>
      <Advertisement></Advertisement>
      <AuthorList></AuthorList>
      <GuideBook></GuideBook>
    </div>
  )
})

export default Brochure
Brochure.displayName = 'Brochure'
