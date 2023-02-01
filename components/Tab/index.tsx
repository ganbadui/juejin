import React, { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './index.module.scss'
import { navs } from './config'
// import request from '@/service/fetch'

const Tab: NextPage = () => {
  const { pathname } = useRouter()

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>
        <Image src="/logo.svg" width={107} height={22} alt="图片加载失败" />
      </section>
      <section className={styles.linkArea}>
        {navs?.map(nav => (
          <Link
            key={nav?.label}
            href={nav?.value}
            className={pathname === nav?.value ? styles.active : ''}
          >
            {nav?.label}
          </Link>
        ))}
      </section>
    </div>
  )
}

export default Tab
