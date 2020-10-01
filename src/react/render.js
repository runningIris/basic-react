import { TEXT } from './createElement'

export function render(vnode, container) {
  const node = createNode(vnode)
  console.log(node)
  container.appendChild(node)
}

function createNode(vnode) {
  const { type } = vnode

  if (typeof type === 'function') {
    vnode =
      type.isReactClassComponent === true
        ? updateClassComponent(vnode)
        : updateFunctionComponent(vnode)
  }

  return reconcileChildren(vnode)
}

// 递归 直到是原生标签为止
function reconcileChildren(vnode) {
  const { type, children } = vnode

  if (typeof type === 'string') {
    const node = updateHostComponent(vnode)
    children.forEach(child => {
      const childNode = createNode(child)
      node.appendChild(childNode)
    })
    return node
  }

  return createNode(vnode)
}

function updateFunctionComponent(vnode) {
  const { type, props } = vnode
  return type(props)
}

function updateClassComponent(vnode) {
  const { type: Type, props } = vnode
  return new Type(props)
}

function updateHostComponent(vnode) {
  const { type, props } = vnode
  if (type === TEXT) {
    return document.createTextNode(props.text)
  }
  const node = document.createElement(type)
  updateAttributes(node, props)
  return node
}

function updateAttributes(node, props) {
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      key = 'class'
    }
    node.setAttribute(key, value)
  })
}
