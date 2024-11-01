import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import  Button from "widgets/Button";

import './App.css'

console.log(Button)


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <Button />
      </div>
    </>
  )
}

export default App
