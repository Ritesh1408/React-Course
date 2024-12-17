import { useState } from 'react'

import './App.css'

function App() {
  
  let [counter, setcounter] = useState(0)

  const increment = () => {
    if(counter >= 20){
      alert("Counter reached to 20")
      setcounter(0)
      return
    }
    // setcounter(counter + 1)
    setcounter((prev) => prev + 1)
    setcounter((prev) => prev + 1)
    setcounter((prev) => prev + 1)
    setcounter((prev) => prev + 1)


  }

  const Decrement = () => {
    if(counter <= 0){
      alert("Counter reached to 0")
      setcounter(0)
      return
    }
    setcounter(counter - 1)
  }

  return (
    <>
      <h1>Counter App</h1>
      <h2>{counter}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={Decrement}>Decrement</button>

    </>
  )
}

export default App
