export interface Nav {
  label: string
  value: string
  isActive?: boolean
}

export interface ProjectStore {
  needMove: boolean
  setNeedMove: (value: boolean) => void
  needFixed: boolean
  setNeedFixed: (value: boolean) => void
  tags: Nav[]
}

const projectStore = (): ProjectStore => {
  return {
    needMove: false,
    needFixed: false,
    setNeedMove: function (value) {
      this.needMove = value
    },
    setNeedFixed: function (value) {
      this.needFixed = value
    },
    tags: []
  }
}

export default projectStore
