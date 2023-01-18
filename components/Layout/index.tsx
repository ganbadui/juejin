import { FC, ReactElement } from 'react'

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <div>
      全局Tab
      <main>{children}</main>
    </div>
  )
}

export default Layout
