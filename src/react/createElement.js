export const TEXT = 'TEXT'

export function createElement(type, config, ...children) {
  const { __self, __source, ...props } = config

  return {
    type,
    props,
    children: children.map(child => {
      if (typeof child === 'string') {
        return {
          type: TEXT,
          props: {
            text: child,
          },
          children: [],
        }
      }
      return child
    }),
  }
}
