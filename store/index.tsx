import { createContext, useContext } from 'react'

interface Nav {
  label: string
  value: string
  isActive?: boolean
}
interface IContextProps {
  tags: Nav[]
}

interface IProps {
  children: JSX.Element
  initialValue: any
}

const storeContext = createContext<IContextProps>({ tags: [] })

export const StoreProvider = ({
  children,
  initialValue
}: IProps): JSX.Element => {
  return (
    <storeContext.Provider value={initialValue}>
      {children}
    </storeContext.Provider>
  )
}

export const useStore = () => {
  return useContext(storeContext)
}
