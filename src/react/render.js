import { TEXT } from './createElement'

export function render(vnode, container) {
  const node = createNode(vnode, container)
  container.appendChild(node)
  return node
}

function createNode(vnode, container) {
  const { type, children } = vnode

  let node
  if (typeof type === 'function') {
    if (type.isReactClassComponent === true) {
      node = updateClassComponent(vnode, container)
    } else {
      node = updateFunctionComponent(vnode, container)
    }
  } else if (typeof type === 'string') {
    node = updateHostComponent(vnode, container)
  } else {
    node = document.createDocumentFragment()
  }
  reconcileChildren(children, node)
  return node
}

function reconcileChildren(children, node) {
  children.forEach(child => {
    Array.isArray(child)
      ? child.forEach(c => render(c, node))
      : render(child, node)
  })
}

function updateClassComponent(vnode, container) {
  const { type, props } = vnode
  const Type = type
  const component = new Type(props)
  const vvnode = component.render()
  const node = render(vvnode, container)
  component.container = container
  component.current = node
  return node
}
function updateFunctionComponent(vnode, container) {
  const { type, props } = vnode
  const vvnode = type(props)
  return render(vvnode, container)
}

function updateHostComponent(vnode, container) {
  const { type, props } = vnode
  let node
  if (type === TEXT) {
    node = document.createTextNode(props.text)
  } else {
    node = document.createElement(type)
    updateAttributes(node, props)
  }
  container.appendChild(node)
  return node
}

function updateAttributes(node, props) {
  Object.entries(props).forEach(([key, value]) => {
    // 处理事件
    if (key.match(/^(on[A-Z])/)) {
      const eventName = key.slice(2).toLocaleLowerCase()
      node.addEventListener(eventName, value)
      return
    }
    // 处理class
    if (key === 'className') {
      key = 'class'
    }
    node.setAttribute(key, value)
  })
}
