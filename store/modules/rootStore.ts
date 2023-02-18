import projectStore, { ProjectStore } from './projectStore'
export interface IStore {
  project: ProjectStore
}

export default function createStore(initialValue: any): () => IStore {
  return () => {
    return {
      project: { ...projectStore(), ...initialValue.project }
    }
  }
}
