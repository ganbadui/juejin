import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error: any) {
    console.log(error)
    return {
      hasError: true
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 可以在这里上报日志
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div>
          <h2>不好意思，页面发生错误！</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            重试一次试试？
          </button>
        </div>
      )
    }

    return (this.props as any).children
  }
}

export default ErrorBoundary
