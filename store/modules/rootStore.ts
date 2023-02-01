import demoStore, { DemoStore } from './demoStore'

export interface IStore {
  demo: DemoStore
}

export default function createStore(initialValue: any): () => IStore {
  return () => {
    return {
      demo: { ...demoStore(), ...initialValue?.demo }
    }
  }
}
