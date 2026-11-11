import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Card from "./components/ProfileCard"

function App() {
  
  const [count, setCount] = useState(0)
  let myObj={
    username:"arsh",
    age:19
  }

  return (
    <>
    <h1>hello</h1>
    <Card username="arsh malik"></Card>
    <Card username="sanjay yadav"></Card>
     
    </>
  )
}

export default App
