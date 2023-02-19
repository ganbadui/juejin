import React, { useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './index.module.scss'
import { SwitchButton } from './cpns/SwitchButton'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'

const Tab: NextPage = () => {
  const store = useStore().project
  const tags = store.tags

  const { pathname } = useRouter()
  const [arrow, setArrow] = useState('low')

  const getActive = () => {
    return tags.find(item => item.value === pathname)?.label
  }

  const tagsMobile: MenuProps['items'] = tags?.map(nav => {
    return {
      key: nav.label,
      label: (
        <Link
          key={nav?.label}
          href={nav?.value}
          className={pathname === nav?.value ? styles.actived : ''}
          onClick={() => {
            arrow === 'low' ? setArrow('up') : setArrow('low')
          }}
        >
          {nav?.label}
        </Link>
      )
    }
  })

  return (
    <div>
      <div className={classNames(styles.navbar, { move: store.needMove })}>
        <div className={styles.wrppper}>
          <section className={styles.logoArea}>
            <Image src="/logo.svg" width={107} height={22} alt="图片加载失败" />
          </section>
          <section className={styles.linkArea}>
            {tags?.map(nav => (
              <Link
                key={nav?.label}
                href={nav?.value}
                className={pathname === nav?.value ? styles.active : ''}
                style={{ textAlign: 'center' }}
              >
                {nav?.label}
                {nav?.isActive ? (
                  <span className={styles.tablead}>{nav.activeContent}</span>
                ) : null}
              </Link>
            ))}
          </section>
        </div>

        <div className={styles.mobile}>
          <div className={styles.flexContainer}>
            <Image src="/logo.svg" width={107} height={22} alt="图片加载失败" />
            <Dropdown
              menu={{
                items: tagsMobile,
                selectable: true,
                defaultSelectedKeys: ['首页']
              }}
              trigger={['click']}
              onOpenChange={() => {
                arrow === 'low' ? setArrow('up') : setArrow('low')
              }}
              overlayClassName={styles.overlay}
              placement="bottomLeft"
            >
              <a onClick={e => e.preventDefault()}>
                <div style={{ display: 'inline-block' }}>
                  <span style={{ color: '#1e80ff' }}>{getActive()}</span>
                  <span className={styles.arrow}>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={arrow === 'low' ? styles.low : styles.up}
                    >
                      <path
                        d="M2.45025 4.82431C2.17422 4.49957 2.40501 4.00049 2.83122 4.00049H9.16878C9.59498 4.00049 9.82578 4.49957 9.54975 4.82431L6.38097 8.55229C6.1813 8.78719 5.8187 8.78719 5.61903 8.55229L2.45025 4.82431Z"
                        data-v-77c302d8=""
                      ></path>
                    </svg>
                  </span>
                </div>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className={styles.themebutton}>
          <SwitchButton></SwitchButton>
        </div>
      </div>
    </div>
  )
}

export default observer(Tab)
