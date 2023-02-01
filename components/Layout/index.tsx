import { FC, ReactElement } from 'react'
import Tab from '../Tab'

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <div>
      <Tab />
      <main>{children}</main>
    </div>
  )
}

export default Layout
