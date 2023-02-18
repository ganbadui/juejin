export interface Nav {
  label: string
  value: string
  isActive?: boolean
}

export interface ProjectStore {
  needMove: boolean
  setNeedMove: (value: boolean) => void
  tags: Nav[]
}

const projectStore = (): ProjectStore => {
  return {
    needMove: false,
    setNeedMove: function (value) {
      this.needMove = value
    },
    tags: []
  }
}

export default projectStore
