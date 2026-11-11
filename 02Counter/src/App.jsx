import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  let [counter, setCounter] = useState(0)
  //let counter=5;
  const addValue=()=>{
    //counter=counter+1;
    
    console.log("clicked",counter)
    if(counter<=20){
  
    setCounter(counter +1);
  
    }
  }

  const decValue=()=>{
    
    console.log("clicked",counter)
    if (counter > 0) {
    setCounter(counter - 1);
  }
    
  }

  return (
    <>
      <h1>chai or react</h1>
      <h2>Counter value:{counter}</h2>
      <button onClick={addValue}>Add value</button>
      <br>
      
      </br>
      <button onClick={decValue}>dec value</button>
    </>
  )
}

export default App
