import * as React from '../react'
import './Home.css'

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Child />
        <footer onClick={() => alert('hhh')}>Hello, footer</footer>
      </header>
    </div>
  )
}

class Child extends React.Component {
  constructor(props) {
    super(props)
    this.state.count = 0
  }
  plus(number) {
    this.setState(prevState => {
      return {
        ...prevState,
        count: prevState.count + number,
      }
    })
  }
  render() {
    return (
      <div>
        <div>{String(this.state.count)}</div>
        <button onClick={() => this.plus(1)}>+</button>
      </div>
    )
  }
}

export default Home
