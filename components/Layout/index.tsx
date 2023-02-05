import { FC, ReactElement } from 'react'
import Tab from '../Tab'
import styels from './index.module.scss'

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <div>
      <Tab />
      <main className={styels.mainContainer}>{children}</main>
    </div>
  )
}

export default Layout
