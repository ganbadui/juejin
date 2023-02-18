import { createContext, useContext } from 'react'

export interface Nav {
  label: string
  value: string
  isActive?: boolean
}
export interface IContextProps {
  tags: Nav[]
}

interface IProps {
  children: JSX.Element
  initialValue: any
}

const storeContext = createContext<IContextProps | null>(null)

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
