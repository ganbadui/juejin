import React, { createContext, useContext } from 'react'
import { useLocalObservable, enableStaticRendering } from 'mobx-react-lite'
import createStore, { IStore } from './modules/rootStore'

interface IProps {
  children: JSX.Element
  initialValue: any
}

enableStaticRendering(typeof window === 'undefined')

const StoreContext = createContext({})

export const StoreProvider = ({ initialValue, children }: IProps) => {
  const store: IStore = useLocalObservable(createStore(initialValue))
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const store: IStore = useContext(StoreContext) as IStore

  if (!store) {
    throw new Error('数据不存在')
  }
  return store
}
