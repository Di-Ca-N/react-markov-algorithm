import React from 'react'

import Interpreter from '../components/Interpreter.js';
import "./styles.css";


export default function App() {
  return (
    <>
      <header className="flex py-8 px-8 bg-gray-700">
        <h1 className="text-gray-100 text-xl">Markov Algorithm Simulator</h1>
      </header>
      <main>
        <Interpreter />
      </main>
    </>
  )
}
