export type DemoInfo = {
  value?: string
  state?: string
}

export interface DemoStore {
  demoInfo: DemoInfo
  // eslint-disable-next-line no-unused-vars
  setDemoInfo: (value: DemoInfo) => void
}

const demoStore = (): DemoStore => {
  return {
    demoInfo: {},
    setDemoInfo: function (value) {
      this.demoInfo = value
    }
  }
}

export default demoStore
