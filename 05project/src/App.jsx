
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [Password, setPassword] = useState("")
  const PasswordRef = useRef(null)

  const passwordGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numAllowed, charAllowed])

  useEffect(() => {
    passwordGen()
  }, [length, numAllowed, charAllowed, passwordGen])

  const copyPassword = () => {
    PasswordRef.current?.select()
    PasswordRef.current?.selectlectionRange(0, 99)
    navigator.clipboard.writeText(Password)
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-3xl text-center text-white mb-6">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          ref={PasswordRef}
          type="text"
          value={Password}
          className="bg-gray-700 outline-none w-full py-2 px-3 text-white"
          placeholder="Password"
          readOnly
        />

        <button
          onClick={copyPassword}
          className="bg-blue-700 text-white px-4 py-2 shrink-0"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            onChange={(e) => setCharAllowed(e.target.checked)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>

        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={numAllowed}
            id="numberInput"
            onChange={(e) => setNumAllowed(e.target.checked)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
      </div>
    </div>
  )
}

export default App
