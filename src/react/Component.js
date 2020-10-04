import { render } from './render'

export class Component {
  static isReactClassComponent = true
  constructor(props) {
    this.props = props
    this.container = null
    this.state = {}
  }
  setState = arg => {
    if (typeof arg === 'object') {
      this.state = { ...this.state, ...arg }
    }
    if (typeof arg === 'function') {
      this.state = arg(this.state)
    }
    this.updateComponent()
  }
  updateComponent() {
    const vnode = this.render()
    const { container, current } = this
    container.removeChild(current)
    const node = render(vnode, container)
    this.current = node
  }
}
