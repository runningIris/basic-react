import * as React from './react'
import './index.css'
import Home from './pages/Home'
import * as serviceWorker from './serviceWorker'

React.render(<Home />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
